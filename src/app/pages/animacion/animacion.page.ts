import { Component, OnInit } from '@angular/core';
import { Route, Router } from '@angular/router';

@Component({
  selector: 'app-animacion',
  templateUrl: './animacion.page.html',
  styleUrls: ['./animacion.page.scss'],
})
export class AnimacionPage implements OnInit {

  public load: boolean;
 
  constructor(private router: Router){
    this.load = false;
  }
 
  ngOnInit(): void {
    setTimeout(() => {
      this.load = true;
      this.router.navigate(['/modo-colaborador']);
    }, 10000);
 
  }
}
