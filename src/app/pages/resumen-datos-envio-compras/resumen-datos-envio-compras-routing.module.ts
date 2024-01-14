import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ResumenDatosEnvioComprasPage } from './resumen-datos-envio-compras.page';

const routes: Routes = [
  {
    path: '',
    component: ResumenDatosEnvioComprasPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ResumenDatosEnvioComprasPageRoutingModule {}
