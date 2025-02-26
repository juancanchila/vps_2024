import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ResumenRutaPageRoutingModule } from './resumen-ruta-routing.module';

import { ResumenRutaPage } from './resumen-ruta.page';
import { ComponentsModule } from 'src/app/components/components.module';
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    ResumenRutaPageRoutingModule,
    ComponentsModule
  ],
  declarations: [ResumenRutaPage]
})
export class ResumenRutaPageModule {}
