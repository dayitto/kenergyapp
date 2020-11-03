import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MisSolicitudesPage } from './mis-solicitudes';

@NgModule({
  declarations: [
    MisSolicitudesPage,
  ],
  imports: [
    IonicPageModule.forChild(MisSolicitudesPage),
  ],
})
export class MisSolicitudesPageModule {}
