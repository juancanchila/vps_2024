import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ComprasPageRoutingModule } from './compras-routing.module';

import { ComprasPage } from './compras.page';
import { SwiperModule } from 'swiper/angular';
import { ComponentsModule } from 'src/app/components/components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    SwiperModule,
    IonicModule,
    ComprasPageRoutingModule,
    ComponentsModule
  ],
  declarations: [ComprasPage]
})
export class ComprasPageModule {}
