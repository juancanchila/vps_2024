import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ResumenRuta9Page } from './resumen-ruta9.page';

const routes: Routes = [
  {
    path: '',
    component: ResumenRuta9Page
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ResumenRuta9PageRoutingModule {}
