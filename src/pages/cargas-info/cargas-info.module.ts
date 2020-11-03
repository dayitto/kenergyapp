import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CargasInfoPage } from './cargas-info';

@NgModule({
  declarations: [
    CargasInfoPage,
  ],
  imports: [
    IonicPageModule.forChild(CargasInfoPage),
  ],
})
export class CargasInfoPageModule {}
