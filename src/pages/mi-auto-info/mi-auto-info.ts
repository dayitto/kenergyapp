import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, PopoverController, LoadingController, AlertController } from 'ionic-angular';
import { VehiculoModel } from '../../models/vehiculoModel';
import { MisAutosPage } from '../mis-autos/mis-autos';
import { HttpParams } from '@angular/common/http';
import { Storage } from '@ionic/storage';
import { AlertaServiceProvider } from '../../providers/alerta-service';
import { RestServiceProvider } from '../../providers/rest-service';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite';
import { ImagePicker } from '@ionic-native/image-picker';
import { FileChooser } from '@ionic-native/file-chooser';
import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer';
import { File } from '@ionic-native/file';
import validator from 'validator';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { VehiculoService } from '../../services/vehiculo.service';
import { UsuarioService } from '../../services/usuario.service';

@IonicPage()
@Component({
  selector: 'page-mi-auto-info',
  templateUrl: 'mi-auto-info.html',
})
export class MiAutoInfoPage {
  public vehiculos: VehiculoModel[] = [];
  public hoy: Date = new Date();
  public dia: string = "Domingo";
  public dia2: string = "Domingo";
  public diaMes: number = 0;
  public tipoCombustibles: any[] = [];
  public tipoCombustible: number = 0;
  public usuario: any = null;
  public esta: number = 0;
  public verificacionVisible: boolean = false;
  public seguroVisible: boolean = false;
  public alertasVisible: boolean = false;
  public tenenciaVisible: boolean = false;
  public rendimientoVisible: boolean = false;

  public rangosMantenimiento: any[] = [];
  public rango:any=1;
  imageResponse: any;
  options: any;

  public fileTransfer: FileTransferObject = null;

  public optionsCamera: CameraOptions = {
	quality: 100,
	destinationType: this.camera.DestinationType.FILE_URI,
	encodingType: this.camera.EncodingType.JPEG,
	mediaType: this.camera.MediaType.PICTURE
  }

  constructor(public navCtrl: NavController, public navParams: NavParams,
    public popoverCtrl: PopoverController, public localStorage: Storage,
    private alertaService: AlertaServiceProvider,
    private restService: RestServiceProvider,
    private sqlite: SQLite,
    public loadingCtrl: LoadingController,
	public chooser: FileChooser,
	private transfer: FileTransfer,
	public alertCtrl: AlertController,
	private file: File,private camera: Camera,
	private vehiculoService: VehiculoService,
	private usuarioService: UsuarioService) {
    	
    	this.localStorage.ready().then(() => {
      this.localStorage.get(`@userSession`).then((data) => {
        if (data != null) {
          this.usuario = data;
			 this.cargarDatosAuto();
        } else {
          this.alertaService.warnAlert(this.restService.headerValidacion, "Usuario sin sesión, no se cargarán sus datos", null);
        }
      });
    });
    //this.vehiculos.push(new VehiculoModel(false,"021 TC", 0, "KIA SPORTAGE", 1));
    //this.vehiculos.push(new VehiculoModel(false,"021 TC", 1, "KIA SPORTAGE", 2));
    this.diaMes = this.hoy.getUTCDate();
    var n = this.hoy.getDay();
    this.dia = this.getDay(n);
    this.dia2 = this.getDay(n + 2);
    this.tipoCombustibles.push({ id: 0, nombre: "Combustible" });
    this.tipoCombustibles.push({ id: 150, nombre: "PLUS" });
    this.tipoCombustibles.push({ id: 151, nombre: "SUPER PLUS" });
    this.tipoCombustibles.push({ id: 152, nombre: "Diesel" });

    this.rangosMantenimiento.push({ id: 1, valor: "10000 Km" });
    this.rangosMantenimiento.push({ id: 2, valor: "20000 Km" });
    this.rangosMantenimiento.push({ id: 3, valor: "30000 Km" });
    this.rangosMantenimiento.push({ id: 4, valor: "40000 Km" });
    this.fileTransfer = this.transfer.create();
    
  }

  ngOnInit() {
    this.onValueChanges();
  }

  ionViewDidEnter() {
    (document.getElementById("editado") as HTMLFormElement).value = -1;
  }

  ionViewCanLeave() {
    return new Promise((resolve, reject) => {
      if((document.getElementById("editado") as HTMLFormElement).value == 0)
        resolve();
	  else 
		this.alertaService.alertaConfirmacion("Confirmar","¿Desea salir sin guardar los cambios realizados?",resolve,reject);
  });
  }

  getDay(dia: any) {
    var diaEs = "";
    switch (dia) {
      case 0:
        diaEs = "Domingo"
        break;
      case 1:
        diaEs = "Lunes"
        break;
      case 2:
        diaEs = "Martes"
        break;
      case 3:
        diaEs = "Miércoles"
        break;
      case 4:
        diaEs = "Jueves"
        break;
      case 5:
        diaEs = "Viernes"
        break;
      case 6:
        diaEs = "Sábado"
        break;
    }
    return diaEs;
  }

  presentPopover(myEvent) {
    let popover = this.popoverCtrl.create(MisAutosPage, { vehiculos: this.vehiculos });
    popover.present({
      ev: myEvent
    });
  }

  cargarDatosAuto(){
  	let loading = this.loadingCtrl.create();
    loading.present();
		  var armaUrl = "vehicle/regular/" + this.usuario.LlaveroContado;
      this.restService.getToken().timeout(this.restService.timeOver).subscribe(data => {
      this.restService.restServiceGETToken(armaUrl, new HttpParams(), data.toString()).timeout(this.restService.timeOver).subscribe(
        dataAutos => {
          if(dataAutos['Response']!=null && dataAutos['Response'] instanceof Array){
			let array = dataAutos['Response'];
            array.forEach(auto => {
            	this.vehiculos.push(new VehiculoModel(
                false,
					 auto.Placa,
					 1,	
					 auto.Modelo,
					 auto.Codprd == 1 ? 150 : auto.Codprd == 2 ? 151 : auto.Codprd == 3 ? 152 : auto.Codprd,				 
					 auto.Oct == 92 ? 1 : auto.Oct == 87 ? 2 : 3,
					 1,
					 auto.Id,
					 auto.NumVeh,
					 1,
					 "",
					 auto.Marca,
					 auto.Year
                
              ));
			});
			(document.getElementById("numvehiculo") as HTMLFormElement).value = this.vehiculos[0].Id;
			this.vehiculos[0].seleccionado = true;
            this.restService.getToken().timeout(this.restService.timeOver).subscribe(data => {
      if (data == null) {
        loading.dismiss();
        this.alertaService.warnAlert(this.restService.headerValidacion, this.restService.mensajeValidacionAdmin, null);
      } else {
        this.restService.restServiceGETToken("vehicle/regular/detail/" + this.usuario.LlaveroContado + "/" + this.vehiculos[0].Id, new HttpParams(), data.toString()).timeout(this.restService.timeOver).subscribe(
          dataRegistro => {
			this.actualizarDatosModelo(dataRegistro['Response']);
			let imagen = dataRegistro['Response'].Imagen == "" ? "<img src='assets/imgs/miAuto/add.png' style='width: 40%; display: block; margin: auto;'/>" : "<img src='http://169.60.32.119/Imagenes/" + dataRegistro['Response'].Imagen + "?" + new Date().getTime() + "' style='width: 100%; display: block; margin: auto;' />";
      
			(document.getElementById("aImagen") as HTMLFormElement).innerHTML = imagen;
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
    
    
          } else loading.dismiss(); 
        }, error => {
			loading.dismiss();
          console.log(error);
          this.alertaService.errorAlert(this.restService.headerError, this.restService.mensajeError, null);
        }
      );
      }, error => {
      loading.dismiss();
        console.log(error);
        this.alertaService.errorAlert(this.restService.headerError, this.restService.mensajeError, null);
	  });
    
  }
  
 actualizaAuto() {
	let loading = this.loadingCtrl.create();
    loading.present();
    this.restService.getToken().timeout(this.restService.timeOver).subscribe(data => {
    	  
		if(this.formValidator()){
			let km1 = this.vehiculoService.loginForm.value.km;
			let numveh = (document.getElementById("numvehiculo") as HTMLFormElement).value;
			//let alias = this.loginForm.value.alias;
			let marca = this.vehiculoService.loginForm.value.marca;
			let modelo = this.vehiculoService.loginForm.value.modelo;
			let anio = this.vehiculoService.loginForm.value.anio;
			let mma = this.vehiculoService.loginForm.value.mma;
			let placa = this.vehiculoService.loginForm.value.placa;
			let codprd = this.vehiculoService.loginForm.value.combustible;
			let tipo = this.vehiculoService.loginForm.value.tipo;
				
			//vehicle/regular/{id vehiculo)
			//String:Alias, String:Marca, String:Modelo, double:Kilometraje (Requeridos)
			
			let urlArmada = "vehicle/regular/" + this.usuario.LlaveroContado + "/" + numveh;
			let bodyObj = {
				Marca: marca,
				Modelo: modelo,
				Anio: anio,
				Kilometraje: km1,
				Placa: placa,
				Codprd: codprd,
				Tipo: tipo,
				Estado: this.vehiculoService.loginForm.value.estado,
				Cseguro: this.vehiculoService.loginForm.value.cSeguro,
				Npoliza: this.vehiculoService.loginForm.value.nPoliza,
				FechaPoliza: this.vehiculoService.loginForm.value.fPoliza,
				TelPoliza: this.vehiculoService.loginForm.value.telefono,
				FechaTenencia: this.vehiculoService.loginForm.value.fTenencia,
				aseguro: this.vehiculoService.loginForm.value.checkSeguro == true ? 1 : 0,
				amantenimiento: this.vehiculoService.loginForm.value.checkMantenimiento == true ? 1 : 0
			};

			console.log(JSON.stringify(bodyObj));
			this.restService.restServicePUTToken(urlArmada, bodyObj, data.toString()).timeout(this.restService.timeOver).subscribe(
				dataRegistro => {
				  if (dataRegistro['Status'] == 1) {
					this.alertaService.alertaBasica(this.restService.headerExito, "Sus datos se han actualizado correctamente", null);
					//this.insertaOActulizaVehiculoEnBD(idVehiculo);
					(document.getElementById("editado") as HTMLFormElement).value = 0;
				  } else {
					this.alertaService.warnAlert(this.restService.headerValidacion, dataRegistro['Message'], null);
				  }
				  loading.dismiss();
				}, error => {
				  loading.dismiss();
				  console.log(error);
				  this.alertaService.errorAlert(this.restService.headerError, this.restService.mensajeError, null);
				});
		}
		loading.dismiss();
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

	insertaOActulizaVehiculoEnBD(id: Number) {
		let circula = '';
		if(null != (document.getElementById("vehiculo.circula") as HTMLFormElement)) {
			circula = (document.getElementById("vehiculo.circula") as HTMLFormElement).value;
		} 
		let periodo = '';
		if(null != (document.getElementById("vehiculo.periodo") as HTMLFormElement)) {
			periodo = (document.getElementById("vehiculo.periodo") as HTMLFormElement).value;		
		}
		let tipoCombustible = '';
		if(null != (document.getElementById("vehiculo.tipoCombustible") as HTMLFormElement)) {
			tipoCombustible = (document.getElementById("vehiculo.tipoCombustible") as HTMLFormElement).value;	
		}
		let estado = '';
		if(null != (document.getElementById("vehiculo.estado") as HTMLFormElement)) {
			estado = (document.getElementById("vehiculo.estado") as HTMLFormElement).value;		
		}
		let ultimaFechaVerificacion = '';
		if(null != (document.getElementById("vehiculo.ultimaFechaVerificacion") as HTMLFormElement)) {
			ultimaFechaVerificacion = (document.getElementById("vehiculo.ultimaFechaVerificacion") as HTMLFormElement).value;		
		}
		let proximaFechaVerificacion = '';
		if(null != (document.getElementById("vehiculo.proximaFechaVerificacion") as HTMLFormElement)) {
			proximaFechaVerificacion = (document.getElementById("vehiculo.proximaFechaVerificacion") as HTMLFormElement).value;		
		}
		let agencia = '';
		if(null != (document.getElementById("vehiculo.agencia") as HTMLFormElement)) {
			agencia = (document.getElementById("vehiculo.agencia") as HTMLFormElement).value;
		}
		let telefono = '';
		if(null != (document.getElementById("vehiculo.telefono") as HTMLFormElement)) {
			telefono = (document.getElementById("vehiculo.telefono") as HTMLFormElement).value;
		}
		let companiaSeguro = '';
		if(null != (document.getElementById("vehiculo.companiaSeguro") as HTMLFormElement)) {
			companiaSeguro = (document.getElementById("vehiculo.companiaSeguro") as HTMLFormElement).value;
		}
		let poliza = '';
		if(null != (document.getElementById("vehiculo.poliza") as HTMLFormElement)) {
			poliza = (document.getElementById("vehiculo.poliza") as HTMLFormElement).value;
		}
		let fechaVencimiento = '';
		if(null != (document.getElementById("vehiculo.fechaVencimiento") as HTMLFormElement)) {
			fechaVencimiento = (document.getElementById("vehiculo.fechaVencimiento") as HTMLFormElement).value;
		}
		let montoPoliza = '';
		if(null != (document.getElementById("vehiculo.montoPoliza") as HTMLFormElement)) {
			montoPoliza = (document.getElementById("vehiculo.montoPoliza") as HTMLFormElement).value;
		}
		let telefonoSeguro = '';
		if(null != (document.getElementById("vehiculo.telefonoSeguro") as HTMLFormElement)) {
			telefonoSeguro = (document.getElementById("vehiculo.telefonoSeguro") as HTMLFormElement).value;
		}
		let verificacion = 0;
		if(null != (document.getElementById("vehiculo.verificacion") as HTMLFormElement)) {
			if((document.getElementById("vehiculo.verificacion") as HTMLFormElement).checked == true) verificacion = 1;
			else verificacion = 0;		
		}
		let vencimiento = 0;
		if(null != (document.getElementById("vehiculo.vencimiento") as HTMLFormElement)) {
			if((document.getElementById("vehiculo.vencimiento") as HTMLFormElement).checked == true) vencimiento = 1;
			else vencimiento = 0;		
		}
		let mantenimiento = 0;
		if(null != (document.getElementById("vehiculo.mantenimiento") as HTMLFormElement)) {
			if((document.getElementById("vehiculo.mantenimiento") as HTMLFormElement).checked == true) mantenimiento = 1;
			else mantenimiento = 0;		
		}
		let mantenimientoRango = 1;
		if(null != (document.getElementById("vehiculo.mantenimientoRango") as HTMLFormElement)) {
			mantenimientoRango = (document.getElementById("vehiculo.mantenimientoRango") as HTMLFormElement).value;		
		}
		let pagoTenencia = 0;
		if(null != (document.getElementById("vehiculo.pagoTenencia") as HTMLFormElement)) {
			if((document.getElementById("vehiculo.pagoTenencia") as HTMLFormElement).checked == true) pagoTenencia = 1;
			else pagoTenencia = 0;		
		}
		let hoyNoCircula = 0;
		if(null != (document.getElementById("vehiculo.hoyNoCircula") as HTMLFormElement)) {
			if((document.getElementById("vehiculo.hoyNoCircula") as HTMLFormElement).checked == true) hoyNoCircula = 1;
			else hoyNoCircula = 0;
		}
					
		let sql = "";
		//this.alertaService.errorAlert("esta", ''+this.esta, null);
		if((document.getElementById("esta") as HTMLFormElement).value == 0) {
			//No se encuentra hay que insertar	
			sql = 'INSERT INTO mis_autos VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)'; 
			this.sqlite.create({
      		name: 'kenergy.db',
      		location: 'default'
    		}).then((db: SQLiteObject) => {
				db.executeSql(sql, [id, 
					circula,periodo,tipoCombustible,estado,ultimaFechaVerificacion,
					proximaFechaVerificacion,agencia,telefono,companiaSeguro,poliza,
					fechaVencimiento,montoPoliza,telefonoSeguro,verificacion,vencimiento,
					mantenimiento,mantenimientoRango,pagoTenencia,hoyNoCircula])
  				.then(response => {
    				console.log("Se ha actualizado correctamente")
  				})
  			.catch(error => this.alertaService.errorAlert("Info", JSON.stringify(error), null));
  			})
  			.catch(error =>{
    			this.alertaService.errorAlert("Info", "Excepcion al actualizar insertar BD " + error, null);
  			});
		} else {
			//Si está, vamos a actualizar		
			sql = 'UPDATE mis_autos SET ' +
    				'no_circula=?, ' +
    				'periodo=?, ' +
    				'tipo_combustible=?, ' +
    				'estado=?, ' +
    				'ultima_fecha_verificacion=?, ' +
					'proxima_fecha_verificacion=?, ' +
					'agencia=?, ' +
					'telefono=?, ' +
					'compania_Seguro=?, ' +
					'poliza=?, ' +
					'fecha_vencimiento=?, ' +
					'monto_poliza=?, ' +
					'telefono_seguro=?, ' +
					'verificacion=?, ' +
					'vencimiento=?, ' +
					'mantenimiento_cada=?, ' +
					'mantenimiento_cada_rango=?, ' +
					'pago_de_tenencia=?, ' +
					'hoy_no_circula=? WHERE id_vehiculo=?';	
					
			this.sqlite.create({
      		name: 'kenergy.db',
      		location: 'default'
    		}).then((db: SQLiteObject) => {
				db.executeSql(sql, [circula,periodo,tipoCombustible,estado,ultimaFechaVerificacion,
					proximaFechaVerificacion,agencia,telefono,companiaSeguro,poliza,
					fechaVencimiento,montoPoliza,telefonoSeguro,verificacion,vencimiento,
					mantenimiento,mantenimientoRango,pagoTenencia,hoyNoCircula,id])
  				.then(response => {
    				console.log("Se ha actualizado correctamente")
  				})
  			.catch(error => this.alertaService.errorAlert("Info", JSON.stringify(error), null));
  			})
  			.catch(error =>{
    			this.alertaService.errorAlert("Info", "Excepcion al actualizar insertar BD " + error, null);
  			});
		}
		
		
		
	}
	
	mostrarCamara() {
		this.camera.getPicture(this.optionsCamera).then((imageData) => {
			// imageData is either a base64 encoded string or a file URI
			// If it's base64 (DATA_URL):
			let base64Image = 'data:image/jpeg;base64,' + imageData;
			this.upload(imageData);
		}, (err) => {
		});
  	}

  	mostrar(){
		const prompt = this.alertCtrl.create({
			title: "Seleccione el origen de la foto",
			buttons: [
			{
				text: 'Cámara',
				handler: data => {
					this.mostrarCamara();
				}
			},
			{
				text: 'Galería',
				handler: data => {
					this.mostrarGaleria();
				}
			},
			{
				text: 'Cancelar',
				role: 'cancel'
			}
			]
	  });
	  prompt.present();
  }

  mostrarGaleria(){
	let filter = { "mime": "image/jpeg" }; 
	//this.chooser.open(filter)
	this.chooser.open()
  .then(uri => this.upload(uri))
  .catch(e => console.log(e));
  }

  upload(url: string) {
	  let nombre = this.usuario.LlaveroContado + "-" + (document.getElementById("numvehiculo") as HTMLFormElement).value + ".jpg";
	let options: FileUploadOptions = {
	   fileKey: 'file',
	   fileName: nombre,
	   headers: {}
	}
  
	this.fileTransfer.upload(url, 'http://169.60.32.119/api/image/add', options)
	 .then((data) => {
		this.alertaService.alertaBasica(this.restService.headerExito, "La foto se ha guardado correctamente. " , null);
		let imagen = "<img src='http://169.60.32.119/Imagenes/" + nombre + "?" + new Date().getTime() + "' style='width: 100%;' />";
		(document.getElementById("aImagen") as HTMLFormElement).innerHTML = imagen;
	 }, (err) => {
	   // error
	 });
  }

  mostrarVerificacion(){
	this.verificacionVisible = this.verificacionVisible ? false : true;
  }

  mostrarSeguro(){
	this.seguroVisible = this.seguroVisible ? false : true;
  }

  mostrarAlertas(){
	this.alertasVisible = this.alertasVisible ? false : true;
  }

  /*mostrarTenencia(){
	this.tenenciaVisible = this.tenenciaVisible ? false : true;
  }*/

  mostrarRendimiento(){
	this.rendimientoVisible = this.rendimientoVisible ? false : true;
  }

  actualizarDatosModelo(vehiculo:VehiculoModel){
	this.vehiculoService.loginForm.patchValue({
		//alias: vehiculo.Alias,
		marca: vehiculo.Marca,
		modelo: vehiculo.Modelo,
		anio: vehiculo.Anio,
		mma: vehiculo.Den,
		km: vehiculo.Kilometraje,
		placa: vehiculo.Placa,
		rendimiento: vehiculo.Rendimiento,
		puntos: "Puntos Generados: " + vehiculo.Puntos,
		codprd: vehiculo.tipoGasolina,
		tipo: vehiculo.Tipo,
		estado: vehiculo.Estado,
		cSeguro: vehiculo.Cseguro,
		nPoliza: vehiculo.Npoliza,
		fPoliza: vehiculo.FechaPoliza,
		telefono: vehiculo.TelPoliza,
		fTenencia: vehiculo.FechaTenencia,
		checkSeguro: vehiculo.aseguro == 1,
		checkMantenimiento: vehiculo.amantenimiento
	  });
	  (document.getElementById("editado") as HTMLFormElement).value = 0;
	  //this.seleccionarTipoEnVista(+vehiculo.Tipo);

  }

  formValidator(): boolean {
    /*if (validator.isEmpty(this.loginForm.value.alias)) {
      this.loginFormValidator.principales.mensaje = 'Es necesario capturar el Alias';
      this.cambiarDiseñoInput("alias",1);
      return false;
      } else {
      this.loginFormValidator.principales.mensaje = '';
      this.cambiarDiseñoInput("alias");
    }*/
    if (validator.isEmpty(this.vehiculoService.loginForm.value.marca)) {
      this.vehiculoService.loginFormValidator.principales.mensaje = 'Es necesario capturar la Marca';
      this.cambiarDiseñoInput("marca",1);
      return false;
      } else {
      this.vehiculoService.loginFormValidator.principales.mensaje = '';
      this.cambiarDiseñoInput("marca");
	}
	if (validator.isEmpty(this.vehiculoService.loginForm.value.modelo)) {
		this.vehiculoService.loginFormValidator.principales.mensaje = 'Es necesario capturar el Modelo';
		this.cambiarDiseñoInput("modelo",1);
		return false;
		} else {
		this.vehiculoService.loginFormValidator.principales.mensaje = '';
		this.cambiarDiseñoInput("modelo");
	  }
	  if (this.vehiculoService.loginForm.value.anio == 0) {
		this.vehiculoService.loginFormValidator.principales.mensaje = 'Es necesario capturar el Año';
		this.cambiarDiseñoInput("anio",1);
		return false;
		} else {
		this.vehiculoService.loginFormValidator.principales.mensaje = '';
		this.cambiarDiseñoInput("anio");
	  }
	  if (validator.isEmpty(this.vehiculoService.loginForm.value.placa)) {
		this.vehiculoService.loginFormValidator.placa.mensaje = 'Es necesario capturar la Placa';
		this.cambiarDiseñoInput("placa",1);
		return false;
		} else {
		this.vehiculoService.loginFormValidator.placa.mensaje = '';
		this.cambiarDiseñoInput("placa");
	  }
	  if (this.vehiculoService.loginForm.value.tipo == 0) {
		this.vehiculoService.loginFormValidator.tipo.mensaje = 'Es necesario seleccionar el tipo de vehículo';
		this.cambiarDiseñoInput("tipo",1);
		return false;
		} else {
		this.vehiculoService.loginFormValidator.tipo.mensaje = '';
		this.cambiarDiseñoInput("tipo");
	  }
    return true;
  }

  cambiarDiseñoInput(id: string, color: number = 0){
    let strColor = color == 1 ? "red" : "white";
    (document.getElementById(id) as HTMLFormElement).style.backgroundColor = strColor;
  }

  onValueChanges(): void {
    this.vehiculoService.loginForm.valueChanges.subscribe(val=>{
	  (document.getElementById("editado") as HTMLFormElement).value++;
    })
  }

  cambioFecha(){
	  console.log(this.vehiculoService.loginForm.value.pverif);
  }

  eliminarVehiculo(numAuto: number, puntos: number = 0) {
	  console.log(this.usuario.LlaveroContado + " " + numAuto);
	var armaUrl = "vehicle/movil/" + this.usuario.LlaveroContado + "/" + numAuto;
	this.restService.getToken().timeout(this.restService.timeOver).subscribe(data => {
	this.restService.restServiceDELETEToken(armaUrl, data.toString()).timeout(this.restService.timeOver).subscribe(
	  dataAutos => {
		if(dataAutos["Response"] == true){
		  this.alertaService.alertaBasica("Eliminación de auto","Su auto se ha eliminado exitosamente",null);
		  let index = this.vehiculos.findIndex(i => i.id === numAuto);
		  this.vehiculos.splice(index,1);
		  this.vehiculoService.loginForm.patchValue({
			//alias: vehiculo.Alias,
			/*marca: vehiculo.Marca,
			modelo: vehiculo.Modelo,
			anio: vehiculo.Anio,*/
			mma: '',
			km: 0,
			placa: '',
			rendimiento: 0,
			puntos: "Puntos Generados: " + 0,
			codprd: 0
		  });
		  this.usuarioService.cambiarNumAutos(this.vehiculos.length);
		  if(this.vehiculos.length > 0){
			  this.vehiculos[0].seleccionado = true;
			this.restService.restServiceGETToken("vehicle/regular/detail/" + this.usuario.LlaveroContado + "/" + this.vehiculos[0].Id, new HttpParams(), data.toString()).timeout(this.restService.timeOver).subscribe(
				dataRegistro => {
				this.actualizarDatosModelo(dataRegistro['Response']);
				let imagen = dataRegistro['Response'].Imagen == "" ? "<img src='assets/imgs/miAuto/add.png' style='width: 40%; display: block; margin: auto;'/>" : "<img src='http://169.60.32.119/Imagenes/" + dataRegistro['Response'].Imagen + "?" + new Date().getTime() + "' style='width: 100%; display: block; margin: auto;' />";
			
				(document.getElementById("aImagen") as HTMLFormElement).innerHTML = imagen;
					//this.cargaDatosDeBaseDeDatos(this.vehiculo.Id);
				}, error => {
				console.log(error);
				this.alertaService.errorAlert(this.restService.headerError, this.restService.mensajeError, null);
				}
			);
			(document.getElementById("numvehiculo") as HTMLFormElement).value = this.vehiculos[0].Id;
		  }
		  else
		  	this.usuarioService.tieneVehiculos = false;
		  (document.getElementById("editado") as HTMLFormElement).value = -1;
		  
		  /*if(this.vehiculos.length > 0){
			const bodys = new HttpParams()
			.set('OldKey', codcli.toString())
			.set('NewKey', this.vehiculos[0].id)
			.set('IdUsuario', this.usuario.Id)
			.set('IdApp', "4");
			console.log(JSON.stringify(bodys));
			this.restService.restServicePOSTToken("llavero/cliente", bodys,data.toString()).timeout(this.restService.timeOver).subscribe(
			  dataRegistroLast => {
				console.log(dataRegistroLast);
			  this.vehiculos[0].puntos += puntos;
			}, error => {
			  console.log(error);
			  this.alertaService.errorAlert(this.restService.headerError, this.restService.mensajeError, null);
			}
		  );
		  }
		  else{
			this.algunAuto = false;
			this.restService.restServicePUTToken("usuario/" + this.usuario.Id + "/llavero/" + codcli, new HttpParams(),data.toString()).timeout(this.restService.timeOver).subscribe(
			  dataRegistroLast => {
			}, error => {
			  console.log(error);
			  this.alertaService.errorAlert(this.restService.headerError, this.restService.mensajeError, null);
			}
		  );
		  }*/
		}
		else{
		  (document.getElementsByClassName("contentHome")[0] as HTMLFormElement).style.backgroundColor = "black";
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

eliminarVehiculoAlerta(puntos: number){
	let numVeh = +(document.getElementById("numvehiculo") as HTMLFormElement).value;
	let nomveh = this.vehiculos.find(i => i.Id === numVeh).Modelo;
  let alert = this.alertCtrl.create({
	title: 'Confirmar Eliminación',
	message: '¿Estás seguro que quieres eliminar el vehiculo ' + nomveh + '?<br>Los puntos generados por este vehículo no serán eliminados, se mantendrán en tu cuenta',
	buttons: [
	  {
		text: 'Aceptar',
		handler: () => {
		  this.eliminarVehiculo(numVeh, puntos);
		}
	  },
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

/*seleccionarTipo(tipo: number){
    this.vehiculoService.loginForm.patchValue({
		tipo: tipo
	  });
	  this.seleccionarTipoEnVista(tipo);
  }

  seleccionarTipoEnVista(tipo: number){
	for(let i = 1; i < 5; i++)
	  (document.getElementById("tipo" + i) as HTMLFormElement).style.backgroundColor = "#001432";
	if(tipo > 0)
    	(document.getElementById("tipo" + tipo) as HTMLFormElement).style.backgroundColor = "blue";
  }*/
  
}
