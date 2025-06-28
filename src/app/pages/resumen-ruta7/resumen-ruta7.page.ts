import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController, MenuController } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-resumen-ruta7',
  templateUrl: './resumen-ruta7.page.html',
  styleUrls: ['./resumen-ruta7.page.scss'],
})
export class ResumenRuta7Page implements OnInit {
  imagenLista: boolean ;
  locaciones :any[];
  validadorDeRuta:any;
  FormSend: FormGroup;
  precio_origen: any;
  precio_destino: any;
  precio_destino2: any;
  precio_destino3: any;
  precio_destino4: any;
  precio_destino5: any;
  precio_destino6: any;
  precio_destino7: any;
  aux: string;
  estadoButton: boolean;
  servicioEvaluado: string;
  aditional_value: any;

  constructor(private menucontrol:MenuController,private router: Router, private auth: AuthService, public fb: FormBuilder,public alertController:AlertController) {
    this.menucontrol.enable(false);
    this.FormSend= this.fb.group({

      field_direccion_destino:[""],
      field_prefijo_origen:[""],
      field_prefijo_destino:[""],
      field_locacion_destino_r:[""],
      field_contacto_destino:[""],

      field_locacion_entrega:[""],
      field_barrio_origen:[""],
      field_prefijo_destino2:[""],
      field_barrio_destino:[""],
      field_valor_declarado:[""],
      field_metodo_de_pago:[""],

      field_direccion_destino_r2:[""],
      field_locacion_destino_r2:[""],
      field_contacto_destino_r2:[""],
      body2:[""],
      field_barrio_destino2:[""],
      field_contacto:[""],
      field_direccion_entrega:[""],
      body:[""],
      destinoF:[ ],
      body3:[""],
      locacion3:[""],
      contacto3:[""],
      destino3:[""],
      field_prefijo_destino3:[""],
      field_barrio_destino3:[""],

      body4:[""],
      locacion4:[""],
      contacto4:[""],
      destino4:[""],
      field_prefijo_destino4:[""],
      field_barrio_destino4:[""],

      body5:[""],
      locacion5:[""],
      contacto5:[""],
      destino5:[""],
      field_prefijo_destino5:[""],
      field_barrio_destino5:[""],

      body6:[""],
      locacion6:[""],
      contacto6:[""],
      destino6:[""],
      field_prefijo_destino6:[""],
      field_barrio_destino6:[""],

      body7:[""],
      locacion7:[""],
      contacto7:[""],
      destino7:[""],
      field_prefijo_destino7:[""],
      field_barrio_destino7:[""],
      //field_valor_declarado:[""],

      field_precio_:[""],
      field_precio_2:[""],
      field_precio_3:[""],
      field_precio_4:[""],
      field_precio_5:[""],
      field_precio_6:[""],
      field_precio_7:[""],
      field_precio_8:[""],



      field_nombre_c_origen:[""],
      field_nombre_c_destino:[""],
      field_nombre_c_destino2:[""],
      field_nombre_c_destino3:[""],
      field_nombre_c_destino4:[""],
      field_nombre_c_destino5:[""],
      field_nombre_c_destino6:[""],
      field_nombre_c_destino7:[""],



     });

   }

   status="completed";
  disabledValue = true;
  imagenCargada(event: boolean) {
    this.imagenLista = event;
  }
   enableInput(){

    if(this.status==="completed"){
      this.disabledValue=false;
      console.log('disabled');

    }else{
      this.disabledValue = true;
    }
  }

   async irAPagar(){
    if(this.aux=='false'){
      this.presentAlert();

     }else{



      if(this.estadoButton==true){
        this.estadoButton=false;
        setTimeout(() => {
          this.auth.CrearSencillaPadre(this.FormSend.value);
        }, 5000);


        setTimeout(() => {
         this.auth.CrearSencilla1(this.FormSend.value);
        }, 5000);


       setTimeout(() => {
         this.auth.CrearSencilla3(this.FormSend.value);
        },6000);

        setTimeout(() => {
          this.auth.CrearSencilla4(this.FormSend.value);
         }, 7000);

         setTimeout(() => {
          this.auth.CrearSencilla5(this.FormSend.value);
         }, 8000);

         setTimeout(() => {
          this.auth.CrearSencilla6(this.FormSend.value);
         }, 9000);

         setTimeout(() => {
          this.auth.CrearSencilla7(this.FormSend.value);
         }, 10000);

         setTimeout(() => {
          this.auth.asignacionRutas();
          }, 15000);

      }












      }

     //this.auth.sendFormulario(this.FormSend.value);
   }

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
      buttons: [{
        text:'cancel',
        role:'cancel',
        handler:()=>{
            //this.router.navigate(['/tabs']);
        }

      },
      {
        text:'aceptar',
        handler:()=>{

          this.aux = (document.getElementById("aut_contrato") as HTMLInputElement).ariaChecked;
          console.log(this.aux, 'estado');

          //si es igua igual a on, lpasas para la otra pagina

     //4
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
    try {
    this.estadoButton=true;
    this.aux='false';
    this.auth.getListLocaciones().subscribe(data=>{
      console.log(data);
      this.locaciones=data;
          },error=>{

            console.log(error);

    });
         //new code
      console.log(localStorage.getItem('zona_origen'), 'zona_origen');
      console.log(localStorage.getItem('zona_destino'), 'zona_destino1');
     console.log(localStorage.getItem('zona_destino2'), 'zona_destino2');
      console.log(localStorage.getItem('zona_destino3'), 'zona_destino3');
     console.log(localStorage.getItem('zona_destino4'), 'zona_destino4');
     console.log(localStorage.getItem('zona_destino5'), 'zona_destino5');
    console.log(localStorage.getItem('zona_destino6'), 'zona_destino6');
    console.log(localStorage.getItem('zona_destino7'), 'zona_destino7');
      console.log(localStorage.getItem('servicioEvaluado'), 'servicioEvaluado');


      this.servicioEvaluado =localStorage.getItem('servicioEvaluado');
console.log(this.servicioEvaluado);

 const data = await this.auth.getaditional_values().toPromise();

if (this.servicioEvaluado === 'rutas Agil') {
  this.aditional_value = data[0].field_agil;
} else if (this.servicioEvaluado === 'rutas Moderada') {
  this.aditional_value = data[0].field_moderada	;
} else {
  this.aditional_value = '0';
}



     var resultadoTotalCostoDestino1 = await this.auth.calcularPrecioTarifa(
        localStorage.getItem('servicioEvaluado'),
        localStorage.getItem('zona_origen'),
        localStorage.getItem('zona_destino'),
        this.auth.medioTransporte
      );
      resultadoTotalCostoDestino1 = Number(resultadoTotalCostoDestino1)+ Number(this.aditional_value);

     var resultadoTotalCostoDestino2 = await this.auth.calcularPrecioTarifa(
        localStorage.getItem('servicioEvaluado'),
        localStorage.getItem('zona_origen'),
        localStorage.getItem('zona_destino2'),
        this.auth.medioTransporte
      );
      resultadoTotalCostoDestino2 = Number(resultadoTotalCostoDestino2)+ Number(this.aditional_value);
     var resultadoTotalCostoDestino3 = await this.auth.calcularPrecioTarifa(
        localStorage.getItem('servicioEvaluado'),
        localStorage.getItem('zona_origen'),
        localStorage.getItem('zona_destino3'),
        this.auth.medioTransporte
      );

      resultadoTotalCostoDestino3 = Number(resultadoTotalCostoDestino3)+ Number(this.aditional_value);

     var resultadoTotalCostoDestino4 = await this.auth.calcularPrecioTarifa(
        localStorage.getItem('servicioEvaluado'),
        localStorage.getItem('zona_origen'),
        localStorage.getItem('zona_destino4'),
        this.auth.medioTransporte
      );

      resultadoTotalCostoDestino4 = Number(resultadoTotalCostoDestino4)+ Number(this.aditional_value);

     var resultadoTotalCostoDestino5 = await this.auth.calcularPrecioTarifa(
        localStorage.getItem('servicioEvaluado'),
        localStorage.getItem('zona_origen'),
        localStorage.getItem('zona_destino5'),
        this.auth.medioTransporte
      );

      resultadoTotalCostoDestino5 = Number(resultadoTotalCostoDestino5)+ Number(this.aditional_value);

     var resultadoTotalCostoDestino6 = await this.auth.calcularPrecioTarifa(
        localStorage.getItem('servicioEvaluado'),
        localStorage.getItem('zona_origen'),
        localStorage.getItem('zona_destino6'),
        this.auth.medioTransporte
      );

      resultadoTotalCostoDestino6 = Number(resultadoTotalCostoDestino6)+ Number(this.aditional_value);

     var resultadoTotalCostoDestino7 = await this.auth.calcularPrecioTarifa(
        localStorage.getItem('servicioEvaluado'),
        localStorage.getItem('zona_origen'),
        localStorage.getItem('zona_destino7'),
        this.auth.medioTransporte
      );

      resultadoTotalCostoDestino7 = Number(resultadoTotalCostoDestino7)+ Number(this.aditional_value);

    this.precio_origen = Number(localStorage.getItem('tarifaOrigen'));
    this.precio_destino = Number(localStorage.getItem('tarifaDestino'));
    this.precio_destino2 = Number(localStorage.getItem('tarifaDestino2'));
    this.precio_destino3 = Number(localStorage.getItem('tarifaDestino3'));
    this.precio_destino4 = Number(localStorage.getItem('tarifaDestino4'));
    this.precio_destino5 = Number(localStorage.getItem('tarifaDestino5'));
    this.precio_destino6 = Number(localStorage.getItem('tarifaDestino6'));
    this.precio_destino7 = Number(localStorage.getItem('tarifaDestino7'));
    this.presentAlert();
    this.validadorDeRuta =1;
   localStorage.setItem('ValidadorRuta',this.validadorDeRuta);
  console.log(this.auth.resumenRuta);



  this.auth.getValorDescuento().subscribe(res =>{

    /** */
    console.log(res[0].field_valor_descuento, ' aqui valor agregado +');
  localStorage.setItem('valorAgregado',res[0].field_valor_descuento);



  });
  //construir un innerHtml dependuendo de las variables que vengan


  this.FormSend.controls.body.setValue(this.auth.resumenRuta.body['0']['value']);
  this.FormSend.controls.body2.setValue(this.auth.resumenRuta.body2['0']['value']);
  this.FormSend.controls.field_contacto.setValue(this.auth.resumenRuta.field_contacto['0']['value']);
  this.FormSend.controls.field_direccion_entrega.setValue(this.auth.resumenRuta.field_direccion_entrega['0']['value']);

  this.FormSend.controls.field_contacto_destino.setValue(this.auth.resumenRuta.field_contacto_destino['0']['value']);

  this.FormSend.controls.field_direccion_destino.setValue(this.auth.resumenRuta.field_direccion_destino['0']['value']);
  this.FormSend.controls.field_locacion_destino_r.setValue(this.auth.resumenRuta.field_locacion_destino_r['0']['value']);
  this.FormSend.controls.field_contacto_destino_r2.setValue(this.auth.resumenRuta.field_contacto_destino_r2['0']['value']);

  this.FormSend.controls.field_direccion_destino_r2.setValue(this.auth.resumenRuta.field_direccion_destino_r2['0']['value']);
  this.FormSend.controls.field_locacion_destino_r2.setValue(this.auth.resumenRuta.field_locacion_destino_r2['0']['value']);

  this.FormSend.controls.field_prefijo_destino.setValue(this.auth.resumenRuta.field_prefijo_destino['0']['value']);
  this.FormSend.controls.field_prefijo_origen.setValue(this.auth.resumenRuta.field_prefijo_origen['0']['value']);

//  this.FormSend.controls.field_valor_declarado.setValue(this.auth.resumenRuta.field_valor_declarado['0']['value']);

  //3
  this.FormSend.controls.field_prefijo_destino3.setValue(this.auth.resumenRuta.field_prefijo_destino3['0']['value']);

  this.FormSend.controls.body3.setValue(this.auth.resumenRuta.body3['0']['value']);
  this.FormSend.controls.contacto3.setValue(this.auth.resumenRuta.contacto3['0']['value']);

  this.FormSend.controls.destino3.setValue(this.auth.resumenRuta.destino3['0']['value']);

  this.FormSend.controls.locacion3.setValue(this.auth.resumenRuta.locacion3['0']['value']);

  this.FormSend.controls.field_prefijo_destino4.setValue(this.auth.resumenRuta.field_prefijo_destino4['0']['value']);

  this.FormSend.controls.body4.setValue(this.auth.resumenRuta.body4['0']['value']);
  this.FormSend.controls.contacto4.setValue(this.auth.resumenRuta.contacto4['0']['value']);

  this.FormSend.controls.destino4.setValue(this.auth.resumenRuta.destino4['0']['value']);

  this.FormSend.controls.locacion4.setValue(this.auth.resumenRuta.locacion4['0']['value']);


  this.FormSend.controls.field_prefijo_destino5.setValue(this.auth.resumenRuta.field_prefijo_destino5['0']['value']);

  this.FormSend.controls.body5.setValue(this.auth.resumenRuta.body5['0']['value']);
  this.FormSend.controls.contacto5.setValue(this.auth.resumenRuta.contacto5['0']['value']);

  this.FormSend.controls.destino5.setValue(this.auth.resumenRuta.destino5['0']['value']);

  this.FormSend.controls.locacion5.setValue(this.auth.resumenRuta.locacion5['0']['value']);


  this.FormSend.controls.field_prefijo_destino6.setValue(this.auth.resumenRuta.field_prefijo_destino6['0']['value']);

  this.FormSend.controls.body6.setValue(this.auth.resumenRuta.body6['0']['value']);
  this.FormSend.controls.contacto6.setValue(this.auth.resumenRuta.contacto6['0']['value']);

  this.FormSend.controls.destino6.setValue(this.auth.resumenRuta.destino6['0']['value']);

  this.FormSend.controls.locacion6.setValue(this.auth.resumenRuta.locacion6['0']['value']);



  this.FormSend.controls.field_prefijo_destino7.setValue(this.auth.resumenRuta.field_prefijo_destino7['0']['value']);

  this.FormSend.controls.body7.setValue(this.auth.resumenRuta.body7['0']['value']);
  this.FormSend.controls.contacto7.setValue(this.auth.resumenRuta.contacto7['0']['value']);

  this.FormSend.controls.destino7.setValue(this.auth.resumenRuta.destino7['0']['value']);

  this.FormSend.controls.locacion7.setValue(this.auth.resumenRuta.locacion7['0']['value']);

  this.FormSend.controls.field_locacion_entrega.setValue(this.auth.resumenRuta.field_locacion_entrega['0']['value']);
  this.FormSend.controls.field_prefijo_destino2.setValue(this.auth.resumenRuta.field_prefijo_destino2['0']['value']);
  this.FormSend.controls.field_barrio_origen.setValue(this.auth.resumenRuta.field_barrio_origen['0']['value']);
  this.FormSend.controls.field_barrio_destino.setValue(this.auth.resumenRuta.field_barrio_destino['0']['value']);
  this.FormSend.controls.field_valor_declarado.setValue(this.auth.resumenRuta.field_valor_declarado['0']['value']);
  this.FormSend.controls.field_metodo_de_pago.setValue(this.auth.resumenRuta.field_metodo_de_pago['0']['value']);


  this.FormSend.controls.field_nombre_c_origen.setValue(this.auth.resumenRuta.field_nombre_c_origen['0']['value']);
  this.FormSend.controls.field_nombre_c_destino.setValue(this.auth.resumenRuta.field_nombre_c_destino['0']['value']);
  this.FormSend.controls.field_nombre_c_destino2.setValue(this.auth.resumenRuta.field_nombre_c_destino2['0']['value']);
  this.FormSend.controls.field_nombre_c_destino3.setValue(this.auth.resumenRuta.field_nombre_c_destino3['0']['value']);
  this.FormSend.controls.field_nombre_c_destino4.setValue(this.auth.resumenRuta.field_nombre_c_destino4['0']['value']);
  this.FormSend.controls.field_nombre_c_destino5.setValue(this.auth.resumenRuta.field_nombre_c_destino5['0']['value']);
  this.FormSend.controls.field_nombre_c_destino6.setValue(this.auth.resumenRuta.field_nombre_c_destino6['0']['value']);
  this.FormSend.controls.field_nombre_c_destino7.setValue(this.auth.resumenRuta.field_nombre_c_destino7['0']['value']);




  var TotalDefinitivo =  resultadoTotalCostoDestino1 +  resultadoTotalCostoDestino2+  resultadoTotalCostoDestino3 + resultadoTotalCostoDestino4+resultadoTotalCostoDestino5+resultadoTotalCostoDestino6+resultadoTotalCostoDestino7;



  this.FormSend.controls.  field_precio_.setValue(resultadoTotalCostoDestino1);

  localStorage.setItem('precioTarifa', resultadoTotalCostoDestino1);
      this.FormSend.controls.field_precio_2.setValue(resultadoTotalCostoDestino2);
      localStorage.setItem('precioTarifa2', resultadoTotalCostoDestino2);
      this.FormSend.controls.field_precio_3.setValue(resultadoTotalCostoDestino3);
      localStorage.setItem('precioTarifa3', resultadoTotalCostoDestino3);
      this.FormSend.controls.field_precio_4.setValue(resultadoTotalCostoDestino4);
      localStorage.setItem('precioTarifa4', resultadoTotalCostoDestino4);
      this.FormSend.controls.field_precio_5.setValue(resultadoTotalCostoDestino5);
      localStorage.setItem('precioTarifa5', resultadoTotalCostoDestino5);
      this.FormSend.controls.field_precio_6.setValue(resultadoTotalCostoDestino6);
      localStorage.setItem('precioTarifa6', resultadoTotalCostoDestino6);
      this.FormSend.controls.field_precio_7.setValue(resultadoTotalCostoDestino7);
      localStorage.setItem('precioTarifa7', resultadoTotalCostoDestino7);

  this.FormSend.controls.field_precio_8.setValue(TotalDefinitivo);
  localStorage.setItem('precioTarifaTotalRuta',TotalDefinitivo);
} catch (error) {
  console.error(error);
}
}


  ngOnDestroy() {

    console.log("Resumen- OnDestroy")
  }



}
