import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CarroTallerPageRoutingModule } from './carro-taller-routing.module';

import { CarroTallerPage } from './carro-taller.page';
import { SwiperModule } from 'swiper/angular';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    SwiperModule,
    ReactiveFormsModule,
    IonicModule,
    CarroTallerPageRoutingModule
  ],
  declarations: [CarroTallerPage]
})
export class CarroTallerPageModule {}
