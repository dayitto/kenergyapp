export class ProductoModel {
    constructor(
        public id: number = 0,
        public descripcion: string = "Todos",
        public canje:number = 0,
        public canjePts:number = 0,
    ) { }
}