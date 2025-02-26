import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ResumenDatosEnvioComprasPageRoutingModule } from './resumen-datos-envio-compras-routing.module';

import { ResumenDatosEnvioComprasPage } from './resumen-datos-envio-compras.page';
import { SwiperModule } from 'swiper/angular';
import { ComponentsModule } from 'src/app/components/components.module';
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    SwiperModule,
    ReactiveFormsModule,
    IonicModule,
    ResumenDatosEnvioComprasPageRoutingModule,
    ComponentsModule
  ],
  declarations: [ResumenDatosEnvioComprasPage]
})
export class ResumenDatosEnvioComprasPageModule {}
