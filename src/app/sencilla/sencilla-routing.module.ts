import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SencillaPage } from './sencilla.page';

const routes: Routes = [
  {
    path: '',
    component: SencillaPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SencillaPageRoutingModule {}
