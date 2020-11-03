import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { RegistroPreviewPage } from './registro-preview';

@NgModule({
  declarations: [
    RegistroPreviewPage,
  ],
  imports: [
    IonicPageModule.forChild(RegistroPreviewPage),
  ],
})
export class RegistroPreviewPageModule {}
