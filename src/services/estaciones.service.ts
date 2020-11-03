import { Injectable } from "@angular/core";

@Injectable()
export class EstacionesService {

    distancia(lat1: number, long1: number, lat2: number, long2: number): number{
        var R = 6378.137;
        var dLat = this.rad( lat2 - lat1 );
        var dLong = this.rad( long2 - long1 );
        var a = Math.sin(dLat/2) * Math.sin(dLat/2) + Math.cos(this.rad(lat1)) * Math.cos(this.rad(lat2)) * Math.sin(dLong/2) * Math.sin(dLong/2);
        var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
        var d = R * c;
        return d; //Retorna tres decimales
    }

    rad = (x: number) => x*Math.PI/180;
    
}