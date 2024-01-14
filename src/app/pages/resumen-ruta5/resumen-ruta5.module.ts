import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ResumenRuta5PageRoutingModule } from './resumen-ruta5-routing.module';

import { ResumenRuta5Page } from './resumen-ruta5.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    ResumenRuta5PageRoutingModule
  ],
  declarations: [ResumenRuta5Page]
})
export class ResumenRuta5PageModule {}
