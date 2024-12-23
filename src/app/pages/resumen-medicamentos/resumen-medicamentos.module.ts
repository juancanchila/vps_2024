import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ResumenMedicamentosPageRoutingModule } from './resumen-medicamentos-routing.module';

import { ResumenMedicamentosPage } from './resumen-medicamentos.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    ResumenMedicamentosPageRoutingModule
  ],
  declarations: [ResumenMedicamentosPage]
})
export class ResumenMedicamentosPageModule {}
