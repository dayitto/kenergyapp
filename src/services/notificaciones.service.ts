import { Injectable } from "@angular/core";
import { NotificacionModel } from "../models/notificacionModel";
import { RestServiceProvider } from "../providers/rest-service";
import { AlertaServiceProvider } from "../providers/alerta-service";
import { HttpParams } from "@angular/common/http";
import { Storage } from '@ionic/storage';

@Injectable()
export class NotificacionService {
    public notificaciones: NotificacionModel[] = [];
    public num: number = 0;
    public numInicial: number = 0;
    public usuario: any = null;
    public nombresDia: string[] = ['Dom','Lun','Mar','Mie','Jue','Vie','Sab'];
    public nombresMes: string[] = ['Ene','Feb','Mar','Abr','May','Jun','Jul','Ago','Sep','Oct','Nov','Dic'];
    
    constructor(public localStorage: Storage, private alertaService: AlertaServiceProvider, 
        private restService: RestServiceProvider){
           this.notificaciones = [new NotificacionModel(0, "Ganaste vale de $100","Jue 1 Nov 2018 00:00",
            "Tienes un mes para pasar a recoger tu vale de $100 en la estación K Energy Orizaba"),new NotificacionModel(1, "Puntos al Doble!","Dom 28 Oct 2018 17:55",
            "Día Lunes 29 oct desde 11:00 hasta 14:00, Puntos al Doble en todas tus cargas")];
            this.num = this.notificaciones.length;
            this.numInicial = this.notificaciones.length;
        this.localStorage.ready().then(() => {
            this.localStorage.get(`@userSession`).then((data) => {
                if (data != null) {
                this.usuario = data;
                    if(this.usuario.LlaveroContado > 0)
                        this.cargarNotificacionesAutos();
                } else {
                this.alertaService.warnAlert(this.restService.headerValidacion, "Usuario sin sesión, no se cargarán sus datos", null);
                }
            });
            });
    }

    cargarNotificacionesAutos(){
        var armaUrl = "vehicle/regular/" + this.usuario.LlaveroContado;
        this.restService.getToken().timeout(this.restService.timeOver).subscribe(data => {
        this.restService.restServiceGETToken(armaUrl, new HttpParams(), data.toString()).timeout(this.restService.timeOver).subscribe(
          dataAutos => {
            if(dataAutos['Response']!=null && dataAutos['Response'] instanceof Array){
              let array = dataAutos['Response'];
              array.sort(function (a, b) {
                if (a.FechaPoliza < b.FechaPoliza) {
                  return -1;
                }
                if (a.FechaPoliza > b.FechaPoliza) {
                  return 1;
                }
                // a must be equal to b
                return 0;
              });
                array.forEach(auto => {
                    let dias = this.calculateDiff(auto.FechaPoliza);
                    if(auto.Aseguro == 1 && dias > 0 && dias <= 30){
                        let fecha: Date = new Date();
                        this.notificaciones.push(new NotificacionModel(this.num, "Alerta de vencimiento de poliza", this.nombresDia[fecha.getDay()] + " " + fecha.getDate() + " " + this.nombresMes[fecha.getMonth()] + " " + fecha.getFullYear() + " " + fecha.getHours() + ":" + fecha.getMinutes(),
                        "Se notifica que la poliza del auto " + auto.Marca + " " + auto.Modelo + " se vence en " + (dias > 1 ? dias + " días." : " mañana")));
                        this.num++;
                        this.numInicial++;
                    }
                        
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
    
    calculateDiff(dateSent){
      let currentDate = new Date();
      dateSent = new Date(dateSent);
  
      return Math.floor((Date.UTC(dateSent.getFullYear(), dateSent.getMonth(), dateSent.getDate()) - Date.UTC(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate())) /(1000 * 60 * 60 * 24));
  }

}