import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController, MenuController } from 'ionic-angular';
import { FormGroup, FormControl } from '@angular/forms';
import validator from 'validator';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite';
import { Storage } from '@ionic/storage';
import { LoginPage } from '../login/login';
import { AlertaServiceProvider } from '../../providers/alerta-service';
import { RestServiceProvider } from '../../providers/rest-service';
import { HttpParams } from '@angular/common/http';

/**
 * Generated class for the RecuperarContraPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-recuperar-contra',
  templateUrl: 'recuperar-contra.html',
})
export class RecuperarContraPage {

  public loginForm = new FormGroup({
    email: new FormControl(''),
    emailc: new FormControl('')
    });

    public loginFormValidator = {
      email: {
        mensaje: ''
        },
        emailc: {
          mensaje: ''
          }
    };

    public loginForm2 = new FormGroup({
      editado: new FormControl(0)
      });

  constructor(public navCtrl: NavController, public navParams: NavParams, public viewCtrl: ViewController,
    public sqlite: SQLite, public menuCtrl: MenuController, public localStorage: Storage,
    private alertaService: AlertaServiceProvider, private restService: RestServiceProvider) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RecuperarContraPage');
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

  enviarCorreo() {
    if(this.formValidator()){
      this.restService.getToken().timeout(this.restService.timeOver).subscribe(data => {
        const bodys = new HttpParams();
        this.restService.restServicePUTToken("user/pass/cambio/" + this.loginForm.value.email, bodys, data.toString()).timeout(this.restService.timeOver).subscribe(
          dataRegistro => {
            if (dataRegistro['Response'] == true) {
              this.loginForm2.patchValue({
                editado: 0
              });
              this.alertaService.alertaBasica("Cambio de contraseña","Se ha enviado al correo " + this.loginForm.value.email + " un enlace para realizar el cambio de contraseña",this.close());
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
  }

  formValidator(): boolean {
    if (validator.isEmpty(this.loginForm.value.email)) {
      this.loginFormValidator.email.mensaje = 'Es necesario capturar tu E-mail';
      this.cambiarDiseñoInput("email",1);
      return false;
      } else {
      this.loginFormValidator.email.mensaje = '';
      this.cambiarDiseñoInput("email");
    }
    if (!validator.isEmail(this.loginForm.value.email)) {
      this.loginFormValidator.email.mensaje = 'Ingrese una dirección de correo válida';
      this.cambiarDiseñoInput("email",1);
      return false;
      } else {
      this.loginFormValidator.email.mensaje = '';
      this.cambiarDiseñoInput("email");
    }
    if (validator.isEmpty(this.loginForm.value.emailc)) {
      this.loginFormValidator.emailc.mensaje = 'Es necesario confirmar el E-mail';
      this.cambiarDiseñoInput("emailc",1);
      return false;
      } else {
      this.loginFormValidator.emailc.mensaje = '';
      this.cambiarDiseñoInput("emailc");
    }
    if (!validator.isEmail(this.loginForm.value.emailc)) {
      this.loginFormValidator.emailc.mensaje = 'Ingrese una dirección de correo válida';
      this.cambiarDiseñoInput("emailc",1);
      return false;
      } else {
      this.loginFormValidator.emailc.mensaje = '';
      this.cambiarDiseñoInput("emailc");
    }
    if (this.loginForm.value.email != this.loginForm.value.emailc) {
      this.loginFormValidator.emailc.mensaje = 'La confirmación de E-mail no coincide';
      this.cambiarDiseñoInput("emailc",1);
      return false;
      } else {
      this.loginFormValidator.emailc.mensaje = '';
      this.cambiarDiseñoInput("emailc");
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
