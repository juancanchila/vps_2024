import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { IndexAuxiliaresPage } from './index-auxiliares.page';

const routes: Routes = [
  {
    path: '',
    component: IndexAuxiliaresPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class IndexAuxiliaresPageRoutingModule {}
