import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import { VehiculoModel } from '../../models/vehiculoModel';
import { CombustibleModel } from '../../models/CombustibleModel';
import { FacturaModel } from '../../models/facturaModel';
import { ProductoModel } from '../../models/productoModel';
import { RestServiceProvider } from '../../providers/rest-service';
import { AlertaServiceProvider } from '../../providers/alerta-service';
import { Storage } from '@ionic/storage';
import { HttpParams } from '@angular/common/http';
import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer/';
import { File } from '@ionic-native/file';
import { FileOpener } from '@ionic-native/file-opener/';
import { FacturacionService } from '../../services/facturacion.service';
import { NotificacionService } from '../../services/notificaciones.service';
import { AbrirnotificacionesService } from '../../services/abrirnotificaciones.service';

@IonicPage()
@Component({
  selector: 'page-facturacion',
  templateUrl: 'facturacion.html',
})
export class FacturacionPage {
  public desde: String = "";
  public hasta: String = new Date().toISOString();
  public vehiculos: ProductoModel[] = [];
  public idVehiculo: number = 0;
  public estaciones: ProductoModel[] = [];
  public idEstacion: number = 0;
  public facturas: any[] = [];
  public datosFacturacion: ProductoModel[] = [];
  public idDatoFacturacion: number = 0;

  public usuario: any = null;
  constructor(public navCtrl: NavController, public navParams: NavParams,
    public localStorage: Storage,
    public alertaService: AlertaServiceProvider, public restService: RestServiceProvider,
    public loadingCtrl: LoadingController, public transfer: FileTransfer, public file: File, public fileOpener: FileOpener,
    public facturacionService: FacturacionService, public notificacion: NotificacionService, public mostrarNotif: AbrirnotificacionesService) {
    //this.hasta.setDate(this.desde.getDate() + 1);
    this.openSesion();
  }

  openSesion() {
    this.localStorage.ready().then(() => {
      this.localStorage.get(`@userSession`).then((data) => {
        if (data != null) {
          this.usuario = data;
          this.cargarCombos();
          this.cargaFacturarA();
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

  cargaFacturarA() {
    this.datosFacturacion = [];
    this.datosFacturacion.push(new ProductoModel());
		//invoiceto/regular/{id usuario}
		let loading = this.loadingCtrl.create();
    loading.present();
    this.restService.getToken().timeout(this.restService.timeOver).subscribe(data => {
      if (data == null) {
        loading.dismiss();
        this.alertaService.warnAlert(this.restService.headerValidacion, this.restService.mensajeValidacionAdmin, null);
      } else {
        if (this.usuario != null) {
          //let body = new HttpParams();
          //var a = 44;
          var a = this.usuario.Id;
          var url = "invoiceto/regular/" + a.toString();
          this.restService.restServiceGETToken(url, new HttpParams(), data.toString()).timeout(this.restService.timeOver).subscribe(
            dataRegistro => {
              if(dataRegistro['Response']!=null && dataRegistro['Response'] instanceof Array){
                  let array = dataRegistro['Response'];
              		array.forEach(dato => {
              			this.datosFacturacion.push(new ProductoModel(dato.Id, dato.RazonSocial));
                });
                this.datosFacturacion.push(new ProductoModel(124815, 'MARIO ABDON CORDERO CAMACHO'));
              }
              //this.facturas.push(new FacturaModel("APR9609194H4", "APR9609194H4", "AB PRO SC.", "felectronica@grupotabar.com", "", "", "", "", "Ver.", "Ixtaczoquitlán", ""));
      		//	this.facturas.push(new FacturaModel("APR9609194H4", "APR9609194H4", "AB PRO SC.", "felectronica@grupotabar.com", "", "", "", "", "Ver.", "Ixtaczoquitlán", ""));
      
              loading.dismiss();
            }, error => {
              loading.dismiss();
              console.log(error);
              this.alertaService.errorAlert(this.restService.headerError, this.restService.mensajeError, null);
            }
          );
        } else {
          loading.dismiss();
        }
      }
    }, error => {
      loading.dismiss();
      console.log(error);
      this.alertaService.errorAlert(this.restService.headerError, this.restService.mensajeError, null);
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad FacturacionPage');
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

          var a = this.usuario.Id;
          var url = "invoice/regular?"+"IdUser="+a+"&Desde=" + fechaFormat+"&Hasta="+fechaFormatHasta+"&IdEstacion="+this.idEstacion;
          
          if (this.idVehiculo != 0) {
            url += "&IdVehiculo=" + this.idVehiculo;
          }
          if (this.idDatoFacturacion != 0) {
            url += "&IdFacA=" + this.idDatoFacturacion;
          }
          console.log(url);
          //var urlArmada = "stats/"+this.usuario.IdClient;
          this.restService.restServiceGETToken(url, body, data.toString()).timeout(this.restService.timeOver).subscribe(
            dataRegistro => {
              if (Object.keys(dataRegistro['Response']).length != 0) {
                let facturas = dataRegistro['Response'];
                facturas.forEach(carga => {
                  this.facturas.push({
                    fecha:carga.Fecha,
                    precio:carga.Efectivo,
                    id:carga.Id,
                    auto: carga.Auto,
                    idEstacion: carga.CodEstacion,
                    email: carga.Email,
                    nombreEst: carga.CodEstacion == 1 ? "K ENERGY 1" : carga.CodEstacion == 2 ? "K ENERGY 2" : "K ENERGY 3"});
                });
                this.facturas.sort(function (a, b) {
                  let datea = new Date(a.fecha.substr(3,2) + "-" + a.fecha.substr(0,2) + "-" + a.fecha.substr(6,4));
                  let dateb = new Date(b.fecha.substr(3,2) + "-" + b.fecha.substr(0,2) + "-" + b.fecha.substr(6,4));
                  if (datea > dateb) {
                    return -1;
                  }
                  if (datea < dateb) {
                    return 1;
                  }
                  // a must be equal to b
                  return 0;
                });
              } else if(dataRegistro['Message']!=3){
                this.alertaService.warnAlert(this.restService.headerValidacion, dataRegistro['Message'], null);
              }else{
                this.alertaService.warnAlert(this.restService.headerValidacion, "No se encontraron registros de facturación", null);
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

  sendCorreo(factura:any){
    if (this.usuario == null) {
      this.alertaService.warnAlert(this.restService.headerValidacion, "Usuario no en sesión", null);
    } else {
      let loading = this.loadingCtrl.create();
      loading.present();

      this.restService.getToken().timeout(this.restService.timeOver).subscribe(data => {
        if (data == null) {
          loading.dismiss();
          this.alertaService.warnAlert(this.restService.headerValidacion, this.restService.mensajeValidacionAdmin, null);
        } else {
          let body = new HttpParams();

          var a = this.usuario.Id;
          var url = "invoice/email?"+"IdFactura="+factura.id+"&IdEstacion =" + this.idEstacion;
          console.log(url);
          //var urlArmada = "stats/"+this.usuario.IdClient;
          this.restService.restServiceGETToken(url, body, data.toString()).timeout(this.restService.timeOver).subscribe(
            dataRegistro => {
              if (dataRegistro['Response']) {
                this.alertaService.alertaBasica("¡Bien!","Tu factura ha sido enviada a tu correo, favor de revisarlo",null);
              } else if(dataRegistro['Message']!=3){
                this.alertaService.warnAlert(this.restService.headerValidacion, dataRegistro['Message'], null);
              }else{
                this.alertaService.warnAlert(this.restService.headerValidacion, "No se encontraron registros de facturación", null);
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

  sendPdf(factura:any){
    if (this.usuario == null) {
      this.alertaService.warnAlert(this.restService.headerValidacion, "Usuario no en sesión", null);
    } else {
      let loading = this.loadingCtrl.create();
      loading.present();

      this.restService.getToken().timeout(this.restService.timeOver).subscribe(data => {
        if (data == null) {
          loading.dismiss();
          this.alertaService.warnAlert(this.restService.headerValidacion, this.restService.mensajeValidacionAdmin, null);
        } else {
          let body = new HttpParams();

          var a = this.usuario.Id;
          var url = "invoice/pdf?"+"IdFactura="+factura.id+"&IdEstacion =" + this.idEstacion;
          //var urlArmada = "stats/"+this.usuario.IdClient;
          this.restService.restServiceGETToken(url, body, data.toString()).timeout(this.restService.timeOver).subscribe(
            dataRegistro => {
              
              if (dataRegistro['Response'].length != 0) {
                //Agregar la lógica para visualizar pdf ya que aqui se recibe el url
              } else if(dataRegistro['Message']!=3){
                this.alertaService.warnAlert(this.restService.headerValidacion, dataRegistro['Message'], null);
              }else{
                this.alertaService.warnAlert(this.restService.headerValidacion, "No se encontraron registros de facturación", null);
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
  
downloadFactura(factura) {
		    	
  	/*
  	/api/invoice/pdf/ Int:IdFactura, int:IdEstacion,  IdClient =  */  
	
	let fileTransfer: FileTransferObject = this.transfer.create();
	let loading = this.loadingCtrl.create();
      loading.present();

      this.restService.getToken().timeout(this.restService.timeOver).subscribe(data => {
        if (data == null) {
          loading.dismiss();
          this.alertaService.warnAlert(this.restService.headerValidacion, this.restService.mensajeValidacionAdmin, null);
        } else {
          let body = new HttpParams();

          var a = this.usuario.IdClient;
          var url = "invoice/pdf?IdFactura=" + factura.id + "&IdEstacion=" + this.idEstacion + "&IdClient=" + this.usuario.IdClient;
			 this.restService.restServiceGETToken(url, body, data.toString()).timeout(this.restService.timeOver).subscribe(
            dataRegistro => {
              fileTransfer.download(dataRegistro['Response'], this.file.externalDataDirectory + 'file.pdf').then((entry) => {
               //this.alertaService.alertaBasica(this.restService.headerExito, "Se ha descargado correctamente en: " + entry.toURL(), null);
				    	

						this.fileOpener.open(this.file.externalDataDirectory + 'file.pdf', 'application/pdf')
					  	.then(() => console.log("Abrio correctament")/*this.alertaService.alertaBasica(this.restService.headerExito, "Se abrio correctamente", null)*/)
  						.catch(e => this.alertaService.errorAlert(this.restService.headerError, "No se pudo abrir, no existe aplicación compatible " + e, null));				    	
				    	
  					}, (error) => {
    					this.alertaService.errorAlert(this.restService.headerError, "ERROR descarga = " + error, null);
  					});
  					
  					
  					////////////XML
  					
  					
  					
  					////////////XML
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
