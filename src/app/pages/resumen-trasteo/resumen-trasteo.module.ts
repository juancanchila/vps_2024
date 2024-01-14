import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ResumenTrasteoPageRoutingModule } from './resumen-trasteo-routing.module';

import { ResumenTrasteoPage } from './resumen-trasteo.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    ResumenTrasteoPageRoutingModule
  ],
  declarations: [ResumenTrasteoPage]
})
export class ResumenTrasteoPageModule {}
