export class FacturaModel {
    constructor(
        public numeroCliente: string = "",
        public rfc: string = "",
        public razonSocial: string = "",
        public correoElectronico: string = "",
        public calle:string = "",
        public numeroExterior:string = "",
        public numeroInterior:string = "",
        public codigoPostal:string = "",
        public estado:string = "",
        public municipio:string = "",
        public colonia:string = "",
        public id: Number = null,
        //factura cobrada
        public modelo: string = "",
        public fecha: string = "",
        public monto: Number = null,
    ) { }

}