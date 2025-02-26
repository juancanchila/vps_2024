import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EmprendedoresPageRoutingModule } from './emprendedores-routing.module';

import { EmprendedoresPage } from './emprendedores.page';
import { SwiperModule } from 'swiper/angular';
import { ComponentsModule } from 'src/app/components/components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    SwiperModule,
    IonicModule,
    EmprendedoresPageRoutingModule,
    ComponentsModule
  ],
  declarations: [EmprendedoresPage]
})
export class EmprendedoresPageModule {}
