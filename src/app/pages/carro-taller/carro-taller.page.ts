import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController, MenuController } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth.service';
import { environment } from 'src/environments/environment';
import Swiper, { EffectFade, Navigation, Pagination, Virtual } from 'swiper';
import { SwiperComponent } from 'swiper/angular';

@Component({
  selector: 'app-carro-taller',
  templateUrl: './carro-taller.page.html',
  styleUrls: ['./carro-taller.page.scss'],
})
export class CarroTallerPage implements OnInit {
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

  AuxiliaresDisponiblesParaCarroTaller: any = [];

  ciudades:any[];

  slider:any=[];
  urlBase:any;
  locaciones :any[];
  FormSend: FormGroup;
  barrio: any;
  direccion :any[];
  disabledValue: boolean;
  ocultarInput: boolean;
  ocultarInputOrigen: boolean;
  disabledValueOrigen: boolean;
  bloquearInputBarrio: boolean=true;
  locacion: any;
  imagenLista: boolean;
  constructor(private menucontrol: MenuController, private router: Router, private auth: AuthService, public fb: FormBuilder, public alertController: AlertController) {
    localStorage.setItem('servicioEvaluado','carrotaller');
    this.menucontrol.enable(false);
    this.urlBase=environment.urlBase;
    this.FormSend= this.fb.group({

 field_direccion_entrega:[""],

field_contacto:[""],
field_observaciones:[""],
field_locacion_entrega:[""],
field_prefijo_origen:[ ""],

field_metodo_de_pago:[''],
field_barrio_origen:[""],
field_nombre_c_origen:[''],
field_url_imagen_origen:[''],
field_longitud_origen:[''],
field_latitud_origen_:['']


     });

   }

   imagenCargada(event: boolean) {
    this.imagenLista = event;
  }


   async slideNext(){

  // getAuxiliaresDisponiblesParaCarroTaller

    if(this.AuxiliaresDisponiblesParaCarroTaller === 0){
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
    console.log(this.direccion,'antes de')
    const list = this.direccion;
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

  selected(item, input): void {
    console.log('selected---->',item.name);
    localStorage.setItem('tarifaOrigen',item.field_tarifa);
    localStorage.setItem('zona_origen', item.field_zona_a);
    localStorage.setItem('imgBarrioOrigen',item.field_imagen_barrio);
    localStorage.setItem('longitudOrigen',item.field_longitud);
    localStorage.setItem('latitudOrigen',item.field_latitud);

    localStorage.setItem('valorDeterminanteLONG',item.field_longitud_1);
    localStorage.setItem('valorDeterminanteLAT',item.field_latitud_1);
    this.FormSend.controls.field_url_imagen_origen.setValue(item.field_imagen_barrio);
    this.FormSend.controls.field_longitud_origen.setValue(item.field_longitud);
    this.FormSend.controls.field_latitud_origen_.setValue(item.field_latitud);
    // vider la valeur du champ de saisie

    // mettre à jour le formuaire
    this.FormSend.patchValue({item});
    // cacher la liste d'items en vidant la liste
    this.items = [];
   // console.log('selected---->',this.FormSend.value['barrioOrigen']);

    input.value = item.name;
    this.FormSend.controls.field_barrio_origen.setValue(item.name);
  }


   openResumen(){

    this.auth.sendFormulario(this.FormSend.value);




   }
   iraIndex(){
    this.router.navigate(['/tabs']);
  }
   async sendForm(){
    if(this.FormSend.invalid || this.FormSend.value['field_metodo_de_pago']===''){
      const alert = await this.alertController.create({

        header: 'Datos incompletos ',

        message: 'llenar todos los datos.',
        buttons: ['Aceptar']
      });

      await alert.present();
      return;
    }else{


          if(this.AuxiliaresDisponiblesParaCarroTaller['length'] === 0){

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

          }else{

            this.auth.sendFormularioCarrotaller(this.FormSend.value);
      this.router.navigate(['/resumen-carrotaller']);
             //this.router.navigate(['/resumen']);

          }
        }
      }


  ngOnInit() {
    this.permitirPagoEfectivo=localStorage.getItem('permitirPagoefectivo');
    this.auth.getCiudad().subscribe(res =>{
      console.log(res, ' ciudad');
      this.ciudades=res;

    });

    this.auth.getAuxiliaresDisponiblesParaCarroTaller().subscribe(res =>{
      console.log(res, ' aqui carro');
      this.AuxiliaresDisponiblesParaCarroTaller=res;

    });


    this.auth.seleccionarSliderCarroTaller().subscribe(res =>{
      console.log(res, ' aqui slider');
     this.slider=res[0]['field_imagen_taller_slider_1'];

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
      // Obtener los datos de barrios origen
      const data = await this.auth.getListBarriosSeleccion().toPromise();
      console.log(data);

      this.direccion = data;

      console.log(this.direccion, 'direccion');
      console.log(this.direccion.length);

      this.bloquearInputBarrio = false;

      // Si hay solo un barrio
      if (this.direccion.length === 1 && this.direccion[0]['name'] !== 'San Andrés') {
        const barrio = this.direccion[0];
        this.FormSend.controls.field_locacion_entrega.setValue(barrio['name']);
        this.FormSend.controls.field_barrio_origen.setValue(barrio['name']);

        this.ocultarInputOrigen = true;
        this.disabledValueOrigen = true;

        // Establecer información en localStorage
        localStorage.setItem('tarifaOrigen', barrio['field_tarifa_externa']);
        localStorage.setItem('imgBarrioOrigen', barrio['field_imagen_barrio']);
        localStorage.setItem('longitudOrigen', barrio['field_longitud']);
        localStorage.setItem('latitudOrigen', barrio['field_latitud']);
        localStorage.setItem('valorDeterminanteLONG', barrio['field_longitud_1']);
        localStorage.setItem('valorDeterminanteLAT', barrio['field_latitud_1']);


        console.log('selected----> origin',barrio['field_zona_a']);

        localStorage.setItem('zona_origen',barrio['field_zona_a']);


        // Ocultar el campo de barrio
        document.getElementById('itemOrigen').style.visibility = "hidden"; // Ocultar

      } else if (this.direccion.length === 1 && this.direccion[0]['name'] === 'San Andrés') {
        const barrio = this.direccion[0];
        this.FormSend.controls.field_locacion_entrega.setValue(barrio['name']);
        this.FormSend.controls.field_barrio_origen.setValue(barrio['name']);

        // Establecer información en localStorage
        localStorage.setItem('tarifaOrigen', barrio['field_tarifa']);
        localStorage.setItem('imgBarrioOrigen', barrio['field_imagen_barrio']);
        localStorage.setItem('longitudOrigen', barrio['field_longitud']);
        localStorage.setItem('latitudOrigen', barrio['field_latitud']);
        localStorage.setItem('valorDeterminanteLONG', barrio['field_longitud_1']);
        localStorage.setItem('valorDeterminanteLAT', barrio['field_latitud_1']);
        console.log('selected----> origin',barrio['field_zona_a']);

        localStorage.setItem('zona_origen',barrio['field_zona_a']);
        this.ocultarInputOrigen = true;
        this.disabledValueOrigen = true;

        // No ocultar el campo para 'San Andrés'
        // document.getElementById('itemOrigen').style.visibility = "hidden"; // Comentado por ahora

      } else if (this.direccion.length > 1) {
        // Si hay más de un barrio
        this.FormSend.controls.field_barrio_origen.setValue('');
        this.ocultarInputOrigen = false;
        this.disabledValueOrigen = true;

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
            // Manejar el evento después de aceptar si es necesario
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
