import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ResumenLlavesPageRoutingModule } from './resumen-llaves-routing.module';

import { ResumenLlavesPage } from './resumen-llaves.page';
import { ComponentsModule } from 'src/app/components/components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    ResumenLlavesPageRoutingModule,
    ComponentsModule
  ],
  declarations: [ResumenLlavesPage]
})
export class ResumenLlavesPageModule {}
