import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { Fruver1PageRoutingModule } from './fruver1-routing.module';

import { Fruver1Page } from './fruver1.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    Fruver1PageRoutingModule
  ],
  declarations: [Fruver1Page]
})
export class Fruver1PageModule {}
