import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

import { AlertController, MenuController } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth.service';
import { environment } from 'src/environments/environment';
import Swiper, { EffectFade, Navigation, Pagination, Virtual } from 'swiper';
import { SwiperComponent } from 'swiper/angular';
import { ToastController } from '@ionic/angular';




@Component({
  selector: 'app-llaves',
  templateUrl: './llaves.page.html',
  styleUrls: ['./llaves.page.scss'],
})
export class LlavesPage implements OnInit {
  @ViewChild('swiper', { static: false }) swiper?: SwiperComponent;

  public swiperConfig={
    Virtual: true,
    //slidesPerView: 2,
    navigation: true,
    //pagination: { type:'fraction'},
    allowTouchMove: false,
    EffectFade:true

  };
 currentIndex = 0;
  public items: {name: string}[] = [];
  public items2: {name: string}[] = [];
  public readonly form: FormGroup = new FormGroup({

  });
 permitirPagoEfectivo;
  FormSend: FormGroup;
  slider:any=[];
  AuxCarrosDisponibles:any=[];
  AuxMotosDisponibles:any=[];
  AuxDisponiblesMunicipios:any=[];
  urlBase:any;
  value:any;
  ciudades:any[];
  barrio: any;
  direccion :any[];
  locaciones :any[];
  tarifa: any;
  disabledValue: boolean;
  ocultarInput: any;
  locacion: any;
  direccionDestino: any;
  ocultarInputOrigen: boolean;
  disabledValueOrigen: boolean;
  bloquearInputBarrio: boolean=true;
  bloquearInputBarrioDestino: boolean=true;
  message_LLaves: any;

  constructor(private toastController: ToastController, private menucontrol: MenuController, private router: Router, private auth: AuthService, public fb: FormBuilder, public alertController: AlertController) {
    localStorage.setItem('servicioEvaluado','llaves'+this.auth.medioTransporte);
    this.menucontrol.enable(false);
    this.urlBase=environment.urlBase;
    this.FormSend= this.fb.group({
      field_barrio_origen:[""],
      field_barrio_destino:[""],
 field_direccion_entrega:[""],


field_contacto:[""],

field_locacion_entrega:[""],
field_locacion_destino:[""],



field_direccion_destino:[""],


field_ida_y_vuelta:[false],




field_medio_de_transporte:[""],

field_metodo_de_pago:[''],

field_url_imagen_destino:[''],
field_url_imagen_origen:[''],
field_longitud_origen:[''],
field_latitud_origen_:[''],

field_nombre_c_origen:[''],



     });

   }


   async slideNext(){





    console.log(this.FormSend.value['field_barrio_origen']);
   // console.log(this.FormSend.value['field_barrio_destino']);
    console.log(this.direccion)
   var barrioExiste= new Boolean();
   if(this.direccion != undefined){
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


}else{
  const alert = await this.alertController.create({

    header: 'Error ',

    message: ' Debes seleccionar tu locacion y barrio de la lista',
    // al hacer check, vamos a establecer una variable y al darle aceptar preguntamos si esa varibale esta definida si esta se continua
    buttons: [
    {
      text:'aceptar',

    }]
  });

  await alert.present();

}

  }
  iraIndex(){
    this.router.navigate(['/tabs']);
  }

  async slideNext2(){





    console.log(this.FormSend.value['field_barrio_destino']);
   // console.log(this.FormSend.value['field_barrio_destino']);
   console.log(this.direccionDestino);
   var barrioExiste= new Boolean();
   if(this.direccionDestino != undefined){
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

}else{
  const alert = await this.alertController.create({

    header: 'Error ',

    message: ' Debes seleccionar tu locacion y barrio de la lista',
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
   async inputChanged($event): Promise<void> {
    //this.bloquearInputBarrio=true;
    // récupération de la valeur saisie
this.value = $event.target.value as string;
    // vider la list si le champ de saisie est vide
    if (this.value.length <= 0) {
      this.items = [];
      return; // stoper l'exection du script
    }

    // récupération de la liste de posibilités
    const list = this.direccion;
    console.log(list,'list b1')
    // filtrer la list pour extraire uniquement les element pertinants
    const items = list.filter(
      item => item.name.toLocaleLowerCase().includes(this.value.toLocaleLowerCase())
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
    console.log(list,'list b2')
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
    localStorage.setItem('tarifaOrigen',item.field_tarifa);

    console.log('selected----> origin', item.field_zona_a);

    localStorage.setItem('zona_origen', item.field_zona_a);

    localStorage.setItem('tarifaExternaOrigen',item.field_tarifa_externa);

    localStorage.setItem('imgBarrioOrigen',item.field_imagen_barrio);
    localStorage.setItem('longitudOrigen',item.field_longitud);
    localStorage.setItem('latitudOrigen',item.field_latitud);

    localStorage.setItem('valorDeterminanteLONG',item.field_longitud_1);
    localStorage.setItem('valorDeterminanteLAT',item.field_latitud_1);
    this.FormSend.controls.field_url_imagen_origen.setValue(item.field_imagen_barrio);
    this.FormSend.controls.field_longitud_origen.setValue(item.field_longitud);
    this.FormSend.controls.field_latitud_origen_.setValue(item.field_latitud);
    console.log('selected----> long y lat',item.field_longitud,item.field_latitud);


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
    localStorage.setItem('tarifaDestino',item.field_tarifa);
    this.FormSend.controls.field_url_imagen_destino.setValue(item.field_imagen_barrio);
    localStorage.setItem('imgBarrioDestino',item.field_imagen_barrio);
    // tarifa externa
    localStorage.setItem('tarifaExternaDestino',item.field_tarifa_externa);
    console.log('selected----> destination', item.field_zona_a);
    localStorage.setItem('zona_destino',item.field_zona_a);
    // mettre à jour le formuaire
    this.FormSend.patchValue({item});
    // cacher la liste d'items en vidant la liste
    this.items2 = [];
   // console.log('selected---->',this.FormSend.value['barrioOrigen']);

   input2.value = item.name;
   this.FormSend.controls.field_barrio_destino.setValue(item.name);
  }

   openResumen(){

    this.auth.sendFormulario(this.FormSend.value);




   }
   async sendForm() {
    console.log('Hasta aquí medio transporte', this.auth.medioTransporte);

    // Asignar medio de transporte
    this.FormSend.controls.field_medio_de_transporte.setValue(this.auth.medioTransporte);

    console.log('Formulario:', this.FormSend.value);

    // Si el formulario es inválido, muestra una alerta y detiene el proceso
    if (this.FormSend.invalid) {
      const alert = await this.alertController.create({
        header: 'Datos incompletos',
        message: 'Por favor, completa todos los datos.',
        buttons: ['Aceptar']
      });
      await alert.present();
      return;
    }

    // Verificar disponibilidad según el medio de transporte
    if (this.auth.medioTransporte === 1 && this.AuxMotosDisponibles.length === 0) {
      // Si el medio de transporte es moto y no hay motos disponibles
      const alert = await this.alertController.create({
        header: 'Advertencia',
        message: 'En este momento no tenemos auxiliar disponible en moto, no podemos crear tu orden.',
        buttons: ['Aceptar']
      });
      await alert.present();
      return; // No envía los datos si no hay motos
    }

    if (this.auth.medioTransporte === 2 && this.AuxCarrosDisponibles.length === 0) {
      // Si el medio de transporte es carro y no hay carros disponibles
      const alert = await this.alertController.create({
        header: 'Advertencia',
        message: 'En este momento no tenemos auxiliar disponible en carro, no podemos crear tu orden.',
        buttons: ['Aceptar']
      });
      await alert.present();
      return; // No envía los datos si no hay carros
    }

    // Enviar formulario y redirigir
    try {
      await this.auth.sendFormularioLlaves(this.FormSend.value);
      console.log('Formulario enviado correctamente');
      this.router.navigate(['/resumen-llaves']);
    } catch (error) {
      console.error('Error al enviar formulario:', error);
    }
  }


  getImageSource(): string {
    if (this.auth.medioTransporte === 1) {
      return "../../assets/banners/llaves_motos.gif";
    } else if (this.auth.medioTransporte === 2) {
      return "../../assets/banners/llaves_carros.gif";
    } else {
      return "../../assets/banners/IMG_6453_gif.GIF"; // Default image
    }
  }


getValoresDeterminantesAuxiliar(){

}
async ngOnInit() {

  this.auth.getMessageLLaves().subscribe(async data => {
    this.message_LLaves = data[0]['body'];
    console.log(data, 'Data received in component');

    // Crear y mostrar la alerta después de recibir los datos
    const alert = await this.alertController.create({
      header: 'Importante',
      message: this.message_LLaves || 'No se recibió el mensaje de la API', // Muestra un mensaje por defecto si no hay datos
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

      this.auth.seleccionarSliderSencillas().subscribe(res =>{
        console.log(res, ' aqui slider');
       this.slider=res[0]['field_imagen_sencilla'];

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

  async presentToast() {
    const toast = await this.toastController.create({
      message: 'Este es un mensaje de ejemplo.',
      duration: 2000, // La duración del toast en milisegundos
      position: 'top', // Puedes usar 'top', 'bottom', o 'middle'
      cssClass: 'custom-toast', // Clase CSS opcional para estilo personalizado
    });
    toast.present();
  }

  ionViewWillEnter(){
    //this.auth.medioTransporte=1;
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
        this.FormSend.controls.field_url_imagen_origen.setValue(this.direccion[0].field_imagen_barrio);
        this.FormSend.controls.field_longitud_origen.setValue(this.direccion[0].field_longitud);
        this.FormSend.controls.field_latitud_origen_.setValue(this.direccion[0].field_latitud);
        console.log('selected----> origin', this.direccion[0].field_zona_a);

        localStorage.setItem('zona_origen',this.direccion[0].field_zona_a);
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

        // Configurar información en el campo de destino

        localStorage.setItem('tarifaDestino', this.direccion[0].field_tarifa);
        this.FormSend.controls.field_url_imagen_destino.setValue(this.direccion[0].field_imagen_barrio);
        localStorage.setItem('imgBarrioDestino', this.direccion[0].field_imagen_barrio);

      } else if (this.direccion.length === 1 && this.direccion[0]['name'] === 'San Andrés') {
        console.log('es San Andrés');
        // Configurar información en el formulario
        this.FormSend.controls.field_locacion_entrega.setValue(this.direccion[0]['name']);
        this.FormSend.controls.field_barrio_origen.setValue(this.direccion[0]['name']);



        console.log('selected----> origin', this.direccion[0].field_zona_a);

        localStorage.setItem('zona_origen',this.direccion[0].field_zona_a);

        // Configurar Local Storage
        localStorage.setItem('tarifaOrigen', this.direccion[0]['field_tarifa']);
        localStorage.setItem('imgBarrioOrigen', this.direccion[0]['field_imagen_barrio']);
        localStorage.setItem('longitudOrigen', this.direccion[0]['field_longitud']);
        localStorage.setItem('latitudOrigen', this.direccion[0]['field_latitud']);
        localStorage.setItem('valorDeterminanteLONG', this.direccion[0]['field_longitud_1']);
        localStorage.setItem('valorDeterminanteLAT', this.direccion[0]['field_latitud_1']);
        this.FormSend.controls.field_url_imagen_origen.setValue(this.direccion[0]['field_imagen_barrio']);
        this.FormSend.controls.field_longitud_origen.setValue(this.direccion[0]['field_longitud']);
        this.FormSend.controls.field_latitud_origen_.setValue(this.direccion[0]['field_latitud']);

        this.ocultarInputOrigen = true;
        this.disabledValueOrigen = true;

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

  regionDestino(event){
    this.locacion= event;
    console.log(event);
    if(event!=''){
      this.auth.locacion=event;
      localStorage.setItem('locacionDestinoSeleccionada',event);

      this.WillEnter();

    }

  }

  async WillEnter() {
    try {
      // Obtener los datos de barrios
      const data = await this.auth.getListBarriosSeleccion().toPromise();
      this.direccionDestino = data;

      console.log(this.direccionDestino, 'direccionDestino');

      // Procesar la lógica según la longitud y el nombre del barrio
      if (this.direccionDestino.length === 1 && this.direccionDestino[0]['name'] !== 'San Andrés') {
        // Configurar información en el formulario
        this.FormSend.controls.field_barrio_destino.setValue(this.direccionDestino[0]['name']);
        localStorage.setItem('tarifaDestino', this.direccionDestino[0]['field_tarifa']);
        localStorage.setItem('tarifaExternaDestino', this.direccionDestino[0]['field_tarifa_externa']);
        this.FormSend.controls.field_url_imagen_destino.setValue(this.direccionDestino[0]['field_imagen_barrio']);
        localStorage.setItem('imgBarrioDestino', this.direccionDestino[0]['field_imagen_barrio']);

        console.log('selected----> destination', this.direccionDestino[0]['field_zona_a']);
        localStorage.setItem('zona_destino',  this.direccionDestino[0]['field_zona_a']);

        // Configurar estados de visibilidad y bloqueo
        this.ocultarInput = true;
        this.bloquearInputBarrioDestino = true;
        document.getElementById('itemOrigen').style.visibility = "hidden"; // Ocultar
      } else if (this.direccionDestino.length === 1 && this.direccionDestino[0]['name'] === 'San Andrés') {
        console.log('Es San Andrés');
        this.FormSend.controls.field_barrio_destino.setValue(this.direccionDestino[0]['name']);
        localStorage.setItem('tarifaDestino', this.direccionDestino[0].field_tarifa);
        this.FormSend.controls.field_url_imagen_destino.setValue(this.direccionDestino[0]['field_imagen_barrio']);
        localStorage.setItem('imgBarrioDestino', this.direccionDestino[0]['field_imagen_barrio']);

        console.log('selected----> destination', this.direccionDestino[0]['field_zona_a']);
        localStorage.setItem('zona_destino', this.direccionDestino[0]['field_zona_a']);

        // Configurar estados de visibilidad y bloqueo
        this.ocultarInput = true;
        this.bloquearInputBarrioDestino = true;
        document.getElementById('itemOrigen').style.visibility = "hidden"; // Ocultar
      } else if (this.direccionDestino.length > 0) {
        // Cuando hay más de un barrio
        this.FormSend.controls.field_barrio_destino.setValue('');
        this.ocultarInput = false;
        this.bloquearInputBarrioDestino = false;
        console.log('selected----> destination', this.direccionDestino[0]['field_zona_a']);
        localStorage.setItem('zona_destino',  this.direccionDestino[0]['field_zona_a']);
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




  ngOnDestroy() {

    console.log("Sencilla- OnDestroy")
  }
}
