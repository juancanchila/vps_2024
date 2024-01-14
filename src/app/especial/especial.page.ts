import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-especial',
  templateUrl: './especial.page.html',
  styleUrls: ['./especial.page.scss'],
})
export class EspecialPage implements OnInit {
  slider:any=[];
  urlBase:any;
  constructor(private auth: AuthService ) { 
    this.urlBase=environment.urlBase;
  }

  ngOnInit() {
    this.auth.seleccionarSliderEspecial().subscribe(res =>{
      console.log(res, ' aqui slider');
     this.slider=res[0]['field_imagen_especial'];
     
      console.log(this.slider);
      
     
      
      
    });
  }

}
