import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ResumenMedicamentosPageRoutingModule } from './resumen-medicamentos-routing.module';
import { ComponentsModule } from 'src/app/components/components.module';
import { ResumenMedicamentosPage } from './resumen-medicamentos.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    ResumenMedicamentosPageRoutingModule,
    ComponentsModule
  ],
  declarations: [ResumenMedicamentosPage]
})
export class ResumenMedicamentosPageModule {}
