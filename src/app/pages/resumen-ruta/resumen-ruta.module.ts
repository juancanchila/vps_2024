import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ResumenRutaPageRoutingModule } from './resumen-ruta-routing.module';

import { ResumenRutaPage } from './resumen-ruta.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    ResumenRutaPageRoutingModule
  ],
  declarations: [ResumenRutaPage]
})
export class ResumenRutaPageModule {}
