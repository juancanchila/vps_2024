import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ResumenLlavesPage } from './resumen-llaves.page';

const routes: Routes = [
  {
    path: '',
    component: ResumenLlavesPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ResumenLlavesPageRoutingModule {}
