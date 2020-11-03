import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CargasCreditoPage } from './cargas-credito';

@NgModule({
  declarations: [
    CargasCreditoPage,
  ],
  imports: [
    IonicPageModule.forChild(CargasCreditoPage),
  ],
})
export class CargasCreditoPageModule {}
