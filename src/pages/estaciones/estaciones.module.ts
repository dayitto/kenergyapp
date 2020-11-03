import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { EstacionesPage } from './estaciones';
import { AgmCoreModule } from '@agm/core';
import { AgmDirectionModule } from 'agm-direction';  

@NgModule({
  declarations: [
    EstacionesPage,
  ],
  imports: [
    IonicPageModule.forChild(EstacionesPage),
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyAkw9aCrnsbUgVgca-ZRxDQDuEIzkcQUas'
    }),
    AgmDirectionModule
  ],
})
export class EstacionesPageModule {}
