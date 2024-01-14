import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ResumenRuta7Page } from './resumen-ruta7.page';

const routes: Routes = [
  {
    path: '',
    component: ResumenRuta7Page
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ResumenRuta7PageRoutingModule {}
