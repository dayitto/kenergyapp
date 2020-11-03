import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { EstacionesListPage } from './estaciones-list';

@NgModule({
  declarations: [
    EstacionesListPage,
  ],
  imports: [
    IonicPageModule.forChild(EstacionesListPage),
  ],
})
export class EstacionesListPageModule {}
