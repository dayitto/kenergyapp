import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController, LoadingController } from 'ionic-angular';
import { ProductoModel } from '../../models/productoModel';
import { VehiculoModel } from '../../models/vehiculoModel';
import { VehiculosInfoCreditoPage } from '../vehiculos-info-credito/vehiculos-info-credito';
import { AlertaServiceProvider } from '../../providers/alerta-service';
import { RestServiceProvider } from '../../providers/rest-service';
import { Storage } from '@ionic/storage';
import { HttpParams } from '@angular/common/http';
import { NotificacionService } from '../../services/notificaciones.service';
import { AbrirnotificacionesService } from '../../services/abrirnotificaciones.service';

@IonicPage()
@Component({
  selector: 'page-vehiculos-credito',
  templateUrl: 'vehiculos-credito.html',
})
export class VehiculosCreditoPage {
  public idEstado: number = null;
  public estados: ProductoModel[] = [];
  public vehiculos: any[] = [];
  public vehiculos2: any[] = [];
  public ordenPlaca: number = 1;
  public ordenDesc: number = 0;
  public busquedaVeh: string = "";

  public usuario: any = 1;
  constructor(public navCtrl: NavController, public navParams: NavParams, public modalController: ModalController,
    public localStorage: Storage,
    public alertaService: AlertaServiceProvider, public restService: RestServiceProvider,
    public loadingCtrl: LoadingController,
    public notificacion: NotificacionService, public mostrarNotif: AbrirnotificacionesService) {
    //0-Todos, 2-Cargando, 3-Suspendido, 4-Uso Interno, -1-Todos los estados
    this.estados.push(new ProductoModel(0, "Todos"));
    //this.estados.push(new ProductoModel(2, "Cargando"));
    this.estados.push(new ProductoModel(4, "Activo"));
    this.estados.push(new ProductoModel(3, "Suspendido"));
    //this.estados.push(new ProductoModel(-1, "Todos los estados"));

    //this.placas.push(new ProductoModel(0,"Placas"));
    //this.vehiculos = this.returnVehiculos();
    //this.cargarCombos(); 
	 this.idEstado = 4;
    this.openSesion();
  }

  buscar() {
    if (this.usuario == null) {
      this.alertaService.warnAlert(this.restService.headerValidacion, "Usuario no en sesión", null);
    } else {
      let loading = this.loadingCtrl.create();
      loading.present();
      this.vehiculos = [];
      this.restService.getToken().timeout(this.restService.timeOver).subscribe(data => {
        if (data == null) {
          loading.dismiss();
          this.alertaService.warnAlert(this.restService.headerValidacion, this.restService.mensajeValidacionAdmin, null);
        } else {
          let body = new HttpParams();

          var a = this.usuario.IdClient;
          //var a = 44;
          /**
           Int:IdClient (Requerido), Int:Anio(requerido), int:IdVehiculo, int:IdEstacion, int:IdProducto,  
           
           */
          var url = "vehicle?IdClient=" + a;
          /*body.append("IdClient", a.toString());
          body.append("Anio",this.idAnio.toString());*/
          if (this.idEstado != null) {
            //body.append("IdEstacion",this.idEstacion.toString());
            url += "&Estado=" + this.idEstado;
          }
          //var urlArmada = "stats/"+this.usuario.IdClient;
          this.restService.restServiceGETToken(url, body, data.toString()).timeout(this.restService.timeOver).subscribe(
            dataRegistro => {
              if (Object.keys(dataRegistro['Response']).length != 0) {
                let vehiculos = dataRegistro['Response'];
                vehiculos.forEach(vehiculo => {
                  let v = {
                    placa: vehiculo.Placas,
                    ultimoKilometraje: vehiculo.Kilometraje,
                    descripcion: vehiculo.Alias,
                    id: vehiculo.Id
                  };
                  this.vehiculos.push(v);
                  this.vehiculos2.push(v);
                });

                this.vehiculos.sort(function (a, b) {
  if (a.placa > b.placa) {
    return 1;
  }
  if (a.placa < b.placa) {
    return -1;
  }
  // a must be equal to b
  return 0;
});
this.vehiculos2.sort(function (a, b) {
  if (a.placa > b.placa) {
    return 1;
  }
  if (a.placa < b.placa) {
    return -1;
  }
  // a must be equal to b
  return 0;
});
              } else {
                this.alertaService.warnAlert("Sin vehículos", "No se encontraron registros", null);
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

  openSesion() {
    this.localStorage.ready().then(() => {
      this.localStorage.get(`@userSession`).then((data) => {
        if (data != null) {
          this.usuario = data;
        } else {
          this.alertaService.warnAlert(this.restService.headerValidacion, "Usuario sin sesión, no se cargarán sus datos", null);
        }
      });
    });

  }

  returnVehiculos() {
    var vehiculos = [];
    let vehiculo = new VehiculoModel();
    vehiculo.Placa = "X8ZS4";
    vehiculo.Kilometraje = 9358;
    vehiculo.descripcion = "Moto Suzuki Negra";
    vehiculos.push(vehiculo);
    let vehiculo2 = new VehiculoModel();
    vehiculo2.Placa = "XV01753";
    vehiculo2.Kilometraje = 51230;
    vehiculo2.descripcion = "Ford F-200 Roja ";
    vehiculos.push(vehiculo2);
    return vehiculos;
  }

  openVehiculo(vehiculo: any) {
    var url = "vehicle/detail?IdClient=";

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
        /**
         Int:IdClient (Requerido), Int:Anio(requerido), int:IdVehiculo, int:IdEstacion, int:IdProducto,  
         
         */
        url += a + `&IdVehiculo=${vehiculo.id}`;
        let n = 42;
        var ab = n.toString(2);
        this.restService.restServiceGETToken(url, body, data.toString()).timeout(this.restService.timeOver).subscribe(
          dataRegistro => {

            if (Object.keys(dataRegistro['Response']).length != 0) {
              this.navCtrl.push(VehiculosInfoCreditoPage, { vehiculo: dataRegistro['Response'] });
            } else {
              this.alertaService.warnAlert(this.restService.headerValidacion, "No se encontró información del vehículo", null);
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
    console.log('ionViewDidLoad VehiculosCreditoPage');
    this.buscar();
  }

  ordenar(tipo: number = 0){
    let orden1 = this.ordenPlaca;
    let orden2 = this.ordenDesc;
    this.vehiculos.sort(function (a, b) {
      if(tipo == 1){
        if(orden2 != 1){
          if (a.descripcion > b.descripcion) {
            return 1;
          }
          if (a.descripcion < b.descripcion) {
            return -1;
          }
        }
        else{
          if (a.descripcion < b.descripcion) {
            return 1;
          }
          if (a.descripcion > b.descripcion) {
            return -1;
          }
        }

      }
      else{
        if(orden1 != 1){
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
      return 0;
    });
    if(tipo == 1){
      this.ordenDesc = this.ordenDesc != 1 ? 1 : 2;
      this.ordenPlaca = 0;
    }
    else{
      this.ordenPlaca = this.ordenPlaca != 1 ? 1 : 2;
      this.ordenDesc = 0;
    }
  }

  buscarInput(){
    this.vehiculos = this.vehiculos2.filter(veh => veh.descripcion.toLowerCase().includes(this.busquedaVeh.toLowerCase()) || 
    veh.placa.toLowerCase().includes(this.busquedaVeh.toLowerCase()));
    this.ordenPlaca = 1;
    this.ordenDesc = 0;
  }

}
