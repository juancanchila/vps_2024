import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ResumenRuta8PageRoutingModule } from './resumen-ruta8-routing.module';

import { ResumenRuta8Page } from './resumen-ruta8.page';
import { ComponentsModule } from '../../components/components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    ResumenRuta8PageRoutingModule,
    ComponentsModule
  ],
  declarations: [ResumenRuta8Page]
})
export class ResumenRuta8PageModule {}
