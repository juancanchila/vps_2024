import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ResumenRuta10PageRoutingModule } from './resumen-ruta10-routing.module';

import { ResumenRuta10Page } from './resumen-ruta10.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    ResumenRuta10PageRoutingModule
  ],
  declarations: [ResumenRuta10Page]
})
export class ResumenRuta10PageModule {}
