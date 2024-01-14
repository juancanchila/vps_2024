import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TelotengoPageRoutingModule } from './telotengo-routing.module';

import { TelotengoPage } from './telotengo.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TelotengoPageRoutingModule
  ],
  declarations: [TelotengoPage]
})
export class TelotengoPageModule {}
