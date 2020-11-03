webpackJsonp([0],{

/***/ 718:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MisSolicitudesPageModule", function() { return MisSolicitudesPageModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__mis_solicitudes__ = __webpack_require__(720);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};



var MisSolicitudesPageModule = /** @class */ (function () {
    function MisSolicitudesPageModule() {
    }
    MisSolicitudesPageModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["I" /* NgModule */])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_2__mis_solicitudes__["a" /* MisSolicitudesPage */],
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* IonicPageModule */].forChild(__WEBPACK_IMPORTED_MODULE_2__mis_solicitudes__["a" /* MisSolicitudesPage */]),
            ],
        })
    ], MisSolicitudesPageModule);
    return MisSolicitudesPageModule;
}());

//# sourceMappingURL=mis-solicitudes.module.js.map

/***/ }),

/***/ 720:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MisSolicitudesPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_alerta_service__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__providers_rest_service__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__ionic_storage__ = __webpack_require__(12);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var MisSolicitudesPage = /** @class */ (function () {
    function MisSolicitudesPage(navCtrl, navParams, localStorage, alertaService, restService, loadingCtrl) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.localStorage = localStorage;
        this.alertaService = alertaService;
        this.restService = restService;
        this.loadingCtrl = loadingCtrl;
        this.usuario = null;
        this.openSesion();
    }
    MisSolicitudesPage.prototype.openSesion = function () {
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
    MisSolicitudesPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad MisSolicitudesPage');
    };
    MisSolicitudesPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-mis-solicitudes',template:/*ion-inline-start:"C:\Users\Administrador\kenergy\src\pages\mis-solicitudes\mis-solicitudes.html"*/'<!--\n  Generated template for the MisSolicitudesPage page.\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n  Ionic pages and navigation.\n-->\n<ion-header>\n\n  <ion-navbar>\n    <ion-title>mis-solicitudes</ion-title>\n  </ion-navbar>\n\n</ion-header>\n\n\n<ion-content padding>\n\n</ion-content>\n'/*ion-inline-end:"C:\Users\Administrador\kenergy\src\pages\mis-solicitudes\mis-solicitudes.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["m" /* NavParams */],
            __WEBPACK_IMPORTED_MODULE_4__ionic_storage__["b" /* Storage */],
            __WEBPACK_IMPORTED_MODULE_2__providers_alerta_service__["a" /* AlertaServiceProvider */], __WEBPACK_IMPORTED_MODULE_3__providers_rest_service__["a" /* RestServiceProvider */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* LoadingController */]])
    ], MisSolicitudesPage);
    return MisSolicitudesPage;
}());

//# sourceMappingURL=mis-solicitudes.js.map

/***/ })

});
//# sourceMappingURL=0.js.map