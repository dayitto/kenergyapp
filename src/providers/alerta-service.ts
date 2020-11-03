import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AlertController } from 'ionic-angular';

/*
  Generated class for the AlertaServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class AlertaServiceProvider {

  constructor(public http: HttpClient, public alertCtrl: AlertController,) {

  }

  alertaBasica(titulo: string, subtitulo: string, accion: any) {
    const alert = this.alertCtrl.create({
      title: titulo,
      subTitle: subtitulo,
      cssClass: 'alertCustomCss',
      buttons: [
        {
          text: 'Aceptar',
          handler: () => {
            if(accion!=null){
              accion();
            }
          }
        }
      ]
    });
    alert.present();
  }

  warnAlert(titulo: string, subtitulo: string, accion: any) {
    const alert = this.alertCtrl.create({
      title: titulo,
      subTitle: subtitulo,
      cssClass: 'warnAlert',
      buttons: [
        {
          text: 'Aceptar',
          handler: () => {
            if(accion!=null){
              accion();
            }
          }
        }
      ]
    });
    alert.present();
  }

  errorAlert(titulo: string, subtitulo: string, accion: any) {
    const alert = this.alertCtrl.create({
      title: titulo,
      subTitle: subtitulo,
      cssClass: 'errorAlert',
      buttons: [
        {
          text: 'Aceptar',
          handler: () => {
            if(accion!=null){
              accion();
            }
          }
        }
      ]
    });
    alert.present();
  }

  alertaConfirmacion(titulo: string, mensaje: string, accionAceptar: any, accionCancelar: any) {
    const confirm = this.alertCtrl.create({
      title: titulo,
      message: mensaje,
      buttons: [
        {
          text: 'Aceptar',
          handler: () => {
            accionAceptar();
          }
        },
        {
          text: 'Cancelar',
          role: 'cancel',
          handler: () => {
            if (accionCancelar != null) {
              accionCancelar();
            }
          }
        }
      ]
    });
    confirm.present();
  }

  alertaInput(titulo: string, mensaje: string, accionAceptar: any, accionCancelar: any, inputsE: any[]) {
    const prompt = this.alertCtrl.create({
      title: titulo,
      message: mensaje,
      inputs: inputsE,
      cssClass: 'alertCustomCss',
      buttons: [
        {
          text: 'Cancelar',
          handler: () => {
            if (accionCancelar != null) {
              accionCancelar();
            }
          }
        },
        {
          text: 'Aceptar',
          handler: () => {
            accionAceptar();
          }
        }
      ]
    });
    prompt.present();
  }

  alertaSinSalida(titulo: string, subtitulo: string) {
    const alert = this.alertCtrl.create({
      title: titulo,
      subTitle: subtitulo,
      cssClass: 'errorAlert',
      enableBackdropDismiss: false
    });
    alert.present();
  }

  alertaSinSalidaBoton(titulo: string, subtitulo: string) {
    const alert = this.alertCtrl.create({
      title: titulo,
      subTitle: subtitulo,
      cssClass: 'errorAlert',
      enableBackdropDismiss: false,
      buttons: [
        {
          text: 'Aceptar',
          handler: () => {
          }
        }
      ]
    });
    alert.present();
  }
  
}
