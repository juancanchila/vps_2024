import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-ordenes-creadas',
  templateUrl: './ordenes-creadas.page.html',
  styleUrls: ['./ordenes-creadas.page.scss'],
})
export class OrdenesCreadasPage implements OnInit {
  
  NumeroOrden: any;
  auxiliarAsignado:any;
  NameAux:any;

  constructor(private auth: AuthService, private router: Router) { }

  ngOnInit() {
    
  

    this.auxiliarAsignado= localStorage.getItem('AuxiliarAsignado');
    this.NumeroOrden =localStorage.getItem('sencillaCreada');
    this.NameAux =localStorage.getItem('Name');
   

    
  
    
  
    
    

  }

 
  
  irPageOrden(){
    //this.auth.getMensajeroName();
    this.router.navigate(['/orden-final']);
    

}
  ngOnDestroy() {
   
    console.log("Ordenes-creadas - OnDestroy")
  }

}
