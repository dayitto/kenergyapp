import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController, ViewController, MenuController } from 'ionic-angular';
import { FormGroup, FormControl } from '@angular/forms';
import { AlertaServiceProvider } from '../../providers/alerta-service';
import { RestServiceProvider } from '../../providers/rest-service';
import { HttpParams } from '@angular/common/http';
import validator from 'validator';
import { AbrirnotificacionesService } from '../../services/abrirnotificaciones.service';
import { NotificacionService } from '../../services/notificaciones.service';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite';
import { LoginPage } from '../login/login';
import { Storage } from '@ionic/storage';

/**
 * Generated class for the CambiarContraPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-cambiar-contra',
  templateUrl: 'cambiar-contra.html',
})
export class CambiarContraPage {

  public usuario: any = null;
  public idUsuario: number = 0;

  public loginForm = new FormGroup({
    canterior: new FormControl(''),
    cnueva: new FormControl(''),
    cnuevac: new FormControl('')
    });

    public loginForm2 = new FormGroup({
      editado: new FormControl(0)
      });

    public loginFormValidator = {
      canterior: {
        mensaje: ''
        },
        cnueva: {
          mensaje: ''
          },
          cnuevac: {
            mensaje: ''
            }
    };

  constructor(public navCtrl: NavController, public navParams: NavParams, private alertaService: AlertaServiceProvider,
    private restService: RestServiceProvider, public viewCtrl: ViewController,
    public notificacion: NotificacionService, public mostrarNotif: AbrirnotificacionesService,
    public sqlite: SQLite, public menuCtrl: MenuController, public localStorage: Storage) {
      this.usuario = navParams.get("usuario");
      this.idUsuario = navParams.get("idUsuario") == undefined ? 0 : navParams.get("idUsuario");
      //alertaService.alertaBasica("","" + this.idUsuario,null);
  }

  ionViewDidEnter() {
    this.onValueChanges();
  }

  ionViewCanLeave() {
    return new Promise((resolve, reject) => {
      if(this.loginForm2.value.editado == 0)
        resolve();
      else 
        this.alertaService.alertaConfirmacion("Confirmar","¿Desea salir sin guardar los cambios realizados?",resolve,reject);
  });
  }

  cambiarContra() {
    if(this.formValidator()){
        this.restService.getToken().timeout(this.restService.timeOver).subscribe(data => {
          const bodys = new HttpParams()
            .set('Id', this.idUsuario > 0 ? this.idUsuario : this.usuario.Id)
            .set('Password', this.loginForm.value.cnueva);
          this.restService.restServicePOSTTokenXForm("user/changepass", bodys, data.toString()).timeout(this.restService.timeOver).subscribe(
            dataRegistro => {
              if (dataRegistro == true) {
                this.alertaService.alertaBasica("¡Bien!","Tu contraseña se ha cambiado con éxito",null);
                this.loginForm2.patchValue({
                  editado: 0
                });
                this.close();
              } else {
                this.alertaService.warnAlert("¡Atención!", "Ocurrió un error inesperado, contacta al administrador", null);
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

  formValidator(): boolean {
    if(this.idUsuario == 0){
      if (validator.isEmpty(this.loginForm.value.canterior)) {
        this.loginFormValidator.canterior.mensaje = 'Es necesario capturar la Contraseña Anterior';
        this.cambiarDiseñoInput("canterior",1);
        return false;
        } else {
        this.loginFormValidator.canterior.mensaje = '';
        this.cambiarDiseñoInput("canterior");
      }
      if (this.loginForm.value.canterior != this.usuario.Password) {
        this.loginFormValidator.canterior.mensaje = 'La contraseña anterior capturada es incorrecta';
        this.cambiarDiseñoInput("canterior",1);
        return false;
        } else {
        this.loginFormValidator.canterior.mensaje = '';
        this.cambiarDiseñoInput("canterior");
      }
    }
    if (validator.isEmpty(this.loginForm.value.cnueva)) {
      this.loginFormValidator.cnueva.mensaje = 'Es necesario capturar la Contraseña nueva';
      this.cambiarDiseñoInput("cnueva",1);
      return false;
      } else {
      this.loginFormValidator.cnueva.mensaje = '';
      this.cambiarDiseñoInput("cnueva");
    }
    if (validator.isEmpty(this.loginForm.value.cnuevac)) {
      this.loginFormValidator.cnuevac.mensaje = 'Es necesario confirmar la Contraseña nueva';
      this.cambiarDiseñoInput("cnuevac",1);
      return false;
      } else {
      this.loginFormValidator.cnuevac.mensaje = '';
      this.cambiarDiseñoInput("cnuevac");
    }
    if (this.loginForm.value.cnuevac != this.loginForm.value.cnueva) {
      this.loginFormValidator.cnuevac.mensaje = 'La confirmación de contraseña no coincide';
      this.cambiarDiseñoInput("cnuevac",1);
      return false;
      } else {
      this.loginFormValidator.cnuevac.mensaje = '';
      this.cambiarDiseñoInput("cnuevac");
    }
    return true;
  }

  cambiarDiseñoInput(id: string, color: number = 0){
    let strColor = color == 1 ? "red" : "white";
    (document.getElementById(id) as HTMLFormElement).style.backgroundColor = strColor;
  }

  onValueChanges(): void {
    this.loginForm.valueChanges.subscribe(val=>{
      this.loginForm2.patchValue({
        editado: this.loginForm2.value.editado + 1
      });
    })
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }

  close() {
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
      this.navCtrl.setRoot(LoginPage);
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
