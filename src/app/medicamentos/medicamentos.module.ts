import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MedicamentosPageRoutingModule } from './medicamentos-routing.module';

import { MedicamentosPage } from './medicamentos.page';
import { SwiperModule } from 'swiper/angular';
import { ComponentsModule } from '../components/components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    SwiperModule,
    ReactiveFormsModule,
    IonicModule,
    MedicamentosPageRoutingModule,
    ComponentsModule
  ],
  declarations: [MedicamentosPage]
})
export class MedicamentosPageModule {}
