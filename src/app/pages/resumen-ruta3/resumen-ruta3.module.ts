import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ResumenRuta3PageRoutingModule } from './resumen-ruta3-routing.module';

import { ResumenRuta3Page } from './resumen-ruta3.page';
import { ComponentsModule } from 'src/app/components/components.module';
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    ResumenRuta3PageRoutingModule,
    ComponentsModule
  ],
  declarations: [ResumenRuta3Page]
})
export class ResumenRuta3PageModule {}
