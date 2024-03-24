import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController, MenuController } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-resumen-ruta9',
  templateUrl: './resumen-ruta9.page.html',
  styleUrls: ['./resumen-ruta9.page.scss'],
})
export class ResumenRuta9Page implements OnInit {
  locaciones :any[];
 validadorDeRuta:any
  FormSend: FormGroup;
  precio_origen: any;
  precio_destino: any;
  precio_destino2: any;
  precio_destino3: any;
  precio_destino4: any;
  precio_destino5: any;
  precio_destino6: any;
  precio_destino7: any;
  precio_destino8: any;
  precio_destino9: any;
  aux: string;
  estadoButton: boolean;

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

      body8:[""],
      locacion8:[""],
      contacto8:[""],
      destino8:[""],
      field_prefijo_destino8:[""],
      field_barrio_destino8:[""],

      body9:[""],
      locacion9:[""],
      contacto9:[""],
      destino9:[""],
      field_prefijo_destino9:[""],
      field_barrio_destino9:[""],
      //field_valor_declarado:[""],
      
      field_precio_:[""],
      field_precio_2:[""],
      field_precio_3:[""],
      field_precio_4:[""],
      field_precio_5:[""],
      field_precio_6:[""],
      field_precio_7:[""],
      field_precio_8:[""],
      field_precio_9:[""],
      field_precio_10:[""],


      field_nombre_c_origen:[""],
      field_nombre_c_destino:[""],
      field_nombre_c_destino2:[""],
      field_nombre_c_destino3:[""],
      field_nombre_c_destino4:[""],
      field_nombre_c_destino5:[""],
      field_nombre_c_destino6:[""],
      field_nombre_c_destino7:[""],
      field_nombre_c_destino8:[""],
      field_nombre_c_destino9:[""],



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
    //2
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
      }, 6000);

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
        this.auth.CrearSencilla8(this.FormSend.value);
       }, 11000);

       setTimeout(() => {
        this.auth.CrearSencilla9(this.FormSend.value);
       }, 12000);
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
    this.precio_destino4 = Number(localStorage.getItem('tarifaDestino4'));
    this.precio_destino5 = Number(localStorage.getItem('tarifaDestino5'));
    this.precio_destino6 = Number(localStorage.getItem('tarifaDestino6'));
    this.precio_destino7 = Number(localStorage.getItem('tarifaDestino7'));
    this.precio_destino8 = Number(localStorage.getItem('tarifaDestino8'));
    this.precio_destino9 = Number(localStorage.getItem('tarifaDestino9'));
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
 
 
 
  
  this.FormSend.controls.field_prefijo_destino8.setValue(this.auth.resumenRuta.field_prefijo_destino8['0']['value']);
 
  this.FormSend.controls.body8.setValue(this.auth.resumenRuta.body8['0']['value']);
  this.FormSend.controls.contacto8.setValue(this.auth.resumenRuta.contacto8['0']['value']);

  this.FormSend.controls.destino8.setValue(this.auth.resumenRuta.destino8['0']['value']);

  this.FormSend.controls.locacion8.setValue(this.auth.resumenRuta.locacion8['0']['value']);
 

  this.FormSend.controls.field_prefijo_destino9.setValue(this.auth.resumenRuta.field_prefijo_destino9['0']['value']);
 
  this.FormSend.controls.body9.setValue(this.auth.resumenRuta.body9['0']['value']);
  this.FormSend.controls.contacto9.setValue(this.auth.resumenRuta.contacto9['0']['value']);

  this.FormSend.controls.destino9.setValue(this.auth.resumenRuta.destino9['0']['value']);

  this.FormSend.controls.locacion9.setValue(this.auth.resumenRuta.locacion9['0']['value']);
 
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
  this.FormSend.controls.field_nombre_c_destino8.setValue(this.auth.resumenRuta.field_nombre_c_destino8['0']['value']);
  this.FormSend.controls.field_nombre_c_destino9.setValue(this.auth.resumenRuta.field_nombre_c_destino9['0']['value']);


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

//4

if( localStorage.getItem('locacionDestinoSeleccionada4') != localStorage.getItem('locacionOrigenSeleccionada') ){
  if( localStorage.getItem('tarifaExternaOrigen')>localStorage.getItem('tarifaExternaDestino4')){
    this.FormSend.controls.  field_precio_4.setValue(localStorage.getItem('tarifaExternaOrigen'));
    localStorage.setItem('precioTarifa4',localStorage.getItem('tarifaExternaOrigen'));
    //

  }else  if(localStorage.getItem('tarifaExternaDestino4') >localStorage.getItem('tarifaExternaOrigen')){
    this.FormSend.controls.  field_precio_4.setValue(localStorage.getItem('tarifaExternaDestino4'));
    localStorage.setItem('precioTarifa4',localStorage.getItem('tarifaExternaDestino4'));
    //
 
  }else if(localStorage.getItem('tarifaExternaDestino4') ==localStorage.getItem('tarifaExternaOrigen')){
    this.FormSend.controls.  field_precio_4.setValue(localStorage.getItem('tarifaExternaDestino4'));
    localStorage.setItem('precioTarifa4',localStorage.getItem('tarifaExternaDestino4'));
    //
    
  }
}else{
  if(this.precio_origen>this.precio_destino4){
    this.FormSend.controls.  field_precio_4.setValue(this.precio_origen);
    localStorage.setItem('precioTarifa4',this.precio_origen);
  }else if(this.precio_destino4>this.precio_origen){
    this.FormSend.controls.  field_precio_4.setValue(this.precio_destino4);
    localStorage.setItem('precioTarifa4',this.precio_destino4);
  }else{
    this.FormSend.controls.  field_precio_4.setValue(localStorage.getItem('tarifaOrigen'));
    localStorage.setItem('precioTarifa4',this.precio_destino4);
  }
}
  
//5

if( localStorage.getItem('locacionDestinoSeleccionada5') != localStorage.getItem('locacionOrigenSeleccionada') ){
  if( localStorage.getItem('tarifaExternaOrigen')>localStorage.getItem('tarifaExternaDestino5')){
    this.FormSend.controls.  field_precio_5.setValue(localStorage.getItem('tarifaExternaOrigen'));
    localStorage.setItem('precioTarifa5',localStorage.getItem('tarifaExternaOrigen'));
    //

  }else  if(localStorage.getItem('tarifaExternaDestino5') >localStorage.getItem('tarifaExternaOrigen')){
    this.FormSend.controls.  field_precio_5.setValue(localStorage.getItem('tarifaExternaDestino5'));
    localStorage.setItem('precioTarifa5',localStorage.getItem('tarifaExternaDestino5'));
    //
 
  }else if(localStorage.getItem('tarifaExternaDestino5') ==localStorage.getItem('tarifaExternaOrigen')){
    this.FormSend.controls.  field_precio_5.setValue(localStorage.getItem('tarifaExternaDestino5'));
    localStorage.setItem('precioTarifa5',localStorage.getItem('tarifaExternaDestino5'));
    //
    
  }
}else{
  if(this.precio_origen>this.precio_destino5){
    this.FormSend.controls.  field_precio_5.setValue(this.precio_origen);
    localStorage.setItem('precioTarifa5',this.precio_origen);
  }else if(this.precio_destino5>this.precio_origen){
    this.FormSend.controls.  field_precio_5.setValue(this.precio_destino5);
    localStorage.setItem('precioTarifa5',this.precio_destino5);
  }else{
    this.FormSend.controls.  field_precio_5.setValue(localStorage.getItem('tarifaOrigen'));
    localStorage.setItem('precioTarifa5',this.precio_destino5);
  }
}

  //6

  if( localStorage.getItem('locacionDestinoSeleccionada6') != localStorage.getItem('locacionOrigenSeleccionada') ){
    if( localStorage.getItem('tarifaExternaOrigen')>localStorage.getItem('tarifaExternaDestino6')){
      this.FormSend.controls.  field_precio_6.setValue(localStorage.getItem('tarifaExternaOrigen'));
      localStorage.setItem('precioTarifa6',localStorage.getItem('tarifaExternaOrigen'));
      //
  
    }else  if(localStorage.getItem('tarifaExternaDestino6') >localStorage.getItem('tarifaExternaOrigen')){
      this.FormSend.controls.  field_precio_6.setValue(localStorage.getItem('tarifaExternaDestino6'));
      localStorage.setItem('precioTarifa6',localStorage.getItem('tarifaExternaDestino6'));
      //
   
    }else if(localStorage.getItem('tarifaExternaDestino6') ==localStorage.getItem('tarifaExternaOrigen')){
      this.FormSend.controls.  field_precio_6.setValue(localStorage.getItem('tarifaExternaDestino6'));
      localStorage.setItem('precioTarifa6',localStorage.getItem('tarifaExternaDestino6'));
      //
      
    }
  }else{
    if(this.precio_origen>this.precio_destino6){
      this.FormSend.controls.  field_precio_6.setValue(this.precio_origen);
      localStorage.setItem('precioTarifa6',this.precio_origen);
    }else if(this.precio_destino6>this.precio_origen){
      this.FormSend.controls.  field_precio_6.setValue(this.precio_destino6);
      localStorage.setItem('precioTarifa6',this.precio_destino6);
    }else{
      this.FormSend.controls.  field_precio_6.setValue(localStorage.getItem('tarifaOrigen'));
      localStorage.setItem('precioTarifa6',this.precio_destino6);
    }
   
  }
//7

if( localStorage.getItem('locacionDestinoSeleccionada7') != localStorage.getItem('locacionOrigenSeleccionada') ){
  if( localStorage.getItem('tarifaExternaOrigen')>localStorage.getItem('tarifaExternaDestino7')){
    this.FormSend.controls.  field_precio_7.setValue(localStorage.getItem('tarifaExternaOrigen'));
    localStorage.setItem('precioTarifa7',localStorage.getItem('tarifaExternaOrigen'));
    //

  }else  if(localStorage.getItem('tarifaExternaDestino7') >localStorage.getItem('tarifaExternaOrigen')){
    this.FormSend.controls.  field_precio_7.setValue(localStorage.getItem('tarifaExternaDestino7'));
    localStorage.setItem('precioTarifa7',localStorage.getItem('tarifaExternaDestino7'));
    //
 
  }else if(localStorage.getItem('tarifaExternaDestino7') ==localStorage.getItem('tarifaExternaOrigen')){
    this.FormSend.controls.  field_precio_7.setValue(localStorage.getItem('tarifaExternaDestino7'));
    localStorage.setItem('precioTarifa7',localStorage.getItem('tarifaExternaDestino7'));
    //
    
  }
}else{
  if(this.precio_origen>this.precio_destino7){
    this.FormSend.controls.  field_precio_7.setValue(this.precio_origen);
    localStorage.setItem('precioTarifa7',this.precio_origen);
  }else if(this.precio_destino7>this.precio_origen){
    this.FormSend.controls.  field_precio_7.setValue(this.precio_destino7);
    localStorage.setItem('precioTarifa7',this.precio_destino7);
  }else{
    this.FormSend.controls.  field_precio_7.setValue(localStorage.getItem('tarifaOrigen'));
    localStorage.setItem('precioTarifa7',this.precio_destino7);
  }
 
}
 
  //8

  if( localStorage.getItem('locacionDestinoSeleccionada8') != localStorage.getItem('locacionOrigenSeleccionada') ){
    if( localStorage.getItem('tarifaExternaOrigen')>localStorage.getItem('tarifaExternaDestino8')){
      this.FormSend.controls.  field_precio_8.setValue(localStorage.getItem('tarifaExternaOrigen'));
      localStorage.setItem('precioTarifa8',localStorage.getItem('tarifaExternaOrigen'));
      //
  
    }else  if(localStorage.getItem('tarifaExternaDestino8') >localStorage.getItem('tarifaExternaOrigen')){
      this.FormSend.controls.  field_precio_8.setValue(localStorage.getItem('tarifaExternaDestino8'));
      localStorage.setItem('precioTarifa8',localStorage.getItem('tarifaExternaDestino8'));
      //
   
    }else if(localStorage.getItem('tarifaExternaDestino8') ==localStorage.getItem('tarifaExternaOrigen')){
      this.FormSend.controls.  field_precio_8.setValue(localStorage.getItem('tarifaExternaDestino8'));
      localStorage.setItem('precioTarifa8',localStorage.getItem('tarifaExternaDestino8'));
      //
      
    }
  }else{

    if(this.precio_origen>this.precio_destino8){
      this.FormSend.controls.  field_precio_8.setValue(this.precio_origen);
      localStorage.setItem('precioTarifa8',this.precio_origen);
    }else if(this.precio_destino8>this.precio_origen){
      this.FormSend.controls.  field_precio_8.setValue(this.precio_destino8);
      localStorage.setItem('precioTarifa8',this.precio_destino8);
    }else{
      this.FormSend.controls.  field_precio_8.setValue(localStorage.getItem('tarifaOrigen'));
      localStorage.setItem('precioTarifa8',this.precio_destino8);
    }

  }
//9

if( localStorage.getItem('locacionDestinoSeleccionada9') != localStorage.getItem('locacionOrigenSeleccionada') ){
  if( localStorage.getItem('tarifaExternaOrigen')>localStorage.getItem('tarifaExternaDestino9')){
    this.FormSend.controls.  field_precio_9.setValue(localStorage.getItem('tarifaExternaOrigen'));
    localStorage.setItem('precioTarifa9',localStorage.getItem('tarifaExternaOrigen'));
    //

  }else  if(localStorage.getItem('tarifaExternaDestino9') >localStorage.getItem('tarifaExternaOrigen')){
    this.FormSend.controls.  field_precio_9.setValue(localStorage.getItem('tarifaExternaDestino9'));
    localStorage.setItem('precioTarifa9',localStorage.getItem('tarifaExternaDestino9'));
    //
 
  }else if(localStorage.getItem('tarifaExternaDestino9') ==localStorage.getItem('tarifaExternaOrigen')){
    this.FormSend.controls.  field_precio_9.setValue(localStorage.getItem('tarifaExternaDestino9'));
    localStorage.setItem('precioTarifa9',localStorage.getItem('tarifaExternaDestino9'));
    //
    
  }
}else{
  if(this.precio_origen>this.precio_destino9){
    this.FormSend.controls.  field_precio_9.setValue(this.precio_origen);
    localStorage.setItem('precioTarifa9',this.precio_origen);
  }else if(this.precio_destino9>this.precio_origen){
    this.FormSend.controls.  field_precio_9.setValue(this.precio_destino9);
    localStorage.setItem('precioTarifa9',this.precio_destino9);
  }else{
    this.FormSend.controls.  field_precio_9.setValue(localStorage.getItem('tarifaOrigen'));
    localStorage.setItem('precioTarifa9',this.precio_destino9);
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
    localStorage.setItem('precioTarifa3',TotalDefinitivoParaVehiculosDestino3.toString());
    
    //calculo porcentaje destino 4
    var resultadoTotalCostoDestino4 = Number(this.FormSend.controls.field_precio_4.value) ;
    var porcentajeDestino4 = ( resultadoTotalCostoDestino4 * valorAgregado) / 100;
    
    console.log("Valor Agregado:", valorAgregado);
    console.log("Porcentaje de Valor Agregado:", porcentajeDestino4)
    console.log("Resultado Total de Costo - porcentaje:", resultadoTotalCostoDestino4 - porcentajeDestino4);
    var TotalDefinitivoParaVehiculosDestino4 = resultadoTotalCostoDestino4 - porcentajeDestino4;
    this.FormSend.controls.  field_precio_4.setValue(TotalDefinitivoParaVehiculosDestino4);
    localStorage.setItem('precioTarifa4',TotalDefinitivoParaVehiculosDestino4.toString());
    
    //calculo porcentaje destino 5
    var resultadoTotalCostoDestino5 = Number(this.FormSend.controls.field_precio_5.value) ;
    var porcentajeDestino5 = ( resultadoTotalCostoDestino5 * valorAgregado) / 100;
    
    console.log("Valor Agregado:", valorAgregado);
    console.log("Porcentaje de Valor Agregado:", porcentajeDestino5)
    console.log("Resultado Total de Costo - porcentaje:", resultadoTotalCostoDestino5 - porcentajeDestino5);
    var TotalDefinitivoParaVehiculosDestino5 = resultadoTotalCostoDestino5 - porcentajeDestino5;
    this.FormSend.controls.  field_precio_5.setValue(TotalDefinitivoParaVehiculosDestino5);
    localStorage.setItem('precioTarifa5',TotalDefinitivoParaVehiculosDestino5.toString());
    
    //calculo porcentaje destino 6
    var resultadoTotalCostoDestino6 = Number(this.FormSend.controls.field_precio_6.value) ;
    var porcentajeDestino6 = ( resultadoTotalCostoDestino6 * valorAgregado) / 100;
    
    console.log("Valor Agregado:", valorAgregado);
    console.log("Porcentaje de Valor Agregado:", porcentajeDestino6)
    console.log("Resultado Total de Costo - porcentaje:", resultadoTotalCostoDestino6 - porcentajeDestino6);
    var TotalDefinitivoParaVehiculosDestino6 = resultadoTotalCostoDestino6 - porcentajeDestino6;
    this.FormSend.controls.  field_precio_6.setValue(TotalDefinitivoParaVehiculosDestino6);
    localStorage.setItem('precioTarifa6',TotalDefinitivoParaVehiculosDestino6.toString());
    //calculo porcentaje destino 7
    var resultadoTotalCostoDestino7 = Number(this.FormSend.controls.field_precio_7.value) ;
    var porcentajeDestino7 = ( resultadoTotalCostoDestino7 * valorAgregado) / 100;
    
    console.log("Valor Agregado:", valorAgregado);
    console.log("Porcentaje de Valor Agregado:", porcentajeDestino7)
    console.log("Resultado Total de Costo - porcentaje:", resultadoTotalCostoDestino7 - porcentajeDestino7);
    var TotalDefinitivoParaVehiculosDestino7 = resultadoTotalCostoDestino7 - porcentajeDestino7;
    this.FormSend.controls.  field_precio_7.setValue(TotalDefinitivoParaVehiculosDestino7);
    localStorage.setItem('precioTarifa7',TotalDefinitivoParaVehiculosDestino7.toString());

    //calculo porcentaje destino 8
    var resultadoTotalCostoDestino8 = Number(this.FormSend.controls.field_precio_8.value) ;
    var porcentajeDestino8 = ( resultadoTotalCostoDestino8 * valorAgregado) / 100;
    
    console.log("Valor Agregado:", valorAgregado);
    console.log("Porcentaje de Valor Agregado:", porcentajeDestino8)
    console.log("Resultado Total de Costo - porcentaje:", resultadoTotalCostoDestino8 - porcentajeDestino8);
    var TotalDefinitivoParaVehiculosDestino8 = resultadoTotalCostoDestino8 - porcentajeDestino8;
    this.FormSend.controls.  field_precio_8.setValue(TotalDefinitivoParaVehiculosDestino8);
    localStorage.setItem('precioTarifa8',TotalDefinitivoParaVehiculosDestino8.toString());

    //calculo porcentaje destino 9
    var resultadoTotalCostoDestino9 = Number(this.FormSend.controls.field_precio_9.value) ;
    var porcentajeDestino9 = ( resultadoTotalCostoDestino9 * valorAgregado) / 100;
    
    console.log("Valor Agregado:", valorAgregado);
    console.log("Porcentaje de Valor Agregado:", porcentajeDestino9)
    console.log("Resultado Total de Costo - porcentaje:", resultadoTotalCostoDestino9 - porcentajeDestino9);
    var TotalDefinitivoParaVehiculosDestino9 = resultadoTotalCostoDestino9 - porcentajeDestino9;
    this.FormSend.controls.  field_precio_9.setValue(TotalDefinitivoParaVehiculosDestino9);
    localStorage.setItem('precioTarifa9',TotalDefinitivoParaVehiculosDestino9.toString());
    //calculo total definitivo
    // Calcula el resultado total
    
    console.log(TotalDefinitivoParaVehiculosDestino1 + TotalDefinitivoParaVehiculosDestino2 + TotalDefinitivoParaVehiculosDestino3 + TotalDefinitivoParaVehiculosDestino4 + TotalDefinitivoParaVehiculosDestino5 + TotalDefinitivoParaVehiculosDestino6 + TotalDefinitivoParaVehiculosDestino7 + TotalDefinitivoParaVehiculosDestino8 + TotalDefinitivoParaVehiculosDestino9, ' res total domicilio')
    
    
    var TotalDefinitivoParaVehiculos = TotalDefinitivoParaVehiculosDestino1 + TotalDefinitivoParaVehiculosDestino2 + TotalDefinitivoParaVehiculosDestino3  + TotalDefinitivoParaVehiculosDestino4 + TotalDefinitivoParaVehiculosDestino5 + TotalDefinitivoParaVehiculosDestino6 + TotalDefinitivoParaVehiculosDestino7 + TotalDefinitivoParaVehiculosDestino8 + TotalDefinitivoParaVehiculosDestino9;
    this.FormSend.controls.  field_precio_10.setValue(TotalDefinitivoParaVehiculos);
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
    
    //calculo porcentaje destino 4
    var resultadoTotalCostoDestino4 = Number(this.FormSend.controls.field_precio_4.value) ;
    
    
    
    
    
    
    this.FormSend.controls.  field_precio_4.setValue(resultadoTotalCostoDestino4);
    localStorage.setItem('precioTarifa4',resultadoTotalCostoDestino4.toString());
    
    //calculo porcentaje destino 5
    var resultadoTotalCostoDestino5 = Number(this.FormSend.controls.field_precio_5.value) ;
    
    
    
    
    
    
    this.FormSend.controls.  field_precio_5.setValue(resultadoTotalCostoDestino5);
    localStorage.setItem('precioTarifa5',resultadoTotalCostoDestino5.toString());
    //calculo porcentaje destino 6
    var resultadoTotalCostoDestino6 = Number(this.FormSend.controls.field_precio_6.value) ;
    
    
    
    
    
    
    this.FormSend.controls.  field_precio_6.setValue(resultadoTotalCostoDestino6);
    localStorage.setItem('precioTarifa6',resultadoTotalCostoDestino6.toString());
     //calculo porcentaje destino 7
     var resultadoTotalCostoDestino7 = Number(this.FormSend.controls.field_precio_7.value) ;
    
    
    
    
    
    
     this.FormSend.controls.  field_precio_7.setValue(resultadoTotalCostoDestino7);
     localStorage.setItem('precioTarifa7',resultadoTotalCostoDestino7.toString());
       //calculo porcentaje destino 8
       var resultadoTotalCostoDestino8 = Number(this.FormSend.controls.field_precio_8.value) ;
    
    
    
    
    
    
       this.FormSend.controls.  field_precio_8.setValue(resultadoTotalCostoDestino8);
       localStorage.setItem('precioTarifa8',resultadoTotalCostoDestino8.toString());
     //calculo porcentaje destino 9
     var resultadoTotalCostoDestino9 = Number(this.FormSend.controls.field_precio_9.value) ;
    
    
    
    
    
    
     this.FormSend.controls.  field_precio_9.setValue(resultadoTotalCostoDestino9);
     localStorage.setItem('precioTarifa9',resultadoTotalCostoDestino9.toString());
 
    //calculo total definitivo
    // Calcula el resultado total
    
    console.log(resultadoTotalCostoDestino1 + resultadoTotalCostoDestino2 + resultadoTotalCostoDestino3 + resultadoTotalCostoDestino4 + resultadoTotalCostoDestino5 + resultadoTotalCostoDestino6 + resultadoTotalCostoDestino7 + resultadoTotalCostoDestino8 + resultadoTotalCostoDestino9, ' res total domicilio')
    
    
    var TotalDefinitivoParaVehiculos = resultadoTotalCostoDestino1 + resultadoTotalCostoDestino2 + resultadoTotalCostoDestino3  + resultadoTotalCostoDestino4 + resultadoTotalCostoDestino5 + resultadoTotalCostoDestino6 + resultadoTotalCostoDestino7 + resultadoTotalCostoDestino8 + resultadoTotalCostoDestino9;
    this.FormSend.controls.  field_precio_10.setValue(TotalDefinitivoParaVehiculos);
    localStorage.setItem('precioTarifaTotalRuta',TotalDefinitivoParaVehiculos.toString());
    }
  

  this.FormSend.controls. field_barrio_destino2.setValue(this.auth.resumenRuta. field_barrio_destino2['0']['value']);
  this.FormSend.controls. field_barrio_destino3.setValue(this.auth.resumenRuta. field_barrio_destino3['0']['value']);
  this.FormSend.controls. field_barrio_destino4.setValue(this.auth.resumenRuta. field_barrio_destino4['0']['value']);
  this.FormSend.controls. field_barrio_destino5.setValue(this.auth.resumenRuta. field_barrio_destino5['0']['value']);
  this.FormSend.controls. field_barrio_destino6.setValue(this.auth.resumenRuta. field_barrio_destino6['0']['value']);
  this.FormSend.controls. field_barrio_destino7.setValue(this.auth.resumenRuta. field_barrio_destino7['0']['value']);
  this.FormSend.controls. field_barrio_destino8.setValue(this.auth.resumenRuta. field_barrio_destino8['0']['value']);
  this.FormSend.controls. field_barrio_destino9.setValue(this.auth.resumenRuta. field_barrio_destino9['0']['value']);

  
  }

  
  ngOnDestroy() {
   
    console.log("Resumen- OnDestroy")
  }


}
