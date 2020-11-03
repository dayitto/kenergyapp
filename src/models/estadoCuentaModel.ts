export class EstadoCuentaModel {
    constructor(
        public saldoFavor: any = "",
        public pendienteFacturar: any = "",
        public saldoFacturado: any = "",
        public saldoAcumulado: any = "",
        public saldoDisponible: any = "",
        public estacion: any = "",
        public creditoTotal: any = "",
    ) { }
}