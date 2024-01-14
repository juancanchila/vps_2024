import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { HistorialSolicitudesResumenPageRoutingModule } from './historial-solicitudes-resumen-routing.module';

import { HistorialSolicitudesResumenPage } from './historial-solicitudes-resumen.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HistorialSolicitudesResumenPageRoutingModule
  ],
  declarations: [HistorialSolicitudesResumenPage]
})
export class HistorialSolicitudesResumenPageModule {}
