import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LlavesPage } from './llaves.page';

const routes: Routes = [
  {
    path: '',
    component: LlavesPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LlavesPageRoutingModule {}
