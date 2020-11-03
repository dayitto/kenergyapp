import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MiAutoInfoPage } from './mi-auto-info';

@NgModule({
  declarations: [
    MiAutoInfoPage,
  ],
  imports: [
    IonicPageModule.forChild(MiAutoInfoPage),
  ],
})
export class MiAutoInfoPageModule {}
