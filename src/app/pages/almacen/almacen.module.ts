import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AlmacenPageRoutingModule } from './almacen-routing.module';

import { AlmacenPage } from './almacen.page';
import { SwiperModule } from 'swiper/angular';
import { ComponentsModule } from 'src/app/components/components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    SwiperModule,
    ReactiveFormsModule,
    IonicModule,
    AlmacenPageRoutingModule,
    ComponentsModule
  ],
  declarations: [AlmacenPage]
})
export class AlmacenPageModule {}
