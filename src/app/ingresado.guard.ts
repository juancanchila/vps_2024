import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { MenuController } from '@ionic/angular';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class IngresadoGuard implements CanActivate { 
  constructor(private router: Router , private menuctrl:MenuController){

  }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if(localStorage.getItem('Ingresado')){
      this.menuctrl.enable(true,'first');
      return true;

    }else{
      this.menuctrl.enable(false,'first');
    this.router.navigateByUrl('login');
      return false;
      
      }
  }
  
}
