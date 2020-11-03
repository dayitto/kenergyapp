export class CargasModel {
    constructor(
        public estacion: string = "",
        public numCarga: string = "",
        public fecha: string = "",
        public vehiculo: string = "",
        public chofer: string = "",
        public producto: string = "",
        public cantidadLts: Number = null,
        public precioLts: Number = null,
        public monto: Number = null,
        public kilometraje: Number = null,
        public rendimiento: Number = null,
        public tipoPago: string = "",
        public puntos: Number = null,
        public isFacturada: number = 0,
    ) { }

}