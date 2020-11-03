import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import { FacturaModel } from '../../models/facturaModel';
import { DatosFacturacionPage } from '../datos-facturacion/datos-facturacion';
import { EstadisticasPage } from '../estadisticas/estadisticas';
import { Storage } from '@ionic/storage';
import { AlertaServiceProvider } from '../../providers/alerta-service';
import { RestServiceProvider } from '../../providers/rest-service';
import { HttpParams } from '@angular/common/http';
import { NotificacionService } from '../../services/notificaciones.service';
import { AbrirnotificacionesService } from '../../services/abrirnotificaciones.service';

@IonicPage()
@Component({
  selector: 'page-aviso-privacidad',
  templateUrl: 'aviso-privacidad.html',
})
export class AvisoPrivacidadPage {
  

  public usuario: any = null;
  constructor(public navCtrl: NavController, public navParams: NavParams,
    public localStorage: Storage, private alertaService: AlertaServiceProvider,
    private restService: RestServiceProvider, public loadingCtrl: LoadingController, public notificacion: NotificacionService, public mostrarNotif: AbrirnotificacionesService) {
    //this.usuario = navParams.get("usuario");
    
  }

  
}
