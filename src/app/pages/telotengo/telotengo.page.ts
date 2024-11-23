import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-telotengo',
  templateUrl: './telotengo.page.html',
  styleUrls: ['./telotengo.page.scss'],
})
export class TelotengoPage implements OnInit {
  slider: any;
  urlBase: any;
  AuxCarrosDisponibles: any;
  AuxMotosDisponibles: any;
  AuxDisponiblesMunicipios: any;
  AuxCarrosGrandesDisponibles: any;
  AuxCarrosTallerDisponibles: any;
  AuxCarrosMedianosDisponibles: any;
  constructor(private router: Router,private auth:AuthService,private alertCtrl: AlertController) {
    this.urlBase=environment.urlBase;
   }

  ngOnInit() {
    this.auth.getUser().subscribe(res =>{
      console.log(res[0]['field_pago_efectivo'],'variable boolean para pago efectivo');
      localStorage.setItem('permitirPagoefectivo',res[0]['field_pago_efectivo']);
      //this.ifAuxiliar=localStorage.getItem('rol');

    });
    this.auth.seleccionarSliderTelotengo().subscribe(res =>{
      console.log(res, ' aqui slider');
      this.slider=res[0]['field_img_telo'];
      //this.slider=res;

     //inicializarlas en true

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

    this.auth.getAuxiliaresDisponiblesParaCarrosGrandes().subscribe(res =>{
      console.log(res, ' aqui carro');
      this.AuxCarrosGrandesDisponibles=res;

    });

    this.auth.getAuxiliaresDisponiblesParaCarrosMediano().subscribe(res =>{
      console.log(res, ' aqui carro mediano');
      this.AuxCarrosMedianosDisponibles=res;

    });
    this.auth.getAuxiliaresDisponiblesParaCarroTaller().subscribe(res =>{
      console.log(res, ' aqui carro taller');
      this.AuxCarrosTallerDisponibles=res;

    });
  }


  async irPageCarrotaller(){


      if(this.AuxCarrosTallerDisponibles.length==0){
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




          this.router.navigate(['/carro-taller']);



      }




  }


async irPageTrasteo() {
  this.auth.getMensajeError();

  console.log(this.AuxCarrosGrandesDisponibles['length'], 'carros grandes');
  console.log(this.AuxCarrosMedianosDisponibles['length'], 'carros medianos');

  // Verificamos si no hay carros grandes ni medianos disponibles
  if (this.AuxCarrosGrandesDisponibles['length'] == 0 && this.AuxCarrosMedianosDisponibles['length'] == 0) {
    const alert = await this.alertCtrl.create({
      header: 'Advertencia',
      message: 'En este momento no tenemos auxiliares disponibles, no podemos crear tu orden.',
      buttons: [
        {
          text: 'Aceptar',
          handler: () => {
            this.ngOnInit();
          }
        }
      ]
    });

    await alert.present();

  } else {
    // Si hay al menos un carro grande o uno mediano disponible, continuamos
    this.auth.seleccionarServicioCarroGrande(); // Puedes ajustar esto si necesitas seleccionar otro servicio

    setTimeout(async () => {
      this.router.navigate(['/trasteo']);
    }, 1000);
  }
}


  irPageArmaTuEquipo(){
    this.router.navigate(['/arma-tu-equipo']);

  }
  irPageZonaGamer(){
    this.router.navigate(['/zona-gamer']);

  }
  irPageRecogerMascotas(){
    this.router.navigate(['/mascotas']);

  }




}
