import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { VerMasOrdenesPage } from './ver-mas-ordenes.page';

const routes: Routes = [
  {
    path: '',
    component: VerMasOrdenesPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class VerMasOrdenesPageRoutingModule {}
