import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TransportesRutaPageRoutingModule } from './transportes-ruta-routing.module';

import { TransportesRutaPage } from './transportes-ruta.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TransportesRutaPageRoutingModule
  ],
  declarations: [TransportesRutaPage]
})
export class TransportesRutaPageModule {}
