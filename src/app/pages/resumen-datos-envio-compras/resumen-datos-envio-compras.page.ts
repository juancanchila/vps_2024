import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth.service';
import { CarritoService } from 'src/app/services/CarritoService';
import { environment } from 'src/environments/environment';
import Swiper, { EffectFade, Navigation, Pagination, Virtual } from 'swiper';
import { SwiperComponent } from 'swiper/angular';

@Component({
  selector: 'app-resumen-datos-envio-compras',
  templateUrl: './resumen-datos-envio-compras.page.html',
  styleUrls: ['./resumen-datos-envio-compras.page.scss'],
})
export class ResumenDatosEnvioComprasPage implements OnInit {
  @ViewChild('swiper', { static: false }) swiper?: SwiperComponent;
    data = [];
    public total:number;
  domicilioValor:number;
  itemsCarrito= '';
  private subtotal: number = 0;
  public swiperConfig={
    Virtual: true,
    //slidesPerView: 2,
    navigation: true,
    allowTouchMove: false,
    //pagination: { type:'fraction'},

    EffectFade:true

  };
  urlBase:any;
  ciudades:any[];
  AuxCarrosDisponibles:any=[];
  AuxMotosDisponibles:any=[];
  AuxDisponiblesMunicipios:any=[];
  permitirPagoEfectivo;
  public items2: {name: string}[] = [];
  FormSend: FormGroup;
  locaciones :any[];
  direccion :any[];
  aux: string;
  slider: any;
  estadoButton: boolean;
  direccionDestino: any;
  ocultarInput: boolean;
  bloquearInputBarrioDestino: boolean=true;
  disabledValue: boolean;
  locacion: any;
  domicilio: string;
  private resultadoTotalCosto_general: number;
  servicioEvaluado: string;
  constructor(private cs: CarritoService,private router: Router, private auth: AuthService, public fb: FormBuilder,public alertController:AlertController) {
    this.urlBase=environment.urlBase;
    this.FormSend= this.fb.group({


field_locacion_destino:[""],
field_contacto:[""],

field_observaciones:[""],

field_medio_de_transporte:[""],
field_direccion_destino:[""],

field_contacto_destino:[""],
//field_ida_y_vuelta:[""],
field_prefijo_destino:[""],
field_barrio_destino:[""],
field_metodo_de_pago:[''],
field_nombre_c_origen:[""],

     });

   }
   async slideNext(){

          console.log(localStorage.getItem('zona_origen'), 'zona_origen');
      console.log(localStorage.getItem('zona_destino'), 'zona_destino');
     console.log(localStorage.getItem('servicioEvaluado'), 'servicioEvaluado');
     const servicioEvaluado = localStorage.getItem('servicioEvaluado');
      let tipo_de_vehiculo_seleccionado = servicioEvaluado === 'fruver' ? 1 : 2;

     var resultadoTotalCosto = await this.auth.calcularPrecioTarifa(
        localStorage.getItem('servicioEvaluado'),
        localStorage.getItem('zona_origen'),
        localStorage.getItem('zona_destino'),
        tipo_de_vehiculo_seleccionado
      );
      this.domicilioValor = resultadoTotalCosto;
      resultadoTotalCosto = Number(resultadoTotalCosto);
      console.log(resultadoTotalCosto, 'resultadoTotalCosto');

     this.resultadoTotalCosto_general = Number(resultadoTotalCosto);
     this.domicilioValor = resultadoTotalCosto;
     this.total = Number(this.subtotal) + resultadoTotalCosto;
    //resultado  costo + total
     localStorage.setItem('precioTarifa', String(this.total));

    if(this.AuxCarrosDisponibles['length']==0 && this.AuxMotosDisponibles['length']==0){
      const alert = await this.alertController.create({

        header: 'Advertencia',

        message: 'En este momento no tenemos auxiliar disponible',
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
    }else{
      console.log(this.FormSend.value['field_barrio_destino']);
      // console.log(this.FormSend.value['field_barrio_destino']);
      // console.log(this.direccion)
      var barrioExiste= new Boolean();
       for (var i = 0; i <this.direccionDestino.length; i++) {


         if(this.FormSend.value['field_barrio_destino']==this.direccionDestino[i].name){
           barrioExiste=true;
           let n = i;
           this.swiper.swiperRef.slideNext(1000);


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

  selected2(item, input2): void {
    console.log('selected---->',item);
    console.log('selected---->',item.name);
    localStorage.setItem('imgBarrioDestino',item.field_imagen_barrio);
    localStorage.setItem('tarifaDestino',item.field_tarifa);
    localStorage.setItem('tarifaExternaDestino', item.field_tarifa_externa);
    // definir la zona destino

    localStorage.setItem('zona_destino', item.field_zona_a);

    // mettre à jour le formuaire
    this.FormSend.patchValue({item});
    // cacher la liste d'items en vidant la liste
    this.items2 = [];
   // console.log('selected---->',this.FormSend.value['barrioOrigen']);

   input2.value = item.name;
   this.FormSend.controls.field_barrio_destino.setValue(item.name);
  }
   async irAPagar(){


     console.log('resumen aqui');
     if(this.aux=='false'){
      this.presentAlert();

     }else{
      if(this.FormSend.invalid || this.FormSend.value['field_metodo_de_pago']==''){
        const alert = await this.alertController.create({

          header: 'Datos incompletos ',

          message: 'llenar todos los datos.',
          buttons: ['Aceptar']
        });

        await alert.present();
        return;
      }
    else{
      for(let i=0;i<this.ciudades.length;i++){
        if(this.ciudades[i]['name']==localStorage.getItem('locacion')){
          console.log(this.auth.medioTransporte,'estoy en ciudad');

           // console.log(this.AuxCarrosDisponibles);
          console.log(this.AuxMotosDisponibles);
          console.log(this.AuxMotosDisponibles['length'],'lengt de vector motos');
          if(this.AuxMotosDisponibles.length==0){
            if(this.AuxCarrosDisponibles.length==0){
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
              this.auth.seleccionarServicioCarro();
              setTimeout(async () => {
                if(this.estadoButton==true){
                  this.estadoButton=false;
                  this.auth.CrearOrdenCompra(this.FormSend.value);

                }


              },2000)

            }

          }else{
            this.auth.seleccionarServicioMoto();
            setTimeout(async () => {
              if(this.estadoButton==true){
                this.estadoButton=false;
                this.auth.CrearOrdenCompra(this.FormSend.value);

              }
            },2000)
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
            this.auth.seleccionarServicioMotoYcarroMunicipio();
            //
            if(this.estadoButton==true){
              this.estadoButton=false;
              this.auth.CrearOrdenCompra(this.FormSend.value);

              break;

            }
          }

        }
      }
      this.cs.delete_cart();
      localStorage.removeItem('tituloRestaurante');
      localStorage.removeItem('idTienda');
      localStorage.setItem('Tienda',"0");
      localStorage.setItem('tienda',undefined);
       //this.auth.sendFormulario(this.FormSend.value
    }
  }
  }


  //metodo que calcula precio domicilio

   async presentAlert() {
    const alert = await this.alertController.create({

      header: 'Contrato por prestación de servicios  :',

      message: '1.Objeto. El Prestador de Servicios se obliga a ponerse a disposición del Usuario/consumidor brindándole la compañía de un amigo, cómplice y/o acompañante, para ir a los sitios donde quiera, disfrute, necesite o requiera cuando él lo solicite a través de la aplicación.'
      +'Lo anterior de manera voluntaria, sin perjuicio de la supervisión y observaciones que pueda realizar el usuario durante la ejecución del contrato.'+ '<br>'
      +'2. Lugar de la Prestación del Servicio. Los servicios mencionados en la primera cláusula de este contrato serán llevados a cabo en la                                  '+ '<br>'
      +'3. Tarifa del Servicio. El precio del servicio contratado será de $              y por concepto de                               '+ '<br>'
      +'4. Plazo para Ejecución del Servicio. El plazo para hacer efectivo el presente contrato será de             minutos, iniciando el             '+ '<br>'
      +'5. Método de Pago. El Usuario pagará al Prestador de Servicios el valor del contrato pactado en un solo pago de manera previa a la prestación del servicio.'
      +'Parágrafo. El Usuario pagará al Prestador de Servicios mediante trasferencia bancaria a través de la plataforma NEQUI medio de pago establecido por la aplicación.'+ '<br>'
      +'6. Prestación del Servicio. El Prestador del Servicio ejecutará el servicio contratado por cuenta propia, con uso de sus propias herramientas y bajo su propio riesgo, con supervisión de VaPaEsa. El Prestador de Servicios será responsable ante el Usuario por daños o perjuicios que pudieran ocasionarse durante la prestación del servicio pactado en la cláusula primera.'+ '<br>'
      +'7. Cesión. El Prestador de Servicios no podrá trasferir, filtrar, ceder o vender cualquier título o información personal del presente contrato sin autorización expresa y por escrito del Usuario.'+ '<br>'
      +' 8. Terminación. El presente contrato podrá ser terminado por las partes de común acuerdo teniendo en cuenta los siguientes eventos:'+ '<br>'
      +' •	De forma unilateral y sin previo aviso cuando la otra parte haya incumplido con las obligaciones derivadas de este contrato.'+ '<br>'
      +'•	De forma unilateral dando previo aviso con al menos 15 minutos previos a la confirmación del servicio.'+ '<br>'
      +' 9. Aceptación del Contrato. Para efectos de este contrato y para constancia de las partes se firman dos copias idénticas del contrato.'
      +'Aceptar los términos. <br> <br><ion-checkbox id="aut_contrato" disabled="true"></ion-checkbox>     Acepto<style> ion-checkbox#aut_contrato{padding: 5px 0px 0px 4px} #alert-1-msg{text-align: justify} .alert-message {text-align: justify}  .labelAcepto{display: inline} div{display: block}   </style>'
        +' <br>'+ '<div><p id="labelAcepto"></p> ',
      // al hacer check, vamos a establecer una variable y al darle aceptar preguntamos si esa varibale esta definida si esta se continua
      buttons: [
        {
        text:'Cancel',
        role:'cancel',
        /**
        handler:()=>{
          this.router.navigate(['/tabs']);
        }
        */
      },
      {
        text:'aceptar',
        role:'confirm',
        handler:()=>{


     this.aux = (document.getElementById("aut_contrato") as HTMLInputElement).ariaChecked;
     console.log(this.aux, 'estado');

     //si es igua igual a on, lpasas para la otra pagina


if(this.aux=='false'){
// le muestra que no marcho (primero)
let estado='false';
localStorage.setItem('actualizarContrato',estado);
// recarga la pagina con' un timer (segundo)
}else{
let estado='true';
localStorage.setItem('actualizarContrato',estado);
}


          //this.router.navigate(['/transportes']);
        }
      }]
    });

    await alert.present();



   }



  async ngOnInit() {
    this.servicioEvaluado = localStorage.getItem('servicioEvaluado');
    try {


      this.estadoButton = true;
      this.auth.seleccionarSliderTiendas().subscribe(res => {
        console.log(res, ' aqui slider');
        this.slider = res[0]['field_imagen_resumen_tiendas'];

        console.log(this.slider);




      });
      this.auth.getCiudad().subscribe(res => {
        console.log(res, ' ciudad');

        this.ciudades = res;

      });
      this.permitirPagoEfectivo = localStorage.getItem('permitirPagoefectivo');
      this.auth.getAuxiliaresDisponiblesCarros().subscribe(res => {
        let vpda = [];
        console.log(res, ' aqui carro');
        this.AuxCarrosDisponibles = res;



      });
      this.auth.getAuxiliaresDisponiblesMotos().subscribe(res => {
        console.log(res, ' aqui motos');
        this.AuxMotosDisponibles = res;

      });

      this.auth.getAuxiliaresDisponiblesMunicipio().subscribe(res => {
        console.log(res, ' aqui aux municiipio');
        this.AuxDisponiblesMunicipios = res;

      });
      this.aux = 'false';
      this.permitirPagoEfectivo = localStorage.getItem('permitirPagoefectivo');
      Swiper.use([Pagination, Navigation, EffectFade, Virtual]);

      this.auth.getListLocaciones().subscribe(data => {
        console.log(data);
        this.locaciones = data;
      }, error => {

        console.log(error);

      });


      this.presentAlert();

      //obtener valor agregado por porcentaje
      this.auth.getValorAgregadoVehiculo().subscribe(res => {

        /** */
        console.log(res[0].field_valor_descuento, ' aqui valor agregado +');
        localStorage.setItem('valorAgregado', res[0].field_valor_descuento);



      });
      console.log(this.auth.resumen);
      console.log(this.auth.resumenObservacion, 'obser ');
      this.FormSend.controls.field_observaciones.setValue(localStorage.getItem('enviarProductos'));

      //this.FormSend.controls.field_contacto.setValue(this.auth.resumen.field_direccion_entrega['0']['value']);

      this.FormSend.controls.field_medio_de_transporte.setValue(this.auth.medioTransporte);

      //this.FormSend.controls.field_prefijo_origen.setValue(this.auth.resumen.field_prefijo_origen['0']['value']);


    } catch (error) {
      console.error(error);
    }
  }
  async ngAfterViewInit(){

    await this.cs.get_cart().then((res:any)=>{
     console.log('que pasa', this.data);
     if(!res) return;
     this.data = res;
     console.log(this.data);
     for(let x in res){
      this.subtotal += res[x].originaPrice *res[x].cantidad;
       this.total = this.subtotal+ Number(this.domicilioValor);

     }

   });

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
      // Obtener los datos de barrios destino usando suscripción
      this.auth.getListBarriosSeleccion().subscribe(async data => {
        this.direccionDestino = await data;

        // Si solo hay un barrio
        if (this.direccionDestino.length === 1) {
          this.FormSend.controls.field_barrio_destino.setValue(this.direccionDestino[0]['name']);
          localStorage.setItem('tarifaDestino', this.direccionDestino[0]['field_tarifa']);
          localStorage.setItem('tarifaExternaDestino', this.direccionDestino[0]['field_tarifa_externa']);
          localStorage.setItem('imgBarrioDestino', this.direccionDestino[0]['field_imagen_barrio']);

          // Agregando la zona de destino
          console.log('selected----> destino', this.direccionDestino[0]['field_zona_a']);

          localStorage.setItem('zona_destino', this.direccionDestino[0]['field_zona_a']);

          this.ocultarInput = true;
          this.bloquearInputBarrioDestino = true;

          // Ocultar el campo de barrio origen
          document.getElementById('itemOrigen').style.visibility = "hidden";
        }

        // Caso especial para San Andrés
        if (this.direccionDestino.length === 1 && this.direccionDestino[0]['name'] === 'San Andrés') {
          this.FormSend.controls.field_barrio_destino.setValue(this.direccionDestino[0]['name']);
          localStorage.setItem('tarifaDestino', this.direccionDestino[0]['field_tarifa']);
          localStorage.setItem('imgBarrioDestino', this.direccionDestino[0]['field_imagen_barrio']);

          // Agregando la zona de destino para San Andrés
          console.log('selected----> destino', this.direccionDestino[0]['field_zona_a']);
          localStorage.setItem('zona_destino', this.direccionDestino[0]['field_zona_a']);

          this.ocultarInput = true;
          this.bloquearInputBarrioDestino = true;

          // Ocultar el campo de barrio destino
          document.getElementById('itemDestino').style.visibility = "hidden";
        }

        // Si hay más de un barrio
        else if (this.direccionDestino.length > 1) {
          this.FormSend.controls.field_barrio_destino.setValue('');
          this.ocultarInput = false;
          this.bloquearInputBarrioDestino = false;

          // Mostrar el campo de barrio destino
          document.getElementById('itemDestino').style.visibility = "visible";
        }

      }, async error => {
        console.log(error);

        const alert = await this.alertController.create({
          header: 'Error de locación',
          message: 'Su locación no tiene barrios asignados.',
          buttons: [{
            text: 'Aceptar',
            handler: () => {
              // Puedes manejar el evento después de aceptar
            }
          }],
        });

        await alert.present();
      });
    } catch (error) {
      console.error(error);
    }
  }

  ngOnDestroy() {

    console.log("Resumen- OnDestroy")
  }


}
