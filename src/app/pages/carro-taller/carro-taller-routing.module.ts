import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CarroTallerPage } from './carro-taller.page';

const routes: Routes = [
  {
    path: '',
    component: CarroTallerPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CarroTallerPageRoutingModule {}
