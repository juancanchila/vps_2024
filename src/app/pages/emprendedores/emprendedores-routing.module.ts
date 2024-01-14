import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EmprendedoresPage } from './emprendedores.page';

const routes: Routes = [
  {
    path: '',
    component: EmprendedoresPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EmprendedoresPageRoutingModule {}
