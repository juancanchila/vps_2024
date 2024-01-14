import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ResumenMedicamentosPage } from './resumen-medicamentos.page';

const routes: Routes = [
  {
    path: '',
    component: ResumenMedicamentosPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ResumenMedicamentosPageRoutingModule {}
