import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ModalidadPageRoutingModule } from './modalidad-routing.module';

import { ModalidadPage } from './modalidad.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ModalidadPageRoutingModule
  ],
  declarations: [ModalidadPage]
})
export class ModalidadPageModule {}
