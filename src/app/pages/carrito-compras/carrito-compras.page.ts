import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController, NavController } from '@ionic/angular';
import { FormularioI } from 'modelos/formulario.interface';
import { ProductosI } from 'modelos/productos.interface';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import { CarritoService } from 'src/app/services/CarritoService';
export interface carritoSencilla{
  "title":[{"value":'Mensajeria Carrito'}],

  "type":[{"target_id": 'sencilla'}],
  "field_direccion_entrega":[{"value": ""}],

  "field_contacto":[{"value": ""}],

  "field_contacto_destino":[{"value": ""}],

  "field_direccion_destino":[{"value": ""}],

}
@Component({
  selector: 'app-carrito-compras',
  templateUrl: './carrito-compras.page.html',
  styleUrls: ['./carrito-compras.page.scss'],
})
export class CarritoComprasPage implements OnInit {
tituloRestaurante:any;
  private carrito: Array<ProductosI> = [];
  private subscription: Subscription;
  private subtotal: number = 0;
  observacion: any;
  total:number;
  product:any = {};
  cantidad:string;
  precio:string;
  id:string;
  titulo:string;
  data = [];
  domicilio:number;
  itemsCarrito= '';
  validador:any;

  FormSend: FormGroup;
  AuxCarrosDisponibles: any;
  AuxMotosDisponibles: any;
  AuxDisponiblesMunicipios: any;
  constructor(private alertCtrl:AlertController,
    public fb: FormBuilder,
    private auth: AuthService,
    private router: Router,
    private cs: CarritoService,
    private navCtrl: NavController
  ) {

    this.FormSend= this.fb.group({
      "field_direccion_entrega":[{"value": ""}],


      "field_observaciones":[{"value": ""}]

    })


    this.domicilio = parseInt(localStorage.getItem('tarifaOrigenRestaurante'),10)

  }



  async ngOnInit() {

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

    this.subtotal=0;
    await this.cs.get_cart().then((res:any)=>{
     console.log('que pasa', this.data);
     if(!res) return;
     this.data = res;
     console.log(this.data);
     for(let x in res){
       this.subtotal += res[x].originaPrice*res[x].cantidad;
       this.total = this.subtotal+ this.domicilio;

     }

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

  enviar(){
     this.cs.get_cart().then((res:any)=>{});
  }


  irPageCombo1(){
    this.router.navigate(['/restaurante1']);
  }
  async irPagePagar(){

    console.log(this.AuxMotosDisponibles['length'],'lengt de vector motos');
    if(this.AuxMotosDisponibles.length==0){
      if(this.AuxCarrosDisponibles.length==0){
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
        this.auth.seleccionarServicioCarro();
        setTimeout(async () => {

          console.log(this.data);
          this.observacion= this.auth.resumenObservacion;
          //console.log(this.observacion['observacion'][0].value);
      var itemsCarrito='';
          for(var i =0; i<this.data.length;i++){
            itemsCarrito+=  ' Producto: ' + this.data[i]['titulo']+ '  ;  ' +
            ' Precio: ' + '$'+this.data[i]['field_price_simple'] +'  ;  ' +
            ' Cantidad: ' + this.data[i]['cantidad'] +' ;' + ' Observación: ' + this.data[i]['observaciones']['observacion'] +';';
          };

          console.log(itemsCarrito);
          localStorage.setItem('enviarProductos',itemsCarrito);
          console.log(this.FormSend.value);
          this.auth.sendFormularioDatosCompra(this.FormSend.value);




        },2000)

      }

    }else{
      this.auth.seleccionarServicioMoto();
      setTimeout(async () => {

        console.log(this.data);
        this.observacion= this.auth.resumenObservacion;
        //console.log(this.observacion['observacion'][0].value);
    var itemsCarrito='';
        for(var i =0; i<this.data.length;i++){
          itemsCarrito+=  ' Producto: ' + this.data[i]['titulo']+ '  ;  ' +
          ' Precio: ' +'$'+ this.data[i]['field_price_simple'] +'  ;  ' +
          ' Cantidad: ' + this.data[i]['cantidad'] +' ;' + ' Observación: ' + this.data[i]['observaciones']['observacion'] +';';
        };

        console.log(itemsCarrito);
        localStorage.setItem('enviarProductos',itemsCarrito);
        console.log(this.FormSend.value);
        this.auth.sendFormularioDatosCompra(this.FormSend.value);



      },2000)
    }
    //this.auth.CrearSencilla(this.data['field_price_simple']);


    ///Un div bien organizado






this.tituloRestaurante=localStorage.getItem('tituloRestaurante');
if(this.tituloRestaurante != undefined){
  this.FormSend.controls.field_direccion_entrega.setValue(this.tituloRestaurante);

}else{
  this.FormSend.controls.field_direccion_entrega.setValue('fruver');

}

  // this.FormSend.controls.field_contacto.setValue(this.cantidad);
   //this.FormSend.controls.field_contacto_destino.setValue(this.precio);
   //this.FormSend.controls.field_direccion_destino.setValue(this.id);


    //this.router.navigate(['/datos-envio-carrito']);
    //this.FormSend.controls.field_observaciones.setValue(itemsCarrito);



  }

  limpiarCarrito(){
    this.cs.clearCarrito();
    this.cs.delete_cart();

    while(this.data.length) {
      this.data.pop();
  }
  console.log(this.data, 'aqui data')
  localStorage.setItem('tienda',undefined);
   // this.router.navigate(['/carrito-compras']);

  }

   async deleteProducto(key: any) {
    console.log('dlete',key);
    const alertElement= await this.alertCtrl.create({

      header: '¿Esta seguro que desea eliminar este producto?',
      message: 'Vapaesa',

      buttons: [
        {
        text:'cancel',
        role:'cancel'
      },
      {
        text:'aceptar',
        handler:()=>{
          this.data.forEach((value,index)=>{
            if(value.product_id==key) this.data.splice(index,1);
            this.cs.releaseProduct(key);
            localStorage.setItem('tienda',undefined);

        });
        setTimeout(() => {

          this.ngOnInit();
        }, 2000);


        }
      }
    ]
    });

    await alertElement.present();

}


  ngOnDestroy(){

  }

  irASeguirComprando(){
    this.navCtrl.back();

  }


  regresar(){
    this.router.navigate(['/tabs']);

  }


}
