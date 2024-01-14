import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ResumenTextilesPageRoutingModule } from './resumen-textiles-routing.module';

import { ResumenTextilesPage } from './resumen-textiles.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    ResumenTextilesPageRoutingModule
  ],
  declarations: [ResumenTextilesPage]
})
export class ResumenTextilesPageModule {}
