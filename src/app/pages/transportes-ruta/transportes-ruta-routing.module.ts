import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TransportesRutaPage } from './transportes-ruta.page';

const routes: Routes = [
  {
    path: '',
    component: TransportesRutaPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TransportesRutaPageRoutingModule {}
