import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth.service';
import { environment } from 'src/environments/environment';
import Swiper, { Autoplay, EffectFade, Pagination } from 'swiper';

@Component({
  selector: 'app-emprendedores',
  templateUrl: './emprendedores.page.html',
  styleUrls: ['./emprendedores.page.scss'],
})
export class EmprendedoresPage implements OnInit {
  filtroEmprendedores: any[] = [];
  filtroSeleccionado;
  iconos: any[] = [];
  store_id:any;

  character: any =[];
  urlBase: string;
  slider: any;
  criterio: string;
  searched: any;
  sombra: string[] = new Array(8).fill('');
  message_emprendedores: any;
  constructor(private router: Router, private auth: AuthService , public alertController: AlertController) {
    this.urlBase = environment.urlBase;
    localStorage.setItem('servicioEvaluado','emprendedores');
   }
   public swiperConfig={
    pagination:false,
    autoplay:{delay: 10000},
    EffectFade:true

  }
  public swiperConfig2={
    slidesPerView: 4,
    spaceBetween: 10,
    autoplay: {
      delay: 5000,
      disableOnInteraction: false
    }

  };
  ngOnInit() {


    this.auth.getMessageEmprendedores().subscribe(async data => {
      this.message_emprendedores = data[0]['body'];
      console.log(data, 'Data received in component');

      // Crear y mostrar la alerta después de recibir los datos
      const alert = await this.alertController.create({
        header: 'Importante',
        message: this.message_emprendedores || 'No se recibió el mensaje de la API', // Muestra un mensaje por defecto si no hay datos
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
    this.auth.seleccionarSliderEmprendedores().subscribe(res =>{
      console.log(res, ' aqui slider');
      this.slider=res;
    });
    this.auth.getSesion();
    this.auth.seleccionarEmprendedores().subscribe(res =>{
      console.log(res);
      this.character=res;
      this.searched = this.character;
    });
    this.auth.filtroEmprendedores().subscribe(res =>{
      this.filtroEmprendedores = res;
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
      this.filtroSeleccionado = 0;
         // Volver a cargar todos los restaurantes

    } else {
        // Establecer el nuevo filtro seleccionado
        this.filtroSeleccionado = filtro;
        // Actualizar el estado de selección de cada ícono
        this.iconos.forEach(icono => {
            icono.seleccionado = icono.filtro === filtro;
        });
        // Resto del código...
        this.auth.seleccionarEmprendedores().subscribe(res => {
          this.character = res.filter(character => character.field_criterio === filtro);
          this.searched = this.character;
          this.filtroSeleccionado = filtro;

      });
    }
    // Lógica para aplicar el filtro, por ejemplo, filtrar los restaurantes por el criterio seleccionado

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

  iraCarrito(){
    this.router.navigate(['/carrito-compras']);
  }

  irPageProductos(allPedidos:any){
    localStorage.setItem('idTienda',allPedidos.store_id);
    this.router.navigate(['/emprendedores1',JSON.stringify(allPedidos)]);
    console.log(this.searched);
  }

  searchEmprendedores(event){
    const text =event.target.value;
    this.searched = this.character;
    if(text && text.trim() != ''){
      this.searched = this.searched.filter((user: any)=>{
        return (user.Titulo.toLowerCase().indexOf(text.toLowerCase()) > -1);
      })
    }
  }

}
