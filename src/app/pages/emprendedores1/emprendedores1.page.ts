import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-emprendedores1',
  templateUrl: './emprendedores1.page.html',
  styleUrls: ['./emprendedores1.page.scss'],
})
export class Emprendedores1Page implements OnInit {

 
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
     
      this.tituloRestaurante=this.allPedidos['Titulo'];
this.idEnCurso=this.allPedidos['store_id'];

if(localStorage.getItem('tienda')=='undefined'){
  localStorage.setItem('idTienda',this.idEnCurso);
localStorage.setItem('tituloRestaurante',this.tituloRestaurante);

localStorage.setItem('tarifaOrigenRestaurante',this.allPedidos.field_tarifa);

localStorage.setItem('imgBarrioOrigenRestaurante',this.allPedidos.field_imagen_barrio);
localStorage.setItem('longitudOrigenRestaurante',this.allPedidos.field_longitud);
localStorage.setItem('latitudOrigenRestaurante',this.allPedidos.field_latitud);

localStorage.setItem('BarrioRestaurante',this.allPedidos.field_barrio);
localStorage.setItem('DireccionRestaurante',this.allPedidos.field_dir);

localStorage.setItem('ContactoRestaurante',this.allPedidos.field_contacto_emprendedor);
      
localStorage.setItem('locacionTiendas',this.allPedidos.field_location_emprendedores_);   
    

localStorage.setItem('locacionOrigenSeleccionada',this.allPedidos.field_location_emprendedores_);
localStorage.setItem('tarifaOrigen',this.allPedidos.field_tarifa);
localStorage.setItem('tarifaExternaOrigen',this.allPedidos.field_tarifa_externa);

}else if(this.idEnCurso==localStorage.getItem('tienda')){
 
  localStorage.setItem('tituloRestaurante',this.tituloRestaurante);
  
  localStorage.setItem('tarifaOrigenRestaurante',this.allPedidos.field_tarifa);
  
  localStorage.setItem('imgBarrioOrigenRestaurante',this.allPedidos.field_imagen_barrio);
  localStorage.setItem('longitudOrigenRestaurante',this.allPedidos.field_longitud);
  localStorage.setItem('latitudOrigenRestaurante',this.allPedidos.field_latitud);
  
  localStorage.setItem('BarrioRestaurante',this.allPedidos.field_barrio);
  localStorage.setItem('DireccionRestaurante',this.allPedidos.field_dir);
        
  localStorage.setItem('locacionTiendas',this.allPedidos.field_location_emprendedores_);   
      
  
  localStorage.setItem('locacionOrigenSeleccionada',this.allPedidos.field_location_emprendedores_);
  localStorage.setItem('tarifaOrigen',this.allPedidos.field_tarifa);
  localStorage.setItem('tarifaExternaOrigen',this.allPedidos.field_tarifa_externa);

}



      
    });
    this.urlBase=environment.urlBase;
  }

  iraCarrito(){
    this.router.navigate(['/carrito-compras']);
  }

  verTienda(){


  }
  

  

  ngOnInit() {
    
    
    this.auth.seleccionarProductosTiendas().subscribe(res =>{
      console.log(res);
      //localStorage.setItem('id_product',res['0']['product_id']);
     // localStorage.setItem('precio_product',res['0']['field_price_simple']);
      this.character=res;
    })
    
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
  field_barrio:product.field_barrio,
  field_imagen_barrio:product.field_imagen_barrio,
  field_longitud:product.field_longitud,
  field_latitud:product.field_latitud,
  field_tarifa_externa:product.field_tarifa_externa,
  field_tarifa:product.field_tarifa,
  field_dir:product.field_dir,
  field_location_emprendedores_:product.field_location_emprendedores_




};
console.log(JSON.stringify(prod)) ;

    this.router.navigate(['/descripcion-productos',JSON.stringify(product)]);
  }

}
