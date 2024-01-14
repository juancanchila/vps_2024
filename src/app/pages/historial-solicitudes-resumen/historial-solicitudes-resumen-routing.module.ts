import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HistorialSolicitudesResumenPage } from './historial-solicitudes-resumen.page';

const routes: Routes = [
  {
    path: '',
    component: HistorialSolicitudesResumenPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HistorialSolicitudesResumenPageRoutingModule {}
