import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController, MenuController } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth.service';
import { environment } from 'src/environments/environment';
import Swiper, { EffectFade, Navigation, Pagination, Virtual } from 'swiper';
import { SwiperComponent } from 'swiper/angular';

@Component({
  selector: 'app-tecnologia',
  templateUrl: './tecnologia.page.html',
  styleUrls: ['./tecnologia.page.scss'],
})
export class TecnologiaPage implements OnInit {
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
  locaciones :any[];
  FormSend: FormGroup;
  barrio: any;
  direccion :any[];
  direccionDestino: any;
  disabledValue: boolean;
  ocultarInput: boolean;
  locacion: any;
  precioArticulos: number;
  public cantidadArticulos:number =1;
bloquearInputBarrio: boolean=true;
bloquearInputBarrioDestino: boolean=true;
  ocultarInputOrigen: boolean;
  disabledValueOrigen: boolean;
  message_tecnologia: string;
  constructor(private menucontrol: MenuController, private router: Router, private auth: AuthService, public fb: FormBuilder, public alertController: AlertController) {

    this.menucontrol.enable(false);
    localStorage.setItem('servicioEvaluado','compras');
    this.urlBase=environment.urlBase;
    this.FormSend= this.fb.group({
      field_locacion_entrega:[""],
      field_locacion_destino:[""],

      field_prefijo_origen:[""],
      field_prefijo_destino:[""],
      field_direccion_destino:[""],
      field_direccion_entrega:[""],
      field_nombre_del_establecimiento:[""],




field_contacto_destino:[""],
field_contacto:[""],

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

   async slideNext(){



    if( this.AuxMotosDisponibles['length']==0){
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

  iraIndex(){
    this.router.navigate(['/tabs']);
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
    console.log(this.direccion, 'antes de');
    const list = this.direccionDestino;
    console.log(list, 'list');

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
    console.log('selected---->origen',item.field_zona_a);
    localStorage.setItem('zona_origen', item.field_zona_a);

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

    console.log('selected---->', item.name);
    console.log('selected---->destino',item.field_zona_a);

    localStorage.setItem('zona_destino', item.field_zona_a);
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

  async sendForm() {
     console.log("enviando");
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
this.auth.sendFormularioTecnologias(this.FormSend.value);
this.router.navigate(['/resumen-tecnologia']);

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

    this.auth.getMessageTecnologia().subscribe(async data => {
      this.message_tecnologia = data[0]['body'];
      console.log(data, 'Data received in component');

      // Crear y mostrar la alerta después de recibir los datos
      const alert = await this.alertController.create({
        header: 'Importante',
        message: this.message_tecnologia || 'No se recibió el mensaje de la API', // Muestra un mensaje por defecto si no hay datos
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
    this.auth.seleccionarSliderTecnologia().subscribe(res =>{
      console.log(res, ' aqui slider');
     this.slider=res[0]['field_imagen_tecnologia'];

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
      // Obtener los datos de barrios
      const data = await this.auth.getListBarriosSeleccion().toPromise();
      this.direccion = data;

      console.log(this.direccion, 'direccion');
      this.bloquearInputBarrio = false;
      console.log(this.direccion.length);

      // Procesar la lógica según la longitud y el nombre del barrio
      if (this.direccion.length === 1 && this.direccion[0]['name'] !== 'San Andrés') {
        // Configurar información en el formulario
        this.FormSend.controls.field_locacion_entrega.setValue(this.direccion[0]['name']);
        this.FormSend.controls.field_barrio_origen.setValue(this.direccion[0]['name']);


        console.log('selected----> origin',this.direccion[0]['field_zona_a']);

        // localStorage.setItem('zona_origen',this.direccion[0].field_zona_a);
        localStorage.setItem('zona_origen', this.direccion[0]['field_zona_a']);

        // Configurar Local Storage
        localStorage.setItem('tarifaOrigen', this.direccion[0].field_tarifa_externa);
        localStorage.setItem('imgBarrioOrigen', this.direccion[0].field_imagen_barrio);
        localStorage.setItem('longitudOrigen', this.direccion[0].field_longitud);
        localStorage.setItem('latitudOrigen', this.direccion[0].field_latitud);
        localStorage.setItem('valorDeterminanteLONG', this.direccion[0].field_longitud_1);
        localStorage.setItem('valorDeterminanteLAT', this.direccion[0].field_latitud_1);


        // Ocultar campo de barrio origen y deshabilitar el campo de locación origen
        this.ocultarInputOrigen = true;
        this.disabledValueOrigen = true;
        document.getElementById('itemOrigen').style.visibility = "hidden"; // Ocultar
/*
        // Configurar información en el campo de destino
        this.FormSend.controls.field_locacion_destino.setValue(this.direccion[0]['name']);
        this.FormSend.controls.field_barrio_destino.setValue(this.direccion[0]['name']);
        localStorage.setItem('tarifaDestino', this.direccion[0].field_tarifa);
        localStorage.setItem('imgBarrioDestino', this.direccion[0].field_imagen_barrio);*/

      } else if (this.direccion.length === 1 && this.direccion[0]['name'] === 'San Andrés') {
        console.log('es San Andrés');
        // Configurar información en el formulario
        this.FormSend.controls.field_locacion_entrega.setValue(this.direccion[0]['name']);
        this.FormSend.controls.field_barrio_origen.setValue(this.direccion[0]['name']);

        console.log('selected----> origin',this.direccion[0]['field_zona_a']);

       // localStorage.setItem('zona_origen',this.direccion[0].field_zona_a);
        localStorage.setItem('zona_origen',this.direccion[0]['field_zona_a']);
        // Configurar Local Storage
        localStorage.setItem('tarifaOrigen', this.direccion[0]['field_tarifa']);
        localStorage.setItem('imgBarrioOrigen', this.direccion[0]['field_imagen_barrio']);
        localStorage.setItem('longitudOrigen', this.direccion[0]['field_longitud']);
        localStorage.setItem('latitudOrigen', this.direccion[0]['field_latitud']);
        localStorage.setItem('valorDeterminanteLONG', this.direccion[0]['field_longitud_1']);
        localStorage.setItem('valorDeterminanteLAT', this.direccion[0]['field_latitud_1']);

        this.ocultarInputOrigen = true;
        this.disabledValueOrigen = true;
        // document.getElementById('itemOrigen').style.visibility = "hidden"; // Ocultar si es necesario

      } else if (this.direccion.length > 0) {
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
            // Manejar evento después de aceptar si es necesario
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
    // Obtener los datos de barrios
    this.direccionDestino = await this.auth.getListBarriosSeleccion().toPromise();

    console.log(this.direccionDestino, 'direccionDestino');

    // Procesar la lógica según la longitud y el nombre del barrio
    if (this.direccionDestino.length === 1 && this.direccionDestino[0]['name'] !== 'San Andrés') {
      // Si hay un solo barrio y no es San Andrés
      this.FormSend.controls.field_barrio_destino.setValue(this.direccionDestino[0]['name']);
      localStorage.setItem('tarifaDestino', this.direccionDestino[0]['field_tarifa']);
      localStorage.setItem('tarifaExternaDestino', this.direccionDestino[0]['field_tarifa_externa']);
      localStorage.setItem('imgBarrioDestino', this.direccionDestino[0]['field_imagen_barrio']);

      console.log('selected----> zona destino', this.direccionDestino[0]['field_zona_a']);

      localStorage.setItem('zona_destino',this.direccionDestino[0]['field_zona_a']);

      this.ocultarInput = true;
      this.bloquearInputBarrioDestino = true;
      document.getElementById('itemOrigen').style.visibility = "hidden"; // Ocultar
    } else if (this.direccionDestino.length === 1 && this.direccionDestino[0]['name'] === 'San Andrés') {
      // Si hay un solo barrio y es San Andrés
      this.FormSend.controls.field_barrio_destino.setValue(this.direccionDestino[0]['name']);
      localStorage.setItem('tarifaDestino', this.direccionDestino[0]['field_tarifa']);
      localStorage.setItem('imgBarrioDestino', this.direccionDestino[0]['field_imagen_barrio']);
      this.ocultarInput = true;

      console.log('selected----> destination', this.direccionDestino[0]['field_zona_a']);
      localStorage.setItem('zona_destino', this.direccionDestino[0]['field_zona_a']);

      this.bloquearInputBarrioDestino = true;
      document.getElementById('itemOrigen').style.visibility = "hidden"; // Ocultar
    } else if (this.direccionDestino.length > 1) {
      // Si hay más de un barrio
      this.FormSend.controls.field_barrio_destino.setValue('');
      this.ocultarInput = false;
      this.bloquearInputBarrioDestino = false;
      console.log('selected----> destination', this.direccionDestino[0]['field_zona_a']);
      localStorage.setItem('zona_destino',this.direccionDestino[0]['field_zona_a']);
      document.getElementById('itemOrigen').style.visibility = "visible"; // Mostrar
    }
  } catch (error) {
    console.log(error);
    const alert = await this.alertController.create({
      header: 'Error de locación',
      message: 'Su locación no tiene barrios asignados.',
      buttons: [{
        text: 'Aceptar',
        handler: () => {}
      }]
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
