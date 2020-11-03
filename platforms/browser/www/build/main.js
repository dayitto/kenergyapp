webpackJsonp([2],{

/***/ 102:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return FacturacionService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ionic_native_file_opener__ = __webpack_require__(101);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_native_file_transfer__ = __webpack_require__(82);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__providers_rest_service__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__providers_alerta_service__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__angular_common_http__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__ionic_native_file__ = __webpack_require__(83);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};








var FacturacionService = /** @class */ (function () {
    function FacturacionService(loadingCtrl, alertCtrl, transfer, file, fileOpener, restService, alertaService) {
        this.loadingCtrl = loadingCtrl;
        this.alertCtrl = alertCtrl;
        this.transfer = transfer;
        this.file = file;
        this.fileOpener = fileOpener;
        this.restService = restService;
        this.alertaService = alertaService;
        this.ruta = this.file.externalRootDirectory + "/Download/";
    }
    FacturacionService.prototype.downloadFactura = function (idFactura, idEstacion, folio) {
        var _this = this;
        var fileTransfer = this.transfer.create();
        var loading = this.loadingCtrl.create();
        loading.present();
        this.restService.getToken().timeout(this.restService.timeOver).subscribe(function (data) {
            if (data == null) {
                loading.dismiss();
                _this.alertaService.warnAlert(_this.restService.headerValidacion, _this.restService.mensajeValidacionAdmin, null);
            }
            else {
                var body = new __WEBPACK_IMPORTED_MODULE_6__angular_common_http__["d" /* HttpParams */]();
                var url = "invoice/pdf?IdFactura=" + idFactura + "&IdEstacion=" + idEstacion;
                console.log(url);
                _this.restService.restServiceGETToken(url, body, data.toString()).timeout(_this.restService.timeOver).subscribe(function (dataRegistro) {
                    fileTransfer.download(dataRegistro['Response'], _this.ruta + folio + '.pdf').then(function (entry) {
                        //this.alertaService.alertaBasica(this.restService.headerExito, "Se ha descargado correctamente en: " + entry.toURL(), null);
                        _this.fileOpener.open(_this.ruta + folio + '.pdf', 'application/pdf')
                            .then(function () { return console.log("Abrio correctament"); } /*this.alertaService.alertaBasica(this.restService.headerExito, "Se abrio correctamente", null)*/)
                            .catch(function (e) { return _this.alertaService.errorAlert(_this.restService.headerError, "No se pudo abrir, no existe aplicación compatible " + e, null); });
                    }, function (error) {
                        _this.alertaService.errorAlert(_this.restService.headerError, "ERROR descarga = " + error, null);
                    });
                    loading.dismiss();
                }, function (error) {
                    loading.dismiss();
                    console.log(error);
                    _this.alertaService.errorAlert(_this.restService.headerError, _this.restService.mensajeError, null);
                });
            }
        }, function (error) {
            loading.dismiss();
            console.log(error);
            _this.alertaService.errorAlert(_this.restService.headerError, _this.restService.mensajeError, null);
        });
    };
    FacturacionService.prototype.downloadFacturaXML = function (idFactura, idEstacion, folio) {
        var _this = this;
        var fileTransfer = this.transfer.create();
        var loading = this.loadingCtrl.create();
        loading.present();
        this.restService.getToken().timeout(this.restService.timeOver).subscribe(function (data) {
            if (data == null) {
                loading.dismiss();
                _this.alertaService.warnAlert(_this.restService.headerValidacion, _this.restService.mensajeValidacionAdmin, null);
            }
            else {
                var body = new __WEBPACK_IMPORTED_MODULE_6__angular_common_http__["d" /* HttpParams */]();
                var url = "invoice/xml?IdFactura=" + idFactura + "&IdEstacion=" + idEstacion;
                _this.restService.restServiceGETToken(url, body, data.toString()).timeout(_this.restService.timeOver).subscribe(function (dataRegistro) {
                    _this.file.createFile(_this.ruta, folio + '.xml', true)
                        .then(function (FileEntry) { return _this.file.writeExistingFile(_this.ruta, folio + '.xml', dataRegistro['Response'].XML)
                        .then(function (archivo) {
                        _this.alertaService.alertaBasica("¡Archivo descargado!", "El archivo se ha descargado con éxito en la carpeta Download", null);
                    }); })
                        .catch(function (err) { return _this.alertaService.alertaBasica("", "error : " + JSON.stringify(err), null); });
                    loading.dismiss();
                }, function (error) {
                    loading.dismiss();
                    console.log(error);
                    _this.alertaService.errorAlert(_this.restService.headerError, _this.restService.mensajeError, null);
                });
            }
        }, function (error) {
            loading.dismiss();
            console.log(error);
            _this.alertaService.errorAlert(_this.restService.headerError, _this.restService.mensajeError, null);
        });
    };
    FacturacionService.prototype.sendCorreo = function (idFactura, idEstacion, email) {
        var _this = this;
        var loading = this.loadingCtrl.create();
        loading.present();
        this.restService.getToken().timeout(this.restService.timeOver).subscribe(function (data) {
            if (data == null) {
                loading.dismiss();
                _this.alertaService.warnAlert(_this.restService.headerValidacion, _this.restService.mensajeValidacionAdmin, null);
            }
            else {
                var url = "invoice/web/email";
                var body = new __WEBPACK_IMPORTED_MODULE_6__angular_common_http__["d" /* HttpParams */]()
                    .set('IdFactura', idFactura)
                    .set('IdEstacion', idEstacion)
                    .set('Email', email);
                console.log(JSON.stringify(body));
                _this.restService.restServicePOSTTokenXForm(url, body, data.toString()).timeout(_this.restService.timeOver).subscribe(function (dataRegistro) {
                    if (dataRegistro['Status'] == 1) {
                        _this.alertaService.alertaBasica("¡Bien!", "Tu factura ha sido enviada a tu correo, favor de revisarlo", null);
                    }
                    else if (dataRegistro['Message'] != 3) {
                        _this.alertaService.warnAlert(_this.restService.headerValidacion, dataRegistro['Message'], null);
                    }
                    else {
                        _this.alertaService.warnAlert(_this.restService.headerValidacion, "No se encontraron registros de facturación", null);
                    }
                    loading.dismiss();
                }, function (error) {
                    loading.dismiss();
                    console.log(error);
                    _this.alertaService.errorAlert(_this.restService.headerError, _this.restService.mensajeError, null);
                });
            }
        }, function (error) {
            loading.dismiss();
            console.log(error);
            _this.alertaService.errorAlert(_this.restService.headerError, _this.restService.mensajeError, null);
        });
    };
    FacturacionService.prototype.mostrarEnvio = function (idFactura, idEstacion, email) {
        var _this = this;
        var prompt = this.alertCtrl.create({
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
                    handler: function (data) {
                        email = data.email;
                        _this.sendCorreo(idFactura, idEstacion, email);
                    }
                }
            ]
        });
        prompt.present();
    };
    FacturacionService.prototype.openFactura = function (idFactura, idEstacion) {
        var _this = this;
        var fileTransfer = this.transfer.create();
        var loading = this.loadingCtrl.create();
        loading.present();
        fileTransfer.download('http://toc.proceedings.com/39057webtoc.pdf', this.file.externalDataDirectory + 'factura.pdf').then(function (entry) {
            //this.alertaService.alertaBasica(this.restService.headerExito, "Se ha descargado correctamente en: " + entry.toURL(), null);
            _this.fileOpener.open(_this.file.externalDataDirectory + 'factura.pdf', 'application/pdf')
                .then(function () { return console.log("Abrio correctament"); } /*this.alertaService.alertaBasica(this.restService.headerExito, "Se abrio correctamente", null)*/)
                .catch(function (e) { return _this.alertaService.errorAlert(_this.restService.headerError, "No se pudo abrir, no existe aplicación compatible " + e, null); });
        }, function (error) {
            _this.alertaService.errorAlert(_this.restService.headerError, "ERROR descarga = " + JSON.stringify(error), null);
        });
        loading.dismiss();
    };
    FacturacionService = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["A" /* Injectable */])(),
        __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* LoadingController */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* LoadingController */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["b" /* AlertController */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["b" /* AlertController */]) === "function" && _b || Object, typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_3__ionic_native_file_transfer__["a" /* FileTransfer */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_3__ionic_native_file_transfer__["a" /* FileTransfer */]) === "function" && _c || Object, typeof (_d = typeof __WEBPACK_IMPORTED_MODULE_7__ionic_native_file__["a" /* File */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_7__ionic_native_file__["a" /* File */]) === "function" && _d || Object, typeof (_e = typeof __WEBPACK_IMPORTED_MODULE_2__ionic_native_file_opener__["a" /* FileOpener */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__ionic_native_file_opener__["a" /* FileOpener */]) === "function" && _e || Object, typeof (_f = typeof __WEBPACK_IMPORTED_MODULE_4__providers_rest_service__["a" /* RestServiceProvider */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_4__providers_rest_service__["a" /* RestServiceProvider */]) === "function" && _f || Object, typeof (_g = typeof __WEBPACK_IMPORTED_MODULE_5__providers_alerta_service__["a" /* AlertaServiceProvider */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_5__providers_alerta_service__["a" /* AlertaServiceProvider */]) === "function" && _g || Object])
    ], FacturacionService);
    return FacturacionService;
    var _a, _b, _c, _d, _e, _f, _g;
}());

//# sourceMappingURL=facturacion.service.js.map

/***/ }),

/***/ 149:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AgregaAutoPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_rest_service__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__providers_alerta_service__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__angular_common_http__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__ionic_storage__ = __webpack_require__(15);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__models_vehiculoModel__ = __webpack_require__(151);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__angular_forms__ = __webpack_require__(20);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8_validator__ = __webpack_require__(52);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8_validator___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_8_validator__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__services_notificaciones_service__ = __webpack_require__(17);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__services_abrirnotificaciones_service__ = __webpack_require__(18);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};











var AgregaAutoPage = /** @class */ (function () {
    function AgregaAutoPage(navCtrl, navParams, viewCtrl, restService, alertaService, modalController, localStorage, notificacion, mostrarNotif) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.viewCtrl = viewCtrl;
        this.restService = restService;
        this.alertaService = alertaService;
        this.modalController = modalController;
        this.localStorage = localStorage;
        this.notificacion = notificacion;
        this.mostrarNotif = mostrarNotif;
        this.loginForm = new __WEBPACK_IMPORTED_MODULE_7__angular_forms__["b" /* FormGroup */]({
            //alias: new FormControl(''),
            marca: new __WEBPACK_IMPORTED_MODULE_7__angular_forms__["a" /* FormControl */](''),
            modelo: new __WEBPACK_IMPORTED_MODULE_7__angular_forms__["a" /* FormControl */](''),
            anio: new __WEBPACK_IMPORTED_MODULE_7__angular_forms__["a" /* FormControl */](''),
            placas: new __WEBPACK_IMPORTED_MODULE_7__angular_forms__["a" /* FormControl */](''),
            km: new __WEBPACK_IMPORTED_MODULE_7__angular_forms__["a" /* FormControl */]('')
        });
        this.loginFormValidator = {
            /*alias: {
              mensaje: ''
              },*/
            marca: {
                mensaje: ''
            },
            modelo: {
                mensaje: ''
            }
        };
        this.usuario = null;
        this.usuario = navParams.get("usuario");
        if (this.usuario == null) {
            this.openSesion();
        }
        this.onValueChanges();
    }
    AgregaAutoPage.prototype.openSesion = function () {
        var _this = this;
        this.localStorage.ready().then(function () {
            _this.localStorage.get("@userSession").then(function (data) {
                if (data != null) {
                    _this.usuario = data;
                }
                else {
                    _this.alertaService.warnAlert(_this.restService.headerValidacion, "Usuario sin sesión, no se cargarán sus datos", null);
                }
            });
        });
    };
    AgregaAutoPage.prototype.ionViewDidLoad = function () {
        document.getElementById("editado").value = 0;
    };
    AgregaAutoPage.prototype.cancelar = function () {
        this.viewCtrl.dismiss();
    };
    AgregaAutoPage.prototype.validarFaltantes = function () {
        /*if (validator.isEmpty(this.loginForm.value.alias)) {
          this.loginFormValidator.alias.mensaje = 'Es necesario capturar el Alias';
          this.cambiarDiseñoInput("alias",1);
          return false;
          } else {
          this.loginFormValidator.alias.mensaje = '';
          this.cambiarDiseñoInput("alias");
        }*/
        if (__WEBPACK_IMPORTED_MODULE_8_validator___default.a.isEmpty(this.loginForm.value.marca)) {
            this.loginFormValidator.marca.mensaje = 'Es necesario capturar la Marca';
            this.cambiarDiseñoInput("marca", 1);
            return false;
        }
        else {
            this.loginFormValidator.marca.mensaje = '';
            this.cambiarDiseñoInput("marca");
        }
        if (__WEBPACK_IMPORTED_MODULE_8_validator___default.a.isEmpty(this.loginForm.value.modelo)) {
            this.loginFormValidator.modelo.mensaje = 'Es necesario capturar el Modelo';
            this.cambiarDiseñoInput("modelo", 1);
            return false;
        }
        else {
            this.loginFormValidator.modelo.mensaje = '';
            this.cambiarDiseñoInput("modelo");
        }
        return true;
    };
    AgregaAutoPage.prototype.registrar = function () {
        console.log(this.usuario.LlaveroContado);
        if (this.validarFaltantes())
            this.agregar();
    };
    AgregaAutoPage.prototype.agregar = function () {
        var _this = this;
        this.restService.getToken().timeout(this.restService.timeOver).subscribe(function (data) {
            var bodys = new __WEBPACK_IMPORTED_MODULE_4__angular_common_http__["d" /* HttpParams */]()
                .set('Marca', _this.loginForm.value.marca)
                .set('Modelo', _this.loginForm.value.modelo)
                .set('Anio', _this.loginForm.value.anio)
                .set('Placa', _this.loginForm.value.placas)
                .set('Kilometraje', _this.loginForm.value.km)
                .set('IdUser', _this.usuario.Id)
                .set('Codcli', _this.usuario.LlaveroContado);
            _this.restService.restServicePOSTTokenXForm("vehicle/regular", bodys, data.toString()).timeout(_this.restService.timeOver).subscribe(function (dataRegistro) {
                var dato = dataRegistro['Response'];
                if (dato.Id != undefined && dato.Id != null) {
                    document.getElementById("editado").value = 0;
                    var vehiculo = new __WEBPACK_IMPORTED_MODULE_6__models_vehiculoModel__["a" /* VehiculoModel */]();
                    vehiculo.Modelo = _this.loginForm.value.modelo;
                    vehiculo.Placa = _this.loginForm.value.placas;
                    vehiculo.id = dato.Id;
                    var use = _this.usuario;
                    _this.alertaService.alertaBasica("¡Bien!", _this.usuario.LlaveroContado > 0 ? "Tu auto ha sido agregado exitosamente." : "Tu llavero ha sido generado exitosamente.", null);
                    _this.localStorage.ready().then(function () {
                        _this.localStorage.get("@userSession").then(function (data2) {
                            data2.LlaveroContado = dato.Id;
                            _this.localStorage.set("@userSession", data2);
                            _this.usuario = data2;
                        });
                    });
                    _this.viewCtrl.dismiss();
                }
                else {
                    _this.alertaService.warnAlert("¡Atención!", "Posiblemente ya has agregado tu auto, si no, contacta al administrador", null);
                }
            }, function (error) {
                console.log(error);
                _this.alertaService.errorAlert(_this.restService.headerError, _this.restService.mensajeError, null);
            });
        }, function (error) {
            console.log(error);
            _this.alertaService.errorAlert(_this.restService.headerError, _this.restService.mensajeError, null);
        });
    };
    AgregaAutoPage.prototype.cambiarDiseñoInput = function (id, color) {
        if (color === void 0) { color = 0; }
        var strColor = color == 1 ? "red" : "white";
        document.getElementById(id).style.backgroundColor = strColor;
    };
    AgregaAutoPage.prototype.onValueChanges = function () {
        this.loginForm.valueChanges.subscribe(function (val) {
            document.getElementById("editado").value++;
        });
    };
    AgregaAutoPage.prototype.ionViewCanLeave = function () {
        var _this = this;
        console.log(document.getElementById("editado").value);
        return new Promise(function (resolve, reject) {
            if (document.getElementById("editado").value == 0)
                resolve();
            else
                _this.alertaService.alertaConfirmacion("Confirmar", "¿Desea salir sin guardar los cambios realizados?", resolve, reject);
        });
    };
    AgregaAutoPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-agrega-auto',template:/*ion-inline-start:"C:\Users\Administrador\kenergy\src\pages\agrega-auto\agrega-auto.html"*/'<ion-header>\n  <ion-navbar color="titulo">\n    <button ion-button menuToggle>\n      <ion-icon name="menu"></ion-icon>\n    </button>\n    \n    <ion-title class="tituloHeader" style="position: absolute;left: 25%; top: 33%;">Agregar Auto</ion-title>\n\n    <ion-buttons left  class="animated fadeIn">\n      <button icon-only="" ion-button="" class="disable-hover bar-button bar-button-ios bar-button-default bar-button-default-ios">\n        <span class="button-inner">\n          <img src="assets/imgs/miAuto/carro.png" style="width: 65%;margin-left: -27px;">\n        </span>\n        <div class="button-effect">\n\n        </div>\n      </button>\n    </ion-buttons>\n  </ion-navbar>\n</ion-header>\n\n<ion-content padding style="\nbackground-image: url(assets/imgs/fondo.jpg); \nbackground-size: 100%;\nbackground-position: bottom center;\nbackground-repeat: no-repeat;\nbackground-color: white;">\n  <div style="width:100%;margin-bottom: 5%" class="animated fadeInDown">\n    <div class="tituloHeader" style="width:70%;display:inline-block;font-size: 150%">Registra tu Auto</div>\n  </div>\n  <form [formGroup]="loginForm">\n    <input type="hidden" id="editado"/>\n    <!--<ion-label position="floating" style="color:#181560;">Alias del auto*</ion-label>\n    <ion-input formControlName="alias" style="color: #000;" autocapitalize="off" autocomplete="off" autocorrect="off" id="alias"></ion-input>\n\n    <ion-item *ngIf="loginFormValidator.alias.mensaje">\n      <ion-label text-wrap color="danger">\n      {{ loginFormValidator.alias.mensaje }}\n      </ion-label>\n    </ion-item>-->\n\n    <ion-label position="floating" style="color:#181560;">Marca*</ion-label>\n    <ion-input formControlName="marca" style="color: #000;" autocapitalize="off" autocomplete="off" autocorrect="off" id="marca"></ion-input>\n\n    <ion-item *ngIf="loginFormValidator.marca.mensaje">\n      <ion-label text-wrap color="danger">\n      {{ loginFormValidator.marca.mensaje }}\n      </ion-label>\n    </ion-item>\n\n    <ion-label position="floating" style="color:#181560;">Modelo*</ion-label>\n    <ion-input formControlName="modelo" style="color: #000;" autocapitalize="off" autocomplete="off" autocorrect="off" id="modelo"></ion-input>\n\n    <ion-item *ngIf="loginFormValidator.modelo.mensaje">\n      <ion-label text-wrap color="danger">\n      {{ loginFormValidator.modelo.mensaje }}\n      </ion-label>\n    </ion-item>\n\n    <ion-label position="floating" style="color:#181560;">Año</ion-label>\n    <ion-input formControlName="anio" type="number" style="color: #000;" autocapitalize="off" autocomplete="off" autocorrect="off" id="anio"></ion-input>\n\n    <ion-label position="floating" style="color:#181560;">Placas</ion-label>\n    <ion-input formControlName="placas" style="color: #000;" autocapitalize="off" autocomplete="off" autocorrect="off" id="placas"></ion-input>\n\n    <ion-label position="floating" style="color:#181560;">Kilometraje</ion-label>\n    <ion-input formControlName="km" type="number" style="color: #000;" autocapitalize="off" autocomplete="off" autocorrect="off" id="km"></ion-input>\n    \n    <div class="centro">\n      <button ion-button color="naranja" class="tituloHeader botonGuardar" (click)="registrar()">Guardar</button>\n    </div>\n  </form>\n</ion-content>\n<ion-fab top right class="animated swing">\n  <button ion-fab color="light" (click)="mostrarNotif.abrirNotificacion()">\n      <img src="assets/imgs/home/gas-station.png" alt="logo" class="claseImg animated fadeIn" />\n  </button>\n  <button *ngIf="notificacion.num > 0" ion-fab color="light" (click)="mostrarNotif.abrirNotificacion()" class="miniBoton">\n    {{notificacion.num}}\n</button>\n</ion-fab>'/*ion-inline-end:"C:\Users\Administrador\kenergy\src\pages\agrega-auto\agrega-auto.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["m" /* NavParams */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["p" /* ViewController */],
            __WEBPACK_IMPORTED_MODULE_2__providers_rest_service__["a" /* RestServiceProvider */],
            __WEBPACK_IMPORTED_MODULE_3__providers_alerta_service__["a" /* AlertaServiceProvider */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* ModalController */],
            __WEBPACK_IMPORTED_MODULE_5__ionic_storage__["b" /* Storage */], __WEBPACK_IMPORTED_MODULE_9__services_notificaciones_service__["a" /* NotificacionService */],
            __WEBPACK_IMPORTED_MODULE_10__services_abrirnotificaciones_service__["a" /* AbrirnotificacionesService */]])
    ], AgregaAutoPage);
    return AgregaAutoPage;
}());

//# sourceMappingURL=agrega-auto.js.map

/***/ }),

/***/ 151:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return VehiculoModel; });
var VehiculoModel = /** @class */ (function () {
    function VehiculoModel(selected, Placa, circula, //por default circula
        Modelo, tipoGasolina, tipo, 
        //De la pantalla de mi auto
        km, id, Id, Puntos, Alias, Marca, Anio, estado, Rendimiento, Kilometraje, ultimaFechaVerificacion, proximaFechaVerificacion, agencia, telefono, 
        //Datos del seguro
        companiaSeguro, poliza, fechaVencimiento, montoPoliza, telefonoSeguro, 
        //alertas y recordatorios
        verificacion, vencimiento, mantenimiento, mantenimientoRango, pagoTenencia, hoyNoCircula, descripcion, seleccionado, Den, NumVeh) {
        if (selected === void 0) { selected = false; }
        if (Placa === void 0) { Placa = ""; }
        if (circula === void 0) { circula = 1; }
        if (Modelo === void 0) { Modelo = ""; }
        if (tipoGasolina === void 0) { tipoGasolina = 1; }
        if (tipo === void 0) { tipo = 0; }
        if (km === void 0) { km = 999999; }
        if (id === void 0) { id = 0; }
        if (Id === void 0) { Id = 0; }
        if (Puntos === void 0) { Puntos = 15430; }
        if (Alias === void 0) { Alias = ""; }
        if (Marca === void 0) { Marca = ""; }
        if (Anio === void 0) { Anio = null; }
        if (estado === void 0) { estado = ""; }
        if (Rendimiento === void 0) { Rendimiento = null; }
        if (Kilometraje === void 0) { Kilometraje = null; }
        if (ultimaFechaVerificacion === void 0) { ultimaFechaVerificacion = new Date(); }
        if (proximaFechaVerificacion === void 0) { proximaFechaVerificacion = new Date(); }
        if (agencia === void 0) { agencia = ""; }
        if (telefono === void 0) { telefono = ""; }
        if (companiaSeguro === void 0) { companiaSeguro = ""; }
        if (poliza === void 0) { poliza = ""; }
        if (fechaVencimiento === void 0) { fechaVencimiento = new Date(); }
        if (montoPoliza === void 0) { montoPoliza = null; }
        if (telefonoSeguro === void 0) { telefonoSeguro = ""; }
        if (verificacion === void 0) { verificacion = false; }
        if (vencimiento === void 0) { vencimiento = false; }
        if (mantenimiento === void 0) { mantenimiento = false; }
        if (mantenimientoRango === void 0) { mantenimientoRango = false; }
        if (pagoTenencia === void 0) { pagoTenencia = false; }
        if (hoyNoCircula === void 0) { hoyNoCircula = false; }
        if (descripcion === void 0) { descripcion = ""; }
        if (seleccionado === void 0) { seleccionado = false; }
        if (Den === void 0) { Den = ""; }
        if (NumVeh === void 0) { NumVeh = 0; }
        this.selected = selected;
        this.Placa = Placa;
        this.circula = circula;
        this.Modelo = Modelo;
        this.tipoGasolina = tipoGasolina;
        this.tipo = tipo;
        this.km = km;
        this.id = id;
        this.Id = Id;
        this.Puntos = Puntos;
        this.Alias = Alias;
        this.Marca = Marca;
        this.Anio = Anio;
        this.estado = estado;
        this.Rendimiento = Rendimiento;
        this.Kilometraje = Kilometraje;
        this.ultimaFechaVerificacion = ultimaFechaVerificacion;
        this.proximaFechaVerificacion = proximaFechaVerificacion;
        this.agencia = agencia;
        this.telefono = telefono;
        this.companiaSeguro = companiaSeguro;
        this.poliza = poliza;
        this.fechaVencimiento = fechaVencimiento;
        this.montoPoliza = montoPoliza;
        this.telefonoSeguro = telefonoSeguro;
        this.verificacion = verificacion;
        this.vencimiento = vencimiento;
        this.mantenimiento = mantenimiento;
        this.mantenimientoRango = mantenimientoRango;
        this.pagoTenencia = pagoTenencia;
        this.hoyNoCircula = hoyNoCircula;
        this.descripcion = descripcion;
        this.seleccionado = seleccionado;
        this.Den = Den;
        this.NumVeh = NumVeh;
    }
    return VehiculoModel;
}());

//# sourceMappingURL=vehiculoModel.js.map

/***/ }),

/***/ 155:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return CambiarContraPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_forms__ = __webpack_require__(20);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__providers_alerta_service__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__providers_rest_service__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__angular_common_http__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_validator__ = __webpack_require__(52);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_validator___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_6_validator__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__services_abrirnotificaciones_service__ = __webpack_require__(18);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__services_notificaciones_service__ = __webpack_require__(17);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__ionic_native_sqlite__ = __webpack_require__(43);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__login_login__ = __webpack_require__(81);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__ionic_storage__ = __webpack_require__(15);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};












/**
 * Generated class for the CambiarContraPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var CambiarContraPage = /** @class */ (function () {
    function CambiarContraPage(navCtrl, navParams, alertaService, restService, viewCtrl, notificacion, mostrarNotif, sqlite, menuCtrl, localStorage) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.alertaService = alertaService;
        this.restService = restService;
        this.viewCtrl = viewCtrl;
        this.notificacion = notificacion;
        this.mostrarNotif = mostrarNotif;
        this.sqlite = sqlite;
        this.menuCtrl = menuCtrl;
        this.localStorage = localStorage;
        this.usuario = null;
        this.idUsuario = 0;
        this.loginForm = new __WEBPACK_IMPORTED_MODULE_2__angular_forms__["b" /* FormGroup */]({
            canterior: new __WEBPACK_IMPORTED_MODULE_2__angular_forms__["a" /* FormControl */](''),
            cnueva: new __WEBPACK_IMPORTED_MODULE_2__angular_forms__["a" /* FormControl */](''),
            cnuevac: new __WEBPACK_IMPORTED_MODULE_2__angular_forms__["a" /* FormControl */]('')
        });
        this.loginForm2 = new __WEBPACK_IMPORTED_MODULE_2__angular_forms__["b" /* FormGroup */]({
            editado: new __WEBPACK_IMPORTED_MODULE_2__angular_forms__["a" /* FormControl */](0)
        });
        this.loginFormValidator = {
            canterior: {
                mensaje: ''
            },
            cnueva: {
                mensaje: ''
            },
            cnuevac: {
                mensaje: ''
            }
        };
        this.usuario = navParams.get("usuario");
        this.idUsuario = navParams.get("idUsuario") == undefined ? 0 : navParams.get("idUsuario");
        alertaService.alertaBasica("", "" + this.idUsuario, null);
    }
    CambiarContraPage.prototype.ionViewDidEnter = function () {
        this.onValueChanges();
    };
    CambiarContraPage.prototype.ionViewCanLeave = function () {
        var _this = this;
        return new Promise(function (resolve, reject) {
            if (_this.loginForm2.value.editado == 0)
                resolve();
            else
                _this.alertaService.alertaConfirmacion("Confirmar", "¿Desea salir sin guardar los cambios realizados?", resolve, reject);
        });
    };
    CambiarContraPage.prototype.cambiarContra = function () {
        var _this = this;
        if (this.formValidator()) {
            this.restService.getToken().timeout(this.restService.timeOver).subscribe(function (data) {
                var bodys = new __WEBPACK_IMPORTED_MODULE_5__angular_common_http__["d" /* HttpParams */]()
                    .set('Id', _this.idUsuario > 0 ? _this.idUsuario : _this.usuario.Id)
                    .set('Password', _this.loginForm.value.cnueva);
                _this.restService.restServicePOSTTokenXForm("user/changepass", bodys, data.toString()).timeout(_this.restService.timeOver).subscribe(function (dataRegistro) {
                    if (dataRegistro == true) {
                        _this.alertaService.alertaBasica("¡Bien!", "Tu contraseña se ha cambiado con éxito", null);
                        _this.loginForm2.patchValue({
                            editado: 0
                        });
                        _this.close();
                    }
                    else {
                        _this.alertaService.warnAlert("¡Atención!", "Ocurrió un error inesperado, contacta al administrador", null);
                    }
                }, function (error) {
                    console.log(error);
                    _this.alertaService.errorAlert(_this.restService.headerError, _this.restService.mensajeError, null);
                });
            }, function (error) {
                console.log(error);
                _this.alertaService.errorAlert(_this.restService.headerError, _this.restService.mensajeError, null);
            });
        }
    };
    CambiarContraPage.prototype.formValidator = function () {
        if (this.idUsuario == 0) {
            if (__WEBPACK_IMPORTED_MODULE_6_validator___default.a.isEmpty(this.loginForm.value.canterior)) {
                this.loginFormValidator.canterior.mensaje = 'Es necesario capturar la Contraseña Anterior';
                this.cambiarDiseñoInput("canterior", 1);
                return false;
            }
            else {
                this.loginFormValidator.canterior.mensaje = '';
                this.cambiarDiseñoInput("canterior");
            }
            if (this.loginForm.value.canterior != this.usuario.Password) {
                this.loginFormValidator.canterior.mensaje = 'La contraseña anterior capturada es incorrecta';
                this.cambiarDiseñoInput("canterior", 1);
                return false;
            }
            else {
                this.loginFormValidator.canterior.mensaje = '';
                this.cambiarDiseñoInput("canterior");
            }
        }
        if (__WEBPACK_IMPORTED_MODULE_6_validator___default.a.isEmpty(this.loginForm.value.cnueva)) {
            this.loginFormValidator.cnueva.mensaje = 'Es necesario capturar la Contraseña nueva';
            this.cambiarDiseñoInput("cnueva", 1);
            return false;
        }
        else {
            this.loginFormValidator.cnueva.mensaje = '';
            this.cambiarDiseñoInput("cnueva");
        }
        if (__WEBPACK_IMPORTED_MODULE_6_validator___default.a.isEmpty(this.loginForm.value.cnuevac)) {
            this.loginFormValidator.cnuevac.mensaje = 'Es necesario confirmar la Contraseña nueva';
            this.cambiarDiseñoInput("cnuevac", 1);
            return false;
        }
        else {
            this.loginFormValidator.cnuevac.mensaje = '';
            this.cambiarDiseñoInput("cnuevac");
        }
        if (this.loginForm.value.cnuevac != this.loginForm.value.cnueva) {
            this.loginFormValidator.cnuevac.mensaje = 'La confirmación de contraseña no coincide';
            this.cambiarDiseñoInput("cnuevac", 1);
            return false;
        }
        else {
            this.loginFormValidator.cnuevac.mensaje = '';
            this.cambiarDiseñoInput("cnuevac");
        }
        return true;
    };
    CambiarContraPage.prototype.cambiarDiseñoInput = function (id, color) {
        if (color === void 0) { color = 0; }
        var strColor = color == 1 ? "red" : "white";
        document.getElementById(id).style.backgroundColor = strColor;
    };
    CambiarContraPage.prototype.onValueChanges = function () {
        var _this = this;
        this.loginForm.valueChanges.subscribe(function (val) {
            _this.loginForm2.patchValue({
                editado: _this.loginForm2.value.editado + 1
            });
        });
    };
    CambiarContraPage.prototype.dismiss = function () {
        this.viewCtrl.dismiss();
    };
    CambiarContraPage.prototype.close = function () {
        var _this = this;
        this.localStorage.ready().then(function () {
            var sqlDelete = "DELETE FROM usuario";
            _this.sqlite.create({
                name: 'kenergy.db',
                location: 'default'
            }).then(function (db) {
                db.executeSql(sqlDelete, [])
                    .then(function (response) {
                    _this.localStorage.set("@isSessionActive", 0);
                    _this.menuCtrl.close();
                    _this.menuCtrl.enable(false, "authenticated");
                    _this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_10__login_login__["a" /* LoginPage */]);
                })
                    .catch(function (error) { return _this.alertaService.errorAlert("Error al borrar usuario", error, null); });
            })
                .catch(function (error) {
                _this.alertaService.errorAlert("Info", "Excepcion al crear BD " + error, null);
            });
        }, function (error) {
            console.log(error); //En modo debug visualizar error completo
            _this.alertaService.errorAlert(_this.restService.headerError, error.message, null);
        });
    };
    CambiarContraPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-cambiar-contra',template:/*ion-inline-start:"C:\Users\Administrador\kenergy\src\pages\cambiar-contra\cambiar-contra.html"*/'<ion-header>\n  <ion-navbar color="titulo">\n    <button ion-button menuToggle>\n      <ion-icon name="menu"></ion-icon>\n    </button>\n    \n    <ion-title class="tituloHeader" style="position: absolute;left: 25%; top: 33%;">Cambiar contraseña</ion-title>\n\n    <ion-buttons left  class="animated fadeIn">\n      <button icon-only="" ion-button="" class="disable-hover bar-button bar-button-ios bar-button-default bar-button-default-ios">\n        <span class="button-inner">\n          <img src="assets/imgs/misDatos/usuario.png" style="width: 65%;margin-left: -27px;">\n        </span>\n        <div class="button-effect">\n\n        </div>\n      </button>\n    </ion-buttons>\n  </ion-navbar>\n</ion-header>\n\n<ion-content padding style="\nbackground-image: url(assets/imgs/fondo.jpg); \nbackground-size: 100%;\nbackground-position: center center;">\n  <form [formGroup]="loginForm">\n    <ng-container *ngIf="idUsuario == 0">\n    <ion-label style="color:#1b155c;">Contraseña actual*</ion-label>\n    <ion-input formControlName="canterior" type="password" style="color: #000;" id="canterior"></ion-input>\n  <ion-item *ngIf="loginFormValidator.canterior.mensaje">\n    <ion-label text-wrap color="danger">\n    {{ loginFormValidator.canterior.mensaje }}\n    </ion-label>\n  </ion-item>\n  </ng-container>\n    <ion-label style="color:#1b155c;">Contraseña nueva*</ion-label>\n    <ion-input formControlName="cnueva" type="password" style="color: #000;" id="cnueva"></ion-input>\n  <ion-item *ngIf="loginFormValidator.cnueva.mensaje">\n    <ion-label text-wrap color="danger">\n    {{ loginFormValidator.cnueva.mensaje }}\n    </ion-label>\n  </ion-item>\n    <ion-label style="color:#1b155c;">Confirmar contraseña nueva*</ion-label>\n    <ion-input formControlName="cnuevac" type="password" style="color: #000;" id="cnuevac"></ion-input>\n  <ion-item *ngIf="loginFormValidator.cnuevac.mensaje">\n    <ion-label text-wrap color="danger">\n    {{ loginFormValidator.cnuevac.mensaje }}\n    </ion-label>\n  </ion-item>\n  <div class="centro animated fadeIn">\n    <div style="display: inline-block;width: 44%" class="animated fadeIn">\n      <button ion-button color="naranja" class="tituloHeader botonGuardar" (click)="cambiarContra()">Aceptar</button>\n    </div>\n  </div>\n</form>\n</ion-content>\n<ion-fab top right class="animated swing">\n  <button ion-fab color="light" (click)="mostrarNotif.abrirNotificacion()">\n      <img src="assets/imgs/home/gas-station.png" alt="logo" class="claseImg animated fadeIn" />\n  </button>\n  <button *ngIf="notificacion.num > 0" ion-fab color="light" (click)="mostrarNotif.abrirNotificacion()" class="miniBoton">\n    {{notificacion.num}}\n</button>\n</ion-fab>'/*ion-inline-end:"C:\Users\Administrador\kenergy\src\pages\cambiar-contra\cambiar-contra.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["m" /* NavParams */], __WEBPACK_IMPORTED_MODULE_3__providers_alerta_service__["a" /* AlertaServiceProvider */],
            __WEBPACK_IMPORTED_MODULE_4__providers_rest_service__["a" /* RestServiceProvider */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["p" /* ViewController */],
            __WEBPACK_IMPORTED_MODULE_8__services_notificaciones_service__["a" /* NotificacionService */], __WEBPACK_IMPORTED_MODULE_7__services_abrirnotificaciones_service__["a" /* AbrirnotificacionesService */],
            __WEBPACK_IMPORTED_MODULE_9__ionic_native_sqlite__["a" /* SQLite */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* MenuController */], __WEBPACK_IMPORTED_MODULE_11__ionic_storage__["b" /* Storage */]])
    ], CambiarContraPage);
    return CambiarContraPage;
}());

//# sourceMappingURL=cambiar-contra.js.map

/***/ }),

/***/ 156:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MenuProvider; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__rest_service__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_common_http__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__alerta_service__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__models_MenuModel__ = __webpack_require__(664);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__pages_contacto_contacto__ = __webpack_require__(295);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__pages_premios_premios__ = __webpack_require__(297);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__pages_promociones_promociones__ = __webpack_require__(298);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__pages_facturacion_facturacion__ = __webpack_require__(300);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__pages_cargas_cargas__ = __webpack_require__(301);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__pages_estaciones_estaciones__ = __webpack_require__(304);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__pages_mis_datos_mis_datos__ = __webpack_require__(160);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__pages_mi_auto_info_mi_auto_info__ = __webpack_require__(307);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14__pages_mis_datos_credito_mis_datos_credito__ = __webpack_require__(311);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_15__pages_estado_cuenta_estado_cuenta__ = __webpack_require__(312);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_16__pages_vehiculos_credito_vehiculos_credito__ = __webpack_require__(313);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_17__pages_facturacion_credito_facturacion_credito__ = __webpack_require__(315);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_18__pages_estadisticas_credito_estadisticas_credito__ = __webpack_require__(316);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_19__pages_cargas_credito_cargas_credito__ = __webpack_require__(318);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_20__ionic_storage__ = __webpack_require__(15);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_21__pages_estadisticas_estadisticas__ = __webpack_require__(320);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_22__services_usuario_service__ = __webpack_require__(59);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_23__pages_home_home__ = __webpack_require__(65);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_24__pages_home_credito_home_credito__ = __webpack_require__(84);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

























var MenuProvider = /** @class */ (function () {
    function MenuProvider(localStorage, loadingCtrl, restService, alertaService, usuarioService) {
        this.localStorage = localStorage;
        this.loadingCtrl = loadingCtrl;
        this.restService = restService;
        this.alertaService = alertaService;
        this.usuarioService = usuarioService;
        this.pages = [];
        this.usuario = null;
        this.openSesion();
    }
    MenuProvider.prototype.openSesion = function () {
        var _this = this;
        this.localStorage.ready().then(function () {
            _this.localStorage.get("@userSession").then(function (data) {
                if (data != null) {
                    _this.usuario = data;
                }
                else {
                    //this.alertaService.warnAlert(this.restService.headerValidacion, "Usuario sin sesión, no se cargarán sus datos", null);
                }
            });
        });
    };
    MenuProvider.prototype.returnMenuByType = function (userType, usuario) {
        var _this = this;
        if (userType === void 0) { userType = 1; }
        this.pages = [];
        this.usuario = userType.user;
        var a = userType.valor;
        this.usuarioService.tipo = a;
        console.log(this.usuarioService.tipo);
        if (a == 1) {
            var loading_1 = this.loadingCtrl.create();
            loading_1.present();
            this.restService.getToken().timeout(this.restService.timeOver).subscribe(function (data) {
                loading_1.dismiss();
                if (data == null) {
                    _this.alertaService.warnAlert(_this.restService.headerValidacion, _this.restService.mensajeValidacionAdmin, null);
                }
                else {
                    var body = new __WEBPACK_IMPORTED_MODULE_3__angular_common_http__["d" /* HttpParams */]();
                    _this.restService.restServiceGETToken("user/regular/" + _this.usuario.Id, body, data.toString()).timeout(_this.restService.timeOver).subscribe(function (dataRegistroLast) {
                        var ptos = dataRegistroLast['Response'].Puntos;
                        var armaUrl = "vehicle/regular/" + _this.usuario.Id;
                        _this.restService.getToken().timeout(_this.restService.timeOver).subscribe(function (data) {
                            _this.restService.restServiceGETToken(armaUrl, new __WEBPACK_IMPORTED_MODULE_3__angular_common_http__["d" /* HttpParams */](), data.toString()).timeout(_this.restService.timeOver).subscribe(function (dataAutos) {
                                var totalAutos = 0;
                                if (dataAutos['Response'] != null && dataAutos['Response'] instanceof Array) {
                                    var array = dataAutos['Response'];
                                    totalAutos = array.length;
                                }
                                loading_1.dismiss();
                                _this.pages.push(new __WEBPACK_IMPORTED_MODULE_5__models_MenuModel__["a" /* MenuModel */]("Inicio", "iconos/home.png", "#123", __WEBPACK_IMPORTED_MODULE_23__pages_home_home__["a" /* HomePage */]));
                                _this.pages.push(new __WEBPACK_IMPORTED_MODULE_5__models_MenuModel__["a" /* MenuModel */](_this.usuario.Nombre, "misDatos/usuario.png", "#123", __WEBPACK_IMPORTED_MODULE_12__pages_mis_datos_mis_datos__["a" /* MisDatosPage */], ptos));
                                _this.pages.push(new __WEBPACK_IMPORTED_MODULE_5__models_MenuModel__["a" /* MenuModel */]("Estaciones", "estaciones/ubication.png", "#123", __WEBPACK_IMPORTED_MODULE_11__pages_estaciones_estaciones__["a" /* EstacionesPage */]));
                                _this.pages.push(new __WEBPACK_IMPORTED_MODULE_5__models_MenuModel__["a" /* MenuModel */]("Mi Auto", "miAuto/carro.png", "#123", __WEBPACK_IMPORTED_MODULE_13__pages_mi_auto_info_mi_auto_info__["a" /* MiAutoInfoPage */], "", totalAutos < 1 ? "Sin autos" : totalAutos == 1 ? "1 auto" : totalAutos + " autos"));
                                _this.pages.push(new __WEBPACK_IMPORTED_MODULE_5__models_MenuModel__["a" /* MenuModel */]("Cargas", "cargas/fuel-station.png", "#123", __WEBPACK_IMPORTED_MODULE_10__pages_cargas_cargas__["a" /* CargasPage */]));
                                _this.pages.push(new __WEBPACK_IMPORTED_MODULE_5__models_MenuModel__["a" /* MenuModel */]("Facturación", "facturacion/factura.png", "#123", __WEBPACK_IMPORTED_MODULE_9__pages_facturacion_facturacion__["a" /* FacturacionPage */]));
                                _this.pages.push(new __WEBPACK_IMPORTED_MODULE_5__models_MenuModel__["a" /* MenuModel */]("Estadísticas", "estadisticas/graph.png", "#123", __WEBPACK_IMPORTED_MODULE_21__pages_estadisticas_estadisticas__["a" /* EstadisticasPage */]));
                                _this.pages.push(new __WEBPACK_IMPORTED_MODULE_5__models_MenuModel__["a" /* MenuModel */]("Promociones", "promociones/promocion.png", "#123", __WEBPACK_IMPORTED_MODULE_8__pages_promociones_promociones__["a" /* PromocionesPage */]));
                                _this.pages.push(new __WEBPACK_IMPORTED_MODULE_5__models_MenuModel__["a" /* MenuModel */]("Premios", "premios/promo.png", "#123", __WEBPACK_IMPORTED_MODULE_7__pages_premios_premios__["a" /* PremiosPage */]));
                                _this.pages.push(new __WEBPACK_IMPORTED_MODULE_5__models_MenuModel__["a" /* MenuModel */]("Contacto", "contacto/contacto.png", "#123", __WEBPACK_IMPORTED_MODULE_6__pages_contacto_contacto__["a" /* ContactoPage */]));
                            }, function (error) {
                                loading_1.dismiss();
                                console.log(error);
                                _this.alertaService.errorAlert(_this.restService.headerError, _this.restService.mensajeError, null);
                            });
                        }, function (error) {
                            loading_1.dismiss();
                            console.log(error);
                            _this.alertaService.errorAlert(_this.restService.headerError, _this.restService.mensajeError, null);
                        });
                    }, function (error) {
                        loading_1.dismiss();
                        console.log(error);
                        _this.alertaService.errorAlert(_this.restService.headerError, _this.restService.mensajeError, null);
                    });
                }
            }, function (error) {
                loading_1.dismiss();
                console.log(error);
                _this.alertaService.errorAlert(_this.restService.headerError, _this.restService.mensajeError, null);
            });
            //api/puntos/{id usuario}
            //      this.pages.push(new MenuModel("Consulta Puntos", "facturacion/factura.png", "#123", ConsultaPuntosPage));//Nuevo
            //    this.pages.push(new MenuModel("Mis Solicitudes", "facturacion/factura.png", "#123", FacturacionPage));//Nuevo
        }
        else {
            var loading_2 = this.loadingCtrl.create();
            loading_2.present();
            this.restService.getToken().timeout(this.restService.timeOver).subscribe(function (data) {
                if (data == null) {
                    loading_2.dismiss();
                    _this.alertaService.warnAlert(_this.restService.headerValidacion, _this.restService.mensajeValidacionAdmin, null);
                }
                else {
                    if (_this.usuario != null) {
                        var body = new __WEBPACK_IMPORTED_MODULE_3__angular_common_http__["d" /* HttpParams */]();
                        //var a = 44;
                        var a = _this.usuario.IdClient;
                        body.append("IdClient", a.toString());
                        var url = "status/account/" + a.toString();
                        console.log(url);
                        _this.restService.restServiceGETToken(url, new __WEBPACK_IMPORTED_MODULE_3__angular_common_http__["d" /* HttpParams */](), data.toString()).timeout(_this.restService.timeOver).subscribe(function (dataRegistro) {
                            if (Object.keys(dataRegistro['Response']).length != 0) {
                                _this.pages.push(new __WEBPACK_IMPORTED_MODULE_5__models_MenuModel__["a" /* MenuModel */]("Inicio", "iconos/home.png", "#123", __WEBPACK_IMPORTED_MODULE_24__pages_home_credito_home_credito__["a" /* HomeCreditoPage */]));
                                _this.pages.push(new __WEBPACK_IMPORTED_MODULE_5__models_MenuModel__["a" /* MenuModel */](_this.usuario.Nombre, "misDatos/usuario.png", "#123", __WEBPACK_IMPORTED_MODULE_14__pages_mis_datos_credito_mis_datos_credito__["a" /* MisDatosCreditoPage */], "AB Pro SC", "Cred. Disp. $" + parseInt(dataRegistro['Response'].SaldoDisponible).toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')));
                                _this.pages.push(new __WEBPACK_IMPORTED_MODULE_5__models_MenuModel__["a" /* MenuModel */]("Estado de Cuenta", "edoCuenta/edoCuenta.png", "#123", __WEBPACK_IMPORTED_MODULE_15__pages_estado_cuenta_estado_cuenta__["a" /* EstadoCuentaPage */]));
                                _this.pages.push(new __WEBPACK_IMPORTED_MODULE_5__models_MenuModel__["a" /* MenuModel */]("Estaciones", "estaciones/ubication.png", "#123", __WEBPACK_IMPORTED_MODULE_11__pages_estaciones_estaciones__["a" /* EstacionesPage */]));
                                _this.pages.push(new __WEBPACK_IMPORTED_MODULE_5__models_MenuModel__["a" /* MenuModel */]("Vehículos", "miAuto/carro.png", "#123", __WEBPACK_IMPORTED_MODULE_16__pages_vehiculos_credito_vehiculos_credito__["a" /* VehiculosCreditoPage */]));
                                _this.pages.push(new __WEBPACK_IMPORTED_MODULE_5__models_MenuModel__["a" /* MenuModel */]("Facturación", "facturacion/factura.png", "#123", __WEBPACK_IMPORTED_MODULE_17__pages_facturacion_credito_facturacion_credito__["a" /* FacturacionCreditoPage */]));
                                _this.pages.push(new __WEBPACK_IMPORTED_MODULE_5__models_MenuModel__["a" /* MenuModel */]("Estadísticas", "estadisticas/graph.png", "#123", __WEBPACK_IMPORTED_MODULE_18__pages_estadisticas_credito_estadisticas_credito__["a" /* EstadisticasCreditoPage */]));
                                _this.pages.push(new __WEBPACK_IMPORTED_MODULE_5__models_MenuModel__["a" /* MenuModel */]("Cargas", "cargas/fuel-station.png", "#123", __WEBPACK_IMPORTED_MODULE_19__pages_cargas_credito_cargas_credito__["a" /* CargasCreditoPage */]));
                                _this.pages.push(new __WEBPACK_IMPORTED_MODULE_5__models_MenuModel__["a" /* MenuModel */]("Contacto", "contacto/contacto.png", "#123", __WEBPACK_IMPORTED_MODULE_6__pages_contacto_contacto__["a" /* ContactoPage */]));
                            }
                            else {
                                _this.alertaService.warnAlert(_this.restService.headerValidacion, "No se encontraron estaciones", null);
                            }
                            loading_2.dismiss();
                        }, function (error) {
                            loading_2.dismiss();
                            console.log(error);
                            _this.alertaService.errorAlert(_this.restService.headerError, _this.restService.mensajeError, null);
                        });
                    }
                    else {
                        loading_2.dismiss();
                    }
                }
            }, function (error) {
                loading_2.dismiss();
                console.log(error);
                _this.alertaService.errorAlert(_this.restService.headerError, _this.restService.mensajeError, null);
            });
        }
        return this.pages;
    };
    MenuProvider = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["A" /* Injectable */])(),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_20__ionic_storage__["b" /* Storage */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* LoadingController */],
            __WEBPACK_IMPORTED_MODULE_2__rest_service__["a" /* RestServiceProvider */],
            __WEBPACK_IMPORTED_MODULE_4__alerta_service__["a" /* AlertaServiceProvider */],
            __WEBPACK_IMPORTED_MODULE_22__services_usuario_service__["a" /* UsuarioService */]])
    ], MenuProvider);
    return MenuProvider;
}());

//# sourceMappingURL=menu-service.js.map

/***/ }),

/***/ 157:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AvisoPrivacidadPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ionic_storage__ = __webpack_require__(15);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__providers_alerta_service__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__providers_rest_service__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__services_notificaciones_service__ = __webpack_require__(17);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__services_abrirnotificaciones_service__ = __webpack_require__(18);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};







var AvisoPrivacidadPage = /** @class */ (function () {
    function AvisoPrivacidadPage(navCtrl, navParams, localStorage, alertaService, restService, loadingCtrl, notificacion, mostrarNotif) {
        //this.usuario = navParams.get("usuario");
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.localStorage = localStorage;
        this.alertaService = alertaService;
        this.restService = restService;
        this.loadingCtrl = loadingCtrl;
        this.notificacion = notificacion;
        this.mostrarNotif = mostrarNotif;
        this.usuario = null;
    }
    AvisoPrivacidadPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-aviso-privacidad',template:/*ion-inline-start:"C:\Users\Administrador\kenergy\src\pages\aviso-privacidad\aviso-privacidad.html"*/'<ion-header>\n  <ion-navbar color="titulo">\n    <button ion-button menuToggle>\n      <ion-icon name="menu"></ion-icon>\n    </button>\n    \n    <ion-title class="tituloHeader" style="position: absolute;left: 25%; top: 33%;">Aviso de privacidad</ion-title>\n\n    <ion-buttons left  class="animated fadeIn">\n      <button icon-only="" ion-button="" class="disable-hover bar-button bar-button-ios bar-button-default bar-button-default-ios">\n        <span class="button-inner">\n          <img src="assets/imgs/misDatos/usuario.png" style="width: 65%;margin-left: -27px;">\n        </span>\n        <div class="button-effect">\n\n        </div>\n      </button>\n    </ion-buttons>\n  </ion-navbar>\n</ion-header>\n\n\n\n<ion-content  padding style="\n	background-image: url(assets/imgs/fondo.jpg); \n	background-size: 100%;\n	background-position: bottom center;\n	background-repeat: no-repeat;\n	background-color: white;">\n  <div style="width:100%;margin-bottom: 10px; border-top: 10px;" class="animated fadeIn">\n    <p align="justify" style="margin-bottom: 0cm; line-height: 115%"><font face="Arial, serif">En\ncumplimiento de la Ley Federal de Protección de Datos Personales en\nPosesión de los Particulares, su reglamento, los Lineamientos del\nAviso de Privacidad publicados en el Diario Oficial de la Federación\nel 17 de enero de 2013 y demás normatividad relativa y aplicable en\nmateria de protección de datos personales en posesión de los\nparticulares, Kanz Combustibles S.A. de C.V., mejor conocido como K\nEnergy, con domicilio ubicado en Boulevard Fernando Gutierrez Barrios\n#56, Colonia Escámela de la Ciudad de Ixtaczoquitlán, C.P. 94450,\nen la Entidad Federativa de Veracruz, México, es el responsable del\nuso y protección de sus datos personales mismos que  serán tratados\ny resguardados con base en los principios de licitud, calidad,\nconsentimiento, información, finalidad, lealtad, proporcionalidad y\nresponsabilidad, establecidos en la ley y su reglamento anteriormente\ncitado, y al respecto le informamos lo siguiente:</font></p>\n<p align="justify" style="margin-bottom: 0cm; line-height: 115%"><br/>\n\n</p>\n<p align="justify" style="margin-bottom: 0cm; line-height: 115%"><font face="Arial, serif"><b>¿Para\nqué fines utilizaremos sus datos personales?</b></font></p>\n<p align="justify" style="margin-bottom: 0cm; line-height: 115%"><font face="Arial, serif">Los\ndatos personales que recabamos de usted, los utilizaremos para las\nsiguientes finalidades que son necesarias para el servicio que\nsolicita:</font></p>\n<ul>\n<p align="justify" style="margin-bottom: 0cm; line-height: 115%">\n	<font face="Arial, serif">Contacto con el cliente</font></p>\n<p align="justify" style="margin-bottom: 0cm; line-height: 115%">\n	<font face="Arial, serif">Mercadotecnia o publicidad</font></p>\n<p align="justify" style="margin-bottom: 0cm; line-height: 115%">\n	<font face="Arial, serif">Prospección comercial</font></p>\n</ul>\n<p align="justify" style="margin-bottom: 0cm; line-height: 115%"><br/>\n\n</p>\n<p align="justify" style="margin-bottom: 0cm; line-height: 115%"><font face="Arial, serif"><b>¿Qué\ndatos personales utilizaremos para estos fines?</b></font></p>\n<p align="justify" style="margin-bottom: 0cm; line-height: 115%"><font face="Arial, serif">Para\nllevar a cabo las finalidades descritas en el presente aviso de\nprivacidad, utilizaremos los siguientes datos personales y/o de sus\napoderados legales:</font></p>\n<ul>\n<p align="justify" style="margin-bottom: 0cm; line-height: 115%">\n	<font face="Arial, serif">Nombre comercial.</font></p>\n<p align="justify" style="margin-bottom: 0cm; line-height: 115%">\n	<font face="Arial, serif">Razón social.</font></p>\n<p align="justify" style="margin-bottom: 0cm; line-height: 115%">\n	<font face="Arial, serif">Nombre completo en caso de ser persona\n	física.</font></p>\n<p align="justify" style="margin-bottom: 0cm; line-height: 115%">\n	<font face="Arial, serif">RFC.</font></p>\n<p align="justify" style="margin-bottom: 0cm; line-height: 115%">\n	<font face="Arial, serif">Datos de dirección</font></p>\n	<ul>\n<p align="justify" style="margin-bottom: 0cm; line-height: 115%">\n		<font face="Arial, serif">País</font></p>\n<p align="justify" style="margin-bottom: 0cm; line-height: 115%">\n		<font face="Arial, serif">Estado</font></p>\n		 \n<p align="justify" style="margin-bottom: 0cm; line-height: 115%">\n		<font face="Arial, serif">Municipio/Delegación</font></p>\n		 \n<p align="justify" style="margin-bottom: 0cm; line-height: 115%">\n		<font face="Arial, serif">Código postal</font></p>\n		 \n<p align="justify" style="margin-bottom: 0cm; line-height: 115%">\n		<font face="Arial, serif">Ciudad</font></p>\n		 \n<p align="justify" style="margin-bottom: 0cm; line-height: 115%">\n		<font face="Arial, serif">Colonia</font></p>\n		 \n<p align="justify" style="margin-bottom: 0cm; line-height: 115%">\n		<font face="Arial, serif">Calle</font></p>\n		 \n<p align="justify" style="margin-bottom: 0cm; line-height: 115%">\n		<font face="Arial, serif">Calles </font>\n		</p>\n		 \n<p align="justify" style="margin-bottom: 0cm; line-height: 115%">\n		<font face="Arial, serif">Número interior </font>\n		</p>\n		 \n<p align="justify" style="margin-bottom: 0cm; line-height: 115%">\n		<font face="Arial, serif">Número exterior</font></p>\n	</ul>\n</ul>\n<ul>\n	 \n<p align="justify" style="margin-bottom: 0cm; line-height: 115%">\n	<font face="Arial, serif">CURP.</font></p>\n	 \n<p align="justify" style="margin-bottom: 0cm; line-height: 115%">\n	<font face="Arial, serif">Correo electrónico personal.</font></p>\n	 \n<p align="justify" style="margin-bottom: 0cm; line-height: 115%">\n	<font face="Arial, serif">Correo electrónico institucional.</font></p>\n	 \n<p align="justify" style="margin-bottom: 0cm; line-height: 115%">\n	<font face="Arial, serif">Teléfono.</font></p>\n</ul>\n<p align="justify" style="margin-bottom: 0cm; line-height: 115%"><br/>\n\n</p>\n<p align="justify" style="margin-bottom: 0cm; line-height: 115%"><font face="Arial, serif">Datos\nde vehículos</font></p>\n<ul>\n	 \n<p align="justify" style="margin-bottom: 0cm; line-height: 115%">\n	<font face="Arial, serif">Placas.</font></p>\n	 \n<p align="justify" style="margin-bottom: 0cm; line-height: 115%">\n	<font face="Arial, serif">Descripción de vehículo.</font></p>\n	 \n<p align="justify" style="margin-bottom: 0cm; line-height: 115%">\n	<font face="Arial, serif">Días de carga de combustibles.</font></p>\n	 \n<p align="justify" style="margin-bottom: 0cm; line-height: 115%">\n	<font face="Arial, serif">Horarios de carga de combustible.</font></p>\n	 \n<p align="justify" style="margin-bottom: 0cm; line-height: 115%">\n	<font face="Arial, serif">Tipo de combustibles de carga. </font>\n	</p>\n	 \n<p align="justify" style="margin-bottom: 0cm; line-height: 115%">\n	<font face="Arial, serif">Cantidad de combustibles que carga por\n	día, semana y mes, además de cantidad máxima.</font></p>\n	 \n<p align="justify" style="margin-bottom: 0cm; line-height: 115%">\n	<font face="Arial, serif">Kilometraje.</font></p>\n	 \n<p align="justify" style="margin-bottom: 0cm; line-height: 115%">\n	<font face="Arial, serif">Estación donde puede cargar combustible.</font></p>\n</ul>\n<p align="justify" style="margin-bottom: 0cm; line-height: 115%"><br/>\n\n</p>\n<p align="justify" style="margin-bottom: 0cm; line-height: 115%"><font face="Arial, serif">Vehículo</font></p>\n<ul>\n	 \n<p align="justify" style="margin-bottom: 0cm; line-height: 115%">\n	<font face="Arial, serif">Alias.</font></p>\n	 \n<p align="justify" style="margin-bottom: 0cm; line-height: 115%">\n	<font face="Arial, serif">Marca.</font></p>\n	 \n<p align="justify" style="margin-bottom: 0cm; line-height: 115%">\n	<font face="Arial, serif">N° del Auto.</font></p>\n	 \n<p align="justify" style="margin-bottom: 0cm; line-height: 115%">\n	<font face="Arial, serif">Modelo.</font></p>\n	 \n<p align="justify" style="margin-bottom: 0cm; line-height: 115%">\n	<font face="Arial, serif">Año.</font></p>\n	 \n<p align="justify" style="margin-bottom: 0cm; line-height: 115%">\n	<font face="Arial, serif">Estado.</font></p>\n	 \n<p align="justify" style="margin-bottom: 0cm; line-height: 115%">\n	<font face="Arial, serif">Rendimiento estimado.</font></p>\n	 \n<p align="justify" style="margin-bottom: 0cm; line-height: 115%">\n	<font face="Arial, serif">Última fecha de verificación.</font></p>\n	 \n<p align="justify" style="margin-bottom: 0cm; line-height: 115%">\n	<font face="Arial, serif">Próxima fecha de verificación.</font></p>\n	 \n<p align="justify" style="margin-bottom: 0cm; line-height: 115%">\n	<font face="Arial, serif">Agencia.</font></p>\n	 \n<p align="justify" style="margin-bottom: 0cm; line-height: 115%">\n	<font face="Arial, serif">Teléfono de la agencia.</font></p>\n	 \n<p align="justify" style="margin-bottom: 0cm; line-height: 115%">\n	<font face="Arial, serif">Datos de Aseguradora.</font></p>\n	<ul>\n		 \n<p align="justify" style="margin-bottom: 0cm; line-height: 115%">\n		<font face="Arial, serif">Compañía del seguro.</font></p>\n		 \n<p align="justify" style="margin-bottom: 0cm; line-height: 115%">\n		<font face="Arial, serif">N° de póliza.</font></p>\n		 \n<p align="justify" style="margin-bottom: 0cm; line-height: 115%">\n		<font face="Arial, serif">Fecha de vencimiento.</font></p>\n		 \n<p align="justify" style="margin-bottom: 0cm; line-height: 115%">\n		<font face="Arial, serif">Monto de póliza.</font></p>\n		 \n<p align="justify" style="margin-bottom: 0cm; line-height: 115%">\n		<font face="Arial, serif">Fecha de vencimiento.</font></p>\n		 \n<p align="justify" style="margin-bottom: 0cm; line-height: 115%">\n		<font face="Arial, serif">Teléfono de aseguradora.</font></p>\n	</ul>\n</ul>\n<p align="justify" style="margin-bottom: 0cm; line-height: 115%"><br/>\n\n</p>\n<p align="justify" style="margin-bottom: 0cm; line-height: 115%"><font face="Arial, serif"><b>¿Con\nquién compartimos su información personal?</b></font></p>\n<p align="justify" style="margin-bottom: 0cm; line-height: 115%"><font face="Arial, serif">Le\ninformamos que podremos transferir sus datos personales a terceros\nmexicanos o extranjeros, filiales, subsidiarias, controladoras,\nasociadas o comisionistas que le provean de servicios necesarios para\nla Administración de Recursos Humanos y Pago de Nóminas, de\nServicios de Corresponsalía Bancaria y Servicios Financieros en\nGeneral, Prestación de Servicios Profesionales en materia Fiscal,\nLaboral, Penal, de Sistemas Computacionales, de Servicios Médicos,\nde Mercadotecnia y Publicidad, requiriéndose para el caso de éstas\núltimas dos el consentimiento del titular. En caso de que el titular\nno esté de acuerdo con la transferencia de datos que requieran su\nconsentimiento podrá oponerse a dicho tratamiento a través de los\nmedios referidos en el presente aviso.</font></p>\n<p align="justify" style="margin-bottom: 0cm; line-height: 115%"><br/>\n\n</p>\n<p align="justify" style="margin-bottom: 0cm; line-height: 115%"><font face="Arial, serif"><b>¿Cómo\npuede acceder, rectificar o cancelar sus datos personales, u oponerse\na su uso?</b></font></p>\n<p align="justify" style="margin-bottom: 0cm; line-height: 115%"><font face="Arial, serif">Usted\ntiene derecho a conocer qué datos personales tenemos de usted, para\nqué los utilizamos y las condiciones del uso que les damos (Acceso).\nAsimismo, es su derecho solicitar la corrección de su información\npersonal en caso de que esté desactualizada, sea inexacta o\nincompleta (Rectificación); que la eliminemos de nuestros registros\no bases de datos cuando considere que la misma no está siendo\nutilizada adecuadamente (Cancelación); así como oponerse al uso de\nsus datos personales para fines específicos (Oposición). Estos\nderechos se conocen como derechos ARCO.</font></p>\n<p align="justify" style="margin-bottom: 0cm; line-height: 115%"><br/>\n\n</p>\n<p align="justify" style="margin-bottom: 0cm; line-height: 115%"><font face="Arial, serif">Para\nel ejercicio de cualquiera de los derechos ARCO, usted deberá\npresentar la solicitud respectiva a través del siguiente medio: </font>\n</p>\n<ul>\n	 \n<p align="justify" style="margin-bottom: 0cm; line-height: 115%">\n	<font face="Arial, serif">Llamando al número telefónico (272) 721\n	2369 o</font></p>\n	 \n<p align="justify" style="margin-bottom: 0.28cm; line-height: 108%">\n	<font face="Arial, serif">Enviar un correo electrónico a\n	<a href="mailto:quejasysugerencias@grupotabar.com">quejasysugerencias@grupotabar.com</a>\n	</font>\n	</p>\n</ul>\n<p align="justify" style="margin-bottom: 0cm; line-height: 115%"><br/>\n\n</p>\n<p align="justify" style="margin-bottom: 0cm; line-height: 115%"><font face="Arial, serif">Para\nconocer el procedimiento y requisitos para el ejercicio de los\nderechos ARCO, ponemos a su disposición el siguiente medio:</font></p>\n<ul>\n	 \n<p align="justify" style="margin-bottom: 0cm; line-height: 115%">\n	<font face="Arial, serif">Comunicarse al número telefónico (272)\n	721 2369</font></p>\n</ul>\n<p align="justify" style="margin-bottom: 0cm; line-height: 115%"><br/>\n\n</p>\n<p align="justify" style="margin-bottom: 0cm; line-height: 115%"><font face="Arial, serif">Los\ndatos de contacto de la persona o departamento de datos personales,\nque está a cargo de dar trámite a las solicitudes de derechos ARCO,\nson los siguientes:</font></p>\n<ol type="A">\n	 \n<p align="justify" style="margin-bottom: 0cm; line-height: 115%">\n	<font face="Arial, serif">Nombre de la persona o departamento de\n	datos personales: Área Comercial</font></p>\n	 \n<p align="justify" style="margin-bottom: 0cm; line-height: 115%">\n	<font face="Arial, serif">Domicilio: Boulevard Fernando Gutierrez\n	Barrios #56, Colonia Escámela de la Ciudad de Ixtaczoquitlán, C.P.\n	94450, en la Entidad Federativa de Veracruz, país México</font></p>\n	 \n<p align="justify" style="margin-bottom: 0cm; line-height: 115%">\n	<font face="Arial, serif">Correo electrónico:\n	<a href="mailto:quejasysugerencias@grupotabar.com">quejasysugerencias@grupotabar.com</a></font></p>\n	 \n<p align="justify" style="margin-bottom: 0cm; line-height: 115%">\n	<font face="Arial, serif">Número telefónico: (272) 721 2369</font></p>\n</ol>\n<p align="justify" style="margin-bottom: 0cm; line-height: 115%"><br/>\n\n</p>\n<p align="justify" style="margin-bottom: 0cm; line-height: 115%"><font face="Arial, serif">Recibida\nla solicitud por la que nos indica que desea ejercer sus Derechos\nARCO, tendremos 20 días hábiles para analizar, atender y enviarle\nla respuesta correspondiente. El medio por el cual le enviaremos\nnuestra respuesta, será aquel que nos sea indicado por usted en su\nsolicitud (correo electrónico o postal, exclusivamente) o, en su\ndefecto, por el mismo medio por el cual nos hizo llegar su solicitud.\n</font>\n</p>\n<p align="justify" style="margin-bottom: 0cm; line-height: 115%"><br/>\n\n</p>\n<p align="justify" style="margin-bottom: 0cm; line-height: 115%"><font face="Arial, serif"><u><b>Usted\npuede revocar su consentimiento para el uso de sus datos personales.</b></u></font></p>\n<p align="justify" style="margin-bottom: 0cm; line-height: 115%"><font face="Arial, serif">Usted\npuede revocar el consentimiento que, en su caso, nos haya otorgado\npara el tratamiento de sus datos personales. Sin embargo, es\nimportante que tenga en cuenta que no en todos los casos podremos\natender su solicitud o concluir el uso de forma inmediata, ya que es\nposible que por alguna obligación legal requiramos seguir tratando\nsus datos personales. Asimismo, usted deberá considerar que para\nciertos fines, la revocación de su consentimiento implicará que no\nle podamos seguir prestando el servicio que nos solicitó, o la\nconclusión de su relación con nosotros.</font></p>\n<p align="justify" style="margin-bottom: 0cm; line-height: 115%"><br/>\n\n</p>\n<p align="justify" style="margin-bottom: 0cm; line-height: 115%"><font face="Arial, serif">Para\nrevocar su consentimiento y/o conocer el procedimiento y requisitos\npara la revocación deberá presentar su solicitud a través del\nsiguiente medio: </font>\n</p>\n<ul>\n	 \n<p align="justify" style="margin-bottom: 0cm; line-height: 115%">\n	<font face="Arial, serif">Comunicarse al teléfono: (272) 721 2369</font></p>\n	 \n<p align="justify" style="margin-bottom: 0cm; line-height: 115%">\n	<font face="Arial, serif">Enviar un correo electrónico a\n	<a href="mailto:quejasysugerencias@grupotabar.com">quejasysugerencias@grupotabar.com</a></font></p>\n</ul>\n<p align="justify" style="margin-left: 1.27cm; margin-bottom: 0cm; line-height: 115%">\n<br/>\n\n</p>\n<p align="justify" style="margin-bottom: 0cm; line-height: 115%"><font face="Arial, serif"><b>¿Cómo\npuede limitar el uso o divulgación de su información personal?</b></font></p>\n<p align="justify" style="margin-bottom: 0cm; line-height: 115%"><font face="Arial, serif">Con\nobjeto de que usted pueda limitar el uso y divulgación de su\ninformación personal, le ofrecemos los siguientes medios: </font>\n</p>\n<ul>\n	 \n<p align="justify" style="margin-bottom: 0cm; line-height: 115%">\n	<font face="Arial, serif">Comunicarse al teléfono: (272) 721 2369</font></p>\n	 \n<p align="justify" style="margin-bottom: 0cm; line-height: 115%">\n	<font face="Arial, serif">Enviar un correo electrónico a\n	<a href="mailto:quejasysugerencias@grupotabar.com">quejasysugerencias@grupotabar.com</a></font></p>\n</ul>\n<p align="justify" style="margin-bottom: 0cm; line-height: 115%"><br/>\n\n</p>\n<p align="justify" style="margin-bottom: 0cm; line-height: 115%"><font face="Arial, serif">De\nmanera adicional, le informamos que contamos con los siguientes\nlistados de exclusión, en los cuales podrá registrarse para que sus\ndatos personales no sean tratados para ciertos fines:</font></p>\n<ul>\n	 \n<p align="justify" style="margin-bottom: 0cm; line-height: 115%">\n	<font face="Arial, serif"><b>Nombre del listado:</b></font><font face="Arial, serif">\n	Listado para evitar el envío de publicidad y mercadotecnia</font></p>\n	 \n<p align="justify" style="margin-bottom: 0cm; line-height: 115%">\n	<font face="Arial, serif"><b>Finalidad para las que aplica: </b></font><font face="Arial, serif">Evita\n	el envío de cualquier tipo de publicad y mercadotecnia</font></p>\n	 \n<p align="justify" style="margin-bottom: 0cm; line-height: 115%">\n	<font face="Arial, serif"><b>Medio para obtener mayor información:\n	</b></font><font face="Arial, serif">Llamando al número telefónico\n	(272) 721 2369</font></p>\n</ul>\n<p align="justify" style="margin-bottom: 0cm; line-height: 115%"><br/>\n\n</p>\n<p align="justify" style="margin-bottom: 0cm; line-height: 115%"><font face="Arial, serif">Si\ntiene alguna consulta más específica acerca del tratamiento que le\ndaremos a sus Datos Personales o de nuestras políticas de\nprivacidad, puede comunicarse a través del correo electrónico:\n<a href="mailto:quejasysugerencias@grupotabar.com">quejasysugerencias@grupotabar.com</a></font></p>\n<p align="justify" style="margin-bottom: 0cm; line-height: 115%"><br/>\n\n</p>\n<p align="justify" style="margin-bottom: 0cm; line-height: 115%"><font face="Arial, serif">Debiendo\nmencionar de manera clara y precisa la siguiente información: </font>\n</p>\n<ul>\n	 \n<p align="justify" style="margin-bottom: 0cm; line-height: 115%">\n	<font face="Arial, serif">Nombre, apellidos, o, en su caso, razón\n	social;</font></p>\n	 \n<p align="justify" style="margin-bottom: 0cm; line-height: 115%">\n	<font face="Arial, serif">Domicilio;</font></p>\n	 \n<p align="justify" style="margin-bottom: 0cm; line-height: 115%">\n	<font face="Arial, serif">Correo electrónico y/o cualquier otro\n	medio para comunicarle la respuesta a su solicitud;</font></p>\n	 \n<p align="justify" style="margin-bottom: 0cm; line-height: 115%">\n	<font face="Arial, serif">Documentos oficiales que acrediten su\n	personalidad, o, en su caso, la de su apoderado, y; </font>\n	</p>\n	 \n<p align="justify" style="margin-bottom: 0cm; line-height: 115%">\n	<font face="Arial, serif">Descripción clara y precisa del objeto de\n	su solicitud.</font></p>\n</ul>\n<p align="justify" style="margin-bottom: 0cm; line-height: 115%"><br/>\n\n</p>\n<p align="justify" style="margin-bottom: 0cm; line-height: 115%"><font face="Arial, serif">De\nla misma manera, se atenderá y responderá de cualquier comunicación\nque nos sea dirigida dentro de los 20 días hábiles al haber\nrecibido citada solicitud. El medio por el cual le daremos respuesta,\nserá en la forma en la que usted haya indicado, o en su defecto,\nutilizaremos el mismo medio por el cual nos hizo llegar su\ncomunicación.</font></p>\n<p align="justify" style="margin-bottom: 0cm; line-height: 115%"><br/>\n\n</p>\n<p align="justify" style="margin-left: 5cm; text-indent: -5cm; margin-bottom: 0cm; line-height: 115%">\n<font face="Arial, serif"><b>El uso de tecnologías de rastreo en la\naplicación móvil.</b></font></p>\n<p align="justify" style="margin-bottom: 0cm; line-height: 115%"><font face="Arial, serif">Le\ninformamos que para el desarrollo y funcionamiento de la aplicación\ny poder brindarle el servicio, almacenamos su información en canales\nseguros, a través de las cuales es posible monitorear su\ncomportamiento como usuario del servicio, así como brindarle un\nmejor servicio y experiencia al navegar en la aplicación. Los datos\npersonales que recabamos a través de estas tecnologías, los\nutilizaremos para los siguientes fines:</font></p>\n<ul>\n	 \n<p align="justify" style="margin-bottom: 0cm; line-height: 115%">\n	<font face="Arial, serif">Inicio de sesión el usuario.</font></p>\n</ul>\n<p align="justify" style="margin-bottom: 0cm; line-height: 115%"><br/>\n\n</p>\n<p align="justify" style="margin-bottom: 0cm; line-height: 115%"><font face="Arial, serif">Los\ndatos personales que obtenemos de estas tecnologías de rastreo son\nlos siguientes:</font></p>\n<ul>\n	 \n<p align="justify" style="margin-bottom: 0cm; line-height: 115%">\n	<font face="Arial, serif">Identificadores, nombre de usuario y\n	contraseñas de una sesión</font></p>\n	 \n<p align="justify" style="margin-bottom: 0cm; line-height: 115%">\n	<font face="Arial, serif">Región en la que se encuentra el usuario\n	(ubicación por medio de GPS)</font></p>\n</ul>\n<p align="justify" style="margin-bottom: 0cm; line-height: 115%"><br/>\n\n</p>\n<p align="justify" style="margin-bottom: 0cm; line-height: 115%"><font face="Arial, serif"><b>¿Cómo\npuede conocer los cambios en este aviso de privacidad?</b></font></p>\n<p align="justify" style="margin-bottom: 0cm; line-height: 115%"><font face="Arial, serif">El\npresente aviso de privacidad puede sufrir modificaciones, cambios o\nactualizaciones derivadas de nuevos requerimientos legales; de\nnuestras propias necesidades por los productos o servicios que\nofrecemos; de nuestras prácticas de privacidad; de cambios en\nnuestro modelo de negocio, o por otras causas.</font></p>\n<p align="justify" style="margin-bottom: 0cm; line-height: 115%"><br/>\n\n</p>\n<p align="justify" style="margin-bottom: 0cm; line-height: 115%"><font face="Arial, serif">Nos\ncomprometemos a mantenerlo informado sobre los cambios que pueda\nsufrir el presente aviso de privacidad, a través de: </font>\n</p>\n<ul>\n	 \n<p align="justify" style="margin-bottom: 0cm; line-height: 115%">\n	<font face="Arial, serif">Correo electrónico y/o aviso dentro de la\n	app móvil.</font></p>\n</ul>\n<p align="justify" style="margin-bottom: 0cm; line-height: 115%"><br/>\n\n</p>\n<p align="justify" style="margin-bottom: 0cm; line-height: 115%"><font face="Arial, serif">El\nprocedimiento a través del cual se llevarán a cabo las\nnotificaciones sobre cambios o actualizaciones al presente aviso de\nprivacidad es el siguiente: </font>\n</p>\n<ul>\n	 \n<p align="justify" style="margin-bottom: 0cm; line-height: 115%">\n	<font face="Arial, serif">Se dará a conocer mediante notificación\n	emergente dentro de la aplicación y el envío de correo electrónico\n	que notificara el cambio.</font></p>\n</ul>\n<p align="justify" style="margin-bottom: 0cm; line-height: 115%"><br/>\n\n</p>\n<p align="justify" style="margin-bottom: 0cm; line-height: 115%"><font face="Arial, serif"><b>Su\nconsentimiento para el tratamiento de sus datos personales.</b></font></p>\n<p align="justify" style="margin-bottom: 0cm; line-height: 115%"><font face="Arial, serif">Consiento\nque mis datos personales sean tratados de conformidad con los\ntérminos y condiciones informados en el presente aviso de\nprivacidad.</font></p>\n<p align="justify" style="margin-bottom: 0cm; line-height: 115%"><br/>\n\n</p>\n<p align="justify" style="margin-bottom: 0cm; line-height: 115%"><font face="Arial, serif">Al\nproporcionarnos sus datos personales, previa protesta de decir verdad\nde haber leído el presente Aviso de Privacidad, expresamente lo\nreconoce y acepta, por lo que dicho consentimiento nos otorga la\nfacultad para que procedamos al tratamiento de sus datos personales\nde la forma en que se señala en el presente y con apego al mismo, la\nLey Federal de Protección de Datos Personales en Posesión de los\nParticulares, su Reglamento, demás normas generales relativas y\naplicables. </font>\n</p>\n<p align="justify" style="margin-bottom: 0cm; line-height: 115%"><br/>\n\n</p>\n<p align="justify" style="margin-bottom: 0cm; line-height: 115%"><a name="_GoBack"></a>\n<font face="Arial, serif">Manifiesto que he leído, entiendo y\nconsiento el presente Aviso de Privacidad.</font></p>\n  </div>\n\n  \n</ion-content>\n\n<ion-fab top right class="animated swing">\n	<button ion-fab color="light" (click)="mostrarNotif.abrirNotificacion()">\n		<img src="assets/imgs/home/gas-station.png" alt="logo" class="claseImg animated fadeIn" />\n	</button>\n	<button *ngIf="notificacion.num > 0" ion-fab color="light" (click)="mostrarNotif.abrirNotificacion()" class="miniBoton">\n		{{notificacion.num}}\n	</button>\n  </ion-fab>'/*ion-inline-end:"C:\Users\Administrador\kenergy\src\pages\aviso-privacidad\aviso-privacidad.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["m" /* NavParams */],
            __WEBPACK_IMPORTED_MODULE_2__ionic_storage__["b" /* Storage */], __WEBPACK_IMPORTED_MODULE_3__providers_alerta_service__["a" /* AlertaServiceProvider */],
            __WEBPACK_IMPORTED_MODULE_4__providers_rest_service__["a" /* RestServiceProvider */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* LoadingController */], __WEBPACK_IMPORTED_MODULE_5__services_notificaciones_service__["a" /* NotificacionService */], __WEBPACK_IMPORTED_MODULE_6__services_abrirnotificaciones_service__["a" /* AbrirnotificacionesService */]])
    ], AvisoPrivacidadPage);
    return AvisoPrivacidadPage;
}());

//# sourceMappingURL=aviso-privacidad.js.map

/***/ }),

/***/ 158:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return CargasListPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(2);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var CargasListPage = /** @class */ (function () {
    function CargasListPage(navCtrl, navParams) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.cargas = [];
        this.cargas = navParams.get("cargas");
    }
    CargasListPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad CargasListPage');
    };
    CargasListPage.prototype.cargaCarga = function (carga) {
    };
    CargasListPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-cargas-list',template:/*ion-inline-start:"C:\Users\Administrador\kenergy\src\pages\cargas-list\cargas-list.html"*/'<ion-list>\n  <ion-list-header class="tituloHeader" style="color: #fff;\n    background-color: #e77423;\n    text-align: center;">Cargas</ion-list-header>\n  <div style="color: #000;\n    font-size: 150%;\n    border-bottom: 1px solid #e3e5e6;\n    margin-top: 8px; margin-left: 11px;" *ngFor="let carga of cargas" (click)="cargaCarga(carga)">\n    {{carga.precio}} {{carga.fecha}}\n  </div>\n</ion-list>'/*ion-inline-end:"C:\Users\Administrador\kenergy\src\pages\cargas-list\cargas-list.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["m" /* NavParams */]])
    ], CargasListPage);
    return CargasListPage;
}());

//# sourceMappingURL=cargas-list.js.map

/***/ }),

/***/ 159:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return DatosFacturacionPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_alerta_service__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__providers_rest_service__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__angular_common_http__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__mis_datos_mis_datos__ = __webpack_require__(160);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__angular_forms__ = __webpack_require__(20);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_validator__ = __webpack_require__(52);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_validator___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_7_validator__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__services_abrirnotificaciones_service__ = __webpack_require__(18);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__services_notificaciones_service__ = __webpack_require__(17);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};










var DatosFacturacionPage = /** @class */ (function () {
    function DatosFacturacionPage(navCtrl, navParams, viewCtrl, alertaService, restService, loadingCtrl, notificacion, mostrarNotif) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.viewCtrl = viewCtrl;
        this.alertaService = alertaService;
        this.restService = restService;
        this.loadingCtrl = loadingCtrl;
        this.notificacion = notificacion;
        this.mostrarNotif = mostrarNotif;
        this.idUsuario = 0;
        this.tipo = 0;
        this.re = /^([A-ZÑ&]{3,4}) ?(?:- ?)?(\d{2}(?:0[1-9]|1[0-2])(?:0[1-9]|[12]\d|3[01])) ?(?:- ?)?([A-Z\d]{2})([A\d])$/;
        this.loginForm = new __WEBPACK_IMPORTED_MODULE_6__angular_forms__["b" /* FormGroup */]({
            idFactura: new __WEBPACK_IMPORTED_MODULE_6__angular_forms__["a" /* FormControl */](0),
            rfc: new __WEBPACK_IMPORTED_MODULE_6__angular_forms__["a" /* FormControl */]('', __WEBPACK_IMPORTED_MODULE_6__angular_forms__["g" /* Validators */].required),
            razonSocial: new __WEBPACK_IMPORTED_MODULE_6__angular_forms__["a" /* FormControl */](''),
            email: new __WEBPACK_IMPORTED_MODULE_6__angular_forms__["a" /* FormControl */](''),
            calle: new __WEBPACK_IMPORTED_MODULE_6__angular_forms__["a" /* FormControl */](''),
            ne: new __WEBPACK_IMPORTED_MODULE_6__angular_forms__["a" /* FormControl */](''),
            ni: new __WEBPACK_IMPORTED_MODULE_6__angular_forms__["a" /* FormControl */](''),
            cp: new __WEBPACK_IMPORTED_MODULE_6__angular_forms__["a" /* FormControl */](''),
            estado: new __WEBPACK_IMPORTED_MODULE_6__angular_forms__["a" /* FormControl */](''),
            municipio: new __WEBPACK_IMPORTED_MODULE_6__angular_forms__["a" /* FormControl */](''),
            colonia: new __WEBPACK_IMPORTED_MODULE_6__angular_forms__["a" /* FormControl */]('')
        });
        this.loginForm2 = new __WEBPACK_IMPORTED_MODULE_6__angular_forms__["b" /* FormGroup */]({
            editado: new __WEBPACK_IMPORTED_MODULE_6__angular_forms__["a" /* FormControl */](0)
        });
        this.loginFormValidator = {
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
        this.idUsuario = navParams.get("idUsuario");
        this.tipo = navParams.get('tipo');
        if (undefined != navParams.get("editar")) {
            var factura = navParams.get("factura");
            this.loginForm.patchValue({
                idFactura: factura.id,
                rfc: factura.rfc,
                email: factura.correoElectronico,
                razonSocial: factura.razonSocial
            });
            this.cargarDatosFac();
        }
        __WEBPACK_IMPORTED_MODULE_5__mis_datos_mis_datos__["a" /* MisDatosPage */];
    }
    DatosFacturacionPage.prototype.ionViewDidLoad = function () {
        this.onValueChanges();
    };
    DatosFacturacionPage.prototype.ionViewCanLeave = function () {
        var _this = this;
        return new Promise(function (resolve, reject) {
            if (_this.loginForm2.value.editado == 0)
                resolve();
            else
                _this.alertaService.alertaConfirmacion("Confirmar", "¿Desea salir sin guardar los cambios realizados?", resolve, reject);
        });
    };
    DatosFacturacionPage.prototype.onValueChanges = function () {
        var _this = this;
        this.loginForm.valueChanges.subscribe(function (val) {
            _this.loginForm.patchValue({
                rfc: _this.loginForm.value.rfc.toUpperCase(),
                razonSocial: _this.loginForm.value.razonSocial.toUpperCase(),
                calle: _this.loginForm.value.calle.toUpperCase(),
                estado: _this.loginForm.value.estado.toUpperCase(),
                municipio: _this.loginForm.value.municipio.toUpperCase(),
                colonia: _this.loginForm.value.colonia.toUpperCase()
            }, { emitEvent: false });
            _this.loginForm2.setValue({
                editado: 1
            });
        });
    };
    DatosFacturacionPage.prototype.cancelar = function () {
        this.viewCtrl.dismiss();
    };
    DatosFacturacionPage.prototype.registrar = function () {
        var _this = this;
        if (this.formValidator()) {
            var loading_1 = this.loadingCtrl.create();
            loading_1.present();
            this.restService.getToken().timeout(this.restService.timeOver).subscribe(function (data) {
                if (data == null) {
                    loading_1.dismiss();
                    _this.alertaService.warnAlert(_this.restService.headerValidacion, _this.restService.mensajeValidacionAdmin, null);
                }
                else {
                    var bodys = new __WEBPACK_IMPORTED_MODULE_4__angular_common_http__["d" /* HttpParams */]()
                        .set('IdUser', "" + _this.idUsuario)
                        .set('RFC', _this.loginForm.value.rfc)
                        .set('RazonSocial', _this.loginForm.value.razonSocial)
                        .set('Email', _this.loginForm.value.email)
                        .set('Calle', _this.loginForm.value.calle)
                        .set('NoInt', _this.loginForm.value.ni)
                        .set('NoExt', _this.loginForm.value.ne)
                        .set('CP', _this.loginForm.value.cp)
                        .set('Estado', _this.loginForm.value.estado)
                        .set('Municipio', _this.loginForm.value.municipio)
                        .set('Colonia', _this.loginForm.value.colonia);
                    var param = "";
                    if (_this.loginForm.value.idFactura != 0) {
                        param = "/" + _this.loginForm.value.idFactura;
                        var bodyObj = {
                            IdUser: _this.idUsuario,
                            RFC: _this.loginForm.value.rfc,
                            RazonSocial: _this.loginForm.value.razonSocial,
                            Email: _this.loginForm.value.email,
                            Calle: _this.loginForm.value.calle,
                            NoInt: _this.loginForm.value.ni,
                            NoExt: _this.loginForm.value.ne,
                            CP: _this.loginForm.value.cp,
                            Estado: _this.loginForm.value.estado,
                            Municipio: _this.loginForm.value.municipio,
                            Colonia: _this.loginForm.value.colonia
                        };
                        _this.restService.restServicePUTToken("invoiceto/regular" + param, bodyObj, data.toString()).timeout(_this.restService.timeOver).subscribe(function (dataRegistro) {
                            var dato = dataRegistro['Response'];
                            if (dato != undefined && dato == true) {
                                _this.loginForm2.setValue({
                                    editado: 0
                                });
                                _this.alertaService.alertaBasica("¡Bien!", "Se han actualizado los datos", null);
                            }
                            else {
                                _this.alertaService.warnAlert("¡Atención!", dataRegistro['Message'], null);
                            }
                            loading_1.dismiss();
                        }, function (error) {
                            loading_1.dismiss();
                            console.log(error);
                            _this.alertaService.errorAlert(_this.restService.headerError, _this.restService.mensajeError, null);
                        });
                    }
                    else {
                        _this.restService.restServicePOSTTokenXForm("invoiceto/regular" + param, bodys, data.toString()).timeout(_this.restService.timeOver).subscribe(function (dataRegistro) {
                            var dato = dataRegistro['Response'];
                            if (dato != undefined && dato == true) {
                                _this.loginForm2.setValue({
                                    editado: 0
                                });
                                _this.alertaService.alertaBasica("¡Bien!", "Se ha agregado el RFC", null);
                                if (_this.tipo == 1)
                                    _this.viewCtrl.dismiss();
                            }
                            else {
                                _this.alertaService.warnAlert("¡Atención!", "Error al agregar RFC", null);
                            }
                            loading_1.dismiss();
                        }, function (error) {
                            loading_1.dismiss();
                            console.log(error);
                            _this.alertaService.errorAlert(_this.restService.headerError, _this.restService.mensajeError, null);
                        });
                    }
                }
            }, function (error) {
                console.log(error);
                _this.alertaService.errorAlert(_this.restService.headerError, _this.restService.mensajeError, null);
            });
        }
    };
    DatosFacturacionPage.prototype.formValidator = function () {
        var validado = this.loginForm.value.rfc.match(this.re);
        if (__WEBPACK_IMPORTED_MODULE_7_validator___default.a.isEmpty(this.loginForm.value.rfc)) {
            this.loginFormValidator.rfc.mensaje = 'Es necesario capturar el RFC';
            this.cambiarDiseñoInput("rfc", 1);
            return false;
        }
        else {
            this.loginFormValidator.rfc.mensaje = '';
            this.cambiarDiseñoInput("rfc");
        }
        if (!validado) {
            this.loginFormValidator.rfc.mensaje = 'Es necesario capturar un valor válido para RFC';
            this.cambiarDiseñoInput("rfc", 1);
            return false;
        }
        else {
            this.loginFormValidator.rfc.mensaje = '';
            this.cambiarDiseñoInput("rfc");
        }
        if (__WEBPACK_IMPORTED_MODULE_7_validator___default.a.isEmpty(this.loginForm.value.razonSocial)) {
            this.loginFormValidator.razonSocial.mensaje = 'Es necesario capturar la Razón Social';
            this.cambiarDiseñoInput("razonSocial", 1);
            return false;
        }
        else {
            this.loginFormValidator.razonSocial.mensaje = '';
            this.cambiarDiseñoInput("razonSocial");
        }
        if (__WEBPACK_IMPORTED_MODULE_7_validator___default.a.isEmpty(this.loginForm.value.email)) {
            this.loginFormValidator.email.mensaje = 'Es necesario capturar el E-mail';
            this.cambiarDiseñoInput("email", 1);
            return false;
        }
        else {
            this.loginFormValidator.email.mensaje = '';
            this.cambiarDiseñoInput("email");
        }
        if (!__WEBPACK_IMPORTED_MODULE_7_validator___default.a.isEmail(this.loginForm.value.email)) {
            this.loginFormValidator.email.mensaje = 'Ingrese una dirección de correo válida';
            this.cambiarDiseñoInput("email", 1);
            return false;
        }
        else {
            this.loginFormValidator.email.mensaje = '';
            this.cambiarDiseñoInput("email");
        }
        return true;
    };
    DatosFacturacionPage.prototype.cambiarDiseñoInput = function (id, color) {
        if (color === void 0) { color = 0; }
        var strColor = color == 1 ? "red" : "white";
        document.getElementById(id).style.backgroundColor = strColor;
    };
    DatosFacturacionPage.prototype.cargarDatosFac = function () {
        var _this = this;
        this.restService.getToken().timeout(this.restService.timeOver).subscribe(function (data) {
            if (data == null) {
                _this.alertaService.warnAlert(_this.restService.headerValidacion, _this.restService.mensajeValidacionAdmin, null);
            }
            else {
                var url = "invoiceto/regular/detail/" + _this.loginForm.value.idFactura;
                _this.restService.restServiceGETToken(url, new __WEBPACK_IMPORTED_MODULE_4__angular_common_http__["d" /* HttpParams */](), data.toString()).timeout(_this.restService.timeOver).subscribe(function (dataRegistro) {
                    if (dataRegistro['Status'] == 1) {
                        var resp = dataRegistro['Response'];
                        _this.loginForm.patchValue({
                            calle: resp.Calle,
                            ne: resp.NumExterior,
                            ni: resp.NumInterior,
                            cp: resp.Cp,
                            estado: resp.Estado,
                            municipio: resp.Ciudad,
                            colonia: resp.Colonia
                        });
                        _this.loginForm2.setValue({
                            editado: 0
                        });
                    }
                }, function (error) {
                    console.log(error);
                });
            }
        });
    };
    DatosFacturacionPage.prototype.numberOnlyValidation = function (event) {
        if (!this.re.test(this.loginForm.value.rfc)) {
            this.loginFormValidator.rfc.mensaje = 'Es necesario capturar un valor válido para RFC';
            this.cambiarDiseñoInput("rfc", 1);
        }
        else {
            this.loginFormValidator.rfc.mensaje = '';
            this.cambiarDiseñoInput("rfc");
        }
    };
    DatosFacturacionPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-datos-facturacion',template:/*ion-inline-start:"C:\Users\Administrador\kenergy\src\pages\datos-facturacion\datos-facturacion.html"*/'<ion-header>\n  <ion-navbar color="titulo">\n    <button ion-button menuToggle>\n      <ion-icon name="menu"></ion-icon>\n    </button>\n    \n    <ion-title class="tituloHeader" style="position: absolute;left: 25%; top: 33%;">Datos de Facturación</ion-title>\n\n    <ion-buttons left  class="animated fadeIn">\n      <button icon-only="" ion-button="" class="disable-hover bar-button bar-button-ios bar-button-default bar-button-default-ios">\n        <span class="button-inner">\n          <img src="assets/imgs/misDatos/usuario.png" style="width: 65%;margin-left: -27px;">\n        </span>\n        <div class="button-effect">\n\n        </div>\n      </button>\n    </ion-buttons>\n  </ion-navbar>\n</ion-header>\n\n<ion-content padding style="\nbackground-image: url(assets/imgs/fondo.jpg); \nbackground-size: 100%;\nbackground-position: bottom center;\nbackground-repeat: no-repeat;\nbackground-color: white;">\n  <form [formGroup]="loginForm">\n    <ion-item>\n    <ion-label position="floating" style="color:#181560;">RFC*</ion-label>\n    <ion-input formControlName="rfc" (keyup)="numberOnlyValidation($event)" style="color: #000;" autocapitalize="off" autocomplete="off" \n    autocorrect="off" id="rfc"></ion-input>\n  </ion-item>\n  <ion-item *ngIf="loginFormValidator.rfc.mensaje">\n    <ion-label text-wrap color="danger">\n    {{ loginFormValidator.rfc.mensaje }}\n    </ion-label>\n  </ion-item>\n    \n<ion-item>\n  <ion-label position="floating" style="color:#181560;">Razón Social*</ion-label>\n  <ion-input autocapitalize="off" formControlName="razonSocial" style="color: #000;" autocomplete="off" autocorrect="off" id="razonSocial"></ion-input>\n</ion-item>\n<ion-item *ngIf="loginFormValidator.razonSocial.mensaje">\n  <ion-label text-wrap color="danger">\n  {{ loginFormValidator.razonSocial.mensaje }}\n  </ion-label>\n</ion-item>\n\n  <ion-item>\n  <ion-label position="floating" style="color:#181560;">E-mail*</ion-label>\n  <ion-input formControlName="email" type="email" style="color: #000;" autocapitalize="off" autocomplete="off" autocorrect="off" id="email"></ion-input>\n</ion-item>\n<ion-item *ngIf="loginFormValidator.email.mensaje">\n  <ion-label text-wrap color="danger">\n  {{ loginFormValidator.email.mensaje }}\n  </ion-label>\n</ion-item>\n\n<ion-item>\n  <ion-label position="floating" style="color:#181560;">Calle</ion-label>\n  <ion-input formControlName="calle" style="color: #000;" autocapitalize="off" autocomplete="off" autocorrect="off" id="calle"></ion-input>\n</ion-item>\n  \n  <ion-item>\n    <ion-label position="floating" style="color:#181560;">Núm. Exterior</ion-label>\n    <ion-input formControlName="ne" style="color: #000;" autocapitalize="off" autocomplete="off" autocorrect="off" id="ne"></ion-input>\n  </ion-item>\n\n  <ion-item>\n    <ion-label position="floating" style="color:#181560;">Núm. Interior</ion-label>\n    <ion-input formControlName="ni" style="color: #000;" autocapitalize="off" autocomplete="off" autocorrect="off" id="ni"></ion-input>\n  </ion-item>\n\n  <ion-item>\n    <ion-label position="floating" style="color:#181560;">Código Postal</ion-label>\n    <ion-input formControlName="cp" style="color: #000;" type="number" autocapitalize="off" autocomplete="off" autocorrect="off" id="cp"></ion-input>\n  </ion-item>\n\n  <ion-item>\n    <ion-label position="floating" style="color:#181560;">Colonia</ion-label>\n    <ion-input formControlName="colonia" style="color: #000;" autocapitalize="off" autocomplete="off" autocorrect="off" id="colonia"></ion-input>\n  </ion-item>\n\n  <ion-item>\n    <ion-label position="floating" style="color:#181560;">Municipio</ion-label>\n    <ion-input formControlName="municipio" style="color: #000;" autocapitalize="off" autocomplete="off" autocorrect="off" id="municipio"></ion-input>\n  </ion-item>\n\n  <ion-item>\n    <ion-label position="floating" style="color:#181560;">Estado</ion-label>\n    <ion-input formControlName="estado" style="color: #000;" autocapitalize="off" autocomplete="off" autocorrect="off" id="estado"></ion-input>\n  </ion-item>\n\n  <div class="centro">\n      <button ion-button color="naranja" class="tituloHeader botonGuardar"\n      (click)="registrar()">Guardar</button>\n  </div>\n</form>\n</ion-content>\n<ion-fab top right class="animated swing">\n  <button ion-fab color="light" (click)="mostrarNotif.abrirNotificacion()">\n      <img src="assets/imgs/home/gas-station.png" alt="logo" class="claseImg animated fadeIn" />\n  </button>\n  <button *ngIf="notificacion.num > 0" ion-fab color="light" (click)="mostrarNotif.abrirNotificacion()" class="miniBoton">\n    {{notificacion.num}}\n</button>\n</ion-fab>'/*ion-inline-end:"C:\Users\Administrador\kenergy\src\pages\datos-facturacion\datos-facturacion.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["m" /* NavParams */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["p" /* ViewController */],
            __WEBPACK_IMPORTED_MODULE_2__providers_alerta_service__["a" /* AlertaServiceProvider */], __WEBPACK_IMPORTED_MODULE_3__providers_rest_service__["a" /* RestServiceProvider */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* LoadingController */],
            __WEBPACK_IMPORTED_MODULE_9__services_notificaciones_service__["a" /* NotificacionService */], __WEBPACK_IMPORTED_MODULE_8__services_abrirnotificaciones_service__["a" /* AbrirnotificacionesService */]])
    ], DatosFacturacionPage);
    return DatosFacturacionPage;
}());

//# sourceMappingURL=datos-facturacion.js.map

/***/ }),

/***/ 160:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MisDatosPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__models_facturaModel__ = __webpack_require__(669);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__datos_facturacion_datos_facturacion__ = __webpack_require__(159);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__ionic_storage__ = __webpack_require__(15);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__providers_alerta_service__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__providers_rest_service__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__angular_common_http__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__angular_forms__ = __webpack_require__(20);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9_validator__ = __webpack_require__(52);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9_validator___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_9_validator__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__cambiar_contra_cambiar_contra__ = __webpack_require__(155);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__services_abrirnotificaciones_service__ = __webpack_require__(18);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__services_notificaciones_service__ = __webpack_require__(17);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__services_usuario_service__ = __webpack_require__(59);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14__cambiar_email_cambiar_email__ = __webpack_require__(303);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};















var MisDatosPage = /** @class */ (function () {
    function MisDatosPage(navCtrl, navParams, localStorage, alertaService, restService, loadingCtrl, alertCtrl, notificacion, mostrarNotif, usuarioService, viewCtrl) {
        var _this = this;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.localStorage = localStorage;
        this.alertaService = alertaService;
        this.restService = restService;
        this.loadingCtrl = loadingCtrl;
        this.alertCtrl = alertCtrl;
        this.notificacion = notificacion;
        this.mostrarNotif = mostrarNotif;
        this.usuarioService = usuarioService;
        this.viewCtrl = viewCtrl;
        this.facturas = [];
        this.usuario = null;
        this.loginForm = new __WEBPACK_IMPORTED_MODULE_8__angular_forms__["b" /* FormGroup */]({
            nombre: new __WEBPACK_IMPORTED_MODULE_8__angular_forms__["a" /* FormControl */](''),
            alias: new __WEBPACK_IMPORTED_MODULE_8__angular_forms__["a" /* FormControl */](''),
            telefono: new __WEBPACK_IMPORTED_MODULE_8__angular_forms__["a" /* FormControl */](''),
            nacimiento: new __WEBPACK_IMPORTED_MODULE_8__angular_forms__["a" /* FormControl */](''),
            email: new __WEBPACK_IMPORTED_MODULE_8__angular_forms__["a" /* FormControl */](''),
            contra: new __WEBPACK_IMPORTED_MODULE_8__angular_forms__["a" /* FormControl */]('')
        });
        this.loginFormValidator = {
            nombre: {
                mensaje: ''
            },
            alias: {
                mensaje: ''
            },
            telefono: {
                mensaje: ''
            },
            nacimiento: {
                mensaje: ''
            }
        };
        this.censorWord = function (str) { return str[0] + "*".repeat(str.length - 2) + str.slice(-1); };
        this.censorEmail = function (email) { return _this.censorWord(email.split("@")[0]) + "@" + _this.censorWord(email.split("@")[1]); };
        //this.usuario = navParams.get("usuario");
        if (this.usuario == null) {
            this.openSesion();
        }
        this.cargarUsuario();
    }
    MisDatosPage.prototype.ionViewDidEnter = function () {
        document.getElementById("editado").value = 0;
    };
    MisDatosPage.prototype.ionViewWillEnter = function () {
        this.cargaFacturarA();
    };
    MisDatosPage.prototype.ionViewCanLeave = function () {
        var _this = this;
        return new Promise(function (resolve, reject) {
            if (document.getElementById("editado").value == 0)
                resolve();
            else
                _this.alertaService.alertaConfirmacion("Confirmar", "¿Desea salir sin guardar los cambios realizados?", resolve, reject);
        });
    };
    MisDatosPage.prototype.cargarUsuario = function () {
        var _this = this;
        var loading = this.loadingCtrl.create();
        loading.present();
        this.restService.getToken().timeout(this.restService.timeOver).subscribe(function (data) {
            if (data == null) {
                loading.dismiss();
                _this.alertaService.warnAlert(_this.restService.headerValidacion, _this.restService.mensajeValidacionAdmin, null);
            }
            else {
                if (_this.usuario != null) {
                    var body = new __WEBPACK_IMPORTED_MODULE_7__angular_common_http__["d" /* HttpParams */]();
                    //var a = 44;
                    var a = _this.usuario.Id;
                    var url = "user/regular/" + a.toString();
                    _this.restService.restServiceGETToken(url, new __WEBPACK_IMPORTED_MODULE_7__angular_common_http__["d" /* HttpParams */](), data.toString()).timeout(_this.restService.timeOver).subscribe(function (dataRegistro) {
                        if (dataRegistro['Response'].Id != undefined && dataRegistro['Response'].Id != null) {
                            var usuarioTemp = dataRegistro['Response'];
                            _this.usuario.Celular = usuarioTemp.Tel;
                            _this.usuario.puntos = usuarioTemp.Puntos;
                            _this.usuario.Alias = usuarioTemp.Alias;
                            //(document.getElementById("pts") as HTMLFormElement).value = this.usuario.puntos;
                            //(document.getElementById("ptst") as HTMLFormElement).value = usuarioTemp.PuntosTemp;
                            _this.loginForm.patchValue({
                                nombre: _this.usuario.Nombre,
                                alias: _this.usuario.Alias,
                                telefono: _this.usuario.Celular,
                                email: _this.censorEmail(_this.usuario.Email),
                                nacimiento: usuarioTemp.FechaNacimiento,
                                contra: usuarioTemp.Password
                            });
                            document.getElementById("editado").value = 0;
                        }
                        else {
                            _this.alertaService.warnAlert(_this.restService.headerValidacion, "No se encontraron sus datos", null);
                        }
                        loading.dismiss();
                    }, function (error) {
                        loading.dismiss();
                        console.log(error);
                        _this.alertaService.errorAlert(_this.restService.headerError, _this.restService.mensajeError, null);
                    });
                }
                else {
                    loading.dismiss();
                }
                _this.onValueChanges();
            }
        }, function (error) {
            loading.dismiss();
            console.log(error);
            _this.alertaService.errorAlert(_this.restService.headerError, _this.restService.mensajeError, null);
        });
    };
    MisDatosPage.prototype.cambiarContrasenia = function () {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_10__cambiar_contra_cambiar_contra__["a" /* CambiarContraPage */], { usuario: this.usuario });
    };
    MisDatosPage.prototype.cambiarEmail = function () {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_14__cambiar_email_cambiar_email__["a" /* CambiarEmailPage */], { usuario: this.usuario });
    };
    MisDatosPage.prototype.guardarUsuario = function () {
        var _this = this;
        var loading = this.loadingCtrl.create();
        loading.present();
        if (this.formValidator()) {
            this.restService.getToken().timeout(this.restService.timeOver).subscribe(function (data) {
                var urlArmada = "user/regular/" + _this.usuario.Id;
                var bodyObj = {
                    Nombre: _this.loginForm.value.nombre,
                    Alias: _this.loginForm.value.alias,
                    Password: '-',
                    Tel: _this.loginForm.value.telefono,
                    FechaNacimiento: _this.loginForm.value.nacimiento
                };
                _this.restService.restServicePUTToken(urlArmada, bodyObj, data.toString()).timeout(_this.restService.timeOver).subscribe(function (dataRegistro) {
                    if (dataRegistro['Status'] == 1) {
                        document.getElementById("editado").value = 0;
                        _this.alertaService.alertaBasica(_this.restService.headerExito, "Sus datos se han guardado correctamente", null);
                        _this.usuario.Alias = bodyObj.Alias;
                        _this.usuario.Nombre = bodyObj.Nombre;
                        _this.usuario.Celular = bodyObj.Tel;
                        _this.usuarioService.cambiarNombre(bodyObj.Nombre);
                        _this.localStorage.ready().then(function () {
                            _this.localStorage.get("@userSession").then(function (data) {
                                _this.localStorage.set("@userSession", _this.usuario);
                            });
                        });
                    }
                    else {
                        _this.alertaService.warnAlert(_this.restService.headerValidacion, dataRegistro['Message'], null);
                    }
                    loading.dismiss();
                }, function (error) {
                    loading.dismiss();
                    console.log(error);
                    _this.alertaService.errorAlert(_this.restService.headerError, _this.restService.mensajeError, null);
                });
            }, function (error) {
                loading.dismiss();
                console.log(error);
                _this.alertaService.errorAlert(_this.restService.headerError, _this.restService.mensajeError, null);
            });
        }
        loading.dismiss();
    };
    MisDatosPage.prototype.openSesion = function () {
        var _this = this;
        this.localStorage.ready().then(function () {
            _this.localStorage.get("@userSession").then(function (data) {
                if (data != null) {
                    _this.usuario = data;
                    console.log(JSON.stringify(_this.usuario));
                }
                else {
                    _this.alertaService.warnAlert(_this.restService.headerValidacion, "Usuario sin sesión, no se cargarán sus datos", null);
                }
            });
        });
    };
    MisDatosPage.prototype.facturarA = function () {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_3__datos_facturacion_datos_facturacion__["a" /* DatosFacturacionPage */], { idUsuario: this.usuario.Id });
    };
    MisDatosPage.prototype.editarFacturarA = function (factura) {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_3__datos_facturacion_datos_facturacion__["a" /* DatosFacturacionPage */], { idUsuario: this.usuario.Id, editar: 1, factura: factura });
    };
    MisDatosPage.prototype.cargaFacturarA = function () {
        var _this = this;
        this.facturas = [];
        //invoiceto/regular/{id usuario}
        var loading = this.loadingCtrl.create();
        loading.present();
        this.restService.getToken().timeout(this.restService.timeOver).subscribe(function (data) {
            if (data == null) {
                loading.dismiss();
                _this.alertaService.warnAlert(_this.restService.headerValidacion, _this.restService.mensajeValidacionAdmin, null);
            }
            else {
                if (_this.usuario != null) {
                    //let body = new HttpParams();
                    //var a = 44;
                    var a = _this.usuario.Id;
                    var url = "invoiceto/regular/" + a.toString();
                    _this.restService.restServiceGETToken(url, new __WEBPACK_IMPORTED_MODULE_7__angular_common_http__["d" /* HttpParams */](), data.toString()).timeout(_this.restService.timeOver).subscribe(function (dataRegistro) {
                        if (dataRegistro['Response'] != null && dataRegistro['Response'] instanceof Array) {
                            var array = dataRegistro['Response'];
                            array.forEach(function (factura) {
                                _this.facturas.push(new __WEBPACK_IMPORTED_MODULE_2__models_facturaModel__["a" /* FacturaModel */](factura.RFC, factura.RFC, factura.RazonSocial, factura.Email, "", "", "", "", factura.Dir, "", "", factura.Id));
                            });
                        }
                        console.log(JSON.stringify(_this.facturas));
                        //this.facturas.push(new FacturaModel("APR9609194H4", "APR9609194H4", "AB PRO SC.", "felectronica@grupotabar.com", "", "", "", "", "Ver.", "Ixtaczoquitlán", ""));
                        //	this.facturas.push(new FacturaModel("APR9609194H4", "APR9609194H4", "AB PRO SC.", "felectronica@grupotabar.com", "", "", "", "", "Ver.", "Ixtaczoquitlán", ""));
                        loading.dismiss();
                    }, function (error) {
                        loading.dismiss();
                        console.log(error);
                        _this.alertaService.errorAlert(_this.restService.headerError, _this.restService.mensajeError, null);
                    });
                }
                else {
                    loading.dismiss();
                }
            }
        }, function (error) {
            loading.dismiss();
            console.log(error);
            _this.alertaService.errorAlert(_this.restService.headerError, _this.restService.mensajeError, null);
        });
    };
    MisDatosPage.prototype.formValidator = function () {
        if (__WEBPACK_IMPORTED_MODULE_9_validator___default.a.isEmpty(this.loginForm.value.nombre)) {
            this.loginFormValidator.nombre.mensaje = 'Es necesario capturar el Nombre';
            this.cambiarDiseñoInput("nombre", 1);
            return false;
        }
        else {
            this.loginFormValidator.nombre.mensaje = '';
            this.cambiarDiseñoInput("nombre");
        }
        /*if (validator.isEmpty(this.loginForm.value.alias)) {
          this.loginFormValidator.alias.mensaje = 'Es necesario capturar el Alias';
          this.cambiarDiseñoInput("alias",1);
          return false;
          } else {
          this.loginFormValidator.alias.mensaje = '';
          this.cambiarDiseñoInput("alias");
        }*/
        if (__WEBPACK_IMPORTED_MODULE_9_validator___default.a.isEmpty(this.loginForm.value.telefono)) {
            this.loginFormValidator.telefono.mensaje = 'Es necesario capturar el Teléfono';
            this.cambiarDiseñoInput("telefono", 1);
            return false;
        }
        else {
            this.loginFormValidator.telefono.mensaje = '';
            this.cambiarDiseñoInput("telefono");
        }
        if (__WEBPACK_IMPORTED_MODULE_9_validator___default.a.isEmpty(this.loginForm.value.nacimiento)) {
            this.loginFormValidator.nacimiento.mensaje = 'Es necesario capturar la Fecha de nacimiento';
            this.cambiarDiseñoInput("nacimiento", 1);
            return false;
        }
        else {
            this.loginFormValidator.nacimiento.mensaje = '';
            this.cambiarDiseñoInput("nacimiento");
        }
        return true;
    };
    MisDatosPage.prototype.cambiarDiseñoInput = function (id, color) {
        if (color === void 0) { color = 0; }
        var strColor = color == 1 ? "red" : "white";
        document.getElementById(id).style.backgroundColor = strColor;
    };
    MisDatosPage.prototype.onValueChanges = function () {
        this.loginForm.valueChanges.subscribe(function (val) {
            document.getElementById("editado").value++;
        });
    };
    MisDatosPage.prototype.cancelar = function () {
        this.viewCtrl.dismiss();
    };
    MisDatosPage.prototype.eliminarFacturar = function (id) {
        var _this = this;
        var armaUrl = "invoiceto/regular/" + id;
        this.restService.getToken().timeout(this.restService.timeOver).subscribe(function (data) {
            _this.restService.restServiceDELETEToken(armaUrl, data.toString()).timeout(_this.restService.timeOver).subscribe(function (dataFacturar) {
                if (dataFacturar == true) {
                    _this.alertaService.alertaBasica("Eliminación de RFC", "El RFC se ha eliminado exitosamente", null);
                    var index = _this.facturas.findIndex(function (i) { return i.id === id; });
                    _this.facturas.splice(index, 1);
                }
                else {
                }
            }, function (error) {
                console.log(error);
                _this.alertaService.errorAlert(_this.restService.headerError, _this.restService.mensajeError, null);
            });
        }, function (error) {
            console.log(error);
            _this.alertaService.errorAlert(_this.restService.headerError, _this.restService.mensajeError, null);
        });
    };
    MisDatosPage.prototype.eliminarFacturarAlerta = function (id) {
        var _this = this;
        var alert = this.alertCtrl.create({
            title: 'Confirmar Eliminación',
            message: '¿Seguro que quieres eliminar tus datos?',
            buttons: [
                {
                    text: 'Aceptar',
                    handler: function () {
                        _this.eliminarFacturar(id);
                    }
                },
                {
                    text: 'Cancelar',
                    role: 'cancel',
                    handler: function () {
                    }
                }
            ]
        });
        alert.present();
    };
    MisDatosPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-mis-datos',template:/*ion-inline-start:"C:\Users\Administrador\kenergy\src\pages\mis-datos\mis-datos.html"*/'<ion-header>\n  <ion-navbar color="titulo">\n    <button ion-button menuToggle>\n      <ion-icon name="menu"></ion-icon>\n    </button>\n    \n    <ion-title class="tituloHeader" style="position: absolute;left: 25%; top: 33%;">Mis Datos</ion-title>\n\n    <ion-buttons left  class="animated fadeIn">\n      <button icon-only="" ion-button="" class="disable-hover bar-button bar-button-ios bar-button-default bar-button-default-ios">\n        <span class="button-inner">\n          <img src="assets/imgs/misDatos/usuario.png" style="width: 65%;margin-left: -27px;">\n        </span>\n        <div class="button-effect">\n\n        </div>\n      </button>\n    </ion-buttons>\n  </ion-navbar>\n</ion-header>\n\n<ion-content *ngIf="usuario != null"  padding style="\nbackground-image: url(assets/imgs/fondo.jpg); \nbackground-size: 100%;\nbackground-position: bottom center;\nbackground-repeat: no-repeat;\nbackground-color: white;">\n<input type="hidden" id="editado"/>\n  <form [formGroup]="loginForm">\n  <!--<input id="pts" readonly="true" class="inputText clm widthMedium" style="background-color:#60B1F0; margin-left: 1.2em;"/> Puntos Totales-->\n  <!-- <input id="ptst" readonly="true" class="inputText clm widthMedium" style="background-color:#8b8b8b; margin-left: 1.2em;"/> Puntos Temporales -->\n  <ion-item style="width:100%">\n    <ion-label style="color:#1b155c;" class="labelD">Nombre*</ion-label>\n    <ion-input formControlName="nombre" style="color: #000;" id="nombre"></ion-input>\n  </ion-item>\n  <ion-item style="width:100%">\n    <ion-label style="color:#1b155c;" class="labelD">Contraseña</ion-label>\n    <ion-input formControlName="contra" type="password" style="color: #000;" class="rend" readonly="true" id="contra"></ion-input>\n  </ion-item>\n  <div style="display: inline-block;width: 52%" class="animated fadeIn">\n    <button ion-button color="naranja" class="tituloHeader botonPass" (click)="cambiarContrasenia()">Cambiar Contraseña</button>\n  </div>\n  <ion-item style="width:100%">\n    <ion-label style="color:#1b155c;" class="labelD">E-mail</ion-label>\n    <ion-input formControlName="email" type="email" style="color: #000;" class="rend" readonly="true" id="edad"></ion-input>\n  </ion-item>\n  <div style="display: inline-block;width: 52%" class="animated fadeIn">\n    <button ion-button color="naranja" class="tituloHeader botonPass" (click)="cambiarEmail()">Cambiar E-mail</button>\n  </div>\n  <ion-item style="width:100%">\n    <ion-label style="color:#1b155c;" class="labelD">Alias*</ion-label>\n    <ion-input formControlName="alias" style="color: #000;" id="alias"></ion-input>\n  </ion-item>\n  <ion-item *ngIf="loginFormValidator.alias.mensaje">\n    <ion-label text-wrap color="danger">\n    {{ loginFormValidator.alias.mensaje }}\n    </ion-label>\n  </ion-item>\n  <ion-item style="width:100%">\n    <ion-label style="color:#1b155c;" class="labelD">Teléfono*</ion-label>\n    <ion-input formControlName="telefono" style="color: #000;" class="rend" id="telefono"></ion-input>\n  </ion-item>\n  <ion-item *ngIf="loginFormValidator.telefono.mensaje">\n    <ion-label text-wrap color="danger">\n    {{ loginFormValidator.telefono.mensaje }}\n    </ion-label>\n  </ion-item>\n  <ion-item style="width:100%">\n    <ion-label style="color:#1b155c;" class="labelD">Fecha de nacimiento*</ion-label>\n    <ion-datetime displayFormat="DD/MM/YYYY" formControlName="nacimiento" style="color: #000;" doneText="Aceptar"\n       cancelText="Cancelar" id="nacimiento"></ion-datetime>\n  </ion-item>\n  <ion-item *ngIf="loginFormValidator.nacimiento.mensaje">\n    <ion-label text-wrap color="danger">\n    {{ loginFormValidator.nacimiento.mensaje }}\n    </ion-label>\n  </ion-item>\n\n  <ion-row>\n    <ion-col style="text-align: center">\n    <div class="animated fadeIn">\n      <button ion-button class="tituloHeader botonGuardar" (click)="guardarUsuario()">Guardar</button>\n    </div>\n</ion-col>\n  <ion-col style="text-align: center">\n    <div class="animated fadeIn">\n      <button ion-button class="tituloHeader botonGuardar" style="background-color: red" (click)="cancelar()">Cancelar</button>\n    </div>\n  </ion-col>\n  </ion-row>\n</form>\n\n  <div class="titulo animated rubberBand" (click)="facturarA()">\n    <div class="clm divPresentacionAutos tituloHeader">Facturar A:</div>\n    <ion-icon name="add" class="clm"></ion-icon>\n  </div>\n\n  <div *ngFor="let factura of facturas" class="animated fadeIn">\n      <div style="box-shadow: 0px 0px 6px 1px #b0b2b3;background-color: #001432;\n                  border-radius: 5px;margin-bottom: 9px;padding: 9px;">\n        <strong><div style="font-size:120%;margin-left: 10px;color:#fff">{{factura.rfc}}</div></strong>\n        <div style="font-size:80%;margin-left: 10px;color:#fff">{{factura.razonSocial}}</div>\n        <div style="font-size:80%;margin-left: 10px;color:#fff">{{factura.municipio}},{{factura.estado}}</div>\n        <div style="font-size:80%;margin-left: 10px;font-weight: 500;color:#fff">{{factura.correoElectronico}}</div>\n        <button ion-button clear item-end style="float: right;\n        display: inline-block;\n        padding: 2px 40px;\n        margin-top: -63px;" (click)="editarFacturarA(factura)"><img src="assets/imgs/misDatos/edit1.png" style="width: 16px; color:white;"></button>\n        <button ion-button clear item-end style="float: right;\n        display: inline-block;\n        padding: 2px 5px;\n        margin-top: -63px;" (click)="eliminarFacturarA(factura.id)">\n          <ion-icon name="trash"></ion-icon>\n      </button>\n      </div>\n    </div>\n</ion-content>\n<ion-fab top right class="animated swing">\n  <button ion-fab color="light" (click)="mostrarNotif.abrirNotificacion()">\n      <img src="assets/imgs/home/gas-station.png" alt="logo" class="claseImg animated fadeIn" />\n  </button>\n  <button *ngIf="notificacion.num > 0" ion-fab color="light" (click)="mostrarNotif.abrirNotificacion()" class="miniBoton">\n    {{notificacion.num}}\n</button>\n</ion-fab>'/*ion-inline-end:"C:\Users\Administrador\kenergy\src\pages\mis-datos\mis-datos.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["m" /* NavParams */],
            __WEBPACK_IMPORTED_MODULE_4__ionic_storage__["b" /* Storage */], __WEBPACK_IMPORTED_MODULE_5__providers_alerta_service__["a" /* AlertaServiceProvider */],
            __WEBPACK_IMPORTED_MODULE_6__providers_rest_service__["a" /* RestServiceProvider */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* LoadingController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["b" /* AlertController */],
            __WEBPACK_IMPORTED_MODULE_12__services_notificaciones_service__["a" /* NotificacionService */], __WEBPACK_IMPORTED_MODULE_11__services_abrirnotificaciones_service__["a" /* AbrirnotificacionesService */],
            __WEBPACK_IMPORTED_MODULE_13__services_usuario_service__["a" /* UsuarioService */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["p" /* ViewController */]])
    ], MisDatosPage);
    return MisDatosPage;
}());

//# sourceMappingURL=mis-datos.js.map

/***/ }),

/***/ 161:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return CombustibleModel; });
var CombustibleModel = /** @class */ (function () {
    function CombustibleModel(nombre, precioMagna, precioPremium, precioDiesel, expandible, id, direccion, lat, long, masCerca) {
        if (expandible === void 0) { expandible = false; }
        if (id === void 0) { id = 0; }
        if (direccion === void 0) { direccion = ""; }
        if (lat === void 0) { lat = ""; }
        if (long === void 0) { long = ""; }
        if (masCerca === void 0) { masCerca = false; }
        this.nombre = nombre;
        this.precioMagna = precioMagna;
        this.precioPremium = precioPremium;
        this.precioDiesel = precioDiesel;
        this.expandible = expandible;
        this.id = id;
        this.direccion = direccion;
        this.lat = lat;
        this.long = long;
        this.masCerca = masCerca;
    }
    return CombustibleModel;
}());

//# sourceMappingURL=CombustibleModel.js.map

/***/ }),

/***/ 163:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return HomeEstacionesListPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_alerta_service__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__providers_rest_service__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__angular_common_http__ = __webpack_require__(9);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





/**
 * Generated class for the EstacionesListPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var HomeEstacionesListPage = /** @class */ (function () {
    function HomeEstacionesListPage(navCtrl, navParams, loadingCtrl, alertaService, restService) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.loadingCtrl = loadingCtrl;
        this.alertaService = alertaService;
        this.restService = restService;
        this.estaciones = [];
        this.estaciones = navParams.get("estaciones");
    }
    HomeEstacionesListPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad EstacionesListPage');
    };
    HomeEstacionesListPage.prototype.selectEstacionBuscar = function (estacion) {
        var _this = this;
        var elements = document.getElementsByClassName("popover-content");
        Array.prototype.forEach.call(elements, function (item) {
            item.style.display = "none";
        });
        var elements1 = document.getElementsByClassName("popover-md");
        Array.prototype.forEach.call(elements1, function (item) {
            item.style.display = "none";
        });
        var loading = this.loadingCtrl.create();
        loading.present();
        this.restService.getToken().timeout(this.restService.timeOver).subscribe(function (data) {
            if (data == null) {
                loading.dismiss();
                _this.alertaService.warnAlert(_this.restService.headerValidacion, _this.restService.mensajeValidacionAdmin, null);
            }
            else {
                var body = new __WEBPACK_IMPORTED_MODULE_4__angular_common_http__["d" /* HttpParams */]();
                var armaUrl = "gasoline/price/" + estacion.id;
                _this.restService.restServiceGETToken(armaUrl, new __WEBPACK_IMPORTED_MODULE_4__angular_common_http__["d" /* HttpParams */](), data.toString()).timeout(_this.restService.timeOver).subscribe(function (dataEstacionPrecio) {
                    if (Object.keys(dataEstacionPrecio['Response']).length != 0) {
                        var arrayPrecios = dataEstacionPrecio['Response'];
                        var element = document.getElementsByClassName("nombreEstacion")[0];
                        element.innerText = estacion.nombre;
                        var elementMagna = document.getElementsByClassName("precioGas")[0];
                        elementMagna.innerText = "$" + arrayPrecios[0].Price;
                        var elementPremium = document.getElementsByClassName("precioGas")[1];
                        elementPremium.innerText = "$" + arrayPrecios[1].Price;
                        var elementDiesel = document.getElementsByClassName("precioGas")[2];
                        elementDiesel.innerText = "$" + arrayPrecios[2].Price;
                    }
                    else {
                        _this.alertaService.errorAlert(_this.restService.headerValidacion, "La estación no cuenta con precios", null);
                    }
                    loading.dismiss();
                }, function (error) {
                    console.log(error);
                    _this.alertaService.errorAlert(_this.restService.headerError, _this.restService.mensajeError, null);
                });
            }
        }, function (error) {
            loading.dismiss();
            console.log(error);
            _this.alertaService.errorAlert(_this.restService.headerError, _this.restService.mensajeError, null);
        });
    };
    HomeEstacionesListPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-estaciones-list',template:/*ion-inline-start:"C:\Users\Administrador\kenergy\src\pages\home-credito-estaciones-list\home-estaciones-list.html"*/'<ion-list>\n  <ion-list-header style="color: #fff;\n  background-color: #e77423;\n  text-align: center; margin-bottom: 0px;">Estaciones</ion-list-header>\n  <div style="    color: #000;\n    font-size: 130%;\n    border-bottom: 1px solid #e3e5e6;\n    padding-left: 15px;\n    padding-bottom: 8px;    padding-top: 8px;" *ngFor="let estacion of estaciones" (click)="selectEstacionBuscar(estacion)">\n    {{estacion.nombre}}\n  </div>\n</ion-list>'/*ion-inline-end:"C:\Users\Administrador\kenergy\src\pages\home-credito-estaciones-list\home-estaciones-list.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["m" /* NavParams */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* LoadingController */],
            __WEBPACK_IMPORTED_MODULE_2__providers_alerta_service__["a" /* AlertaServiceProvider */], __WEBPACK_IMPORTED_MODULE_3__providers_rest_service__["a" /* RestServiceProvider */]])
    ], HomeEstacionesListPage);
    return HomeEstacionesListPage;
}());

//# sourceMappingURL=home-estaciones-list.js.map

/***/ }),

/***/ 17:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return NotificacionService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__models_notificacionModel__ = __webpack_require__(662);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};


var NotificacionService = /** @class */ (function () {
    function NotificacionService() {
        this.notificaciones = [new __WEBPACK_IMPORTED_MODULE_1__models_notificacionModel__["a" /* NotificacionModel */](0, "Ganaste vale de $100", "Jue 1 Nov 2018 00:00", "Tienes un mes para pasar a recoger tu vale de $100 en la estación K Energy Orizaba"), new __WEBPACK_IMPORTED_MODULE_1__models_notificacionModel__["a" /* NotificacionModel */](1, "Puntos al Doble!", "Dom 28 Oct 2018 17:55", "Día Lunes 29 oct desde 11:00 hasta 14:00, Puntos al Doble en todas tus cargas")];
        this.num = this.notificaciones.length;
        this.numInicial = this.notificaciones.length;
    }
    NotificacionService = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["A" /* Injectable */])()
    ], NotificacionService);
    return NotificacionService;
}());

//# sourceMappingURL=notificaciones.service.js.map

/***/ }),

/***/ 18:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AbrirnotificacionesService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__pages_notificaciones_notificaciones__ = __webpack_require__(291);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var AbrirnotificacionesService = /** @class */ (function () {
    function AbrirnotificacionesService(modalController) {
        this.modalController = modalController;
    }
    AbrirnotificacionesService.prototype.abrirNotificacion = function () {
        this.nav.push(__WEBPACK_IMPORTED_MODULE_2__pages_notificaciones_notificaciones__["a" /* NotificacionesPage */]);
    };
    AbrirnotificacionesService = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["A" /* Injectable */])(),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* ModalController */]])
    ], AbrirnotificacionesService);
    return AbrirnotificacionesService;
}());

//# sourceMappingURL=abrirnotificaciones.service.js.map

/***/ }),

/***/ 197:
/***/ (function(module, exports) {

var g;

// This works in non-strict mode
g = (function() {
	return this;
})();

try {
	// This works if eval is allowed (see CSP)
	g = g || Function("return this")() || (1,eval)("this");
} catch(e) {
	// This works if the window reference is available
	if(typeof window === "object")
		g = window;
}

// g can still be undefined, but nothing to do about it...
// We return undefined, instead of nothing here, so it's
// easier to handle this case. if(!global) { ...}

module.exports = g;


/***/ }),

/***/ 231:
/***/ (function(module, exports) {

function webpackEmptyAsyncContext(req) {
	// Here Promise.resolve().then() is used instead of new Promise() to prevent
	// uncatched exception popping up in devtools
	return Promise.resolve().then(function() {
		throw new Error("Cannot find module '" + req + "'.");
	});
}
webpackEmptyAsyncContext.keys = function() { return []; };
webpackEmptyAsyncContext.resolve = webpackEmptyAsyncContext;
module.exports = webpackEmptyAsyncContext;
webpackEmptyAsyncContext.id = 231;

/***/ }),

/***/ 273:
/***/ (function(module, exports, __webpack_require__) {

var map = {
	"../pages/agrega-auto-escaner/agrega-auto-escaner.module": [
		274
	],
	"../pages/agrega-auto-info/agrega-auto-info.module": [
		292
	],
	"../pages/agrega-auto/agrega-auto.module": [
		293
	],
	"../pages/agrega-nuevo-llavero/agrega-nuevo-llavero.module": [
		712,
		1
	],
	"../pages/aviso-privacidad/aviso-privacidad.module": [
		328
	],
	"../pages/cambiar-contra/cambiar-contra.module": [
		294
	],
	"../pages/cambiar-email/cambiar-email.module": [
		329
	],
	"../pages/cargas-credito/cargas-credito.module": [
		330
	],
	"../pages/cargas-info-credito/cargas-info-credito.module": [
		332
	],
	"../pages/cargas-info/cargas-info.module": [
		331
	],
	"../pages/cargas-list/cargas-list.module": [
		334
	],
	"../pages/cargas/cargas.module": [
		333
	],
	"../pages/consulta-puntos/consulta-puntos.module": [
		336
	],
	"../pages/contacto/contacto.module": [
		335
	],
	"../pages/datos-facturacion/datos-facturacion.module": [
		337
	],
	"../pages/estaciones-list/estaciones-list.module": [
		371
	],
	"../pages/estaciones/estaciones.module": [
		338
	],
	"../pages/estadisticas-credito/estadisticas-credito.module": [
		352
	],
	"../pages/estadisticas/estadisticas.module": [
		353
	],
	"../pages/estado-cuenta/estado-cuenta.module": [
		354
	],
	"../pages/facturacion-credito/facturacion-credito.module": [
		355
	],
	"../pages/facturacion/facturacion.module": [
		356
	],
	"../pages/home-credito-estaciones-list/home-estaciones-list.module": [
		357
	],
	"../pages/home-credito/home-credito.module": [
		358
	],
	"../pages/home/home.module": [
		359
	],
	"../pages/login/login.module": [
		360
	],
	"../pages/mi-auto-info/mi-auto-info.module": [
		361
	],
	"../pages/mi-auto/mi-auto.module": [
		362
	],
	"../pages/mis-autos/mis-autos.module": [
		364
	],
	"../pages/mis-datos-credito/mis-datos-credito.module": [
		365
	],
	"../pages/mis-datos/mis-datos.module": [
		366
	],
	"../pages/mis-solicitudes/mis-solicitudes.module": [
		713,
		0
	],
	"../pages/notificaciones/notificaciones.module": [
		367
	],
	"../pages/premios-solicitud/premios-solicitud.module": [
		368
	],
	"../pages/premios/premios.module": [
		369
	],
	"../pages/promociones/promociones.module": [
		370
	],
	"../pages/recuperar-contra/recuperar-contra.module": [
		372
	],
	"../pages/registro-credito/registro-credito.module": [
		373
	],
	"../pages/registro-preview/registro-preview.module": [
		375
	],
	"../pages/registro-valida-correo-credito/registro-valida-correo-credito.module": [
		376
	],
	"../pages/registro-valida-credito/registro-valida-credito.module": [
		378
	],
	"../pages/registro-valida/registro-valida.module": [
		379
	],
	"../pages/registro/registro.module": [
		380
	],
	"../pages/terminos/terminos.module": [
		381
	],
	"../pages/vehiculos-credito/vehiculos-credito.module": [
		382
	],
	"../pages/vehiculos-info-credito/vehiculos-info-credito.module": [
		383
	]
};
function webpackAsyncContext(req) {
	var ids = map[req];
	if(!ids)
		return Promise.reject(new Error("Cannot find module '" + req + "'."));
	return Promise.all(ids.slice(1).map(__webpack_require__.e)).then(function() {
		return __webpack_require__(ids[0]);
	});
};
webpackAsyncContext.keys = function webpackAsyncContextKeys() {
	return Object.keys(map);
};
webpackAsyncContext.id = 273;
module.exports = webpackAsyncContext;

/***/ }),

/***/ 274:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AgregaAutoEscanerPageModule", function() { return AgregaAutoEscanerPageModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__agrega_auto_escaner__ = __webpack_require__(275);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};



var AgregaAutoEscanerPageModule = /** @class */ (function () {
    function AgregaAutoEscanerPageModule() {
    }
    AgregaAutoEscanerPageModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["I" /* NgModule */])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_2__agrega_auto_escaner__["a" /* AgregaAutoEscanerPage */],
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* IonicPageModule */].forChild(__WEBPACK_IMPORTED_MODULE_2__agrega_auto_escaner__["a" /* AgregaAutoEscanerPage */]),
            ],
        })
    ], AgregaAutoEscanerPageModule);
    return AgregaAutoEscanerPageModule;
}());

//# sourceMappingURL=agrega-auto-escaner.module.js.map

/***/ }),

/***/ 275:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AgregaAutoEscanerPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ionic_native_barcode_scanner__ = __webpack_require__(276);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__agrega_auto_agrega_auto__ = __webpack_require__(149);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__providers_rest_service__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__providers_alerta_service__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__ionic_storage__ = __webpack_require__(15);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__angular_common_http__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__services_abrirnotificaciones_service__ = __webpack_require__(18);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__services_notificaciones_service__ = __webpack_require__(17);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};










var AgregaAutoEscanerPage = /** @class */ (function () {
    function AgregaAutoEscanerPage(navCtrl, navParams, barcodeScanner, modalController, loadingCtrl, restService, alertaService, localStorage, notificacion, mostrarNotif, viewCtrl, alertCtrl) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.barcodeScanner = barcodeScanner;
        this.modalController = modalController;
        this.loadingCtrl = loadingCtrl;
        this.restService = restService;
        this.alertaService = alertaService;
        this.localStorage = localStorage;
        this.notificacion = notificacion;
        this.mostrarNotif = mostrarNotif;
        this.viewCtrl = viewCtrl;
        this.alertCtrl = alertCtrl;
        this.usuario = null;
        this.llavero = 0;
        this.usuario = navParams.get("usuario");
        if (this.usuario == null) {
            this.openSesion();
        }
    }
    AgregaAutoEscanerPage.prototype.openSesion = function () {
        var _this = this;
        this.localStorage.ready().then(function () {
            _this.localStorage.get("@userSession").then(function (data) {
                if (data != null) {
                    _this.usuario = data;
                }
                else {
                    _this.alertaService.warnAlert(_this.restService.headerValidacion, "Usuario sin sesión, no se cargarán sus datos", null);
                }
            });
        });
    };
    AgregaAutoEscanerPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad AgregaAutoEscanerPage');
    };
    AgregaAutoEscanerPage.prototype.escaner2 = function () {
        this.agregar(1234);
    };
    AgregaAutoEscanerPage.prototype.escaner = function () {
        var _this = this;
        this.barcodeScanner.scan().then(function (barcodeData) {
            _this.agregar(barcodeData.text, 1);
            //this.agregar("12356127421200044102");
            //this.navCtrl.push(AgregaAutoInfoPage, { Id: this.usuario.Id, Puntos: barcodeData.text });
            //this.alertaService.alertaBasica("Bien!","Bar code:" + barcodeData.text	+ " idUser:" + this.usuario.Id,null);
        }).catch(function (err) {
            console.log('Error', err);
            //this.navCtrl.push(AgregaAutoInfoPage);
        });
    };
    AgregaAutoEscanerPage.prototype.agregar = function (codigo, tipo) {
        if (tipo === void 0) { tipo = 0; }
        /*this.restService.getToken().timeout(this.restService.timeOver).subscribe(data => {
          const bodys = new HttpParams()
            .set('Code', codigo)
            .set('Iduser', this.usuario.Id);
        this.restService.restServicePOSTTokenXForm(tipo == 1 ? "user/regular/card" : "usuario/llavero", bodys, data.toString()).timeout(this.restService.timeOver).subscribe(
          dataRegistro => {
            let dato = dataRegistro['Response'];
            //this.alertaService.alertaBasica("Bien!","dato" + JSON.stringify(dataRegistro),null);
            if(dato.Id != undefined && dato.Id != null){
              this.alertaService.alertaBasica("Bien!","Tu llavero ha sido añadido",null);
              this.localStorage.ready().then(() => {
                this.localStorage.get(`@userSession`).then((data2) => {
                  data2.LlaveroContado = dato.Id;
                  this.localStorage.set(`@userSession`, data2);
                  this.usuario = data2;
                });
              });
              this.viewCtrl.dismiss();
            }else{
                if(dataRegistro['Message'] == "6") {
                   this.alertaService.warnAlert("Atención!","Este número de llavero ya fue registrado, intenta nuevamente o contáctanos al <a href='tel:(272) 167 2847'>272 167 2847</a>",null);
                } else {
                     this.alertaService.warnAlert("Atención!",dataRegistro['Message'],null);
                }
            }
          }, error => {
            console.log(error);
                this.alertaService.warnAlert("Error!",error,null);
            this.alertaService.errorAlert(this.restService.headerError, this.restService.mensajeError, null);
          }
        );
        }, error => {
          console.log(error);
          this.alertaService.warnAlert("Error2!",error,null);
          this.alertaService.errorAlert(this.restService.headerError, this.restService.mensajeError, null);
        });*/
        console.log(codigo);
    };
    AgregaAutoEscanerPage.prototype.omitir = function () {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_3__agrega_auto_agrega_auto__["a" /* AgregaAutoPage */]);
    };
    AgregaAutoEscanerPage.prototype.alertaLlaveroExistente = function () {
        var _this = this;
        var alert = this.alertCtrl.create({
            title: '¿Confirmas ser dueño del llavero ' + this.llavero + "?",
            message: 'Al dar clic en ESTOY DE ACUERDO, aceptas los términos y condiciones del programa Amigo Fiel. Consulta nuestro aviso de privacidad en nuestro sitio web.',
            cssClass: 'alertCustomCss3',
            buttons: [
                {
                    text: 'Cancelar',
                    role: 'cancel',
                    handler: function () {
                    }
                },
                {
                    text: 'Estoy de acuerdo',
                    handler: function () {
                        _this.agregar(_this.llavero);
                    }
                }
            ]
        });
        alert.present();
    };
    AgregaAutoEscanerPage.prototype.llaveroNuevo = function () {
        var _this = this;
        var bodys = new __WEBPACK_IMPORTED_MODULE_7__angular_common_http__["d" /* HttpParams */]()
            .set('IdUsuario', this.usuario.Id)
            .set('den', this.usuario.Nombre);
        this.restService.getToken().timeout(this.restService.timeOver).subscribe(function (data) {
            _this.restService.restServicePOSTToken("llavero", bodys, data.toString()).timeout(_this.restService.timeOver).subscribe(function (dataRegistroLast) {
                console.log(dataRegistroLast);
                if (dataRegistroLast > 0) {
                    _this.alertaService.alertaBasica("Registro de llavero", "Tu llavero se ha generado con éxito!", null);
                    _this.localStorage.ready().then(function () {
                        _this.localStorage.get("@userSession").then(function (data2) {
                            data2.LlaveroContado = dataRegistroLast;
                            _this.localStorage.set("@userSession", data2);
                            _this.usuario = data2;
                        });
                    });
                }
            }, function (error) {
                console.log(error);
                _this.alertaService.errorAlert(_this.restService.headerError, _this.restService.mensajeError, null);
            });
        }, function (error) {
            console.log(error);
            _this.alertaService.errorAlert(_this.restService.headerError, _this.restService.mensajeError, null);
        });
    };
    AgregaAutoEscanerPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-agrega-auto-escaner',template:/*ion-inline-start:"C:\Users\Administrador\kenergy\src\pages\agrega-auto-escaner\agrega-auto-escaner.html"*/'<ion-header>\n  <ion-navbar color="titulo">\n    <button ion-button menuToggle>\n      <ion-icon name="menu"></ion-icon>\n    </button>\n    <ion-title class="tituloHeader" style="position: absolute;left: 25%; top: 33%;">Agregar Llavero</ion-title>\n    <ion-buttons left *ngIf="!isOn" class="animated fadeIn">\n      <button icon-only="" ion-button="" class="disable-hover bar-button bar-button-ios bar-button-default bar-button-default-ios">\n        <span class="button-inner">\n          <img src="assets/imgs/miAuto/carro.png" style="width: 65%;margin-left: -27px;">\n        </span>\n        <div class="button-effect">\n        </div>\n      </button>\n    </ion-buttons>\n  </ion-navbar>\n</ion-header>\n\n\n<ion-content padding style="\nbackground-image: url(assets/imgs/fondo.jpg); \nbackground-size: 100%;\nbackground-position: bottom center;\nbackground-repeat: no-repeat;\nbackground-color: white;">\n\n  <div class="tituloHeader" style="font-size: 150%;text-align: justify; margin-top: 12%;">\n    Si cuentas con tu tarjeta amigo fiel, escanea el código de barra\n    o escribe el número de llavero para mantener tus puntos.\n  </div>\n  <img src="assets/imgs/registro/llavero1.png" style="display: block; margin: auto; width: 60%; ">\n  <!--<div style="text-align: center;margin-top: 6%;">\n    <img src="assets/imgs/miAuto/foto.png" style="width: 35%;" (click)="escaner()">\n  </div>-->\n  <!--<div style="width:100%;margin-top: 5%;">\n    <div style="width:47%;display:inline-block">\n      <div style="width: 100%;text-align: center;margin: 1px;">\n        <img src="assets/imgs/miAuto/kanz.png" style="width: 70%;">\n      </div>\n    </div>\n    <div style="width:47%;display:inline-block">\n      <div style="width: 100%;text-align: center;margin: 1px;">\n        <img src="assets/imgs/miAuto/tarjeta2.png" style="width: 70%;">\n      </div>\n    </div>\n  </div>-->\n  <ion-row>\n    <ion-col style="min-width: 70%; padding: 0px;">\n      <ion-item style="width:100%">\n        <ion-label position="floating" style="color:#181560;">No. de cte:</ion-label>\n        <ion-input type="number" [(ngModel)]="llavero" style="color: #000; background-color: silver; height: 80%;"></ion-input>\n        <button item-right style="padding: 0; background-color: silver; height: 80%; margin-right: 0;"><svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"\n	 viewBox="0 0 512 512" style="enable-background:new 0 0 512 512; width: 25px;" xml:space="preserve">\n<g>\n	<g>\n		<g>\n			<circle cx="256" cy="277.333" r="106.667"/>\n			<path d="M469.333,106.667h-67.656c-8.552,0-16.583-3.333-22.635-9.375l-39-39c-10.073-10.073-23.469-15.625-37.719-15.625\n				h-92.646c-14.25,0-27.646,5.552-37.719,15.625l-39,39c-6.052,6.042-14.083,9.375-22.635,9.375H42.667\n				C19.135,106.667,0,125.802,0,149.333v277.333c0,23.531,19.135,42.667,42.667,42.667h426.667\n				c23.531,0,42.667-19.135,42.667-42.667V149.333C512,125.802,492.865,106.667,469.333,106.667z M256,405.333\n				c-70.583,0-128-57.417-128-128s57.417-128,128-128s128,57.417,128,128S326.583,405.333,256,405.333z M426.667,213.333\n				c-11.76,0-21.333-9.573-21.333-21.333s9.573-21.333,21.333-21.333S448,180.24,448,192S438.427,213.333,426.667,213.333z"/>\n		</g>\n	</g>\n</g>\n<g>\n</g>\n<g>\n</g>\n<g>\n</g>\n<g>\n</g>\n<g>\n</g>\n<g>\n</g>\n<g>\n</g>\n<g>\n</g>\n<g>\n</g>\n<g>\n</g>\n<g>\n</g>\n<g>\n</g>\n<g>\n</g>\n<g>\n</g>\n<g>\n</g>\n</svg>\n</button>\n      </ion-item>\n    </ion-col>\n    <ion-col style="min-width: 30%; padding: 0px;">\n      <button ion-button class="tituloHeader botonGuardar" style="background-color: #67C146;" (click)="alertaLlaveroExistente()">Aceptar</button>\n    </ion-col>\n  </ion-row>\n  <!--<div style="margin-top: 5%;font-size: 119%;text-align: center" class="tituloHeader" (click)="omitir()">\n    <u>Omite este paso y continua un nuevo registro de auto</u>\n  </div> -->\n  <div class="tituloHeader" style="font-size: 150%;text-align: justify; margin-top: 12%;">\n    De lo contrario, crea una nueva cuenta presionando el botón de abajo.\n  </div>\n  <ion-row>\n    <ion-col style="min-width: 35%; display: flex; align-items: center;">\n      <button ion-button class="tituloHeader botonGuardar" style="background-color: #2E71E7; white-space: normal; width: 100%;" (click)="llaveroNuevo()">NUEVO CLIENTE</button>\n    </ion-col>\n    <ion-col style="min-width: 65%;">\n      <img src="assets/imgs/registro/Llavero-volteado.png" style="display: block; margin: auto; width: 100%; ">\n    </ion-col>\n  </ion-row>\n</ion-content>\n<ion-fab top right class="animated swing">\n  <button ion-fab color="light" (click)="mostrarNotif.abrirNotificacion()">\n      <img src="assets/imgs/home/gas-station.png" alt="logo" class="claseImg animated fadeIn" />\n  </button>\n  <button *ngIf="notificacion.num > 0" ion-fab color="light" (click)="mostrarNotif.abrirNotificacion()" class="miniBoton">\n    {{notificacion.num}}\n</button>\n</ion-fab>'/*ion-inline-end:"C:\Users\Administrador\kenergy\src\pages\agrega-auto-escaner\agrega-auto-escaner.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["m" /* NavParams */], __WEBPACK_IMPORTED_MODULE_2__ionic_native_barcode_scanner__["a" /* BarcodeScanner */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* ModalController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* LoadingController */], __WEBPACK_IMPORTED_MODULE_4__providers_rest_service__["a" /* RestServiceProvider */], __WEBPACK_IMPORTED_MODULE_5__providers_alerta_service__["a" /* AlertaServiceProvider */],
            __WEBPACK_IMPORTED_MODULE_6__ionic_storage__["b" /* Storage */], __WEBPACK_IMPORTED_MODULE_9__services_notificaciones_service__["a" /* NotificacionService */],
            __WEBPACK_IMPORTED_MODULE_8__services_abrirnotificaciones_service__["a" /* AbrirnotificacionesService */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["p" /* ViewController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["b" /* AlertController */]])
    ], AgregaAutoEscanerPage);
    return AgregaAutoEscanerPage;
}());

//# sourceMappingURL=agrega-auto-escaner.js.map

/***/ }),

/***/ 291:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return NotificacionesPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__services_notificaciones_service__ = __webpack_require__(17);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



/**
 * Generated class for the NotificacionesPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var NotificacionesPage = /** @class */ (function () {
    function NotificacionesPage(navCtrl, navParams, viewCtrl, notificacion) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.viewCtrl = viewCtrl;
        this.notificacion = notificacion;
    }
    NotificacionesPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad NotificacionesPage');
    };
    NotificacionesPage.prototype.cancelar = function () {
        this.viewCtrl.dismiss();
    };
    NotificacionesPage.prototype.borrarTodasNotificaciones = function () {
        this.notificacion.notificaciones = [];
    };
    NotificacionesPage.prototype.borrarNotificacion = function (id) {
        for (var index = 0; index < this.notificacion.numInicial; index++) {
            if (this.notificacion.notificaciones[index] != null) {
                if (id == this.notificacion.notificaciones[index].id) {
                    if (!this.notificacion.notificaciones[index].visto)
                        this.notificacion.num--;
                    this.notificacion.notificaciones.splice(index, 1);
                }
            }
        }
    };
    NotificacionesPage.prototype.mostrarNotificacion = function (id) {
        for (var index = 0; index < this.notificacion.numInicial; index++) {
            if (this.notificacion.notificaciones[index] != null) {
                if (id == this.notificacion.notificaciones[index].id) {
                    this.notificacion.notificaciones[index].mostrar = this.notificacion.notificaciones[index].mostrar ? false : true;
                    if (!this.notificacion.notificaciones[index].visto)
                        this.notificacion.num--;
                    this.notificacion.notificaciones[index].visto = true;
                }
            }
        }
    };
    NotificacionesPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-notificaciones',template:/*ion-inline-start:"C:\Users\Administrador\kenergy\src\pages\notificaciones\notificaciones.html"*/'  <ion-header>\n    <ion-navbar color="titulo">\n      <button ion-button menuToggle>\n        <ion-icon name="menu"></ion-icon>\n      </button>\n      \n      <ion-title class="tituloHeader" style="position: absolute;left: 25%; top: 33%;">Notificaciones</ion-title>\n  \n      <ion-buttons left  class="animated fadeIn">\n        <button icon-only="" ion-button="" class="disable-hover bar-button bar-button-ios bar-button-default bar-button-default-ios">\n          <span class="button-inner">\n            <img src="assets/imgs/home/info.png" style="width: 65%;margin-left: -27px;">\n          </span>\n          <div class="button-effect">\n  \n          </div>\n        </button>\n      </ion-buttons>\n    </ion-navbar>\n  </ion-header>\n\n<ion-content padding style="\nbackground-image: url(assets/imgs/fondo.jpg); \nbackground-size: 100%;\nbackground-position: bottom center;\nbackground-repeat: no-repeat;\nbackground-color: white;">\n  <div class="alignRight" style="margin-bottom: 9px;margin-top: 5%;">\n    <strong><a (click)="borrarTodasNotificaciones()" style="color:#c1272d">Borrar todo</a></strong>\n  </div>\n  <div *ngFor="let notif of notificacion.notificaciones" (click)="mostrarNotificacion(notif.id)">\n    <div style="box-shadow: 0px 0px 6px 1px #b0b2b3;\n                border-radius: 18px;margin-bottom: 9px;padding: 9px;" \n                [style.height]="notif.mostrar ? \'9em\' : \'4em\'"\n                [style.background-color]="notif.visto ? \'white\' : \'#10358a\'"\n                [style.color]="notif.visto ? \'black\' : \'white\'">\n      <strong><div style="font-size:120%;margin-left: 10px;">{{notif.titulo}}</div></strong>\n      <button ion-button clear item-end style="float: right;\n      display: inline-block;\n      padding: 2px 5px;\n      margin-top: -1.9em;" (click)="borrarNotificacion(notif.id)"><ion-icon name="close"></ion-icon></button>\n      <div style="font-size:80%;margin-left: 10px;">{{notif.fecha}}</div>\n      <div [style.display]="notif.mostrar ? \'block\' : \'none\'">\n      <div style="font-size:110%;margin-left: 10px;font-weight: 500; text-align: justify; margin-top: 7px;">{{notif.mensaje}}</div>\n      </div>\n    </div>\n  </div>\n</ion-content>\n\n<ion-fab top right class="animated swing">\n  <button ion-fab color="light" style="">\n      <img src="assets/imgs/home/gas-station.png" alt="logo" class="claseImg animated fadeIn" />\n  </button>\n  <button *ngIf="notificacion.num > 0" ion-fab color="light" class="miniBoton">\n    {{notificacion.num}}\n</button>\n</ion-fab>'/*ion-inline-end:"C:\Users\Administrador\kenergy\src\pages\notificaciones\notificaciones.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["m" /* NavParams */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["p" /* ViewController */], __WEBPACK_IMPORTED_MODULE_2__services_notificaciones_service__["a" /* NotificacionService */]])
    ], NotificacionesPage);
    return NotificacionesPage;
}());

//# sourceMappingURL=notificaciones.js.map

/***/ }),

/***/ 292:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AgregaAutoInfoPageModule", function() { return AgregaAutoInfoPageModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__agrega_auto_info__ = __webpack_require__(663);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};



var AgregaAutoInfoPageModule = /** @class */ (function () {
    function AgregaAutoInfoPageModule() {
    }
    AgregaAutoInfoPageModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["I" /* NgModule */])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_2__agrega_auto_info__["a" /* AgregaAutoInfoPage */],
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* IonicPageModule */].forChild(__WEBPACK_IMPORTED_MODULE_2__agrega_auto_info__["a" /* AgregaAutoInfoPage */]),
            ],
        })
    ], AgregaAutoInfoPageModule);
    return AgregaAutoInfoPageModule;
}());

//# sourceMappingURL=agrega-auto-info.module.js.map

/***/ }),

/***/ 293:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AgregaAutoPageModule", function() { return AgregaAutoPageModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__agrega_auto__ = __webpack_require__(149);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_forms__ = __webpack_require__(20);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};




var AgregaAutoPageModule = /** @class */ (function () {
    function AgregaAutoPageModule() {
    }
    AgregaAutoPageModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["I" /* NgModule */])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_2__agrega_auto__["a" /* AgregaAutoPage */],
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_3__angular_forms__["f" /* ReactiveFormsModule */],
                __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* IonicPageModule */].forChild(__WEBPACK_IMPORTED_MODULE_2__agrega_auto__["a" /* AgregaAutoPage */]),
            ],
        })
    ], AgregaAutoPageModule);
    return AgregaAutoPageModule;
}());

//# sourceMappingURL=agrega-auto.module.js.map

/***/ }),

/***/ 294:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CambiarContraPageModule", function() { return CambiarContraPageModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__cambiar_contra__ = __webpack_require__(155);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};



var CambiarContraPageModule = /** @class */ (function () {
    function CambiarContraPageModule() {
    }
    CambiarContraPageModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["I" /* NgModule */])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_2__cambiar_contra__["a" /* CambiarContraPage */],
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* IonicPageModule */].forChild(__WEBPACK_IMPORTED_MODULE_2__cambiar_contra__["a" /* CambiarContraPage */]),
            ],
        })
    ], CambiarContraPageModule);
    return CambiarContraPageModule;
}());

//# sourceMappingURL=cambiar-contra.module.js.map

/***/ }),

/***/ 295:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ContactoPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__models_contactoModel__ = __webpack_require__(665);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_native_app_availability__ = __webpack_require__(296);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__services_notificaciones_service__ = __webpack_require__(17);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__services_abrirnotificaciones_service__ = __webpack_require__(18);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__services_usuario_service__ = __webpack_require__(59);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__aviso_privacidad_aviso_privacidad__ = __webpack_require__(157);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__providers_rest_service__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__providers_alerta_service__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__angular_common_http__ = __webpack_require__(9);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};











var ContactoPage = /** @class */ (function () {
    function ContactoPage(navCtrl, navParams, appAvailability, notificacion, alertCtrl, mostrarNotif, usuarioService, restService, alertaService) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.appAvailability = appAvailability;
        this.notificacion = notificacion;
        this.alertCtrl = alertCtrl;
        this.mostrarNotif = mostrarNotif;
        this.usuarioService = usuarioService;
        this.restService = restService;
        this.alertaService = alertaService;
        this.telefonos = [];
        this.mensajeCRoja = "";
        this.mensajeBomberos = "";
        this.faceNavegador = "";
        this.faceApp = "";
        this.instaNavegador = "";
        this.instaApp = "";
        this.cargarContactos();
    }
    ContactoPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad ContactoPage');
    };
    ContactoPage.prototype.abrirPaginaFacebook = function () {
        var _this = this;
        this.appAvailability.check("com.facebook.katana")
            .then(function (yes) { return window.open(_this.faceApp, "_system"); }, function (no) { return window.open(_this.faceNavegador, "_system"); });
    };
    ContactoPage.prototype.abrirPaginaInstagram = function () {
        var _this = this;
        this.appAvailability.check("com.instagram.android")
            .then(function (yes) { return window.open(_this.instaApp, "_system"); }, function (no) { return window.open(_this.instaNavegador, "_system"); });
    };
    ContactoPage.prototype.alertaCruz = function () {
        var alert = this.alertCtrl.create({
            title: 'Seleccione la ciudad',
            message: this.mensajeCRoja,
            buttons: [
                {
                    text: 'Cancelar',
                    role: 'cancel',
                    handler: function () {
                    }
                }
            ]
        });
        alert.present();
    };
    ContactoPage.prototype.alertaBomberos = function () {
        var alert = this.alertCtrl.create({
            title: 'Seleccione la ciudad',
            message: this.mensajeBomberos,
            buttons: [
                {
                    text: 'Cancelar',
                    role: 'cancel',
                    handler: function () {
                    }
                }
            ]
        });
        alert.present();
    };
    ContactoPage.prototype.openAvisoPrivacidad = function () {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_7__aviso_privacidad_aviso_privacidad__["a" /* AvisoPrivacidadPage */], {});
    };
    ContactoPage.prototype.cargarContactos = function () {
        var _this = this;
        this.restService.getToken().timeout(this.restService.timeOver).subscribe(function (data) {
            if (data == null) {
                _this.alertaService.warnAlert(_this.restService.headerValidacion, _this.restService.mensajeValidacionAdmin, null);
            }
            else {
                var idApp = _this.usuarioService.tipo == 1 ? "4" : "3";
                var url = "contactos/" + idApp;
                _this.restService.restServiceGETToken(url, new __WEBPACK_IMPORTED_MODULE_10__angular_common_http__["d" /* HttpParams */](), data.toString()).timeout(_this.restService.timeOver).subscribe(function (dataRegistro) {
                    if (Object.keys(dataRegistro['Response']).length != 0) {
                        var contactos = dataRegistro['Response'];
                        contactos.forEach(function (contacto) {
                            switch (contacto.Tipo) {
                                case 1: {
                                    _this.telefonos.push(new __WEBPACK_IMPORTED_MODULE_2__models_contactoModel__["a" /* ContactoModel */](contacto.Imagen, contacto.Valor, contacto.Descripcion));
                                    break;
                                }
                                case 2: {
                                    _this.mensajeCRoja += "<a href='tel:" + contacto.Valor + "'>" + contacto.Descripcion + "</a><br/>";
                                    break;
                                }
                                case 3: {
                                    _this.mensajeBomberos += "<a href='tel:" + contacto.Valor + "'>" + contacto.Descripcion + "</a><br/>";
                                    break;
                                }
                                case 4: {
                                    _this.faceNavegador = contacto.Descripcion === "n" ? contacto.Valor : _this.faceNavegador;
                                    _this.faceApp = contacto.Descripcion === "p" ? contacto.Valor : _this.faceApp;
                                    break;
                                }
                                case 5: {
                                    _this.whatsapp = contacto.Valor;
                                    break;
                                }
                                case 6: {
                                    _this.instaNavegador = contacto.Descripcion === "n" ? contacto.Valor : _this.instaNavegador;
                                    _this.instaApp = contacto.Descripcion === "p" ? contacto.Valor : _this.instaApp;
                                    break;
                                }
                            }
                        });
                    }
                    else {
                        _this.alertaService.warnAlert(_this.restService.headerValidacion, "No se encontraron registros de contacto", null);
                    }
                    _this.telefonos.push(new __WEBPACK_IMPORTED_MODULE_2__models_contactoModel__["a" /* ContactoModel */]("911.png", "911", "Emergencias"));
                    _this.telefonos.push(new __WEBPACK_IMPORTED_MODULE_2__models_contactoModel__["a" /* ContactoModel */]("soporte-vial.png", "074", "Auxilio Vial"));
                    _this.telefonos.push(new __WEBPACK_IMPORTED_MODULE_2__models_contactoModel__["a" /* ContactoModel */]("angeles-verdes.png", "078", "Ángeles Verdes"));
                }, function (error) {
                    console.log(error);
                    _this.alertaService.errorAlert(_this.restService.headerError, _this.restService.mensajeError, null);
                });
            }
        }, function (error) {
            console.log(error);
            _this.alertaService.errorAlert(_this.restService.headerError, _this.restService.mensajeError, null);
        });
    };
    ContactoPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-contacto',template:/*ion-inline-start:"C:\Users\Administrador\kenergy\src\pages\contacto\contacto.html"*/'<ion-header>\n  <ion-navbar color="titulo">\n    <button ion-button menuToggle>\n      <ion-icon name="menu"></ion-icon>\n    </button>\n    <ion-title class="tituloHeader" style="position: absolute;left: 25%; top: 33%;">Contacto</ion-title>\n\n\n    <ion-buttons left *ngIf="!isOn" class="animated fadeIn">\n      <button icon-only="" ion-button="" class="disable-hover bar-button bar-button-ios bar-button-default bar-button-default-ios">\n        <span class="button-inner">\n          <img src="assets/imgs/contacto/contacto.png" style="width: 65%;margin-left: -27px;">\n        </span>\n        <div class="button-effect">\n\n        </div>\n      </button>\n    </ion-buttons>\n  </ion-navbar>\n</ion-header>\n\n\n<ion-content padding style="\n        background-image: url(assets/imgs/fondo.jpg); \n    background-size: 100%;\n    background-position: bottom center;\n    background-repeat: no-repeat;\n    background-color: white;" class="animated fadeIn">\n  <div style="width:100%;border-bottom: 1px solid #6a6b6b;">\n    <div style="width:24%;display:inline-block;text-align: center;margin-bottom: 16px;">\n      <a (click)="abrirPaginaFacebook()"><img src="assets/imgs/contacto/facebook.png" style="    width: 67%;"></a>\n    </div>\n    <!-- <div style="width:24%;display:inline-block;text-align: center;margin-bottom: 16px;">\n    	<a href="tel:272-167-2847" ><img src="assets/imgs/contacto/telefono.png" style="    width: 67%;"></a>\n    </div> -->\n    <div style="width:24%;display:inline-block;text-align: center;margin-bottom: 16px;">\n      <a href="https://api.whatsapp.com/send?phone={{whatsapp}}"><img src="assets/imgs/contacto/whatsapp.png" style="    width: 67%;"></a>\n    </div>\n    <div style="width:24%;display:inline-block;text-align: center;margin-bottom: 16px;">\n      <a (click)="abrirPaginaInstagram()"><img src="assets/imgs/contacto/instagram.png" style="    width: 67%;"></a>\n    </div>\n    <div style="width:24%;display:inline-block;text-align: center;margin-bottom: 16px;">\n    	<img src="assets/imgs/contacto/twitter.png" style="    width: 67%;">\n    </div>\n  </div>\n  <div style="width:100%">\n    <div style="width:48%;display:inline-block;text-align: center;margin-bottom: 8px;margin-top: 10px" *ngFor="let telefono of telefonos">\n      <a href="tel:{{telefono.telefono}}" ><img src="assets/imgs/contacto/{{telefono.imagen}}" style="width: 32%;box-shadow: 1px 1px 1px #123;\n      border-radius: 156px;"></a>\n      <!-- <div style="margin-top:5px">{{telefono.telefono}}</div> -->\n      <div style="margin-top:5px; font-size: 20px;">{{telefono.descripcion}}</div>\n    </div>\n    <div style="width:48%;display:inline-block;text-align: center;margin-bottom: 8px;margin-top: 10px">\n      <img src="assets/imgs/contacto/ambulancia.png" style="width: 32%;box-shadow: 1px 1px 1px #123;\n      border-radius: 156px;" (click)="alertaCruz()">\n      <div style="margin-top:5px; font-size: 20px;">Cruz roja</div>\n    </div>\n    <div style="width:48%;display:inline-block;text-align: center;margin-bottom: 8px;margin-top: 10px">\n      <img src="assets/imgs/contacto/bpmberos.png" style="width: 32%;box-shadow: 1px 1px 1px #123;\n      border-radius: 156px;" (click)="alertaBomberos()">\n      <div style="margin-top:5px; font-size: 20px;">Bomberos</div>\n    </div>\n  </div>\n  <div style="display:inline-block;width:43%;text-align: center; margin-top: 10%;" (click)="openAvisoPrivacidad()"><a style="color:darkblue;font-size: 100%;">Aviso\n    de Privacidad</a></div>\n</ion-content>\n\n<ion-fab top right class="animated swing">\n  <button ion-fab color="light" (click)="mostrarNotif.abrirNotificacion()">\n      <img src="assets/imgs/home/gas-station.png" alt="logo" class="claseImg animated fadeIn" />\n  </button>\n  <button *ngIf="notificacion.num > 0" ion-fab color="light" (click)="mostrarNotif.abrirNotificacion()" class="miniBoton">\n    {{notificacion.num}}\n</button>\n</ion-fab>'/*ion-inline-end:"C:\Users\Administrador\kenergy\src\pages\contacto\contacto.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["m" /* NavParams */], __WEBPACK_IMPORTED_MODULE_3__ionic_native_app_availability__["a" /* AppAvailability */],
            __WEBPACK_IMPORTED_MODULE_4__services_notificaciones_service__["a" /* NotificacionService */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["b" /* AlertController */], __WEBPACK_IMPORTED_MODULE_5__services_abrirnotificaciones_service__["a" /* AbrirnotificacionesService */],
            __WEBPACK_IMPORTED_MODULE_6__services_usuario_service__["a" /* UsuarioService */], __WEBPACK_IMPORTED_MODULE_8__providers_rest_service__["a" /* RestServiceProvider */], __WEBPACK_IMPORTED_MODULE_9__providers_alerta_service__["a" /* AlertaServiceProvider */]])
    ], ContactoPage);
    return ContactoPage;
}());

//# sourceMappingURL=contacto.js.map

/***/ }),

/***/ 297:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return PremiosPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__models_premioModel__ = __webpack_require__(666);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__providers_alerta_service__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__providers_rest_service__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__ionic_storage__ = __webpack_require__(15);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__angular_common_http__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__angular_forms__ = __webpack_require__(20);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};








var PremiosPage = /** @class */ (function () {
    function PremiosPage(navCtrl, navParams, modalController, localStorage, alertaService, restService, loadingCtrl) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.modalController = modalController;
        this.localStorage = localStorage;
        this.alertaService = alertaService;
        this.restService = restService;
        this.loadingCtrl = loadingCtrl;
        this.usuario = null;
        this.premios = [];
        this.parametro = null;
        this.seleccionados = [];
        this.loginForm = new __WEBPACK_IMPORTED_MODULE_7__angular_forms__["b" /* FormGroup */]({
            puntos: new __WEBPACK_IMPORTED_MODULE_7__angular_forms__["a" /* FormControl */](0),
            puntos2: new __WEBPACK_IMPORTED_MODULE_7__angular_forms__["a" /* FormControl */](0)
        });
        this.openSesion();
    }
    PremiosPage.prototype.openSesion = function () {
        var _this = this;
        this.localStorage.ready().then(function () {
            _this.localStorage.get("@userSession").then(function (data) {
                if (data != null) {
                    _this.usuario = data;
                    _this.obtenerPuntos();
                    console.log(JSON.stringify(_this.usuario));
                    _this.cargarPremios();
                }
                else {
                    _this.alertaService.warnAlert(_this.restService.headerValidacion, "Usuario sin sesión, no se cargarán sus datos", null);
                }
            });
        });
    };
    PremiosPage.prototype.cargarPremios = function () {
        var _this = this;
        if (this.usuario == null) {
            this.alertaService.warnAlert(this.restService.headerValidacion, "Usuario no en sesión", null);
        }
        else {
            var loading_1 = this.loadingCtrl.create();
            loading_1.present();
            this.restService.getToken().timeout(this.restService.timeOver).subscribe(function (data) {
                if (data == null) {
                    loading_1.dismiss();
                    _this.alertaService.warnAlert(_this.restService.headerValidacion, _this.restService.mensajeValidacionAdmin, null);
                }
                else {
                    var body = new __WEBPACK_IMPORTED_MODULE_6__angular_common_http__["d" /* HttpParams */]();
                    var a = _this.usuario.Id;
                    var url = "prize/";
                    //var urlArmada = "stats/"+this.usuario.IdClient;
                    _this.restService.restServiceGETToken(url, body, data.toString()).timeout(_this.restService.timeOver).subscribe(function (dataRegistro) {
                        if (dataRegistro.length != 0) {
                            var premiosRes = dataRegistro;
                            premiosRes.forEach(function (premio) {
                                _this.premios.push(new __WEBPACK_IMPORTED_MODULE_2__models_premioModel__["a" /* PremioModel */](premio.DescriptionShort, premio.Money, premio.Points, premio.Money, premio.UrlImage, premio.Name, premio.DescriptionLong, premio.Id, premio.Clave));
                            });
                        }
                        else if (dataRegistro['Message'] != 3) {
                            _this.alertaService.warnAlert(_this.restService.headerValidacion, dataRegistro['Message'], null);
                        }
                        else {
                            _this.alertaService.warnAlert(_this.restService.headerValidacion, "No se encontraron registros de facturación", null);
                        }
                        loading_1.dismiss();
                    }, function (error) {
                        loading_1.dismiss();
                        console.log(error);
                        _this.alertaService.errorAlert(_this.restService.headerError, _this.restService.mensajeError, null);
                    });
                }
            }, function (error) {
                loading_1.dismiss();
                console.log(error);
                _this.alertaService.errorAlert(_this.restService.headerError, _this.restService.mensajeError, null);
            });
        }
    };
    PremiosPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad PremiosPage');
    };
    PremiosPage.prototype.canjear = function () {
        this.alertaService.alertaBasica("Canje de puntos", "Los puntos son suficientes para el canje", null);
        /*let modal = this.modalController.create(PremiosSolicitudPage, { premios: this.premios, usuario: this.usuario});
        modal.present();
        modal.onDidDismiss((data) => {
    
        });*/
    };
    PremiosPage.prototype.obtenerPuntos = function () {
        var _this = this;
        this.restService.getToken().timeout(this.restService.timeOver).subscribe(function (data) {
            if (data == null) {
                _this.alertaService.warnAlert(_this.restService.headerValidacion, _this.restService.mensajeValidacionAdmin, null);
            }
            else {
                var body = new __WEBPACK_IMPORTED_MODULE_6__angular_common_http__["d" /* HttpParams */]();
                _this.restService.restServiceGETToken("user/regular/" + _this.usuario.Id, body, data.toString()).timeout(_this.restService.timeOver).subscribe(function (dataRegistroLast) {
                    _this.loginForm.patchValue({
                        puntos: dataRegistroLast['Response'].Puntos,
                        puntos2: dataRegistroLast['Response'].Puntos
                    });
                }, function (error) {
                    console.log(error);
                    _this.alertaService.errorAlert(_this.restService.headerError, _this.restService.mensajeError, null);
                });
            }
        }, function (error) {
            console.log(error);
            _this.alertaService.errorAlert(_this.restService.headerError, _this.restService.mensajeError, null);
        });
    };
    PremiosPage.prototype.restarPuntos = function (cbox, id, tipo) {
        if (tipo === void 0) { tipo = 0; }
        console.log(this.seleccionados);
        var resta = 0;
        for (var i = 0; i < this.premios.length; i++) {
            var puntos = tipo == 1 ? this.premios[i].canjeOpcional : this.premios[i].canje;
            if (this.premios[i].id == id) {
                if (!this.premios[i].seleccionado) {
                    resta = this.loginForm.value.puntos + puntos;
                }
                else {
                    resta = this.loginForm.value.puntos - +puntos;
                    if (resta < 0) {
                        this.alertaService.errorAlert("Error al seleccionar premio", "Punto insuficientes, elimina uno o mas artículos", null);
                        resta = this.loginForm.value.puntos;
                        cbox.checked = false;
                    }
                }
                this.premios[i].seleccionado = false;
                this.loginForm.patchValue({
                    puntos: resta
                });
            }
        }
    };
    PremiosPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-premios',template:/*ion-inline-start:"C:\Users\Administrador\kenergy\src\pages\premios\premios.html"*/'<ion-header>\n  <ion-navbar color="titulo">\n    <button ion-button menuToggle>\n      <ion-icon name="menu"></ion-icon>\n    </button>\n    <ion-title class="tituloHeader" style="position: absolute;left: 25%; top: 33%;">Catálogo de Premios</ion-title>\n\n\n    <ion-buttons left *ngIf="!isOn" class="animated fadeIn">\n      <button icon-only="" ion-button="" class="disable-hover bar-button bar-button-ios bar-button-default bar-button-default-ios">\n        <span class="button-inner">\n          <img src="assets/imgs/premios/promo.png" style="width: 65%;margin-left: -27px;">\n        </span>\n        <div class="button-effect">\n\n        </div>\n      </button>\n    </ion-buttons>\n  </ion-navbar>\n</ion-header>\n\n\n<ion-content padding style="\n    background-image: url(assets/imgs/fondo.jpg); \n    background-size: 100%;\n    background-position: bottom center;\n    background-repeat: no-repeat;\n    background-color: white;" class="animated fadeIn">\n    <div style="color: #333a98;text-align: center;font-size: 120%;font-weight: 500;margin-bottom: 10px">\n      Puntos: {{loginForm.value.puntos}}</div>\n      <p *ngIf="loginForm.value.puntos < loginForm.value.puntos2" style="text-align: justify;">Los puntos son suficientes para canjear los premios seleccionados. Artículos sujetos a disponibilidad, acude a tu estación mas cercana lo antes posible. El ultimo día para canje es el 31 de diciembre del año en curso. </p>\n      <div *ngIf="loginForm.value.puntos < loginForm.value.puntos2" style="color: #333a98;text-align: center;font-size: 120%;font-weight: 500;margin-bottom: 10px" (click)="canjear()"><u>Canjear\n        Puntos</u></div>\n  <div style="width:100%;text-align: center">\n    <div *ngFor="let premio of premios" style="display:inline-block;width: 46%;margin: 3px;">\n      <div style="border: 1px solid #c3c3c3;">\n        <div>\n          <img src="{{premio.img}}" style="width: 100%;">\n        </div>\n      </div>\n      <div style="border: 1px solid #c3c3c3;">\n        <div style="font-size: 70%;">\n          <strong>{{premio.descripcion}}</strong>\n        </div>\n        <div style="font-size: 100%;color: #432f7f">\n          <ion-checkbox [(ngModel)]="premio.seleccionado" color="primary" style="margin-right: 0.6em;" (ionChange)="restarPuntos($event,premio.id)"> </ion-checkbox><strong>{{premio.canje}} PUNTOS</strong>\n        </div>\n        <div style="font-size: 80%;">\n          ó llévatelo por\n        </div>\n        <div style="font-size: 100%;color: #a81f58;font-style: italic;">\n          <ion-checkbox [(ngModel)]="premio.seleccionado" color="primary" style="margin-right: 0.6em;" (ionChange)="restarPuntos($event,premio.id,1)"> </ion-checkbox><strong>{{premio.canjeOpcional}} PUNTOS + ${{premio.monto}}</strong>\n        </div>\n      </div>\n    </div>\n  </div>\n</ion-content>'/*ion-inline-end:"C:\Users\Administrador\kenergy\src\pages\premios\premios.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["m" /* NavParams */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* ModalController */],
            __WEBPACK_IMPORTED_MODULE_5__ionic_storage__["b" /* Storage */],
            __WEBPACK_IMPORTED_MODULE_3__providers_alerta_service__["a" /* AlertaServiceProvider */], __WEBPACK_IMPORTED_MODULE_4__providers_rest_service__["a" /* RestServiceProvider */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* LoadingController */]])
    ], PremiosPage);
    return PremiosPage;
}());

//# sourceMappingURL=premios.js.map

/***/ }),

/***/ 298:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return PromocionesPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__models_promocionModel__ = __webpack_require__(667);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__terminos_terminos__ = __webpack_require__(299);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__services_abrirnotificaciones_service__ = __webpack_require__(18);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__services_notificaciones_service__ = __webpack_require__(17);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};






var PromocionesPage = /** @class */ (function () {
    function PromocionesPage(navCtrl, navParams, modalController, notificacion, mostrarNotif) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.modalController = modalController;
        this.notificacion = notificacion;
        this.mostrarNotif = mostrarNotif;
        this.promociones = [];
        this.promociones.push(new __WEBPACK_IMPORTED_MODULE_2__models_promocionModel__["a" /* PromocionModel */]("Vales de Gasolina", "Al escanear tu código QR en cada carga participas en la rifa mensual de vales de gasolina por $100.00 c/u.", "promo1.png", "• Todos los clientes que cuenten y utilicen su llavero participan en el sorteo. • Los ganadores son seleccionados de manera aleatoriaa inicio de mes.• Serán 15 ganadores al alzar por cada estación de servicio; (Ixtaczoquitlán, Orizaba, Córdoba y Veracruz). • Las listas de los ganadores son publicadas en la página de Facebook: www.facebook.com/GasolineraKANZ, y en las estaciones de servicio. • Consulta las listas y conoce si fuiste uno de los afortunados ganadores. • Se da a conocer el nombre del ganador con el que se realizó el registro y el no. de cliente que se encuentras al reverso de tu tarjeta de cliente frecuente."));
        this.promociones.push(new __WEBPACK_IMPORTED_MODULE_2__models_promocionModel__["a" /* PromocionModel */]("Aspirado Gratis!", "¡Aspiramos tu Auto¡ Válido en cargas de 20 Lt en autos y 30 Lt en camionetas o vans..", "promo2.png", "• Todos los clientes que cuenten y utilicen su llavero participan en el sorteo. • Los ganadores son seleccionados de manera aleatoriaa inicio de mes.• Serán 15 ganadores al alzar por cada estación de servicio; (Ixtaczoquitlán, Orizaba, Córdoba y Veracruz). • Las listas de los ganadores son publicadas en la página de Facebook: www.facebook.com/GasolineraKANZ, y en las estaciones de servicio. • Consulta las listas y conoce si fuiste uno de los afortunados ganadores. • Se da a conocer el nombre del ganador con el que se realizó el registro y el no. de cliente que se encuentras al reverso de tu tarjeta de cliente frecuente."));
    }
    PromocionesPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad PromocionesPage');
    };
    PromocionesPage.prototype.openPromo = function (promocion) {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_3__terminos_terminos__["a" /* TerminosPage */], { promocion: promocion });
    };
    PromocionesPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-promociones',template:/*ion-inline-start:"C:\Users\Administrador\kenergy\src\pages\promociones\promociones.html"*/'<ion-header>\n  <ion-navbar color="titulo">\n    <button ion-button menuToggle>\n      <ion-icon name="menu"></ion-icon>\n    </button>\n    <ion-title class="tituloHeader" style="position: absolute;left: 25%; top: 33%;">Promociones</ion-title>\n\n\n    <ion-buttons left *ngIf="!isOn" class="animated fadeIn">\n      <button icon-only="" ion-button="" class="disable-hover bar-button bar-button-ios bar-button-default bar-button-default-ios">\n        <span class="button-inner">\n          <img src="assets/imgs/promociones/promocion.png" style="width: 65%;margin-left: -27px;">\n        </span>\n        <div class="button-effect">\n\n        </div>\n      </button>\n    </ion-buttons>\n  </ion-navbar>\n</ion-header>\n\n\n<ion-content padding style="\n    background-image: url(assets/imgs/fondo.jpg); \n    background-size: 100%;\n    background-position: bottom center;\n    background-repeat: no-repeat;\n    background-color: white;" class="animated fadeIn">\n\n  <div *ngFor="let promocion of promociones">\n    <div style="color: #1b1464;\n      font-weight: 700;\n      font-size: 150%;" (click)="openPromo(promocion)">\n      <u>{{promocion.titulo}}</u>\n    </div>\n    <div style="font-size: 108%;\n      margin-top: 6px;\n      margin-bottom: 3px;">\n      {{promocion.descripcion}}\n    </div>\n    <div style="margin-bottom: 10px">\n      <img src="assets/imgs/promociones/{{promocion.img}}" style="width: 100%;box-shadow: 1px 1px 1px #123;">\n    </div>\n  </div>\n</ion-content>\n<ion-fab top right class="animated swing">\n  <button ion-fab color="light" (click)="mostrarNotif.abrirNotificacion()">\n      <img src="assets/imgs/home/gas-station.png" alt="logo" class="claseImg animated fadeIn" />\n  </button>\n  <button *ngIf="notificacion.num > 0" ion-fab color="light" (click)="mostrarNotif.abrirNotificacion()" class="miniBoton">\n    {{notificacion.num}}\n</button>\n</ion-fab>'/*ion-inline-end:"C:\Users\Administrador\kenergy\src\pages\promociones\promociones.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["m" /* NavParams */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* ModalController */],
            __WEBPACK_IMPORTED_MODULE_5__services_notificaciones_service__["a" /* NotificacionService */], __WEBPACK_IMPORTED_MODULE_4__services_abrirnotificaciones_service__["a" /* AbrirnotificacionesService */]])
    ], PromocionesPage);
    return PromocionesPage;
}());

//# sourceMappingURL=promociones.js.map

/***/ }),

/***/ 299:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return TerminosPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__services_abrirnotificaciones_service__ = __webpack_require__(18);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__services_notificaciones_service__ = __webpack_require__(17);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




/**
 * Generated class for the TerminosPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var TerminosPage = /** @class */ (function () {
    function TerminosPage(navCtrl, navParams, viewCtrl, notificacion, mostrarNotif) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.viewCtrl = viewCtrl;
        this.notificacion = notificacion;
        this.mostrarNotif = mostrarNotif;
        this.promocion = navParams.get("promocion");
    }
    TerminosPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad TerminosPage');
    };
    TerminosPage.prototype.dismiss = function () {
        this.viewCtrl.dismiss();
    };
    TerminosPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-terminos',template:/*ion-inline-start:"C:\Users\Administrador\kenergy\src\pages\terminos\terminos.html"*/'<ion-header>\n  <ion-navbar color="titulo">\n    <button ion-button menuToggle>\n      <ion-icon name="menu"></ion-icon>\n    </button>\n    <ion-title class="tituloHeader" style="position: absolute;left: 25%; top: 33%;">Promoción</ion-title>\n    <ion-buttons left *ngIf="!isOn" class="animated fadeIn">\n      <button icon-only="" ion-button="" class="disable-hover bar-button bar-button-ios bar-button-default bar-button-default-ios">\n        <span class="button-inner">\n          <img src="assets/imgs/promociones/promocion.png" style="width: 65%;margin-left: -27px;">\n        </span>\n        <div class="button-effect">\n\n        </div>\n      </button>\n    </ion-buttons>\n  </ion-navbar>\n</ion-header>\n\n<ion-content padding style="\n    background-image: url(assets/imgs/fondo.jpg); \n    background-size: 100%;\n    background-position: bottom center;\n    background-repeat: no-repeat;\n    background-color: white;">\n  <div style="color: #1b1464;font-weight: 700;font-size: 150%;" (click)="openPromo(promocion)">\n    <u>{{promocion.titulo}}</u>\n  </div>\n  <div style="font-size: 108%;margin-top: 6px;margin-bottom: 3px;">\n    {{promocion.descripcion}}\n  </div>\n  <div style="margin-bottom: 10px">\n    <img src="assets/imgs/promociones/{{promocion.img}}" style="width: 100%;box-shadow: 1px 1px 1px #123;">\n  </div>\n  <div style="text-align: justify;font-size: 120%;">\n    {{promocion.terminos}}\n  </div>\n</ion-content>\n<ion-fab top right class="animated swing">\n  <button ion-fab color="light" (click)="mostrarNotif.abrirNotificacion()">\n      <img src="assets/imgs/home/gas-station.png" alt="logo" class="claseImg animated fadeIn" />\n  </button>\n  <button *ngIf="notificacion.num > 0" ion-fab color="light" (click)="mostrarNotif.abrirNotificacion()" class="miniBoton">\n    {{notificacion.num}}\n</button>\n</ion-fab>'/*ion-inline-end:"C:\Users\Administrador\kenergy\src\pages\terminos\terminos.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["m" /* NavParams */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["p" /* ViewController */],
            __WEBPACK_IMPORTED_MODULE_3__services_notificaciones_service__["a" /* NotificacionService */], __WEBPACK_IMPORTED_MODULE_2__services_abrirnotificaciones_service__["a" /* AbrirnotificacionesService */]])
    ], TerminosPage);
    return TerminosPage;
}());

//# sourceMappingURL=terminos.js.map

/***/ }),

/***/ 300:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return FacturacionPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__models_productoModel__ = __webpack_require__(47);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__providers_rest_service__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__providers_alerta_service__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__ionic_storage__ = __webpack_require__(15);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__angular_common_http__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__ionic_native_file_transfer___ = __webpack_require__(82);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__ionic_native_file__ = __webpack_require__(83);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__ionic_native_file_opener___ = __webpack_require__(101);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__services_facturacion_service__ = __webpack_require__(102);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__services_notificaciones_service__ = __webpack_require__(17);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__services_abrirnotificaciones_service__ = __webpack_require__(18);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};













var FacturacionPage = /** @class */ (function () {
    function FacturacionPage(navCtrl, navParams, localStorage, alertaService, restService, loadingCtrl, transfer, file, fileOpener, facturacionService, notificacion, mostrarNotif) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.localStorage = localStorage;
        this.alertaService = alertaService;
        this.restService = restService;
        this.loadingCtrl = loadingCtrl;
        this.transfer = transfer;
        this.file = file;
        this.fileOpener = fileOpener;
        this.facturacionService = facturacionService;
        this.notificacion = notificacion;
        this.mostrarNotif = mostrarNotif;
        this.desde = "";
        this.hasta = new Date().toISOString();
        this.vehiculos = [];
        this.idVehiculo = 0;
        this.estaciones = [];
        this.idEstacion = 0;
        this.facturas = [];
        this.usuario = null;
        //this.hasta.setDate(this.desde.getDate() + 1);
        this.openSesion();
    }
    FacturacionPage.prototype.openSesion = function () {
        var _this = this;
        this.localStorage.ready().then(function () {
            _this.localStorage.get("@userSession").then(function (data) {
                if (data != null) {
                    _this.usuario = data;
                    _this.cargarCombos();
                }
                else {
                    _this.alertaService.warnAlert(_this.restService.headerValidacion, "Usuario sin sesión, no se cargarán sus datos", null);
                }
            });
        });
    };
    FacturacionPage.prototype.cargarCombos = function () {
        var _this = this;
        var loading = this.loadingCtrl.create();
        loading.present();
        var desdeDate = new Date();
        desdeDate.setDate(desdeDate.getDate() - 30);
        this.desde = desdeDate.toISOString();
        this.vehiculos = [];
        this.vehiculos.push(new __WEBPACK_IMPORTED_MODULE_2__models_productoModel__["a" /* ProductoModel */](0, "Todos"));
        this.estaciones = [];
        this.estaciones.push(new __WEBPACK_IMPORTED_MODULE_2__models_productoModel__["a" /* ProductoModel */](0, "Todas"));
        this.restService.getToken().timeout(this.restService.timeOver).subscribe(function (data) {
            if (data == null) {
                loading.dismiss();
                _this.alertaService.warnAlert(_this.restService.headerValidacion, _this.restService.mensajeValidacionAdmin, null);
            }
            else {
                var body = new __WEBPACK_IMPORTED_MODULE_6__angular_common_http__["d" /* HttpParams */]();
                var a = _this.usuario.Id;
                //var a = 44;
                //body.append("IdClient", a.toString());
                var urlArmada = "stats/regular/" + a;
                //var urlArmada = "stats/"+this.usuario.IdClient;
                _this.restService.restServiceGETToken(urlArmada, body, data.toString()).timeout(_this.restService.timeOver).subscribe(function (dataRegistro) {
                    if (Object.keys(dataRegistro['Response']).length != 0) {
                        var estaciones = dataRegistro['Response'].Estacion;
                        estaciones.forEach(function (estacion) {
                            _this.estaciones.push(new __WEBPACK_IMPORTED_MODULE_2__models_productoModel__["a" /* ProductoModel */](estacion.Id, estacion.Nombre));
                        });
                        var vehiculos = dataRegistro['Response'].Vehiculo;
                        vehiculos.forEach(function (vehiculo) {
                            _this.vehiculos.push(new __WEBPACK_IMPORTED_MODULE_2__models_productoModel__["a" /* ProductoModel */](vehiculo.Id, vehiculo.Nombre));
                        });
                        //this.buscar();
                    }
                    else {
                        _this.alertaService.warnAlert(_this.restService.headerValidacion, "No se cargaron los filtros de búsqueda", null);
                    }
                    loading.dismiss();
                }, function (error) {
                    loading.dismiss();
                    console.log(error);
                    _this.alertaService.errorAlert(_this.restService.headerError, _this.restService.mensajeError, null);
                });
            }
        }, function (error) {
            loading.dismiss();
            console.log(error);
            _this.alertaService.errorAlert(_this.restService.headerError, _this.restService.mensajeError, null);
        });
    };
    FacturacionPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad FacturacionPage');
    };
    FacturacionPage.prototype.buscar = function () {
        var _this = this;
        if (this.usuario == null) {
            this.alertaService.warnAlert(this.restService.headerValidacion, "Usuario no en sesión", null);
        }
        else {
            this.facturas = [];
            var arrFecha = this.desde.split("T");
            var fechaDesde = arrFecha[0].split("-");
            var fechaFormat = "";
            var arrFecha2 = this.hasta.split("T");
            var fechaHasta = arrFecha2[0].split("-");
            var fechaFormatHasta = "";
            if (fechaDesde.length < 3) {
                //this.alertaService.warnAlert(this.restService.headerValidacion, "Selecciona una fecha de inicio", null);
            }
            else {
                // año/ mes/ dia
                fechaFormat = fechaDesde[2] + "/" + fechaDesde[1] + "/" + fechaDesde[0];
            }
            if (fechaHasta.length < 3) {
                //this.alertaService.warnAlert(this.restService.headerValidacion, "Selecciona una fecha de fin", null);
            }
            else {
                // año/ mes/ dia
                fechaFormatHasta = fechaHasta[2] + "/" + fechaHasta[1] + "/" + fechaHasta[0];
            }
            var loading_1 = this.loadingCtrl.create();
            loading_1.present();
            this.restService.getToken().timeout(this.restService.timeOver).subscribe(function (data) {
                if (data == null) {
                    loading_1.dismiss();
                    _this.alertaService.warnAlert(_this.restService.headerValidacion, _this.restService.mensajeValidacionAdmin, null);
                }
                else {
                    var body = new __WEBPACK_IMPORTED_MODULE_6__angular_common_http__["d" /* HttpParams */]();
                    var a = _this.usuario.Id;
                    var url = "invoice/regular?" + "IdUser=" + a + "&Desde=" + fechaFormat + "&Hasta=" + fechaFormatHasta + "&IdEstacion=" + _this.idEstacion;
                    console.log(url);
                    if (_this.idVehiculo != 0) {
                        url += "&IdVehiculo=" + _this.idVehiculo;
                    }
                    //var urlArmada = "stats/"+this.usuario.IdClient;
                    _this.restService.restServiceGETToken(url, body, data.toString()).timeout(_this.restService.timeOver).subscribe(function (dataRegistro) {
                        if (Object.keys(dataRegistro['Response']).length != 0) {
                            var facturas = dataRegistro['Response'];
                            facturas.forEach(function (carga) {
                                _this.facturas.push({
                                    fecha: carga.Fecha,
                                    precio: carga.Efectivo,
                                    id: carga.Id,
                                    auto: carga.Auto,
                                    idEstacion: carga.CodEstacion,
                                    email: carga.Email,
                                    nombreEst: carga.CodEstacion == 1 ? "K ENERGY 1" : carga.CodEstacion == 2 ? "K ENERGY 2" : "K ENERGY 3"
                                });
                            });
                        }
                        else if (dataRegistro['Message'] != 3) {
                            _this.alertaService.warnAlert(_this.restService.headerValidacion, dataRegistro['Message'], null);
                        }
                        else {
                            _this.alertaService.warnAlert(_this.restService.headerValidacion, "No se encontraron registros de facturación", null);
                        }
                        loading_1.dismiss();
                    }, function (error) {
                        loading_1.dismiss();
                        console.log(error);
                        _this.alertaService.errorAlert(_this.restService.headerError, _this.restService.mensajeError, null);
                    });
                }
            }, function (error) {
                loading_1.dismiss();
                console.log(error);
                _this.alertaService.errorAlert(_this.restService.headerError, _this.restService.mensajeError, null);
            });
        }
    };
    FacturacionPage.prototype.sendCorreo = function (factura) {
        var _this = this;
        if (this.usuario == null) {
            this.alertaService.warnAlert(this.restService.headerValidacion, "Usuario no en sesión", null);
        }
        else {
            var loading_2 = this.loadingCtrl.create();
            loading_2.present();
            this.restService.getToken().timeout(this.restService.timeOver).subscribe(function (data) {
                if (data == null) {
                    loading_2.dismiss();
                    _this.alertaService.warnAlert(_this.restService.headerValidacion, _this.restService.mensajeValidacionAdmin, null);
                }
                else {
                    var body = new __WEBPACK_IMPORTED_MODULE_6__angular_common_http__["d" /* HttpParams */]();
                    var a = _this.usuario.Id;
                    var url = "invoice/email?" + "IdFactura=" + factura.id + "&IdEstacion =" + _this.idEstacion;
                    console.log(url);
                    //var urlArmada = "stats/"+this.usuario.IdClient;
                    _this.restService.restServiceGETToken(url, body, data.toString()).timeout(_this.restService.timeOver).subscribe(function (dataRegistro) {
                        if (dataRegistro['Response']) {
                            _this.alertaService.alertaBasica("¡Bien!", "Tu factura ha sido enviada a tu correo, favor de revisarlo", null);
                        }
                        else if (dataRegistro['Message'] != 3) {
                            _this.alertaService.warnAlert(_this.restService.headerValidacion, dataRegistro['Message'], null);
                        }
                        else {
                            _this.alertaService.warnAlert(_this.restService.headerValidacion, "No se encontraron registros de facturación", null);
                        }
                        loading_2.dismiss();
                    }, function (error) {
                        loading_2.dismiss();
                        console.log(error);
                        _this.alertaService.errorAlert(_this.restService.headerError, _this.restService.mensajeError, null);
                    });
                }
            }, function (error) {
                loading_2.dismiss();
                console.log(error);
                _this.alertaService.errorAlert(_this.restService.headerError, _this.restService.mensajeError, null);
            });
        }
    };
    FacturacionPage.prototype.sendPdf = function (factura) {
        var _this = this;
        if (this.usuario == null) {
            this.alertaService.warnAlert(this.restService.headerValidacion, "Usuario no en sesión", null);
        }
        else {
            var loading_3 = this.loadingCtrl.create();
            loading_3.present();
            this.restService.getToken().timeout(this.restService.timeOver).subscribe(function (data) {
                if (data == null) {
                    loading_3.dismiss();
                    _this.alertaService.warnAlert(_this.restService.headerValidacion, _this.restService.mensajeValidacionAdmin, null);
                }
                else {
                    var body = new __WEBPACK_IMPORTED_MODULE_6__angular_common_http__["d" /* HttpParams */]();
                    var a = _this.usuario.Id;
                    var url = "invoice/pdf?" + "IdFactura=" + factura.id + "&IdEstacion =" + _this.idEstacion;
                    //var urlArmada = "stats/"+this.usuario.IdClient;
                    _this.restService.restServiceGETToken(url, body, data.toString()).timeout(_this.restService.timeOver).subscribe(function (dataRegistro) {
                        if (dataRegistro['Response'].length != 0) {
                            //Agregar la lógica para visualizar pdf ya que aqui se recibe el url
                        }
                        else if (dataRegistro['Message'] != 3) {
                            _this.alertaService.warnAlert(_this.restService.headerValidacion, dataRegistro['Message'], null);
                        }
                        else {
                            _this.alertaService.warnAlert(_this.restService.headerValidacion, "No se encontraron registros de facturación", null);
                        }
                        loading_3.dismiss();
                    }, function (error) {
                        loading_3.dismiss();
                        console.log(error);
                        _this.alertaService.errorAlert(_this.restService.headerError, _this.restService.mensajeError, null);
                    });
                }
            }, function (error) {
                loading_3.dismiss();
                console.log(error);
                _this.alertaService.errorAlert(_this.restService.headerError, _this.restService.mensajeError, null);
            });
        }
    };
    FacturacionPage.prototype.downloadFactura = function (factura) {
        /*
        /api/invoice/pdf/ Int:IdFactura, int:IdEstacion,  IdClient =  */
        var _this = this;
        var fileTransfer = this.transfer.create();
        var loading = this.loadingCtrl.create();
        loading.present();
        this.restService.getToken().timeout(this.restService.timeOver).subscribe(function (data) {
            if (data == null) {
                loading.dismiss();
                _this.alertaService.warnAlert(_this.restService.headerValidacion, _this.restService.mensajeValidacionAdmin, null);
            }
            else {
                var body = new __WEBPACK_IMPORTED_MODULE_6__angular_common_http__["d" /* HttpParams */]();
                var a = _this.usuario.IdClient;
                var url = "invoice/pdf?IdFactura=" + factura.id + "&IdEstacion=" + _this.idEstacion + "&IdClient=" + _this.usuario.IdClient;
                _this.restService.restServiceGETToken(url, body, data.toString()).timeout(_this.restService.timeOver).subscribe(function (dataRegistro) {
                    fileTransfer.download(dataRegistro['Response'], _this.file.externalDataDirectory + 'file.pdf').then(function (entry) {
                        //this.alertaService.alertaBasica(this.restService.headerExito, "Se ha descargado correctamente en: " + entry.toURL(), null);
                        _this.fileOpener.open(_this.file.externalDataDirectory + 'file.pdf', 'application/pdf')
                            .then(function () { return console.log("Abrio correctament"); } /*this.alertaService.alertaBasica(this.restService.headerExito, "Se abrio correctamente", null)*/)
                            .catch(function (e) { return _this.alertaService.errorAlert(_this.restService.headerError, "No se pudo abrir, no existe aplicación compatible " + e, null); });
                    }, function (error) {
                        _this.alertaService.errorAlert(_this.restService.headerError, "ERROR descarga = " + error, null);
                    });
                    ////////////XML
                    ////////////XML
                    loading.dismiss();
                }, function (error) {
                    loading.dismiss();
                    console.log(error);
                    _this.alertaService.errorAlert(_this.restService.headerError, _this.restService.mensajeError, null);
                });
            }
        }, function (error) {
            loading.dismiss();
            console.log(error);
            _this.alertaService.errorAlert(_this.restService.headerError, _this.restService.mensajeError, null);
        });
    };
    FacturacionPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-facturacion',template:/*ion-inline-start:"C:\Users\Administrador\kenergy\src\pages\facturacion\facturacion.html"*/'<ion-header>\n  <ion-navbar color="titulo">\n    <button ion-button menuToggle>\n      <ion-icon name="menu"></ion-icon>\n    </button>\n    <ion-title class="tituloHeader" style="position: absolute;left: 25%; top: 33%;">Facturación</ion-title>\n\n    <ion-buttons end>\n      <button ion-button (click)="presentPopover($event)" style="color:#fff">\n        <ion-icon name="more"></ion-icon>\n      </button>\n    </ion-buttons>\n\n\n    <ion-buttons left *ngIf="!isOn" class="animated fadeIn">\n      <button icon-only="" ion-button="" class="disable-hover bar-button bar-button-ios bar-button-default bar-button-default-ios">\n        <span class="button-inner">\n          <img src="assets/imgs/facturacion/factura.png" style="width: 65%;margin-left: -27px;">\n        </span>\n        <div class="button-effect">\n\n        </div>\n      </button>\n    </ion-buttons>\n  </ion-navbar>\n</ion-header>\n\n\n<ion-content padding style="\n  background-image: url(assets/imgs/fondo.jpg); \n  background-size: 100%;\n  background-position: bottom center;\n  background-repeat: no-repeat;\n  background-color: white;">\n    <ion-item style="width:100%">\n      <ion-label style="color:#1b155c;">Desde</ion-label>\n      <ion-datetime displayFormat="DD/MM/YYYY" [(ngModel)]="desde" style="color: #000;" \n      doneText="Aceptar" cancelText="Cancelar" (ionChange)="buscar()"></ion-datetime>\n    </ion-item>\n    <ion-item style="width:100%">\n      <ion-label style="color:#1b155c;">Hasta</ion-label>\n      <ion-datetime displayFormat="DD/MM/YYYY" [(ngModel)]="hasta" style="color: #000;" \n      doneText="Aceptar" cancelText="Cancelar" (ionChange)="buscar()"></ion-datetime>\n    </ion-item>\n  <ion-item style="width:100%">\n    <ion-label position="floating" style="color:#1b155c;">Estación</ion-label>\n    <ion-select [(ngModel)]="idEstacion" style="color:#000" okText="Aceptar" \n    cancelText="Cancelar" (ionChange)="buscar()">\n      <ion-option *ngFor="let estacion of estaciones" value="{{estacion.id}}">{{estacion.descripcion}}</ion-option>\n    </ion-select>\n  </ion-item>\n\n  <ion-item style="width:100%">\n    <ion-label position="floating" style="color:#1b155c;">Vehículo</ion-label>\n    <ion-select [(ngModel)]="idVehiculo" style="color:#000" okText="Aceptar" \n    cancelText="Cancelar" (ionChange)="buscar()"> \n      <ion-option *ngFor="let vehiculo of vehiculos" value="{{vehiculo.id}}">{{vehiculo.descripcion}}</ion-option>\n    </ion-select>\n  </ion-item>\n\n  <ion-list class="animated fadeIn">\n    <ion-item *ngFor="let factura of facturas" class="itemList">\n      <div style="width:100%">\n        <div style="display:inline-block;width:20%" (click)="facturacionService.downloadFactura(factura.id, factura.idEstacion)">\n          <img src="assets/imgs/facturacion/invoice.png" style="width: 44px;">\n        </div>\n        <div style="display:inline-block;width:68%">\n          <div style="width:100%">\n            <div style="width:48%;display: inline-block;font-weight: lighter;" class="tituloHeader">{{factura.auto}}</div>\n            <div style="width:48%;display: inline-block;font-weight: lighter;" class="tituloHeader">{{factura.nombreEst}}</div>\n          </div>\n          <div style="width:100%">\n            <div style="width:48%;display: inline-block;font-weight: lighter;" class="tituloHeader">{{factura.fecha}}</div>\n            <div style="width:48%;display: inline-block;font-weight: lighter;" class="tituloHeader">${{factura.precio}}</div>\n          </div>\n        </div>\n        <div style="display:inline-block;text-align: right;">\n          <ion-icon name="mail" style="font-size: 25px;" (click)="facturacionService.mostrarEnvio(factura.id, factura.idEstacion, factura.email)"></ion-icon>\n      </div>\n        <!--<div style="width:10%;display: inline-block;">\n          <div style="text-align: center;">\n            <ion-icon name="download"></ion-icon>\n          </div>\n          <div style="text-align: center;">\n            <ion-icon name="mail"></ion-icon>\n          </div>\n        </div>-->\n      </div>\n    </ion-item>\n  </ion-list>\n</ion-content>\n<ion-fab top right class="animated swing">\n  <button ion-fab color="light" (click)="mostrarNotif.abrirNotificacion()">\n      <img src="assets/imgs/home/gas-station.png" alt="logo" class="claseImg animated fadeIn" />\n  </button>\n  <button *ngIf="notificacion.num > 0" ion-fab color="light" (click)="mostrarNotif.abrirNotificacion()" class="miniBoton">\n    {{notificacion.num}}\n</button>\n</ion-fab>'/*ion-inline-end:"C:\Users\Administrador\kenergy\src\pages\facturacion\facturacion.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["m" /* NavParams */],
            __WEBPACK_IMPORTED_MODULE_5__ionic_storage__["b" /* Storage */],
            __WEBPACK_IMPORTED_MODULE_4__providers_alerta_service__["a" /* AlertaServiceProvider */], __WEBPACK_IMPORTED_MODULE_3__providers_rest_service__["a" /* RestServiceProvider */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* LoadingController */], __WEBPACK_IMPORTED_MODULE_7__ionic_native_file_transfer___["a" /* FileTransfer */], __WEBPACK_IMPORTED_MODULE_8__ionic_native_file__["a" /* File */], __WEBPACK_IMPORTED_MODULE_9__ionic_native_file_opener___["a" /* FileOpener */],
            __WEBPACK_IMPORTED_MODULE_10__services_facturacion_service__["a" /* FacturacionService */], __WEBPACK_IMPORTED_MODULE_11__services_notificaciones_service__["a" /* NotificacionService */], __WEBPACK_IMPORTED_MODULE_12__services_abrirnotificaciones_service__["a" /* AbrirnotificacionesService */]])
    ], FacturacionPage);
    return FacturacionPage;
}());

//# sourceMappingURL=facturacion.js.map

/***/ }),

/***/ 301:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return CargasPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__cargas_list_cargas_list__ = __webpack_require__(158);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__providers_alerta_service__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__providers_rest_service__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__models_productoModel__ = __webpack_require__(47);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__angular_common_http__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__cargas_info_cargas_info__ = __webpack_require__(302);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__ionic_storage__ = __webpack_require__(15);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__services_facturacion_service__ = __webpack_require__(102);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__services_abrirnotificaciones_service__ = __webpack_require__(18);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__services_notificaciones_service__ = __webpack_require__(17);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};













var CargasPage = /** @class */ (function () {
    function CargasPage(navCtrl, navParams, popoverCtrl, localStorage, alertaService, restService, loadingCtrl, alertCtrl, facturacionService, notificacion, mostrarNotif) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.popoverCtrl = popoverCtrl;
        this.localStorage = localStorage;
        this.alertaService = alertaService;
        this.restService = restService;
        this.loadingCtrl = loadingCtrl;
        this.alertCtrl = alertCtrl;
        this.facturacionService = facturacionService;
        this.notificacion = notificacion;
        this.mostrarNotif = mostrarNotif;
        this.cargas = [];
        this.desde = "";
        this.hasta = new Date().toISOString();
        this.vehiculos = [];
        this.idVehiculo = 0;
        this.estaciones = [];
        this.idEstacion = 0;
        this.idEstacionTemp = 0;
        this.openSesion();
    }
    CargasPage.prototype.openSesion = function () {
        var _this = this;
        this.localStorage.ready().then(function () {
            _this.localStorage.get("@userSession").then(function (data) {
                if (data != null) {
                    _this.usuario = data;
                    _this.cargarCombos();
                }
                else {
                    _this.alertaService.warnAlert(_this.restService.headerValidacion, "Usuario sin sesión, no se cargarán sus datos", null);
                }
            });
        });
    };
    CargasPage.prototype.cargarCombos = function () {
        var _this = this;
        var loading = this.loadingCtrl.create();
        loading.present();
        var desdeDate = new Date();
        desdeDate.setDate(desdeDate.getDate() - 30);
        this.desde = desdeDate.toISOString();
        this.vehiculos = [];
        this.vehiculos.push(new __WEBPACK_IMPORTED_MODULE_5__models_productoModel__["a" /* ProductoModel */](0, "Todos"));
        this.estaciones = [];
        this.estaciones.push(new __WEBPACK_IMPORTED_MODULE_5__models_productoModel__["a" /* ProductoModel */](0, "Todas"));
        this.restService.getToken().timeout(this.restService.timeOver).subscribe(function (data) {
            if (data == null) {
                loading.dismiss();
                _this.alertaService.warnAlert(_this.restService.headerValidacion, _this.restService.mensajeValidacionAdmin, null);
            }
            else {
                var body = new __WEBPACK_IMPORTED_MODULE_6__angular_common_http__["d" /* HttpParams */]();
                var a = _this.usuario.Id;
                //var a = 44;
                //body.append("IdClient", a.toString());
                var urlArmada = "stats/regular/" + a;
                //var urlArmada = "stats/"+this.usuario.IdClient;
                _this.restService.restServiceGETToken(urlArmada, body, data.toString()).timeout(_this.restService.timeOver).subscribe(function (dataRegistro) {
                    if (Object.keys(dataRegistro['Response']).length != 0) {
                        var estaciones = dataRegistro['Response'].Estacion;
                        estaciones.forEach(function (estacion) {
                            _this.estaciones.push(new __WEBPACK_IMPORTED_MODULE_5__models_productoModel__["a" /* ProductoModel */](estacion.Id, estacion.Nombre));
                        });
                        var vehiculos = dataRegistro['Response'].Vehiculo;
                        vehiculos.forEach(function (vehiculo) {
                            _this.vehiculos.push(new __WEBPACK_IMPORTED_MODULE_5__models_productoModel__["a" /* ProductoModel */](vehiculo.Id, vehiculo.Nombre));
                        });
                        //this.buscar();
                    }
                    else {
                        _this.alertaService.warnAlert(_this.restService.headerValidacion, "No se cargaron los filtros de búsqueda", null);
                    }
                    loading.dismiss();
                }, function (error) {
                    loading.dismiss();
                    console.log(error);
                    _this.alertaService.errorAlert(_this.restService.headerError, _this.restService.mensajeError, null);
                });
            }
        }, function (error) {
            loading.dismiss();
            console.log(error);
            _this.alertaService.errorAlert(_this.restService.headerError, _this.restService.mensajeError, null);
        });
    };
    CargasPage.prototype.ionViewDidLoad = function () {
    };
    CargasPage.prototype.presentPopover = function (myEvent) {
        var popover = this.popoverCtrl.create(__WEBPACK_IMPORTED_MODULE_2__cargas_list_cargas_list__["a" /* CargasListPage */], { cargas: this.cargas });
        popover.present({
            ev: myEvent
        });
    };
    CargasPage.prototype.buscar = function () {
        var _this = this;
        if (this.usuario == null) {
            this.alertaService.warnAlert(this.restService.headerValidacion, "Usuario no en sesión", null);
        }
        else {
            this.cargas = [];
            var arrFecha = this.desde.split("T");
            var fechaDesde = arrFecha[0].split("-");
            var fechaFormat = "";
            var arrFecha2 = this.hasta.split("T");
            var fechaHasta = arrFecha2[0].split("-");
            var fechaFormatHasta = "";
            if (fechaDesde.length < 3) {
                //this.alertaService.warnAlert(this.restService.headerValidacion, "Selecciona una fecha de inicio", null);
            }
            else {
                // año/ mes/ dia
                fechaFormat = fechaDesde[2] + "/" + fechaDesde[1] + "/" + fechaDesde[0];
            }
            if (fechaHasta.length < 3) {
                //this.alertaService.warnAlert(this.restService.headerValidacion, "Selecciona una fecha de fin", null);
            }
            else {
                // año/ mes/ dia
                fechaFormatHasta = fechaHasta[2] + "/" + fechaHasta[1] + "/" + fechaHasta[0];
            }
            var loading_1 = this.loadingCtrl.create();
            loading_1.present();
            this.restService.getToken().timeout(this.restService.timeOver).subscribe(function (data) {
                if (data == null) {
                    loading_1.dismiss();
                    _this.alertaService.warnAlert(_this.restService.headerValidacion, _this.restService.mensajeValidacionAdmin, null);
                }
                else {
                    var body = new __WEBPACK_IMPORTED_MODULE_6__angular_common_http__["d" /* HttpParams */]();
                    var a = _this.usuario.Id;
                    var url = "despachos/regular/" + a + "?Desde=" + fechaFormat + "&Hasta=" + fechaFormatHasta + "&IdEstacion=" + _this.idEstacion;
                    if (_this.idVehiculo != 0) {
                        url += "&IdVehiculo=" + _this.idVehiculo;
                    }
                    console.log(url);
                    //var urlArmada = "stats/"+this.usuario.IdClient;
                    _this.restService.restServiceGETToken(url, body, data.toString()).timeout(_this.restService.timeOver).subscribe(function (dataRegistro) {
                        if (Object.keys(dataRegistro['Response']).length != 0) {
                            var cargas = dataRegistro['Response'];
                            cargas.forEach(function (carga) {
                                _this.cargas.push({
                                    fecha: carga.Fecha,
                                    lts: carga.Litros,
                                    precio: carga.Efectivo,
                                    id: carga.Id,
                                    estacion: carga.Estacion,
                                    auto: carga.Auto,
                                    producto: carga.Producto,
                                    km: carga.Kilometraje,
                                    facturada: carga.Facturada,
                                    facturable: carga.Facturable,
                                    idFactura: carga.IdFactura,
                                    idEstacion: carga.IdEstacion,
                                    email: carga.Email
                                });
                                _this.idEstacionTemp = _this.idEstacion;
                            });
                        }
                        else if (dataRegistro['Message'] != 3) {
                            _this.alertaService.warnAlert(_this.restService.headerValidacion, dataRegistro['Message'], null);
                        }
                        else {
                            _this.alertaService.warnAlert("Sin cargas!", "No se encontraron registros en el periodo seleccionado", null);
                        }
                        loading_1.dismiss();
                    }, function (error) {
                        loading_1.dismiss();
                        console.log(error);
                        _this.alertaService.errorAlert(_this.restService.headerError, _this.restService.mensajeError, null);
                    });
                }
            }, function (error) {
                loading_1.dismiss();
                console.log(error);
                _this.alertaService.errorAlert(_this.restService.headerError, _this.restService.mensajeError, null);
            });
        }
    };
    CargasPage.prototype.openCarga = function (carga) {
        var _this = this;
        var b = this.usuario.Id;
        var loading = this.loadingCtrl.create();
        loading.present();
        this.restService.getToken().timeout(this.restService.timeOver).subscribe(function (data) {
            if (data == null) {
                loading.dismiss();
                _this.alertaService.warnAlert(_this.restService.headerValidacion, _this.restService.mensajeValidacionAdmin, null);
            }
            else {
                var body = new __WEBPACK_IMPORTED_MODULE_6__angular_common_http__["d" /* HttpParams */]();
                var a = _this.usuario.IdClient;
                //var a = 44;
                //this.idEstacion = 1;
                var url = "despachos/regular/detail/" + carga.id + "?IdEstacion=" + carga.idEstacion;
                console.log("q " + url);
                //var urlArmada = "stats/"+this.usuario.IdClient;
                _this.restService.restServiceGETToken(url, body, data.toString()).timeout(_this.restService.timeOver).subscribe(function (dataRegistro) {
                    if (Object.keys(dataRegistro['Response']).length != 0) {
                        var carga_1 = dataRegistro['Response'];
                        _this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_7__cargas_info_cargas_info__["a" /* CargasInfoPage */], { carga: dataRegistro['Response'], cargas: _this.cargas, idUsuario: b });
                    }
                    else if (dataRegistro['Message'] != 3) {
                        _this.alertaService.warnAlert(_this.restService.headerValidacion, dataRegistro['Message'], null);
                    }
                    else {
                        _this.alertaService.warnAlert(_this.restService.headerValidacion, "No se encontraron registros de cargas", null);
                    }
                    loading.dismiss();
                }, function (error) {
                    loading.dismiss();
                    console.log(error);
                    _this.alertaService.errorAlert(_this.restService.headerError, _this.restService.mensajeError, null);
                });
            }
        }, function (error) {
            loading.dismiss();
            console.log(error);
            _this.alertaService.errorAlert(_this.restService.headerError, _this.restService.mensajeError, null);
        });
    };
    CargasPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-cargas',template:/*ion-inline-start:"C:\Users\Administrador\kenergy\src\pages\cargas\cargas.html"*/'<ion-header>\n  <ion-navbar color="titulo">\n    <button ion-button menuToggle>\n      <ion-icon name="menu"></ion-icon>\n    </button>\n    <ion-title class="tituloHeader" style="position: absolute;left: 25%; top: 33%;">Cargas</ion-title>\n\n    <ion-buttons end>\n      <button ion-button (click)="presentPopover($event)" style="color:#fff">\n        <ion-icon name="more"></ion-icon>\n      </button>\n    </ion-buttons>\n\n\n    <ion-buttons left *ngIf="!isOn" class="animated fadeIn">\n      <button icon-only="" ion-button="" class="disable-hover bar-button bar-button-ios bar-button-default bar-button-default-ios">\n        <span class="button-inner">\n          <img src="assets/imgs/cargas/fuel-station.png" style="width: 65%;margin-left: -27px;">\n        </span>\n        <div class="button-effect">\n\n        </div>\n      </button>\n    </ion-buttons>\n  </ion-navbar>\n</ion-header>\n\n\n<ion-content padding style="\n    background-image: url(assets/imgs/fondo.jpg); \n    background-size: 100%;\n    background-position: bottom center;\n    background-repeat: no-repeat;\n    background-color: white;">\n  <div style="width:100%;text-align: center" class="animated fadeIn">\n    <ion-item style="width:100%">\n      <ion-label style="color:#1b155c;">Desde</ion-label>\n      <ion-datetime displayFormat="DD/MM/YYYY" [(ngModel)]="desde" style="color: #000;" doneText="Aceptar"\n       cancelText="Cancelar" (ionChange)="buscar()"></ion-datetime>\n    </ion-item>\n    <ion-item style="width:100%">\n      <ion-label style="color:#1b155c;">Hasta</ion-label>\n      <ion-datetime displayFormat="DD/MM/YYYY" [(ngModel)]="hasta" style="color: #000;" doneText="Aceptar" \n      cancelText="Cancelar" (ionChange)="buscar()"></ion-datetime>\n    </ion-item>\n  <ion-item style="width:100%">\n    <ion-label position="floating" style="color:#1b155c;">Estación</ion-label>\n    <ion-select [(ngModel)]="idEstacion" style="color:#000" okText="Aceptar" \n    cancelText="Cancelar" (ionChange)="buscar()">\n      <ion-option *ngFor="let estacion of estaciones" value="{{estacion.id}}">{{estacion.descripcion}}</ion-option>\n    </ion-select>\n  </ion-item>\n\n  <ion-item style="width:100%">\n    <ion-label position="floating" style="color:#1b155c;">Vehículo</ion-label>\n    <ion-select [(ngModel)]="idVehiculo" style="color:#000" okText="Aceptar" \n    cancelText="Cancelar" (ionChange)="buscar()"> \n      <ion-option *ngFor="let vehiculo of vehiculos" value="{{vehiculo.id}}">{{vehiculo.descripcion}}</ion-option>\n    </ion-select>\n  </ion-item>\n  </div>\n\n  <ion-list class="animated fadeIn">\n    <ion-item *ngFor="let carga of cargas" class="itemList">\n      <div style="width:100%" >\n        <p style="display:inline-block;width:77%;color: #fff">{{carga.estacion}}</p>\n        <div style="display:inline-block;background-color: #ff0000;text-align: right;" *ngIf="!carga.facturada && carga.facturable"\n        (click)="openCarga(carga)">\n          <p style="color:#fff;margin: 2px">Facturar...</p>\n        </div>\n        <div style="display:inline-block;text-align: right;" *ngIf="carga.facturada">\n          <ion-icon name="download" style="font-size: 25px;" (click)="facturacionService.downloadFactura(carga.idFactura,carga.idEstacion)"></ion-icon>\n          <ion-icon name="mail" style="font-size: 25px;" (click)="facturacionService.mostrarEnvio(carga.idFactura,carga.idEstacion,carga.email)"></ion-icon>\n      </div>\n      </div>\n\n      <div style="width:100%">\n        <p style="color:#fff;display:inline-block;width:31%">{{carga.auto}}</p>\n        <p style="color:#fff;display:inline-block;width:31%">{{carga.fecha}}</p>\n        <p style="color:#fff;display:inline-block;width:31%">{{carga.km}} Kms</p>\n      </div>\n\n      <div style="width:100%">\n        <p style="color:#fff;display:inline-block;width:31%">{{carga.producto}}</p>\n        <p style="color:#fff;display:inline-block;width:31%">{{carga.lts | number: \'2.\'}} Lts.</p>\n        <p style="color:#fff;display:inline-block;width:31%">${{carga.precio | number: \'2.\'}}</p>\n      </div>\n    </ion-item>\n  </ion-list>\n</ion-content>\n<ion-fab top right class="animated swing">\n  <button ion-fab color="light" (click)="mostrarNotif.abrirNotificacion()">\n      <img src="assets/imgs/home/gas-station.png" alt="logo" class="claseImg animated fadeIn" />\n  </button>\n  <button *ngIf="notificacion.num > 0" ion-fab color="light" (click)="mostrarNotif.abrirNotificacion()" class="miniBoton">\n    {{notificacion.num}}\n</button>\n</ion-fab>'/*ion-inline-end:"C:\Users\Administrador\kenergy\src\pages\cargas\cargas.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["m" /* NavParams */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["o" /* PopoverController */],
            __WEBPACK_IMPORTED_MODULE_8__ionic_storage__["b" /* Storage */],
            __WEBPACK_IMPORTED_MODULE_3__providers_alerta_service__["a" /* AlertaServiceProvider */], __WEBPACK_IMPORTED_MODULE_4__providers_rest_service__["a" /* RestServiceProvider */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* LoadingController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["b" /* AlertController */], __WEBPACK_IMPORTED_MODULE_9__services_facturacion_service__["a" /* FacturacionService */],
            __WEBPACK_IMPORTED_MODULE_11__services_notificaciones_service__["a" /* NotificacionService */], __WEBPACK_IMPORTED_MODULE_10__services_abrirnotificaciones_service__["a" /* AbrirnotificacionesService */]])
    ], CargasPage);
    return CargasPage;
}());

//# sourceMappingURL=cargas.js.map

/***/ }),

/***/ 302:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return CargasInfoPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__cargas_list_cargas_list__ = __webpack_require__(158);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__providers_rest_service__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__providers_alerta_service__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__angular_common_http__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__models_clienteFacturaModel__ = __webpack_require__(668);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__ionic_native_http__ = __webpack_require__(150);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__datos_facturacion_datos_facturacion__ = __webpack_require__(159);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__services_notificaciones_service__ = __webpack_require__(17);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__services_abrirnotificaciones_service__ = __webpack_require__(18);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};











var CargasInfoPage = /** @class */ (function () {
    function CargasInfoPage(navCtrl, loadingCtrl, navParams, popoverCtrl, alertaService, restService, http, httpNative, notificacion, mostrarNotif) {
        this.navCtrl = navCtrl;
        this.loadingCtrl = loadingCtrl;
        this.navParams = navParams;
        this.popoverCtrl = popoverCtrl;
        this.alertaService = alertaService;
        this.restService = restService;
        this.http = http;
        this.httpNative = httpNative;
        this.notificacion = notificacion;
        this.mostrarNotif = mostrarNotif;
        this.carga = null;
        this.cargas = null;
        this.idUsuario = 0;
        this.arregloClientes = [];
        this.idclifac = 0;
        this.carga = navParams.get("carga");
        this.cargas = navParams.get('cargas');
        this.idUsuario = navParams.get('idUsuario');
        var loading = this.loadingCtrl.create();
        loading.present();
        loading.dismiss();
    }
    CargasInfoPage.prototype.ionViewDidLoad = function () {
        this.cambiarEstiloBoton(this.carga.Numero != "0");
    };
    CargasInfoPage.prototype.ionViewWillEnter = function () {
        document.getElementById("rfc").value = "";
        document.getElementById("razon").value = "";
        document.getElementById("correo").value = "";
        this.listaClientesFacturar(this.idUsuario);
        this.idclifac = 0;
    };
    CargasInfoPage.prototype.presentPopover = function (myEvent) {
        var popover = this.popoverCtrl.create(__WEBPACK_IMPORTED_MODULE_2__cargas_list_cargas_list__["a" /* CargasListPage */], { cargas: this.cargas });
        popover.present({
            ev: myEvent
        });
    };
    CargasInfoPage.prototype.reenviar = function () {
        var _this = this;
        var loading = this.loadingCtrl.create();
        loading.present();
        this.restService.getToken().timeout(this.restService.timeOver).subscribe(function (data) {
            if (data == null) {
                loading.dismiss();
                _this.alertaService.warnAlert(_this.restService.headerValidacion, _this.restService.mensajeValidacionAdmin, null);
            }
            else {
                var url = "invoice/email?IdFactura=" + _this.carga.IdFactura + "&IdEstacion=" + _this.carga.IdEstacion + "&Email=" + _this.carga.Email;
                _this.restService.restServiceGETToken(url, new __WEBPACK_IMPORTED_MODULE_5__angular_common_http__["d" /* HttpParams */](), data.toString()).timeout(_this.restService.timeOver).subscribe(function (dataRegistro) {
                    if (dataRegistro['Message'] == 0) {
                        _this.alertaService.alertaBasica(_this.restService.headerValidacion, "Se ha reenviado correctamente", null);
                    }
                    else {
                        var msg = "";
                        if (dataRegistro['Message'] == 1)
                            msg = "Error interno del servidor";
                        else if (dataRegistro['Message'] == 2)
                            msg = "No se encontraron parámetros";
                        else if (dataRegistro['Message'] == 3)
                            msg = "No existen resultados";
                        else
                            msg = dataRegistro['Message'];
                        _this.alertaService.warnAlert(_this.restService.headerValidacion, msg, null);
                    }
                    loading.dismiss();
                }, function (error) {
                    loading.dismiss();
                    console.log(error);
                    _this.alertaService.errorAlert(_this.restService.headerError, _this.restService.mensajeError, null);
                });
            }
        }, function (error) {
            loading.dismiss();
            console.log(error);
            _this.alertaService.errorAlert(_this.restService.headerError, _this.restService.mensajeError, null);
        });
    };
    // despachos/invoice/regular
    CargasInfoPage.prototype.facturar = function () {
        if (this.idclifac == 0)
            this.alertaService.warnAlert(this.restService.headerValidacion, "Es necesario seleccionar persona a facturar", null);
        else {
            console.log("pafac " + this.carga.Id + " " + this.carga.IdEstacion + " " + this.idclifac.toString());
            this.cambiarEstiloBoton(true);
        }
        /*
        let loading = this.loadingCtrl.create();
       loading.present();
        this.restService.getToken().timeout(this.restService.timeOver).subscribe(data => {
          if (data == null) {
            loading.dismiss();
            this.alertaService.warnAlert(this.restService.headerValidacion, this.restService.mensajeValidacionAdmin, null);
          } else {
                const bodys = new HttpParams()
            .set('IdCarga', this.carga.Id)
            .set('IdEstacion', this.carga.IdEstacion)
            .set('IdFacturarA', this.idclifac.toString())
          let param = "";
          this.restService.restServicePOSTTokenXForm("despachos/invoice/regular", bodys, data.toString()).timeout(this.restService.timeOver).subscribe(
          dataRegistro => {
            let dato = dataRegistro['Response'];
            if (dato != undefined && dato == true) {
              this.alertaService.alertaBasica("Bien!", "Se ha facturado con éxito", null);
            } else {
              this.alertaService.warnAlert("Atención!", "Error al facturar", null);
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
          console.log(error);
          this.alertaService.errorAlert(this.restService.headerError, this.restService.mensajeError, null);
        });*/
    };
    CargasInfoPage.prototype.listaClientesFacturar = function (idUsuario) {
        var _this = this;
        this.arregloClientes = [];
        this.restService.getToken().timeout(this.restService.timeOver).subscribe(function (data) {
            if (data == null) {
                _this.alertaService.warnAlert(_this.restService.headerValidacion, _this.restService.mensajeValidacionAdmin, null);
            }
            else {
                var url = "invoiceto/regular/" + idUsuario;
                _this.restService.restServiceGETToken(url, new __WEBPACK_IMPORTED_MODULE_5__angular_common_http__["d" /* HttpParams */](), data.toString()).timeout(_this.restService.timeOver).subscribe(function (dataRegistro) {
                    if (dataRegistro['Status'] == 1) {
                        var arreglo = dataRegistro['Response'];
                        arreglo.forEach(function (dato) {
                            _this.arregloClientes.push(new __WEBPACK_IMPORTED_MODULE_6__models_clienteFacturaModel__["a" /* ClienteFacturaModel */](dato.Id, dato.RFC, dato.Email, dato.RazonSocial));
                        });
                        if (_this.arregloClientes.length == 1) {
                            _this.idclifac = _this.arregloClientes[0].id;
                            _this.cargaInfoFac();
                        }
                    }
                    else {
                        _this.arregloClientes = null;
                    }
                }, function (error) {
                    console.log(error);
                });
            }
        });
    };
    CargasInfoPage.prototype.cargaInfoFac = function () {
        var _this = this;
        this.restService.getToken().timeout(this.restService.timeOver).subscribe(function (data) {
            if (data == null) {
                _this.alertaService.warnAlert(_this.restService.headerValidacion, _this.restService.mensajeValidacionAdmin, null);
            }
            else {
                var url = "invoiceto/regular/detail/" + _this.idclifac;
                _this.restService.restServiceGETToken(url, new __WEBPACK_IMPORTED_MODULE_5__angular_common_http__["d" /* HttpParams */](), data.toString()).timeout(_this.restService.timeOver).subscribe(function (dataRegistro) {
                    if (dataRegistro['Status'] == 1) {
                        var resp = dataRegistro['Response'];
                        document.getElementById("rfc").value = resp.RFC;
                        document.getElementById("razon").value = resp.NombreComercial;
                        document.getElementById("correo").value = resp.Email;
                    }
                }, function (error) {
                    console.log(error);
                });
            }
        });
    };
    CargasInfoPage.prototype.cambiarEstiloBoton = function (ban) {
        this.des = ban ? "Facturada" : "Facturar";
        document.getElementById("botonenv").style.backgroundColor = ban ? "#FF2D00" : "#0ba74f";
        document.getElementById("botonenv").style.pointerEvents = ban ? "none" : "auto";
    };
    CargasInfoPage.prototype.facturarA = function () {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_8__datos_facturacion_datos_facturacion__["a" /* DatosFacturacionPage */], { idUsuario: this.idUsuario, tipo: 1 });
    };
    CargasInfoPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-cargas-info',template:/*ion-inline-start:"C:\Users\Administrador\kenergy\src\pages\cargas-info\cargas-info.html"*/'<ion-header>\n  <ion-navbar color="titulo">\n  	<button ion-button menuToggle>\n      <ion-icon name="menu"></ion-icon>\n    </button>\n    <ion-title class="tituloHeader" style="position: absolute;left: 21%; top: 33%;">Detalle de carga</ion-title>\n\n    <!-- <ion-buttons end>\n      <button ion-button (click)="presentPopover($event)" style="color:#fff">\n        <ion-icon name="more"></ion-icon>\n      </button>\n    </ion-buttons> -->\n\n\n    <ion-buttons left *ngIf="!isOn" class="animated fadeIn">\n      <button icon-only="" ion-button="" class="disable-hover bar-button bar-button-ios bar-button-default bar-button-default-ios">\n        <span class="button-inner">\n          <img src="assets/imgs/cargas/fuel-station.png" style="width: 70%;margin-left: -33px;">\n        </span>\n        <div class="button-effect">\n\n        </div>\n      </button>\n    </ion-buttons>\n  </ion-navbar>\n</ion-header>\n\n\n<ion-content *ngIf="carga != null" padding style="\n  background-image: url(assets/imgs/fondo.jpg); \n  background-size: 100%;\n  background-position: bottom center;\n  background-repeat: no-repeat;\n  background-color: white;">\n  <input placeholder="Estación" class="inputText noedit" [(ngModel)]="carga.Estacion"/>\n  <div class="widthFull">\n    <input placeholder="Núm. Carga" class="inputText clm widthMedium noedit" [(ngModel)]="carga.NumCarga"/>\n    <input placeholder="Fecha" class="inputText clm widthMedium noedit" [(ngModel)]="carga.Fecha"/>\n  </div>\n  <input placeholder="Vehículo" class="inputText noedit" [(ngModel)]="carga.Auto"/>\n  <input placeholder="Chofer" class="inputText noedit" [(ngModel)]="carga.Chofer"/>\n  <div class="widthFull">\n    <input placeholder="Producto" class="inputText clm widthMedium noedit" [(ngModel)]="carga.Producto"/>\n    <input placeholder="Cantidad Lts" type="number" class="inputText clm widthMedium noedit" [(ngModel)]="carga.Litros"/>\n  </div>\n\n  <div class="widthFull">\n    <input placeholder="Precio $/Lt" class="inputText clm widthMedium noedit" [(ngModel)]="carga.PrecioLitro"/>\n    <input placeholder="$ Monto" type="number" class="inputText clm widthMedium noedit" [(ngModel)]="carga.Efectivo"/>\n  </div>\n\n  <div class="widthFull">\n    <input placeholder="Kilometraje Km" class="inputText clm widthMedium noedit" [(ngModel)]="carga.Kilometraje"/>\n    <input placeholder="Rendimiento Km/Lt" type="number" class="inputText clm widthMedium noedit" [(ngModel)]="carga.Rendimiento"/>\n  </div>\n\n  <div class="widthFull">\n    <input placeholder="Tipo de Pago" class="inputText clm widthMedium noedit" [(ngModel)]="carga.TipoPago"/>\n    <input placeholder="Puntos Ptos." type="number" class="inputText clm widthMedium noedit" [(ngModel)]="carga.Puntos"/>\n  </div>\n  <div style="text-align:center;text-align: -webkit-center;margin-bottom: 7px; width: 100%;">\n    <ion-row>\n      <ion-col class="col1">\n        <ion-item style="width:100%">\n          <ion-label position="floating" style="color:#1b155c; min-width: 30%;">Facturar a:</ion-label>\n          <ion-select [(ngModel)]="idclifac" class="selector" *ngIf="arregloClientes.length > 1"\n          (ionChange)="cargaInfoFac()" >\n            <ion-option *ngFor="let cliente of arregloClientes" value="{{cliente.id}}">{{cliente.razon}}</ion-option>\n          </ion-select>\n        </ion-item>\n      </ion-col>\n      <ion-col class="col2">\n        <ion-icon name="add" class="add clm" (click)="facturarA()"></ion-icon>\n      </ion-col>\n    </ion-row>\n    \n  </div >\n  <!-- <div style="text-align:center;text-align: -webkit-center;margin-bottom: 7px; width: 25%;">\n    <div style="background-color: skyblue;padding: 2px;\n    color: #fff;\n    text-align: center;\n    width: 80%;border: 1.3px solid #8a8a8a;" (click)="facturarA()" id="botonenv">\n      Agregar nueva razón social\n    </div>\n  </div> -->\n  <input placeholder="RFC" class="inputText" [(ngModel)]="carga.RFC" readonly="true" id="rfc" />\n  <input placeholder="Razón Social" class="inputText" [(ngModel)]="carga.RazonSocial" readonly="true" id="razon" />\n  <input placeholder="Correo" class="inputText" [(ngModel)]="carga.Email" id="correo" />\n\n  <div style="text-align:center;text-align: -webkit-center;margin-bottom: 7px;">\n\n  <div style="background-color: #0ba74f;padding: 2px;\n    color: #fff;\n    text-align: center;\n    width: 30%;border: 1.3px solid #8a8a8a;" (click)="facturar()" id="botonenv">\n      {{des}}\n    </div>\n  </div>\n</ion-content>\n<ion-fab top right class="animated swing">\n  <button ion-fab color="light" (click)="mostrarNotif.abrirNotificacion()">\n      <img src="assets/imgs/home/gas-station.png" alt="logo" class="claseImg animated fadeIn" />\n  </button>\n  <button *ngIf="notificacion.num > 0" ion-fab color="light" (click)="mostrarNotif.abrirNotificacion()" class="miniBoton">\n    {{notificacion.num}}\n</button>\n</ion-fab>'/*ion-inline-end:"C:\Users\Administrador\kenergy\src\pages\cargas-info\cargas-info.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* LoadingController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["m" /* NavParams */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["o" /* PopoverController */], __WEBPACK_IMPORTED_MODULE_4__providers_alerta_service__["a" /* AlertaServiceProvider */],
            __WEBPACK_IMPORTED_MODULE_3__providers_rest_service__["a" /* RestServiceProvider */],
            __WEBPACK_IMPORTED_MODULE_5__angular_common_http__["a" /* HttpClient */], __WEBPACK_IMPORTED_MODULE_7__ionic_native_http__["a" /* HTTP */],
            __WEBPACK_IMPORTED_MODULE_9__services_notificaciones_service__["a" /* NotificacionService */], __WEBPACK_IMPORTED_MODULE_10__services_abrirnotificaciones_service__["a" /* AbrirnotificacionesService */]])
    ], CargasInfoPage);
    return CargasInfoPage;
}());

//# sourceMappingURL=cargas-info.js.map

/***/ }),

/***/ 303:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return CambiarEmailPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_forms__ = __webpack_require__(20);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__providers_alerta_service__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__providers_rest_service__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__angular_common_http__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_validator__ = __webpack_require__(52);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_validator___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_6_validator__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__services_abrirnotificaciones_service__ = __webpack_require__(18);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__services_notificaciones_service__ = __webpack_require__(17);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__ionic_native_sqlite__ = __webpack_require__(43);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__login_login__ = __webpack_require__(81);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__ionic_storage__ = __webpack_require__(15);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};












/**
 * Generated class for the CambiarEmailPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var CambiarEmailPage = /** @class */ (function () {
    function CambiarEmailPage(navCtrl, navParams, alertaService, restService, viewCtrl, notificacion, mostrarNotif, sqlite, menuCtrl, localStorage) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.alertaService = alertaService;
        this.restService = restService;
        this.viewCtrl = viewCtrl;
        this.notificacion = notificacion;
        this.mostrarNotif = mostrarNotif;
        this.sqlite = sqlite;
        this.menuCtrl = menuCtrl;
        this.localStorage = localStorage;
        this.usuario = null;
        this.loginForm = new __WEBPACK_IMPORTED_MODULE_2__angular_forms__["b" /* FormGroup */]({
            eanterior: new __WEBPACK_IMPORTED_MODULE_2__angular_forms__["a" /* FormControl */](''),
            enuevo: new __WEBPACK_IMPORTED_MODULE_2__angular_forms__["a" /* FormControl */](''),
            enuevoc: new __WEBPACK_IMPORTED_MODULE_2__angular_forms__["a" /* FormControl */]('')
        });
        this.loginForm2 = new __WEBPACK_IMPORTED_MODULE_2__angular_forms__["b" /* FormGroup */]({
            editado: new __WEBPACK_IMPORTED_MODULE_2__angular_forms__["a" /* FormControl */](0)
        });
        this.loginFormValidator = {
            eanterior: {
                mensaje: ''
            },
            enuevo: {
                mensaje: ''
            },
            enuevoc: {
                mensaje: ''
            }
        };
        this.usuario = navParams.get("usuario");
        console.log("Cambiando email");
        console.log(JSON.stringify(this.usuario));
    }
    CambiarEmailPage.prototype.ionViewDidEnter = function () {
        this.onValueChanges();
    };
    CambiarEmailPage.prototype.ionViewCanLeave = function () {
        var _this = this;
        return new Promise(function (resolve, reject) {
            if (_this.loginForm2.value.editado == 0)
                resolve();
            else
                _this.alertaService.alertaConfirmacion("Confirmar", "¿Desea salir sin guardar los cambios realizados?", resolve, reject);
        });
    };
    CambiarEmailPage.prototype.cambiarEmail = function () {
        var _this = this;
        if (this.formValidator()) {
            this.restService.getToken().timeout(this.restService.timeOver).subscribe(function (data) {
                var bodys = new __WEBPACK_IMPORTED_MODULE_5__angular_common_http__["d" /* HttpParams */]();
                _this.restService.restServicePUTToken("user/email/" + _this.usuario.Id + "/" + _this.loginForm.value.enuevoc, bodys, data.toString()).timeout(_this.restService.timeOver).subscribe(function (dataRegistro) {
                    if (dataRegistro['Response'] == true) {
                        _this.alertaService.alertaBasica("¡Bien!", "Se ha enviado un correo a " + _this.loginForm.value.enuevoc + " para confirmar el cambio.", null);
                        _this.loginForm2.patchValue({
                            editado: 0
                        });
                        _this.close();
                    }
                    else {
                        if (dataRegistro['Message'] == "6")
                            _this.alertaService.warnAlert("¡Atención!", "El nuevo E-mail capturado ya se encuentra registrado por otra cuenta", null);
                        if (dataRegistro['Message'] == "3")
                            _this.alertaService.warnAlert("¡Atención!", "No ha sido encontrado el usuario.", null);
                    }
                }, function (error) {
                    console.log(error);
                    _this.alertaService.errorAlert(_this.restService.headerError, _this.restService.mensajeError, null);
                });
            }, function (error) {
                console.log(error);
                _this.alertaService.errorAlert(_this.restService.headerError, _this.restService.mensajeError, null);
            });
        }
    };
    CambiarEmailPage.prototype.formValidator = function () {
        if (__WEBPACK_IMPORTED_MODULE_6_validator___default.a.isEmpty(this.loginForm.value.eanterior)) {
            this.loginFormValidator.eanterior.mensaje = 'Es necesario capturar el E-mail Anterior';
            this.cambiarDiseñoInput("eanterior", 1);
            return false;
        }
        else {
            this.loginFormValidator.eanterior.mensaje = '';
            this.cambiarDiseñoInput("eanterior");
        }
        if (!__WEBPACK_IMPORTED_MODULE_6_validator___default.a.isEmail(this.loginForm.value.eanterior)) {
            this.loginFormValidator.eanterior.mensaje = 'Ingrese una dirección de correo válida';
            this.cambiarDiseñoInput("eanterior", 1);
            return false;
        }
        else {
            this.loginFormValidator.eanterior.mensaje = '';
            this.cambiarDiseñoInput("eanterior");
        }
        if (this.loginForm.value.eanterior != this.usuario.Email) {
            this.loginFormValidator.eanterior.mensaje = 'El E-mail anterior es incorrecto';
            this.cambiarDiseñoInput("eanterior", 1);
            return false;
        }
        else {
            this.loginFormValidator.eanterior.mensaje = '';
            this.cambiarDiseñoInput("eanterior");
        }
        if (__WEBPACK_IMPORTED_MODULE_6_validator___default.a.isEmpty(this.loginForm.value.enuevo)) {
            this.loginFormValidator.enuevo.mensaje = 'Es necesario capturar el nuevo E-mail';
            this.cambiarDiseñoInput("enuevo", 1);
            return false;
        }
        else {
            this.loginFormValidator.enuevo.mensaje = '';
            this.cambiarDiseñoInput("enuevo");
        }
        if (!__WEBPACK_IMPORTED_MODULE_6_validator___default.a.isEmail(this.loginForm.value.enuevo)) {
            this.loginFormValidator.enuevo.mensaje = 'Ingrese una dirección de correo válida';
            this.cambiarDiseñoInput("enuevo", 1);
            return false;
        }
        else {
            this.loginFormValidator.enuevo.mensaje = '';
            this.cambiarDiseñoInput("enuevo");
        }
        if (__WEBPACK_IMPORTED_MODULE_6_validator___default.a.isEmpty(this.loginForm.value.enuevoc)) {
            this.loginFormValidator.enuevoc.mensaje = 'Es necesario confirmar la Contraseña nueva';
            this.cambiarDiseñoInput("enuevoc", 1);
            return false;
        }
        else {
            this.loginFormValidator.enuevoc.mensaje = '';
            this.cambiarDiseñoInput("enuevoc");
        }
        if (!__WEBPACK_IMPORTED_MODULE_6_validator___default.a.isEmail(this.loginForm.value.enuevoc)) {
            this.loginFormValidator.enuevoc.mensaje = 'Ingrese una dirección de correo válida';
            this.cambiarDiseñoInput("enuevoc", 1);
            return false;
        }
        else {
            this.loginFormValidator.enuevoc.mensaje = '';
            this.cambiarDiseñoInput("enuevoc");
        }
        if (this.loginForm.value.enuevoc != this.loginForm.value.enuevo) {
            this.loginFormValidator.enuevoc.mensaje = 'La confirmación de E-mail no coincide';
            this.cambiarDiseñoInput("enuevoc", 1);
            return false;
        }
        else {
            this.loginFormValidator.enuevoc.mensaje = '';
            this.cambiarDiseñoInput("enuevoc");
        }
        return true;
    };
    CambiarEmailPage.prototype.cambiarDiseñoInput = function (id, color) {
        if (color === void 0) { color = 0; }
        var strColor = color == 1 ? "red" : "white";
        document.getElementById(id).style.backgroundColor = strColor;
    };
    CambiarEmailPage.prototype.onValueChanges = function () {
        var _this = this;
        this.loginForm.valueChanges.subscribe(function (val) {
            _this.loginForm2.patchValue({
                editado: _this.loginForm2.value.editado + 1
            });
        });
    };
    CambiarEmailPage.prototype.dismiss = function () {
        this.viewCtrl.dismiss();
    };
    CambiarEmailPage.prototype.close = function () {
        var _this = this;
        this.localStorage.ready().then(function () {
            var sqlDelete = "DELETE FROM usuario";
            _this.sqlite.create({
                name: 'kenergy.db',
                location: 'default'
            }).then(function (db) {
                db.executeSql(sqlDelete, [])
                    .then(function (response) {
                    _this.localStorage.set("@isSessionActive", 0);
                    _this.menuCtrl.close();
                    _this.menuCtrl.enable(false, "authenticated");
                    _this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_10__login_login__["a" /* LoginPage */]);
                })
                    .catch(function (error) { return _this.alertaService.errorAlert("Error al borrar usuario", error, null); });
            })
                .catch(function (error) {
                _this.alertaService.errorAlert("Info", "Excepcion al crear BD " + error, null);
            });
        }, function (error) {
            console.log(error); //En modo debug visualizar error completo
            _this.alertaService.errorAlert(_this.restService.headerError, error.message, null);
        });
    };
    CambiarEmailPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-cambiar-email',template:/*ion-inline-start:"C:\Users\Administrador\kenergy\src\pages\cambiar-email\cambiar-email.html"*/'<ion-header>\n  <ion-navbar color="titulo">\n    <button ion-button menuToggle>\n      <ion-icon name="menu"></ion-icon>\n    </button>\n    \n    <ion-title class="tituloHeader" style="position: absolute;left: 25%; top: 33%;">Cambiar E-mail</ion-title>\n\n    <ion-buttons left  class="animated fadeIn">\n      <button icon-only="" ion-button="" class="disable-hover bar-button bar-button-ios bar-button-default bar-button-default-ios">\n        <span class="button-inner">\n          <img src="assets/imgs/misDatos/usuario.png" style="width: 65%;margin-left: -27px;">\n        </span>\n        <div class="button-effect">\n\n        </div>\n      </button>\n    </ion-buttons>\n  </ion-navbar>\n</ion-header>\n\n<ion-content *ngIf="usuario != null"  padding style="\nbackground-image: url(assets/imgs/fondo.jpg); \nbackground-size: 100%;\nbackground-position: center center;">\n  <form [formGroup]="loginForm">\n    <ion-label style="color:#1b155c;">E-mail actual*</ion-label>\n    <ion-input formControlName="eanterior" type="email" style="color: #000;" id="eanterior"></ion-input>\n  <ion-item *ngIf="loginFormValidator.eanterior.mensaje">\n    <ion-label text-wrap color="danger">\n    {{ loginFormValidator.eanterior.mensaje }}\n    </ion-label>\n  </ion-item>\n    <ion-label style="color:#1b155c;">Nuevo E-mail*</ion-label>\n    <ion-input formControlName="enuevo" type="email" style="color: #000;" id="enuevo"></ion-input>\n  <ion-item *ngIf="loginFormValidator.enuevo.mensaje">\n    <ion-label text-wrap color="danger">\n    {{ loginFormValidator.enuevo.mensaje }}\n    </ion-label>\n  </ion-item>\n    <ion-label style="color:#1b155c;">Confirmar Nuevo E-mail*</ion-label>\n    <ion-input formControlName="enuevoc" type="email" style="color: #000;" id="enuevoc"></ion-input>\n  <ion-item *ngIf="loginFormValidator.enuevoc.mensaje">\n    <ion-label text-wrap color="danger">\n    {{ loginFormValidator.enuevoc.mensaje }}\n    </ion-label>\n  </ion-item>\n  <div class="centro animated fadeIn">\n    <div style="display: inline-block;width: 44%" class="animated fadeIn">\n      <button ion-button color="naranja" class="tituloHeader botonGuardar" (click)="cambiarEmail()">Guardar</button>\n    </div>\n  </div>\n</form>\n</ion-content>\n<ion-fab top right class="animated swing">\n  <button ion-fab color="light" (click)="mostrarNotif.abrirNotificacion()">\n      <img src="assets/imgs/home/gas-station.png" alt="logo" class="claseImg animated fadeIn" />\n  </button>\n  <button *ngIf="notificacion.num > 0" ion-fab color="light" (click)="mostrarNotif.abrirNotificacion()" class="miniBoton">\n    {{notificacion.num}}\n</button>\n</ion-fab>'/*ion-inline-end:"C:\Users\Administrador\kenergy\src\pages\cambiar-email\cambiar-email.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["m" /* NavParams */], __WEBPACK_IMPORTED_MODULE_3__providers_alerta_service__["a" /* AlertaServiceProvider */],
            __WEBPACK_IMPORTED_MODULE_4__providers_rest_service__["a" /* RestServiceProvider */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["p" /* ViewController */],
            __WEBPACK_IMPORTED_MODULE_8__services_notificaciones_service__["a" /* NotificacionService */], __WEBPACK_IMPORTED_MODULE_7__services_abrirnotificaciones_service__["a" /* AbrirnotificacionesService */],
            __WEBPACK_IMPORTED_MODULE_9__ionic_native_sqlite__["a" /* SQLite */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* MenuController */], __WEBPACK_IMPORTED_MODULE_11__ionic_storage__["b" /* Storage */]])
    ], CambiarEmailPage);
    return CambiarEmailPage;
}());

//# sourceMappingURL=cambiar-email.js.map

/***/ }),

/***/ 304:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return EstacionesPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__estaciones_list_estaciones_list__ = __webpack_require__(305);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__models_CombustibleModel__ = __webpack_require__(161);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__providers_rest_service__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__providers_alerta_service__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__ionic_native_geolocation__ = __webpack_require__(162);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__angular_common_http__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__ionic_native_launch_navigator__ = __webpack_require__(306);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};









var EstacionesPage = /** @class */ (function () {
    //@ViewChild('map') mapContainer: ElementRef;
    function EstacionesPage(navCtrl, navParams, popoverCtrl, loadingCtrl, alertCtrl, restService, alertaService, geolocation, launchNavigator) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.popoverCtrl = popoverCtrl;
        this.loadingCtrl = loadingCtrl;
        this.alertCtrl = alertCtrl;
        this.restService = restService;
        this.alertaService = alertaService;
        this.geolocation = geolocation;
        this.launchNavigator = launchNavigator;
        this.estaciones = [];
        this.rango = 2;
        this.progresoKm = 5;
        this.latOrigen = 0;
        this.longOrigen = 0;
        this.latActual = 0;
        this.longActual = 0;
        this.latCercana = 0;
        this.longCercana = 0;
        this.options = { timeout: 10000, enableHighAccuracy: true, maximumAge: 0 };
        this.coordenadas = [{ lat: 18.860484, long: -97.061461 }, { lat: 18.852410, long: -97.079916 }, { lat: 18.901281, long: -96.951716 }];
        this.stringEstaciones = ["Gasolinera K Energy Ixtac", "Gasolinera K Energy Orizaba", "Gasolinera K Energy Córdoba, Ver"];
        this.iconEstacion = {
            url: 'assets/css/images/marker-icon.png',
            scaledSize: {
                width: 30,
                height: 50
            }
        };
        this.iconCarro = {
            url: 'assets/css/images/car.png',
            scaledSize: {
                width: 50,
                height: 50
            }
        };
        this.markerOptions = {};
        this.renderOptions = {
            suppressMarkers: true,
        };
        this.rad = function (x) { return x * Math.PI / 180; };
        this.getMuestraCercano = function () { return document.getElementById("muestraCercano").value; };
        /*this.estaciones.push(new CombustibleModel("Ixtaczoquitlan", 88.88, 88.88, 88.88, false));
        this.estaciones.push(new CombustibleModel("Jalapa", 88.88, 88.88, 88.88, false));
        this.estaciones.push(new CombustibleModel("Córdoba", 88.88, 88.88, 88.88, false));*/
        this.geolocalizar();
        //this.geolocalizar2();
    }
    EstacionesPage.prototype.cargarEstaciones = function () {
        var _this = this;
        //api/station
        var loading = this.loadingCtrl.create();
        loading.present();
        this.estaciones = [];
        this.restService.getToken().timeout(this.restService.timeOver).subscribe(function (data) {
            if (data == null) {
                loading.dismiss();
                _this.alertaService.warnAlert(_this.restService.headerValidacion, _this.restService.mensajeValidacionAdmin, null);
            }
            else {
                var body = new __WEBPACK_IMPORTED_MODULE_7__angular_common_http__["d" /* HttpParams */]();
                _this.restService.restServiceGETToken("station", body, data.toString()).timeout(_this.restService.timeOver).subscribe(function (dataRegistro) {
                    if (Object.keys(dataRegistro['Response']).length != 0) {
                        var arrayEstaciones = dataRegistro['Response'];
                        var i = 0;
                        var distancia = 0;
                        var numcercano = 0;
                        for (var index = 0; index < arrayEstaciones.length; index++) {
                            var estacion = arrayEstaciones[index];
                            if (index == 0) {
                                i = estacion.Id;
                            }
                            _this.estaciones.push(new __WEBPACK_IMPORTED_MODULE_3__models_CombustibleModel__["a" /* CombustibleModel */](estacion.Nombre.replace(" 1 ", " ").replace(" 2 ", " ").replace(" 3 ", " "), +estacion.Precios[0].Price, +estacion.Precios[1].Price, +estacion.Precios[2].Price, false, estacion.Id, estacion.Direccion, _this.coordenadas[estacion.Id - 1].lat, _this.coordenadas[estacion.Id - 1].long));
                            var dis = _this.distancia(_this.latOrigen, _this.longOrigen, estacion.Geolat, estacion.Geolng);
                            if (distancia == 0 || dis < distancia) {
                                distancia = dis;
                                numcercano = estacion.Id;
                            }
                            //loading.dismiss();
                        }
                        _this.estaciones[numcercano - 1].masCerca = true;
                        _this.latCercana = +_this.estaciones[numcercano - 1].lat;
                        _this.longCercana = +_this.estaciones[numcercano - 1].long;
                        _this.llenarInfo(_this.estaciones[numcercano - 1]);
                        //this.cargarPrecio(this.estaciones, i, data.toString());
                        //this.geolocalizar();
                        loading.dismiss();
                        //this.combustibles.push(new CombustibleModel("Ixtaczoquitlan", 88.88, 88.88, 88.88, true));
                    }
                    else {
                        _this.alertaService.warnAlert(_this.restService.headerValidacion, "No se encontraron estaciones", null);
                    }
                }, function (error) {
                    loading.dismiss();
                    console.log(error);
                    _this.alertaService.errorAlert(_this.restService.headerError, _this.restService.mensajeError, null);
                });
            }
        }, function (error) {
            loading.dismiss();
            console.log(error);
            _this.alertaService.errorAlert(_this.restService.headerError, _this.restService.mensajeError, null);
        });
    };
    EstacionesPage.prototype.recargar = function () {
        //this.geolocalizar();
    };
    EstacionesPage.prototype.changeValue = function (c) {
        var _this = this;
        if (!c.expandible) {
            var loading_1 = this.loadingCtrl.create();
            loading_1.present();
            this.restService.getToken().timeout(this.restService.timeOver).subscribe(function (data) {
                if (data == null) {
                    loading_1.dismiss();
                    _this.alertaService.warnAlert(_this.restService.headerValidacion, _this.restService.mensajeValidacionAdmin, null);
                }
                else {
                    var body = new __WEBPACK_IMPORTED_MODULE_7__angular_common_http__["d" /* HttpParams */]();
                    var armaUrl = "gasoline/price/" + c.id;
                    _this.restService.restServiceGETToken(armaUrl, new __WEBPACK_IMPORTED_MODULE_7__angular_common_http__["d" /* HttpParams */](), data.toString()).timeout(_this.restService.timeOver).subscribe(function (dataEstacionPrecio) {
                        if (Object.keys(dataEstacionPrecio['Response']).length != 0) {
                            var arrayPrecios = dataEstacionPrecio['Response'];
                            c.precioMagna = arrayPrecios[0].Price;
                            c.precioPremium = arrayPrecios[1].Price;
                            c.precioDiesel = arrayPrecios[2].Price;
                            c.expandible = true;
                        }
                        else {
                            _this.alertaService.errorAlert(_this.restService.headerValidacion, "La estación no cuenta con precios", null);
                        }
                        loading_1.dismiss();
                    }, function (error) {
                        console.log(error);
                        _this.alertaService.errorAlert(_this.restService.headerError, _this.restService.mensajeError, null);
                    });
                }
            }, function (error) {
                loading_1.dismiss();
                console.log(error);
                _this.alertaService.errorAlert(_this.restService.headerError, _this.restService.mensajeError, null);
            });
        }
        else {
            c.expandible = !c.expandible;
        }
    };
    EstacionesPage.prototype.geolocalizar = function () {
        var _this = this;
        var loading = this.loadingCtrl.create();
        loading.present();
        this.geolocation.getCurrentPosition(this.options)
            .then(function (resp) {
            _this.latOrigen = resp.coords.latitude;
            _this.longOrigen = resp.coords.longitude;
            _this.cargarEstaciones();
            _this.geolocalizar2();
            loading.dismiss();
        })
            .catch(function (error) {
            console.log('Error getting location', error);
            console.log(error);
            loading.dismiss();
            var alert = _this.alertCtrl.create({
                title: _this.restService.headerError,
                message: "Favor de revisar su conexión a internet y/o permisos de gps",
                cssClass: 'alertCustomCss2',
                buttons: [
                    {
                        text: 'Regresar',
                        handler: function () {
                            _this.navCtrl.pop();
                        }
                    },
                    {
                        text: 'Reintentar',
                        handler: function () {
                            _this.geolocalizar();
                        }
                    }
                ]
            });
            alert.present();
        });
    };
    EstacionesPage.prototype.geolocalizar2 = function () {
        var _this = this;
        var watch = this.geolocation.watchPosition(this.options);
        watch.subscribe(function (resp) {
            _this.latActual = resp.coords.latitude;
            _this.longActual = resp.coords.longitude;
        });
    };
    EstacionesPage.prototype.presentPopover = function (myEvent) {
        var popover = this.popoverCtrl.create(__WEBPACK_IMPORTED_MODULE_2__estaciones_list_estaciones_list__["a" /* EstacionesListPage */], { estaciones: this.estaciones, map: this.map, latOrigen: this.latOrigen, longOrigen: this.longOrigen });
        popover.present({
            ev: myEvent
        });
    };
    EstacionesPage.prototype.change = function () {
        console.log("cambia rango");
    };
    EstacionesPage.prototype.selectRangeVal = function () {
        this.map.remove();
        //this.geolocalizar();
    };
    EstacionesPage.prototype.llenarInfo = function (estacion) {
        var element = document.getElementsByClassName("nombreEstacionN")[0];
        element.innerText = estacion.nombre;
        var elementDireccion = document.getElementsByClassName("estacionDireccion")[0];
        elementDireccion.innerText = estacion.direccion;
        var elementMagna = document.getElementsByClassName("precioGas uno")[0];
        elementMagna.innerText = "$" + estacion.precioMagna;
        var elementPremium = document.getElementsByClassName("precioGas dos")[0];
        elementPremium.innerText = "$" + estacion.precioPremium;
        var elementDiesel = document.getElementsByClassName("precioGas tres")[0];
        elementDiesel.innerText = "$" + estacion.precioDiesel;
        document.getElementById("idEst").value = estacion.id;
        document.getElementById("muestraCercano").value = estacion.masCerca ? 1 : 0;
        //this.elementInfo.hidden = false;
    };
    EstacionesPage.prototype.distancia = function (lat1, long1, lat2, long2) {
        var R = 6378.137;
        var dLat = this.rad(lat2 - lat1);
        var dLong = this.rad(long2 - long1);
        var a = Math.sin(dLat / 2) * Math.sin(dLat / 2) + Math.cos(this.rad(lat1)) * Math.cos(this.rad(lat2)) * Math.sin(dLong / 2) * Math.sin(dLong / 2);
        var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        var d = R * c;
        return d; //Retorna tres decimales
    };
    EstacionesPage.prototype.mapReady = function (map) {
        this.map = map;
    };
    EstacionesPage.prototype.ionViewDidEnter = function () {
        /*this.elementInfo = (document.getElementById("infoGas") as HTMLFormElement);
        this.elementInfo.hidden = true;*/
    };
    EstacionesPage.prototype.navigateLocation = function () {
        var id = document.getElementById("idEst").value;
        var dest = this.stringEstaciones[id - 1];
        var opts = {
            app: this.launchNavigator.APP.GOOGLE_MAPS
        };
        this.launchNavigator.navigate(dest, opts)
            .then(function (success) {
            console.log(success);
        }, function (error) {
            console.log(error);
        });
    };
    EstacionesPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-estaciones',template:/*ion-inline-start:"C:\Users\Administrador\kenergy\src\pages\estaciones\estaciones.html"*/'<ion-header>\n  <ion-navbar color="titulo">\n      <button ion-button menuToggle>\n          <ion-icon name="menu"></ion-icon>\n        </button>\n    <ion-title class="tituloHeader" style="position: absolute;left: 25%; top: 33%;">Estaciones</ion-title>\n    <ion-buttons end>\n      <button ion-button (click)="presentPopover($event)" style="color:#fff; font-size: 70%;">\n        <ion-icon name="search"></ion-icon>\n      </button>\n      \n    </ion-buttons>\n\n\n    <ion-buttons left *ngIf="!isOn" class="animated fadeIn">\n      <button icon-only="" ion-button="" class="disable-hover bar-button bar-button-ios bar-button-default bar-button-default-ios">\n        <span class="button-inner">\n          <img src="assets/imgs/estaciones/ubication.png" style="width: 65%;margin-left: -27px;">\n        </span>\n        <div class="button-effect">\n\n        </div>\n      </button>\n    </ion-buttons>\n  </ion-navbar>\n</ion-header>\n\n\n<ion-content style="\nbackground-image: url(assets/imgs/fondo.jpg); \nbackground-size: 100%;\nbackground-position: center center;">\n<input type="hidden" [(ngModel)]="displ" id="displ"/>\n<input type="hidden" id="idEst"/>\n<input type="hidden" id="muestraCercano"/>\n  <agm-map [latitude]="latOrigen" [longitude]="longOrigen" [zoom]="15" [streetViewControl]="false" \n  (mapReady)="mapReady($event)" [zoomControl]="false">\n  <!-- <agm-marker [latitude]="latOrigen" [longitude]="longOrigen" \n    [markerClickable]="false" [iconUrl]="iconCarro">\n    </agm-marker> -->\n    <agm-marker *ngIf="latActual != 0" [latitude]="latActual" [longitude]="longActual" \n    [markerClickable]="false" [iconUrl]="iconCarro">\n    </agm-marker>\n    <agm-marker *ngFor="let estacion of estaciones" [latitude]="estacion.lat" [longitude]="estacion.long" \n    [markerClickable]="true" [iconUrl]="iconEstacion" (markerClick)="llenarInfo(estacion)">\n    </agm-marker>\n    <!-- <ng-container *ngFor="let estacion of estaciones"> -->\n      <agm-direction *ngIf="latCercana != 0" [origin]="{ lat: latOrigen, lng: longOrigen }" [destination]="{ lat: latCercana, lng: longCercana }"\n      [renderOptions]="renderOptions" [markerOptions]="markerOptions"></agm-direction>\n    <!-- </ng-container> -->\n  </agm-map>\n  <!-- <div id="map" style="width:100%; height:101%;" class="animated fadeIn"></div> -->\n  \n    <div class="animated fadeIn divGasoline" style="height: 180px; overflow-y: scroll;position: absolute;\n  margin-top: -45%;" id="infoGas">\n<!--    <div *ngFor="let c of estaciones" style="margin-bottom: 4px;" class="estacionesClass" >-->\n      <!--<div class="expandible" (click)="changeValue(c)">\n        <ion-icon name="pin" class="iconoGasolina"></ion-icon>\n\n        <div class="nombreEstacion">{{c.nombre}}</div>\n        <ion-icon name="more" *ngIf="!c.expandible"></ion-icon>\n        <ion-icon name="arrow-up" *ngIf="c.expandible"></ion-icon>\n      </div>-->\n      <div class="animated fadeIn">\n        <div style="width:100%;background-color: #457be7;" *ngIf="getMuestraCercano() == 1"><strong style="color: white">Más cercana</strong></div>\n        <div style="width:100%;background-color: #020f32; color: white;">\n            <div style="width:75%; height: 4em; display:inline-block; vertical-align: top;">\n\n              <div align="left" style="margin-left: -30px;"><strong class="nombreEstacionN"></strong>\n                \n            <button ion-button (click)="navigateLocation()" class="botonnav">\n              <ion-icon name="navigate" class="navegar"></ion-icon>\n              Ir\n            </button>\n              </div>\n              <div align="left" style="margin-left: -30px;" class="estacionDireccion"></div>\n            </div>\n            <!--<div style="width:23%;display:inline-block">\n                <img src="assets/imgs/estaciones/gasolinera.PNG" alt="logo" class="animated bounceInDown" />\n              </div>-->\n        </div>\n        <div class="containerGas">\n          <img src="assets/imgs/home/verde.png" alt="logo" class="animated bounceInDown imageGas" />\n          <div class="precioGas uno" style="font-size: 190%;">\n            \n          </div>\n        </div>\n        <div class="containerGas">\n          <img src="assets/imgs/home/rojo.png" alt="logo" class="animated bounceInDown imageGas" />\n          <div class="precioGas dos" style="font-size: 190%;">\n            \n          </div>\n        </div>\n        <div class="containerGas">\n          <img src="assets/imgs/home/negro.png" alt="logo" class="animated bounceInDown imageGas" />\n          <div class="precioGas tres" style="font-size: 190%;">\n            \n          </div>\n        </div>\n      </div>\n<!--    </div>-->\n  </div>\n</ion-content>'/*ion-inline-end:"C:\Users\Administrador\kenergy\src\pages\estaciones\estaciones.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["m" /* NavParams */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["o" /* PopoverController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* LoadingController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["b" /* AlertController */],
            __WEBPACK_IMPORTED_MODULE_4__providers_rest_service__["a" /* RestServiceProvider */], __WEBPACK_IMPORTED_MODULE_5__providers_alerta_service__["a" /* AlertaServiceProvider */],
            __WEBPACK_IMPORTED_MODULE_6__ionic_native_geolocation__["a" /* Geolocation */], __WEBPACK_IMPORTED_MODULE_8__ionic_native_launch_navigator__["a" /* LaunchNavigator */]])
    ], EstacionesPage);
    return EstacionesPage;
}());

//# sourceMappingURL=estaciones.js.map

/***/ }),

/***/ 305:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return EstacionesListPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_alerta_service__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__providers_rest_service__ = __webpack_require__(8);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




/**
 * Generated class for the EstacionesListPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var EstacionesListPage = /** @class */ (function () {
    function EstacionesListPage(navCtrl, navParams, loadingCtrl, alertaService, restService) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.loadingCtrl = loadingCtrl;
        this.alertaService = alertaService;
        this.restService = restService;
        this.estaciones = [];
        this.estaciones2 = [];
        this.latOrigen = 0;
        this.longOrigen = 0;
        this.busquedaEst = "";
        this.estaciones = navParams.get("estaciones");
        this.estaciones2 = this.estaciones;
        this.latOrigen = navParams.get("latOrigen");
        this.longOrigen = navParams.get("longOrigen");
        this.map = navParams.get("map");
        /*this.elementInfo = (document.getElementById("infoGas") as HTMLFormElement);
        this.elementInfo.hidden = true;*/
    }
    EstacionesListPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad EstacionesListPage');
    };
    EstacionesListPage.prototype.geolocalizarGasolinera = function (estacionees) {
        var loading = this.loadingCtrl.create();
        loading.present();
        console.log(estacionees.lat);
        console.log(estacionees.long);
        this.map.setCenter({ lat: estacionees.lat, lng: estacionees.long });
        var element = document.getElementsByClassName("nombreEstacionN")[0];
        element.innerText = estacionees.nombre;
        var elementDireccion = document.getElementsByClassName("estacionDireccion")[0];
        elementDireccion.innerText = estacionees.direccion;
        var elementMagna = document.getElementsByClassName("precioGas uno")[0];
        elementMagna.innerText = "$" + estacionees.precioMagna;
        var elementPremium = document.getElementsByClassName("precioGas dos")[0];
        elementPremium.innerText = "$" + estacionees.precioPremium;
        var elementDiesel = document.getElementsByClassName("precioGas tres")[0];
        elementDiesel.innerText = "$" + estacionees.precioDiesel;
        document.getElementById("idEst").value = estacionees.id;
        document.getElementById("muestraCercano").value = estacionees.masCerca ? 1 : 0;
        //this.elementInfo.hidden = false;      
        loading.dismiss();
    };
    EstacionesListPage.prototype.selectEstacionBuscar = function (estacion) {
        var elements = document.getElementsByClassName("popover-content");
        Array.prototype.forEach.call(elements, function (item) {
            item.style.display = "none";
        });
        var elements1 = document.getElementsByClassName("popover-md");
        Array.prototype.forEach.call(elements1, function (item) {
            item.style.display = "none";
        });
        this.geolocalizarGasolinera(estacion);
    };
    EstacionesListPage.prototype.buscarInput = function () {
        var _this = this;
        this.estaciones = this.estaciones2.filter(function (est) { return est.nombre.toLowerCase().includes(_this.busquedaEst.toLowerCase()); });
    };
    EstacionesListPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-estaciones-list',template:/*ion-inline-start:"C:\Users\Administrador\kenergy\src\pages\estaciones-list\estaciones-list.html"*/'<ion-list>\n  <ion-list-header style="color: #fff;\n  background-color: #e77423;\n  text-align: center; margin-bottom: 0px;">Estaciones</ion-list-header>\n  <ion-item style="width:100%">\n    <ion-label position="floating" style="color:#1b155c;">Filtrar</ion-label>\n    <ion-input [(ngModel)]="busquedaEst" (ionChange)="buscarInput()"></ion-input>\n  </ion-item>\n  <div style="    color: #000;\n    font-size: 130%;\n    border-bottom: 1px solid #e3e5e6;\n    padding-left: 15px;\n    padding-bottom: 8px;    padding-top: 8px;" *ngFor="let estacion of estaciones" (click)="selectEstacionBuscar(estacion)">\n    {{estacion.nombre}}\n  </div>\n</ion-list>'/*ion-inline-end:"C:\Users\Administrador\kenergy\src\pages\estaciones-list\estaciones-list.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["m" /* NavParams */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* LoadingController */],
            __WEBPACK_IMPORTED_MODULE_2__providers_alerta_service__["a" /* AlertaServiceProvider */], __WEBPACK_IMPORTED_MODULE_3__providers_rest_service__["a" /* RestServiceProvider */]])
    ], EstacionesListPage);
    return EstacionesListPage;
}());

//# sourceMappingURL=estaciones-list.js.map

/***/ }),

/***/ 307:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MiAutoInfoPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__models_vehiculoModel__ = __webpack_require__(151);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__mis_autos_mis_autos__ = __webpack_require__(308);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__angular_common_http__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__ionic_storage__ = __webpack_require__(15);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__providers_alerta_service__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__providers_rest_service__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__ionic_native_sqlite__ = __webpack_require__(43);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__ionic_native_file_chooser__ = __webpack_require__(309);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__ionic_native_file_transfer__ = __webpack_require__(82);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__ionic_native_file__ = __webpack_require__(83);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__angular_forms__ = __webpack_require__(20);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13_validator__ = __webpack_require__(52);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13_validator___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_13_validator__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14__ionic_native_camera__ = __webpack_require__(310);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};















var MiAutoInfoPage = /** @class */ (function () {
    function MiAutoInfoPage(navCtrl, navParams, popoverCtrl, localStorage, alertaService, restService, sqlite, loadingCtrl, chooser, transfer, alertCtrl, file, camera) {
        var _this = this;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.popoverCtrl = popoverCtrl;
        this.localStorage = localStorage;
        this.alertaService = alertaService;
        this.restService = restService;
        this.sqlite = sqlite;
        this.loadingCtrl = loadingCtrl;
        this.chooser = chooser;
        this.transfer = transfer;
        this.alertCtrl = alertCtrl;
        this.file = file;
        this.camera = camera;
        this.vehiculos = [];
        this.hoy = new Date();
        this.dia = "Domingo";
        this.dia2 = "Domingo";
        this.diaMes = 0;
        this.tipoCombustibles = [];
        this.tipoCombustible = 0;
        this.vehiculo = new __WEBPACK_IMPORTED_MODULE_2__models_vehiculoModel__["a" /* VehiculoModel */]();
        this.usuario = null;
        this.esta = 0;
        this.idVeh = 0;
        this.verificacionVisible = false;
        this.seguroVisible = false;
        this.alertasVisible = false;
        this.tenenciaVisible = false;
        this.rendimientoVisible = false;
        this.rangosMantenimiento = [];
        this.rango = 1;
        this.fileTransfer = null;
        this.loginForm = new __WEBPACK_IMPORTED_MODULE_12__angular_forms__["b" /* FormGroup */]({
            //alias: new FormControl(''),
            /*marca: new FormControl(''),
            modelo: new FormControl(''),
            anio: new FormControl(''),*/
            mma: new __WEBPACK_IMPORTED_MODULE_12__angular_forms__["a" /* FormControl */](''),
            puntos: new __WEBPACK_IMPORTED_MODULE_12__angular_forms__["a" /* FormControl */](0),
            km: new __WEBPACK_IMPORTED_MODULE_12__angular_forms__["a" /* FormControl */](''),
            placa: new __WEBPACK_IMPORTED_MODULE_12__angular_forms__["a" /* FormControl */](''),
            estado: new __WEBPACK_IMPORTED_MODULE_12__angular_forms__["a" /* FormControl */](''),
            rendimiento: new __WEBPACK_IMPORTED_MODULE_12__angular_forms__["a" /* FormControl */](''),
            combustible: new __WEBPACK_IMPORTED_MODULE_12__angular_forms__["a" /* FormControl */](0),
            circula: new __WEBPACK_IMPORTED_MODULE_12__angular_forms__["a" /* FormControl */](0),
            periodo: new __WEBPACK_IMPORTED_MODULE_12__angular_forms__["a" /* FormControl */](0),
            uverif: new __WEBPACK_IMPORTED_MODULE_12__angular_forms__["a" /* FormControl */](''),
            pverif: new __WEBPACK_IMPORTED_MODULE_12__angular_forms__["a" /* FormControl */](''),
            agencia: new __WEBPACK_IMPORTED_MODULE_12__angular_forms__["a" /* FormControl */](''),
            telAgencia: new __WEBPACK_IMPORTED_MODULE_12__angular_forms__["a" /* FormControl */](''),
            cSeguro: new __WEBPACK_IMPORTED_MODULE_12__angular_forms__["a" /* FormControl */](''),
            nPoliza: new __WEBPACK_IMPORTED_MODULE_12__angular_forms__["a" /* FormControl */](''),
            vencimiento: new __WEBPACK_IMPORTED_MODULE_12__angular_forms__["a" /* FormControl */](''),
            mPoliza: new __WEBPACK_IMPORTED_MODULE_12__angular_forms__["a" /* FormControl */](0),
            telefono: new __WEBPACK_IMPORTED_MODULE_12__angular_forms__["a" /* FormControl */](''),
            tenencia: new __WEBPACK_IMPORTED_MODULE_12__angular_forms__["a" /* FormControl */](''),
            checkVerificacion: new __WEBPACK_IMPORTED_MODULE_12__angular_forms__["a" /* FormControl */](false),
            checkVencimiento: new __WEBPACK_IMPORTED_MODULE_12__angular_forms__["a" /* FormControl */](false),
            checkMantenimiento: new __WEBPACK_IMPORTED_MODULE_12__angular_forms__["a" /* FormControl */](false),
            mantenimiento: new __WEBPACK_IMPORTED_MODULE_12__angular_forms__["a" /* FormControl */](0),
            checkTenencia: new __WEBPACK_IMPORTED_MODULE_12__angular_forms__["a" /* FormControl */](false),
            checkNocircula: new __WEBPACK_IMPORTED_MODULE_12__angular_forms__["a" /* FormControl */](false)
        });
        this.loginFormValidator = {
            principales: {
                mensaje: ''
            }
        };
        this.optionsCamera = {
            quality: 100,
            destinationType: this.camera.DestinationType.FILE_URI,
            encodingType: this.camera.EncodingType.JPEG,
            mediaType: this.camera.MediaType.PICTURE
        };
        this.localStorage.ready().then(function () {
            _this.localStorage.get("@userSession").then(function (data) {
                if (data != null) {
                    _this.usuario = data;
                    _this.cargarDatosAuto();
                }
                else {
                    _this.alertaService.warnAlert(_this.restService.headerValidacion, "Usuario sin sesión, no se cargarán sus datos", null);
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
    MiAutoInfoPage.prototype.ngOnInit = function () {
        this.onValueChanges();
    };
    MiAutoInfoPage.prototype.ionViewDidEnter = function () {
        document.getElementById("editado").value = -1;
    };
    MiAutoInfoPage.prototype.ionViewCanLeave = function () {
        var _this = this;
        return new Promise(function (resolve, reject) {
            if (document.getElementById("editado").value == 0)
                resolve();
            else
                _this.alertaService.alertaConfirmacion("Confirmar", "¿Desea salir sin guardar los cambios realizados?", resolve, reject);
        });
    };
    MiAutoInfoPage.prototype.getDay = function (dia) {
        var diaEs = "";
        switch (dia) {
            case 0:
                diaEs = "Domingo";
                break;
            case 1:
                diaEs = "Lunes";
                break;
            case 2:
                diaEs = "Martes";
                break;
            case 3:
                diaEs = "Miércoles";
                break;
            case 4:
                diaEs = "Jueves";
                break;
            case 5:
                diaEs = "Viernes";
                break;
            case 6:
                diaEs = "Sábado";
                break;
        }
        return diaEs;
    };
    MiAutoInfoPage.prototype.presentPopover = function (myEvent) {
        var popover = this.popoverCtrl.create(__WEBPACK_IMPORTED_MODULE_3__mis_autos_mis_autos__["a" /* MisAutosPage */], { vehiculos: this.vehiculos });
        popover.present({
            ev: myEvent
        });
    };
    MiAutoInfoPage.prototype.cargarDatosAuto = function () {
        var _this = this;
        var loading = this.loadingCtrl.create();
        loading.present();
        var armaUrl = "vehicle/regular/" + this.usuario.LlaveroContado;
        this.restService.getToken().timeout(this.restService.timeOver).subscribe(function (data) {
            _this.restService.restServiceGETToken(armaUrl, new __WEBPACK_IMPORTED_MODULE_4__angular_common_http__["d" /* HttpParams */](), data.toString()).timeout(_this.restService.timeOver).subscribe(function (dataAutos) {
                if (dataAutos['Response'] != null && dataAutos['Response'] instanceof Array) {
                    var array = dataAutos['Response'];
                    array.forEach(function (auto) {
                        _this.vehiculos.push(new __WEBPACK_IMPORTED_MODULE_2__models_vehiculoModel__["a" /* VehiculoModel */](false, auto.Placa, 1, auto.Den, auto.Codprd == 1 ? 150 : auto.Codprd == 2 ? 151 : auto.Codprd == 3 ? 152 : auto.Codprd, auto.Oct == 92 ? 1 : auto.Oct == 87 ? 2 : 3, 1, auto.Id, auto.NumVeh, 1, "", auto.Marca));
                    });
                    _this.vehiculo = _this.vehiculos[0];
                    _this.vehiculos[0].seleccionado = true;
                    _this.restService.getToken().timeout(_this.restService.timeOver).subscribe(function (data) {
                        if (data == null) {
                            loading.dismiss();
                            _this.alertaService.warnAlert(_this.restService.headerValidacion, _this.restService.mensajeValidacionAdmin, null);
                        }
                        else {
                            console.log(_this.vehiculo);
                            _this.restService.restServiceGETToken("vehicle/regular/detail/" + _this.vehiculo.id + "/" + _this.vehiculo.Id, new __WEBPACK_IMPORTED_MODULE_4__angular_common_http__["d" /* HttpParams */](), data.toString()).timeout(_this.restService.timeOver).subscribe(function (dataRegistro) {
                                _this.vehiculo = dataRegistro['Response'];
                                console.log(JSON.stringify(_this.vehiculo));
                                _this.actualizarDatosModelo(_this.vehiculo);
                                var imagen = dataRegistro['Response'].Imagen == "" ? "<img src='assets/imgs/miAuto/add.png' style='width: 40%; display: block; margin: auto;'/>" : "<img src='http://169.60.32.119/Imagenes/" + dataRegistro['Response'].Imagen + "?" + new Date().getTime() + "' style='width: 100%; display: block; margin: auto;' />";
                                document.getElementById("aImagen").innerHTML = imagen;
                                //this.cargaDatosDeBaseDeDatos(this.vehiculo.Id);
                                loading.dismiss();
                            }, function (error) {
                                loading.dismiss();
                                console.log(error);
                                _this.alertaService.errorAlert(_this.restService.headerError, _this.restService.mensajeError, null);
                            });
                        }
                    }, function (error) {
                        loading.dismiss();
                        console.log(error);
                        _this.alertaService.errorAlert(_this.restService.headerError, _this.restService.mensajeError, null);
                    });
                }
                else
                    loading.dismiss();
            }, function (error) {
                loading.dismiss();
                console.log(error);
                _this.alertaService.errorAlert(_this.restService.headerError, _this.restService.mensajeError, null);
            });
        }, function (error) {
            loading.dismiss();
            console.log(error);
            _this.alertaService.errorAlert(_this.restService.headerError, _this.restService.mensajeError, null);
        });
    };
    MiAutoInfoPage.prototype.actualizaAuto = function () {
        var _this = this;
        var loading = this.loadingCtrl.create();
        loading.present();
        this.restService.getToken().timeout(this.restService.timeOver).subscribe(function (data) {
            if (_this.formValidator()) {
                var km1 = _this.loginForm.value.km;
                var numveh = document.getElementById("numvehiculo").value;
                //let alias = this.loginForm.value.alias;
                /*let marca = this.loginForm.value.marca;
                let modelo = this.loginForm.value.modelo;
                let anio = this.loginForm.value.anio;*/
                var mma = _this.loginForm.value.mma;
                var placa = _this.loginForm.value.placa;
                var codprd = _this.loginForm.value.combustible;
                //vehicle/regular/{id vehiculo)
                //String:Alias, String:Marca, String:Modelo, double:Kilometraje (Requeridos)
                var urlArmada = "vehicle/regular/" + _this.usuario.LlaveroContado + "/" + numveh;
                var bodyObj = {
                    Alias: mma,
                    /*Marca: marca,
                    Modelo: modelo,
                    Anio: anio,*/
                    Kilometraje: km1,
                    Placa: placa,
                    Codprd: codprd
                };
                _this.restService.restServicePUTToken(urlArmada, bodyObj, data.toString()).timeout(_this.restService.timeOver).subscribe(function (dataRegistro) {
                    if (dataRegistro['Status'] == 1) {
                        _this.alertaService.alertaBasica(_this.restService.headerExito, "Sus datos se han actualizado correctamente", null);
                        //this.insertaOActulizaVehiculoEnBD(idVehiculo);
                        document.getElementById("editado").value = 0;
                    }
                    else {
                        _this.alertaService.warnAlert(_this.restService.headerValidacion, dataRegistro['Message'], null);
                    }
                    loading.dismiss();
                }, function (error) {
                    loading.dismiss();
                    console.log(error);
                    _this.alertaService.errorAlert(_this.restService.headerError, _this.restService.mensajeError, null);
                });
            }
            loading.dismiss();
        }, function (error) {
            loading.dismiss();
            console.log(error);
            _this.alertaService.errorAlert(_this.restService.headerError, _this.restService.mensajeError, null);
        });
    };
    MiAutoInfoPage.prototype.cargaDatosDeBaseDeDatos = function (id) {
        var _this = this;
        var sql = 'SELECT * FROM mis_autos where id_vehiculo = ?';
        this.sqlite.create({
            name: 'kenergy.db',
            location: 'default'
        }).then(function (db) {
            db.executeSql(sql, [id])
                .then(function (response) {
                var tasks = [];
                if (response.rows.length != 0) {
                    document.getElementById("vehiculo.circula").value = response.rows.item(0).no_circula;
                    document.getElementById("vehiculo.periodo").value = response.rows.item(0).periodo;
                    document.getElementById("vehiculo.tipoCombustible").value = response.rows.item(0).tipo_combustible;
                    document.getElementById("vehiculo.estado").value = response.rows.item(0).estado;
                    document.getElementById("vehiculo.ultimaFechaVerificacion").value = response.rows.item(0).ultima_fecha_verificacion;
                    document.getElementById("vehiculo.proximaFechaVerificacion").value = response.rows.item(0).proxima_fecha_verificacion;
                    document.getElementById("vehiculo.agencia").value = response.rows.item(0).agencia;
                    document.getElementById("vehiculo.telefono").value = response.rows.item(0).telefono;
                    document.getElementById("vehiculo.companiaSeguro").value = response.rows.item(0).compania_Seguro;
                    document.getElementById("vehiculo.poliza").value = response.rows.item(0).poliza;
                    document.getElementById("vehiculo.fechaVencimiento").value = response.rows.item(0).fecha_vencimiento;
                    document.getElementById("vehiculo.montoPoliza").value = response.rows.item(0).monto_poliza;
                    document.getElementById("vehiculo.telefonoSeguro").value = response.rows.item(0).telefono_seguro;
                    if (response.rows.item(0).verificacion == 1)
                        document.getElementById("vehiculo.verificacion").checked = true;
                    else
                        document.getElementById("vehiculo.verificacion").checked = false;
                    if (response.rows.item(0).vencimiento == 1)
                        document.getElementById("vehiculo.vencimiento").checked = true;
                    else
                        document.getElementById("vehiculo.vencimiento").checked = false;
                    if (response.rows.item(0).mantenimiento_cada == 1)
                        document.getElementById("vehiculo.mantenimiento").checked = true;
                    else
                        document.getElementById("vehiculo.mantenimiento").checked = false;
                    document.getElementById("vehiculo.mantenimientoRango").value = response.rows.item(0).mantenimiento_cada_rango;
                    if (response.rows.item(0).pago_de_tenencia == 1)
                        document.getElementById("vehiculo.pagoTenencia").checked = true;
                    else
                        document.getElementById("vehiculo.pagoTenencia").checked = false;
                    if (response.rows.item(0).hoy_no_circula == 1)
                        document.getElementById("vehiculo.hoyNoCircula").checked = true;
                    else
                        document.getElementById("vehiculo.hoyNoCircula").checked = false;
                    document.getElementById("esta").value = 1;
                }
                else {
                    document.getElementById("esta").value = 0;
                }
            })
                .catch(function (error) { return _this.alertaService.errorAlert("Info Error", error, null); });
        })
            .catch(function (error) {
            _this.alertaService.errorAlert("Info", "Excepcion al crear BD " + error, null);
        });
    };
    MiAutoInfoPage.prototype.insertaOActulizaVehiculoEnBD = function (id) {
        var _this = this;
        var circula = '';
        if (null != document.getElementById("vehiculo.circula")) {
            circula = document.getElementById("vehiculo.circula").value;
        }
        var periodo = '';
        if (null != document.getElementById("vehiculo.periodo")) {
            periodo = document.getElementById("vehiculo.periodo").value;
        }
        var tipoCombustible = '';
        if (null != document.getElementById("vehiculo.tipoCombustible")) {
            tipoCombustible = document.getElementById("vehiculo.tipoCombustible").value;
        }
        var estado = '';
        if (null != document.getElementById("vehiculo.estado")) {
            estado = document.getElementById("vehiculo.estado").value;
        }
        var ultimaFechaVerificacion = '';
        if (null != document.getElementById("vehiculo.ultimaFechaVerificacion")) {
            ultimaFechaVerificacion = document.getElementById("vehiculo.ultimaFechaVerificacion").value;
        }
        var proximaFechaVerificacion = '';
        if (null != document.getElementById("vehiculo.proximaFechaVerificacion")) {
            proximaFechaVerificacion = document.getElementById("vehiculo.proximaFechaVerificacion").value;
        }
        var agencia = '';
        if (null != document.getElementById("vehiculo.agencia")) {
            agencia = document.getElementById("vehiculo.agencia").value;
        }
        var telefono = '';
        if (null != document.getElementById("vehiculo.telefono")) {
            telefono = document.getElementById("vehiculo.telefono").value;
        }
        var companiaSeguro = '';
        if (null != document.getElementById("vehiculo.companiaSeguro")) {
            companiaSeguro = document.getElementById("vehiculo.companiaSeguro").value;
        }
        var poliza = '';
        if (null != document.getElementById("vehiculo.poliza")) {
            poliza = document.getElementById("vehiculo.poliza").value;
        }
        var fechaVencimiento = '';
        if (null != document.getElementById("vehiculo.fechaVencimiento")) {
            fechaVencimiento = document.getElementById("vehiculo.fechaVencimiento").value;
        }
        var montoPoliza = '';
        if (null != document.getElementById("vehiculo.montoPoliza")) {
            montoPoliza = document.getElementById("vehiculo.montoPoliza").value;
        }
        var telefonoSeguro = '';
        if (null != document.getElementById("vehiculo.telefonoSeguro")) {
            telefonoSeguro = document.getElementById("vehiculo.telefonoSeguro").value;
        }
        var verificacion = 0;
        if (null != document.getElementById("vehiculo.verificacion")) {
            if (document.getElementById("vehiculo.verificacion").checked == true)
                verificacion = 1;
            else
                verificacion = 0;
        }
        var vencimiento = 0;
        if (null != document.getElementById("vehiculo.vencimiento")) {
            if (document.getElementById("vehiculo.vencimiento").checked == true)
                vencimiento = 1;
            else
                vencimiento = 0;
        }
        var mantenimiento = 0;
        if (null != document.getElementById("vehiculo.mantenimiento")) {
            if (document.getElementById("vehiculo.mantenimiento").checked == true)
                mantenimiento = 1;
            else
                mantenimiento = 0;
        }
        var mantenimientoRango = 1;
        if (null != document.getElementById("vehiculo.mantenimientoRango")) {
            mantenimientoRango = document.getElementById("vehiculo.mantenimientoRango").value;
        }
        var pagoTenencia = 0;
        if (null != document.getElementById("vehiculo.pagoTenencia")) {
            if (document.getElementById("vehiculo.pagoTenencia").checked == true)
                pagoTenencia = 1;
            else
                pagoTenencia = 0;
        }
        var hoyNoCircula = 0;
        if (null != document.getElementById("vehiculo.hoyNoCircula")) {
            if (document.getElementById("vehiculo.hoyNoCircula").checked == true)
                hoyNoCircula = 1;
            else
                hoyNoCircula = 0;
        }
        var sql = "";
        //this.alertaService.errorAlert("esta", ''+this.esta, null);
        if (document.getElementById("esta").value == 0) {
            //No se encuentra hay que insertar	
            sql = 'INSERT INTO mis_autos VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)';
            this.sqlite.create({
                name: 'kenergy.db',
                location: 'default'
            }).then(function (db) {
                db.executeSql(sql, [id,
                    circula, periodo, tipoCombustible, estado, ultimaFechaVerificacion,
                    proximaFechaVerificacion, agencia, telefono, companiaSeguro, poliza,
                    fechaVencimiento, montoPoliza, telefonoSeguro, verificacion, vencimiento,
                    mantenimiento, mantenimientoRango, pagoTenencia, hoyNoCircula])
                    .then(function (response) {
                    console.log("Se ha actualizado correctamente");
                })
                    .catch(function (error) { return _this.alertaService.errorAlert("Info", JSON.stringify(error), null); });
            })
                .catch(function (error) {
                _this.alertaService.errorAlert("Info", "Excepcion al actualizar insertar BD " + error, null);
            });
        }
        else {
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
            }).then(function (db) {
                db.executeSql(sql, [circula, periodo, tipoCombustible, estado, ultimaFechaVerificacion,
                    proximaFechaVerificacion, agencia, telefono, companiaSeguro, poliza,
                    fechaVencimiento, montoPoliza, telefonoSeguro, verificacion, vencimiento,
                    mantenimiento, mantenimientoRango, pagoTenencia, hoyNoCircula, id])
                    .then(function (response) {
                    console.log("Se ha actualizado correctamente");
                })
                    .catch(function (error) { return _this.alertaService.errorAlert("Info", JSON.stringify(error), null); });
            })
                .catch(function (error) {
                _this.alertaService.errorAlert("Info", "Excepcion al actualizar insertar BD " + error, null);
            });
        }
    };
    MiAutoInfoPage.prototype.mostrarCamara = function () {
        var _this = this;
        this.camera.getPicture(this.optionsCamera).then(function (imageData) {
            // imageData is either a base64 encoded string or a file URI
            // If it's base64 (DATA_URL):
            var base64Image = 'data:image/jpeg;base64,' + imageData;
            _this.upload(imageData);
        }, function (err) {
        });
    };
    MiAutoInfoPage.prototype.mostrar = function () {
        var _this = this;
        var prompt = this.alertCtrl.create({
            title: "Seleccione el origen de la foto",
            buttons: [
                {
                    text: 'Cámara',
                    handler: function (data) {
                        _this.mostrarCamara();
                    }
                },
                {
                    text: 'Galería',
                    handler: function (data) {
                        _this.mostrarGaleria();
                    }
                },
                {
                    text: 'Cancelar',
                    role: 'cancel'
                }
            ]
        });
        prompt.present();
    };
    MiAutoInfoPage.prototype.mostrarGaleria = function () {
        var _this = this;
        var filter = { "mime": "image/jpeg" };
        //this.chooser.open(filter)
        this.chooser.open()
            .then(function (uri) { return _this.upload(uri); })
            .catch(function (e) { return console.log(e); });
    };
    MiAutoInfoPage.prototype.upload = function (url) {
        var _this = this;
        var nombre = document.getElementById("idVehiculo").value + ".jpg";
        var options = {
            fileKey: 'file',
            fileName: nombre,
            headers: {}
        };
        this.fileTransfer.upload(url, 'http://169.60.32.119/api/image/add', options)
            .then(function (data) {
            _this.alertaService.alertaBasica(_this.restService.headerExito, "La foto se ha guardado correctamente. ", null);
            var imagen = "<img src='http://169.60.32.119/Imagenes/" + nombre + "?" + new Date().getTime() + "' style='width: 100%;' />";
            document.getElementById("aImagen").innerHTML = imagen;
        }, function (err) {
            // error
        });
    };
    MiAutoInfoPage.prototype.mostrarVerificacion = function () {
        this.verificacionVisible = this.verificacionVisible ? false : true;
    };
    MiAutoInfoPage.prototype.mostrarSeguro = function () {
        this.seguroVisible = this.seguroVisible ? false : true;
    };
    MiAutoInfoPage.prototype.mostrarAlertas = function () {
        this.alertasVisible = this.alertasVisible ? false : true;
    };
    MiAutoInfoPage.prototype.mostrarTenencia = function () {
        this.tenenciaVisible = this.tenenciaVisible ? false : true;
    };
    MiAutoInfoPage.prototype.mostrarRendimiento = function () {
        this.rendimientoVisible = this.rendimientoVisible ? false : true;
    };
    MiAutoInfoPage.prototype.actualizarDatosModelo = function (vehiculo) {
        this.loginForm.patchValue({
            //alias: vehiculo.Alias,
            /*marca: vehiculo.Marca,
            modelo: vehiculo.Modelo,
            anio: vehiculo.Anio,*/
            mma: vehiculo.Den,
            km: vehiculo.Kilometraje,
            placa: vehiculo.Placa,
            rendimiento: vehiculo.Rendimiento,
            puntos: "Puntos Generados: " + vehiculo.Puntos,
            codprd: vehiculo.tipoGasolina
        });
    };
    MiAutoInfoPage.prototype.formValidator = function () {
        /*if (validator.isEmpty(this.loginForm.value.alias)) {
          this.loginFormValidator.principales.mensaje = 'Es necesario capturar el Alias';
          this.cambiarDiseñoInput("alias",1);
          return false;
          } else {
          this.loginFormValidator.principales.mensaje = '';
          this.cambiarDiseñoInput("alias");
        }*/
        if (__WEBPACK_IMPORTED_MODULE_13_validator___default.a.isEmpty(this.loginForm.value.mma)) {
            this.loginFormValidator.principales.mensaje = 'Es necesario capturar la Marca, modelo y año';
            this.cambiarDiseñoInput("mma", 1);
            return false;
        }
        else {
            this.loginFormValidator.principales.mensaje = '';
            this.cambiarDiseñoInput("mma");
        }
        /*if (validator.isEmpty(this.loginForm.value.modelo)) {
          this.loginFormValidator.principales.mensaje = 'Es necesario capturar el Modelo';
          this.cambiarDiseñoInput("modelo",1);
          return false;
          } else {
          this.loginFormValidator.principales.mensaje = '';
          this.cambiarDiseñoInput("modelo");
        }*/
        return true;
    };
    MiAutoInfoPage.prototype.cambiarDiseñoInput = function (id, color) {
        if (color === void 0) { color = 0; }
        var strColor = color == 1 ? "red" : "white";
        document.getElementById(id).style.backgroundColor = strColor;
    };
    MiAutoInfoPage.prototype.onValueChanges = function () {
        var _this = this;
        this.loginForm.valueChanges.subscribe(function (val) {
            document.getElementById("editado").value++;
            console.log(_this.loginForm.value.mantenimiento);
        });
    };
    MiAutoInfoPage.prototype.cambioFecha = function () {
        console.log(this.loginForm.value.pverif);
    };
    MiAutoInfoPage.prototype.eliminarVehiculo = function (numAuto, puntos) {
        console.log(this.usuario.LlaveroContado + " " + numAuto);
        /*var armaUrl = "vehicle/movil/" + this.usuario.LlaveroContado + "/" + numAuto;
        this.restService.getToken().timeout(this.restService.timeOver).subscribe(data => {
        this.restService.restServiceDELETEToken(armaUrl, data.toString()).timeout(this.restService.timeOver).subscribe(
          dataAutos => {
            if(dataAutos == true){
              this.alertaService.alertaBasica("Eliminación de auto","Su auto se ha eliminado exitosamente",null);
              let index = this.vehiculos.findIndex(i => i.id === numAuto);
              this.vehiculos.splice(index,1);
              if(this.vehiculos.length > 0){
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
              }
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
        });*/
    };
    MiAutoInfoPage.prototype.eliminarVehiculoAlerta = function (numAuto, den, puntos) {
        var _this = this;
        var alert = this.alertCtrl.create({
            title: 'Confirmar Eliminación',
            message: '¿Desea eliminar el vehiculo ' + den + '?',
            buttons: [
                {
                    text: 'Aceptar',
                    handler: function () {
                        _this.eliminarVehiculo(numAuto, puntos);
                    }
                },
                {
                    text: 'Cancelar',
                    role: 'cancel',
                    handler: function () {
                    }
                }
            ]
        });
        alert.present();
    };
    MiAutoInfoPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-mi-auto-info',template:/*ion-inline-start:"C:\Users\Administrador\kenergy\src\pages\mi-auto-info\mi-auto-info.html"*/'<ion-header>\n  <ion-navbar color="titulo">\n    <button ion-button menuToggle>\n      <ion-icon name="menu"></ion-icon>\n    </button>\n    <ion-title class="tituloHeader" style="position: absolute;left: 25%; top: 33%;">Mi Auto</ion-title>\n\n    <ion-buttons end>\n      <button ion-button (click)="presentPopover($event)" style="color:#fff">\n        <ion-icon name="search" style="font-size: 2.2em;"></ion-icon>\n      </button>\n    </ion-buttons>\n\n\n    <ion-buttons left *ngIf="!isOn" class="animated fadeIn">\n      <button icon-only="" ion-button="" class="disable-hover bar-button bar-button-ios bar-button-default bar-button-default-ios">\n        <span class="button-inner">\n          <img src="assets/imgs/miAuto/carro.png" style="width: 65%;margin-left: -27px;">\n        </span>\n        <div class="button-effect">\n\n        </div>\n      </button>\n    </ion-buttons>\n  </ion-navbar>\n</ion-header>\n\n\n<ion-content class="animated fadeIn" padding style="\n  background-image: url(assets/imgs/fondo.jpg); \n  background-size: 100%;\n  background-position: center center;">\n  <input type="hidden" [(ngModel)]="vehiculo.Nroveh" id="numvehiculo"/>\n  <input type="hidden" id="esta"/>\n  <input type="hidden" id="editado"/>\n  <form [formGroup]="loginForm">\n  <div style="width:100%;">\n    \n    <div style="width:100%">\n      <button ion-button clear item-end style="padding: 2px 5px;" (click)="actualizaAuto()">\n        <ion-icon name="save" style="font-size: 2.4em;"></ion-icon>\n      </button>\n      <button ion-button clear item-end class="trashButton" (click)="eliminarVehiculoAlerta(vehiculo.Nroveh,vehiculo.Den,0)">\n        <ion-icon name="trash" style="font-size: 2.4em;"></ion-icon>\n    </button>\n    </div>\n    <div style="display:inline-block;width:100%;vertical-align: top;">\n      <div id="aImagen" (click)="mostrar()"></div>\n    </div>\n    <input type="hidden" id="idVehiculo"/>\n    <input type="hidden" id="esta"/>\n    <div style="width:100%;display: inline-block; margin-top: 15px;">\n        <input formControlName="puntos" class="inputText" id="puntos1" readonly="true" style="background-color: rgb(16,53,138); height: 60px; text-align: center; text-indent: 0px; color: white; font-size: 18px;"/>\n    </div>\n    \n    <div class="tituloDiv tituloHeader">Datos del vehículo</div>\n    <!-- <ion-label position="floating" style="color:#181560;">Alias</ion-label>\n    <ion-input formControlName="alias" style="color: #000;" autocapitalize="off" autocomplete="off" autocorrect="off" id="alias"></ion-input>-->\n    <div style="width:100%; margin-top: 0.6em;">\n      <!-- <ion-item style="width:100%">\n        <ion-label position="floating" style="color:#181560;">Marca</ion-label>\n        <ion-input formControlName="marca" style="color: #000;" autocapitalize="off" autocomplete="off" autocorrect="off" id="marca"></ion-input>\n      </ion-item>\n      <ion-item style="width:100%">\n        <ion-label position="floating" style="color:#181560;">Modelo</ion-label>\n        <ion-input formControlName="modelo" style="color: #000;" autocapitalize="off" autocomplete="off" autocorrect="off" id="modelo"></ion-input>\n      </ion-item>\n      <ion-item style="width:100%">\n        <ion-label position="floating" style="color:#1b155c;">Año:</ion-label>\n        <ion-input formControlName="anio" type="number" style="color: #000;" autocapitalize="off" autocomplete="off" autocorrect="off" id="anio"></ion-input>\n      </ion-item>-->\n      <ion-label position="floating" style="color:#1b155c;">Marca, Modelo y Año:</ion-label>\n      <ion-input formControlName="mma" style="color: #000;" autocapitalize="off" autocomplete="off" autocorrect="off" id="mma"></ion-input>\n      <ion-item *ngIf="loginFormValidator.principales.mensaje">\n        <ion-label text-wrap color="danger">\n        {{ loginFormValidator.principales.mensaje }}\n        </ion-label>\n      </ion-item>\n      <ion-row>\n        <ion-col>\n          <ion-item style="width:100%" class="itemD">\n            <ion-label style="color:#1b155c;" class="labelD">Placa:</ion-label>\n            <ion-input formControlName="placa" style="color: #000;" class="textD" autocapitalize="off" autocomplete="off" autocorrect="off" id="placa"></ion-input>\n          </ion-item>\n        </ion-col>\n        <ion-col>\n          <ion-item style="width:100%" class="itemD">\n            <ion-label style="color:#1b155c;" class="labelD">Estado:</ion-label>\n            <ion-input formControlName="estado" style="color: #000;" class="textD" autocapitalize="off" autocomplete="off" autocorrect="off" id="estado"></ion-input>\n          </ion-item>\n        </ion-col>\n      </ion-row>\n\n      <!-- <ion-item style="width:100%">\n        <ion-label style="color:#1b155c;" >Circula</ion-label>\n        <ion-select id="vehiculo.circula" style="color:#000" okText="Aceptar" \n        cancelText="Cancelar" formControlName="circula">\n          <ion-option value="0">No circula</ion-option>\n          <ion-option value="1">Lunes</ion-option>\n          <ion-option value="2">Martes</ion-option>\n          <ion-option value="3">Miercoles</ion-option>\n          <ion-option value="4">Jueves</ion-option>\n          <ion-option value="5">Viernes</ion-option>\n        </ion-select>\n      </ion-item>\n\n      <ion-item style="width:100%">\n        <ion-label style="color:#1b155c;" >Periodo</ion-label>\n        <ion-select formControlName="periodo" style="color:#000" okText="Aceptar" \n        cancelText="Cancelar">\n          <ion-option value="0">\n            Periodo\n          </ion-option>\n          <ion-option value="1">\n            1er y 3er sab.\n          </ion-option>\n       <ion-option value="2">\n            2o y 4o sab\n          </ion-option>\n         </ion-select>\n      </ion-item> -->\n\n    </div>\n\n    <!--<div class="tituloDiv tituloHeader" (click)="mostrarRendimiento()">Rendimiento\n      <ion-icon name="chevron-down-outline" [style.display]="rendimientoVisible ? \'none\' : \'block\'" class="flecha"></ion-icon>\n      <ion-icon name="chevron-up-outline" [style.display]="rendimientoVisible ? \'block\' : \'none\'" class="flecha"></ion-icon>\n    </div>\n\n    <div id="datosRendimiento" [style.display]="rendimientoVisible ? \'block\' : \'none\'">\n      \n        <ion-item style="width:100%">\n          <ion-label style="color:#1b155c;">Último Km:</ion-label>\n          <ion-input formControlName="km" type="number" style="color: #000;" autocapitalize="off" autocomplete="off" autocorrect="off" id="km1"></ion-input>\n        </ion-item>\n        <ion-item style="width:100%">\n          <ion-label style="color:#1b155c;" class="labelD">Rendimiento actual:</ion-label>\n          <ion-input formControlName="rendimiento" style="color: #000;" readonly="true" id="rendimiento"></ion-input>\n        </ion-item>\n      <ion-item style="width:100%">\n        <ion-label style="color:#1b155c;">Combustible</ion-label>\n        <ion-select formControlName="combustible" id="tipoCombustible" style="color:#000" okText="Aceptar" \n        cancelText="Cancelar">\n          <ion-option *ngFor="let tipo of tipoCombustibles" value="{{tipo.id}}">\n            {{tipo.nombre}}\n          </ion-option>\n        </ion-select>\n      </ion-item>\n\n    </div>-->\n\n    <div class="tituloDiv tituloHeader" (click)="mostrarVerificacion()">Verificación vehicular\n      <ion-icon name="chevron-down-outline" [style.display]="verificacionVisible ? \'none\' : \'block\'" class="flecha"></ion-icon>\n      <ion-icon name="chevron-up-outline" [style.display]="verificacionVisible ? \'block\' : \'none\'" class="flecha"></ion-icon>\n    </div>\n\n    <div id="datosVerificacion" [style.display]="verificacionVisible ? \'block\' : \'none\'">\n      <img src="assets/imgs/miAuto/verificacion.jpg" style="width: 100%;">\n      <!-- <ion-item style="width:100%">\n        <ion-label style="color:#1b155c;">Ultima fecha</ion-label>\n        <ion-datetime displayFormat="DD/MM/YYYY" style="color: #000;" \n        formControlName="uverif" doneText="Aceptar" cancelText="Cancelar" ></ion-datetime>\n      </ion-item>\n      <ion-item style="width:100%">\n        <ion-label style="color:#1b155c;">Proxima fecha</ion-label>\n        <ion-datetime displayFormat="DD/MM/YYYY" style="color: #000;" \n        formControlName="pverif" (ionChange)="cambioFecha()"\n        doneText="Aceptar" cancelText="Cancelar" ></ion-datetime>\n      </ion-item>\n      <ion-item style="width:100%">\n          <ion-label style="color:#1b155c;" >Agencia:</ion-label>\n          <ion-input formControlName="agencia" style="color: #000;" autocapitalize="off" autocomplete="off" autocorrect="off" id="anio"></ion-input>\n      </ion-item>\n      <ion-item style="width:100%">\n          <ion-label style="color:#1b155c;">Teléfono:</ion-label>\n          <ion-input formControlName="telAgencia" style="color: #000;" autocapitalize="off" autocomplete="off" autocorrect="off" id="anio"></ion-input>\n        </ion-item> -->\n    </div>\n\n    <div class="tituloDiv tituloHeader" (click)="mostrarSeguro()">Datos del Seguro\n      <ion-icon name="chevron-down-outline" [style.display]="seguroVisible ? \'none\' : \'block\'" class="flecha"></ion-icon>\n      <ion-icon name="chevron-up-outline" [style.display]="seguroVisible ? \'block\' : \'none\'" class="flecha"></ion-icon>\n    </div>\n\n    <div id="datosSeguro" [style.display]="seguroVisible ? \'block\' : \'none\'">\n      <ion-item style="width:100%">\n        <ion-label style="color:#1b155c;" >Compañía del Seguro</ion-label>\n        <ion-input formControlName="cSeguro" style="color: #000;" class="comp" autocapitalize="off" autocomplete="off" autocorrect="off" id="anio"></ion-input>\n      </ion-item>\n      <ion-item style="width:100%">\n        <ion-label style="color:#1b155c;" >Num. Póliza</ion-label>\n        <ion-input formControlName="nPoliza" style="color: #000;" autocapitalize="off" autocomplete="off" autocorrect="off" id="anio"></ion-input>\n      </ion-item>\n      <ion-item style="width:100%">\n        <ion-label style="color:#1b155c;">Vencimiento</ion-label>\n        <ion-datetime displayFormat="DD/MM/YYYY" style="color: #000;" \n        formControlName="vencimiento" doneText="Aceptar" cancelText="Cancelar" ></ion-datetime>\n      </ion-item>\n      <!-- <ion-item style="width:100%">\n        <ion-label style="color:#1b155c;" >Monto de póliza</ion-label>\n        <ion-input formControlName="mPoliza" style="color: #000;" class="mont" autocapitalize="off" autocomplete="off" autocorrect="off" id="anio"></ion-input>\n      </ion-item> -->\n      <ion-item style="width:100%">\n        <ion-label style="color:#1b155c;" >Teléfono</ion-label>\n        <ion-input formControlName="telefono" style="color: #000;" autocapitalize="off" autocomplete="off" autocorrect="off" id="anio"></ion-input>\n      </ion-item>\n    </div>\n\n    <div class="tituloDiv tituloHeader" (click)="mostrarTenencia()">Datos de tenencia\n      <ion-icon name="chevron-down-outline" [style.display]="tenenciaVisible ? \'none\' : \'block\'" class="flecha"></ion-icon>\n      <ion-icon name="chevron-up-outline" [style.display]="tenenciaVisible ? \'block\' : \'none\'" class="flecha"></ion-icon>\n    </div>\n\n    <div id="datosTenencia" [style.display]="tenenciaVisible ? \'block\' : \'none\'">\n      <ion-item style="width:100%">\n        <ion-label style="color:#1b155c;">Fecha</ion-label>\n        <ion-datetime displayFormat="DD/MM/YYYY" style="color: #000;" \n        formControlName="tenencia" doneText="Aceptar" cancelText="Cancelar" ></ion-datetime>\n      </ion-item>\n    </div>\n\n    <div class="tituloDiv tituloHeader" (click)="mostrarAlertas()">Programar Alertas y Recordatorios\n      <ion-icon name="chevron-down-outline" [style.display]="alertasVisible ? \'none\' : \'block\'" class="flecha"></ion-icon>\n      <ion-icon name="chevron-up-outline" [style.display]="alertasVisible ? \'block\' : \'none\'" class="flecha"></ion-icon>\n    </div>\n    <div id="datosAlertas" [style.display]="alertasVisible ? \'block\' : \'none\'">\n      \n      <ion-item *ngIf="loginForm.value.pverif">\n        <ion-checkbox formControlName="checkVerificacion" color="primary"></ion-checkbox>\n        <ion-label class="label2">Verificación (15 días)</ion-label>\n      </ion-item>\n      <ion-item *ngIf="loginForm.value.vencimiento">\n        <ion-checkbox formControlName="checkVencimiento" color="primary"></ion-checkbox>\n        <ion-label class="label2">Seguro del auto</ion-label>\n      </ion-item>\n      <!-- <ion-row>\n        <ion-col class="clase1"> -->\n          <ion-item>\n            <ion-checkbox formControlName="checkMantenimiento" color="primary"></ion-checkbox>\n            <ion-label class="label3">Mantenimiento</ion-label>\n          </ion-item>\n        <!-- </ion-col> -->\n        <!-- <ion-col class="clase2">\n          <ion-select formControlName="mantenimiento" *ngIf="loginForm.value.checkMantenimiento" class="selectmant" id="vehiculo.mantenimientoRango" \n          style="">\n            <ion-option *ngFor="let rango of rangosMantenimiento" value="rango.id">\n              {{rango.valor}}\n            </ion-option>\n          </ion-select>\n        </ion-col>\n      </ion-row> -->\n      \n      <!-- <ion-item *ngIf="loginForm.value.tenencia">\n        <ion-checkbox formControlName="mantenimiento" color="primary"></ion-checkbox>\n        <ion-label class="label2">Pago de Tenencia</ion-label>\n      </ion-item>\n      <ion-item *ngIf="loginForm.value.circula > 0">\n        <ion-checkbox color="primary"></ion-checkbox>\n        <ion-label class="label2">Hoy no circula</ion-label>\n      </ion-item> -->\n  </div>\n</div>\n</form>\n</ion-content>'/*ion-inline-end:"C:\Users\Administrador\kenergy\src\pages\mi-auto-info\mi-auto-info.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["m" /* NavParams */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["o" /* PopoverController */], __WEBPACK_IMPORTED_MODULE_5__ionic_storage__["b" /* Storage */],
            __WEBPACK_IMPORTED_MODULE_6__providers_alerta_service__["a" /* AlertaServiceProvider */],
            __WEBPACK_IMPORTED_MODULE_7__providers_rest_service__["a" /* RestServiceProvider */],
            __WEBPACK_IMPORTED_MODULE_8__ionic_native_sqlite__["a" /* SQLite */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* LoadingController */],
            __WEBPACK_IMPORTED_MODULE_9__ionic_native_file_chooser__["a" /* FileChooser */],
            __WEBPACK_IMPORTED_MODULE_10__ionic_native_file_transfer__["a" /* FileTransfer */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["b" /* AlertController */],
            __WEBPACK_IMPORTED_MODULE_11__ionic_native_file__["a" /* File */], __WEBPACK_IMPORTED_MODULE_14__ionic_native_camera__["a" /* Camera */]])
    ], MiAutoInfoPage);
    return MiAutoInfoPage;
}());

//# sourceMappingURL=mi-auto-info.js.map

/***/ }),

/***/ 308:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MisAutosPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_rest_service__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__providers_alerta_service__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__angular_common_http__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__ionic_native_sqlite__ = __webpack_require__(43);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};






var MisAutosPage = /** @class */ (function () {
    function MisAutosPage(navCtrl, navParams, loadingCtrl, alertaService, restService, sqlite) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.loadingCtrl = loadingCtrl;
        this.alertaService = alertaService;
        this.restService = restService;
        this.sqlite = sqlite;
        this.vehiculos = [];
        this.vehiculo = null;
        this.vehiculos = navParams.get("vehiculos");
    }
    MisAutosPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad MisAutosPage');
    };
    MisAutosPage.prototype.cargaAutoById = function (vehiculo) {
        var _this = this;
        console.log(document.getElementById("tipoCombustible").getElementsByTagName('select'));
        for (var i = 0; i < this.vehiculos.length; i++) {
            this.vehiculos[i].seleccionado = this.vehiculos[i].Id == vehiculo.Id ? true : false;
            console.log(vehiculo);
        }
        var loading = this.loadingCtrl.create();
        loading.present();
        this.restService.getToken().timeout(this.restService.timeOver).subscribe(function (data) {
            if (data == null) {
                loading.dismiss();
                _this.alertaService.warnAlert(_this.restService.headerValidacion, _this.restService.mensajeValidacionAdmin, null);
            }
            else {
                _this.restService.restServiceGETToken("vehicle/regular/detail/" + vehiculo.id + "/" + vehiculo.Id, new __WEBPACK_IMPORTED_MODULE_4__angular_common_http__["d" /* HttpParams */](), data.toString()).timeout(_this.restService.timeOver).subscribe(function (dataRegistro) {
                    _this.vehiculo = dataRegistro['Response'];
                    var imagen = _this.vehiculo.Imagen == "" ? "<img src='assets/imgs/miAuto/add.png' style='width: 100%;' />" : "<img src='http://169.60.32.119/Imagenes/" + _this.vehiculo.Imagen + "?" + new Date().getTime() + "' style='width: 100%;' />";
                    document.getElementById("aImagen").innerHTML = imagen;
                    //(document.getElementById("km1") as HTMLFormElement).getElementsByTagName('input')[0].value = this.vehiculo.Kilometraje;
                    document.getElementById("puntos1").value = _this.vehiculo.Puntos;
                    document.getElementById("numvehiculo").value = _this.vehiculo.Nroveh;
                    /*(document.getElementById("marca") as HTMLFormElement).getElementsByTagName('input')[0].value = this.vehiculo.Marca;
                    (document.getElementById("modelo") as HTMLFormElement).getElementsByTagName('input')[0].value = this.vehiculo.Modelo;
                    (document.getElementById("anio") as HTMLFormElement).getElementsByTagName('input')[0].value = this.vehiculo.Anio;*/
                    document.getElementById("mma").getElementsByTagName('input')[0].value = _this.vehiculo.Den;
                    document.getElementById("placa").getElementsByTagName('input')[0].value = _this.vehiculo.Placa;
                    document.getElementById("rendimiento").getElementsByTagName('input')[0].value = _this.vehiculo.Rendimiento;
                    document.getElementById("editado").value = 0;
                    //(document.getElementById("tipoCombustible") as HTMLFormElement).getElementsByTagName('select-text')[0].value = "SUPER PLUS";
                    console.log(document.getElementById("tipoCombustible"));
                    var elements = document.getElementsByClassName("popover-content");
                    Array.prototype.forEach.call(elements, function (item) {
                        item.style.display = "none";
                    });
                    var elements1 = document.getElementsByClassName("popover-md");
                    Array.prototype.forEach.call(elements1, function (item) {
                        item.style.display = "none";
                    });
                    _this.cargaDatosDeBaseDeDatos(_this.vehiculo.Id);
                    loading.dismiss();
                }, function (error) {
                    loading.dismiss();
                    console.log(error);
                    _this.alertaService.errorAlert(_this.restService.headerError, _this.restService.mensajeError, null);
                });
            }
        }, function (error) {
            loading.dismiss();
            console.log(error);
            _this.alertaService.errorAlert(_this.restService.headerError, _this.restService.mensajeError, null);
        });
    };
    MisAutosPage.prototype.cargaDatosDeBaseDeDatos = function (id) {
        var _this = this;
        var sql = 'SELECT * FROM mis_autos where id_vehiculo = ?';
        this.sqlite.create({
            name: 'kenergy.db',
            location: 'default'
        }).then(function (db) {
            db.executeSql(sql, [id])
                .then(function (response) {
                var tasks = [];
                if (response.rows.length != 0) {
                    document.getElementById("vehiculo.circula").value = response.rows.item(0).no_circula;
                    document.getElementById("vehiculo.periodo").value = response.rows.item(0).periodo;
                    document.getElementById("vehiculo.tipoCombustible").value = response.rows.item(0).tipo_combustible;
                    document.getElementById("vehiculo.estado").value = response.rows.item(0).estado;
                    document.getElementById("vehiculo.ultimaFechaVerificacion").value = response.rows.item(0).ultima_fecha_verificacion;
                    document.getElementById("vehiculo.proximaFechaVerificacion").value = response.rows.item(0).proxima_fecha_verificacion;
                    document.getElementById("vehiculo.agencia").value = response.rows.item(0).agencia;
                    document.getElementById("vehiculo.telefono").value = response.rows.item(0).telefono;
                    document.getElementById("vehiculo.companiaSeguro").value = response.rows.item(0).compania_Seguro;
                    document.getElementById("vehiculo.poliza").value = response.rows.item(0).poliza;
                    document.getElementById("vehiculo.fechaVencimiento").value = response.rows.item(0).fecha_vencimiento;
                    document.getElementById("vehiculo.montoPoliza").value = response.rows.item(0).monto_poliza;
                    document.getElementById("vehiculo.telefonoSeguro").value = response.rows.item(0).telefono_seguro;
                    if (response.rows.item(0).verificacion == 1)
                        document.getElementById("vehiculo.verificacion").checked = true;
                    else
                        document.getElementById("vehiculo.verificacion").checked = false;
                    if (response.rows.item(0).vencimiento == 1)
                        document.getElementById("vehiculo.vencimiento").checked = true;
                    else
                        document.getElementById("vehiculo.vencimiento").checked = false;
                    if (response.rows.item(0).mantenimiento_cada == 1)
                        document.getElementById("vehiculo.mantenimiento").checked = true;
                    else
                        document.getElementById("vehiculo.mantenimiento").checked = false;
                    document.getElementById("vehiculo.mantenimientoRango").value = response.rows.item(0).mantenimiento_cada_rango;
                    if (response.rows.item(0).pago_de_tenencia == 1)
                        document.getElementById("vehiculo.pagoTenencia").checked = true;
                    else
                        document.getElementById("vehiculo.pagoTenencia").checked = false;
                    if (response.rows.item(0).hoy_no_circula == 1)
                        document.getElementById("vehiculo.hoyNoCircula").checked = true;
                    else
                        document.getElementById("vehiculo.hoyNoCircula").checked = false;
                    document.getElementById("esta").value = 1;
                }
                else {
                    document.getElementById("esta").value = 0;
                }
            })
                .catch(function (error) { return _this.alertaService.errorAlert("Info Error", error, null); });
        })
            .catch(function (error) {
            _this.alertaService.errorAlert("Info", "Excepcion al crear BD " + error, null);
        });
    };
    MisAutosPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-mis-autos',template:/*ion-inline-start:"C:\Users\Administrador\kenergy\src\pages\mis-autos\mis-autos.html"*/'<ion-list>\n    <ion-list-header class="tituloHeader" style="color: #fff;\n    background-color: #e77423;\n    text-align: center;">Mis Autos</ion-list-header>\n    <div style="color: #000;\n    font-size: 133%;     margin-left: 10px;\n    border-bottom: 1px solid #e3e5e6;  \n    margin-top: 8px;" *ngFor="let vehiculo of vehiculos" [style.background-color]="vehiculo.seleccionado ? \'#60B1F0 \' : \'white\'" >\n      <div (click)="cargaAutoById(vehiculo)">{{vehiculo.Marca}} - {{vehiculo.Modelo}}</div>\n    </div>\n  </ion-list>'/*ion-inline-end:"C:\Users\Administrador\kenergy\src\pages\mis-autos\mis-autos.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["m" /* NavParams */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* LoadingController */],
            __WEBPACK_IMPORTED_MODULE_3__providers_alerta_service__["a" /* AlertaServiceProvider */], __WEBPACK_IMPORTED_MODULE_2__providers_rest_service__["a" /* RestServiceProvider */], __WEBPACK_IMPORTED_MODULE_5__ionic_native_sqlite__["a" /* SQLite */]])
    ], MisAutosPage);
    return MisAutosPage;
}());

//# sourceMappingURL=mis-autos.js.map

/***/ }),

/***/ 311:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MisDatosCreditoPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ionic_storage__ = __webpack_require__(15);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__providers_alerta_service__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__providers_rest_service__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__angular_common_http__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__aviso_privacidad_aviso_privacidad__ = __webpack_require__(157);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__services_notificaciones_service__ = __webpack_require__(17);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__services_abrirnotificaciones_service__ = __webpack_require__(18);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__services_usuario_service__ = __webpack_require__(59);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};










var MisDatosCreditoPage = /** @class */ (function () {
    function MisDatosCreditoPage(navCtrl, navParams, localStorage, alertaService, restService, loadingCtrl, alertCtrl, viewCtrl, notificacion, mostrarNotif, usuarioService) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.localStorage = localStorage;
        this.alertaService = alertaService;
        this.restService = restService;
        this.loadingCtrl = loadingCtrl;
        this.alertCtrl = alertCtrl;
        this.viewCtrl = viewCtrl;
        this.notificacion = notificacion;
        this.mostrarNotif = mostrarNotif;
        this.usuarioService = usuarioService;
        this.usuario = "";
        this.email = "";
        this.user = null;
        this.nombre = null;
        this.celular = null;
        this.openSesion();
    }
    MisDatosCreditoPage.prototype.openSesion = function () {
        var _this = this;
        this.localStorage.ready().then(function () {
            _this.localStorage.get("@userSession").then(function (data) {
                if (data != null) {
                    _this.user = data;
                    _this.usuario = _this.user.Nombre;
                    _this.email = _this.user.Email;
                    _this.nombre = _this.user.Nombre;
                    if (_this.user.Celular != undefined) {
                        _this.celular = _this.user.Celular;
                    }
                    //this.cargarEdosCuenta();
                }
                else {
                    _this.alertaService.warnAlert(_this.restService.headerValidacion, "Usuario sin sesión, no se cargarán sus datos", null);
                }
            });
        });
    };
    MisDatosCreditoPage.prototype.editarUsuario = function (resolve) {
        var _this = this;
        if (resolve === void 0) { resolve = null; }
        var loading = this.loadingCtrl.create();
        loading.present();
        this.restService.getToken().timeout(this.restService.timeOver).subscribe(function (data) {
            if (data == null) {
                loading.dismiss();
                _this.alertaService.warnAlert(_this.restService.headerValidacion, _this.restService.mensajeValidacionAdmin, null);
            }
            else {
                if (_this.user != null) {
                    if (_this.nombre == undefined || _this.celular == undefined ||
                        _this.nombre == null || _this.celular == null ||
                        _this.nombre.length == 0 || _this.celular.length == 0) {
                        loading.dismiss();
                        _this.alertaService.warnAlert(_this.restService.headerValidacion, "Favor de capturar todos los datos", null);
                        return;
                    }
                    else {
                        var a = 1666;
                        var urlArmada = "user/update/" + _this.user.Id;
                        var bodys = new __WEBPACK_IMPORTED_MODULE_5__angular_common_http__["d" /* HttpParams */]()
                            .set('Nombre', _this.nombre)
                            .set('Alias', "-")
                            .set('Celular', _this.celular);
                        _this.restService.restServicePOSTTokenXForm(urlArmada, bodys, data.toString()).timeout(_this.restService.timeOver).subscribe(function (dataRegistro) {
                            if (Object.keys(dataRegistro['Response']).length != 0) {
                                //this.combustibles.push(new CombustibleModel("Ixtaczoquitlan", 88.88, 88.88, 88.88, true));
                            }
                            else if (dataRegistro['Status'] == 0) {
                                _this.alertaService.warnAlert(_this.restService.headerValidacion, dataRegistro['Message'], null);
                            }
                            else if (dataRegistro['Response'] == true) {
                                _this.user.Nombre = _this.nombre;
                                var element = document.getElementsByClassName("nombreUsuario")[0];
                                element.innerText = _this.user.Nombre;
                                _this.user.Celular = _this.celular;
                                _this.usuarioService.cambiarNombre(_this.nombre);
                                _this.localStorage.set("@userSession", _this.user);
                                document.getElementById("editado").value = 0;
                                _this.alertaService.alertaBasica(_this.restService.headerExito, "Sus datos se han actualizado", null);
                                _this.usuarioService.nombreUsuario = _this.nombre.toString();
                                if (resolve != null)
                                    resolve();
                            }
                            else {
                                _this.alertaService.warnAlert(_this.restService.headerValidacion, "Verifique los datos ingresados", null);
                            }
                            loading.dismiss();
                        }, function (error) {
                            loading.dismiss();
                            console.log(error);
                            _this.alertaService.errorAlert(_this.restService.headerError, _this.restService.mensajeError, null);
                        });
                    }
                }
                else {
                    loading.dismiss();
                }
            }
        }, function (error) {
            loading.dismiss();
            console.log(error);
            _this.alertaService.errorAlert(_this.restService.headerError, _this.restService.mensajeError, null);
        });
    };
    MisDatosCreditoPage.prototype.openAvisoPrivacidad = function () {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_6__aviso_privacidad_aviso_privacidad__["a" /* AvisoPrivacidadPage */], { usuario: this.usuario });
    };
    MisDatosCreditoPage.prototype.ionViewDidLoad = function () {
        document.getElementById("editado").value = 0;
    };
    MisDatosCreditoPage.prototype.ionViewCanLeave = function () {
        var _this = this;
        return new Promise(function (resolve, reject) {
            if (document.getElementById("editado").value == 0)
                resolve();
            else
                _this.alertaService.alertaConfirmacion("Confirmar", "¿Desea salir sin guardar los cambios realizados?", resolve, reject);
        });
    };
    MisDatosCreditoPage.prototype.indicarCambio = function () {
        document.getElementById("editado").value = 1;
    };
    MisDatosCreditoPage.prototype.mensajeUsuario = function () {
        this.alertaService.alertaSinSalidaBoton("Solicita un nuevo registro", "Solicita tu usuario con tu ejecutivo de venta, comunícate al tel: <a href='tel:2727280112'>(272) 7280112</a> o al correo <a href='mailto:registro@kenergyfuel.com'>registro@kenergyfuel.com</a>");
    };
    MisDatosCreditoPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-mis-datos-credito',template:/*ion-inline-start:"C:\Users\Administrador\kenergy\src\pages\mis-datos-credito\mis-datos-credito.html"*/'<ion-header>\n  <ion-navbar color="titulo">\n    <button ion-button menuToggle>\n      <ion-icon name="menu"></ion-icon>\n    </button>\n    \n    <ion-title class="tituloHeader" style="position: absolute;left: 25%; top: 33%;">Mis Datos</ion-title>\n\n    <ion-buttons left  class="animated fadeIn">\n      <button icon-only="" ion-button="" class="disable-hover bar-button bar-button-ios bar-button-default bar-button-default-ios">\n        <span class="button-inner">\n          <img src="assets/imgs/misDatos/usuario.png" style="width: 65%;margin-left: -27px;">\n        </span>\n        <div class="button-effect">\n\n        </div>\n      </button>\n    </ion-buttons>\n  </ion-navbar>\n</ion-header>\n\n\n<ion-content padding style="\n    background-image: url(assets/imgs/fondo.jpg); \n    background-size: 100%;\n    background-position: bottom center;\n    background-repeat: no-repeat;\n    background-color: white;">\n<input type="hidden" id="editado"/>\n\n  <ion-item style="width:100%">\n    <ion-label position="floating" style="color:#181560;">Kanz Combustibles S.A. de C.V.</ion-label>\n  </ion-item>\n\n  <ion-item style="width:100%">\n    <ion-label position="floating" style="color: #181560;">Usuario: {{usuario}}</ion-label>\n  </ion-item>\n\n  <ion-item style="width:100%">\n    <ion-label position="floating" style="color:#181560;">Email: <div style="display:inline-block;font-weight: 100;\n      color: #000;">{{email}}</div></ion-label>\n  </ion-item>\n    \n  <ion-item style="width:100%">\n    <ion-label position="floating" style="color:#181560;">Nombre:</ion-label>\n    <ion-input [(ngModel)]="nombre" style="color: #000;" (ngModelChange)="indicarCambio()"></ion-input>\n  </ion-item>\n\n  <ion-item style="width:100%">\n    <ion-label position="floating" style="color:#181560;">Celular:</ion-label>\n    <ion-input [(ngModel)]="celular" style="color: #000;" (ngModelChange)="indicarCambio()"></ion-input>\n  </ion-item>\n  <ion-row>\n    <ion-col style="text-align: center">\n    <div class="animated fadeIn">\n      <button ion-button color="naranja" class="tituloHeader botonGuardar" (click)="editarUsuario()">Guardar</button>\n    </div>\n</ion-col>\n  <ion-col style="text-align: center">\n    <div class="animated fadeIn">\n      <button ion-button color="naranja" class="tituloHeader botonGuardar" (click)="mensajeUsuario()">Nuevo usuario</button>\n    </div>\n  </ion-col>\n  </ion-row>\n  \n<div style="text-align: center;color:#51506d;margin-top: 10px;     margin-bottom: 15px;">\n  <u><a style="color:#0f70da; font-weight: bolder;" (click)="openAvisoPrivacidad()">Aviso de Privacidad</a></u>\n</div>\n</ion-content>\n\n<ion-fab top right class="animated swing">\n  <button ion-fab color="light" (click)="mostrarNotif.abrirNotificacion()">\n      <img src="assets/imgs/home/gas-station.png" alt="logo" class="claseImg animated fadeIn" />\n  </button>\n  <button *ngIf="notificacion.num > 0" ion-fab color="light" (click)="mostrarNotif.abrirNotificacion()" class="miniBoton">\n    {{notificacion.num}}\n</button>\n</ion-fab>'/*ion-inline-end:"C:\Users\Administrador\kenergy\src\pages\mis-datos-credito\mis-datos-credito.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["m" /* NavParams */], __WEBPACK_IMPORTED_MODULE_2__ionic_storage__["b" /* Storage */],
            __WEBPACK_IMPORTED_MODULE_3__providers_alerta_service__["a" /* AlertaServiceProvider */], __WEBPACK_IMPORTED_MODULE_4__providers_rest_service__["a" /* RestServiceProvider */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* LoadingController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["b" /* AlertController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["p" /* ViewController */],
            __WEBPACK_IMPORTED_MODULE_7__services_notificaciones_service__["a" /* NotificacionService */], __WEBPACK_IMPORTED_MODULE_8__services_abrirnotificaciones_service__["a" /* AbrirnotificacionesService */],
            __WEBPACK_IMPORTED_MODULE_9__services_usuario_service__["a" /* UsuarioService */]])
    ], MisDatosCreditoPage);
    return MisDatosCreditoPage;
}());

//# sourceMappingURL=mis-datos-credito.js.map

/***/ }),

/***/ 312:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return EstadoCuentaPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__models_estadoCuentaModel__ = __webpack_require__(670);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_storage__ = __webpack_require__(15);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__providers_alerta_service__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__providers_rest_service__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__angular_common_http__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__services_notificaciones_service__ = __webpack_require__(17);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__services_abrirnotificaciones_service__ = __webpack_require__(18);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};









var EstadoCuentaPage = /** @class */ (function () {
    function EstadoCuentaPage(navCtrl, navParams, localStorage, alertaService, restService, loadingCtrl, notificacion, mostrarNotif) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.localStorage = localStorage;
        this.alertaService = alertaService;
        this.restService = restService;
        this.loadingCtrl = loadingCtrl;
        this.notificacion = notificacion;
        this.mostrarNotif = mostrarNotif;
        this.edoCuentas = [];
        this.pendienteFacturarTotal = 0.00;
        this.saldoFacturadoTotal = 0.00;
        this.saldoAcumuladoTotal = 0.00;
        this.saldoDisponibleTotal = 0.00;
        this.usuario = null;
        this.openSesion();
    }
    EstadoCuentaPage.prototype.openSesion = function () {
        var _this = this;
        this.localStorage.ready().then(function () {
            _this.localStorage.get("@userSession").then(function (data) {
                if (data != null) {
                    _this.usuario = data;
                    _this.cargarEdosCuenta();
                }
                else {
                    _this.alertaService.warnAlert(_this.restService.headerValidacion, "Usuario sin sesión, no se cargará su estado de cuenta", null);
                }
            });
        });
    };
    EstadoCuentaPage.prototype.cargarEdosCuenta = function () {
        var _this = this;
        this.edoCuentas = [];
        //status/account/detail/
        var urlArmada = "status/account/detail/" + this.usuario.IdClient;
        console.log(this.usuario.IdClient);
        var loading = this.loadingCtrl.create();
        loading.present();
        this.restService.getToken().timeout(this.restService.timeOver).subscribe(function (data) {
            if (data == null) {
                loading.dismiss();
                _this.alertaService.warnAlert(_this.restService.headerValidacion, _this.restService.mensajeValidacionAdmin, null);
            }
            else {
                var body = new __WEBPACK_IMPORTED_MODULE_6__angular_common_http__["d" /* HttpParams */]();
                //body.append("IdClient", a.toString());
                _this.restService.restServiceGETToken(urlArmada, body, data.toString()).timeout(_this.restService.timeOver).subscribe(function (dataRegistro) {
                    if (Object.keys(dataRegistro['Response']).length != 0) {
                        console.log(JSON.stringify(dataRegistro['Response']));
                        _this.pendienteFacturarTotal = dataRegistro['Response'].totales.PendienteFacturar;
                        _this.saldoFacturadoTotal = dataRegistro['Response'].totales.SaldoFacturado;
                        _this.saldoAcumuladoTotal = dataRegistro['Response'].totales.SaldoAcumulado;
                        var sucursales = dataRegistro['Response'].totales.Sucursales;
                        sucursales.forEach(function (sucursal) {
                            console.log(JSON.stringify(sucursal));
                            if (!sucursal.Nombre.includes("ORIZABA"))
                                _this.saldoDisponibleTotal += +sucursal.SaldoDisponible;
                            _this.edoCuentas.push(new __WEBPACK_IMPORTED_MODULE_2__models_estadoCuentaModel__["a" /* EstadoCuentaModel */](sucursal.SaldoFavor, sucursal.PendienteFacturar, sucursal.SaldoFacturado, sucursal.SaldoAcumulado, sucursal.SaldoDisponible, sucursal.Nombre + " " + sucursal.Ubicacion, sucursal.LimiteCredito));
                        });
                        //this.combustibles.push(new CombustibleModel("Ixtaczoquitlan", 88.88, 88.88, 88.88, true));
                    }
                    else {
                        _this.alertaService.warnAlert(_this.restService.headerValidacion, "No se encontró su estado de cuenta", null);
                    }
                    loading.dismiss();
                }, function (error) {
                    loading.dismiss();
                    console.log(error);
                    _this.alertaService.errorAlert(_this.restService.headerError, _this.restService.mensajeError, null);
                });
            }
        }, function (error) {
            loading.dismiss();
            console.log(error);
            _this.alertaService.errorAlert(_this.restService.headerError, _this.restService.mensajeError, null);
        });
    };
    EstadoCuentaPage.prototype.ionViewDidLoad = function () {
    };
    EstadoCuentaPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-estado-cuenta',template:/*ion-inline-start:"C:\Users\Administrador\kenergy\src\pages\estado-cuenta\estado-cuenta.html"*/'<ion-header>\n  <ion-navbar color="titulo">\n    <button ion-button menuToggle>\n      <ion-icon name="menu"></ion-icon>\n    </button>\n    <ion-title class="tituloHeader" style="position: absolute;left: 25%; top: 33%;">Estado de Cuenta</ion-title>\n\n\n    <ion-buttons left *ngIf="!isOn" class="animated fadeIn">\n      <button icon-only="" ion-button="" class="disable-hover bar-button bar-button-ios bar-button-default bar-button-default-ios">\n        <span class="button-inner">\n          <img src="assets/imgs/iconos/cuenta.png" style="width: 65%;margin-left: -27px;">\n        </span>\n        <div class="button-effect">\n\n        </div>\n      </button>\n    </ion-buttons>\n  </ion-navbar>\n</ion-header>\n\n\n<ion-content style="\n  background-image: url(assets/imgs/fondo.jpg); \n    background-size: 100%;\n    background-position: bottom center;\n    background-repeat: no-repeat;\n    background-color: white;">\n  <div style="width:100%;color:#4d4d4d;background-color:#cccccc;height: 28px;\n  border-top: 1px solid;\n  border-bottom: 1px solid;\n  margin-top: 10px;padding: 4px;\n    font-weight: 600;\n    font-size: 122%;">\n    Totales\n  </div>\n  <div style="width:100%;padding: 12px">\n    <div style="width:90%;    margin-bottom: -23px;">\n      <p style="display: inline-block;width:48%;color:red;text-align: start;">Pendiente Facturar</p>\n      <p style="display: inline-block;width:48%;text-align: end;">{{pendienteFacturarTotal | currency}}</p>\n    </div>\n    <div style="width:90%;    margin-bottom: -23px;">\n      <p style="display: inline-block;width:48%;color:#39437b;text-align: start;">Saldo Facturado</p>\n      <p style="display: inline-block;width:48%;text-align: end;">{{saldoFacturadoTotal | currency}}</p>\n    </div>\n    <div style="width:90%;    margin-bottom: -23px;">\n      <p style="display: inline-block;width:48%;color:#39437b;text-align: start;">Saldo Acumulado</p>\n      <p style="display: inline-block;width:48%;text-align: end;">{{saldoAcumuladoTotal | currency}}</p>\n    </div>\n    <div style="width:90%;    margin-bottom: -23px;">\n      <p style="display: inline-block;width:48%;color:#129860;text-align: start;">Saldo Disponible</p>\n      <p style="display: inline-block;width:48%;text-align: end;">{{saldoDisponibleTotal | currency}}</p>\n    </div>\n  </div>\n  <div style="width:100%;" *ngFor="let estado of edoCuentas">\n    <div style="width:100%;color:#fff;background-color:#001432;\n    border-top: 1px solid;\n    border-bottom: 1px solid;\n    margin-top: 10px;\n      font-weight: 600;\n      font-size: 122%;">\n      <div style="width:100%;margin-top: -16px;\n      margin-bottom: -14px;\n      margin-left: 13px;">\n        <p style="display: inline-block;width:48%">{{estado.estacion}}</p>\n        <p style="display: inline-block;width:48%">Crédito: {{estado.creditoTotal | currency}}</p>\n      </div>\n    </div>\n    <div style="width:100%;padding: 12px">\n      <div style="width:90%;    margin-bottom: -23px;    margin-top: -22px;">\n        <p style="display: inline-block;width:48%;color:#39437b;text-align: start;">Saldo a Favor</p>\n        <p style="display: inline-block;width:48%;text-align: end;">{{estado.saldoFavor | currency}}</p>\n      </div>\n      <div style="width:90%;    margin-bottom: -23px;">\n        <p style="display: inline-block;width:48%;color:red;text-align: start;">Pendiente Facturar</p>\n        <p style="display: inline-block;width:48%;text-align: end;">{{estado.pendienteFacturar | currency}}</p>\n      </div>\n      <div style="width:90%;    margin-bottom: -23px;">\n        <p style="display: inline-block;width:48%;color:#39437b;text-align: start;">Saldo Facturado</p>\n        <p style="display: inline-block;width:48%;text-align: end;">{{estado.saldoFacturado | currency}}</p>\n      </div>\n      <div style="width:90%;    margin-bottom: -23px;">\n        <p style="display: inline-block;width:48%;color:#39437b;text-align: start;">Saldo Acumulado</p>\n        <p style="display: inline-block;width:48%;text-align: end;">{{estado.saldoAcumulado | currency}}</p>\n      </div>\n      <div style="width:90%;    margin-bottom: -23px;">\n        <p style="display: inline-block;width:48%;color:#129860;text-align: start;">Saldo Disponible</p>\n        <p style="display: inline-block;width:48%;text-align: end;">{{estado.saldoDisponible | currency}}</p>\n      </div>\n    </div>\n  </div>\n</ion-content>\n\n<ion-fab top right class="animated swing">\n  <button ion-fab color="light" (click)="mostrarNotif.abrirNotificacion()" class="boton1">\n      <img src="assets/imgs/home/gas-station.png" alt="logo" class="claseImg animated fadeIn" />\n  </button>\n  <button *ngIf="notificacion.num > 0" ion-fab color="light" (click)="mostrarNotif.abrirNotificacion()" class="miniBoton">\n    {{notificacion.num}}\n</button>\n</ion-fab>'/*ion-inline-end:"C:\Users\Administrador\kenergy\src\pages\estado-cuenta\estado-cuenta.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["m" /* NavParams */], __WEBPACK_IMPORTED_MODULE_3__ionic_storage__["b" /* Storage */],
            __WEBPACK_IMPORTED_MODULE_4__providers_alerta_service__["a" /* AlertaServiceProvider */], __WEBPACK_IMPORTED_MODULE_5__providers_rest_service__["a" /* RestServiceProvider */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* LoadingController */], __WEBPACK_IMPORTED_MODULE_7__services_notificaciones_service__["a" /* NotificacionService */], __WEBPACK_IMPORTED_MODULE_8__services_abrirnotificaciones_service__["a" /* AbrirnotificacionesService */]])
    ], EstadoCuentaPage);
    return EstadoCuentaPage;
}());

//# sourceMappingURL=estado-cuenta.js.map

/***/ }),

/***/ 313:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return VehiculosCreditoPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__models_productoModel__ = __webpack_require__(47);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__models_vehiculoModel__ = __webpack_require__(151);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__vehiculos_info_credito_vehiculos_info_credito__ = __webpack_require__(314);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__providers_alerta_service__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__providers_rest_service__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__ionic_storage__ = __webpack_require__(15);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__angular_common_http__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__services_notificaciones_service__ = __webpack_require__(17);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__services_abrirnotificaciones_service__ = __webpack_require__(18);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};











var VehiculosCreditoPage = /** @class */ (function () {
    function VehiculosCreditoPage(navCtrl, navParams, modalController, localStorage, alertaService, restService, loadingCtrl, notificacion, mostrarNotif) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.modalController = modalController;
        this.localStorage = localStorage;
        this.alertaService = alertaService;
        this.restService = restService;
        this.loadingCtrl = loadingCtrl;
        this.notificacion = notificacion;
        this.mostrarNotif = mostrarNotif;
        this.idEstado = null;
        this.estados = [];
        this.vehiculos = [];
        this.vehiculos2 = [];
        this.ordenPlaca = 1;
        this.ordenDesc = 0;
        this.busquedaVeh = "";
        this.usuario = 1;
        //0-Todos, 2-Cargando, 3-Suspendido, 4-Uso Interno, -1-Todos los estados
        this.estados.push(new __WEBPACK_IMPORTED_MODULE_2__models_productoModel__["a" /* ProductoModel */](0, "Todos"));
        //this.estados.push(new ProductoModel(2, "Cargando"));
        this.estados.push(new __WEBPACK_IMPORTED_MODULE_2__models_productoModel__["a" /* ProductoModel */](4, "Activo"));
        this.estados.push(new __WEBPACK_IMPORTED_MODULE_2__models_productoModel__["a" /* ProductoModel */](3, "Suspendido"));
        //this.estados.push(new ProductoModel(-1, "Todos los estados"));
        //this.placas.push(new ProductoModel(0,"Placas"));
        //this.vehiculos = this.returnVehiculos();
        //this.cargarCombos(); 
        this.idEstado = 4;
        this.openSesion();
    }
    VehiculosCreditoPage.prototype.buscar = function () {
        var _this = this;
        if (this.usuario == null) {
            this.alertaService.warnAlert(this.restService.headerValidacion, "Usuario no en sesión", null);
        }
        else {
            var loading_1 = this.loadingCtrl.create();
            loading_1.present();
            this.vehiculos = [];
            this.restService.getToken().timeout(this.restService.timeOver).subscribe(function (data) {
                if (data == null) {
                    loading_1.dismiss();
                    _this.alertaService.warnAlert(_this.restService.headerValidacion, _this.restService.mensajeValidacionAdmin, null);
                }
                else {
                    var body = new __WEBPACK_IMPORTED_MODULE_8__angular_common_http__["d" /* HttpParams */]();
                    var a = _this.usuario.IdClient;
                    //var a = 44;
                    /**
                     Int:IdClient (Requerido), Int:Anio(requerido), int:IdVehiculo, int:IdEstacion, int:IdProducto,
                     
                     */
                    var url = "vehicle?IdClient=" + a;
                    /*body.append("IdClient", a.toString());
                    body.append("Anio",this.idAnio.toString());*/
                    if (_this.idEstado != null) {
                        //body.append("IdEstacion",this.idEstacion.toString());
                        url += "&Estado=" + _this.idEstado;
                    }
                    //var urlArmada = "stats/"+this.usuario.IdClient;
                    _this.restService.restServiceGETToken(url, body, data.toString()).timeout(_this.restService.timeOver).subscribe(function (dataRegistro) {
                        if (Object.keys(dataRegistro['Response']).length != 0) {
                            var vehiculos = dataRegistro['Response'];
                            vehiculos.forEach(function (vehiculo) {
                                var v = {
                                    placa: vehiculo.Placas,
                                    ultimoKilometraje: vehiculo.Kilometraje,
                                    descripcion: vehiculo.Alias,
                                    id: vehiculo.Id
                                };
                                _this.vehiculos.push(v);
                                _this.vehiculos2.push(v);
                            });
                            _this.vehiculos.sort(function (a, b) {
                                if (a.placa > b.placa) {
                                    return 1;
                                }
                                if (a.placa < b.placa) {
                                    return -1;
                                }
                                // a must be equal to b
                                return 0;
                            });
                            _this.vehiculos2.sort(function (a, b) {
                                if (a.placa > b.placa) {
                                    return 1;
                                }
                                if (a.placa < b.placa) {
                                    return -1;
                                }
                                // a must be equal to b
                                return 0;
                            });
                        }
                        else {
                            _this.alertaService.warnAlert("Sin vehículos", "No se encontraron registros", null);
                        }
                        loading_1.dismiss();
                    }, function (error) {
                        loading_1.dismiss();
                        console.log(error);
                        _this.alertaService.errorAlert(_this.restService.headerError, _this.restService.mensajeError, null);
                    });
                }
            }, function (error) {
                loading_1.dismiss();
                console.log(error);
                _this.alertaService.errorAlert(_this.restService.headerError, _this.restService.mensajeError, null);
            });
        }
    };
    VehiculosCreditoPage.prototype.openSesion = function () {
        var _this = this;
        this.localStorage.ready().then(function () {
            _this.localStorage.get("@userSession").then(function (data) {
                if (data != null) {
                    _this.usuario = data;
                }
                else {
                    _this.alertaService.warnAlert(_this.restService.headerValidacion, "Usuario sin sesión, no se cargarán sus datos", null);
                }
            });
        });
    };
    VehiculosCreditoPage.prototype.returnVehiculos = function () {
        var vehiculos = [];
        var vehiculo = new __WEBPACK_IMPORTED_MODULE_3__models_vehiculoModel__["a" /* VehiculoModel */]();
        vehiculo.Placa = "X8ZS4";
        vehiculo.Kilometraje = 9358;
        vehiculo.descripcion = "Moto Suzuki Negra";
        vehiculos.push(vehiculo);
        var vehiculo2 = new __WEBPACK_IMPORTED_MODULE_3__models_vehiculoModel__["a" /* VehiculoModel */]();
        vehiculo2.Placa = "XV01753";
        vehiculo2.Kilometraje = 51230;
        vehiculo2.descripcion = "Ford F-200 Roja ";
        vehiculos.push(vehiculo2);
        return vehiculos;
    };
    VehiculosCreditoPage.prototype.openVehiculo = function (vehiculo) {
        var _this = this;
        var url = "vehicle/detail?IdClient=";
        var loading = this.loadingCtrl.create();
        loading.present();
        this.restService.getToken().timeout(this.restService.timeOver).subscribe(function (data) {
            if (data == null) {
                loading.dismiss();
                _this.alertaService.warnAlert(_this.restService.headerValidacion, _this.restService.mensajeValidacionAdmin, null);
            }
            else {
                var body = new __WEBPACK_IMPORTED_MODULE_8__angular_common_http__["d" /* HttpParams */]();
                var a = _this.usuario.IdClient;
                //var a = 44;
                /**
                 Int:IdClient (Requerido), Int:Anio(requerido), int:IdVehiculo, int:IdEstacion, int:IdProducto,
                 
                 */
                url += a + ("&IdVehiculo=" + vehiculo.id);
                var n = 42;
                var ab = n.toString(2);
                _this.restService.restServiceGETToken(url, body, data.toString()).timeout(_this.restService.timeOver).subscribe(function (dataRegistro) {
                    if (Object.keys(dataRegistro['Response']).length != 0) {
                        _this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_4__vehiculos_info_credito_vehiculos_info_credito__["a" /* VehiculosInfoCreditoPage */], { vehiculo: dataRegistro['Response'] });
                    }
                    else {
                        _this.alertaService.warnAlert(_this.restService.headerValidacion, "No se encontró información del vehículo", null);
                    }
                    loading.dismiss();
                }, function (error) {
                    loading.dismiss();
                    console.log(error);
                    _this.alertaService.errorAlert(_this.restService.headerError, _this.restService.mensajeError, null);
                });
            }
        }, function (error) {
            loading.dismiss();
            console.log(error);
            _this.alertaService.errorAlert(_this.restService.headerError, _this.restService.mensajeError, null);
        });
    };
    VehiculosCreditoPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad VehiculosCreditoPage');
        this.buscar();
    };
    VehiculosCreditoPage.prototype.ordenar = function (tipo) {
        if (tipo === void 0) { tipo = 0; }
        var orden1 = this.ordenPlaca;
        var orden2 = this.ordenDesc;
        this.vehiculos.sort(function (a, b) {
            if (tipo == 1) {
                if (orden2 != 1) {
                    if (a.descripcion > b.descripcion) {
                        return 1;
                    }
                    if (a.descripcion < b.descripcion) {
                        return -1;
                    }
                }
                else {
                    if (a.descripcion < b.descripcion) {
                        return 1;
                    }
                    if (a.descripcion > b.descripcion) {
                        return -1;
                    }
                }
            }
            else {
                if (orden1 != 1) {
                    if (a.placa > b.placa) {
                        return 1;
                    }
                    if (a.placa < b.placa) {
                        return -1;
                    }
                }
                else {
                    if (a.placa < b.placa) {
                        return 1;
                    }
                    if (a.placa > b.placa) {
                        return -1;
                    }
                }
            }
            return 0;
        });
        if (tipo == 1) {
            this.ordenDesc = this.ordenDesc != 1 ? 1 : 2;
            this.ordenPlaca = 0;
        }
        else {
            this.ordenPlaca = this.ordenPlaca != 1 ? 1 : 2;
            this.ordenDesc = 0;
        }
    };
    VehiculosCreditoPage.prototype.buscarInput = function () {
        var _this = this;
        this.vehiculos = this.vehiculos2.filter(function (veh) { return veh.descripcion.toLowerCase().includes(_this.busquedaVeh.toLowerCase()) ||
            veh.placa.toLowerCase().includes(_this.busquedaVeh.toLowerCase()); });
        this.ordenPlaca = 1;
        this.ordenDesc = 0;
    };
    VehiculosCreditoPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-vehiculos-credito',template:/*ion-inline-start:"C:\Users\Administrador\kenergy\src\pages\vehiculos-credito\vehiculos-credito.html"*/'<ion-header>\n  <ion-navbar color="titulo">\n    <button ion-button menuToggle>\n      <ion-icon name="menu"></ion-icon>\n    </button>\n\n    <ion-title class="tituloHeader" style="position: absolute;left: 25%; top: 33%;">Vehículos</ion-title>\n\n    <ion-buttons left class="animated fadeIn">\n      <button icon-only="" ion-button="" class="disable-hover bar-button bar-button-ios bar-button-default bar-button-default-ios">\n        <span class="button-inner">\n          <img src="assets/imgs/miAuto/carro.png" style="width: 65%;margin-left: -27px;">\n        </span>\n        <div class="button-effect">\n\n        </div>\n      </button>\n    </ion-buttons>\n  </ion-navbar>\n</ion-header>\n\n\n<ion-content padding style="\nbackground-image: url(assets/imgs/fondo.jpg); \nbackground-size: 100%;\nbackground-position: bottom center;\nbackground-repeat: no-repeat;\nbackground-color: white;">\n  <div style="width:100%">\n    <ion-item style="width:100%">\n      <ion-label position="floating" style="color:#1b155c;">Estado</ion-label>\n      <ion-select [(ngModel)]="idEstado" style="color:#000" okText="Aceptar" cancelText="Cancelar" (ionChange)="buscar()"> \n        <ion-option *ngFor="let estado of estados" value="{{estado.id}}">{{estado.descripcion}}</ion-option>\n      </ion-select>\n    </ion-item>\n  </div>\n\n  <ion-toolbar>\n    <ion-searchbar placeholder="Buscar" [(ngModel)]="busquedaVeh" (ionChange)="buscarInput()"></ion-searchbar>\n  </ion-toolbar>\n  <div style="width:100%;background: #001432;\n  color: #fff;">\n    <div style="width:32%;display: inline-block;text-align: center;font-size: 120%;\n    font-weight: 600;" (click)="ordenar()">Placa<div style="background-color: white;" class="divorder"><ion-icon *ngIf="ordenPlaca == 1" name="chevron-down-outline" class="iconoo"></ion-icon><ion-icon *ngIf="ordenPlaca == 2" name="chevron-up-outline" class="iconoo"></ion-icon><ion-icon *ngIf="ordenPlaca == 0" name="chevron-forward-outline" class="iconoo"></ion-icon></div></div>\n    <div style="width:38%;display: inline-block;text-align: center;font-size: 120%;\n    font-weight: 600;" (click)="ordenar(1)">Descripción<div style="background-color: white;" class="divorder"><ion-icon *ngIf="ordenDesc == 1" name="chevron-down-outline" class="iconoo"></ion-icon><ion-icon *ngIf="ordenDesc == 2" name="chevron-up-outline" class="iconoo"></ion-icon><ion-icon *ngIf="ordenDesc == 0" name="chevron-forward-outline" class="iconoo"></ion-icon></div></div>\n    <div style="width:26%;display: inline-block;text-align: center;font-size: 120%;\n    font-weight: 600;">Último KM</div>\n  </div>\n  <div (click)="openVehiculo(vehiculo)" *ngFor="let vehiculo of vehiculos; let i=index" [ngStyle]="{\'background-color\': (i % 2 === 0 ? \'#cccccc\' : \'white\')}" style="    padding-top: 15px;\n  padding-bottom: 15px;     display: flex; align-items: center; "\n  >\n    <div style="width:32%;display: inline-block;text-align: left;">{{vehiculo.placa}}</div>\n    <div style="width:32%;display: inline-block;text-align: left;">{{vehiculo.descripcion}}</div>\n    <div style="width:32%;display: inline-block;text-align: right;">{{vehiculo.ultimoKilometraje | number: \'2.\'}}</div>\n  </div>\n</ion-content>\n\n<ion-fab top right class="animated swing">\n  <button ion-fab color="light" (click)="mostrarNotif.abrirNotificacion()">\n      <img src="assets/imgs/home/gas-station.png" alt="logo" class="claseImg animated fadeIn" />\n  </button>\n  <button *ngIf="notificacion.num > 0" ion-fab color="light" (click)="mostrarNotif.abrirNotificacion()" class="miniBoton">\n    {{notificacion.num}}\n</button>\n</ion-fab>'/*ion-inline-end:"C:\Users\Administrador\kenergy\src\pages\vehiculos-credito\vehiculos-credito.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["m" /* NavParams */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* ModalController */],
            __WEBPACK_IMPORTED_MODULE_7__ionic_storage__["b" /* Storage */],
            __WEBPACK_IMPORTED_MODULE_5__providers_alerta_service__["a" /* AlertaServiceProvider */], __WEBPACK_IMPORTED_MODULE_6__providers_rest_service__["a" /* RestServiceProvider */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* LoadingController */],
            __WEBPACK_IMPORTED_MODULE_9__services_notificaciones_service__["a" /* NotificacionService */], __WEBPACK_IMPORTED_MODULE_10__services_abrirnotificaciones_service__["a" /* AbrirnotificacionesService */]])
    ], VehiculosCreditoPage);
    return VehiculosCreditoPage;
}());

//# sourceMappingURL=vehiculos-credito.js.map

/***/ }),

/***/ 314:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return VehiculosInfoCreditoPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__models_productoModel__ = __webpack_require__(47);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__models_vehicleResponse__ = __webpack_require__(671);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__providers_alerta_service__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__providers_rest_service__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__angular_common_http__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__ionic_storage__ = __webpack_require__(15);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__services_notificaciones_service__ = __webpack_require__(17);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__services_abrirnotificaciones_service__ = __webpack_require__(18);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};










var VehiculosInfoCreditoPage = /** @class */ (function () {
    function VehiculosInfoCreditoPage(navCtrl, navParams, viewCtrl, localStorage, alertaService, restService, loadingCtrl, alertCtrl, notificacion, mostrarNotif) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.viewCtrl = viewCtrl;
        this.localStorage = localStorage;
        this.alertaService = alertaService;
        this.restService = restService;
        this.loadingCtrl = loadingCtrl;
        this.alertCtrl = alertCtrl;
        this.notificacion = notificacion;
        this.mostrarNotif = mostrarNotif;
        this.v = null;
        this.numero = "32";
        this.placas = "C73AXB";
        this.descripcion = "TOYOTA HIGHLANDER";
        this.estado = "Activo";
        this.responsable = "CENTRAL DE VIVERES";
        this.booleano = false;
        this.diasCarga = {
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
        this.idHorarioMatutinoIni = "12:00";
        this.idHorarioMatutinoFin = "12:00";
        this.idHorarioVespertinoIni = "07:00";
        this.idHorarioVespertinoFin = "07:00";
        this.idHorarioNocturnoIni = "18:00";
        this.idHorarioNocturnoFin = "18:00";
        this.idEstacion = 0;
        this.idCombustible = 0;
        this.idCatUni = 0;
        //
        this.deshabilitado = false;
        this.listaMatutinos = [];
        this.listaVespertinos = [];
        this.listaNocturnos = [];
        //
        this.estaciones = [];
        this.combustibles = [];
        //
        //public carga: String = "";
        this.dia = "";
        this.semana = "";
        this.mes = "";
        this.strCatUni = "";
        this.strCatUni2 = "";
        this.bloc = false;
        this.mixto = true;
        this.seCargo = false;
        this.user = null;
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
            }
            else {
                this.bloc = true;
            }
            var n = this.vehiculo.DiaCarga;
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
            }
            else {
                var binario = n.toString(2);
                var longitud = binario.length;
                binario = this.zfill(binario, 7);
                var textoBinario = "";
                var iteracion = 1; //lunes
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
            if (this.idCombustible == 1)
                this.idCombustible = 150;
            if (this.idCombustible == 2)
                this.idCombustible = 151;
            /*LimiteCarga:20,
         LimiteDia:50,
         LimiteSemana:20,
         LimiteMes:100*/
            //this.carga = this.vehiculo.LimiteCarga;
            this.dia = this.vehiculo.LimiteDia;
            this.semana = this.vehiculo.LimiteSemana;
            this.mes = this.vehiculo.LimiteMes;
        }
        else {
            this.vehiculo = new __WEBPACK_IMPORTED_MODULE_3__models_vehicleResponse__["a" /* VehicleResponse */]();
        }
        var i = 1;
        for (var index = 0; index <= 23; index++) {
            for (var indexJ = 0; indexJ <= 59; indexJ = indexJ + 5) {
                var hr;
                if (index < 10) {
                    hr = "0" + index;
                    if (indexJ < 10) {
                        hr = hr + ":0" + indexJ;
                    }
                    else {
                        hr = hr + ":" + indexJ;
                    }
                }
                else {
                    hr = index;
                    if (indexJ < 10) {
                        hr = hr + ":0" + indexJ;
                    }
                    else {
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
        var j = 1;
        for (var index = 0; index <= 23; index++) {
            for (var indexJ = 0; indexJ <= 59; indexJ = indexJ + 5) {
                var hr;
                if (index < 10) {
                    hr = "0" + index;
                    if (indexJ < 10) {
                        hr = hr + ":0" + indexJ;
                    }
                    else {
                        hr = hr + ":" + indexJ;
                    }
                }
                else {
                    hr = index;
                    if (indexJ < 10) {
                        hr = hr + ":0" + indexJ;
                    }
                    else {
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
        var k = 1;
        for (var index = 0; index <= 23; index++) {
            for (var indexJ = 0; indexJ <= 59; indexJ = indexJ + 5) {
                var hr;
                if (index < 10) {
                    hr = "0" + index;
                    if (indexJ < 10) {
                        hr = hr + ":0" + indexJ;
                    }
                    else {
                        hr = hr + ":" + indexJ;
                    }
                }
                else {
                    hr = index;
                    if (indexJ < 10) {
                        hr = hr + ":0" + indexJ;
                    }
                    else {
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
        this.estaciones.push(new __WEBPACK_IMPORTED_MODULE_2__models_productoModel__["a" /* ProductoModel */](0, "[--Selecciona--]"));
        this.cargarEstaciones();
        this.cargaPrecios();
        this.openSesion();
        this.changeCombustible();
        this.changeMagnitud();
        this.seCargo = true;
    }
    VehiculosInfoCreditoPage.prototype.openSesion = function () {
        var _this = this;
        this.localStorage.ready().then(function () {
            _this.localStorage.get("@userSession").then(function (data) {
                if (data != null) {
                    _this.user = data;
                    //this.cargarEdosCuenta();
                }
                else {
                    _this.alertaService.warnAlert(_this.restService.headerValidacion, "Usuario sin sesión, no se cargarán sus datos", null);
                }
            });
        });
    };
    VehiculosInfoCreditoPage.prototype.zfill = function (number, width) {
        var numberOutput = Math.abs(number); /* Valor absoluto del número */
        var length = number.toString().length; /* Largo del número */
        var zero = "0"; /* String de cero */
        if (width <= length) {
            if (number < 0) {
                return ("-" + numberOutput.toString());
            }
            else {
                return numberOutput.toString();
            }
        }
        else {
            if (number < 0) {
                return ("-" + (zero.repeat(width - length)) + numberOutput.toString());
            }
            else {
                return ((zero.repeat(width - length)) + numberOutput.toString());
            }
        }
    };
    VehiculosInfoCreditoPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad VehiculosInfoCreditoPage');
        document.getElementById("editado").value = 0;
    };
    VehiculosInfoCreditoPage.prototype.editarTodo = function () {
        var _this = this;
        var booleano = false;
        var loading = this.loadingCtrl.create();
        loading.present();
        this.restService.getToken().timeout(this.restService.timeOver).subscribe(function (data) {
            if (data == null) {
                loading.dismiss();
                _this.alertaService.warnAlert(_this.restService.headerValidacion, _this.restService.mensajeValidacionAdmin, null);
            }
            else {
                var body = new __WEBPACK_IMPORTED_MODULE_6__angular_common_http__["d" /* HttpParams */]();
                var a = _this.user.IdClient;
                var urlArmada = "vehicle/todo/" + _this.vehiculo.Id;
                //var urlArmada = "user/" + 1666;
                body.append("IdClient", a.toString());
                if (_this.diasCarga.lunes == true) {
                    _this.diasCarga.lunes = 1;
                }
                else if (_this.diasCarga.lunes == false) {
                    _this.diasCarga.lunes = 0;
                }
                if (_this.diasCarga.martes == true) {
                    _this.diasCarga.martes = 1;
                }
                else if (_this.diasCarga.martes == false) {
                    _this.diasCarga.martes = 0;
                }
                if (_this.diasCarga.miercoles == true) {
                    _this.diasCarga.miercoles = 1;
                }
                else if (_this.diasCarga.miercoles == false) {
                    _this.diasCarga.miercoles = 0;
                }
                if (_this.diasCarga.jueves == true) {
                    _this.diasCarga.jueves = 1;
                }
                else if (_this.diasCarga.jueves == false) {
                    _this.diasCarga.jueves = 0;
                }
                if (_this.diasCarga.viernes == true) {
                    _this.diasCarga.viernes = 1;
                }
                else if (_this.diasCarga.viernes == false) {
                    _this.diasCarga.viernes = 0;
                }
                if (_this.diasCarga.sabado == true) {
                    _this.diasCarga.sabado = 1;
                }
                else if (_this.diasCarga.sabado == false) {
                    _this.diasCarga.sabado = 0;
                }
                if (_this.diasCarga.domingo == true) {
                    _this.diasCarga.domingo = 1;
                }
                else if (_this.diasCarga.domingo == false) {
                    _this.diasCarga.domingo = 0;
                }
                if (_this.diasCarga.todos == true) {
                    _this.diasCarga.todos = 1;
                }
                else if (_this.diasCarga.todos == false) {
                    _this.diasCarga.todos = 0;
                }
                var binario2 = '' + _this.diasCarga.domingo + '' + _this.diasCarga.sabado + '' + _this.diasCarga.viernes + '' + _this.diasCarga.jueves + '' + _this.diasCarga.miercoles + '' + _this.diasCarga.martes + '' + _this.diasCarga.lunes;
                var digit = parseInt(binario2, 2);
                if (_this.diasCarga.todos == 1) {
                    digit = 127;
                }
                //
                if (!_this.mixto) {
                    _this.idHorarioVespertinoIni = "00:00";
                    _this.idHorarioVespertinoFin = "00:00";
                    _this.idHorarioNocturnoIni = "00:00";
                    _this.idHorarioNocturnoFin = "00:00";
                }
                body.append("diacarga", digit.toString());
                var bodyObj = {
                    IdClient: a,
                    diacarga: digit,
                    Hraini: _this.idHorarioMatutinoIni,
                    Hrafin: _this.idHorarioMatutinoFin,
                    Hraini2: _this.idHorarioVespertinoIni,
                    Hrafin2: _this.idHorarioVespertinoFin,
                    Hraini3: _this.idHorarioNocturnoIni,
                    Hrafin3: _this.idHorarioNocturnoFin,
                    //LimiteCarga: this.carga,
                    LimiteDia: _this.dia,
                    LimiteSemana: _this.semana,
                    LimiteMes: _this.mes,
                    Estacion: _this.idEstacion,
                    Combustible: _this.idCombustible,
                    Catuni: _this.strCatUni == "$" ? "$" : _this.strCatUni2 != "" ? _this.strCatUni2 : ""
                };
                _this.restService.restServicePUTToken(urlArmada, bodyObj, data.toString()).timeout(_this.restService.timeOver).subscribe(function (dataRegistro) {
                    if (dataRegistro['Response'] == true) {
                        _this.alertaService.alertaBasica(_this.restService.headerExito, "Se ha actualizado la información exitosamente", null);
                        document.getElementById("editado").value = 0;
                    }
                    else
                        _this.alertaService.warnAlert(_this.restService.headerValidacion, "Los datos no han sido actualizados", null);
                    loading.dismiss();
                }, function (error) {
                    loading.dismiss();
                    console.log(error);
                    _this.alertaService.errorAlert(_this.restService.headerError, _this.restService.mensajeError, null);
                });
            }
        }, function (error) {
            loading.dismiss();
            console.log(error);
            _this.alertaService.errorAlert(_this.restService.headerError, _this.restService.mensajeError, null);
        });
        return booleano;
    };
    VehiculosInfoCreditoPage.prototype.console = function () {
        console.log(this.diasCarga);
    };
    VehiculosInfoCreditoPage.prototype.igualar = function (dia) {
        if (dia == true) {
            dia = 1;
        }
        else {
            dia = 0;
        }
    };
    VehiculosInfoCreditoPage.prototype.cargarEstaciones = function () {
        var _this = this;
        //api/station
        var loading = this.loadingCtrl.create();
        loading.present();
        this.restService.getToken().timeout(this.restService.timeOver).subscribe(function (data) {
            if (data == null) {
                loading.dismiss();
                _this.alertaService.warnAlert(_this.restService.headerValidacion, _this.restService.mensajeValidacionAdmin, null);
            }
            else {
                var body = new __WEBPACK_IMPORTED_MODULE_6__angular_common_http__["d" /* HttpParams */]();
                _this.restService.restServiceGETToken("station", body, data.toString()).timeout(_this.restService.timeOver).subscribe(function (dataRegistro) {
                    if (Object.keys(dataRegistro['Response']).length != 0) {
                        var arrayEstaciones = dataRegistro['Response'];
                        var i = 0;
                        for (var index = 0; index < arrayEstaciones.length; index++) {
                            var estacion = arrayEstaciones[index];
                            if (index == 0) {
                                i = estacion.Id;
                            }
                            _this.estaciones.push(new __WEBPACK_IMPORTED_MODULE_2__models_productoModel__["a" /* ProductoModel */](estacion.Id, estacion.Nombre));
                            //loading.dismiss();
                        }
                        loading.dismiss();
                        //this.combustibles.push(new CombustibleModel("Ixtaczoquitlan", 88.88, 88.88, 88.88, true));
                    }
                    else {
                        _this.alertaService.warnAlert(_this.restService.headerValidacion, "No se encontraron estaciones", null);
                    }
                }, function (error) {
                    loading.dismiss();
                    console.log(error);
                    _this.alertaService.errorAlert(_this.restService.headerError, _this.restService.mensajeError, null);
                });
            }
        }, function (error) {
            loading.dismiss();
            console.log(error);
            _this.alertaService.errorAlert(_this.restService.headerError, _this.restService.mensajeError, null);
        });
    };
    VehiculosInfoCreditoPage.prototype.cargaPrecios1 = function () {
        if (this.idEstacion != 0) {
            this.combustibles = [];
            this.idCombustible = 0;
            this.cargaPrecios();
        }
        else {
            this.combustibles = [];
            this.idCombustible = 0;
        }
    };
    VehiculosInfoCreditoPage.prototype.cargaPrecios = function () {
        var _this = this;
        //	this.idEstacion;
        // /api/gasoline/price/{id estacion}
        this.combustibles.push(new __WEBPACK_IMPORTED_MODULE_2__models_productoModel__["a" /* ProductoModel */](0, "Todos"));
        /*this.combustibles.push(new ProductoModel(1, "MAGNA"));
        this.combustibles.push(new ProductoModel(2, "PREMIUM"));
        this.combustibles.push(new ProductoModel(3, "DIESEL"));*/
        if (this.idEstacion != 0) {
            var loading_1 = this.loadingCtrl.create();
            loading_1.present();
            this.restService.getToken().timeout(this.restService.timeOver).subscribe(function (data) {
                if (data == null) {
                    loading_1.dismiss();
                    _this.alertaService.warnAlert(_this.restService.headerValidacion, _this.restService.mensajeValidacionAdmin, null);
                }
                else {
                    var body = new __WEBPACK_IMPORTED_MODULE_6__angular_common_http__["d" /* HttpParams */]();
                    _this.restService.restServiceGETToken("gasoline/price/" + _this.idEstacion, body, data.toString()).timeout(_this.restService.timeOver).subscribe(function (dataRegistro) {
                        if (Object.keys(dataRegistro['Response']).length != 0) {
                            var arrayEstaciones = dataRegistro['Response'];
                            for (var index = 0; index < arrayEstaciones.length; index++) {
                                var estacion = arrayEstaciones[index];
                                _this.combustibles.push(new __WEBPACK_IMPORTED_MODULE_2__models_productoModel__["a" /* ProductoModel */](index + 150, estacion.Nombre));
                                //this.estaciones.push(new ProductoModel(estacion.Id, estacion.Nombre));
                                //loading.dismiss();
                            }
                            loading_1.dismiss();
                            //this.combustibles.push(new CombustibleModel("Ixtaczoquitlan", 88.88, 88.88, 88.88, true));
                        }
                        else {
                            _this.alertaService.warnAlert(_this.restService.headerValidacion, "No se encontraron precios", null);
                        }
                    }, function (error) {
                        loading_1.dismiss();
                        console.log(error);
                        _this.alertaService.errorAlert(_this.restService.headerError, _this.restService.mensajeError, null);
                    });
                }
            }, function (error) {
                loading_1.dismiss();
                console.log(error);
                _this.alertaService.errorAlert(_this.restService.headerError, _this.restService.mensajeError, null);
            });
        }
    };
    VehiculosInfoCreditoPage.prototype.ionViewCanLeave = function () {
        var _this = this;
        return new Promise(function (resolve, reject) {
            if (document.getElementById("editado").value == 0)
                resolve();
            else
                _this.alertaService.alertaConfirmacion("Confirmar", "¿Desea salir sin guardar los cambios realizados?", resolve, reject);
        });
    };
    VehiculosInfoCreditoPage.prototype.updateItem = function () {
        var _this = this;
        var loading = this.loadingCtrl.create();
        loading.present();
        this.restService.getToken().timeout(this.restService.timeOver).subscribe(function (data) {
            if (data == null) {
                loading.dismiss();
                _this.alertaService.warnAlert(_this.restService.headerValidacion, _this.restService.mensajeValidacionAdmin, null);
            }
            else {
                var body = new __WEBPACK_IMPORTED_MODULE_6__angular_common_http__["d" /* HttpParams */]();
                var a = _this.user.IdClient;
                var urlArmada = "vehicle/lock/" + _this.vehiculo.Id;
                body.append("IdClient", a.toString());
                var bodyObj = {
                    IdClient: a
                };
                _this.restService.restServicePUTToken(urlArmada, bodyObj, data.toString()).timeout(_this.restService.timeOver).subscribe(function (dataRegistro) {
                    if (dataRegistro['Response'] == true) {
                        _this.alertaService.alertaBasica(_this.restService.headerExito, "Se ha actualizado la información", null);
                    }
                    else {
                        _this.alertaService.warnAlert(_this.restService.headerValidacion, "Los datos no han sido actualizados", null);
                    }
                    loading.dismiss();
                }, function (error) {
                    loading.dismiss();
                    console.log(error);
                    _this.alertaService.errorAlert(_this.restService.headerError, _this.restService.mensajeError, null);
                });
            }
        }, function (error) {
            loading.dismiss();
            console.log(error);
            _this.alertaService.errorAlert(_this.restService.headerError, _this.restService.mensajeError, null);
        });
    };
    VehiculosInfoCreditoPage.prototype.todosDiasEnableDisable = function () {
        if (this.diasCarga.todos == 1 || this.diasCarga.todos == true) {
            this.diasCarga.lunes = true;
            this.diasCarga.martes = true;
            this.diasCarga.miercoles = true;
            this.diasCarga.jueves = true;
            this.diasCarga.viernes = true;
            this.diasCarga.sabado = true;
            this.diasCarga.domingo = true;
        }
        if (this.diasCarga.todos == 0 || this.diasCarga.todos == false) {
            this.diasCarga.lunes = false;
            this.diasCarga.martes = false;
            this.diasCarga.miercoles = false;
            this.diasCarga.jueves = false;
            this.diasCarga.viernes = false;
            this.diasCarga.sabado = false;
            this.diasCarga.domingo = false;
        }
    };
    VehiculosInfoCreditoPage.prototype.diasEnableDisable = function () {
        if (this.diasCarga.lunes == 0 || this.diasCarga.lunes == false ||
            this.diasCarga.martes == 0 || this.diasCarga.martes == false ||
            this.diasCarga.miercoles == 0 || this.diasCarga.miercoles == false ||
            this.diasCarga.jueves == 0 || this.diasCarga.jueves == false ||
            this.diasCarga.viernes == 0 || this.diasCarga.viernes == false ||
            this.diasCarga.sabado == 0 || this.diasCarga.sabado == false ||
            this.diasCarga.domingo == 0 || this.diasCarga.domingo == false) {
            this.diasCarga.todos = false;
        }
        if ((this.diasCarga.lunes == 1 || this.diasCarga.lunes == true) &&
            (this.diasCarga.martes == 1 || this.diasCarga.martes == true) &&
            (this.diasCarga.miercoles == 1 || this.diasCarga.miercoles == true) &&
            (this.diasCarga.jueves == 1 || this.diasCarga.jueves == true) &&
            (this.diasCarga.viernes == 1 || this.diasCarga.viernes == true) &&
            (this.diasCarga.sabado == 1 || this.diasCarga.sabado == true) &&
            (this.diasCarga.domingo == 1 || this.diasCarga.domingo == true)) {
            this.diasCarga.todos = true;
        }
    };
    VehiculosInfoCreditoPage.prototype.changeCombustible = function () {
        if (this.idCombustible != 0) {
            this.deshabilitado = true;
            if (this.seCargo) {
                this.idCatUni = 2;
                this.changeMagnitud();
            }
        }
        else {
            this.deshabilitado = false;
        }
    };
    VehiculosInfoCreditoPage.prototype.changeMagnitud = function () {
        this.strCatUni = this.idCatUni == 1 ? "$" : "";
        this.strCatUni2 = this.idCatUni == 2 ? "lt" : "";
    };
    VehiculosInfoCreditoPage.prototype.indicarCambio = function () {
        document.getElementById("editado").value = 1;
    };
    VehiculosInfoCreditoPage.prototype.cambiarHorario = function () {
    };
    VehiculosInfoCreditoPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-vehiculos-info-credito',template:/*ion-inline-start:"C:\Users\Administrador\kenergy\src\pages\vehiculos-info-credito\vehiculos-info-credito.html"*/'<ion-header>\n  <ion-navbar color="titulo">\n    <button ion-button menuToggle>\n      <ion-icon name="menu"></ion-icon>\n    </button>\n    \n    <ion-title class="tituloHeader" style="position: absolute;left: 25%; top: 33%;">Vehículos/ detalle</ion-title>\n\n    <ion-buttons left  class="animated fadeIn">\n      <button icon-only="" ion-button="" class="disable-hover bar-button bar-button-ios bar-button-default bar-button-default-ios">\n        <span class="button-inner">\n          <img src="assets/imgs/miAuto/carro.png" style="width: 65%;margin-left: -27px;">\n        </span>\n        <div class="button-effect">\n\n        </div>\n      </button>\n    </ion-buttons>\n  </ion-navbar>\n</ion-header>\n\n<ion-content padding style="\nbackground-image: url(assets/imgs/fondo.jpg); \nbackground-size: 100%;\nbackground-position: bottom center;\nbackground-repeat: no-repeat;\nbackground-color: white;">\n<input type="hidden" id="editado"/>\n  <ion-item style="    padding-top: 15px;">\n    <ion-label style="color:#000 !important; text-align: right;">Bloquear</ion-label>\n    <ion-toggle [(ngModel)]="bloc" (ngModelChange)="updateItem()"></ion-toggle>\n  </ion-item>\n  <div style="width:100%;margin-bottom: 3px;">\n    <div style="display:inline-block;color:#1b155c;font-weight: 600;\n    font-size: 120%;">Número: </div>\n    <div style="display:inline-block;font-size: 120%;">{{vehiculo.Id}}</div>\n  </div>\n  <div style="width:100%;margin-bottom: 3px;">\n    <div style="display:inline-block;color:#1b155c;font-weight: 600;\n    font-size: 120%;">Placas: </div>\n    <div style="display:inline-block;font-size: 120%;">{{vehiculo.Placas}}</div>\n  </div>\n  <div style="width:100%;margin-bottom: 3px;">\n    <div style="display:inline-block;color:#1b155c;font-weight: 600;\n    font-size: 120%;">Descripción: </div>\n    <div style="display:inline-block;font-size: 120%;">{{vehiculo.Descripcion}}</div>\n  </div>\n  <div style="width:100%;margin-bottom: 3px;">\n    <div style="display:inline-block;color:#1b155c;font-weight: 600;\n    font-size: 120%;">Estado: </div>\n    <div style="display:inline-block;font-size: 120%;">{{vehiculo.Estado}}</div>\n  </div>\n  <div style="width:100%;margin-bottom: 3px;">\n    <div style="display:inline-block;color:#1b155c;font-weight: 600;\n    font-size: 120%;">Responsable: </div>\n    <div style="display:inline-block;font-size: 120%;">{{vehiculo.Responsable}}</div>\n  </div>\n  <div style="width:100%;margin-bottom: 5%;border-top: 1px solid;\n  margin-top: 4%;" class="animated fadeInDown">\n    <div style="width:70%;display:inline-block;font-size: 150%;margin-top: 6px;color: #1b155c;\n    font-weight: 600;">Días de Carga</div>\n    <div class="tituloHeader" style="width:28%;display:inline-block;text-align: right;" (click)="editarTodo()">\n      <ion-icon name="save" style="font-size: 25px;"></ion-icon>\n    </div>\n  </div>\n  <div style="width:100%">\n    <ion-row>\n      <ion-col col-6>\n        <ion-item>\n          <ion-checkbox color="primary" [(ngModel)]="diasCarga.lunes" (click)="diasEnableDisable()" (ngModelChange)="indicarCambio()"></ion-checkbox>\n          <ion-label class="label2">Lunes</ion-label>\n        </ion-item>\n      </ion-col>\n      <ion-col col-6>\n        <ion-item>\n          <ion-checkbox color="primary" [(ngModel)]="diasCarga.viernes" (click)="diasEnableDisable()" (ngModelChange)="indicarCambio()"></ion-checkbox>\n          <ion-label class="label2">Viernes</ion-label>\n        </ion-item>\n      </ion-col>\n    </ion-row>\n    <ion-row>\n      <ion-col col-6>\n        <ion-item>\n          <ion-checkbox color="primary" [(ngModel)]="diasCarga.martes" (click)="diasEnableDisable()" (ngModelChange)="indicarCambio()"></ion-checkbox>\n          <ion-label class="label2">Martes</ion-label>\n        </ion-item>\n      </ion-col>\n      <ion-col col-6>\n        <ion-item>\n          <ion-checkbox color="primary" [(ngModel)]="diasCarga.sabado" (click)="diasEnableDisable()" (ngModelChange)="indicarCambio()"></ion-checkbox>\n          <ion-label class="label2">Sabado</ion-label>\n        </ion-item>\n      </ion-col>\n    </ion-row>\n    <ion-row>\n      <ion-col col-6>\n        <ion-item>\n          <ion-checkbox color="primary" [(ngModel)]="diasCarga.miercoles" (click)="diasEnableDisable()" (ngModelChange)="indicarCambio()"></ion-checkbox>\n          <ion-label class="label2">Miercoles</ion-label>\n        </ion-item>\n      </ion-col>\n      <ion-col col-6>\n        <ion-item>\n          <ion-checkbox color="primary" [(ngModel)]="diasCarga.domingo" (click)="diasEnableDisable()" (ngModelChange)="indicarCambio()"></ion-checkbox>\n          <ion-label class="label2">Domingo</ion-label>\n        </ion-item>\n      </ion-col>\n    </ion-row>\n    <ion-row>\n      <ion-col col-6>\n        <ion-item>\n          <ion-checkbox color="primary" [(ngModel)]="diasCarga.jueves" (click)="diasEnableDisable()" (ngModelChange)="indicarCambio()"></ion-checkbox>\n          <ion-label class="label2">Jueves</ion-label>\n        </ion-item>\n      </ion-col>\n      <ion-col col-6>\n        <ion-item>\n          <ion-checkbox color="primary" [(ngModel)]="diasCarga.todos" (click)="todosDiasEnableDisable()" (ngModelChange)="indicarCambio()"></ion-checkbox>\n          <ion-label class="label2">Todos</ion-label>\n        </ion-item>\n      </ion-col>\n    </ion-row>  \n  </div>\n\n  <ion-item class="pahorario" style="    padding-top: 15px;">\n    <ion-label style="color:#000 !important; text-align: right;">Horario mixto</ion-label>\n    <ion-toggle [(ngModel)]="mixto" color="primary" (ngModelChange)="cambiarHorario()"></ion-toggle>\n  </ion-item>\n\n  <div style="width:100%;" class="animated fadeInDown">\n    <div style="width:70%;display:inline-block;font-size: 150%;margin-top: 6px;color: #1b155c;\n    font-weight: 600;">{{mixto ? "Horario de Carga 1" : "Horario de Carga"}}</div>\n  </div>\n  <div style="width:100%; display:inline-block">\n  <ion-row>\n<ion-col col-5>\n    <ion-item>\n    <ion-datetime displayFormat="HH:mm a" [(ngModel)]="idHorarioMatutinoIni" (ngModelChange)="indicarCambio()"></ion-datetime>\n    </ion-item>\n</ion-col>\n<ion-col col-2 style="top: 14px;">Hasta</ion-col>\n<ion-col col-5>\n    <ion-item>\n    <ion-datetime displayFormat="HH:mm a" [(ngModel)]="idHorarioMatutinoFin" (ngModelChange)="indicarCambio()"></ion-datetime>\n    </ion-item>\n</ion-col>\n</ion-row>\n  \n    <!--<select class="mySelect" [(ngModel)]="idHorarioMatutinoIni" style="width: 42%;display: inline-block;height: 31px;\n    vertical-align: middle;">\n      <option *ngFor="let horaInicio of listaMatutinos" [ngValue]="horaInicio.hora">\n        {{horaInicio.hora}} Hrs\n      </option>\n    </select>-->\n    <!--<ion-item>\n    	<ion-label style="width:40%;display:inline-block"><ion-icon ios="ios-alarm" md="md-alarm"></ion-icon>  {{idHorarioMatutinoIni}} Hrs</ion-label>\n  		<ion-datetime style="width:5%;display:inline-block" displayFormat="HH:mm a" [(ngModel)]="idHorarioMatutinoIni"></ion-datetime>\n  		<ion-label style="width:10%;display:inline-block">Hasta</ion-label>\n	   <ion-label style="width:40%;display:inline-block"><ion-icon ios="ios-alarm" md="md-alarm"></ion-icon>  {{idHorarioMatutinoFin}} Hrs</ion-label>\n  		<ion-datetime style="width:5%;display:inline-block" displayFormat="HH:mm a" [(ngModel)]="idHorarioMatutinoFin"></ion-datetime>\n  	 </ion-item>-->\n    \n    <!--<select class="mySelect" [(ngModel)]="idHorarioMatutinoFin" style="width: 42%;display: inline-block;height: 31px;\n    vertical-align: middle;">\n      <option *ngFor="let horaFin of listaMatutinos" [ngValue]="horaFin.hora">\n        {{horaFin.hora}} Hrs\n      </option>\n    </select>-->\n  </div>\n\n  <div *ngIf="mixto" style="width:100%;" class="animated fadeInDown">\n    <div style="width:100%;display:inline-block;font-size: 150%;color: #1b155c;\n    font-weight: 600;">Horario de Carga 2</div>\n  </div>\n  <div *ngIf="mixto" style="width:100%">\n    <!--<select class="mySelect" [(ngModel)]="idHorarioVespertinoIni" style="width: 42%;display: inline-block;height: 31px;\n    vertical-align: middle;">\n      <option *ngFor="let horaInicio of listaVespertinos" [ngValue]="horaInicio.hora">\n        {{horaInicio.hora}} Hrs\n      </option>\n    </select>\n    <div style="width:13%;display:inline-block">\n      Hasta\n    </div>\n    <select class="mySelect" [(ngModel)]="idHorarioVespertinoFin" style="width: 42%;display: inline-block;height: 31px;\n    vertical-align: middle;">\n      <option *ngFor="let horaFin of listaVespertinos" [ngValue]="horaFin.hora">\n        {{horaFin.hora}} Hrs\n      </option>\n    </select>-->\n    <ion-row>\n<ion-col col-5>\n    <ion-item>\n    <ion-datetime displayFormat="HH:mm a" [(ngModel)]="idHorarioVespertinoIni" (ngModelChange)="indicarCambio()"></ion-datetime>\n    </ion-item>\n</ion-col>\n<ion-col col-2 style="top: 14px;">Hasta</ion-col>\n<ion-col col-5>\n    <ion-item>\n    <ion-datetime displayFormat="HH:mm a" [(ngModel)]="idHorarioVespertinoFin" (ngModelChange)="indicarCambio()"></ion-datetime>\n    </ion-item>\n</ion-col>\n</ion-row>\n  </div>\n\n  <div *ngIf="mixto" style="width:100%;" class="animated fadeInDown">\n    <div style="width:100%;display:inline-block;font-size: 150%;color: #1b155c;\n    font-weight: 600;">Horario de Carga 3</div>\n  </div>\n  <div *ngIf="mixto" style="width:100%">\n    <!--<select class="mySelect" [(ngModel)]="idHorarioNocturnoIni" style="width: 42%;display: inline-block;height: 31px;\n    vertical-align: middle;">\n      <option *ngFor="let horaInicio of listaNocturnos" [ngValue]="horaInicio.hora">\n        {{horaInicio.hora}} Hrs\n      </option>\n    </select>\n    <div style="width:13%;display:inline-block">\n      Hasta\n    </div>\n    <select class="mySelect" [(ngModel)]="idHorarioNocturnoFin" style="width: 42%;display: inline-block;height: 31px;\n    vertical-align: middle;">\n      <option *ngFor="let horaFin of listaNocturnos" [ngValue]="horaFin.hora">\n        {{horaFin.hora}} Hrs\n      </option>\n    </select>-->\n    <ion-row>\n<ion-col col-5>\n    <ion-item>\n    <ion-datetime displayFormat="HH:mm a" [(ngModel)]="idHorarioNocturnoIni" (ngModelChange)="indicarCambio()"></ion-datetime>\n    </ion-item>\n</ion-col>\n<ion-col col-2 style="top: 14px;">Hasta</ion-col>\n<ion-col col-5>\n    <ion-item>\n    <ion-datetime displayFormat="HH:mm a" [(ngModel)]="idHorarioNocturnoFin" (ngModelChange)="indicarCambio()"></ion-datetime>\n    </ion-item>\n</ion-col>\n</ion-row>\n  </div>\n\n\n  <div style="width:100%;" class="animated fadeInDown">\n    <div style="width:70%;display:inline-block;font-size: 150%;margin-top: 6px;color: #1b155c;\n    font-weight: 600;">Límites</div>\n  </div>\n\n  <ion-item style="width:100%">\n    <ion-label position="floating">Estación:</ion-label>\n    <ion-select [(ngModel)]="idEstacion" (ionChange)="cargaPrecios1()" style="color:#000" (ngModelChange)="indicarCambio()">\n      <ion-option *ngFor="let estacion of estaciones" value="{{estacion.id}}">{{estacion.descripcion}}</ion-option>\n    </ion-select>\n  </ion-item>\n\n  <ion-item style="width:100%">\n    <ion-label position="floating">Combustible:</ion-label>\n    <ion-select [(ngModel)]="idCombustible" (ionChange)="changeCombustible()" style="color:#000" (ngModelChange)="indicarCambio()">\n      <ion-option *ngFor="let combustible of combustibles" value="{{combustible.id}}">{{combustible.descripcion}}</ion-option>\n    </ion-select>\n  </ion-item>\n  \n  <ion-item style="width:100%">\n    <ion-label position="floating">Unidad de medida:</ion-label>\n    <ion-select [(ngModel)]="idCatUni" [(disabled)]="deshabilitado" (ionChange)="changeMagnitud()" style="color:#000" (ngModelChange)="indicarCambio()">\n      <ion-option value="0">Seleccione tipo</ion-option>\n      <ion-option value="1">$ - Importe</ion-option>\n      <ion-option value="2">V - Volumen</ion-option>\n    </ion-select>\n  </ion-item>\n  <ion-row>\n    <ion-col >\n      <ion-item style="width:100%">\n        <ion-label position="floating">Día: {{strCatUni}}</ion-label>\n        <ion-input type="number" placeholder="0.00" [(ngModel)]="dia" (ngModelChange)="indicarCambio()"></ion-input>\n      </ion-item>\n    </ion-col>\n    <ion-col col-2>\n      <ion-label position="floating">{{strCatUni2}}</ion-label>\n    </ion-col>\n  </ion-row>\n\n  <ion-row>\n    <ion-col >\n      <ion-item style="width:100%">\n        <ion-label position="floating">Semana: {{strCatUni}}</ion-label>\n        <ion-input type="number" placeholder="0.00" [(ngModel)]="semana" (ngModelChange)="indicarCambio()"></ion-input>\n      </ion-item>\n    </ion-col>\n    <ion-col col-2>\n      <ion-label position="floating">{{strCatUni2}}</ion-label>\n    </ion-col>\n  </ion-row>\n\n  <ion-row>\n    <ion-col >\n      <ion-item style="width:100%">\n        <ion-label position="floating">Mes: {{strCatUni}}</ion-label>\n        <ion-input type="number" placeholder="0.00" [(ngModel)]="mes" (ngModelChange)="indicarCambio()"></ion-input>\n      </ion-item>\n    </ion-col>\n    <ion-col col-2>\n      <ion-label position="floating">{{strCatUni2}}</ion-label>\n    </ion-col>\n  </ion-row>\n\n</ion-content>\n\n<ion-fab top right class="animated swing">\n  <button ion-fab color="light" (click)="mostrarNotif.abrirNotificacion()">\n      <img src="assets/imgs/home/gas-station.png" alt="logo" class="claseImg animated fadeIn" />\n  </button>\n  <button *ngIf="notificacion.num > 0" ion-fab color="light" (click)="mostrarNotif.abrirNotificacion()" class="miniBoton">\n    {{notificacion.num}}\n</button>\n</ion-fab>\n<!-- <ion-footer style="background-color: #e97523;\n    padding: 0% 4%;\n    height: 5%;\n    display: flex;\n    align-items: center;">\n    <p style="margin-left: 80%;">v.1.0.0.0.1</p>\n  </ion-footer> -->'/*ion-inline-end:"C:\Users\Administrador\kenergy\src\pages\vehiculos-info-credito\vehiculos-info-credito.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["m" /* NavParams */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["p" /* ViewController */], __WEBPACK_IMPORTED_MODULE_7__ionic_storage__["b" /* Storage */],
            __WEBPACK_IMPORTED_MODULE_4__providers_alerta_service__["a" /* AlertaServiceProvider */], __WEBPACK_IMPORTED_MODULE_5__providers_rest_service__["a" /* RestServiceProvider */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* LoadingController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["b" /* AlertController */], __WEBPACK_IMPORTED_MODULE_8__services_notificaciones_service__["a" /* NotificacionService */], __WEBPACK_IMPORTED_MODULE_9__services_abrirnotificaciones_service__["a" /* AbrirnotificacionesService */]])
    ], VehiculosInfoCreditoPage);
    return VehiculosInfoCreditoPage;
}());

//# sourceMappingURL=vehiculos-info-credito.js.map

/***/ }),

/***/ 315:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return FacturacionCreditoPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__models_productoModel__ = __webpack_require__(47);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__models_facturaCreditoModel__ = __webpack_require__(672);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__providers_alerta_service__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__providers_rest_service__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__ionic_storage__ = __webpack_require__(15);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__angular_common_http__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__ionic_native_file_transfer___ = __webpack_require__(82);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__ionic_native_file__ = __webpack_require__(83);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__ionic_native_file_opener___ = __webpack_require__(101);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__services_notificaciones_service__ = __webpack_require__(17);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__services_abrirnotificaciones_service__ = __webpack_require__(18);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__services_facturacion_service__ = __webpack_require__(102);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [0, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};














var FacturacionCreditoPage = /** @class */ (function () {
    function FacturacionCreditoPage(navCtrl, navParams, localStorage, alertaService, restService, loadingCtrl, transfer, file, fileOpener, notificacion, mostrarNotif, facturacionService, actionSheetController) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.localStorage = localStorage;
        this.alertaService = alertaService;
        this.restService = restService;
        this.loadingCtrl = loadingCtrl;
        this.transfer = transfer;
        this.file = file;
        this.fileOpener = fileOpener;
        this.notificacion = notificacion;
        this.mostrarNotif = mostrarNotif;
        this.facturacionService = facturacionService;
        this.actionSheetController = actionSheetController;
        this.desde = "";
        this.hasta = new Date().toISOString();
        this.estaciones = [];
        this.idEstacion = 0;
        this.facturas = [];
        this.ordenFecha = 0;
        this.usuario = null;
        /*this.facturas.push(new FacturaCreditoModel("C-210775", "Estación", "02-Sept-18", 1850));
        this.facturas.push(new FacturaCreditoModel("C-210775", "Estación", "02-Sept-18", 1850));
        this.facturas.push(new FacturaCreditoModel("C-210775", "Estación", "02-Sept-18", 1850));
    */
        this.estaciones.push(new __WEBPACK_IMPORTED_MODULE_2__models_productoModel__["a" /* ProductoModel */](0, "Todas"));
        //this.usuario=1;
        //this.cargarCombos();
        this.openSesion();
    }
    FacturacionCreditoPage.prototype.openSesion = function () {
        var _this = this;
        this.localStorage.ready().then(function () {
            _this.localStorage.get("@userSession").then(function (data) {
                if (data != null) {
                    _this.usuario = data;
                    _this.cargarCombos();
                }
                else {
                    _this.alertaService.warnAlert(_this.restService.headerValidacion, "Usuario sin sesión, no se cargarán sus datos", null);
                }
            });
        });
    };
    FacturacionCreditoPage.prototype.cargarCombos = function () {
        var _this = this;
        var loading = this.loadingCtrl.create();
        loading.present();
        var desdeDate = new Date();
        var dias = desdeDate.getUTCDate() - 1;
        desdeDate.setDate(desdeDate.getDate() - dias);
        this.desde = desdeDate.toISOString();
        this.estaciones = [];
        this.estaciones.push(new __WEBPACK_IMPORTED_MODULE_2__models_productoModel__["a" /* ProductoModel */](0, "Todas"));
        this.restService.getToken().timeout(this.restService.timeOver).subscribe(function (data) {
            if (data == null) {
                loading.dismiss();
                _this.alertaService.warnAlert(_this.restService.headerValidacion, _this.restService.mensajeValidacionAdmin, null);
            }
            else {
                var body = new __WEBPACK_IMPORTED_MODULE_7__angular_common_http__["d" /* HttpParams */]();
                var a = _this.usuario.IdClient;
                //var a = 44;
                //body.append("IdClient", a.toString());
                var urlArmada = "stats/" + a;
                //var urlArmada = "stats/"+this.usuario.IdClient;
                _this.restService.restServiceGETToken(urlArmada, body, data.toString()).timeout(_this.restService.timeOver).subscribe(function (dataRegistro) {
                    if (Object.keys(dataRegistro['Response']).length != 0) {
                        var estaciones = dataRegistro['Response'].Estacion;
                        estaciones.forEach(function (estacion) {
                            _this.estaciones.push(new __WEBPACK_IMPORTED_MODULE_2__models_productoModel__["a" /* ProductoModel */](estacion.Id, estacion.Nombre));
                        });
                        //this.buscar();
                    }
                    else {
                        _this.alertaService.warnAlert(_this.restService.headerValidacion, "No se cargaron los filtros de búsqueda", null);
                    }
                    loading.dismiss();
                }, function (error) {
                    loading.dismiss();
                    console.log(error);
                    _this.alertaService.errorAlert(_this.restService.headerError, _this.restService.mensajeError, null);
                });
                //this.buscar();
            }
        }, function (error) {
            loading.dismiss();
            console.log(error);
            _this.alertaService.errorAlert(_this.restService.headerError, _this.restService.mensajeError, null);
        });
    };
    FacturacionCreditoPage.prototype.buscar = function () {
        var _this = this;
        if (this.usuario == null) {
            this.alertaService.warnAlert(this.restService.headerValidacion, "Usuario no en sesión", null);
        }
        else {
            this.facturas = [];
            var arrFecha = this.desde.split("T");
            var fechaDesde = arrFecha[0].split("-");
            var fechaFormat = "";
            var arrFecha2 = this.hasta.split("T");
            var fechaHasta = arrFecha2[0].split("-");
            var fechaFormatHasta = "";
            if (fechaDesde.length < 3) {
                //this.alertaService.warnAlert(this.restService.headerValidacion, "Selecciona una fecha de inicio", null);
            }
            else {
                // año/ mes/ dia
                fechaFormat = fechaDesde[2] + "/" + fechaDesde[1] + "/" + fechaDesde[0];
            }
            if (fechaHasta.length < 3) {
                //this.alertaService.warnAlert(this.restService.headerValidacion, "Selecciona una fecha de fin", null);
            }
            else {
                // año/ mes/ dia
                fechaFormatHasta = fechaHasta[2] + "/" + fechaHasta[1] + "/" + fechaHasta[0];
            }
            var loading_1 = this.loadingCtrl.create();
            loading_1.present();
            this.restService.getToken().timeout(this.restService.timeOver).subscribe(function (data) {
                if (data == null) {
                    loading_1.dismiss();
                    _this.alertaService.warnAlert(_this.restService.headerValidacion, _this.restService.mensajeValidacionAdmin, null);
                }
                else {
                    var body = new __WEBPACK_IMPORTED_MODULE_7__angular_common_http__["d" /* HttpParams */]();
                    var a = _this.usuario.IdClient;
                    //var a = 44;
                    //this.idEstacion = 1;
                    var url = "invoice?Desde=" + fechaFormat + "&Hasta=" + fechaFormatHasta + "&IdEstacion=" + _this.idEstacion + "&IdClient=" + a;
                    console.log(url);
                    /**
               * String:Desde (Requerido), String:Hasta(Requerido),
               * Int:IdProducto, Int:IdEstacion(Requerido), Int:Chofer,
               *  Int:IdVehiculo, Int:IdClient(Requerido)
               */
                    //var urlArmada = "stats/"+this.usuario.IdClient;
                    _this.restService.restServiceGETToken(url, body, data.toString()).timeout(_this.restService.timeOver).subscribe(function (dataRegistro) {
                        if (Object.keys(dataRegistro['Response']).length != 0) {
                            var facturas = dataRegistro['Response'];
                            facturas.forEach(function (factura) {
                                _this.facturas.push(new __WEBPACK_IMPORTED_MODULE_3__models_facturaCreditoModel__["a" /* FacturaCreditoModel */](factura.Folio, factura.Estacion, factura.Fecha, factura.Efectivo, factura.Id, factura.IdEstacion));
                            });
                            _this.ordenFecha = 1;
                            _this.ordenar();
                        }
                        else if (dataRegistro['Message'] != 3) {
                            _this.alertaService.warnAlert(_this.restService.headerValidacion, dataRegistro['Message'], null);
                        }
                        else {
                            _this.alertaService.warnAlert("Sin facturas!", "No se encontraron registros en el periodo seleccionado", null);
                        }
                        loading_1.dismiss();
                    }, function (error) {
                        loading_1.dismiss();
                        console.log(error);
                        _this.alertaService.errorAlert(_this.restService.headerError, _this.restService.mensajeError, null);
                    });
                }
            }, function (error) {
                loading_1.dismiss();
                console.log(error);
                _this.alertaService.errorAlert(_this.restService.headerError, _this.restService.mensajeError, null);
            });
        }
    };
    FacturacionCreditoPage.prototype.downloadFactura = function (factura) {
        /*
        /api/invoice/pdf/ Int:IdFactura, int:IdEstacion,  IdClient =  */
        var _this = this;
        var fileTransfer = this.transfer.create();
        var loading = this.loadingCtrl.create();
        loading.present();
        this.restService.getToken().timeout(this.restService.timeOver).subscribe(function (data) {
            if (data == null) {
                loading.dismiss();
                _this.alertaService.warnAlert(_this.restService.headerValidacion, _this.restService.mensajeValidacionAdmin, null);
            }
            else {
                var body = new __WEBPACK_IMPORTED_MODULE_7__angular_common_http__["d" /* HttpParams */]();
                var a = _this.usuario.IdClient;
                var url = "invoice/pdf?IdFactura=" + factura.id + "&IdEstacion=" + factura.idSuc + "&IdClient=" + _this.usuario.IdClient;
                _this.restService.restServiceGETToken(url, body, data.toString()).timeout(_this.restService.timeOver).subscribe(function (dataRegistro) {
                    fileTransfer.download(dataRegistro['Response'], _this.file.externalDataDirectory + 'file.pdf').then(function (entry) {
                        //this.alertaService.alertaBasica(this.restService.headerExito, "Se ha descargado correctamente en: " + entry.toURL(), null);
                        _this.fileOpener.open(_this.file.externalDataDirectory + 'file.pdf', 'application/pdf')
                            .then(function () { return console.log("Abrio correctament"); } /*this.alertaService.alertaBasica(this.restService.headerExito, "Se abrio correctamente", null)*/)
                            .catch(function (e) { return _this.alertaService.errorAlert(_this.restService.headerError, "No se pudo abrir, no existe aplicación compatible " + e, null); });
                    }, function (error) {
                        _this.alertaService.errorAlert(_this.restService.headerError, "ERROR descarga = " + error, null);
                    });
                    ////////////XML
                    ////////////XML
                    loading.dismiss();
                }, function (error) {
                    loading.dismiss();
                    console.log(error);
                    _this.alertaService.errorAlert(_this.restService.headerError, _this.restService.mensajeError, null);
                });
            }
        }, function (error) {
            loading.dismiss();
            console.log(error);
            _this.alertaService.errorAlert(_this.restService.headerError, _this.restService.mensajeError, null);
        });
    };
    FacturacionCreditoPage.prototype.ordenar = function () {
        console.log("si entra");
        var orden1 = this.ordenFecha;
        this.facturas.sort(function (a, b) {
            if (orden1 != 1) {
                if (new Date(a.fecha.substr(6, 4) + "-" + a.fecha.substr(3, 2) + "-" + a.fecha.substr(0, 2)) > new Date(b.fecha.substr(6, 4) + "-" + b.fecha.substr(3, 2) + "-" + b.fecha.substr(0, 2))) {
                    return 1;
                }
                if (new Date(a.fecha.substr(6, 4) + "-" + a.fecha.substr(3, 2) + "-" + a.fecha.substr(0, 2)) < new Date(b.fecha.substr(6, 4) + "-" + b.fecha.substr(3, 2) + "-" + b.fecha.substr(0, 2))) {
                    return -1;
                }
            }
            else {
                if (new Date(a.fecha.substr(6, 4) + "-" + a.fecha.substr(3, 2) + "-" + a.fecha.substr(0, 2)) < new Date(b.fecha.substr(6, 4) + "-" + b.fecha.substr(3, 2) + "-" + b.fecha.substr(0, 2))) {
                    return 1;
                }
                if (new Date(a.fecha.substr(6, 4) + "-" + a.fecha.substr(3, 2) + "-" + a.fecha.substr(0, 2)) > new Date(b.fecha.substr(6, 4) + "-" + b.fecha.substr(3, 2) + "-" + b.fecha.substr(0, 2))) {
                    return -1;
                }
            }
            return 0;
        });
        this.ordenFecha = this.ordenFecha != 1 ? 1 : 2;
    };
    FacturacionCreditoPage.prototype.downloadFactura2 = function (idFactura, idEstacion) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var actionSheet;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.actionSheetController.create({
                            cssClass: 'my-custom-class',
                            buttons: [{
                                    text: 'Abrir...',
                                    icon: 'open',
                                    handler: function () {
                                        console.log('abrir clicked');
                                    }
                                }, {
                                    text: 'Compartir...',
                                    icon: 'share',
                                    handler: function () {
                                        _this.compartirFactura(idFactura, idEstacion);
                                    }
                                }],
                        })];
                    case 1:
                        actionSheet = _a.sent();
                        return [4 /*yield*/, actionSheet.present()];
                    case 2:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    FacturacionCreditoPage.prototype.compartirFactura = function (idFactura, idEstacion) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var actionSheet;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.actionSheetController.create({
                            cssClass: 'my-custom-class',
                            buttons: [{
                                    text: 'Guardar en dispositivo',
                                    icon: 'download',
                                    handler: function () {
                                        console.log('dispositivo clicked');
                                    }
                                }, {
                                    text: 'Correo electrónico',
                                    icon: 'mail',
                                    handler: function () {
                                        _this.facturacionService.mostrarEnvio(idFactura, idEstacion, _this.usuario.Email);
                                    }
                                }, {
                                    text: 'Whatsapp',
                                    icon: 'logo-whatsapp',
                                    handler: function () {
                                        console.log('whatsapp clicked');
                                    }
                                }]
                        })];
                    case 1:
                        actionSheet = _a.sent();
                        return [4 /*yield*/, actionSheet.present()];
                    case 2:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    FacturacionCreditoPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-facturacion-credito',template:/*ion-inline-start:"C:\Users\Administrador\kenergy\src\pages\facturacion-credito\facturacion-credito.html"*/'<ion-header>\n  <ion-navbar color="titulo">\n    <button ion-button menuToggle>\n      <ion-icon name="menu"></ion-icon>\n    </button>\n    <ion-title class="tituloHeader" style="position: absolute;left: 25%; top: 33%;">Facturación</ion-title>\n\n    <ion-buttons end>\n      <button ion-button (click)="presentPopover($event)" style="color:#fff">\n        <!--<ion-icon name="more"></ion-icon>-->\n      </button>\n    </ion-buttons>\n\n\n    <ion-buttons left *ngIf="!isOn" class="animated fadeIn">\n      <button icon-only="" ion-button="" class="disable-hover bar-button bar-button-ios bar-button-default bar-button-default-ios">\n        <span class="button-inner">\n          <img src="assets/imgs/facturacion/factura.png" style="width: 65%;margin-left: -27px;">\n        </span>\n        <div class="button-effect">\n\n        </div>\n      </button>\n    </ion-buttons>\n  </ion-navbar>\n</ion-header>\n\n\n<ion-content padding style="\n    background-image: url(assets/imgs/fondo.jpg); \n    background-size: 100%;\n    background-position: bottom center;\n    background-repeat: no-repeat;\n    background-color: white;">\n  <div style="width:100%;text-align: left">\n    <ion-row>\n      <ion-col>\n        <ion-item style="width:100%">\n          <ion-label style="color:#1b155c;">Desde:</ion-label>\n          <ion-datetime displayFormat="DD/MM/YYYY" [(ngModel)]="desde" style="color: #000;" \n          doneText="Aceptar" cancelText="Cancelar" (ionChange)="buscar()"></ion-datetime>\n        </ion-item>\n      </ion-col>\n      <ion-col>\n        <ion-item style="width:100%">\n          <ion-label style="color:#1b155c;">Hasta:</ion-label>\n          <ion-datetime displayFormat="DD/MM/YYYY" [(ngModel)]="hasta" style="color: #000;" \n          doneText="Aceptar" cancelText="Cancelar" (ionChange)="buscar()"></ion-datetime>\n        </ion-item>\n      </ion-col>\n    </ion-row>\n  </div>\n\n  <ion-item style="width:100%">\n    <ion-label position="floating" style="color:#1b155c;">Estación:</ion-label>\n    <ion-select [(ngModel)]="idEstacion" style="color:#000" okText="Aceptar" \n    cancelText="Cancelar" (ionChange)="buscar()">\n      <ion-option *ngFor="let estacion of estaciones" value="{{estacion.id}}">{{estacion.descripcion}}</ion-option>\n    </ion-select>\n  </ion-item>\n\n  <div (click)="ordenar()" class="divorder"><ion-icon *ngIf="ordenFecha == 1" name="chevron-down-outline" class="iconoo"></ion-icon><ion-icon *ngIf="ordenFecha == 2" name="chevron-up-outline" class="iconoo"></ion-icon> {{ordenFecha == 1 ? "Ordenada de la más antigua a la más reciente" : "Ordenada de la más reciente a la más antigua" }}</div>\n\n  <ion-list class="animated fadeIn" style="margin-top: 5%;">\n    <ion-item *ngFor="let factura of facturas" class="itemList">\n      <div style="width:100%; display: flex; align-items: center;">\n        <!-- <div style="display:inline-block; width:10%;vertical-align: top;" (click)="facturacionService.downloadFactura(factura.id,factura.idSuc,factura.folio)"> -->\n        <div style="display:inline-block; width:10%;vertical-align: top;" (click)="downloadFactura2(factura.id,factura.idSuc)">\n          <img src="assets/imgs/facturacion/invoice2.png" style="width: 100%;">\n        </div>\n        <div style="display:inline-block; width:10%;vertical-align: top; margin-left: 10px;" (click)="facturacionService.downloadFacturaXML(factura.id,factura.idSuc,factura.folio)">\n          <img src="assets/imgs/facturacion/xml.png" style="width: 100%;">\n        </div>\n        <div style="display:inline-block;width:68%;vertical-align: top; margin-left: 20px;">\n          <div style="width:100%">\n            <div style="width:48%;display: inline-block;font-weight: lighter;" class="tituloHeader">Folio {{factura.folio}}</div>\n            <div style="width:48%;display: inline-block;font-weight: lighter; text-align: end; margin-left: 10px;" class="tituloHeader">{{factura.fecha}}</div>\n          </div>\n          <div style="width:100%">\n            <div style="width:48%; display: inline-block; font-weight: lighter; font-size: 70%;" class="tituloHeader">{{factura.estacion}}</div>\n            <div style="width:48%; display: inline-block; font-weight: lighter; text-align: end; margin-left: 10px;" class="tituloHeader">Monto:\n              {{factura.monto | currency}}</div>\n          </div>\n        </div>\n        <!--<div style="width:10%;display: inline-block;">\n          <div style="text-align: center;margin-top: -6px;">\n            <ion-icon name="download"></ion-icon>\n          </div>\n          <div style="text-align: center;margin-top: -6px;">\n            <ion-icon name="mail"></ion-icon>\n          </div>\n          <div style="text-align: center;margin-top: -6px;">\n            <ion-icon name="search"></ion-icon>\n          </div>\n        </div>-->\n      </div>\n    </ion-item>\n  </ion-list>\n</ion-content>\n<ion-fab top right class="animated swing">\n  <button ion-fab color="light" (click)="mostrarNotif.abrirNotificacion()">\n      <img src="assets/imgs/home/gas-station.png" alt="logo" class="claseImg animated fadeIn" />\n  </button>\n  <button *ngIf="notificacion.num > 0" ion-fab color="light" (click)="mostrarNotif.abrirNotificacion()" class="miniBoton">\n    {{notificacion.num}}\n</button>\n</ion-fab>'/*ion-inline-end:"C:\Users\Administrador\kenergy\src\pages\facturacion-credito\facturacion-credito.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["m" /* NavParams */],
            __WEBPACK_IMPORTED_MODULE_6__ionic_storage__["b" /* Storage */],
            __WEBPACK_IMPORTED_MODULE_4__providers_alerta_service__["a" /* AlertaServiceProvider */], __WEBPACK_IMPORTED_MODULE_5__providers_rest_service__["a" /* RestServiceProvider */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* LoadingController */], __WEBPACK_IMPORTED_MODULE_8__ionic_native_file_transfer___["a" /* FileTransfer */], __WEBPACK_IMPORTED_MODULE_9__ionic_native_file__["a" /* File */], __WEBPACK_IMPORTED_MODULE_10__ionic_native_file_opener___["a" /* FileOpener */],
            __WEBPACK_IMPORTED_MODULE_11__services_notificaciones_service__["a" /* NotificacionService */], __WEBPACK_IMPORTED_MODULE_12__services_abrirnotificaciones_service__["a" /* AbrirnotificacionesService */],
            __WEBPACK_IMPORTED_MODULE_13__services_facturacion_service__["a" /* FacturacionService */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["a" /* ActionSheetController */]])
    ], FacturacionCreditoPage);
    return FacturacionCreditoPage;
}());

//# sourceMappingURL=facturacion-credito.js.map

/***/ }),

/***/ 316:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return EstadisticasCreditoPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__models_productoModel__ = __webpack_require__(47);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__models_estadisticaModel__ = __webpack_require__(317);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__providers_alerta_service__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__providers_rest_service__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__ionic_storage__ = __webpack_require__(15);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__angular_common_http__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__services_notificaciones_service__ = __webpack_require__(17);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__services_abrirnotificaciones_service__ = __webpack_require__(18);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};










var EstadisticasCreditoPage = /** @class */ (function () {
    function EstadisticasCreditoPage(navCtrl, navParams, localStorage, alertaService, restService, loadingCtrl, notificacion, mostrarNotif) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.localStorage = localStorage;
        this.alertaService = alertaService;
        this.restService = restService;
        this.loadingCtrl = loadingCtrl;
        this.notificacion = notificacion;
        this.mostrarNotif = mostrarNotif;
        this.idProducto = 0;
        this.idChofer = 0;
        this.idVehiculo = 0;
        this.idEstacion = 0;
        this.idAnio = 0;
        this.idMes = 0;
        this.productos = [];
        this.vehiculos = [];
        this.estaciones = [];
        this.choferes = [];
        this.anios = [];
        this.meses = [];
        //
        this.estadisticas = [];
        this.totales = [];
        //
        this.usuario = null;
        this.meses = this.returnMeses();
        this.productos.push(new __WEBPACK_IMPORTED_MODULE_2__models_productoModel__["a" /* ProductoModel */](0, "Todos"));
        this.vehiculos.push(new __WEBPACK_IMPORTED_MODULE_2__models_productoModel__["a" /* ProductoModel */](0, "Todos"));
        this.estaciones.push(new __WEBPACK_IMPORTED_MODULE_2__models_productoModel__["a" /* ProductoModel */](0, "Todas"));
        this.choferes.push(new __WEBPACK_IMPORTED_MODULE_2__models_productoModel__["a" /* ProductoModel */](0, "Todos"));
        var year = new Date().getFullYear();
        this.idAnio = year;
        this.anios.push({ id: 0, anio: "Seleccionar" });
        for (var index = 1980; index <= year; index++) {
            this.anios.push({ id: index, anio: index });
        }
        /*this.estadisticas.push(new EstadisticaModel("Ene", 223999, 1200999));
        this.estadisticas.push(new EstadisticaModel("Feb"));
        this.estadisticas.push(new EstadisticaModel("MAr"));
        this.estadisticas.push(new EstadisticaModel("Abr"));
        this.estadisticas.push(new EstadisticaModel("May"));
        this.estadisticas.push(new EstadisticaModel("Jun"));
        this.estadisticas.push(new EstadisticaModel("Jul"));
        this.estadisticas.push(new EstadisticaModel("Ago"));
        this.estadisticas.push(new EstadisticaModel("Sep"));
        this.estadisticas.push(new EstadisticaModel("Oct"));
        this.estadisticas.push(new EstadisticaModel("Nov"));
        this.estadisticas.push(new EstadisticaModel("Dic"));*/
        //this.totales.push({ totalLts: 1123999, totalPrecio: 25788999 });
        this.openSesion();
    }
    EstadisticasCreditoPage.prototype.openSesion = function () {
        var _this = this;
        this.localStorage.ready().then(function () {
            _this.localStorage.get("@userSession").then(function (data) {
                if (data != null) {
                    _this.usuario = data;
                    _this.cargarCombos();
                    //this.cargarEdosCuenta();
                }
                else {
                    _this.alertaService.warnAlert(_this.restService.headerValidacion, "Usuario sin sesión, no se cargarán sus datos", null);
                }
            });
        });
    };
    EstadisticasCreditoPage.prototype.cargarCombos = function () {
        var _this = this;
        var loading = this.loadingCtrl.create();
        loading.present();
        this.productos = [];
        this.productos.push(new __WEBPACK_IMPORTED_MODULE_2__models_productoModel__["a" /* ProductoModel */](0, "Todos"));
        this.vehiculos = [];
        this.vehiculos.push(new __WEBPACK_IMPORTED_MODULE_2__models_productoModel__["a" /* ProductoModel */](0, "Todos"));
        this.estaciones = [];
        this.estaciones.push(new __WEBPACK_IMPORTED_MODULE_2__models_productoModel__["a" /* ProductoModel */](0, "Todos"));
        this.choferes = [];
        this.choferes.push(new __WEBPACK_IMPORTED_MODULE_2__models_productoModel__["a" /* ProductoModel */](0, "Todos"));
        this.restService.getToken().timeout(this.restService.timeOver).subscribe(function (data) {
            if (data == null) {
                loading.dismiss();
                _this.alertaService.warnAlert(_this.restService.headerValidacion, _this.restService.mensajeValidacionAdmin, null);
            }
            else {
                var body = new __WEBPACK_IMPORTED_MODULE_7__angular_common_http__["d" /* HttpParams */]();
                var a = _this.usuario.IdClient;
                //body.append("IdClient", a.toString());
                var urlArmada = "stats/" + a;
                console.log(urlArmada);
                //var urlArmada = "stats/"+this.usuario.IdClient;
                _this.restService.restServiceGETToken(urlArmada, body, data.toString()).timeout(_this.restService.timeOver).subscribe(function (dataRegistro) {
                    if (Object.keys(dataRegistro['Response']).length != 0) {
                        var productos = dataRegistro['Response'].Producto;
                        productos.forEach(function (producto) {
                            _this.productos.push(new __WEBPACK_IMPORTED_MODULE_2__models_productoModel__["a" /* ProductoModel */](producto.Id, producto.Nombre));
                        });
                        var estaciones = dataRegistro['Response'].Estacion;
                        estaciones.forEach(function (estacion) {
                            _this.estaciones.push(new __WEBPACK_IMPORTED_MODULE_2__models_productoModel__["a" /* ProductoModel */](estacion.Id, estacion.Nombre));
                        });
                        var choferes = dataRegistro['Response'].Chofer;
                        choferes.forEach(function (chofer) {
                            _this.choferes.push(new __WEBPACK_IMPORTED_MODULE_2__models_productoModel__["a" /* ProductoModel */](chofer.Id, chofer.Nombre));
                        });
                        var vehiculos = dataRegistro['Response'].Vehiculo;
                        vehiculos.forEach(function (vehiculo) {
                            _this.vehiculos.push(new __WEBPACK_IMPORTED_MODULE_2__models_productoModel__["a" /* ProductoModel */](vehiculo.Id, vehiculo.Nombre));
                        });
                        _this.buscar();
                    }
                    else {
                        _this.alertaService.warnAlert(_this.restService.headerValidacion, "No se cargaron los filtros de búsqueda", null);
                    }
                    loading.dismiss();
                }, function (error) {
                    loading.dismiss();
                    console.log(error);
                    _this.alertaService.errorAlert(_this.restService.headerError, _this.restService.mensajeError, null);
                });
            }
        }, function (error) {
            loading.dismiss();
            console.log(error);
            _this.alertaService.errorAlert(_this.restService.headerError, _this.restService.mensajeError, null);
        });
    };
    EstadisticasCreditoPage.prototype.returnMeses = function () {
        var meses = [];
        meses.push({
            id: 0,
            nombre: "Todos"
        });
        meses.push({
            id: 1,
            nombre: "Enero"
        });
        meses.push({
            id: 2,
            nombre: "Febrero"
        });
        meses.push({
            id: 3,
            nombre: "Marzo"
        });
        meses.push({
            id: 4,
            nombre: "Abril"
        });
        meses.push({
            id: 5,
            nombre: "Mayo"
        });
        meses.push({
            id: 6,
            nombre: "Junio"
        });
        meses.push({
            id: 7,
            nombre: "Julio"
        });
        meses.push({
            id: 8,
            nombre: "Agosto"
        });
        meses.push({
            id: 9,
            nombre: "Septiembre"
        });
        meses.push({
            id: 10,
            nombre: "Octubre"
        });
        meses.push({
            id: 11,
            nombre: "Noviembre"
        });
        meses.push({
            id: 12,
            nombre: "Diciembre"
        });
        return meses;
    };
    EstadisticasCreditoPage.prototype.returnTotalLts = function (estadisticas) {
        var suma = 0;
        estadisticas.forEach(function (e) {
            suma += e.lts;
        });
        return suma;
    };
    EstadisticasCreditoPage.prototype.returnTotalPrecios = function (estadisticas) {
        var suma = 0;
        estadisticas.forEach(function (e) {
            suma += e.precio;
        });
        return suma;
    };
    EstadisticasCreditoPage.prototype.buscar = function () {
        var _this = this;
        //despachos/total
        if (this.usuario == null) {
            this.alertaService.warnAlert(this.restService.headerValidacion, "Usuario no en sesión", null);
        }
        else {
            if (this.idAnio == 0) {
                this.alertaService.warnAlert(this.restService.headerValidacion, "Favor de seleccionar el año", null);
                return;
            }
            var loading_1 = this.loadingCtrl.create();
            loading_1.present();
            this.estadisticas = [];
            this.totales = [];
            this.restService.getToken().timeout(this.restService.timeOver).subscribe(function (data) {
                if (data == null) {
                    loading_1.dismiss();
                    _this.alertaService.warnAlert(_this.restService.headerValidacion, _this.restService.mensajeValidacionAdmin, null);
                }
                else {
                    var body = new __WEBPACK_IMPORTED_MODULE_7__angular_common_http__["d" /* HttpParams */]();
                    var a = _this.usuario.IdClient;
                    /**
                     Int:IdClient (Requerido), Int:Anio(requerido), int:IdVehiculo, int:IdEstacion, int:IdProducto,
                     
                     */
                    var url = "despachos/total?IdClient=" + a + "&Anio=" + _this.idAnio;
                    /*body.append("IdClient", a.toString());
                    body.append("Anio",this.idAnio.toString());*/
                    if (_this.idVehiculo != 0) {
                        url += "&IdVehiculo=" + _this.idVehiculo;
                    }
                    if (_this.idEstacion != 0) {
                        //body.append("IdEstacion",this.idEstacion.toString());
                        url += "&IdEstacion=" + _this.idEstacion;
                    }
                    if (_this.idProducto != 0) {
                        url += "&IdProducto=" + _this.idProducto;
                    }
                    if (_this.idChofer != 0) {
                        url += "&IdChofer=" + _this.idChofer;
                    }
                    if (_this.idMes != 0) {
                        url += "&Mes=" + _this.idMes;
                    }
                    //var urlArmada = "stats/"+this.usuario.IdClient;
                    console.log(url);
                    _this.restService.restServiceGETToken(url, body, data.toString()).timeout(_this.restService.timeOver).subscribe(function (dataRegistro) {
                        if (Object.keys(dataRegistro['Response']).length != 0) {
                            var totales = dataRegistro['Response'];
                            /**
                             * Efectivo: 1603.256
              Lts: 27336.55
              Nombre: "Ene"
                             */
                            totales.forEach(function (estadistica) {
                                _this.estadisticas.push(new __WEBPACK_IMPORTED_MODULE_3__models_estadisticaModel__["a" /* EstadisticaModel */](estadistica.Nombre, estadistica.Lts, estadistica.Efectivo));
                            });
                            _this.totales.push({ totalLts: _this.returnTotalLts(_this.estadisticas), totalPrecio: _this.returnTotalPrecios(_this.estadisticas) });
                        }
                        else {
                            _this.alertaService.warnAlert(_this.restService.headerValidacion, "No se cargaron sus estadísticos", null);
                        }
                        loading_1.dismiss();
                    }, function (error) {
                        loading_1.dismiss();
                        console.log(error);
                        _this.alertaService.errorAlert(_this.restService.headerError, _this.restService.mensajeError, null);
                    });
                }
            }, function (error) {
                loading_1.dismiss();
                console.log(error);
                _this.alertaService.errorAlert(_this.restService.headerError, _this.restService.mensajeError, null);
            });
        }
    };
    EstadisticasCreditoPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-estadisticas-credito',template:/*ion-inline-start:"C:\Users\Administrador\kenergy\src\pages\estadisticas-credito\estadisticas-credito.html"*/'<ion-header>\n  <ion-navbar color="titulo">\n    <button ion-button menuToggle>\n      <ion-icon name="menu"></ion-icon>\n    </button>\n    \n    <ion-title class="tituloHeader" style="position: absolute;left: 25%; top: 33%;">Estadísticas</ion-title>\n\n    <ion-buttons left  class="animated fadeIn">\n      <button icon-only="" ion-button="" class="disable-hover bar-button bar-button-ios bar-button-default bar-button-default-ios">\n        <span class="button-inner">\n          <img src="assets/imgs/estadisticas/graph.png" style="width: 65%;margin-left: -27px;">\n        </span>\n        <div class="button-effect">\n\n        </div>\n      </button>\n    </ion-buttons>\n  </ion-navbar>\n</ion-header>\n\n\n<ion-content padding style="\nbackground-image: url(assets/imgs/fondo.jpg); \nbackground-size: 100%;\nbackground-position: bottom center;\nbackground-repeat: no-repeat;\nbackground-color: white;">\n  <!-- <div (click)="buscar()">\n    <img src="assets/imgs/estadisticas/recargar.png" style="width: 6%;">\n  </div> -->\n  <div style="width:100%">\n    <ion-row>\n      <ion-col>\n        <ion-item>\n          <ion-label style="color:#1b155c;">Mes</ion-label>\n          <ion-select [(ngModel)]="idMes" style="color:#000" okText="Aceptar" \n          cancelText="Cancelar" (ionChange)="buscar()">\n            <ion-option *ngFor="let mes of meses" value="{{mes.id}}">{{mes.nombre}}</ion-option>\n          </ion-select>\n        </ion-item>\n      </ion-col>\n      <ion-col>\n        <ion-item>\n          <ion-label style="color:#1b155c;">Año</ion-label>\n          <ion-select [(ngModel)]="idAnio" style="color:#000" okText="Aceptar" \n          cancelText="Cancelar" (ionChange)="buscar()">\n            <ion-option *ngFor="let anio of anios" value="{{anio.id}}">{{anio.anio}}</ion-option>\n          </ion-select>\n        </ion-item>\n      </ion-col>\n    </ion-row>\n    <ion-item>\n      <ion-label position="floating" style="color:#1b155c;">Estación</ion-label>\n      <ion-select [(ngModel)]="idEstacion" style="color:#000" okText="Aceptar" \n      cancelText="Cancelar" (ionChange)="buscar()">\n        <ion-option *ngFor="let estacion of estaciones" value="{{estacion.id}}">{{estacion.descripcion}}</ion-option>\n      </ion-select>\n    </ion-item>\n    <ion-item>\n      <ion-label position="floating" style="color:#1b155c;">Producto</ion-label>\n      <ion-select [(ngModel)]="idProducto" style="color:#000" okText="Aceptar" \n      cancelText="Cancelar" (ionChange)="buscar()">\n        <ion-option *ngFor="let producto of productos" value="{{producto.id}}">{{producto.descripcion}}</ion-option>\n      </ion-select>\n    </ion-item>\n    <ion-item>\n      <ion-label position="floating" style="color:#1b155c;">Chofer</ion-label>\n      <ion-select [(ngModel)]="idChofer" style="color:#000" okText="Aceptar" \n      cancelText="Cancelar" (ionChange)="buscar()">\n        <ion-option *ngFor="let chofer of choferes" value="{{chofer.id}}">{{chofer.descripcion}}</ion-option>\n      </ion-select>\n    </ion-item>\n    <ion-item>\n      <ion-label position="floating" style="color:#1b155c;">Vehículo</ion-label>\n      <ion-select [(ngModel)]="idVehiculo" style="color:#000" okText="Aceptar" \n      cancelText="Cancelar" (ionChange)="buscar()">\n        <ion-option *ngFor="let vehiculo of vehiculos" value="{{vehiculo.id}}">{{vehiculo.descripcion}}</ion-option>\n      </ion-select>\n    </ion-item> \n  </div>\n\n  <div style="width:100%; margin-top: 5%;">\n    <div *ngFor="let total of totales" style="background-color: #001432;height: 30px;">\n      <div class="tituloHeader divAlignTotal">\n        Mes\n      </div>\n      <div class="tituloHeader divAlignTotal">\n        Total lts.\n      </div>\n      <div class="tituloHeader divAlignTotal">\n        Monto\n      </div>\n    </div>\n    <div *ngFor="let estadistica of estadisticas" style="border-top: 1px solid;padding-bottom: 5px; padding-top: 5px;">\n    	<div *ngIf="estadistica.mes != \'Total\'; else other_content">\n			   <div class="tituloHeader divAlign" >\n        			{{estadistica.mes}}\n      		</div>\n      		<div class="tituloHeader divAlign" *ngIf="estadistica.lts != 0">\n		        {{estadistica.lts | number: 0}}\n      		</div>\n      		<div class="tituloHeader divAlign" *ngIf="estadistica.precio != 0">\n        			{{estadistica.precio | currency}}\n      		</div>\n    	</div>    \n		<ng-template #other_content>\n			<div style="background-color: #c3c3c3;">\n				<div class="tituloHeader divAlign" >\n        			{{estadistica.mes}}\n      		</div>\n      		<div class="tituloHeader divAlign" *ngIf="estadistica.lts != 0">\n		        {{estadistica.lts | number: 0}}\n      		</div>\n      		<div class="tituloHeader divAlign" *ngIf="estadistica.precio != 0">\n        			{{estadistica.precio | currency}}\n      		</div>\n      	</div>\n		</ng-template>\n      \n      \n    </div>\n  </div>\n</ion-content>\n\n<ion-fab top right class="animated swing">\n  <button ion-fab color="light" (click)="mostrarNotif.abrirNotificacion()">\n      <img src="assets/imgs/home/gas-station.png" alt="logo" class="claseImg animated fadeIn" />\n  </button>\n  <button *ngIf="notificacion.num > 0" ion-fab color="light" (click)="mostrarNotif.abrirNotificacion()" class="miniBoton">\n    {{notificacion.num}}\n</button>\n</ion-fab>\n'/*ion-inline-end:"C:\Users\Administrador\kenergy\src\pages\estadisticas-credito\estadisticas-credito.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["m" /* NavParams */], __WEBPACK_IMPORTED_MODULE_6__ionic_storage__["b" /* Storage */],
            __WEBPACK_IMPORTED_MODULE_4__providers_alerta_service__["a" /* AlertaServiceProvider */], __WEBPACK_IMPORTED_MODULE_5__providers_rest_service__["a" /* RestServiceProvider */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* LoadingController */], __WEBPACK_IMPORTED_MODULE_8__services_notificaciones_service__["a" /* NotificacionService */], __WEBPACK_IMPORTED_MODULE_9__services_abrirnotificaciones_service__["a" /* AbrirnotificacionesService */]])
    ], EstadisticasCreditoPage);
    return EstadisticasCreditoPage;
}());

//# sourceMappingURL=estadisticas-credito.js.map

/***/ }),

/***/ 317:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return EstadisticaModel; });
var EstadisticaModel = /** @class */ (function () {
    function EstadisticaModel(mes, lts, precio) {
        if (mes === void 0) { mes = ""; }
        if (lts === void 0) { lts = 0; }
        if (precio === void 0) { precio = 0; }
        this.mes = mes;
        this.lts = lts;
        this.precio = precio;
    }
    return EstadisticaModel;
}());

//# sourceMappingURL=estadisticaModel.js.map

/***/ }),

/***/ 318:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return CargasCreditoPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__models_productoModel__ = __webpack_require__(47);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__cargas_info_credito_cargas_info_credito__ = __webpack_require__(319);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__providers_alerta_service__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__providers_rest_service__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__ionic_storage__ = __webpack_require__(15);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__angular_common_http__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__services_notificaciones_service__ = __webpack_require__(17);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__services_abrirnotificaciones_service__ = __webpack_require__(18);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};










var CargasCreditoPage = /** @class */ (function () {
    function CargasCreditoPage(navCtrl, navParams, localStorage, alertaService, restService, loadingCtrl, notificacion, mostrarNotif) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.localStorage = localStorage;
        this.alertaService = alertaService;
        this.restService = restService;
        this.loadingCtrl = loadingCtrl;
        this.notificacion = notificacion;
        this.mostrarNotif = mostrarNotif;
        this.idEstacion = 1;
        this.idProducto = 0;
        this.idVehiculo = 0;
        this.idChofer = 0;
        this.idFiltro = 1;
        this.desde = "";
        this.hasta = new Date().toISOString();
        //
        this.estaciones = [];
        this.productos = [];
        this.vehiculos = [];
        this.choferes = [];
        this.cargas = [];
        this.filtros = [];
        this.usuario = null;
        this.ordenFecha = 0;
        this.ordenPlaca = 0;
        this.estaciones.push(new __WEBPACK_IMPORTED_MODULE_2__models_productoModel__["a" /* ProductoModel */](0, "Todos"));
        this.productos.push(new __WEBPACK_IMPORTED_MODULE_2__models_productoModel__["a" /* ProductoModel */](0, "Todos"));
        this.vehiculos.push(new __WEBPACK_IMPORTED_MODULE_2__models_productoModel__["a" /* ProductoModel */](0, "Todos"));
        this.choferes.push(new __WEBPACK_IMPORTED_MODULE_2__models_productoModel__["a" /* ProductoModel */](0, "Todos"));
        this.filtros.push({ id: 0, filtro: "Ultimos 7 días" });
        this.filtros.push({ id: 1, filtro: "Este mes" });
        this.filtros.push({ id: 2, filtro: "Ultimos 30 días" });
        this.filtros.push({ id: 3, filtro: "Ultimos 3 meses" });
        /*this.cargas.push({fecha:"12-10-18",placa:"979-WEDE",lts:45.85,precio:1008.70});
        this.cargas.push({fecha:"11-10-18",placa:"979-WEDE",lts:45.85,precio:1008.70});
        this.cargas.push({fecha:"10-10-18",placa:"979-WEDE",lts:45.85,precio:1008.70});
        this.cargas.push({fecha:"09-10-18",placa:"979-WEDE",lts:45.85,precio:1008.70});
        this.cargas.push({fecha:"08-10-18",placa:"979-WEDE",lts:45.85,precio:1008.70});
        this.cargas.push({fecha:"07-10-18",placa:"979-WEDE",lts:45.85,precio:1008.70});
        this.cargas.push({fecha:"06-10-18",placa:"979-WEDE",lts:45.85,precio:1008.70});
        this.cargas.push({fecha:"05-10-18",placa:"979-WEDE",lts:45.85,precio:1008.70});
        this.cargas.push({fecha:"04-10-18",placa:"979-WEDE",lts:45.85,precio:1008.70});
        this.cargas.push({fecha:"03-10-18",placa:"979-WEDE",lts:45.85,precio:1008.70});
        this.cargas.push({fecha:"02-10-18",placa:"979-WEDE",lts:45.85,precio:1008.70});
        this.cargas.push({fecha:"01-10-18",placa:"979-WEDE",lts:45.85,precio:1008.70});
        this.cargas.push({fecha:"31-09-18",placa:"979-WEDE",lts:45.85,precio:1008.70});
        this.cargas.push({fecha:"30-09-18",placa:"979-WEDE",lts:45.85,precio:1008.70});*/
        this.openSesion();
    }
    CargasCreditoPage.prototype.openSesion = function () {
        var _this = this;
        this.localStorage.ready().then(function () {
            _this.localStorage.get("@userSession").then(function (data) {
                if (data != null) {
                    _this.usuario = data;
                    _this.cargarCombos();
                }
                else {
                    _this.alertaService.warnAlert(_this.restService.headerValidacion, "Usuario sin sesión, no se cargarán sus datos", null);
                }
            });
        });
    };
    CargasCreditoPage.prototype.cargarCombos = function () {
        var _this = this;
        var loading = this.loadingCtrl.create();
        loading.present();
        var desdeDate = new Date();
        console.log(desdeDate.toISOString());
        var mes = desdeDate.getMonth() + 1 < 10 ? "0" + (desdeDate.getMonth() + 1) : "" + (desdeDate.getMonth() + 1);
        console.log(mes);
        this.desde = desdeDate.getFullYear() + "-" + mes + "-01";
        console.log(this.desde);
        this.productos = [];
        this.productos.push(new __WEBPACK_IMPORTED_MODULE_2__models_productoModel__["a" /* ProductoModel */]());
        this.vehiculos = [];
        this.vehiculos.push(new __WEBPACK_IMPORTED_MODULE_2__models_productoModel__["a" /* ProductoModel */](0, "Todos"));
        this.estaciones = [];
        this.estaciones.push(new __WEBPACK_IMPORTED_MODULE_2__models_productoModel__["a" /* ProductoModel */](0, "Todos"));
        this.choferes = [];
        this.choferes.push(new __WEBPACK_IMPORTED_MODULE_2__models_productoModel__["a" /* ProductoModel */](0, "Todos"));
        this.restService.getToken().timeout(this.restService.timeOver).subscribe(function (data) {
            if (data == null) {
                loading.dismiss();
                _this.alertaService.warnAlert(_this.restService.headerValidacion, _this.restService.mensajeValidacionAdmin, null);
            }
            else {
                var body = new __WEBPACK_IMPORTED_MODULE_7__angular_common_http__["d" /* HttpParams */]();
                var a = _this.usuario.IdClient;
                //var a = 44;
                //body.append("IdClient", a.toString());
                var urlArmada = "stats/" + a;
                //var urlArmada = "stats/"+this.usuario.IdClient;
                _this.restService.restServiceGETToken(urlArmada, body, data.toString()).timeout(_this.restService.timeOver).subscribe(function (dataRegistro) {
                    if (Object.keys(dataRegistro['Response']).length != 0) {
                        var productos = dataRegistro['Response'].Producto;
                        productos.forEach(function (producto) {
                            _this.productos.push(new __WEBPACK_IMPORTED_MODULE_2__models_productoModel__["a" /* ProductoModel */](producto.Id, producto.Nombre));
                        });
                        var estaciones = dataRegistro['Response'].Estacion;
                        estaciones.forEach(function (estacion) {
                            _this.estaciones.push(new __WEBPACK_IMPORTED_MODULE_2__models_productoModel__["a" /* ProductoModel */](estacion.Id, estacion.Nombre));
                        });
                        var choferes = dataRegistro['Response'].Chofer;
                        choferes.forEach(function (chofer) {
                            _this.choferes.push(new __WEBPACK_IMPORTED_MODULE_2__models_productoModel__["a" /* ProductoModel */](chofer.Id, chofer.Nombre));
                        });
                        var vehiculos = dataRegistro['Response'].Vehiculo;
                        vehiculos.forEach(function (vehiculo) {
                            _this.vehiculos.push(new __WEBPACK_IMPORTED_MODULE_2__models_productoModel__["a" /* ProductoModel */](vehiculo.Id, vehiculo.Nombre));
                        });
                        //this.buscar();
                    }
                    else {
                        _this.alertaService.warnAlert(_this.restService.headerValidacion, "No se cargaron los filtros de búsqueda", null);
                    }
                    loading.dismiss();
                }, function (error) {
                    loading.dismiss();
                    console.log(error);
                    _this.alertaService.errorAlert(_this.restService.headerError, _this.restService.mensajeError, null);
                });
            }
        }, function (error) {
            loading.dismiss();
            console.log(error);
            _this.alertaService.errorAlert(_this.restService.headerError, _this.restService.mensajeError, null);
        });
        //this.buscar();
    };
    CargasCreditoPage.prototype.buscar = function () {
        var _this = this;
        if (this.usuario == null) {
            this.alertaService.warnAlert(this.restService.headerValidacion, "Usuario no en sesión", null);
        }
        else {
            this.cargas = [];
            var arrFecha = this.desde.split("T");
            var fechaDesde = arrFecha[0].split("-");
            var fechaFormat = "";
            var arrFecha2 = this.hasta.split("T");
            var fechaHasta = arrFecha2[0].split("-");
            var fechaFormatHasta = "";
            if (fechaDesde.length < 3) {
                //this.alertaService.warnAlert(this.restService.headerValidacion, "Selecciona una fecha de inicio", null);
            }
            else {
                // año/ mes/ dia
                fechaFormat = fechaDesde[2] + "/" + fechaDesde[1] + "/" + fechaDesde[0];
            }
            if (fechaHasta.length < 3) {
                //this.alertaService.warnAlert(this.restService.headerValidacion, "Selecciona una fecha de fin", null);
            }
            else {
                // año/ mes/ dia
                fechaFormatHasta = fechaHasta[2] + "/" + fechaHasta[1] + "/" + fechaHasta[0];
            }
            var loading_1 = this.loadingCtrl.create();
            loading_1.present();
            this.restService.getToken().timeout(this.restService.timeOver).subscribe(function (data) {
                if (data == null) {
                    loading_1.dismiss();
                    _this.alertaService.warnAlert(_this.restService.headerValidacion, _this.restService.mensajeValidacionAdmin, null);
                }
                else {
                    var body = new __WEBPACK_IMPORTED_MODULE_7__angular_common_http__["d" /* HttpParams */]();
                    var a = _this.usuario.IdClient;
                    //var a = 44;
                    //this.idEstacion = 1;
                    var url = "despachos?Desde=" + fechaFormat + "&Hasta=" + fechaFormatHasta + "&IdEstacion=" + _this.idEstacion + "&IdClient=" + a;
                    console.log(url);
                    /**
               * String:Desde (Requerido), String:Hasta(Requerido),
               * Int:IdProducto, Int:IdEstacion(Requerido), Int:Chofer,
               *  Int:IdVehiculo, Int:IdClient(Requerido)
               */
                    if (_this.idProducto != 0) {
                        url += "&IdProducto=" + _this.idProducto;
                    }
                    if (_this.idChofer != 0) {
                        url += "&IdChofer=" + _this.idChofer;
                    }
                    if (_this.idVehiculo != 0) {
                        url += "&IdVehiculo=" + _this.idVehiculo;
                    }
                    //var urlArmada = "stats/"+this.usuario.IdClient;
                    _this.restService.restServiceGETToken(url, body, data.toString()).timeout(_this.restService.timeOver).subscribe(function (dataRegistro) {
                        if (Object.keys(dataRegistro['Response']).length != 0) {
                            var cargas = dataRegistro['Response'];
                            cargas.forEach(function (carga) {
                                _this.cargas.push({ fecha: carga.Fecha, placa: carga.Placas, lts: carga.Litros, precio: carga.Efectivo, id: carga.Id, idEstacion: carga.IdEstacion });
                            });
                            _this.ordenFecha = 1;
                            _this.ordenar();
                        }
                        else if (dataRegistro['Message'] != 3) {
                            _this.alertaService.warnAlert(_this.restService.headerValidacion, dataRegistro['Message'], null);
                        } /*else{
                          this.alertaService.warnAlert(this.restService.headerValidacion, "Seleccione una estación para consulta de datos", null);
                        }*/
                        loading_1.dismiss();
                    }, function (error) {
                        loading_1.dismiss();
                        console.log(error);
                        _this.alertaService.errorAlert(_this.restService.headerError, _this.restService.mensajeError, null);
                    });
                }
            }, function (error) {
                loading_1.dismiss();
                console.log(error);
                _this.alertaService.errorAlert(_this.restService.headerError, _this.restService.mensajeError, null);
            });
        }
    };
    CargasCreditoPage.prototype.openCarga = function (carga) {
        var _this = this;
        var loading = this.loadingCtrl.create();
        loading.present();
        this.restService.getToken().timeout(this.restService.timeOver).subscribe(function (data) {
            if (data == null) {
                loading.dismiss();
                _this.alertaService.warnAlert(_this.restService.headerValidacion, _this.restService.mensajeValidacionAdmin, null);
            }
            else {
                var body = new __WEBPACK_IMPORTED_MODULE_7__angular_common_http__["d" /* HttpParams */]();
                var a = _this.usuario.IdClient;
                //var a = 44;
                //this.idEstacion = 1;
                var url = "despachos/detail?IdDespacho=" + carga.id + "&IdEstacion=" + carga.idEstacion;
                _this.restService.restServiceGETToken(url, body, data.toString()).timeout(_this.restService.timeOver).subscribe(function (dataRegistro) {
                    if (Object.keys(dataRegistro['Response']).length != 0) {
                        var carga_1 = dataRegistro['Response'];
                        //loading.dismiss();
                        _this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_3__cargas_info_credito_cargas_info_credito__["a" /* CargasInfoCreditoPage */], { carga: dataRegistro['Response'] });
                    }
                    else if (dataRegistro['Message'] != 3) {
                        _this.alertaService.warnAlert(_this.restService.headerValidacion, dataRegistro['Message'], null);
                    }
                    else {
                        _this.alertaService.warnAlert("Sin cargas!", "No se encontraron registros en el periodo seleccionado", null);
                    }
                    loading.dismiss();
                }, function (error) {
                    loading.dismiss();
                    console.log(error);
                    _this.alertaService.errorAlert(_this.restService.headerError, _this.restService.mensajeError, null);
                });
            }
        }, function (error) {
            loading.dismiss();
            console.log(error);
            _this.alertaService.errorAlert(_this.restService.headerError, _this.restService.mensajeError, null);
        });
    };
    CargasCreditoPage.prototype.ordenar = function (tipo) {
        if (tipo === void 0) { tipo = 0; }
        var orden1 = this.ordenFecha;
        var orden2 = this.ordenPlaca;
        this.cargas.sort(function (a, b) {
            if (tipo == 1) {
                if (orden2 != 1) {
                    if (a.placa > b.placa) {
                        return 1;
                    }
                    if (a.placa < b.placa) {
                        return -1;
                    }
                }
                else {
                    if (a.placa < b.placa) {
                        return 1;
                    }
                    if (a.placa > b.placa) {
                        return -1;
                    }
                }
            }
            else {
                if (orden1 != 1) {
                    if (new Date("20" + a.fecha.substr(6, 2) + "-" + a.fecha.substr(3, 2) + "-" + a.fecha.substr(0, 2)) > new Date("20" + b.fecha.substr(6, 2) + "-" + b.fecha.substr(3, 2) + "-" + b.fecha.substr(0, 2))) {
                        return 1;
                    }
                    if (new Date("20" + a.fecha.substr(6, 2) + "-" + a.fecha.substr(3, 2) + "-" + a.fecha.substr(0, 2)) < new Date("20" + b.fecha.substr(6, 2) + "-" + b.fecha.substr(3, 2) + "-" + b.fecha.substr(0, 2))) {
                        return -1;
                    }
                }
                else {
                    if (new Date("20" + a.fecha.substr(6, 2) + "-" + a.fecha.substr(3, 2) + "-" + a.fecha.substr(0, 2)) < new Date("20" + b.fecha.substr(6, 2) + "-" + b.fecha.substr(3, 2) + "-" + b.fecha.substr(0, 2))) {
                        return 1;
                    }
                    if (new Date("20" + a.fecha.substr(6, 2) + "-" + a.fecha.substr(3, 2) + "-" + a.fecha.substr(0, 2)) > new Date("20" + b.fecha.substr(6, 2) + "-" + b.fecha.substr(3, 2) + "-" + b.fecha.substr(0, 2))) {
                        return -1;
                    }
                }
            }
            return 0;
        });
        if (tipo == 1) {
            this.ordenPlaca = this.ordenPlaca != 1 ? 1 : 2;
            this.ordenFecha = 0;
        }
        else {
            this.ordenFecha = this.ordenFecha != 1 ? 1 : 2;
            this.ordenPlaca = 0;
        }
    };
    CargasCreditoPage.prototype.cambiarFiltroFecha = function () {
        var desdeDate = new Date();
        if (this.idFiltro == 0) {
            desdeDate.setDate(desdeDate.getDate() - 7);
            this.desde = desdeDate.toISOString();
        }
        if (this.idFiltro == 1) {
            var mes = desdeDate.getMonth() + 1 < 10 ? "0" + (desdeDate.getMonth() + 1) : "" + (desdeDate.getMonth() + 1);
            this.desde = desdeDate.getFullYear() + "-" + mes + "-01";
        }
        if (this.idFiltro == 2) {
            desdeDate.setDate(desdeDate.getDate() - 30);
            this.desde = desdeDate.toISOString();
        }
        if (this.idFiltro == 3) {
            desdeDate.setDate(desdeDate.getDate() - 90);
            this.desde = desdeDate.toISOString();
        }
    };
    CargasCreditoPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-cargas-credito',template:/*ion-inline-start:"C:\Users\Administrador\kenergy\src\pages\cargas-credito\cargas-credito.html"*/'<ion-header>\n  <ion-navbar color="titulo">\n    <button ion-button menuToggle>\n      <ion-icon name="menu"></ion-icon>\n    </button>\n\n    <ion-title class="tituloHeader" style="position: absolute;left: 25%; top: 33%;">Cargas</ion-title>\n\n    <ion-buttons left class="animated fadeIn">\n      <button icon-only="" ion-button="" class="disable-hover bar-button bar-button-ios bar-button-default bar-button-default-ios">\n        <span class="button-inner">\n          <img src="assets/imgs/cargas/fuel-station.png" style="width: 65%;margin-left: -27px;">\n        </span>\n        <div class="button-effect">\n\n        </div>\n      </button>\n    </ion-buttons>\n  </ion-navbar>\n</ion-header>\n\n\n<ion-content padding style="\n    background-image: url(assets/imgs/fondo.jpg); \n    background-size: 100%;\n    background-position: bottom center;\n    background-repeat: no-repeat;\n    background-color: white;">\n<!-- <div (click)="buscar()" style="margin-bottom: 10px;">\n  <img src="assets/imgs/estadisticas/recargar.png" style="width: 6%;">\n</div> -->\n<div style="width:100%;text-align: left">\n  \n  <ion-row>\n    <ion-col>\n      <ion-item style="width:100%">\n        <ion-label style="color:#1b155c;">Desde:</ion-label>\n        <ion-datetime displayFormat="DD/MM/YYYY" [(ngModel)]="desde" style="color: #000;" \n        doneText="Aceptar" cancelText="Cancelar" (ionChange)="buscar()"></ion-datetime>\n      </ion-item>\n    </ion-col>\n    <ion-col>\n      <ion-item style="width:100%">\n        <ion-label style="color:#1b155c;">Hasta:</ion-label>\n        <ion-datetime displayFormat="DD/MM/YYYY" [(ngModel)]="hasta" style="color: #000;" \n        doneText="Aceptar" cancelText="Cancelar" (ionChange)="buscar()"></ion-datetime>\n      </ion-item>\n    </ion-col>\n  </ion-row>\n  <ion-item style="width:100%">\n    <ion-label position="floating" style="color:#1b155c;">Estación:</ion-label>\n    <ion-select [(ngModel)]="idEstacion" style="color:#000" okText="Aceptar" \n    cancelText="Cancelar" (ionChange)="buscar()">\n      <ion-option *ngFor="let estacion of estaciones" value="{{estacion.id}}">{{estacion.descripcion}}</ion-option>\n    </ion-select>\n  </ion-item>\n  <ion-item style="width:100%">\n    <ion-label position="floating" style="color:#1b155c;">Producto:</ion-label>\n    <ion-select [(ngModel)]="idProducto" style="color:#000" okText="Aceptar" \n    cancelText="Cancelar" (ionChange)="buscar()">\n      <ion-option *ngFor="let producto of productos" value="{{producto.id}}">{{producto.descripcion}}</ion-option>\n    </ion-select>\n  </ion-item>\n  <ion-item style="width:100%">\n    <ion-label position="floating" style="color:#1b155c;">Vehículo:</ion-label>\n    <ion-select [(ngModel)]="idVehiculo" style="color:#000" okText="Aceptar" \n    cancelText="Cancelar" (ionChange)="buscar()">\n      <ion-option *ngFor="let vehiculo of vehiculos" value="{{vehiculo.id}}">{{vehiculo.descripcion}}</ion-option>\n    </ion-select>\n  </ion-item>\n  <ion-item style="width:100%">\n    <ion-label position="floating" style="color:#1b155c;">Chofer:</ion-label>\n    <ion-select [(ngModel)]="idChofer" style="color:#000" okText="Aceptar" \n    cancelText="Cancelar" (ionChange)="buscar()">\n      <ion-option *ngFor="let chofer of choferes" value="{{chofer.id}}">{{chofer.descripcion}}</ion-option>\n    </ion-select>\n  </ion-item>\n  <ion-item style="width:100%">\n    <ion-label position="floating" style="color:#1b155c;">Filtro de fecha:</ion-label>\n    <ion-select [(ngModel)]="idFiltro" style="color:#000" okText="Aceptar" \n    cancelText="Cancelar" (ionChange)="cambiarFiltroFecha()">\n      <ion-option *ngFor="let f of filtros" value="{{f.id}}">{{f.filtro}}</ion-option>\n    </ion-select>\n  </ion-item>\n</div>\n\n<div style="width:100%;background-color: #192b46;\nfont-size: 110%;\nfont-weight: 400; margin-top: 5%;">\n  <div class="tituloHeader divAlign" (click)="ordenar()">\n    Fecha <div style="background-color: white;" class="divorder"><ion-icon *ngIf="ordenFecha == 1" name="chevron-down-outline" class="iconoo"></ion-icon><ion-icon *ngIf="ordenFecha == 2" name="chevron-up-outline" class="iconoo"></ion-icon><ion-icon *ngIf="ordenFecha == 0" name="chevron-forward-outline" class="iconoo"></ion-icon></div>\n  </div>\n  <div class="tituloHeader divAlign" (click)="ordenar(1)">\n    Placa <div style="background-color: white;" class="divorder"><ion-icon *ngIf="ordenPlaca == 1" name="chevron-down-outline" class="iconoo"></ion-icon><ion-icon *ngIf="ordenPlaca == 2" name="chevron-up-outline" class="iconoo"></ion-icon><ion-icon *ngIf="ordenPlaca == 0" name="chevron-forward-outline" class="iconoo"></ion-icon></div>\n  </div>\n  <div class="tituloHeader divAlign">\n    Lts.\n  </div>\n  <div class="tituloHeader divAlign">\n    $\n  </div>\n  <div style="display: inline-block;\n  width: 4%;">\n    <img src="assets/imgs/cargas/ojo.png" style="width: 100%;">\n  </div>\n</div>\n<div *ngFor="let carga of cargas" style="border-bottom: 1px solid #192b46; padding-top: 12px; display: flex;\n    align-items: center;">\n  <div class="tituloHeader divAlign" style="color: #000;">\n    {{carga.fecha}}\n  </div>\n  <div class="tituloHeader divAlign" style="color: #000;">\n    {{carga.placa}}\n  </div>\n  <div class="tituloHeader divAlign" style="color: #000;">\n    {{carga.lts | number: 0}}\n  </div>\n  <div class="tituloHeader divAlign" style="color: #000;">\n    {{carga.precio | currency}}\n  </div>\n  <div style="display: inline-block;\n  width: 4%;" (click)="openCarga(carga)">\n    <img src="assets/imgs/cargas/ojo.png" style="width: 100%;">\n  </div>\n</div>\n\n</ion-content>\n\n<ion-fab top right class="animated swing">\n  <button ion-fab color="light" (click)="mostrarNotif.abrirNotificacion()">\n      <img src="assets/imgs/home/gas-station.png" alt="logo" class="claseImg animated fadeIn" />\n  </button>\n  <button *ngIf="notificacion.num > 0" ion-fab color="light" (click)="mostrarNotif.abrirNotificacion()" class="miniBoton">\n    {{notificacion.num}}\n</button>\n</ion-fab>'/*ion-inline-end:"C:\Users\Administrador\kenergy\src\pages\cargas-credito\cargas-credito.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["m" /* NavParams */],
            __WEBPACK_IMPORTED_MODULE_6__ionic_storage__["b" /* Storage */],
            __WEBPACK_IMPORTED_MODULE_4__providers_alerta_service__["a" /* AlertaServiceProvider */], __WEBPACK_IMPORTED_MODULE_5__providers_rest_service__["a" /* RestServiceProvider */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* LoadingController */], __WEBPACK_IMPORTED_MODULE_8__services_notificaciones_service__["a" /* NotificacionService */], __WEBPACK_IMPORTED_MODULE_9__services_abrirnotificaciones_service__["a" /* AbrirnotificacionesService */]])
    ], CargasCreditoPage);
    return CargasCreditoPage;
}());

//# sourceMappingURL=cargas-credito.js.map

/***/ }),

/***/ 319:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return CargasInfoCreditoPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__services_notificaciones_service__ = __webpack_require__(17);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__services_abrirnotificaciones_service__ = __webpack_require__(18);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var CargasInfoCreditoPage = /** @class */ (function () {
    function CargasInfoCreditoPage(navCtrl, navParams, viewCtrl, notificacion, mostrarNotif) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.viewCtrl = viewCtrl;
        this.notificacion = notificacion;
        this.mostrarNotif = mostrarNotif;
        this.carga = null;
        this.carga = navParams.get("carga");
    }
    CargasInfoCreditoPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad CargasInfoCreditoPage');
    };
    CargasInfoCreditoPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-cargas-info-credito',template:/*ion-inline-start:"C:\Users\Administrador\kenergy\src\pages\cargas-info-credito\cargas-info-credito.html"*/'<ion-header>\n  <ion-navbar color="titulo">\n    <button ion-button menuToggle>\n      <ion-icon name="menu"></ion-icon>\n    </button>\n    \n    <ion-title class="tituloHeader" style="position: absolute;left: 25%; top: 33%;">Carga/ detalle</ion-title>\n\n    <ion-buttons left  class="animated fadeIn">\n      <button icon-only="" ion-button="" class="disable-hover bar-button bar-button-ios bar-button-default bar-button-default-ios">\n        <span class="button-inner">\n          <img src="assets/imgs/cargas/fuel-station.png" style="width: 65%;margin-left: -27px;">\n        </span>\n        <div class="button-effect">\n\n        </div>\n      </button>\n    </ion-buttons>\n  </ion-navbar>\n</ion-header>\n\n<ion-content padding style="\n    background-image: url(assets/imgs/fondo.jpg); \n    background-size: 100%;\n    background-position: bottom center;\n    background-repeat: no-repeat;\n    background-color: white;">\n<div style="width: 100%; margin-bottom: 2px; margin-left: 20px;">Estación</div>\n<input placeholder="Estación" class="inputText clm " [(ngModel)]="carga.Estacion" readonly/>\n<div style="width: 100%; margin-bottom: 2px; margin-left: 20px;">Vehículo</div>\n<input placeholder="Vehículo" class="inputText clm " [(ngModel)]="carga.Auto" readonly/>\n<div style="width: 100%; margin-bottom: 2px; margin-left: 20px;">Chofer</div>\n<input placeholder="Chofer" class="inputText clm " [(ngModel)]="carga.Chofer" readonly/>\n\n<div style="width:100%" class="row">\n	<div style="width: 50%; margin-left: 20px; margin-top: -6px;" class="col">Fecha</div>\n  <div style="width: 50%; margin-left: 20px; margin-top: -6px;" class="col">Hora</div>\n</div>\n<div style="width:100%">\n  <input placeholder="Fecha" class="inputText clm widthMedium" [(ngModel)]="carga.Fecha" readonly/>\n  <input placeholder="Hora" class="inputText clm widthMedium" [(ngModel)]="carga.Hora" readonly/>\n</div>\n<div style="width:100%" class="row">\n	<div style="width: 50%; margin-left: 20px; margin-top: -6px;" class="col">Despacho</div>\n  <div style="width: 50%; margin-left: 20px; margin-top: -6px;" class="col">Ticket</div>\n</div>\n<div style="width:100%">\n  <input placeholder="Despacho" class="inputText clm widthMedium" [(ngModel)]="carga.Despacho" readonly/>\n  <input placeholder="Ticket" class="inputText clm widthMedium" [(ngModel)]="carga.Ticket" readonly/>\n</div>\n<div style="width:100%" class="row">\n	<div style="width: 50%; margin-left: 20px; margin-top: -6px;" class="col">Placas</div>\n  <div style="width: 50%; margin-left: 20px; margin-top: -6px;" class="col">Bomba</div>\n</div>\n<div style="width:100%">\n  <input placeholder="Placas" class="inputText clm widthMedium" [(ngModel)]="carga.Placas" readonly/>\n  <input placeholder="Bomba" class="inputText clm widthMedium" [(ngModel)]="carga.Bomba" readonly/>\n</div>\n<div style="width:100%" class="row">\n	<div style="width: 50%; margin-left: 20px; margin-top: -6px;" class="col">Producto</div>\n  <div style="width: 50%; margin-left: 20px; margin-top: -6px;" class="col">Cantidad Lts.</div>\n</div>\n<div style="width:100%">\n  <input placeholder="Producto" class="inputText clm widthMedium" [(ngModel)]="carga.Producto" readonly/>\n  <input placeholder="Cantidad Lts" class="inputText clm widthMedium" [(ngModel)]="carga.Litros" readonly/>\n</div>\n<div style="width:100%" class="row">\n	<div style="width: 50%; margin-left: 20px; margin-top: -6px;" class="col">Precio $/Lt</div>\n  <div style="width: 50%; margin-left: 20px; margin-top: -6px;" class="col">$ Monto</div>\n</div>\n<div style="width:100%">\n  <input placeholder="Precio $/Lt" class="inputText clm widthMedium" [(ngModel)]="carga.PrecioLitro" readonly/>\n  <input placeholder="$ Monto" class="inputText clm widthMedium" [(ngModel)]="carga.Efectivo" readonly/>\n</div>\n<div style="width:100%" class="row">\n	<div style="width: 50%; margin-left: 20px; margin-top: -6px;" class="col">Kilometraje Km</div>\n  <div style="width: 50%; margin-left: 20px; margin-top: -6px;" class="col">Km recorridos</div>\n</div>\n<div style="width:100%">\n  <input placeholder="Kilometraje Km" class="inputText clm widthMedium" [(ngModel)]="carga.Kilometraje" readonly/>\n  <input placeholder="Km recorridos" class="inputText clm widthMedium" [(ngModel)]="carga.KmRecorridos" readonly/>\n</div>\n<div style="width: 100%; margin-bottom: 2px; margin-left: 20px;">Factura</div>\n<input placeholder="Factura" class="inputText clm " [(ngModel)]="carga.Factura" readonly/>\n</ion-content>\n\n<ion-fab top right class="animated swing">\n  <button ion-fab color="light" (click)="mostrarNotif.abrirNotificacion()">\n      <img src="assets/imgs/home/gas-station.png" alt="logo" class="claseImg animated fadeIn" />\n  </button>\n  <button *ngIf="notificacion.num > 0" ion-fab color="light" (click)="mostrarNotif.abrirNotificacion()" class="miniBoton">\n    {{notificacion.num}}\n</button>\n</ion-fab>'/*ion-inline-end:"C:\Users\Administrador\kenergy\src\pages\cargas-info-credito\cargas-info-credito.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["m" /* NavParams */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["p" /* ViewController */],
            __WEBPACK_IMPORTED_MODULE_2__services_notificaciones_service__["a" /* NotificacionService */], __WEBPACK_IMPORTED_MODULE_3__services_abrirnotificaciones_service__["a" /* AbrirnotificacionesService */]])
    ], CargasInfoCreditoPage);
    return CargasInfoCreditoPage;
}());

//# sourceMappingURL=cargas-info-credito.js.map

/***/ }),

/***/ 320:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return EstadisticasPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__models_productoModel__ = __webpack_require__(47);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__models_estadisticaModel__ = __webpack_require__(317);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__providers_rest_service__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__providers_alerta_service__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__angular_common_http__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__ionic_storage__ = __webpack_require__(15);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__services_abrirnotificaciones_service__ = __webpack_require__(18);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__services_notificaciones_service__ = __webpack_require__(17);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};










var EstadisticasPage = /** @class */ (function () {
    function EstadisticasPage(navCtrl, navParams, localStorage, viewCtrl, restService, alertaService, loadingCtrl, notificacion, mostrarNotif) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.localStorage = localStorage;
        this.viewCtrl = viewCtrl;
        this.restService = restService;
        this.alertaService = alertaService;
        this.loadingCtrl = loadingCtrl;
        this.notificacion = notificacion;
        this.mostrarNotif = mostrarNotif;
        this.idProducto = 0;
        this.idVehiculo = 0;
        this.idEstacion = 0;
        this.idAnio = 0;
        this.productos = [];
        this.vehiculos = [];
        this.estaciones = [];
        this.anios = [];
        //Resultados
        this.estadisticas = [];
        this.totales = [];
        //
        this.usuario = null;
        this.productos.push(new __WEBPACK_IMPORTED_MODULE_2__models_productoModel__["a" /* ProductoModel */]());
        this.vehiculos.push(new __WEBPACK_IMPORTED_MODULE_2__models_productoModel__["a" /* ProductoModel */](0, "Todos"));
        this.estaciones.push(new __WEBPACK_IMPORTED_MODULE_2__models_productoModel__["a" /* ProductoModel */](0, "Todas"));
        var year = new Date().getFullYear();
        this.idAnio = year;
        this.anios.push({ id: 0, anio: "Año" });
        for (var index = 2018; index <= year; index++) {
            this.anios.push({ id: index, anio: index });
        }
        this.openSesion();
        /*this.estadisticas.push(new EstadisticaModel("Ene"));
        this.estadisticas.push(new EstadisticaModel("Feb"));
        this.estadisticas.push(new EstadisticaModel("Mar"));
        this.estadisticas.push(new EstadisticaModel("Abr"));
        this.estadisticas.push(new EstadisticaModel("May"));
        this.estadisticas.push(new EstadisticaModel("Jun"));
        this.estadisticas.push(new EstadisticaModel("Jul"));
        this.estadisticas.push(new EstadisticaModel("Ago"));
        this.estadisticas.push(new EstadisticaModel("Sep"));
        this.estadisticas.push(new EstadisticaModel("Oct"));
        this.estadisticas.push(new EstadisticaModel("Nov"));
        this.estadisticas.push(new EstadisticaModel("Dic"));*/
        //this.totales.push({ totalLts: 0, totalPrecio: 0 });
    }
    EstadisticasPage.prototype.openSesion = function () {
        var _this = this;
        this.localStorage.ready().then(function () {
            _this.localStorage.get("@userSession").then(function (data) {
                if (data != null) {
                    _this.usuario = data;
                    _this.cargarCombos();
                    //this.cargarEdosCuenta();
                }
                else {
                    _this.alertaService.warnAlert(_this.restService.headerValidacion, "Usuario sin sesión, no se cargarán sus datos", null);
                }
            });
        });
    };
    EstadisticasPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad EstadisticasPage');
    };
    EstadisticasPage.prototype.cancelar = function () {
        this.viewCtrl.dismiss();
    };
    EstadisticasPage.prototype.cargarCombos = function () {
        var _this = this;
        console.log(JSON.stringify(this.usuario));
        var loading = this.loadingCtrl.create();
        loading.present();
        this.productos = [];
        this.productos.push(new __WEBPACK_IMPORTED_MODULE_2__models_productoModel__["a" /* ProductoModel */]());
        this.vehiculos = [];
        this.vehiculos.push(new __WEBPACK_IMPORTED_MODULE_2__models_productoModel__["a" /* ProductoModel */](0, "Vehículo"));
        this.estaciones = [];
        this.estaciones.push(new __WEBPACK_IMPORTED_MODULE_2__models_productoModel__["a" /* ProductoModel */](0, "Estación"));
        this.restService.getToken().timeout(this.restService.timeOver).subscribe(function (data) {
            if (data == null) {
                loading.dismiss();
                _this.alertaService.warnAlert(_this.restService.headerValidacion, _this.restService.mensajeValidacionAdmin, null);
            }
            else {
                var body = new __WEBPACK_IMPORTED_MODULE_6__angular_common_http__["d" /* HttpParams */]();
                var a = _this.usuario.Id;
                //var a = 44;
                //body.append("IdClient", a.toString());
                var urlArmada = "stats/regular/" + a;
                //var urlArmada = "stats/"+this.usuario.IdClient;
                _this.restService.restServiceGETToken(urlArmada, body, data.toString()).timeout(_this.restService.timeOver).subscribe(function (dataRegistro) {
                    if (Object.keys(dataRegistro['Response']).length != 0) {
                        var productos = dataRegistro['Response'].Producto;
                        productos.forEach(function (producto) {
                            _this.productos.push(new __WEBPACK_IMPORTED_MODULE_2__models_productoModel__["a" /* ProductoModel */](producto.Id, producto.Nombre));
                        });
                        var estaciones = dataRegistro['Response'].Estacion;
                        estaciones.forEach(function (estacion) {
                            _this.estaciones.push(new __WEBPACK_IMPORTED_MODULE_2__models_productoModel__["a" /* ProductoModel */](estacion.Id, estacion.Nombre));
                        });
                        var vehiculos = dataRegistro['Response'].Vehiculo;
                        vehiculos.forEach(function (vehiculo) {
                            _this.vehiculos.push(new __WEBPACK_IMPORTED_MODULE_2__models_productoModel__["a" /* ProductoModel */](vehiculo.Id, vehiculo.Nombre));
                        });
                        //this.buscar();
                    }
                    else {
                        _this.alertaService.warnAlert(_this.restService.headerValidacion, "No se cargaron los filtros de búsqueda", null);
                    }
                    loading.dismiss();
                }, function (error) {
                    loading.dismiss();
                    console.log(error);
                    _this.alertaService.errorAlert(_this.restService.headerError, _this.restService.mensajeError, null);
                });
            }
        }, function (error) {
            loading.dismiss();
            console.log(error);
            _this.alertaService.errorAlert(_this.restService.headerError, _this.restService.mensajeError, null);
        });
        this.buscar();
    };
    EstadisticasPage.prototype.buscar = function () {
        var _this = this;
        this.estadisticas = [];
        this.totales = [];
        var loading = this.loadingCtrl.create();
        loading.present();
        this.restService.getToken().timeout(this.restService.timeOver).subscribe(function (data) {
            if (data == null) {
                loading.dismiss();
                _this.alertaService.warnAlert(_this.restService.headerValidacion, _this.restService.mensajeValidacionAdmin, null);
            }
            else {
                var body = new __WEBPACK_IMPORTED_MODULE_6__angular_common_http__["d" /* HttpParams */]();
                var a = _this.usuario.Id;
                //var a = 44;
                //body.append("IdClient", a.toString());
                var urlArmada = "despachos/total/regular/" + a + "?";
                //var urlArmada = "stats/"+this.usuario.IdClient;
                body.append("Anio", _this.idAnio.toString());
                body.append("IdVehiculo", _this.idVehiculo.toString());
                body.append("IdEstación", _this.idEstacion.toString());
                body.append("IdProducto", _this.idProducto.toString());
                if (_this.idAnio != 0) {
                    urlArmada += "Anio=" + _this.idAnio;
                }
                if (_this.idVehiculo != 0) {
                    urlArmada += "&IdVehiculo=" + _this.idVehiculo;
                }
                if (_this.idEstacion != 0) {
                    urlArmada += "&IdEstacion=" + _this.idEstacion;
                }
                if (_this.idProducto != 0) {
                    urlArmada += "&IdProducto=" + _this.idProducto;
                }
                _this.restService.restServiceGETToken(urlArmada, new __WEBPACK_IMPORTED_MODULE_6__angular_common_http__["d" /* HttpParams */](), data.toString()).timeout(_this.restService.timeOver).subscribe(function (dataRegistro) {
                    if (Object.keys(dataRegistro['Response']).length != 0) {
                        var array = dataRegistro['Response'];
                        array.forEach(function (e) {
                            _this.estadisticas.push(new __WEBPACK_IMPORTED_MODULE_3__models_estadisticaModel__["a" /* EstadisticaModel */](e.Nombre, e.Lts, e.Efectivo));
                        });
                        _this.totales.push({ totalLts: _this.returnTotalLts(_this.estadisticas), totalPrecio: _this.returnTotalPrecios(_this.estadisticas) });
                    }
                    else {
                        _this.alertaService.warnAlert(_this.restService.headerValidacion, dataRegistro['Message'], null);
                    }
                    loading.dismiss();
                }, function (error) {
                    loading.dismiss();
                    console.log(error);
                    _this.alertaService.errorAlert(_this.restService.headerError, _this.restService.mensajeError, null);
                });
            }
        }, function (error) {
            loading.dismiss();
            console.log(error);
            _this.alertaService.errorAlert(_this.restService.headerError, _this.restService.mensajeError, null);
        });
    };
    EstadisticasPage.prototype.returnTotalLts = function (estadisticas) {
        var suma = 0;
        estadisticas.forEach(function (e) {
            suma += e.lts;
        });
        return suma;
    };
    EstadisticasPage.prototype.returnTotalPrecios = function (estadisticas) {
        var suma = 0;
        estadisticas.forEach(function (e) {
            suma += e.precio;
        });
        return suma;
    };
    EstadisticasPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-estadisticas',template:/*ion-inline-start:"C:\Users\Administrador\kenergy\src\pages\estadisticas\estadisticas.html"*/'<ion-header>\n  <ion-navbar color="titulo">\n    <button ion-button menuToggle>\n      <ion-icon name="menu"></ion-icon>\n    </button>\n    \n    <ion-title class="tituloHeader" style="position: absolute;left: 25%; top: 33%;">Estadística</ion-title>\n\n    <ion-buttons left  class="animated fadeIn">\n      <button icon-only="" ion-button="" class="disable-hover bar-button bar-button-ios bar-button-default bar-button-default-ios">\n        <span class="button-inner">\n          <img src="assets/imgs/estadisticas/graph.png" style="width: 65%;margin-left: -27px;">\n        </span>\n        <div class="button-effect">\n\n        </div>\n      </button>\n    </ion-buttons>\n  </ion-navbar>\n</ion-header>\n\n\n<ion-content padding style="\n    background-image: url(assets/imgs/fondo.jpg); \nbackground-size: 100%;\nbackground-position: bottom center;\nbackground-repeat: no-repeat;\nbackground-color: white;">\n  <div style="width:100%">\n    <ion-item style="width:100%">\n      <ion-label position="floating" style="color:#1b155c;">Producto</ion-label>\n      <ion-select [(ngModel)]="idProducto" style="color:#000" okText="Aceptar" \n      cancelText="Cancelar" (ionChange)="buscar()">\n        <ion-option *ngFor="let producto of productos" value="{{producto.id}}">{{producto.descripcion}}</ion-option>\n      </ion-select>\n    </ion-item>\n    <ion-item style="width:100%">\n      <ion-label position="floating" style="color:#1b155c;">Vehiculo</ion-label>\n      <ion-select [(ngModel)]="idVehiculo" style="color:#000" okText="Aceptar" \n      cancelText="Cancelar" (ionChange)="buscar()">\n        <ion-option *ngFor="let vehiculo of vehiculos" value="{{vehiculo.id}}">{{vehiculo.descripcion}}</ion-option>\n      </ion-select>\n    </ion-item>\n    <ion-item style="width:100%">\n      <ion-label position="floating" style="color:#1b155c;">Estación</ion-label>\n      <ion-select [(ngModel)]="idEstacion" style="color:#000" okText="Aceptar" \n      cancelText="Cancelar" (ionChange)="buscar()">\n        <ion-option *ngFor="let estacion of estaciones" value="{{estacion.id}}">{{estacion.descripcion}}</ion-option>\n      </ion-select>\n    </ion-item>\n    <ion-item style="width:100%">\n      <ion-label position="floating" style="color:#1b155c;">Año</ion-label>\n      <ion-select [(ngModel)]="idAnio" style="color:#000" okText="Aceptar" \n      cancelText="Cancelar" (ionChange)="buscar()">\n        <ion-option *ngFor="let anio of anios" value="{{anio.id}}">{{anio.anio}}</ion-option>\n      </ion-select>\n    </ion-item>\n  </div>\n\n  <div style="width:100%; margin-top: 1.2em;">\n    <div class="tituloHeader divAlign">\n      Mes\n    </div>\n    <div class="tituloHeader divAlign">\n      Lts.\n    </div>\n    <div class="tituloHeader divAlign">\n      $\n    </div>\n    <!--<div *ngFor="let total of totales" style="background-color: #001432;height: 30px;">\n      <div class="tituloHeader divAlignTotal">\n        Total\n      </div>\n      <div class="tituloHeader divAlignTotal">\n        {{total.totalLts}}\n      </div>\n      <div class="tituloHeader divAlignTotal">\n        {{total.totalPrecio}}\n      </div>\n    </div>-->\n    <div *ngFor="let estadistica of estadisticas" style="border-top: 1px solid;padding-bottom: 5px; padding-top: 5px;">\n    	<div *ngIf="estadistica.mes == \'Total\'; else other_content">\n    		<div style="background-color: #001432;height: 30px;">\n      	<div class="tituloHeader divAlign" style="color:white;    padding-top: 8px;">\n        		{{estadistica.mes}}\n      	</div>\n      	<div class="tituloHeader divAlign" *ngIf="estadistica.lts != 0" style="color:white;     padding-top: 8px;">\n        		{{estadistica.lts}}\n      	</div>\n      	<div class="tituloHeader divAlign" *ngIf="estadistica.precio != 0" style="color:white;     padding-top: 8px;">\n        		{{estadistica.precio}}\n      	</div>\n      	</div>\n      </div>\n      <ng-template #other_content>\n			<div >\n				<div class="tituloHeader divAlign" >\n        			{{estadistica.mes}}\n      		</div>\n      		<div class="tituloHeader divAlign" *ngIf="estadistica.lts != 0">\n		        {{estadistica.lts | number: 0}}\n      		</div>\n      		<div class="tituloHeader divAlign" *ngIf="estadistica.precio != 0">\n        			{{estadistica.precio | currency}}\n      		</div>\n      	</div>\n		</ng-template>\n    </div>\n  </div>\n</ion-content>\n<ion-fab top right class="animated swing">\n  <button ion-fab color="light" (click)="mostrarNotif.abrirNotificacion()">\n      <img src="assets/imgs/home/gas-station.png" alt="logo" class="claseImg animated fadeIn" />\n  </button>\n  <button *ngIf="notificacion.num > 0" ion-fab color="light" (click)="mostrarNotif.abrirNotificacion()" class="miniBoton">\n    {{notificacion.num}}\n</button>\n</ion-fab>'/*ion-inline-end:"C:\Users\Administrador\kenergy\src\pages\estadisticas\estadisticas.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["m" /* NavParams */], __WEBPACK_IMPORTED_MODULE_7__ionic_storage__["b" /* Storage */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["p" /* ViewController */],
            __WEBPACK_IMPORTED_MODULE_4__providers_rest_service__["a" /* RestServiceProvider */], __WEBPACK_IMPORTED_MODULE_5__providers_alerta_service__["a" /* AlertaServiceProvider */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* LoadingController */],
            __WEBPACK_IMPORTED_MODULE_9__services_notificaciones_service__["a" /* NotificacionService */], __WEBPACK_IMPORTED_MODULE_8__services_abrirnotificaciones_service__["a" /* AbrirnotificacionesService */]])
    ], EstadisticasPage);
    return EstadisticasPage;
}());

//# sourceMappingURL=estadisticas.js.map

/***/ }),

/***/ 321:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MiAutoPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__services_abrirnotificaciones_service__ = __webpack_require__(18);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__services_notificaciones_service__ = __webpack_require__(17);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var MiAutoPage = /** @class */ (function () {
    function MiAutoPage(navCtrl, navParams, viewCtrl, notificacion, mostrarNotif) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.viewCtrl = viewCtrl;
        this.notificacion = notificacion;
        this.mostrarNotif = mostrarNotif;
        this.vehiculo = null;
        this.qr = "";
        this.vehiculo = navParams.get("vehiculo");
        this.qr = '' + this.vehiculo.id;
    }
    MiAutoPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad MiAutoPage');
    };
    MiAutoPage.prototype.cancelar = function () {
        this.viewCtrl.dismiss();
    };
    MiAutoPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-mi-auto',template:/*ion-inline-start:"C:\Users\Administrador\kenergy\src\pages\mi-auto\mi-auto.html"*/'<ion-header>\n  <ion-navbar color="titulo">\n    <button ion-button menuToggle>\n      <ion-icon name="menu"></ion-icon>\n    </button>\n    \n    <ion-title class="tituloHeader" style="position: absolute;left: 25%; top: 33%;">Mi Auto</ion-title>\n\n    <ion-buttons left  class="animated fadeIn">\n      <button icon-only="" ion-button="" class="disable-hover bar-button bar-button-ios bar-button-default bar-button-default-ios">\n        <span class="button-inner">\n          <img src="assets/imgs/miAuto/carro.png" style="width: 65%;margin-left: -27px;">\n        </span>\n        <div class="button-effect">\n\n        </div>\n      </button>\n    </ion-buttons>\n  </ion-navbar>\n</ion-header>\n\n<ion-content padding style="\nbackground-image: url(assets/imgs/fondo.jpg); \nbackground-size: 100%;\nbackground-position: bottom center;\nbackground-repeat: no-repeat;\nbackground-color: white;">\n  <div style="text-align:center;font-weight: 700;\n  font-size: 220%;" class="tituloHeader">\n    {{vehiculo.modelo}}\n  </div>\n  <div style="border-bottom: 1px solid #d8d9da;">\n    <div style="text-align:center;font-weight: 500;\n  font-size: 200%;" class="tituloHeader">\n    {{vehiculo.placa}}\n  </div>\n  </div>\n  <div style="padding: 5% 0;">\n    <div style="padding: 25% 0;">\n      <div style="margin-top: 16px;">\n        <qrcode [qrdata]="qr" [size]="256" [level]="\'M\'" class="animated flipInX"></qrcode>\n      </div>\n      <div class="tituloHeader" style="    text-align: center;font-size: 161%;font-weight: 700;margin-top: 10%;border-bottom: 1px solid #cacaca;">\n        Amigo Fiel N° {{vehiculo.id}}\n      </div>\n  </div>\n</div>\n</ion-content>\n<ion-fab top right class="animated swing">\n  <button ion-fab color="light" (click)="mostrarNotif.abrirNotificacion()">\n      <img src="assets/imgs/home/gas-station.png" alt="logo" class="claseImg animated fadeIn" />\n  </button>\n  <button *ngIf="notificacion.num > 0" ion-fab color="light" (click)="mostrarNotif.abrirNotificacion()" class="miniBoton">\n    {{notificacion.num}}\n</button>\n</ion-fab>'/*ion-inline-end:"C:\Users\Administrador\kenergy\src\pages\mi-auto\mi-auto.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["m" /* NavParams */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["p" /* ViewController */],
            __WEBPACK_IMPORTED_MODULE_3__services_notificaciones_service__["a" /* NotificacionService */], __WEBPACK_IMPORTED_MODULE_2__services_abrirnotificaciones_service__["a" /* AbrirnotificacionesService */]])
    ], MiAutoPage);
    return MiAutoPage;
}());

//# sourceMappingURL=mi-auto.js.map

/***/ }),

/***/ 322:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return EstacionesService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};

var EstacionesService = /** @class */ (function () {
    function EstacionesService() {
        this.rad = function (x) { return x * Math.PI / 180; };
    }
    EstacionesService.prototype.distancia = function (lat1, long1, lat2, long2) {
        var R = 6378.137;
        var dLat = this.rad(lat2 - lat1);
        var dLong = this.rad(long2 - long1);
        var a = Math.sin(dLat / 2) * Math.sin(dLat / 2) + Math.cos(this.rad(lat1)) * Math.cos(this.rad(lat2)) * Math.sin(dLong / 2) * Math.sin(dLong / 2);
        var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        var d = R * c;
        return d; //Retorna tres decimales
    };
    EstacionesService = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["A" /* Injectable */])()
    ], EstacionesService);
    return EstacionesService;
}());

//# sourceMappingURL=estaciones.service.js.map

/***/ }),

/***/ 324:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return RegistroPreviewPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__registro_valida_registro_valida__ = __webpack_require__(325);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__providers_alerta_service__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__recuperar_contra_recuperar_contra__ = __webpack_require__(327);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var RegistroPreviewPage = /** @class */ (function () {
    function RegistroPreviewPage(navCtrl, navParams, menuCtrl, alertaService) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.menuCtrl = menuCtrl;
        this.alertaService = alertaService;
        this.tipo = 0;
        this.menuCtrl.enable(false, "authenticated");
        this.tipo = navParams.get("tipo");
    }
    RegistroPreviewPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad RegistroPreviewPage');
    };
    RegistroPreviewPage.prototype.openRegistro = function (ruta) {
        if (ruta == 1) {
            this.navCtrl.push(this.tipo == 1 ? __WEBPACK_IMPORTED_MODULE_2__registro_valida_registro_valida__["a" /* RegistroValidaPage */] : __WEBPACK_IMPORTED_MODULE_4__recuperar_contra_recuperar_contra__["a" /* RecuperarContraPage */]);
        }
        else {
            this.alertaService.alertaSinSalidaBoton(this.tipo == 1 ? "Registro para clientes de crédito" : "Recuperación de contraseña para clientes de crédito", this.tipo == 1 ? "Solicita tu usuario con tu ejecutivo de venta, comunícate al tel: <a href='tel:2727280112'>(272) 7280112</a> o al correo <a href='mailto:registro@kenergyfuel.com'>registro@kenergyfuel.com</a>" : "Solicita tu contraseña con tu ejecutivo de venta, comunícate al tel: <a href='tel:2727280112'>(272) 7280112</a> o al correo <a href='mailto:registro@kenergyfuel.com'>registro@kenergyfuel.com</a>");
        }
    };
    RegistroPreviewPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-registro-preview',template:/*ion-inline-start:"C:\Users\Administrador\kenergy\src\pages\registro-preview\registro-preview.html"*/'<ion-content class="animated fadeIn" padding style="\n    background-image: url(assets/imgs/fondo.jpg); \n    background-size: 100%;\n    background-position: bottom center;\n    background-repeat: no-repeat;\n    background-color: white;">\n  <div style="text-align:center" class="animated fadeInDown">\n    <img src="assets/imgs/registro/logoLetra2.png" alt="logo" class="logo logoMargen" style="margin-bottom: 13%;" />\n  </div>\n  <div style="font-size: 150%;text-align: center;margin: 28px;margin-top: -5%;" class="tituloHeader">\n    SELECCIONA EL TIPO DE CLIENTE AL QUE PERTENECES\n  </div>\n  <div style="width: 100%;margin: 28px;margin-top: 22%;">\n    <div style="background-color: #e97523;\n    width: 40%;\n    color: #fff;\n    padding: 6px;\n    text-align: center;\n    font-size: 135%;\n    border-radius: 5px;    display: inline-block;" (click)="openRegistro(1)">AMIGO FIEL\n    </div>\n    <div style="background-color: #c1272d;\n    width: 40%;\n    color: #fff;\n    padding: 6px;\n    text-align: center;\n    font-size: 135%;\n    border-radius: 5px;    display: inline-block;" (click)="openRegistro(0)">ENTERPRISE\n    </div>\n  </div>\n</ion-content>'/*ion-inline-end:"C:\Users\Administrador\kenergy\src\pages\registro-preview\registro-preview.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["m" /* NavParams */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* MenuController */], __WEBPACK_IMPORTED_MODULE_3__providers_alerta_service__["a" /* AlertaServiceProvider */]])
    ], RegistroPreviewPage);
    return RegistroPreviewPage;
}());

//# sourceMappingURL=registro-preview.js.map

/***/ }),

/***/ 325:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return RegistroValidaPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__registro_registro__ = __webpack_require__(326);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_common_http__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__providers_alerta_service__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__providers_rest_service__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__ionic_storage__ = __webpack_require__(15);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__angular_forms__ = __webpack_require__(20);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8_validator__ = __webpack_require__(52);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8_validator___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_8_validator__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__home_home__ = __webpack_require__(65);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__ionic_native_sqlite__ = __webpack_require__(43);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};











var RegistroValidaPage = /** @class */ (function () {
    function RegistroValidaPage(navCtrl, navParams, menuCtrl, alertaService, restService, loadingCtrl, localStorage, alertCtrl, events, sqlite) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.menuCtrl = menuCtrl;
        this.alertaService = alertaService;
        this.restService = restService;
        this.loadingCtrl = loadingCtrl;
        this.localStorage = localStorage;
        this.alertCtrl = alertCtrl;
        this.events = events;
        this.sqlite = sqlite;
        this.email = "";
        this.emailConfirma = "";
        //public regex = new RegExp(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
        this.loginForm = new __WEBPACK_IMPORTED_MODULE_7__angular_forms__["b" /* FormGroup */]({
            email: new __WEBPACK_IMPORTED_MODULE_7__angular_forms__["a" /* FormControl */](''),
            emailConfirma: new __WEBPACK_IMPORTED_MODULE_7__angular_forms__["a" /* FormControl */](''),
            nombre: new __WEBPACK_IMPORTED_MODULE_7__angular_forms__["a" /* FormControl */](''),
            usu: new __WEBPACK_IMPORTED_MODULE_7__angular_forms__["a" /* FormControl */](''),
            contra: new __WEBPACK_IMPORTED_MODULE_7__angular_forms__["a" /* FormControl */](''),
            contraConfirma: new __WEBPACK_IMPORTED_MODULE_7__angular_forms__["a" /* FormControl */](''),
            nacimiento: new __WEBPACK_IMPORTED_MODULE_7__angular_forms__["a" /* FormControl */](''),
            tel: new __WEBPACK_IMPORTED_MODULE_7__angular_forms__["a" /* FormControl */]('')
        });
        this.loginFormValidator = {
            email: {
                mensaje: ''
            },
            emailConfirma: {
                mensaje: ''
            },
            nombre: {
                mensaje: ''
            },
            usu: {
                mensaje: ''
            },
            contra: {
                mensaje: ''
            },
            contraConfirma: {
                mensaje: ''
            },
            nacimiento: {
                mensaje: ''
            },
            tel: {
                mensaje: ''
            }
        };
        this.menuCtrl.enable(false, "authenticated");
    }
    RegistroValidaPage.prototype.ngOnInit = function () {
        this.onValueChanges();
    };
    RegistroValidaPage.prototype.ionViewDidLoad = function () {
        document.getElementById("editado").value = 0;
    };
    RegistroValidaPage.prototype.ionViewCanLeave = function () {
        var _this = this;
        return new Promise(function (resolve, reject) {
            if (document.getElementById("editado").value == 0)
                resolve();
            else
                _this.alertaService.alertaConfirmacion("Confirmar", "¿Desea salir sin guardar los cambios realizados?", resolve, reject);
        });
    };
    RegistroValidaPage.prototype.onValueChanges = function () {
        this.loginForm.valueChanges.subscribe(function (val) {
            document.getElementById("editado").value = 1;
        });
    };
    RegistroValidaPage.prototype.formValidator = function () {
        if (__WEBPACK_IMPORTED_MODULE_8_validator___default.a.isEmpty(this.loginForm.value.nombre)) {
            this.loginFormValidator.nombre.mensaje = 'Es necesario capturar el Nombre Completo';
            this.cambiarDiseñoInput("nombre", 1);
            return false;
        }
        else {
            this.loginFormValidator.nombre.mensaje = '';
            this.cambiarDiseñoInput("nombre");
        }
        if (__WEBPACK_IMPORTED_MODULE_8_validator___default.a.isEmpty(this.loginForm.value.nacimiento)) {
            this.loginFormValidator.nacimiento.mensaje = 'Es necesario seleccionar la Fecha de nacimiento';
            this.cambiarDiseñoInput("nacimiento", 1);
            return false;
        }
        else {
            this.loginFormValidator.nacimiento.mensaje = '';
            this.cambiarDiseñoInput("nacimiento");
        }
        if (__WEBPACK_IMPORTED_MODULE_8_validator___default.a.isEmpty(this.loginForm.value.usu)) {
            this.loginFormValidator.usu.mensaje = 'Es necesario capturar el Usuario';
            this.cambiarDiseñoInput("usu", 1);
            return false;
        }
        else {
            this.loginFormValidator.usu.mensaje = '';
            this.cambiarDiseñoInput("usu");
        }
        if (__WEBPACK_IMPORTED_MODULE_8_validator___default.a.isEmpty(this.loginForm.value.contra)) {
            this.loginFormValidator.contra.mensaje = 'Es necesario capturar la Contraseña';
            this.cambiarDiseñoInput("contra", 1);
            return false;
        }
        else {
            this.loginFormValidator.contra.mensaje = '';
            this.cambiarDiseñoInput("contra");
        }
        if (__WEBPACK_IMPORTED_MODULE_8_validator___default.a.isEmpty(this.loginForm.value.contraConfirma)) {
            this.loginFormValidator.contraConfirma.mensaje = 'Es necesario confirmar la Contraseña';
            this.cambiarDiseñoInput("contraConfirma", 1);
            return false;
        }
        else {
            this.loginFormValidator.contraConfirma.mensaje = '';
            this.cambiarDiseñoInput("contraConfirma");
        }
        if (this.loginForm.value.contraConfirma != this.loginForm.value.contra) {
            this.loginFormValidator.contraConfirma.mensaje = 'Las contraseñas no coinciden, favor de ingresarlas correctamente';
            return false;
        }
        else {
            this.loginFormValidator.contraConfirma.mensaje = '';
        }
        if (__WEBPACK_IMPORTED_MODULE_8_validator___default.a.isEmpty(this.loginForm.value.email)) {
            this.loginFormValidator.email.mensaje = 'Es necesario capturar el Correo Electrónico';
            this.cambiarDiseñoInput("email", 1);
            return false;
        }
        else {
            this.loginFormValidator.email.mensaje = '';
            this.cambiarDiseñoInput("email");
        }
        if (!__WEBPACK_IMPORTED_MODULE_8_validator___default.a.isEmail(this.loginForm.value.email)) {
            this.loginFormValidator.email.mensaje = 'Ingrese una dirección de correo válida';
            this.cambiarDiseñoInput("email", 1);
            return false;
        }
        else {
            this.loginFormValidator.email.mensaje = '';
            this.cambiarDiseñoInput("email");
        }
        if (__WEBPACK_IMPORTED_MODULE_8_validator___default.a.isEmpty(this.loginForm.value.emailConfirma)) {
            this.loginFormValidator.emailConfirma.mensaje = 'Es necesario confirmar Correo Electrónico';
            this.cambiarDiseñoInput("emailConfirma", 1);
            return false;
        }
        else {
            this.loginFormValidator.emailConfirma.mensaje = '';
            this.cambiarDiseñoInput("emailConfirma");
        }
        if (!__WEBPACK_IMPORTED_MODULE_8_validator___default.a.isEmail(this.loginForm.value.emailConfirma)) {
            this.loginFormValidator.emailConfirma.mensaje = 'Ingrese una dirección de correo válida';
            this.cambiarDiseñoInput("emailConfirma", 1);
            return false;
        }
        else {
            this.loginFormValidator.emailConfirma.mensaje = '';
            this.cambiarDiseñoInput("emailConfirma");
        }
        if (this.loginForm.value.emailConfirma != this.loginForm.value.email) {
            this.loginFormValidator.emailConfirma.mensaje = 'Los correos ingresadas no coinciden, favor de ingresarlas correctamente';
            return false;
        }
        else {
            this.loginFormValidator.emailConfirma.mensaje = '';
        }
        if (__WEBPACK_IMPORTED_MODULE_8_validator___default.a.isEmpty(this.loginForm.value.tel)) {
            this.loginFormValidator.tel.mensaje = 'Ingrese el teléfono';
            this.cambiarDiseñoInput("tel", 1);
            return false;
        }
        else {
            this.loginFormValidator.tel.mensaje = '';
            this.cambiarDiseñoInput("tel");
        }
        return true;
    };
    RegistroValidaPage.prototype.ingresarClave = function () {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_2__registro_registro__["a" /* RegistroPage */]);
    };
    RegistroValidaPage.prototype.validar = function () {
        var _this = this;
        //user/email
        if (this.formValidator()) {
            var loading_1 = this.loadingCtrl.create();
            loading_1.present();
            this.restService.getToken().timeout(this.restService.timeOver).subscribe(function (data) {
                if (data == null) {
                    loading_1.dismiss();
                    _this.alertaService.warnAlert(_this.restService.headerValidacion, _this.restService.mensajeValidacionAdmin, null);
                }
                else {
                    var body = new __WEBPACK_IMPORTED_MODULE_3__angular_common_http__["d" /* HttpParams */]()
                        .set('Password', _this.loginForm.value.contra)
                        .set('Nombre', _this.loginForm.value.nombre)
                        .set('Email', _this.loginForm.value.email) //En el diseño no se pide correo
                        .set('Alias', _this.loginForm.value.usu)
                        .set('FechaNacimiento', _this.loginForm.value.nacimiento)
                        .set('Telefono', _this.loginForm.value.tel);
                    _this.restService.restServicePOSTTokenXForm("user/movil", body, data.toString()).timeout(_this.restService.timeOver).subscribe(function (dataRegistro) {
                        document.getElementById("editado").value = 0;
                        if (dataRegistro['Status'] == 1) {
                            var bodys = new __WEBPACK_IMPORTED_MODULE_3__angular_common_http__["d" /* HttpParams */]()
                                .set('Email', _this.loginForm.value.email)
                                .set('Password', _this.loginForm.value.contra);
                            _this.restService.restServicePOSTTokenXForm("session/user", bodys, data.toString()).timeout(_this.restService.timeOver).subscribe(function (dataLogin) {
                                if (Object.keys(dataLogin['Response']).length != 0) {
                                    _this.localStorage.ready().then(function () {
                                        _this.localStorage.get("@userSession").then(function (data) {
                                            _this.localStorage.set("@userSession", dataLogin['Response']);
                                            //guardamos datos del usuario en la tabla
                                            var sqlDelete = "DELETE FROM usuario";
                                            var sql = 'INSERT INTO usuario VALUES (?,?,?)';
                                            _this.sqlite.create({
                                                name: 'kenergy.db',
                                                location: 'default'
                                            }).then(function (db) {
                                                db.executeSql(sqlDelete, [])
                                                    .then(function (response) {
                                                    db.executeSql(sql, [1, JSON.stringify(dataLogin['Response']), dataLogin['Response'].IdClient])
                                                        .then(function (response) {
                                                        //this.alertaService.errorAlert("usuario Login", "Guardo correctamente el usuario" + dataLogin['Response'].IdClient, null)
                                                    })
                                                        .catch(function (error) { return _this.alertaService.errorAlert("Error al insertar usuario", error, null); });
                                                });
                                                //.catch(error => this.alertaService.errorAlert("Error al borrar usuario", error, null));
                                            })
                                                .catch(function (error) {
                                                _this.alertaService.errorAlert("Info", "Excepcion al crear BD " + error, null);
                                            });
                                            _this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_9__home_home__["a" /* HomePage */], { usuario: dataLogin['Response'] });
                                        });
                                    });
                                }
                                else {
                                    _this.alertaService.warnAlert(_this.restService.headerValidacion, "El correo o la contraseña son incorrectos", null);
                                }
                                loading_1.dismiss();
                            }, function (error) {
                                loading_1.dismiss();
                                console.log(error);
                                _this.alertaService.errorAlert(_this.restService.headerError, _this.restService.mensajeError, null);
                            });
                        }
                        else {
                            if (dataRegistro['Message'] == 6)
                                _this.alertaService.warnAlert(_this.restService.headerValidacion, "Este correo electrónico ya fue registrado", null);
                            else
                                _this.alertaService.warnAlert(_this.restService.headerValidacion, "No se pudo registrar al usuario", null);
                        }
                        loading_1.dismiss();
                    }, function (error) {
                        loading_1.dismiss();
                        console.log(error);
                        _this.alertaService.errorAlert(_this.restService.headerError, _this.restService.mensajeError, null);
                    });
                }
            }, function (error) {
                loading_1.dismiss();
                console.log(error);
                _this.alertaService.errorAlert(_this.restService.headerError, _this.restService.mensajeError, null);
            });
        }
    };
    RegistroValidaPage.prototype.cambiarDiseñoInput = function (id, color) {
        if (color === void 0) { color = 0; }
        var strColor = color == 1 ? "red" : "white";
        document.getElementById(id).style.backgroundColor = strColor;
    };
    RegistroValidaPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-registro-valida',template:/*ion-inline-start:"C:\Users\Administrador\kenergy\src\pages\registro-valida\registro-valida.html"*/'<ion-content class="animated fadeIn" padding style="\n    background-image: url(assets/imgs/fondo.jpg); \n    background-size: 100%;\n    background-position: bottom center;\n    background-repeat: no-repeat;\n    background-color: white;">\n  <div style="text-align:center" class="animated fadeInDown">\n    <img src="assets/imgs/registro/logoLetra2.png" alt="logo" class="logo logoMargen" style="margin-bottom: 6%;" />\n  </div>\n  <div style="width:100%;margin-bottom: 5%" class="animated fadeInDown">\n    <div class="tituloHeader" style="width:100%;display:inline-block;font-size: 150%">Ingresa tus datos</div>\n  </div>\n  <form [formGroup]="loginForm">\n  <input type="hidden" id="editado"/>\n  <ion-label position="floating" style="color:#181560;">Nombre completo*</ion-label>\n  <ion-input formControlName="nombre" style="color: #000;" autocapitalize="off" autocomplete="off" autocorrect="off" id="nombre"></ion-input>\n  <ion-item *ngIf="loginFormValidator.nombre.mensaje">\n    <ion-label text-wrap color="danger">\n    {{ loginFormValidator.nombre.mensaje }}\n    </ion-label>\n  </ion-item>\n\n  <ion-item style="width:100%; margin-top: 10px; height: 60%; align-items: center;">\n    <ion-label style="color:#1b155c;" class="labelD">Fecha de nacimiento*</ion-label>\n    <ion-datetime displayFormat="DD/MM/YYYY" formControlName="nacimiento" style="background-color: #181560;" cancelText="Cancelar" doneText="Aceptar"\n       id="nacimiento"></ion-datetime>\n  </ion-item>\n  <ion-item *ngIf="loginFormValidator.nacimiento.mensaje">\n    <ion-label text-wrap color="danger">\n    {{ loginFormValidator.nacimiento.mensaje }}\n    </ion-label>\n  </ion-item>\n\n  <ion-label position="floating" style="color:#181560;">Usuario*</ion-label>\n  <ion-input formControlName="usu" style="color: #000;" autocapitalize="off" autocomplete="off" autocorrect="off" id="usu"></ion-input>\n  <ion-item *ngIf="loginFormValidator.usu.mensaje">\n    <ion-label text-wrap color="danger">\n    {{ loginFormValidator.usu.mensaje }}\n    </ion-label>\n  </ion-item>\n\n  <ion-label position="floating" style="color:#181560;">Teléfono*</ion-label>\n  <ion-input formControlName="tel" style="color: #000;" autocapitalize="off" autocomplete="off" autocorrect="off" id="tel"></ion-input>\n  <ion-item *ngIf="loginFormValidator.tel.mensaje">\n    <ion-label text-wrap color="danger">\n    {{ loginFormValidator.tel.mensaje }}\n    </ion-label>\n  </ion-item>\n\n  <ion-label position="floating" style="color:#181560;">Contraseña*</ion-label>\n  <ion-input formControlName="contra" type="password" style="color: #000;" autocapitalize="off" autocomplete="off" autocorrect="off" id="contra"></ion-input>\n  <ion-item *ngIf="loginFormValidator.contra.mensaje">\n    <ion-label text-wrap color="danger">\n    {{ loginFormValidator.contra.mensaje }}\n    </ion-label>\n  </ion-item>\n\n  <ion-label position="floating" style="color:#181560;">Confirmar Contraseña*</ion-label>\n  <ion-input formControlName="contraConfirma" type="password" style="color: #000;" autocapitalize="off" autocomplete="off" autocorrect="off" id="contraConfirma"></ion-input>\n  <ion-item *ngIf="loginFormValidator.contraConfirma.mensaje">\n    <ion-label text-wrap color="danger">\n    {{ loginFormValidator.contraConfirma.mensaje }}\n    </ion-label>\n  </ion-item>\n\n  <ion-label position="floating" style="color:#181560;">Correo electrónico*</ion-label>\n  <ion-input formControlName="email" type="email" style="color: #000;" autocapitalize="off" autocomplete="off" autocorrect="off" id="email"></ion-input>\n  <ion-item *ngIf="loginFormValidator.email.mensaje">\n    <ion-label text-wrap color="danger">\n    {{ loginFormValidator.email.mensaje }}\n    </ion-label>\n  </ion-item>\n\n  <ion-label position="floating" style="color:#181560;">Confirma tu correo*</ion-label>\n  <ion-input formControlName="emailConfirma" type="email" style="color: #000;" autocapitalize="off" autocomplete="off" autocorrect="off" id="emailConfirma"></ion-input>\n  <ion-item *ngIf="loginFormValidator.emailConfirma.mensaje">\n    <ion-label text-wrap color="danger">\n    {{ loginFormValidator.emailConfirma.mensaje }}\n    </ion-label>\n    </ion-item>\n  <!-- <div style="text-align:center;margin: 16px;font-size: 90%;font-style: italic;">\n    Al validar tus datos, enviaremos una clave\n    a tu correo electrónico para registrarte\n  </div> -->\n  <div style="text-align: -webkit-center;margin-top: 10px;" (click)="validar()">\n    <div style="background-color: #009245;\n    width: 29%;\n    color: #fff;\n    padding: 6px;\n    font-size: 135%;\n    border-radius: 5px;">Validar</div>\n  </div>\n  <br/>\n  <div style="text-align:center;margin: 16px;font-size: 1.3em;font-style: italic;color: #3e5167">\n    Completa tu registro y recibe 100 puntos amigo fiel de regalo\n  </div>\n</form>\n</ion-content>'/*ion-inline-end:"C:\Users\Administrador\kenergy\src\pages\registro-valida\registro-valida.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["m" /* NavParams */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* MenuController */],
            __WEBPACK_IMPORTED_MODULE_4__providers_alerta_service__["a" /* AlertaServiceProvider */],
            __WEBPACK_IMPORTED_MODULE_5__providers_rest_service__["a" /* RestServiceProvider */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* LoadingController */],
            __WEBPACK_IMPORTED_MODULE_6__ionic_storage__["b" /* Storage */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["b" /* AlertController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["c" /* Events */], __WEBPACK_IMPORTED_MODULE_10__ionic_native_sqlite__["a" /* SQLite */]])
    ], RegistroValidaPage);
    return RegistroValidaPage;
}());

//# sourceMappingURL=registro-valida.js.map

/***/ }),

/***/ 326:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return RegistroPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__home_home__ = __webpack_require__(65);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__providers_alerta_service__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__providers_rest_service__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__angular_common_http__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__ionic_storage__ = __webpack_require__(15);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};







var RegistroPage = /** @class */ (function () {
    function RegistroPage(navCtrl, navParams, menuCtrl, alertaService, restService, loadingCtrl, localStorage, events) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.menuCtrl = menuCtrl;
        this.alertaService = alertaService;
        this.restService = restService;
        this.loadingCtrl = loadingCtrl;
        this.localStorage = localStorage;
        this.events = events;
        this.clave = "";
        this.contrasenia = "";
        this.nuevaContrasenia = "";
        this.nombreCompleto = "";
        this.alias = "";
        this.email = "";
        this.menuCtrl.enable(false, "authenticated");
        this.email = navParams.get('email');
    }
    RegistroPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad RegistroPage');
    };
    RegistroPage.prototype.ingresar = function () {
        var _this = this;
        if (this.clave == undefined || this.nuevaContrasenia == undefined || this.alias == undefined || this.contrasenia == undefined || this.nombreCompleto == undefined ||
            this.clave == null || this.nuevaContrasenia == null || this.alias == null || this.contrasenia == null || this.nombreCompleto == null ||
            this.clave.length == 0 || this.nuevaContrasenia.length == 0 || this.alias.length == 0 || this.contrasenia.length == 0 || this.nombreCompleto.length == 0) {
            this.alertaService.warnAlert(this.restService.headerValidacion, "Favor de capturar todos los datos", null);
            return;
        }
        else if (this.nuevaContrasenia != this.contrasenia) {
            this.alertaService.warnAlert(this.restService.headerValidacion, "Las contraseñas ingresadas no coinciden, favor de verificar", null);
            return;
        }
        else {
            var loading_1 = this.loadingCtrl.create();
            loading_1.present();
            this.restService.getToken().timeout(this.restService.timeOver).subscribe(function (data) {
                if (data == null) {
                    loading_1.dismiss();
                    _this.alertaService.warnAlert(_this.restService.headerValidacion, _this.restService.mensajeValidacionAdmin, null);
                }
                else {
                    var body = new __WEBPACK_IMPORTED_MODULE_5__angular_common_http__["d" /* HttpParams */]();
                    var bodys = new __WEBPACK_IMPORTED_MODULE_5__angular_common_http__["d" /* HttpParams */]()
                        .set('Clave', _this.clave)
                        .set('Password', _this.nuevaContrasenia)
                        .set('Nombre', _this.nombreCompleto)
                        .set('Email', _this.email) //En el diseño no se pide correo
                        .set('Alias', _this.alias);
                    _this.restService.restServicePOSTTokenXForm("user/regular", bodys, data.toString()).timeout(_this.restService.timeOver).subscribe(function (dataRegistro) {
                        if (Object.keys(dataRegistro['Response']).length != 0) {
                            if (dataRegistro['Response'] == true) {
                                _this.localStorage.ready().then(function () {
                                    _this.localStorage.get("@userSession").then(function (data) {
                                        _this.localStorage.set("@userSession", dataRegistro['Response']);
                                        var dato = {
                                            valor: 1,
                                            user: dataRegistro['Response']
                                        };
                                        _this.events.publish('menu:changed', dato);
                                        _this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_2__home_home__["a" /* HomePage */], { usuario: dataRegistro['Response'] });
                                    });
                                });
                            }
                            else {
                                _this.alertaService.warnAlert(_this.restService.headerValidacion, "Correo sin asignación", null);
                            }
                        }
                        else {
                            _this.alertaService.warnAlert(_this.restService.headerValidacion, "Verifica tus datos, no se encontraron en el sistema", null);
                        }
                        loading_1.dismiss();
                    }, function (error) {
                        loading_1.dismiss();
                        console.log(error);
                        _this.alertaService.errorAlert(_this.restService.headerError, _this.restService.mensajeError, null);
                    });
                }
            }, function (error) {
                loading_1.dismiss();
                console.log(error);
                _this.alertaService.errorAlert(_this.restService.headerError, _this.restService.mensajeError, null);
            });
        }
    };
    RegistroPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-registro',template:/*ion-inline-start:"C:\Users\Administrador\kenergy\src\pages\registro\registro.html"*/'<ion-content class="animated fadeIn" padding style="\n    background-image: url(assets/imgs/fondo.jpg); \n    background-size: 100%;\n    background-position: bottom center;\n    background-repeat: no-repeat;\n    background-color: white;">\n  <div style="text-align:center" class="animated fadeInDown">\n    <img src="assets/imgs/registro/logoLetra2.png" alt="logo" class="logo logoMargen" style="margin-bottom: 13%;" />\n  </div>\n  <div style="font-size: 150%;margin-bottom: 5%;" class="tituloHeader">\n      Ingresa la clave y completa tu registro\n  </div>\n  <input placeholder="Ingresar clave recibida por correo* " class="inputText" [(ngModel)]="clave"/>\n  <input placeholder="Crea tu contraseña*" class="inputText" [(ngModel)]="contrasenia" />\n  <input placeholder="Confirma tu contraseña*" class="inputText" [(ngModel)]="nuevaContrasenia"/>\n  <input placeholder="Nombre completo*" class="inputText" [(ngModel)]="nombreCompleto"/>\n  <input placeholder="Alias*" class="inputText" style="margin-bottom:5%" [(ngModel)]="alias"/>\n  <div style="text-align: -webkit-center;">\n    <div style="background-color: #009245;\n    width: 29%;\n    color: #fff;\n    padding: 6px;\n    font-size: 135%;\n    border-radius: 5px;" (click)="ingresar()">Ingresar</div>\n  </div>\n</ion-content>'/*ion-inline-end:"C:\Users\Administrador\kenergy\src\pages\registro\registro.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["m" /* NavParams */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* MenuController */],
            __WEBPACK_IMPORTED_MODULE_3__providers_alerta_service__["a" /* AlertaServiceProvider */],
            __WEBPACK_IMPORTED_MODULE_4__providers_rest_service__["a" /* RestServiceProvider */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* LoadingController */],
            __WEBPACK_IMPORTED_MODULE_6__ionic_storage__["b" /* Storage */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["c" /* Events */]])
    ], RegistroPage);
    return RegistroPage;
}());

//# sourceMappingURL=registro.js.map

/***/ }),

/***/ 327:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return RecuperarContraPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_forms__ = __webpack_require__(20);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_validator__ = __webpack_require__(52);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_validator___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_validator__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__ionic_native_sqlite__ = __webpack_require__(43);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__ionic_storage__ = __webpack_require__(15);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__login_login__ = __webpack_require__(81);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__providers_alerta_service__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__providers_rest_service__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__angular_common_http__ = __webpack_require__(9);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};










/**
 * Generated class for the RecuperarContraPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var RecuperarContraPage = /** @class */ (function () {
    function RecuperarContraPage(navCtrl, navParams, viewCtrl, sqlite, menuCtrl, localStorage, alertaService, restService) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.viewCtrl = viewCtrl;
        this.sqlite = sqlite;
        this.menuCtrl = menuCtrl;
        this.localStorage = localStorage;
        this.alertaService = alertaService;
        this.restService = restService;
        this.loginForm = new __WEBPACK_IMPORTED_MODULE_2__angular_forms__["b" /* FormGroup */]({
            email: new __WEBPACK_IMPORTED_MODULE_2__angular_forms__["a" /* FormControl */](''),
            emailc: new __WEBPACK_IMPORTED_MODULE_2__angular_forms__["a" /* FormControl */]('')
        });
        this.loginFormValidator = {
            email: {
                mensaje: ''
            },
            emailc: {
                mensaje: ''
            }
        };
        this.loginForm2 = new __WEBPACK_IMPORTED_MODULE_2__angular_forms__["b" /* FormGroup */]({
            editado: new __WEBPACK_IMPORTED_MODULE_2__angular_forms__["a" /* FormControl */](0)
        });
    }
    RecuperarContraPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad RecuperarContraPage');
    };
    RecuperarContraPage.prototype.ionViewDidEnter = function () {
        this.onValueChanges();
    };
    RecuperarContraPage.prototype.ionViewCanLeave = function () {
        var _this = this;
        return new Promise(function (resolve, reject) {
            if (_this.loginForm2.value.editado == 0)
                resolve();
            else
                _this.alertaService.alertaConfirmacion("Confirmar", "¿Desea salir sin guardar los cambios realizados?", resolve, reject);
        });
    };
    RecuperarContraPage.prototype.enviarCorreo = function () {
        var _this = this;
        if (this.formValidator()) {
            this.restService.getToken().timeout(this.restService.timeOver).subscribe(function (data) {
                var bodys = new __WEBPACK_IMPORTED_MODULE_9__angular_common_http__["d" /* HttpParams */]();
                _this.restService.restServicePUTToken("user/pass/cambio/" + _this.loginForm.value.email, bodys, data.toString()).timeout(_this.restService.timeOver).subscribe(function (dataRegistro) {
                    if (dataRegistro['Response'] == true) {
                        _this.loginForm2.patchValue({
                            editado: 0
                        });
                        _this.alertaService.alertaBasica("Cambio de contraseña", "Se ha enviado al correo " + _this.loginForm.value.email + " un enlace para realizar el cambio de contraseña", _this.close());
                    }
                    else {
                        if (dataRegistro['Message'] == 3)
                            _this.alertaService.warnAlert("¡Atención!", "El E-mail capturado no se encuentra registrado.", null);
                        if (dataRegistro['Message'] == 6)
                            _this.alertaService.alertaBasica("RECUPERA TU CONTRASEÑA", "Comunícate con tu ejecutivo de ventas al <a href='tel:2727280112'>272 728 0112</a> o al e-mail <a href='mailto:registro@kenergyfuel.com'>registro@kenergyfuel.com</a>", null);
                    }
                }, function (error) {
                    console.log(error);
                    _this.alertaService.errorAlert(_this.restService.headerError, _this.restService.mensajeError, null);
                });
            }, function (error) {
                console.log(error);
                _this.alertaService.errorAlert(_this.restService.headerError, _this.restService.mensajeError, null);
            });
        }
    };
    RecuperarContraPage.prototype.formValidator = function () {
        if (__WEBPACK_IMPORTED_MODULE_3_validator___default.a.isEmpty(this.loginForm.value.email)) {
            this.loginFormValidator.email.mensaje = 'Es necesario capturar tu E-mail';
            this.cambiarDiseñoInput("email", 1);
            return false;
        }
        else {
            this.loginFormValidator.email.mensaje = '';
            this.cambiarDiseñoInput("email");
        }
        if (!__WEBPACK_IMPORTED_MODULE_3_validator___default.a.isEmail(this.loginForm.value.email)) {
            this.loginFormValidator.email.mensaje = 'Ingrese una dirección de correo válida';
            this.cambiarDiseñoInput("email", 1);
            return false;
        }
        else {
            this.loginFormValidator.email.mensaje = '';
            this.cambiarDiseñoInput("email");
        }
        if (__WEBPACK_IMPORTED_MODULE_3_validator___default.a.isEmpty(this.loginForm.value.emailc)) {
            this.loginFormValidator.emailc.mensaje = 'Es necesario confirmar el E-mail';
            this.cambiarDiseñoInput("emailc", 1);
            return false;
        }
        else {
            this.loginFormValidator.emailc.mensaje = '';
            this.cambiarDiseñoInput("emailc");
        }
        if (!__WEBPACK_IMPORTED_MODULE_3_validator___default.a.isEmail(this.loginForm.value.emailc)) {
            this.loginFormValidator.emailc.mensaje = 'Ingrese una dirección de correo válida';
            this.cambiarDiseñoInput("emailc", 1);
            return false;
        }
        else {
            this.loginFormValidator.emailc.mensaje = '';
            this.cambiarDiseñoInput("emailc");
        }
        if (this.loginForm.value.email != this.loginForm.value.emailc) {
            this.loginFormValidator.emailc.mensaje = 'La confirmación de E-mail no coincide';
            this.cambiarDiseñoInput("emailc", 1);
            return false;
        }
        else {
            this.loginFormValidator.emailc.mensaje = '';
            this.cambiarDiseñoInput("emailc");
        }
        return true;
    };
    RecuperarContraPage.prototype.cambiarDiseñoInput = function (id, color) {
        if (color === void 0) { color = 0; }
        var strColor = color == 1 ? "red" : "white";
        document.getElementById(id).style.backgroundColor = strColor;
    };
    RecuperarContraPage.prototype.onValueChanges = function () {
        var _this = this;
        this.loginForm.valueChanges.subscribe(function (val) {
            _this.loginForm2.patchValue({
                editado: _this.loginForm2.value.editado + 1
            });
        });
    };
    RecuperarContraPage.prototype.dismiss = function () {
        this.viewCtrl.dismiss();
    };
    RecuperarContraPage.prototype.close = function () {
        var _this = this;
        this.localStorage.ready().then(function () {
            var sqlDelete = "DELETE FROM usuario";
            _this.sqlite.create({
                name: 'kenergy.db',
                location: 'default'
            }).then(function (db) {
                db.executeSql(sqlDelete, [])
                    .then(function (response) {
                    _this.localStorage.set("@isSessionActive", 0);
                    _this.menuCtrl.close();
                    _this.menuCtrl.enable(false, "authenticated");
                    _this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_6__login_login__["a" /* LoginPage */]);
                })
                    .catch(function (error) { return _this.alertaService.errorAlert("Error al borrar usuario", error, null); });
            })
                .catch(function (error) {
                _this.alertaService.errorAlert("Info", "Excepcion al crear BD " + error, null);
            });
        }, function (error) {
            console.log(error); //En modo debug visualizar error completo
            _this.alertaService.errorAlert(_this.restService.headerError, error.message, null);
        });
    };
    RecuperarContraPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-recuperar-contra',template:/*ion-inline-start:"C:\Users\Administrador\kenergy\src\pages\recuperar-contra\recuperar-contra.html"*/'<ion-header>\n  <ion-navbar color="titulo">\n    <button ion-button menuToggle>\n      <ion-icon name="menu"></ion-icon>\n    </button>\n    \n    <ion-title class="tituloHeader" style="position: absolute;left: 25%; top: 33%;">Recuperar contraseña</ion-title>\n\n    <ion-buttons left  class="animated fadeIn">\n      <button icon-only="" ion-button="" class="disable-hover bar-button bar-button-ios bar-button-default bar-button-default-ios">\n        <span class="button-inner">\n          <img src="assets/imgs/misDatos/usuario.png" style="width: 65%;margin-left: -27px;">\n        </span>\n        <div class="button-effect">\n\n        </div>\n      </button>\n    </ion-buttons>\n  </ion-navbar>\n</ion-header>\n\n<ion-content padding style="\nbackground-image: url(assets/imgs/fondo.jpg); \nbackground-size: 100%;\nbackground-position: center center;">\n  <form [formGroup]="loginForm">\n    <ion-label style="color:#1b155c;">Teclea tu E-mail*</ion-label>\n    <ion-input formControlName="email" type="email" style="color: #000;" id="email"></ion-input>\n  <ion-item *ngIf="loginFormValidator.email.mensaje">\n    <ion-label text-wrap color="danger">\n    {{ loginFormValidator.email.mensaje }}\n    </ion-label>\n  </ion-item>\n    <ion-label style="color:#1b155c;">Confirma tu E-mail*</ion-label>\n    <ion-input formControlName="emailc" type="email" style="color: #000;" id="emailc"></ion-input>\n  <ion-item *ngIf="loginFormValidator.emailc.mensaje">\n    <ion-label text-wrap color="danger">\n    {{ loginFormValidator.emailc.mensaje }}\n    </ion-label>\n  </ion-item>\n  <div class="centro animated fadeIn">\n    <div style="display: inline-block;width: 44%" class="animated fadeIn">\n      <button ion-button color="naranja" class="tituloHeader botonGuardar" (click)="enviarCorreo()">Aceptar</button>\n    </div>\n  </div>\n</form>\n</ion-content>'/*ion-inline-end:"C:\Users\Administrador\kenergy\src\pages\recuperar-contra\recuperar-contra.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["m" /* NavParams */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["p" /* ViewController */],
            __WEBPACK_IMPORTED_MODULE_4__ionic_native_sqlite__["a" /* SQLite */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* MenuController */], __WEBPACK_IMPORTED_MODULE_5__ionic_storage__["b" /* Storage */],
            __WEBPACK_IMPORTED_MODULE_7__providers_alerta_service__["a" /* AlertaServiceProvider */], __WEBPACK_IMPORTED_MODULE_8__providers_rest_service__["a" /* RestServiceProvider */]])
    ], RecuperarContraPage);
    return RecuperarContraPage;
}());

//# sourceMappingURL=recuperar-contra.js.map

/***/ }),

/***/ 328:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AvisoPrivacidadPageModule", function() { return AvisoPrivacidadPageModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__aviso_privacidad__ = __webpack_require__(157);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};



var AvisoPrivacidadPageModule = /** @class */ (function () {
    function AvisoPrivacidadPageModule() {
    }
    AvisoPrivacidadPageModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["I" /* NgModule */])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_2__aviso_privacidad__["a" /* AvisoPrivacidadPage */],
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* IonicPageModule */].forChild(__WEBPACK_IMPORTED_MODULE_2__aviso_privacidad__["a" /* AvisoPrivacidadPage */]),
            ],
        })
    ], AvisoPrivacidadPageModule);
    return AvisoPrivacidadPageModule;
}());

//# sourceMappingURL=aviso-privacidad.module.js.map

/***/ }),

/***/ 329:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CambiarEmailPageModule", function() { return CambiarEmailPageModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__cambiar_email__ = __webpack_require__(303);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};



var CambiarEmailPageModule = /** @class */ (function () {
    function CambiarEmailPageModule() {
    }
    CambiarEmailPageModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["I" /* NgModule */])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_2__cambiar_email__["a" /* CambiarEmailPage */],
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* IonicPageModule */].forChild(__WEBPACK_IMPORTED_MODULE_2__cambiar_email__["a" /* CambiarEmailPage */]),
            ],
        })
    ], CambiarEmailPageModule);
    return CambiarEmailPageModule;
}());

//# sourceMappingURL=cambiar-email.module.js.map

/***/ }),

/***/ 330:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CargasCreditoPageModule", function() { return CargasCreditoPageModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__cargas_credito__ = __webpack_require__(318);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};



var CargasCreditoPageModule = /** @class */ (function () {
    function CargasCreditoPageModule() {
    }
    CargasCreditoPageModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["I" /* NgModule */])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_2__cargas_credito__["a" /* CargasCreditoPage */],
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* IonicPageModule */].forChild(__WEBPACK_IMPORTED_MODULE_2__cargas_credito__["a" /* CargasCreditoPage */]),
            ],
        })
    ], CargasCreditoPageModule);
    return CargasCreditoPageModule;
}());

//# sourceMappingURL=cargas-credito.module.js.map

/***/ }),

/***/ 331:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CargasInfoPageModule", function() { return CargasInfoPageModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__cargas_info__ = __webpack_require__(302);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};



var CargasInfoPageModule = /** @class */ (function () {
    function CargasInfoPageModule() {
    }
    CargasInfoPageModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["I" /* NgModule */])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_2__cargas_info__["a" /* CargasInfoPage */],
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* IonicPageModule */].forChild(__WEBPACK_IMPORTED_MODULE_2__cargas_info__["a" /* CargasInfoPage */]),
            ],
        })
    ], CargasInfoPageModule);
    return CargasInfoPageModule;
}());

//# sourceMappingURL=cargas-info.module.js.map

/***/ }),

/***/ 332:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CargasInfoCreditoPageModule", function() { return CargasInfoCreditoPageModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__cargas_info_credito__ = __webpack_require__(319);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};



var CargasInfoCreditoPageModule = /** @class */ (function () {
    function CargasInfoCreditoPageModule() {
    }
    CargasInfoCreditoPageModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["I" /* NgModule */])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_2__cargas_info_credito__["a" /* CargasInfoCreditoPage */],
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* IonicPageModule */].forChild(__WEBPACK_IMPORTED_MODULE_2__cargas_info_credito__["a" /* CargasInfoCreditoPage */]),
            ],
        })
    ], CargasInfoCreditoPageModule);
    return CargasInfoCreditoPageModule;
}());

//# sourceMappingURL=cargas-info-credito.module.js.map

/***/ }),

/***/ 333:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CargasPageModule", function() { return CargasPageModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__cargas__ = __webpack_require__(301);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};



var CargasPageModule = /** @class */ (function () {
    function CargasPageModule() {
    }
    CargasPageModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["I" /* NgModule */])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_2__cargas__["a" /* CargasPage */],
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* IonicPageModule */].forChild(__WEBPACK_IMPORTED_MODULE_2__cargas__["a" /* CargasPage */]),
            ],
        })
    ], CargasPageModule);
    return CargasPageModule;
}());

//# sourceMappingURL=cargas.module.js.map

/***/ }),

/***/ 334:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CargasListPageModule", function() { return CargasListPageModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__cargas_list__ = __webpack_require__(158);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};



var CargasListPageModule = /** @class */ (function () {
    function CargasListPageModule() {
    }
    CargasListPageModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["I" /* NgModule */])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_2__cargas_list__["a" /* CargasListPage */],
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* IonicPageModule */].forChild(__WEBPACK_IMPORTED_MODULE_2__cargas_list__["a" /* CargasListPage */]),
            ],
        })
    ], CargasListPageModule);
    return CargasListPageModule;
}());

//# sourceMappingURL=cargas-list.module.js.map

/***/ }),

/***/ 335:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ContactoPageModule", function() { return ContactoPageModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__contacto__ = __webpack_require__(295);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};



var ContactoPageModule = /** @class */ (function () {
    function ContactoPageModule() {
    }
    ContactoPageModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["I" /* NgModule */])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_2__contacto__["a" /* ContactoPage */],
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* IonicPageModule */].forChild(__WEBPACK_IMPORTED_MODULE_2__contacto__["a" /* ContactoPage */]),
            ],
        })
    ], ContactoPageModule);
    return ContactoPageModule;
}());

//# sourceMappingURL=contacto.module.js.map

/***/ }),

/***/ 336:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ConsultaPuntosPageModule", function() { return ConsultaPuntosPageModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__consulta_puntos__ = __webpack_require__(674);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};



var ConsultaPuntosPageModule = /** @class */ (function () {
    function ConsultaPuntosPageModule() {
    }
    ConsultaPuntosPageModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["I" /* NgModule */])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_2__consulta_puntos__["a" /* ConsultaPuntosPage */],
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* IonicPageModule */].forChild(__WEBPACK_IMPORTED_MODULE_2__consulta_puntos__["a" /* ConsultaPuntosPage */]),
            ],
        })
    ], ConsultaPuntosPageModule);
    return ConsultaPuntosPageModule;
}());

//# sourceMappingURL=consulta-puntos.module.js.map

/***/ }),

/***/ 337:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DatosFacturacionPageModule", function() { return DatosFacturacionPageModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__datos_facturacion__ = __webpack_require__(159);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_forms__ = __webpack_require__(20);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};




var DatosFacturacionPageModule = /** @class */ (function () {
    function DatosFacturacionPageModule() {
    }
    DatosFacturacionPageModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["I" /* NgModule */])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_2__datos_facturacion__["a" /* DatosFacturacionPage */],
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_3__angular_forms__["f" /* ReactiveFormsModule */],
                __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* IonicPageModule */].forChild(__WEBPACK_IMPORTED_MODULE_2__datos_facturacion__["a" /* DatosFacturacionPage */]),
            ],
        })
    ], DatosFacturacionPageModule);
    return DatosFacturacionPageModule;
}());

//# sourceMappingURL=datos-facturacion.module.js.map

/***/ }),

/***/ 338:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "EstacionesPageModule", function() { return EstacionesPageModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__estaciones__ = __webpack_require__(304);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__agm_core__ = __webpack_require__(339);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_agm_direction__ = __webpack_require__(679);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};





var EstacionesPageModule = /** @class */ (function () {
    function EstacionesPageModule() {
    }
    EstacionesPageModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["I" /* NgModule */])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_2__estaciones__["a" /* EstacionesPage */],
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* IonicPageModule */].forChild(__WEBPACK_IMPORTED_MODULE_2__estaciones__["a" /* EstacionesPage */]),
                __WEBPACK_IMPORTED_MODULE_3__agm_core__["a" /* AgmCoreModule */].forRoot({
                    apiKey: 'AIzaSyAkw9aCrnsbUgVgca-ZRxDQDuEIzkcQUas'
                }),
                __WEBPACK_IMPORTED_MODULE_4_agm_direction__["a" /* AgmDirectionModule */]
            ],
        })
    ], EstacionesPageModule);
    return EstacionesPageModule;
}());

//# sourceMappingURL=estaciones.module.js.map

/***/ }),

/***/ 352:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "EstadisticasCreditoPageModule", function() { return EstadisticasCreditoPageModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__estadisticas_credito__ = __webpack_require__(316);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};



var EstadisticasCreditoPageModule = /** @class */ (function () {
    function EstadisticasCreditoPageModule() {
    }
    EstadisticasCreditoPageModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["I" /* NgModule */])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_2__estadisticas_credito__["a" /* EstadisticasCreditoPage */],
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* IonicPageModule */].forChild(__WEBPACK_IMPORTED_MODULE_2__estadisticas_credito__["a" /* EstadisticasCreditoPage */]),
            ],
        })
    ], EstadisticasCreditoPageModule);
    return EstadisticasCreditoPageModule;
}());

//# sourceMappingURL=estadisticas-credito.module.js.map

/***/ }),

/***/ 353:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "EstadisticasPageModule", function() { return EstadisticasPageModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__estadisticas__ = __webpack_require__(320);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};



var EstadisticasPageModule = /** @class */ (function () {
    function EstadisticasPageModule() {
    }
    EstadisticasPageModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["I" /* NgModule */])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_2__estadisticas__["a" /* EstadisticasPage */],
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* IonicPageModule */].forChild(__WEBPACK_IMPORTED_MODULE_2__estadisticas__["a" /* EstadisticasPage */])
            ],
        })
    ], EstadisticasPageModule);
    return EstadisticasPageModule;
}());

//# sourceMappingURL=estadisticas.module.js.map

/***/ }),

/***/ 354:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "EstadoCuentaPageModule", function() { return EstadoCuentaPageModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__estado_cuenta__ = __webpack_require__(312);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};



var EstadoCuentaPageModule = /** @class */ (function () {
    function EstadoCuentaPageModule() {
    }
    EstadoCuentaPageModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["I" /* NgModule */])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_2__estado_cuenta__["a" /* EstadoCuentaPage */],
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* IonicPageModule */].forChild(__WEBPACK_IMPORTED_MODULE_2__estado_cuenta__["a" /* EstadoCuentaPage */]),
            ],
        })
    ], EstadoCuentaPageModule);
    return EstadoCuentaPageModule;
}());

//# sourceMappingURL=estado-cuenta.module.js.map

/***/ }),

/***/ 355:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FacturacionCreditoPageModule", function() { return FacturacionCreditoPageModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__facturacion_credito__ = __webpack_require__(315);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};



var FacturacionCreditoPageModule = /** @class */ (function () {
    function FacturacionCreditoPageModule() {
    }
    FacturacionCreditoPageModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["I" /* NgModule */])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_2__facturacion_credito__["a" /* FacturacionCreditoPage */],
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* IonicPageModule */].forChild(__WEBPACK_IMPORTED_MODULE_2__facturacion_credito__["a" /* FacturacionCreditoPage */]),
            ],
        })
    ], FacturacionCreditoPageModule);
    return FacturacionCreditoPageModule;
}());

//# sourceMappingURL=facturacion-credito.module.js.map

/***/ }),

/***/ 356:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FacturacionPageModule", function() { return FacturacionPageModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__facturacion__ = __webpack_require__(300);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};



var FacturacionPageModule = /** @class */ (function () {
    function FacturacionPageModule() {
    }
    FacturacionPageModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["I" /* NgModule */])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_2__facturacion__["a" /* FacturacionPage */],
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* IonicPageModule */].forChild(__WEBPACK_IMPORTED_MODULE_2__facturacion__["a" /* FacturacionPage */]),
            ],
        })
    ], FacturacionPageModule);
    return FacturacionPageModule;
}());

//# sourceMappingURL=facturacion.module.js.map

/***/ }),

/***/ 357:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "HomeEstacionesListPageModule", function() { return HomeEstacionesListPageModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__home_estaciones_list__ = __webpack_require__(163);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};



var HomeEstacionesListPageModule = /** @class */ (function () {
    function HomeEstacionesListPageModule() {
    }
    HomeEstacionesListPageModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["I" /* NgModule */])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_2__home_estaciones_list__["a" /* HomeEstacionesListPage */],
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* IonicPageModule */].forChild(__WEBPACK_IMPORTED_MODULE_2__home_estaciones_list__["a" /* HomeEstacionesListPage */]),
            ],
        })
    ], HomeEstacionesListPageModule);
    return HomeEstacionesListPageModule;
}());

//# sourceMappingURL=home-estaciones-list.module.js.map

/***/ }),

/***/ 358:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "HomeCreditoPageModule", function() { return HomeCreditoPageModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__home_credito__ = __webpack_require__(84);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};



var HomeCreditoPageModule = /** @class */ (function () {
    function HomeCreditoPageModule() {
    }
    HomeCreditoPageModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["I" /* NgModule */])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_2__home_credito__["a" /* HomeCreditoPage */],
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* IonicPageModule */].forChild(__WEBPACK_IMPORTED_MODULE_2__home_credito__["a" /* HomeCreditoPage */]),
            ],
        })
    ], HomeCreditoPageModule);
    return HomeCreditoPageModule;
}());

//# sourceMappingURL=home-credito.module.js.map

/***/ }),

/***/ 359:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "HomePageModule", function() { return HomePageModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__home__ = __webpack_require__(65);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};



var HomePageModule = /** @class */ (function () {
    function HomePageModule() {
    }
    HomePageModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["I" /* NgModule */])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_2__home__["a" /* HomePage */],
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* IonicPageModule */].forChild(__WEBPACK_IMPORTED_MODULE_2__home__["a" /* HomePage */]),
            ],
        })
    ], HomePageModule);
    return HomePageModule;
}());

//# sourceMappingURL=home.module.js.map

/***/ }),

/***/ 360:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "LoginPageModule", function() { return LoginPageModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__login__ = __webpack_require__(81);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};



var LoginPageModule = /** @class */ (function () {
    function LoginPageModule() {
    }
    LoginPageModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["I" /* NgModule */])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_2__login__["a" /* LoginPage */],
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* IonicPageModule */].forChild(__WEBPACK_IMPORTED_MODULE_2__login__["a" /* LoginPage */])
            ],
        })
    ], LoginPageModule);
    return LoginPageModule;
}());

//# sourceMappingURL=login.module.js.map

/***/ }),

/***/ 361:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MiAutoInfoPageModule", function() { return MiAutoInfoPageModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__mi_auto_info__ = __webpack_require__(307);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};



var MiAutoInfoPageModule = /** @class */ (function () {
    function MiAutoInfoPageModule() {
    }
    MiAutoInfoPageModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["I" /* NgModule */])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_2__mi_auto_info__["a" /* MiAutoInfoPage */],
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* IonicPageModule */].forChild(__WEBPACK_IMPORTED_MODULE_2__mi_auto_info__["a" /* MiAutoInfoPage */]),
            ],
        })
    ], MiAutoInfoPageModule);
    return MiAutoInfoPageModule;
}());

//# sourceMappingURL=mi-auto-info.module.js.map

/***/ }),

/***/ 362:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MiAutoPageModule", function() { return MiAutoPageModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__mi_auto__ = __webpack_require__(321);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_angularx_qrcode__ = __webpack_require__(680);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};




var MiAutoPageModule = /** @class */ (function () {
    function MiAutoPageModule() {
    }
    MiAutoPageModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["I" /* NgModule */])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_2__mi_auto__["a" /* MiAutoPage */],
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* IonicPageModule */].forChild(__WEBPACK_IMPORTED_MODULE_2__mi_auto__["a" /* MiAutoPage */]),
                __WEBPACK_IMPORTED_MODULE_3_angularx_qrcode__["a" /* QRCodeModule */]
            ],
        })
    ], MiAutoPageModule);
    return MiAutoPageModule;
}());

//# sourceMappingURL=mi-auto.module.js.map

/***/ }),

/***/ 364:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MisAutosPageModule", function() { return MisAutosPageModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__mis_autos__ = __webpack_require__(308);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};



var MisAutosPageModule = /** @class */ (function () {
    function MisAutosPageModule() {
    }
    MisAutosPageModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["I" /* NgModule */])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_2__mis_autos__["a" /* MisAutosPage */],
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* IonicPageModule */].forChild(__WEBPACK_IMPORTED_MODULE_2__mis_autos__["a" /* MisAutosPage */]),
            ],
        })
    ], MisAutosPageModule);
    return MisAutosPageModule;
}());

//# sourceMappingURL=mis-autos.module.js.map

/***/ }),

/***/ 365:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MisDatosCreditoPageModule", function() { return MisDatosCreditoPageModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__mis_datos_credito__ = __webpack_require__(311);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};



var MisDatosCreditoPageModule = /** @class */ (function () {
    function MisDatosCreditoPageModule() {
    }
    MisDatosCreditoPageModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["I" /* NgModule */])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_2__mis_datos_credito__["a" /* MisDatosCreditoPage */],
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* IonicPageModule */].forChild(__WEBPACK_IMPORTED_MODULE_2__mis_datos_credito__["a" /* MisDatosCreditoPage */])
            ],
        })
    ], MisDatosCreditoPageModule);
    return MisDatosCreditoPageModule;
}());

//# sourceMappingURL=mis-datos-credito.module.js.map

/***/ }),

/***/ 366:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MisDatosPageModule", function() { return MisDatosPageModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__mis_datos__ = __webpack_require__(160);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};



var MisDatosPageModule = /** @class */ (function () {
    function MisDatosPageModule() {
    }
    MisDatosPageModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["I" /* NgModule */])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_2__mis_datos__["a" /* MisDatosPage */],
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* IonicPageModule */].forChild(__WEBPACK_IMPORTED_MODULE_2__mis_datos__["a" /* MisDatosPage */]),
            ],
        })
    ], MisDatosPageModule);
    return MisDatosPageModule;
}());

//# sourceMappingURL=mis-datos.module.js.map

/***/ }),

/***/ 367:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "NotificacionesPageModule", function() { return NotificacionesPageModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__notificaciones__ = __webpack_require__(291);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};



var NotificacionesPageModule = /** @class */ (function () {
    function NotificacionesPageModule() {
    }
    NotificacionesPageModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["I" /* NgModule */])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_2__notificaciones__["a" /* NotificacionesPage */],
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* IonicPageModule */].forChild(__WEBPACK_IMPORTED_MODULE_2__notificaciones__["a" /* NotificacionesPage */]),
            ],
        })
    ], NotificacionesPageModule);
    return NotificacionesPageModule;
}());

//# sourceMappingURL=notificaciones.module.js.map

/***/ }),

/***/ 368:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PremiosSolicitudPageModule", function() { return PremiosSolicitudPageModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__premios_solicitud__ = __webpack_require__(685);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};



var PremiosSolicitudPageModule = /** @class */ (function () {
    function PremiosSolicitudPageModule() {
    }
    PremiosSolicitudPageModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["I" /* NgModule */])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_2__premios_solicitud__["a" /* PremiosSolicitudPage */],
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* IonicPageModule */].forChild(__WEBPACK_IMPORTED_MODULE_2__premios_solicitud__["a" /* PremiosSolicitudPage */]),
            ],
        })
    ], PremiosSolicitudPageModule);
    return PremiosSolicitudPageModule;
}());

//# sourceMappingURL=premios-solicitud.module.js.map

/***/ }),

/***/ 369:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PremiosPageModule", function() { return PremiosPageModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__premios__ = __webpack_require__(297);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};



var PremiosPageModule = /** @class */ (function () {
    function PremiosPageModule() {
    }
    PremiosPageModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["I" /* NgModule */])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_2__premios__["a" /* PremiosPage */],
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* IonicPageModule */].forChild(__WEBPACK_IMPORTED_MODULE_2__premios__["a" /* PremiosPage */]),
            ],
        })
    ], PremiosPageModule);
    return PremiosPageModule;
}());

//# sourceMappingURL=premios.module.js.map

/***/ }),

/***/ 370:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PromocionesPageModule", function() { return PromocionesPageModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__promociones__ = __webpack_require__(298);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};



var PromocionesPageModule = /** @class */ (function () {
    function PromocionesPageModule() {
    }
    PromocionesPageModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["I" /* NgModule */])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_2__promociones__["a" /* PromocionesPage */],
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* IonicPageModule */].forChild(__WEBPACK_IMPORTED_MODULE_2__promociones__["a" /* PromocionesPage */]),
            ],
        })
    ], PromocionesPageModule);
    return PromocionesPageModule;
}());

//# sourceMappingURL=promociones.module.js.map

/***/ }),

/***/ 371:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "EstacionesListPageModule", function() { return EstacionesListPageModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__estaciones_list__ = __webpack_require__(305);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};



var EstacionesListPageModule = /** @class */ (function () {
    function EstacionesListPageModule() {
    }
    EstacionesListPageModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["I" /* NgModule */])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_2__estaciones_list__["a" /* EstacionesListPage */],
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* IonicPageModule */].forChild(__WEBPACK_IMPORTED_MODULE_2__estaciones_list__["a" /* EstacionesListPage */]),
            ],
        })
    ], EstacionesListPageModule);
    return EstacionesListPageModule;
}());

//# sourceMappingURL=estaciones-list.module.js.map

/***/ }),

/***/ 372:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "RecuperarContraPageModule", function() { return RecuperarContraPageModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__recuperar_contra__ = __webpack_require__(327);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};



var RecuperarContraPageModule = /** @class */ (function () {
    function RecuperarContraPageModule() {
    }
    RecuperarContraPageModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["I" /* NgModule */])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_2__recuperar_contra__["a" /* RecuperarContraPage */],
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* IonicPageModule */].forChild(__WEBPACK_IMPORTED_MODULE_2__recuperar_contra__["a" /* RecuperarContraPage */]),
            ],
        })
    ], RecuperarContraPageModule);
    return RecuperarContraPageModule;
}());

//# sourceMappingURL=recuperar-contra.module.js.map

/***/ }),

/***/ 373:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "RegistroCreditoPageModule", function() { return RegistroCreditoPageModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__registro_credito__ = __webpack_require__(374);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};



var RegistroCreditoPageModule = /** @class */ (function () {
    function RegistroCreditoPageModule() {
    }
    RegistroCreditoPageModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["I" /* NgModule */])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_2__registro_credito__["a" /* RegistroCreditoPage */],
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* IonicPageModule */].forChild(__WEBPACK_IMPORTED_MODULE_2__registro_credito__["a" /* RegistroCreditoPage */]),
            ],
        })
    ], RegistroCreditoPageModule);
    return RegistroCreditoPageModule;
}());

//# sourceMappingURL=registro-credito.module.js.map

/***/ }),

/***/ 374:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return RegistroCreditoPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__home_credito_home_credito__ = __webpack_require__(84);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__providers_rest_service__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__providers_alerta_service__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__angular_common_http__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__ionic_storage__ = __webpack_require__(15);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};







var RegistroCreditoPage = /** @class */ (function () {
    function RegistroCreditoPage(navCtrl, navParams, menuCtrl, localStorage, events, restService, loadingCtrl, alertaService) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.menuCtrl = menuCtrl;
        this.localStorage = localStorage;
        this.events = events;
        this.restService = restService;
        this.loadingCtrl = loadingCtrl;
        this.alertaService = alertaService;
        this.clave = null;
        this.nuevaContrasenia = null;
        this.nuevaContraseniaConfirm = null;
        this.nombre = null;
        this.alias = null;
        this.celular = null;
        this.menuCtrl.enable(false, "authenticated");
    }
    RegistroCreditoPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad RegistroCreditoPage');
    };
    RegistroCreditoPage.prototype.irHomeCredito = function () {
        var _this = this;
        if (this.clave == undefined || this.nuevaContrasenia == undefined || this.alias == undefined || this.celular == undefined || this.nombre == undefined ||
            this.clave == null || this.nuevaContrasenia == null || this.alias == null || this.celular == null || this.nombre == null ||
            this.clave.length == 0 || this.nuevaContrasenia.length == 0 || this.alias.length == 0 || this.celular.length == 0 || this.nombre.length == 0) {
            this.alertaService.warnAlert(this.restService.headerValidacion, "Favor de capturar todos los datos", null);
            return;
        }
        else if (this.nuevaContrasenia != this.nuevaContraseniaConfirm) {
            this.alertaService.warnAlert(this.restService.headerValidacion, "Los correos ingresados no coinciden", null);
            return;
        }
        else {
            var loading_1 = this.loadingCtrl.create();
            loading_1.present();
            this.restService.getToken().timeout(this.restService.timeOver).subscribe(function (data) {
                if (data == null) {
                    loading_1.dismiss();
                    _this.alertaService.warnAlert(_this.restService.headerValidacion, _this.restService.mensajeValidacionAdmin, null);
                }
                else {
                    var body = new __WEBPACK_IMPORTED_MODULE_5__angular_common_http__["d" /* HttpParams */]();
                    /**
                     * String:Clave(Requerido)
          String:Password:50 (Requerido)
          String:Nombre :255(Requerido)
          String:Email:250(Requerido)
          String:Alias:50(Requerido)
          Int:IdClient
          
                     */
                    //Definir bien cual es el ultimo template
                    body.append("Clave", _this.clave);
                    body.append("Password", _this.nuevaContrasenia);
                    body.append("Nombre", _this.nombre);
                    body.append("Email", _this.celular);
                    body.append("Alias", _this.clave);
                    var bodys = new __WEBPACK_IMPORTED_MODULE_5__angular_common_http__["d" /* HttpParams */]()
                        .set('Clave', _this.clave)
                        .set('Password', _this.nuevaContrasenia)
                        .set('Nombre', _this.nombre)
                        .set('Email', _this.celular)
                        .set('Alias', _this.clave);
                    _this.restService.restServicePOSTTokenXForm("user/email", bodys, data.toString()).timeout(_this.restService.timeOver).subscribe(function (dataRegistro) {
                        if (Object.keys(dataRegistro['Response']).length != 0) {
                            if (dataRegistro['Response'] == true) {
                                _this.localStorage.ready().then(function () {
                                    _this.localStorage.get("@userSession").then(function (data) {
                                        _this.localStorage.set("@userSession", dataRegistro['Response']);
                                        var dato = {
                                            valor: 2,
                                            user: dataRegistro['Response']
                                        };
                                        _this.events.publish('menu:changed', dato);
                                        _this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_2__home_credito_home_credito__["a" /* HomeCreditoPage */], { usuario: dataRegistro['Response'] });
                                    });
                                });
                            }
                            else {
                                _this.alertaService.warnAlert(_this.restService.headerValidacion, "Correo sin asignación", null);
                            }
                        }
                        else {
                            _this.alertaService.warnAlert(_this.restService.headerValidacion, "Verifica tus datos, no se encontraron en el sistema", null);
                        }
                        loading_1.dismiss();
                    }, function (error) {
                        loading_1.dismiss();
                        console.log(error);
                        _this.alertaService.errorAlert(_this.restService.headerError, _this.restService.mensajeError, null);
                    });
                }
            }, function (error) {
                loading_1.dismiss();
                console.log(error);
                _this.alertaService.errorAlert(_this.restService.headerError, _this.restService.mensajeError, null);
            });
        }
    };
    RegistroCreditoPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-registro-credito',template:/*ion-inline-start:"C:\Users\Administrador\kenergy\src\pages\registro-credito\registro-credito.html"*/'<ion-content class="animated fadeIn" padding style="\n    background-image: url(assets/imgs/fondo.jpg); \n    background-size: 100%;\n    background-position: center center;">\n  <div style="text-align:center" class="animated fadeInDown">\n    <img src="assets/imgs/registro/logoLetra2.png" alt="logo" class="logo logoMargen" style="" />\n  </div>\n  <div style="text-align: center;font-size: 150%;margin-bottom: 2%;" class="tituloHeader">\n    <strong>Kanz Combustibles S.A. de C.V</strong>\n  </div>\n  <div style="text-align: center;font-size: 150%;margin-bottom: 2%;" class="tituloHeader">\n    <strong>¡Bienvenido!</strong>\n  </div>\n  <div style="font-size: 150%;margin-bottom: 5%;margin-bottom: 2%;" class="tituloHeader">\n      Personaliza tu perfil\n  </div>\n  <input placeholder="Ingresar clave recibida por correo* " class="inputText" [(ngModel)]="clave"/>\n  <input placeholder="Nueva contraseña*" class="inputText" [(ngModel)]="nuevaContrasenia"/>\n  <input placeholder="Confirma tu contraseña*" class="inputText" [(ngModel)]="nuevaContraseniaConfirm"/>\n  <input placeholder="Nombre completo*" class="inputText" [(ngModel)]="nombre"/>\n  <input placeholder="Alias*" class="inputText" [(ngModel)]="alias"/>\n  <input placeholder="Celular" type="number" class="inputText" style="margin-bottom:5%" [(ngModel)]="celular"/>\n  <div style="text-align: -webkit-center;">\n    <div style="background-color: #009245;\n    width: 29%;\n    color: #fff;\n    padding: 6px;\n    font-size: 135%;\n    border-radius: 5px;" (click)="irHomeCredito()">Ingresar</div>\n  </div>\n</ion-content>\n'/*ion-inline-end:"C:\Users\Administrador\kenergy\src\pages\registro-credito\registro-credito.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["m" /* NavParams */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* MenuController */], __WEBPACK_IMPORTED_MODULE_6__ionic_storage__["b" /* Storage */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["c" /* Events */], __WEBPACK_IMPORTED_MODULE_3__providers_rest_service__["a" /* RestServiceProvider */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* LoadingController */], __WEBPACK_IMPORTED_MODULE_4__providers_alerta_service__["a" /* AlertaServiceProvider */]])
    ], RegistroCreditoPage);
    return RegistroCreditoPage;
}());

//# sourceMappingURL=registro-credito.js.map

/***/ }),

/***/ 375:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "RegistroPreviewPageModule", function() { return RegistroPreviewPageModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__registro_preview__ = __webpack_require__(324);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};



var RegistroPreviewPageModule = /** @class */ (function () {
    function RegistroPreviewPageModule() {
    }
    RegistroPreviewPageModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["I" /* NgModule */])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_2__registro_preview__["a" /* RegistroPreviewPage */],
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* IonicPageModule */].forChild(__WEBPACK_IMPORTED_MODULE_2__registro_preview__["a" /* RegistroPreviewPage */]),
            ],
        })
    ], RegistroPreviewPageModule);
    return RegistroPreviewPageModule;
}());

//# sourceMappingURL=registro-preview.module.js.map

/***/ }),

/***/ 376:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "RegistroValidaCorreoCreditoPageModule", function() { return RegistroValidaCorreoCreditoPageModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__registro_valida_correo_credito__ = __webpack_require__(377);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};



var RegistroValidaCorreoCreditoPageModule = /** @class */ (function () {
    function RegistroValidaCorreoCreditoPageModule() {
    }
    RegistroValidaCorreoCreditoPageModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["I" /* NgModule */])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_2__registro_valida_correo_credito__["a" /* RegistroValidaCorreoCreditoPage */],
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* IonicPageModule */].forChild(__WEBPACK_IMPORTED_MODULE_2__registro_valida_correo_credito__["a" /* RegistroValidaCorreoCreditoPage */]),
            ],
        })
    ], RegistroValidaCorreoCreditoPageModule);
    return RegistroValidaCorreoCreditoPageModule;
}());

//# sourceMappingURL=registro-valida-correo-credito.module.js.map

/***/ }),

/***/ 377:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return RegistroValidaCorreoCreditoPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__registro_credito_registro_credito__ = __webpack_require__(374);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__providers_alerta_service__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__providers_rest_service__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__angular_common_http__ = __webpack_require__(9);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};






/**
 * Generated class for the RegistroValidaCorreoCreditoPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var RegistroValidaCorreoCreditoPage = /** @class */ (function () {
    function RegistroValidaCorreoCreditoPage(navCtrl, navParams, menuCtrl, restService, loadingCtrl, alertaService) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.menuCtrl = menuCtrl;
        this.restService = restService;
        this.loadingCtrl = loadingCtrl;
        this.alertaService = alertaService;
        this.email = null;
        this.emailConfirm = null;
        this.menuCtrl.enable(false, "authenticated");
    }
    RegistroValidaCorreoCreditoPage_1 = RegistroValidaCorreoCreditoPage;
    RegistroValidaCorreoCreditoPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad RegistroValidaCorreoCreditoPage');
    };
    RegistroValidaCorreoCreditoPage.prototype.validar = function () {
        var _this = this;
        if (this.email == undefined || this.emailConfirm == undefined ||
            this.email == null || this.emailConfirm == null ||
            this.email.length == 0 || this.emailConfirm.length == 0) {
            this.alertaService.warnAlert(this.restService.headerValidacion, "Favor de capturar todos los datos", null);
            return;
        }
        else if (this.email != this.emailConfirm) {
            this.alertaService.warnAlert(this.restService.headerValidacion, "Los correos ingresados no coinciden", null);
            return;
        }
        else {
            var loading_1 = this.loadingCtrl.create();
            loading_1.present();
            this.restService.getToken().timeout(this.restService.timeOver).subscribe(function (data) {
                if (data == null) {
                    loading_1.dismiss();
                    _this.alertaService.warnAlert(_this.restService.headerValidacion, _this.restService.mensajeValidacionAdmin, null);
                }
                else {
                    var body = new __WEBPACK_IMPORTED_MODULE_5__angular_common_http__["d" /* HttpParams */]();
                    body.append("Email", _this.email);
                    var bodys = new __WEBPACK_IMPORTED_MODULE_5__angular_common_http__["d" /* HttpParams */]()
                        .set('Email', _this.email);
                    _this.restService.restServicePOSTTokenXForm("user/email", bodys, data.toString()).timeout(_this.restService.timeOver).subscribe(function (dataRegistro) {
                        if (Object.keys(dataRegistro['Response']).length != 0) {
                            if (dataRegistro['Response'] == true) {
                                _this.navCtrl.setRoot(RegistroValidaCorreoCreditoPage_1);
                            }
                            else {
                                _this.alertaService.warnAlert(_this.restService.headerValidacion, "Correo sin asignación", null);
                            }
                        }
                        else {
                            _this.alertaService.warnAlert(_this.restService.headerValidacion, "Verifica tus datos, no se encontraron en el sistema", null);
                        }
                        loading_1.dismiss();
                    }, function (error) {
                        loading_1.dismiss();
                        console.log(error);
                        _this.alertaService.errorAlert(_this.restService.headerError, _this.restService.mensajeError, null);
                    });
                }
            }, function (error) {
                loading_1.dismiss();
                console.log(error);
                _this.alertaService.errorAlert(_this.restService.headerError, _this.restService.mensajeError, null);
            });
        }
    };
    RegistroValidaCorreoCreditoPage.prototype.postClave = function () {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_2__registro_credito_registro_credito__["a" /* RegistroCreditoPage */]);
    };
    RegistroValidaCorreoCreditoPage = RegistroValidaCorreoCreditoPage_1 = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-registro-valida-correo-credito',template:/*ion-inline-start:"C:\Users\Administrador\kenergy\src\pages\registro-valida-correo-credito\registro-valida-correo-credito.html"*/'<ion-content class="animated fadeIn" padding style="\n    background-image: url(assets/imgs/fondo.jpg); \n    background-size: 100%;\n    background-position: center center;">\n  <div style="text-align:center" class="animated fadeInDown">\n    <img src="assets/imgs/registro/logoLetra2.png" alt="logo" class="logo logoMargen" style="margin-bottom: 13%;" />\n  </div>\n  <div style="text-align: center;font-size: 150%;margin-bottom: 2%;" class="tituloHeader">\n    <strong>Kanz Combustibles S.A. de C.V</strong>\n  </div>\n  <div style="width:100%;margin-bottom: 5%" class="animated fadeInDown">\n    <div class="tituloHeader" style="width:70%;display:inline-block;font-size: 150%">Ingresa tu Correo Electrónico</div>\n    <div class="tituloHeader" style="width:28%;display:inline-block;text-align: right;" (click)="ingresarClave()">\n      <ion-icon name="save"></ion-icon>\n    </div>\n  </div>\n  <input placeholder="Correo electrónico*" class="inputText" [(ngModel)]="email"/>\n  <input placeholder="Confirma tu correo*" type="password" class="inputText" style="margin-bottom:5%" [(ngModel)]="emailConfirm"/>\n  <div style="text-align:center;margin: 16px;font-size: 90%;font-style: italic;">\n    Al validar tus datos, enviaremos una clave\n    a tu correo electrónico para registrarte\n  </div>\n  <div style="text-align: -webkit-center;" (click)="validar()">\n    <div style="background-color: #009245;\n    width: 29%;\n    color: #fff;\n    padding: 6px;\n    font-size: 135%;\n    border-radius: 5px;">Validar</div>\n  </div>\n  <div style="color: #4882d2;\n  font-style: italic;text-align: center;" (click)="postClave()"><p><u >Cuento con una clave</u></p></div>\n</ion-content>'/*ion-inline-end:"C:\Users\Administrador\kenergy\src\pages\registro-valida-correo-credito\registro-valida-correo-credito.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["m" /* NavParams */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* MenuController */],
            __WEBPACK_IMPORTED_MODULE_4__providers_rest_service__["a" /* RestServiceProvider */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* LoadingController */], __WEBPACK_IMPORTED_MODULE_3__providers_alerta_service__["a" /* AlertaServiceProvider */]])
    ], RegistroValidaCorreoCreditoPage);
    return RegistroValidaCorreoCreditoPage;
    var RegistroValidaCorreoCreditoPage_1;
}());

//# sourceMappingURL=registro-valida-correo-credito.js.map

/***/ }),

/***/ 378:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "RegistroValidaCreditoPageModule", function() { return RegistroValidaCreditoPageModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__registro_valida_credito__ = __webpack_require__(686);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};



var RegistroValidaCreditoPageModule = /** @class */ (function () {
    function RegistroValidaCreditoPageModule() {
    }
    RegistroValidaCreditoPageModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["I" /* NgModule */])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_2__registro_valida_credito__["a" /* RegistroValidaCreditoPage */],
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* IonicPageModule */].forChild(__WEBPACK_IMPORTED_MODULE_2__registro_valida_credito__["a" /* RegistroValidaCreditoPage */]),
            ],
        })
    ], RegistroValidaCreditoPageModule);
    return RegistroValidaCreditoPageModule;
}());

//# sourceMappingURL=registro-valida-credito.module.js.map

/***/ }),

/***/ 379:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "RegistroValidaPageModule", function() { return RegistroValidaPageModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__registro_valida__ = __webpack_require__(325);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_forms__ = __webpack_require__(20);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};




var RegistroValidaPageModule = /** @class */ (function () {
    function RegistroValidaPageModule() {
    }
    RegistroValidaPageModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["I" /* NgModule */])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_2__registro_valida__["a" /* RegistroValidaPage */],
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_3__angular_forms__["f" /* ReactiveFormsModule */],
                __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* IonicPageModule */].forChild(__WEBPACK_IMPORTED_MODULE_2__registro_valida__["a" /* RegistroValidaPage */]),
            ],
        })
    ], RegistroValidaPageModule);
    return RegistroValidaPageModule;
}());

//# sourceMappingURL=registro-valida.module.js.map

/***/ }),

/***/ 380:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "RegistroPageModule", function() { return RegistroPageModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__registro__ = __webpack_require__(326);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};



var RegistroPageModule = /** @class */ (function () {
    function RegistroPageModule() {
    }
    RegistroPageModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["I" /* NgModule */])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_2__registro__["a" /* RegistroPage */],
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* IonicPageModule */].forChild(__WEBPACK_IMPORTED_MODULE_2__registro__["a" /* RegistroPage */]),
            ],
        })
    ], RegistroPageModule);
    return RegistroPageModule;
}());

//# sourceMappingURL=registro.module.js.map

/***/ }),

/***/ 381:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TerminosPageModule", function() { return TerminosPageModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__terminos__ = __webpack_require__(299);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};



var TerminosPageModule = /** @class */ (function () {
    function TerminosPageModule() {
    }
    TerminosPageModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["I" /* NgModule */])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_2__terminos__["a" /* TerminosPage */],
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* IonicPageModule */].forChild(__WEBPACK_IMPORTED_MODULE_2__terminos__["a" /* TerminosPage */]),
            ],
        })
    ], TerminosPageModule);
    return TerminosPageModule;
}());

//# sourceMappingURL=terminos.module.js.map

/***/ }),

/***/ 382:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "VehiculosCreditoPageModule", function() { return VehiculosCreditoPageModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__vehiculos_credito__ = __webpack_require__(313);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};



var VehiculosCreditoPageModule = /** @class */ (function () {
    function VehiculosCreditoPageModule() {
    }
    VehiculosCreditoPageModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["I" /* NgModule */])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_2__vehiculos_credito__["a" /* VehiculosCreditoPage */],
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* IonicPageModule */].forChild(__WEBPACK_IMPORTED_MODULE_2__vehiculos_credito__["a" /* VehiculosCreditoPage */]),
            ],
        })
    ], VehiculosCreditoPageModule);
    return VehiculosCreditoPageModule;
}());

//# sourceMappingURL=vehiculos-credito.module.js.map

/***/ }),

/***/ 383:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "VehiculosInfoCreditoPageModule", function() { return VehiculosInfoCreditoPageModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__vehiculos_info_credito__ = __webpack_require__(314);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};



var VehiculosInfoCreditoPageModule = /** @class */ (function () {
    function VehiculosInfoCreditoPageModule() {
    }
    VehiculosInfoCreditoPageModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["I" /* NgModule */])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_2__vehiculos_info_credito__["a" /* VehiculosInfoCreditoPage */],
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* IonicPageModule */].forChild(__WEBPACK_IMPORTED_MODULE_2__vehiculos_info_credito__["a" /* VehiculosInfoCreditoPage */]),
            ],
        })
    ], VehiculosInfoCreditoPageModule);
    return VehiculosInfoCreditoPageModule;
}());

//# sourceMappingURL=vehiculos-info-credito.module.js.map

/***/ }),

/***/ 427:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser_dynamic__ = __webpack_require__(428);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__app_module__ = __webpack_require__(548);


Object(__WEBPACK_IMPORTED_MODULE_0__angular_platform_browser_dynamic__["a" /* platformBrowserDynamic */])().bootstrapModule(__WEBPACK_IMPORTED_MODULE_1__app_module__["a" /* AppModule */]);
//# sourceMappingURL=main.js.map

/***/ }),

/***/ 47:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ProductoModel; });
var ProductoModel = /** @class */ (function () {
    function ProductoModel(id, descripcion, canje, canjePts) {
        if (id === void 0) { id = 0; }
        if (descripcion === void 0) { descripcion = "Producto"; }
        if (canje === void 0) { canje = 0; }
        if (canjePts === void 0) { canjePts = 0; }
        this.id = id;
        this.descripcion = descripcion;
        this.canje = canje;
        this.canjePts = canjePts;
    }
    return ProductoModel;
}());

//# sourceMappingURL=productoModel.js.map

/***/ }),

/***/ 548:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__ = __webpack_require__(63);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ionic_angular__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__app_component__ = __webpack_require__(704);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__ionic_native_status_bar__ = __webpack_require__(423);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__ionic_native_splash_screen__ = __webpack_require__(424);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__providers_rest_service__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__angular_common_http__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__providers_alerta_service__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9_ngx_mask__ = __webpack_require__(705);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__pipes_pipes_module__ = __webpack_require__(706);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__angular_common__ = __webpack_require__(55);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__ionic_native_in_app_browser__ = __webpack_require__(709);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__pages_login_login_module__ = __webpack_require__(360);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14__ionic_storage__ = __webpack_require__(15);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_15__ionic_native_geolocation__ = __webpack_require__(162);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_16__ionic_native_call_number__ = __webpack_require__(710);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_17__providers_menu_service__ = __webpack_require__(156);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_18__ionic_native_mobile_accessibility__ = __webpack_require__(425);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_19__ionic_native_http__ = __webpack_require__(150);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_20__pages_home_home_module__ = __webpack_require__(359);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_21__pages_agrega_auto_agrega_auto_module__ = __webpack_require__(293);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_22__pages_notificaciones_notificaciones_module__ = __webpack_require__(367);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_23__pages_mis_datos_mis_datos_module__ = __webpack_require__(366);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_24__pages_datos_facturacion_datos_facturacion_module__ = __webpack_require__(337);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_25__pages_estadisticas_estadisticas_module__ = __webpack_require__(353);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_26__pages_mi_auto_mi_auto_module__ = __webpack_require__(362);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_27__pages_estaciones_estaciones_module__ = __webpack_require__(338);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_28__pages_estaciones_list_estaciones_list_module__ = __webpack_require__(371);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_29__pages_home_credito_estaciones_list_home_estaciones_list_module__ = __webpack_require__(357);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_30__pages_mis_autos_mis_autos_module__ = __webpack_require__(364);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_31__pages_mi_auto_info_mi_auto_info_module__ = __webpack_require__(361);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_32__pages_cargas_cargas_module__ = __webpack_require__(333);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_33__pages_cargas_list_cargas_list_module__ = __webpack_require__(334);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_34__pages_cargas_info_cargas_info_module__ = __webpack_require__(331);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_35__pages_facturacion_facturacion_module__ = __webpack_require__(356);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_36__pages_promociones_promociones_module__ = __webpack_require__(370);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_37__pages_terminos_terminos_module__ = __webpack_require__(381);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_38__pages_premios_premios_module__ = __webpack_require__(369);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_39__pages_contacto_contacto_module__ = __webpack_require__(335);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_40__pages_premios_solicitud_premios_solicitud_module__ = __webpack_require__(368);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_41__pages_registro_valida_registro_valida_module__ = __webpack_require__(379);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_42__pages_registro_registro_module__ = __webpack_require__(380);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_43__pages_agrega_auto_escaner_agrega_auto_escaner_module__ = __webpack_require__(274);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_44__pages_agrega_auto_info_agrega_auto_info_module__ = __webpack_require__(292);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_45__ionic_native_barcode_scanner__ = __webpack_require__(276);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_46__pages_home_credito_home_credito_module__ = __webpack_require__(358);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_47__amcharts_amcharts3_angular__ = __webpack_require__(323);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_48__pages_registro_preview_registro_preview_module__ = __webpack_require__(375);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_49__pages_registro_valida_credito_registro_valida_credito_module__ = __webpack_require__(378);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_50__pages_registro_credito_registro_credito_module__ = __webpack_require__(373);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_51__pages_registro_valida_correo_credito_registro_valida_correo_credito_module__ = __webpack_require__(376);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_52__pages_estado_cuenta_estado_cuenta_module__ = __webpack_require__(354);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_53__pages_mis_datos_credito_mis_datos_credito_module__ = __webpack_require__(365);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_54__pages_estadisticas_credito_estadisticas_credito_module__ = __webpack_require__(352);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_55__pages_vehiculos_credito_vehiculos_credito_module__ = __webpack_require__(382);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_56__pages_vehiculos_info_credito_vehiculos_info_credito_module__ = __webpack_require__(383);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_57__pages_cargas_credito_cargas_credito_module__ = __webpack_require__(330);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_58__pages_cargas_info_credito_cargas_info_credito_module__ = __webpack_require__(332);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_59__pages_facturacion_credito_facturacion_credito_module__ = __webpack_require__(355);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_60__pages_consulta_puntos_consulta_puntos_module__ = __webpack_require__(336);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_61__ionic_native_file_transfer___ = __webpack_require__(82);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_62__ionic_native_file__ = __webpack_require__(83);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_63__ionic_native_file_opener___ = __webpack_require__(101);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_64__pages_aviso_privacidad_aviso_privacidad_module__ = __webpack_require__(328);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_65__ionic_native_sqlite__ = __webpack_require__(43);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_66__ionic_native_image_picker__ = __webpack_require__(711);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_67__ionic_native_file_chooser__ = __webpack_require__(309);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_68__services_facturacion_service__ = __webpack_require__(102);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_69__ionic_native_app_availability__ = __webpack_require__(296);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_70__services_notificaciones_service__ = __webpack_require__(17);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_71__ionic_native_launch_navigator__ = __webpack_require__(306);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_72__ionic_native_camera__ = __webpack_require__(310);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_73__pages_cambiar_contra_cambiar_contra_module__ = __webpack_require__(294);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_74__services_abrirnotificaciones_service__ = __webpack_require__(18);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_75__services_usuario_service__ = __webpack_require__(59);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_76__services_estaciones_service__ = __webpack_require__(322);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_77__pages_cambiar_email_cambiar_email_module__ = __webpack_require__(329);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_78__ionic_native_deeplinks__ = __webpack_require__(426);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_79__pages_recuperar_contra_recuperar_contra_module__ = __webpack_require__(372);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
















































































var AppModule = /** @class */ (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["I" /* NgModule */])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_3__app_component__["a" /* MyApp */]
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__["a" /* BrowserModule */],
                __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["f" /* IonicModule */].forRoot(__WEBPACK_IMPORTED_MODULE_3__app_component__["a" /* MyApp */], {}, {
                    links: [
                        { loadChildren: '../pages/agrega-auto-escaner/agrega-auto-escaner.module#AgregaAutoEscanerPageModule', name: 'AgregaAutoEscanerPage', segment: 'agrega-auto-escaner', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/agrega-auto-info/agrega-auto-info.module#AgregaAutoInfoPageModule', name: 'AgregaAutoInfoPage', segment: 'agrega-auto-info', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/agrega-auto/agrega-auto.module#AgregaAutoPageModule', name: 'AgregaAutoPage', segment: 'agrega-auto', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/agrega-nuevo-llavero/agrega-nuevo-llavero.module#AgregaNuevoLlaveroPageModule', name: 'AgregaNuevoLlaveroPage', segment: 'agrega-nuevo-llavero', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/cambiar-contra/cambiar-contra.module#CambiarContraPageModule', name: 'CambiarContraPage', segment: 'cambiar-contra', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/aviso-privacidad/aviso-privacidad.module#AvisoPrivacidadPageModule', name: 'AvisoPrivacidadPage', segment: 'aviso-privacidad', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/cambiar-email/cambiar-email.module#CambiarEmailPageModule', name: 'CambiarEmailPage', segment: 'cambiar-email', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/cargas-credito/cargas-credito.module#CargasCreditoPageModule', name: 'CargasCreditoPage', segment: 'cargas-credito', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/cargas-info/cargas-info.module#CargasInfoPageModule', name: 'CargasInfoPage', segment: 'cargas-info', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/cargas-info-credito/cargas-info-credito.module#CargasInfoCreditoPageModule', name: 'CargasInfoCreditoPage', segment: 'cargas-info-credito', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/cargas/cargas.module#CargasPageModule', name: 'CargasPage', segment: 'cargas', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/cargas-list/cargas-list.module#CargasListPageModule', name: 'CargasListPage', segment: 'cargas-list', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/contacto/contacto.module#ContactoPageModule', name: 'ContactoPage', segment: 'contacto', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/consulta-puntos/consulta-puntos.module#ConsultaPuntosPageModule', name: 'ConsultaPuntosPage', segment: 'consulta-puntos', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/datos-facturacion/datos-facturacion.module#DatosFacturacionPageModule', name: 'DatosFacturacionPage', segment: 'datos-facturacion', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/estaciones/estaciones.module#EstacionesPageModule', name: 'EstacionesPage', segment: 'estaciones', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/estadisticas-credito/estadisticas-credito.module#EstadisticasCreditoPageModule', name: 'EstadisticasCreditoPage', segment: 'estadisticas-credito', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/estadisticas/estadisticas.module#EstadisticasPageModule', name: 'EstadisticasPage', segment: 'estadisticas', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/estado-cuenta/estado-cuenta.module#EstadoCuentaPageModule', name: 'EstadoCuentaPage', segment: 'estado-cuenta', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/facturacion-credito/facturacion-credito.module#FacturacionCreditoPageModule', name: 'FacturacionCreditoPage', segment: 'facturacion-credito', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/facturacion/facturacion.module#FacturacionPageModule', name: 'FacturacionPage', segment: 'facturacion', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/home-credito-estaciones-list/home-estaciones-list.module#HomeEstacionesListPageModule', name: 'HomeEstacionesListPage', segment: 'home-estaciones-list', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/home-credito/home-credito.module#HomeCreditoPageModule', name: 'HomeCreditoPage', segment: 'home-credito', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/home/home.module#HomePageModule', name: 'HomePage', segment: 'home', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/login/login.module#LoginPageModule', name: 'LoginPage', segment: 'login', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/mi-auto-info/mi-auto-info.module#MiAutoInfoPageModule', name: 'MiAutoInfoPage', segment: 'mi-auto-info', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/mi-auto/mi-auto.module#MiAutoPageModule', name: 'MiAutoPage', segment: 'mi-auto', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/mis-autos/mis-autos.module#MisAutosPageModule', name: 'MisAutosPage', segment: 'mis-autos', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/mis-datos-credito/mis-datos-credito.module#MisDatosCreditoPageModule', name: 'MisDatosCreditoPage', segment: 'mis-datos-credito', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/mis-datos/mis-datos.module#MisDatosPageModule', name: 'MisDatosPage', segment: 'mis-datos', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/mis-solicitudes/mis-solicitudes.module#MisSolicitudesPageModule', name: 'MisSolicitudesPage', segment: 'mis-solicitudes', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/notificaciones/notificaciones.module#NotificacionesPageModule', name: 'NotificacionesPage', segment: 'notificaciones', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/premios-solicitud/premios-solicitud.module#PremiosSolicitudPageModule', name: 'PremiosSolicitudPage', segment: 'premios-solicitud', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/premios/premios.module#PremiosPageModule', name: 'PremiosPage', segment: 'premios', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/promociones/promociones.module#PromocionesPageModule', name: 'PromocionesPage', segment: 'promociones', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/estaciones-list/estaciones-list.module#EstacionesListPageModule', name: 'EstacionesListPage', segment: 'estaciones-list', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/recuperar-contra/recuperar-contra.module#RecuperarContraPageModule', name: 'RecuperarContraPage', segment: 'recuperar-contra', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/registro-credito/registro-credito.module#RegistroCreditoPageModule', name: 'RegistroCreditoPage', segment: 'registro-credito', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/registro-preview/registro-preview.module#RegistroPreviewPageModule', name: 'RegistroPreviewPage', segment: 'registro-preview', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/registro-valida-correo-credito/registro-valida-correo-credito.module#RegistroValidaCorreoCreditoPageModule', name: 'RegistroValidaCorreoCreditoPage', segment: 'registro-valida-correo-credito', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/registro-valida-credito/registro-valida-credito.module#RegistroValidaCreditoPageModule', name: 'RegistroValidaCreditoPage', segment: 'registro-valida-credito', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/registro-valida/registro-valida.module#RegistroValidaPageModule', name: 'RegistroValidaPage', segment: 'registro-valida', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/registro/registro.module#RegistroPageModule', name: 'RegistroPage', segment: 'registro', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/terminos/terminos.module#TerminosPageModule', name: 'TerminosPage', segment: 'terminos', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/vehiculos-credito/vehiculos-credito.module#VehiculosCreditoPageModule', name: 'VehiculosCreditoPage', segment: 'vehiculos-credito', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/vehiculos-info-credito/vehiculos-info-credito.module#VehiculosInfoCreditoPageModule', name: 'VehiculosInfoCreditoPage', segment: 'vehiculos-info-credito', priority: 'low', defaultHistory: [] }
                    ]
                }),
                __WEBPACK_IMPORTED_MODULE_7__angular_common_http__["b" /* HttpClientModule */],
                __WEBPACK_IMPORTED_MODULE_9_ngx_mask__["a" /* NgxMaskModule */].forRoot(),
                __WEBPACK_IMPORTED_MODULE_10__pipes_pipes_module__["a" /* PipesModule */],
                __WEBPACK_IMPORTED_MODULE_14__ionic_storage__["a" /* IonicStorageModule */].forRoot(),
                //Pantallas de la App
                __WEBPACK_IMPORTED_MODULE_13__pages_login_login_module__["LoginPageModule"],
                __WEBPACK_IMPORTED_MODULE_20__pages_home_home_module__["HomePageModule"],
                __WEBPACK_IMPORTED_MODULE_21__pages_agrega_auto_agrega_auto_module__["AgregaAutoPageModule"],
                __WEBPACK_IMPORTED_MODULE_22__pages_notificaciones_notificaciones_module__["NotificacionesPageModule"],
                __WEBPACK_IMPORTED_MODULE_23__pages_mis_datos_mis_datos_module__["MisDatosPageModule"],
                __WEBPACK_IMPORTED_MODULE_24__pages_datos_facturacion_datos_facturacion_module__["DatosFacturacionPageModule"],
                __WEBPACK_IMPORTED_MODULE_25__pages_estadisticas_estadisticas_module__["EstadisticasPageModule"],
                __WEBPACK_IMPORTED_MODULE_64__pages_aviso_privacidad_aviso_privacidad_module__["AvisoPrivacidadPageModule"],
                __WEBPACK_IMPORTED_MODULE_26__pages_mi_auto_mi_auto_module__["MiAutoPageModule"],
                __WEBPACK_IMPORTED_MODULE_27__pages_estaciones_estaciones_module__["EstacionesPageModule"],
                __WEBPACK_IMPORTED_MODULE_28__pages_estaciones_list_estaciones_list_module__["EstacionesListPageModule"],
                __WEBPACK_IMPORTED_MODULE_29__pages_home_credito_estaciones_list_home_estaciones_list_module__["HomeEstacionesListPageModule"],
                __WEBPACK_IMPORTED_MODULE_31__pages_mi_auto_info_mi_auto_info_module__["MiAutoInfoPageModule"],
                __WEBPACK_IMPORTED_MODULE_30__pages_mis_autos_mis_autos_module__["MisAutosPageModule"],
                __WEBPACK_IMPORTED_MODULE_32__pages_cargas_cargas_module__["CargasPageModule"],
                __WEBPACK_IMPORTED_MODULE_33__pages_cargas_list_cargas_list_module__["CargasListPageModule"],
                __WEBPACK_IMPORTED_MODULE_34__pages_cargas_info_cargas_info_module__["CargasInfoPageModule"],
                __WEBPACK_IMPORTED_MODULE_35__pages_facturacion_facturacion_module__["FacturacionPageModule"],
                __WEBPACK_IMPORTED_MODULE_36__pages_promociones_promociones_module__["PromocionesPageModule"],
                __WEBPACK_IMPORTED_MODULE_37__pages_terminos_terminos_module__["TerminosPageModule"],
                __WEBPACK_IMPORTED_MODULE_38__pages_premios_premios_module__["PremiosPageModule"],
                __WEBPACK_IMPORTED_MODULE_39__pages_contacto_contacto_module__["ContactoPageModule"],
                __WEBPACK_IMPORTED_MODULE_40__pages_premios_solicitud_premios_solicitud_module__["PremiosSolicitudPageModule"],
                __WEBPACK_IMPORTED_MODULE_42__pages_registro_registro_module__["RegistroPageModule"],
                __WEBPACK_IMPORTED_MODULE_41__pages_registro_valida_registro_valida_module__["RegistroValidaPageModule"],
                __WEBPACK_IMPORTED_MODULE_43__pages_agrega_auto_escaner_agrega_auto_escaner_module__["AgregaAutoEscanerPageModule"],
                __WEBPACK_IMPORTED_MODULE_44__pages_agrega_auto_info_agrega_auto_info_module__["AgregaAutoInfoPageModule"],
                __WEBPACK_IMPORTED_MODULE_46__pages_home_credito_home_credito_module__["HomeCreditoPageModule"],
                __WEBPACK_IMPORTED_MODULE_47__amcharts_amcharts3_angular__["a" /* AmChartsModule */],
                __WEBPACK_IMPORTED_MODULE_48__pages_registro_preview_registro_preview_module__["RegistroPreviewPageModule"],
                __WEBPACK_IMPORTED_MODULE_49__pages_registro_valida_credito_registro_valida_credito_module__["RegistroValidaCreditoPageModule"],
                __WEBPACK_IMPORTED_MODULE_50__pages_registro_credito_registro_credito_module__["RegistroCreditoPageModule"],
                __WEBPACK_IMPORTED_MODULE_51__pages_registro_valida_correo_credito_registro_valida_correo_credito_module__["RegistroValidaCorreoCreditoPageModule"],
                __WEBPACK_IMPORTED_MODULE_52__pages_estado_cuenta_estado_cuenta_module__["EstadoCuentaPageModule"],
                __WEBPACK_IMPORTED_MODULE_53__pages_mis_datos_credito_mis_datos_credito_module__["MisDatosCreditoPageModule"],
                __WEBPACK_IMPORTED_MODULE_54__pages_estadisticas_credito_estadisticas_credito_module__["EstadisticasCreditoPageModule"],
                __WEBPACK_IMPORTED_MODULE_55__pages_vehiculos_credito_vehiculos_credito_module__["VehiculosCreditoPageModule"],
                __WEBPACK_IMPORTED_MODULE_56__pages_vehiculos_info_credito_vehiculos_info_credito_module__["VehiculosInfoCreditoPageModule"],
                __WEBPACK_IMPORTED_MODULE_57__pages_cargas_credito_cargas_credito_module__["CargasCreditoPageModule"],
                __WEBPACK_IMPORTED_MODULE_58__pages_cargas_info_credito_cargas_info_credito_module__["CargasInfoCreditoPageModule"],
                __WEBPACK_IMPORTED_MODULE_59__pages_facturacion_credito_facturacion_credito_module__["FacturacionCreditoPageModule"],
                __WEBPACK_IMPORTED_MODULE_60__pages_consulta_puntos_consulta_puntos_module__["ConsultaPuntosPageModule"],
                __WEBPACK_IMPORTED_MODULE_73__pages_cambiar_contra_cambiar_contra_module__["CambiarContraPageModule"],
                __WEBPACK_IMPORTED_MODULE_77__pages_cambiar_email_cambiar_email_module__["CambiarEmailPageModule"],
                __WEBPACK_IMPORTED_MODULE_79__pages_recuperar_contra_recuperar_contra_module__["RecuperarContraPageModule"]
            ],
            bootstrap: [__WEBPACK_IMPORTED_MODULE_2_ionic_angular__["d" /* IonicApp */]],
            entryComponents: [
                __WEBPACK_IMPORTED_MODULE_3__app_component__["a" /* MyApp */]
            ],
            providers: [
                __WEBPACK_IMPORTED_MODULE_4__ionic_native_status_bar__["a" /* StatusBar */],
                __WEBPACK_IMPORTED_MODULE_5__ionic_native_splash_screen__["a" /* SplashScreen */],
                { provide: __WEBPACK_IMPORTED_MODULE_1__angular_core__["u" /* ErrorHandler */], useClass: __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["e" /* IonicErrorHandler */] },
                __WEBPACK_IMPORTED_MODULE_6__providers_rest_service__["a" /* RestServiceProvider */],
                __WEBPACK_IMPORTED_MODULE_8__providers_alerta_service__["a" /* AlertaServiceProvider */],
                __WEBPACK_IMPORTED_MODULE_11__angular_common__["d" /* DatePipe */],
                __WEBPACK_IMPORTED_MODULE_12__ionic_native_in_app_browser__["a" /* InAppBrowser */],
                __WEBPACK_IMPORTED_MODULE_15__ionic_native_geolocation__["a" /* Geolocation */],
                __WEBPACK_IMPORTED_MODULE_16__ionic_native_call_number__["a" /* CallNumber */],
                __WEBPACK_IMPORTED_MODULE_17__providers_menu_service__["a" /* MenuProvider */],
                __WEBPACK_IMPORTED_MODULE_18__ionic_native_mobile_accessibility__["a" /* MobileAccessibility */],
                __WEBPACK_IMPORTED_MODULE_19__ionic_native_http__["a" /* HTTP */],
                __WEBPACK_IMPORTED_MODULE_45__ionic_native_barcode_scanner__["a" /* BarcodeScanner */],
                __WEBPACK_IMPORTED_MODULE_61__ionic_native_file_transfer___["a" /* FileTransfer */],
                __WEBPACK_IMPORTED_MODULE_61__ionic_native_file_transfer___["b" /* FileTransferObject */],
                __WEBPACK_IMPORTED_MODULE_62__ionic_native_file__["a" /* File */],
                __WEBPACK_IMPORTED_MODULE_66__ionic_native_image_picker__["a" /* ImagePicker */],
                __WEBPACK_IMPORTED_MODULE_63__ionic_native_file_opener___["a" /* FileOpener */],
                __WEBPACK_IMPORTED_MODULE_65__ionic_native_sqlite__["a" /* SQLite */],
                __WEBPACK_IMPORTED_MODULE_67__ionic_native_file_chooser__["a" /* FileChooser */],
                __WEBPACK_IMPORTED_MODULE_68__services_facturacion_service__["a" /* FacturacionService */],
                __WEBPACK_IMPORTED_MODULE_70__services_notificaciones_service__["a" /* NotificacionService */],
                __WEBPACK_IMPORTED_MODULE_74__services_abrirnotificaciones_service__["a" /* AbrirnotificacionesService */],
                __WEBPACK_IMPORTED_MODULE_69__ionic_native_app_availability__["a" /* AppAvailability */],
                __WEBPACK_IMPORTED_MODULE_71__ionic_native_launch_navigator__["a" /* LaunchNavigator */],
                __WEBPACK_IMPORTED_MODULE_72__ionic_native_camera__["a" /* Camera */],
                __WEBPACK_IMPORTED_MODULE_75__services_usuario_service__["a" /* UsuarioService */],
                __WEBPACK_IMPORTED_MODULE_76__services_estaciones_service__["a" /* EstacionesService */],
                __WEBPACK_IMPORTED_MODULE_78__ionic_native_deeplinks__["a" /* Deeplinks */]
            ]
        })
    ], AppModule);
    return AppModule;
}());

//# sourceMappingURL=app.module.js.map

/***/ }),

/***/ 59:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return UsuarioService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};

var UsuarioService = /** @class */ (function () {
    function UsuarioService() {
        this.tipo = 0;
        this.tieneVehiculos = false;
        this.nombreUsuario = "";
        this.pages = [];
    }
    UsuarioService.prototype.cambiarNumAutos = function (num) {
        if (this.pages.length > 0)
            this.pages[3].parametro2 = num < 1 ? "Sin autos" : num == 1 ? "1 auto" : num + " autos";
    };
    UsuarioService.prototype.cambiarNombre = function (nombre) {
        if (this.pages.length > 0)
            this.pages[1].nombre = nombre;
    };
    UsuarioService = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["A" /* Injectable */])()
    ], UsuarioService);
    return UsuarioService;
}());

//# sourceMappingURL=usuario.service.js.map

/***/ }),

/***/ 65:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return HomePage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__models_CombustibleModel__ = __webpack_require__(161);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__agrega_auto_agrega_auto__ = __webpack_require__(149);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__mi_auto_mi_auto__ = __webpack_require__(321);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__home_credito_estaciones_list_home_estaciones_list__ = __webpack_require__(163);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__agrega_auto_escaner_agrega_auto_escaner__ = __webpack_require__(275);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__ionic_storage__ = __webpack_require__(15);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__providers_alerta_service__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__providers_rest_service__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__angular_common_http__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__ionic_native_sqlite__ = __webpack_require__(43);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__services_usuario_service__ = __webpack_require__(59);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__services_abrirnotificaciones_service__ = __webpack_require__(18);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14__services_notificaciones_service__ = __webpack_require__(17);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_15__services_estaciones_service__ = __webpack_require__(322);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_16__ionic_native_geolocation__ = __webpack_require__(162);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

















var HomePage = /** @class */ (function () {
    function HomePage(navCtrl, localStorage, navParams, popoverCtrl, modalController, loadingCtrl, alertaService, restService, menuCtrl, events, sqlite, alertCtrl, usuarioService, notificacion, mostrarNotif, estacionesService, geolocation) {
        var _this = this;
        this.navCtrl = navCtrl;
        this.localStorage = localStorage;
        this.navParams = navParams;
        this.popoverCtrl = popoverCtrl;
        this.modalController = modalController;
        this.loadingCtrl = loadingCtrl;
        this.alertaService = alertaService;
        this.restService = restService;
        this.menuCtrl = menuCtrl;
        this.events = events;
        this.sqlite = sqlite;
        this.alertCtrl = alertCtrl;
        this.usuarioService = usuarioService;
        this.notificacion = notificacion;
        this.mostrarNotif = mostrarNotif;
        this.estacionesService = estacionesService;
        this.geolocation = geolocation;
        this.combustibles = [];
        this.estaciones = [];
        this.vehiculos = [];
        this.usuario = null;
        this.st = "40";
        this.algunAuto = true;
        this.latOrigen = 0;
        this.longOrigen = 0;
        this.getMedalla = function (posicion) { return "assets/imgs/medallas/medalla" + posicion + ".png"; };
        this.mostrarNotif.nav = this.navCtrl;
        this.localStorage.ready().then(function () {
            _this.localStorage.get("@userSession").then(function (data) {
                if (data != null) {
                    _this.usuario = data;
                    var dato = {
                        valor: 2,
                        user: _this.usuario
                    };
                    if (_this.usuario.IdClient == 0) {
                        var dato2 = {
                            valor: 1,
                            user: _this.usuario
                        };
                        _this.events.publish('menu:changed', dato2);
                    }
                    else {
                        _this.events.publish('menu:changed', dato);
                    }
                }
                else {
                    _this.alertaService.warnAlert(_this.restService.headerValidacion, "Usuario sin sesión, no se cargarán sus datos", null);
                }
            });
        });
        //this.alertaService.errorAlert("usuarioHome", this.usuario, null);
        if (this.usuario == null) {
            /*let sql = "SELECT * FROM usuario where id_usuario = ?";
            
            
            this.sqlite.create({
            name: 'kenergy.db',
            location: 'default'
            }).then((db: SQLiteObject) => {
                db.executeSql(sql, [1])
                    .then(response => {
                        if(response.rows.length != 0) {
                            //this.localStorage.set(`@userSession`, response.rows.item(0).usuario);
                            this.alertaService.errorAlert("idCliente", response.rows.item(0).id_cliente, null);
                            this.alertaService.errorAlert("usuario", response.rows.item(0).usuario, null);
                            if(response.rows.item(0).id_cliente != 0){
    
                        //this.navCtrl.setRoot(HomeCreditoPage, { usuario: response.rows.item(0).usuario });
                      }else{
                        //this.navCtrl.setRoot(HomePage, { usuario: response.rows.item(0).usuario });
                      }
                        } else {
                        }
                        
                    })
                .catch(error =>  {
                    this.alertaService.errorAlert("Error al obtener usuario", error, null)
                });
                
            
            
            })
            .catch(error =>{
                this.alertaService.errorAlert("Info", "Excepcion al crear BD " + error, null);
            });
            */
        }
        else {
            var data = {
                valor: 1,
                user: this.usuario
            };
            this.events.publish('menu:changed', data);
        }
        this.menuCtrl.enable(true, "authenticated");
        this.cargarEstaciones();
        //this.cargarVehiculos();
        if (undefined != navParams.get("vehiculo")) {
            var v = navParams.get("vehiculo");
            this.openIfoCar(v);
        }
        this.verificarConfirmacion();
    }
    HomePage.prototype.cargarEstaciones = function () {
        var _this = this;
        //api/station
        var loading = this.loadingCtrl.create();
        loading.present();
        this.restService.getToken().timeout(this.restService.timeOver).subscribe(function (data) {
            if (data == null) {
                loading.dismiss();
                _this.alertaService.warnAlert(_this.restService.headerValidacion, _this.restService.mensajeValidacionAdmin, null);
            }
            else {
                var body = new __WEBPACK_IMPORTED_MODULE_10__angular_common_http__["d" /* HttpParams */]();
                /*this.restService.restServiceGETToken("station/regular/Last/" + this.usuario.Id, body, data.toString()).timeout(this.restService.timeOver).subscribe(
                    dataRegistroLast => {
                if (undefined != dataRegistroLast['Response'] && dataRegistroLast['Response'] > 0)
                  (document.getElementById("est") as HTMLFormElement).value = dataRegistroLast['Response'];
                else
                (document.getElementById("est") as HTMLFormElement).value = 1;
              }, error => {
                console.log(error);
                this.alertaService.errorAlert(this.restService.headerError, this.restService.mensajeError, null);
              }
            );*/
                _this.restService.restServiceGETToken("station", body, data.toString()).timeout(_this.restService.timeOver).subscribe(function (dataRegistro) {
                    if (Object.keys(dataRegistro['Response']).length != 0) {
                        var arrayEstaciones = dataRegistro['Response'];
                        var i = 0;
                        for (var index = 0; index < arrayEstaciones.length; index++) {
                            var estacion = arrayEstaciones[index];
                            _this.estaciones.push(new __WEBPACK_IMPORTED_MODULE_2__models_CombustibleModel__["a" /* CombustibleModel */](estacion.Nombre.replace(" 1 ", " ").replace(" 2 ", " ").replace(" 3 ", " "), 0, 0, 0, false, estacion.Id));
                        }
                        loading.dismiss();
                        //this.combustibles.push(new CombustibleModel("Ixtaczoquitlan", 88.88, 88.88, 88.88, true));
                    }
                    else {
                        loading.dismiss();
                        _this.alertaService.warnAlert(_this.restService.headerValidacion, "No se encontraron estaciones", null);
                    }
                }, function (error) {
                    loading.dismiss();
                    console.log(error);
                    _this.alertaService.errorAlert(_this.restService.headerError, _this.restService.mensajeError, null);
                });
            }
        }, function (error) {
            loading.dismiss();
            console.log(error);
            _this.alertaService.errorAlert(_this.restService.headerError, _this.restService.mensajeError, null);
        });
    };
    HomePage.prototype.cargarInfo = function (est) {
        this.combustibles = [];
        this.combustibles.push(new __WEBPACK_IMPORTED_MODULE_2__models_CombustibleModel__["a" /* CombustibleModel */](this.estaciones[est - 1].nombre.replace(" 1 ", " ").replace(" 2 ", " ").replace(" 3 ", " "), 0, 0, 0, false, this.estaciones[est - 1].id));
        this.cargarPrecio(this.combustibles);
    };
    HomePage.prototype.cargarPrecio = function (combustibles) {
        var _this = this;
        var estacion = combustibles[0];
        var armaUrl = "gasoline/price/" + estacion.id;
        this.restService.getToken().timeout(this.restService.timeOver).subscribe(function (data) {
            if (data == null) {
                _this.alertaService.warnAlert(_this.restService.headerValidacion, _this.restService.mensajeValidacionAdmin, null);
            }
            else {
                _this.restService.restServiceGETToken(armaUrl, new __WEBPACK_IMPORTED_MODULE_10__angular_common_http__["d" /* HttpParams */](), data.toString()).timeout(_this.restService.timeOver).subscribe(function (dataEstacionPrecio) {
                    if (Object.keys(dataEstacionPrecio['Response']).length != 0) {
                        var arrayPrecios = dataEstacionPrecio['Response'];
                        combustibles[0] = new __WEBPACK_IMPORTED_MODULE_2__models_CombustibleModel__["a" /* CombustibleModel */](estacion.nombre, arrayPrecios[0].Price, arrayPrecios[1].Price, arrayPrecios[2].Price, true, estacion.id);
                    }
                    else {
                        combustibles[0] = new __WEBPACK_IMPORTED_MODULE_2__models_CombustibleModel__["a" /* CombustibleModel */](estacion.nombre, 0, 0, 0, false);
                    }
                }, function (error) {
                    combustibles[0] = new __WEBPACK_IMPORTED_MODULE_2__models_CombustibleModel__["a" /* CombustibleModel */](estacion.nombre, 0, 0, 0, false);
                    console.log(error);
                    _this.alertaService.errorAlert(_this.restService.headerError, _this.restService.mensajeError, null);
                });
            }
        }, function (error) {
            console.log(error);
            _this.alertaService.errorAlert(_this.restService.headerError, _this.restService.mensajeError, null);
        });
    };
    HomePage.prototype.cargarVehiculos1 = function (event) {
        this.cargarVehiculos();
        setTimeout(function () {
            event.complete();
        }, 2000);
    };
    HomePage.prototype.cargarVehiculos = function () {
        var _this = this;
        this.vehiculos = [];
        if (this.usuario.LlaveroContado != null && this.usuario.LlaveroContado != undefined && this.usuario.LlaveroContado > 0) {
            var armaUrl = "vehicle/regular/" + this.usuario.LlaveroContado;
            this.restService.getToken().timeout(this.restService.timeOver).subscribe(function (data) {
                _this.restService.restServiceGETToken(armaUrl, new __WEBPACK_IMPORTED_MODULE_10__angular_common_http__["d" /* HttpParams */](), data.toString()).timeout(_this.restService.timeOver).subscribe(function (dataAutos) {
                    if (dataAutos['Response'] != null && dataAutos['Response'] instanceof Array) {
                        _this.algunAuto = true;
                        console.log(JSON.stringify(dataAutos['Response']));
                        var array = dataAutos['Response'];
                        array.forEach(function (auto) {
                            /*this.restService.restServiceGETToken("vehicle/regular/detail/" + auto.Id, new HttpParams(), data.toString()).timeout(this.restService.timeOver).subscribe(
                            dataRegistro => {
                              let sql = 'SELECT * FROM mis_autos where id_vehiculo = ?';
                                var d = new Date();
                                var n = d.getDay();*/
                            /*this.sqlite.create({
                            name: 'kenergy.db',
                            location: 'default'
                            }).then((db: SQLiteObject) => {
                                db.executeSql(sql, [auto.Id])
                                    .then(response => {
                                        if(response.rows.length != 0) {
                                            let circula = 0;
                                            let tip = 0;
                                            if(null != response.rows.item(0).no_circula && n == parseInt(response.rows.item(0).no_circula)) circula = 1;
                                            
                                            if(null != response.rows.item(0).tipo_combustible && "Premium" == response.rows.item(0).tipo_combustible) tip = 1;
                                            if(null != response.rows.item(0).tipo_combustible && "Magna" == response.rows.item(0).tipo_combustible) tip = 2;
                                            if(null != response.rows.item(0).tipo_combustible && "Diesel" == response.rows.item(0).tipo_combustible) tip = 3;
                                            
                                            this.vehiculos.push({
                                            id: auto.Id,
                                            marca: auto.Marca,
                                            modelo: auto.Modelo,
                                            placa: auto.Placa,
                                        tipo: tip,
                                  circula: circula,
                                  puntos: dataRegistro['Response'].Puntos
                                        });
                                        } else {*/
                            _this.vehiculos.push({
                                id: auto.Id,
                                den: auto.Den,
                                placa: auto.Placa,
                                tipo: 0,
                                circula: 0,
                                num: auto.NumVeh
                                //puntos: dataRegistro['Response'].Puntos
                            });
                            /*}
                        })
                    .catch(error => this.alertaService.errorAlert("Info Error", error, null));
    
                })
                .catch(error =>{
                    this.vehiculos.push({
                    id: auto.Id,
                    marca: auto.Marca,
                    modelo: auto.Modelo,
                    placa: auto.Placa,
                   tipo: 87,
                circula: 0,
                puntos: dataRegistro['Response'].Puntos
              });*/
                            /*this.vehiculos.sort(function (a, b) {
                              if (a.puntos < b.puntos) {
                                return 1;
                              }
                              if (a.puntos > b.puntos) {
                                return -1;
                              }
                              // a must be equal to b
                              return 0;
                            });
                            for(let i = 0; i < this.vehiculos.length; i++)
                              this.vehiculos[i].posicion = i + 1;
                            this.usuarioService.cambiarNumAutos(this.vehiculos.length);*/
                            /*	this.alertaService.errorAlert("Info", "Excepcion al crear BD " + error, null);
                            });
                        }, error => {
                          console.log(error);
                          this.alertaService.errorAlert(this.restService.headerError, this.restService.mensajeError, null);
                        }*/
                            _this.usuarioService.tieneVehiculos = _this.vehiculos.length > 0 ? true : false;
                        });
                        //});
                    }
                    else {
                        document.getElementsByClassName("contentHome")[0].style.backgroundColor = "black";
                        _this.algunAuto = false;
                    }
                }, function (error) {
                    console.log(error);
                    _this.alertaService.errorAlert(_this.restService.headerError, _this.restService.mensajeError, null);
                });
            }, function (error) {
                console.log(error);
                _this.alertaService.errorAlert(_this.restService.headerError, _this.restService.mensajeError, null);
            });
        }
    };
    HomePage.prototype.openSesion = function () {
        var _this = this;
        this.localStorage.ready().then(function () {
            _this.localStorage.get("@userSession").then(function (data) {
                if (data != null) {
                    _this.usuario = data;
                    var dato = {
                        valor: 2,
                        user: _this.usuario
                    };
                    if (_this.usuario.IdClient == 0) {
                        var dato2 = {
                            valor: 1,
                            user: _this.usuario
                        };
                        _this.events.publish('menu:changed', dato2);
                        _this.cargarVehiculos();
                    }
                    else {
                        _this.events.publish('menu:changed', dato);
                    }
                }
                else {
                    _this.alertaService.warnAlert(_this.restService.headerValidacion, "Usuario sin sesión, no se cargarán sus datos", null);
                }
            });
        });
    };
    HomePage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad HomePage');
        if (this.usuario != null)
            document.getElementById("est").value = 0;
    };
    HomePage.prototype.ionViewWillEnter = function () {
        var _this = this;
        this.geolocalizar();
        this.localStorage.ready().then(function () {
            _this.localStorage.get("@userSession").then(function (data) {
                if (data != null)
                    _this.usuario = data;
            });
        });
        this.cargarVehiculos();
    };
    HomePage.prototype.changeValue = function (c) {
        var _this = this;
        if (!c.expandible) {
            var loading_1 = this.loadingCtrl.create();
            loading_1.present();
            this.restService.getToken().timeout(this.restService.timeOver).subscribe(function (data) {
                if (data == null) {
                    loading_1.dismiss();
                    _this.alertaService.warnAlert(_this.restService.headerValidacion, _this.restService.mensajeValidacionAdmin, null);
                }
                else {
                    var body = new __WEBPACK_IMPORTED_MODULE_10__angular_common_http__["d" /* HttpParams */]();
                    var armaUrl = "gasoline/price/" + c.id;
                    _this.restService.restServiceGETToken(armaUrl, new __WEBPACK_IMPORTED_MODULE_10__angular_common_http__["d" /* HttpParams */](), data.toString()).timeout(_this.restService.timeOver).subscribe(function (dataEstacionPrecio) {
                        if (Object.keys(dataEstacionPrecio['Response']).length != 0) {
                            var arrayPrecios = dataEstacionPrecio['Response'];
                            c.precioMagna = arrayPrecios[0].Price;
                            c.precioPremium = arrayPrecios[1].Price;
                            c.precioDiesel = arrayPrecios[2].Price;
                            c.expandible = true;
                        }
                        else {
                            _this.alertaService.errorAlert(_this.restService.headerValidacion, "La estación no cuenta con precios", null);
                        }
                        loading_1.dismiss();
                    }, function (error) {
                        console.log(error);
                        _this.alertaService.errorAlert(_this.restService.headerError, _this.restService.mensajeError, null);
                    });
                }
            }, function (error) {
                loading_1.dismiss();
                console.log(error);
                _this.alertaService.errorAlert(_this.restService.headerError, _this.restService.mensajeError, null);
            });
        }
        else {
            c.expandible = !c.expandible;
        }
    };
    HomePage.prototype.agregarAuto = function () {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_3__agrega_auto_agrega_auto__["a" /* AgregaAutoPage */]);
    };
    HomePage.prototype.openIfoCar = function (vehiculo) {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_4__mi_auto_mi_auto__["a" /* MiAutoPage */], { vehiculo: vehiculo });
    };
    HomePage.prototype.presentPopover = function (myEvent) {
        var popover = this.popoverCtrl.create(__WEBPACK_IMPORTED_MODULE_5__home_credito_estaciones_list_home_estaciones_list__["a" /* HomeEstacionesListPage */], { estaciones: this.estaciones });
        popover.present({
            ev: myEvent
        });
    };
    HomePage.prototype.verificarConfirmacion = function () {
        var _this = this;
        this.restService.getToken().timeout(this.restService.timeOver).subscribe(function (data) {
            if (data == null) {
                _this.alertaService.warnAlert(_this.restService.headerValidacion, _this.restService.mensajeValidacionAdmin, null);
            }
            else {
                var body = new __WEBPACK_IMPORTED_MODULE_10__angular_common_http__["d" /* HttpParams */]();
                _this.restService.restServiceGETToken("user/confirmacion/" + _this.usuario.Id, body, data.toString()).timeout(_this.restService.timeOver).subscribe(function (dataRegistroLast) {
                    if (undefined != dataRegistroLast) {
                        if (dataRegistroLast == 0) {
                            var alert_1 = _this.alertCtrl.create({
                                title: "¡Confirma tu correo electrónico!",
                                subTitle: "Es necesario que confirmes tu cuenta de correo electrónico.",
                                cssClass: 'warnAlert',
                                enableBackdropDismiss: false,
                                buttons: [
                                    {
                                        text: 'Aceptar',
                                        handler: function () {
                                        }
                                    },
                                    {
                                        text: 'Reenviar correo',
                                        handler: function () {
                                            _this.reenviarCorreo(1);
                                        }
                                    }
                                ]
                            });
                            alert_1.present();
                        }
                        if (dataRegistroLast == -2) {
                            var alert_2 = _this.alertCtrl.create({
                                title: "¡No has confirmado tu correo electrónico!",
                                subTitle: "Confirma desde tu correo electrónico y reinicia la aplicación.",
                                cssClass: 'errorAlert',
                                enableBackdropDismiss: false,
                                buttons: [
                                    {
                                        text: 'Reenviar correo',
                                        handler: function () {
                                            _this.reenviarCorreo();
                                        }
                                    }
                                ]
                            });
                            alert_2.present();
                        }
                    }
                }, function (error) {
                    console.log(error);
                    _this.alertaService.errorAlert(_this.restService.headerError, _this.restService.mensajeError, null);
                });
            }
        }, function (error) {
            console.log(error);
            _this.alertaService.errorAlert(_this.restService.headerError, _this.restService.mensajeError, null);
        });
    };
    HomePage.prototype.reenviarCorreo = function (id) {
        var _this = this;
        if (id === void 0) { id = 0; }
        this.restService.getToken().timeout(this.restService.timeOver).subscribe(function (data) {
            if (data == null) {
                _this.alertaService.warnAlert(_this.restService.headerValidacion, _this.restService.mensajeValidacionAdmin, null);
            }
            else {
                _this.restService.restServicePOSTToken("user/correoconfirmacion/" + _this.usuario.Id, new __WEBPACK_IMPORTED_MODULE_10__angular_common_http__["d" /* HttpParams */](), data.toString()).timeout(_this.restService.timeOver).subscribe(function (dataRegistroLast) {
                    if (undefined != dataRegistroLast) {
                        if (dataRegistroLast == 1) {
                            if (id == 1)
                                _this.alertaService.alertaBasica("¡Reenvío de correo electrónico!", "Se ha enviado el correo de confirmación. Confirma desde tu correo electrónico.", null);
                            else
                                _this.alertaService.alertaSinSalida("¡Reenvío de correo electrónico!", "Se ha enviado el correo de confirmación. Confirma desde tu correo electrónico y reinicia la aplicación.");
                        }
                    }
                }, function (error) {
                    console.log(error);
                    _this.alertaService.errorAlert(_this.restService.headerError, _this.restService.mensajeError, null);
                });
            }
        }, function (error) {
            console.log(error);
            _this.alertaService.errorAlert(_this.restService.headerError, _this.restService.mensajeError, null);
        });
    };
    HomePage.prototype.obtenerCercana = function () {
        var _this = this;
        this.restService.getToken().timeout(this.restService.timeOver).subscribe(function (data) {
            if (data == null) {
                _this.alertaService.warnAlert(_this.restService.headerValidacion, _this.restService.mensajeValidacionAdmin, null);
            }
            else {
                var body = new __WEBPACK_IMPORTED_MODULE_10__angular_common_http__["d" /* HttpParams */]();
                if (_this.latOrigen != 0 && _this.longOrigen != 0) {
                    _this.restService.restServiceGETToken("station", body, data.toString()).timeout(_this.restService.timeOver).subscribe(function (dataRegistro) {
                        if (Object.keys(dataRegistro['Response']).length != 0) {
                            var arrayEstaciones = dataRegistro['Response'];
                            var i = 0;
                            var distancia = 0;
                            var numcercano = 0;
                            for (var index = 0; index < arrayEstaciones.length; index++) {
                                var estacion = arrayEstaciones[index];
                                if (index == 0) {
                                    i = estacion.Id;
                                }
                                var dis = _this.estacionesService.distancia(_this.latOrigen, _this.longOrigen, estacion.Geolat, estacion.Geolng);
                                if (distancia == 0 || dis < distancia) {
                                    distancia = dis;
                                    numcercano = estacion.Id;
                                }
                            }
                            _this.cargarInfo(numcercano);
                        }
                        else {
                            _this.alertaService.warnAlert(_this.restService.headerValidacion, "No se encontraron estaciones", null);
                        }
                    }, function (error) {
                        console.log(error);
                        _this.alertaService.errorAlert(_this.restService.headerError, _this.restService.mensajeError, null);
                    });
                }
                else {
                    document.getElementById("est").value = 1;
                }
            }
        }, function (error) {
            console.log(error);
            _this.alertaService.errorAlert(_this.restService.headerError, _this.restService.mensajeError, null);
            document.getElementById("est").value = -1;
        });
    };
    HomePage.prototype.geolocalizar = function () {
        var _this = this;
        this.latOrigen = 0;
        this.longOrigen = 0;
        var loading = this.loadingCtrl.create();
        loading.present();
        this.geolocation.getCurrentPosition({ timeout: 5000, enableHighAccuracy: true, maximumAge: 0 })
            .then(function (resp) {
            _this.latOrigen = resp.coords.latitude;
            _this.longOrigen = resp.coords.longitude;
            _this.obtenerCercana();
            loading.dismiss();
        })
            .catch(function (error) {
            console.log('Error getting location', error);
            console.log(error);
            loading.dismiss();
            var alert = _this.alertCtrl.create({
                title: _this.restService.headerError,
                message: "Favor de revisar su conexión a internet y/o permisos de gps",
                cssClass: 'alertCustomCss2',
                buttons: [
                    {
                        text: 'Reintentar',
                        handler: function () {
                            _this.geolocalizar();
                        }
                    },
                    {
                        text: 'Cancelar',
                        handler: function () {
                            _this.cargarInfo(1);
                        }
                    }
                ]
            });
            alert.present();
        });
    };
    HomePage.prototype.llaveroNuevo = function () {
        console.log(this.usuario.Id);
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_3__agrega_auto_agrega_auto__["a" /* AgregaAutoPage */]);
        /*const bodys = new HttpParams()
        .set('IdUsuario', this.usuario.Id)
        .set('den', this.usuario.Nombre);
          this.restService.getToken().timeout(this.restService.timeOver).subscribe(data => {
                  this.restService.restServicePOSTToken("llavero", bodys,data.toString()).timeout(this.restService.timeOver).subscribe(
                    dataRegistroLast => {
                      console.log(dataRegistroLast);
                      if(dataRegistroLast > 0){
                        this.alertaService.alertaBasica("Registro de llavero","Tu llavero se ha generado con éxito!",null);
                      this.localStorage.ready().then(() => {
                        this.localStorage.get(`@userSession`).then((data2) => {
                          data2.LlaveroContado = dataRegistroLast;
                          this.localStorage.set(`@userSession`, data2);
                          this.usuario = data2;
                        });
                      });
                      }
                      
                  }, error => {
                    console.log(error);
                    this.alertaService.errorAlert(this.restService.headerError, this.restService.mensajeError, null);
                  }
                );
                }
                , error => {
                  console.log(error);
                  this.alertaService.errorAlert(this.restService.headerError, this.restService.mensajeError, null);
                });*/
    };
    HomePage.prototype.llaveroExistente = function () {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_6__agrega_auto_escaner_agrega_auto_escaner__["a" /* AgregaAutoEscanerPage */]);
    };
    HomePage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-home',template:/*ion-inline-start:"C:\Users\Administrador\kenergy\src\pages\home\home.html"*/'<ng-container *ngIf="usuario != null">\n<ion-header>\n    <ion-navbar color="titulo">\n        <button ion-button menuToggle>\n            <ion-icon name="menu"></ion-icon>\n        </button>\n        <ion-title class="tituloHeader">BIENVENID@<br/>{{usuario.Alias != "" ? usuario.Alias : usuario.Nombre}}</ion-title>\n    </ion-navbar>\n</ion-header>\n\n<ion-content padding class="contentHome" style="\nbackground-image: url(assets/imgs/fondo.jpg); \nbackground-size: 100%;\nbackground-position: bottom center;\nbackground-repeat: no-repeat;"\n[style.background-color]="algunAuto ? \'white\' : \'#011432\'">\n    \n    <input type="hidden" id="est"/>\n    <ng-container *ngIf="algunAuto">\n        <div class="animated fadeIn divGasoline">\n            <ion-list>\n                <div *ngFor="let c of combustibles">\n        <!--            <div class="expandible" (click)="changeValue(c)">-->\n                    <div class="expandible" (click)="presentPopover($event)">\n                        <ion-icon name="pin"></ion-icon>\n        \n                        <div class="nombreEstacion">{{c.nombre}}</div>\n                        <ion-icon name="more" style="background-image: url(assets/imgs/home/more.png);" class="more"></ion-icon>\n        <!--                <ion-icon name="arrow-up" *ngIf="c.expandible"></ion-icon>-->\n                    </div>\n                    <div *ngIf="c.expandible" class="animated fadeIn">\n                            <div class="containerGas">\n                                <img src="assets/imgs/home/verde.png" alt="logo" class="animated bounceInDown imageGas" />\n                                <div class="precioGas" style="font-size: 190%;">\n                                    ${{c.precioMagna}}\n                                </div>\n                            </div>\n                            <div class="containerGas">\n                                <img src="assets/imgs/home/rojo.png" alt="logo" class="animated bounceInDown imageGas" />\n                                <div class="precioGas" style="font-size: 190%;">\n                                    ${{c.precioPremium}}\n                                </div>\n                            </div>\n                            <div class="containerGas">\n                                <img src="assets/imgs/home/negro.png" alt="logo" class="animated bounceInDown imageGas" />\n                                <div class="precioGas" style="font-size: 190%;">\n                                    ${{c.precioDiesel}}\n                                </div>\n                            </div>\n                        </div>\n                </div>\n            \n            </ion-list>\n        </div>\n    </ng-container>\n\n    <ng-container *ngIf="!algunAuto">\n        <div class="animated fadeIn divGasoline" style="filter: brightness(40%);">\n            <ion-list>\n                <div *ngFor="let c of combustibles">\n        <!--            <div class="expandible" (click)="changeValue(c)">-->\n                    <div class="expandible">\n                        <ion-icon name="pin"></ion-icon>\n        \n                        <div class="nombreEstacion">{{c.nombre}}</div>\n                        <ion-icon name="more" style="background-image: url(assets/imgs/home/more.png);" class="more"></ion-icon>\n        <!--                <ion-icon name="arrow-up" *ngIf="c.expandible"></ion-icon>-->\n                    </div>\n                    <div *ngIf="c.expandible" class="animated fadeIn">\n                            <div class="containerGas">\n                                <img src="assets/imgs/home/verde.png" alt="logo" class="animated bounceInDown imageGas" />\n                                <div class="precioGas" style="font-size: 190%;">\n                                    ${{c.precioMagna}}\n                                </div>\n                            </div>\n                            <div class="containerGas">\n                                <img src="assets/imgs/home/rojo.png" alt="logo" class="animated bounceInDown imageGas" />\n                                <div class="precioGas" style="font-size: 190%;">\n                                    ${{c.precioPremium}}\n                                </div>\n                            </div>\n                            <div class="containerGas">\n                                <img src="assets/imgs/home/negro.png" alt="logo" class="animated bounceInDown imageGas" />\n                                <div class="precioGas" style="font-size: 190%;">\n                                    ${{c.precioDiesel}}\n                                </div>\n                            </div>\n                        </div>\n                </div>\n            \n            </ion-list>\n        </div>\n    </ng-container>\n    <div class="tituloAutos animated rubberBand" style="background-color: #2976E4; text-align: center; margin: 0 auto;">\n        <div class="clm divPresentacionAutos tituloHeader">{{usuario.LlaveroContado == 0 ? "Registra tu llavero Amigo Fiel" : "Llavero Amigo Fiel No. " + usuario.LlaveroContado}}</div>\n        <!--<ion-col><button ion-button class="tituloHeader botonGuardar" style="background-color: #c1272d;" (click)="llaveroNuevo()">Nuevo</button></ion-col>-->\n        <button *ngIf="usuario.LlaveroContado == 0" ion-button class="tituloHeader botonGuardar" style="background-color: #c1272d;" (click)="llaveroExistente()">Agregar llavero</button>\n    </div>\n\n    <div *ngIf="usuario.LlaveroContado > 0" class="tituloAutos animated rubberBand" (click)="agregarAuto()">\n        <div class="clm divPresentacionAutos tituloHeader">MIS AUTOS</div>\n        <ion-icon name="add" class="add clm"></ion-icon>\n    </div>\n    <!--  -->\n    \n    <img src="assets/imgs/home/click.gif" (click)="agregarAuto()" *ngIf="!algunAuto" class="imgclic"> \n\n      \n<ion-refresher slot="fixed" (ionRefresh)="cargarVehiculos1($event)">\n    <ion-refresher-content\n      pullingIcon="arrow-dropdown"\n      pullingText="Arrastra para actualizar"\n      refreshingSpinner="circles"\n      refreshingText="Actualizando...">\n      </ion-refresher-content>\n  </ion-refresher>\n      \n    <ion-list class="lista">\n        <ion-item class="animated rubberBand itemVehiculo" *ngFor="let vehiculo of vehiculos" \n        [ngStyle]="{\'background-color\': vehiculo.circula == 1 ? \'#ff0000\' : \'#001432\'}" (click)="openIfoCar(vehiculo)">\n            <ion-avatar item-start>\n                <img *ngIf="vehiculo.posicion < 6 && vehiculo.puntos > 0" [src]="getMedalla(vehiculo.posicion)">\n            </ion-avatar>\n            <div style="width: 80%;">\n                <div class="clm widthFull">\n                    <h1  class="clm">{{vehiculo.den}}</h1>\n                    <p>{{vehiculo.placa}}</p>\n                    <div class="puntosveh">{{vehiculo.puntos}} Pts.</div>\n                </div>\n                <img *ngIf="vehiculo.tipo == 1" src="assets/imgs/home/92.png" class="imagenEnd tipoGas" style="width: 20px;margin-top: -50px;left: 116%;">\n         		 <img *ngIf="vehiculo.tipo == 2" src="assets/imgs/home/87.png" class="imagenEnd tipoGas" style="width: 20px;margin-top: -50px;left: 116%;">\n         		 <img *ngIf="vehiculo.tipo == 3" src="assets/imgs/home/45.png" class="imagenEnd tipoGas" style="width: 20px;margin-top: -50px;left: 116%;">\n                <div class="clm widthFull">\n                		\n                    <img *ngIf="vehiculo.circula == 1" class="imagenEnd tipoGas" src="assets/imgs/home/noCircula.png" style="width: 32px;margin-top: -23px;left: 112%;">\n                </div>\n            </div>\n\n        </ion-item>\n    </ion-list>\n\n</ion-content>\n\n<ion-fab top right class="animated swing">\n    <button ion-fab color="light" (click)="mostrarNotif.abrirNotificacion()">\n        <img src="assets/imgs/home/gas-station.png" alt="logo" class="claseImg animated fadeIn" />\n    </button>\n    <button *ngIf="notificacion.num > 0" ion-fab color="light" (click)="mostrarNotif.abrirNotificacion()" class="miniBoton">\n        {{notificacion.num}}\n    </button>\n</ion-fab>\n\n</ng-container>'/*ion-inline-end:"C:\Users\Administrador\kenergy\src\pages\home\home.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* NavController */], __WEBPACK_IMPORTED_MODULE_7__ionic_storage__["b" /* Storage */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["m" /* NavParams */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["o" /* PopoverController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* ModalController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* LoadingController */], __WEBPACK_IMPORTED_MODULE_8__providers_alerta_service__["a" /* AlertaServiceProvider */], __WEBPACK_IMPORTED_MODULE_9__providers_rest_service__["a" /* RestServiceProvider */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* MenuController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["c" /* Events */],
            __WEBPACK_IMPORTED_MODULE_11__ionic_native_sqlite__["a" /* SQLite */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["b" /* AlertController */], __WEBPACK_IMPORTED_MODULE_12__services_usuario_service__["a" /* UsuarioService */],
            __WEBPACK_IMPORTED_MODULE_14__services_notificaciones_service__["a" /* NotificacionService */], __WEBPACK_IMPORTED_MODULE_13__services_abrirnotificaciones_service__["a" /* AbrirnotificacionesService */],
            __WEBPACK_IMPORTED_MODULE_15__services_estaciones_service__["a" /* EstacionesService */], __WEBPACK_IMPORTED_MODULE_16__ionic_native_geolocation__["a" /* Geolocation */]])
    ], HomePage);
    return HomePage;
}());

//# sourceMappingURL=home.js.map

/***/ }),

/***/ 662:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return NotificacionModel; });
var NotificacionModel = /** @class */ (function () {
    function NotificacionModel(id, titulo, fecha, mensaje, mostrar, visto) {
        if (id === void 0) { id = null; }
        if (titulo === void 0) { titulo = ""; }
        if (fecha === void 0) { fecha = ""; }
        if (mensaje === void 0) { mensaje = ""; }
        if (mostrar === void 0) { mostrar = false; }
        if (visto === void 0) { visto = false; }
        this.id = id;
        this.titulo = titulo;
        this.fecha = fecha;
        this.mensaje = mensaje;
        this.mostrar = mostrar;
        this.visto = visto;
    }
    return NotificacionModel;
}());

//# sourceMappingURL=notificacionModel.js.map

/***/ }),

/***/ 663:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AgregaAutoInfoPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(2);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


/**
 * Generated class for the AgregaAutoInfoPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var AgregaAutoInfoPage = /** @class */ (function () {
    function AgregaAutoInfoPage(navCtrl, navParams) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.Id = 0;
        this.Puntos = 0;
        this.Id = navParams.get("Id");
        this.Puntos = navParams.get("Puntos");
    }
    AgregaAutoInfoPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad AgregaAutoInfoPage');
    };
    AgregaAutoInfoPage.prototype.aceptar = function () {
        this.navCtrl.pop();
    };
    AgregaAutoInfoPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-agrega-auto-info',template:/*ion-inline-start:"C:\Users\Administrador\kenergy\src\pages\agrega-auto-info\agrega-auto-info.html"*/'<ion-header>\n  <ion-navbar color="titulo">\n    <button ion-button menuToggle>\n      <ion-icon name="menu"></ion-icon>\n    </button>\n    <ion-title class="tituloHeader" style="position: absolute;left: 25%; top: 33%;">Agregar Auto</ion-title>\n    <ion-buttons left *ngIf="!isOn" class="animated fadeIn">\n      <button icon-only="" ion-button="" class="disable-hover bar-button bar-button-ios bar-button-default bar-button-default-ios">\n        <span class="button-inner">\n          <img src="assets/imgs/miAuto/carro.png" style="width: 65%;margin-left: -27px;">\n        </span>\n        <div class="button-effect">\n        </div>\n      </button>\n    </ion-buttons>\n  </ion-navbar>\n</ion-header>\n\n\n<ion-content padding style="\nbackground-image: url(assets/imgs/fondo.jpg); \nbackground-size: 100%;\nbackground-position: bottom center;\nbackground-repeat: no-repeat;\nbackground-color: white;">\n  <div class="tituloHeader" style="margin-top:20%;font-size: 160%;\n  text-align: center;">\n    Cliente / Auto\n  </div>\n  <div style="font-family: arcadeclassicregular;font-size: 203%;\n  text-align: center;">\n    {{Id}}\n  </div>\n  <div class="tituloHeader" style="margin-top:20%;font-size: 160%;\n  text-align: center;">\n    Tu Saldo en Puntos es de:\n  </div>\n  <div style="font-size: 203%;\n  text-align: center;">\n    {{Puntos}}\n  </div>\n  <div class="centro">\n    <button ion-button color="naranja" class="tituloHeader botonGuardar" (click)="aceptar()">Aceptar</button>\n  </div>\n\n\n  <!--<div style="text-align: -webkit-center;margin-top: 10%;">\n    <div style="background-color: #009245;\n    width: 12%;\n    color: #fff;\n    padding: 6px;\n    font-size: 135%;\n    border-radius: 5px;" (click)="ingresar()">OK</div>\n  </div>-->\n</ion-content>'/*ion-inline-end:"C:\Users\Administrador\kenergy\src\pages\agrega-auto-info\agrega-auto-info.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["m" /* NavParams */]])
    ], AgregaAutoInfoPage);
    return AgregaAutoInfoPage;
}());

//# sourceMappingURL=agrega-auto-info.js.map

/***/ }),

/***/ 664:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MenuModel; });
var MenuModel = /** @class */ (function () {
    function MenuModel(nombre, img, color, component, parametro, parametro2) {
        if (parametro === void 0) { parametro = null; }
        if (parametro2 === void 0) { parametro2 = null; }
        this.nombre = nombre;
        this.img = img;
        this.color = color;
        this.component = component;
        this.parametro = parametro;
        this.parametro2 = parametro2;
    }
    return MenuModel;
}());

//# sourceMappingURL=MenuModel.js.map

/***/ }),

/***/ 665:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ContactoModel; });
var ContactoModel = /** @class */ (function () {
    function ContactoModel(imagen, telefono, descripcion) {
        if (imagen === void 0) { imagen = ""; }
        if (telefono === void 0) { telefono = ""; }
        if (descripcion === void 0) { descripcion = ""; }
        this.imagen = imagen;
        this.telefono = telefono;
        this.descripcion = descripcion;
    }
    return ContactoModel;
}());

//# sourceMappingURL=contactoModel.js.map

/***/ }),

/***/ 666:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return PremioModel; });
var PremioModel = /** @class */ (function () {
    function PremioModel(descripcion, canje, canjeOpcional, monto, img, nombre, detalle, id, clave, seleccionado, seleccionado2) {
        if (descripcion === void 0) { descripcion = ""; }
        if (canje === void 0) { canje = null; }
        if (canjeOpcional === void 0) { canjeOpcional = 0; }
        if (monto === void 0) { monto = 0; }
        if (img === void 0) { img = ""; }
        if (nombre === void 0) { nombre = ""; }
        if (detalle === void 0) { detalle = ""; }
        if (id === void 0) { id = 0; }
        if (clave === void 0) { clave = ""; }
        if (seleccionado === void 0) { seleccionado = false; }
        if (seleccionado2 === void 0) { seleccionado2 = false; }
        this.descripcion = descripcion;
        this.canje = canje;
        this.canjeOpcional = canjeOpcional;
        this.monto = monto;
        this.img = img;
        this.nombre = nombre;
        this.detalle = detalle;
        this.id = id;
        this.clave = clave;
        this.seleccionado = seleccionado;
        this.seleccionado2 = seleccionado2;
    }
    return PremioModel;
}());

//# sourceMappingURL=premioModel.js.map

/***/ }),

/***/ 667:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return PromocionModel; });
var PromocionModel = /** @class */ (function () {
    function PromocionModel(titulo, descripcion, img, terminos) {
        if (titulo === void 0) { titulo = ""; }
        if (descripcion === void 0) { descripcion = ""; }
        if (img === void 0) { img = ""; }
        if (terminos === void 0) { terminos = ""; }
        this.titulo = titulo;
        this.descripcion = descripcion;
        this.img = img;
        this.terminos = terminos;
    }
    return PromocionModel;
}());

//# sourceMappingURL=promocionModel.js.map

/***/ }),

/***/ 668:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ClienteFacturaModel; });
var ClienteFacturaModel = /** @class */ (function () {
    function ClienteFacturaModel(id, rfc, email, razon) {
        if (id === void 0) { id = 0; }
        this.id = id;
        this.rfc = rfc;
        this.email = email;
        this.razon = razon;
    }
    return ClienteFacturaModel;
}());

//# sourceMappingURL=clienteFacturaModel.js.map

/***/ }),

/***/ 669:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return FacturaModel; });
var FacturaModel = /** @class */ (function () {
    function FacturaModel(numeroCliente, rfc, razonSocial, correoElectronico, calle, numeroExterior, numeroInterior, codigoPostal, estado, municipio, colonia, id, 
        //factura cobrada
        modelo, fecha, monto) {
        if (numeroCliente === void 0) { numeroCliente = ""; }
        if (rfc === void 0) { rfc = ""; }
        if (razonSocial === void 0) { razonSocial = ""; }
        if (correoElectronico === void 0) { correoElectronico = ""; }
        if (calle === void 0) { calle = ""; }
        if (numeroExterior === void 0) { numeroExterior = ""; }
        if (numeroInterior === void 0) { numeroInterior = ""; }
        if (codigoPostal === void 0) { codigoPostal = ""; }
        if (estado === void 0) { estado = ""; }
        if (municipio === void 0) { municipio = ""; }
        if (colonia === void 0) { colonia = ""; }
        if (id === void 0) { id = null; }
        if (modelo === void 0) { modelo = ""; }
        if (fecha === void 0) { fecha = ""; }
        if (monto === void 0) { monto = null; }
        this.numeroCliente = numeroCliente;
        this.rfc = rfc;
        this.razonSocial = razonSocial;
        this.correoElectronico = correoElectronico;
        this.calle = calle;
        this.numeroExterior = numeroExterior;
        this.numeroInterior = numeroInterior;
        this.codigoPostal = codigoPostal;
        this.estado = estado;
        this.municipio = municipio;
        this.colonia = colonia;
        this.id = id;
        this.modelo = modelo;
        this.fecha = fecha;
        this.monto = monto;
    }
    return FacturaModel;
}());

//# sourceMappingURL=facturaModel.js.map

/***/ }),

/***/ 670:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return EstadoCuentaModel; });
var EstadoCuentaModel = /** @class */ (function () {
    function EstadoCuentaModel(saldoFavor, pendienteFacturar, saldoFacturado, saldoAcumulado, saldoDisponible, estacion, creditoTotal) {
        if (saldoFavor === void 0) { saldoFavor = ""; }
        if (pendienteFacturar === void 0) { pendienteFacturar = ""; }
        if (saldoFacturado === void 0) { saldoFacturado = ""; }
        if (saldoAcumulado === void 0) { saldoAcumulado = ""; }
        if (saldoDisponible === void 0) { saldoDisponible = ""; }
        if (estacion === void 0) { estacion = ""; }
        if (creditoTotal === void 0) { creditoTotal = ""; }
        this.saldoFavor = saldoFavor;
        this.pendienteFacturar = pendienteFacturar;
        this.saldoFacturado = saldoFacturado;
        this.saldoAcumulado = saldoAcumulado;
        this.saldoDisponible = saldoDisponible;
        this.estacion = estacion;
        this.creditoTotal = creditoTotal;
    }
    return EstadoCuentaModel;
}());

//# sourceMappingURL=estadoCuentaModel.js.map

/***/ }),

/***/ 671:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return VehicleResponse; });
var VehicleResponse = /** @class */ (function () {
    function VehicleResponse(Id, Bloqueado, Descripcion, Estado, Responsable, Placas, Kilometraje, DiaCarga, Hraini, Hrafin, Hraini2, Hrafin2, Hraini3, Hrafin3, Estacion, Combustible, LimiteCarga, LimiteDia, LimiteSemana, LimiteMes) {
        if (Id === void 0) { Id = 0; }
        if (Bloqueado === void 0) { Bloqueado = 0; }
        if (Descripcion === void 0) { Descripcion = ""; }
        if (Estado === void 0) { Estado = ""; }
        if (Responsable === void 0) { Responsable = ""; }
        if (Placas === void 0) { Placas = ""; }
        if (Kilometraje === void 0) { Kilometraje = 0; }
        if (DiaCarga === void 0) { DiaCarga = 0; }
        if (Hraini === void 0) { Hraini = ""; }
        if (Hrafin === void 0) { Hrafin = ""; }
        if (Hraini2 === void 0) { Hraini2 = ""; }
        if (Hrafin2 === void 0) { Hrafin2 = ""; }
        if (Hraini3 === void 0) { Hraini3 = ""; }
        if (Hrafin3 === void 0) { Hrafin3 = ""; }
        if (Estacion === void 0) { Estacion = 0; }
        if (Combustible === void 0) { Combustible = 0; }
        if (LimiteCarga === void 0) { LimiteCarga = 0; }
        if (LimiteDia === void 0) { LimiteDia = 0; }
        if (LimiteSemana === void 0) { LimiteSemana = 0; }
        if (LimiteMes === void 0) { LimiteMes = 0; }
        this.Id = Id;
        this.Bloqueado = Bloqueado;
        this.Descripcion = Descripcion;
        this.Estado = Estado;
        this.Responsable = Responsable;
        this.Placas = Placas;
        this.Kilometraje = Kilometraje;
        this.DiaCarga = DiaCarga;
        this.Hraini = Hraini;
        this.Hrafin = Hrafin;
        this.Hraini2 = Hraini2;
        this.Hrafin2 = Hrafin2;
        this.Hraini3 = Hraini3;
        this.Hrafin3 = Hrafin3;
        this.Estacion = Estacion;
        this.Combustible = Combustible;
        this.LimiteCarga = LimiteCarga;
        this.LimiteDia = LimiteDia;
        this.LimiteSemana = LimiteSemana;
        this.LimiteMes = LimiteMes;
    }
    return VehicleResponse;
}());

//# sourceMappingURL=vehicleResponse.js.map

/***/ }),

/***/ 672:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return FacturaCreditoModel; });
var FacturaCreditoModel = /** @class */ (function () {
    function FacturaCreditoModel(folio, estacion, fecha, monto, id, idSuc) {
        if (folio === void 0) { folio = ""; }
        if (estacion === void 0) { estacion = ""; }
        if (fecha === void 0) { fecha = ""; }
        if (monto === void 0) { monto = 0; }
        if (id === void 0) { id = 0; }
        if (idSuc === void 0) { idSuc = 0; }
        this.folio = folio;
        this.estacion = estacion;
        this.fecha = fecha;
        this.monto = monto;
        this.id = id;
        this.idSuc = idSuc;
    }
    return FacturaCreditoModel;
}());

//# sourceMappingURL=facturaCreditoModel.js.map

/***/ }),

/***/ 673:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return GrupoModel; });
var GrupoModel = /** @class */ (function () {
    function GrupoModel(Id, Corporativo, Url) {
        if (Id === void 0) { Id = 0; }
        if (Corporativo === void 0) { Corporativo = "[--Grupo Gasolinero--]"; }
        if (Url === void 0) { Url = ""; }
        this.Id = Id;
        this.Corporativo = Corporativo;
        this.Url = Url;
    }
    return GrupoModel;
}());

//# sourceMappingURL=grupoModel.js.map

/***/ }),

/***/ 674:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ConsultaPuntosPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__models_productoModel__ = __webpack_require__(47);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__providers_alerta_service__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__providers_rest_service__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__angular_common_http__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__ionic_storage__ = __webpack_require__(15);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};







var ConsultaPuntosPage = /** @class */ (function () {
    function ConsultaPuntosPage(navCtrl, navParams, localStorage, alertaService, restService, loadingCtrl) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.localStorage = localStorage;
        this.alertaService = alertaService;
        this.restService = restService;
        this.loadingCtrl = loadingCtrl;
        this.infoPuntos = [];
        this.totalPuntos = 240;
        this.vehiculos = [];
        this.idVehiculo = 0;
        this.usuario = null;
        this.openSesion();
    }
    ConsultaPuntosPage.prototype.openSesion = function () {
        var _this = this;
        this.localStorage.ready().then(function () {
            _this.localStorage.get("@userSession").then(function (data) {
                if (data != null) {
                    _this.usuario = data;
                    _this.cargarCombos();
                    _this.cargarRegistros();
                }
                else {
                    _this.alertaService.warnAlert(_this.restService.headerValidacion, "Usuario sin sesión, no se cargarán sus datos", null);
                }
            });
        });
    };
    ConsultaPuntosPage.prototype.cargarCombos = function () {
        var _this = this;
        var loading = this.loadingCtrl.create();
        loading.present();
        this.vehiculos = [];
        this.vehiculos.push(new __WEBPACK_IMPORTED_MODULE_2__models_productoModel__["a" /* ProductoModel */](0, "Vehículo"));
        this.restService.getToken().timeout(this.restService.timeOver).subscribe(function (data) {
            if (data == null) {
                loading.dismiss();
                _this.alertaService.warnAlert(_this.restService.headerValidacion, _this.restService.mensajeValidacionAdmin, null);
            }
            else {
                var body = new __WEBPACK_IMPORTED_MODULE_5__angular_common_http__["d" /* HttpParams */]();
                var a = _this.usuario.Id;
                //var a = 44;
                //body.append("IdClient", a.toString());
                var urlArmada = "stats/regular/" + a;
                //var urlArmada = "stats/"+this.usuario.IdClient;
                _this.restService.restServiceGETToken(urlArmada, body, data.toString()).timeout(_this.restService.timeOver).subscribe(function (dataRegistro) {
                    if (Object.keys(dataRegistro['Response']).length != 0) {
                        var vehiculos = dataRegistro['Response'].Vehiculo;
                        vehiculos.forEach(function (vehiculo) {
                            _this.vehiculos.push(new __WEBPACK_IMPORTED_MODULE_2__models_productoModel__["a" /* ProductoModel */](vehiculo.Id, vehiculo.Nombre));
                        });
                        //this.buscar();
                    }
                    else {
                        _this.alertaService.warnAlert(_this.restService.headerValidacion, "No se cargaron los filtros de búsqueda", null);
                    }
                    loading.dismiss();
                }, function (error) {
                    loading.dismiss();
                    console.log(error);
                    _this.alertaService.errorAlert(_this.restService.headerError, _this.restService.mensajeError, null);
                });
            }
        }, function (error) {
            loading.dismiss();
            console.log(error);
            _this.alertaService.errorAlert(_this.restService.headerError, _this.restService.mensajeError, null);
        });
    };
    ConsultaPuntosPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad ConsultaPuntosPage');
    };
    ConsultaPuntosPage.prototype.consultarPuntos = function () {
        var _this = this;
        if (this.usuario == null) {
            this.alertaService.warnAlert(this.restService.headerValidacion, "Usuario no en sesión", null);
        }
        else {
            var loading_1 = this.loadingCtrl.create();
            loading_1.present();
            this.restService.getToken().timeout(this.restService.timeOver).subscribe(function (data) {
                if (data == null) {
                    loading_1.dismiss();
                    _this.alertaService.warnAlert(_this.restService.headerValidacion, _this.restService.mensajeValidacionAdmin, null);
                }
                else {
                    var body = new __WEBPACK_IMPORTED_MODULE_5__angular_common_http__["d" /* HttpParams */]();
                    var a = _this.usuario.Id;
                    var url = "puntos/" + _this.usuario.Id;
                    //var urlArmada = "stats/"+this.usuario.IdClient;
                    _this.restService.restServiceGETToken(url, body, data.toString()).timeout(_this.restService.timeOver).subscribe(function (dataRegistro) {
                        if (dataRegistro['Response']) {
                            _this.totalPuntos = dataRegistro['Response'];
                            _this.cargarRegistros();
                        }
                        else if (dataRegistro['Message'] != 3) {
                            _this.alertaService.warnAlert(_this.restService.headerValidacion, dataRegistro['Message'], null);
                        }
                        else {
                            _this.alertaService.warnAlert(_this.restService.headerValidacion, "No se encontraron registros de facturación", null);
                        }
                        loading_1.dismiss();
                    }, function (error) {
                        loading_1.dismiss();
                        console.log(error);
                        _this.alertaService.errorAlert(_this.restService.headerError, _this.restService.mensajeError, null);
                    });
                }
            }, function (error) {
                loading_1.dismiss();
                console.log(error);
                _this.alertaService.errorAlert(_this.restService.headerError, _this.restService.mensajeError, null);
            });
        }
    };
    ConsultaPuntosPage.prototype.cargarRegistros = function () {
        var _this = this;
        if (this.usuario == null) {
            this.alertaService.warnAlert(this.restService.headerValidacion, "Usuario no en sesión", null);
        }
        else {
            var loading_2 = this.loadingCtrl.create();
            loading_2.present();
            this.infoPuntos = [];
            this.restService.getToken().timeout(this.restService.timeOver).subscribe(function (data) {
                if (data == null) {
                    loading_2.dismiss();
                    _this.alertaService.warnAlert(_this.restService.headerValidacion, _this.restService.mensajeValidacionAdmin, null);
                }
                else {
                    var body = new __WEBPACK_IMPORTED_MODULE_5__angular_common_http__["d" /* HttpParams */]();
                    var a = _this.usuario.Id;
                    var url = "puntos/detail/" + _this.usuario.Id;
                    //var urlArmada = "stats/"+this.usuario.IdClient;
                    _this.restService.restServiceGETToken(url, body, data.toString()).timeout(_this.restService.timeOver).subscribe(function (dataRegistro) {
                        if (Object.keys(dataRegistro['Response']).length != 0) {
                            var info = dataRegistro['Response'];
                            info.forEach(function (informacion) {
                                var arrayDespachos = [];
                                informacion.Despachos.forEach(function (despacho) {
                                    arrayDespachos.push({ fecha: despacho.Fecha, litros: despacho.Litros, precio: despacho.Efectivo, puntos: despacho.Puntos });
                                });
                                _this.infoPuntos.push({
                                    modelo: informacion.Nombre, puntos: informacion.Puntos, informacion: arrayDespachos
                                });
                            });
                        }
                        else if (dataRegistro['Message'] != 3) {
                            _this.alertaService.warnAlert(_this.restService.headerValidacion, dataRegistro['Message'], null);
                        }
                        else {
                            _this.alertaService.warnAlert(_this.restService.headerValidacion, "No se encontraron registros", null);
                        }
                        loading_2.dismiss();
                    }, function (error) {
                        loading_2.dismiss();
                        console.log(error);
                        _this.alertaService.errorAlert(_this.restService.headerError, _this.restService.mensajeError, null);
                    });
                }
            }, function (error) {
                loading_2.dismiss();
                console.log(error);
                _this.alertaService.errorAlert(_this.restService.headerError, _this.restService.mensajeError, null);
            });
        }
    };
    ConsultaPuntosPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-consulta-puntos',template:/*ion-inline-start:"C:\Users\Administrador\kenergy\src\pages\consulta-puntos\consulta-puntos.html"*/'<ion-header>\n  <ion-navbar color="titulo">\n      <button ion-button menuToggle>\n          <ion-icon name="menu"></ion-icon>\n        </button>\n    <ion-title class="tituloHeader" style="position: absolute;left: 25%; top: 33%;">Consulta tus puntos</ion-title>\n\n\n    <ion-buttons left *ngIf="!isOn" class="animated fadeIn">\n      <button icon-only="" ion-button="" class="disable-hover bar-button bar-button-ios bar-button-default bar-button-default-ios">\n        <span class="button-inner">\n          <img src="assets/imgs/estaciones/ubication.png" style="width: 65%;margin-left: -27px;">\n        </span>\n        <div class="button-effect">\n\n        </div>\n      </button>\n    </ion-buttons>\n  </ion-navbar>\n</ion-header>\n\n\n<ion-content style="\nbackground-image: url(assets/imgs/fondo.jpg); \nbackground-size: 100%;\nbackground-position: center center;">\n\n<div style="width:100%;margin-top: 13px;">\n  <ion-item style="width:100%">\n    <ion-label position="floating" style="color:#1b155c;">Vehiculo</ion-label>\n    <ion-select [(ngModel)]="idVehiculo" style="color:#000" okText="Aceptar" cancelText="Cancelar">\n      <ion-option *ngFor="let vehiculo of vehiculos" value="{{vehiculo.id}}">{{vehiculo.descripcion}}</ion-option>\n    </ion-select>\n  </ion-item>\n  <div style="display: inline-block;width: 56%;\n  text-align: center;">\n    <div style="font-size: 115%;\n    font-weight: 500;">\n      Total Puntos\n    </div>\n    <div style="font-size: 130%;\n    font-weight: 500;color: #001432;">\n      {{totalPuntos}}\n    </div>\n  </div>\n</div>\n\n<div *ngFor="let consulta of infoPuntos">\n  <div style="width:100%"  style="background-color: #001432;height: 30px;margin-top: 15px;">\n    <div class="tituloHeader divAlignTotal">\n      {{consulta.modelo}}\n    </div>\n    <div class="tituloHeader divAlignTotal">\n      \n    </div>\n    <div class="tituloHeader divAlignTotal">\n      Puntos {{consulta.puntos}} \n    </div>\n  </div>\n  <div *ngFor="let info of consulta.informacion" >\n    <div class="tituloHeader divAlign">\n      {{info.fecha}}\n    </div>\n    <div class="tituloHeader divAlign">\n      {{info.litros}} Lts\n    </div>\n    <div class="tituloHeader divAlign">\n      ${{info.precio}}\n    </div>\n    <div class="tituloHeader divAlign">\n      {{info.puntos}}\n    </div>\n  </div>\n</div>\n  \n</ion-content>\n'/*ion-inline-end:"C:\Users\Administrador\kenergy\src\pages\consulta-puntos\consulta-puntos.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["m" /* NavParams */],
            __WEBPACK_IMPORTED_MODULE_6__ionic_storage__["b" /* Storage */],
            __WEBPACK_IMPORTED_MODULE_3__providers_alerta_service__["a" /* AlertaServiceProvider */],
            __WEBPACK_IMPORTED_MODULE_4__providers_rest_service__["a" /* RestServiceProvider */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* LoadingController */]])
    ], ConsultaPuntosPage);
    return ConsultaPuntosPage;
}());

//# sourceMappingURL=consulta-puntos.js.map

/***/ }),

/***/ 685:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return PremiosSolicitudPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_rest_service__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_common_http__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__providers_alerta_service__ = __webpack_require__(7);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var PremiosSolicitudPage = /** @class */ (function () {
    function PremiosSolicitudPage(navCtrl, navParams, viewCtrl, restService, alertaService) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.viewCtrl = viewCtrl;
        this.restService = restService;
        this.alertaService = alertaService;
        this.vehiculos = [];
        this.vehiculosSeleccionados = [];
        this.sumatoria = 0;
        this.sumatoriaCanje = 0;
        this.sumatoriaDisponible = 0;
        this.premios = [];
        this.numCanje = 233;
        this.status = "Solicitado";
        this.usuario = null;
        this.premios = navParams.get("premios");
        this.usuario = navParams.get("usuario");
        this.cargarVehiculos();
        this.sumatoria = this.sumar(this.vehiculos);
        this.sumatoriaCanje = this.sumarCanje(this.vehiculos);
    }
    PremiosSolicitudPage.prototype.ionViewDidLoad = function () {
    };
    PremiosSolicitudPage.prototype.cargarVehiculos = function () {
        var _this = this;
        this.vehiculos = [];
        var armaUrl = "puntos/detail/" + this.usuario.Id;
        this.restService.getToken().timeout(this.restService.timeOver).subscribe(function (data) {
            _this.restService.restServiceGETToken(armaUrl, new __WEBPACK_IMPORTED_MODULE_3__angular_common_http__["d" /* HttpParams */](), data.toString()).timeout(_this.restService.timeOver).subscribe(function (dataAutos) {
                if (dataAutos['Response'] != null && dataAutos['Response'] instanceof Array) {
                    var array = dataAutos['Response'];
                    array.forEach(function (auto) {
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
            }, function (error) {
                console.log(error);
                _this.alertaService.errorAlert(_this.restService.headerError, _this.restService.mensajeError, null);
            });
        }, function (error) {
            console.log(error);
            _this.alertaService.errorAlert(_this.restService.headerError, _this.restService.mensajeError, null);
        });
    };
    PremiosSolicitudPage.prototype.sumar = function (vehiculos) {
        var suma = 0;
        vehiculos.forEach(function (v) {
            suma += v.Puntos;
        });
        return suma;
    };
    PremiosSolicitudPage.prototype.sumarCanje = function (vehiculos) {
        var _this = this;
        var suma = 0;
        this.vehiculosSeleccionados = [];
        vehiculos.forEach(function (v) {
            if (v.selected) {
                suma += v.Puntos;
                _this.vehiculosSeleccionados.push(v);
            }
        });
        return suma;
    };
    PremiosSolicitudPage.prototype.sumarCanjeDisponible = function (vehiculos) {
        var _this = this;
        var suma = 0;
        this.vehiculosSeleccionados = [];
        vehiculos.forEach(function (v) {
            if (v.selected) {
                suma += v.Puntos;
                _this.vehiculosSeleccionados.push(v);
            }
        });
        return suma;
    };
    PremiosSolicitudPage.prototype.updateSumatoria = function () {
        this.sumatoriaCanje = this.sumarCanje(this.vehiculos);
        this.sumatoriaDisponible = this.sumatoria - this.sumatoriaCanje;
    };
    PremiosSolicitudPage.prototype.dismiss = function () {
        this.viewCtrl.dismiss();
    };
    PremiosSolicitudPage.prototype.returnSuma = function () {
        var s = 0;
        this.premios.forEach(function (p) {
            s += p.monto;
        });
        return s;
    };
    PremiosSolicitudPage.prototype.returnPts = function () {
        var s = 0;
        this.premios.forEach(function (p) {
            s += p.canjeOpcional;
        });
        return s;
    };
    PremiosSolicitudPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-premios-solicitud',template:/*ion-inline-start:"C:\Users\Administrador\kenergy\src\pages\premios-solicitud\premios-solicitud.html"*/'<ion-header>\n  <ion-toolbar color="titulo">\n    <ion-title class="tituloHeader" style="position: absolute;left: 11%; top: 35%;">Solicitud de Canje de Puntos</ion-title>\n    \n    <ion-buttons left *ngIf="!isOn" class="animated fadeIn">\n      <button icon-only="" ion-button="" class="disable-hover bar-button bar-button-ios bar-button-default bar-button-default-ios">\n        <span class="button-inner">\n          <img src="assets/imgs/premios/promo.png" style="width: 50%;margin-left: -11px;">\n        </span>\n        <div class="button-effect">\n\n        </div>\n      </button>\n    </ion-buttons>\n\n    <ion-buttons start>\n      <button ion-button (click)="dismiss()">\n        <span color="secundary" showWhen="ios">Cancel</span>\n        <ion-icon name="close" showWhen="android, windows"></ion-icon>\n      </button>\n    </ion-buttons>\n  </ion-toolbar>\n</ion-header>\n\n\n\n<ion-content padding style="\n      background-image: url(assets/imgs/fondo.jpg); \n    background-size: 100%;\n    background-position: bottom center;\n    background-repeat: no-repeat;\n    background-color: white;">\n  <strong style="width:45%;display: inline-block;vertical-align: top;color: #191d69;font-size: 120%;">Desgloce de Canje</strong>\n  <div style="border-bottom: 1px solid #123;">\n    <div style="width:100%" *ngFor="let vehiculo of vehiculos">\n      <div style="width:8%;display: inline-block">\n        <ion-checkbox [(ngModel)]="vehiculo.selected" (ionChange)="updateSumatoria()"></ion-checkbox>\n      </div>\n      <div style="width:45%;display: inline-block;vertical-align: top;color: #191d69;font-size: 120%;">\n        <strong>{{vehiculo.modelo}}</strong>\n      </div>\n      <div style="width:44%;display: inline-block;vertical-align: top;color: #191d69;font-size: 120%;text-align: right;">\n        <strong>{{vehiculo.puntos}} pts</strong>\n      </div>\n    </div>\n  </div>\n  <div style="width:99%;text-align:right;color: #191d69;font-size: 120%;">\n    <strong>Total {{sumatoria}} pts</strong>\n  </div>\n  <div style="width:100%">\n    <div style="width:100%;text-align: right;color: #c5282e;font-size: 120%;display:inline-block">\n      <strong>Puntos Utilizados {{sumatoriaCanje}} pts</strong>\n    </div>\n    <div style="width:100%;text-align: right;color: #2eade2;font-size: 120%;display:inline-block">\n      <strong>Puntos Disponibles {{sumatoriaDisponible}} pts</strong>\n    </div>\n  </div>\n  \n</ion-content>'/*ion-inline-end:"C:\Users\Administrador\kenergy\src\pages\premios-solicitud\premios-solicitud.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["m" /* NavParams */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["p" /* ViewController */],
            __WEBPACK_IMPORTED_MODULE_2__providers_rest_service__["a" /* RestServiceProvider */], __WEBPACK_IMPORTED_MODULE_4__providers_alerta_service__["a" /* AlertaServiceProvider */]])
    ], PremiosSolicitudPage);
    return PremiosSolicitudPage;
}());

//# sourceMappingURL=premios-solicitud.js.map

/***/ }),

/***/ 686:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return RegistroValidaCreditoPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__registro_valida_correo_credito_registro_valida_correo_credito__ = __webpack_require__(377);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__providers_rest_service__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__providers_alerta_service__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__angular_common_http__ = __webpack_require__(9);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};






/**
 * Generated class for the RegistroValidaCreditoPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var RegistroValidaCreditoPage = /** @class */ (function () {
    function RegistroValidaCreditoPage(navCtrl, navParams, menuCtrl, restService, loadingCtrl, alertaService) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.menuCtrl = menuCtrl;
        this.restService = restService;
        this.loadingCtrl = loadingCtrl;
        this.alertaService = alertaService;
        this.email = null;
        this.rfc = null;
        this.username = null;
        this.menuCtrl.enable(false, "authenticated");
    }
    RegistroValidaCreditoPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad RegistroValidaCreditoPage');
    };
    RegistroValidaCreditoPage.prototype.validar = function () {
        var _this = this;
        //this.navCtrl.push(RegistroValidaCorreoCreditoPage);
        if (this.email == undefined || this.rfc == undefined || this.username == undefined ||
            this.email == null || this.rfc == null || this.username == null ||
            this.email.length == 0 || this.rfc.length == 0 || this.username.length == 0) {
            this.alertaService.warnAlert(this.restService.headerValidacion, "Favor de capturar todos los datos", null);
            return;
        }
        var loading = this.loadingCtrl.create();
        loading.present();
        this.restService.getToken().timeout(this.restService.timeOver).subscribe(function (data) {
            if (data == null) {
                loading.dismiss();
                _this.alertaService.warnAlert(_this.restService.headerValidacion, _this.restService.mensajeValidacionAdmin, null);
            }
            else {
                var body = new __WEBPACK_IMPORTED_MODULE_5__angular_common_http__["d" /* HttpParams */]();
                /*body.append("Email",this.email);
                body.append("RFC",this.rfc);
                body.append("Username",this.username);*/
                /*body.append("Email","demo@grupotabar.com");
                body.append("RFC","APR-960919-4H4");
                body.append("Username","NO USR");*/
                var bodys = new __WEBPACK_IMPORTED_MODULE_5__angular_common_http__["d" /* HttpParams */]()
                    .set('Email', _this.email)
                    .set('RFC', _this.rfc)
                    .set('Username', _this.username);
                _this.restService.restServicePOSTTokenXForm("user/onegoal", bodys, data.toString()).timeout(_this.restService.timeOver).subscribe(function (dataRegistro) {
                    if (Object.keys(dataRegistro['Response']).length != 0) {
                        _this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_2__registro_valida_correo_credito_registro_valida_correo_credito__["a" /* RegistroValidaCorreoCreditoPage */]);
                    }
                    else {
                        _this.alertaService.warnAlert(_this.restService.headerValidacion, "Verifica tus datos, no se encontraron en el sistema", null);
                    }
                    loading.dismiss();
                }, function (error) {
                    loading.dismiss();
                    console.log(error);
                    _this.alertaService.errorAlert(_this.restService.headerError, _this.restService.mensajeError, null);
                });
            }
        }, function (error) {
            loading.dismiss();
            console.log(error);
            _this.alertaService.errorAlert(_this.restService.headerError, _this.restService.mensajeError, null);
        });
    };
    RegistroValidaCreditoPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-registro-valida-credito',template:/*ion-inline-start:"C:\Users\Administrador\kenergy\src\pages\registro-valida-credito\registro-valida-credito.html"*/'<ion-content class="animated fadeIn" padding style="\n    background-image: url(assets/imgs/fondo.jpg); \n    background-size: 100%;\n    background-position: center center;">\n  <div style="text-align:center" class="animated fadeInDown">\n    <img src="../assets/imgs/registro/logoLetra2.png" alt="logo" class="logo logoMargen" style="margin-bottom: 13%;" />\n  </div>\n  <div style="width:100%;margin-bottom: 5%" class="animated fadeInDown">\n    <div class="tituloHeader" style="width:70%;display:inline-block;font-size: 150%">Ingresa tus datos</div>\n    <div class="tituloHeader" style="width:28%;display:inline-block;text-align: right;" (click)="ingresarClave()">\n      <!--<ion-icon name="save"></ion-icon>-->\n    </div>\n  </div>\n  <input placeholder="RFC de Empresa" class="inputText" [(ngModel)]="rfc"/>\n  <input placeholder="Usuario dado de alta en la empresa" class="inputText" [(ngModel)]="username"/>\n  <input placeholder="Correo asociado al usuario" class="inputText" style="margin-bottom:5%" [(ngModel)]="email"/>\n  <div style="text-align: -webkit-center;" (click)="validar()">\n    <div style="background-color: #009245;\n    width: 29%;\n    color: #fff;\n    padding: 6px;\n    font-size: 135%;\n    border-radius: 5px;">Validar</div>\n  </div>\n  <div style="text-align:center;margin: 16px;font-size: 90%;font-style: italic;color: #3e5167">\n    Si no cuentas con tu usuario comunicate\n    al tel.: <a href="tel:(272) 7280 112">(272) 7280 112</a>,\n    o al correo <a href="mailto:atencioaclientes@kenergyfuel.com">atencioaclientes@kenergyfuel.com</a>\n    para proporcionartelo.\n  </div>\n</ion-content>'/*ion-inline-end:"C:\Users\Administrador\kenergy\src\pages\registro-valida-credito\registro-valida-credito.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["m" /* NavParams */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* MenuController */],
            __WEBPACK_IMPORTED_MODULE_3__providers_rest_service__["a" /* RestServiceProvider */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* LoadingController */], __WEBPACK_IMPORTED_MODULE_4__providers_alerta_service__["a" /* AlertaServiceProvider */]])
    ], RegistroValidaCreditoPage);
    return RegistroValidaCreditoPage;
}());

//# sourceMappingURL=registro-valida-credito.js.map

/***/ }),

/***/ 7:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AlertaServiceProvider; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_common_http__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ionic_angular__ = __webpack_require__(2);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



/*
  Generated class for the AlertaServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
var AlertaServiceProvider = /** @class */ (function () {
    function AlertaServiceProvider(http, alertCtrl) {
        this.http = http;
        this.alertCtrl = alertCtrl;
    }
    AlertaServiceProvider.prototype.alertaBasica = function (titulo, subtitulo, accion) {
        var alert = this.alertCtrl.create({
            title: titulo,
            subTitle: subtitulo,
            cssClass: 'alertCustomCss',
            buttons: [
                {
                    text: 'Aceptar',
                    handler: function () {
                        if (accion != null) {
                            accion();
                        }
                    }
                }
            ]
        });
        alert.present();
    };
    AlertaServiceProvider.prototype.warnAlert = function (titulo, subtitulo, accion) {
        var alert = this.alertCtrl.create({
            title: titulo,
            subTitle: subtitulo,
            cssClass: 'warnAlert',
            buttons: [
                {
                    text: 'Aceptar',
                    handler: function () {
                        if (accion != null) {
                            accion();
                        }
                    }
                }
            ]
        });
        alert.present();
    };
    AlertaServiceProvider.prototype.errorAlert = function (titulo, subtitulo, accion) {
        var alert = this.alertCtrl.create({
            title: titulo,
            subTitle: subtitulo,
            cssClass: 'errorAlert',
            buttons: [
                {
                    text: 'Aceptar',
                    handler: function () {
                        if (accion != null) {
                            accion();
                        }
                    }
                }
            ]
        });
        alert.present();
    };
    AlertaServiceProvider.prototype.alertaConfirmacion = function (titulo, mensaje, accionAceptar, accionCancelar) {
        var confirm = this.alertCtrl.create({
            title: titulo,
            message: mensaje,
            buttons: [
                {
                    text: 'Aceptar',
                    handler: function () {
                        accionAceptar();
                    }
                },
                {
                    text: 'Cancelar',
                    role: 'cancel',
                    handler: function () {
                        if (accionCancelar != null) {
                            accionCancelar();
                        }
                    }
                }
            ]
        });
        confirm.present();
    };
    AlertaServiceProvider.prototype.alertaInput = function (titulo, mensaje, accionAceptar, accionCancelar, inputsE) {
        var prompt = this.alertCtrl.create({
            title: titulo,
            message: mensaje,
            inputs: inputsE,
            buttons: [
                {
                    text: 'Cancelar',
                    handler: function () {
                        if (accionCancelar != null) {
                            accionCancelar();
                        }
                    }
                },
                {
                    text: 'Aceptar',
                    handler: function () {
                        accionAceptar();
                    }
                }
            ]
        });
        prompt.present();
    };
    AlertaServiceProvider.prototype.alertaSinSalida = function (titulo, subtitulo) {
        var alert = this.alertCtrl.create({
            title: titulo,
            subTitle: subtitulo,
            cssClass: 'errorAlert',
            enableBackdropDismiss: false
        });
        alert.present();
    };
    AlertaServiceProvider.prototype.alertaSinSalidaBoton = function (titulo, subtitulo) {
        var alert = this.alertCtrl.create({
            title: titulo,
            subTitle: subtitulo,
            cssClass: 'errorAlert',
            enableBackdropDismiss: false,
            buttons: [
                {
                    text: 'Aceptar',
                    handler: function () {
                    }
                }
            ]
        });
        alert.present();
    };
    AlertaServiceProvider = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["A" /* Injectable */])(),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_0__angular_common_http__["a" /* HttpClient */], __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["b" /* AlertController */]])
    ], AlertaServiceProvider);
    return AlertaServiceProvider;
}());

//# sourceMappingURL=alerta-service.js.map

/***/ }),

/***/ 704:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MyApp; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ionic_native_status_bar__ = __webpack_require__(423);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_native_splash_screen__ = __webpack_require__(424);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__providers_alerta_service__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__providers_rest_service__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_rxjs_add_operator_timeout__ = __webpack_require__(278);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_rxjs_add_operator_timeout___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_6_rxjs_add_operator_timeout__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__pages_login_login__ = __webpack_require__(81);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__ionic_storage__ = __webpack_require__(15);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__providers_menu_service__ = __webpack_require__(156);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__ionic_native_mobile_accessibility__ = __webpack_require__(425);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__pages_home_home__ = __webpack_require__(65);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__pages_home_credito_home_credito__ = __webpack_require__(84);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__ionic_native_sqlite__ = __webpack_require__(43);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14__services_usuario_service__ = __webpack_require__(59);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_15__ionic_native_deeplinks__ = __webpack_require__(426);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_16__pages_cambiar_contra_cambiar_contra__ = __webpack_require__(155);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_17__angular_common_http__ = __webpack_require__(9);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



















var MyApp = /** @class */ (function () {
    function MyApp(platform, statusBar, splashScreen, loadingCtrl, alertaService, restService, localStorage, alertCtrl, menuCtrl, events, menuService, mobileAccessibility, sqlite, usuarioService, deeplinks) {
        var _this = this;
        this.platform = platform;
        this.statusBar = statusBar;
        this.splashScreen = splashScreen;
        this.loadingCtrl = loadingCtrl;
        this.alertaService = alertaService;
        this.restService = restService;
        this.localStorage = localStorage;
        this.alertCtrl = alertCtrl;
        this.menuCtrl = menuCtrl;
        this.events = events;
        this.menuService = menuService;
        this.mobileAccessibility = mobileAccessibility;
        this.sqlite = sqlite;
        this.usuarioService = usuarioService;
        this.deeplinks = deeplinks;
        this.puntos = 25;
        this.link = false;
        this.idUsuario = 0;
        this.correoCambio = "";
        this.usuario = null;
        if (platform.is('cordova')) {
            this.deeplinks.routeWithNavController(this.nav, {
                '/kenergy/contra:idUsu': __WEBPACK_IMPORTED_MODULE_16__pages_cambiar_contra_cambiar_contra__["a" /* CambiarContraPage */],
                '/kenergy/cambiaremail': __WEBPACK_IMPORTED_MODULE_7__pages_login_login__["a" /* LoginPage */]
            }).subscribe(function (match) {
                _this.link = true;
                var params = match.$link.path.split('/');
                _this.idUsuario = params[2];
                if (params[1] == "cambiaremail")
                    _this.correoCambio = params[3];
            }, function (nomatch) {
                // nomatch.$link - the full link data
                alertaService.alertaBasica("no", JSON.stringify(nomatch), null);
            });
        }
        this.menuCtrl.enable(false, "authenticated");
        mobileAccessibility.usePreferredTextZoom(false);
        this.openSesion();
        this.createDatabase();
        this.events.subscribe('menu:changed', function (pages) {
            _this.usuarioService.pages = [];
            _this.usuarioService.pages = _this.menuService.returnMenuByType(pages, _this.usuario);
        });
        this.events.subscribe('points:changed', function (points) {
            _this.puntos = points;
        });
    }
    MyApp.prototype.createDatabase = function () {
        this.sqlite.create({
            name: 'kenergy.db',
            location: 'default' // the location field is required
        })
            .then(function (db) {
            db.executeSql('CREATE TABLE IF NOT EXISTS mis_autos( ' +
                'id_vehiculo INTEGER PRIMARY KEY, ' +
                'no_circula TEXT, ' +
                'periodo TEXT, ' +
                'tipo_combustible TEXT, ' +
                'estado TEXT, ' +
                'ultima_fecha_verificacion TEXT, ' +
                'proxima_fecha_verificacion TEXT, ' +
                'agencia TEXT, ' +
                'telefono TEXT, ' +
                'compania_Seguro TEXT, ' +
                'poliza TEXT, ' +
                'fecha_vencimiento TEXT, ' +
                'monto_poliza TEXT, ' +
                'telefono_seguro TEXT, ' +
                'verificacion INT, ' +
                'vencimiento INT, ' +
                'mantenimiento_cada INT, ' +
                'mantenimiento_cada_rango INT, ' +
                'pago_de_tenencia INT, ' +
                'hoy_no_circula INT)', [])
                .then(function (res) { return console.log("Se ejecuto SQL correcto"); })
                .catch(function (e) { return console.log("Error al crear tabla "); });
            db.executeSql('CREATE TABLE IF NOT EXISTS usuario( ' +
                'id_usuario INTEGER PRIMARY KEY, ' +
                'usuario TEXT, ' +
                'id_cliente INT)', [])
                .then(function (res) { return console.log("Se ejecuto SQL correcto"); })
                .catch(function (e) { return console.log("Error al crear tabla "); });
            db.executeSql('CREATE TABLE IF NOT EXISTS mis_datos( ' +
                'id_usuario INTEGER PRIMARY KEY, ' +
                'edad TEXT)', [])
                .then(function (res) { return console.log("Se ejecuto SQL correcto"); })
                .catch(function (e) { return console.log("Error al crear tabla "); });
        })
            .catch(function (error) {
            console.log("Excepcion al crear BD ");
        });
    };
    MyApp.prototype.openSesion = function () {
        var _this = this;
        this.localStorage.ready().then(function () {
            _this.localStorage.get("@userSession").then(function (data) {
                if (data != null) {
                    _this.usuario = data;
                    _this.initializeApp();
                }
                else {
                    _this.initializeApp();
                }
            });
        });
    };
    MyApp.prototype.initializeApp = function () {
        var _this = this;
        this.platform.ready().then(function () {
            // Okay, so the platform is ready and our plugins are available.
            // Here you can do any higher level native things you might need.
            _this.statusBar.styleDefault();
            _this.splashScreen.hide();
            //this.menuCtrl.enable(false, "authenticated");
            _this.chargeInitPage();
            //this.rootPage = BorrarPage;
        });
    };
    MyApp.prototype.chargeInitPage = function () {
        var _this = this;
        if (this.link) {
            if (this.correoCambio == "")
                this.nav.push(__WEBPACK_IMPORTED_MODULE_16__pages_cambiar_contra_cambiar_contra__["a" /* CambiarContraPage */], { idUsuario: this.idUsuario });
            else {
                this.restService.getToken().timeout(this.restService.timeOver).subscribe(function (data) {
                    var bodys = new __WEBPACK_IMPORTED_MODULE_17__angular_common_http__["d" /* HttpParams */]();
                    _this.restService.restServicePUTToken("user/email/cambio/" + _this.idUsuario + "/" + _this.correoCambio, bodys, data.toString()).timeout(_this.restService.timeOver).subscribe(function (dataRegistro) {
                        if (dataRegistro['Response'] == true) {
                            _this.alertaService.alertaBasica("¡Bien!", "Se ha cambiado tu correo electrónico para acceder a la cuenta.", null);
                            _this.close();
                        }
                        else {
                            if (dataRegistro['Message'] == "1") {
                                _this.alertaService.warnAlert("¡Atención!", "Se terminó el plazo para modificar el correo electrónico; Intente nuevamente.", null);
                                _this.localStorage.ready().then(function () {
                                    _this.localStorage.get("@isSessionActive").then(function (data) {
                                        if (data == 1) {
                                            _this.menuCtrl.enable(true, "authenticated");
                                            //this.usuario = data;
                                            _this.localStorage.get("@userSession").then(function (dataU) {
                                                _this.usuario = dataU;
                                                if (_this.usuario != null) {
                                                    if (_this.usuario.IdClient == 0) {
                                                        _this.rootPage = __WEBPACK_IMPORTED_MODULE_11__pages_home_home__["a" /* HomePage */];
                                                        _this.usuarioService.pages = [];
                                                        var d = {
                                                            valor: 1,
                                                            user: _this.usuario
                                                        };
                                                        _this.usuarioService.pages = _this.menuService.returnMenuByType(d, _this.usuario);
                                                    }
                                                    else {
                                                        _this.rootPage = __WEBPACK_IMPORTED_MODULE_12__pages_home_credito_home_credito__["a" /* HomeCreditoPage */];
                                                        _this.usuarioService.pages = [];
                                                        var d2 = {
                                                            valor: 2,
                                                            user: _this.usuario
                                                        };
                                                        _this.usuarioService.pages = _this.menuService.returnMenuByType(d2, _this.usuario);
                                                    }
                                                }
                                            });
                                            //this.menuCtrl.enable(false, "authenticated");
                                            //this.menuCtrl.enable(true, "authenticated");
                                        }
                                        else {
                                            _this.rootPage = __WEBPACK_IMPORTED_MODULE_7__pages_login_login__["a" /* LoginPage */];
                                        }
                                    });
                                });
                            }
                        }
                    }, function (error) {
                        console.log(error);
                        _this.alertaService.errorAlert(_this.restService.headerError, _this.restService.mensajeError, null);
                    });
                }, function (error) {
                    console.log(error);
                    _this.alertaService.errorAlert(_this.restService.headerError, _this.restService.mensajeError, null);
                });
                this.close();
            }
        }
        else {
            this.localStorage.ready().then(function () {
                _this.localStorage.get("@isSessionActive").then(function (data) {
                    if (data == 1) {
                        _this.menuCtrl.enable(true, "authenticated");
                        //this.usuario = data;
                        _this.localStorage.get("@userSession").then(function (dataU) {
                            _this.usuario = dataU;
                            if (_this.usuario != null) {
                                if (_this.usuario.IdClient == 0) {
                                    _this.rootPage = __WEBPACK_IMPORTED_MODULE_11__pages_home_home__["a" /* HomePage */];
                                    _this.usuarioService.pages = [];
                                    var d = {
                                        valor: 1,
                                        user: _this.usuario
                                    };
                                    _this.usuarioService.pages = _this.menuService.returnMenuByType(d, _this.usuario);
                                }
                                else {
                                    _this.rootPage = __WEBPACK_IMPORTED_MODULE_12__pages_home_credito_home_credito__["a" /* HomeCreditoPage */];
                                    _this.usuarioService.pages = [];
                                    var d2 = {
                                        valor: 2,
                                        user: _this.usuario
                                    };
                                    _this.usuarioService.pages = _this.menuService.returnMenuByType(d2, _this.usuario);
                                }
                            }
                        });
                        //this.menuCtrl.enable(false, "authenticated");
                        //this.menuCtrl.enable(true, "authenticated");
                    }
                    else {
                        _this.rootPage = __WEBPACK_IMPORTED_MODULE_7__pages_login_login__["a" /* LoginPage */];
                    }
                });
            });
        }
    };
    MyApp.prototype.openPage = function (pagina) {
        this.nav.setRoot(pagina.component);
    };
    MyApp.prototype.exitApp = function () {
        this.alertaService.alertaConfirmacion("Confirmación", "¿Estás seguro de querer salir?", this.salir(), null);
    };
    MyApp.prototype.salir = function () {
        var _this = this;
        this.platform.exitApp();
        var sqlDelete = "DELETE FROM usuario";
        this.sqlite.create({
            name: 'kenergy.db',
            location: 'default'
        }).then(function (db) {
            db.executeSql(sqlDelete, [])
                .then(function (response) {
            })
                .catch(function (error) { return _this.alertaService.errorAlert("Error al borrar usuario", error, null); });
        })
            .catch(function (error) {
            _this.alertaService.errorAlert("Info", "Excepcion al crear BD " + error, null);
        });
    };
    MyApp.prototype.exitSession = function () {
        var _this = this;
        var confirm = this.alertCtrl.create({
            title: "Confirmación",
            message: "¿Estás seguro de cerrar sesión?",
            buttons: [
                {
                    text: 'Cancelar',
                    handler: function () {
                    }
                },
                {
                    text: 'Aceptar',
                    handler: function () {
                        _this.close();
                    }
                }
            ]
        });
        confirm.present();
    };
    MyApp.prototype.close = function () {
        var _this = this;
        this.platform.exitApp();
        this.localStorage.ready().then(function () {
            var sqlDelete = "DELETE FROM usuario";
            _this.sqlite.create({
                name: 'kenergy.db',
                location: 'default'
            }).then(function (db) {
                db.executeSql(sqlDelete, [])
                    .then(function (response) {
                    _this.localStorage.set("@isSessionActive", 0);
                    _this.menuCtrl.close();
                    _this.menuCtrl.enable(false, "authenticated");
                    _this.nav.push(__WEBPACK_IMPORTED_MODULE_7__pages_login_login__["a" /* LoginPage */]);
                })
                    .catch(function (error) { return _this.alertaService.errorAlert("Error al borrar usuario", error, null); });
            })
                .catch(function (error) {
                _this.alertaService.errorAlert("Info", "Excepcion al crear BD " + error, null);
            });
        }, function (error) {
            console.log(error); //En modo debug visualizar error completo
            _this.alertaService.errorAlert(_this.restService.headerError, error.message, null);
        });
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_8" /* ViewChild */])(__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* Nav */]),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* Nav */])
    ], MyApp.prototype, "nav", void 0);
    MyApp = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({template:/*ion-inline-start:"C:\Users\Administrador\kenergy\src\app\app.html"*/'<ion-menu [content]="content" id="authenticated" style="width: 62%;">\n    <ion-header>\n        <ion-item class="item item-thumbnail-left" style="\n                    background-image: url(assets/imgs/menu/rad.jpg);\n                    background-size: 100%;\n                    background-position: center center;height: 116px;\n    width: 71%;;color: #fff;">\n          <img src="assets/imgs/menu/logo.png" alt="Fry" class="animated myImagen"\n           style="top: 16px !important;left: 16px !important;height: 65px !important;\n           border-radius: 0px !important;width: 67px !important;opacity: -1.6;">\n           \n        </ion-item>\n      </ion-header>\n\n  <ion-content style="background-color: #020f32;">\n    <!-- *ngIf="usuarioService.tipo != 1 || (usuarioService.tipo == 1 && usuarioService.tieneVehiculos)" -->\n    <ion-list>\n\n      <div *ngFor="let p of usuarioService.pages; let i = index">\n        <ion-item menuClose class="item item-icon-right" (click)="openPage(p)" style="box-shadow: 0px 1px 0px rgba(0, 0, 0, 0.07);   \n         background-color: #020f32;">\n          <img *ngIf="i==1 && p.parametro != null && p.parametro2 != null" src="assets/imgs/{{p.img}}" alt="logo" style="    /* height: 35%; */\n            width: 11%;\n            margin-top: 14px;\n            position: absolute;" />\n            <img *ngIf="i==1 && p.parametro2 == null" src="assets/imgs/{{p.img}}" alt="logo" style="    /* height: 35%; */\n            width: 11%;\n            margin-top: 14px;\n            position: absolute;" />\n            <img *ngIf="i!=1" src="assets/imgs/{{p.img}}" alt="logo" style="    /* height: 35%; */\n            width: 11%;\n            position: absolute;" />\n          <h2 class="nombreUsuario" style="display: inline-block;\n            margin-left: 50px;\n            margin-top: 14px;\n            font-size: 100%;\n            font-weight: 600;color: #fff;font-family: champagne__limousinesregular;">{{ p.nombre }}</h2>\n            <p *ngIf="p.parametro != null && p.parametro2 == null" style="color: #fff;margin-left: 48px;">{{p.parametro}} pts.</p>\n            <p *ngIf="p.parametro != null && p.parametro2 != null" style="color: #fff;margin-left: 48px;">{{p.parametro}}</p>\n            <p *ngIf="p.parametro != null && p.parametro2 != null" style="color: #fff;margin-left: 48px;">{{p.parametro2}}</p>\n        </ion-item>\n      </div>\n    </ion-list>\n    <!--<ion-list *ngIf="usuarioService.tipo == 1 && !usuarioService.tieneVehiculos" >\n        <ion-item *ngIf="usuarioService.pages.length > 0" menuClose class="item item-icon-right" (click)="openPage(usuarioService.pages[0])" style="box-shadow: 0px 1px 0px rgba(0, 0, 0, 0.07);   \n         background-color: #020f32;">\n          <img *ngIf="i==0 && usuarioService.pages[0].parametro != null && usuarioService.pages[0].parametro2 != null" src="assets/imgs/{{usuarioService.pages[0].img}}" alt="logo" style="    /* height: 35%; */\n            width: 11%;\n            margin-top: 24px;\n            position: absolute;" />\n            <img *ngIf="i==0 && usuarioService.pages[0].parametro2 == null" src="assets/imgs/{{usuarioService.pages[0].img}}" alt="logo" style="    /* height: 35%; */\n            width: 11%;\n            margin-top: 14px;\n            position: absolute;" />\n            <img *ngIf="i!=0" src="assets/imgs/{{usuarioService.pages[0].img}}" alt="logo" style="    /* height: 35%; */\n            width: 11%;\n            position: absolute;" />\n          <h2 class="nombreUsuario" style="display: inline-block;\n            margin-left: 50px;\n            margin-top: 14px;\n            font-size: 100%;\n            font-weight: 600;color: #fff;font-family: champagne__limousinesregular;">{{ usuarioService.pages[0].nombre }}</h2>\n            <p *ngIf="usuarioService.pages[0].parametro != null && usuarioService.pages[0].parametro2 == null" style="color: #fff;margin-left: 48px;">{{usuarioService.pages[0].parametro}} pts.</p>\n            <p *ngIf="usuarioService.pages[0].parametro != null && usuarioService.pages[0].parametro2 != null" style="color: #fff;margin-left: 48px;">{{usuarioService.pages[0].parametro}}</p>\n            <p *ngIf="usuarioService.pages[0].parametro != null && usuarioService.pages[0].parametro2 != null" style="color: #fff;margin-left: 48px;">{{usuarioService.pages[0].parametro2}}</p>\n        </ion-item>\n    </ion-list>-->\n  </ion-content>\n  <ion-footer style="width: 72%;">\n    <ion-toolbar>\n      <ion-row>\n        <ion-col style="display: flex; align-items: center;">\n      <div style="text-align:left; color: white;">Versión 4.15.1070</div>\n    </ion-col>\n      <ion-col>\n      <div style="text-align:right">\n        <button ion-button outline style="    width: 46%;     height: 31px;\n        color: #fff;\n        border-color: #ffffff; display: none;" (click)="exitApp()">\n          <ion-icon name="close-circle" class="botonFooter"></ion-icon>\n          Salir\n        </button>\n        <button ion-button outline style="height: 31px;\n        color: #fff;\n        " (click)="exitSession()">\n          <ion-icon name="exit" class="botonFooter"></ion-icon>\n          Salir\n        </button>\n      </div>\n    </ion-col>\n    </ion-row>\n    </ion-toolbar>\n  </ion-footer>\n\n</ion-menu>\n\n<!-- Disable swipe-to-go-back because it\'s poor UX to combine STGB with side menus -->\n<ion-nav [root]="rootPage" #content swipeBackEnabled="false"></ion-nav>'/*ion-inline-end:"C:\Users\Administrador\kenergy\src\app\app.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["n" /* Platform */], __WEBPACK_IMPORTED_MODULE_2__ionic_native_status_bar__["a" /* StatusBar */], __WEBPACK_IMPORTED_MODULE_3__ionic_native_splash_screen__["a" /* SplashScreen */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* LoadingController */], __WEBPACK_IMPORTED_MODULE_4__providers_alerta_service__["a" /* AlertaServiceProvider */],
            __WEBPACK_IMPORTED_MODULE_5__providers_rest_service__["a" /* RestServiceProvider */], __WEBPACK_IMPORTED_MODULE_8__ionic_storage__["b" /* Storage */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["b" /* AlertController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* MenuController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["c" /* Events */], __WEBPACK_IMPORTED_MODULE_9__providers_menu_service__["a" /* MenuProvider */],
            __WEBPACK_IMPORTED_MODULE_10__ionic_native_mobile_accessibility__["a" /* MobileAccessibility */],
            __WEBPACK_IMPORTED_MODULE_13__ionic_native_sqlite__["a" /* SQLite */], __WEBPACK_IMPORTED_MODULE_14__services_usuario_service__["a" /* UsuarioService */], __WEBPACK_IMPORTED_MODULE_15__ionic_native_deeplinks__["a" /* Deeplinks */]])
    ], MyApp);
    return MyApp;
}());

//# sourceMappingURL=app.component.js.map

/***/ }),

/***/ 706:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return PipesModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__search__ = __webpack_require__(707);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__sort__ = __webpack_require__(708);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};



var PipesModule = /** @class */ (function () {
    function PipesModule() {
    }
    PipesModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["I" /* NgModule */])({
            declarations: [__WEBPACK_IMPORTED_MODULE_1__search__["a" /* SearchPipe */],
                __WEBPACK_IMPORTED_MODULE_2__sort__["a" /* SortPipe */]],
            imports: [],
            exports: [__WEBPACK_IMPORTED_MODULE_1__search__["a" /* SearchPipe */],
                __WEBPACK_IMPORTED_MODULE_2__sort__["a" /* SortPipe */]]
        })
    ], PipesModule);
    return PipesModule;
}());

//# sourceMappingURL=pipes.module.js.map

/***/ }),

/***/ 707:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SearchPipe; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};

/**
 * Generated class for the SearchPipe pipe.
 *
 * See https://angular.io/api/core/Pipe for more info on Angular Pipes.
 */
var SearchPipe = /** @class */ (function () {
    function SearchPipe() {
    }
    /**
     * Takes a value and makes it lowercase.
     */
    SearchPipe.prototype.transform = function (items, searchText) {
        if (!items)
            return [];
        if (!searchText)
            return items;
        searchText = searchText.toLowerCase();
        return items.filter(function (it) {
            return it.nom_ent.toLowerCase().includes(searchText);
        });
    };
    SearchPipe = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["S" /* Pipe */])({
            name: 'search',
        })
    ], SearchPipe);
    return SearchPipe;
}());

//# sourceMappingURL=search.js.map

/***/ }),

/***/ 708:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SortPipe; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};

/**
 * Generated class for the SortPipe pipe.
 *
 * See https://angular.io/api/core/Pipe for more info on Angular Pipes.
 */
var SortPipe = /** @class */ (function () {
    function SortPipe() {
    }
    /**
     * Takes a value and makes it lowercase.
     */
    SortPipe.prototype.transform = function (array, args) {
        return array.sort(function (a, b) {
            if (a[args.property] < b[args.property]) {
                return -1 * args.order;
            }
            else if (a[args.property] > b[args.property]) {
                return 1 * args.order;
            }
            else {
                return 0;
            }
        });
    };
    SortPipe = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["S" /* Pipe */])({
            name: 'sort',
        })
    ], SortPipe);
    return SortPipe;
}());

//# sourceMappingURL=sort.js.map

/***/ }),

/***/ 8:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return RestServiceProvider; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_common_http__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_timeout__ = __webpack_require__(278);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_timeout___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_timeout__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_native_http__ = __webpack_require__(150);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var RestServiceProvider = /** @class */ (function () {
    function RestServiceProvider(http, httpNative) {
        this.http = http;
        this.httpNative = httpNative;
        //Path de ambiente local
        //public pathService: String = "http://localhost/ruta/";
        //Path de ambiente producción  http://localhost:8100/api
        //public pathService: String = "http://descargadocs.grupotabar.net/WebAPI/api/";
        this.pathService = "http://169.60.32.119/api/";
        this.headerError = "¡Error!";
        this.mensajeError = "Verifica tu conexión y datos ó contacte al administrador";
        this.headerValidacion = "¡Advertencia!";
        this.headerExito = "¡Bien!";
        this.mensajeValidacionAdmin = "Ha ocurrido un error en el servidor, contacte al administrador";
        this.mensajeValidacionLogin = "Verifica tus credenciales";
        this.timeOver = 50000; // 10 segundos de espera en servicios
    }
    RestServiceProvider.prototype.restServiceGET = function (path, params) {
        return this.http.get(this.pathService + path, params);
    };
    RestServiceProvider.prototype.restServicePOST = function (path, params) {
        var httpOptions = {
            headers: new __WEBPACK_IMPORTED_MODULE_0__angular_common_http__["c" /* HttpHeaders */]({
                'Content-Type': 'application/x-www-form-urlencoded'
            })
        };
        //{},{headers: headers,params:params}
        return this.http.post(this.pathService + path, params, httpOptions);
    };
    RestServiceProvider.prototype.restServicePOSTToken = function (path, body, token) {
        var headers = new __WEBPACK_IMPORTED_MODULE_0__angular_common_http__["c" /* HttpHeaders */]();
        headers = headers.set('Authorization', 'Bearer ' + token);
        return this.http.post(this.pathService + path, body, { headers: headers });
    };
    RestServiceProvider.prototype.restServicePOSTTokenXForm = function (path, body, token) {
        var headers = new __WEBPACK_IMPORTED_MODULE_0__angular_common_http__["c" /* HttpHeaders */]();
        //application/x-www-form-urlencoded
        headers = headers.set('Authorization', 'Bearer ' + token);
        var httpOptions = {
            headers: new __WEBPACK_IMPORTED_MODULE_0__angular_common_http__["c" /* HttpHeaders */]({
                'Authorization': 'Bearer ' + token,
                'Content-Type': 'application/x-www-form-urlencoded'
            })
        };
        return this.http.post(this.pathService + path, body, httpOptions);
    };
    RestServiceProvider.prototype.restServicePUTToken = function (path, body, token) {
        var headers = new __WEBPACK_IMPORTED_MODULE_0__angular_common_http__["c" /* HttpHeaders */]();
        headers = headers.set('Authorization', 'Bearer ' + token);
        return this.http.put(this.pathService + path, body, { headers: headers });
    };
    RestServiceProvider.prototype.restServiceGETToken = function (path, body, token) {
        var headers = new __WEBPACK_IMPORTED_MODULE_0__angular_common_http__["c" /* HttpHeaders */]();
        headers = headers.set('Authorization', 'Bearer ' + token);
        return this.http.get(this.pathService + path, { headers: headers, params: body });
    };
    RestServiceProvider.prototype.getToken = function () {
        var httpOptions = {
            headers: new __WEBPACK_IMPORTED_MODULE_0__angular_common_http__["c" /* HttpHeaders */]({
                'Content-Type': 'application/x-www-form-urlencoded'
            })
        };
        var body = new __WEBPACK_IMPORTED_MODULE_0__angular_common_http__["d" /* HttpParams */]()
            .set('username', "demo")
            .set('password', "123456");
        //{},{headers: headers,params:params}
        return this.http.post(this.pathService + "session/authenticate", body, httpOptions);
    };
    RestServiceProvider.prototype.restServiceDELETEToken = function (path, token) {
        var headers = new __WEBPACK_IMPORTED_MODULE_0__angular_common_http__["c" /* HttpHeaders */]();
        headers = headers.set('Authorization', 'Bearer ' + token);
        return this.http.delete(this.pathService + path, { headers: headers });
    };
    RestServiceProvider = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["A" /* Injectable */])(),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_0__angular_common_http__["a" /* HttpClient */], __WEBPACK_IMPORTED_MODULE_3__ionic_native_http__["a" /* HTTP */]])
    ], RestServiceProvider);
    return RestServiceProvider;
}());

//# sourceMappingURL=rest-service.js.map

/***/ }),

/***/ 81:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return LoginPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ionic_storage__ = __webpack_require__(15);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__providers_alerta_service__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__providers_rest_service__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__angular_common_http__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__providers_menu_service__ = __webpack_require__(156);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__home_home__ = __webpack_require__(65);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__registro_preview_registro_preview__ = __webpack_require__(324);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__models_grupoModel__ = __webpack_require__(673);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__home_credito_home_credito__ = __webpack_require__(84);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__ionic_native_sqlite__ = __webpack_require__(43);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};












var LoginPage = /** @class */ (function () {
    function LoginPage(navCtrl, navParams, platform, modalController, alertaService, localStorage, restService, menuCtrl, events, loadingCtrl, menuService, sqlite, alertCtrl) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.platform = platform;
        this.modalController = modalController;
        this.alertaService = alertaService;
        this.localStorage = localStorage;
        this.restService = restService;
        this.menuCtrl = menuCtrl;
        this.events = events;
        this.loadingCtrl = loadingCtrl;
        this.menuService = menuService;
        this.sqlite = sqlite;
        this.alertCtrl = alertCtrl;
        this.verPassword = "password";
        this.pages = [];
        this.idGrupo = 0;
        this.grupos = [];
        this.menuCtrl.enable(false, "authenticated");
    }
    LoginPage.prototype.ionViewDidLoad = function () {
        var _this = this;
        //postConstruct se utiliza al cargar la vista
        var sql = "SELECT * FROM usuario where id_usuario = ?";
        this.sqlite.create({
            name: 'kenergy.db',
            location: 'default'
        }).then(function (db) {
            db.executeSql(sql, [1])
                .then(function (response) {
                if (response.rows.length != 0) {
                    //this.localStorage.set(`@userSession`, response.rows.item(0).usuario);
                    //this.alertaService.errorAlert("idCliente", response.rows.item(0).id_cliente, null);
                    //this.alertaService.errorAlert("usuario", response.rows.item(0).usuario, null);
                    //this.alertaService.errorAlert("usuario.idCliente", JSON.parse(response.rows.item(0).usuario).IdClient, null);
                    _this.localStorage.set("@userSession", JSON.parse(response.rows.item(0).usuario));
                    if (JSON.parse(response.rows.item(0).usuario).IdClient != 0) {
                        _this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_10__home_credito_home_credito__["a" /* HomeCreditoPage */], { usuario: JSON.parse(response.rows.item(0).usuario) });
                    }
                    else {
                        _this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_7__home_home__["a" /* HomePage */], { usuario: JSON.parse(response.rows.item(0).usuario) });
                    }
                }
                else {
                    _this.cargarGrupos();
                }
            })
                .catch(function (error) {
                _this.cargarGrupos();
            });
        })
            .catch(function (error) {
            _this.cargarGrupos();
            _this.alertaService.errorAlert("Info", "Excepcion al crear BD " + error, null);
        });
    };
    LoginPage.prototype.cargarGrupos = function () {
        var _this = this;
        var loading = this.loadingCtrl.create();
        loading.present();
        this.restService.getToken().timeout(this.restService.timeOver).subscribe(function (data) {
            if (data == null) {
                loading.dismiss();
                _this.alertaService.warnAlert(_this.restService.headerValidacion, _this.restService.mensajeValidacionAdmin, null);
            }
            else {
                var body = new __WEBPACK_IMPORTED_MODULE_5__angular_common_http__["d" /* HttpParams */]();
                _this.restService.restServiceGETToken("session/corporativo", body, data.toString()).timeout(_this.restService.timeOver).subscribe(function (dataCorporativo) {
                    _this.grupos = [];
                    if (dataCorporativo["Status"] == 1) {
                        _this.grupos.push(new __WEBPACK_IMPORTED_MODULE_9__models_grupoModel__["a" /* GrupoModel */]());
                        dataCorporativo["Response"].forEach(function (grupo) {
                            _this.grupos.push(new __WEBPACK_IMPORTED_MODULE_9__models_grupoModel__["a" /* GrupoModel */](grupo.Id, grupo.Corporativo, grupo.Url));
                        });
                        loading.dismiss();
                    }
                }, function (error) {
                    loading.dismiss();
                    console.log(error);
                    _this.alertaService.errorAlert(_this.restService.headerError, _this.restService.mensajeError, null);
                });
            }
        }, function (error) {
            loading.dismiss();
            console.log(error);
            _this.alertaService.errorAlert(_this.restService.headerError, _this.restService.mensajeError, null);
        });
    };
    LoginPage.prototype.loginTemporal = function () {
        this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_7__home_home__["a" /* HomePage */]);
    };
    LoginPage.prototype.login = function () {
        var _this = this;
        /*if(this.idGrupo == 0){
          this.alertaService.warnAlert(this.restService.headerValidacion, "Selecciona un grupo", null);
          return;
        }*/
        if ((this.user == undefined || this.password == undefined) || (this.user == null || this.password == null) || (this.user.length == 0 || this.password.length == 0)) {
            this.alertaService.warnAlert(this.restService.headerValidacion, "Usuario y/o Password son requeridos", null);
            return;
        }
        var loading = this.loadingCtrl.create();
        loading.present();
        this.restService.getToken().timeout(this.restService.timeOver).subscribe(function (data) {
            if (data == null) {
                loading.dismiss();
                _this.alertaService.warnAlert(_this.restService.headerValidacion, _this.restService.mensajeValidacionAdmin, null);
            }
            else {
                var body = new __WEBPACK_IMPORTED_MODULE_5__angular_common_http__["d" /* HttpParams */]();
                body.set("Password", _this.password);
                body.set("Email", _this.user);
                var b = {
                    Password: _this.password,
                    Email: _this.user
                };
                var bodys = new __WEBPACK_IMPORTED_MODULE_5__angular_common_http__["d" /* HttpParams */]()
                    .set('Email', _this.user)
                    .set('Password', _this.password);
                _this.restService.restServicePOSTTokenXForm("session/user", bodys, data.toString()).timeout(_this.restService.timeOver).subscribe(function (dataLogin) {
                    if (Object.keys(dataLogin['Response']).length != 0) {
                        _this.localStorage.ready().then(function () {
                            _this.localStorage.get("@userSession").then(function (data) {
                                console.log("enlogin " + JSON.stringify(dataLogin['Response']));
                                _this.localStorage.set("@userSession", dataLogin['Response']);
                                //guardamos datos del usuario en la tabla
                                var sqlDelete = "DELETE FROM usuario";
                                var sql = 'INSERT INTO usuario VALUES (?,?,?)';
                                _this.sqlite.create({
                                    name: 'kenergy.db',
                                    location: 'default'
                                }).then(function (db) {
                                    db.executeSql(sqlDelete, [])
                                        .then(function (response) {
                                        db.executeSql(sql, [1, JSON.stringify(dataLogin['Response']), dataLogin['Response'].IdClient])
                                            .then(function (response) {
                                            //this.alertaService.errorAlert("usuario Login", "Guardo correctamente el usuario" + dataLogin['Response'].IdClient, null)
                                        })
                                            .catch(function (error) { return _this.alertaService.errorAlert("Error al insertar usuario", error, null); });
                                    });
                                    //.catch(error => this.alertaService.errorAlert("Error al borrar usuario", error, null));
                                })
                                    .catch(function (error) {
                                    _this.alertaService.errorAlert("Info", "Excepcion al crear BD " + error, null);
                                });
                                //this.localStorage.set(`@isSessionActive`, 1);
                                if (dataLogin['Response'].IdClient != 0) {
                                    _this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_10__home_credito_home_credito__["a" /* HomeCreditoPage */], { usuario: dataLogin['Response'] });
                                }
                                else {
                                    //this.navCtrl.setRoot(HomePage);
                                    _this.alertaService.warnAlert("¡Atención!", "Por el momento no está disponible la aplicación para clientes de Amigo Fiel", null);
                                }
                            });
                        });
                    }
                    else {
                        var alert_1 = _this.alertCtrl.create({
                            title: _this.restService.headerValidacion,
                            subTitle: "El correo o la contraseña son incorrectos.",
                            cssClass: 'warnAlert',
                            enableBackdropDismiss: false,
                            buttons: [
                                {
                                    text: 'Aceptar',
                                    handler: function () {
                                    }
                                },
                                {
                                    text: 'Cambiar contraseña',
                                    handler: function () {
                                        _this.cambiarContra();
                                    }
                                }
                            ]
                        });
                        alert_1.present();
                        //this.alertaService.warnAlert(this.restService.headerValidacion, "El correo o la contraseña son incorrectos", null);
                    }
                    loading.dismiss();
                }, function (error) {
                    loading.dismiss();
                    console.log(error);
                    _this.alertaService.errorAlert(_this.restService.headerError, _this.restService.mensajeError, null);
                });
            }
        }, function (error) {
            loading.dismiss();
            console.log(error);
            _this.alertaService.errorAlert(_this.restService.headerError, _this.restService.mensajeError, null);
        });
    };
    LoginPage.prototype.verPasswordMethod = function (event) {
        if (this.verPassword == "password") {
            this.verPassword = "text";
        }
        else {
            this.verPassword = "password";
        }
    };
    LoginPage.prototype.registrar = function () {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_8__registro_preview_registro_preview__["a" /* RegistroPreviewPage */], { tipo: 1 });
    };
    LoginPage.prototype.cambiarContra = function () {
        var _this = this;
        this.restService.getToken().timeout(this.restService.timeOver).subscribe(function (data) {
            var bodys = new __WEBPACK_IMPORTED_MODULE_5__angular_common_http__["d" /* HttpParams */]();
            _this.restService.restServicePUTToken("user/pass/cambio/" + _this.user, bodys, data.toString()).timeout(_this.restService.timeOver).subscribe(function (dataRegistro) {
                if (dataRegistro['Response'] == true) {
                    _this.alertaService.alertaBasica("Cambio de contraseña", "Se ha enviado al correo " + _this.user + " un enlace para realizar el cambio de contraseña", null);
                }
                else {
                    if (dataRegistro['Message'] == 3)
                        _this.alertaService.warnAlert("¡Atención!", "El E-mail capturado no se encuentra registrado.", null);
                    if (dataRegistro['Message'] == 6)
                        _this.alertaService.alertaBasica("RECUPERA TU CONTRASEÑA", "Comunícate con tu ejecutivo de ventas al <a href='tel:2727280112'>272 728 0112</a> o al e-mail <a href='mailto:registro@kenergyfuel.com'>registro@kenergyfuel.com</a>", null);
                }
            }, function (error) {
                console.log(error);
                _this.alertaService.errorAlert(_this.restService.headerError, _this.restService.mensajeError, null);
            });
        }, function (error) {
            console.log(error);
            _this.alertaService.errorAlert(_this.restService.headerError, _this.restService.mensajeError, null);
        });
    };
    LoginPage.prototype.oContra = function () {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_8__registro_preview_registro_preview__["a" /* RegistroPreviewPage */], { tipo: 2 });
    };
    LoginPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-login2',template:/*ion-inline-start:"C:\Users\Administrador\kenergy\src\pages\login\login.html"*/'<ion-content class="animated fadeIn auth-page" \nstyle="background-color: #d4ddec;\nbackground-image: url(assets/imgs/login/loginFondo.png); \nbackground-size: 100%;\nbackground-position: center center;">\n\n\n  <!-- Logo -->\n  <div padding-horizontal text-center class="animated fadeInDown login-content" style="margin-top: 30%;">\n    <h4 id="idBienvenida">BIENVENIDO</h4>\n\n    <div style="width:100%;">\n\n      <!-- <select id="barra"  class="mySelect animated fadeIn" [(ngModel)]="idGrupo"\n      style="margin-top: 6px;\n      height: 32px;\n      color: #020f32;\n      background-color: #fffefe;\n      width: 283px;">\n        <option *ngFor="let grupo of grupos" [ngValue]="grupo.Id">\n          {{grupo.Corporativo}}\n        </option>\n      </select> -->\n      \n    </div>\n\n    <input placeholder="Usuario" type="text" class="myInput3" [(ngModel)]="user" style="width: 283px;height: 34px;\n      background-color: #fff;">\n\n    <div>\n      <input placeholder="Contraseña" type="{{verPassword}}" class="myInput2" [(ngModel)]="password" style="display: inline-block;width: 247px;height: 34px;\n          background-color: #fff;">\n      <img src="assets/imgs/login/eye.png" alt="logo" style="display: inline-block" class="ojo" (touchstart)="verPasswordMethod($event)"\n        (touchend)="verPasswordMethod($event)" />\n      <div (click)="oContra()" style="color: white; margin-top: 5px;">\n        Olvidé mi contraseña\n      </div>\n    </div>\n\n    <div style="width: 100%">\n      <button ion-button color="naranja" class="tituloHeader" style="width: 55%;margin-top: 3%;\n      background-color: #e97523;vertical-align: top;border-radius: 7px;"\n        (click)="login()">Ingresar</button>\n      <button ion-button color="naranja" class="tituloHeader" style="width: 55%;margin-top: 1%;\n      background-color: #c1272d;vertical-align: top;border-radius: 7px;"\n        (click)="registrar()">Regístrate</button>\n    </div>\n\n    <div>\n      <img src="assets/imgs/login/twitter.png" alt="logo" class="logo" \n      style="display: inline-block;width: 10%;margin-top: 3%;margin: 3%;" />\n      <img src="assets/imgs/login/facebook.png" alt="logo" class="logo" \n      style="display: inline-block;width: 10%;margin-top: 3%;margin: 3%;" />\n    </div></div>\n</ion-content>'/*ion-inline-end:"C:\Users\Administrador\kenergy\src\pages\login\login.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["m" /* NavParams */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["n" /* Platform */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* ModalController */],
            __WEBPACK_IMPORTED_MODULE_3__providers_alerta_service__["a" /* AlertaServiceProvider */], __WEBPACK_IMPORTED_MODULE_2__ionic_storage__["b" /* Storage */],
            __WEBPACK_IMPORTED_MODULE_4__providers_rest_service__["a" /* RestServiceProvider */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* MenuController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["c" /* Events */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* LoadingController */], __WEBPACK_IMPORTED_MODULE_6__providers_menu_service__["a" /* MenuProvider */],
            __WEBPACK_IMPORTED_MODULE_11__ionic_native_sqlite__["a" /* SQLite */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["b" /* AlertController */]])
    ], LoginPage);
    return LoginPage;
}());

//# sourceMappingURL=login.js.map

/***/ }),

/***/ 84:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return HomeCreditoPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__models_CombustibleModel__ = __webpack_require__(161);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__home_credito_estaciones_list_home_estaciones_list__ = __webpack_require__(163);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__amcharts_amcharts3_angular__ = __webpack_require__(323);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__angular_common_http__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__providers_alerta_service__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__providers_rest_service__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__ionic_storage__ = __webpack_require__(15);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__services_notificaciones_service__ = __webpack_require__(17);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__services_abrirnotificaciones_service__ = __webpack_require__(18);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};











var HomeCreditoPage = /** @class */ (function () {
    function HomeCreditoPage(navCtrl, navParams, popoverCtrl, modalController, localStorage, loadingCtrl, AmCharts, menuCtrl, events, restService, alertaService, notificacion, mostrarNotif) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.popoverCtrl = popoverCtrl;
        this.modalController = modalController;
        this.localStorage = localStorage;
        this.loadingCtrl = loadingCtrl;
        this.AmCharts = AmCharts;
        this.menuCtrl = menuCtrl;
        this.events = events;
        this.restService = restService;
        this.alertaService = alertaService;
        this.notificacion = notificacion;
        this.mostrarNotif = mostrarNotif;
        this.combustibles = [];
        this.estaciones = [];
        this.saldoFavor = 2;
        this.saldoDisponible = 142216.33;
        this.creditoDisponible = 57783.67;
        this.limite = 200000;
        this.usuario = null;
        this.estatus = 1;
        this.estatusText = "Bloqueado";
        this.menuCtrl.enable(true, "authenticated");
        this.mostrarNotif.nav = this.navCtrl;
        this.multiplo = 100 / this.limite;
        this.usuario = navParams.get("usuario");
        console.log(JSON.stringify(this.usuario));
        if (this.usuario == null) {
            this.openSesion();
        }
        else {
            var data = {
                valor: 2,
                user: this.usuario
            };
            this.events.publish('menu:changed', data);
        }
        //this.usuario = 1;
        this.cargarEstaciones();
        //this.cargarPorcentajes();
    }
    HomeCreditoPage.prototype.openSesion = function () {
        var _this = this;
        this.localStorage.ready().then(function () {
            _this.localStorage.get("@userSession").then(function (data) {
                if (data != null) {
                    _this.usuario = data;
                    var dato = {
                        valor: 2,
                        user: _this.usuario
                    };
                    if (_this.usuario.IdClient == 0) {
                        var dato2 = {
                            valor: 1,
                            user: _this.usuario
                        };
                        _this.events.publish('menu:changed', dato2);
                    }
                    else {
                        _this.events.publish('menu:changed', dato);
                    }
                }
                else {
                    _this.alertaService.warnAlert(_this.restService.headerValidacion, "Usuario sin sesión, no se cargarán sus datos", null);
                }
            });
        });
    };
    HomeCreditoPage.prototype.ionViewDidLoad = function () {
        /*this.graficar();
        this.graficar2();
        this.graficar3();*/
    };
    HomeCreditoPage.prototype.cargarPorcentajes = function () {
        var _this = this;
        var loading = this.loadingCtrl.create();
        loading.present();
        this.restService.getToken().timeout(this.restService.timeOver).subscribe(function (data) {
            if (data == null) {
                loading.dismiss();
                _this.alertaService.warnAlert(_this.restService.headerValidacion, _this.restService.mensajeValidacionAdmin, null);
            }
            else {
                if (_this.usuario != null) {
                    var body = new __WEBPACK_IMPORTED_MODULE_5__angular_common_http__["d" /* HttpParams */]();
                    //var a = 44;
                    var a = _this.usuario.IdClient;
                    body.append("IdClient", a.toString());
                    var url = "status/account/" + a.toString();
                    console.log(url);
                    _this.restService.restServiceGETToken(url, new __WEBPACK_IMPORTED_MODULE_5__angular_common_http__["d" /* HttpParams */](), data.toString()).timeout(_this.restService.timeOver).subscribe(function (dataRegistro) {
                        if (Object.keys(dataRegistro['Response']).length != 0) {
                            var precios = dataRegistro['Response'];
                            _this.saldoFavor = precios.SaldoFavor;
                            if (_this.saldoFavor < 0)
                                _this.saldoFavor = 0;
                            _this.saldoDisponible = precios.SaldoDisponible;
                            if (_this.saldoDisponible < 0)
                                _this.saldoDisponible = 0;
                            _this.creditoDisponible = precios.SaldoConsumido;
                            if (_this.creditoDisponible < 0)
                                _this.creditoDisponible = 0;
                            _this.limite = precios.LimiteCredito;
                            _this.estatusText = precios.Estatus;
                            if (precios.Estatus == "Activo") {
                                _this.estatus = 2;
                            }
                            _this.graficar();
                            _this.graficar2();
                            _this.graficar3();
                            /*let elements: NodeListOf<Element> = (document.getElementsByTagName("tspan") as HTMLFormElement);
                            let ii = 0;
                            Array.prototype.forEach.call(elements, function (item) {
                               if(ii == 5 || ii == 11 || ii == 17) {} else {
                                   item.style.display = "none";
                               }
                               ii = ii + 1;
                            });*/
                            //this.combustibles.push(new CombustibleModel("Ixtaczoquitlan", 88.88, 88.88, 88.88, true));
                        }
                        else {
                            _this.alertaService.warnAlert(_this.restService.headerValidacion, "No se encontraron estaciones", null);
                        }
                        loading.dismiss();
                    }, function (error) {
                        loading.dismiss();
                        console.log(error);
                        _this.alertaService.errorAlert(_this.restService.headerError, _this.restService.mensajeError, null);
                    });
                }
                else {
                    loading.dismiss();
                }
            }
        }, function (error) {
            loading.dismiss();
            console.log(error);
            _this.alertaService.errorAlert(_this.restService.headerError, _this.restService.mensajeError, null);
        });
    };
    HomeCreditoPage.prototype.cargarEstaciones = function () {
        var _this = this;
        //api/station
        var loading = this.loadingCtrl.create();
        loading.present();
        this.restService.getToken().timeout(this.restService.timeOver).subscribe(function (data) {
            if (data == null) {
                loading.dismiss();
                _this.alertaService.warnAlert(_this.restService.headerValidacion, _this.restService.mensajeValidacionAdmin, null);
            }
            else {
                var body_1 = new __WEBPACK_IMPORTED_MODULE_5__angular_common_http__["d" /* HttpParams */]();
                _this.restService.restServiceGETToken("station/regular/busy/" + _this.usuario.IdClient, body_1, data.toString()).timeout(_this.restService.timeOver).subscribe(function (dataRegistroLast) {
                    if (dataRegistroLast['Status'] == 1) {
                        var idEstacionConcurrida_1 = dataRegistroLast['Response'] == 0 ? 1 : dataRegistroLast['Response'];
                        _this.restService.restServiceGETToken("station", body_1, data.toString()).timeout(_this.restService.timeOver).subscribe(function (dataRegistro) {
                            if (Object.keys(dataRegistro['Response']).length != 0) {
                                var arrayEstaciones = dataRegistro['Response'];
                                var i = 0;
                                for (var index = 0; index < arrayEstaciones.length; index++) {
                                    var estacion = arrayEstaciones[index];
                                    if (estacion.Nombre != "KANZ4 SUC. VERACRUZ") {
                                        if (idEstacionConcurrida_1 == estacion.Id) {
                                            _this.combustibles.push(new __WEBPACK_IMPORTED_MODULE_2__models_CombustibleModel__["a" /* CombustibleModel */](estacion.Nombre, 0, 0, 0, false, estacion.Id));
                                            i = estacion.Id;
                                        }
                                        //loading.dismiss();
                                        _this.estaciones.push(new __WEBPACK_IMPORTED_MODULE_2__models_CombustibleModel__["a" /* CombustibleModel */](estacion.Nombre, 0, 0, 0, false, estacion.Id));
                                    }
                                }
                                _this.cargarPrecio(_this.combustibles, i, data.toString());
                                loading.dismiss();
                                //this.combustibles.push(new CombustibleModel("Ixtaczoquitlan", 88.88, 88.88, 88.88, true));
                            }
                            else {
                                console.log("en cargaestaciones");
                                _this.alertaService.warnAlert(_this.restService.headerValidacion, "No se encontraron estaciones", null);
                            }
                        }, function (error) {
                            loading.dismiss();
                            console.log(error);
                            _this.alertaService.errorAlert(_this.restService.headerError, _this.restService.mensajeError, null);
                        });
                    }
                    else {
                        _this.alertaService.warnAlert(_this.restService.headerValidacion, "No se encontraró la última estación", null);
                    }
                }, function (error) {
                    loading.dismiss();
                    console.log(error);
                    _this.alertaService.errorAlert(_this.restService.headerError, _this.restService.mensajeError, null);
                });
            }
        }, function (error) {
            loading.dismiss();
            console.log(error);
            _this.alertaService.errorAlert(_this.restService.headerError, _this.restService.mensajeError, null);
        });
    };
    HomeCreditoPage.prototype.cargarPrecio = function (combustibles, Id, token) {
        var _this = this;
        var _loop_1 = function (index) {
            var estacion = combustibles[0];
            armaUrl = "gasoline/price/" + Id;
            this_1.restService.restServiceGETToken(armaUrl, new __WEBPACK_IMPORTED_MODULE_5__angular_common_http__["d" /* HttpParams */](), token).timeout(this_1.restService.timeOver).subscribe(function (dataEstacionPrecio) {
                if (Object.keys(dataEstacionPrecio['Response']).length != 0) {
                    var arrayPrecios = dataEstacionPrecio['Response'];
                    combustibles[0] = new __WEBPACK_IMPORTED_MODULE_2__models_CombustibleModel__["a" /* CombustibleModel */](estacion.nombre, arrayPrecios[0].Price, arrayPrecios[1].Price, arrayPrecios[2].Price, true, estacion.id);
                }
                else {
                    combustibles[0] = new __WEBPACK_IMPORTED_MODULE_2__models_CombustibleModel__["a" /* CombustibleModel */](estacion.nombre, 0, 0, 0, false);
                }
            }, function (error) {
                combustibles[0] = new __WEBPACK_IMPORTED_MODULE_2__models_CombustibleModel__["a" /* CombustibleModel */](estacion.nombre, 0, 0, 0, false);
                console.log(error);
                _this.alertaService.errorAlert(_this.restService.headerError, _this.restService.mensajeError, null);
            });
        };
        var this_1 = this, armaUrl;
        for (var index = 0; index < 1; index++) {
            _loop_1(index);
        }
    };
    HomeCreditoPage.prototype.graficar = function () {
        //amarillo #f7931e
        //verde    #009245
        //rojo     #c1272d
        var color = "";
        var porcentaje = (100 * this.saldoFavor) / this.limite;
        if (porcentaje >= 80) {
            color = "#009245";
        }
        else if (porcentaje < 80 && porcentaje >= 30) {
            color = "#f7931e";
        }
        else {
            color = "#c1272d";
        }
        if (this.saldoFavor > 0) {
            color = "#009245";
            porcentaje = 100;
        }
        else {
        }
        this.chartSaldoFavor = this.AmCharts.makeChart("chartdiv1", {
            "theme": "light",
            "type": "gauge",
            "rotate": true,
            "axes": [{
                    "topTextFontSize": 15,
                    "topTextYOffset": 55,
                    "axisColor": color,
                    "axisThickness": 1,
                    "endValue": 100,
                    "gridInside": true,
                    "inside": true,
                    "radius": "120%",
                    "valueInterval": 25,
                    "usePrefixes": false,
                    "labelsEnabled": false,
                    "tickColor": color,
                    "startAngle": -135,
                    "endAngle": 135,
                    "unit": "%",
                    "bandOutlineAlpha": 0
                }],
            "arrows": [{
                    "alpha": 1,
                    "color": color,
                    "innerRadius": "5%",
                    "nailRadius": 0,
                    "startWidth": 3,
                    "endWidth": 1,
                    "radius": "60%"
                }]
        });
        this.chartSaldoFavor.arrows[0].setValue(porcentaje);
        this.chartSaldoFavor.axes[0].setTopText(porcentaje.toFixed(0) + " %");
        // adjust darker band to new value
        //this.chartSaldoFavor.axes[0].bands[1].setEndValue(porcentaje);
    };
    HomeCreditoPage.prototype.graficar2 = function () {
        //amarillo #f7931e
        //verde    #009245
        //rojo     #c1272d
        var color = "";
        var porcentaje = (100 * this.saldoDisponible) / this.limite;
        ;
        if (porcentaje >= 85) {
            color = "#009245";
        }
        else if (porcentaje < 85 && porcentaje >= 50) {
            color = "#f7931e";
        }
        else {
            color = "#c1272d";
        }
        this.chartSaldoDisponible = this.AmCharts.makeChart("chartdiv2", {
            "theme": "light",
            "type": "gauge",
            "rotate": true,
            "axes": [{
                    "topTextFontSize": 15,
                    "topTextYOffset": 55,
                    "axisColor": color,
                    "axisThickness": 1,
                    "endValue": 100,
                    "gridInside": true,
                    "inside": true,
                    "radius": "120%",
                    "valueInterval": 25,
                    "usePrefixes": false,
                    "labelsEnabled": false,
                    "tickColor": color,
                    "startAngle": -135,
                    "endAngle": 135,
                    "unit": "%",
                    "bandOutlineAlpha": 0
                }],
            "arrows": [{
                    "alpha": 1,
                    "color": color,
                    "innerRadius": "5%",
                    "nailRadius": 0,
                    "startWidth": 3,
                    "endWidth": 1,
                    "radius": "60%"
                }]
        });
        this.chartSaldoDisponible.arrows[0].setValue(porcentaje);
        this.chartSaldoDisponible.axes[0].setTopText(porcentaje.toFixed(0) + " %");
        // adjust darker band to new value
        //this.chartSaldoDisponible.axes[0].bands[1].setEndValue(porcentaje);
    };
    HomeCreditoPage.prototype.graficar3 = function () {
        //amarillo #f7931e
        //verde    #009245
        //rojo     #c1272d
        var color = "";
        var porcentaje = (100 * this.creditoDisponible) / this.limite;
        if (porcentaje <= 50) {
            color = "#009245";
        }
        else if (porcentaje < 84 && porcentaje >= 51) {
            color = "#f7931e";
        }
        else {
            color = "#c1272d";
        }
        if (porcentaje > 100) {
            porcentaje = 100;
        }
        this.chartCreditoDisponible = this.AmCharts.makeChart("chartdiv3", {
            "theme": "light",
            "type": "gauge",
            "rotate": true,
            "axes": [{
                    "topTextFontSize": 15,
                    "topTextYOffset": 55,
                    "axisColor": color,
                    "axisThickness": 1,
                    "endValue": 100,
                    "gridInside": true,
                    "inside": true,
                    "radius": "120%",
                    "valueInterval": 25,
                    "usePrefixes": false,
                    "labelsEnabled": false,
                    "tickColor": color,
                    "startAngle": -135,
                    "endAngle": 135,
                    "unit": "%",
                    "bandOutlineAlpha": 0
                }],
            "arrows": [{
                    "alpha": 1,
                    "color": color,
                    "innerRadius": "5%",
                    "nailRadius": 0,
                    "startWidth": 3,
                    "endWidth": 1,
                    "radius": "60%"
                }]
        });
        this.chartCreditoDisponible.arrows[0].setValue(porcentaje);
        this.chartCreditoDisponible.axes[0].setTopText(porcentaje.toFixed() + " %");
        // adjust darker band to new value
        //this.chartCreditoDisponible.axes[0].setEndValue(porcentaje);
    };
    HomeCreditoPage.prototype.changeValue = function (c) {
        var _this = this;
        if (!c.expandible) {
            var loading_1 = this.loadingCtrl.create();
            loading_1.present();
            this.restService.getToken().timeout(this.restService.timeOver).subscribe(function (data) {
                if (data == null) {
                    loading_1.dismiss();
                    _this.alertaService.warnAlert(_this.restService.headerValidacion, _this.restService.mensajeValidacionAdmin, null);
                }
                else {
                    var body = new __WEBPACK_IMPORTED_MODULE_5__angular_common_http__["d" /* HttpParams */]();
                    var armaUrl = "gasoline/price/" + c.id;
                    _this.restService.restServiceGETToken(armaUrl, new __WEBPACK_IMPORTED_MODULE_5__angular_common_http__["d" /* HttpParams */](), data.toString()).timeout(_this.restService.timeOver).subscribe(function (dataEstacionPrecio) {
                        if (Object.keys(dataEstacionPrecio['Response']).length != 0) {
                            var arrayPrecios = dataEstacionPrecio['Response'];
                            c.precioMagna = arrayPrecios[0].Price;
                            c.precioPremium = arrayPrecios[1].Price;
                            c.precioDiesel = arrayPrecios[2].Price;
                            c.expandible = true;
                        }
                        else {
                            _this.alertaService.errorAlert(_this.restService.headerValidacion, "La estación no cuenta con precios", null);
                        }
                        loading_1.dismiss();
                    }, function (error) {
                        console.log(error);
                        _this.alertaService.errorAlert(_this.restService.headerError, _this.restService.mensajeError, null);
                    });
                }
            }, function (error) {
                loading_1.dismiss();
                console.log(error);
                _this.alertaService.errorAlert(_this.restService.headerError, _this.restService.mensajeError, null);
            });
        }
        else {
            c.expandible = !c.expandible;
        }
    };
    HomeCreditoPage.prototype.presentPopover = function (myEvent) {
        var popover = this.popoverCtrl.create(__WEBPACK_IMPORTED_MODULE_3__home_credito_estaciones_list_home_estaciones_list__["a" /* HomeEstacionesListPage */], { estaciones: this.estaciones });
        popover.present({
            ev: myEvent
        });
    };
    HomeCreditoPage.prototype.ionViewWillEnter = function () {
        var _this = this;
        this.localStorage.ready().then(function () {
            _this.localStorage.get("@userSession").then(function (data) {
                if (data != null)
                    _this.usuario = data;
            });
        });
    };
    HomeCreditoPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-home-credito',template:/*ion-inline-start:"C:\Users\Administrador\kenergy\src\pages\home-credito\home-credito.html"*/'<ng-container *ngIf="usuario != null">\n    <ion-header>\n    <ion-navbar color="titulo">\n        <button ion-button menuToggle>\n            <ion-icon name="menu"></ion-icon>\n        </button>\n        <ion-title class="tituloHeader">BIENVENID@<br/>{{usuario.Nombre}}</ion-title>\n    </ion-navbar>\n</ion-header>\n\n<ion-content padding style="\nbackground-image: url(assets/imgs/fondo.jpg); \nbackground-size: 100%;\nbackground-position: bottom center;\nbackground-repeat: no-repeat;\nbackground-color: white;">\n\n    <div class="animated fadeIn divGasoline" id="divAux">\n        <ion-list>\n            <div *ngFor="let c of combustibles">\n<!--                <div class="expandible" (click)="changeValue(c)">-->\n						<div class="expandible" (click)="presentPopover($event)">\n                    <ion-icon name="pin"></ion-icon>\n\n                    <div class="nombreEstacion">{{c.nombre}}</div>\n					<ion-icon name="more" style="background-image: url(assets/imgs/home/more.png);" class="more"></ion-icon>\n                </div>\n                <div *ngIf="c.expandible" class="animated fadeIn">\n                    <div class="containerGas">\n                        <img src="assets/imgs/home/verde.png" alt="logo" class="animated bounceInDown imageGas" />\n                        <div class="precioGas" style="font-size: 190%;">\n                            ${{c.precioMagna}}\n                        </div>\n                    </div>\n                    <div class="containerGas">\n                        <img src="assets/imgs/home/rojo.png" alt="logo" class="animated bounceInDown imageGas" />\n                        <div class="precioGas" style="font-size: 190%;">\n                            ${{c.precioPremium}}\n                        </div>\n                    </div>\n                    <div class="containerGas">\n                        <img src="assets/imgs/home/negro.png" alt="logo" class="animated bounceInDown imageGas" />\n                        <div class="precioGas" style="font-size: 190%;">\n                            ${{c.precioDiesel}}\n                        </div>\n                    </div>\n                </div>\n            </div>\n        </ion-list>\n    </div>\n\n    <div style="width:100%;border-top: 1px solid;margin-top: 5%;">\n        <div style="width: 50%;display:inline-block;vertical-align: text-bottom;text-align: -webkit-center;">\n            <div style="text-align: center;\n            font-size: 120%;\n            position: absolute;\n            \n            margin-left: 7px;" class="tituloHeader"><strong>Status</strong></div>\n            <div \n            style="background-color: #c1272d;\n            color: #fff;\n            width: 35%;\n            right: 46%;\n            border-radius: 14px;\n            margin-bottom: 0px;\n            position: absolute;\n            height: 50px;\n            display: grid;\n            align-items: center;\n            font-size: 20px;"\n            [ngStyle]="{\'background-color\':estatusText == \'Activo\' ? \'#009245\' : \'#c1272d\'}">\n                {{estatusText}}\n            </div>\n        </div>\n        <div style="width: 35%;\n    left: 55%;\n    display: inline-block;\n    background-color: #e97523;\n    /* border: 1px solid #000; */\n    border-radius: 14px;\n    padding: 5px;\n    margin-top: 17px;\n    margin-bottom: 0px;\n    position: absolute;\n    height: 50px;">\n            <div style="font-size:110%;text-align: center">Límite de Crédito</div>\n            <div style="font-size:110%;text-align: center"><strong>$ {{limite | number: \'2.\'}}</strong></div>\n            <!--<img src="assets/imgs/home/100porcent.PNG" alt="logo" class="animated bounceInDown" style="width:100%" />-->\n            <!-- <div id="chartdiv" [style.width.%]="100" [style.height.px]="200"></div> -->\n        </div>\n        <div style="width:100%;overflow: scroll;height: 223px; \n     margin-top: 95px;">\n     		  <div class="row">\n            <div style="text-align:center" class="col">\n                SALDO<br/>A FAVOR\n                <div style="text-align:center"><strong>{{saldoFavor | currency }}</strong></div>\n            </div>\n\n            <div style="text-align:center;" class="col">SALDO CONSUMIDO\n                <div style="text-align:center"><strong>{{creditoDisponible | currency}}</strong></div>\n            </div>\n            \n            <div style="text-align:center" class="col">\n                SALDO DISPONIBLE\n                <div style="text-align:center"><strong>{{saldoDisponible | currency}}</strong></div>\n            </div>\n           </div>\n            \n           <div class="row">\n            <div style="text-align:center; margin-top: 20px;" class="col">\n                <div align="center" id="chartdiv1" [style.height.px]="100" [style.width.vw]="27">\n\n                </div>\n            </div>\n\n            <div style="text-align:center; margin-top: 20px;" class="col">\n                <div id="chartdiv3" [style.height.px]="100" [style.width.vw]="27"></div>\n            </div>\n            \n				<div style="text-align:center; margin-top: 20px;" class="col">\n                <div id="chartdiv2" [style.height.px]="100" [style.width.vw]="27"></div>\n            </div>\n           </div>\n        </div>\n    </div>\n\n</ion-content>\n\n<ion-fab top right class="animated swing">\n    <button ion-fab color="light" (click)="mostrarNotif.abrirNotificacion()">\n        <img src="assets/imgs/home/gas-station.png" alt="logo" class="claseImg animated fadeIn" />\n    </button>\n    <button *ngIf="notificacion.num > 0" ion-fab color="light" (click)="mostrarNotif.abrirNotificacion()" class="miniBoton">\n        {{notificacion.num}}\n    </button>\n</ion-fab>\n</ng-container>'/*ion-inline-end:"C:\Users\Administrador\kenergy\src\pages\home-credito\home-credito.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["m" /* NavParams */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["o" /* PopoverController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* ModalController */],
            __WEBPACK_IMPORTED_MODULE_8__ionic_storage__["b" /* Storage */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* LoadingController */], __WEBPACK_IMPORTED_MODULE_4__amcharts_amcharts3_angular__["b" /* AmChartsService */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* MenuController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["c" /* Events */],
            __WEBPACK_IMPORTED_MODULE_7__providers_rest_service__["a" /* RestServiceProvider */], __WEBPACK_IMPORTED_MODULE_6__providers_alerta_service__["a" /* AlertaServiceProvider */],
            __WEBPACK_IMPORTED_MODULE_9__services_notificaciones_service__["a" /* NotificacionService */], __WEBPACK_IMPORTED_MODULE_10__services_abrirnotificaciones_service__["a" /* AbrirnotificacionesService */]])
    ], HomeCreditoPage);
    return HomeCreditoPage;
}());

//# sourceMappingURL=home-credito.js.map

/***/ })

},[427]);
//# sourceMappingURL=main.js.map