import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, PopoverController, ModalController, MenuController, Events } from 'ionic-angular';
import { CombustibleModel } from '../../models/CombustibleModel';
import { HomeEstacionesListPage } from '../home-credito-estaciones-list/home-estaciones-list';
import { VehiculoModel } from '../../models/vehiculoModel';
import { NotificacionesPage } from '../notificaciones/notificaciones';
import { AmChartsService, AmChart } from "@amcharts/amcharts3-angular";
import { HttpParams } from '@angular/common/http';
import { AlertaServiceProvider } from '../../providers/alerta-service';
import { RestServiceProvider } from '../../providers/rest-service';
import { Storage } from '@ionic/storage';
import { NotificacionService } from '../../services/notificaciones.service';
import { AbrirnotificacionesService } from '../../services/abrirnotificaciones.service';

@IonicPage()
@Component({
  selector: 'page-home-credito',
  templateUrl: 'home-credito.html',
})
export class HomeCreditoPage {

  public combustibles: CombustibleModel[] = [];
  public estaciones: CombustibleModel[] = [];
  public chartSaldoFavor: AmChart;
  public chartSaldoDisponible: AmChart;
  public chartCreditoDisponible: AmChart;

  public saldoFavor: number = 2;
  public saldoDisponible: number = 142216.33;
  public creditoDisponible: number = 57783.67;

  public limite: number = 200000;
  public multiplo: number;

  public usuario = null;

  public estatus: number = 1;
  public estatusText: string = "Bloqueado";

  constructor(public navCtrl: NavController, public navParams: NavParams, public popoverCtrl: PopoverController, public modalController: ModalController, 
    public localStorage: Storage,
    public loadingCtrl: LoadingController, public AmCharts: AmChartsService,
    public menuCtrl: MenuController, public events: Events,
    public restService: RestServiceProvider, public alertaService: AlertaServiceProvider,
    public notificacion: NotificacionService, public mostrarNotif: AbrirnotificacionesService) {
    this.menuCtrl.enable(true, "authenticated")
    this.mostrarNotif.nav = this.navCtrl;
    this.multiplo = 100 / this.limite;
    this.usuario = navParams.get("usuario");
    console.log(JSON.stringify(this.usuario));
    if (this.usuario == null) {
      this.openSesion();
    }else{
      let data = {
        valor: 2,
        user: this.usuario
      }
        this.events.publish('menu:changed', data);
    }
    //this.usuario = 1;
    this.cargarEstaciones();
    this.cargarPorcentajes();
  }

  openSesion() {
    this.localStorage.ready().then(() => {
      this.localStorage.get(`@userSession`).then((data) => {
        if (data != null) {
          this.usuario = data;
          let dato = {
            valor: 2,
            user: this.usuario
          }
          if(this.usuario.IdClient == 0){
            let dato2 = {
              valor: 1,
              user: this.usuario
            }
            this.events.publish('menu:changed', dato2);
          }else{
            this.events.publish('menu:changed', dato);
          }
        } else {
          this.alertaService.warnAlert(this.restService.headerValidacion, "Usuario sin sesión, no se cargarán sus datos", null);
        }
      });
    });

  }

  ionViewDidLoad() {
    

  }

  cargarPorcentajes() {
    let loading = this.loadingCtrl.create();
    loading.present();
    this.restService.getToken().timeout(this.restService.timeOver).subscribe(data => {
      if (data == null) {
        loading.dismiss();
        this.alertaService.warnAlert(this.restService.headerValidacion, this.restService.mensajeValidacionAdmin, null);
      } else {
        if (this.usuario != null) {
          let body = new HttpParams();
          //var a = 44;
          var a = this.usuario.IdClient;
          body.append("IdClient", a.toString());
          var url = "status/account/" + a.toString();
          console.log(url);
          this.restService.restServiceGETToken(url, new HttpParams(), data.toString()).timeout(this.restService.timeOver).subscribe(
            dataRegistro => {
              if (Object.keys(dataRegistro['Response']).length != 0) {
                let precios = dataRegistro['Response'];
                console.log(JSON.stringify(precios));
                this.saldoFavor = precios.SaldoFavor;
                if(this.saldoFavor < 0 ) this.saldoFavor = 0;
                this.saldoDisponible = precios.SaldoDisponible;
                if(this.saldoDisponible < 0) this.saldoDisponible = 0;
                this.creditoDisponible = precios.SaldoConsumido;
                if(this.creditoDisponible < 0 ) this.creditoDisponible = 0;
                this.limite = precios.LimiteCredito;
                this.estatusText = precios.Estatus;
                if (precios.Estatus == "Activo") {
                  this.estatus = 2;
                }
                this.graficar();
                this.graficar2();
                this.graficar3();
					 /*let elements: NodeListOf<Element> = (document.getElementsByTagName("tspan") as HTMLFormElement);
					 let ii = 0;
					 Array.prototype.forEach.call(elements, function (item) {
					 	if(ii == 5 || ii == 11 || ii == 17) {} else {
					 		item.style.display = "none";
					 	}
					 	ii = ii + 1;
					 });*/
                //this.combustibles.push(new CombustibleModel("Ixtaczoquitlan", 88.88, 88.88, 88.88, true));
              } else {
                this.alertaService.warnAlert(this.restService.headerValidacion, "No se encontraron estaciones", null);
              }
              loading.dismiss();
            }, error => {
              loading.dismiss();
              console.log(error);
              this.alertaService.errorAlert(this.restService.headerError, this.restService.mensajeError, null);
            }
          );
        } else {
          loading.dismiss();
        }
      }
    }, error => {
      loading.dismiss();
      console.log(error);
      this.alertaService.errorAlert(this.restService.headerError, this.restService.mensajeError, null);
    });
  }

  cargarEstaciones() {
    //api/station
    let loading = this.loadingCtrl.create();
    loading.present();
    this.restService.getToken().timeout(this.restService.timeOver).subscribe(data => {
      if (data == null) {
        loading.dismiss();
        this.alertaService.warnAlert(this.restService.headerValidacion, this.restService.mensajeValidacionAdmin, null);
      } else {
        let body = new HttpParams();
        /*this.restService.restServiceGETToken("station/regular/busy/" + this.usuario.IdClient, body, data.toString()).timeout(this.restService.timeOver).subscribe(
        		dataRegistroLast => {
            if (dataRegistroLast['Status'] == 1) {*/
              let idEstacionConcurrida = 1 /*dataRegistroLast['Response'] == 0 ? 1 : dataRegistroLast['Response']*/;
              
              this.restService.restServiceGETToken("station", body, data.toString()).timeout(this.restService.timeOver).subscribe(
          dataRegistro => {
            if (Object.keys(dataRegistro['Response']).length != 0) {
              let arrayEstaciones = dataRegistro['Response'];
              var i = 0;
              for (let index = 0; index < arrayEstaciones.length; index++) {
                let estacion = arrayEstaciones[index];
                if(estacion.Nombre != "KANZ4 SUC. VERACRUZ") {
                	if(idEstacionConcurrida == estacion.Id) {
                		this.combustibles.push(new CombustibleModel(estacion.Nombre, 0, 0, 0, false, estacion.Id));
                		i = estacion.Id;
                	}
                	//loading.dismiss();
                	this.estaciones.push(new CombustibleModel(estacion.Nombre, 0, 0, 0, false, estacion.Id));
             	}

              }
              this.cargarPrecio(this.combustibles, i, data.toString());
              loading.dismiss();
              //this.combustibles.push(new CombustibleModel("Ixtaczoquitlan", 88.88, 88.88, 88.88, true));
            } else {
              console.log("en cargaestaciones");
              this.alertaService.warnAlert(this.restService.headerValidacion, "No se encontraron estaciones", null);
            }
          }, error => {
            loading.dismiss();
            console.log(error);
            this.alertaService.errorAlert(this.restService.headerError, this.restService.mensajeError, null);
          }
        );
              
              
              

            /*} else {
              this.alertaService.warnAlert(this.restService.headerValidacion, "No se encontraró la última estación", null);
            }
          }, error => {
            loading.dismiss();
            console.log(error);
            this.alertaService.errorAlert(this.restService.headerError, this.restService.mensajeError, null);
          }
        );*/
        
      }
    }, error => {
      loading.dismiss();
      console.log(error);
      this.alertaService.errorAlert(this.restService.headerError, this.restService.mensajeError, null);
    });
  }

  cargarPrecio(combustibles: CombustibleModel[], Id: any, token) {
    for (let index = 0; index < 1; index++) {
      const estacion = combustibles[0];
      var armaUrl = "gasoline/price/" + Id;
      this.restService.restServiceGETToken(armaUrl, new HttpParams(), token).timeout(this.restService.timeOver).subscribe(
        dataEstacionPrecio => {
          if (Object.keys(dataEstacionPrecio['Response']).length != 0) {
            let arrayPrecios = dataEstacionPrecio['Response'];
            combustibles[0] = new CombustibleModel(estacion.nombre, arrayPrecios[0].Price, arrayPrecios[1].Price, arrayPrecios[2].Price, true, estacion.id);
          } else {
            combustibles[0] = new CombustibleModel(estacion.nombre, 0, 0, 0, false);
          }
        }, error => {
          combustibles[0] = new CombustibleModel(estacion.nombre, 0, 0, 0, false);
          console.log(error);
          this.alertaService.errorAlert(this.restService.headerError, this.restService.mensajeError, null);
        }
      );
    }
  }

  graficar() {
    //amarillo #f7931e
    //verde    #009245
    //rojo     #c1272d
    var color = "";
    let porcentaje = (100 * this.saldoFavor) / this.limite;
    if (porcentaje >= 80) {
      color = "#009245";
    } else if (porcentaje < 80 && porcentaje >= 30) {
      color = "#f7931e";
    } else {
      color = "#c1272d";
    }
    if (this.saldoFavor > 0) {
      color = "#009245";
      porcentaje = 100;
    } else {

    }

    this.chartSaldoFavor = this.AmCharts.makeChart("chartdiv1", {
      "theme": "light",
      "type": "gauge",
      "rotate": true,
      "axes": [{
        "topTextFontSize": 15,
        "topTextYOffset": 55,
        "axisColor": color,
        "axisThickness": 1,
        "endValue": 100,
        "gridInside": true,
        "inside": true,
        "radius": "120%",
        "valueInterval": 25,
        "usePrefixes" : false,
        "labelsEnabled" : false,
        "tickColor": color,
        "startAngle": -135,
        "endAngle": 135,
        "unit": "%",
        "bandOutlineAlpha": 0,
        "topText": porcentaje.toFixed(0) + " %"
      }],
      "arrows": [{
        "alpha": 1,
        "color": color,
        "innerRadius": "5%",
        "nailRadius": 0,
        "startWidth" : 3,
        "endWidth" : 1,
        "radius": "60%",
        "value": porcentaje
      }]
    });
    // adjust darker band to new value
    //this.chartSaldoFavor.axes[0].bands[1].setEndValue(porcentaje);
  }

  graficar2() {
    //amarillo #f7931e
    //verde    #009245
    //rojo     #c1272d
    var color = "";
    let porcentaje = (100 * this.saldoDisponible) / this.limite;;
    if (porcentaje >= 85) {
      color = "#009245";
    } else if (porcentaje < 85 && porcentaje >= 50) {
      color = "#f7931e";
    } else {
      color = "#c1272d";
    }

    this.chartSaldoDisponible = this.AmCharts.makeChart("chartdiv2", {
      "theme": "light",
      "type": "gauge",
		"rotate": true,
      "axes": [{
        "topTextFontSize": 15,
        "topTextYOffset": 55,
        "axisColor": color,
        "axisThickness": 1,
        "endValue": 100,
        "gridInside": true,
        "inside": true,
        "radius": "120%",
        "valueInterval": 25,
        "usePrefixes" : false,
        "labelsEnabled" : false,
        "tickColor": color,
        "startAngle": -135,
        "endAngle": 135,
        "unit": "%",
        "bandOutlineAlpha": 0,
        "topText": porcentaje.toFixed(0) + " %"
      }],
      "arrows": [{
        "alpha": 1,
        "color": color,
        "innerRadius": "5%",
        "nailRadius": 0,
        "startWidth" : 3,
        "endWidth" : 1,
        "radius": "60%",
        "value": porcentaje
      }]
    });
    // adjust darker band to new value
    //this.chartSaldoDisponible.axes[0].bands[1].setEndValue(porcentaje);
  }

  graficar3() {
    //amarillo #f7931e
    //verde    #009245
    //rojo     #c1272d
    var color = "";
    let porcentaje = (100 * this.creditoDisponible) / this.limite;
    if (porcentaje <= 50) {
      color = "#009245";
    } else if (porcentaje < 84 && porcentaje >= 51) {
      color = "#f7931e";
    } else {
      color = "#c1272d";
    }
    
    if(porcentaje>100){
      porcentaje = 100;
    }

    this.chartCreditoDisponible = this.AmCharts.makeChart("chartdiv3", {
      "theme": "light",
      "type": "gauge",
		"rotate": true,
      "axes": [{
        "topTextFontSize": 15,
        "topTextYOffset": 55,
        "axisColor": color,
        "axisThickness": 1,
        "endValue": 100,
        "gridInside": true,
        "inside": true,
        "radius": "120%",
        "valueInterval": 25,
		  "usePrefixes" : false,
        "labelsEnabled" : false,
        "tickColor": color,
        "startAngle": -135,
        "endAngle": 135,
        "unit": "%",
        "bandOutlineAlpha": 0,
        "topText": porcentaje.toFixed(0) + " %"
      }],
      "arrows": [{
        "alpha": 1,
        "color": color,
        "innerRadius": "5%",
        "nailRadius": 0,
        "startWidth" : 3,
        "endWidth" : 1,
        "radius": "60%",
        "value": porcentaje
      }]
    });
    // adjust darker band to new value
    //this.chartCreditoDisponible.axes[0].setEndValue(porcentaje);
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
  
	presentPopover(myEvent) {
    let popover = this.popoverCtrl.create(HomeEstacionesListPage,{estaciones:this.estaciones});
    popover.present({
      ev: myEvent
    }); 
  }

  ionViewWillEnter(){
    this.localStorage.ready().then(() => {
      this.localStorage.get(`@userSession`).then((data) => {
        if (data != null)
          this.usuario = data;
      });
    });
  }

}
