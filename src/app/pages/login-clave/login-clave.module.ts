import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { LoginClavePageRoutingModule } from './login-clave-routing.module';

import { LoginClavePage } from './login-clave.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    LoginClavePageRoutingModule
  ],
  declarations: [LoginClavePage]
})
export class LoginClavePageModule {}
