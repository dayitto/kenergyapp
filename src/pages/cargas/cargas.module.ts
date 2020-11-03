import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CargasPage } from './cargas';

@NgModule({
  declarations: [
    CargasPage,
  ],
  imports: [
    IonicPageModule.forChild(CargasPage),
  ],
})
export class CargasPageModule {}
