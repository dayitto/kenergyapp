import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { VehiculosCreditoPage } from './vehiculos-credito';

@NgModule({
  declarations: [
    VehiculosCreditoPage,
  ],
  imports: [
    IonicPageModule.forChild(VehiculosCreditoPage),
  ],
})
export class VehiculosCreditoPageModule {}
