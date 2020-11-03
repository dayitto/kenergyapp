import { Injectable } from '@angular/core';
import { LoadingController, AlertController, NavController } from 'ionic-angular';
import { FileOpener } from '@ionic-native/file-opener';
import { FileTransfer,FileTransferObject } from '@ionic-native/file-transfer';
import { RestServiceProvider } from '../providers/rest-service';
import { AlertaServiceProvider } from '../providers/alerta-service';
import { HttpParams } from '@angular/common/http';
import { File } from '@ionic-native/file';
import { VisualizadorXmlPage } from '../pages/visualizador-xml/visualizador-xml';
import { SocialSharing } from '@ionic-native/social-sharing';

@Injectable()
export class FacturacionService {

  readonly ruta: string = this.file.externalRootDirectory + "/Download/";
  public nav: any;

  constructor(public loadingCtrl: LoadingController,public alertCtrl: AlertController,
    public transfer: FileTransfer, public file: File, public fileOpener: FileOpener,
    public restService: RestServiceProvider,public alertaService: AlertaServiceProvider,
    private socialSharing: SocialSharing) { }

    downloadFactura(idFactura: number, idEstacion: number, folio: string) {
	
        let fileTransfer: FileTransferObject = this.transfer.create();
        let loading = this.loadingCtrl.create();
          loading.present();
          let archivo = this.ruta + folio + '.pdf';
          this.restService.getToken().timeout(this.restService.timeOver).subscribe(data => {
            if (data == null) {
              loading.dismiss();
              this.alertaService.warnAlert(this.restService.headerValidacion, this.restService.mensajeValidacionAdmin, null);
            } else {
              let body = new HttpParams();
    
              var url = "invoice/pdf?IdFactura=" + idFactura + "&IdEstacion=" + idEstacion;
              console.log(url);
                 this.restService.restServiceGETToken(url, body, data.toString()).timeout(this.restService.timeOver).subscribe(
                dataRegistro => {
                  fileTransfer.download(dataRegistro['Response'], archivo).then((entry) => {
                    const alert = this.alertCtrl.create({
                      title: 'Descarga exitosa',
                      subTitle: 'Se ha descargado correctamente en: ' + entry.toURL(),
                      cssClass: 'alertCustomCss',
                      buttons: [
                        {
                          text: 'Abrir',
                          handler: () => {
                            this.abrirDespuesDescarga(archivo);
                          }
                        },
                      {
                        text: 'Aceptar',
                          handler: () => {
                          }
                        }
                      ]
                    });
                    alert.present();
                          }, (error) => {
                            this.alertaService.errorAlert(this.restService.headerError, "ERROR descarga = " + error, null);
                          });
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

      abrirDespuesDescarga(archivo: string){
        this.fileOpener.open(archivo, 'application/pdf')
                      .then(() => console.log("Abrio correctament")/*this.alertaService.alertaBasica(this.restService.headerExito, "Se abrio correctamente", null)*/)
                      .catch(e => this.alertaService.errorAlert(this.restService.headerError, "No se pudo abrir, no existe aplicación compatible " + e, null));	
      }

      downloadFacturaXML(idFactura: number, idEstacion: number, folio: string) {
	
        let fileTransfer: FileTransferObject = this.transfer.create();
        let loading = this.loadingCtrl.create();
          loading.present();
    
          this.restService.getToken().timeout(this.restService.timeOver).subscribe(data => {
            if (data == null) {
              loading.dismiss();
              this.alertaService.warnAlert(this.restService.headerValidacion, this.restService.mensajeValidacionAdmin, null);
            } else {
              let body = new HttpParams();
    
              var url = "invoice/xml?IdFactura=" + idFactura + "&IdEstacion=" + idEstacion;
                 this.restService.restServiceGETToken(url, body, data.toString()).timeout(this.restService.timeOver).subscribe(
                dataRegistro => {
                  this.file.createFile(this.ruta, folio + '.xml', true)
                .then(FileEntry => this.file.writeExistingFile(this.ruta, folio + '.xml', dataRegistro['Response'].XML)
                  .then(archivo => {
                    this.alertaService.alertaBasica("¡Archivo descargado!","El archivo se ha descargado con éxito en la carpeta Download",null);
                  })
                )
                .catch(err => this.alertaService.alertaBasica("","error : " + JSON.stringify(err), null));
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

      sendCorreo(idFactura, idEstacion, email){
        let loading = this.loadingCtrl.create();
        loading.present();

        this.restService.getToken().timeout(this.restService.timeOver).subscribe(data => {
        if (data == null) {
            loading.dismiss();
            this.alertaService.warnAlert(this.restService.headerValidacion, this.restService.mensajeValidacionAdmin, null);
        } else {
            var url = "invoice/web/email";

            const body = new HttpParams()
        .set('IdFactura', idFactura)
        .set('IdEstacion', idEstacion)
        .set('Email', email);
        console.log(JSON.stringify(body));
        this.restService.restServicePOSTTokenXForm(url, body, data.toString()).timeout(this.restService.timeOver).subscribe(
        dataRegistro => {
                if (dataRegistro['Status'] == 1) {
                this.alertaService.alertaBasica("¡Bien!","Tu factura ha sido enviada a tu correo, favor de revisarlo",null);
                } else if(dataRegistro['Status']==0 && dataRegistro['Message']=="1") {
                this.alertaService.warnAlert(this.restService.headerValidacion, "No existen los archivos de la factura en el servidor", null);
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

    mostrarEnvio(idFactura, idEstacion, email) {
        const prompt = this.alertCtrl.create({
          title: "Enviar correo",
          inputs: [
            {
              name: 'email',
              placeholder: 'Teclea el email',
              value: email
            }
          ],
          buttons: [
            {
              text: 'Cancelar',
              role: 'cancel'
            },
            {
              text: 'Aceptar',
              handler: data => {
                email = data.email;
               this.sendCorreo(idFactura, idEstacion, email);
              }
            }
          ]
        });
        prompt.present();
      }

      openFactura(idFactura: number, idEstacion: number) {
	
        let fileTransfer: FileTransferObject = this.transfer.create();
        let loading = this.loadingCtrl.create();
          loading.present();
    
          this.restService.getToken().timeout(this.restService.timeOver).subscribe(data => {
            if (data == null) {
              loading.dismiss();
              this.alertaService.warnAlert(this.restService.headerValidacion, this.restService.mensajeValidacionAdmin, null);
            } else {
              let body = new HttpParams();
    
              var url = "invoice/pdf?IdFactura=" + idFactura + "&IdEstacion=" + idEstacion;
              console.log(url);
                 this.restService.restServiceGETToken(url, body, data.toString()).timeout(this.restService.timeOver).subscribe(
                dataRegistro => {
                  fileTransfer.download(dataRegistro['Response'], this.file.externalDataDirectory + 'factura.pdf').then((entry) => {
                   //this.alertaService.alertaBasica(this.restService.headerExito, "Se ha descargado correctamente en: " + entry.toURL(), null);
                            
    
                            this.fileOpener.open(this.file.externalDataDirectory + 'factura.pdf', 'application/pdf')
                              .then(() => console.log("Abrio correctamente")/*this.alertaService.alertaBasica(this.restService.headerExito, "Se abrio correctamente", null)*/)
                              .catch(e => this.alertaService.errorAlert(this.restService.headerError, "No se pudo abrir, no existe aplicación compatible " + e, null));				    	
                            
                          }, (error) => {
                            this.alertaService.errorAlert(this.restService.headerError, "ERROR descarga = " + error, null);
                          });
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

      openFacturaXml(idFactura: number, idEstacion: number){
        let loading = this.loadingCtrl.create();
          loading.present();
    
          this.restService.getToken().timeout(this.restService.timeOver).subscribe(data => {
            if (data == null) {
              loading.dismiss();
              this.alertaService.warnAlert(this.restService.headerValidacion, this.restService.mensajeValidacionAdmin, null);
            } else {
              let body = new HttpParams();
    
              var url = "invoice/xml?IdFactura=" + idFactura + "&IdEstacion=" + idEstacion;
                 this.restService.restServiceGETToken(url, body, data.toString()).timeout(this.restService.timeOver).subscribe(
                dataRegistro => {
                  console.log(dataRegistro['Response'].XML);
                  this.nav.push(VisualizadorXmlPage, { xml:  dataRegistro['Response'].XML });
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

      compartirPdfWhatsapp(idFactura: number, idEstacion: number, folio: string) {
	
        let fileTransfer: FileTransferObject = this.transfer.create();
        let loading = this.loadingCtrl.create();
          loading.present();
    
          this.restService.getToken().timeout(this.restService.timeOver).subscribe(data => {
            if (data == null) {
              loading.dismiss();
              this.alertaService.warnAlert(this.restService.headerValidacion, this.restService.mensajeValidacionAdmin, null);
            } else {
              let body = new HttpParams();
    
              var url = "invoice/pdf?IdFactura=" + idFactura + "&IdEstacion=" + idEstacion;
                 this.restService.restServiceGETToken(url, body, data.toString()).timeout(this.restService.timeOver).subscribe(
                dataRegistro => {
                  fileTransfer.download(dataRegistro['Response'], this.file.externalDataDirectory + 'Factura_Kenergy.pdf').then((entry) => {
                    this.socialSharing.shareViaWhatsApp('Factura de KEnergy ' + folio,this.file.externalDataDirectory + 'Factura_Kenergy.pdf').then(() => {
                    }).catch((e) => {
                      this.alertaService.alertaBasica("Error","Error al compartir Factura",null);
                    });				    	
                            
                          }, (error) => {
                            this.alertaService.errorAlert(this.restService.headerError, "ERROR descarga = " + error, null);
                          });
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

      compartirXmlWhatsapp(idFactura: number, idEstacion: number, folio: string){
        let fileTransfer: FileTransferObject = this.transfer.create();
        let loading = this.loadingCtrl.create();
          loading.present();
    
          this.restService.getToken().timeout(this.restService.timeOver).subscribe(data => {
            if (data == null) {
              loading.dismiss();
              this.alertaService.warnAlert(this.restService.headerValidacion, this.restService.mensajeValidacionAdmin, null);
            } else {
              let body = new HttpParams();
    
              var url = "invoice/xml?IdFactura=" + idFactura + "&IdEstacion=" + idEstacion;
                 this.restService.restServiceGETToken(url, body, data.toString()).timeout(this.restService.timeOver).subscribe(
                dataRegistro => {
                  this.file.createFile(this.file.externalDataDirectory, 'Factura_Kenergy.xml', true)
                  .then(FileEntry => this.file.writeExistingFile(this.file.externalDataDirectory, 'Factura_Kenergy.xml', dataRegistro['Response'].XML)
                  .then(archivo => {
                    this.socialSharing.shareViaWhatsApp('Factura de KEnergy ' + folio,this.file.externalDataDirectory + 'Factura_Kenergy.xml').then(() => {
                    }).catch((e) => {
                      this.alertaService.alertaBasica("Error al enviar factura por Whatsapp",JSON.stringify(e),null);
                    })
                  })
                )
                .catch(err => this.alertaService.alertaBasica("","error : " + JSON.stringify(err), null));
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