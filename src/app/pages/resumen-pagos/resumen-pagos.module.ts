import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ResumenPagosPageRoutingModule } from './resumen-pagos-routing.module';

import { ResumenPagosPage } from './resumen-pagos.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    ResumenPagosPageRoutingModule
  ],
  declarations: [ResumenPagosPage]
})
export class ResumenPagosPageModule {}
