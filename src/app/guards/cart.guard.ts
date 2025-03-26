import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { CarritoService } from '../services/CarritoService';

@Injectable({
  providedIn: 'root'
})
export class CartGuard implements CanActivate {

  constructor(private carritoService: CarritoService, private router: Router) {}

  async canActivate(): Promise<boolean> {
    try {
      const carrito: any = await this.carritoService.get_cart();

      // Verificar si carrito es un array antes de acceder a .length
      if (!Array.isArray(carrito) || carrito.length === 0) {
        this.router.navigate(['/home']);
        return false;
      }

      return true;
    } catch (error) {
      console.error('Error obteniendo el carrito:', error);
      this.router.navigate(['/home']);
      return false;
    }
  }
}
