import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, MenuController, LoadingController } from 'ionic-angular';
import { RegistroCreditoPage } from '../registro-credito/registro-credito';
import { AlertaServiceProvider } from '../../providers/alerta-service';
import { RestServiceProvider } from '../../providers/rest-service';
import { HttpParams } from '@angular/common/http';

/**
 * Generated class for the RegistroValidaCorreoCreditoPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-registro-valida-correo-credito',
  templateUrl: 'registro-valida-correo-credito.html',
})
export class RegistroValidaCorreoCreditoPage {
  public email: string = null;
  public emailConfirm: string = null;

  constructor(public navCtrl: NavController, public navParams: NavParams, public menuCtrl: MenuController,
    public restService: RestServiceProvider,public loadingCtrl: LoadingController,public alertaService: AlertaServiceProvider) {
    this.menuCtrl.enable(false, "authenticated")
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RegistroValidaCorreoCreditoPage');
  }

  validar() {
    if(this.email==undefined || this.emailConfirm == undefined ||
      this.email==null || this.emailConfirm == null  ||
      this.email.length==0 || this.emailConfirm.length == 0){
        this.alertaService.warnAlert(this.restService.headerValidacion, "Favor de capturar todos los datos", null);
        return;
    }else if(this.email != this.emailConfirm){
      this.alertaService.warnAlert(this.restService.headerValidacion, "Los correos ingresados no coinciden", null);
        return;
    }else{
      let loading = this.loadingCtrl.create();
      loading.present();
      this.restService.getToken().timeout(this.restService.timeOver).subscribe(data => {
        if (data == null) {
          loading.dismiss();
          this.alertaService.warnAlert(this.restService.headerValidacion, this.restService.mensajeValidacionAdmin, null);
        } else {
          let body = new HttpParams();
          body.append("Email",this.email);
          const bodys = new HttpParams()
            .set('Email', this.email);
          this.restService.restServicePOSTTokenXForm("user/email", bodys, data.toString()).timeout(this.restService.timeOver).subscribe(
            dataRegistro => {
              if (Object.keys(dataRegistro['Response']).length != 0) {
                if(dataRegistro['Response'] == true){
                  this.navCtrl.setRoot(RegistroValidaCorreoCreditoPage);
                }else{
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

  postClave() {
    this.navCtrl.push(RegistroCreditoPage);
  }

}
