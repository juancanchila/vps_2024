import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ResumenAlmacenPageRoutingModule } from './resumen-almacen-routing.module';

import { ResumenAlmacenPage } from './resumen-almacen.page';
import { ComponentsModule } from 'src/app/components/components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    ResumenAlmacenPageRoutingModule,
    ComponentsModule
  ],
  declarations: [ResumenAlmacenPage]
})
export class ResumenAlmacenPageModule {}
