import { Component, ɵConsole } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, AlertController, ViewController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { AlertaServiceProvider } from '../../providers/alerta-service';
import { RestServiceProvider } from '../../providers/rest-service';
import { HttpParams } from '@angular/common/http';
import { AvisoPrivacidadPage } from '../aviso-privacidad/aviso-privacidad';
import { NotificacionService } from '../../services/notificaciones.service';
import { AbrirnotificacionesService } from '../../services/abrirnotificaciones.service';
import { UsuarioService } from '../../services/usuario.service';

@IonicPage()
@Component({
  selector: 'page-mis-datos-credito',
  templateUrl: 'mis-datos-credito.html',
})
export class MisDatosCreditoPage {
  public usuario: String = "";
  public email: String = "";
  public user: any = null;

  public nombre: string = null;
  public celular: string = null;
  constructor(public navCtrl: NavController, public navParams: NavParams, public localStorage: Storage,
    public alertaService: AlertaServiceProvider, public restService: RestServiceProvider,
    public loadingCtrl: LoadingController, public alertCtrl: AlertController, public viewCtrl: ViewController,
    public notificacion: NotificacionService, public mostrarNotif: AbrirnotificacionesService,
    public usuarioService: UsuarioService) {
    this.openSesion();
  }

  openSesion() {
    this.localStorage.ready().then(() => {
      this.localStorage.get(`@userSession`).then((data) => {
        if (data != null) {
          this.user = data;
          this.usuario = this.user.Nombre;
          this.email = this.user.Email;
          this.nombre = this.user.Nombre;
          if (this.user.Celular != undefined) {
            this.celular = this.user.Celular;
          }
          //this.cargarEdosCuenta();
        } else {
          this.alertaService.warnAlert(this.restService.headerValidacion, "Usuario sin sesión, no se cargarán sus datos", null);
        }
      });
    });

  }

  editarUsuario(resolve: any = null) {
    let loading = this.loadingCtrl.create();
    loading.present();
    this.restService.getToken().timeout(this.restService.timeOver).subscribe(data => {
      if (data == null) {
        loading.dismiss();
        this.alertaService.warnAlert(this.restService.headerValidacion, this.restService.mensajeValidacionAdmin, null);
      } else {
        if (this.user != null) {
          if (this.nombre == undefined || this.celular == undefined ||
            this.nombre == null || this.celular == null ||
            this.nombre.length == 0 || this.celular.length == 0) {
            loading.dismiss();
            this.alertaService.warnAlert(this.restService.headerValidacion, "Favor de capturar todos los datos", null);
            return;
          } else {
            var a = 1666;
            var urlArmada = "user/update/" + this.user.Id;
            const bodys = new HttpParams()
            .set('Nombre', this.nombre)
            .set('Alias', "-")
            .set('Celular',this.celular);
            this.restService.restServicePOSTTokenXForm(urlArmada, bodys, data.toString()).timeout(this.restService.timeOver).subscribe(
              dataRegistro => {
                if (Object.keys(dataRegistro['Response']).length != 0) {
                  //this.combustibles.push(new CombustibleModel("Ixtaczoquitlan", 88.88, 88.88, 88.88, true));
                } else if (dataRegistro['Status'] == 0) {
                  this.alertaService.warnAlert(this.restService.headerValidacion, dataRegistro['Message'], null);
                } else if (dataRegistro['Response'] == true) {
                  this.user.Nombre = this.nombre;
						let element: HTMLElement = (document.getElementsByClassName("nombreUsuario")[0] as HTMLFormElement);
                  element.innerText = this.user.Nombre;
                  this.user.Celular = this.celular;
                  this.usuarioService.cambiarNombre(this.nombre);
                  this.localStorage.set("@userSession",this.user);
                  (document.getElementById("editado") as HTMLFormElement).value = 0;
                  this.alertaService.alertaBasica(this.restService.headerExito, "Sus datos se han actualizado", null);
                  this.usuarioService.nombreUsuario = this.nombre.toString();
                  if(resolve != null)
                    resolve();
                } else {
                  this.alertaService.warnAlert(this.restService.headerValidacion, "Verifique los datos ingresados", null);
                }
                loading.dismiss();
              }, error => {
                loading.dismiss();
                console.log(error);
                this.alertaService.errorAlert(this.restService.headerError, this.restService.mensajeError, null);
              }
            );
          }
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
  
  openAvisoPrivacidad() {
    this.navCtrl.push(AvisoPrivacidadPage, { usuario: this.usuario });
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

  indicarCambio(){
    (document.getElementById("editado") as HTMLFormElement).value = 1;
  }

  mensajeUsuario(){
    this.alertaService.alertaSinSalidaBoton("Solicita un nuevo registro","Solicita tu usuario con tu ejecutivo de venta, comunícate al tel: <a href='tel:2727280112'>(272) 7280112</a> o al correo <a href='mailto:registro@kenergyfuel.com'>registro@kenergyfuel.com</a>");
  }

}
