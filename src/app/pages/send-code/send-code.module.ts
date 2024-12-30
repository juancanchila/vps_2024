import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SendCodePageRoutingModule } from './send-code-routing.module';

import { SendCodePage } from './send-code.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    SendCodePageRoutingModule
  ],
  declarations: [SendCodePage]
})
export class SendCodePageModule {}
