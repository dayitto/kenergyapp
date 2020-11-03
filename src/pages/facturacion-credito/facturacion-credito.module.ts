import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { FacturacionCreditoPage } from './facturacion-credito';

@NgModule({
  declarations: [
    FacturacionCreditoPage,
  ],
  imports: [
    IonicPageModule.forChild(FacturacionCreditoPage),
  ],
})
export class FacturacionCreditoPageModule {}
