import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FruverPageRoutingModule } from './fruver-routing.module';

import { FruverPage } from './fruver.page';
import { ComponentsModule } from 'src/app/components/components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FruverPageRoutingModule,
    ComponentsModule
  ],
  declarations: [FruverPage]
})
export class FruverPageModule {}
