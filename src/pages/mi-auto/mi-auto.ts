import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import { VehiculoModel } from '../../models/vehiculoModel';
import { AbrirnotificacionesService } from '../../services/abrirnotificaciones.service';
import { NotificacionService } from '../../services/notificaciones.service';

@IonicPage()
@Component({
  selector: 'page-mi-auto',
  templateUrl: 'mi-auto.html',
})
export class MiAutoPage {
  public vehiculo: any = null;
  public qr: string = "";
  constructor(public navCtrl: NavController, public navParams: NavParams, public viewCtrl: ViewController,
    public notificacion: NotificacionService, public mostrarNotif: AbrirnotificacionesService) {
    this.vehiculo = navParams.get("vehiculo");
    this.qr = '' + this.vehiculo.id;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MiAutoPage');
  }

  cancelar(){
    this.viewCtrl.dismiss();
  }
}
