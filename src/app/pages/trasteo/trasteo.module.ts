import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TrasteoPageRoutingModule } from './trasteo-routing.module';

import { TrasteoPage } from './trasteo.page';
import { SwiperModule } from 'swiper/angular';
import { ComponentsModule } from 'src/app/components/components.module';
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    SwiperModule,
    ReactiveFormsModule,
    IonicModule,
    TrasteoPageRoutingModule,
    ComponentsModule
  ],
  declarations: [TrasteoPage]
})
export class TrasteoPageModule {}
