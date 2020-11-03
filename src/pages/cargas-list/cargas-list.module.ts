import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CargasListPage } from './cargas-list';

@NgModule({
  declarations: [
    CargasListPage,
  ],
  imports: [
    IonicPageModule.forChild(CargasListPage),
  ],
})
export class CargasListPageModule {}
