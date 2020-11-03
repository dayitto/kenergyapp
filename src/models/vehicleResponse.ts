export class VehicleResponse {
    constructor(
        public Id: number = 0,
        public Bloqueado: number = 0,
        public Descripcion: string = "",
        public Estado: string = "",
        public Responsable: string = "",
        public Placas: string = "",
        public Kilometraje: number = 0,
        public DiaCarga: number = 0,
        public Hraini: string = "",
        public Hrafin: string = "",
        public Hraini2: string = "",
        public Hrafin2: string = "",
        public Hraini3: string = "",
        public Hrafin3: string = "",
        public Estacion: number = 0,
        public Combustible: number = 0,
        public LimiteCarga: number = 0,
        public LimiteDia: number = 0,
        public LimiteSemana: number = 0,
        public LimiteMes: number = 0
    ) { }

}