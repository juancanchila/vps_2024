import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ResumenCarrotallerPageRoutingModule } from './resumen-carrotaller-routing.module';

import { ResumenCarrotallerPage } from './resumen-carrotaller.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    ResumenCarrotallerPageRoutingModule
  ],
  declarations: [ResumenCarrotallerPage]
})
export class ResumenCarrotallerPageModule {}
