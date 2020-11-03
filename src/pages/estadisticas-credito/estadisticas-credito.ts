import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import { ProductoModel } from '../../models/productoModel';
import { EstadisticaModel } from '../../models/estadisticaModel';
import { AlertaServiceProvider } from '../../providers/alerta-service';
import { RestServiceProvider } from '../../providers/rest-service';
import { Storage } from '@ionic/storage';
import { HttpParams } from '@angular/common/http';
import { NotificacionService } from '../../services/notificaciones.service';
import { AbrirnotificacionesService } from '../../services/abrirnotificaciones.service';

@IonicPage()
@Component({
  selector: 'page-estadisticas-credito',
  templateUrl: 'estadisticas-credito.html',
})
export class EstadisticasCreditoPage {
  public idProducto: number = 0;
  public idChofer: number = 0;
  public idVehiculo: number = 0;
  public idEstacion: number = 0;
  public idAnio: number = 0;
  public idMes: number = 0;
  public productos: ProductoModel[] = [];
  public vehiculos: ProductoModel[] = [];
  public estaciones: ProductoModel[] = [];
  public choferes: ProductoModel[] = [];
  public anios: any[] = [];
  public meses: any[] = [];
  //
  public estadisticas: EstadisticaModel[] = [];
  public totales: any[] = [];
  //
  public usuario: any = null;

  constructor(public navCtrl: NavController, public navParams: NavParams, public localStorage: Storage,
    public alertaService: AlertaServiceProvider, public restService: RestServiceProvider,
    public loadingCtrl: LoadingController, public notificacion: NotificacionService, public mostrarNotif: AbrirnotificacionesService) {
    this.meses = this.returnMeses();
    this.productos.push(new ProductoModel(0, "Todos"));
    this.vehiculos.push(new ProductoModel(0, "Todos"));
    this.estaciones.push(new ProductoModel(0, "Todas"));
    this.choferes.push(new ProductoModel(0, "Todos"));
    var year = new Date().getFullYear();
    this.idAnio = year;
    this.anios.push({ id: 0, anio: "Seleccionar" });
    for (let index = 1980; index <= year; index++) {
      this.anios.push({ id: index, anio: index });
    }
    /*this.estadisticas.push(new EstadisticaModel("Ene", 223999, 1200999));
    this.estadisticas.push(new EstadisticaModel("Feb"));
    this.estadisticas.push(new EstadisticaModel("MAr"));
    this.estadisticas.push(new EstadisticaModel("Abr"));
    this.estadisticas.push(new EstadisticaModel("May"));
    this.estadisticas.push(new EstadisticaModel("Jun"));
    this.estadisticas.push(new EstadisticaModel("Jul"));
    this.estadisticas.push(new EstadisticaModel("Ago"));
    this.estadisticas.push(new EstadisticaModel("Sep"));
    this.estadisticas.push(new EstadisticaModel("Oct"));
    this.estadisticas.push(new EstadisticaModel("Nov"));
    this.estadisticas.push(new EstadisticaModel("Dic"));*/

    //this.totales.push({ totalLts: 1123999, totalPrecio: 25788999 });
    this.openSesion();
  }

  openSesion() {
    this.localStorage.ready().then(() => {
      this.localStorage.get(`@userSession`).then((data) => {
        if (data != null) {
          this.usuario = data;
          this.cargarCombos();
          //this.cargarEdosCuenta();
        } else {
          this.alertaService.warnAlert(this.restService.headerValidacion, "Usuario sin sesión, no se cargarán sus datos", null);
        }
      });
    });
  }

  cargarCombos() {
    let loading = this.loadingCtrl.create();
    loading.present();
    this.productos = [];
    this.productos.push(new ProductoModel(0, "Todos"));
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
        //body.append("IdClient", a.toString());
        var urlArmada = "stats/"+a;
        console.log(urlArmada);
        //var urlArmada = "stats/"+this.usuario.IdClient;
        this.restService.restServiceGETToken(urlArmada, body, data.toString()).timeout(this.restService.timeOver).subscribe(
          dataRegistro => {
            if (Object.keys(dataRegistro['Response']).length != 0) {
              let productos = dataRegistro['Response'].Producto;
              productos.forEach(producto => {
                this.productos.push(new ProductoModel(producto.Id,producto.Nombre));
              });

              let estaciones = dataRegistro['Response'].Estacion;
              estaciones.forEach(estacion => {
                this.estaciones.push(new ProductoModel(estacion.Id,estacion.Nombre));
              });

              let choferes = dataRegistro['Response'].Chofer;
              choferes.forEach(chofer => {
                this.choferes.push(new ProductoModel(chofer.Id,chofer.Nombre));
              });

              let vehiculos = dataRegistro['Response'].Vehiculo;
              vehiculos.forEach(vehiculo => {
                this.vehiculos.push(new ProductoModel(vehiculo.Id,vehiculo.Nombre));
              });
					
              this.buscar();
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

  returnMeses() {
    var meses = [];
    meses.push({
      id: 0,
      nombre: "Todos"
    });
    meses.push({
      id: 1,
      nombre: "Enero"
    });
    meses.push({
      id: 2,
      nombre: "Febrero"
    });
    meses.push({
      id: 3,
      nombre: "Marzo"
    });
    meses.push({
      id: 4,
      nombre: "Abril"
    });
    meses.push({
      id: 5,
      nombre: "Mayo"
    });
    meses.push({
      id: 6,
      nombre: "Junio"
    });
    meses.push({
      id: 7,
      nombre: "Julio"
    });
    meses.push({
      id: 8,
      nombre: "Agosto"
    });
    meses.push({
      id: 9,
      nombre: "Septiembre"
    });
    meses.push({
      id: 10,
      nombre: "Octubre"
    });
    meses.push({
      id: 11,
      nombre: "Noviembre"
    });
    meses.push({
      id: 12,
      nombre: "Diciembre"
    });
    return meses;
  }

  returnTotalLts(estadisticas:EstadisticaModel[]){
    let suma = 0;
    estadisticas.forEach(e => {
      suma+=e.lts;
    });
    return suma;
  }

  returnTotalPrecios(estadisticas:EstadisticaModel[]){
    let suma = 0;
    estadisticas.forEach(e => {
      suma+=e.precio;
    });
    return suma;
  }

  buscar(){
    //despachos/total
    if(this.usuario==null){
      this.alertaService.warnAlert(this.restService.headerValidacion,"Usuario no en sesión",null);
    }else{
      if(this.idAnio==0){
        this.alertaService.warnAlert(this.restService.headerValidacion,"Favor de seleccionar el año",null);
        return;
      }
      let loading = this.loadingCtrl.create();
      loading.present();
      this.estadisticas = [];
      this.totales = [];
      this.restService.getToken().timeout(this.restService.timeOver).subscribe(data => {
        if (data == null) {
          loading.dismiss();
          this.alertaService.warnAlert(this.restService.headerValidacion, this.restService.mensajeValidacionAdmin, null);
        } else {
          let body = new HttpParams();
          
          var a = this.usuario.IdClient;
          /**
           Int:IdClient (Requerido), Int:Anio(requerido), int:IdVehiculo, int:IdEstacion, int:IdProducto,  
           
           */
          var url = "despachos/total?IdClient="+a+"&Anio="+this.idAnio;
          /*body.append("IdClient", a.toString());
          body.append("Anio",this.idAnio.toString());*/
          if(this.idVehiculo != 0){
            url+="&IdVehiculo="+this.idVehiculo;
          }
          if(this.idEstacion != 0){
            //body.append("IdEstacion",this.idEstacion.toString());
            url+="&IdEstacion="+this.idEstacion;
          }
          if(this.idProducto != 0){
            url+="&IdProducto="+this.idProducto;
          }
          if(this.idChofer != 0){
            url+="&IdChofer="+this.idChofer;
          }
          if(this.idMes != 0) {
				url+="&Mes="+this.idMes;
          }
          //var urlArmada = "stats/"+this.usuario.IdClient;
          console.log(url);
          this.restService.restServiceGETToken(url, body, data.toString()).timeout(this.restService.timeOver).subscribe(
            dataRegistro => {
              if (Object.keys(dataRegistro['Response']).length != 0) {
                let totales = dataRegistro['Response'];
                /**
                 * Efectivo: 1603.256
  Lts: 27336.55
  Nombre: "Ene"
                 */
                totales.forEach(estadistica => {
                  this.estadisticas.push(new EstadisticaModel(estadistica.Nombre,estadistica.Lts,estadistica.Efectivo));
                });
                this.totales.push({ totalLts: this.returnTotalLts(this.estadisticas), totalPrecio: this.returnTotalPrecios(this.estadisticas) });
              } else {
                this.alertaService.warnAlert(this.restService.headerValidacion, "No se cargaron sus estadísticos", null);
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
}
