import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ResumenArmaTuEquipoPageRoutingModule } from './resumen-arma-tu-equipo-routing.module';

import { ResumenArmaTuEquipoPage } from './resumen-arma-tu-equipo.page';
import { ComponentsModule } from 'src/app/components/components.module';
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    ResumenArmaTuEquipoPageRoutingModule,
    ComponentsModule
  ],
  declarations: [ResumenArmaTuEquipoPage]
})
export class ResumenArmaTuEquipoPageModule {}
