import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FruverPageRoutingModule } from './fruver-routing.module';

import { FruverPage } from './fruver.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FruverPageRoutingModule
  ],
  declarations: [FruverPage]
})
export class FruverPageModule {}
