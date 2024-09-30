

import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { ReactiveFormsModule,FormsModule } from '@angular/forms';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { NgModule,NO_ERRORS_SCHEMA,CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { AuthService } from './services/auth.service';
import { HttpClientModule } from '@angular/common/http';
import { ProviderService } from './provider.service';
import { IonicStorageModule } from '@ionic/storage-angular';

import { IndexPage } from './index/index.page';
import { ComponentsModule } from './components/components.module';
import { Keyboard } from '@capacitor/keyboard';
import { AutoCompleteModule } from 'ionic4-auto-complete';
import { NotificationsService } from './services/notifications.service';
import { environment } from '../environments/environment';

import { Clipboard } from '@awesome-cordova-plugins/clipboard/ngx';








@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [
  	BrowserModule,
  	HttpClientModule,
  	FormsModule,
AutoCompleteModule,
	ComponentsModule,
  	BrowserModule,
  	IonicModule.forRoot(),
  	AppRoutingModule,
  	IonicStorageModule.forRoot(),

],


  providers: [Clipboard, ProviderService,NotificationsService, AuthService, ReactiveFormsModule,{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy }],
  bootstrap: [AppComponent]
})
export class AppModule {

}
