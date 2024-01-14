import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { CarritoComprasPageRoutingModule } from './carrito-compras-routing.module';
import { CarritoComprasPage } from './carrito-compras.page';
import { IonicStorageModule } from '@ionic/storage-angular';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,

    ReactiveFormsModule,
   
    IonicModule,
    CarritoComprasPageRoutingModule,
    IonicStorageModule.forRoot(),
  ],
  declarations: [CarritoComprasPage]
})
export class CarritoComprasPageModule {}
