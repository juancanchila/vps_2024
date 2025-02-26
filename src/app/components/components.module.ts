import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TabsComponent } from './tabs/tabs.component';
import { IonicModule } from '@ionic/angular';
import { CircleLoadingComponent } from './circle-loading/circle-loading.component';
import { PreloadImageComponent } from './preload-image/preload-image.component';




@NgModule({
  declarations: [TabsComponent,CircleLoadingComponent,PreloadImageComponent],
  imports: [
    CommonModule,
    IonicModule
  ],
  exports:[
    TabsComponent,
    CircleLoadingComponent,
    PreloadImageComponent
  ]
})
export class ComponentsModule { }
