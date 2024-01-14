import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ResumenAlmacenPage } from './resumen-almacen.page';

const routes: Routes = [
  {
    path: '',
    component: ResumenAlmacenPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ResumenAlmacenPageRoutingModule {}
