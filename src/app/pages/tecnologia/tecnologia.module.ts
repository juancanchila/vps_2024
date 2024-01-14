import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TecnologiaPageRoutingModule } from './tecnologia-routing.module';

import { TecnologiaPage } from './tecnologia.page';
import { SwiperModule } from 'swiper/angular';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    SwiperModule,
    ReactiveFormsModule,
    IonicModule,
    TecnologiaPageRoutingModule
  ],
  declarations: [TecnologiaPage]
})
export class TecnologiaPageModule {}
