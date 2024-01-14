import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DatosEnvioCarritoPage } from './datos-envio-carrito.page';

const routes: Routes = [
  {
    path: '',
    component: DatosEnvioCarritoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DatosEnvioCarritoPageRoutingModule {}
