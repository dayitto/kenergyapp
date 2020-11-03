import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the AgregaAutoInfoPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-agrega-auto-info',
  templateUrl: 'agrega-auto-info.html',
})
export class AgregaAutoInfoPage {
	public Id: Number = 0;
	public Puntos: Number = 0;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  	this.Id = navParams.get("Id");
	this.Puntos = navParams.get("Puntos");
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AgregaAutoInfoPage');
  }
  
  aceptar() {
		this.navCtrl.pop();  
  }

}
