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
  templateUrl: 'home-estaciones-list.html',
})
export class HomeEstacionesListPage {
  public estaciones: CombustibleModel[] = [];
  
  constructor(public navCtrl: NavController, public navParams: NavParams, public loadingCtrl: LoadingController, 
  				public alertaService: AlertaServiceProvider, public restService: RestServiceProvider) {
    this.estaciones = navParams.get("estaciones");
    
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad EstacionesListPage');
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
		
      let loading = this.loadingCtrl.create();
      loading.present();
      this.restService.getToken().timeout(this.restService.timeOver).subscribe(data => {
        if (data == null) {
          loading.dismiss();
          this.alertaService.warnAlert(this.restService.headerValidacion, this.restService.mensajeValidacionAdmin, null);
        } else {
          let body = new HttpParams();
          var armaUrl = "gasoline/price/" + estacion.id;
          this.restService.restServiceGETToken(armaUrl, new HttpParams(), data.toString()).timeout(this.restService.timeOver).subscribe(
            dataEstacionPrecio => {
              if (Object.keys(dataEstacionPrecio['Response']).length != 0) {
                let arrayPrecios = dataEstacionPrecio['Response'];
                let element: HTMLElement = (document.getElementsByClassName("nombreEstacion")[0] as HTMLFormElement);
                element.innerText = estacion.nombre;
                let elementMagna: HTMLElement = (document.getElementsByClassName("precioGas")[0] as HTMLFormElement);
                elementMagna.innerText = "$"+arrayPrecios[0].Price;
					 let elementPremium: HTMLElement = (document.getElementsByClassName("precioGas")[1] as HTMLFormElement);
                elementPremium.innerText = "$"+arrayPrecios[1].Price          
                let elementDiesel: HTMLElement = (document.getElementsByClassName("precioGas")[2] as HTMLFormElement);
                elementDiesel.innerText = "$"+arrayPrecios[2].Price
              } else {
                this.alertaService.errorAlert(this.restService.headerValidacion, "La estación no cuenta con precios", null);
              }
              loading.dismiss();
            }, error => {
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
}
