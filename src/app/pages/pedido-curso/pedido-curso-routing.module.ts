import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PedidoCursoPage } from './pedido-curso.page';

const routes: Routes = [
  {
    path: '',
    component: PedidoCursoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PedidoCursoPageRoutingModule {}
