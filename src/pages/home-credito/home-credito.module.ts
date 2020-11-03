import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { HomeCreditoPage } from './home-credito';

@NgModule({
  declarations: [
    HomeCreditoPage,
  ],
  imports: [
    IonicPageModule.forChild(HomeCreditoPage),
  ],
})
export class HomeCreditoPageModule {}
