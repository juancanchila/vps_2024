import { CUSTOM_ELEMENTS_SCHEMA, NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MensajeriaPageRoutingModule } from './mensajeria-routing.module';

import { MensajeriaPage } from './mensajeria.page';
import { ComponentsModule } from '../components/components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ComponentsModule,
    IonicModule,
    MensajeriaPageRoutingModule,
    ComponentsModule
  ],

  declarations: [MensajeriaPage],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA,
    NO_ERRORS_SCHEMA
    ]
})
export class MensajeriaPageModule {}
