import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ResumenTextilesPage } from './resumen-textiles.page';

const routes: Routes = [
  {
    path: '',
    component: ResumenTextilesPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ResumenTextilesPageRoutingModule {}
