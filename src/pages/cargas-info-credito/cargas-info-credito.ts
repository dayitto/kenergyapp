import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import { NotificacionService } from '../../services/notificaciones.service';
import { AbrirnotificacionesService } from '../../services/abrirnotificaciones.service';

@IonicPage()
@Component({
  selector: 'page-cargas-info-credito',
  templateUrl: 'cargas-info-credito.html',
})
export class CargasInfoCreditoPage {
  public carga:any=null;
  constructor(public navCtrl: NavController, public navParams: NavParams,public viewCtrl: ViewController
    , public notificacion: NotificacionService, public mostrarNotif: AbrirnotificacionesService) {
    this.carga = navParams.get("carga");
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CargasInfoCreditoPage');
  }
}
