import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ZonaGamerPageRoutingModule } from './zona-gamer-routing.module';

import { ZonaGamerPage } from './zona-gamer.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    ZonaGamerPageRoutingModule
  ],
  declarations: [ZonaGamerPage]
})
export class ZonaGamerPageModule {}
