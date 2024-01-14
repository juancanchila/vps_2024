import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ResumenRuta6Page } from './resumen-ruta6.page';

const routes: Routes = [
  {
    path: '',
    component: ResumenRuta6Page
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ResumenRuta6PageRoutingModule {}
