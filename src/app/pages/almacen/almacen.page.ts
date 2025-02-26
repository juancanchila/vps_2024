import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController, MenuController } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth.service';
import { environment } from 'src/environments/environment';
import Swiper, { EffectFade, Navigation, Pagination, Virtual } from 'swiper';
import { SwiperComponent } from 'swiper/angular';

@Component({
  selector: 'app-almacen',
  templateUrl: './almacen.page.html',
  styleUrls: ['./almacen.page.scss'],
})
export class AlmacenPage implements OnInit {
  public items: {name: string}[] = [];
  public items2: {name: string}[] = [];
  @ViewChild('swiper', { static: false }) swiper?: SwiperComponent;
  slider:any=[];
  urlBase:any;
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
  precioArticulos: number;
  public cantidadArticulos:number =1;
  locaciones :any[];
  FormSend: FormGroup;
  barrio: any;
  direccion :any[];
  direccionDestino: any;
  disabledValue: boolean;
  ocultarInput: boolean;
  locacion: any;
  ocultarInputOrigen: boolean;
  disabledValueOrigen: boolean;
  bloquearInputBarrio: boolean=true;
  bloquearInputBarrioDestino: boolean=true;
  message_almacen: any;
  imagenLista: boolean;
  constructor(private menucontrol:MenuController,private router: Router, private auth: AuthService, public fb: FormBuilder,public alertController:AlertController) {
    this.menucontrol.enable(false);
    localStorage.setItem('servicioEvaluado','compras');
    this.urlBase=environment.urlBase;
    this.FormSend= this.fb.group({

      field_locacion_entrega:[""],
      field_locacion_destino:[""],
     field_contacto:[""],
      field_direccion_destino:[""],
      field_direccion_entrega:[""],
field_contacto_destino:[""],
field_nombre_del_establecimiento:[""],




field_metodo_de_pago:[''],
field_barrio_origen:[""],
field_barrio_destino:[""],
field_nombre_c_origen:[''],
field_nombre_c_destino:[''],

field_quieres_comprar:[""],
field_valor_declarado:[ ""],
field_observaciones:[""],
//
field_quieres_comprar1:[""],
field_valor_declarado1:[ ""],
field_observaciones1:[""],

field_quieres_comprar2:[""],
field_valor_declarado2:[ ""],
field_observaciones2:[""],

//
field_quieres_comprar3:[""],
field_valor_declarado3:[ ""],
field_observaciones3:[""],
//
field_quieres_comprar4:[""],
field_valor_declarado4:[ ""],
field_observaciones4:[""],
//
field_quieres_comprar5:[""],
field_valor_declarado5:[ ""],
field_observaciones5:[""],
//
field_quieres_comprar6:[""],
field_valor_declarado6:[ ""],
field_observaciones6:[""],

//
field_quieres_comprar7:[""],
field_valor_declarado7:[ ""],
field_observaciones7:[""],
//
field_quieres_comprar8:[""],
field_valor_declarado8:[ ""],
field_observaciones8:[""],

//
field_quieres_comprar9:[""],
field_valor_declarado9:[ ""],
field_observaciones9:[""],

//
field_quieres_comprar10:[""],
field_valor_declarado10:[ ""],
field_observaciones10:[""],



     });

   }

   iraIndex(){
    this.router.navigate(['/tabs']);
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
     console.log(this.direccion)
     if(this.direccion!=undefined){
      var barrioExiste= new Boolean();
      for (var i = 0; i <this.direccion.length; i++) {


        if(this.FormSend.value['field_barrio_origen']==this.direccion[i].name){
          barrioExiste=true;

         this.swiper.swiperRef.slideNext(0);
         document.getElementById('myAnchor').scrollIntoView();
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

     }else{

      const alert = await this.alertController.create({

        header: 'Advertencia',

        message: 'Debes seleccionar tu locacion',
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
    this.precioArticulos=this.FormSend.value['field_valor_declarado1'] +this.FormSend.value['field_valor_declarado2'] + this.FormSend.value['field_valor_declarado3'] + this.FormSend.value['field_valor_declarado4'] + this.FormSend.value['field_valor_declarado5'] + this.FormSend.value['field_valor_declarado6'] + this.FormSend.value['field_valor_declarado7'] + this.FormSend.value['field_valor_declarado8'] + this.FormSend.value['field_valor_declarado9'] + this.FormSend.value['field_valor_declarado10'];
    console.log(this.precioArticulos,'precio');

if( this.precioArticulos>100000){
  const alert = await this.alertController.create({

    header: 'Advertencia',

    message: 'la cantidad de articulos son mayores a 100.000 debe reducir los articulos',
    // al hacer check, vamos a establecer una variable y al darle aceptar preguntamos si esa varibale esta definida si esta se continua
    buttons: [
    {
      text:'aceptar',

    }]
  });

  await alert.present();

}else{


let listaArticulos=
this.FormSend.value['field_quieres_comprar1'] +' : ' + this.FormSend.value['field_valor_declarado1'] +' : '  +this.FormSend.value['field_observaciones1']+' | '
+this.FormSend.value['field_quieres_comprar2']+' : ' + this.FormSend.value['field_valor_declarado2']+' : ' +this.FormSend.value['field_observaciones2'] +' | '
+this.FormSend.value['field_quieres_comprar3']+' : ' + this.FormSend.value['field_valor_declarado3']+' : ' +this.FormSend.value['field_observaciones3']+' | '
+this.FormSend.value['field_quieres_comprar4']+' : ' + this.FormSend.value['field_valor_declarado4'] +this.FormSend.value['field_observaciones4']+' | '
+this.FormSend.value['field_quieres_comprar5']+' : ' + this.FormSend.value['field_valor_declarado5']+' : ' +this.FormSend.value['field_observaciones5']+' | '
+this.FormSend.value['field_quieres_comprar6'] +' : '+ this.FormSend.value['field_valor_declarado6']+' : ' +this.FormSend.value['field_observaciones6'] +' | '
+this.FormSend.value['field_quieres_comprar7']+' : ' + this.FormSend.value['field_valor_declarado7']+' : ' +this.FormSend.value['field_observaciones7'] +' | '
+this.FormSend.value['field_quieres_comprar8'] +' : '+ this.FormSend.value['field_valor_declarado8']+' : ' +this.FormSend.value['field_observaciones8']+' | '
+this.FormSend.value['field_quieres_comprar9']+' : ' + this.FormSend.value['field_valor_declarado9']+' : ' +this.FormSend.value['field_observaciones9']+' | '
+this.FormSend.value['field_quieres_comprar10'] +' : '+ this.FormSend.value['field_valor_declarado10']+' : ' +this.FormSend.value['field_observaciones10']+' | ';
    this.FormSend.controls.field_observaciones.setValue(listaArticulos);

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





  }

  slidePrev(){
    this.swiper.swiperRef.slidePrev(1000);
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
    console.log('selected---->', item.name);

    console.log('selected---->origen', item.field_zona_a);
    localStorage.setItem('zona_origen', item.field_zona_a);


    localStorage.setItem('tarifaOrigen',item.field_tarifa);
    localStorage.setItem('tarifaExternaOrigen',item.field_tarifa_externa);
    localStorage.setItem('imgBarrioOrigen',item.field_imagen_barrio);
    localStorage.setItem('longitudOrigen',item.field_longitud);
    localStorage.setItem('latitudOrigen',item.field_latitud);

    localStorage.setItem('valorDeterminanteLONG',item.field_longitud_1);
    localStorage.setItem('valorDeterminanteLAT',item.field_latitud_1);
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

    console.log('selected---->', item.name);

    console.log('selected---->destino', item.field_zona_a);
    localStorage.setItem('zona_destino', item.field_zona_a);

    localStorage.setItem('tarifaDestino',item.field_tarifa);

    localStorage.setItem('imgBarrioDestino',item.field_imagen_barrio);
    // tarifa externa
    localStorage.setItem('tarifaExternaDestino',item.field_tarifa_externa);

    // mettre à jour le formuaire
    this.FormSend.patchValue({item});
    // cacher la liste d'items en vidant la liste
    this.items2 = [];
   // console.log('selected---->',this.FormSend.value['barrioOrigen']);

   input2.value = item.name;
   this.FormSend.controls.field_barrio_destino.setValue(item.name);
  }

  imagenCargada(event: boolean) {
    this.imagenLista = event;
  }

   async sendForm(){

    if(this.FormSend.value['field_metodo_de_pago']==''){
      const alert = await this.alertController.create({

        header: 'Datos incompletos ',

        message: 'llenar todos los datos.',
        buttons: ['Aceptar']
      });

      await alert.present();
      return;
     }


     if(this.AuxMotosDisponibles.length != 0){
      this.auth.seleccionarServicioMoto();
      this.auth.sendFormularioAlmacen(this.FormSend.value);
      this.router.navigate(['/resumen-almacen']);


    }else{
      const alert = await this.alertController.create({

        header: 'Oops!',

        message: '¡En este momento no tenemos auxiliar disponible!',
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

   }

  ngOnInit() {


    this.auth.getMessageAlmacen().subscribe(async data => {
      this.message_almacen = data[0]['body'];
      console.log(data, 'Data received in component');

      // Crear y mostrar la alerta después de recibir los datos
      const alert = await this.alertController.create({
        header: 'Importante',
        message: this.message_almacen || 'No se recibió el mensaje de la API', // Muestra un mensaje por defecto si no hay datos
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
    this.auth.seleccionarSliderAlmacen().subscribe(res =>{
      console.log(res, ' aqui slider');
     this.slider=res[0]['field_imagen_almacen'];

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


  regionOrigen(event){
    console.log('regionOrigen');
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
      // Obtener los datos de barrios origen
      const data = await this.auth.getListBarriosSeleccion().toPromise();
      this.direccion = data;

      console.log(this.direccion, 'direccion');
      console.log(this.direccion.length);

      this.bloquearInputBarrio = false;

      // Si hay solo un barrio
      if (this.direccion.length === 1) {
        this.FormSend.controls.field_locacion_entrega.setValue(this.direccion[0]['name']);
        this.FormSend.controls.field_barrio_origen.setValue(this.direccion[0]['name']);
        this.ocultarInputOrigen = true;
        this.disabledValueOrigen = true;

        console.log('selected----> origen', this.direccion[0]['field_zona_a']);

        // Variables de local storage
        localStorage.setItem('zona_origen', this.direccion[0]['field_zona_a']);
        localStorage.setItem('tarifaOrigen', this.direccion[0].field_tarifa_externa);
        localStorage.setItem('imgBarrioOrigen', this.direccion[0].field_imagen_barrio);
        localStorage.setItem('longitudOrigen', this.direccion[0].field_longitud);
        localStorage.setItem('latitudOrigen', this.direccion[0].field_latitud);
        localStorage.setItem('valorDeterminanteLONG', this.direccion[0].field_longitud_1);
        localStorage.setItem('valorDeterminanteLAT', this.direccion[0].field_latitud_1);

        // Ocultar campo de barrio
        document.getElementById('itemOrigen').style.visibility = "hidden"; // Ocultar


        localStorage.setItem('tarifaDestino', this.direccion[0].field_tarifa);
        localStorage.setItem('imgBarrioDestino', this.direccion[0].field_imagen_barrio);
      }
      // Si el barrio es 'San Andrés'
      else if (this.direccion.length === 1 && this.direccion[0]['name'] === 'San Andrés') {
        console.log('es san andres');
        this.FormSend.controls.field_locacion_entrega.setValue(this.direccion[0]['name']);
        this.FormSend.controls.field_barrio_origen.setValue(this.direccion[0]['name']);


        console.log('selected----> origen', this.direccion[0]['field_zona_a']);

        // Variables de local storage
        localStorage.setItem('zona_origen', this.direccion[0]['field_zona_a']);
        localStorage.setItem('tarifaOrigen', this.direccion[0]['field_tarifa']);
        localStorage.setItem('imgBarrioOrigen', this.direccion[0]['field_imagen_barrio']);
        localStorage.setItem('longitudOrigen', this.direccion[0]['field_longitud']);
        localStorage.setItem('latitudOrigen', this.direccion[0]['field_latitud']);
        localStorage.setItem('valorDeterminanteLONG', this.direccion[0]['field_longitud_1']);
        localStorage.setItem('valorDeterminanteLAT', this.direccion[0]['field_latitud_1']);

        this.ocultarInputOrigen = true;
        this.disabledValueOrigen = true;
        document.getElementById('itemOrigen').style.visibility = "hidden"; // Ocultar
      }
      // Si hay más de un barrio
      else if (this.direccion.length > 1) {
        this.ocultarInputOrigen = false;
        this.disabledValueOrigen = true;
        this.FormSend.controls.field_barrio_origen.setValue('');
        document.getElementById('itemOrigen').style.visibility = "visible"; // Mostrar
      }
    } catch (error) {
      console.log(error);
      const alert = await this.alertController.create({
        header: 'Error de locación',
        message: 'Su locación no tiene barrios asignados.',
        buttons: [{
          text: 'Aceptar',
          handler: () => {
            // Aquí puedes manejar el evento después de aceptar
          }
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
      // Obtener los datos de barrios destino
      this.direccionDestino = await this.auth.getListBarriosSeleccion().toPromise();

      console.log(this.direccionDestino[0]['name']);
      console.log(this.direccionDestino[0]['field_tarifa_externa']);

      // Si hay solo un barrio
      if (this.direccionDestino.length === 1) {
        this.FormSend.controls.field_barrio_destino.setValue(this.direccionDestino[0]['name']);
        localStorage.setItem('tarifaDestino', this.direccionDestino[0]['field_tarifa']);
        localStorage.setItem('tarifaExternaDestino', this.direccionDestino[0]['field_tarifa_externa']);
        localStorage.setItem('imgBarrioDestino', this.direccionDestino[0]['field_imagen_barrio']);


        console.log('selected----> destino', this.direccion[0]['field_zona_a']);

        // Variables de local storage
        localStorage.setItem('zona_destino', this.direccion[0]['field_zona_a']);

        this.ocultarInput = true;
        this.bloquearInputBarrioDestino = true;
        document.getElementById('itemOrigen').style.visibility = "hidden"; // Ocultar

      }
      // Caso especial para 'San Andrés'
      else if (this.direccionDestino.length === 1 && this.direccionDestino[0]['name'] === 'San Andrés') {
        this.FormSend.controls.field_barrio_destino.setValue(this.direccionDestino[0]['name']);
        localStorage.setItem('tarifaDestino', this.direccionDestino[0]['field_tarifa']);
        localStorage.setItem('imgBarrioDestino', this.direccionDestino[0]['field_imagen_barrio']);

        console.log('selected----> destino', this.direccion[0]['field_zona_a']);

        // Variables de local storage
        localStorage.setItem('zona_destino', this.direccion[0]['field_zona_a']);

        this.ocultarInput = true;
        this.bloquearInputBarrioDestino = true;
        document.getElementById('itemOrigen').style.visibility = "hidden"; // Ocultar

      }
      // Si hay más de un barrio
      else if (this.direccionDestino.length > 1) {
        this.FormSend.controls.field_barrio_destino.setValue('');
        this.ocultarInput = false;
        this.bloquearInputBarrioDestino = false;
        document.getElementById('itemOrigen').style.visibility = "visible"; // Mostrar
      }

    } catch (error) {
      console.log(error);
      const alert = await this.alertController.create({
        header: 'Error de locación',
        message: 'Su locación no tiene barrios asignados.',
        buttons: [{
          text: 'Aceptar',
          handler: () => {
            // Aquí puedes manejar el evento después de aceptar
          }
        }],
      });

      await alert.present();
    }
  }



  async add(){



    if( this.cantidadArticulos<7){

      this.cantidadArticulos+=1;
      //this.destinos.push(this.fb.control(''));



    }

  }

  public deleteNUm(cantidadArticulos : number){
    console.log('hay que quitar');
    console.log(cantidadArticulos);



        if(this.cantidadArticulos>1){
          cantidadArticulos = this.cantidadArticulos= this.cantidadArticulos- 1;
          if(cantidadArticulos==9){

            this.FormSend.controls.field_observaciones10.setValue('');
            this.FormSend.controls.field_valor_declarado10.setValue(0);
            this.FormSend.controls.field_quieres_comprar10.setValue('');




          }else if(cantidadArticulos==8){
            this.FormSend.controls.field_observaciones9.setValue('');
            this.FormSend.controls.field_valor_declarado9.setValue(0);
            this.FormSend.controls.field_quieres_comprar9.setValue('');

          }
          else if(cantidadArticulos==7){
            this.FormSend.controls.field_observaciones8.setValue('');
            this.FormSend.controls.field_valor_declarado8.setValue(0);
            this.FormSend.controls.field_quieres_comprar8.setValue('');

          }
          else if(cantidadArticulos==6){
            this.FormSend.controls.field_observaciones7.setValue('');
            this.FormSend.controls.field_valor_declarado7.setValue(0);
            this.FormSend.controls.field_quieres_comprar7.setValue('');

          }
          else if(cantidadArticulos==5){
            this.FormSend.controls.field_observaciones6.setValue('');
            this.FormSend.controls.field_valor_declarado6.setValue(0);
            this.FormSend.controls.field_quieres_comprar6.setValue('');

          }
          else if(cantidadArticulos==4){
            this.FormSend.controls.field_observaciones5.setValue('');
            this.FormSend.controls.field_valor_declarado5.setValue(0);
            this.FormSend.controls.field_quieres_comprar5.setValue('');

          }
          else if(cantidadArticulos==3){
            console.log(this.cantidadArticulos);
            this.FormSend.controls.field_observaciones4.setValue('');
            this.FormSend.controls.field_valor_declarado4.setValue(0);
            this.FormSend.controls.field_quieres_comprar4.setValue('');

          }
          else if(cantidadArticulos==2){
            console.log(this.cantidadArticulos);
            this.FormSend.controls.field_observaciones3.setValue('');
            this.FormSend.controls.field_valor_declarado3.setValue(0);
            this.FormSend.controls.field_quieres_comprar3.setValue('');

          }
          else if(cantidadArticulos==1){
            console.log(this.cantidadArticulos);
            this.FormSend.controls.field_observaciones2.setValue('');
            this.FormSend.controls.field_valor_declarado2.setValue(0);
            this.FormSend.controls.field_quieres_comprar2.setValue('');

          }

         //document.getElementById(this.aux).remove();

        }


      }
  ngOnDestroy() {

    console.log("Tecnologia- OnDestroy")
  }



}
