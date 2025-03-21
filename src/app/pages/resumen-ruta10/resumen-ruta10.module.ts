import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ResumenRuta10PageRoutingModule } from './resumen-ruta10-routing.module';

import { ResumenRuta10Page } from './resumen-ruta10.page';
import { ComponentsModule } from 'src/app/components/components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    ResumenRuta10PageRoutingModule,
    ComponentsModule
  ],
  declarations: [ResumenRuta10Page]
})
export class ResumenRuta10PageModule {}
