import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/timeout';
import { HTTP } from '@ionic-native/http';

@Injectable()
export class RestServiceProvider {
  //Path de ambiente local
  //public pathService: String = "http://localhost/ruta/";
  //Path de ambiente producción  http://localhost:8100/api
  //public pathService: String = "http://descargadocs.grupotabar.net/WebAPI/api/";
  public pathService: String = "http://169.60.32.119/api/";

  public headerError: string = "¡Error!";
  public mensajeError: string = "Verifica tu conexión y datos ó contacte al administrador";
  public headerValidacion: string = "¡Advertencia!";
  public headerExito: string = "¡Bien!";
  public mensajeValidacionAdmin: string = "Ha ocurrido un error en el servidor, contacte al administrador";
  public mensajeValidacionLogin: string = "Verifica tus credenciales";

  public timeOver: number = 50000;// 10 segundos de espera en servicios

  constructor(public http: HttpClient, public httpNative: HTTP) {
  }

  public restServiceGET(path: string, params: any) {
    return this.http.get(this.pathService + path, params);
  }

  public restServicePOST(path: string, params: any) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/x-www-form-urlencoded'
      })
    };
    //{},{headers: headers,params:params}
    return this.http.post(this.pathService + path, params, httpOptions);
  }

  public restServicePOSTToken(path: string, body: HttpParams, token: string) {
    let headers = new HttpHeaders();
    headers = headers.set('Authorization', 'Bearer ' + token);
    return this.http.post(this.pathService + path, body, { headers });
  }

  public restServicePOSTTokenXForm(path: string, body: any, token: string) {
    let headers = new HttpHeaders();
    //application/x-www-form-urlencoded
    headers = headers.set('Authorization', 'Bearer ' + token);
    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': 'Bearer ' + token,
        'Content-Type': 'application/x-www-form-urlencoded'
      })
    };
    return this.http.post(this.pathService + path, body, httpOptions);
  }

  public restServicePUTToken(path: string, body: any, token: string) {
    let headers = new HttpHeaders();
    headers = headers.set('Authorization', 'Bearer ' + token);

    return this.http.put(this.pathService + path, body, { headers });
  }

  public restServiceGETToken(path: string, body: HttpParams, token: string) {
    let headers = new HttpHeaders();
    headers = headers.set('Authorization', 'Bearer ' + token);
    return this.http.get(this.pathService + path, { headers, params: body });
  }

  public getToken() {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/x-www-form-urlencoded'
      })
    };
    const body = new HttpParams()
      .set('username', "demo")
      .set('password', "123456");
    //{},{headers: headers,params:params}

    return this.http.post(this.pathService + "session/authenticate", body, httpOptions);
  }

  public restServiceDELETEToken(path: string, token: string) {
    let headers = new HttpHeaders();
    headers = headers.set('Authorization', 'Bearer ' + token);
    return this.http.delete(this.pathService + path, { headers });
  }
}
