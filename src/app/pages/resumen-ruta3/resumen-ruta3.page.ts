import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController, MenuController } from '@ionic/angular';
import { RutasPage } from 'src/app/rutas/rutas.page';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-resumen-ruta3',
  templateUrl: './resumen-ruta3.page.html',
  styleUrls: ['./resumen-ruta3.page.scss'],
})
export class ResumenRuta3Page implements OnInit {

  FormSend: FormGroup;
  precio_origen: any;
  precio_destino: any;
  precio_destino2: any;
  precio_destino3: any;
  validadorDeRuta:any;
  locaciones :any[];
  aux: string;
  estadoButton: boolean;

  constructor(private menucontrol:MenuController,private router: Router, private auth: AuthService, public fb: FormBuilder,public alertController:AlertController) {
    this.menucontrol.enable(false);
    this.FormSend= this.fb.group({
     
      field_direccion_destino:[""],
      field_prefijo_origen:[""],
      field_prefijo_destino:[""],
      field_locacion_destino_r:[""],

      field_locacion_entrega:[""],
      field_barrio_origen:[""],
      field_prefijo_destino2:[""],
      field_barrio_destino:[""],
      field_barrio_destino2:[""],
      field_valor_declarado:[""],
      field_metodo_de_pago:[""],

      field_contacto_destino:[""],
      field_direccion_destino_r2:[""],
      field_locacion_destino_r2:[""],
      field_contacto_destino_r2:[""],
      body2:[""],
      field_contacto:[""],
      field_direccion_entrega:[""],
      body:[""],
      destinoF:[ ],
      body3:[""],
      locacion3:[""],
      contacto3:[""],
      destino3:[""],
      field_prefijo_destino3:[""],
      //field_valor_declarado:[""],
      
      field_precio_:[""],
      field_precio_2:[""],
      field_precio_3:[""],
      field_precio_4:[""],
      field_barrio_destino3:[""],

      field_nombre_c_origen:[""],
      field_nombre_c_destino:[""],
      field_nombre_c_destino2:[""],
      field_nombre_c_destino3:[""],



     });
    
   }
   
   status="completed";
   disabledValue= true;
   enableInput(){
     
    if(this.status==="completed"){
      this.disabledValue=false;
      console.log('disabled');

    }else{
      this.disabledValue = true;
    }
  }
   async irAPagar(){
    
  
    if(1>2 ){
      const alertElement= await this.alertController.create({
           
        header: '¡Su solicitud es mayor a 100000$ debe ser transportada en carro!',
        message: '¿Desea ir a medio de transporte carro?',
        
        buttons: [
          {
          text:'cancel',
          role:'this.auth.CrearSencilla(this.FormSend.value);'
          
        },
        {
          text:'aceptar',
          handler:()=>{
            this.router.navigate(['/transportes']);
          }
        }
      ]
      });
    
      await alertElement.present();
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
         }, 6000);

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
         // this.router.navigate(['/tabs']);
        }
        
      },
      {
        text:'aceptar',
        handler:()=>{
        
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
  

  ngOnInit() {
    this.estadoButton=true;
    this.aux='false';
    this.auth.getListLocaciones().subscribe(data=>{
      console.log(data);
      this.locaciones=data;
          },error=>{
           
            console.log(error);
           
          });
    this.precio_origen = Number(localStorage.getItem('tarifaOrigen'));
    this.precio_destino = Number(localStorage.getItem('tarifaDestino'));
    this.precio_destino2 = Number(localStorage.getItem('tarifaDestino2'));
    this.precio_destino3 = Number(localStorage.getItem('tarifaDestino3'));
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
  this.FormSend.controls. field_barrio_destino2.setValue(this.auth.resumenRuta. field_barrio_destino2['0']['value']);

  this.FormSend.controls. field_barrio_destino3.setValue(this.auth.resumenRuta. field_barrio_destino3['0']['value']);

  this.FormSend.controls.body3.setValue(this.auth.resumenRuta.body3['0']['value']);
  this.FormSend.controls.contacto3.setValue(this.auth.resumenRuta.contacto3['0']['value']);

  this.FormSend.controls.destino3.setValue(this.auth.resumenRuta.destino3['0']['value']);

  this.FormSend.controls.locacion3.setValue(this.auth.resumenRuta.locacion3['0']['value']);

  
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
 
  
if( localStorage.getItem('locacionDestinoSeleccionada') != localStorage.getItem('locacionOrigenSeleccionada') ){
  if( localStorage.getItem('tarifaExternaOrigen')>localStorage.getItem('tarifaExternaDestino')){
    this.FormSend.controls.  field_precio_.setValue(localStorage.getItem('tarifaExternaOrigen'));
    localStorage.setItem('precioTarifa',localStorage.getItem('tarifaExternaOrigen'));
    //

  }else  if(localStorage.getItem('tarifaExternaDestino') >localStorage.getItem('tarifaExternaOrigen')){
    this.FormSend.controls.  field_precio_.setValue(localStorage.getItem('tarifaExternaDestino'));
    localStorage.setItem('precioTarifa',localStorage.getItem('tarifaExternaDestino'));
    //
 
  }else if(localStorage.getItem('tarifaExternaDestino') ==localStorage.getItem('tarifaExternaOrigen')){
    this.FormSend.controls.  field_precio_.setValue(localStorage.getItem('tarifaExternaDestino'));
    localStorage.setItem('precioTarifa',localStorage.getItem('tarifaExternaDestino'));
    //
    
  }
}else{
  if(this.precio_origen>this.precio_destino){
    this.FormSend.controls.  field_precio_.setValue(this.precio_origen);
    localStorage.setItem('precioTarifa',this.precio_origen);
  }else if(this.precio_destino>this.precio_origen){
    this.FormSend.controls.  field_precio_.setValue(this.precio_destino);
    localStorage.setItem('precioTarifa',this.precio_destino);
  }else{
    this.FormSend.controls.  field_precio_.setValue(localStorage.getItem('tarifaOrigen'));
    localStorage.setItem('precioTarifa',this.precio_destino);
  }
}



if( localStorage.getItem('locacionDestinoSeleccionada2') != localStorage.getItem('locacionOrigenSeleccionada') ){
  if( localStorage.getItem('tarifaExternaOrigen')>localStorage.getItem('tarifaExternaDestino2')){
    this.FormSend.controls.  field_precio_2.setValue(localStorage.getItem('tarifaExternaOrigen'));
    localStorage.setItem('precioTarifa2',localStorage.getItem('tarifaExternaOrigen'));
    //

  }else  if(localStorage.getItem('tarifaExternaDestino2') >localStorage.getItem('tarifaExternaOrigen')){
    this.FormSend.controls.  field_precio_2.setValue(localStorage.getItem('tarifaExternaDestino2'));
    localStorage.setItem('precioTarifa2',localStorage.getItem('tarifaExternaDestino2'));
    //
 
  }else if(localStorage.getItem('tarifaExternaDestino2') ==localStorage.getItem('tarifaExternaOrigen')){
    this.FormSend.controls.  field_precio_2.setValue(localStorage.getItem('tarifaExternaDestino2'));
    localStorage.setItem('precioTarifa2',localStorage.getItem('tarifaExternaDestino2'));
    //
    
  }
}else{
  if(this.precio_origen>this.precio_destino2){
    this.FormSend.controls.  field_precio_2.setValue(this.precio_origen);
    localStorage.setItem('precioTarifa2',this.precio_origen);
  }else if(this.precio_destino2>this.precio_origen){
    this.FormSend.controls.  field_precio_2.setValue(this.precio_destino2);
    localStorage.setItem('precioTarifa2',this.precio_destino2);
  }else{
    this.FormSend.controls.  field_precio_2.setValue(localStorage.getItem('tarifaOrigen'));
    localStorage.setItem('precioTarifa2',this.precio_destino2);
  }
}
//3
  

if( localStorage.getItem('locacionDestinoSeleccionada3') != localStorage.getItem('locacionOrigenSeleccionada') ){
  if( localStorage.getItem('tarifaExternaOrigen')>localStorage.getItem('tarifaExternaDestino3')){
    this.FormSend.controls.  field_precio_3.setValue(localStorage.getItem('tarifaExternaOrigen'));
    localStorage.setItem('precioTarifa3',localStorage.getItem('tarifaExternaOrigen'));
    //

  }else  if(localStorage.getItem('tarifaExternaDestino3') >localStorage.getItem('tarifaExternaOrigen')){
    this.FormSend.controls.  field_precio_3.setValue(localStorage.getItem('tarifaExternaDestino3'));
    localStorage.setItem('precioTarifa3',localStorage.getItem('tarifaExternaDestino3'));
    //
 
  }else if(localStorage.getItem('tarifaExternaDestino3') ==localStorage.getItem('tarifaExternaOrigen')){
    this.FormSend.controls.  field_precio_3.setValue(localStorage.getItem('tarifaExternaDestino3'));
    localStorage.setItem('precioTarifa3',localStorage.getItem('tarifaExternaDestino3'));
    //
    
  }
}else{
  if(this.precio_origen>this.precio_destino3){
    this.FormSend.controls.  field_precio_3.setValue(this.precio_origen);
    localStorage.setItem('precioTarifa3',this.precio_origen);
  }else if(this.precio_destino3>this.precio_origen){
    this.FormSend.controls.  field_precio_3.setValue(this.precio_destino3);
    localStorage.setItem('precioTarifa3',this.precio_destino3);
  }else{
    this.FormSend.controls.  field_precio_3.setValue(localStorage.getItem('tarifaOrigen'));
    localStorage.setItem('precioTarifa3',this.precio_destino3);
  }
}


//imprimir por consola file precio si es vehiculo le sumo el porcentaje
console.log(Number(this.FormSend.controls.field_precio_.value), 'precio costo domicilio 1');

console.log(Number(this.FormSend.controls.field_precio_2.value), 'precio costo domicilio 2');

   
var valorAgregado = parseFloat(localStorage.getItem('valorAgregado'));  // Ejemplo de valor agregado



if(this.auth.medioTransporte==2){
//calcuo porcentaje destino 1
var resultadoTotalCostoDestino1 = Number(this.FormSend.controls.field_precio_.value) ;
var porcentajeDestino1 = ( resultadoTotalCostoDestino1 * valorAgregado) / 100;

console.log("Valor Agregado:", valorAgregado);
console.log("Porcentaje de Valor Agregado:", porcentajeDestino1)
console.log("Resultado Total de Costo - porcentaje:", resultadoTotalCostoDestino1 - porcentajeDestino1);
var TotalDefinitivoParaVehiculosDestino1 = resultadoTotalCostoDestino1 - porcentajeDestino1;
this.FormSend.controls.  field_precio_.setValue(TotalDefinitivoParaVehiculosDestino1);
localStorage.setItem('precioTarifa',TotalDefinitivoParaVehiculosDestino1.toString());

//calculo porcentaje destino 2
var resultadoTotalCostoDestino2 = Number(this.FormSend.controls.field_precio_2.value) ;
var porcentajeDestino2 = ( resultadoTotalCostoDestino2 * valorAgregado) / 100;

console.log("Valor Agregado:", valorAgregado);
console.log("Porcentaje de Valor Agregado:", porcentajeDestino2)
console.log("Resultado Total de Costo - porcentaje:", resultadoTotalCostoDestino2 - porcentajeDestino2);
var TotalDefinitivoParaVehiculosDestino2 = resultadoTotalCostoDestino2 - porcentajeDestino2;
this.FormSend.controls.  field_precio_2.setValue(TotalDefinitivoParaVehiculosDestino2);
localStorage.setItem('precioTarifa2',TotalDefinitivoParaVehiculosDestino2.toString());

//calculo porcentaje destino 3
var resultadoTotalCostoDestino3 = Number(this.FormSend.controls.field_precio_3.value) ;
var porcentajeDestino3 = ( resultadoTotalCostoDestino3 * valorAgregado) / 100;

console.log("Valor Agregado:", valorAgregado);
console.log("Porcentaje de Valor Agregado:", porcentajeDestino3)
console.log("Resultado Total de Costo - porcentaje:", resultadoTotalCostoDestino3 - porcentajeDestino3);
var TotalDefinitivoParaVehiculosDestino3 = resultadoTotalCostoDestino3 - porcentajeDestino3;
this.FormSend.controls.  field_precio_3.setValue(TotalDefinitivoParaVehiculosDestino3);
localStorage.setItem('precioTarifa3',TotalDefinitivoParaVehiculosDestino2.toString());
//calculo total definitivo
// Calcula el resultado total

console.log(TotalDefinitivoParaVehiculosDestino1 + TotalDefinitivoParaVehiculosDestino2 + TotalDefinitivoParaVehiculosDestino3, ' res total domicilio')


var TotalDefinitivoParaVehiculos = TotalDefinitivoParaVehiculosDestino1 + TotalDefinitivoParaVehiculosDestino2 + TotalDefinitivoParaVehiculosDestino3;
this.FormSend.controls.  field_precio_4.setValue(TotalDefinitivoParaVehiculos);
localStorage.setItem('precioTarifaTotalRuta',TotalDefinitivoParaVehiculos.toString());
}else{
//para cuando no sea moderada

//calcuo porcentaje destino 1
var resultadoTotalCostoDestino1 = Number(this.FormSend.controls.field_precio_.value) ;






this.FormSend.controls.  field_precio_.setValue(resultadoTotalCostoDestino1);
localStorage.setItem('precioTarifa',resultadoTotalCostoDestino1.toString());

//calculo porcentaje destino 2
var resultadoTotalCostoDestino2 = Number(this.FormSend.controls.field_precio_2.value) ;






this.FormSend.controls.  field_precio_2.setValue(resultadoTotalCostoDestino2);
localStorage.setItem('precioTarifa2',resultadoTotalCostoDestino2.toString());

//calculo porcentaje destino 3
var resultadoTotalCostoDestino3 = Number(this.FormSend.controls.field_precio_3.value) ;






this.FormSend.controls.  field_precio_3.setValue(resultadoTotalCostoDestino3);
localStorage.setItem('precioTarifa3',resultadoTotalCostoDestino3.toString());
//calculo total definitivo
// Calcula el resultado total

console.log(resultadoTotalCostoDestino1 + resultadoTotalCostoDestino2 + resultadoTotalCostoDestino3, ' res total domicilio')


var TotalDefinitivoParaVehiculos = resultadoTotalCostoDestino1 + resultadoTotalCostoDestino2 + resultadoTotalCostoDestino3;
this.FormSend.controls.  field_precio_4.setValue(TotalDefinitivoParaVehiculos);
localStorage.setItem('precioTarifaTotalRuta',TotalDefinitivoParaVehiculos.toString());
}

  
  }

  
  ngOnDestroy() {
   
    console.log("Resumen- OnDestroy")

  }


}
