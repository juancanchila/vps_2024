import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-fruver1',
  templateUrl: './fruver1.page.html',
  styleUrls: ['./fruver1.page.scss'],
})
export class Fruver1Page implements OnInit {

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
      
localStorage.setItem('idTienda',this.idEnCurso);
localStorage.setItem('tituloRestaurante',this.tituloRestaurante);
      
     
    
      
    });
    this.urlBase=environment.urlBase;
  }

  verTienda(){


  }

  

  ngOnInit() {
    
    this.auth.seleccionarProductosTiendas().subscribe(res =>{
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
  field_img_apk:product.field_img_apk

};
console.log(JSON.stringify(prod)) ;

    this.router.navigate(['/descripcion-productos',JSON.stringify(product)]);
  }

}
