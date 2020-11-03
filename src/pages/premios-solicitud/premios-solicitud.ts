import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import { VehiculoModel } from '../../models/vehiculoModel';
import { PremioModel } from '../../models/premioModel';
import { RestServiceProvider } from '../../providers/rest-service';
import { HttpParams } from '@angular/common/http';
import { AlertaServiceProvider } from '../../providers/alerta-service';

@IonicPage()
@Component({
  selector: 'page-premios-solicitud',
  templateUrl: 'premios-solicitud.html',
})
export class PremiosSolicitudPage {

  public vehiculos: VehiculoModel[] = [];
  public vehiculosSeleccionados: VehiculoModel[] = [];
  public sumatoria: number = 0;
  public sumatoriaCanje: number = 0;
  public sumatoriaDisponible: number = 0;
  public premios: PremioModel[] = [];
  public numCanje: any = 233;
  public status: string = "Solicitado";
  public usuario: any = null;

  constructor(public navCtrl: NavController, public navParams: NavParams, public viewCtrl: ViewController,
  public restService: RestServiceProvider, private alertaService:AlertaServiceProvider) {
    this.premios = navParams.get("premios");
    this.usuario = navParams.get("usuario");
    this.cargarVehiculos();
    
    this.sumatoria = this.sumar(this.vehiculos);
    this.sumatoriaCanje = this.sumarCanje(this.vehiculos);
  }

  ionViewDidLoad() {
  }
  
	cargarVehiculos() {
    this.vehiculos = [];
      var armaUrl = "puntos/detail/" + this.usuario.Id;
      this.restService.getToken().timeout(this.restService.timeOver).subscribe(data => {
      this.restService.restServiceGETToken(armaUrl, new HttpParams(), data.toString()).timeout(this.restService.timeOver).subscribe(
        dataAutos => {
          if(dataAutos['Response']!=null && dataAutos['Response'] instanceof Array){
            let array = dataAutos['Response'];
            array.forEach(auto => {
              /*this.vehiculos.push({
                id: auto.Id,
                marca: auto.Marca,
                modelo: auto.Modelo,
                placa: auto.Placa,
                tipo: auto.Oct == 92 ? 1 : auto.Oct == 87 ? 2 : 3,
                circula: 1
              })*/
            });
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

  sumar(vehiculos: VehiculoModel[]) {
    var suma = 0;
    vehiculos.forEach(v => {
      suma += v.Puntos;
    });
    return suma;
  }

  sumarCanje(vehiculos: VehiculoModel[]) {
    var suma = 0;
    this.vehiculosSeleccionados = [];
    vehiculos.forEach(v => {
      if (v.selected) {
        suma += v.Puntos;
        this.vehiculosSeleccionados.push(v);
      }
    });
    return suma;
  }

  sumarCanjeDisponible(vehiculos: VehiculoModel[]) {
    var suma = 0;
    this.vehiculosSeleccionados = [];
    vehiculos.forEach(v => {
      if (v.selected) {
        suma += v.Puntos;
        this.vehiculosSeleccionados.push(v);
      }
    });
    return suma;
  }

  updateSumatoria() {
    this.sumatoriaCanje = this.sumarCanje(this.vehiculos);
    this.sumatoriaDisponible= this.sumatoria - this.sumatoriaCanje;
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }

  returnSuma() {
    var s = 0;
    this.premios.forEach(p => {
      s += p.monto;
    });
    return s;
  }

  returnPts() {
    var s = 0;
    this.premios.forEach(p => {
      s += p.canjeOpcional;
    });
    return s;
  }
}
