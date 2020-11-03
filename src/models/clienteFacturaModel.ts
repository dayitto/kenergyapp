export class ClienteFacturaModel {
    constructor(
        public id: number = 0,
        public rfc: string,
        public email: string,
        public razon: string
    ) { }
}