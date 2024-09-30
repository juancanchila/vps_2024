import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-splashcreen',
  templateUrl: './splashcreen.page.html',
  styleUrls: ['./splashcreen.page.scss'],
})
export class SplashcreenPage implements OnInit {

  // Variables para controlar el progreso de la barra y el temporizador
  public progress = 0; // Este puede ser utilizado más adelante para mostrar el progreso visualmente
  public timer = 0; // Temporizador para la barra de progreso

  constructor(private router: Router) {}

  // Método para gestionar la barra de progreso y la navegación
  barTimer() {
    // Intervalo para aumentar el valor del temporizador
    let interval = setInterval(() => {
      this.timer += 0.07; // Aumenta el temporizador en 0.07 cada 400ms

      // Elimina la condición de navegación aquí
      if (this.timer >= 1) {
        clearInterval(interval); // Limpia el intervalo si el temporizador alcanza 1
      }
    }, 400); // El intervalo se ejecuta cada 400ms

    // Navega a la página de login después de 10 segundos
    setTimeout(() => {
      clearInterval(interval); // Asegúrate de limpiar el intervalo
      this.router.navigate(['/login']); // Navega a la página de login
    }, 10000); // 10000 milisegundos (10 segundos)
  }

  // Método que se ejecuta al inicializar el componente
  ngOnInit() {
    this.barTimer(); // Llama al método para iniciar el temporizador
  }
}
