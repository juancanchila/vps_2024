import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ResumenOtrosRestaurantesPageRoutingModule } from './resumen-otros-restaurantes-routing.module';

import { ResumenOtrosRestaurantesPage } from './resumen-otros-restaurantes.page';
import { ComponentsModule } from 'src/app/components/components.module';
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    IonicModule,
    ResumenOtrosRestaurantesPageRoutingModule,
    ComponentsModule
  ],
  declarations: [ResumenOtrosRestaurantesPage]
})
export class ResumenOtrosRestaurantesPageModule {}
