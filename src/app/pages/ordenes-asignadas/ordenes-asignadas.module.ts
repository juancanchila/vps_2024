import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { OrdenesAsignadasPageRoutingModule } from './ordenes-asignadas-routing.module';

import { OrdenesAsignadasPage } from './ordenes-asignadas.page';
import { ComponentsModule } from 'src/app/components/components.module';
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    OrdenesAsignadasPageRoutingModule,
    ComponentsModule
  ],
  declarations: [OrdenesAsignadasPage]
})
export class OrdenesAsignadasPageModule {}
