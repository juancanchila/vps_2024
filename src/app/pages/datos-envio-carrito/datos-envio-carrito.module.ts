import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DatosEnvioCarritoPageRoutingModule } from './datos-envio-carrito-routing.module';

import { DatosEnvioCarritoPage } from './datos-envio-carrito.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    DatosEnvioCarritoPageRoutingModule
  ],
  declarations: [DatosEnvioCarritoPage]
})
export class DatosEnvioCarritoPageModule {}
