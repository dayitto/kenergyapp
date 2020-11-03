export class VehiculoModel {
    constructor(
        public selected: boolean = false,
        public Placa: string = "",
        public circula: number = 1, //por default circula
        public Modelo: string = "",
        public tipoGasolina: number = 1,
        public Tipo: Number = 0,
        //De la pantalla de mi auto
        public km: number = 999999,
        public id: number = 0,
        public Id: number = 0,
        public Puntos: number = 15430,
        public Alias: string = "",
        public Marca: string = "",
        public Anio: Number = null,
        public Estado: string = "",
        public Rendimiento: Number = null,
        public Kilometraje: Number = null,
        public FechaPoliza: Date = new Date(),
        public proximaFechaVerificacion: Date = new Date(),
        public agencia: string = "",
        public TelPoliza: string = "",
        //Datos del seguro
        public Cseguro: string = "",
        public Npoliza: string = "",
        public FechaTenencia: Date = new Date(),
        public montoPoliza: Number = null,
        public telefonoSeguro: string = "",
        //alertas y recordatorios
        public verificacion: boolean = false,
        public vencimiento: boolean = false,
        public mantenimiento: boolean = false,
        public mantenimientoRango: boolean = false,
        public pagoTenencia: boolean = false,
        public hoyNoCircula: boolean = false,
        public descripcion:String = "",
        public seleccionado:boolean = false,
        public Den: String = "",
        public aseguro: number = 0,
        public amantenimiento: number = 0

    ) { }

}