import { Component, OnInit } from '@angular/core';
import { ParamMap, Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth.service';
import { environment } from 'src/environments/environment';


@Component({
  selector: 'app-fruver',
  templateUrl: './fruver.page.html',
  styleUrls: ['./fruver.page.scss'],
})
export class FruverPage implements OnInit {

  searched: any;
  character: any =[

  ];
    slider:any=[];

  idEnCurso:any;
  tituloRestaurante:any;
  allPedidos:any;
  urlBase:any;
  precioSimple:any;
  message_fruver: any;
  constructor(private auth: AuthService,private router: Router,public alertController:AlertController) {

    localStorage.setItem('servicioEvaluado','fruver');
    this.urlBase=environment.urlBase;
  }

  verTienda(){


  }



  ngOnInit() {

    this.auth.getMessageFruver().subscribe(async data => {
      this.message_fruver = data[0]['body'];
      console.log(data, 'Data received in component');

      // Crear y mostrar la alerta después de recibir los datos
      const alert = await this.alertController.create({
        header: 'Importante',
        message: this.message_fruver || 'No se recibió el mensaje de la API', // Muestra un mensaje por defecto si no hay datos
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




    this.auth.seleccionarSliderFruver().subscribe(res =>{
      console.log(res, ' aqui slider');
     this.slider=res[0]['field_imagen_fruver'];

      console.log(this.slider);



         this.searched = this.character;
    });



    this.auth.getSesion();
    this.auth.seleccionarProductosFruver().subscribe(res =>{
      console.log(res);
      localStorage.setItem('id_product',res['0']['product_id']);
      localStorage.setItem('precio_product',res['0']['field_price_simple']);
      this.idEnCurso=res['0']['stores_target_id'];
      this.character=res;
      this.searched = this.character;
      this.precioSimple = localStorage.getItem('precio_product');
    })

  }
  searchFruver(event){
    const text =event.target.value;
    this.searched = this.character;
        if(text && text.trim() != ''){
          this.searched = this.searched.filter((user: any)=>{
            return (user.titulo.toLowerCase().indexOf(text.toLowerCase()) > -1);
          })
        }
      }

  ngOnDestroy() {

    console.log("Combo1 - OnDestroy")
  }
  iraCarrito(){
    this.router.navigate(['/carrito-compras']);
  }
  irPageCombo1(){
    this.router.navigate(['/combo1']);

  }
  irPageCombo2(){
    this.router.navigate(['/combo2']);

  }
  irPageCarritoCompras(){
    this.router.navigate(['/carrito-compras']);

  }
  doRefresh(event) {
    this.ngOnInit();
    console.log('Begin async operation');

    setTimeout(() => {
      console.log('Async operation has ended');
      event.target.complete();
    }, 2000);
  }

  irPageProductos(product:any){

var prod={
  product_id:product.product_id,
  field_price_simple:product.field_price_simple,
  titulo:product.titulo,
  field_img_apk:product.field_img_apk,
  field_tarifa:product.field_tarifa,
  field_imagen_barrio:product.field_imagen_barrio,
  field_longitud:product.field_longitud,
  field_latitud:product.field_latitud,
  field_barrio_restaurante:product.field_barrio_online,
  field_dir_rest:product.field_dir_online,
  field_tarifa_externa:product.field_tarifa_externa,
  field_location_online:product.field_location_online,
















};
console.log(JSON.stringify(prod)) ;

if(localStorage.getItem('tienda')=='undefined'){

  localStorage.setItem('tarifaOrigenRestaurante',product.field_tarifa);
  localStorage.setItem('zona_destino', product.field_zona_a);

localStorage.setItem('imgBarrioOrigenRestaurante',product.field_imagen_barrio);
localStorage.setItem('longitudOrigenRestaurante',product.field_longitud);
localStorage.setItem('latitudOrigenRestaurante',product.field_latitud);

localStorage.setItem('BarrioRestaurante',product.field_barrio_online);
localStorage.setItem('DireccionRestaurante',product.field_dir_online);
localStorage.setItem('ContactoRestaurante',product.field_contacto_fruver);

localStorage.setItem('locacionTiendas',product.field_location_online);


localStorage.setItem('locacionOrigenSeleccionada',product.field_location_online);
localStorage.setItem('tarifaOrigen',product.field_tarifa);
localStorage.setItem('tarifaExternaOrigen',product.field_tarifa_externa);

}else if(this.idEnCurso==localStorage.getItem('tienda')){
  localStorage.setItem('tarifaOrigenRestaurante',product.field_tarifa);

  localStorage.setItem('imgBarrioOrigenRestaurante',product.field_imagen_barrio);
  localStorage.setItem('longitudOrigenRestaurante',product.field_longitud);
  localStorage.setItem('latitudOrigenRestaurante',product.field_latitud);

  localStorage.setItem('BarrioRestaurante',product.field_barrio_online);
  localStorage.setItem('DireccionRestaurante',product.field_dir_online);
  localStorage.setItem('ContactoRestaurante',product.field_contacto_fruver);
  localStorage.setItem('locacionTiendas',product.field_location_online);


  localStorage.setItem('locacionOrigenSeleccionada',product.field_location_online);
  localStorage.setItem('tarifaOrigen',product.field_tarifa);
  localStorage.setItem('tarifaExternaOrigen',product.field_tarifa_externa);

}



    this.router.navigate(['/descripcion-productos',JSON.stringify(product)]);
  }

}
