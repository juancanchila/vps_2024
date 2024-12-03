import { Injectable } from '@angular/core';
import { CanLoad, Route, UrlSegment, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import { AlertController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class DisponibilidadGuard implements CanLoad {

  constructor(private auth: AuthService, private router: Router, private alertController: AlertController) {}

  async canLoad(
    route: Route,
    segments: UrlSegment[]): Promise<boolean> {

    console.log("Evaluando CanLoad");

    // Consultar la disponibilidad
    const disponibilidad = await this.loadEstadoDisponibilidad();

    if (disponibilidad) {
      return true;  // Permite la carga del módulo si los datos están disponibles
    } else {
      // Si no hay disponibilidad, muestra la alerta y redirige
      this.showAlert();
      this.router.navigate(['/tabs']);
      return false;  // Bloquea la carga del módulo
    }
  }

  // Método para consultar la disponibilidad
  private async loadEstadoDisponibilidad(): Promise<boolean> {
    try {
      const res = await this.auth.getDisponibilidadPropia().toPromise();
      console.log(res, 'res');

      if (res.length >= 0) {
        let estado_reciibido = res['0']['field_estado'];

        if (estado_reciibido === 'Off') {
          // Estado "Off" significa no disponible
          localStorage.setItem('estado_auxiliar_texto', 'Auxiliar Ocupado');

        } else {
          // Estado "On" significa disponible
          localStorage.setItem('estado_auxiliar_texto', 'Auxiliar Disponible');

        }
        return true;
      } else {
        // Si no hay datos, lo tratamos como no disponible
        return false;
      }

    } catch (error) {
      console.error("Error al obtener la disponibilidad:", error);
      return false;  // En caso de error, también se considera no disponible
    }
  }

  // Método para mostrar la alerta
  private async showAlert() {
    const alert = await this.alertController.create({
      header: 'Servicio No Disponible',
      message: 'El servicio está actualmente no disponible. Por favor, intente más tarde.',
      buttons: ['OK']
    });

    await alert.present();
  }
}
