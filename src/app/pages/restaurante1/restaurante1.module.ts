import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { Restaurante1PageRoutingModule } from './restaurante1-routing.module';

import { Restaurante1Page } from './restaurante1.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    Restaurante1PageRoutingModule
  ],
  declarations: [Restaurante1Page]
})
export class Restaurante1PageModule {}
