import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FruverPage } from './fruver.page';

const routes: Routes = [
  {
    path: '',
    component: FruverPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FruverPageRoutingModule {}
