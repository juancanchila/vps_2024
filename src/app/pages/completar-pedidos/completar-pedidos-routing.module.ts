import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CompletarPedidosPage } from './completar-pedidos.page';

const routes: Routes = [
  {
    path: '',
    component: CompletarPedidosPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CompletarPedidosPageRoutingModule {}
