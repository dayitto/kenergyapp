import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import { PromocionModel } from '../../models/promocionModel';
import { AbrirnotificacionesService } from '../../services/abrirnotificaciones.service';
import { NotificacionService } from '../../services/notificaciones.service';

/**
 * Generated class for the TerminosPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-terminos',
  templateUrl: 'terminos.html',
})
export class TerminosPage {
  public promocion: PromocionModel;
  constructor(public navCtrl: NavController, public navParams: NavParams, public viewCtrl: ViewController,
    public notificacion: NotificacionService, public mostrarNotif: AbrirnotificacionesService) {
    this.promocion = navParams.get("promocion");
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad TerminosPage');
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }
}
