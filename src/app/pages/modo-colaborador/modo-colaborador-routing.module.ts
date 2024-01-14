import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ModoColaboradorPage } from './modo-colaborador.page';

const routes: Routes = [
  {
    path: '',
    component: ModoColaboradorPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ModoColaboradorPageRoutingModule {}
