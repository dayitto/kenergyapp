import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController, LoadingController, AlertController } from 'ionic-angular';
import { VehiculoModel } from '../../models/vehiculoModel';
import { ProductoModel } from '../../models/productoModel';
import { VehicleResponse } from '../../models/vehicleResponse';
import { CombustibleModel } from '../../models/CombustibleModel';
import { AlertaServiceProvider } from '../../providers/alerta-service';
import { RestServiceProvider } from '../../providers/rest-service';
import { HttpParams } from '@angular/common/http';
import { Storage } from '@ionic/storage';
import { NotificacionService } from '../../services/notificaciones.service';
import { AbrirnotificacionesService } from '../../services/abrirnotificaciones.service';

@IonicPage()
@Component({
  selector: 'page-vehiculos-info-credito',
  templateUrl: 'vehiculos-info-credito.html',
})
export class VehiculosInfoCreditoPage {
  public vehiculo: any;
  public v: any = null;
  public numero: String = "32";
  public placas: String = "C73AXB";
  public descripcion: String = "TOYOTA HIGHLANDER";
  public estado: String = "Activo";
  public responsable: String = "CENTRAL DE VIVERES";
  public booleano: boolean = false;
  public diasCarga: any = {
    lunes: 0,
    martes: 1,
    miercoles: 1,
    jueves: 0,
    viernes: 1,
    sabado: 1,
    domingo: 1,
    todos: 1
  };
  //*******HORARIOS*******/
  public idHorarioMatutinoIni = "12:00";
  public idHorarioMatutinoFin = "12:00";
  public idHorarioVespertinoIni = "07:00";
  public idHorarioVespertinoFin = "07:00";
  public idHorarioNocturnoIni = "18:00";
  public idHorarioNocturnoFin = "18:00";


  public idEstacion = 0;
  public idCombustible = 0;
  public idCatUni: number = 0;
  //

  public deshabilitado: boolean = false;
  public listaMatutinos: any[] = [];
  public listaVespertinos: any[] = [];
  public listaNocturnos: any[] = [];
  //
  public estaciones: ProductoModel[] = [];
  public combustibles: ProductoModel[] = [];
  //
  //public carga: String = "";
  public dia: String = "";
  public semana: String = "";
  public mes: String = "";
  public strCatUni: String = "";
  public strCatUni2: String = "";

  public bloc: boolean = false;
  public mixto: boolean = true;
  public seCargo: boolean = false;

  public user: any = null;

  constructor(public navCtrl: NavController, public navParams: NavParams, public viewCtrl: ViewController, public localStorage: Storage,
    private alertaService: AlertaServiceProvider, private restService: RestServiceProvider, public loadingCtrl: LoadingController,
    public alertCtrl: AlertController, public notificacion: NotificacionService, public mostrarNotif: AbrirnotificacionesService) {
    this.vehiculo = navParams.get("vehiculo");

    /*
    Id:1, -- numero
   Bloqueado:0 false o 1 - verdadero
   Descripcion:””,
   Estado:”Activo”, -
   Responsable:””
   Placas:”X8ZS4”,
   Kilometraje:9358,
   DiaCarga:127,
   Hraini:”17:20,
   Hrafin:”17:20”,
   Hraini2:”17:20”,
   Hrafin2:”17:20”,
   Hraini3:”17:20”,
   Hrafin3:”17:20”,
   Estación: 1,  
   Combustible:1
   LimiteCarga:20,
   LimiteDia:50,
   LimiteSemana:20,
   LimiteMes:100

    */
    if (this.vehiculo != null) {
      this.strCatUni = this.vehiculo.Catuni == "$" ? "$" : "";
      this.strCatUni2 = this.vehiculo.Catuni == "L" || this.vehiculo.Catuni == "V" ? "lt" : "";
      this.idCatUni = this.strCatUni == "$" ? 1 : this.strCatUni2 != "" ? 2 : 0;

      if (this.vehiculo.Bloqueado == 0) {
        this.bloc = false;
      } else {
        this.bloc = true;
      }
      let n = this.vehiculo.DiaCarga;
      if (n == 127) {
        this.diasCarga = {
          lunes: 1,
          martes: 1,
          miercoles: 1,
          jueves: 1,
          viernes: 1,
          sabado: 1,
          domingo: 1,
          todos: 1
        };
      } else {
        var binario = n.toString(2);
        var longitud = binario.length;
        binario = this.zfill(binario, 7);
        var textoBinario = "";
        var iteracion = 1;//lunes
        this.diasCarga = {
          lunes: 0,
          martes: 0,
          miercoles: 0,
          jueves: 0,
          viernes: 0,
          sabado: 0,
          domingo: 0,
          todos: 0
        };
			this.diasCarga.lunes = parseInt(binario.charAt(6));
			this.diasCarga.martes = parseInt(binario.charAt(5));
			this.diasCarga.miercoles = parseInt(binario.charAt(4));
			this.diasCarga.jueves = parseInt(binario.charAt(3));
			this.diasCarga.viernes = parseInt(binario.charAt(2));
			this.diasCarga.sabado = parseInt(binario.charAt(1));
			this.diasCarga.domingo = parseInt(binario.charAt(0));
			if (n == 127) {
         	 this.diasCarga.todos = 1;
        	}
        /*var suma = 0;
        for (let i = longitud; i >= 0; i--) {
          textoBinario += binario.charAt(i-1);
          switch (textoBinario) {
            case 1:
              this.diasCarga.lunes = 1;
              suma++;
              break;
            case 2:
              this.diasCarga.martes = 1;
              suma++;
              break;
            case 3:
              this.diasCarga.miercoles = 1;
              suma++;
              break;
            case 4:
              this.diasCarga.jueves = 1;
              suma++;
              break;
            case 5:
              this.diasCarga.viernes = 1;
              suma++;
              break;
            case 6:
              this.diasCarga.sabado = 1;
              suma++;
              break;
            case 7:
              this.diasCarga.domingo = 1;
              suma++;
              break;
          }

        }
        if (suma == 7) {
          this.diasCarga.todos = 1;
        }*/
      }
      //horarios
      console.log(this.vehiculo);
      this.idHorarioMatutinoIni = this.vehiculo.Hraini;
      this.idHorarioMatutinoFin = this.vehiculo.Hrafin;
      this.idHorarioVespertinoIni = this.vehiculo.Hraini2;
      this.idHorarioVespertinoFin = this.vehiculo.Hrafin2;
      this.idHorarioNocturnoIni = this.vehiculo.Hraini3;
      this.idHorarioNocturnoFin = this.vehiculo.Hrafin3;
      this.mixto = this.idHorarioVespertinoIni != "00:00" || this.idHorarioVespertinoFin != "00:00"
      || this.idHorarioNocturnoIni != "00:00" || this.idHorarioNocturnoFin != "00:00";
      this.idEstacion = this.vehiculo.Estacion;
      this.idCombustible = this.vehiculo.Combustible;
      if(this.idCombustible == 1)
        this.idCombustible = 150;
			if(this.idCombustible == 2)
        this.idCombustible = 151;
      /*LimiteCarga:20,
   LimiteDia:50,
   LimiteSemana:20,
   LimiteMes:100*/
      //this.carga = this.vehiculo.LimiteCarga;
      this.dia = this.vehiculo.LimiteDia;
      this.semana = this.vehiculo.LimiteSemana;
      this.mes = this.vehiculo.LimiteMes;

    } else {
      this.vehiculo = new VehicleResponse();
    }

    let i = 1;
    for (let index = 0; index <= 23; index++) {
      for (let indexJ = 0; indexJ <= 59; indexJ = indexJ + 5) {
      	
			var hr;
      	if (index < 10) {
        		hr = "0" + index;
        		if(indexJ < 10) {
					hr = hr + ":0" + indexJ;	        		
        		} else {
					hr = hr + ":" + indexJ;
        		}
      	} else {
   	     	hr = index;
   	     	if(indexJ < 10) {
					hr = hr + ":0" + indexJ;	        		
        		} else {
					hr = hr + ":" + indexJ;
        		}
	      }
      
      	this.listaMatutinos.push({
	        id: i,
   	     hora: hr
      	});
      	i++;
      }
    }
    let j = 1;
    for (let index = 0; index <= 23; index++) {
      for (let indexJ = 0; indexJ <= 59; indexJ = indexJ + 5) {
      	
			var hr;
      	if (index < 10) {
        		hr = "0" + index;
        		if(indexJ < 10) {
					hr = hr + ":0" + indexJ;	        		
        		} else {
					hr = hr + ":" + indexJ;
        		}
      	} else {
   	     	hr = index;
   	     	if(indexJ < 10) {
					hr = hr + ":0" + indexJ;	        		
        		} else {
					hr = hr + ":" + indexJ;
        		}
	      }
      this.listaVespertinos.push({
        id: j,
        hora: hr
      });
      j++;
   	}
    }
    let k = 1;
    for (let index = 0; index <= 23; index++) {
      for (let indexJ = 0; indexJ <= 59; indexJ = indexJ + 5) {
      	
			var hr;
      	if (index < 10) {
        		hr = "0" + index;
        		if(indexJ < 10) {
					hr = hr + ":0" + indexJ;	        		
        		} else {
					hr = hr + ":" + indexJ;
        		}
      	} else {
   	     	hr = index;
   	     	if(indexJ < 10) {
					hr = hr + ":0" + indexJ;	        		
        		} else {
					hr = hr + ":" + indexJ;
        		}
	      }
      this.listaNocturnos.push({
        id: k,
        hora: hr
      });
      k++;
   	}
    }
    this.estaciones.push(new ProductoModel(0, "[--Selecciona--]"));
    this.cargarEstaciones();
    this.cargaPrecios();
    this.openSesion();
    this.changeCombustible();
    this.changeMagnitud();
    this.seCargo = true;
  }

  openSesion() {
    this.localStorage.ready().then(() => {
      this.localStorage.get(`@userSession`).then((data) => {
        if (data != null) {
          this.user = data;
          //this.cargarEdosCuenta();
        } else {
          this.alertaService.warnAlert(this.restService.headerValidacion, "Usuario sin sesión, no se cargarán sus datos", null);
        }
      });
    });
  }
  
  zfill(number, width) {
    var numberOutput = Math.abs(number); /* Valor absoluto del número */
    var length = number.toString().length; /* Largo del número */ 
    var zero = "0"; /* String de cero */  
    
    if (width <= length) {
        if (number < 0) {
             return ("-" + numberOutput.toString()); 
        } else {
             return numberOutput.toString(); 
        }
    } else {
        if (number < 0) {
            return ("-" + (zero.repeat(width - length)) + numberOutput.toString()); 
        } else {
            return ((zero.repeat(width - length)) + numberOutput.toString()); 
        }
    }
	}

  ionViewDidLoad() {
    console.log('ionViewDidLoad VehiculosInfoCreditoPage');
    (document.getElementById("editado") as HTMLFormElement).value = 0;
  }

  editarTodo(){
    var booleano: boolean = false;
    let loading = this.loadingCtrl.create();
    loading.present();
    this.restService.getToken().timeout(this.restService.timeOver).subscribe(data => {
      if (data == null) {
        loading.dismiss();
        this.alertaService.warnAlert(this.restService.headerValidacion, this.restService.mensajeValidacionAdmin, null);
      } else {
        let body = new HttpParams();
        var a = this.user.IdClient;
        var urlArmada = "vehicle/todo/" + this.vehiculo.Id;
        //var urlArmada = "user/" + 1666;
        body.append("IdClient", a.toString());
        if (this.diasCarga.lunes == true) {
          this.diasCarga.lunes = 1;
        } else  if (this.diasCarga.lunes == false){
          this.diasCarga.lunes = 0;
        }
        if (this.diasCarga.martes == true) {
          this.diasCarga.martes = 1;
        } else if (this.diasCarga.martes == false){
          this.diasCarga.martes = 0;
        }
        if (this.diasCarga.miercoles == true) {
          this.diasCarga.miercoles = 1;
        } else if (this.diasCarga.miercoles == false){
          this.diasCarga.miercoles = 0;
        }
        if (this.diasCarga.jueves == true) {
          this.diasCarga.jueves = 1;
        } else if (this.diasCarga.jueves == false){
          this.diasCarga.jueves = 0;
        }
        if (this.diasCarga.viernes == true) {
          this.diasCarga.viernes = 1;
        } else if (this.diasCarga.viernes == false){
          this.diasCarga.viernes = 0;
        }
        if (this.diasCarga.sabado == true) {
          this.diasCarga.sabado = 1;
        } else if (this.diasCarga.sabado == false){
          this.diasCarga.sabado = 0;
        }
        if (this.diasCarga.domingo == true) {
          this.diasCarga.domingo = 1;
        } else if (this.diasCarga.domingo == false){
          this.diasCarga.domingo = 0;
        }
        if (this.diasCarga.todos == true) {
          this.diasCarga.todos = 1;
        } else if (this.diasCarga.todos == false){
          this.diasCarga.todos = 0;
        }

        var binario2 = '' + this.diasCarga.domingo + '' + this.diasCarga.sabado + '' + this.diasCarga.viernes + '' + this.diasCarga.jueves + '' + this.diasCarga.miercoles + '' + this.diasCarga.martes + '' + this.diasCarga.lunes;
        var digit = parseInt(binario2, 2);
        if(this.diasCarga.todos == 1){
          digit = 127;
        }
        //
        if(!this.mixto){
          this.idHorarioVespertinoIni = "00:00";
          this.idHorarioVespertinoFin = "00:00";
          this.idHorarioNocturnoIni = "00:00";
          this.idHorarioNocturnoFin = "00:00";
        }
        body.append("diacarga", digit.toString());
        let bodyObj = {
          IdClient: a,
          diacarga: digit,
          Hraini: this.idHorarioMatutinoIni,
          Hrafin: this.idHorarioMatutinoFin,
          Hraini2: this.idHorarioVespertinoIni,
          Hrafin2: this.idHorarioVespertinoFin,
          Hraini3: this.idHorarioNocturnoIni,
          Hrafin3: this.idHorarioNocturnoFin,
          //LimiteCarga: this.carga,
          LimiteDia: this.dia,
          LimiteSemana: this.semana,
          LimiteMes: this.mes,
          Estacion: this.idEstacion,
          Combustible: this.idCombustible,
          Catuni: this.strCatUni == "$" ? "$" : this.strCatUni2 != "" ? this.strCatUni2 : ""
        };
        this.restService.restServicePUTToken(urlArmada, bodyObj, data.toString()).timeout(this.restService.timeOver).subscribe(
          dataRegistro => {
            if (dataRegistro['Response'] == true){
              this.alertaService.alertaBasica(this.restService.headerExito, "Se ha actualizado la información exitosamente", null);
              (document.getElementById("editado") as HTMLFormElement).value = 0;
            }
            else
              this.alertaService.warnAlert(this.restService.headerValidacion, "Los datos no han sido actualizados", null);
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
    return booleano;
  }

  console() {
    console.log(this.diasCarga);
  }

  igualar(dia: any) {
    if (dia == true) {
      dia = 1;
    } else {
      dia = 0;
    }
  }

  cargarEstaciones() {
    //api/station
    let loading = this.loadingCtrl.create();
    loading.present();
    this.restService.getToken().timeout(this.restService.timeOver).subscribe(data => {
      if (data == null) {
        loading.dismiss();
        this.alertaService.warnAlert(this.restService.headerValidacion, this.restService.mensajeValidacionAdmin, null);
      } else {
        let body = new HttpParams();
        this.restService.restServiceGETToken("station", body, data.toString()).timeout(this.restService.timeOver).subscribe(
          dataRegistro => {
            if (Object.keys(dataRegistro['Response']).length != 0) {
              let arrayEstaciones = dataRegistro['Response'];
              var i = 0;
              for (let index = 0; index < arrayEstaciones.length; index++) {
                let estacion = arrayEstaciones[index];
                if (index == 0) {
                  i = estacion.Id;
                }
                this.estaciones.push(new ProductoModel(estacion.Id, estacion.Nombre));
                //loading.dismiss();

              }
              loading.dismiss();
              //this.combustibles.push(new CombustibleModel("Ixtaczoquitlan", 88.88, 88.88, 88.88, true));
            } else {
              this.alertaService.warnAlert(this.restService.headerValidacion, "No se encontraron estaciones", null);
            }
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
  
  cargaPrecios1() {
  	if(this.idEstacion != 0) {
  		this.combustibles = [];
		this.idCombustible = 0;
  		this.cargaPrecios();
  	} else {
		this.combustibles = [];
		this.idCombustible = 0;
    }
  }
  
  cargaPrecios() {
  	 //	this.idEstacion;
	 // /api/gasoline/price/{id estacion}
	 this.combustibles.push(new ProductoModel(0, "Todos"));
    /*this.combustibles.push(new ProductoModel(1, "MAGNA"));
    this.combustibles.push(new ProductoModel(2, "PREMIUM"));
    this.combustibles.push(new ProductoModel(3, "DIESEL"));*/
    
    if(this.idEstacion != 0) {
    
    
    
    let loading = this.loadingCtrl.create();
    loading.present();
    this.restService.getToken().timeout(this.restService.timeOver).subscribe(data => {
      if (data == null) {
        loading.dismiss();
        this.alertaService.warnAlert(this.restService.headerValidacion, this.restService.mensajeValidacionAdmin, null);
      } else {
        let body = new HttpParams();
        this.restService.restServiceGETToken("gasoline/price/" + this.idEstacion, body, data.toString()).timeout(this.restService.timeOver).subscribe(
          dataRegistro => {
            if (Object.keys(dataRegistro['Response']).length != 0) {
              let arrayEstaciones = dataRegistro['Response'];
              for (let index = 0; index < arrayEstaciones.length; index++) {
                let estacion = arrayEstaciones[index];
                
                this.combustibles.push(new ProductoModel(index + 150, estacion.Nombre));
                //this.estaciones.push(new ProductoModel(estacion.Id, estacion.Nombre));
                //loading.dismiss();

              }
              loading.dismiss();
              //this.combustibles.push(new CombustibleModel("Ixtaczoquitlan", 88.88, 88.88, 88.88, true));
            } else {
              this.alertaService.warnAlert(this.restService.headerValidacion, "No se encontraron precios", null);
            }
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

  ionViewCanLeave() {
    return new Promise((resolve, reject) => {
      if((document.getElementById("editado") as HTMLFormElement).value == 0) 
        resolve();
      else 
      this.alertaService.alertaConfirmacion("Confirmar","¿Desea salir sin guardar los cambios realizados?",resolve,reject);
    });
  }

  updateItem() {
 	 let loading = this.loadingCtrl.create();
    loading.present();
    this.restService.getToken().timeout(this.restService.timeOver).subscribe(data => {
      if (data == null) {
        loading.dismiss();
        this.alertaService.warnAlert(this.restService.headerValidacion, this.restService.mensajeValidacionAdmin, null);
      } else {
        let body = new HttpParams();
        var a = this.user.IdClient;
        var urlArmada = "vehicle/lock/" + this.vehiculo.Id;
        body.append("IdClient", a.toString());
        
        let bodyObj = {
          IdClient: a
        };
        
        this.restService.restServicePUTToken(urlArmada, bodyObj, data.toString()).timeout(this.restService.timeOver).subscribe(
          dataRegistro => {
            if (dataRegistro['Response'] == true) {
              this.alertaService.alertaBasica(this.restService.headerExito, "Se ha actualizado la información", null);
            } else {
              this.alertaService.warnAlert(this.restService.headerValidacion, "Los datos no han sido actualizados", null);
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
  
  todosDiasEnableDisable() {
		if(this.diasCarga.todos == 1 || this.diasCarga.todos == true) {
			this.diasCarga.lunes = true;
         this.diasCarga.martes = true;
         this.diasCarga.miercoles = true;
         this.diasCarga.jueves = true;
         this.diasCarga.viernes = true;
         this.diasCarga.sabado = true;
         this.diasCarga.domingo = true;

		}  
		if(this.diasCarga.todos == 0 || this.diasCarga.todos == false) {
			this.diasCarga.lunes = false;
         this.diasCarga.martes = false;
         this.diasCarga.miercoles = false;
         this.diasCarga.jueves = false;
         this.diasCarga.viernes = false;
         this.diasCarga.sabado = false;
         this.diasCarga.domingo = false;
		}
  }
  
	diasEnableDisable() {
		if(this.diasCarga.lunes == 0 || this.diasCarga.lunes == false ||
			this.diasCarga.martes == 0 || this.diasCarga.martes == false ||
			this.diasCarga.miercoles == 0 || this.diasCarga.miercoles == false ||
			this.diasCarga.jueves == 0 || this.diasCarga.jueves == false ||
			this.diasCarga.viernes == 0 || this.diasCarga.viernes == false ||
			this.diasCarga.sabado == 0 || this.diasCarga.sabado == false ||
			this.diasCarga.domingo == 0 || this.diasCarga.domingo == false) {
					this.diasCarga.todos = false;
    }
    if((this.diasCarga.lunes == 1 || this.diasCarga.lunes == true) &&
			(this.diasCarga.martes == 1 || this.diasCarga.martes == true) &&
			(this.diasCarga.miercoles == 1 || this.diasCarga.miercoles == true) &&
      (this.diasCarga.jueves == 1 || this.diasCarga.jueves == true) &&
      (this.diasCarga.viernes == 1 || this.diasCarga.viernes == true) &&
      (this.diasCarga.sabado == 1 || this.diasCarga.sabado == true) &&
      (this.diasCarga.domingo == 1 || this.diasCarga.domingo == true)) {
					this.diasCarga.todos = true;
		}	
  }
  
  changeCombustible() {
  	if(this.idCombustible != 0) {
      this.deshabilitado = true;
      if(this.seCargo){
        this.idCatUni = 2;
        this.changeMagnitud();
      }
  	} else {
		this.deshabilitado = false;
    }
  }

  changeMagnitud() {
    this.strCatUni = this.idCatUni == 1 ? "$" : "";
    this.strCatUni2 = this.idCatUni == 2 ? "lt" : "";
  }

  indicarCambio(){
    (document.getElementById("editado") as HTMLFormElement).value = 1;
  }

  cambiarHorario(){
  }

}
