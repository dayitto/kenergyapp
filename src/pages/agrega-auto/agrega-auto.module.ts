import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AgregaAutoPage } from './agrega-auto';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AgregaAutoPage,
  ],
  imports: [
    ReactiveFormsModule,
    IonicPageModule.forChild(AgregaAutoPage),
  ],
})
export class AgregaAutoPageModule {}
