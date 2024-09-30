import { Component, OnInit, ViewChild } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController, MenuController } from '@ionic/angular';
import { DestinosI } from 'modelos/destinos.interface';
import { environment } from 'src/environments/environment';
import Swiper, { EffectFade, Navigation, Pagination, Virtual } from 'swiper';
import { SwiperComponent } from 'swiper/angular';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-rutas',
  templateUrl: './rutas.page.html',
  styleUrls: ['./rutas.page.scss'],
})
export class RutasPage implements OnInit {
  @ViewChild('swiper', { static: false }) swiper?: SwiperComponent;
  loading: boolean = false;
  public swiperConfig={
    Virtual: true,
    //slidesPerView: 2,
    navigation: true,
    allowTouchMove: false,
    //pagination: { type:'fraction'},

    EffectFade:true

  };
 currentIndex = 0;
  public items: {name: string}[] = [];
  public items2: {name: string}[] = [];
  public items3: {name: string}[] = [];
  public items4: {name: string}[] = [];
  public items5: {name: string}[] = [];
  public items6: {name: string}[] = [];
  public items7: {name: string}[] = [];
  public items8: {name: string}[] = [];
  public items9: {name: string}[] = [];
  public items10: {name: string}[] = [];
  public items11: {name: string}[] = [];

  $respuesta_barrio_existe1:any;
  $respuesta_barrio_existe2:any;
  $respuesta_barrio_existe3:any;
  $respuesta_barrio_existe4:any;
   $respuesta_barrio_existe5:any;
   $respuesta_barrio_existe6:any;
   $respuesta_barrio_existe7:any;
   $respuesta_barrio_existe8:any;
   $respuesta_barrio_existe9:any;
   $respuesta_barrio_existe10:any;

  public cantidadDestinos:number ;
  public num : 1;
  public aux:string;
  public sencilla:any;
  validadorDeRuta:any;
  destinos= new DestinosI();
  private destinosVarios: Array<DestinosI> = [];
  destinos_orden:Array<DestinosI>=[ ];

  permitirPagoEfectivo;
  AuxCarrosDisponibles:any=[];
  AuxMotosDisponibles:any=[];
  AuxDisponiblesMunicipios:any=[];
  ciudades:any[];
  FormSend: FormGroup;
  public barrios: {name: string}[] = [];
  direccion :any[];
  locaciones :any[];
  slider:any=[];
  urlBase:any;
  limiteDisponibles: number;
  disabledValue: boolean;
  ocultarInput: boolean =false;
  direccionDestino: any;
  locacion: any;
  direccionDestino2: any;
  ocultarInput2: boolean;
  direccionDestino3: any;
  ocultarInput3: boolean;
  direccionDestino4: any;
  ocultarInput4: boolean;
  direccionDestino5: any;
  ocultarInput5: boolean;
  direccionDestino6: any;
  ocultarInput6: boolean;
  direccionDestino7: any;
  ocultarInput7: boolean;
  direccionDestino8: any;
  ocultarInput8: boolean;
  direccionDestino9: any;
  ocultarInput9: boolean;
  direccionDestino10: any;
  ocultarInput10: boolean;
  ocultarInputOrigen: boolean;
  disabledValueOrigen: boolean;

  bloquearInputBarrio: boolean=true;
  bloquearInputBarrioDestino: boolean=true;
  bloquearInputBarrioDestino2: boolean=true;
  bloquearInputBarrioDestino3: boolean=true;
  bloquearInputBarrioDestino4: boolean=true;
  bloquearInputBarrioDestino5: boolean=true;
  bloquearInputBarrioDestino6: boolean=true;
  bloquearInputBarrioDestino7: boolean=true;
  bloquearInputBarrioDestino8: boolean=true;
  bloquearInputBarrioDestino9: boolean=true;
  bloquearInputBarrioDestino10: boolean=true;

  constructor(private menucontrol: MenuController, private router: Router, private auth: AuthService, public fb: FormBuilder, public alertController: AlertController) {
    localStorage.setItem('servicioEvaluado','rutas '+localStorage.getItem('modalidad'));
    this.menucontrol.enable(false);
    this.urlBase=environment.urlBase;

    this.FormSend= this.fb.group({
      field_barrio_origen:[""],
      field_barrio_destino:[""],
      field_barrio_destino2:[""],

      field_metodo_de_pago:[""],
      field_prefijo_destino2:[""],
      field_direccion_destino:[""],
      field_prefijo_origen:[""],
      field_prefijo_destino:[""],
      field_locacion_destino_r:[""],
      field_locacion_entrega:[""],
      field_contacto_destino:[""],
      field_direccion_destino_r2:[""],
      field_locacion_destino_r2:[""],
      field_contacto_destino_r2:[""],
      field_nombre_c_origen:[''],
field_nombre_c_destino:[''],
field_nombre_c_destino2:[''],
      body2:[""],
      field_contacto:[""],
      field_direccion_entrega:[""],
      body:[""],
      destinoF:[ ],
      body3:[""],
      destino3:[""],
      locacion3:[""],
      contacto3:[""],
      field_prefijo_destino3:[""],
      field_barrio_destino3:[""],
      field_nombre_c_destino3:[''],

      body4:[""],
      destino4:[""],
      locacion4:[""],
      contacto4:[""],
      field_prefijo_destino4:[""],
      field_barrio_destino4:[""],
      field_nombre_c_destino4:[''],

      body5:[""],
      destino5:[""],
      locacion5:[""],
      contacto5:[""],
      field_prefijo_destino5:[""],
      field_barrio_destino5:[""],
      field_nombre_c_destino5:[''],

      body6:[""],
      destino6:[""],
      locacion6:[""],
      contacto6:[""],
      field_prefijo_destino6:[""],
      field_barrio_destino6:[""],
      field_nombre_c_destino6:[''],


      body7:[""],
      destino7:[""],
      locacion7:[""],
      contacto7:[""],
      field_prefijo_destino7:[""],
      field_barrio_destino7:[""],
      field_nombre_c_destino7:[''],

      body8:[""],
      destino8:[""],
      locacion8:[""],
      contacto8:[""],
      field_prefijo_destino8:[""],
      field_barrio_destino8:[""],
      field_nombre_c_destino8:[''],

      body9:[""],
      destino9:[""],
      locacion9:[""],
      contacto9:[""],
      field_prefijo_destino9:[""],
      field_barrio_destino9:[""],
      field_nombre_c_destino9:[''],

      body10:[""],
      destino10:[""],
      locacion10:[""],
      contacto10:[""],
      field_prefijo_destino10:[""],
      field_barrio_destino10:[""],
      field_nombre_c_destino10:[''],




           });

   }
   ngOnInit() {


    if(localStorage.getItem('modalidad')=='Moderada'){
      this.cantidadDestinos=8;
    }else{
      this.cantidadDestinos=2;

      console.log( Number(localStorage.getItem('cantidadDeDisponibles')));
      if( Number(localStorage.getItem('cantidadDeDisponibles')) >10){
        this.limiteDisponibles=10;

        //this.destinos.push(this.fb.control(''));



      }else{

          this.limiteDisponibles=Number(localStorage.getItem('cantidadDeDisponibles'))-1;

      }
    }


    this.permitirPagoEfectivo=localStorage.getItem('permitirPagoefectivo');
    this.auth.getCiudad().subscribe(res =>{
      console.log(res, ' ciudad');
      this.ciudades=res;

    });

    this.auth.getAuxiliaresDisponiblesCarros().subscribe(res =>{
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
    this.auth.seleccionarSliderRutas().subscribe(res =>{
      console.log(res, ' aqui slider');
     this.slider=res[0]['field_imagen_rutas'];

      console.log(this.slider);




    });

    this.auth.getListLocaciones().subscribe(data=>{
      console.log(data);
      this.locaciones=data;
          },error=>{

            console.log(error);

          });




    Swiper.use([Pagination,Navigation,EffectFade,Virtual]);



  }

  iraIndex(){
    this.router.navigate(['/tabs']);
  }
  async slideNext(){





    console.log(this.FormSend.value['field_barrio_origen']);
   // console.log(this.FormSend.value['field_barrio_destino']);
   // console.log(this.direccion)
   var barrioExiste= new Boolean();
    for (var i = 0; i <this.direccion.length; i++) {


      if(this.FormSend.value['field_barrio_origen']==this.direccion[i].name){
        barrioExiste=true;
        let n = i;
        this.swiper.swiperRef.slideNext(1000);

   // this.auth.sendFormulario(this.FormSend.value);
   // this.router.navigate(['/resumen']);
return

      }else{
       barrioExiste=false;

      }





    }
console.log(barrioExiste);

if(barrioExiste==false){
const alert = await this.alertController.create({

  header: 'Error de barrios',

  message: 'Barrio(s) no identificado, Debes seleccionar tu barrio de la lista',
  // al hacer check, vamos a establecer una variable y al darle aceptar preguntamos si esa varibale esta definida si esta se continua
  buttons: [
  {
    text:'aceptar',

  }]
});

await alert.present();

}

  }


  async BarrioExiste(barrio){ // inicio
   let $result=true;
    // console.log(this.direccion)

     for (var i = 0; i <this.direccionDestino.length; i++) { //inicia for

       if(barrio==this.direccionDestino[i].name){ //inicia if
         $result= true;
         let n = i;
        // this.swiper.swiperRef.slideNext(1000);

    // this.auth.sendFormulario(this.FormSend.value);
    // this.router.navigate(['/resumen']);
break;

       }else{  $result= false;}






     }  //cierre form


     return $result;
  } //cierre metodo

  async BarrioExiste2(barrio){ // inicio
    let $result2=true;
     // console.log(this.direccion)

      for (var i = 0; i <this.direccionDestino2.length; i++) { //inicia for

        if(barrio==this.direccionDestino2[i].name){ //inicia if
          $result2= true;
          let n = i;
         // this.swiper.swiperRef.slideNext(1000);

     // this.auth.sendFormulario(this.FormSend.value);
     // this.router.navigate(['/resumen']);
 break;

        }else{  $result2= false;}






      }  //cierre form


      return $result2;
   } //cierre metodo

   async BarrioExiste3(barrio){ // inicio
    let $result3=true;
     // console.log(this.direccion)

      for (var i = 0; i <this.direccionDestino3.length; i++) { //inicia for

        if(barrio==this.direccionDestino3[i].name){ //inicia if
          $result3= true;
          let n = i;
         // this.swiper.swiperRef.slideNext(1000);

     // this.auth.sendFormulario(this.FormSend.value);
     // this.router.navigate(['/resumen']);
 break;

        }else{  $result3= false;}






      }  //cierre form


      return $result3;
   } //cierre metodo


   async BarrioExiste4(barrio){ // inicio
    let $result4=true;
     // console.log(this.direccion)

      for (var i = 0; i <this.direccionDestino4.length; i++) { //inicia for

        if(barrio==this.direccionDestino4[i].name){ //inicia if
          $result4= true;
          let n = i;
         // this.swiper.swiperRef.slideNext(1000);

     // this.auth.sendFormulario(this.FormSend.value);
     // this.router.navigate(['/resumen']);
 break;

        }else{  $result4= false;}






      }  //cierre form


      return $result4;
   } //cierre metodo

   async BarrioExiste5(barrio){ // inicio
    let $result5=true;
     // console.log(this.direccion)

      for (var i = 0; i <this.direccionDestino5.length; i++) { //inicia for

        if(barrio==this.direccionDestino5[i].name){ //inicia if
          $result5= true;
          let n = i;
         // this.swiper.swiperRef.slideNext(1000);

     // this.auth.sendFormulario(this.FormSend.value);
     // this.router.navigate(['/resumen']);
 break;

        }else{  $result5= false;}






      }  //cierre form


      return $result5;
   } //cierre metodo

   async BarrioExiste6(barrio){ // inicio
    let $result6=true;
     // console.log(this.direccion)

      for (var i = 0; i <this.direccionDestino6.length; i++) { //inicia for

        if(barrio==this.direccionDestino6[i].name){ //inicia if
          $result6= true;
          let n = i;
         // this.swiper.swiperRef.slideNext(1000);

     // this.auth.sendFormulario(this.FormSend.value);
     // this.router.navigate(['/resumen']);
 break;

        }else{  $result6= false;}






      }  //cierre form


      return $result6;
   } //cierre metodo



   async BarrioExiste7(barrio){ // inicio
    let $result7=true;
     // console.log(this.direccion)

      for (var i = 0; i <this.direccionDestino7.length; i++) { //inicia for

        if(barrio==this.direccionDestino7[i].name){ //inicia if
          $result7= true;
          let n = i;
         // this.swiper.swiperRef.slideNext(1000);

     // this.auth.sendFormulario(this.FormSend.value);
     // this.router.navigate(['/resumen']);
 break;

        }else{  $result7= false;}






      }  //cierre form


      return $result7;
   } //cierre metodo

   async BarrioExiste8(barrio){ // inicio
    let $result8=true;
     // console.log(this.direccion)

      for (var i = 0; i <this.direccionDestino8.length; i++) { //inicia for

        if(barrio==this.direccionDestino8[i].name){ //inicia if
          $result8= true;
          let n = i;
         // this.swiper.swiperRef.slideNext(1000);

     // this.auth.sendFormulario(this.FormSend.value);
     // this.router.navigate(['/resumen']);
 break;

        }else{  $result8= false;}






      }  //cierre form


      return $result8;
   } //cierre metodo

   async BarrioExiste9(barrio){ // inicio
    let $result9=true;
     // console.log(this.direccion)

      for (var i = 0; i <this.direccionDestino9.length; i++) { //inicia for

        if(barrio==this.direccionDestino9[i].name){ //inicia if
          $result9= true;
          let n = i;
         // this.swiper.swiperRef.slideNext(1000);

     // this.auth.sendFormulario(this.FormSend.value);
     // this.router.navigate(['/resumen']);
 break;

        }else{  $result9= false;}






      }  //cierre form


      return $result9;
   } //cierre metodo




   async BarrioExiste10(barrio){ // inicio
    let $result10=true;
     // console.log(this.direccion)

      for (var i = 0; i <this.direccionDestino10.length; i++) { //inicia for

        if(barrio==this.direccionDestino10[i].name){ //inicia if
          $result10= true;
          let n = i;
         // this.swiper.swiperRef.slideNext(1000);

     // this.auth.sendFormulario(this.FormSend.value);
     // this.router.navigate(['/resumen']);
 break;

        }else{  $result10= false;}






      }  //cierre form


      return $result10;
   } //cierre metodo


  async slideNext2(){


    switch (this.cantidadDestinos) {
      case 2:
        this.$respuesta_barrio_existe1 = this.BarrioExiste(this.FormSend.value['field_barrio_destino']);
         this.$respuesta_barrio_existe2 = this.BarrioExiste2(this.FormSend.value['field_barrio_destino2']);

        console.log( this.$respuesta_barrio_existe1);
        console.log( this.$respuesta_barrio_existe2);

        if( this.$respuesta_barrio_existe1['__zone_symbol__value'] == true &&  this.$respuesta_barrio_existe2['__zone_symbol__value'] == true ){
          console.log('Barrios ok');

          this.swiper.swiperRef.slideNext(1000);
          const anchorElement = document.getElementById("myAnchor");
  if (anchorElement) {
    // Desplazar la ventana de visualización hasta el elemento "myAnchor" con una animación suave
    anchorElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

        }else{
const alert = await this.alertController.create({

            header: ' Error Barrio(s) ',

            message: 'Barrio(s) no identificado, Debes seleccionar tu barrio de la lista',
            // al hacer check, vamos a establecer una variable y al darle aceptar preguntamos si esa varibale esta definida si esta se continua
            buttons: [
            {
              text:'aceptar',

            }]
          });

          await alert.present();
}





        break;
      case 3:

     this.$respuesta_barrio_existe1 = this.BarrioExiste(this.FormSend.value['field_barrio_destino']);
     this.$respuesta_barrio_existe2 = this.BarrioExiste2(this.FormSend.value['field_barrio_destino2']);
     this.$respuesta_barrio_existe3 = this.BarrioExiste3(this.FormSend.value['field_barrio_destino3']);



     if( this.$respuesta_barrio_existe1['__zone_symbol__value'] == true &&  this.$respuesta_barrio_existe2['__zone_symbol__value'] == true  &&  this.$respuesta_barrio_existe3['__zone_symbol__value'] == true ){
       console.log('Barrios ok');
       this.swiper.swiperRef.slideNext(1000);
       const anchorElement = document.getElementById("myAnchor");
  if (anchorElement) {
    // Desplazar la ventana de visualización hasta el elemento "myAnchor" con una animación suave
    anchorElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
     }else{
const alert = await this.alertController.create({

         header: ' Error Barrio(s) ',

         message: 'Barrio(s) no identificado, Debes seleccionar tu barrio de la lista',
         // al hacer check, vamos a establecer una variable y al darle aceptar preguntamos si esa varibale esta definida si esta se continua
         buttons: [
         {
           text:'aceptar',

         }]
       });

       await alert.present();

     }


        //Declaraciones ejecutadas cuando el resultado de expresión coincide con el valor1
        break;
      case 4:
        this.$respuesta_barrio_existe1 = this.BarrioExiste(this.FormSend.value['field_barrio_destino']);
        this.$respuesta_barrio_existe2 = this.BarrioExiste2(this.FormSend.value['field_barrio_destino2']);
        this.$respuesta_barrio_existe3 = this.BarrioExiste3(this.FormSend.value['field_barrio_destino3']);
        this.$respuesta_barrio_existe4 = this.BarrioExiste4(this.FormSend.value['field_barrio_destino4']);



        if( this.$respuesta_barrio_existe1['__zone_symbol__value'] == true &&  this.$respuesta_barrio_existe2['__zone_symbol__value'] == true  &&  this.$respuesta_barrio_existe3['__zone_symbol__value'] == true &&  this.$respuesta_barrio_existe4['__zone_symbol__value'] == true ){
          console.log('Barrios ok');
          this.swiper.swiperRef.slideNext(1000);
          const anchorElement = document.getElementById("myAnchor");
  if (anchorElement) {
    // Desplazar la ventana de visualización hasta el elemento "myAnchor" con una animación suave
    anchorElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
        }else{
const alert = await this.alertController.create({

            header: ' Error Barrio(s) ',

            message: 'Barrio(s) no identificado, Debes seleccionar tu barrio de la lista',
            // al hacer check, vamos a establecer una variable y al darle aceptar preguntamos si esa varibale esta definida si esta se continua
            buttons: [
            {
              text:'aceptar',

            }]
          });

          await alert.present();

        }
        //Declaraciones ejecutadas cuando el resultado de expresión coincide con el valor2
        break;
      case 5:

        this.$respuesta_barrio_existe1 = this.BarrioExiste(this.FormSend.value['field_barrio_destino']);
        this.$respuesta_barrio_existe2 = this.BarrioExiste2(this.FormSend.value['field_barrio_destino2']);
        this.$respuesta_barrio_existe3 = this.BarrioExiste3(this.FormSend.value['field_barrio_destino3']);
        this.$respuesta_barrio_existe4 = this.BarrioExiste4(this.FormSend.value['field_barrio_destino4']);
        this.$respuesta_barrio_existe5 = this.BarrioExiste5(this.FormSend.value['field_barrio_destino5']);




        if( this.$respuesta_barrio_existe1['__zone_symbol__value'] == true &&  this.$respuesta_barrio_existe2['__zone_symbol__value'] == true  &&  this.$respuesta_barrio_existe3['__zone_symbol__value'] == true &&  this.$respuesta_barrio_existe4['__zone_symbol__value'] == true &&  this.$respuesta_barrio_existe5['__zone_symbol__value'] == true){
          console.log('Barrios ok');
          this.swiper.swiperRef.slideNext(1000);
          const anchorElement = document.getElementById("myAnchor");
  if (anchorElement) {
    // Desplazar la ventana de visualización hasta el elemento "myAnchor" con una animación suave
    anchorElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
        }else{
const alert = await this.alertController.create({

            header: ' Error Barrio(s) ',

            message: 'Barrio(s) no identificado, Debes seleccionar tu barrio de la lista',
            // al hacer check, vamos a establecer una variable y al darle aceptar preguntamos si esa varibale esta definida si esta se continua
            buttons: [
            {
              text:'aceptar',

            }]
          });

          await alert.present();

        }


          //Declaraciones ejecutadas cuando el resultado de expresión coincide con el valor2
        break;
      case 6:
        this.$respuesta_barrio_existe1 = this.BarrioExiste(this.FormSend.value['field_barrio_destino']);
        this.$respuesta_barrio_existe2 = this.BarrioExiste2(this.FormSend.value['field_barrio_destino2']);
        this.$respuesta_barrio_existe3 = this.BarrioExiste3(this.FormSend.value['field_barrio_destino3']);
        this.$respuesta_barrio_existe4 = this.BarrioExiste4(this.FormSend.value['field_barrio_destino4']);
        this.$respuesta_barrio_existe5 = this.BarrioExiste5(this.FormSend.value['field_barrio_destino5']);
        this.$respuesta_barrio_existe6 = this.BarrioExiste6(this.FormSend.value['field_barrio_destino6']);



        if( this.$respuesta_barrio_existe1['__zone_symbol__value'] == true &&  this.$respuesta_barrio_existe2['__zone_symbol__value'] == true  &&  this.$respuesta_barrio_existe3['__zone_symbol__value'] == true &&  this.$respuesta_barrio_existe4['__zone_symbol__value'] == true &&  this.$respuesta_barrio_existe5['__zone_symbol__value'] == true  &&  this.$respuesta_barrio_existe6['__zone_symbol__value'] == true){
          console.log('Barrios ok');
          this.swiper.swiperRef.slideNext(1000);
          const anchorElement = document.getElementById("myAnchor");
  if (anchorElement) {
    // Desplazar la ventana de visualización hasta el elemento "myAnchor" con una animación suave
    anchorElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
        }else{
const alert = await this.alertController.create({

            header: ' Error Barrio(s) ',

            message: 'Barrio(s) no identificado, Debes seleccionar tu barrio de la lista',
            // al hacer check, vamos a establecer una variable y al darle aceptar preguntamos si esa varibale esta definida si esta se continua
            buttons: [
            {
              text:'aceptar',

            }]
          });

          await alert.present();

        }

          //Declaraciones ejecutadas cuando el resultado de expresión coincide con el valor2
        break;
      case 7:
        this.$respuesta_barrio_existe1 = this.BarrioExiste(this.FormSend.value['field_barrio_destino']);
        this.$respuesta_barrio_existe2 = this.BarrioExiste2(this.FormSend.value['field_barrio_destino2']);
        this.$respuesta_barrio_existe3 = this.BarrioExiste3(this.FormSend.value['field_barrio_destino3']);
        this.$respuesta_barrio_existe4 = this.BarrioExiste4(this.FormSend.value['field_barrio_destino4']);
        this.$respuesta_barrio_existe5 = this.BarrioExiste5(this.FormSend.value['field_barrio_destino5']);
        this.$respuesta_barrio_existe6 = this.BarrioExiste6(this.FormSend.value['field_barrio_destino6']);
        this.$respuesta_barrio_existe7 = this.BarrioExiste7(this.FormSend.value['field_barrio_destino7']);



        if( this.$respuesta_barrio_existe1['__zone_symbol__value'] == true &&  this.$respuesta_barrio_existe2['__zone_symbol__value'] == true  &&  this.$respuesta_barrio_existe3['__zone_symbol__value'] == true &&  this.$respuesta_barrio_existe4['__zone_symbol__value'] == true &&  this.$respuesta_barrio_existe5['__zone_symbol__value'] == true  &&  this.$respuesta_barrio_existe6['__zone_symbol__value'] == true  &&  this.$respuesta_barrio_existe7['__zone_symbol__value'] == true){
          console.log('Barrios ok');
          this.swiper.swiperRef.slideNext(1000);
          const anchorElement = document.getElementById("myAnchor");
  if (anchorElement) {
    // Desplazar la ventana de visualización hasta el elemento "myAnchor" con una animación suave
    anchorElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
        }else{
const alert = await this.alertController.create({

            header: ' Error Barrio(s) ',

            message: 'Barrio(s) no identificado, Debes seleccionar tu barrio de la lista',
            // al hacer check, vamos a establecer una variable y al darle aceptar preguntamos si esa varibale esta definida si esta se continua
            buttons: [
            {
              text:'aceptar',

            }]
          });

          await alert.present();

        }
            //Declaraciones ejecutadas cuando el resultado de expresión coincide con el valor2
        break;


      case 8:
        this.$respuesta_barrio_existe1 = this.BarrioExiste(this.FormSend.value['field_barrio_destino']);
        this.$respuesta_barrio_existe2 = this.BarrioExiste2(this.FormSend.value['field_barrio_destino2']);
        this.$respuesta_barrio_existe3 = this.BarrioExiste3(this.FormSend.value['field_barrio_destino3']);
        this.$respuesta_barrio_existe4 = this.BarrioExiste4(this.FormSend.value['field_barrio_destino4']);
        this.$respuesta_barrio_existe5 = this.BarrioExiste5(this.FormSend.value['field_barrio_destino5']);
        this.$respuesta_barrio_existe6 = this.BarrioExiste6(this.FormSend.value['field_barrio_destino6']);
        this.$respuesta_barrio_existe7 = this.BarrioExiste7(this.FormSend.value['field_barrio_destino7']);
        this.$respuesta_barrio_existe8 = this.BarrioExiste8(this.FormSend.value['field_barrio_destino8']);



        if( this.$respuesta_barrio_existe1['__zone_symbol__value'] == true &&  this.$respuesta_barrio_existe2['__zone_symbol__value'] == true  &&  this.$respuesta_barrio_existe3['__zone_symbol__value'] == true &&  this.$respuesta_barrio_existe4['__zone_symbol__value'] == true &&  this.$respuesta_barrio_existe5['__zone_symbol__value'] == true  &&  this.$respuesta_barrio_existe6['__zone_symbol__value'] == true  &&  this.$respuesta_barrio_existe7['__zone_symbol__value'] == true &&  this.$respuesta_barrio_existe8['__zone_symbol__value'] == true){
          console.log('Barrios ok');
          this.swiper.swiperRef.slideNext(1000);
          const anchorElement = document.getElementById("myAnchor");
  if (anchorElement) {
    // Desplazar la ventana de visualización hasta el elemento "myAnchor" con una animación suave
    anchorElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
        }else{
const alert = await this.alertController.create({

            header: ' Error Barrio(s) ',

            message: 'Barrio(s) no identificado, Debes seleccionar tu barrio de la lista',
            // al hacer check, vamos a establecer una variable y al darle aceptar preguntamos si esa varibale esta definida si esta se continua
            buttons: [
            {
              text:'aceptar',

            }]
          });

          await alert.present();

        }
            //Declaraciones ejecutadas cuando el resultado de expresión coincide con el valor2
        break;

      case 9:
        this.$respuesta_barrio_existe1 = this.BarrioExiste(this.FormSend.value['field_barrio_destino']);
        this.$respuesta_barrio_existe2 = this.BarrioExiste2(this.FormSend.value['field_barrio_destino2']);
        this.$respuesta_barrio_existe3 = this.BarrioExiste3(this.FormSend.value['field_barrio_destino3']);
        this.$respuesta_barrio_existe4 = this.BarrioExiste4(this.FormSend.value['field_barrio_destino4']);
        this.$respuesta_barrio_existe5 = this.BarrioExiste5(this.FormSend.value['field_barrio_destino5']);
        this.$respuesta_barrio_existe6 = this.BarrioExiste6(this.FormSend.value['field_barrio_destino6']);
        this.$respuesta_barrio_existe7 = this.BarrioExiste7(this.FormSend.value['field_barrio_destino7']);
        this.$respuesta_barrio_existe8 = this.BarrioExiste8(this.FormSend.value['field_barrio_destino8']);
        this.$respuesta_barrio_existe9 = this.BarrioExiste9(this.FormSend.value['field_barrio_destino9']);



        if( this.$respuesta_barrio_existe1['__zone_symbol__value'] == true &&  this.$respuesta_barrio_existe2['__zone_symbol__value'] == true  &&  this.$respuesta_barrio_existe3['__zone_symbol__value'] == true &&  this.$respuesta_barrio_existe4['__zone_symbol__value'] == true &&  this.$respuesta_barrio_existe5['__zone_symbol__value'] == true  &&  this.$respuesta_barrio_existe6['__zone_symbol__value'] == true  &&  this.$respuesta_barrio_existe7['__zone_symbol__value'] == true &&  this.$respuesta_barrio_existe8['__zone_symbol__value'] == true &&  this.$respuesta_barrio_existe9['__zone_symbol__value'] == true){
          console.log('Barrios ok');
          this.swiper.swiperRef.slideNext(1000);
          const anchorElement = document.getElementById("myAnchor");
  if (anchorElement) {
    // Desplazar la ventana de visualización hasta el elemento "myAnchor" con una animación suave
    anchorElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
        }else{
const alert = await this.alertController.create({

            header: ' Error Barrio(s) ',

            message: 'Barrio(s) no identificado, Debes seleccionar tu barrio de la lista',
            // al hacer check, vamos a establecer una variable y al darle aceptar preguntamos si esa varibale esta definida si esta se continua
            buttons: [
            {
              text:'aceptar',

            }]
          });

          await alert.present();

        }

            //Declaraciones ejecutadas cuando el resultado de expresión coincide con el valor2
        break;

      case 10:
        this.$respuesta_barrio_existe1 = this.BarrioExiste(this.FormSend.value['field_barrio_destino']);
        this.$respuesta_barrio_existe2 = this.BarrioExiste2(this.FormSend.value['field_barrio_destino2']);
        this.$respuesta_barrio_existe3 = this.BarrioExiste3(this.FormSend.value['field_barrio_destino3']);
        this.$respuesta_barrio_existe4 = this.BarrioExiste4(this.FormSend.value['field_barrio_destino4']);
        this.$respuesta_barrio_existe5 = this.BarrioExiste5(this.FormSend.value['field_barrio_destino5']);
        this.$respuesta_barrio_existe6 = this.BarrioExiste6(this.FormSend.value['field_barrio_destino6']);
        this.$respuesta_barrio_existe7 = this.BarrioExiste7(this.FormSend.value['field_barrio_destino7']);
        this.$respuesta_barrio_existe8 = this.BarrioExiste8(this.FormSend.value['field_barrio_destino8']);
        this.$respuesta_barrio_existe9 = this.BarrioExiste9(this.FormSend.value['field_barrio_destino9']);
      this.$respuesta_barrio_existe10 = this.BarrioExiste10(this.FormSend.value['field_barrio_destino10']);



        if( this.$respuesta_barrio_existe1['__zone_symbol__value'] == true &&  this.$respuesta_barrio_existe2['__zone_symbol__value'] == true  &&  this.$respuesta_barrio_existe3['__zone_symbol__value'] == true &&  this.$respuesta_barrio_existe4['__zone_symbol__value'] == true &&  this.$respuesta_barrio_existe5['__zone_symbol__value'] == true  &&  this.$respuesta_barrio_existe6['__zone_symbol__value'] == true  &&  this.$respuesta_barrio_existe7['__zone_symbol__value'] == true &&  this.$respuesta_barrio_existe8['__zone_symbol__value'] == true &&  this.$respuesta_barrio_existe9['__zone_symbol__value'] == true &&  this.$respuesta_barrio_existe10['__zone_symbol__value'] == true){
          console.log('Barrios ok');
          this.swiper.swiperRef.slideNext(1000);
          const anchorElement = document.getElementById("myAnchor");
  if (anchorElement) {
    // Desplazar la ventana de visualización hasta el elemento "myAnchor" con una animación suave
    anchorElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
        }else{
const alert = await this.alertController.create({

            header: ' Error Barrio(s) ',

            message: 'Barrio(s) no identificado, Debes seleccionar tu barrio de la lista',
            // al hacer check, vamos a establecer una variable y al darle aceptar preguntamos si esa varibale esta definida si esta se continua
            buttons: [
            {
              text:'aceptar',

            }]
          });

          await alert.present();

        }
            //Declaraciones ejecutadas cuando el resultado de expresión coincide con el valor2
        break;

      default:
        //Declaraciones ejecutadas cuando ninguno de los valores coincide con el valor de la expresión
        break;
    }


    this.cambiarTamañoSlider();

  }



  slidePrev(){

    this.swiper.swiperRef.slidePrev(1000);
    document.getElementById('myAnchor2').scrollIntoView();
    this.restaurarTamañoOriginal()
  }

  async inputChanged($event): Promise<void> {
    // récupération de la valeur saisie
    const value = $event.target.value as string;
    // vider la list si le champ de saisie est vide
    if (value.length <= 0) {
      this.items = [];
      return; // stoper l'exection du script
    }

    // récupération de la liste de posibilités
    const list = this.direccion;
    // filtrer la list pour extraire uniquement les element pertinants
    const items = list.filter(
      item => item.name.toLocaleLowerCase().includes(value.toLocaleLowerCase())
    );
    // assigner la liste d'items à `this.items`
    // cela va aussi afficher la liste de propositions dans le HTML
    this.items = items;
  }
  async inputChanged2($event): Promise<void> {
    // récupération de la valeur saisie
    const value = $event.target.value as string;
    // vider la list si le champ de saisie est vide
    if (value.length <= 0) {
      this.items2 = [];
      return; // stoper l'exection du script
    }
    // récupération de la liste de posibilités

    const list = this.direccionDestino;
    console.log(list,'list')
    //console.log(this.auth._fakeDatas,'list fake')
    // filtrer la list pour extraire uniquement les element pertinants
    const items = list.filter(
      item => item.name.toLocaleLowerCase().includes(value.toLocaleLowerCase())
    );
    // assigner la liste d'items à `this.items`
    // cela va aussi afficher la liste de propositions dans le HTML
    this.items2 = items;
  }


  async inputChanged3($event): Promise<void> {
    // récupération de la valeur saisie
    const value = $event.target.value as string;
    // vider la list si le champ de saisie est vide
    if (value.length <= 0) {
      this.items3 = [];
      return; // stoper l'exection du script
    }
    // récupération de la liste de posibilités
    console.log(this.direccion,'antes de')
    const list = this.direccionDestino2;
    console.log(list,'list')
    //console.log(this.auth._fakeDatas,'list fake')
    // filtrer la list pour extraire uniquement les element pertinants
    const items = list.filter(
      item => item.name.toLocaleLowerCase().includes(value.toLocaleLowerCase())
    );
    // assigner la liste d'items à `this.items`
    // cela va aussi afficher la liste de propositions dans le HTML
    this.items3 = items;
  }

  async inputChanged4($event): Promise<void> {
    // récupération de la valeur saisie
    const value = $event.target.value as string;
    // vider la list si le champ de saisie est vide
    if (value.length <= 0) {
      this.items4 = [];
      return; // stoper l'exection du script
    }
    // récupération de la liste de posibilités
    console.log(this.direccion,'antes de')
    const list = this.direccionDestino3;
    console.log(list,'list')
    //console.log(this.auth._fakeDatas,'list fake')
    // filtrer la list pour extraire uniquement les element pertinants
    const items = list.filter(
      item => item.name.toLocaleLowerCase().includes(value.toLocaleLowerCase())
    );
    // assigner la liste d'items à `this.items`
    // cela va aussi afficher la liste de propositions dans le HTML
    this.items4 = items;
  }


  async inputChanged5($event): Promise<void> {
    // récupération de la valeur saisie
    const value = $event.target.value as string;
    // vider la list si le champ de saisie est vide
    if (value.length <= 0) {
      this.items5 = [];
      return; // stoper l'exection du script
    }
    // récupération de la liste de posibilités
    console.log(this.direccion,'antes de')
    const list = this.direccionDestino4;
    console.log(list,'list')
    //console.log(this.auth._fakeDatas,'list fake')
    // filtrer la list pour extraire uniquement les element pertinants
    const items = list.filter(
      item => item.name.toLocaleLowerCase().includes(value.toLocaleLowerCase())
    );
    // assigner la liste d'items à `this.items`
    // cela va aussi afficher la liste de propositions dans le HTML
    this.items5 = items;
  }

  async inputChanged6($event): Promise<void> {
    // récupération de la valeur saisie
    const value = $event.target.value as string;
    // vider la list si le champ de saisie est vide
    if (value.length <= 0) {
      this.items6 = [];
      return; // stoper l'exection du script
    }
    // récupération de la liste de posibilités

    const list = this.direccionDestino5;
    console.log(list,'list')
    //console.log(this.auth._fakeDatas,'list fake')
    // filtrer la list pour extraire uniquement les element pertinants
    const items = list.filter(
      item => item.name.toLocaleLowerCase().includes(value.toLocaleLowerCase())
    );
    // assigner la liste d'items à `this.items`
    // cela va aussi afficher la liste de propositions dans le HTML
    this.items6 = items;
  }


  async inputChanged7($event): Promise<void> {
    // récupération de la valeur saisie
    const value = $event.target.value as string;
    // vider la list si le champ de saisie est vide
    if (value.length <= 0) {
      this.items7 = [];
      return; // stoper l'exection du script
    }
    // récupération de la liste de posibilités

    const list = this.direccionDestino6;
    console.log(list,'list')
    //console.log(this.auth._fakeDatas,'list fake')
    // filtrer la list pour extraire uniquement les element pertinants
    const items = list.filter(
      item => item.name.toLocaleLowerCase().includes(value.toLocaleLowerCase())
    );
    // assigner la liste d'items à `this.items`
    // cela va aussi afficher la liste de propositions dans le HTML
    this.items7 = items;
  }

  async inputChanged8($event): Promise<void> {
    // récupération de la valeur saisie
    const value = $event.target.value as string;
    // vider la list si le champ de saisie est vide
    if (value.length <= 0) {
      this.items8 = [];
      return; // stoper l'exection du script
    }
    // récupération de la liste de posibilités

    const list = this.direccionDestino7;
    console.log(list,'list');
    //console.log(this.auth._fakeDatas,'list fake')
    // filtrer la list pour extraire uniquement les element pertinants
    const items = list.filter(
      item => item.name.toLocaleLowerCase().includes(value.toLocaleLowerCase())
    );
    // assigner la liste d'items à `this.items`
    // cela va aussi afficher la liste de propositions dans le HTML
    this.items8 = items;
  }

  async inputChanged9($event): Promise<void> {
    // récupération de la valeur saisie
    const value = $event.target.value as string;
    // vider la list si le champ de saisie est vide
    if (value.length <= 0) {
      this.items9 = [];
      return; // stoper l'exection du script
    }
    // récupération de la liste de posibilités
    console.log(this.direccionDestino8,'antes de')
    const list = this.direccionDestino8;
    console.log(list,'list')
    //console.log(this.auth._fakeDatas,'list fake')
    // filtrer la list pour extraire uniquement les element pertinants
    const items = list.filter(
      item => item.name.toLocaleLowerCase().includes(value.toLocaleLowerCase())
    );
    // assigner la liste d'items à `this.items`
    // cela va aussi afficher la liste de propositions dans le HTML
    this.items9 = items;
  }

  async inputChanged10($event): Promise<void> {
    // récupération de la valeur saisie
    const value = $event.target.value as string;
    // vider la list si le champ de saisie est vide
    if (value.length <= 0) {
      this.items10 = [];
      return; // stoper l'exection du script
    }
    // récupération de la liste de posibilités
    console.log(this.direccionDestino9,'antes de')
    const list = this.direccionDestino9;
    console.log(list,'list')
    //console.log(this.auth._fakeDatas,'list fake')
    // filtrer la list pour extraire uniquement les element pertinants
    const items = list.filter(
      item => item.name.toLocaleLowerCase().includes(value.toLocaleLowerCase())
    );
    // assigner la liste d'items à `this.items`
    // cela va aussi afficher la liste de propositions dans le HTML
    this.items10 = items;
  }

  async inputChanged11($event): Promise<void> {
    // récupération de la valeur saisie
    const value = $event.target.value as string;
    // vider la list si le champ de saisie est vide
    if (value.length <= 0) {
      this.items11 = [];
      return; // stoper l'exection du script
    }
    // récupération de la liste de posibilités
    console.log(this.direccionDestino,'antes de')
    const list = this.direccionDestino10;
    console.log(list,'list')
    //console.log(this.auth._fakeDatas,'list fake')
    // filtrer la list pour extraire uniquement les element pertinants
    const items = list.filter(
      item => item.name.toLocaleLowerCase().includes(value.toLocaleLowerCase())
    );
    // assigner la liste d'items à `this.items`
    // cela va aussi afficher la liste de propositions dans le HTML
    this.items11 = items;
  }
  selected(item, input): void {
    console.log('selected---->',item.name);

    localStorage.setItem('tarifaOrigen', item.field_tarifa);

    console.log('selected----> origin', item.field_zona_a);

    localStorage.setItem('zona_origen',item.field_zona_a);

    localStorage.setItem('tarifaExternaOrigen',item.field_tarifa_externa);
    localStorage.setItem('imgBarrioOrigen',item.field_imagen_barrio);
    localStorage.setItem('longitudOrigen',item.field_longitud);
    localStorage.setItem('latitudOrigen',item.field_latitud);
    // vider la valeur du champ de saisie

    // mettre à jour le formuaire
    this.FormSend.patchValue({item});
    // cacher la liste d'items en vidant la liste
    this.items = [];
   // console.log('selected---->',this.FormSend.value['barrioOrigen']);

    input.value = item.name;
    this.FormSend.controls.field_barrio_origen.setValue(item.name);
  }

  selected2(item, input2): void {

    console.log('selected---->',item.name);
    console.log('selected---->', item.field_tarifa);
    console.log('selected----> destination', item.field_zona_a);
    localStorage.setItem('zona_destino',item.field_zona_a);
    localStorage.setItem('tarifaDestino',item.field_tarifa);
    localStorage.setItem('tarifaExternaDestino',item.field_tarifa_externa);
    localStorage.setItem('imgBarrioDestino',item.field_imagen_barrio);
    // vider la valeur du champ de saisie

    // mettre à jour le formuaire
    this.FormSend.patchValue({item});
    // cacher la liste d'items en vidant la liste
    this.items2 = [];
   // console.log('selected---->',this.FormSend.value['barrioOrigen']);

   input2.value = item.name;
   this.FormSend.controls.field_barrio_destino.setValue(item.name);
  }

  selected3(item, input3): void {

    console.log('selected---->',item.name);
    localStorage.setItem('tarifaDestino2',item.field_tarifa);
    localStorage.setItem('tarifaExternaDestino2',item.field_tarifa_externa);
    localStorage.setItem('imgBarrioDestino2',item.field_imagen_barrio);
    // vider la valeur du champ de saisie
    console.log('selected----> destination', item.field_zona_a);
    localStorage.setItem('zona_destino2',item.field_zona_a);

    // mettre à jour le formuaire
    this.FormSend.patchValue({item});
    // cacher la liste d'items en vidant la liste
    this.items3 = [];
   // console.log('selected---->',this.FormSend.value['barrioOrigen']);

   input3.value = item.name;
   this.FormSend.controls.field_barrio_destino2.setValue(item.name);
  }

  selected4(item, input4): void {

    console.log('selected---->',item.name);
    localStorage.setItem('tarifaDestino3',item.field_tarifa);
    localStorage.setItem('tarifaExternaDestino3',item.field_tarifa_externa);
    localStorage.setItem('imgBarrioDestino3',item.field_imagen_barrio);
    // vider la valeur du champ de saisie
    console.log('selected----> destination', item.field_zona_a);
    localStorage.setItem('zona_destino3',item.field_zona_a);

    // mettre à jour le formuaire
    this.FormSend.patchValue({item});
    // cacher la liste d'items en vidant la liste
    this.items4 = [];
   // console.log('selected---->',this.FormSend.value['barrioOrigen']);

   input4.value = item.name;
   this.FormSend.controls.field_barrio_destino3.setValue(item.name);
  }

  selected5(item, input5): void {

    console.log('selected---->',item.name);
    localStorage.setItem('tarifaDestino4',item.field_tarifa);
    localStorage.setItem('tarifaExternaDestino4',item.field_tarifa_externa);
    localStorage.setItem('imgBarrioDestino4',item.field_imagen_barrio);
    // vider la valeur du champ de saisie
    console.log('selected----> destination', item.field_zona_a);
    localStorage.setItem('zona_destino4',item.field_zona_a);

    // mettre à jour le formuaire
    this.FormSend.patchValue({item});
    // cacher la liste d'items en vidant la liste
    this.items5 = [];
   // console.log('selected---->',this.FormSend.value['barrioOrigen']);

   input5.value = item.name;
   this.FormSend.controls.field_barrio_destino4.setValue(item.name);
  }


  selected6(item, input6): void {

    console.log('selected---->',item.name);
    localStorage.setItem('tarifaDestino5',item.field_tarifa);
    localStorage.setItem('tarifaExternaDestino5',item.field_tarifa_externa);
    localStorage.setItem('imgBarrioDestino5',item.field_imagen_barrio);
    // vider la valeur du champ de saisie
    console.log('selected----> destination', item.field_zona_a);
    localStorage.setItem('zona_destino5',item.field_zona_a);

    // mettre à jour le formuaire
    this.FormSend.patchValue({item});
    // cacher la liste d'items en vidant la liste
    this.items6 = [];
   // console.log('selected---->',this.FormSend.value['barrioOrigen']);

   input6.value = item.name;
   this.FormSend.controls.field_barrio_destino5.setValue(item.name);
  }

  selected7(item, input7): void {

    console.log('selected---->',item.name);
    localStorage.setItem('tarifaDestino6',item.field_tarifa);
    localStorage.setItem('tarifaExternaDestino6',item.field_tarifa_externa);
    localStorage.setItem('imgBarrioDestino6',item.field_imagen_barrio);
    // vider la valeur du champ de saisie
    console.log('selected----> destination', item.field_zona_a);
    localStorage.setItem('zona_destino6',item.field_zona_a);

    // mettre à jour le formuaire
    this.FormSend.patchValue({item});
    // cacher la liste d'items en vidant la liste
    this.items7 = [];
   // console.log('selected---->',this.FormSend.value['barrioOrigen']);

   input7.value = item.name;
   this.FormSend.controls.field_barrio_destino6.setValue(item.name);
  }



  selected8(item, input8): void {

    console.log('selected---->',item.name);
    localStorage.setItem('tarifaDestino7',item.field_tarifa);
    localStorage.setItem('tarifaExternaDestino7',item.field_tarifa_externa);
    localStorage.setItem('imgBarrioDestino7',item.field_imagen_barrio);
    // vider la valeur du champ de saisie
    console.log('selected----> destination', item.field_zona_a);
    localStorage.setItem('zona_destino7',item.field_zona_a);

    // mettre à jour le formuaire
    this.FormSend.patchValue({item});
    // cacher la liste d'items en vidant la liste
    this.items8 = [];
   // console.log('selected---->',this.FormSend.value['barrioOrigen']);

   input8.value = item.name;
   this.FormSend.controls.field_barrio_destino7.setValue(item.name);
  }

  selected9(item, input9): void {

    console.log('selected---->',item.name);
    localStorage.setItem('tarifaDestino8',item.field_tarifa);
    localStorage.setItem('tarifaExternaDestino8',item.field_tarifa_externa);
    localStorage.setItem('imgBarrioDestino8',item.field_imagen_barrio);
    // vider la valeur du champ de saisie
    console.log('selected----> destination', item.field_zona_a);
    localStorage.setItem('zona_destino8',item.field_zona_a);

    // mettre à jour le formuaire
    this.FormSend.patchValue({item});
    // cacher la liste d'items en vidant la liste
    this.items9 = [];
   // console.log('selected---->',this.FormSend.value['barrioOrigen']);

   input9.value = item.name;
   this.FormSend.controls.field_barrio_destino8.setValue(item.name);
  }


  selected10(item, input10): void {

    console.log('selected---->',item.name);
    localStorage.setItem('tarifaDestino9',item.field_tarifa);
    localStorage.setItem('tarifaExternaDestino9',item.field_tarifa_externa);
    localStorage.setItem('imgBarrioDestino9',item.field_imagen_barrio);
    // vider la valeur du champ de saisie
    console.log('selected----> destination', item.field_zona_a);
    localStorage.setItem('zona_destino9',item.field_zona_a);

    // mettre à jour le formuaire
    this.FormSend.patchValue({item});
    // cacher la liste d'items en vidant la liste
    this.items10 = [];
   // console.log('selected---->',this.FormSend.value['barrioOrigen']);

   input10.value = item.name;
   this.FormSend.controls.field_barrio_destino9.setValue(item.name);
  }

  selected11(item, input11): void {

    console.log('selected---->',item.name);
    localStorage.setItem('tarifaDestino10',item.field_tarifa);
    localStorage.setItem('tarifaExternaDestino10',item.field_tarifa_externa);
    localStorage.setItem('imgBarrioDestino10',item.field_imagen_barrio);
    // vider la valeur du champ de saisie
    console.log('selected----> destination', item.field_zona_a);
    localStorage.setItem('zona_destino10',item.field_zona_a);

    // mettre à jour le formuaire
    this.FormSend.patchValue({item});
    // cacher la liste d'items en vidant la liste
    this.items11 = [];
   // console.log('selected---->',this.FormSend.value['barrioOrigen']);

   input11.value = item.name;
   this.FormSend.controls.field_barrio_destino10.setValue(item.name);
  }


   async sendFormRuta(){
    console.log('cantidad de destinos en local storage',localStorage.getItem('cantidadDestinosRutas'));

    console.log('cantidad de destinos',this.cantidadDestinos);
    this.validadorDeRuta= localStorage.getItem('ValidadorRuta');
    console.log(this.validadorDeRuta,'validador');
    console.log(this.destinos_orden,'en on init');
        if(this.validadorDeRuta ==1){
          this.validadorDeRuta=0;
          this.destinos_orden.length=0;

        }



console.log(this.FormSend.value);


//validar cuando sea moderada se necesita minimo un aux


if(localStorage.getItem('modalidad')=='Moderada'){

  if(this.FormSend.value['field_metodo_de_pago']==""){
    const alert = await this.alertController.create({

      header: 'Datos incompletos ',

      message: 'llenar todos los datos.',
      buttons: ['Aceptar']
    });

    await alert.present();
    return;
  }else{


    for(let i=0;i<this.ciudades.length;i++){
      if(this.ciudades[i]['name']==localStorage.getItem('locacion')){
        console.log(this.auth.medioTransporte,'estoy en ciudad');

        console.log(this.FormSend.value['field_valor_declarado'], 'valor declarado');
        console.log(this.AuxCarrosDisponibles, 'this.AuxCarrosDisponibles');
        console.log('city');
        if(this.auth.medioTransporte == 2 && this.AuxCarrosDisponibles['length']>=1){
          console.log('carro');
          this.auth.sendFormularioRuta(this.FormSend.value);
   localStorage.setItem('cantidadDestinosRutas',this.cantidadDestinos.toString());
          if(this.cantidadDestinos==3){
           this.router.navigate(['/resumen-ruta3']);
          }else if(this.cantidadDestinos==4){
           this.router.navigate(['/resumen-ruta4']);
          } else
          if(this.cantidadDestinos==5){
           this.router.navigate(['/resumen-ruta5']);
          }else
          if(this.cantidadDestinos==6){
           this.router.navigate(['/resumen-ruta6']);
          }else
          if(this.cantidadDestinos==7){
           this.router.navigate(['/resumen-ruta7']);
          }else
          if(this.cantidadDestinos==8){
           this.router.navigate(['/resumen-ruta8']);
          }else
          if(this.cantidadDestinos==9){
           this.router.navigate(['/resumen-ruta9']);
          }else
          if(this.cantidadDestinos==10){
           this.router.navigate(['/resumen-ruta10']);
          }
          else{
           this.router.navigate(['/resumen-ruta']);
          }




          }else
            if( this.auth.medioTransporte == 1 &&  this.AuxMotosDisponibles['length']>=1){
              localStorage.setItem('cantidadDestinosRutas',this.cantidadDestinos.toString());
              this.auth.sendFormularioRuta(this.FormSend.value);
              if(this.cantidadDestinos==2){
                this.router.navigate(['/resumen-ruta']);
               }
              if(this.cantidadDestinos==3){
               this.router.navigate(['/resumen-ruta3']);
              }else if(this.cantidadDestinos==4){
               this.router.navigate(['/resumen-ruta4']);
              } else
              if(this.cantidadDestinos==5){
               this.router.navigate(['/resumen-ruta5']);
              }else
              if(this.cantidadDestinos==6){
               this.router.navigate(['/resumen-ruta6']);
              }else
              if(this.cantidadDestinos==7){
               this.router.navigate(['/resumen-ruta7']);
              }else
              if(this.cantidadDestinos==8){
               this.router.navigate(['/resumen-ruta8']);
              }else
              if(this.cantidadDestinos==9){
               this.router.navigate(['/resumen-ruta9']);
              }else
              if(this.cantidadDestinos==10){
               this.router.navigate(['/resumen-ruta10']);
              }


            }else{
              const alert = await this.alertController.create({

                header: 'Advertencia',

                message: 'En este momento no tenemos auxiliar disponible, no podemos crear tu orden',
                // al hacer check, vamos a establecer una variable y al darle aceptar preguntamos si esa varibale esta definida si esta se continua
                buttons: [

                {
                  text:'aceptar',
                  handler:()=>{

                this.router.navigate(['/tabs']);

                  }
                }
              ]
              });

              await alert.present();

          }




          break;
      }else{

        //pueblo
        console.log('publo');

        if(this.AuxDisponiblesMunicipios['length']==0){

          const alert = await this.alertController.create({

            header: 'Advertencia',

            message: 'En este momento no tenemos auxiliar disponible, no podemos crear tu orden',
            // al hacer check, vamos a establecer una variable y al darle aceptar preguntamos si esa varibale esta definida si esta se continua
            buttons: [

            {
              text:'aceptar',
              handler:()=>{

            this.router.navigate(['/tabs']);

              }
            }
          ]
          });

          await alert.present();





        }else if(this.AuxDisponiblesMunicipios['length']>=1){
          //
          localStorage.setItem('cantidadDestinosRutas',this.cantidadDestinos.toString());
          this.AuxDisponiblesMunicipios();
          this.auth.sendFormularioRuta(this.FormSend.value);

          if(this.cantidadDestinos==3){
           this.router.navigate(['/resumen-ruta3']);
          }else if(this.cantidadDestinos==4){
           this.router.navigate(['/resumen-ruta4']);
          } else
          if(this.cantidadDestinos==5){
           this.router.navigate(['/resumen-ruta5']);
          }else
          if(this.cantidadDestinos==6){
           this.router.navigate(['/resumen-ruta6']);
          }else
          if(this.cantidadDestinos==7){
           this.router.navigate(['/resumen-ruta7']);
          }else
          if(this.cantidadDestinos==8){
           this.router.navigate(['/resumen-ruta8']);
          }else
          if(this.cantidadDestinos==9){
           this.router.navigate(['/resumen-ruta9']);
          }else
          if(this.cantidadDestinos==10){
           this.router.navigate(['/resumen-ruta10']);
          }
          else{
           this.router.navigate(['/resumen-ruta']);
          }
          break;
        }


      }

     };



  }

}else{
  if(this.FormSend.value['field_metodo_de_pago']==""){
    const alert = await this.alertController.create({

      header: 'Datos incompletos ',

      message: 'llenar todos los datos.',
      buttons: ['Aceptar']
    });

    await alert.present();
    return;
  }else{


    for(let i=0;i<this.ciudades.length;i++){
      if(this.ciudades[i]['name']==localStorage.getItem('locacion')){
        console.log(this.auth.medioTransporte,'estoy en ciudad');

        console.log(this.FormSend.value['field_valor_declarado'], 'valor declarado');
        console.log(this.AuxCarrosDisponibles, 'this.AuxCarrosDisponibles');
        console.log('city');
        if(this.auth.medioTransporte == 2 && this.AuxCarrosDisponibles>this.cantidadDestinos.toString()){
          console.log('carro');
          this.auth.sendFormularioRuta(this.FormSend.value);
   localStorage.setItem('cantidadDestinosRutas',this.cantidadDestinos.toString());
          if(this.cantidadDestinos==3){
           this.router.navigate(['/resumen-ruta3']);
          }else if(this.cantidadDestinos==4){
           this.router.navigate(['/resumen-ruta4']);
          } else
          if(this.cantidadDestinos==5){
           this.router.navigate(['/resumen-ruta5']);
          }else
          if(this.cantidadDestinos==6){
           this.router.navigate(['/resumen-ruta6']);
          }else
          if(this.cantidadDestinos==7){
           this.router.navigate(['/resumen-ruta7']);
          }else
          if(this.cantidadDestinos==8){
           this.router.navigate(['/resumen-ruta8']);
          }else
          if(this.cantidadDestinos==9){
           this.router.navigate(['/resumen-ruta9']);
          }else
          if(this.cantidadDestinos==10){
           this.router.navigate(['/resumen-ruta10']);
          }
          else{
           this.router.navigate(['/resumen-ruta']);
          }




          }else
            if( this.auth.medioTransporte == 1 &&  this.AuxMotosDisponibles['length'] >= 1){
              localStorage.setItem('cantidadDestinosRutas',this.cantidadDestinos.toString());
              this.auth.sendFormularioRuta(this.FormSend.value);

              if(this.cantidadDestinos==3){
               this.router.navigate(['/resumen-ruta3']);
              }else if(this.cantidadDestinos==4){
               this.router.navigate(['/resumen-ruta4']);
              } else
              if(this.cantidadDestinos==5){
               this.router.navigate(['/resumen-ruta5']);
              }else
              if(this.cantidadDestinos==6){
               this.router.navigate(['/resumen-ruta6']);
              }else
              if(this.cantidadDestinos==7){
               this.router.navigate(['/resumen-ruta7']);
              }else
              if(this.cantidadDestinos==8){
               this.router.navigate(['/resumen-ruta8']);
              }else
              if(this.cantidadDestinos==9){
               this.router.navigate(['/resumen-ruta9']);
              }else
              if(this.cantidadDestinos==10){
               this.router.navigate(['/resumen-ruta10']);
              }
              else{
               this.router.navigate(['/resumen-ruta']);
              }

            }else{
              const alert = await this.alertController.create({

                header: 'Advertencia',

                message: 'En este momento no tenemos auxiliar disponible, no podemos crear tu orden',
                // al hacer check, vamos a establecer una variable y al darle aceptar preguntamos si esa varibale esta definida si esta se continua
                buttons: [

                {
                  text:'aceptar',
                  handler:()=>{

                this.router.navigate(['/tabs']);

                  }
                }
              ]
              });

              await alert.present();

          }




          break;
      }else{

        //pueblo
        console.log('publo');

        if(this.AuxDisponiblesMunicipios['length']==0){

          const alert = await this.alertController.create({

            header: 'Advertencia',

            message: 'En este momento no tenemos auxiliar disponible, no podemos crear tu orden',
            // al hacer check, vamos a establecer una variable y al darle aceptar preguntamos si esa varibale esta definida si esta se continua
            buttons: [

            {
              text:'aceptar',
              handler:()=>{

            this.router.navigate(['/tabs']);

              }
            }
          ]
          });

          await alert.present();





        }else if(this.AuxDisponiblesMunicipios>this.cantidadDestinos){
          //
          localStorage.setItem('cantidadDestinosRutas',this.cantidadDestinos.toString());
          this.AuxDisponiblesMunicipios();
          this.auth.sendFormularioRuta(this.FormSend.value);

          if(this.cantidadDestinos==3){
           this.router.navigate(['/resumen-ruta3']);
          }else if(this.cantidadDestinos==4){
           this.router.navigate(['/resumen-ruta4']);
          } else
          if(this.cantidadDestinos==5){
           this.router.navigate(['/resumen-ruta5']);
          }else
          if(this.cantidadDestinos==6){
           this.router.navigate(['/resumen-ruta6']);
          }else
          if(this.cantidadDestinos==7){
           this.router.navigate(['/resumen-ruta7']);
          }else
          if(this.cantidadDestinos==8){
           this.router.navigate(['/resumen-ruta8']);
          }else
          if(this.cantidadDestinos==9){
           this.router.navigate(['/resumen-ruta9']);
          }else
          if(this.cantidadDestinos==10){
           this.router.navigate(['/resumen-ruta10']);
          }
          else{
           this.router.navigate(['/resumen-ruta']);
          }
          break;
        }


      }

     };



  }
}










   }



   async add(){
console.log( localStorage.getItem('cantidadDeDisponibles'));

console.log( Number(localStorage.getItem('cantidadDeDisponibles')));

if(localStorage.getItem('modalidad')=='Moderada'){

this.limiteDisponibles=10;
if( this.cantidadDestinos<this.limiteDisponibles){

  this.cantidadDestinos+=1;
  //this.destinos.push(this.fb.control(''));



}
}else{
  if( this.cantidadDestinos<this.limiteDisponibles){

    this.cantidadDestinos+=1;
    //this.destinos.push(this.fb.control(''));



  }else{
    const alert = await this.alertController.create({

      header: 'Advertencia',

      message: 'El numero de destinos depende de la cantidad de auxiliares disponibles!!',
      // al hacer check, vamos a establecer una variable y al darle aceptar preguntamos si esa varibale esta definida si esta se continua
      buttons: [

      {
        text:'aceptar',
        handler:()=>{



        }
      }
    ]
    });

    await alert.present();
  }

}

  }
  regionOrigen(event){
    console.log('regionOrigen');
    this.FormSend.controls.field_locacion_destino_r.setValue('');
    this.locacion= event;
    console.log(event);
    if(event!=''){
      this.auth.locacion=event;
      localStorage.setItem('locacionOrigenSeleccionada',event);

      this.WillEnterOrigen();

    }

  }

  async WillEnterOrigen() {
    try {
      const data = await this.auth.getListBarriosSeleccion().toPromise();
      console.log(data);
      this.direccion = data;

      console.log(this.direccion, 'direccion');
      console.log(this.direccion.length);
      this.bloquearInputBarrio = false;

      // Si barrios es 1 y no es "San Andrés"
      if (this.direccion.length === 1 && this.direccion[0]['name'] !== 'San Andrés') {
        // Estableciendo información en input
        this.FormSend.controls.field_locacion_entrega.setValue(this.direccion[0]['name']);
        this.FormSend.controls.field_barrio_origen.setValue(this.direccion[0]['name']);
        this.ocultarInputOrigen = true;
        this.disabledValueOrigen = true;

        // Variables de local storage
        localStorage.setItem('tarifaOrigen', this.direccion[0].field_tarifa_externa);
        localStorage.setItem('imgBarrioOrigen', this.direccion[0].field_imagen_barrio);
        localStorage.setItem('longitudOrigen', this.direccion[0].field_longitud);
        localStorage.setItem('latitudOrigen', this.direccion[0].field_latitud);
        localStorage.setItem('valorDeterminanteLONG', this.direccion[0].field_longitud_1);
        localStorage.setItem('valorDeterminanteLAT', this.direccion[0].field_latitud_1);

        console.log('selected----> origen', this.direccion[0]['field_zona_a']);

        localStorage.setItem('zona_origen',this.direccion[0]['field_zona_a']);

        // Ocultando campo de barrio
        document.getElementById('itemOrigen').style.visibility = "hidden"; // hide

        // Configuración para el destino
        this.FormSend.controls.field_locacion_destino_r.setValue(this.direccion[0]['name']);
        this.FormSend.controls.field_barrio_destino.setValue(this.direccion[0]['name']);
        localStorage.setItem('tarifaDestino', this.direccion[0].field_tarifa);
        localStorage.setItem('imgBarrioDestino', this.direccion[0].field_imagen_barrio);

      } else if (this.direccion.length === 1 && this.direccion[0]['name'] === 'San Andrés') {
        console.log('Es San Andrés');
        this.FormSend.controls.field_locacion_entrega.setValue(this.direccion[0]['name']);
        this.FormSend.controls.field_barrio_origen.setValue(this.direccion[0]['name']);
        this.FormSend.controls.field_locacion_destino.setValue(this.direccion[0]['name']);
        this.FormSend.controls.field_barrio_destino.setValue(this.direccion[0]['name']);

        localStorage.setItem('tarifaOrigen', this.direccion[0]['field_tarifa']);
        localStorage.setItem('imgBarrioOrigen', this.direccion[0]['field_imagen_barrio']);
        localStorage.setItem('longitudOrigen', this.direccion[0]['field_longitud']);
        localStorage.setItem('latitudOrigen', this.direccion[0]['field_latitud']);
        localStorage.setItem('valorDeterminanteLONG', this.direccion[0]['field_longitud_1']);
        localStorage.setItem('valorDeterminanteLAT', this.direccion[0]['field_latitud_1']);

        this.ocultarInputOrigen = true;
        this.disabledValueOrigen = true;

      } else if (this.direccion.length > 1) {
        this.ocultarInputOrigen = false;
        this.disabledValueOrigen = true;
        this.FormSend.controls.field_barrio_origen.setValue('');
        document.getElementById('itemOrigen').style.visibility = "visible"; // show
      }

    } catch (error) {
      console.log(error);
      const alert = await this.alertController.create({
        header: 'Error de locación',
        message: 'Su locación no tiene barrios asignados.',
        buttons: [{
          text: 'Aceptar',
          handler: () => {}
        }],
      });
      await alert.present();
    }
  }


  region(event){
    this.locacion= event;
    console.log(this.locacion);
    if(event!=''){
      localStorage.setItem('locacionDestinoSeleccionada',event);
      this.auth.locacion=event;

      this.WillEnter();

    }

  }
  async WillEnter() {
    try {
      const data = await this.auth.getListBarriosSeleccion().toPromise();
      this.direccionDestino = data;

      console.log(this.direccionDestino[0]['name']);
      console.log(this.direccionDestino[0]['field_tarifa_externa']);

      // Si barrios es 1, agregar por defecto y ocultar input barrio destino
      if (this.direccionDestino.length === 1) {
        this.FormSend.controls.field_barrio_destino.setValue(this.direccionDestino[0]['name']);
        console.log('selected----> destino', this.direccionDestino[0]['field_zona_a']);

        localStorage.setItem('zona_destino1', this.direccionDestino[0]['field_zona_a']);
        localStorage.setItem('tarifaDestino', this.direccionDestino[0]['field_tarifa']);
        localStorage.setItem('tarifaExternaDestino', this.direccionDestino[0]['field_tarifa_externa']);
        localStorage.setItem('imgBarrioDestino', this.direccionDestino[0]['field_imagen_barrio']);

        this.ocultarInput = true;
        this.bloquearInputBarrioDestino = true;
        document.getElementById('itemDestino').style.visibility = "hidden"; // hide

      } else if (this.direccionDestino.length === 1 && this.direccionDestino[0]['name'] === 'San Andrés') {
        this.FormSend.controls.field_barrio_destino.setValue(this.direccionDestino[0]['name']);
        localStorage.setItem('tarifaDestino', this.direccionDestino[0].field_tarifa);
        localStorage.setItem('imgBarrioDestino', this.direccionDestino[0]['field_imagen_barrio']);

        this.ocultarInput = true;
        this.bloquearInputBarrioDestino = true;
        document.getElementById('itemDestino').style.visibility = "hidden"; // hide

      } else {
        this.FormSend.controls.field_barrio_destino.setValue('');
        this.ocultarInput = false;
        this.bloquearInputBarrioDestino = false;
        document.getElementById('itemDestino').style.visibility = "visible"; // show
      }

    } catch (error) {
      console.log(error);
      const alert = await this.alertController.create({
        header: 'Error de locación',
        message: 'Su locación no tiene barrios asignados.',
        buttons: [{
          text: 'Aceptar',
          handler: () => {}
        }],
      });
      await alert.present();
    }
  }

  region2(event){
    this.locacion= event;
    console.log(this.locacion);
    if(event!=''){
      localStorage.setItem('locacionDestinoSeleccionada2',event);
      this.auth.locacion=event;

      this.WillEnter2();

    }

  }
  async WillEnter2() {
    try {
      const data = await this.auth.getListBarriosSeleccion().toPromise();
      this.direccionDestino2 = data;

      console.log(this.direccionDestino2[0]['name']);
      console.log(this.direccionDestino2[0]['field_tarifa_externa']);

      // Si barrios es 1, agregar por defecto y ocultar input barrio destino
      if (this.direccionDestino2.length === 1) {
        this.FormSend.controls.field_barrio_destino2.setValue(this.direccionDestino2[0]['name']);
        console.log('selected----> destino', this.direccionDestino2[0]['field_zona_a']);

        localStorage.setItem('zona_destino2', this.direccionDestino2[0]['field_zona_a']);
        localStorage.setItem('tarifaDestino2', this.direccionDestino2[0]['field_tarifa']);
        localStorage.setItem('tarifaExternaDestino2', this.direccionDestino2[0]['field_tarifa_externa']);
        localStorage.setItem('imgBarrioDestino2', this.direccionDestino2[0]['field_imagen_barrio']);

        this.ocultarInput2 = true;
        this.bloquearInputBarrioDestino2 = true;
        document.getElementById('itemDestino2').style.visibility = "hidden"; // hide

      } else if (this.direccionDestino2.length === 1 && this.direccionDestino2[0]['name'] === 'San Andrés') {
        this.FormSend.controls.field_barrio_destino2.setValue(this.direccionDestino2[0]['name']);
        localStorage.setItem('tarifaDestino2', this.direccionDestino2[0]['field_tarifa']);
        localStorage.setItem('imgBarrioDestino2', this.direccionDestino2[0]['field_imagen_barrio']);

        this.ocultarInput2 = true;
        this.bloquearInputBarrioDestino2 = true;
        document.getElementById('itemDestino2').style.visibility = "hidden"; // hide

      } else {
        this.FormSend.controls.field_barrio_destino2.setValue('');
        this.ocultarInput2 = false;
        this.bloquearInputBarrioDestino2 = false;
        document.getElementById('itemDestino2').style.visibility = "visible"; // show
      }

    } catch (error) {
      console.log(error);
      const alert = await this.alertController.create({
        header: 'Error de locación',
        message: 'Su locación no tiene barrios asignados.',
        buttons: [{
          text: 'Aceptar',
          handler: () => {}
        }],
      });
      await alert.present();
    }
  }


  region3(event){
    this.locacion= event;
    console.log(this.locacion);
    if(event!=''){
      localStorage.setItem('locacionDestinoSeleccionada3',event);
      this.auth.locacion=event;

      this.WillEnter3();

    }

  }

  async WillEnter3() {
    try {
      const data = await this.auth.getListBarriosSeleccion().toPromise();
      this.direccionDestino3 = data;

      console.log(this.direccionDestino3[0]['name']);
      console.log(this.direccionDestino3[0]['field_tarifa_externa']);

      // Si barrios es 1, agregar por defecto y ocultar input barrio destino
      if (this.direccionDestino3.length === 1) {
        this.FormSend.controls.field_barrio_destino3.setValue(this.direccionDestino3[0]['name']);
        console.log('selected----> destino', this.direccionDestino3[0]['field_zona_a']);

        localStorage.setItem('zona_destino3', this.direccionDestino3[0]['field_zona_a']);
        localStorage.setItem('tarifaDestino3', this.direccionDestino3[0]['field_tarifa']);
        localStorage.setItem('tarifaExternaDestino3', this.direccionDestino3[0]['field_tarifa_externa']);
        localStorage.setItem('imgBarrioDestino3', this.direccionDestino3[0]['field_imagen_barrio']);

        this.ocultarInput3 = true;
        this.bloquearInputBarrioDestino3 = true;
        document.getElementById('itemDestino3').style.visibility = "hidden"; // hide

      } else if (this.direccionDestino3.length === 1 && this.direccionDestino3[0]['name'] === 'San Andrés') {
        this.FormSend.controls.field_barrio_destino3.setValue(this.direccionDestino3[0]['name']);
        localStorage.setItem('tarifaDestino3', this.direccionDestino3[0]['field_tarifa']);
        localStorage.setItem('imgBarrioDestino3', this.direccionDestino3[0]['field_imagen_barrio']);

        this.ocultarInput3 = true;
        this.bloquearInputBarrioDestino3 = true;
        document.getElementById('itemDestino3').style.visibility = "hidden"; // hide

      } else {
        this.FormSend.controls.field_barrio_destino3.setValue('');
        this.ocultarInput3 = false;
        this.bloquearInputBarrioDestino3 = false;
        document.getElementById('itemDestino3').style.visibility = "visible"; // show
      }

    } catch (error) {
      console.log(error);
      const alert = await this.alertController.create({
        header: 'Error de locación',
        message: 'Su locación no tiene barrios asignados.',
        buttons: [{
          text: 'Aceptar',
          handler: () => {}
        }],
      });
      await alert.present();
    }
  }



  region4(event){
    this.locacion= event;
    console.log(this.locacion);
    if(event!=''){
      localStorage.setItem('locacionDestinoSeleccionada4',event);
      this.auth.locacion=event;

      this.WillEnter4();

    }

  }

  async WillEnter4() {
    try {
      const data = await this.auth.getListBarriosSeleccion().toPromise();
      this.direccionDestino4 = data;

      console.log(this.direccionDestino4[0]['name']);
      console.log(this.direccionDestino4[0]['field_tarifa_externa']);

      // Si barrios es 1, agregar por defecto y ocultar input barrio destino
      if (this.direccionDestino4.length === 1) {
        this.FormSend.controls.field_barrio_destino4.setValue(this.direccionDestino4[0]['name']);
        console.log('selected----> destino', this.direccionDestino4[0]['field_zona_a']);

        localStorage.setItem('zona_destino4', this.direccionDestino4[0]['field_zona_a']);
        localStorage.setItem('tarifaDestino4', this.direccionDestino4[0]['field_tarifa']);
        localStorage.setItem('tarifaExternaDestino4', this.direccionDestino4[0]['field_tarifa_externa']);
        localStorage.setItem('imgBarrioDestino4', this.direccionDestino4[0]['field_imagen_barrio']);

        this.ocultarInput4 = true;
        this.bloquearInputBarrioDestino4 = true;
        document.getElementById('itemDestino4').style.visibility = "hidden"; // hide

      } else if (this.direccionDestino4.length === 1 && this.direccionDestino4[0]['name'] === 'San Andrés') {
        this.FormSend.controls.field_barrio_destino4.setValue(this.direccionDestino4[0]['name']);
        localStorage.setItem('tarifaDestino4', this.direccionDestino4[0]['field_tarifa']);
        localStorage.setItem('imgBarrioDestino4', this.direccionDestino4[0]['field_imagen_barrio']);

        this.ocultarInput4 = true;
        this.bloquearInputBarrioDestino4 = true;
        document.getElementById('itemDestino4').style.visibility = "hidden"; // hide

      } else {
        this.FormSend.controls.field_barrio_destino4.setValue('');
        this.ocultarInput4 = false;
        this.bloquearInputBarrioDestino4 = false;
        document.getElementById('itemDestino4').style.visibility = "visible"; // show
      }

    } catch (error) {
      console.log(error);
      const alert = await this.alertController.create({
        header: 'Error de locación',
        message: 'Su locación no tiene barrios asignados.',
        buttons: [{
          text: 'Aceptar',
          handler: () => {}
        }],
      });
      await alert.present();
    }
  }



  region5(event){
    this.locacion= event;
    console.log(this.locacion);
    if(event!=''){
      localStorage.setItem('locacionDestinoSeleccionada5',event);
      this.auth.locacion=event;

      this.WillEnter5();

    }

  }

  async WillEnter5() {
    try {
      const data = await this.auth.getListBarriosSeleccion().toPromise();
      this.direccionDestino5 = data;

      console.log(this.direccionDestino5[0]['name']);
      console.log(this.direccionDestino5[0]['field_tarifa_externa']);

      // Si barrios es 1, agregar por defecto y ocultar input barrio destino
      if (this.direccionDestino5.length === 1) {
        this.FormSend.controls.field_barrio_destino5.setValue(this.direccionDestino5[0]['name']);
        console.log('selected----> destino', this.direccionDestino5[0]['field_zona_a']);

        localStorage.setItem('zona_destino5', this.direccionDestino5[0]['field_zona_a']);
        localStorage.setItem('tarifaDestino5', this.direccionDestino5[0]['field_tarifa']);
        localStorage.setItem('tarifaExternaDestino5', this.direccionDestino5[0]['field_tarifa_externa']);
        localStorage.setItem('imgBarrioDestino5', this.direccionDestino5[0]['field_imagen_barrio']);

        this.ocultarInput5 = true;
        this.bloquearInputBarrioDestino5 = true;
        document.getElementById('itemDestino5').style.visibility = "hidden"; // hide

      } else if (this.direccionDestino5.length === 1 && this.direccionDestino5[0]['name'] === 'San Andrés') {
        this.FormSend.controls.field_barrio_destino5.setValue(this.direccionDestino5[0]['name']);
        localStorage.setItem('tarifaDestino5', this.direccionDestino5[0]['field_tarifa']);
        localStorage.setItem('imgBarrioDestino5', this.direccionDestino5[0]['field_imagen_barrio']);

        this.ocultarInput5 = true;
        this.bloquearInputBarrioDestino5 = true;
        document.getElementById('itemDestino5').style.visibility = "hidden"; // hide

      } else {
        this.FormSend.controls.field_barrio_destino5.setValue('');
        this.ocultarInput5 = false;
        this.bloquearInputBarrioDestino5 = false;
        document.getElementById('itemDestino5').style.visibility = "visible"; // show
      }

    } catch (error) {
      console.log(error);
      const alert = await this.alertController.create({
        header: 'Error de locación',
        message: 'Su locación no tiene barrios asignados.',
        buttons: [{
          text: 'Aceptar',
          handler: () => {}
        }],
      });
      await alert.present();
    }
  }


  region6(event){
    this.locacion= event;
    console.log(this.locacion);
    if(event!=''){
      localStorage.setItem('locacionDestinoSeleccionada6',event);
      this.auth.locacion=event;

      this.WillEnter6();

    }

  }

  async WillEnter6() {
    try {
      const data = await this.auth.getListBarriosSeleccion().toPromise();
      this.direccionDestino6 = data;

      console.log(this.direccionDestino6[0]['name']);
      console.log(this.direccionDestino6[0]['field_tarifa_externa']);

      // Si barrios es 1, agregar por defecto y ocultar input barrio destino
      if (this.direccionDestino6.length === 1) {
        this.FormSend.controls.field_barrio_destino6.setValue(this.direccionDestino6[0]['name']);
        console.log('selected----> destino', this.direccionDestino6[0]['field_zona_a']);

        localStorage.setItem('zona_destino6', this.direccionDestino6[0]['field_zona_a']);
        localStorage.setItem('tarifaDestino6', this.direccionDestino6[0]['field_tarifa']);
        localStorage.setItem('tarifaExternaDestino6', this.direccionDestino6[0]['field_tarifa_externa']);
        localStorage.setItem('imgBarrioDestino6', this.direccionDestino6[0]['field_imagen_barrio']);

        this.ocultarInput6 = true;
        this.bloquearInputBarrioDestino6 = true;
        document.getElementById('itemDestino6').style.visibility = "hidden"; // hide

      } else if (this.direccionDestino6.length === 1 && this.direccionDestino6[0]['name'] === 'San Andrés') {
        this.FormSend.controls.field_barrio_destino6.setValue(this.direccionDestino6[0]['name']);
        localStorage.setItem('tarifaDestino6', this.direccionDestino6[0]['field_tarifa']);
        localStorage.setItem('imgBarrioDestino6', this.direccionDestino6[0]['field_imagen_barrio']);

        this.ocultarInput6 = true;
        this.bloquearInputBarrioDestino6 = true;
        document.getElementById('itemDestino6').style.visibility = "hidden"; // hide

      } else {
        this.FormSend.controls.field_barrio_destino6.setValue('');
        this.ocultarInput6 = false;
        this.bloquearInputBarrioDestino6 = false;
        document.getElementById('itemDestino6').style.visibility = "visible"; // show
      }

    } catch (error) {
      console.log(error);
      const alert = await this.alertController.create({
        header: 'Error de locación',
        message: 'Su locación no tiene barrios asignados.',
        buttons: [{
          text: 'Aceptar',
          handler: () => {}
        }],
      });
      await alert.present();
    }
  }



  region7(event){
    this.locacion= event;
    console.log(this.locacion);
    if(event!=''){
      localStorage.setItem('locacionDestinoSeleccionada7',event);
      this.auth.locacion=event;

      this.WillEnter7();

    }

  }

  async WillEnter7() {
    try {
      const data = await this.auth.getListBarriosSeleccion().toPromise();
      this.direccionDestino7 = data;

      console.log(this.direccionDestino7[0]['name']);
      console.log(this.direccionDestino7[0]['field_tarifa_externa']);

      // Si barrios es 1, agregar por defecto y ocultar input barrio destino
      if (this.direccionDestino7.length === 1) {
        this.FormSend.controls.field_barrio_destino7.setValue(this.direccionDestino7[0]['name']);
        console.log('selected----> destino', this.direccionDestino7[0]['field_zona_a']);

        localStorage.setItem('zona_destino7', this.direccionDestino7[0]['field_zona_a']);
        localStorage.setItem('tarifaDestino7', this.direccionDestino7[0]['field_tarifa']);
        localStorage.setItem('tarifaExternaDestino7', this.direccionDestino7[0]['field_tarifa_externa']);
        localStorage.setItem('imgBarrioDestino7', this.direccionDestino7[0]['field_imagen_barrio']);

        this.ocultarInput7 = true;
        this.bloquearInputBarrioDestino7 = true;
        document.getElementById('itemDestino7').style.visibility = "hidden"; // hide

      } else if (this.direccionDestino7.length === 1 && this.direccionDestino7[0]['name'] === 'San Andrés') {
        this.FormSend.controls.field_barrio_destino7.setValue(this.direccionDestino7[0]['name']);
        localStorage.setItem('tarifaDestino7', this.direccionDestino7[0]['field_tarifa']);
        localStorage.setItem('imgBarrioDestino7', this.direccionDestino7[0]['field_imagen_barrio']);

        this.ocultarInput7 = true;
        this.bloquearInputBarrioDestino7 = true;
        document.getElementById('itemDestino7').style.visibility = "hidden"; // hide

      } else {
        this.FormSend.controls.field_barrio_destino7.setValue('');
        this.ocultarInput7 = false;
        this.bloquearInputBarrioDestino7 = false;
        document.getElementById('itemDestino7').style.visibility = "visible"; // show
      }

    } catch (error) {
      console.log(error);
      const alert = await this.alertController.create({
        header: 'Error de locación',
        message: 'Su locación no tiene barrios asignados.',
        buttons: [{
          text: 'Aceptar',
          handler: () => {}
        }],
      });
      await alert.present();
    }
  }



  region8(event){
    this.locacion= event;
    console.log(this.locacion);
    if(event!=''){
      localStorage.setItem('locacionDestinoSeleccionada8',event);
      this.auth.locacion=event;

      this.WillEnter8();

    }

  }

  async WillEnter8() {
    try {
      const data = await this.auth.getListBarriosSeleccion().toPromise();
      this.direccionDestino8 = data;

      console.log(this.direccionDestino8[0]['name']);
      console.log(this.direccionDestino8[0]['field_tarifa_externa']);

      // Si barrios es 1, agregar por defecto y ocultar input barrio destino
      if (this.direccionDestino8.length === 1) {
        this.FormSend.controls.field_barrio_destino8.setValue(this.direccionDestino8[0]['name']);
        console.log('selected----> destino', this.direccionDestino8[0]['field_zona_a']);

        localStorage.setItem('zona_destino8', this.direccionDestino8[0]['field_zona_a']);
        localStorage.setItem('tarifaDestino8', this.direccionDestino8[0]['field_tarifa']);
        localStorage.setItem('tarifaExternaDestino8', this.direccionDestino8[0]['field_tarifa_externa']);
        localStorage.setItem('imgBarrioDestino8', this.direccionDestino8[0]['field_imagen_barrio']);

        this.ocultarInput8 = true;
        this.bloquearInputBarrioDestino8 = true;
        document.getElementById('itemDestino8').style.visibility = "hidden"; // hide

      } else if (this.direccionDestino8.length === 1 && this.direccionDestino8[0]['name'] === 'San Andrés') {
        this.FormSend.controls.field_barrio_destino8.setValue(this.direccionDestino8[0]['name']);
        localStorage.setItem('tarifaDestino8', this.direccionDestino8[0]['field_tarifa']);
        localStorage.setItem('imgBarrioDestino8', this.direccionDestino8[0]['field_imagen_barrio']);

        this.ocultarInput8 = true;
        this.bloquearInputBarrioDestino8 = true;
        document.getElementById('itemDestino8').style.visibility = "hidden"; // hide

      } else {
        this.FormSend.controls.field_barrio_destino8.setValue('');
        this.ocultarInput8 = false;
        this.bloquearInputBarrioDestino8 = false;
        document.getElementById('itemDestino8').style.visibility = "visible"; // show
      }

    } catch (error) {
      console.log(error);
      const alert = await this.alertController.create({
        header: 'Error de locación',
        message: 'Su locación no tiene barrios asignados.',
        buttons: [{
          text: 'Aceptar',
          handler: () => {}
        }],
      });
      await alert.present();
    }
  }


  region9(event){
    this.locacion= event;
    console.log(this.locacion);
    if(event!=''){
      localStorage.setItem('locacionDestinoSeleccionada9',event);
      this.auth.locacion=event;

      this.WillEnter9();

    }

  }

  async WillEnter9() {
    try {
      const data = await this.auth.getListBarriosSeleccion().toPromise();
      this.direccionDestino9 = data;

      console.log(this.direccionDestino9[0]['name']);
      console.log(this.direccionDestino9[0]['field_tarifa_externa']);

      // Si barrios es 1, agregar por defecto y ocultar input barrio destino
      if (this.direccionDestino9.length === 1) {
        this.FormSend.controls.field_barrio_destino9.setValue(this.direccionDestino9[0]['name']);
        console.log('selected----> destino', this.direccionDestino9[0]['field_zona_a']);

        localStorage.setItem('zona_destino9', this.direccionDestino9[0]['field_zona_a']);
        localStorage.setItem('tarifaDestino9', this.direccionDestino9[0]['field_tarifa']);
        localStorage.setItem('tarifaExternaDestino9', this.direccionDestino9[0]['field_tarifa_externa']);
        localStorage.setItem('imgBarrioDestino9', this.direccionDestino9[0]['field_imagen_barrio']);

        this.ocultarInput9 = true;
        this.bloquearInputBarrioDestino9 = true;
        document.getElementById('itemDestino9').style.visibility = "hidden"; // hide

      } else if (this.direccionDestino9.length === 1 && this.direccionDestino9[0]['name'] === 'San Andrés') {
        this.FormSend.controls.field_barrio_destino9.setValue(this.direccionDestino9[0]['name']);
        localStorage.setItem('tarifaDestino9', this.direccionDestino9[0]['field_tarifa']);
        localStorage.setItem('imgBarrioDestino9', this.direccionDestino9[0]['field_imagen_barrio']);

        this.ocultarInput9 = true;
        this.bloquearInputBarrioDestino9 = true;
        document.getElementById('itemDestino9').style.visibility = "hidden"; // hide

      } else {
        this.FormSend.controls.field_barrio_destino9.setValue('');
        this.ocultarInput9 = false;
        this.bloquearInputBarrioDestino9 = false;
        document.getElementById('itemDestino9').style.visibility = "visible"; // show
      }

    } catch (error) {
      console.log(error);
      const alert = await this.alertController.create({
        header: 'Error de locación',
        message: 'Su locación no tiene barrios asignados.',
        buttons: [{
          text: 'Aceptar',
          handler: () => {}
        }],
      });
      await alert.present();
    }
  }


  region10(event){
    this.locacion= event;
    console.log(this.locacion);
    if(event!=''){
      localStorage.setItem('locacionDestinoSeleccionada10',event);
      this.auth.locacion=event;

      this.WillEnter10();

    }

  }

  async WillEnter10() {
    try {
      const data = await this.auth.getListBarriosSeleccion().toPromise();
      this.direccionDestino10 = data;

      console.log(this.direccionDestino10[0]['name']);
      console.log(this.direccionDestino10[0]['field_tarifa_externa']);

      // Si barrios es 1, agregar por defecto y ocultar input barrio destino
      if (this.direccionDestino10.length === 1) {
        this.FormSend.controls.field_barrio_destino10.setValue(this.direccionDestino10[0]['name']);
        console.log('selected----> destino', this.direccionDestino10[0]['field_zona_a']);

        localStorage.setItem('zona_destino10', this.direccionDestino10[0]['field_zona_a']);
        localStorage.setItem('tarifaDestino10', this.direccionDestino10[0]['field_tarifa']);
        localStorage.setItem('tarifaExternaDestino10', this.direccionDestino10[0]['field_tarifa_externa']);
        localStorage.setItem('imgBarrioDestino10', this.direccionDestino10[0]['field_imagen_barrio']);

        this.ocultarInput10 = true;
        this.bloquearInputBarrioDestino10 = true;
        document.getElementById('itemDestino10').style.visibility = "hidden"; // hide

      } else if (this.direccionDestino10.length === 1 && this.direccionDestino10[0]['name'] === 'San Andrés') {
        this.FormSend.controls.field_barrio_destino10.setValue(this.direccionDestino10[0]['name']);
        localStorage.setItem('tarifaDestino10', this.direccionDestino10[0]['field_tarifa']);
        localStorage.setItem('imgBarrioDestino10', this.direccionDestino10[0]['field_imagen_barrio']);

        this.ocultarInput10 = true;
        this.bloquearInputBarrioDestino10 = true;
        document.getElementById('itemDestino10').style.visibility = "hidden"; // hide

      } else {
        this.FormSend.controls.field_barrio_destino10.setValue('');
        this.ocultarInput10 = false;
        this.bloquearInputBarrioDestino10 = false;
        document.getElementById('itemDestino10').style.visibility = "visible"; // show
      }

    } catch (error) {
      console.log(error);
      const alert = await this.alertController.create({
        header: 'Error de locación',
        message: 'Su locación no tiene barrios asignados.',
        buttons: [{
          text: 'Aceptar',
          handler: () => {}
        }],
      });
      await alert.present();
    }
  }

  ngOnDestroy() {

    console.log("Rutas- OnDestroy")
  }

  cambiarTamañoSlider() {
    // Obtener el elemento del swiper y establecer sus estilos
    const swiperElement = this.swiper.swiperRef.el;
    swiperElement.style.width = '100%'; // Establece el ancho del swiper
    swiperElement.style.height = '500px'; // Establece la altura del swiper
  }

  restaurarTamañoOriginal() {
    // Obtener el elemento del swiper y restaurar sus estilos originales
    const swiperElement = this.swiper.swiperRef.el;
    swiperElement.style.width = ''; // Restablece el ancho del swiper a su valor original (vacío)
    swiperElement.style.height = ''; // Restablece la altura del swiper a su valor original (vacío)
  }


  get destinosAll(){
    return this.FormSend.get('destinos') as FormArray;
  }

  public deleteNUm(cantidadDestinos : number){
console.log('hay que quitar');
console.log(this.cantidadDestinos);

this.aux =""+this.cantidadDestinos;
     console.log(this.aux);
     if(localStorage.getItem('modalidad')=='Moderada'){


      if(this.cantidadDestinos>8){
        cantidadDestinos = this.cantidadDestinos= this.cantidadDestinos- 1;

       //document.getElementById(this.aux).remove();

      }
    }else{
      if(this.cantidadDestinos>2){
        cantidadDestinos = this.cantidadDestinos= this.cantidadDestinos- 1;

       //document.getElementById(this.aux).remove();

      }
    }



  }
  loadData(): void {

    this.loading = true;
    this.slideNext2();
    // Simulación de una operación asincrónica (p. ej., una solicitud HTTP)
    setTimeout(() => {
      // Después de que la operación asincrónica haya finalizado
      this.loading = false;
    }, 2000); // Simular una carga de 2 segundos
  }

}
