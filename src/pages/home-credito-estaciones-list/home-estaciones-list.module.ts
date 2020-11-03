import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { HomeEstacionesListPage } from './home-estaciones-list';

@NgModule({
  declarations: [
    HomeEstacionesListPage,
  ],
  imports: [
    IonicPageModule.forChild(HomeEstacionesListPage),
  ],
})
export class HomeEstacionesListPageModule {}
