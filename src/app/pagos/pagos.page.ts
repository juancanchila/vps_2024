import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController, MenuController } from '@ionic/angular';
import { environment } from 'src/environments/environment';
import Swiper, { EffectFade, Navigation, Pagination, Virtual } from 'swiper';
import { SwiperComponent } from 'swiper/angular';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-pagos',
  templateUrl: './pagos.page.html',
  styleUrls: ['./pagos.page.scss'],
})
export class PagosPage implements OnInit {
  public items: {name: string}[] = [];
  public items2: {name: string}[] = [];
  @ViewChild('swiper', { static: false }) swiper?: SwiperComponent;

  public swiperConfig={
    Virtual: true,
    //slidesPerView: 2,
    navigation: true,
    allowTouchMove: false,
    //pagination: { type:'fraction'},

    EffectFade:true

  };
  permitirPagoEfectivo;
  AuxCarrosDisponibles:any=[];
  AuxMotosDisponibles:any=[];
  AuxDisponiblesMunicipios:any=[];
  ciudades:any[];
  slider:any=[];
  urlBase:any;
  FormSend: FormGroup;
  barrio: any;
  direccion :any[];
  locaciones :any[];
  respuestaDocumentos:any;
  regresarDocumentosPorwasap:any;
  direccionDestino: any;
  disabledValue: boolean;
  ocultarInput: boolean;
  locacion: any;
  ocultarInputOrigen: boolean;
  disabledValueOrigen: boolean;
  bloquearInputBarrio: boolean=true;
  bloquearInputBarrioDestino: boolean = true;
  imagenLista: boolean ;
  constructor(private menucontrol: MenuController, private router: Router, private auth: AuthService, public fb: FormBuilder, public alertController: AlertController) {
    localStorage.setItem('servicioEvaluado','pagos');
    this.menucontrol.enable(false);
    this.urlBase=environment.urlBase;
    this.FormSend= this.fb.group({
      field_direccion_entrega:[""],
      field_respuesta_documentos:[""],
      field_regresar_por_wasap:[""],
      field_medio_de_transporte: [""],
//field_documentos_pagos:[ ""],
field_observaciones:[""],
field_direccion_destino:[""],
field_clase_de_pago:[""],
field_metodo_de_pago:[''],
field_barrio_origen:[""],
field_barrio_destino:[""],
field_locacion_entrega:[""],
field_locacion_destino:[""],
field_contacto:[""],
field_contacto_destino:[""],
field_nombre_c_origen:[''],
field_nombre_c_destino:['']



     });

   }

   imagenCargada(event: boolean) {
    this.imagenLista = event;
  }
   async slideNext(){



    if(this.AuxCarrosDisponibles['length']==0 && this.AuxMotosDisponibles['length']==0){
      const alert = await this.alertController.create({

        header: 'Advertencia',

        message: 'En este momento no tenemos auxiliar disponible',
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




  }


  async slideNext2(){





    console.log(this.FormSend.value['field_barrio_destino']);
   // console.log(this.FormSend.value['field_barrio_destino']);
   // console.log(this.direccion)
   var barrioExiste= new Boolean();
    for (var i = 0; i <this.direccionDestino.length; i++) {


      if(this.FormSend.value['field_barrio_destino']==this.direccionDestino[i].name){
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

  slidePrev(){
    this.swiper.swiperRef.slidePrev(1000);
  }


  async inputChanged($event: any): Promise<void> {
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
  async inputChanged2($event: any): Promise<void> {
    // récupération de la valeur saisie
    const value = $event.target.value as string;
    // vider la list si le champ de saisie est vide
    if (value.length <= 0) {
      this.items2 = [];
      return; // stoper l'exection du script
    }
    // récupération de la liste de posibilités
    console.log(this.direccionDestino,'antes de')
    const list = this.direccionDestino;
    console.log(list,'list');
    //console.log(this.auth._fakeDatas,'list fake')
    // filtrer la list pour extraire uniquement les element pertinants
    const items = list.filter(
      item => item.name.toLocaleLowerCase().includes(value.toLocaleLowerCase())
    );
    // assigner la liste d'items à `this.items`
    // cela va aussi afficher la liste de propositions dans le HTML
    this.items2 = items;
  }

  selected(item, input): void {
    console.log('selected---->',item.name);
    localStorage.setItem('tarifaOrigen', item.field_tarifa);
    localStorage.setItem('zona_origen',  item.field_zona_a);
    console.log('selected---->',item.field_zona_a);
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
    localStorage.setItem('tarifaDestino', item.field_tarifa);

    localStorage.setItem('zona_destino', item.field_zona_a);
    console.log('selected---->  destino', item.field_zona_a);

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


   openResumen(){

    this.auth.sendFormularioPagos(this.FormSend.value);
    //this.router.navigate(['/resumen-medicamentos']);



   }
   iraIndex(){
    this.router.navigate(['/tabs']);
  }
   async sendForm(){
     if (this.FormSend.invalid || this.FormSend.value['field_respuesta_documentos'] == '' || this.FormSend.value['field_regresar_por_wasap'] == '') {
       const alert = await this.alertController.create({

         header: 'Datos incompletos ',

         message: 'llenar todos los datos.',
         buttons: ['Aceptar']
       });

       await alert.present();
       return;
     } else {
       if (this.FormSend.value.field_respuesta_documentos == "Recoger Documentos") {
         this.FormSend.controls.field_respuesta_documentos.setValue('Recoger Documentos');

       } if (this.FormSend.value.field_respuesta_documentos == "Enviar Documentos por WhatsApp") {
         this.FormSend.controls.field_respuesta_documentos.setValue('Enviar Documentos por WhatsApp');

       }

       if (this.FormSend.value.field_regresar_por_wasap == "Enviar comprobante por whatsapp") {
         this.FormSend.controls.field_regresar_por_wasap.setValue('Enviar comprobante por whatsapp');

       } if (this.FormSend.value.field_regresar_por_wasap == "Llevar recibo de vuelta") {
         this.FormSend.controls.field_regresar_por_wasap.setValue('Llevar recibo de vuelta');

       }
     }

       console.log(this.AuxMotosDisponibles['length'], 'lengt de vector motos');

       if (this.AuxCarrosDisponibles.length === 0) {

         const alert = await this.alertController.create({

           header: 'Advertencia',

           message: 'En este momento no tenemos auxiliar disponible, no podemos crear tu orden',
           // al hacer check, vamos a establecer una variable y al darle aceptar preguntamos si esa varibale esta definida si esta se continua
           buttons: [

             {
               text: 'aceptar',
               handler: () => {

                 this.ngOnInit();

               }
             }
           ]
         });

         await alert.present();





       } else {
         this.auth.seleccionarServicioCarro();
         this.auth.sendFormularioPagos(this.FormSend.value);
         this.router.navigate(['/resumen-pagos']);


       }




   }

  ngOnInit() {
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
    this.auth.seleccionarSliderPagos().subscribe(res =>{
      console.log(res, ' aqui slider');
     this.slider=res[0]['field_imagen_pagos'];

      console.log(this.slider);




    });
    this.auth.getListLocaciones().subscribe(data=>{
      console.log(data);
      this.locaciones=data;
          },async error=>{

            console.log(error);
            const alert = await this.alertController.create({

              header: 'Error de locación ',

              message: 'Su locación no tiene barrios asignados.',
              buttons: [{
                text:'aceptar',
                handler:()=>{

                  this.auth.logout();
                }
              }],

            });

            await alert.present();
            return;

          });

    Swiper.use([Pagination,Navigation,EffectFade,Virtual]);


  }
  regionOrigen(event: any) {
    //reset - destino
    console.log('regionOrigen');
    this.FormSend.controls.field_locacion_destino.setValue('');
 this.locacion = event.detail.value;
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

      // Si hay un solo barrio y no es "San Andrés"
      if (this.direccion.length === 1 && this.direccion[0]['name'] !== 'San Andrés') {
        // Estableciendo información en input
        this.FormSend.controls.field_locacion_entrega.setValue(this.direccion[0]['name']);
        this.FormSend.controls.field_barrio_origen.setValue(this.direccion[0]['name']);

        localStorage.setItem('zona_origen', this.direccion[0].field_zona_a);
        console.log('selected----> origen', this.direccion[0].field_zona_a);

        this.ocultarInputOrigen = true;
        this.disabledValueOrigen = true;

        // Variables de local storage
        localStorage.setItem('tarifaOrigen', this.direccion[0].field_tarifa_externa);
        localStorage.setItem('imgBarrioOrigen', this.direccion[0].field_imagen_barrio);
        localStorage.setItem('longitudOrigen', this.direccion[0].field_longitud);
        localStorage.setItem('latitudOrigen', this.direccion[0].field_latitud);
        localStorage.setItem('valorDeterminanteLONG', this.direccion[0].field_longitud_1);
        localStorage.setItem('valorDeterminanteLAT', this.direccion[0].field_latitud_1);

        // Ocultando campo de barrio origen
        document.getElementById('itemOrigen').style.visibility = "hidden"; // hide
/*
        // Estableciendo información para destino
        this.FormSend.controls.field_locacion_destino.setValue(this.direccion[0]['name']);
        this.FormSend.controls.field_barrio_destino.setValue(this.direccion[0]['name']);
        localStorage.setItem('tarifaDestino', this.direccion[0].field_tarifa);
        localStorage.setItem('imgBarrioDestino', this.direccion[0].field_imagen_barrio);
*/
      // Si el barrio es "San Andrés"
      } else if (this.direccion.length === 1 && this.direccion[0]['name'] === 'San Andrés') {
        console.log('Es San Andrés');
        this.FormSend.controls.field_locacion_entrega.setValue(this.direccion[0]['name']);
        localStorage.setItem('zona_origen', this.direccion[0]['field_zona_a']);
        console.log('selected----> origen', this.direccion[0]['field_zona_a']);

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

      // Si hay más de un barrio
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
          handler: () => {
            // Manejar evento después de aceptar
          }
        }],
      });
      await alert.present();
    }
  }

  region(event: any){
this.locacion = event.detail.value;
    console.log(this.locacion);
    if(event!=''){
      localStorage.setItem('locacionDestinoSeleccionada',event);
      this.auth.locacion=event;

      this.willEnter();

    }

  }


async willEnter() {
  try {
    const data = await this.auth.getListBarriosSeleccion().toPromise();
    this.direccionDestino = data;

    // Si hay un solo barrio
    if (this.direccionDestino.length === 1) {
      this.FormSend.controls.field_barrio_destino.setValue(this.direccionDestino[0]['name']);

      localStorage.setItem('zona_destino', this.direccion[0].field_zona_a);
      console.log('selected----> destino', this.direccion[0].field_zona_a);
      localStorage.setItem('tarifaDestino', this.direccionDestino[0]['field_tarifa']);
      localStorage.setItem('tarifaExternaDestino', this.direccionDestino[0]['field_tarifa_externa']);
      localStorage.setItem('imgBarrioDestino', this.direccionDestino[0]['field_imagen_barrio']);

      this.ocultarInput = true;
      this.bloquearInputBarrioDestino = true;
      document.getElementById('itemOrigen').style.visibility = "hidden"; // hide

    // Si el barrio es "San Andrés"
    } else if (this.direccionDestino.length === 1 && this.direccionDestino[0]['name'] === 'San Andrés') {
      this.FormSend.controls.field_barrio_destino.setValue(this.direccionDestino[0]['name']);
      localStorage.setItem('tarifaDestino', this.direccionDestino[0].field_tarifa);
      localStorage.setItem('imgBarrioDestino', this.direccionDestino[0]['field_imagen_barrio']);

      this.ocultarInput = true;
      this.bloquearInputBarrioDestino = true;
      document.getElementById('itemOrigen').style.visibility = "hidden"; // hide

    // Si hay más de un barrio
    } else {
      this.FormSend.controls.field_barrio_destino.setValue('');
      this.ocultarInput = false;
      this.bloquearInputBarrioDestino = false;
      document.getElementById('itemOrigen').style.visibility = "visible"; // show
    }

  } catch (error) {
    console.log(error);
    const alert = await this.alertController.create({
      header: 'Error de locación',
      message: 'Su locación no tiene barrios asignados.',
      buttons: [{
        text: 'Aceptar',
        handler: () => {
          // Manejar evento después de aceptar
        }
      }],
    });
    await alert.present();
  }
}

  ngOnDestroy() {

    console.log("Sencilla- OnDestroy")
  }

}
