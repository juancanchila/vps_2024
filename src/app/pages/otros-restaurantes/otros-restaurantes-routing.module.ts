import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { OtrosRestaurantesPage } from './otros-restaurantes.page';

const routes: Routes = [
  {
    path: '',
    component: OtrosRestaurantesPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class OtrosRestaurantesPageRoutingModule {}
