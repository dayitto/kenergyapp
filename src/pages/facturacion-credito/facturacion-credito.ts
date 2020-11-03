import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, ActionSheetController } from 'ionic-angular';
import { ProductoModel } from '../../models/productoModel';
import { FacturaModel } from '../../models/facturaModel';
import { FacturaCreditoModel } from '../../models/facturaCreditoModel';
import { AlertaServiceProvider } from '../../providers/alerta-service';
import { RestServiceProvider } from '../../providers/rest-service';
import { Storage } from '@ionic/storage';
import { HttpParams } from '@angular/common/http';
import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer/';
import { File } from '@ionic-native/file';
import { FileOpener } from '@ionic-native/file-opener/';
import { NotificacionService } from '../../services/notificaciones.service';
import { AbrirnotificacionesService } from '../../services/abrirnotificaciones.service';
import { FacturacionService } from '../../services/facturacion.service';
import { AndroidPermissions } from '@ionic-native/android-permissions';

@IonicPage()
@Component({
  selector: 'page-facturacion-credito',
  templateUrl: 'facturacion-credito.html',
})
export class FacturacionCreditoPage {
  public desde: String = "";
  public hasta: String = new Date().toISOString();
  public estaciones: ProductoModel[] = [];
  public idEstacion: number = 0;
  public estacion: string;
  public facturas: FacturaCreditoModel[] = [];
  
  public ordenFecha: number = 0;
  public usuario: any = null;

  constructor(public navCtrl: NavController, public navParams: NavParams,
    public localStorage: Storage,
    public alertaService: AlertaServiceProvider, public restService: RestServiceProvider,
    public loadingCtrl: LoadingController, public transfer: FileTransfer, public file: File, public fileOpener: FileOpener,
    public notificacion: NotificacionService, public mostrarNotif: AbrirnotificacionesService,
    public facturacionService: FacturacionService, public actionSheetController: ActionSheetController,
    private androidPermissions: AndroidPermissions) {
    /*this.facturas.push(new FacturaCreditoModel("C-210775", "Estación", "02-Sept-18", 1850));
    this.facturas.push(new FacturaCreditoModel("C-210775", "Estación", "02-Sept-18", 1850));
    this.facturas.push(new FacturaCreditoModel("C-210775", "Estación", "02-Sept-18", 1850));
*/
    this.estaciones.push(new ProductoModel(0, "Todas"));

    //this.usuario=1;
    //this.cargarCombos();
    this.openSesion();
  }
  

  openSesion() {
    this.localStorage.ready().then(() => {
      this.localStorage.get(`@userSession`).then((data) => {
        if (data != null) {
          this.usuario = data;
          this.cargarCombos();
        } else {
          this.alertaService.warnAlert(this.restService.headerValidacion, "Usuario sin sesión, no se cargarán sus datos", null);
        }
      });
    });

  }

  cargarCombos() {
    let loading = this.loadingCtrl.create();
    loading.present();
    let desdeDate: Date = new Date();
    var dias = desdeDate.getUTCDate() - 1;
    desdeDate.setDate(desdeDate.getDate() - dias);
    this.desde = desdeDate.toISOString();
    this.estaciones = [];
    this.estaciones.push(new ProductoModel(0, "Todas"));
    this.restService.getToken().timeout(this.restService.timeOver).subscribe(data => {
      if (data == null) {
        loading.dismiss();
        this.alertaService.warnAlert(this.restService.headerValidacion, this.restService.mensajeValidacionAdmin, null);
      } else {
        let body = new HttpParams();
        var a = this.usuario.IdClient;
        //var a = 44;
        //body.append("IdClient", a.toString());
        var urlArmada = "stats/" + a;
        //var urlArmada = "stats/"+this.usuario.IdClient;
        this.restService.restServiceGETToken(urlArmada, body, data.toString()).timeout(this.restService.timeOver).subscribe(
          dataRegistro => {
            if (Object.keys(dataRegistro['Response']).length != 0) {
              let estaciones = dataRegistro['Response'].Estacion;
              estaciones.forEach(estacion => {
                this.estaciones.push(new ProductoModel(estacion.Id, estacion.Nombre));
              });
              //this.buscar();
            } else {
              this.alertaService.warnAlert(this.restService.headerValidacion, "No se cargaron los filtros de búsqueda", null);
            }
            loading.dismiss();
          }, error => {
            loading.dismiss();
            console.log(error);
            this.alertaService.errorAlert(this.restService.headerError, this.restService.mensajeError, null);
          }
        );
        //this.buscar();
      }
    }, error => {
      loading.dismiss();
      console.log(error);
      this.alertaService.errorAlert(this.restService.headerError, this.restService.mensajeError, null);
    });
  }

  buscar() {
    if (this.usuario == null) {
      this.alertaService.warnAlert(this.restService.headerValidacion, "Usuario no en sesión", null);
    } else {
      this.facturas = [];
      var arrFecha = this.desde.split("T");
      var fechaDesde = arrFecha[0].split("-");
      var fechaFormat = "";
      var arrFecha2 = this.hasta.split("T");
      var fechaHasta = arrFecha2[0].split("-");
      var fechaFormatHasta = "";
      if (fechaDesde.length < 3) {
        //this.alertaService.warnAlert(this.restService.headerValidacion, "Selecciona una fecha de inicio", null);
      } else {
        // año/ mes/ dia
        fechaFormat = fechaDesde[2] + "/" + fechaDesde[1] + "/" + fechaDesde[0];
      }
      if (fechaHasta.length < 3) {
        //this.alertaService.warnAlert(this.restService.headerValidacion, "Selecciona una fecha de fin", null);
      } else {
        // año/ mes/ dia
        fechaFormatHasta = fechaHasta[2] + "/" + fechaHasta[1] + "/" + fechaHasta[0];
      }

      let loading = this.loadingCtrl.create();
      loading.present();

      this.restService.getToken().timeout(this.restService.timeOver).subscribe(data => {
        if (data == null) {
          loading.dismiss();
          this.alertaService.warnAlert(this.restService.headerValidacion, this.restService.mensajeValidacionAdmin, null);
        } else {
          let body = new HttpParams();

          var a = this.usuario.IdClient;
          //var a = 44;
          //this.idEstacion = 1;
          var url = "invoice?Desde=" + fechaFormat + "&Hasta=" + fechaFormatHasta + "&IdEstacion=" + this.idEstacion + "&IdClient=" + a;
          console.log(url);
          /**
     * String:Desde (Requerido), String:Hasta(Requerido), 
     * Int:IdProducto, Int:IdEstacion(Requerido), Int:Chofer,
     *  Int:IdVehiculo, Int:IdClient(Requerido)
     */
          //var urlArmada = "stats/"+this.usuario.IdClient;
          this.restService.restServiceGETToken(url, body, data.toString()).timeout(this.restService.timeOver).subscribe(
            dataRegistro => {
              if (Object.keys(dataRegistro['Response']).length != 0) {
                let facturas = dataRegistro['Response'];
                facturas.forEach(factura => {
                  this.facturas.push(
                    new FacturaCreditoModel(factura.Folio,factura.Estacion,factura.Fecha,factura.Efectivo,factura.Id,factura.IdEstacion)
                  );
                });
                this.ordenFecha = 1;
                this.ordenar();
              } else if (dataRegistro['Message'] != 3) {
                this.alertaService.warnAlert(this.restService.headerValidacion, dataRegistro['Message'], null);
              } else {
                this.alertaService.warnAlert("Sin facturas!", "No se encontraron registros en el periodo seleccionado", null);
              }
              loading.dismiss();
            }, error => {
              loading.dismiss();
              console.log(error);
              this.alertaService.errorAlert(this.restService.headerError, this.restService.mensajeError, null);
            }
          );
        }
      }, error => {
        loading.dismiss();
        console.log(error);
        this.alertaService.errorAlert(this.restService.headerError, this.restService.mensajeError, null);
      });
    }
  }

  ordenar(){
    console.log("si entra");
    let orden1 = this.ordenFecha;
    this.facturas.sort(function (a, b) {
        if(orden1 != 1){
          if (new Date(a.fecha.substr(6,4) + "-" + a.fecha.substr(3,2) + "-" + a.fecha.substr(0,2)) > new Date(b.fecha.substr(6,4) + "-" + b.fecha.substr(3,2) + "-" + b.fecha.substr(0,2))) {
            return 1;
          }
          if (new Date(a.fecha.substr(6,4) + "-" + a.fecha.substr(3,2) + "-" + a.fecha.substr(0,2)) < new Date(b.fecha.substr(6,4) + "-" + b.fecha.substr(3,2) + "-" + b.fecha.substr(0,2))) {
            return -1;
          }
        }
        else{
          if (new Date(a.fecha.substr(6,4) + "-" + a.fecha.substr(3,2) + "-" + a.fecha.substr(0,2)) < new Date(b.fecha.substr(6,4) + "-" + b.fecha.substr(3,2) + "-" + b.fecha.substr(0,2))) {
            return 1;
          }
          if (new Date(a.fecha.substr(6,4) + "-" + a.fecha.substr(3,2) + "-" + a.fecha.substr(0,2)) > new Date(b.fecha.substr(6,4) + "-" + b.fecha.substr(3,2) + "-" + b.fecha.substr(0,2))) {
            return -1;
          }
        }
      return 0;
    });
      this.ordenFecha = this.ordenFecha != 1 ? 1 : 2;
  }

  async downloadFactura(idFactura,idEstacion,folio,tipo = 1){
    const actionSheet = await this.actionSheetController.create({
      cssClass: 'my-custom-class',
      buttons: [{
        text: 'Abrir...',
        icon: 'open',
        handler: () => {
          if(tipo === 1)
            this.facturacionService.openFactura(idFactura,idEstacion);
          else{
            this.facturacionService.nav = this.navCtrl;
            this.facturacionService.openFacturaXml(idFactura,idEstacion);
          }
        }
      }, {
        text: 'Compartir...',
        icon: 'share',
        handler: () => {
          this.compartirFactura(idFactura,idEstacion,folio,tipo);
        }
      }],
      
    });
    await actionSheet.present();
}

async compartirFactura(idFactura,idEstacion,folio,tipo){
  const actionSheet = await this.actionSheetController.create({
    cssClass: 'my-custom-class',
    buttons: [{
      text: 'Guardar en dispositivo',
      icon: 'download',
      handler: () => {
        this.androidPermissions.requestPermissions([this.androidPermissions.PERMISSION.READ_EXTERNAL_STORAGE]).then(() => {
          if(tipo === 1)
            this.facturacionService.downloadFactura(idFactura,idEstacion,folio);
          else
            this.facturacionService.downloadFacturaXML(idFactura,idEstacion,folio);
        });
      }
    }, {
      text: 'Correo electrónico',
      icon: 'mail',
      handler: () => {
        this.facturacionService.mostrarEnvio(idFactura,idEstacion,this.usuario.Email);
      }
    }, {
      text: 'Whatsapp',
      icon: 'logo-whatsapp',
      handler: () => {
        if(tipo === 1)
          this.facturacionService.compartirPdfWhatsapp(idFactura,idEstacion,folio);
        else
          this.facturacionService.compartirXmlWhatsapp(idFactura,idEstacion,folio);
      }
    }]
    
  });
  await actionSheet.present();
}

}
