export class CombustibleModel {
    constructor(
        public nombre: string,
        public precioMagna: number,
        public precioPremium: number,
        public precioDiesel: number,
        public expandible: boolean = false,
        public id: number = 0,
        public direccion: string="",
        public lat:string="",
        public long:string="",
        public masCerca: boolean = false
    ) { }

}