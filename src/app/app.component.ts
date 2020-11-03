import { Component, ViewChild } from '@angular/core';
import { Nav, Platform, LoadingController, AlertController, Events } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { AlertaServiceProvider } from '../providers/alerta-service';
import { RestServiceProvider } from '../providers/rest-service';
import 'rxjs/add/operator/timeout';
import { LoginPage } from '../pages/login/login';
import { Storage } from '@ionic/storage';
import { MenuController } from 'ionic-angular';
import { MenuProvider } from '../providers/menu-service';
import { MobileAccessibility } from '@ionic-native/mobile-accessibility';
import { MenuModel } from '../models/MenuModel';
import { HomePage } from '../pages/home/home';
import { AgregaAutoPage } from '../pages/agrega-auto/agrega-auto';
import { NotificacionesPage } from '../pages/notificaciones/notificaciones';
import { MisDatosPage } from '../pages/mis-datos/mis-datos';
import { DatosFacturacionPage } from '../pages/datos-facturacion/datos-facturacion';
import { EstadisticasPage } from '../pages/estadisticas/estadisticas';
import { MiAutoPage } from '../pages/mi-auto/mi-auto';
import { EstacionesPage } from '../pages/estaciones/estaciones';
import { MiAutoInfoPage } from '../pages/mi-auto-info/mi-auto-info';
import { CargasPage } from '../pages/cargas/cargas';
import { CargasInfoPage } from '../pages/cargas-info/cargas-info';
import { FacturacionPage } from '../pages/facturacion/facturacion';
import { PromocionesPage } from '../pages/promociones/promociones';
import { TerminosPage } from '../pages/terminos/terminos';
import { PremiosPage } from '../pages/premios/premios';
import { ContactoPage } from '../pages/contacto/contacto';
import { PremiosSolicitudPage } from '../pages/premios-solicitud/premios-solicitud';
import { RegistroValidaPageModule } from '../pages/registro-valida/registro-valida.module';
import { RegistroValidaPage } from '../pages/registro-valida/registro-valida';
import { RegistroPage } from '../pages/registro/registro';
import { AgregaAutoEscanerPage } from '../pages/agrega-auto-escaner/agrega-auto-escaner';
import { AgregaAutoInfoPage } from '../pages/agrega-auto-info/agrega-auto-info';
import { HomeCreditoPage } from '../pages/home-credito/home-credito';
import { RegistroPreviewPage } from '../pages/registro-preview/registro-preview';
import { RegistroValidaCreditoPage } from '../pages/registro-valida-credito/registro-valida-credito';
import { RegistroCreditoPage } from '../pages/registro-credito/registro-credito';
import { RegistroValidaCorreoCreditoPage } from '../pages/registro-valida-correo-credito/registro-valida-correo-credito';
import { EstadoCuentaPage } from '../pages/estado-cuenta/estado-cuenta';
import { MisDatosCreditoPage } from '../pages/mis-datos-credito/mis-datos-credito';
import { EstadisticasCreditoPage } from '../pages/estadisticas-credito/estadisticas-credito';
import { VehiculosCreditoPage } from '../pages/vehiculos-credito/vehiculos-credito';
import { VehiculosInfoCreditoPage } from '../pages/vehiculos-info-credito/vehiculos-info-credito';
import { CargasCreditoPage } from '../pages/cargas-credito/cargas-credito';
import { CargasInfoCreditoPage } from '../pages/cargas-info-credito/cargas-info-credito';
import { FacturacionCreditoPage } from '../pages/facturacion-credito/facturacion-credito';
import { ConsultaPuntosPage } from '../pages/consulta-puntos/consulta-puntos';
import { AvisoPrivacidadPage } from '../pages/aviso-privacidad/aviso-privacidad';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite';
import { UsuarioService } from '../services/usuario.service';
import { Deeplinks } from '@ionic-native/deeplinks';
import { CambiarContraPage } from '../pages/cambiar-contra/cambiar-contra';
import { HttpParams } from '@angular/common/http';

	
@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any;

  puntos: any = 25;
  link: boolean = false;
  idUsuario: number = 0;
  correoCambio: string = "";

  public usuario: any = null;

  constructor(public platform: Platform, public statusBar: StatusBar, public splashScreen: SplashScreen,
    public loadingCtrl: LoadingController, public alertaService: AlertaServiceProvider,
    public restService: RestServiceProvider, public localStorage: Storage, public alertCtrl: AlertController,
    public menuCtrl: MenuController, public events: Events, public menuService: MenuProvider,
    public mobileAccessibility: MobileAccessibility,
    public sqlite: SQLite, public usuarioService: UsuarioService, public deeplinks: Deeplinks) {
      
    
    /*if (platform.is('cordova')) {
      this.deeplinks.route({
        '/kenergy/contra/:idUsu': CambiarContraPage,
        '/kenergy/cambiaremail': LoginPage
      }).subscribe(match => {
        this.link = true;
        const params = match.$link.path.split('/');
        this.idUsuario = params[2];
        if(params[1] == "cambiaremail")
          this.correoCambio = params[3];
        alertaService.alertaBasica("si",JSON.stringify(match),null);
      }, nomatch => {
      });
    }*/
    this.menuCtrl.enable(false, "authenticated")
    mobileAccessibility.usePreferredTextZoom(false);
    this.openSesion();
    this.createDatabase();
    this.events.subscribe('menu:changed', pages => {
      this.usuarioService.pages = [];
      this.usuarioService.pages = this.menuService.returnMenuByType(pages, this.usuario);
    });
    this.events.subscribe('points:changed', points => {
      this.puntos = points;
    });

  }
  
	createDatabase(){
  		this.sqlite.create({
    		name: 'kenergy.db',
    		location: 'default' // the location field is required
  		})
  		.then((db: SQLiteObject) => {
    		db.executeSql('CREATE TABLE IF NOT EXISTS mis_autos( ' +
    				'id_vehiculo INTEGER PRIMARY KEY, ' +
    				'no_circula TEXT, ' +
    				'periodo TEXT, ' +
    				'tipo_combustible TEXT, ' +
    				'estado TEXT, ' +
    				'ultima_fecha_verificacion TEXT, ' +
					'proxima_fecha_verificacion TEXT, ' +
					'agencia TEXT, ' +
					'telefono TEXT, ' +
					'compania_Seguro TEXT, ' +
					'poliza TEXT, ' +
					'fecha_vencimiento TEXT, ' +
					'monto_poliza TEXT, ' +
					'telefono_seguro TEXT, ' +
					'verificacion INT, ' +
					'vencimiento INT, ' +
					'mantenimiento_cada INT, ' +
					'mantenimiento_cada_rango INT, ' +
					'pago_de_tenencia INT, ' +
					'hoy_no_circula INT)', [])
    			.then(res => console.log("Se ejecuto SQL correcto"))
    			.catch(e => console.log("Error al crear tabla "));
    			
    			db.executeSql('CREATE TABLE IF NOT EXISTS usuario( ' +
    				'id_usuario INTEGER PRIMARY KEY, ' +
    				'usuario TEXT, ' + 
    				'id_cliente INT)', [])
    			.then(res => console.log("Se ejecuto SQL correcto"))
    			.catch(e => console.log("Error al crear tabla "));
    			
    			db.executeSql('CREATE TABLE IF NOT EXISTS mis_datos( ' +
    				'id_usuario INTEGER PRIMARY KEY, ' +
    				'edad TEXT)', [])
    			.then(res => console.log("Se ejecuto SQL correcto"))
    			.catch(e => console.log("Error al crear tabla "));
  		})
  		.catch(error =>{
    		console.log("Excepcion al crear BD ");
  		});
	}
	
	

  openSesion() {
    this.localStorage.ready().then(() => {
      this.localStorage.get(`@userSession`).then((data) => {
        if (data != null) {
          this.usuario = data;
          this.initializeApp();
        }else{
          this.initializeApp();
        }
      });
    });

  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();
      //this.menuCtrl.enable(false, "authenticated");
      this.chargeInitPage();
      //this.rootPage = BorrarPage;
    });
  }

  chargeInitPage() {
    /*if(this.link){
      if(this.correoCambio == "")
        this.nav.push(CambiarContraPage,{idUsuario: this.idUsuario});
      else{
        this.restService.getToken().timeout(this.restService.timeOver).subscribe(data => {
          const bodys = new HttpParams();
          this.restService.restServicePUTToken("user/email/cambio/" + this.idUsuario + "/" + this.correoCambio, bodys, data.toString()).timeout(this.restService.timeOver).subscribe(
            dataRegistro => {
              if (dataRegistro['Response'] == true) {
                this.alertaService.alertaBasica("¡Bien!","Se ha cambiado tu correo electrónico para acceder a la cuenta.",null);
                this.close();
              } else {
                if (dataRegistro['Message'] == "1"){ 
                  this.alertaService.warnAlert("¡Atención!", "Se terminó el plazo para modificar el correo electrónico; Intente nuevamente.", null);
                  this.localStorage.ready().then(() => {
                    this.localStorage.get(`@isSessionActive`).then((data) => {
                      if (data == 1) {
                        this.menuCtrl.enable(true, "authenticated");
                        this.localStorage.get(`@userSession`).then((dataU) => {
                          this.usuario = dataU;
                          if (this.usuario != null) {
                            if (this.usuario.IdClient == 0) {
                              this.rootPage = HomePage;
                              this.usuarioService.pages = [];
                              let d = {
                                valor: 1,
                                user: this.usuario
                              };
                              this.usuarioService.pages = this.menuService.returnMenuByType(d, this.usuario);
                            } else {
                              this.rootPage = HomeCreditoPage;
                              this.usuarioService.pages = [];
                              let d2 = {
                                valor: 2,
                                user: this.usuario
                              };
                              this.usuarioService.pages = this.menuService.returnMenuByType(d2, this.usuario);
                            }
                          }
                        });
                      } else {
                        this.rootPage = LoginPage;
                      }
                    });
                  });
                }
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
        this.close();
      }
    }
    else{*/
    this.localStorage.ready().then(() => {
      this.localStorage.get(`@isSessionActive`).then((data) => {
        if (data == 1) {//SessionActive
          this.menuCtrl.enable(true, "authenticated");
          //this.usuario = data;
          this.localStorage.get(`@userSession`).then((dataU) => {
            this.usuario = dataU;
            if (this.usuario != null) {
              if (this.usuario.IdClient == 0) {
                this.rootPage = HomePage;
                this.usuarioService.pages = [];
                let d = {
                  valor: 1,
                  user: this.usuario
                };
                this.usuarioService.pages = this.menuService.returnMenuByType(d, this.usuario);
              } else {
                this.rootPage = HomeCreditoPage;
                this.usuarioService.pages = [];
                let d2 = {
                  valor: 2,
                  user: this.usuario
                };
                this.usuarioService.pages = this.menuService.returnMenuByType(d2, this.usuario);
              }
            }
          });
          //this.menuCtrl.enable(false, "authenticated");
          //this.menuCtrl.enable(true, "authenticated");
        } else {
          this.rootPage = LoginPage;
        }
      });
    });
  //}
  }

  openPage(pagina) {
    this.nav.setRoot(pagina.component);
  }

  exitApp() {
    this.alertaService.alertaConfirmacion("Confirmación", "¿Estás seguro de querer salir?", this.salir(), null);
  }

  salir() {
    this.platform.exitApp();
    let sqlDelete = "DELETE FROM usuario";
  		
  		
  							this.sqlite.create({
      						name: 'kenergy.db',
      						location: 'default'
    						}).then((db: SQLiteObject) => {
    							db.executeSql(sqlDelete, [])
  									.then(response => {
    				
    				
  									})
  								.catch(error => this.alertaService.errorAlert("Error al borrar usuario", error, null));
  			
  		
  		
  							})
  							.catch(error =>{
    							this.alertaService.errorAlert("Info", "Excepcion al crear BD " + error, null);
  							}); 
  }

  exitSession() {
    const confirm = this.alertCtrl.create({
      title: "Confirmación",
      message: "¿Estás seguro de cerrar sesión?",
      buttons: [
        {
          text: 'Cancelar',
          handler: () => {
          }
        },
        {
          text: 'Aceptar',
          handler: () => {
            this.close()
          }
        }
      ]
    });
    confirm.present();
  }

  close() {
  	this.platform.exitApp();
    this.localStorage.ready().then(() => {
      							
      
let sqlDelete = "DELETE FROM usuario";
  		
  		
  							this.sqlite.create({
      						name: 'kenergy.db',
      						location: 'default'
    						}).then((db: SQLiteObject) => {
    							db.executeSql(sqlDelete, [])
  									.then(response => {
    				this.localStorage.set(`@isSessionActive`, 0);
      this.menuCtrl.close();
      this.menuCtrl.enable(false, "authenticated");
      this.nav.push(LoginPage);	
    				
  									})
  								.catch(error => this.alertaService.errorAlert("Error al borrar usuario", error, null));
  			
  		
  		
  							})
  							.catch(error =>{
    							this.alertaService.errorAlert("Info", "Excepcion al crear BD " + error, null);
  							}); 
    }, (error) => {
      console.log(error);//En modo debug visualizar error completo
      this.alertaService.errorAlert(this.restService.headerError, error.message, null);
    });

  }
}
