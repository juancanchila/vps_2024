import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { OrdenesCreadasPage } from './ordenes-creadas.page';

const routes: Routes = [
  {
    path: '',
    component: OrdenesCreadasPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class OrdenesCreadasPageRoutingModule {}
