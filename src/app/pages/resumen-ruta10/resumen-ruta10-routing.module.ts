import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ResumenRuta10Page } from './resumen-ruta10.page';

const routes: Routes = [
  {
    path: '',
    component: ResumenRuta10Page
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ResumenRuta10PageRoutingModule {}
