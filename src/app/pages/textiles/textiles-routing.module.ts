import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TextilesPage } from './textiles.page';

const routes: Routes = [
  {
    path: '',
    component: TextilesPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TextilesPageRoutingModule {}
