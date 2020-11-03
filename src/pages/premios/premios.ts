import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController, LoadingController } from 'ionic-angular';
import { PremioModel } from '../../models/premioModel';
import { PremiosSolicitudPage } from '../premios-solicitud/premios-solicitud';
import { AlertaServiceProvider } from '../../providers/alerta-service';
import { RestServiceProvider } from '../../providers/rest-service';
import { Storage } from '@ionic/storage';
import { HttpParams } from '@angular/common/http';
import { FormGroup, FormControl } from '@angular/forms';

@IonicPage()
@Component({
  selector: 'page-premios',
  templateUrl: 'premios.html',
})
export class PremiosPage {
  public usuario: any = null;
  public premios: PremioModel[] = [];
  public parametro: any = null;
  public seleccionados: number[] = [];
  public loginForm = new FormGroup({
    puntos: new FormControl(0),
    puntos2: new FormControl(0)
    });

  constructor(public navCtrl: NavController, public navParams: NavParams, public modalController: ModalController,
    public localStorage: Storage,
    public alertaService: AlertaServiceProvider, public restService: RestServiceProvider,
    public loadingCtrl: LoadingController) {
    this.openSesion();
  }

  openSesion() {
    this.localStorage.ready().then(() => {
      this.localStorage.get(`@userSession`).then((data) => {
        if (data != null) {
          this.usuario = data;
          this.obtenerPuntos();
          
    console.log(JSON.stringify(this.usuario));
          this.cargarPremios();
        } else {
          this.alertaService.warnAlert(this.restService.headerValidacion, "Usuario sin sesión, no se cargarán sus datos", null);
        }
      });
    });
  }

  cargarPremios() {
    if (this.usuario == null) {
      this.alertaService.warnAlert(this.restService.headerValidacion, "Usuario no en sesión", null);
    } else {
      
      let loading = this.loadingCtrl.create();
      loading.present();

      this.restService.getToken().timeout(this.restService.timeOver).subscribe(data => {
        if (data == null) {
          loading.dismiss();
          this.alertaService.warnAlert(this.restService.headerValidacion, this.restService.mensajeValidacionAdmin, null);
        } else {
          let body = new HttpParams();

          var a = this.usuario.Id;
          var url = "prize/";
          //var urlArmada = "stats/"+this.usuario.IdClient;
          this.restService.restServiceGETToken(url, body, data.toString()).timeout(this.restService.timeOver).subscribe(
            (dataRegistro:any) => {
              if (dataRegistro.length != 0) {
                let premiosRes = dataRegistro;
                premiosRes.forEach(premio => {
                  this.premios.push(new PremioModel(
                    premio.DescriptionShort,
                    premio.Money,
                    premio.Points,
                    premio.Money,
                    premio.UrlImage,
                    premio.Name,
                    premio.DescriptionLong,
                    premio.Id,
                    premio.Clave
                  ));
                });
              } else if(dataRegistro['Message']!=3){
                this.alertaService.warnAlert(this.restService.headerValidacion, dataRegistro['Message'], null);
              }else{
                this.alertaService.warnAlert(this.restService.headerValidacion, "No se encontraron registros de facturación", null);
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

  ionViewDidLoad() {
    console.log('ionViewDidLoad PremiosPage');
  }

  canjear() {
    this.alertaService.alertaBasica("Canje de puntos","Los puntos son suficientes para el canje",null);
    /*let modal = this.modalController.create(PremiosSolicitudPage, { premios: this.premios, usuario: this.usuario});
    modal.present();
    modal.onDidDismiss((data) => {

    });*/
  }

  obtenerPuntos(){
    this.restService.getToken().timeout(this.restService.timeOver).subscribe(data => {
      if (data == null) {
          this.alertaService.warnAlert(this.restService.headerValidacion, this.restService.mensajeValidacionAdmin, null);
      } else {
          let body = new HttpParams();
      
      this.restService.restServiceGETToken("user/regular/" + this.usuario.Id, body, data.toString()).timeout(this.restService.timeOver).subscribe(
            dataRegistroLast => {
              this.loginForm.patchValue({
                puntos: dataRegistroLast['Response'].Puntos,
                puntos2: dataRegistroLast['Response'].Puntos
              });
            
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

  restarPuntos(cbox: any,id: number, tipo: number = 0){
    console.log(this.seleccionados);
    let resta = 0;
    for(var i = 0; i< this.premios.length; i++){
      let puntos = tipo == 1 ? this.premios[i].canjeOpcional : this.premios[i].canje;
      if(this.premios[i].id == id){
        if(!this.premios[i].seleccionado){
          resta = this.loginForm.value.puntos + puntos;
        }
        else{
          resta = this.loginForm.value.puntos - +puntos;
          if(resta < 0){
            this.alertaService.errorAlert("Error al seleccionar premio", "Punto insuficientes, elimina uno o mas artículos", null);
            resta = this.loginForm.value.puntos;
            cbox.checked = false;
          }
        }
        this.premios[i].seleccionado = false;
        this.loginForm.patchValue({
          puntos: resta
        });
      }
    }
  }
}
