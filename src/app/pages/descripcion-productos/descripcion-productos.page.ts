import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { AlertController, NavController } from '@ionic/angular';

import { AuthService } from 'src/app/services/auth.service';
import { environment } from 'src/environments/environment';
import { CarritoService } from './../../services/CarritoService';


@Component({
  selector: 'app-descripcion-productos',
  templateUrl: './descripcion-productos.page.html',
  styleUrls: ['./descripcion-productos.page.scss'],
})
export class DescripcionProductosPage implements OnInit {
  FormSend: FormGroup;
  data = [];
  domicilio:number;
  itemsCarrito= '';
  private subtotal: number = 0;
  character: any =[

  ];
  product2:any=[]
precioBase;
tienda:any='';
validador:any;
  originaPrice:any;
  urlBase:any;
  public cantidadDestinos:number =1;
  public price: any;
  public total:number;
  public id_product:any;
  product :any;
  public cantidad=0;
  public cantidades = 0;
  public precios :any;
  observacion: any;
  AuxCarrosDisponibles: any;
  AuxMotosDisponibles: any;
  AuxDisponiblesMunicipios: any;
  constructor(
    private router: Router,
    private auth: AuthService,
    private _route: ActivatedRoute,
    private cs: CarritoService,
    private navCtrl: NavController,
    private alertCtrl: AlertController,
    public fb: FormBuilder
  ) {
    this.FormSend= this.fb.group({


      observacion:[""]
      });
    this.urlBase=environment.urlBase;
    this._route.paramMap.subscribe((params: ParamMap) =>  {
      this.product=JSON.parse(params.get('product'));

      this.product.field_price_simple=parseFloat(this.product.field_price_simple);
      this.originaPrice = this.product.field_price_simple;
      this.product.observaciones =this.FormSend.value;
      this.product.originaPrice = this.product.field_price_simple;

      console.log(this.product,'products');


    });

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




    /// si es == 0 , entoces agrega y cambia por el local storage del rimero producto
    //// si no es igual a cero haces otro if, el id del producto por añadir es igua, añade, si no alerta

     this.precioBase=this.product.field_price_simple;

   // this.validador= localStorage.getItem('validadorCompras');

    //this.tienda== localStorage.getItem('idTienda')
    /*this.id_product=localStorage.getItem('id_product');
    this.price=localStorage.getItem('precio_product');*/

  }

  async ngAfterViewInit(){


    await this.cs.get_cart().then((res:any)=>{
     console.log('que pasa', this.data);
     if(!res) return;
     this.data = res;
     console.log(this.data);
     for(let x in res){
       this.subtotal += res[x].field_price_simple;
       this.total = this.subtotal+ this.domicilio;

     }

   });

   }

  ionViewWillEnter(){
   // this.cantidades=0;
    this.cantidadDestinos =1;
    this.precioBase=this.product.field_price_simple;

  }

  async presentAlert() {
    const alert = await this.alertCtrl.create({

      header: 'Atención:',

      message: 'Su producto fue añadido con éxito.',
      buttons: [
      {
        text:'aceptar',
        handler:()=>{
          this.navCtrl.back();
          //this.router.navigate(['/transportes']);
        }
      }]
    });

    await alert.present();



   }

   async BackAlert() {
    const alert = await this.alertCtrl.create({

      header: 'Atención:',

      message: 'Regrese a la tienda donde seleccionó el primer articulo',
      buttons: ['Aceptar']
    });

    await alert.present();



   }


   irAgregarCarrito(){



/// codigo validar disponibilidad


this.auth.getAuxiliaresDisponiblesMotos().subscribe(async res =>{
  console.log(res, ' aqui motos');
  this.AuxMotosDisponibles=res;

  console.log(this.AuxMotosDisponibles['length'],'lengt de vector motos');
  if(this.AuxMotosDisponibles.length==0){

    this.auth.getAuxiliaresDisponiblesCarros().subscribe(async res =>{
      let vpda=[];
      console.log(res, ' aqui carro');
      this.AuxCarrosDisponibles=res;

      if(this.AuxCarrosDisponibles.length==0){
        const alert = await this.alertCtrl.create({

          header: 'Advertencia',

          message: 'En este momento no tenemos auxiliar disponible, no podemos agregar productos',
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
        this.auth.seleccionarServicioCarro();




    // codigo agregar carrito
    console.log(this.FormSend.value);
    this.product.observaciones =this.FormSend.value;

//1. tener una variable local inicializada en 0 q es la tienda actual
// es hacer un if, si la tienda esta en 0, es la primera vez que entra entonces le asigno
// la tieenda del producto seeccionado a la variable local
// else -> comparar la tienda del producto seleccionado con la tienda actualmete definida
// si son iguales lo deja agregar si no , mostrar una alerta con el mesaje , regresar a la tienda del primer producto

console.log(this.product.stores_target_id,'target id');
//crear una variable con la url de la eid
if(localStorage.getItem('tienda')=='undefined'){
  /*
  this.cantidades +=  this.cantidadDestinos;
  this.originaPrice = this.originaPrice *this.cantidadDestinos;*/
  this.auth.sendFormObservacion(this.FormSend.value);

  this.tienda =this.product.stores_target_id;
// acctuaizar lavariable tienda en el local storage
  localStorage.setItem('tienda',this.tienda);

  console.log("Definiendo ZOna");

//this.product.cantidad = this.cantidades;
//this.product.field_price_simple =this.originaPrice;
this.product.cantidad = this.cantidadDestinos;
console.log(this.product.cantidad,'aqui cantidad')
this.cs.set_cart(this.product).then((res)=>{
  console.log(res);
  this.product.observaciones =this.FormSend.value;
  //this.router.navigate(['/carrito-compras']);
});
this.presentAlert();

//this.validador=this.tienda;
// datos de fruver



//datos de restaurantes





//datos emprendedore

}else{
  if(localStorage.getItem('tienda')==this.product.stores_target_id){

    console.log(this.product,'imprimiendo producto');
/*

    this.cantidades =  this.cantidades + this.cantidadDestinos;
    this.originaPrice= this.originaPrice * this.cantidades;

    this.product.cantidad =   this.cantidades;
    this.product.field_price_simple =this.originaPrice;*/

    this.product.cantidad = this.cantidadDestinos;
// get cart by id
// si exites cuantos hay


console.log(this.cs,'aqui res');

      this.cs.set_cart(this.product).then((res)=>{
        console.log(res,'aqui res');
        if(res==true){

        }


        this.auth.sendFormObservacion(this.FormSend.value);//Reload
        //this.router.navigate(['/carrito-compras']);
      });
      this.presentAlert();

      localStorage.setItem('tarifaOrigenRestaurante',this.product.field_tarifa);

      localStorage.setItem('imgBarrioOrigenRestaurante',this.product.field_imagen_barrio);
      localStorage.setItem('longitudOrigenRestaurante',this.product.field_longitud);
      localStorage.setItem('latitudOrigenRestaurante',this.product.field_latitud);

      localStorage.setItem('BarrioRestaurante',this.product.field_barrio_online);
      localStorage.setItem('DireccionRestaurante',this.product.field_dir_online);
      localStorage.setItem('locacionTiendas',this.product.field_location_online);


      localStorage.setItem('locacionOrigenSeleccionada',this.product.field_location_online);
      localStorage.setItem('tarifaOrigen',this.product.field_tarifa);
      localStorage.setItem('tarifaExternaOrigen',this.product.field_tarifa_externa);


    }else{
      this.BackAlert();

      this.tienda=localStorage.getItem('idTienda');


  }




}

      }


    });


  }else{
    this.auth.seleccionarServicioMoto();

    // codigo agregar carrito
    console.log(this.FormSend.value);
    this.product.observaciones =this.FormSend.value;

//1. tener una variable local inicializada en 0 q es la tienda actual
// es hacer un if, si la tienda esta en 0, es la primera vez que entra entonces le asigno
// la tieenda del producto seeccionado a la variable local
// else -> comparar la tienda del producto seleccionado con la tienda actualmete definida
// si son iguales lo deja agregar si no , mostrar una alerta con el mesaje , regresar a la tienda del primer producto

console.log(this.product.stores_target_id,'target id');
//crear una variable con la url de la eid
if(localStorage.getItem('tienda')==='undefined' ){
  /*
  this.cantidades +=  this.cantidadDestinos;
  this.originaPrice = this.originaPrice *this.cantidadDestinos;*/
  this.auth.sendFormObservacion(this.FormSend.value);

  this.tienda =this.product.stores_target_id;
// acctuaizar lavariable tienda en el local storage
  localStorage.setItem('tienda', this.tienda);
  localStorage.setItem('zona_origen', this.product.field_zona_b);
  localStorage.setItem('img_zona_origen', this.product.field_img_barrio);
  console.log("definiendo origen del producto");
//this.product.cantidad = this.cantidades;
//this.product.field_price_simple =this.originaPrice;
this.product.cantidad = this.cantidadDestinos;
console.log(this.product.cantidad,'aqui cantidad')
this.cs.set_cart(this.product).then((res)=>{
  console.log(res);
  this.product.observaciones =this.FormSend.value;
  //this.router.navigate(['/carrito-compras']);
});
this.presentAlert();

//this.validador=this.tienda;
// datos de fruver



//datos de restaurantes





//datos emprendedore

}else{
  if(localStorage.getItem('tienda') === this.product.stores_target_id){

    console.log(this.product,'imprimiendo producto');
/*

    this.cantidades =  this.cantidades + this.cantidadDestinos;
    this.originaPrice= this.originaPrice * this.cantidades;

    this.product.cantidad =   this.cantidades;
    this.product.field_price_simple =this.originaPrice;*/

    this.product.cantidad = this.cantidadDestinos;
// get cart by id
// si exites cuantos hay


console.log(this.cs,'aqui res');

      this.cs.set_cart(this.product).then((res)=>{
        console.log(res,'aqui res');
        if(res==true){

        }


        this.auth.sendFormObservacion(this.FormSend.value);//Reload
        //this.router.navigate(['/carrito-compras']);
      });
      this.presentAlert();

      localStorage.setItem('tarifaOrigenRestaurante',this.product.field_tarifa);

      localStorage.setItem('imgBarrioOrigenRestaurante',this.product.field_imagen_barrio);
      localStorage.setItem('longitudOrigenRestaurante',this.product.field_longitud);
      localStorage.setItem('latitudOrigenRestaurante',this.product.field_latitud);

      localStorage.setItem('BarrioRestaurante',this.product.field_barrio_online);
      localStorage.setItem('DireccionRestaurante',this.product.field_dir_online);
      localStorage.setItem('locacionTiendas',this.product.field_location_online);


      localStorage.setItem('locacionOrigenSeleccionada',this.product.field_location_online);
      localStorage.setItem('tarifaOrigen',this.product.field_tarifa);
      localStorage.setItem('tarifaExternaOrigen',this.product.field_tarifa_externa);


    }else{
      this.BackAlert();

      this.tienda=localStorage.getItem('idTienda');


  }




}



  }

});


  }



  irPageCarritoCompras(){
    console.log(this.data);
    this.observacion= this.auth.resumenObservacion;
    //console.log(this.observacion['observacion'][0].value);
var itemsCarrito='';
    for(var i =0; i<this.data.length;i++){
      itemsCarrito+=  ' Producto: ' + this.data[i]['titulo']+ '  ;  ' +
      ' Precio: ' +'$'+this.data[i]['field_price_simple'] +'  ;  ' +
      ' Cantidad: ' + this.data[i]['cantidad'] +' ;' + ' Observación: ' + this.data[i]['observaciones']['observacion'] +';';
    };

    console.log(itemsCarrito);
    localStorage.setItem('enviarProductos',itemsCarrito);
//ir a la vista en la que se establece el destino
if(this.data.length!=0){
  this.router.navigate(['/resumen-datos-envio-compras']);
}


  }
  irASeguirComprando(){
    this.navCtrl.back();
  }
  ngOnDestroy() {}

  add() {

    const servicioEvaluado = localStorage.getItem('servicioEvaluado');

    if ((servicioEvaluado === 'fruver' || servicioEvaluado === 'emprendedores') && this.cantidadDestinos >= 8) {
      return; // Evitar agregar más de 8 artículos
    }

     this.cantidadDestinos++;
     this.calc();
  }

  calc(){
    this.product.field_price_simple =this.originaPrice* this.cantidadDestinos;
    this.precioBase =this.originaPrice* this.cantidadDestinos;
  }

  rest(){
    if(this.cantidadDestinos>1){
      this.cantidadDestinos--;

      this.calc();
  }

  }

}
