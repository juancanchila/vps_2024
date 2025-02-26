import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { IndexPageRoutingModule } from './index-routing.module';

import { IndexPage } from './index.page';
import { AppComponent } from '../app.component';
import { SwiperModule } from 'swiper/angular';

import { environment } from 'src/environments/environment';
import { ComponentsModule } from '../components/components.module';

@NgModule({
  imports: [
    CommonModule,
    SwiperModule,
    FormsModule,
    IonicModule,

    ComponentsModule,

    IndexPageRoutingModule,
  ],
  exports: [],

  declarations: [IndexPage],
})
export class IndexPageModule {}
