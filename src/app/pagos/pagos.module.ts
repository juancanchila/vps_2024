import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PagosPageRoutingModule } from './pagos-routing.module';

import { PagosPage } from './pagos.page';
import { SwiperModule } from 'swiper/angular';
import { ComponentsModule } from 'src/app/components/components.module';
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    SwiperModule,
    ReactiveFormsModule,
    IonicModule,
    PagosPageRoutingModule,
    ComponentsModule
  ],
  declarations: [PagosPage]
})
export class PagosPageModule {}
