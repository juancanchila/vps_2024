import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PedidoCursoPageRoutingModule } from './pedido-curso-routing.module';

import { PedidoCursoPage } from './pedido-curso.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PedidoCursoPageRoutingModule
  ],
  declarations: [PedidoCursoPage]
})
export class PedidoCursoPageModule {}
