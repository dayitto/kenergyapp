import { Injectable } from "@angular/core";
import { FormGroup, FormControl } from '@angular/forms';

@Injectable()
export class VehiculoService {
    public loginForm = new FormGroup({
        //alias: new FormControl(''),
        marca: new FormControl(''),
        modelo: new FormControl(''),
        anio: new FormControl(''),
        mma: new FormControl(''),
        puntos: new FormControl(0),
        km: new FormControl(''),
        placa: new FormControl(''),
        estado: new FormControl(''),
        rendimiento: new FormControl(''),
        combustible: new FormControl(0),
        circula: new FormControl(0),
        periodo: new FormControl(0),
        uverif: new FormControl(''),
        pverif: new FormControl(''),
        agencia: new FormControl(''),
        telAgencia: new FormControl(''),
        cSeguro: new FormControl(''),
        nPoliza: new FormControl(''),
        fPoliza: new FormControl(''),
        mPoliza: new FormControl(0),
        telefono: new FormControl(''),
        tenencia: new FormControl(''),
        checkVerificacion: new FormControl(false),
        checkSeguro: new FormControl(false),
        checkMantenimiento: new FormControl(false),
        fTenencia: new FormControl(0),
        checkTenencia: new FormControl(false),
        checkNocircula: new FormControl(false),
        tipo: new FormControl(0)
      });
    
      public loginFormValidator = {
        principales: {
          mensaje: ''
          },
          placa: {
            mensaje: ''
            },
          tipo: {
            mensaje: ''
            }
      };
  
}