import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import { EstadoCuentaModel } from '../../models/estadoCuentaModel';
import { Storage } from '@ionic/storage';
import { AlertaServiceProvider } from '../../providers/alerta-service';
import { RestServiceProvider } from '../../providers/rest-service';
import { HttpParams } from '@angular/common/http';
import { NotificacionService } from '../../services/notificaciones.service';
import { AbrirnotificacionesService } from '../../services/abrirnotificaciones.service';

@IonicPage()
@Component({
  selector: 'page-estado-cuenta',
  templateUrl: 'estado-cuenta.html',
})
export class EstadoCuentaPage {
  public edoCuentas: EstadoCuentaModel[] = [];
  public pendienteFacturarTotal: number = 0.00;
  public saldoFacturadoTotal: number = 0.00;
  public saldoAcumuladoTotal: number = 0.00;
  public saldoDisponibleTotal: number = 0.00;

  public usuario: any = null;

  constructor(public navCtrl: NavController, public navParams: NavParams, public localStorage: Storage,
    public alertaService: AlertaServiceProvider, public restService: RestServiceProvider,
    public loadingCtrl: LoadingController, public notificacion: NotificacionService, public mostrarNotif: AbrirnotificacionesService) {
    this.openSesion();
    
  }

  openSesion() {
    this.localStorage.ready().then(() => {
      this.localStorage.get(`@userSession`).then((data) => {
        if (data != null) {
          this.usuario = data;
          this.cargarEdosCuenta();
        } else {
          this.alertaService.warnAlert(this.restService.headerValidacion, "Usuario sin sesión, no se cargará su estado de cuenta", null);
        }
      });
    });

  }

  cargarEdosCuenta() {
    this.edoCuentas = [];
    //status/account/detail/
    var urlArmada = "status/account/detail/" + this.usuario.IdClient;
    console.log(urlArmada);
    console.log(this.usuario.IdClient);

    let loading = this.loadingCtrl.create();
    loading.present();
    this.restService.getToken().timeout(this.restService.timeOver).subscribe(data => {
      if (data == null) {
        loading.dismiss();
        this.alertaService.warnAlert(this.restService.headerValidacion, this.restService.mensajeValidacionAdmin, null);
      } else {
          let body = new HttpParams();
          //body.append("IdClient", a.toString());
          this.restService.restServiceGETToken(urlArmada, body, data.toString()).timeout(this.restService.timeOver).subscribe(
            dataRegistro => {
              if (Object.keys(dataRegistro['Response']).length != 0) {
                console.log(JSON.stringify(dataRegistro['Response']));
                 this.pendienteFacturarTotal = dataRegistro['Response'].totales.PendienteFacturar;
                 this.saldoFacturadoTotal = dataRegistro['Response'].totales.SaldoFacturado;
                 this.saldoAcumuladoTotal = dataRegistro['Response'].totales.SaldoAcumulado;
                 let sucursales = dataRegistro['Response'].totales.Sucursales;
                 sucursales.forEach(sucursal => {
                   console.log(JSON.stringify(sucursal));
                  if(!sucursal.Nombre.includes("ORIZABA"))
                    this.saldoDisponibleTotal += +sucursal.SaldoDisponible;
                  this.edoCuentas.push(
                    new EstadoCuentaModel(
                      sucursal.SaldoFavor, sucursal.PendienteFacturar, sucursal.SaldoFacturado, sucursal.SaldoAcumulado, sucursal.SaldoDisponible, sucursal.Nombre +" "+sucursal.Ubicacion, sucursal.LimiteCredito)
                      );
                    
                    });
                //this.combustibles.push(new CombustibleModel("Ixtaczoquitlan", 88.88, 88.88, 88.88, true));
              } else {
                this.alertaService.warnAlert(this.restService.headerValidacion, "No se encontró su estado de cuenta", null);
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

}
