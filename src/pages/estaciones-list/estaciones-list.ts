import { Component, ViewChild, ElementRef } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import { CombustibleModel } from '../../models/CombustibleModel';
import { AlertaServiceProvider } from '../../providers/alerta-service';
import { RestServiceProvider } from '../../providers/rest-service';
import { HttpParams } from '@angular/common/http';

/**
 * Generated class for the EstacionesListPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-estaciones-list',
  templateUrl: 'estaciones-list.html',
})
export class EstacionesListPage {
  public estaciones: CombustibleModel[] = [];
  public estaciones2: CombustibleModel[] = [];
  public latOrigen: number = 0;
  public longOrigen: number = 0;
  public map: any;
  public elementInfo: HTMLElement;
  public busquedaEst: string = "";  
  
  constructor(public navCtrl: NavController, public navParams: NavParams, public loadingCtrl: LoadingController, 
  				public alertaService: AlertaServiceProvider, public restService: RestServiceProvider) {
    this.estaciones = navParams.get("estaciones");
    this.estaciones2 = this.estaciones;
    this.latOrigen = navParams.get("latOrigen");
    this.longOrigen = navParams.get("longOrigen");
    this.map = navParams.get("map");
    /*this.elementInfo = (document.getElementById("infoGas") as HTMLFormElement);
    this.elementInfo.hidden = true;*/
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad EstacionesListPage');
  }
  
  geolocalizarGasolinera(estacionees) {
    let loading = this.loadingCtrl.create();
    loading.present();
        console.log(estacionees.lat);
        console.log(estacionees.long);
    this.map.setCenter({ lat: estacionees.lat, lng: estacionees.long });
    let element: HTMLElement = (document.getElementsByClassName("nombreEstacionN")[0] as HTMLFormElement);
    element.innerText = estacionees.nombre;
    let elementDireccion: HTMLElement = (document.getElementsByClassName("estacionDireccion")[0] as HTMLFormElement);
    elementDireccion.innerText = estacionees.direccion;
    let elementMagna: HTMLElement = (document.getElementsByClassName("precioGas uno")[0] as HTMLFormElement);
    elementMagna.innerText = "$"+estacionees.precioMagna;
    let elementPremium: HTMLElement = (document.getElementsByClassName("precioGas dos")[0] as HTMLFormElement);
    elementPremium.innerText = "$"+estacionees.precioPremium;          
    let elementDiesel: HTMLElement = (document.getElementsByClassName("precioGas tres")[0] as HTMLFormElement);
    elementDiesel.innerText = "$"+estacionees.precioDiesel;
    (document.getElementById("idEst") as HTMLFormElement).value = estacionees.id;
    (document.getElementById("muestraCercano") as HTMLFormElement).value = estacionees.masCerca ? 1 : 0;
    //this.elementInfo.hidden = false;      
    loading.dismiss();
  }
  
  selectEstacionBuscar(estacion) {
		let elements: NodeListOf<Element> = (document.getElementsByClassName("popover-content") as HTMLFormElement);
		Array.prototype.forEach.call(elements, function (item) {
  			item.style.display = "none";
		});
		let elements1: NodeListOf<Element> = (document.getElementsByClassName("popover-md") as HTMLFormElement);  
		Array.prototype.forEach.call(elements1, function (item) {
  			item.style.display = "none";
		});
		this.geolocalizarGasolinera(estacion);
  }

  buscarInput(){
    this.estaciones = this.estaciones2.filter(est => est.nombre.toLowerCase().includes(this.busquedaEst.toLowerCase()) );
  }
}
