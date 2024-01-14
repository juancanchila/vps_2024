import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ResumenTrasteoPage } from './resumen-trasteo.page';

const routes: Routes = [
  {
    path: '',
    component: ResumenTrasteoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ResumenTrasteoPageRoutingModule {}
