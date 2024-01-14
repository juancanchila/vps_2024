import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ArmaTuEquipoPage } from './arma-tu-equipo.page';

const routes: Routes = [
  {
    path: '',
    component: ArmaTuEquipoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ArmaTuEquipoPageRoutingModule {}
