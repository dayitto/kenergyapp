import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import { NotificacionService } from '../../services/notificaciones.service';

/**
 * Generated class for the NotificacionesPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-notificaciones',
  templateUrl: 'notificaciones.html',
})
export class NotificacionesPage {

  constructor(public navCtrl: NavController, public navParams: NavParams, public viewCtrl: ViewController, 
    public notificacion: NotificacionService) {
    
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad NotificacionesPage');
  }

  cancelar() {
    this.viewCtrl.dismiss();
  }
  
  borrarTodasNotificaciones() {
      this.notificacion.notificaciones = [];
  }
  
  borrarNotificacion(id: number) {
    for (let index = 0; index < this.notificacion.numInicial; index++) {
      if(this.notificacion.notificaciones[index] != null) {
        if(id == this.notificacion.notificaciones[index].id) {
          if(!this.notificacion.notificaciones[index].visto)
            this.notificacion.num--;
          this.notificacion.notificaciones.splice(index, 1);
        }
      }	
    }
  }

  mostrarNotificacion(id: number) {
    for (let index = 0; index < this.notificacion.numInicial; index++) {
      if(this.notificacion.notificaciones[index] != null) {
        if(id == this.notificacion.notificaciones[index].id) {
          this.notificacion.notificaciones[index].mostrar = this.notificacion.notificaciones[index].mostrar ? false: true;
          if(!this.notificacion.notificaciones[index].visto)
            this.notificacion.num--;
          this.notificacion.notificaciones[index].visto = true;
        }
      }	
    }
    }
}
