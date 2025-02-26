import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RutasPageRoutingModule } from './rutas-routing.module';

import { RutasPage } from './rutas.page';
import { SwiperModule } from 'swiper/angular';
import { ComponentsModule } from 'src/app/components/components.module';
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    SwiperModule,
    ReactiveFormsModule,
    IonicModule,
    RutasPageRoutingModule,
    ComponentsModule
  ],
  declarations: [RutasPage]
})
export class RutasPageModule {}
