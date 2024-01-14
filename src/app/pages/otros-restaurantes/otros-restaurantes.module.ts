import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { OtrosRestaurantesPageRoutingModule } from './otros-restaurantes-routing.module';

import { OtrosRestaurantesPage } from './otros-restaurantes.page';
import { SwiperModule } from 'swiper/angular';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    SwiperModule,
    ReactiveFormsModule,
    IonicModule,
    OtrosRestaurantesPageRoutingModule
  ],
  declarations: [OtrosRestaurantesPage]
})
export class OtrosRestaurantesPageModule {}
