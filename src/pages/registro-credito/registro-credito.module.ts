import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { RegistroCreditoPage } from './registro-credito';

@NgModule({
  declarations: [
    RegistroCreditoPage,
  ],
  imports: [
    IonicPageModule.forChild(RegistroCreditoPage),
  ],
})
export class RegistroCreditoPageModule {}
