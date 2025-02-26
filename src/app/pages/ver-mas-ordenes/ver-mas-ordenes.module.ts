import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { VerMasOrdenesPageRoutingModule } from './ver-mas-ordenes-routing.module';

import { VerMasOrdenesPage } from './ver-mas-ordenes.page';
import { ComponentsModule } from 'src/app/components/components.module';
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    VerMasOrdenesPageRoutingModule,
    ComponentsModule
  ],
  declarations: [VerMasOrdenesPage]
})
export class VerMasOrdenesPageModule {}
