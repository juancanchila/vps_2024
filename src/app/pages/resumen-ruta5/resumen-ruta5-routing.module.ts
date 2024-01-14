import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ResumenRuta5Page } from './resumen-ruta5.page';

const routes: Routes = [
  {
    path: '',
    component: ResumenRuta5Page
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ResumenRuta5PageRoutingModule {}
