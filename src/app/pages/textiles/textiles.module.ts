import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TextilesPageRoutingModule } from './textiles-routing.module';

import { TextilesPage } from './textiles.page';
import { SwiperModule } from 'swiper/angular';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    SwiperModule,
    ReactiveFormsModule,
    IonicModule,
    TextilesPageRoutingModule
  ],
  declarations: [TextilesPage]
})
export class TextilesPageModule {}
