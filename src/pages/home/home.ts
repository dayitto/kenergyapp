import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController, LoadingController, PopoverController, MenuController, Events, AlertController } from 'ionic-angular';
import { CombustibleModel } from '../../models/CombustibleModel';
import { VehiculoModel } from '../../models/vehiculoModel';
import { AgregaAutoPage } from '../agrega-auto/agrega-auto';
import { MiAutoPage } from '../mi-auto/mi-auto';
import { HomeEstacionesListPage } from '../home-credito-estaciones-list/home-estaciones-list';
import { AgregaAutoEscanerPage } from '../agrega-auto-escaner/agrega-auto-escaner';
import { Storage } from '@ionic/storage';
import { AlertaServiceProvider } from '../../providers/alerta-service';
import { RestServiceProvider } from '../../providers/rest-service';
import { HttpParams } from '@angular/common/http';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite';
import { DomSanitizer } from '@angular/platform-browser';
import { UsuarioService } from '../../services/usuario.service';
import { AbrirnotificacionesService } from '../../services/abrirnotificaciones.service';
import { NotificacionService } from '../../services/notificaciones.service';
import { EstacionesService } from '../../services/estaciones.service';
import { Geolocation } from '@ionic-native/geolocation';

@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
})
export class HomePage {
  public combustibles: CombustibleModel[] = [];
  public estaciones: CombustibleModel[] = [];
  public vehiculos: any[] = [];
  public usuario: any = null;
  public st: string = "40";
  public algunAuto: boolean = true;
  public latOrigen: number = 0;
  public longOrigen: number = 0;
  public tutorial1: boolean = false;
  public tutorial2: boolean = false;

  constructor(public navCtrl: NavController,public localStorage: Storage, public navParams: NavParams, public popoverCtrl: PopoverController, public modalController: ModalController,
    public loadingCtrl: LoadingController,private alertaService:AlertaServiceProvider,private restService:RestServiceProvider,
    public menuCtrl: MenuController, public events: Events,
    private sqlite: SQLite, public alertCtrl: AlertController, public usuarioService: UsuarioService,
    public notificacion: NotificacionService, public mostrarNotif: AbrirnotificacionesService,
    public estacionesService: EstacionesService, private geolocation: Geolocation) {
      this.mostrarNotif.nav = this.navCtrl;
      this.localStorage.ready().then(() => {
        this.localStorage.get(`@userSession`).then((data) => {
          if (data != null) {
            this.usuario = data;
            this.verificarConfirmacion();
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
		//this.alertaService.errorAlert("usuarioHome", this.usuario, null);
      if (this.usuario == null) {
                
        /*let sql = "SELECT * FROM usuario where id_usuario = ?";
  		
  		
  		this.sqlite.create({
      	name: 'kenergy.db',
      	location: 'default'
    	}).then((db: SQLiteObject) => {
    		db.executeSql(sql, [1])
  				.then(response => {
    				if(response.rows.length != 0) {
    					//this.localStorage.set(`@userSession`, response.rows.item(0).usuario);
						this.alertaService.errorAlert("idCliente", response.rows.item(0).id_cliente, null);
						this.alertaService.errorAlert("usuario", response.rows.item(0).usuario, null);
    					if(response.rows.item(0).id_cliente != 0){

                    //this.navCtrl.setRoot(HomeCreditoPage, { usuario: response.rows.item(0).usuario });
                  }else{
                    //this.navCtrl.setRoot(HomePage, { usuario: response.rows.item(0).usuario });
                  }
    				} else {
    				}
    				
  				})
  			.catch(error =>  {
  				this.alertaService.errorAlert("Error al obtener usuario", error, null)
  			});
  			
  		
  		
  		})
  		.catch(error =>{
    		this.alertaService.errorAlert("Info", "Excepcion al crear BD " + error, null);
  		});  
  		*/
  		
  		
      }else{
        let data = {
          valor: 1,
          user: this.usuario
        }
          this.events.publish('menu:changed', data);
          
      }
      
    this.menuCtrl.enable(true, "authenticated");
    this.cargarEstaciones();
    //this.cargarVehiculos();
    if (undefined != navParams.get("vehiculo")) {
      	let v = navParams.get("vehiculo");
		   this.openIfoCar(v);
    }

  }

  cargarEstaciones() {
    //api/station
    let loading = this.loadingCtrl.create();
    //loading.present();
    this.restService.getToken().timeout(this.restService.timeOver).subscribe(data => {
      if (data == null) {
        loading.dismiss();
        this.alertaService.warnAlert(this.restService.headerValidacion, this.restService.mensajeValidacionAdmin, null);
      } else {
        let body = new HttpParams();
        
			/*this.restService.restServiceGETToken("station/regular/Last/" + this.usuario.Id, body, data.toString()).timeout(this.restService.timeOver).subscribe(
        		dataRegistroLast => {
            if (undefined != dataRegistroLast['Response'] && dataRegistroLast['Response'] > 0) 
              (document.getElementById("est") as HTMLFormElement).value = dataRegistroLast['Response'];
            else 
            (document.getElementById("est") as HTMLFormElement).value = 1;
          }, error => {
            console.log(error);
            this.alertaService.errorAlert(this.restService.headerError, this.restService.mensajeError, null);
          }
        );*/
        this.restService.restServiceGETToken("station", body, data.toString()).timeout(this.restService.timeOver).subscribe(
          dataRegistro => {
            loading.dismiss();
				if (Object.keys(dataRegistro['Response']).length != 0) {
              let arrayEstaciones = dataRegistro['Response'];
              var i = 0;
              for (let index = 0; index < arrayEstaciones.length; index++) {
                let estacion = arrayEstaciones[index];
					this.estaciones.push(new CombustibleModel(estacion.Nombre.replace(" 1 "," ").replace(" 2 "," ").replace(" 3 "," "), 0, 0, 0, false, estacion.Id));
              }
              
              //this.combustibles.push(new CombustibleModel("Ixtaczoquitlan", 88.88, 88.88, 88.88, true));
            } else {
 				  loading.dismiss();
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

  cargarInfo(est: number){
      this.combustibles = [];
      this.combustibles.push(new CombustibleModel(this.estaciones[est - 1].nombre.replace(" 1 "," ").replace(" 2 "," ").replace(" 3 "," "), 0, 0, 0, false, this.estaciones[est - 1].id));
      this.cargarPrecio(this.combustibles);
  }

  cargarPrecio(combustibles: CombustibleModel[]) {
      const estacion = combustibles[0];
      var armaUrl = "gasoline/price/" + estacion.id;
      this.restService.getToken().timeout(this.restService.timeOver).subscribe(data => {
        if (data == null) {
          this.alertaService.warnAlert(this.restService.headerValidacion, this.restService.mensajeValidacionAdmin, null);
        } else {
      this.restService.restServiceGETToken(armaUrl, new HttpParams(), data.toString()).timeout(this.restService.timeOver).subscribe(
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
    }, error => {
      console.log(error);
      this.alertaService.errorAlert(this.restService.headerError, this.restService.mensajeError, null);
    });
    
  }
  
  cargarVehiculos1(event) {
  	this.cargarVehiculos();
  	
  	setTimeout(() => {
      event.complete();
    }, 2000);
  }

  cargarVehiculos() {
    this.vehiculos = [];
    if(this.usuario.LlaveroContado != null && this.usuario.LlaveroContado != undefined && this.usuario.LlaveroContado > 0){
      var armaUrl = "vehicle/regular/" + this.usuario.LlaveroContado;
      this.restService.getToken().timeout(this.restService.timeOver).subscribe(data => {
      this.restService.restServiceGETToken(armaUrl, new HttpParams(), data.toString()).timeout(this.restService.timeOver).subscribe(
        dataAutos => {
          if(dataAutos['Response']!=null && dataAutos['Response'] instanceof Array){
            this.algunAuto = true;
            console.log(JSON.stringify(dataAutos['Response']));
            let array = dataAutos['Response'];
            array.forEach(auto => {           	
            	/*this.restService.restServiceGETToken("vehicle/regular/detail/" + auto.Id, new HttpParams(), data.toString()).timeout(this.restService.timeOver).subscribe(
                dataRegistro => {
                  let sql = 'SELECT * FROM mis_autos where id_vehiculo = ?';
  					var d = new Date();
  					var n = d.getDay();*/
  		
  					/*this.sqlite.create({
      				name: 'kenergy.db',
      				location: 'default'
    				}).then((db: SQLiteObject) => {
    					db.executeSql(sql, [auto.Id])
  							.then(response => {
    							if(response.rows.length != 0) {
    								let circula = 0;
    								let tip = 0;
    								if(null != response.rows.item(0).no_circula && n == parseInt(response.rows.item(0).no_circula)) circula = 1;
    								
    								if(null != response.rows.item(0).tipo_combustible && "Premium" == response.rows.item(0).tipo_combustible) tip = 1;
    								if(null != response.rows.item(0).tipo_combustible && "Magna" == response.rows.item(0).tipo_combustible) tip = 2;
									if(null != response.rows.item(0).tipo_combustible && "Diesel" == response.rows.item(0).tipo_combustible) tip = 3;
									
									this.vehiculos.push({
                					id: auto.Id,
                					marca: auto.Marca,
                					modelo: auto.Modelo,
                					placa: auto.Placa,
		               			tipo: tip,
                          circula: circula,
                          puntos: dataRegistro['Response'].Puntos
              					});
    							} else {*/
									this.vehiculos.push({
                					id: auto.Id,
                          den: auto.Den,
                          marca: auto.Marca,
                          modelo: auto.Modelo,
                          year: auto.Year,
                					placa: auto.Placa,
		               			  tipo: auto.Tipo,
                          circula: 0,
                          num: auto.NumVeh 
                          //puntos: dataRegistro['Response'].Puntos
              					});
    							/*}
  							})
  						.catch(error => this.alertaService.errorAlert("Info Error", error, null));
  		
  					})
  					.catch(error =>{
  						this.vehiculos.push({
                		id: auto.Id,
                		marca: auto.Marca,
                		modelo: auto.Modelo,
                		placa: auto.Placa,
		               tipo: 87,
                    circula: 0,
                    puntos: dataRegistro['Response'].Puntos
                  });*/
                  
            /*this.vehiculos.sort(function (a, b) {
              if (a.puntos < b.puntos) {
                return 1;
              }
              if (a.puntos > b.puntos) {
                return -1;
              }
              // a must be equal to b
              return 0;
            });
            for(let i = 0; i < this.vehiculos.length; i++)
              this.vehiculos[i].posicion = i + 1;
            this.usuarioService.cambiarNumAutos(this.vehiculos.length);*/
    				/*	this.alertaService.errorAlert("Info", "Excepcion al crear BD " + error, null);
  					}); 
                }, error => {
                  console.log(error);
                  this.alertaService.errorAlert(this.restService.headerError, this.restService.mensajeError, null);
                }*/
                this.usuarioService.cambiarNumAutos(this.vehiculos.length);
                this.usuarioService.tieneVehiculos = this.vehiculos.length > 0 ? true : false;
                });
            //});
          }
          else{
            (document.getElementsByClassName("contentHome")[0] as HTMLFormElement).style.backgroundColor = "black";
            this.algunAuto = false;
          }
        }, error => {
          console.log(error);
          this.alertaService.errorAlert(this.restService.headerError, this.restService.mensajeError, null);
        }
      );
      }, error => {
        console.log(error);
        this.alertaService.errorAlert(this.restService.headerError, this.restService.mensajeError, null);
      });
    }
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
            this.cargarVehiculos();
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
    console.log('ionViewDidLoad HomePage');
    if(this.usuario != null)
      (document.getElementById("est") as HTMLFormElement).value = 0;
  }

  ionViewWillEnter(){
    this.geolocalizar();
    
  this.localStorage.ready().then(() => {
    this.localStorage.get(`@userSession`).then((data) => {
      if (data != null)
        this.usuario = data;
        
  this.cargarVehiculos();
    });
  });


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


  agregarAuto() {
    this.navCtrl.push(AgregaAutoPage);
  }

  openIfoCar(vehiculo: VehiculoModel) {
    this.navCtrl.push(MiAutoPage, { vehiculo });
  }
  
  presentPopover(myEvent) {
    let popover = this.popoverCtrl.create(HomeEstacionesListPage,{estaciones:this.estaciones});
    popover.present({
      ev: myEvent
    }); 
  }

  verificarConfirmacion(){
    this.restService.getToken().timeout(this.restService.timeOver).subscribe(data => {
      if (data == null) {
        this.alertaService.warnAlert(this.restService.headerValidacion, this.restService.mensajeValidacionAdmin, null);
      } else {
        let body = new HttpParams();
			this.restService.restServiceGETToken("user/confirmacion/" + this.usuario.Id, body, data.toString()).timeout(this.restService.timeOver).subscribe(
        		dataRegistroLast => {
            if (undefined != dataRegistroLast){
              if(dataRegistroLast == 0){
                const alert = this.alertCtrl.create({
                  title: "¡Confirma tu correo electrónico!",
                  subTitle: "Es necesario que confirmes tu cuenta de correo electrónico.",
                  cssClass: 'warnAlert',
                  enableBackdropDismiss: false,
                  buttons: [
                    {
                      text: 'Aceptar',
                      handler: () => {
                      }
                    },
                    {
                      text: 'Reenviar correo',
                      handler: () => {
                        this.reenviarCorreo(1);
                      }
                    }
                  ]
                });
                alert.present();
              }
                
              if(dataRegistroLast == -2){
                const alert = this.alertCtrl.create({
                  title: "¡No has confirmado tu correo electrónico!",
                  subTitle: "Confirma desde tu correo electrónico y reinicia la aplicación.",
                  cssClass: 'errorAlert',
                  enableBackdropDismiss: false,
                  buttons: [
                    {
                      text: 'Reenviar correo',
                      handler: () => {
                        this.reenviarCorreo();
                      }
                    }
                  ]
                });
                alert.present();
              }
            }
          }, error => {
            console.log(error);
            this.alertaService.errorAlert(this.restService.headerError, this.restService.mensajeError, null);
          }
        );
      }
    }, error => {
      console.log(error);
      this.alertaService.errorAlert(this.restService.headerError, this.restService.mensajeError, null);
    });
  }

  reenviarCorreo(id: number = 0){
    this.restService.getToken().timeout(this.restService.timeOver).subscribe(data => {
      if (data == null) {
        this.alertaService.warnAlert(this.restService.headerValidacion, this.restService.mensajeValidacionAdmin, null);
      } else {
      this.restService.restServicePOSTToken("user/correoconfirmacion/" + this.usuario.Id, new HttpParams(),data.toString()).timeout(this.restService.timeOver).subscribe(
        dataRegistroLast => {
        if (undefined != dataRegistroLast){
          if(dataRegistroLast == 1){
            if(id == 1)
              this.alertaService.alertaBasica("¡Reenvío de correo electrónico!","Se ha enviado el correo de confirmación. Confirma desde tu correo electrónico.",null);
            else
            this.alertaService.alertaSinSalida("¡Reenvío de correo electrónico!","Se ha enviado el correo de confirmación. Confirma desde tu correo electrónico y reinicia la aplicación.");
          }
          
        }
      }, error => {
        console.log(error);
        this.alertaService.errorAlert(this.restService.headerError, this.restService.mensajeError, null);
      }
    );
  }
}, error => {
  console.log(error);
  this.alertaService.errorAlert(this.restService.headerError, this.restService.mensajeError, null);
});
}

obtenerCercana() {
this.restService.getToken().timeout(this.restService.timeOver).subscribe(data => {
if (data == null) {
  this.alertaService.warnAlert(this.restService.headerValidacion, this.restService.mensajeValidacionAdmin, null);
} else {
  let body = new HttpParams();
  if(this.latOrigen != 0 && this.longOrigen != 0){
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
            var dis: number = this.estacionesService.distancia(this.latOrigen,this.longOrigen,estacion.Geolat,estacion.Geolng);
            if(distancia == 0 || dis < distancia){
              distancia = dis;
              numcercano = estacion.Id;
            }
          }
          this.cargarInfo(numcercano);
        } else {
          this.alertaService.warnAlert(this.restService.headerValidacion, "No se encontraron estaciones", null);
        }
      }, error => {
        console.log(error);
        this.alertaService.errorAlert(this.restService.headerError, this.restService.mensajeError, null);
      }
    );
  }
  else{
  (document.getElementById("est") as HTMLFormElement).value = 1;
  }
}
}, error => {
console.log(error);
this.alertaService.errorAlert(this.restService.headerError, this.restService.mensajeError, null);
(document.getElementById("est") as HTMLFormElement).value = -1;
});
}

geolocalizar() {
  this.latOrigen = 0;
  this.longOrigen = 0;
  let loading = this.loadingCtrl.create();
  loading.present();
  this.geolocation.getCurrentPosition({timeout: 5000, enableHighAccuracy: true,maximumAge: 0})
    .then((resp) => {
      loading.dismiss();
      this.latOrigen = resp.coords.latitude;
      this.longOrigen = resp.coords.longitude;
    this.obtenerCercana();
    })
    .catch((error) => {
      loading.dismiss();
      console.log('Error getting location', error);
      console.log(error);

      const alert = this.alertCtrl.create({
        title: this.restService.headerError,
        message: "Favor de revisar su conexión a internet y/o permisos de gps",
        cssClass: 'alertCustomCss2',
        buttons: [
          {
            text: 'Reintentar',
            handler: () => {
              this.geolocalizar();
            }
          },
          {
            text: 'Cancelar',
            handler: () => {
              this.cargarInfo(1);
            }
          }
        ]
      });
      alert.present();
    });
  }

  getMedalla = (posicion: number) => "assets/imgs/medallas/medalla" + posicion + ".png";
  
  llaveroNuevo(){
    console.log(this.usuario.Id);
    this.navCtrl.push(AgregaAutoPage);
    /*const bodys = new HttpParams()
    .set('IdUsuario', this.usuario.Id)
    .set('den', this.usuario.Nombre);
      this.restService.getToken().timeout(this.restService.timeOver).subscribe(data => {
              this.restService.restServicePOSTToken("llavero", bodys,data.toString()).timeout(this.restService.timeOver).subscribe(
                dataRegistroLast => {
                  console.log(dataRegistroLast);
                  if(dataRegistroLast > 0){
                    this.alertaService.alertaBasica("Registro de llavero","Tu llavero se ha generado con éxito!",null);
                  this.localStorage.ready().then(() => {
                    this.localStorage.get(`@userSession`).then((data2) => {
                      data2.LlaveroContado = dataRegistroLast;
                      this.localStorage.set(`@userSession`, data2);
                      this.usuario = data2;
                    });
                  });
                  }
                  
              }, error => {
                console.log(error);
                this.alertaService.errorAlert(this.restService.headerError, this.restService.mensajeError, null);
              }
            );
            }
            , error => {
              console.log(error);
              this.alertaService.errorAlert(this.restService.headerError, this.restService.mensajeError, null);
            });*/
  }

  llaveroExistente() {
    this.navCtrl.push(AgregaAutoEscanerPage);
  }

  clickTutorial1(){
    this.tutorial1 = true;
  }

  clickTutorial2(){
    this.tutorial2 = true;
  }
}
