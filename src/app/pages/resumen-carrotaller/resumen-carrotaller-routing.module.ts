import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ResumenCarrotallerPage } from './resumen-carrotaller.page';

const routes: Routes = [
  {
    path: '',
    component: ResumenCarrotallerPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ResumenCarrotallerPageRoutingModule {}
