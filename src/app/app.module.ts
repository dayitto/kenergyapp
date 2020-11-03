import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { MyApp } from './app.component';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { RestServiceProvider } from '../providers/rest-service';
import { HttpClientModule } from '@angular/common/http';
import { AlertaServiceProvider } from '../providers/alerta-service';
import { NgxMaskModule } from 'ngx-mask';
import { PipesModule } from '../pipes/pipes.module';
import { DatePipe } from '@angular/common';
import { InAppBrowser } from '@ionic-native/in-app-browser';
import { LoginPageModule } from '../pages/login/login.module';
import { IonicStorageModule } from '@ionic/storage';
import { Geolocation } from '@ionic-native/geolocation';
import { CallNumber } from '@ionic-native/call-number';
import { MenuProvider } from '../providers/menu-service';
import { MobileAccessibility } from '@ionic-native/mobile-accessibility';
import { HTTP } from '@ionic-native/http';
import { HomePageModule } from '../pages/home/home.module';
import { AgregaAutoPageModule } from '../pages/agrega-auto/agrega-auto.module';
import { NotificacionesPageModule } from '../pages/notificaciones/notificaciones.module';
import { MisDatosPageModule } from '../pages/mis-datos/mis-datos.module';
import { DatosFacturacionPageModule } from '../pages/datos-facturacion/datos-facturacion.module';
import { EstadisticasPageModule } from '../pages/estadisticas/estadisticas.module';
import { MiAutoPageModule } from '../pages/mi-auto/mi-auto.module';
import { EstacionesPageModule } from '../pages/estaciones/estaciones.module';
import { EstacionesListPageModule } from '../pages/estaciones-list/estaciones-list.module';
import { HomeEstacionesListPageModule} from '../pages/home-credito-estaciones-list/home-estaciones-list.module';
import { MisAutosPageModule } from '../pages/mis-autos/mis-autos.module';
import { MiAutoInfoPageModule } from '../pages/mi-auto-info/mi-auto-info.module';
import { CargasPageModule } from '../pages/cargas/cargas.module';
import { CargasListPageModule } from '../pages/cargas-list/cargas-list.module';
import { CargasInfoPageModule } from '../pages/cargas-info/cargas-info.module';
import { FacturacionPageModule } from '../pages/facturacion/facturacion.module';
import { PromocionesPageModule } from '../pages/promociones/promociones.module';
import { TerminosPageModule } from '../pages/terminos/terminos.module';
import { PremiosPageModule } from '../pages/premios/premios.module';
import { ContactoPageModule } from '../pages/contacto/contacto.module';
import { PremiosSolicitudPageModule } from '../pages/premios-solicitud/premios-solicitud.module';
import { RegistroValidaPageModule } from '../pages/registro-valida/registro-valida.module';
import { RegistroPageModule } from '../pages/registro/registro.module';
import { AgregaAutoEscanerPageModule } from '../pages/agrega-auto-escaner/agrega-auto-escaner.module';
import { AgregaAutoInfoPageModule } from '../pages/agrega-auto-info/agrega-auto-info.module';
import { BarcodeScanner } from '@ionic-native/barcode-scanner';
import { HomeCreditoPageModule } from '../pages/home-credito/home-credito.module';
import { AmChartsModule } from "@amcharts/amcharts3-angular";
import { RegistroPreviewPageModule } from '../pages/registro-preview/registro-preview.module';
import { RegistroValidaCreditoPageModule } from '../pages/registro-valida-credito/registro-valida-credito.module';
import { RegistroCreditoPage } from '../pages/registro-credito/registro-credito';
import { RegistroCreditoPageModule } from '../pages/registro-credito/registro-credito.module';
import { RegistroValidaCorreoCreditoPageModule } from '../pages/registro-valida-correo-credito/registro-valida-correo-credito.module';
import { EstadoCuentaPageModule } from '../pages/estado-cuenta/estado-cuenta.module';
import { MisDatosCreditoPage } from '../pages/mis-datos-credito/mis-datos-credito';
import { MisDatosCreditoPageModule } from '../pages/mis-datos-credito/mis-datos-credito.module';
import { EstadisticasCreditoPageModule } from '../pages/estadisticas-credito/estadisticas-credito.module';
import { VehiculosCreditoPageModule } from '../pages/vehiculos-credito/vehiculos-credito.module';
import { VehiculosInfoCreditoPageModule } from '../pages/vehiculos-info-credito/vehiculos-info-credito.module';
import { CargasCreditoPageModule } from '../pages/cargas-credito/cargas-credito.module';
import { CargasInfoCreditoPageModule } from '../pages/cargas-info-credito/cargas-info-credito.module';
import { FacturacionCreditoPageModule } from '../pages/facturacion-credito/facturacion-credito.module';
import { ConsultaPuntosPageModule } from '../pages/consulta-puntos/consulta-puntos.module';
import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer/';
import { File } from '@ionic-native/file';
import { FileOpener } from '@ionic-native/file-opener/';
import { AvisoPrivacidadPageModule } from '../pages/aviso-privacidad/aviso-privacidad.module';
import { SQLite } from '@ionic-native/sqlite';
import { ImagePicker } from '@ionic-native/image-picker';
import { FileChooser } from '@ionic-native/file-chooser';
import { FacturacionService } from '../services/facturacion.service';
import { AppAvailability } from '@ionic-native/app-availability';
import { NotificacionService } from '../services/notificaciones.service';
import { LaunchNavigator } from '@ionic-native/launch-navigator';
import { Camera } from '@ionic-native/camera';
import { CambiarContraPageModule } from '../pages/cambiar-contra/cambiar-contra.module';
import { AbrirnotificacionesService } from '../services/abrirnotificaciones.service';
import { UsuarioService } from '../services/usuario.service';
import { EstacionesService } from '../services/estaciones.service';
import { CambiarEmailPageModule } from '../pages/cambiar-email/cambiar-email.module';
import { Deeplinks } from '@ionic-native/deeplinks';
import { RecuperarContraPageModule } from '../pages/recuperar-contra/recuperar-contra.module';
import { SocialSharing } from '@ionic-native/social-sharing';
import { VisualizadorXmlPageModule } from '../pages/visualizador-xml/visualizador-xml.module';
import { AndroidPermissions } from '@ionic-native/android-permissions';
import { VehiculoService } from '../services/vehiculo.service';

@NgModule({
  declarations: [
    MyApp
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    HttpClientModule,
    NgxMaskModule.forRoot(),
    PipesModule,
    IonicStorageModule.forRoot(),
    //Pantallas de la App
    LoginPageModule,
    HomePageModule,
    AgregaAutoPageModule,
    NotificacionesPageModule,
    MisDatosPageModule,
    DatosFacturacionPageModule,
    EstadisticasPageModule,
	 AvisoPrivacidadPageModule,
    MiAutoPageModule,
    EstacionesPageModule,
    EstacionesListPageModule,
    HomeEstacionesListPageModule,
    MiAutoInfoPageModule,
    MisAutosPageModule,
    CargasPageModule,
    CargasListPageModule,
    CargasInfoPageModule,
    FacturacionPageModule,
    PromocionesPageModule,
    TerminosPageModule,
    PremiosPageModule,
    ContactoPageModule,
    PremiosSolicitudPageModule,
    RegistroPageModule,
    RegistroValidaPageModule,
    AgregaAutoEscanerPageModule,
    AgregaAutoInfoPageModule,
    HomeCreditoPageModule,
    AmChartsModule,
    RegistroPreviewPageModule,
    RegistroValidaCreditoPageModule,
    RegistroCreditoPageModule,
    RegistroValidaCorreoCreditoPageModule,
    EstadoCuentaPageModule,
    MisDatosCreditoPageModule,
    EstadisticasCreditoPageModule,
    VehiculosCreditoPageModule,
    VehiculosInfoCreditoPageModule,
    CargasCreditoPageModule,
    CargasInfoCreditoPageModule,
    FacturacionCreditoPageModule,
    ConsultaPuntosPageModule,
    CambiarContraPageModule,
    CambiarEmailPageModule,
    RecuperarContraPageModule,
    VisualizadorXmlPageModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp
  ],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: ErrorHandler, useClass: IonicErrorHandler },
    RestServiceProvider,
    AlertaServiceProvider,
    DatePipe,
    InAppBrowser,
    Geolocation,
    CallNumber,
    MenuProvider,
    MobileAccessibility,
    HTTP,
    BarcodeScanner,
	 FileTransfer, 
	 FileTransferObject,
	 File,
	 ImagePicker,
	 FileOpener,
   SQLite,
   FileChooser,
   FacturacionService,
   NotificacionService,
   AbrirnotificacionesService,
   AppAvailability,
   LaunchNavigator,
   Camera,
   UsuarioService,
   EstacionesService,
   Deeplinks,
   SocialSharing,
   AndroidPermissions,
   VehiculoService
  ]
})
export class AppModule { }
