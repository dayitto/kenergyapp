import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import { VehiculoModel } from '../../models/vehiculoModel';
import { RestServiceProvider } from '../../providers/rest-service';
import { AlertaServiceProvider } from '../../providers/alerta-service';
import { HttpParams } from '@angular/common/http';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite';
import { VehiculoService } from '../../services/vehiculo.service';

@IonicPage()
@Component({
  selector: 'page-mis-autos',
  templateUrl: 'mis-autos.html',
})
export class MisAutosPage {

  public vehiculos:VehiculoModel[]=[];
  public vehiculo: any = null;
  constructor(public navCtrl: NavController, public navParams: NavParams, public loadingCtrl: LoadingController,
  private alertaService: AlertaServiceProvider, private restService: RestServiceProvider,private sqlite: SQLite,
  private vehiculoService: VehiculoService) {
	this.vehiculos = navParams.get("vehiculos");
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MisAutosPage');
  }
  
  cargaAutoById(vehiculo: VehiculoModel) {
	//console.log((document.getElementById("tipoCombustible") as HTMLFormElement));
	  for(let i = 0; i< this.vehiculos.length; i++){
		  this.vehiculos[i].seleccionado = this.vehiculos[i].Id == vehiculo.Id ? true : false;
	  }
  	let loading = this.loadingCtrl.create();
    loading.present();
		  this.restService.getToken().timeout(this.restService.timeOver).subscribe(data => {
      if (data == null) {
        loading.dismiss();
        this.alertaService.warnAlert(this.restService.headerValidacion, this.restService.mensajeValidacionAdmin, null);
      } else {
        this.restService.restServiceGETToken("vehicle/regular/detail/" + vehiculo.id + "/" + vehiculo.Id, new HttpParams(), data.toString()).timeout(this.restService.timeOver).subscribe(
          dataRegistro => {
			this.vehiculo = dataRegistro['Response'];
			let imagen = this.vehiculo.Imagen == "" ? "<img src='assets/imgs/miAuto/add.png' style='width: 40%; display: block; margin: auto;' />" : "<img src='http://169.60.32.119/Imagenes/" + this.vehiculo.Imagen + "?" + new Date().getTime() + "' style='width: 100%; display: block; margin: auto;' />";
			this.vehiculoService.loginForm.patchValue({
				//alias: vehiculo.Alias,
				marca: vehiculo.Marca,
				modelo: vehiculo.Modelo,
				anio: vehiculo.Anio,
				km: this.vehiculo.Kilometraje,
				placa: this.vehiculo.Placa,
				rendimiento: this.vehiculo.Rendimiento,
				puntos: "Puntos Generados: " + this.vehiculo.Puntos,
				codprd: this.vehiculo.tipoGasolina,
				tipo: this.vehiculo.Tipo,
				estado: this.vehiculo.Estado,
				cSeguro: this.vehiculo.Cseguro,
				nPoliza: this.vehiculo.Npoliza,
				fPoliza: this.vehiculo.FechaPoliza,
				telefono: this.vehiculo.TelPoliza,
				fTenencia: this.vehiculo.FechaTenencia,
				checkSeguro: this.vehiculo.aseguro == 1,
				checkMantenimiento: this.vehiculo.amantenimiento
			});
			(document.getElementById("aImagen") as HTMLFormElement).innerHTML = imagen;
			//(document.getElementById("km1") as HTMLFormElement).getElementsByTagName('input')[0].value = this.vehiculo.Kilometraje;
            //(document.getElementById("puntos1") as HTMLFormElement).value = this.vehiculo.Puntos;
            (document.getElementById("numvehiculo") as HTMLFormElement).value = vehiculo.Id;
            /*(document.getElementById("marca") as HTMLFormElement).getElementsByTagName('input')[0].value = this.vehiculo.Marca;
            (document.getElementById("modelo") as HTMLFormElement).getElementsByTagName('input')[0].value = this.vehiculo.Modelo;
			(document.getElementById("anio") as HTMLFormElement).getElementsByTagName('input')[0].value = this.vehiculo.Anio;*/
			//(document.getElementById("mma") as HTMLFormElement).getElementsByTagName('input')[0].value = this.vehiculo.Den;

            //(document.getElementById("placa") as HTMLFormElement).getElementsByTagName('input')[0].value = this.vehiculo.Placa;
			//(document.getElementById("rendimiento") as HTMLFormElement).getElementsByTagName('input')[0].value = this.vehiculo.Rendimiento;
			(document.getElementById("editado") as HTMLFormElement).value = 0;
			//(document.getElementById("tipoCombustible") as HTMLFormElement).getElementsByTagName('select-text')[0].value = "SUPER PLUS";
            
            let elements: NodeListOf<Element> = (document.getElementsByClassName("popover-content") as HTMLFormElement);
				Array.prototype.forEach.call(elements, function (item) {
  					item.style.display = "none";
				});
				let elements1: NodeListOf<Element> = (document.getElementsByClassName("popover-md") as HTMLFormElement);  
				Array.prototype.forEach.call(elements1, function (item) {
  					item.style.display = "none";
				});
				//this.cargaDatosDeBaseDeDatos(this.vehiculo.Id);
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
  
	cargaDatosDeBaseDeDatos(id: Number) {
  		let sql = 'SELECT * FROM mis_autos where id_vehiculo = ?';
  		
  		
  		this.sqlite.create({
      	name: 'kenergy.db',
      	location: 'default'
    	}).then((db: SQLiteObject) => {
    		db.executeSql(sql, [id])
  				.then(response => {
    				let tasks = [];
    				if(response.rows.length != 0) {
						(document.getElementById("vehiculo.circula") as HTMLFormElement).value = response.rows.item(0).no_circula;
						(document.getElementById("vehiculo.periodo") as HTMLFormElement).value = response.rows.item(0).periodo;
						(document.getElementById("vehiculo.tipoCombustible") as HTMLFormElement).value = response.rows.item(0).tipo_combustible;
						(document.getElementById("vehiculo.estado") as HTMLFormElement).value = response.rows.item(0).estado;
						(document.getElementById("vehiculo.ultimaFechaVerificacion") as HTMLFormElement).value = response.rows.item(0).ultima_fecha_verificacion;		
						(document.getElementById("vehiculo.proximaFechaVerificacion") as HTMLFormElement).value = response.rows.item(0).proxima_fecha_verificacion;		
						(document.getElementById("vehiculo.agencia") as HTMLFormElement).value = response.rows.item(0).agencia;
						(document.getElementById("vehiculo.telefono") as HTMLFormElement).value = response.rows.item(0).telefono;		
						(document.getElementById("vehiculo.companiaSeguro") as HTMLFormElement).value = response.rows.item(0).compania_Seguro;		
						(document.getElementById("vehiculo.poliza") as HTMLFormElement).value = response.rows.item(0).poliza;
						(document.getElementById("vehiculo.fechaVencimiento") as HTMLFormElement).value = response.rows.item(0).fecha_vencimiento;		
						(document.getElementById("vehiculo.montoPoliza") as HTMLFormElement).value = response.rows.item(0).monto_poliza;
						(document.getElementById("vehiculo.telefonoSeguro") as HTMLFormElement).value = response.rows.item(0).telefono_seguro;
						if(response.rows.item(0).verificacion == 1) (document.getElementById("vehiculo.verificacion") as HTMLFormElement).checked = true;
						else (document.getElementById("vehiculo.verificacion") as HTMLFormElement).checked = false;
						if(response.rows.item(0).vencimiento == 1) (document.getElementById("vehiculo.vencimiento") as HTMLFormElement).checked = true;
						else (document.getElementById("vehiculo.vencimiento") as HTMLFormElement).checked = false;
						if(response.rows.item(0).mantenimiento_cada == 1) (document.getElementById("vehiculo.mantenimiento") as HTMLFormElement).checked = true;
						else (document.getElementById("vehiculo.mantenimiento") as HTMLFormElement).checked = false;		
						(document.getElementById("vehiculo.mantenimientoRango") as HTMLFormElement).value = response.rows.item(0).mantenimiento_cada_rango;
						if(response.rows.item(0).pago_de_tenencia == 1) (document.getElementById("vehiculo.pagoTenencia") as HTMLFormElement).checked = true;
						else (document.getElementById("vehiculo.pagoTenencia") as HTMLFormElement).checked = false;
						if(response.rows.item(0).hoy_no_circula == 1) (document.getElementById("vehiculo.hoyNoCircula") as HTMLFormElement).checked = true;
						else (document.getElementById("vehiculo.hoyNoCircula") as HTMLFormElement).checked = false;
						(document.getElementById("esta") as HTMLFormElement).value = 1;
    				} else {
						(document.getElementById("esta") as HTMLFormElement).value = 0;    				
    				}
  				})
  			.catch(error => this.alertaService.errorAlert("Info Error", error, null));
  		
  		})
  		.catch(error =>{
    		this.alertaService.errorAlert("Info", "Excepcion al crear BD " + error, null);
  		});
	}

}
