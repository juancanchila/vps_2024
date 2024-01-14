import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule,ReactiveFormsModule, } from '@angular/forms';

import { IonicModule } from '@ionic/angular';
import { AuthService } from '../services/auth.service';
import { LoginPageRoutingModule } from './login-routing.module';

import { LoginPage } from './login.page';
import { ProviderService } from '../provider.service';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    LoginPageRoutingModule
  ],
  providers:[AuthService,ProviderService],
  declarations: [LoginPage]
})
export class LoginPageModule {}
