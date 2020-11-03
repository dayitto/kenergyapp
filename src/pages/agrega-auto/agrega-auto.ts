import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController, ModalController } from 'ionic-angular';
import { RestServiceProvider } from '../../providers/rest-service';
import { AlertaServiceProvider } from '../../providers/alerta-service';
import { HttpParams } from '@angular/common/http';
import { Storage } from '@ionic/storage';
import { HomePage } from '../home/home';
import { VehiculoModel } from '../../models/vehiculoModel';
import { MiAutoPage } from '../mi-auto/mi-auto';
import { FormGroup, FormControl } from '@angular/forms';
import validator from 'validator';
import { NotificacionService } from '../../services/notificaciones.service';
import { AbrirnotificacionesService } from '../../services/abrirnotificaciones.service';

@IonicPage()
@Component({
  selector: 'page-agrega-auto',
  templateUrl: 'agrega-auto.html',
})
export class AgregaAutoPage {
  public loginForm = new FormGroup({
    //alias: new FormControl(''),
    marca: new FormControl(''),
    modelo: new FormControl(''),
    anio: new FormControl(0),
    placa: new FormControl(''),
    km: new FormControl(0),
    tipo: new FormControl(0)
    });

  public loginFormValidator = {
    /*alias: {
      mensaje: ''
      },*/
    marca: {
      mensaje: ''
    },
    modelo: {
      mensaje: ''
    },
    anio: {
      mensaje: ''
    },
    placa: {
      mensaje: ''
    },
    tipo: {
      mensaje: ''
    }
  };
  public usuario: any = null;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public viewCtrl: ViewController,
    private restService: RestServiceProvider,
    private alertaService: AlertaServiceProvider,
    public modalController: ModalController,
    public localStorage: Storage, public notificacion: NotificacionService, 
    public mostrarNotif: AbrirnotificacionesService) {
      this.usuario = navParams.get("usuario");
      if (this.usuario == null) {
        this.openSesion();
      }
      this.onValueChanges();
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
    (document.getElementById("editado") as HTMLFormElement).value = 0;
  }

  cancelar() {
    this.viewCtrl.dismiss();
  }

  validarFaltantes(): boolean {
    /*if (validator.isEmpty(this.loginForm.value.alias)) {
      this.loginFormValidator.alias.mensaje = 'Es necesario capturar el Alias';
      this.cambiarDiseñoInput("alias",1);
      return false;
      } else {
      this.loginFormValidator.alias.mensaje = '';
      this.cambiarDiseñoInput("alias");
    }*/
    if (validator.isEmpty(this.loginForm.value.marca)) {
      this.loginFormValidator.marca.mensaje = 'Es necesario capturar la Marca';
      this.cambiarDiseñoInput("marca",1);
      return false;
      } else {
      this.loginFormValidator.marca.mensaje = '';
      this.cambiarDiseñoInput("marca");
    }
    if (validator.isEmpty(this.loginForm.value.modelo)) {
      this.loginFormValidator.modelo.mensaje = 'Es necesario capturar el Modelo';
      this.cambiarDiseñoInput("modelo",1);
      return false;
      } else {
      this.loginFormValidator.modelo.mensaje = '';
      this.cambiarDiseñoInput("modelo");
    }
    if (this.loginForm.value.anio == 0) {
      this.loginFormValidator.anio.mensaje = 'Es necesario capturar el Año';
      this.cambiarDiseñoInput("anio",1);
      return false;
      } else {
      this.loginFormValidator.anio.mensaje = '';
      this.cambiarDiseñoInput("anio");
    }
    if (validator.isEmpty(this.loginForm.value.placa)) {
      this.loginFormValidator.placa.mensaje = 'Es necesario capturar la Placa';
      this.cambiarDiseñoInput("placa",1);
      return false;
      } else {
      this.loginFormValidator.placa.mensaje = '';
      this.cambiarDiseñoInput("placa");
    }
    if (this.loginForm.value.tipo == 0) {
      this.loginFormValidator.tipo.mensaje = 'Es necesario capturar el Tipo';
      this.cambiarDiseñoInput("tipo",1);
      return false;
      } else {
      this.loginFormValidator.tipo.mensaje = '';
      this.cambiarDiseñoInput("tipo");
    }
    return true;
  }

  registrar() {
    console.log(this.usuario.LlaveroContado);
    if (this.validarFaltantes())
      this.agregar();
  }

  agregar() {
    this.restService.getToken().timeout(this.restService.timeOver).subscribe(data => {
      const bodys = new HttpParams()
        //.set('Alias', this.loginForm.value.alias)
        .set('Marca', this.loginForm.value.marca)
        .set('Modelo', this.loginForm.value.modelo)
        .set('Anio', this.loginForm.value.anio)
        .set('Placa', this.loginForm.value.placa)
        .set('Kilometraje', this.loginForm.value.km)
        .set('IdUser', this.usuario.Id)
        .set('Codcli', this.usuario.LlaveroContado)
        .set('Tipo', "" + this.loginForm.value.tipo);
      this.restService.restServicePOSTTokenXForm("vehicle/regular", bodys, data.toString()).timeout(this.restService.timeOver).subscribe(
        dataRegistro => {
          let dato = dataRegistro['Response'];
          if (dato.Id != undefined && dato.Id != null) {
            (document.getElementById("editado") as HTMLFormElement).value = 0;
          	let vehiculo = new VehiculoModel();
            vehiculo.Modelo = this.loginForm.value.modelo;
            vehiculo.Placa = this.loginForm.value.placas;
            vehiculo.id = dato.Id;
            let use = this.usuario;
            this.alertaService.alertaBasica("¡Bien!", this.usuario.LlaveroContado > 0 ? "Tu auto ha sido agregado exitosamente." : "Tu llavero ha sido generado exitosamente.", null);
            this.localStorage.ready().then(() => {
              this.localStorage.get(`@userSession`).then((data2) => {
                data2.LlaveroContado = dato.Id;
                this.localStorage.set(`@userSession`, data2);
                this.usuario = data2;
              });
            });
            this.viewCtrl.dismiss();
          } else {
            this.alertaService.warnAlert("¡Atención!", "Posiblemente ya has agregado tu auto, si no, contacta al administrador", null);
          }
        }, error => {
          console.log(error);
          this.alertaService.errorAlert(this.restService.headerError, this.restService.mensajeError, null);
        }
      );
    }, error => {
      console.log(error);
      this.alertaService.errorAlert(this.restService.headerError, this.restService.mensajeError, null);
    });
  }

  cambiarDiseñoInput(id: string, color: number = 0){
    let strColor = color == 1 ? "red" : "white";
    (document.getElementById(id) as HTMLFormElement).style.backgroundColor = strColor;
  }

  onValueChanges(): void {
    this.loginForm.valueChanges.subscribe(val=>{
      (document.getElementById("editado") as HTMLFormElement).value++;
    })
  }

  ionViewCanLeave() {
    console.log((document.getElementById("editado") as HTMLFormElement).value);
    return new Promise((resolve, reject) => {
      if((document.getElementById("editado") as HTMLFormElement).value == 0)
        resolve();
      else 
        this.alertaService.alertaConfirmacion("Confirmar","¿Desea salir sin guardar los cambios realizados?",resolve,reject);
  });
  }

  /*seleccionarTipo(tipo: number){
    (document.getElementById("editado") as HTMLFormElement).value++;
    this.tipo = tipo;
    for(let i = 1; i < 5; i++)
      (document.getElementById("tipo" + i) as HTMLFormElement).style.backgroundColor = "#001432";
    (document.getElementById("tipo" + tipo) as HTMLFormElement).style.backgroundColor = "blue";
  }*/
}
