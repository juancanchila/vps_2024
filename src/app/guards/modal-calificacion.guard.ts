import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class ModalCalificacionGuard implements CanActivate {

  constructor(private authService: AuthService) {}

  async canActivate(): Promise<boolean> {
    const isModalOpen = this.authService.isCalificationModalOpen();

    if (isModalOpen) {
      console.log('El modal de calificación está abierto.');

      //alert('No puedes cambiar de página mientras el modal de calificación esté abierto.');
      return false; // Bloquea la navegación
    }
    return true; // Permite la navegación si el modal está cerrado
  }
}
