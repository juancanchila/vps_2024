import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ResumenArmaTuEquipoPage } from './resumen-arma-tu-equipo.page';

const routes: Routes = [
  {
    path: '',
    component: ResumenArmaTuEquipoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ResumenArmaTuEquipoPageRoutingModule {}
