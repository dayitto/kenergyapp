import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { DatosFacturacionPage } from './datos-facturacion';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    DatosFacturacionPage,
  ],
  imports: [
    ReactiveFormsModule,
    IonicPageModule.forChild(DatosFacturacionPage),
  ],
})
export class DatosFacturacionPageModule {}
