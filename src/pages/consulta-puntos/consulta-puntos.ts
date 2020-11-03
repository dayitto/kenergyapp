import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import { ProductoModel } from '../../models/productoModel';
import { AlertaServiceProvider } from '../../providers/alerta-service';
import { RestServiceProvider } from '../../providers/rest-service';
import { HttpParams } from '@angular/common/http';
import { Storage } from '@ionic/storage';

@IonicPage()
@Component({
  selector: 'page-consulta-puntos',
  templateUrl: 'consulta-puntos.html',
})
export class ConsultaPuntosPage {
  public infoPuntos: any[] = [];
  public totalPuntos: number = 240;
  public vehiculos: ProductoModel[] = [];
  public idVehiculo: number = 0;
  public usuario: any = null;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public localStorage: Storage,
    private alertaService: AlertaServiceProvider,
    private restService: RestServiceProvider,
    public loadingCtrl: LoadingController) {
    this.openSesion();
  }

  openSesion() {
    this.localStorage.ready().then(() => {
      this.localStorage.get(`@userSession`).then((data) => {
        if (data != null) {
          this.usuario = data;
          this.cargarCombos();
          this.cargarRegistros();
        } else {
          this.alertaService.warnAlert(this.restService.headerValidacion, "Usuario sin sesión, no se cargarán sus datos", null);
        }
      });
    });
  }
  cargarCombos() {
    let loading = this.loadingCtrl.create();
    loading.present();
    this.vehiculos = [];
    this.vehiculos.push(new ProductoModel(0, "Vehículo"));
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
    console.log('ionViewDidLoad ConsultaPuntosPage');
  }

  consultarPuntos() {
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
          var url = "puntos/" + this.usuario.Id;
          //var urlArmada = "stats/"+this.usuario.IdClient;
          this.restService.restServiceGETToken(url, body, data.toString()).timeout(this.restService.timeOver).subscribe(
            dataRegistro => {
              if (dataRegistro['Response']) {
                this.totalPuntos = dataRegistro['Response'];
                this.cargarRegistros();
              } else if (dataRegistro['Message'] != 3) {
                this.alertaService.warnAlert(this.restService.headerValidacion, dataRegistro['Message'], null);
              } else {
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

  cargarRegistros() {
    if (this.usuario == null) {
      this.alertaService.warnAlert(this.restService.headerValidacion, "Usuario no en sesión", null);
    } else {
      let loading = this.loadingCtrl.create();
      loading.present();
      this.infoPuntos = [];
      this.restService.getToken().timeout(this.restService.timeOver).subscribe(data => {
        if (data == null) {
          loading.dismiss();
          this.alertaService.warnAlert(this.restService.headerValidacion, this.restService.mensajeValidacionAdmin, null);
        } else {
          let body = new HttpParams();

          var a = this.usuario.Id;
          var url = "puntos/detail/" + this.usuario.Id;
          //var urlArmada = "stats/"+this.usuario.IdClient;
          this.restService.restServiceGETToken(url, body, data.toString()).timeout(this.restService.timeOver).subscribe(
            dataRegistro => {
              if (Object.keys(dataRegistro['Response']).length != 0) {
                let info = dataRegistro['Response'];
                info.forEach(informacion => {
                  let arrayDespachos: any[] = [];
                  informacion.Despachos.forEach(despacho => {
                    arrayDespachos.push({ fecha: despacho.Fecha, litros: despacho.Litros, precio: despacho.Efectivo, puntos: despacho.Puntos });
                  });
                  this.infoPuntos.push({
                    modelo: informacion.Nombre, puntos: informacion.Puntos, informacion: arrayDespachos
                  });
                });
              } else if (dataRegistro['Message'] != 3) {
                this.alertaService.warnAlert(this.restService.headerValidacion, dataRegistro['Message'], null);
              } else {
                this.alertaService.warnAlert(this.restService.headerValidacion, "No se encontraron registros", null);
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
