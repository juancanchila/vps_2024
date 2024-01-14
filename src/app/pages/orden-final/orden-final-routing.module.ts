import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { OrdenFinalPage } from './orden-final.page';

const routes: Routes = [
  {
    path: '',
    component: OrdenFinalPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class OrdenFinalPageRoutingModule {}
