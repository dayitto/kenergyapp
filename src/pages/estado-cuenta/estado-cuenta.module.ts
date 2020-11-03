import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { EstadoCuentaPage } from './estado-cuenta';

@NgModule({
  declarations: [
    EstadoCuentaPage,
  ],
  imports: [
    IonicPageModule.forChild(EstadoCuentaPage),
  ],
})
export class EstadoCuentaPageModule {}
