export class MenuModel {
    constructor(
        public nombre: string,
        public img: string,
        public color: string,
        public component: any,
        public parametro: any = null,
        public parametro2: any = null
    ) { }

}