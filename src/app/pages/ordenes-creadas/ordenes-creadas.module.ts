import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { OrdenesCreadasPageRoutingModule } from './ordenes-creadas-routing.module';

import { OrdenesCreadasPage } from './ordenes-creadas.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    OrdenesCreadasPageRoutingModule
  ],
  declarations: [OrdenesCreadasPage]
})
export class OrdenesCreadasPageModule {}
