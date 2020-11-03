import { Injectable } from '@angular/core';
import { LoadingController } from 'ionic-angular';
import { RestServiceProvider } from './rest-service';
import { HttpParams } from '@angular/common/http';
import { AlertaServiceProvider } from './alerta-service';
import { MenuModel } from '../models/MenuModel';
import { ContactoPage } from '../pages/contacto/contacto';
import { PremiosPage } from '../pages/premios/premios';
import { PromocionesPage } from '../pages/promociones/promociones';
import { FacturacionPage } from '../pages/facturacion/facturacion';
import { CargasPage } from '../pages/cargas/cargas';
import { MiAutoPage } from '../pages/mi-auto/mi-auto';
import { EstacionesPage } from '../pages/estaciones/estaciones';
import { MisDatosPage } from '../pages/mis-datos/mis-datos';
import { MiAutoInfoPage } from '../pages/mi-auto-info/mi-auto-info';
import { MisDatosCreditoPage } from '../pages/mis-datos-credito/mis-datos-credito';
import { EstadoCuentaPage } from '../pages/estado-cuenta/estado-cuenta';
import { VehiculosCreditoPage } from '../pages/vehiculos-credito/vehiculos-credito';
import { FacturacionCreditoPage } from '../pages/facturacion-credito/facturacion-credito';
import { EstadisticasCreditoPage } from '../pages/estadisticas-credito/estadisticas-credito';
import { CargasCreditoPage } from '../pages/cargas-credito/cargas-credito';
import { Storage } from '@ionic/storage';
import { EstadisticasPage } from '../pages/estadisticas/estadisticas';
import { ConsultaPuntosPage } from '../pages/consulta-puntos/consulta-puntos';
import { UsuarioService } from '../services/usuario.service';
import { HomePage } from '../pages/home/home';
import { HomeCreditoPage } from '../pages/home-credito/home-credito';

@Injectable()
export class MenuProvider {
  pages: MenuModel[] = [];
  private usuario :any =null;
  constructor(public localStorage: Storage,
  public loadingCtrl: LoadingController,
  private restService:RestServiceProvider,
  private alertaService:AlertaServiceProvider,
  private usuarioService: UsuarioService) {
    this.openSesion();
  }

  openSesion() {
    this.localStorage.ready().then(() => {
      this.localStorage.get(`@userSession`).then((data) => {
        if (data != null) {
          this.usuario = data;
        } else {
          //this.alertaService.warnAlert(this.restService.headerValidacion, "Usuario sin sesión, no se cargarán sus datos", null);
        }
      });
    });

  }

  public returnMenuByType(userType: any = 1, usuario:any) {
    this.pages = [];
    this.usuario = userType.user;
    let a = userType.valor;
    this.usuarioService.tipo = a;
    console.log(this.usuarioService.tipo);
    if(a == 1){
		
		let loading = this.loadingCtrl.create();
    	loading.present();
    	this.restService.getToken().timeout(this.restService.timeOver).subscribe(data => {
    		loading.dismiss();
      	if (data == null) {
        		this.alertaService.warnAlert(this.restService.headerValidacion, this.restService.mensajeValidacionAdmin, null);
      	} else {
        		let body = new HttpParams();
        
				this.restService.restServiceGETToken("user/regular/" + this.usuario.Id, body, data.toString()).timeout(this.restService.timeOver).subscribe(
        			dataRegistroLast => {
                this.usuarioService.puntos = dataRegistroLast['Response'].Puntos;
            	
              var armaUrl = "vehicle/regular/" + this.usuario.LlaveroContado;
              console.log(armaUrl);
      			this.restService.getToken().timeout(this.restService.timeOver).subscribe(data => {
      				this.restService.restServiceGETToken(armaUrl, new HttpParams(), data.toString()).timeout(this.restService.timeOver).subscribe(
        					dataAutos => {
          					let totalAutos = 0;
          					if(dataAutos['Response']!=null && dataAutos['Response'] instanceof Array){
            					let array = dataAutos['Response'];
            					totalAutos = array.length; 
            				} 
            				loading.dismiss(); 
            				this.pages.push(new MenuModel("Inicio", "iconos/home.png", "#123", HomePage));
            				this.pages.push(new MenuModel(this.usuario.Nombre, "misDatos/usuario.png", "#123", MisDatosPage, this.usuarioService.puntos));
      						this.pages.push(new MenuModel("Estaciones", "estaciones/ubication.png", "#123", EstacionesPage));
      						this.pages.push(new MenuModel("Mi Auto", "miAuto/carro.png", "#123", MiAutoInfoPage, "", totalAutos < 1 ? "Sin autos" : totalAutos == 1 ? "1 auto" : totalAutos + " autos"));
      						this.pages.push(new MenuModel("Cargas", "cargas/fuel-station.png", "#123", CargasPage));
                  this.pages.push(new MenuModel("Facturación", "facturacion/factura.png", "#123", FacturacionPage));
                  this.pages.push(new MenuModel("Estadísticas", "estadisticas/graph.png", "#123", EstadisticasPage));
      						this.pages.push(new MenuModel("Promociones", "promociones/promocion.png", "#123", PromocionesPage));
      						this.pages.push(new MenuModel("Premios", "premios/promo.png", "#123", PremiosPage));
      						this.pages.push(new MenuModel("Contacto", "contacto/contacto.png", "#123", ContactoPage));
            				
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
    	
    	
    	
    	
    	//api/puntos/{id usuario}
      
      
//      this.pages.push(new MenuModel("Consulta Puntos", "facturacion/factura.png", "#123", ConsultaPuntosPage));//Nuevo

      
      

  //    this.pages.push(new MenuModel("Mis Solicitudes", "facturacion/factura.png", "#123", FacturacionPage));//Nuevo
    }else{
    	
    	let loading = this.loadingCtrl.create();
    loading.present();
    this.restService.getToken().timeout(this.restService.timeOver).subscribe(data => {
      if (data == null) {
        loading.dismiss();
        this.alertaService.warnAlert(this.restService.headerValidacion, this.restService.mensajeValidacionAdmin, null);
      } else {
        if (this.usuario != null) {
          let body = new HttpParams();
          //var a = 44;
          var a = this.usuario.IdClient;
          body.append("IdClient", a.toString());
          var url = "status/account/" + a.toString();
          console.log(url);
          this.restService.restServiceGETToken(url, new HttpParams(), data.toString()).timeout(this.restService.timeOver).subscribe(
            dataRegistro => {
              if (Object.keys(dataRegistro['Response']).length != 0) {
                this.pages.push(new MenuModel("Inicio", "iconos/home.png", "#123", HomeCreditoPage));
                this.pages.push(new MenuModel(this.usuario.Nombre, "misDatos/usuario.png", "#123", MisDatosCreditoPage, "AB Pro SC", "Cred. Disp. $" + parseInt(dataRegistro['Response'].SaldoDisponible).toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')));
      this.pages.push(new MenuModel("Estado de Cuenta", "edoCuenta/edoCuenta.png", "#123", EstadoCuentaPage));
      this.pages.push(new MenuModel("Estaciones", "estaciones/ubication.png", "#123", EstacionesPage));
      this.pages.push(new MenuModel("Vehículos", "miAuto/carro.png", "#123", VehiculosCreditoPage));
      this.pages.push(new MenuModel("Facturación", "facturacion/factura.png", "#123", FacturacionCreditoPage));
      this.pages.push(new MenuModel("Estadísticas", "estadisticas/graph.png", "#123", EstadisticasCreditoPage));
      this.pages.push(new MenuModel("Cargas", "cargas/fuel-station.png", "#123", CargasCreditoPage));
      this.pages.push(new MenuModel("Contacto", "contacto/contacto.png", "#123", ContactoPage));

              } else {
                this.alertaService.warnAlert(this.restService.headerValidacion, "No se encontraron estaciones", null);
              }
              loading.dismiss();
            }, error => {
              loading.dismiss();
              console.log(error);
              this.alertaService.errorAlert(this.restService.headerError, this.restService.mensajeError, null);
            }
          );
        } else {
          loading.dismiss();
        }
      }
    }, error => {
      loading.dismiss();
      console.log(error);
      this.alertaService.errorAlert(this.restService.headerError, this.restService.mensajeError, null);
    });
    
    
      
    }
    return this.pages;
  }

}
