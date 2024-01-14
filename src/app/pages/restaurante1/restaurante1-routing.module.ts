import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { Restaurante1Page } from './restaurante1.page';

const routes: Routes = [
  {
    path: '',
    component: Restaurante1Page
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class Restaurante1PageRoutingModule {}
