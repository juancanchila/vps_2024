import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RestaurantesPageRoutingModule } from './restaurantes-routing.module';

import { RestaurantesPage } from './restaurantes.page';
import { SwiperModule } from 'swiper/angular';
import { ComponentsModule } from 'src/app/components/components.module';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    SwiperModule,
    IonicModule,
    RestaurantesPageRoutingModule,
    ComponentsModule
  ],
  declarations: [RestaurantesPage]
})
export class RestaurantesPageModule {}
