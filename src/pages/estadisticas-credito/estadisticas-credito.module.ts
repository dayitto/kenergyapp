import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { EstadisticasCreditoPage } from './estadisticas-credito';

@NgModule({
  declarations: [
    EstadisticasCreditoPage,
  ],
  imports: [
    IonicPageModule.forChild(EstadisticasCreditoPage),
  ],
})
export class EstadisticasCreditoPageModule {}
