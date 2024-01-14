import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { VerMasOrdenesPageRoutingModule } from './ver-mas-ordenes-routing.module';

import { VerMasOrdenesPage } from './ver-mas-ordenes.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    VerMasOrdenesPageRoutingModule
  ],
  declarations: [VerMasOrdenesPage]
})
export class VerMasOrdenesPageModule {}
