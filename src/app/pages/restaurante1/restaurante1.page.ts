import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-restaurante1',
  templateUrl: './restaurante1.page.html',
  styleUrls: ['./restaurante1.page.scss'],
})
export class Restaurante1Page implements OnInit {
  character: any =[
    
  ];
  idEnCurso:any;
  tituloRestaurante:any;
  allPedidos:any;
  urlBase:any;
  constructor(private auth: AuthService,private router: Router,private _route: ActivatedRoute) { 

    this._route.paramMap.subscribe((params: ParamMap) =>  {
      
      this.allPedidos=JSON.parse(params.get('allPedidos'));

      //todas las variables las vas a obtener de llamar al nodo

      console.log(this.allPedidos);
      console.log(this.allPedidos['Titulo']);
      console.log(this.allPedidos['store_id']);
      this.tituloRestaurante=this.allPedidos['Titulo'];
this.idEnCurso=this.allPedidos['store_id'];

if(localStorage.getItem('tienda')=='undefined'){
  localStorage.setItem('idTienda',this.idEnCurso);
localStorage.setItem('tituloRestaurante',this.tituloRestaurante);

localStorage.setItem('tarifaOrigenRestaurante',this.allPedidos.field_tarifa);




localStorage.setItem('imgBarrioOrigenRestaurante',this.allPedidos.field_imagen_barrio);
localStorage.setItem('longitudOrigenRestaurante',this.allPedidos.field_longitud);
localStorage.setItem('latitudOrigenRestaurante',this.allPedidos.field_latitud);

localStorage.setItem('BarrioRestaurante',this.allPedidos.field_barrio_restaurante);
localStorage.setItem('DireccionRestaurante',this.allPedidos.field_dir_rest);
localStorage.setItem('ContactoRestaurante',this.allPedidos.field_contacto_restaurante);

localStorage.setItem('locacionTiendas',this.allPedidos.field_location_restaurante_);

localStorage.setItem('locacionOrigenSeleccionada',this.allPedidos.field_location_restaurante_);
localStorage.setItem('tarifaOrigen',this.allPedidos.field_tarifa);
localStorage.setItem('tarifaExternaOrigen',this.allPedidos.field_tarifa_externa);

}else if(this.idEnCurso==localStorage.getItem('tienda')){
  localStorage.setItem('tituloRestaurante',this.tituloRestaurante);

localStorage.setItem('tarifaOrigenRestaurante',this.allPedidos.field_tarifa);




localStorage.setItem('imgBarrioOrigenRestaurante',this.allPedidos.field_imagen_barrio);
localStorage.setItem('longitudOrigenRestaurante',this.allPedidos.field_longitud);
localStorage.setItem('latitudOrigenRestaurante',this.allPedidos.field_latitud);

localStorage.setItem('BarrioRestaurante',this.allPedidos.field_barrio_restaurante);
localStorage.setItem('DireccionRestaurante',this.allPedidos.field_dir_rest);
localStorage.setItem('locacionTiendas',this.allPedidos.field_location_restaurante_);

localStorage.setItem('locacionOrigenSeleccionada',this.allPedidos.field_location_restaurante_);
localStorage.setItem('tarifaOrigen',this.allPedidos.field_tarifa);
localStorage.setItem('tarifaExternaOrigen',this.allPedidos.field_tarifa_externa);


}
      

      






   
    });
    this.urlBase=environment.urlBase;
  }
  doRefresh(event) {
    this.ngOnInit();
    console.log('Begin async operation');

    setTimeout(() => {
      console.log('Async operation has ended');
      event.target.complete();
    }, 2000);
  }
  verTienda(){


  }
  iraCarrito(){
    this.router.navigate(['/carrito-compras']);
  }
  

  ngOnInit() {
    
    this.auth.seleccionarProductosTiendas().subscribe(res =>{
      console.log(res);
      console.log(res['0']['field_price_simple'], 'aqui id prod restr');
      localStorage.setItem('id_product',res['0']['product_id']);
      localStorage.setItem('precio_product',res['0']['field_price_simple']);
      this.character=res;
    })
    
  }
  ngOnDestroy() {
   
    console.log("Combo1 - OnDestroy")
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
  field_barrio_restaurante:product.field_barrio_restaurante,
  field_dir_rest:product.field_dir_rest,
  field_tarifa_externa:product.field_tarifa_externa,
  field_location_restaurante_:product.field_location_restaurante_



};
console.log(JSON.stringify(prod)) ;

    this.router.navigate(['/descripcion-productos',JSON.stringify(product)]);
  }

  

}
