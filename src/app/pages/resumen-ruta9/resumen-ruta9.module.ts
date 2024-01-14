import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ResumenRuta9PageRoutingModule } from './resumen-ruta9-routing.module';

import { ResumenRuta9Page } from './resumen-ruta9.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    ResumenRuta9PageRoutingModule
  ],
  declarations: [ResumenRuta9Page]
})
export class ResumenRuta9PageModule {}
