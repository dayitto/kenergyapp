import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, ModalController, ViewController, AlertController } from 'ionic-angular';
import { BarcodeScanner } from '@ionic-native/barcode-scanner';
import { AgregaAutoPage } from '../agrega-auto/agrega-auto';
import { AgregaAutoInfoPage } from '../agrega-auto-info/agrega-auto-info';
import { RestServiceProvider } from '../../providers/rest-service';
import { AlertaServiceProvider } from '../../providers/alerta-service';
import { Storage } from '@ionic/storage';
import { HttpParams } from '@angular/common/http';
import { AbrirnotificacionesService } from '../../services/abrirnotificaciones.service';
import { NotificacionService } from '../../services/notificaciones.service';

@IonicPage()
@Component({
  selector: 'page-agrega-auto-escaner',
  templateUrl: 'agrega-auto-escaner.html',
})
export class AgregaAutoEscanerPage {
  public usuario: any = null;
  public llavero: number = 0;

  constructor(public navCtrl: NavController, public navParams: NavParams, public barcodeScanner: BarcodeScanner, public modalController: ModalController,
    public loadingCtrl: LoadingController, private restService:RestServiceProvider, private alertaService: AlertaServiceProvider,
    public localStorage: Storage, public notificacion: NotificacionService, 
    public mostrarNotif: AbrirnotificacionesService, public viewCtrl: ViewController,
    public alertCtrl: AlertController) {
      this.usuario = navParams.get("usuario");
      if (this.usuario == null) {
        this.openSesion();
      }
  }

  openSesion() {
    this.localStorage.ready().then(() => {
      this.localStorage.get(`@userSession`).then((data) => {
        if (data != null) {
          this.usuario = data;
        } else {
          this.alertaService.warnAlert(this.restService.headerValidacion, "Usuario sin sesión, no se cargarán sus datos", null);
        }
      });
    });

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AgregaAutoEscanerPage');
  }
  escaner2(){
    this.agregar(1234);
  }

  escaner() {
    this.barcodeScanner.scan().then(barcodeData => {
      this.agregar(barcodeData.text,1);
      //this.agregar("12356127421200044102");
      //this.navCtrl.push(AgregaAutoInfoPage, { Id: this.usuario.Id, Puntos: barcodeData.text });
      //this.alertaService.alertaBasica("Bien!","Bar code:" + barcodeData.text	+ " idUser:" + this.usuario.Id,null);
    }).catch(err => {
      console.log('Error', err);
      //this.navCtrl.push(AgregaAutoInfoPage);
    });
  }

  agregar(codigo, tipo: number = 0){
        this.restService.getToken().timeout(this.restService.timeOver).subscribe(data => {
          const bodys = new HttpParams()
            .set('Code', codigo)
            .set('Iduser', this.usuario.Id);
        this.restService.restServicePOSTTokenXForm(tipo == 1 ? "user/regular/card" : "usuario/llavero", bodys, data.toString()).timeout(this.restService.timeOver).subscribe(
          dataRegistro => {
            let dato = dataRegistro['Response'];
            //this.alertaService.alertaBasica("Bien!","dato" + JSON.stringify(dataRegistro),null);
            if(dato.Id != undefined && dato.Id != null){
              this.alertaService.alertaBasica("¡Bien!","Tu llavero ha sido añadido",null);
              this.localStorage.ready().then(() => {
                this.localStorage.get(`@userSession`).then((data2) => {
                  data2.LlaveroContado = dato.Id;
                  this.localStorage.set(`@userSession`, data2);
                  this.usuario = data2;
                });
              });
              this.viewCtrl.dismiss();
            }else{
            	if(dataRegistro['Message'] == "6") {
                   this.alertaService.warnAlert("Atención!","Este número de llavero ya fue registrado, intenta nuevamente o contáctanos al <a href='tel:(272) 167 2847'>272 167 2847</a>",null);
           		} else {
           			 this.alertaService.warnAlert("Atención!",dataRegistro['Message'],null);
           		}
            }
          }, error => {
            console.log(error);
				this.alertaService.warnAlert("Error!",error,null);
            this.alertaService.errorAlert(this.restService.headerError, this.restService.mensajeError, null);
          }
        );
        }, error => {
          console.log(error);
          this.alertaService.warnAlert("Error2!",error,null);
          this.alertaService.errorAlert(this.restService.headerError, this.restService.mensajeError, null);
        });
      console.log(codigo);
  }

  omitir(){
    this.navCtrl.push(AgregaAutoPage);
  }

  alertaLlaveroExistente(){
    let alert = this.alertCtrl.create({
      title: '¿Confirmas ser dueño del llavero ' + this.llavero + "?",
      message: 'Al dar clic en ESTOY DE ACUERDO, aceptas los términos y condiciones del programa Amigo Fiel. Consulta nuestro aviso de privacidad en nuestro sitio web.',
      cssClass: 'alertCustomCss3',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          handler: () => {
          }
        },
        {
          text: 'Estoy de acuerdo',
          handler: () => {
            this.agregar(this.llavero)
          }
        }
      ]
    });
    alert.present();
  }

  llaveroNuevo(){
    const bodys = new HttpParams()
    .set('IdUsuario', this.usuario.Id)
    .set('den', this.usuario.Nombre);
      this.restService.getToken().timeout(this.restService.timeOver).subscribe(data => {
              this.restService.restServicePOSTToken("llavero", bodys,data.toString()).timeout(this.restService.timeOver).subscribe(
                dataRegistroLast => {
                  console.log(dataRegistroLast);
                  if(dataRegistroLast > 0){
                    this.alertaService.alertaBasica("Registro de llavero","Tu llavero se ha generado con éxito!",null);
                  this.localStorage.ready().then(() => {
                    this.localStorage.get(`@userSession`).then((data2) => {
                      data2.LlaveroContado = dataRegistroLast;
                      this.localStorage.set(`@userSession`, data2);
                      this.usuario = data2;
                    });
                  });
                  }
                  
              }, error => {
                console.log(error);
                this.alertaService.errorAlert(this.restService.headerError, this.restService.mensajeError, null);
              }
            );
            }
            , error => {
              console.log(error);
              this.alertaService.errorAlert(this.restService.headerError, this.restService.mensajeError, null);
            });
  }
}
