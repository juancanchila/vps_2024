import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-splashcreen',
  templateUrl: './splashcreen.page.html',
  styleUrls: ['./splashcreen.page.scss'],
})
export class SplashcreenPage implements OnInit {

  constructor(private router: Router) {}

  // Método que se ejecuta al inicializar el componente
  ngOnInit() {
    // Navega a la página de login después de 4 segundos
    setTimeout(() => {
      this.router.navigate(['/login']);
    }, 4000); // 4000 milisegundos (4 segundos)
  }
}
