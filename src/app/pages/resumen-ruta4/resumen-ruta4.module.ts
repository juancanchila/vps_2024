import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ResumenRuta4PageRoutingModule } from './resumen-ruta4-routing.module';

import { ResumenRuta4Page } from './resumen-ruta4.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    ResumenRuta4PageRoutingModule
  ],
  declarations: [ResumenRuta4Page]
})
export class ResumenRuta4PageModule {}
