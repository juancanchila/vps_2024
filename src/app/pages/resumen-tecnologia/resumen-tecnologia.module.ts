import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ResumenTecnologiaPageRoutingModule } from './resumen-tecnologia-routing.module';

import { ResumenTecnologiaPage } from './resumen-tecnologia.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    ResumenTecnologiaPageRoutingModule
  ],
  declarations: [ResumenTecnologiaPage]
})
export class ResumenTecnologiaPageModule {}
