import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { RegistroValidaPage } from './registro-valida';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    RegistroValidaPage,
  ],
  imports: [
    ReactiveFormsModule,
    IonicPageModule.forChild(RegistroValidaPage),
  ],
})
export class RegistroValidaPageModule {}
