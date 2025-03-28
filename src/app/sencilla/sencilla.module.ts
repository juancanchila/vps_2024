import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SencillaPageRoutingModule } from './sencilla-routing.module';

import { SencillaPage } from './sencilla.page';
import { AutoCompleteModule } from 'ionic4-auto-complete';
import { SwiperModule } from 'swiper/angular';
import { ComponentsModule } from 'src/app/components/components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
AutoCompleteModule,
SwiperModule,
    ReactiveFormsModule,
    IonicModule,
    SencillaPageRoutingModule,
    ComponentsModule
  ],
  declarations: [SencillaPage]
})
export class SencillaPageModule {}
