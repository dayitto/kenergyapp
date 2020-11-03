import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform, ModalController, MenuController, Events, LoadingController, AlertController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { AlertaServiceProvider } from '../../providers/alerta-service';
import { RestServiceProvider } from '../../providers/rest-service';
import { MenuModel } from '../../models/MenuModel';
import { HttpParams } from '@angular/common/http';
import { MenuProvider } from '../../providers/menu-service';
import { HomePage } from '../home/home';
import { RegistroValidaPage } from '../registro-valida/registro-valida';
import { RegistroPreviewPage } from '../registro-preview/registro-preview';
import { GrupoModel } from '../../models/grupoModel';
import { HomeCreditoPage } from '../home-credito/home-credito';
import { executeViewHooks } from '@angular/core/src/render3/instructions';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite';

@IonicPage()
@Component({
  selector: 'page-login2',
  templateUrl: 'login.html',
})
export class LoginPage {

  public user: string;
  public password: string;
  public verPassword: string = "password";
  public pages: MenuModel[] = [];
  public idGrupo: number = 0;
  public grupos: GrupoModel[] = [];


  constructor(public navCtrl: NavController, public navParams: NavParams,
    private platform: Platform, public modalController: ModalController,
    public alertaService: AlertaServiceProvider, public localStorage: Storage,
    public restService: RestServiceProvider, public menuCtrl: MenuController, public events: Events,
    public loadingCtrl: LoadingController, public menuService: MenuProvider,
    private sqlite: SQLite, public alertCtrl: AlertController) {
    this.menuCtrl.enable(false, "authenticated")
  }

  ionViewDidLoad() {
    //postConstruct se utiliza al cargar la vista
    let sql = "SELECT * FROM usuario where id_usuario = ?";
  		
  		
  		this.sqlite.create({
      	name: 'kenergy.db',
      	location: 'default'
    	}).then((db: SQLiteObject) => {
    		db.executeSql(sql, [1])
  				.then(response => {
    				if(response.rows.length != 0) {
    					//this.localStorage.set(`@userSession`, response.rows.item(0).usuario);
						//this.alertaService.errorAlert("idCliente", response.rows.item(0).id_cliente, null);
						//this.alertaService.errorAlert("usuario", response.rows.item(0).usuario, null);
						//this.alertaService.errorAlert("usuario.idCliente", JSON.parse(response.rows.item(0).usuario).IdClient, null);
						this.localStorage.set(`@userSession`, JSON.parse(response.rows.item(0).usuario));
    					if(JSON.parse(response.rows.item(0).usuario).IdClient != 0){

                    this.navCtrl.setRoot(HomeCreditoPage, { usuario: JSON.parse(response.rows.item(0).usuario) });
                  }else{
                    this.navCtrl.setRoot(HomePage, { usuario: JSON.parse(response.rows.item(0).usuario) });
                  }
    				} else {
    					this.cargarGrupos();
    				}
    				
  				})
  			.catch(error =>  {
  				this.cargarGrupos();
  			});
  			
  		
  		
  		})
  		.catch(error =>{
			this.cargarGrupos();
    		this.alertaService.errorAlert("Info", "Excepcion al crear BD " + error, null);
  		});  
  }

  cargarGrupos() {
    let loading = this.loadingCtrl.create();
    loading.present();
    this.restService.getToken().timeout(this.restService.timeOver).subscribe(data => {
      if (data == null) {
        loading.dismiss();
        this.alertaService.warnAlert(this.restService.headerValidacion, this.restService.mensajeValidacionAdmin, null);
      } else {
        let body = new HttpParams();
        this.restService.restServiceGETToken("session/corporativo", body, data.toString()).timeout(this.restService.timeOver).subscribe(
          dataCorporativo => {
            this.grupos = [];
            if (dataCorporativo["Status"] == 1) {
              this.grupos.push(new GrupoModel());
              dataCorporativo["Response"].forEach(grupo => {
                this.grupos.push(new GrupoModel(grupo.Id, grupo.Corporativo, grupo.Url));
              });
              loading.dismiss();
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

  loginTemporal() {
    this.navCtrl.setRoot(HomePage);
  }

  login() {
    /*if(this.idGrupo == 0){
      this.alertaService.warnAlert(this.restService.headerValidacion, "Selecciona un grupo", null);
      return;
    }*/
    if ((this.user == undefined || this.password == undefined) || (this.user == null || this.password == null) || (this.user.length == 0 || this.password.length == 0)) {
      this.alertaService.warnAlert(this.restService.headerValidacion, "Usuario y/o Password son requeridos", null);
      return;
    }
    let loading = this.loadingCtrl.create();
    loading.present();
    this.restService.getToken().timeout(this.restService.timeOver).subscribe(data => {
      if (data == null) {
        loading.dismiss();
        this.alertaService.warnAlert(this.restService.headerValidacion, this.restService.mensajeValidacionAdmin, null);
      } else {
        let body = new HttpParams();
        body.set("Password", this.password);
        body.set("Email", this.user);
        let b = {
          Password:this.password,
          Email:this.user
        };
        const bodys = new HttpParams()
            .set('Email', this.user)
            .set('Password', this.password);
        this.restService.restServicePOSTTokenXForm("session/user", bodys, data.toString()).timeout(this.restService.timeOver).subscribe(
          dataLogin => {
            if (Object.keys(dataLogin['Response']).length != 0) {
              this.localStorage.ready().then(() => {
                this.localStorage.get(`@userSession`).then((data) => {
                  console.log("enlogin " + JSON.stringify(dataLogin['Response']));
                  this.localStorage.set(`@userSession`, dataLogin['Response']);
                  	//guardamos datos del usuario en la tabla
                  	let sqlDelete = "DELETE FROM usuario";
							let sql = 'INSERT INTO usuario VALUES (?,?,?)';
  		
  		
  							this.sqlite.create({
      						name: 'kenergy.db',
      						location: 'default'
    						}).then((db: SQLiteObject) => {
    							db.executeSql(sqlDelete, [])
  									.then(response => {
    									db.executeSql(sql, [1,JSON.stringify(dataLogin['Response']),dataLogin['Response'].IdClient])
  										.then(response => {
    										//this.alertaService.errorAlert("usuario Login", "Guardo correctamente el usuario" + dataLogin['Response'].IdClient, null)
    				
  										})
  										.catch(error => this.alertaService.errorAlert("Error al insertar usuario", error, null));
    				
  										})
  											//.catch(error => this.alertaService.errorAlert("Error al borrar usuario", error, null));
  			
  			
  		
  								})
  								.catch(error =>{
    								this.alertaService.errorAlert("Info", "Excepcion al crear BD " + error, null);
  								});  
  		
                     //this.localStorage.set(`@isSessionActive`, 1);
                  if(dataLogin['Response'].IdClient!=0){

                    this.navCtrl.setRoot(HomeCreditoPage, { usuario: dataLogin['Response'] });
                  }else{
                    this.navCtrl.setRoot(HomePage);
                    //this.alertaService.warnAlert("¡Atención!", "Por el momento no está disponible la aplicación para clientes de Amigo Fiel", null);
                  }
                  
                });
              });
            } else {
              const alert = this.alertCtrl.create({
                title: this.restService.headerValidacion,
                subTitle: "El correo o la contraseña son incorrectos.",
                cssClass: 'warnAlert',
                enableBackdropDismiss: false,
                buttons: [
                  {
                    text: 'Aceptar',
                    handler: () => {
                    }
                  },
                  {
                    text: 'Cambiar contraseña',
                    handler: () => {
                      this.cambiarContra();
                    }
                  }
                ]
              });
              alert.present();
              //this.alertaService.warnAlert(this.restService.headerValidacion, "El correo o la contraseña son incorrectos", null);
            }
            loading.dismiss();
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

  verPasswordMethod(event) {
    if (this.verPassword == "password") {
      this.verPassword = "text";
    } else {
      this.verPassword = "password";
    }
  }

  registrar() {
    this.navCtrl.push(RegistroPreviewPage, {tipo: 1});
  }
  
  cambiarContra(){
    this.restService.getToken().timeout(this.restService.timeOver).subscribe(data => {
      const bodys = new HttpParams();
      this.restService.restServicePUTToken("user/pass/cambio/" + this.user, bodys, data.toString()).timeout(this.restService.timeOver).subscribe(
        dataRegistro => {
          if (dataRegistro['Response'] == true) {
            this.alertaService.alertaBasica("Cambio de contraseña","Se ha enviado al correo " + this.user + " un enlace para realizar el cambio de contraseña",null);
          } else {
            if (dataRegistro['Message'] == 3) 
              this.alertaService.warnAlert("¡Atención!", "El E-mail capturado no se encuentra registrado.", null);
            if (dataRegistro['Message'] == 6) 
              this.alertaService.alertaBasica("RECUPERA TU CONTRASEÑA", "Comunícate con tu ejecutivo de ventas al <a href='tel:2727280112'>272 728 0112</a> o al e-mail <a href='mailto:registro@kenergyfuel.com'>registro@kenergyfuel.com</a>", null);
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

  oContra() {
    this.navCtrl.push(RegistroPreviewPage, {tipo: 2});
  }
  
}
