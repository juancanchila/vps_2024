import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ResumenMascotasPageRoutingModule } from './resumen-mascotas-routing.module';

import { ResumenMascotasPage } from './resumen-mascotas.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    ResumenMascotasPageRoutingModule,
    
  ],
  declarations: [ResumenMascotasPage]
})
export class ResumenMascotasPageModule {}
