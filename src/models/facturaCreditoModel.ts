export class FacturaCreditoModel {
    constructor(
        public folio: string = "",
        public estacion: string = "",
        public fecha: string = "",
        public monto: number = 0,
        public id:number=0,
        public idSuc:number=0
    ) { }

}