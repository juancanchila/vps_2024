import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { Emprendedores1PageRoutingModule } from './emprendedores1-routing.module';

import { Emprendedores1Page } from './emprendedores1.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    Emprendedores1PageRoutingModule
  ],
  declarations: [Emprendedores1Page]
})
export class Emprendedores1PageModule {}
