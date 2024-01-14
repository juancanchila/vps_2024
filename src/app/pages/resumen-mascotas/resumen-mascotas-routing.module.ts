import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ResumenMascotasPage } from './resumen-mascotas.page';

const routes: Routes = [
  {
    path: '',
    component: ResumenMascotasPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ResumenMascotasPageRoutingModule {}
