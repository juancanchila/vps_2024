import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { Combo1Page } from './combo1.page';

const routes: Routes = [
  {
    path: '',
    component: Combo1Page
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class Combo1PageRoutingModule {}
