import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, AlertController, ModalController, ViewController } from 'ionic-angular';
import { FacturaModel } from '../../models/facturaModel';
import { DatosFacturacionPage } from '../datos-facturacion/datos-facturacion';
import { Storage } from '@ionic/storage';
import { AlertaServiceProvider } from '../../providers/alerta-service';
import { RestServiceProvider } from '../../providers/rest-service';
import { HttpParams } from '@angular/common/http';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite';
import { FormGroup, FormControl } from '@angular/forms';
import validator from 'validator';
import { CambiarContraPage } from '../cambiar-contra/cambiar-contra';
import { AbrirnotificacionesService } from '../../services/abrirnotificaciones.service';
import { NotificacionService } from '../../services/notificaciones.service';
import { UsuarioService } from '../../services/usuario.service';
import { CambiarEmailPage } from '../cambiar-email/cambiar-email';
import { HomePage } from '../home/home';

@IonicPage()
@Component({
  selector: 'page-mis-datos',
  templateUrl: 'mis-datos.html',
})
export class MisDatosPage {
  public facturas: FacturaModel[] = [];

  public usuario: any = null;

  public loginForm = new FormGroup({
    nombre: new FormControl(''),
    alias: new FormControl(''),
    telefono: new FormControl(''),
    nacimiento: new FormControl(''),
    email: new FormControl(''),
    contra: new FormControl('')
    });

  public loginFormValidator = {
    nombre: {
      mensaje: ''
      },
      alias: {
        mensaje: ''
        },
        telefono: {
          mensaje: ''
          },
          nacimiento: {
            mensaje: ''
            }
  };
  
  public loginForm2 = new FormGroup({
    editado: new FormControl(0)
    });
  
  constructor(public navCtrl: NavController, public navParams: NavParams,
    public localStorage: Storage, private alertaService: AlertaServiceProvider,
    private restService: RestServiceProvider, public loadingCtrl: LoadingController,
    public alertCtrl: AlertController,
    public notificacion: NotificacionService, public mostrarNotif: AbrirnotificacionesService,
    public usuarioService: UsuarioService, public viewCtrl: ViewController) {
    //this.usuario = navParams.get("usuario");
    if (this.usuario == null)
      this.openSesion();
    else
      this.cargarUsuario();
  }

  ionViewDidEnter(){
    this.cargaFacturarA();
  }

  ionViewCanLeave() {
    return new Promise((resolve, reject) => {
      if(this.loginForm2.value.editado <= 0)
        resolve();
      else 
        this.alertaService.alertaConfirmacion("Confirmar","¿Desea salir sin guardar los cambios realizados?",resolve,reject);
  });
  }

  cargarUsuario() {
    let loading = this.loadingCtrl.create();
    loading.present();
    this.restService.getToken().timeout(this.restService.timeOver).subscribe(data => {
      if (data == null) {
        loading.dismiss();
        this.alertaService.warnAlert(this.restService.headerValidacion, this.restService.mensajeValidacionAdmin, null);
      } else {
        if (this.usuario != null) {
          console.log("diferente a null");
          let body = new HttpParams();
          //var a = 44;
          var a = this.usuario.Id;
          var url = "user/regular/" + a.toString();
          this.restService.restServiceGETToken(url, new HttpParams(), data.toString()).timeout(this.restService.timeOver).subscribe(
            dataRegistro => {
              if (dataRegistro['Response'].Id != undefined && dataRegistro['Response'].Id != null) {
                console.log(dataRegistro['Response']);
                let usuarioTemp = dataRegistro['Response'];
                this.usuario.Celular = usuarioTemp.Tel;
                this.usuario.puntos = usuarioTemp.Puntos;
                this.usuario.Alias = usuarioTemp.Alias;
                //(document.getElementById("pts") as HTMLFormElement).value = this.usuario.puntos;
                //(document.getElementById("ptst") as HTMLFormElement).value = usuarioTemp.PuntosTemp;
                this.loginForm.patchValue({
                  nombre: this.usuario.Nombre,
                  alias: this.usuario.Alias,
                  telefono: this.usuario.Celular,
                  email: this.censorEmail(this.usuario.Email),
                  nacimiento: usuarioTemp.FechaNacimiento,
                  contra: usuarioTemp.Password
                });
                this.loginForm2.patchValue({
                  editado: 0
                });
              } else {
                this.alertaService.warnAlert(this.restService.headerValidacion, "No se encontraron sus datos", null);
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
        
        this.onValueChanges();
      }
    }, error => {
      loading.dismiss();
      console.log(error);
      this.alertaService.errorAlert(this.restService.headerError, this.restService.mensajeError, null);
    });
  }

	cambiarContrasenia() {
    this.navCtrl.push(CambiarContraPage, { usuario: this.usuario });
  }
  
  cambiarEmail() {
    this.navCtrl.push(CambiarEmailPage, { usuario: this.usuario });
	}
   
   guardarUsuario() {
    let loading = this.loadingCtrl.create();
    loading.present();
    if(this.formValidator()){
    this.restService.getToken().timeout(this.restService.timeOver).subscribe(data => {
      let urlArmada = "user/regular/" + this.usuario.Id;
      let bodyObj = {
        Nombre: this.loginForm.value.nombre,
        Alias: this.loginForm.value.alias,
        Password: '-',
        Tel: this.loginForm.value.telefono,
        FechaNacimiento: this.loginForm.value.nacimiento
      };
      this.restService.restServicePUTToken(urlArmada, bodyObj, data.toString()).timeout(this.restService.timeOver).subscribe(
        dataRegistro => {
          if (dataRegistro['Status'] == 1) {
            this.loginForm2.patchValue({
              editado: 0
            });
            this.alertaService.alertaBasica(this.restService.headerExito, "Sus datos se han guardado correctamente", null);
            this.usuario.Alias = bodyObj.Alias;
            this.usuario.Nombre = bodyObj.Nombre;
            this.usuario.Celular = bodyObj.Tel;
            this.usuarioService.cambiarNombre(bodyObj.Nombre);
            this.localStorage.ready().then(() => {
              this.localStorage.get(`@userSession`).then((data) => {
                this.localStorage.set(`@userSession`, this.usuario);
              });
            });
          } else {
            this.alertaService.warnAlert(this.restService.headerValidacion, dataRegistro['Message'], null);
          }
          loading.dismiss();
        }, error => {
          loading.dismiss();
          console.log(error);
          this.alertaService.errorAlert(this.restService.headerError, this.restService.mensajeError, null);
        });
    }, error => {
      loading.dismiss();
      console.log(error);
      this.alertaService.errorAlert(this.restService.headerError, this.restService.mensajeError, null);
    });
  }
  loading.dismiss();
  }

  openSesion() {
    this.localStorage.ready().then(() => {
      this.localStorage.get(`@userSession`).then((data) => {
        if (data != null) {
          this.usuario = data;
          this.cargarUsuario();
        } else {
          this.alertaService.warnAlert(this.restService.headerValidacion, "Usuario sin sesión, no se cargarán sus datos", null);
        }
      });
    });

  }

  facturarA() {
    this.navCtrl.push(DatosFacturacionPage, { idUsuario: this.usuario.Id });
  }
  
	editarFacturarA(factura: FacturaModel) {
    this.navCtrl.push(DatosFacturacionPage, { idUsuario: this.usuario.Id, editar: 1, factura: factura });
	}
  
	cargaFacturarA() {
    this.facturas = [];
		//invoiceto/regular/{id usuario}
		let loading = this.loadingCtrl.create();
    loading.present();
    this.restService.getToken().timeout(this.restService.timeOver).subscribe(data => {
      if (data == null) {
        loading.dismiss();
        this.alertaService.warnAlert(this.restService.headerValidacion, this.restService.mensajeValidacionAdmin, null);
      } else {
        if (this.usuario != null) {
          //let body = new HttpParams();
          //var a = 44;
          var a = this.usuario.Id;
          var url = "invoiceto/regular/" + a.toString();
          this.restService.restServiceGETToken(url, new HttpParams(), data.toString()).timeout(this.restService.timeOver).subscribe(
            dataRegistro => {
              if(dataRegistro['Response']!=null && dataRegistro['Response'] instanceof Array){
                  let array = dataRegistro['Response'];
              		array.forEach(factura => {
              			this.facturas.push(new FacturaModel
              				(factura.RFC, factura.RFC, factura.RazonSocial, 
              				factura.Email, factura.Dir, "", "", "", "", "", "",factura.Id))
            		});
              }
              //this.facturas.push(new FacturaModel("APR9609194H4", "APR9609194H4", "AB PRO SC.", "felectronica@grupotabar.com", "", "", "", "", "Ver.", "Ixtaczoquitlán", ""));
      		//	this.facturas.push(new FacturaModel("APR9609194H4", "APR9609194H4", "AB PRO SC.", "felectronica@grupotabar.com", "", "", "", "", "Ver.", "Ixtaczoquitlán", ""));
      
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
  
  formValidator(): boolean {
    if (validator.isEmpty(this.loginForm.value.nombre)) {
      this.loginFormValidator.nombre.mensaje = 'Es necesario capturar el Nombre';
      this.cambiarDiseñoInput("nombre",1);
      return false;
      } else {
      this.loginFormValidator.nombre.mensaje = '';
      this.cambiarDiseñoInput("nombre");
    }
    /*if (validator.isEmpty(this.loginForm.value.alias)) {
      this.loginFormValidator.alias.mensaje = 'Es necesario capturar el Alias';
      this.cambiarDiseñoInput("alias",1);
      return false;
      } else {
      this.loginFormValidator.alias.mensaje = '';
      this.cambiarDiseñoInput("alias");
    }*/
    if (validator.isEmpty(this.loginForm.value.telefono)) {
      this.loginFormValidator.telefono.mensaje = 'Es necesario capturar el Teléfono';
      this.cambiarDiseñoInput("telefono",1);
      return false;
      } else {
      this.loginFormValidator.telefono.mensaje = '';
      this.cambiarDiseñoInput("telefono");
    }
    if (validator.isEmpty(this.loginForm.value.nacimiento)) {
      this.loginFormValidator.nacimiento.mensaje = 'Es necesario capturar la Fecha de nacimiento';
      this.cambiarDiseñoInput("nacimiento",1);
      return false;
      } else {
      this.loginFormValidator.nacimiento.mensaje = '';
      this.cambiarDiseñoInput("nacimiento");
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

  censorWord = (str: string) => str[0] + "*".repeat(str.length - 2) + str.slice(-1);
 
  censorEmail = (email: string) => this.censorWord(email.split("@")[0]) + "@" + this.censorWord(email.split("@")[1]);

  cancelar(){
    this.navCtrl.setRoot(HomePage);
  }

  eliminarFacturar(id: number) {
    var armaUrl = "invoiceto/regular/" + id;
    this.restService.getToken().timeout(this.restService.timeOver).subscribe(data => {
    this.restService.restServiceDELETEToken(armaUrl, data.toString()).timeout(this.restService.timeOver).subscribe(
      dataFacturar => {
        if(dataFacturar == true){
          this.alertaService.alertaBasica("Eliminación de RFC","El RFC se ha eliminado exitosamente",null);
          let index = this.facturas.findIndex(i => i.id === id);
          this.facturas.splice(index,1);
        }
        else{
          this.alertaService.errorAlert("Error al elimiar registro","No se eliminó el registro, inténtenlo nuevamente.",null);
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

eliminarFacturarAlerta(id: number){
  let razon: string = this.facturas.find(i => i.id == id).razonSocial;
  let alert = this.alertCtrl.create({
    title: 'Confirmar Eliminación',
    message: '¿Seguro que quieres eliminar a ' + razon + ' para facturar?',
    buttons: [
      {
        text: 'Aceptar',
        handler: () => {
          this.eliminarFacturar(id);
        }
      },
      {
        text: 'Cancelar',
        role: 'cancel',
        handler: () => {
        }
      }
    ]
  });
  alert.present();
}
 
}
