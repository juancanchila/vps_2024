import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { Fruver1Page } from './fruver1.page';

const routes: Routes = [
  {
    path: '',
    component: Fruver1Page
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class Fruver1PageRoutingModule {}
