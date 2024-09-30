import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-transportes',
  templateUrl: './transportes.page.html',
  styleUrls: ['./transportes.page.scss'],
})
export class TransportesPage implements OnInit {
locacion:any;
  AuxCarrosDisponibles: any;
  AuxMotosDisponibles: any;
  AuxDisponiblesMunicipios: any;
  constructor(private auth: AuthService, private router: Router, private alertController: AlertController) {


  }

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

    if(localStorage.getItem('mensajeria')=='sencilla'){
      if(this.AuxMotosDisponibles.length==0){


        const alert = await this.alertController.create({

          header: 'Advertencia',

          message: 'En este momento no tenemos auxiliar disponible en moto',
          // al hacer check, vamos a establecer una variable y al darle aceptar preguntamos si esa varibale esta definida si esta se continua
          buttons: [

          {
            text:'aceptar',
            handler:()=>{
              this.ionViewWillEnter();
          //this.router.navigate(['/tabs']);

            }
          }
        ]
        });

        await alert.present();

      }else{

        this.auth.seleccionarMoto();
      }



    }else  if(localStorage.getItem('mensajeria')=='llaves'){

      if(this.AuxMotosDisponibles.length==0){


        const alert = await this.alertController.create({

          header: 'Advertencia',

          message: 'En este momento no tenemos auxiliar disponible en moto',
          // al hacer check, vamos a establecer una variable y al darle aceptar preguntamos si esa varibale esta definida si esta se continua
          buttons: [

          {
            text:'aceptar',
            handler:()=>{
              this.ionViewWillEnter();
          //this.router.navigate(['/tabs']);

            }
          }
        ]
        });

        await alert.present();

      }else{

        this.auth.seleccionarMotollaves();
      }

    }

  }
  async selectCarro(){
    if(localStorage.getItem('mensajeria')=='sencilla'){
      if(this.AuxCarrosDisponibles.length==0){


        const alert = await this.alertController.create({

          header: 'Advertencia',

          message: 'En este momento no tenemos auxiliar disponible en carro',
          // al hacer check, vamos a establecer una variable y al darle aceptar preguntamos si esa varibale esta definida si esta se continua
          buttons: [

          {
            text:'aceptar',
            handler:()=>{
              this.ionViewWillEnter();
          //this.router.navigate(['/tabs']);

            }
          }
        ]
        });

        await alert.present();

      }else{

        this.auth.seleccionarCarro();
      }
    }else if(localStorage.getItem('mensajeria')=='llaves'){


      if(this.AuxCarrosDisponibles.length==0){


        const alert = await this.alertController.create({

          header: 'Advertencia',

          message: 'En este momento no tenemos auxiliar disponible en carro',
          // al hacer check, vamos a establecer una variable y al darle aceptar preguntamos si esa varibale esta definida si esta se continua
          buttons: [

          {
            text:'aceptar',
            handler:()=>{
              this.ionViewWillEnter();
          //this.router.navigate(['/tabs']);

            }
          }
        ]
        });

        await alert.present();

      }else{

        this.auth.seleccionarCarroLlaves();
      }
    }



  }
}
