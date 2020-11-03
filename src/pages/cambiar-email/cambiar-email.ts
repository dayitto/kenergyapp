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
 * Generated class for the CambiarEmailPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-cambiar-email',
  templateUrl: 'cambiar-email.html',
})
export class CambiarEmailPage {

  public usuario: any = null;

  public loginForm = new FormGroup({
    eanterior: new FormControl(''),
    enuevo: new FormControl(''),
    enuevoc: new FormControl('')
    });

    public loginForm2 = new FormGroup({
      editado: new FormControl(0)
      });

    public loginFormValidator = {
      eanterior: {
        mensaje: ''
        },
        enuevo: {
          mensaje: ''
          },
          enuevoc: {
            mensaje: ''
            }
    };

  constructor(public navCtrl: NavController, public navParams: NavParams, private alertaService: AlertaServiceProvider,
    private restService: RestServiceProvider, public viewCtrl: ViewController,
    public notificacion: NotificacionService, public mostrarNotif: AbrirnotificacionesService,
    public sqlite: SQLite, public menuCtrl: MenuController, public localStorage: Storage) {
      this.usuario = navParams.get("usuario");
      
    console.log("Cambiando email");
    console.log(JSON.stringify(this.usuario));
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

  cambiarEmail() {
    if(this.formValidator()){
        this.restService.getToken().timeout(this.restService.timeOver).subscribe(data => {
          const bodys = new HttpParams();
          this.restService.restServicePUTToken("user/email/" + this.usuario.Id + "/" + this.loginForm.value.enuevoc, bodys, data.toString()).timeout(this.restService.timeOver).subscribe(
            dataRegistro => {
              console.log(dataRegistro);
              if (dataRegistro['Response'] == true) {
                this.alertaService.alertaBasica("¡Bien!","Se ha enviado un correo a " + this.loginForm.value.enuevoc + " para confirmar el cambio.",null);
                this.loginForm2.patchValue({
                  editado: 0
                });
                this.close();
              } else {
                if (dataRegistro['Message'] == "6") 
                  this.alertaService.warnAlert("¡Atención!", "El nuevo E-mail capturado ya se encuentra registrado por otra cuenta", null);
                  if (dataRegistro['Message'] == "3") 
                  this.alertaService.warnAlert("¡Atención!", "No ha sido encontrado el usuario.", null);
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
    if (validator.isEmpty(this.loginForm.value.eanterior)) {
      this.loginFormValidator.eanterior.mensaje = 'Es necesario capturar el E-mail Anterior';
      this.cambiarDiseñoInput("eanterior",1);
      return false;
      } else {
      this.loginFormValidator.eanterior.mensaje = '';
      this.cambiarDiseñoInput("eanterior");
    }
    if (!validator.isEmail(this.loginForm.value.eanterior)) {
      this.loginFormValidator.eanterior.mensaje = 'Ingrese una dirección de correo válida';
      this.cambiarDiseñoInput("eanterior",1);
      return false;
      } else {
      this.loginFormValidator.eanterior.mensaje = '';
      this.cambiarDiseñoInput("eanterior");
    }
    if (this.loginForm.value.eanterior != this.usuario.Email) {
      this.loginFormValidator.eanterior.mensaje = 'El E-mail anterior es incorrecto';
      this.cambiarDiseñoInput("eanterior",1);
      return false;
      } else {
      this.loginFormValidator.eanterior.mensaje = '';
      this.cambiarDiseñoInput("eanterior");
    }
    if (validator.isEmpty(this.loginForm.value.enuevo)) {
      this.loginFormValidator.enuevo.mensaje = 'Es necesario capturar el nuevo E-mail';
      this.cambiarDiseñoInput("enuevo",1);
      return false;
      } else {
      this.loginFormValidator.enuevo.mensaje = '';
      this.cambiarDiseñoInput("enuevo");
    }
    if (!validator.isEmail(this.loginForm.value.enuevo)) {
      this.loginFormValidator.enuevo.mensaje = 'Ingrese una dirección de correo válida';
      this.cambiarDiseñoInput("enuevo",1);
      return false;
      } else {
      this.loginFormValidator.enuevo.mensaje = '';
      this.cambiarDiseñoInput("enuevo");
    }
    if (validator.isEmpty(this.loginForm.value.enuevoc)) {
      this.loginFormValidator.enuevoc.mensaje = 'Es necesario confirmar la Contraseña nueva';
      this.cambiarDiseñoInput("enuevoc",1);
      return false;
      } else {
      this.loginFormValidator.enuevoc.mensaje = '';
      this.cambiarDiseñoInput("enuevoc");
    }
    if (!validator.isEmail(this.loginForm.value.enuevoc)) {
      this.loginFormValidator.enuevoc.mensaje = 'Ingrese una dirección de correo válida';
      this.cambiarDiseñoInput("enuevoc",1);
      return false;
      } else {
      this.loginFormValidator.enuevoc.mensaje = '';
      this.cambiarDiseñoInput("enuevoc");
    }
    if (this.loginForm.value.enuevoc != this.loginForm.value.enuevo) {
      this.loginFormValidator.enuevoc.mensaje = 'La confirmación de E-mail no coincide';
      this.cambiarDiseñoInput("enuevoc",1);
      return false;
      } else {
      this.loginFormValidator.enuevoc.mensaje = '';
      this.cambiarDiseñoInput("enuevoc");
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
