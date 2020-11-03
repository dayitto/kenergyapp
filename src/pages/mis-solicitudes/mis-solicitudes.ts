import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import { AlertaServiceProvider } from '../../providers/alerta-service';
import { RestServiceProvider } from '../../providers/rest-service';
import { Storage } from '@ionic/storage';

@IonicPage()
@Component({
  selector: 'page-mis-solicitudes',
  templateUrl: 'mis-solicitudes.html',
})
export class MisSolicitudesPage {
  public usuario: any = null;

  constructor(public navCtrl: NavController, public navParams: NavParams,
    public localStorage: Storage,
    public alertaService: AlertaServiceProvider, public restService: RestServiceProvider,
    public loadingCtrl: LoadingController) {
    this.openSesion();
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

  ionViewDidLoad() {
    console.log('ionViewDidLoad MisSolicitudesPage');
  }

}
