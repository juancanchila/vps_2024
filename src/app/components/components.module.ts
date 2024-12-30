import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TabsComponent } from './tabs/tabs.component';
import { IonicModule } from '@ionic/angular';
import { CircleLoadingComponent } from './circle-loading/circle-loading.component';




@NgModule({
  declarations: [TabsComponent,CircleLoadingComponent],
  imports: [
    CommonModule,
    IonicModule
  ],
  exports:[
    TabsComponent,
    CircleLoadingComponent
  ]
})
export class ComponentsModule { }
