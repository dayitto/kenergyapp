import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, MenuController, LoadingController } from 'ionic-angular';
import { RegistroValidaCorreoCreditoPage } from '../registro-valida-correo-credito/registro-valida-correo-credito';
import { RestServiceProvider } from '../../providers/rest-service';
import { AlertaServiceProvider } from '../../providers/alerta-service';
import { HttpParams } from '@angular/common/http';

/**
 * Generated class for the RegistroValidaCreditoPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-registro-valida-credito',
  templateUrl: 'registro-valida-credito.html',
})
export class RegistroValidaCreditoPage {
  public email:string=null;
  public rfc:string=null;
  public username:string=null;
  constructor(public navCtrl: NavController, public navParams: NavParams,public menuCtrl: MenuController,
    public restService: RestServiceProvider,public loadingCtrl: LoadingController,public alertaService: AlertaServiceProvider) {
    this.menuCtrl.enable(false, "authenticated")
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RegistroValidaCreditoPage');
  }

  validar(){
    //this.navCtrl.push(RegistroValidaCorreoCreditoPage);
    if(this.email==undefined || this.rfc == undefined || this.username==undefined ||
      this.email==null || this.rfc == null || this.username==null ||
      this.email.length==0 || this.rfc.length == 0 || this.username.length==0){
        this.alertaService.warnAlert(this.restService.headerValidacion, "Favor de capturar todos los datos", null);
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
        /*body.append("Email",this.email);
        body.append("RFC",this.rfc);
        body.append("Username",this.username);*/
        /*body.append("Email","demo@grupotabar.com");
        body.append("RFC","APR-960919-4H4");
        body.append("Username","NO USR");*/
        const bodys = new HttpParams()
            .set('Email', this.email)
            .set('RFC', this.rfc)
            .set('Username',this.username);
        this.restService.restServicePOSTTokenXForm("user/onegoal", bodys, data.toString()).timeout(this.restService.timeOver).subscribe(
          dataRegistro => {
            if (Object.keys(dataRegistro['Response']).length != 0) {
                this.navCtrl.setRoot(RegistroValidaCorreoCreditoPage);
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
