import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { OrdenFinalPageRoutingModule } from './orden-final-routing.module';

import { OrdenFinalPage } from './orden-final.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    OrdenFinalPageRoutingModule
  ],
  declarations: [OrdenFinalPage]
})
export class OrdenFinalPageModule {}
