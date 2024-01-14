import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ResumenRuta3Page } from './resumen-ruta3.page';

const routes: Routes = [
  {
    path: '',
    component: ResumenRuta3Page
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ResumenRuta3PageRoutingModule {}
