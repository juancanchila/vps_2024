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
  modalidad_seleccionada : string;

  constructor(private alertController:AlertController,private auth: AuthService,private router: Router) { }



  ngOnInit() {


    this.modalidad_seleccionada = localStorage.getItem('modalidad');

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

  async selectMoto() {
    const minimumMotoDisponibles = this.modalidad_seleccionada === 'Agil' ? 8 : 1;

    console.log(this.AuxMotosDisponibles.length);

    if (this.AuxMotosDisponibles.length < minimumMotoDisponibles) {
      const alert = await this.alertController.create({
        header: 'Advertencia',
        message: 'En este momento no tenemos auxiliar disponible en moto',
        buttons: [
          {
            text: 'aceptar',
            handler: () => {
              this.ngOnInit();
            },
          },
        ],
      });

      await alert.present();
    } else {
      localStorage.setItem('cantidadDeDisponibles', this.AuxMotosDisponibles.length);
      this.auth.seleccionarMotoRuta();
    }
  }

  async selectCarro() {
    const minimumCarroDisponibles = this.modalidad_seleccionada === 'Agil' ? 8 : 1;

    console.log(this.AuxCarrosDisponibles.length);

    if (this.AuxCarrosDisponibles.length < minimumCarroDisponibles) {
      const alert = await this.alertController.create({
        header: 'Advertencia',
        message: 'En este momento no tenemos auxiliar disponible en carro',
        buttons: [
          {
            text: 'aceptar',
            handler: () => {
              this.ngOnInit();
            },
          },
        ],
      });

      await alert.present();
    } else {
      localStorage.setItem('cantidadDeDisponibles', this.AuxCarrosDisponibles.length);
      this.auth.seleccionarCarroRuta();
    }
  }
}


