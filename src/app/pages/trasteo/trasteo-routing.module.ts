import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TrasteoPage } from './trasteo.page';

const routes: Routes = [
  {
    path: '',
    component: TrasteoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TrasteoPageRoutingModule {}
