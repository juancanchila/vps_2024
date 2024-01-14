import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-transportes-ruta',
  templateUrl: './transportes-ruta.page.html',
  styleUrls: ['./transportes-ruta.page.scss'],
})
export class TransportesRutaPage implements OnInit {
  [x: string]: any;

  locacion:any;
  AuxCarrosDisponibles: any;
  AuxMotosDisponibles: any;

  constructor(private alertController:AlertController,private auth: AuthService,private router: Router) { }



  ngOnInit() {
       
    this.auth.getAuxiliaresDisponiblesCarros().subscribe(res =>{
      let vpda=[];
      console.log(res, ' aqui carro');
      this.AuxCarrosDisponibles=res;
     
     
 
    });
    this.auth.getAuxiliaresDisponiblesMotos().subscribe(res =>{
      console.log(res, ' aqui motos');
      this.AuxMotosDisponibles=res;
    
    });

    this.auth.getAuxiliaresDisponiblesMunicipio().subscribe(res =>{
      console.log(res, ' aqui aux municiipio');
      this.AuxDisponiblesMunicipios=res;
    
    });
    this.locacion=localStorage.getItem('locacion');
  }
  doRefresh(event) {
    this.ngOnInit();
    console.log('Begin async operation');

    setTimeout(() => {
      console.log('Async operation has ended');
      event.target.complete();
    }, 2000);
  }
  ionViewWillEnter(){
    
    this.auth.getAuxiliaresDisponiblesCarros().subscribe(res =>{
      let vpda=[];
      console.log(res, ' aqui carro');
      this.AuxCarrosDisponibles=res;
     
     
 
    });
    this.auth.getAuxiliaresDisponiblesMotos().subscribe(res =>{
      console.log(res, ' aqui motos');
      this.AuxMotosDisponibles=res;
    
    });

    this.auth.getAuxiliaresDisponiblesMunicipio().subscribe(res =>{
      console.log(res, ' aqui aux municiipio');
      this.AuxDisponiblesMunicipios=res;
    
    });
  
}
  iraIndex(){
    this.router.navigate(['/tabs']);
  }
  ngOnDestroy() {
   
    console.log("Trasnportes- OnDestroy")
  }
  async selectMoto(){
    console.log(this.AuxMotosDisponibles.length);

    if(this.AuxMotosDisponibles.length<=2){
           

      const alert = await this.alertController.create({
        
        header: 'Advertencia',
       
        message: 'En este momento no tenemos auxiliar disponible en moto',
        // al hacer check, vamos a establecer una variable y al darle aceptar preguntamos si esa varibale esta definida si esta se continua
        buttons: [
       
        {
          text:'aceptar',
          handler:()=>{
        this.ngOnInit();
        //this.router.navigate(['/tabs']);
            
          }
        }
      ]
      });
      
      await alert.present();

    }else{
    
        localStorage.setItem('cantidadDeDisponibles',this.AuxMotosDisponibles.length);
        this.auth.seleccionarMotoRuta();
   
      
    }
  
  }
  async selectCarro(){
    console.log(this.AuxCarrosDisponibles.length);
    if(this.AuxCarrosDisponibles.length<=2){
            

      const alert = await this.alertController.create({
        
        header: 'Advertencia',
       
        message: 'En este momento no tenemos auxiliar disponible en carro',
        // al hacer check, vamos a establecer una variable y al darle aceptar preguntamos si esa varibale esta definida si esta se continua
        buttons: [
       
        {
          text:'aceptar',
          handler:()=>{
         this.ngOnInit();
       // this.router.navigate(['/tabs']);
            
          }
        }
      ]
      });
      
      await alert.present();

    }else{
     
        localStorage.setItem('cantidadDeDisponibles',this.AuxCarrosDisponibles.length);
      this.auth.seleccionarCarroRuta();
    
      
    }
    
    
  }

}
