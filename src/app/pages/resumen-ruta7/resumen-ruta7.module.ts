import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ResumenRuta7PageRoutingModule } from './resumen-ruta7-routing.module';

import { ResumenRuta7Page } from './resumen-ruta7.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    ResumenRuta7PageRoutingModule
  ],
  declarations: [ResumenRuta7Page]
})
export class ResumenRuta7PageModule {}
