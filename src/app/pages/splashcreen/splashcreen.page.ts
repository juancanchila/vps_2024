import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-splashcreen',
  templateUrl: './splashcreen.page.html',
  styleUrls: ['./splashcreen.page.scss'],
})
export class SplashcreenPage implements OnInit {

  public progress = 0;
  public timer = 0;
  constructor(private router: Router) {
   
  //  
  }
  barTimer() {
    let interval = setInterval(() => {
   //   console.log(this.timer);
      this.timer += 0.07;
      if (this.timer >= 1) {
        clearInterval(interval);
        this.router.navigate(['/login']);
      }
    }, 100);
  }
  
  ngOnInit() {
    this.barTimer();
  }

}
