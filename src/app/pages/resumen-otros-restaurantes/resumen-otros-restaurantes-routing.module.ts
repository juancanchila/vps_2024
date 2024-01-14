import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ResumenOtrosRestaurantesPage } from './resumen-otros-restaurantes.page';

const routes: Routes = [
  {
    path: '',
    component: ResumenOtrosRestaurantesPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ResumenOtrosRestaurantesPageRoutingModule {}
