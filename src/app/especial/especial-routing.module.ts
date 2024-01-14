import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EspecialPage } from './especial.page';

const routes: Routes = [
  {
    path: '',
    component: EspecialPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EspecialPageRoutingModule {}
