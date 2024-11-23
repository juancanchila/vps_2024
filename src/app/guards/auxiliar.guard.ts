import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { MenuController } from '@ionic/angular';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuxiliarGuard  implements CanActivate {
  constructor(private router: Router, private menuCtrl: MenuController) {}

  // Función para obtener la fecha de expiración del token
  private obtenerFechaDeExpiracion(token: string): Date | null {
    try {
      console.log('Decodificando el token:', token);
      const base64Url = token.split('.')[1];
      const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
      const payload = JSON.parse(atob(base64));
      console.log('Payload decodificado:', payload);
      return payload.exp ? new Date(payload.exp * 1000) : null;
    } catch (error) {
      console.error('Error al decodificar el token:', error);
      return null;
    }
  }

  private clearLocalStorage() {
    const keysToRemove = [
      'name',
      'rol',
      'rolAuxiliar',
      'idAuxiliar',
      'permitirPagoefectivo',
      'tarifaDestino',
      'tarifaDestino2',
      'tarifaDestino3',
      'tarifaDestino4',
      'tarifaDestino5',
      'tarifaDestino6',
      'tarifaDestino7',
      'tarifaOrigen',
      'precioTarifa',
      'precioTarifa2',
      'mensajeria',
      'ServicioEvaluado',
      'tipoVehiculo',
      'zona_destino',
      'zona_origen',
      'session_ends',
      'EXPIRES_IN',
    ];

    keysToRemove.forEach((key) => localStorage.removeItem(key));
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    const token = localStorage.getItem('session_ends'); // Obtener el token de localStorage
    console.log('Token obtenido en guard:', token);

    // Si no hay token, permitir que el usuario inicie sesión
    if (!token) {
      console.log('No hay token, el usuario debe iniciar sesión.');
      this.menuCtrl.enable(false, 'first'); // Deshabilitar el menú si no hay token
      return true; // Permitir el acceso para iniciar sesión
    }

    // Si existe el token, se evalúa su validez
    const fechaExpiracion = this.obtenerFechaDeExpiracion(token); // Obtener la fecha de expiración
    console.log('Fecha de expiración del token:', fechaExpiracion);

    // Verificar si la fecha de expiración es válida
    if (!fechaExpiracion) {
      console.warn(
        'No se pudo obtener la fecha de expiración, redirigiendo a login...'
      );
      this.menuCtrl.enable(false, 'first');
      this.clearLocalStorage();
      this.router.navigate(['/login']);
      return false; // Impide el acceso
    }

    // Verificar si el token ha expirado
    if (fechaExpiracion < new Date()) {
      console.warn('Token expirado, redirigiendo a login...');
      this.clearLocalStorage();
      this.menuCtrl.enable(false, 'first');
      this.router.navigate(['/login']);
      return false; // Impide el acceso
    }

    console.log('Token válido, acceso permitido.');
    this.menuCtrl.enable(true, 'first'); // Habilitar el menú si el token es válido
    return true; // Permite acceso si el token es válido
  }
}

