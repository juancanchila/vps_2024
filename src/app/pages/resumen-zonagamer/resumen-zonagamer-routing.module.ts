import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ResumenZonagamerPage } from './resumen-zonagamer.page';

const routes: Routes = [
  {
    path: '',
    component: ResumenZonagamerPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ResumenZonagamerPageRoutingModule {}
