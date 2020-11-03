import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, PopoverController, LoadingController } from 'ionic-angular';
import { CargasListPage } from '../cargas-list/cargas-list';
import { AlertaServiceProvider } from '../../providers/alerta-service';
import { RestServiceProvider } from '../../providers/rest-service';
import { ProductoModel } from '../../models/productoModel';
import { HttpParams } from '@angular/common/http';
import { CargasInfoPage } from '../cargas-info/cargas-info';
import { Storage } from '@ionic/storage';
import { AlertController } from 'ionic-angular';
import { FacturacionService } from '../../services/facturacion.service';
import { AbrirnotificacionesService } from '../../services/abrirnotificaciones.service';
import { NotificacionService } from '../../services/notificaciones.service';

@IonicPage()
@Component({
  selector: 'page-cargas',
  templateUrl: 'cargas.html',
})
export class CargasPage {
  public cargas: any[] = [];
  public desde: String = "";
  public hasta: String = new Date().toISOString();
  public vehiculos: ProductoModel[] = [];
  public idVehiculo: number = 0;
  public estaciones: ProductoModel[] = [];
  public idEstacion: number = 0;
  public usuario:any;
  public idEstacionTemp: number = 0;

  constructor(public navCtrl: NavController, public navParams: NavParams, public popoverCtrl: PopoverController,
    public localStorage: Storage,
    public alertaService: AlertaServiceProvider, public restService: RestServiceProvider,
    public loadingCtrl: LoadingController,
    public alertCtrl: AlertController, public facturacionService: FacturacionService,
    public notificacion: NotificacionService, public mostrarNotif: AbrirnotificacionesService) {
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
    desdeDate.setDate(desdeDate.getDate() - 30);
    this.desde = desdeDate.toISOString();
    this.vehiculos = [];
    this.vehiculos.push(new ProductoModel(0, "Todos"));
    this.estaciones = [];
    this.estaciones.push(new ProductoModel(0, "Todas"));
    this.restService.getToken().timeout(this.restService.timeOver).subscribe(data => {
      if (data == null) {
        loading.dismiss();
        this.alertaService.warnAlert(this.restService.headerValidacion, this.restService.mensajeValidacionAdmin, null);
      } else {
        let body = new HttpParams();
        var a = this.usuario.Id;
        //var a = 44;
        //body.append("IdClient", a.toString());
        var urlArmada = "stats/regular/" + a;
        //var urlArmada = "stats/"+this.usuario.IdClient;
        this.restService.restServiceGETToken(urlArmada, body, data.toString()).timeout(this.restService.timeOver).subscribe(
          dataRegistro => {
            if (Object.keys(dataRegistro['Response']).length != 0) {

              let estaciones = dataRegistro['Response'].Estacion;
              estaciones.forEach(estacion => {
                this.estaciones.push(new ProductoModel(estacion.Id, estacion.Nombre));
              });

              let vehiculos = dataRegistro['Response'].Vehiculo;
              vehiculos.forEach(vehiculo => {
                this.vehiculos.push(new ProductoModel(vehiculo.Id, vehiculo.Nombre));
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
      }
    }, error => {
      loading.dismiss();
      console.log(error);
      this.alertaService.errorAlert(this.restService.headerError, this.restService.mensajeError, null);
    });
  }
  
  ionViewDidLoad() {
    
  }

  presentPopover(myEvent) {
    let popover = this.popoverCtrl.create(CargasListPage, { cargas: this.cargas });
    popover.present({
      ev: myEvent
    });
  }

  buscar() {
    if (this.usuario == null) {
      this.alertaService.warnAlert(this.restService.headerValidacion, "Usuario no en sesión", null);
    } else {
      this.cargas = [];
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

          var a = this.usuario.Id;
          var url = "despachos/regular/"+a+"?Desde=" + fechaFormat+"&Hasta="+fechaFormatHasta+"&IdEstacion="+this.idEstacion;
          console.log(url);
          if (this.idVehiculo != 0) {
            url += "&IdVehiculo=" + this.idVehiculo;
          }
          console.log(url);
          //var urlArmada = "stats/"+this.usuario.IdClient;
          this.restService.restServiceGETToken(url, body, data.toString()).timeout(this.restService.timeOver).subscribe(
            dataRegistro => {
              if (Object.keys(dataRegistro['Response']).length != 0) {
                let cargas = dataRegistro['Response'];
                cargas.forEach(carga => {
                  let arrf = carga.Fecha.split(" ");
                  this.cargas.push({
                    fecha:arrf[0],
                    hora: arrf[1],
                    lts:carga.Litros,
                    precio:carga.Efectivo,
                    id:carga.Id,
                    estacion : carga.Estacion,
                    auto: carga.Auto,
                    producto: carga.Producto,
                    km: carga.Kilometraje,
                    facturada: carga.Facturada,
                    facturable: carga.Facturable,
                    idFactura: carga.IdFactura,
                    idEstacion: carga.IdEstacion,
                    email: carga.Email});
                    this.idEstacionTemp = this.idEstacion;
                });
              } else if(dataRegistro['Message']!=3){
                this.alertaService.warnAlert(this.restService.headerValidacion, dataRegistro['Message'], null);
              }else{
                this.alertaService.warnAlert("Sin cargas!", "No se encontraron registros en el periodo seleccionado", null);
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

  openCarga(carga: any) {
    var b = this.usuario.Id;
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
        var url = "despachos/regular/detail/"+carga.id+"?IdEstacion="+carga.idEstacion;
        console.log("q " + url);
        //var urlArmada = "stats/"+this.usuario.IdClient;
        this.restService.restServiceGETToken(url, body, data.toString()).timeout(this.restService.timeOver).subscribe(
          dataRegistro => {
            if (Object.keys(dataRegistro['Response']).length != 0) {
              let carga = dataRegistro['Response'];
              this.navCtrl.push(CargasInfoPage,{carga:dataRegistro['Response'], cargas: this.cargas, idUsuario: b});
            } else if(dataRegistro['Message']!=3){
              this.alertaService.warnAlert(this.restService.headerValidacion, dataRegistro['Message'], null);
            }else{
              this.alertaService.warnAlert(this.restService.headerValidacion, "No se encontraron registros de cargas", null);
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
