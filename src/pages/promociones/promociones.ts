import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';
import { PromocionModel } from '../../models/promocionModel';
import { TerminosPage } from '../terminos/terminos';
import { AbrirnotificacionesService } from '../../services/abrirnotificaciones.service';
import { NotificacionService } from '../../services/notificaciones.service';

@IonicPage()
@Component({
  selector: 'page-promociones',
  templateUrl: 'promociones.html',
})
export class PromocionesPage {
  public promociones: PromocionModel[] = [];

  constructor(public navCtrl: NavController, public navParams: NavParams, public modalController: ModalController,
    public notificacion: NotificacionService, public mostrarNotif: AbrirnotificacionesService) {
    this.promociones.push(
      new PromocionModel(
        "Vales de Gasolina",
        "Al escanear tu código QR en cada carga participas en la rifa mensual de vales de gasolina por $100.00 c/u.",
        "promo1.png",
        "• Todos los clientes que cuenten y utilicen su llavero participan en el sorteo. • Los ganadores son seleccionados de manera aleatoriaa inicio de mes.• Serán 15 ganadores al alzar por cada estación de servicio; (Ixtaczoquitlán, Orizaba, Córdoba y Veracruz). • Las listas de los ganadores son publicadas en la página de Facebook: www.facebook.com/GasolineraKANZ, y en las estaciones de servicio. • Consulta las listas y conoce si fuiste uno de los afortunados ganadores. • Se da a conocer el nombre del ganador con el que se realizó el registro y el no. de cliente que se encuentras al reverso de tu tarjeta de cliente frecuente."));
    this.promociones.push(
      new PromocionModel(
        "Aspirado Gratis!",
        "¡Aspiramos tu Auto¡ Válido en cargas de 20 Lt en autos y 30 Lt en camionetas o vans..",
        "promo2.png",
        "• Todos los clientes que cuenten y utilicen su llavero participan en el sorteo. • Los ganadores son seleccionados de manera aleatoriaa inicio de mes.• Serán 15 ganadores al alzar por cada estación de servicio; (Ixtaczoquitlán, Orizaba, Córdoba y Veracruz). • Las listas de los ganadores son publicadas en la página de Facebook: www.facebook.com/GasolineraKANZ, y en las estaciones de servicio. • Consulta las listas y conoce si fuiste uno de los afortunados ganadores. • Se da a conocer el nombre del ganador con el que se realizó el registro y el no. de cliente que se encuentras al reverso de tu tarjeta de cliente frecuente."));
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PromocionesPage');
  }

  openPromo(promocion:PromocionModel){
    this.navCtrl.push(TerminosPage,{promocion});
  }
}
