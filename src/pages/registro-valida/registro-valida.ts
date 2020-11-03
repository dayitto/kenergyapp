import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, MenuController, LoadingController, AlertController, Events } from 'ionic-angular';
import { RegistroPage } from '../registro/registro';
import { HttpParams } from '@angular/common/http';
import { AlertaServiceProvider } from '../../providers/alerta-service';
import { RestServiceProvider } from '../../providers/rest-service';
import { Storage } from '@ionic/storage';
import { FormGroup, FormControl } from '@angular/forms';
import validator from 'validator';
import { HomePage } from '../home/home';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite';

@IonicPage()
@Component({
  selector: 'page-registro-valida',
  templateUrl: 'registro-valida.html',
})
export class RegistroValidaPage {
  public email: string = "";
  public emailConfirma: string = "";
  //public regex = new RegExp(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
  public loginForm = new FormGroup({
    email: new FormControl(''),
    emailConfirma: new FormControl(''),
    nombre: new FormControl(''),
    usu: new FormControl(''),
    contra: new FormControl(''),
    contraConfirma: new FormControl(''),
    nacimiento: new FormControl(''),
    tel: new FormControl('')
    });

  public loginFormValidator = {
    email: {
      mensaje: ''
      },
    emailConfirma: {
      mensaje: ''
    },
    nombre: {
      mensaje: ''
    },
    usu: {
      mensaje: ''
    },
    contra: {
      mensaje: ''
    },
    contraConfirma: {
      mensaje: ''
    },
    nacimiento: {
      mensaje: ''
    },
    tel: {
      mensaje: ''
    }
  };
    
  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams, 
    public menuCtrl: MenuController,
    private alertaService:AlertaServiceProvider,
    private restService:RestServiceProvider,
    public loadingCtrl: LoadingController,
    public localStorage: Storage,
    public alertCtrl: AlertController,
    public events: Events, private sqlite: SQLite) {
    this.menuCtrl.enable(false, "authenticated")
  }

  ngOnInit() {
    this.onValueChanges();
  }

  ionViewDidLoad() {
    (document.getElementById("editado") as HTMLFormElement).value = 0;
  }

  ionViewCanLeave() {
    return new Promise((resolve, reject) => {
      if((document.getElementById("editado") as HTMLFormElement).value == 0)
        resolve();
      else 
        this.alertaService.alertaConfirmacion("Confirmar","¿Desea salir sin guardar los cambios realizados?",resolve,reject);
  });
  }

  onValueChanges(): void {
    this.loginForm.valueChanges.subscribe(val=>{
      (document.getElementById("editado") as HTMLFormElement).value = 1;
    })
  }

  formValidator(): boolean {
    if (validator.isEmpty(this.loginForm.value.nombre)) {
      this.loginFormValidator.nombre.mensaje = 'Es necesario capturar el Nombre Completo';
      this.cambiarDiseñoInput("nombre",1);
      return false;
      } else {
      this.loginFormValidator.nombre.mensaje = '';
      this.cambiarDiseñoInput("nombre");
    }
    if (validator.isEmpty(this.loginForm.value.nacimiento)) {
      this.loginFormValidator.nacimiento.mensaje = 'Es necesario seleccionar la Fecha de nacimiento';
      this.cambiarDiseñoInput("nacimiento",1);
      return false;
      } else {
      this.loginFormValidator.nacimiento.mensaje = '';
      this.cambiarDiseñoInput("nacimiento");
      }
    if (validator.isEmpty(this.loginForm.value.usu)) {
      this.loginFormValidator.usu.mensaje = 'Es necesario capturar el Usuario';
      this.cambiarDiseñoInput("usu",1);
      return false;
      } else {
      this.loginFormValidator.usu.mensaje = '';
      this.cambiarDiseñoInput("usu");
    }
    if (validator.isEmpty(this.loginForm.value.contra)) {
      this.loginFormValidator.contra.mensaje = 'Es necesario capturar la Contraseña';
      this.cambiarDiseñoInput("contra",1);
      return false;
      } else {
      this.loginFormValidator.contra.mensaje = '';
      this.cambiarDiseñoInput("contra");
    }
    if (validator.isEmpty(this.loginForm.value.contraConfirma)) {
      this.loginFormValidator.contraConfirma.mensaje = 'Es necesario confirmar la Contraseña';
      this.cambiarDiseñoInput("contraConfirma",1);
      return false;
      } else {
      this.loginFormValidator.contraConfirma.mensaje = '';
      this.cambiarDiseñoInput("contraConfirma");
    }
    if (this.loginForm.value.contraConfirma != this.loginForm.value.contra) {
      this.loginFormValidator.contraConfirma.mensaje = 'Las contraseñas no coinciden, favor de ingresarlas correctamente';
      return false;
    } else {
      this.loginFormValidator.contraConfirma.mensaje = '';
    }
    if (validator.isEmpty(this.loginForm.value.email)) {
    this.loginFormValidator.email.mensaje = 'Es necesario capturar el Correo Electrónico';
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
    if (validator.isEmpty(this.loginForm.value.emailConfirma)) {
    this.loginFormValidator.emailConfirma.mensaje = 'Es necesario confirmar Correo Electrónico';
    this.cambiarDiseñoInput("emailConfirma",1);
    return false;
    } else {
    this.loginFormValidator.emailConfirma.mensaje = '';
    this.cambiarDiseñoInput("emailConfirma");
    }
    if (!validator.isEmail(this.loginForm.value.emailConfirma)) {
      this.loginFormValidator.emailConfirma.mensaje = 'Ingrese una dirección de correo válida';
      this.cambiarDiseñoInput("emailConfirma",1);
      return false;
      } else {
      this.loginFormValidator.emailConfirma.mensaje = '';
      this.cambiarDiseñoInput("emailConfirma");
      }
      if (this.loginForm.value.emailConfirma != this.loginForm.value.email) {
        this.loginFormValidator.emailConfirma.mensaje = 'Los correos ingresadas no coinciden, favor de ingresarlas correctamente';
        return false;
      } else {
        this.loginFormValidator.emailConfirma.mensaje = '';
      }
    if (validator.isEmpty(this.loginForm.value.tel)) {
      this.loginFormValidator.tel.mensaje = 'Ingrese el teléfono';
      this.cambiarDiseñoInput("tel",1);
      return false;
      } else {
      this.loginFormValidator.tel.mensaje = '';
      this.cambiarDiseñoInput("tel");
      }
    return true;
  }

  ingresarClave() {
    this.navCtrl.push(RegistroPage);
  }

  validar() {
    //user/email
    if (this.formValidator()){
      let loading = this.loadingCtrl.create();
      loading.present();
      this.restService.getToken().timeout(this.restService.timeOver).subscribe(data => {
        if (data == null) {
          loading.dismiss();
          this.alertaService.warnAlert(this.restService.headerValidacion, this.restService.mensajeValidacionAdmin, null);
        } else {
          const body = new HttpParams()
            .set('Password', this.loginForm.value.contra)
            .set('Nombre',this.loginForm.value.nombre)
            .set('Email',this.loginForm.value.email)//En el diseño no se pide correo
            .set('Alias',this.loginForm.value.usu)
            .set('FechaNacimiento',this.loginForm.value.nacimiento)
            .set('Telefono',this.loginForm.value.tel);
          this.restService.restServicePOSTTokenXForm("user/movil", body, data.toString()).timeout(this.restService.timeOver).subscribe(
            dataRegistro => {
              (document.getElementById("editado") as HTMLFormElement).value = 0;
              if (dataRegistro['Status'] == 1) {
                const bodys = new HttpParams()
                .set('Email', this.loginForm.value.email)
                .set('Password', this.loginForm.value.contra);
                this.restService.restServicePOSTTokenXForm("session/user", bodys, data.toString()).timeout(this.restService.timeOver).subscribe(
                  dataLogin => {
                    if (Object.keys(dataLogin['Response']).length != 0) {
                      this.localStorage.ready().then(() => {
                        this.localStorage.get(`@userSession`).then((data) => {
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
                            this.navCtrl.setRoot(HomePage, { usuario: dataLogin['Response'] });
                          
                        });
                      });
                    } else {
                      this.alertaService.warnAlert(this.restService.headerValidacion, "El correo o la contraseña son incorrectos", null);
                    }
                    loading.dismiss();
                  }, error => {
                    loading.dismiss();
                    console.log(error);
                    this.alertaService.errorAlert(this.restService.headerError, this.restService.mensajeError, null);
                  }
                );
              } else {
                if(dataRegistro['Message'] == 6)
                  this.alertaService.warnAlert(this.restService.headerValidacion, "Este correo electrónico ya fue registrado", null);
                else
                this.alertaService.warnAlert(this.restService.headerValidacion, "No se pudo registrar al usuario", null);
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
  }

  cambiarDiseñoInput(id: string, color: number = 0){
    let strColor = color == 1 ? "red" : "white";
    (document.getElementById(id) as HTMLFormElement).style.backgroundColor = strColor;
  }

}
