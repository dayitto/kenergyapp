import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { FacturacionPage } from './facturacion';

@NgModule({
  declarations: [
    FacturacionPage,
  ],
  imports: [
    IonicPageModule.forChild(FacturacionPage),
  ],
})
export class FacturacionPageModule {}
