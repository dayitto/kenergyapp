import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { CargasModel } from '../../models/cargasModel';

@IonicPage()
@Component({
  selector: 'page-cargas-list',
  templateUrl: 'cargas-list.html',
})
export class CargasListPage {

  public cargas: CargasModel[] = [];
  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.cargas = navParams.get("cargas");
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CargasListPage');
  }
  
	cargaCarga(carga: any) {
	
	}

}
