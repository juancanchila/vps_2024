import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ModalidadPage } from './modalidad.page';

const routes: Routes = [
  {
    path: '',
    component: ModalidadPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ModalidadPageRoutingModule {}
