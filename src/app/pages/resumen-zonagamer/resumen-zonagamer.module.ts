import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ResumenZonagamerPageRoutingModule } from './resumen-zonagamer-routing.module';

import { ResumenZonagamerPage } from './resumen-zonagamer.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    ResumenZonagamerPageRoutingModule
  ],
  declarations: [ResumenZonagamerPage]
})
export class ResumenZonagamerPageModule {}
