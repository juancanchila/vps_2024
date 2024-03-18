import { Component, OnInit } from '@angular/core';
import { Route, Router } from '@angular/router';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-animacion',
  templateUrl: './animacion.page.html',
  styleUrls: ['./animacion.page.scss'],
})
export class AnimacionPage implements OnInit {

  public load: boolean;
 
  constructor(private router: Router,private navCtrl: NavController){
    this.load = false;
  }
 
  ngOnInit(): void {
    setTimeout(() => {
      this.load = true;
      this.navCtrl.navigateRoot('/modo-colaborador');
    }, 10000);
 
  }
}
