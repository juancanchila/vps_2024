import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

import { AlertController, MenuController } from '@ionic/angular';
import { environment } from 'src/environments/environment';
import Swiper, { EffectFade, Navigation, Pagination, Virtual } from 'swiper';
import { SwiperComponent } from 'swiper/angular';
import { AuthService } from '../services/auth.service';




@Component({
  selector: 'app-sencilla',
  templateUrl: './sencilla.page.html',
  styleUrls: ['./sencilla.page.scss'],
})
export class SencillaPage implements OnInit {
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
  
  constructor( private menucontrol:MenuController,private router: Router, private auth: AuthService, public fb: FormBuilder,public alertController:AlertController) {
    this.menucontrol.enable(false);
    this.urlBase=environment.urlBase;
    this.FormSend= this.fb.group({
      field_barrio_origen:[""],
      field_barrio_destino:[""],
 field_direccion_entrega:[""],
 field_quien_paga_:[''],

field_contacto:[""],

field_locacion_entrega:[""],
field_locacion_destino:[""],

field_direccion_destino:[""],

field_contacto_destino:[""],
field_ida_y_vuelta:[false],

field_valor_declarado:[ ""],

field_observaciones:[""],

field_medio_de_transporte:[ ""],

field_metodo_de_pago:[''],

field_url_imagen_destino:[''],
field_url_imagen_origen:[''],
field_longitud_origen:[''],
field_latitud_origen_:[''],

field_nombre_c_origen:[''],
field_nombre_c_destino:['']



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

   
   async sendForm(){

  console.log('hatsa qui mediotranporte', this.auth.medioTransporte)
    if(this.FormSend.invalid || this.FormSend.value['field_metodo_de_pago']=='' || this.FormSend.value[' field_quien_paga_']==''){
      const alert = await this.alertController.create({
       
        header: 'Datos incompletos ',
       
        message: 'llenar todos los datos.',
        buttons: ['Aceptar']
      });
  
      await alert.present();
      return;
    }else{

      for(let i=0;i<this.ciudades.length;i++){
        console.log(localStorage.getItem('locacion'),'locacion');
        if(this.ciudades[i]['name']==localStorage.getItem('locacion')){
          console.log(this.auth.medioTransporte,'estoy en ciudad');

          console.log(this.FormSend.value['field_valor_declarado'], 'valor declarado');
          if(this.auth.medioTransporte == 1 && this.FormSend.value['field_valor_declarado'] < 100000){
            console.log('moto');
           // console.log(this.AuxCarrosDisponibles);
          console.log(this.AuxMotosDisponibles);
          console.log(this.AuxMotosDisponibles['length'],'lengt de vector motos');
          if(this.AuxMotosDisponibles.length==0){
            const alert = await this.alertController.create({
                
              header: 'Advertencia',
             
              message: 'En este momento no tenemos auxiliar disponible en moto, ¿desea medio de transporte carro?',
              // al hacer check, vamos a establecer una variable y al darle aceptar preguntamos si esa varibale esta definida si esta se continua
              buttons: [
                {
                text:'cancel',
                role:'cancel',
                handler:async ()=>{
                this.router.navigate(['/tabs']);
                }
                
              },
              {
                text:'aceptar',
                handler:async ()=>{
                  if(this.AuxCarrosDisponibles.length!=0){
                    this.auth.seleccionarCarro();
                   this.auth.sendFormulario(this.FormSend.value);
                this.router.navigate(['/resumen']);

                  }else{
                    const alert = await this.alertController.create({
                
                      header: 'Oops!',
                     
                      message: '¡En este momento no tenemos auxiliar disponible para otro medio de transporte, reduce tu valor declarado!',
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
              }
            ]
            });

          }else{
            //
              this.auth.sendFormulario(this.FormSend.value);
              this.router.navigate(['/resumen']);
          }
        
         

          }else if(this.auth.medioTransporte == 1 && this.FormSend.value['field_valor_declarado'] >= 100000){
            const alert = await this.alertController.create({
                
              header: 'Su valor declarado es mayor de 100.000$',
             
              message: 'desea medio de transporte carro?',
              // al hacer check, vamos a establecer una variable y al darle aceptar preguntamos si esa varibale esta definida si esta se continua
              buttons: [
                {
                text:'cancel',
                role:'cancel',
                
              },
              {
                text:'aceptar',
                handler:async ()=>{
                  if(this.AuxCarrosDisponibles.length!=0){
                    this.auth.seleccionarCarro();
                    this.auth.sendFormulario(this.FormSend.value);
                    this.router.navigate(['/resumen']);

                  }else{
                    const alert = await this.alertController.create({
                
                      header: 'Oops!',
                     
                      message: '¡En este momento no tenemos auxiliar disponible para otro medio de transporte, reduce tu valor declarado!',
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
            ]
            });
            
            await alert.present();

            
          }else if(this.auth.medioTransporte == 2 && this.AuxCarrosDisponibles.length>0){
             this.auth.sendFormulario(this.FormSend.value);
      this.router.navigate(['/resumen'])

          }else if(this.auth.medioTransporte == 2 && this.AuxCarrosDisponibles.length==0 && this.AuxMotosDisponibles.length>0){
            this.auth.seleccionarServicioMoto();
            this.auth.sendFormulario(this.FormSend.value);
              this.router.navigate(['/resumen']);
           

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
          
          
     // this.auth.sendFormulario(this.FormSend.value);
      //this.router.navigate(['/resumen']);
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

            

           

          }else{
            //
            this.auth.seleccionarServicioMotoYcarroMunicipio();
              this.auth.sendFormulario(this.FormSend.value);
              this.router.navigate(['/resumen']);
              break;
          }

        }
  
       };
  

  
 
   


    }
    
   
     
    
   }
getValoresDeterminantesAuxiliar(){
  
}
  ngOnInit() {

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
      setTimeout(() => {
      this.WillEnterOrigen();
      },3000)
    }
   
  } 

WillEnterOrigen(){

 
        this.auth.getListBarriosSeleccion().subscribe(async data=>{
          console.log(data);
         
          this.direccion=await data;
              },async error=>{
               
                console.log(error);
                const alert = await this.alertController.create({
           
                  header: 'Error de locación ',
                 
                  message: 'Su locación no tiene barrios asignados.',
                  buttons: [{
                    text:'aceptar',
                    handler:()=>{
                  
                     
                    }
                  }],
                  
                });
            
                await alert.present();
                return;
               
              });
         
  
 
  setTimeout(() => {
    this.bloquearInputBarrio=false;
    console.log(this.direccion,'direccion');

    console.log(this.direccion.length);
   
    //si barrios es 1 agregar por defecto y ocultar input barrio origen
    
    if(this.direccion.length==1 &&this.direccion[0]['name']!='San Andrés' ){
      //estableciendo informacion en input
      this.FormSend.controls.field_locacion_entrega.setValue(this.direccion[0]['name']);
     this.FormSend.controls.field_barrio_origen.setValue(this.direccion[0]['name']);
     this.FormSend.controls.field_url_imagen_origen.setValue(this.direccion[0].field_imagen_barrio);
     this.FormSend.controls.field_longitud_origen.setValue(this.direccion[0].field_longitud);
     this.FormSend.controls.field_latitud_origen_.setValue(this.direccion[0].field_latitud);
      this.ocultarInputOrigen=true;
    this.disabledValueOrigen=true;
     //variables de local storage
     localStorage.setItem('tarifaOrigen',this.direccion[0].field_tarifa_externa);

   localStorage.setItem('imgBarrioOrigen',this.direccion[0].field_imagen_barrio);
   localStorage.setItem('longitudOrigen',this.direccion[0].field_longitud);
   localStorage.setItem('latitudOrigen',this.direccion[0].field_latitud);

   localStorage.setItem('valorDeterminanteLONG',this.direccion[0].field_longitud_1);
   localStorage.setItem('valorDeterminanteLAT',this.direccion[0].field_latitud_1);

   //ocultando campo de barrio
 
    document.getElementById('itemOrigen').style.visibility = "hidden"; // hide
   
//desabilitando campo de locacion origen


     //si barrios es 1 agregar por defecto y ocultar input barrio destino
     this.FormSend.controls.field_locacion_destino.setValue(this.direccion[0]['name']);
     this.FormSend.controls.field_barrio_destino.setValue(this.direccion[0]['name']);
     localStorage.setItem('tarifaDestino',this.direccion[0].field_tarifa);
     this.FormSend.controls.field_url_imagen_destino.setValue(this.direccion[0].field_imagen_barrio);
     localStorage.setItem('imgBarrioDestino',this.direccion[0].field_imagen_barrio);

     
    }else  if(this.direccion.length==1 && this.direccion[0]['name']=='San Andrés'){
      console.log(' es san andres');
      this.FormSend.controls.field_locacion_entrega.setValue(this.direccion[0]['name']);
      this.FormSend.controls.field_barrio_origen.setValue(this.direccion[0]['name']);
      this.FormSend.controls.field_locacion_destino.setValue(this.direccion[0]['name']);
      this.FormSend.controls.field_barrio_destino.setValue(this.direccion[0]['name']);
      localStorage.setItem('tarifaOrigen',this.direccion[0]['field_tarifa']);

   localStorage.setItem('imgBarrioOrigen',this.direccion[0]['field_imagen_barrio']);
   localStorage.setItem('longitudOrigen',this.direccion[0]['field_longitud']);
   localStorage.setItem('latitudOrigen',this.direccion[0]['field_latitud']);

   localStorage.setItem('valorDeterminanteLONG',this.direccion[0]['field_longitud_1']);
   localStorage.setItem('valorDeterminanteLAT',this.direccion[0]['field_latitud_1']);
   this.FormSend.controls.field_url_imagen_origen.setValue(this.direccion[0]['field_imagen_barrio']);
   this.FormSend.controls.field_longitud_origen.setValue(this.direccion[0]['field_longitud']);
   this.FormSend.controls.field_latitud_origen_.setValue(this.direccion[0]['field_latitud']);
    this.ocultarInputOrigen=true;
   this.disabledValueOrigen=true;

    // document.getElementById('itemOrigen').style.visibility = "hidden"; // hide

    

    }else  if(this.direccion.length>1){
     // this.FormSend.controls.field_locacion_entrega.setValue(localStorage.getItem('locacion'));
      
      this.ocultarInputOrigen=false;
      this.disabledValueOrigen=true;
     this.FormSend.controls.field_barrio_origen.setValue('');

     document.getElementById('itemOrigen').style.visibility = "visible"; // hide
    }
    

    
   },3000)
          
  }
    
  regionDestino(event){  
    this.locacion= event;
    console.log(event);
    if(event!=''){
      this.auth.locacion=event;
      localStorage.setItem('locacionDestinoSeleccionada',event);
      setTimeout(() => {
      this.WillEnter();
      },3000)
    }
   
  } 

WillEnter(){

    this.auth.getListBarriosSeleccion().subscribe(async data=>{
      console.log(data);
      this.direccionDestino= await data;
          },async error=>{
           
            console.log(error);
            const alert = await this.alertController.create({
       
              header: 'Error de locación ',
             
              message: 'Su locación no tiene barrios asignados.',
              buttons: [{
                text:'aceptar',
                handler:()=>{
              
                 
                }
              }],
              
            });
        
            await alert.present();
            return;
           
          });
          setTimeout(() => {
          

            
            //si barrios es 1 agregar por defecto y ocultar input barrio origen
            
            if(this.direccionDestino.length==1 ){
             this.FormSend.controls.field_barrio_destino.setValue(this.direccionDestino[0]['name']);
             localStorage.setItem('tarifaDestino',this.direccionDestino[0]['field_tarifa']);

             localStorage.setItem('tarifaExternaDestino',this.direccionDestino[0]['field_tarifa_externa']);
           
             this.FormSend.controls.field_url_imagen_destino.setValue(this.direccionDestino[0]['field_imagen_barrio']);
             localStorage.setItem('imgBarrioDestino',this.direccionDestino[0]['field_imagen_barrio']);
            this.ocultarInput=true;
            this.bloquearInputBarrioDestino=true;
            document.getElementById('itemOrigen').style.visibility = "hidden"; // hide
       
             
       
             
            }else  
            if(this.direccionDestino.length==1 && this.direccionDestino[0]['name']=='San Andrés'){
              this.FormSend.controls.field_barrio_destino.setValue(this.direccionDestino[0]['name']);
              localStorage.setItem('tarifaDestino',this.direccionDestino[0].field_tarifa);
       
          
              this.FormSend.controls.field_url_imagen_destino.setValue(this.direccionDestino[0]['field_imagen_barrio']);
              localStorage.setItem('imgBarrioDestino',this.direccionDestino[0]['field_imagen_barrio']);
            
            this.ocultarInput=true;
            this.bloquearInputBarrioDestino=true;
       
             document.getElementById('itemOrigen').style.visibility = "hidden"; // hide
      
            }else{
              this.FormSend.controls.field_barrio_destino.setValue('');
              this.ocultarInput=false;
            
              this.bloquearInputBarrioDestino=false;
             document.getElementById('itemOrigen').style.visibility = "visible"; // hide
            }
            
       
            
           },4000)
          
  }
    
    

  
  ngOnDestroy() {
   
    console.log("Sencilla- OnDestroy")
  }
}
