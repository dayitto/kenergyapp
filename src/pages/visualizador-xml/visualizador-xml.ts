import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { NotificacionService } from '../../services/notificaciones.service';

/**
 * Generated class for the VisualizadorXmlPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-visualizador-xml',
  templateUrl: 'visualizador-xml.html',
})
export class VisualizadorXmlPage {
  public xml: string = "";

  constructor(public navCtrl: NavController, public navParams: NavParams,
    public notificacion: NotificacionService) {
    this.xml = navParams.get("xml");
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad VisualizadorXmlPage');
  }

}
