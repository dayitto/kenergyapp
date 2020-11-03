import { Injectable } from "@angular/core";
import { MenuModel } from "../models/MenuModel";

@Injectable()
export class UsuarioService {
    public tipo: number = 0;
    public tieneVehiculos: boolean = false;
    public nombreUsuario: string = "";
    public pages: MenuModel[] = [];
    public puntos: number = 0;

    cambiarNumAutos(num: number){
        if(this.pages.length > 0)
            this.pages[3].parametro2 = num < 1 ? "Sin autos" : num == 1 ? "1 auto" : num + " autos";
    }

    cambiarNombre(nombre: string){
        if(this.pages.length > 0)
            this.pages[1].nombre = nombre;
    }
}