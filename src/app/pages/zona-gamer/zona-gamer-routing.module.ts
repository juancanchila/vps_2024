import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ZonaGamerPage } from './zona-gamer.page';

const routes: Routes = [
  {
    path: '',
    component: ZonaGamerPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ZonaGamerPageRoutingModule {}
