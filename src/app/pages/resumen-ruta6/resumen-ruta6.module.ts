import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ResumenRuta6PageRoutingModule } from './resumen-ruta6-routing.module';

import { ResumenRuta6Page } from './resumen-ruta6.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    ResumenRuta6PageRoutingModule
  ],
  declarations: [ResumenRuta6Page]
})
export class ResumenRuta6PageModule {}
