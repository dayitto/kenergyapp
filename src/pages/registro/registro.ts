import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, MenuController, Events, LoadingController } from 'ionic-angular';
import { HomePage } from '../home/home';
import { AlertaServiceProvider } from '../../providers/alerta-service';
import { RestServiceProvider } from '../../providers/rest-service';
import { HttpParams } from '@angular/common/http';
import { Storage } from '@ionic/storage';

@IonicPage()
@Component({
  selector: 'page-registro',
  templateUrl: 'registro.html',
})
export class RegistroPage {
  public clave:string="";
  public contrasenia:string="";
  public nuevaContrasenia:string="";
  public nombreCompleto:string="";
  public alias:string="";
  public email:string="";

  constructor(public navCtrl: NavController, public navParams: NavParams,public menuCtrl: MenuController,
    private alertaService:AlertaServiceProvider,
    private restService:RestServiceProvider,
    public loadingCtrl: LoadingController,
    public localStorage: Storage,
    public events: Events) {
    this.menuCtrl.enable(false, "authenticated")
    this.email = navParams.get('email');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RegistroPage');
  }
  
  ingresar(){
    if (this.clave == undefined || this.nuevaContrasenia == undefined || this.alias == undefined || this.contrasenia == undefined || this.nombreCompleto == undefined ||
      this.clave == null || this.nuevaContrasenia == null || this.alias == null || this.contrasenia == null || this.nombreCompleto == null ||
      this.clave.length == 0 || this.nuevaContrasenia.length == 0 || this.alias.length == 0 || this.contrasenia.length == 0 || this.nombreCompleto.length == 0) {
      this.alertaService.warnAlert(this.restService.headerValidacion, "Favor de capturar todos los datos", null);
      return;
    } else if (this.nuevaContrasenia != this.contrasenia) {
      this.alertaService.warnAlert(this.restService.headerValidacion, "Las contraseñas ingresadas no coinciden, favor de verificar", null);
      return;
    } else {
      let loading = this.loadingCtrl.create();
      loading.present();
      this.restService.getToken().timeout(this.restService.timeOver).subscribe(data => {
        if (data == null) {
          loading.dismiss();
          this.alertaService.warnAlert(this.restService.headerValidacion, this.restService.mensajeValidacionAdmin, null);
        } else {
          let body = new HttpParams();
          const bodys = new HttpParams()
            .set('Clave', this.clave)
            .set('Password', this.nuevaContrasenia)
            .set('Nombre',this.nombreCompleto)
            .set('Email',this.email)//En el diseño no se pide correo
            .set('Alias',this.alias);
          this.restService.restServicePOSTTokenXForm("user/regular", bodys, data.toString()).timeout(this.restService.timeOver).subscribe(
            dataRegistro => {
              if (Object.keys(dataRegistro['Response']).length != 0) {
                if (dataRegistro['Response'] == true) {


                  this.localStorage.ready().then(() => {
                    this.localStorage.get(`@userSession`).then((data) => {
                      this.localStorage.set(`@userSession`, dataRegistro['Response']);
                      let dato = {
                        valor: 1,
                        user: dataRegistro['Response']
                      }
                      this.events.publish('menu:changed', dato);
                      this.navCtrl.setRoot(HomePage, { usuario: dataRegistro['Response'] });
                    });
                  });
                  



                } else {
                  this.alertaService.warnAlert(this.restService.headerValidacion, "Correo sin asignación", null);
                }
              } else {
                this.alertaService.warnAlert(this.restService.headerValidacion, "Verifica tus datos, no se encontraron en el sistema", null);
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
}
