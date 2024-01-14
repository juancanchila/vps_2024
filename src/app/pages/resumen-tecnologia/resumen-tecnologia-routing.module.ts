import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ResumenTecnologiaPage } from './resumen-tecnologia.page';

const routes: Routes = [
  {
    path: '',
    component: ResumenTecnologiaPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ResumenTecnologiaPageRoutingModule {}
