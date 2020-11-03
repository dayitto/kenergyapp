import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, MenuController, Events, LoadingController } from 'ionic-angular';
import { HomeCreditoPage } from '../home-credito/home-credito';
import { RestServiceProvider } from '../../providers/rest-service';
import { AlertaServiceProvider } from '../../providers/alerta-service';
import { HttpParams } from '@angular/common/http';
import { Storage } from '@ionic/storage';

@IonicPage()
@Component({
  selector: 'page-registro-credito',
  templateUrl: 'registro-credito.html',
})
export class RegistroCreditoPage {
  public clave: string = null;
  public nuevaContrasenia: string = null;
  public nuevaContraseniaConfirm: string = null;
  public nombre: string = null;
  public alias: string = null;
  public celular: string = null;

  constructor(public navCtrl: NavController, public navParams: NavParams, public menuCtrl: MenuController,public localStorage: Storage,
    public events: Events, public restService: RestServiceProvider, public loadingCtrl: LoadingController, public alertaService: AlertaServiceProvider) {
    this.menuCtrl.enable(false, "authenticated")
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RegistroCreditoPage');
  }

  irHomeCredito() {
    if (this.clave == undefined || this.nuevaContrasenia == undefined || this.alias == undefined || this.celular == undefined || this.nombre == undefined ||
      this.clave == null || this.nuevaContrasenia == null || this.alias == null || this.celular == null || this.nombre == null ||
      this.clave.length == 0 || this.nuevaContrasenia.length == 0 || this.alias.length == 0 || this.celular.length == 0 || this.nombre.length == 0) {
      this.alertaService.warnAlert(this.restService.headerValidacion, "Favor de capturar todos los datos", null);
      return;
    } else if (this.nuevaContrasenia != this.nuevaContraseniaConfirm) {
      this.alertaService.warnAlert(this.restService.headerValidacion, "Los correos ingresados no coinciden", null);
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
          /**
           * String:Clave(Requerido)
String:Password:50 (Requerido)
String:Nombre :255(Requerido)
String:Email:250(Requerido)
String:Alias:50(Requerido)
Int:IdClient

           */
          //Definir bien cual es el ultimo template
          body.append("Clave", this.clave);
          body.append("Password", this.nuevaContrasenia);
          body.append("Nombre", this.nombre);
          body.append("Email", this.celular);
          body.append("Alias", this.clave);
          const bodys = new HttpParams()
            .set('Clave', this.clave)
            .set('Password', this.nuevaContrasenia)
            .set('Nombre',this.nombre)
            .set('Email',this.celular)
            .set('Alias',this.clave);
          this.restService.restServicePOSTTokenXForm("user/email", bodys, data.toString()).timeout(this.restService.timeOver).subscribe(
            dataRegistro => {
              if (Object.keys(dataRegistro['Response']).length != 0) {
                if (dataRegistro['Response'] == true) {


                  this.localStorage.ready().then(() => {
                    this.localStorage.get(`@userSession`).then((data) => {
                      this.localStorage.set(`@userSession`, dataRegistro['Response']);
                      let dato = {
                        valor: 2,
                        user: dataRegistro['Response']
                      }
                      this.events.publish('menu:changed', dato);
                      this.navCtrl.setRoot(HomeCreditoPage, { usuario: dataRegistro['Response'] });
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