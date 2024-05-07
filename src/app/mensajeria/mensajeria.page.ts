import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-mensajeria',
  templateUrl: './mensajeria.page.html',
  styleUrls: ['./mensajeria.page.scss'],
})

export class MensajeriaPage implements OnInit {
  AuxCarrosDisponibles: any;
  AuxMotosDisponibles: any;
  AuxDisponiblesMunicipios: any;

  constructor(private router: Router,private alertCtrl: AlertController,private auth: AuthService) { }
  irPageSencilla(){
    this.router.navigate(['/transportes']);
    localStorage.setItem('mensajeria','sencilla');
  }
  irPageFormSencilla(){
    this.router.navigate(['/form-sencilla']);
  }
  irPageRutas(){
   /* this.router.navigate(['/transportes-ruta']);*/
   this.router.navigate(['/modalidad']);
  }
  irPageEspecial(){
    this.router.navigate(['/especial']);
  }
  async irPageMedicamentos(){
    console.log(this.AuxMotosDisponibles['length'],'lengt de vector motos');
    if(this.AuxMotosDisponibles.length==0){

        const alert = await this.alertCtrl.create({

          header: 'Advertencia',

          message: 'En este momento no tenemos auxiliar disponible, no podemos crear tu orden',
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
      this.auth.seleccionarServicioMoto();



        this.router.navigate(['/medicamentos']);



    }


  }
  async irPagePagos(){
    console.log(this.AuxMotosDisponibles['length'],'lengt de vector motos');
    if(this.AuxMotosDisponibles.length==0){

        const alert = await this.alertCtrl.create({

          header: 'Advertencia',

          message: 'En este momento no tenemos auxiliar disponible, no podemos crear tu orden',
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
      this.auth.seleccionarServicioMoto();



        this.router.navigate(['/pagos']);



    }



  }
  async irAlertaSencilla(){
    const alert = await this.alertCtrl.create({

      header: 'Atención:',

      message: 'Aqui podras diligenciar formulario.',
      buttons: [
      {
        text:'aceptar'

      }]
    });

    await alert.present();
  }
  async irAlertaRutas(){
    const alert = await this.alertCtrl.create({

      header: 'Atención:',

      message: 'Aqui podras diligenciar formulario.',
      buttons: [
      {
        text:'aceptar'

      }]
    });

    await alert.present();
  }
  async irAlertaEspecial(){
    const alert = await this.alertCtrl.create({

      header: 'Atención:',

      message: 'Aqui podras diligenciar formulario.',
      buttons: [
      {
        text:'aceptar'

      }]
    });

    await alert.present();
  }
  async irAlertaMedicamentos(){
    const alert = await this.alertCtrl.create({

      header: 'Atención:',

      message: 'Aqui podras diligenciar formulario.',
      buttons: [
      {
        text:'aceptar'

      }]
    });

    await alert.present();
  }
  async irAlertaPagos(){
    const alert = await this.alertCtrl.create({

      header: 'Atención:',

      message: 'Aqui podras diligenciar formulario.',
      buttons: [
      {
        text:'aceptar'

      }]
    });

    await alert.present();

  }

  ngOnInit() {
    this.auth.getUser().subscribe(res =>{
      console.log(res[0]['field_pago_efectivo'],'variable boolean para pago efectivo');
      localStorage.setItem('permitirPagoefectivo',res[0]['field_pago_efectivo']);
      //this.ifAuxiliar=localStorage.getItem('rol');

    });
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

  ngOnDestroy() {

    console.log("Mensajeria - OnDestroy")
  }

}
