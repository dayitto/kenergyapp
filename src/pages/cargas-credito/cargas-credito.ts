import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import { ProductoModel } from '../../models/productoModel';
import { CargasInfoCreditoPage } from '../cargas-info-credito/cargas-info-credito';
import { AlertaServiceProvider } from '../../providers/alerta-service';
import { RestServiceProvider } from '../../providers/rest-service';
import { Storage } from '@ionic/storage';
import { HttpParams } from '@angular/common/http';
import { NotificacionService } from '../../services/notificaciones.service';
import { AbrirnotificacionesService } from '../../services/abrirnotificaciones.service';

@IonicPage()
@Component({
  selector: 'page-cargas-credito',
  templateUrl: 'cargas-credito.html',
})
export class CargasCreditoPage {
  public idEstacion = 1;
  public idProducto = 0;
  public idVehiculo = 0;
  public idChofer = 0;
  public idFiltro = 1;

  public desde: String = "";
  public hasta: String = new Date().toISOString();
  //
  public estaciones: ProductoModel[] = [];
  public productos: ProductoModel[] = [];
  public vehiculos: ProductoModel[] = [];
  public choferes: ProductoModel[] = [];
  public cargas: any[] = [];
  public filtros: any[] = [];

  public usuario: any = null;
  public ordenFecha: number = 0;
  public ordenPlaca: number = 0;

  constructor(public navCtrl: NavController, public navParams: NavParams,
    public localStorage: Storage,
    public alertaService: AlertaServiceProvider, public restService: RestServiceProvider,
    public loadingCtrl: LoadingController, public notificacion: NotificacionService, public mostrarNotif: AbrirnotificacionesService) {
    this.estaciones.push(new ProductoModel(0, "Todos"));
    this.productos.push(new ProductoModel(0, "Todos"));
    this.vehiculos.push(new ProductoModel(0, "Todos"));
    this.choferes.push(new ProductoModel(0, "Todos"));
    this.filtros.push({id: 0, filtro: "Ultimos 7 días"});
    this.filtros.push({id: 1, filtro: "Este mes"});
    this.filtros.push({id: 2, filtro: "Ultimos 30 días"});
    this.filtros.push({id: 3, filtro: "Ultimos 3 meses"});

    /*this.cargas.push({fecha:"12-10-18",placa:"979-WEDE",lts:45.85,precio:1008.70});
    this.cargas.push({fecha:"11-10-18",placa:"979-WEDE",lts:45.85,precio:1008.70});
    this.cargas.push({fecha:"10-10-18",placa:"979-WEDE",lts:45.85,precio:1008.70});
    this.cargas.push({fecha:"09-10-18",placa:"979-WEDE",lts:45.85,precio:1008.70});
    this.cargas.push({fecha:"08-10-18",placa:"979-WEDE",lts:45.85,precio:1008.70});
    this.cargas.push({fecha:"07-10-18",placa:"979-WEDE",lts:45.85,precio:1008.70});
    this.cargas.push({fecha:"06-10-18",placa:"979-WEDE",lts:45.85,precio:1008.70});
    this.cargas.push({fecha:"05-10-18",placa:"979-WEDE",lts:45.85,precio:1008.70});
    this.cargas.push({fecha:"04-10-18",placa:"979-WEDE",lts:45.85,precio:1008.70});
    this.cargas.push({fecha:"03-10-18",placa:"979-WEDE",lts:45.85,precio:1008.70});
    this.cargas.push({fecha:"02-10-18",placa:"979-WEDE",lts:45.85,precio:1008.70});
    this.cargas.push({fecha:"01-10-18",placa:"979-WEDE",lts:45.85,precio:1008.70});
    this.cargas.push({fecha:"31-09-18",placa:"979-WEDE",lts:45.85,precio:1008.70});
    this.cargas.push({fecha:"30-09-18",placa:"979-WEDE",lts:45.85,precio:1008.70});*/
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
    console.log(desdeDate.toISOString());
    let mes = desdeDate.getMonth()+1 < 10 ? "0" + (desdeDate.getMonth()+1) : "" + (desdeDate.getMonth()+1);
    console.log(mes);
    this.desde = desdeDate.getFullYear() + "-" + mes + "-01";
    console.log(this.desde);
    this.productos = [];
    this.productos.push(new ProductoModel());
    this.vehiculos = [];
    this.vehiculos.push(new ProductoModel(0, "Todos"));
    this.estaciones = [];
    this.estaciones.push(new ProductoModel(0, "Todos"));
    this.choferes = [];
    this.choferes.push(new ProductoModel(0, "Todos"));
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
              let productos = dataRegistro['Response'].Producto;
              productos.forEach(producto => {
                this.productos.push(new ProductoModel(producto.Id, producto.Nombre));
              });

              let estaciones = dataRegistro['Response'].Estacion;
              estaciones.forEach(estacion => {
                this.estaciones.push(new ProductoModel(estacion.Id, estacion.Nombre));
              });

              let choferes = dataRegistro['Response'].Chofer;
              choferes.forEach(chofer => {
                this.choferes.push(new ProductoModel(chofer.Id, chofer.Nombre));
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
    //this.buscar();
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

          var a = this.usuario.IdClient;
          //var a = 44;
          //this.idEstacion = 1;
          var url = "despachos?Desde=" + fechaFormat+"&Hasta="+fechaFormatHasta+"&IdEstacion="+this.idEstacion+"&IdClient="+a;
          console.log(url);
          /**
     * String:Desde (Requerido), String:Hasta(Requerido), 
     * Int:IdProducto, Int:IdEstacion(Requerido), Int:Chofer,
     *  Int:IdVehiculo, Int:IdClient(Requerido)
     */
          if (this.idProducto != 0) {
            url += "&IdProducto=" + this.idProducto;
          }
          if (this.idChofer != 0) {
            url += "&IdChofer=" + this.idChofer;
          }
          if (this.idVehiculo != 0) {
            url += "&IdVehiculo=" + this.idVehiculo;
          }
          //var urlArmada = "stats/"+this.usuario.IdClient;
          this.restService.restServiceGETToken(url, body, data.toString()).timeout(this.restService.timeOver).subscribe(
            dataRegistro => {
              if (Object.keys(dataRegistro['Response']).length != 0) {
                let cargas = dataRegistro['Response'];
                cargas.forEach(carga => {
                  this.cargas.push({fecha:carga.Fecha,placa:carga.Placas,lts:carga.Litros,precio:carga.Efectivo,id:carga.Id,idEstacion:carga.IdEstacion});
                });
                this.ordenFecha = 1;
                this.ordenar();
              } else if(dataRegistro['Message']!=3){
                this.alertaService.warnAlert(this.restService.headerValidacion, dataRegistro['Message'], null);
              }/*else{
                this.alertaService.warnAlert(this.restService.headerValidacion, "Seleccione una estación para consulta de datos", null);
              }*/
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
        var url = "despachos/detail?IdDespacho="+carga.id + "&IdEstacion="+carga.idEstacion;
        this.restService.restServiceGETToken(url, body, data.toString()).timeout(this.restService.timeOver).subscribe(
          dataRegistro => {
            if (Object.keys(dataRegistro['Response']).length != 0) {
              let carga = dataRegistro['Response'];
              //loading.dismiss();
              this.navCtrl.push(CargasInfoCreditoPage,{carga:dataRegistro['Response']});
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

  ordenar(tipo: number = 0){
    let orden1 = this.ordenFecha;
    let orden2 = this.ordenPlaca;
    this.cargas.sort(function (a, b) {
      if(tipo == 1){
        if(orden2 != 1){
          if (a.placa > b.placa) {
            return 1;
          }
          if (a.placa < b.placa) {
            return -1;
          }
        }
        else{
          if (a.placa < b.placa) {
            return 1;
          }
          if (a.placa > b.placa) {
            return -1;
          }
        }

      }
      else{
        if(orden1 != 1){
          if (new Date("20" + a.fecha.substr(6,2) + "-" + a.fecha.substr(3,2) + "-" + a.fecha.substr(0,2)) > new Date("20" + b.fecha.substr(6,2) + "-" + b.fecha.substr(3,2) + "-" + b.fecha.substr(0,2))) {
            return 1;
          }
          if (new Date("20" + a.fecha.substr(6,2) + "-" + a.fecha.substr(3,2) + "-" + a.fecha.substr(0,2)) < new Date("20" + b.fecha.substr(6,2) + "-" + b.fecha.substr(3,2) + "-" + b.fecha.substr(0,2))) {
            return -1;
          }
        }
        else{
          if (new Date("20" + a.fecha.substr(6,2) + "-" + a.fecha.substr(3,2) + "-" + a.fecha.substr(0,2)) < new Date("20" + b.fecha.substr(6,2) + "-" + b.fecha.substr(3,2) + "-" + b.fecha.substr(0,2))) {
            return 1;
          }
          if (new Date("20" + a.fecha.substr(6,2) + "-" + a.fecha.substr(3,2) + "-" + a.fecha.substr(0,2)) > new Date("20" + b.fecha.substr(6,2) + "-" + b.fecha.substr(3,2) + "-" + b.fecha.substr(0,2))) {
            return -1;
          }
        }
      }
      return 0;
    });
    if(tipo == 1){
      this.ordenPlaca = this.ordenPlaca != 1 ? 1 : 2;
      this.ordenFecha = 0;
    }
    else{
      
      this.ordenFecha = this.ordenFecha != 1 ? 1 : 2;
      this.ordenPlaca = 0;
    }
  }

  cambiarFiltroFecha(){
    let desdeDate: Date = new Date();
    if(this.idFiltro == 0){
        desdeDate.setDate(desdeDate.getDate() - 7);
        this.desde = desdeDate.toISOString();
    }
    if(this.idFiltro == 1){
      let mes = desdeDate.getMonth()+1 < 10 ? "0" + (desdeDate.getMonth()+1) : "" + (desdeDate.getMonth()+1);
      this.desde = desdeDate.getFullYear() + "-" + mes + "-01";
    }
    if(this.idFiltro == 2){
      desdeDate.setDate(desdeDate.getDate() - 30);
      this.desde = desdeDate.toISOString();
    }
    if(this.idFiltro == 3){
      desdeDate.setDate(desdeDate.getDate() - 90);
      this.desde = desdeDate.toISOString();
    }
  }
}
