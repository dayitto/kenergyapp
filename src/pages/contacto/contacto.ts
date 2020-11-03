import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { ContactoModel } from '../../models/contactoModel';
import { AppAvailability } from '@ionic-native/app-availability';
import { NotificacionService } from '../../services/notificaciones.service';
import { AbrirnotificacionesService } from '../../services/abrirnotificaciones.service';
import { UsuarioService } from '../../services/usuario.service';
import { AvisoPrivacidadPage } from '../aviso-privacidad/aviso-privacidad';
import { RestServiceProvider } from '../../providers/rest-service';
import { AlertaServiceProvider } from '../../providers/alerta-service';
import { HttpParams } from '@angular/common/http';

@IonicPage()
@Component({
  selector: 'page-contacto',
  templateUrl: 'contacto.html',
})
export class ContactoPage {

  public telefonos: ContactoModel[] = [];
  public whatsapp: string;
  public mensajeCRoja = "";
  public mensajeBomberos = "";
  public faceNavegador: string = "";
  public faceApp: string = "";
  public instaNavegador: string = "";
  public instaApp: string = "";

  constructor(public navCtrl: NavController, public navParams: NavParams,public appAvailability: AppAvailability, 
    public notificacion: NotificacionService, public alertCtrl: AlertController, public mostrarNotif: AbrirnotificacionesService,
    private usuarioService: UsuarioService, public restService: RestServiceProvider, public alertaService: AlertaServiceProvider) {
      this.cargarContactos();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ContactoPage');
  }

  abrirPaginaFacebook() {
    this.appAvailability.check("com.facebook.katana")
  .then(
    (yes: boolean) => window.open(this.faceApp, "_system"),
    (no: boolean) => window.open(this.faceNavegador, "_system")
  );
  }

  abrirPaginaInstagram() {
    this.appAvailability.check("com.instagram.android")
  .then(
    (yes: boolean) => window.open(this.instaApp, "_system"),
    (no: boolean) => window.open(this.instaNavegador, "_system")
  );
  }

  alertaCruz() {
      let alert = this.alertCtrl.create({
        title: 'Seleccione la ciudad',
        message: this.mensajeCRoja,
        buttons: [
          {
            text: 'Cancelar',
            role: 'cancel',
            handler: () => {
            }
          }
        ]
      });
      alert.present();
    }

    alertaBomberos() {
      let alert = this.alertCtrl.create({
        title: 'Seleccione la ciudad',
        message: this.mensajeBomberos,
        buttons: [
          {
            text: 'Cancelar',
            role: 'cancel',
            handler: () => {
            }
          }
        ]
      });
      alert.present();
    }

  openAvisoPrivacidad() {
    this.navCtrl.push(AvisoPrivacidadPage, { });
  }

  cargarContactos(){
    this.restService.getToken().timeout(this.restService.timeOver).subscribe(data => {
      if (data == null) {
        this.alertaService.warnAlert(this.restService.headerValidacion, this.restService.mensajeValidacionAdmin, null);
      } else {
          let idApp = this.usuarioService.tipo == 1 ? "4" : "3";
          var url = "contactos/" + idApp;
          this.restService.restServiceGETToken(url, new HttpParams(), data.toString()).timeout(this.restService.timeOver).subscribe(
            dataRegistro => {
              if (Object.keys(dataRegistro['Response']).length != 0) {
                let contactos = dataRegistro['Response'];
                contactos.forEach(contacto => {
                  switch(contacto.Tipo) { 
                    case 1: { 
                      this.telefonos.push(new ContactoModel(contacto.Imagen, contacto.Valor, contacto.Descripcion));
                       break; 
                    } 
                    case 2: { 
                      this.mensajeCRoja += "<a href='tel:" + contacto.Valor + "'>" + contacto.Descripcion + "</a><br/>";
                       break; 
                    } 
                    case 3: {
                      this.mensajeBomberos += "<a href='tel:" + contacto.Valor + "'>" + contacto.Descripcion + "</a><br/>";
                       break; 
                    }
                    case 4: {
                      this.faceNavegador = contacto.Descripcion === "n" ? contacto.Valor : this.faceNavegador;
                      this.faceApp = contacto.Descripcion === "p" ? contacto.Valor : this.faceApp;
                       break; 
                    }
                    case 5: { 
                      this.whatsapp = contacto.Valor;
                      break; 
                   }
                   case 6: { 
                    this.instaNavegador = contacto.Descripcion === "n" ? contacto.Valor : this.instaNavegador;
                    this.instaApp = contacto.Descripcion === "p" ? contacto.Valor : this.instaApp;
                    break; 
                   }  
                 }
                });
              } else {
                this.alertaService.warnAlert(this.restService.headerValidacion, "No se encontraron registros de contacto", null);
              }
              this.telefonos.push(new ContactoModel("911.png", "911", "Emergencias"));
              this.telefonos.push(new ContactoModel("soporte-vial.png", "074", "Auxilio Vial"));
              this.telefonos.push(new ContactoModel("angeles-verdes.png", "078", "Ángeles Verdes"));
            }, error => {
              console.log(error);
              this.alertaService.errorAlert(this.restService.headerError, this.restService.mensajeError, null);
            }
          );
      }
    }, error => {
      console.log(error);
      this.alertaService.errorAlert(this.restService.headerError, this.restService.mensajeError, null);
    });
  }

}

