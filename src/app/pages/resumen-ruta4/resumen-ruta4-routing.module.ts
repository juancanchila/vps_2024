import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ResumenRuta4Page } from './resumen-ruta4.page';

const routes: Routes = [
  {
    path: '',
    component: ResumenRuta4Page
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ResumenRuta4PageRoutingModule {}
