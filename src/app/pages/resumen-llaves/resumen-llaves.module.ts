import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ResumenLlavesPageRoutingModule } from './resumen-llaves-routing.module';

import { ResumenLlavesPage } from './resumen-llaves.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    ResumenLlavesPageRoutingModule
  ],
  declarations: [ResumenLlavesPage]
})
export class ResumenLlavesPageModule {}
