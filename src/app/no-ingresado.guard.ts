import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { MenuController } from '@ionic/angular';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NoIngresadoGuard implements CanActivate {
  constructor(private router: Router, private menuctrl:MenuController){

  }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      if(localStorage.getItem('Ingresado')){
        this.menuctrl.enable(true,'first');
        this.router.navigateByUrl('tabs/index');
        return false;
  
      }else{
        this.menuctrl.enable(false,'first');
        return true;
        }
  }
  
}
