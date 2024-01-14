import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EspecialPageRoutingModule } from './especial-routing.module';

import { EspecialPage } from './especial.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EspecialPageRoutingModule
  ],
  declarations: [EspecialPage]
})
export class EspecialPageModule {}
