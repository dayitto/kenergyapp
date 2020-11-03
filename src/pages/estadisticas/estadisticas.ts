import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController, LoadingController } from 'ionic-angular';
import { ProductoModel } from '../../models/productoModel';
import { EstadisticaModel } from '../../models/estadisticaModel';
import { RestServiceProvider } from '../../providers/rest-service';
import { AlertaServiceProvider } from '../../providers/alerta-service';
import { HttpParams } from '@angular/common/http';
import { Storage } from '@ionic/storage';
import { AbrirnotificacionesService } from '../../services/abrirnotificaciones.service';
import { NotificacionService } from '../../services/notificaciones.service';

@IonicPage()
@Component({
  selector: 'page-estadisticas',
  templateUrl: 'estadisticas.html',
})
export class EstadisticasPage {
  public idProducto: number = 0;
  public idVehiculo: number = 0;
  public idEstacion: number = 0;
  public idAnio: number = 0;
  public productos: ProductoModel[] = [];
  public vehiculos: ProductoModel[] = [];
  public estaciones: ProductoModel[] = [];
  public anios: any[] = [];
  //Resultados
  public estadisticas: EstadisticaModel[] = [];
  public totales: EstadisticaModel[] = [];
  public estadisticas2: EstadisticaModel[] = [];
  public totales2: EstadisticaModel[] = [];
  //
  public ordenLitros: number = 0;
  public ordenPrecio: number = 0;
  public ordenLitros2: number = 0;
  public ordenRendimiento: number = 0;
  public usuario: any = null;
  public rendimientoPressed: boolean = false;
  public consumoPressed: boolean = false;

  constructor(public navCtrl: NavController, public navParams: NavParams, public localStorage: Storage,
    public viewCtrl:ViewController,
    private restService:RestServiceProvider, private alertaService: AlertaServiceProvider,
    public loadingCtrl: LoadingController,
    public notificacion: NotificacionService, public mostrarNotif: AbrirnotificacionesService) {
    this.productos.push(new ProductoModel());
    this.vehiculos.push(new ProductoModel(0,"Todos"));
    this.estaciones.push(new ProductoModel(0,"Todas"));
    var year = new Date().getFullYear();
    this.idAnio = year;
    this.anios.push({ id: 0, anio: "Todos" });
    for (let index = 2018; index <= year; index++) {
      this.anios.push({ id: index, anio: index });
    }

    this.openSesion();
    /*this.estadisticas.push(new EstadisticaModel("Ene"));
    this.estadisticas.push(new EstadisticaModel("Feb"));
    this.estadisticas.push(new EstadisticaModel("Mar"));
    this.estadisticas.push(new EstadisticaModel("Abr"));
    this.estadisticas.push(new EstadisticaModel("May"));
    this.estadisticas.push(new EstadisticaModel("Jun"));
    this.estadisticas.push(new EstadisticaModel("Jul"));
    this.estadisticas.push(new EstadisticaModel("Ago"));
    this.estadisticas.push(new EstadisticaModel("Sep"));
    this.estadisticas.push(new EstadisticaModel("Oct"));
    this.estadisticas.push(new EstadisticaModel("Nov"));
    this.estadisticas.push(new EstadisticaModel("Dic"));*/

    //this.totales.push({ totalLts: 0, totalPrecio: 0 });
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

  ionViewDidLoad() {
    console.log('ionViewDidLoad EstadisticasPage');
  }

  cancelar(){
    this.viewCtrl.dismiss();
  }

  cargarCombos() {
    console.log(JSON.stringify(this.usuario));
    let loading = this.loadingCtrl.create();
    loading.present();
    this.productos = [];
    this.productos.push(new ProductoModel());
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
              let productos = dataRegistro['Response'].Producto;
              productos.forEach(producto => {
                this.productos.push(new ProductoModel(producto.Id, producto.Nombre));
              });

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

  buscarConsumo() {
    this.estadisticas = [];
   this.totales = [];
   this.ordenLitros = 0;
   this.ordenPrecio = 0;
    let loading = this.loadingCtrl.create();
    loading.present();
    this.restService.getToken().timeout(this.restService.timeOver).subscribe(data => {
      if (data == null) {
        loading.dismiss();
        this.alertaService.warnAlert(this.restService.headerValidacion, this.restService.mensajeValidacionAdmin, null);
      } else {
        let body = new HttpParams();
        var a = this.usuario.Id;
        //var a = 44;
        //body.append("IdClient", a.toString());
        var urlArmada = "despachos/total/regular/" + a +"?";
        //var urlArmada = "stats/"+this.usuario.IdClient;
        body.append("Anio",this.idAnio.toString());
        body.append("IdVehiculo",this.idVehiculo.toString());
        body.append("IdEstación",this.idEstacion.toString());
        body.append("IdProducto",this.idProducto.toString());
        if(this.idAnio != 0) {
        		urlArmada+="Anio="+this.idAnio;
        }
        if(this.idVehiculo != 0) {
        		urlArmada+="&IdVehiculo="+this.idVehiculo;
        }
        if(this.idEstacion != 0) {
        		urlArmada+="&IdEstacion="+this.idEstacion;
        }
        if(this.idProducto != 0) {
        		urlArmada+="&IdProducto="+this.idProducto;
        }
        this.restService.restServiceGETToken(urlArmada, new HttpParams(), data.toString()).timeout(this.restService.timeOver).subscribe(
          dataRegistro => {
            if (Object.keys(dataRegistro['Response']).length != 0) {
              let array = dataRegistro['Response'];
              array.forEach(e => {
                if(e.Nombre == "Total")
                  this.totales.push(new EstadisticaModel(e.Nombre,e.Lts,e.Efectivo));
                else
                  this.estadisticas.push(new EstadisticaModel(e.Nombre,e.Lts,e.Efectivo));
              });
            } else {
              this.alertaService.warnAlert(this.restService.headerValidacion, dataRegistro['Message'] == 3 ? "No existen cargas con los filtros seleccionados." : "Error en búsqueda de estadísticas", null);
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

  buscarRendimiento() {
    this.estadisticas2 = [];
   this.totales2 = [];
   this.ordenLitros2 = 0;
   this.ordenRendimiento = 0;
    let loading = this.loadingCtrl.create();
    loading.present();
    this.restService.getToken().timeout(this.restService.timeOver).subscribe(data => {
      if (data == null) {
        loading.dismiss();
        this.alertaService.warnAlert(this.restService.headerValidacion, this.restService.mensajeValidacionAdmin, null);
      } else {
        var a = this.usuario.Id;
        var urlArmada = "despachos/rendimiento/regular/" + a +"?";
        if(this.idAnio != 0) {
        		urlArmada+="Anio="+this.idAnio;
        }
        if(this.idVehiculo != 0) {
        		urlArmada+="&IdVehiculo="+this.idVehiculo;
        }
        if(this.idProducto != 0) {
        		urlArmada+="&IdProducto="+this.idProducto;
        }
        this.restService.restServiceGETToken(urlArmada, new HttpParams(), data.toString()).timeout(this.restService.timeOver).subscribe(
          dataRegistro => {
            if (Object.keys(dataRegistro['Response']).length != 0) {
              let array = dataRegistro['Response'];
              array.forEach(e => {
                if(e.Fecha == "PROMEDIO")
                  this.totales2.push(new EstadisticaModel(e.Fecha,e.Litros,e.Kilometraje));
                else
                  this.estadisticas2.push(new EstadisticaModel(e.Fecha,e.Litros,e.Kilometraje));
              });
            } else {
              this.alertaService.warnAlert(this.restService.headerValidacion, dataRegistro['Message'] == 3 ? "No existen cargas con los filtros seleccionados." : "Error en búsqueda de estadísticas", null);
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
    let orden1 = this.ordenLitros;
    let orden2 = this.ordenPrecio;
    this.estadisticas.sort(function (a, b) {
      if(tipo == 1){
        if(orden1 != 1){
          if (a.lts > b.lts) {
            return 1;
          }
          if (a.lts < b.lts) {
            return -1;
          }
        }
        else{
          if (a.lts < b.lts) {
            return 1;
          }
          if (a.lts > b.lts) {
            return -1;
          }
        }

      }
      else{
        if(orden2 != 1){
          if (a.precio > b.precio) {
            return 1;
          }
          if (a.precio < b.precio) {
            return -1;
          }
        }
        else{
          if (a.precio < b.precio) {
            return 1;
          }
          if (a.precio > b.precio) {
            return -1;
          }
        }
      }
      return 0;
    });
    if(tipo == 1){
      this.ordenLitros = this.ordenLitros != 1 ? 1 : 2;
      this.ordenPrecio = 0;
    }
    else{
      
      this.ordenPrecio = this.ordenPrecio != 1 ? 1 : 2;
      this.ordenLitros = 0;
    }
  }

  ordenar2(tipo: number = 0){
    let orden1 = this.ordenLitros2;
    let orden2 = this.ordenRendimiento;
    this.estadisticas2.sort(function (a, b) {
      if(tipo == 1){
        if(orden1 != 1){
          if (a.lts > b.lts) {
            return 1;
          }
          if (a.lts < b.lts) {
            return -1;
          }
        }
        else{
          if (a.lts < b.lts) {
            return 1;
          }
          if (a.lts > b.lts) {
            return -1;
          }
        }

      }
      else{
        if(orden2 != 1){
          if (a.precio > b.precio) {
            return 1;
          }
          if (a.precio < b.precio) {
            return -1;
          }
        }
        else{
          if (a.precio < b.precio) {
            return 1;
          }
          if (a.precio > b.precio) {
            return -1;
          }
        }
      }
      return 0;
    });
    if(tipo == 1){
      this.ordenLitros2 = this.ordenLitros2 != 1 ? 1 : 2;
      this.ordenRendimiento = 0;
    }
    else{
      
      this.ordenRendimiento = this.ordenRendimiento != 1 ? 1 : 2;
      this.ordenLitros2 = 0;
    }
  }

  clickRendimiento(){
    this.rendimientoPressed = true;
    this.consumoPressed = false;
    this.buscar();
    this.mostrarInfo();
  }

  clickConsumo(){
    this.rendimientoPressed = false;
    this.consumoPressed = true;
    this.buscar();
  }

  mostrarInfo(){
    this.alertaService.alertaBasica("¡IMPORTANTE!","Es necesario cargar tanque lleno para que el cálculo sea correcto y dar tu kilometraje al despachador antes de realizar tu carga.<br><br>Las siguientes variables podrían afectar el resultado de tu rendimiento:<br><br>a) Uso de aire acondicionado<br>b) Acelerar bruscamente<br>c) Conducir a altas velocidades<br>d) Permanecer en tránsito denso<br>e) Exceso de peso<br>f) Falta de mantenimiento<br>g) Presión incorrecta en llantas<br>h) Conducir de manera deficiente<br>i) Rutina de manejo (Ciudad / Carretera)",null);
  }

  buscar(){
    if(this.rendimientoPressed)
      this.buscarRendimiento();
    if(this.consumoPressed)
      this.buscarConsumo();
  }
}
