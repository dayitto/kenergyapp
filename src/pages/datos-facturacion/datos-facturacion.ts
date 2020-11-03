import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController, LoadingController } from 'ionic-angular';
import { AlertaServiceProvider } from '../../providers/alerta-service';
import { RestServiceProvider } from '../../providers/rest-service';
import { HttpParams } from '@angular/common/http';
import { MisDatosPage } from '../mis-datos/mis-datos';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import validator from 'validator';
import { AbrirnotificacionesService } from '../../services/abrirnotificaciones.service';
import { NotificacionService } from '../../services/notificaciones.service';

@IonicPage()
@Component({
  selector: 'page-datos-facturacion',
  templateUrl: 'datos-facturacion.html',
})
export class DatosFacturacionPage {
  public idUsuario: number = 0;
  public readonly re = /^([A-ZÑ&]{3,4}) ?(?:- ?)?(\d{2}(?:0[1-9]|1[0-2])(?:0[1-9]|[12]\d|3[01])) ?(?:- ?)?([A-Z\d]{2})([A\d])$/;

  public loginForm = new FormGroup({
    idFactura: new FormControl(0),
    rfc: new FormControl('',Validators.required),
    razonSocial: new FormControl(''),
    email: new FormControl(''),
    calle: new FormControl(''),
    ne: new FormControl(''),
    ni: new FormControl(''),
    cp: new FormControl(''),
    estado: new FormControl(''),
    municipio: new FormControl(''),
    colonia: new FormControl('')
    });

    public loginForm2 = new FormGroup({
      editado: new FormControl(0)
      });

  public loginFormValidator = {
    rfc: {
      mensaje: ''
      },
      razonSocial: {
      mensaje: ''
    },
    email: {
      mensaje: ''
    }
  };
  
  constructor(public navCtrl: NavController, public navParams: NavParams, public viewCtrl: ViewController,
  private alertaService: AlertaServiceProvider, private restService: RestServiceProvider, public loadingCtrl: LoadingController,
  public notificacion: NotificacionService, public mostrarNotif: AbrirnotificacionesService) {
		this.idUsuario = navParams.get("idUsuario");
		if(undefined != navParams.get("editar")) {
      let factura = navParams.get("factura");
      this.loginForm.patchValue({
        idFactura: factura.id,
        rfc: factura.rfc,
        email: factura.correoElectronico,
        razonSocial: factura.razonSocial
      });
      this.cargarDatosFac();
    }
    MisDatosPage ;
  }

  ionViewDidLoad() {
    this.onValueChanges();
  }

  ionViewCanLeave() {
    return new Promise((resolve, reject) => {
      if(this.loginForm2.value.editado == 0)
        resolve();
    else 
      this.alertaService.alertaConfirmacion("Confirmar","¿Desea salir sin guardar los cambios realizados?",resolve,reject);
  });
  }

  onValueChanges(): void {
    this.loginForm.valueChanges.subscribe(val=>{
      this.loginForm.patchValue(
        {
          rfc: this.loginForm.value.rfc.toUpperCase(),
          razonSocial: this.loginForm.value.razonSocial.toUpperCase(),
          calle: this.loginForm.value.calle.toUpperCase(),
          estado: this.loginForm.value.estado.toUpperCase(),
          municipio: this.loginForm.value.municipio.toUpperCase(),
          colonia: this.loginForm.value.colonia.toUpperCase()}
          , {emitEvent:false}
      );
      this.loginForm2.setValue({
        editado: 1
      });
    })
  }

  cancelar() {
    this.viewCtrl.dismiss();
  }
  
  registrar() {
    if(this.formValidator()){
      let loading = this.loadingCtrl.create();
    loading.present();
    this.restService.getToken().timeout(this.restService.timeOver).subscribe(data => {
        if (data == null) {
          loading.dismiss();
          this.alertaService.warnAlert(this.restService.headerValidacion, this.restService.mensajeValidacionAdmin, null);
        } else {
        const bodys = new HttpParams()
          .set('IdUser', "" + this.idUsuario)
          .set('RFC', this.loginForm.value.rfc)
          .set('RazonSocial', this.loginForm.value.razonSocial)
          .set('Email', this.loginForm.value.email)
          .set('Calle', this.loginForm.value.calle)
          .set('NoInt', this.loginForm.value.ni)
          .set('NoExt', this.loginForm.value.ne)
          .set('CP', this.loginForm.value.cp)
          .set('Estado', this.loginForm.value.estado)
          .set('Municipio', this.loginForm.value.municipio)
        .set('Colonia', this.loginForm.value.colonia);
        let param = "";
        if(this.loginForm.value.idFactura != 0) {
          param = "/" + this.loginForm.value.idFactura;
          let bodyObj = {
            IdUser: this.idUsuario,
                RFC: this.loginForm.value.rfc,
                RazonSocial: this.loginForm.value.razonSocial,
              Email: this.loginForm.value.email,
              Calle: this.loginForm.value.calle,
                NoInt: this.loginForm.value.ni,
                NoExt: this.loginForm.value.ne,
                CP: this.loginForm.value.cp,
                Estado: this.loginForm.value.estado,
                Municipio: this.loginForm.value.municipio,
              Colonia: this.loginForm.value.colonia
            };
          this.restService.restServicePUTToken("invoiceto/regular" + param, bodyObj, data.toString()).timeout(this.restService.timeOver).subscribe(
          dataRegistro => {
            let dato = dataRegistro['Response'];
            if (dato != undefined && dato == true) {
              this.loginForm2.setValue({
                editado: 0
              });
              this.alertaService.alertaBasica("¡Bien!", "Se han actualizado los datos", null);
            } else {
              this.alertaService.warnAlert("¡Atención!", dataRegistro['Message'], null);
            }
            loading.dismiss();
          }, error => {
            loading.dismiss();
            console.log(error);
            this.alertaService.errorAlert(this.restService.headerError, this.restService.mensajeError, null);
          }
        );  
        } else {
          this.restService.restServicePOSTTokenXForm("invoiceto/regular" + param, bodys, data.toString()).timeout(this.restService.timeOver).subscribe(
          dataRegistro => {
            let dato = dataRegistro['Response'];
            if (dato != undefined && dato == true) {
              this.loginForm2.setValue({
                editado: 0
              });
              this.alertaService.alertaBasica("¡Bien!", "Se ha agregado el RFC", null);
              this.viewCtrl.dismiss();
            } else {
              this.alertaService.warnAlert("¡Atención!", "Error al agregar RFC, posiblemente ya exista el rfc registrado", null);
            }
            loading.dismiss();
          }, error => {
            loading.dismiss();
            console.log(error);
            this.alertaService.errorAlert(this.restService.headerError, this.restService.mensajeError, null);
          }
        );		  
        }
        
        }  
    }, error => {
        console.log(error);
        this.alertaService.errorAlert(this.restService.headerError, this.restService.mensajeError, null);
      });
    }
  }

  formValidator(): boolean {
    var validado = this.loginForm.value.rfc.match(this.re);
    if (validator.isEmpty(this.loginForm.value.rfc)) {
      this.loginFormValidator.rfc.mensaje = 'Es necesario capturar el RFC';
      this.cambiarDiseñoInput("rfc",1);
      return false;
      } else {
      this.loginFormValidator.rfc.mensaje = '';
      this.cambiarDiseñoInput("rfc");
    }
    if (!validado) {
      this.loginFormValidator.rfc.mensaje = 'Es necesario capturar un valor válido para RFC';
      this.cambiarDiseñoInput("rfc",1);
      return false;
      } else {
      this.loginFormValidator.rfc.mensaje = '';
      this.cambiarDiseñoInput("rfc");
    }
    if (validator.isEmpty(this.loginForm.value.razonSocial)) {
      this.loginFormValidator.razonSocial.mensaje = 'Es necesario capturar la Razón Social';
      this.cambiarDiseñoInput("razonSocial",1);
      return false;
      } else {
      this.loginFormValidator.razonSocial.mensaje = '';
      this.cambiarDiseñoInput("razonSocial");
    }
    if (validator.isEmpty(this.loginForm.value.email)) {
      this.loginFormValidator.email.mensaje = 'Es necesario capturar el E-mail';
      this.cambiarDiseñoInput("email",1);
      return false;
      } else {
      this.loginFormValidator.email.mensaje = '';
      this.cambiarDiseñoInput("email");
    }
    if (!validator.isEmail(this.loginForm.value.email)) {
      this.loginFormValidator.email.mensaje = 'Ingrese una dirección de correo válida';
      this.cambiarDiseñoInput("email",1);
      return false;
      } else {
      this.loginFormValidator.email.mensaje = '';
      this.cambiarDiseñoInput("email");
    }
    return true;
  }

  cambiarDiseñoInput(id: string, color: number = 0){
    let strColor = color == 1 ? "red" : "white";
    (document.getElementById(id) as HTMLFormElement).style.backgroundColor = strColor;
  }

  cargarDatosFac(){
    this.restService.getToken().timeout(this.restService.timeOver).subscribe(data => {
      if (data == null) {
        this.alertaService.warnAlert(this.restService.headerValidacion, this.restService.mensajeValidacionAdmin, null);
      } 
      else {
      var url = "invoiceto/regular/detail/" + this.loginForm.value.idFactura;
          
      this.restService.restServiceGETToken(url, new HttpParams(), data.toString()).timeout(this.restService.timeOver).subscribe(
            dataRegistro => {
              if(dataRegistro['Status']==1){
                let resp = dataRegistro['Response'];
                this.loginForm.patchValue({
                  calle: resp.Calle,
                  ne: resp.NumExterior,
                  ni: resp.NumInterior,
                  cp: resp.Cp,
                  estado: resp.Estado,
                  municipio: resp.Ciudad,
                  colonia: resp.Colonia
                });
                this.loginForm2.setValue({
                  editado: 0
                });
              }
            }, error => {
              console.log(error);
            }
          );
      }
    });
  }

  numberOnlyValidation(event: any) {
    if (!this.re.test(this.loginForm.value.rfc)) {
      this.loginFormValidator.rfc.mensaje = 'Es necesario capturar un valor válido para RFC';
      this.cambiarDiseñoInput("rfc",1);
    }
    else {
      this.loginFormValidator.rfc.mensaje = '';
      this.cambiarDiseñoInput("rfc");
    }
  }
  
}
