import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth.service';
@Component({
  selector: 'app-modalidad',
  templateUrl: './modalidad.page.html',
  styleUrls: ['./modalidad.page.scss'],
})
export class ModalidadPage implements OnInit {
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
  async selectAgil(){
    console.log(this.AuxMotosDisponibles.length,'cantidad motos');
    console.log(this.AuxCarrosDisponibles.length,'cantidad carros');

    if(this.AuxMotosDisponibles.length<10 || this.AuxCarroDisponibles<10){


      const alert = await this.alertController.create({

        header: 'Advertencia',

        message: 'En este momento no tenemos auxiliar disponible',
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

        localStorage.setItem('modalidad','Agil');
        this.router.navigate(['/transportes-ruta']);


    }

  }
  async selectModerada(){
 
    console.log(this.AuxMotosDisponibles.length,'cantidad motos');
    console.log(this.AuxCarrosDisponibles.length,'cantidad carros');
    if(this.AuxMotosDisponibles.length==0 && this.AuxCarroDisponibles==0){


      const alert = await this.alertController.create({

        header: 'Advertencia',

        message: 'En este momento no tenemos auxiliar disponible',
        // al hacer check, vamos a establecer una variable y al darle aceptar preguntamos si esa varibale esta definida si esta se continua
        buttons: [

        {
          text:'aceptar',
          handler:()=>{
        this.ngOnInit();
       

          }
        }
      ]
      });

      await alert.present();

    }else{

        localStorage.setItem('modalidad','Moderada');
        this.router.navigate(['/transportes-ruta']);


    }



  }

}
