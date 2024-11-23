import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth.service';
import { environment } from 'src/environments/environment';
import Swiper, { Autoplay, EffectFade, Pagination } from 'swiper';

@Component({
  selector: 'app-restaurantes',
  templateUrl: './restaurantes.page.html',
  styleUrls: ['./restaurantes.page.scss'],
})
export class RestaurantesPage implements OnInit {
  filtroRestaurantes: any[] = [];
  iconos: any[] = [];
  filtroSeleccionado: string = '';

  fondo= "";

  store_id:any;
criterio:any;
  character: any =[];
  slider: any;
  urlBase: string;
  searched: any;
  sombra ="";
  sombra2 ="";
  sombra3 ="";
  sombra4 ="";
  message_restaurantes: any;


  constructor(private http: HttpClient, private router: Router, private auth: AuthService, public alertController: AlertController) {
    localStorage.setItem('servicioEvaluado','restaurantes');
    this.urlBase=environment.urlBase;
   }

  public swiperConfig={
    pagination:false,
    autoplay:{delay: 10000},
    EffectFade:true

  };


  public swiperConfig2={
    slidesPerView: 4,
    spaceBetween: 10,
    autoplay: {
      delay: 5000,
      disableOnInteraction: false
    }

  };

  ngOnInit() {


  this.auth.getMessageRestaurante().subscribe(async data => {
    this.message_restaurantes = data[0]['body'];
    console.log(data, 'Data received in component');

    // Crear y mostrar la alerta después de recibir los datos
    const alert = await this.alertController.create({
      header: 'Importante',
      message: this.message_restaurantes || 'No se recibió el mensaje de la API', // Muestra un mensaje por defecto si no hay datos
      buttons: [
        {
          text: 'Aceptar',
          handler: () => {
            // Lógica adicional si es necesario cuando se presiona "Aceptar"
          }
        }
      ]
    });

    await alert.present();
  });


    Swiper.use([Pagination,Autoplay,EffectFade]);
    this.auth.seleccionarSliderRestaurantes().subscribe(res =>{
      console.log(res, ' aqui slider');
     // this.slider=res[0]['field_img_banner'];
      this.slider=res;

     //inicializarlas en true

    });


    this.auth.seleccionarRestaurantes().subscribe(res =>{
      console.log(res);
      for(let x in res){
        console.log(res[0]['field_creiteria']);

      }

     this.character=res;
     this.searched = this.character;

    });
    this.auth.getSesion();

    this.auth.filtroRestaurantes().subscribe(res =>{
      this.filtroRestaurantes = res;
      console.log(res,'res filtro');
    });
  }

  aplicarFiltro(filtro: string) {
    console.log(filtro,'tofil');

    this.iconos.forEach(icono => {
      icono.seleccionado = icono.filtro === filtro;
  });
    if (this.filtroSeleccionado === filtro) {

      this.ngOnInit();
      this.filtroSeleccionado = "";
         // Volver a cargar todos los restaurantes

    } else {
        // Establecer el nuevo filtro seleccionado
        this.filtroSeleccionado = filtro;
        // Actualizar el estado de selección de cada ícono
        this.iconos.forEach(icono => {
            icono.seleccionado = icono.filtro === filtro;
        });
        // Resto del código...
        this.auth.seleccionarRestaurantes().subscribe(res => {
          this.character = res.filter(character => character.field_creiteria === filtro);
          this.searched = this.character;
          this.filtroSeleccionado = filtro;

      });
    }
    // Lógica para aplicar el filtro, por ejemplo, filtrar los restaurantes por el criterio seleccionado

}


  cargarTiendas(){

    this.auth.seleccionarRestaurantes().subscribe(res =>{
      console.log(res);
      for(let x in res){
        console.log(res[0]['field_creiteria']);

      }

     this.character=res;

    },error2=>{
      console.log(error2);
    });
  }
  doRefresh(event) {
    this.ngOnInit();
    console.log('Begin async operation');

    setTimeout(() => {
      console.log('Async operation has ended');
      event.target.complete();
    }, 2000);
  }
  ngOnDestroy() {

    console.log("Restaurante1 - OnDestroy")
  }
  irPageRestaurante1(){


  }
  buscarRestaurante(){
    console.log('restFinf');
    this.presentAlert();
    this.router.navigate(['/otros-restaurantes']);
  }
  iraCarrito(){
    this.router.navigate(['/carrito-compras']);
  }

  irPageProductos(allPedidos:any){
    localStorage.setItem('idTienda', allPedidos.store_id);
    localStorage.setItem('zona_origen',allPedidos.zona_b);
    this.router.navigate(['/restaurante1',JSON.stringify(allPedidos)]);

  }
  searchRestaurantes(event){
    const text =event.target.value;
    this.searched = this.character;
        if(text && text.trim() != ''){
          this.searched = this.searched.filter((user: any)=>{
            return (user.Titulo.toLowerCase().indexOf(text.toLowerCase()) > -1);
          })
        }
      }

  // metodo para mostra popu en otros restaurantes

    async presentAlert() {
    const alert = await this.alertController.create({

      header: 'Va Pa Esa',

      message: 'En esta sesión puedes hacer los pedidos que se te antojen, nosotros nos encargamos'



       ,
      // al hacer check, vamos a establecer una variable y al darle aceptar preguntamos si esa varibale esta definida si esta se continua
      buttons: [{
        text:'cancel',
        role:'cancel',
        /**
        handler:()=>{

          this.router.navigate(['/tabs']);
        }*/

      },
      {
        text:'aceptar',
        handler:()=>{



          //si es igua igual a on, lpasas para la otra pagina




          //this.router.navigate(['/transportes']);
        }
      }]
    });

    await alert.present();



   }
}
