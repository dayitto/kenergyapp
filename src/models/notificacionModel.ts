export class NotificacionModel {
    constructor(
    	  public id: Number = null,
        public titulo: string = "",
        public fecha: string = "",
        public mensaje: string = "",
        public mostrar: boolean = false,
        public visto: boolean = false
    ) { }
}