import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, MenuController } from 'ionic-angular';
import { RegistroValidaCreditoPage } from '../registro-valida-credito/registro-valida-credito';
import { RegistroValidaPage } from '../registro-valida/registro-valida';
import { AlertaServiceProvider } from '../../providers/alerta-service';
import { RecuperarContraPage } from '../recuperar-contra/recuperar-contra';

@IonicPage()
@Component({
  selector: 'page-registro-preview',
  templateUrl: 'registro-preview.html',
})
export class RegistroPreviewPage {

  tipo: number = 0;

  constructor(public navCtrl: NavController, public navParams: NavParams,
    public menuCtrl: MenuController, private alertaService: AlertaServiceProvider) {
    this.menuCtrl.enable(false, "authenticated");
    this.tipo = navParams.get("tipo");
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RegistroPreviewPage');
  }

  openRegistro(ruta: any) {
    if (ruta == 1) {
      this.navCtrl.push(this.tipo == 1 ? RegistroValidaPage : RecuperarContraPage);
    } else {
      this.alertaService.alertaSinSalidaBoton(this.tipo == 1 ? "Registro para clientes de crédito" : "Recuperación de contraseña para clientes de crédito",this.tipo == 1 ? "Solicita tu usuario con tu ejecutivo de venta, comunícate al tel: <a href='tel:2727280112'>(272) 7280112</a> o al correo <a href='mailto:registro@kenergyfuel.com'>registro@kenergyfuel.com</a>" : "Solicita tu contraseña con tu ejecutivo de venta, comunícate al tel: <a href='tel:2727280112'>(272) 7280112</a> o al correo <a href='mailto:registro@kenergyfuel.com'>registro@kenergyfuel.com</a>");
    }
  }

}
