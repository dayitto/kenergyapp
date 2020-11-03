import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MiAutoPage } from './mi-auto';
import { QRCodeModule } from 'angularx-qrcode';

@NgModule({
  declarations: [
    MiAutoPage,
  ],
  imports: [
    IonicPageModule.forChild(MiAutoPage),
    QRCodeModule
  ],
})
export class MiAutoPageModule {}
