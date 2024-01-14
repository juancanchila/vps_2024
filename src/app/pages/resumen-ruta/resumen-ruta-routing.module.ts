import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ResumenRutaPage } from './resumen-ruta.page';

const routes: Routes = [
  {
    path: '',
    component: ResumenRutaPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ResumenRutaPageRoutingModule {}
