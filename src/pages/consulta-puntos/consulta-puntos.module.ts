import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ConsultaPuntosPage } from './consulta-puntos';

@NgModule({
  declarations: [
    ConsultaPuntosPage,
  ],
  imports: [
    IonicPageModule.forChild(ConsultaPuntosPage),
  ],
})
export class ConsultaPuntosPageModule {}
