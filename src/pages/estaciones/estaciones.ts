import { Component, ViewChild, ElementRef } from '@angular/core';
import { IonicPage, NavController, NavParams, PopoverController, LoadingController, AlertController } from 'ionic-angular';
import { EstacionesListPage } from '../estaciones-list/estaciones-list';
import { CombustibleModel } from '../../models/CombustibleModel';
import { RestServiceProvider } from '../../providers/rest-service';
import { AlertaServiceProvider } from '../../providers/alerta-service';

import { Geolocation } from '@ionic-native/geolocation';
import leaflet from 'leaflet';
import leafletKnn from 'leaflet-knn';
import { HttpParams } from '@angular/common/http';
import { tokenKey } from '@angular/core/src/view';
import { GoogleMapsAPIWrapper, AgmMap, LatLngBoundsLiteral, LatLngBounds, LatLng} from '@agm/core';
import { LaunchNavigator, LaunchNavigatorOptions } from 
'@ionic-native/launch-navigator';

@IonicPage()
@Component({
  selector: 'page-estaciones',
  templateUrl: 'estaciones.html',
})
export class EstacionesPage {
  public estaciones: CombustibleModel[] = [];
  public rango: number = 2;
  public progresoKm: number = 5;
  public latOrigen: number = 0;
  public longOrigen: number = 0;
  public latActual: number = 0;
  public longActual: number = 0;
  public latCercana: number = 0;
  public longCercana: number = 0;
  public marker: any;
  public origin: any;
  public destination: any; //{ lat: 18.838879, lng: -97.127837 };
  public map: any;
  public elementInfo: HTMLElement; 
  public options = {timeout: 10000, enableHighAccuracy: true,maximumAge: 0};
  public coordenadas: any[] = [{lat: 18.860484, long: -97.061461}, {lat: 18.852410, long: -97.079916}, {lat: 18.901281, long: -96.951716}];
  public stringEstaciones: string[] = ["Gasolinera K Energy Ixtac", "Gasolinera K Energy Orizaba", "Gasolinera K Energy Córdoba, Ver"];
  public iconEstacion = {
    url: 'assets/css/images/marker-icon.png',
    scaledSize: {
      width: 30,
      height: 50
    }
  }
  public iconCarro = {
    url: 'assets/css/images/car.png',
    scaledSize: {
      width: 50,
      height: 50
    }
  }
  public markerOptions = {
}

public renderOptions = {
  suppressMarkers: true,
}

  //@ViewChild('map') mapContainer: ElementRef;

  constructor(public navCtrl: NavController, public navParams: NavParams, public popoverCtrl: PopoverController,
    public loadingCtrl: LoadingController, public alertCtrl: AlertController,
    public restService: RestServiceProvider, public alertaService: AlertaServiceProvider, 
    private geolocation: Geolocation, private launchNavigator:LaunchNavigator) {
      /*this.estaciones.push(new CombustibleModel("Ixtaczoquitlan", 88.88, 88.88, 88.88, false));
      this.estaciones.push(new CombustibleModel("Jalapa", 88.88, 88.88, 88.88, false));
      this.estaciones.push(new CombustibleModel("Córdoba", 88.88, 88.88, 88.88, false));*/
    this.geolocalizar();
    //this.geolocalizar2();
  }

  cargarEstaciones() {
    //api/station
    let loading = this.loadingCtrl.create();
    loading.present();
    this.estaciones = [];
    this.restService.getToken().timeout(this.restService.timeOver).subscribe(data => {
      if (data == null) {
        loading.dismiss();
        this.alertaService.warnAlert(this.restService.headerValidacion, this.restService.mensajeValidacionAdmin, null);
      } else {
        let body = new HttpParams();
        this.restService.restServiceGETToken("station", body, data.toString()).timeout(this.restService.timeOver).subscribe(
          dataRegistro => {
            if (Object.keys(dataRegistro['Response']).length != 0) {
              let arrayEstaciones = dataRegistro['Response'];
              var i = 0;
              var distancia = 0;
              var numcercano = 0;
              for (let index = 0; index < arrayEstaciones.length; index++) {
                let estacion = arrayEstaciones[index];
                if (index == 0) {
                  i = estacion.Id;
                }
                this.estaciones.push(new CombustibleModel(estacion.Nombre.replace(" 1 "," ").replace(" 2 "," ").replace(" 3 "," "), +estacion.Precios[0].Price, +estacion.Precios[1].Price, +estacion.Precios[2].Price, false, estacion.Id, estacion.Direccion,this.coordenadas[estacion.Id - 1].lat,this.coordenadas[estacion.Id - 1].long));
                var dis: number = this.distancia(this.latOrigen,this.longOrigen,estacion.Geolat,estacion.Geolng);
                if(distancia == 0 || dis < distancia){
                  distancia = dis;
                  numcercano = estacion.Id;
                }
                //loading.dismiss();
              }
              this.estaciones[numcercano - 1].masCerca = true;
              this.latCercana = +this.estaciones[numcercano - 1].lat;
              this.longCercana = +this.estaciones[numcercano - 1].long;

              this.llenarInfo(this.estaciones[numcercano - 1]);
              //this.cargarPrecio(this.estaciones, i, data.toString());
              //this.geolocalizar();
              loading.dismiss();
              //this.combustibles.push(new CombustibleModel("Ixtaczoquitlan", 88.88, 88.88, 88.88, true));
            } else {
              this.alertaService.warnAlert(this.restService.headerValidacion, "No se encontraron estaciones", null);
            }
          }, error => {
            loading.dismiss();
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

  recargar(){
    //this.geolocalizar();
  }

  changeValue(c: CombustibleModel) {
    if (!c.expandible) {
      let loading = this.loadingCtrl.create();
      loading.present();
      this.restService.getToken().timeout(this.restService.timeOver).subscribe(data => {
        if (data == null) {
          loading.dismiss();
          this.alertaService.warnAlert(this.restService.headerValidacion, this.restService.mensajeValidacionAdmin, null);
        } else {
          let body = new HttpParams();
          var armaUrl = "gasoline/price/" + c.id;
          this.restService.restServiceGETToken(armaUrl, new HttpParams(), data.toString()).timeout(this.restService.timeOver).subscribe(
            dataEstacionPrecio => {
              if (Object.keys(dataEstacionPrecio['Response']).length != 0) {
                let arrayPrecios = dataEstacionPrecio['Response'];
                c.precioMagna = arrayPrecios[0].Price;
                c.precioPremium = arrayPrecios[1].Price;
                c.precioDiesel = arrayPrecios[2].Price;
                c.expandible = true;
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
    } else {
      c.expandible = !c.expandible;
    }
  }

  geolocalizar() {
    let loading = this.loadingCtrl.create();
    loading.present();
    this.geolocation.getCurrentPosition(this.options)
      .then((resp) => {
        this.latOrigen = resp.coords.latitude;
        this.longOrigen = resp.coords.longitude;
        this.cargarEstaciones();
        this.geolocalizar2();
        loading.dismiss();
      })
      .catch((error) => {
        console.log('Error getting location', error);
        console.log(error);
        loading.dismiss();

        const alert = this.alertCtrl.create({
          title: this.restService.headerError,
          message: "Favor de revisar su conexión a internet y/o permisos de gps",
          cssClass: 'alertCustomCss2',
          buttons: [
            {
              text: 'Regresar',
              handler: () => {
                this.navCtrl.pop();
              }
            },
            {
              text: 'Reintentar',
              handler: () => {
                this.geolocalizar();
              }
            }
          ]
        });
        alert.present();
      });
  }

  geolocalizar2(){
    let watch = this.geolocation.watchPosition(this.options);
    watch.subscribe((resp) => {
    this.latActual = resp.coords.latitude;
    this.longActual = resp.coords.longitude;
    });
  }

  presentPopover(myEvent) {
   let popover = this.popoverCtrl.create(EstacionesListPage,{estaciones:this.estaciones, map:this.map, latOrigen:this.latOrigen, longOrigen:this.longOrigen});
    popover.present({
      ev: myEvent
    });
  }
  
  change(){
    console.log("cambia rango");
  }
  
  selectRangeVal() {
		this.map.remove();
  		//this.geolocalizar();
  }

  llenarInfo(estacion: CombustibleModel){
    let element: HTMLElement = (document.getElementsByClassName("nombreEstacionN")[0] as HTMLFormElement);
    element.innerText = estacion.nombre;
    let elementDireccion: HTMLElement = (document.getElementsByClassName("estacionDireccion")[0] as HTMLFormElement);
    elementDireccion.innerText = estacion.direccion;
    let elementMagna: HTMLElement = (document.getElementsByClassName("precioGas uno")[0] as HTMLFormElement);
    elementMagna.innerText = "$"+estacion.precioMagna;
    let elementPremium: HTMLElement = (document.getElementsByClassName("precioGas dos")[0] as HTMLFormElement);
    elementPremium.innerText = "$"+estacion.precioPremium;          
    let elementDiesel: HTMLElement = (document.getElementsByClassName("precioGas tres")[0] as HTMLFormElement);
    elementDiesel.innerText = "$"+estacion.precioDiesel;
    (document.getElementById("idEst") as HTMLFormElement).value = estacion.id;
    (document.getElementById("muestraCercano") as HTMLFormElement).value = estacion.masCerca ? 1 : 0;
    //this.elementInfo.hidden = false;
  }

  distancia(lat1: number, long1: number, lat2: number, long2: number): number{
    var R = 6378.137;
    var dLat = this.rad( lat2 - lat1 );
    var dLong = this.rad( long2 - long1 );
    var a = Math.sin(dLat/2) * Math.sin(dLat/2) + Math.cos(this.rad(lat1)) * Math.cos(this.rad(lat2)) * Math.sin(dLong/2) * Math.sin(dLong/2);
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    var d = R * c;
    return d; //Retorna tres decimales
  }

  rad = (x: number) => x*Math.PI/180;

  protected mapReady(map) {
    this.map = map;
  }

  ionViewDidEnter(){
    
    /*this.elementInfo = (document.getElementById("infoGas") as HTMLFormElement);
    this.elementInfo.hidden = true;*/
  }

  navigateLocation(){
    let id = (document.getElementById("idEst") as HTMLFormElement).value;
    let dest = this.stringEstaciones[id - 1];
        let opts: LaunchNavigatorOptions = {
          app: this.launchNavigator.APP.GOOGLE_MAPS
        };
        this.launchNavigator.navigate(dest, opts)
        .then(success =>{
          console.log(success);
        },error=>{
          console.log(error);
        })
  }

  getMuestraCercano = () : number => (document.getElementById("muestraCercano") as HTMLFormElement).value;

  
}
