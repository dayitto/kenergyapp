import { Injectable } from "@angular/core";
import { ModalController } from "ionic-angular";
import { NotificacionesPage } from "../pages/notificaciones/notificaciones";

@Injectable()
export class AbrirnotificacionesService {
    
  public nav: any;
  constructor(public modalController: ModalController) { }

  abrirNotificacion() {
    this.nav.push(NotificacionesPage);
  }


}