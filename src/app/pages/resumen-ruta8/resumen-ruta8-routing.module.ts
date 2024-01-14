import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ResumenRuta8Page } from './resumen-ruta8.page';

const routes: Routes = [
  {
    path: '',
    component: ResumenRuta8Page
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ResumenRuta8PageRoutingModule {}
