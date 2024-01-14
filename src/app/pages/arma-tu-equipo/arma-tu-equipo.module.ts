import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ArmaTuEquipoPageRoutingModule } from './arma-tu-equipo-routing.module';

import { ArmaTuEquipoPage } from './arma-tu-equipo.page';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    IonicModule,
    ArmaTuEquipoPageRoutingModule
  ],
  declarations: [ArmaTuEquipoPage]
})
export class ArmaTuEquipoPageModule {}
