import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { OtrosRestaurantesPageRoutingModule } from './otros-restaurantes-routing.module';

import { OtrosRestaurantesPage } from './otros-restaurantes.page';
import { SwiperModule } from 'swiper/angular';
import { ComponentsModule } from 'src/app/components/components.module';
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    SwiperModule,
    ReactiveFormsModule,
    IonicModule,
    OtrosRestaurantesPageRoutingModule,
    ComponentsModule
  ],
  declarations: [OtrosRestaurantesPage]
})
export class OtrosRestaurantesPageModule {}
