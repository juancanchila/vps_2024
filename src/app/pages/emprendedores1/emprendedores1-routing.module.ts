import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { Emprendedores1Page } from './emprendedores1.page';

const routes: Routes = [
  {
    path: '',
    component: Emprendedores1Page
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class Emprendedores1PageRoutingModule {}
