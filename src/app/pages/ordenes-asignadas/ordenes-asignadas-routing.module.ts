import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { OrdenesAsignadasPage } from './ordenes-asignadas.page';

const routes: Routes = [
  {
    path: '',
    component: OrdenesAsignadasPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class OrdenesAsignadasPageRoutingModule {}
