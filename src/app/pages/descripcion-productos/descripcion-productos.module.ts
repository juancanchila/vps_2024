import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { DescripcionProductosPageRoutingModule } from './descripcion-productos-routing.module';
import { DescripcionProductosPage } from './descripcion-productos.page';
import { IonicStorageModule } from '@ionic/storage-angular'; 

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    DescripcionProductosPageRoutingModule,
    IonicStorageModule.forRoot(),
  ],
  declarations: [DescripcionProductosPage]
})
export class DescripcionProductosPageModule {}
