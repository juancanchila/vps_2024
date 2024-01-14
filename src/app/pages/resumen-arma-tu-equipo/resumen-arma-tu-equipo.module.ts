import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ResumenArmaTuEquipoPageRoutingModule } from './resumen-arma-tu-equipo-routing.module';

import { ResumenArmaTuEquipoPage } from './resumen-arma-tu-equipo.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    ResumenArmaTuEquipoPageRoutingModule
  ],
  declarations: [ResumenArmaTuEquipoPage]
})
export class ResumenArmaTuEquipoPageModule {}
