import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ResumenAlmacenPageRoutingModule } from './resumen-almacen-routing.module';

import { ResumenAlmacenPage } from './resumen-almacen.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    ResumenAlmacenPageRoutingModule
  ],
  declarations: [ResumenAlmacenPage]
})
export class ResumenAlmacenPageModule {}
