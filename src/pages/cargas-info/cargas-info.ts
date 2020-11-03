import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, PopoverController, LoadingController, ItemGroup } from 'ionic-angular';
import { CargasModel } from '../../models/cargasModel';
import { CargasListPage } from '../cargas-list/cargas-list';
import { RestServiceProvider } from '../../providers/rest-service';
import { AlertaServiceProvider } from '../../providers/alerta-service';
import { HttpParams, HttpClient, HttpHeaders } from '@angular/common/http';
import { ClienteFacturaModel } from '../../models/clienteFacturaModel';
import { HTTP } from '@ionic-native/http';
import { DatosFacturacionPage } from '../datos-facturacion/datos-facturacion';
import { NotificacionService } from '../../services/notificaciones.service';
import { AbrirnotificacionesService } from '../../services/abrirnotificaciones.service';

@IonicPage()
@Component({
  selector: 'page-cargas-info',
  templateUrl: 'cargas-info.html',
})
export class CargasInfoPage {
  public carga: any = null;
  public cargas: any = null;
  public clientes2: any;
  public idUsuario: number = 0;
  public arregloClientes: ClienteFacturaModel[] = [];
  public idclifac: number = 0;
  public des: string;
  constructor(public navCtrl: NavController, public loadingCtrl: LoadingController, 
  	public navParams: NavParams, public popoverCtrl: PopoverController, public alertaService: AlertaServiceProvider,
    public restService: RestServiceProvider,
    public http: HttpClient, public httpNative: HTTP,
    public notificacion: NotificacionService, public mostrarNotif: AbrirnotificacionesService
    ) {
    this.carga = navParams.get("carga");
    this.cargas = navParams.get('cargas');
    this.idUsuario = navParams.get('idUsuario');
    let loading = this.loadingCtrl.create();
    loading.present();
    loading.dismiss();
  }

  ionViewDidLoad() {
    this.cambiarEstiloBoton(this.carga.Numero != "0");

  }

  ionViewWillEnter(){
    (document.getElementById("rfc") as HTMLFormElement).value = "";
    (document.getElementById("razon") as HTMLFormElement).value = "";
    (document.getElementById("correo") as HTMLFormElement).value = "";
    this.listaClientesFacturar(this.idUsuario);
    this.idclifac = 0;
  }

  presentPopover(myEvent) {
    let popover = this.popoverCtrl.create(CargasListPage, { cargas: this.cargas });
    popover.present({
      ev: myEvent
    });
  }
  
  reenviar() {

		let loading = this.loadingCtrl.create();
    loading.present();
    this.restService.getToken().timeout(this.restService.timeOver).subscribe(data => {
      if (data == null) {
        loading.dismiss();
        this.alertaService.warnAlert(this.restService.headerValidacion, this.restService.mensajeValidacionAdmin, null);
      } else {
        
        var url = "invoice/email?IdFactura=" + this.carga.IdFactura + "&IdEstacion=" + this.carga.IdEstacion + "&Email=" + this.carga.Email;
        
        this.restService.restServiceGETToken(url, new HttpParams(), data.toString()).timeout(this.restService.timeOver).subscribe(
          dataRegistro => {
            if(dataRegistro['Message']==0){
              this.alertaService.alertaBasica(this.restService.headerValidacion, "Se ha reenviado correctamente", null);
            }else{
            	let msg = "";
            	if (dataRegistro['Message']==1) msg = "Error interno del servidor";
            	else if (dataRegistro['Message']==2) msg = "No se encontraron parámetros";
					else if (dataRegistro['Message']==3) msg = "No existen resultados";
					else msg = dataRegistro['Message'];
              this.alertaService.warnAlert(this.restService.headerValidacion, msg, null);
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
  
  // despachos/invoice/regular
  facturar() {
    if(this.idclifac == 0)
      this.alertaService.warnAlert(this.restService.headerValidacion, "Es necesario seleccionar persona a facturar", null);
    else{
      console.log("pafac " + this.carga.Id + " " + this.carga.IdEstacion + " " + this.idclifac.toString());
      this.cambiarEstiloBoton(true);
    }
    /*
    let loading = this.loadingCtrl.create();
   loading.present();
	this.restService.getToken().timeout(this.restService.timeOver).subscribe(data => {
      if (data == null) {
        loading.dismiss();
        this.alertaService.warnAlert(this.restService.headerValidacion, this.restService.mensajeValidacionAdmin, null);
      } else {
			const bodys = new HttpParams()
        .set('IdCarga', this.carga.Id)
        .set('IdEstacion', this.carga.IdEstacion)
        .set('IdFacturarA', this.idclifac.toString())
      let param = "";
      this.restService.restServicePOSTTokenXForm("despachos/invoice/regular", bodys, data.toString()).timeout(this.restService.timeOver).subscribe(
      dataRegistro => {
        let dato = dataRegistro['Response'];
        if (dato != undefined && dato == true) {
          this.alertaService.alertaBasica("Bien!", "Se ha facturado con éxito", null);
        } else {
          this.alertaService.warnAlert("Atención!", "Error al facturar", null);
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
      console.log(error);
      this.alertaService.errorAlert(this.restService.headerError, this.restService.mensajeError, null);
    });*/

  }

  listaClientesFacturar(idUsuario: number){
    this.arregloClientes = [];
    this.restService.getToken().timeout(this.restService.timeOver).subscribe(data => {
      if (data == null) {
        this.alertaService.warnAlert(this.restService.headerValidacion, this.restService.mensajeValidacionAdmin, null);
      } 
      else {
      var url = "invoiceto/regular/" + idUsuario;
          
      this.restService.restServiceGETToken(url, new HttpParams(), data.toString()).timeout(this.restService.timeOver).subscribe(
            dataRegistro => {
              if(dataRegistro['Status']==1){
                var arreglo = dataRegistro['Response'];
                arreglo.forEach(dato => {
                  this.arregloClientes.push(new ClienteFacturaModel(dato.Id,dato.RFC,dato.Email,dato.RazonSocial));
                });
                if(this.arregloClientes.length == 1){
                  this.idclifac = this.arregloClientes[0].id;
                  this.cargaInfoFac();
                }
              }else{
                this.arregloClientes = null;
              }
            }, error => {
              console.log(error);
            }
          );
      }
    });
  }

  cargaInfoFac(){
    this.restService.getToken().timeout(this.restService.timeOver).subscribe(data => {
      if (data == null) {
        this.alertaService.warnAlert(this.restService.headerValidacion, this.restService.mensajeValidacionAdmin, null);
      } 
      else {
      var url = "invoiceto/regular/detail/" + this.idclifac;
          
      this.restService.restServiceGETToken(url, new HttpParams(), data.toString()).timeout(this.restService.timeOver).subscribe(
            dataRegistro => {
              if(dataRegistro['Status']==1){
                let resp = dataRegistro['Response'];
                (document.getElementById("rfc") as HTMLFormElement).value = resp.RFC;
                (document.getElementById("razon") as HTMLFormElement).value = resp.NombreComercial;
                (document.getElementById("correo") as HTMLFormElement).value = resp.Email;
              }
            }, error => {
              console.log(error);
            }
          );
      }
    });
  }

  cambiarEstiloBoton(ban: boolean){
      this.des = ban ? "Facturada" : "Facturar";
      (document.getElementById("botonenv") as HTMLFormElement).style.backgroundColor = ban ? "#FF2D00" : "#0ba74f";
      (document.getElementById("botonenv") as HTMLFormElement).style.pointerEvents = ban ? "none" : "auto";
  }

  facturarA() {
    this.navCtrl.push(DatosFacturacionPage, { idUsuario: this.idUsuario });
  }
}
