import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { LoadingController } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth.service';

@Injectable({
  providedIn: 'root',
})
export class ModoColaboradorGuard implements CanActivate {
  constructor(
    private auth: AuthService,
    private router: Router,
    private loadingCtrl: LoadingController // Importar el LoadingController
  ) {}

  async canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Promise<boolean> {
    const modoAuxiliar = localStorage.getItem('modoAuxiliar');

    // Si está en modo colaborador, mostrar animación y redirigir
    if (modoAuxiliar === 'modoColaborador') {
      const loading = await this.showLoading('Redirigiendo al modo colaborador...');
      await this.router.navigate(['/modo-colaborador']);
      await loading.dismiss(); // Cerrar animación
      return false; // Bloquear acceso
    }

    // Si no está en modo colaborador, permitir el acceso
    return true;
  }

  private async showLoading(message: string): Promise<HTMLIonLoadingElement> {
    const loading = await this.loadingCtrl.create({
      message, // Mensaje personalizado
      spinner: 'crescent', // Tipo de animación (bolita giratoria)
      duration: 100, // Duración máxima (ajustable)
    });
    await loading.present();
    return loading;
  }
}
