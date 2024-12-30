import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController, MenuController } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth.service';
import { environment } from 'src/environments/environment';
import Swiper, { EffectFade, Navigation, Pagination, Virtual } from 'swiper';
import { SwiperComponent } from 'swiper/angular';

@Component({
  selector: 'app-trasteo',
  templateUrl: './trasteo.page.html',
  styleUrls: ['./trasteo.page.scss'],
})
export class TrasteoPage implements OnInit {
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
  AuxCarrosGrandesDisponibles: any;
  direccionDestino: any;
  disabledValue: boolean;
  ocultarInput: boolean;
  locacion: any;
  ocultarInputOrigen: boolean;
  disabledValueOrigen: boolean;
  bloquearInputBarrio: boolean=true;
  bloquearInputBarrioDestino: boolean=true;
  AuxCarrosMedianosDisponibles: any;
  selectedCargaType: string;
  constructor(private menucontrol: MenuController, private router: Router, private auth: AuthService, public fb: FormBuilder, public alertController: AlertController) {
    localStorage.setItem('servicioEvaluado','trasteo');
    this.menucontrol.enable(false);
    this.urlBase=environment.urlBase;
    this.FormSend= this.fb.group({

 field_direccion_entrega:[""],

field_contacto:[""],
field_contacto_destino:[""],

field_locacion_entrega:[""],
field_locacion_destino:[""],

field_direccion_destino:[""],


field_metodo_de_pago:[''],
field_barrio_origen:[""],
field_barrio_destino:[""],
body:[""],
field_nombre_c_origen:[''],
field_nombre_c_destino:[''],







field_observaciones:[""],


field_prefijo_origen:[ ""],
field_prefijo_destino:[ ""],



     });

   }


   async slideNext() {
    // Obtener el valor del radio button seleccionado usando el ID
    const cargaPequena = (document.getElementById('checkbox1') as HTMLInputElement);
    const cargaGrande = (document.getElementById('checkbox2') as HTMLInputElement);

    if (cargaPequena.checked) {
      this.selectedCargaType = cargaPequena.value; // "Carga pequeña"
      this.auth.seleccionarTrasteo(7);

    } else if (cargaGrande.checked) {
      this.selectedCargaType = cargaGrande.value; // "Carga grande"
      this.auth.seleccionarTrasteo(4);

    }

    // Guardar el tipo de carga en el localStorage
    localStorage.setItem('tipoCarga', this.selectedCargaType);
    console.log(this.selectedCargaType);

    console.log(this.auth.medioTransporte,'Seleccionad');
    // Verificar si hay vehículos disponibles según el tipo de carga
    if (this.selectedCargaType === 'Carga pequeña' && this.AuxCarrosMedianosDisponibles['length'] === 0) {
      // No hay vehículos disponibles para carga pequeña
      await this.showAlert('Advertencia', 'En este momento no tenemos carros disponibles para carga pequeña.');
      this.swiper.swiperRef.slidePrev(1000);  // Regresar al slide anterior
      return;  // No continuar con la acción
    } else if (this.selectedCargaType === 'Carga grande' && this.AuxCarrosGrandesDisponibles['length'] === 0) {
      // No hay vehículos disponibles para carga grande
      await this.showAlert('Advertencia', 'En este momento no tenemos carros disponibles para carga grande.');
      this.swiper.swiperRef.slidePrev(1000);  // Regresar al slide anterior
      return;  // No continuar con la acción
    }

    // Si hay vehículos disponibles, verificar el barrio y continuar al siguiente slide
    console.log(this.FormSend.value['field_barrio_origen']);

    let barrioExiste = false;
    for (let i = 0; i < this.direccion.length; i++) {
      if (this.FormSend.value['field_barrio_origen'] === this.direccion[i].name) {
        barrioExiste = true;
        this.swiper.swiperRef.slideNext(1000);  // Avanzar al siguiente slide
        return;
      }
    }

    console.log(barrioExiste);

    // Si no se encuentra el barrio, mostrar un error
    if (!barrioExiste) {
      await this.showAlert('Error de barrios', 'Barrio(s) no identificado, Debes seleccionar tu barrio de la lista');
    }
  }

  async showAlert(header: string, message: string) {
    const alert = await this.alertController.create({
      header,
      message,
      buttons: ['Aceptar']
    });
    await alert.present();
  }

  setCargaType(event: any) {
    console.log('Evento');
    const value = event.target.value;

    if (value === 'Carga pequeña') {
      this.selectedCargaType = 'P';

    } else if (value === 'Carga grande') {
      this.selectedCargaType = 'G';

    }

    // Store in local storage
    localStorage.setItem('tipoCarga', this.selectedCargaType);

    // Debugging
    console.log('Setting carga type:', this.selectedCargaType);
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
    console.log(this.direccionDestino,'antes de')
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

  selected(item, input): void {
    console.log('selected---->',item.name);

    console.log('selected----> origin', item.field_zona_a);

    localStorage.setItem('zona_origen', item.field_zona_a);

    localStorage.setItem('tarifaOrigen',item.field_tarifa);
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
    console.log('selected----> destination', item.field_zona_a);
    localStorage.setItem('zona_destino', item.field_zona_a);

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

    this.auth.sendFormulario(this.FormSend.value);




   }
   iraIndex(){
    this.router.navigate(['/tabs']);
  }
  async sendForm() {

     // Set carga type if it's a specific value


    if(this.FormSend.invalid || this.FormSend.value['field_metodo_de_pago']==''){
      const alert = await this.alertController.create({

        header: 'Datos incompletos ',

        message: 'llenar todos los datos.',
        buttons: ['Aceptar']
      });

      await alert.present();
      return;
    }else{
      if (this.FormSend.value.field_contacto_destino== "Carga pequeña"){
        this.FormSend.controls.field_contacto_destino.setValue('Carga pequeña');

      }else if (this.FormSend.value.field_contacto_destino == "Carga grande"){
        this.FormSend.controls.field_contacto_destino.setValue('Carga grande');

      }

      for(let i=0;i<this.ciudades.length;i++){
        if(this.ciudades[i]['name']==localStorage.getItem('locacion')){
          console.log(this.AuxCarrosGrandesDisponibles['length'],'carros grandes');
          if(this.AuxCarrosGrandesDisponibles['length']==0){
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
            console.log(this.AuxCarrosGrandesDisponibles['length'],'estoy en ciudad');

            this.auth.sendFormularioTrasteo(this.FormSend.value);
            this.router.navigate(['/resumen-trasteo']);

          }
          break;
        }else{
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

          }else{

            this.auth.sendFormularioTrasteo(this.FormSend.value);
            this.router.navigate(['/resumen-trasteo']);
             //this.router.navigate(['/resumen']);
             break;
          }
        }
      }


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
    this.auth.getAuxiliaresDisponiblesParaCarrosGrandes().subscribe(res =>{
      console.log(res, ' aqui carro');
      this.AuxCarrosGrandesDisponibles=res;

    });

    this.auth.getAuxiliaresDisponiblesParaCarrosMediano().subscribe(res =>{
      console.log(res, ' aqui carro mediano');
      this.AuxCarrosMedianosDisponibles=res;

    });
    this.auth.getAuxiliaresDisponiblesMunicipio().subscribe(res =>{
      console.log(res, ' aqui aux municiipio');
      this.AuxDisponiblesMunicipios=res;

    });
    this.auth.seleccionarSliderTrasteos().subscribe(res =>{
      console.log(res, ' aqui slider');
     this.slider=res[0]['field_imagen_trasteo'];

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
      this.direccion = await this.auth.getListBarriosSeleccion().toPromise();

      console.log(this.direccion, 'direccion');
      console.log(this.direccion.length);

      this.bloquearInputBarrio = false;

      // Manejar las condiciones basadas en la longitud de direccion
      if (this.direccion.length === 1 && this.direccion[0]['name'] !== 'San Andrés') {
        // Si hay un solo barrio y no es San Andrés
        this.FormSend.controls.field_locacion_entrega.setValue(this.direccion[0]['name']);
        this.FormSend.controls.field_barrio_origen.setValue(this.direccion[0]['name']);

        this.ocultarInputOrigen = true;
        this.disabledValueOrigen = true;

        // Variables de local storage
        localStorage.setItem('tarifaOrigen', this.direccion[0]['field_tarifa_externa']);
        localStorage.setItem('imgBarrioOrigen', this.direccion[0]['field_imagen_barrio']);
        localStorage.setItem('longitudOrigen', this.direccion[0]['field_longitud']);
        localStorage.setItem('latitudOrigen', this.direccion[0]['field_latitud']);
        localStorage.setItem('valorDeterminanteLONG', this.direccion[0]['field_longitud_1']);
        localStorage.setItem('valorDeterminanteLAT', this.direccion[0]['field_latitud_1']);

        console.log('selected----> origen', this.direccion[0]['field_zona_a']);

        localStorage.setItem('zona_origen', this.direccion[0]['field_zona_a']);

        // Ocultar campo de barrio
        document.getElementById('itemOrigen').style.visibility = "hidden"; // Hide


        localStorage.setItem('tarifaDestino', this.direccion[0]['field_tarifa']);
        localStorage.setItem('imgBarrioDestino', this.direccion[0]['field_imagen_barrio']);

      } else if (this.direccion.length === 1 && this.direccion[0]['name'] === 'San Andrés') {
        // Si hay un solo barrio y es San Andrés
        this.FormSend.controls.field_locacion_entrega.setValue(this.direccion[0]['name']);
        this.FormSend.controls.field_barrio_origen.setValue(this.direccion[0]['name']);


        console.log('selected----> origen', this.direccion[0]['field_zona_a']);

        localStorage.setItem('zona_origen', this.direccion[0]['field_zona_a']);

        localStorage.setItem('tarifaOrigen', this.direccion[0]['field_tarifa']);
        localStorage.setItem('imgBarrioOrigen', this.direccion[0]['field_imagen_barrio']);
        localStorage.setItem('longitudOrigen', this.direccion[0]['field_longitud']);
        localStorage.setItem('latitudOrigen', this.direccion[0]['field_latitud']);
        localStorage.setItem('valorDeterminanteLONG', this.direccion[0]['field_longitud_1']);
        localStorage.setItem('valorDeterminanteLAT', this.direccion[0]['field_latitud_1']);

        this.ocultarInputOrigen = true;
        this.disabledValueOrigen = true;

        // Document.getElementById('itemOrigen').style.visibility = "hidden"; // Hide

      } else if (this.direccion.length > 1) {
        // Si hay más de un barrio
        this.ocultarInputOrigen = false;
        this.disabledValueOrigen = true;
        this.FormSend.controls.field_barrio_origen.setValue('');
        document.getElementById('itemOrigen').style.visibility = "visible"; // Show
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

    // Manejo basado en la longitud de direccionDestino
    if (this.direccionDestino.length === 1) {
      const barrio = this.direccionDestino[0];

      if (barrio['name'] !== 'San Andrés') {
        this.FormSend.controls.field_barrio_destino.setValue(barrio['name']);
        localStorage.setItem('tarifaDestino', barrio['field_tarifa']);
        localStorage.setItem('tarifaExternaDestino', barrio['field_tarifa_externa']);
        localStorage.setItem('imgBarrioDestino', barrio['field_imagen_barrio']);

        console.log('selected----> destino', this.direccionDestino[0]['field_zona_a']);

        localStorage.setItem('zona_destino', this.direccionDestino[0]['field_zona_a']);

        this.ocultarInput = true;
        this.bloquearInputBarrioDestino = true;
        document.getElementById('itemOrigen').style.visibility = "hidden"; // Ocultar
      } else if (barrio['name'] === 'San Andrés') {
        this.FormSend.controls.field_barrio_destino.setValue(barrio['name']);
        localStorage.setItem('tarifaDestino', barrio['field_tarifa']);
        localStorage.setItem('imgBarrioDestino', barrio['field_imagen_barrio']);
        console.log('selected----> destination', this.direccionDestino[0]['field_zona_a']);
        localStorage.setItem('zona_destino', this.direccionDestino[0]['field_zona_a']);

        this.ocultarInput = true;
        this.bloquearInputBarrioDestino = true;
        document.getElementById('itemOrigen').style.visibility = "hidden"; // Ocultar
      }
    } else {
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
        handler: () => { }
      }],
    });
    await alert.present();
  }
}

  ngOnDestroy() {

    console.log("Sencilla- OnDestroy")
  }

}
