import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TelotengoPageRoutingModule } from './telotengo-routing.module';

import { TelotengoPage } from './telotengo.page';
import { ComponentsModule } from 'src/app/components/components.module';
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TelotengoPageRoutingModule,
    ComponentsModule
  ],
  declarations: [TelotengoPage]
})
export class TelotengoPageModule {}
