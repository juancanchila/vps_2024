import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LoginClavePage } from './login-clave.page';

const routes: Routes = [
  {
    path: '',
    component: LoginClavePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LoginClavePageRoutingModule {}
