import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { VisualizadorXmlPage } from './visualizador-xml';

@NgModule({
  declarations: [
    VisualizadorXmlPage,
  ],
  imports: [
    IonicPageModule.forChild(VisualizadorXmlPage),
  ],
})
export class VisualizadorXmlPageModule {}
