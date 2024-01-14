import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { IndexAuxiliaresPageRoutingModule } from './index-auxiliares-routing.module';

import { IndexAuxiliaresPage } from './index-auxiliares.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    IndexAuxiliaresPageRoutingModule
  ],
  declarations: [IndexAuxiliaresPage]
})
export class IndexAuxiliaresPageModule {}
