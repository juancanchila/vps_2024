import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { LlavesPageRoutingModule } from './llaves-routing.module';

import { LlavesPage } from './llaves.page';
import { SwiperModule } from 'swiper/angular';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    SwiperModule,
    ReactiveFormsModule,
    IonicModule,
    LlavesPageRoutingModule
  ],
  declarations: [LlavesPage]
})
export class LlavesPageModule {}
