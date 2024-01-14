import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { OrdenesAsignadasPageRoutingModule } from './ordenes-asignadas-routing.module';

import { OrdenesAsignadasPage } from './ordenes-asignadas.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    OrdenesAsignadasPageRoutingModule
  ],
  declarations: [OrdenesAsignadasPage]
})
export class OrdenesAsignadasPageModule {}
