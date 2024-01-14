import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { Combo1PageRoutingModule } from './combo1-routing.module';

import { Combo1Page } from './combo1.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    Combo1PageRoutingModule
  ],
  declarations: [Combo1Page]
})
export class Combo1PageModule {}
