export class PremioModel {
    constructor(
        public descripcion: string = "",
        public canje: Number = null,
        public canjeOpcional: number = 0,
        public monto: number = 0,
        public img: string = "",
        public nombre: string = "",
        public detalle: string = "",
        public id: number = 0,
        public clave: string = "",
        public seleccionado: boolean = false,
        public seleccionado2: boolean = false
    ) { }
}