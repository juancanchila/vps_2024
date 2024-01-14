import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ResumenPagosPage } from './resumen-pagos.page';

const routes: Routes = [
  {
    path: '',
    component: ResumenPagosPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ResumenPagosPageRoutingModule {}
