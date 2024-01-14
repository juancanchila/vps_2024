import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController, MenuController } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-resumen-llaves',
  templateUrl: './resumen-llaves.page.html',
  styleUrls: ['./resumen-llaves.page.scss'],
})
export class ResumenLlavesPage implements OnInit {

  FormSend: FormGroup;
  precio_origen: any;
  precio_destino: any;
  locaciones :any[];
  aux: string;
  estadoButton: boolean;
  constructor(private menucontrol:MenuController,private router: Router, private auth: AuthService, public fb: FormBuilder,public alertController:AlertController) {
    this.menucontrol.enable(false);
    this.FormSend= this.fb.group({
     
field_locacion_entrega:[""],
field_locacion_destino:[""],
field_contacto:[""],

field_musica_preferida:[ ""],

field_precio_:[""],
field_medio_de_transporte:[""],
field_direccion_destino:[""],
field_direccion_entrega:[""],
field_tema_de_interes:[""],
field_ida_y_vuelta:[""],
field_prefijo_destino:[""],
field_prefijo_origen:[""],

field_metodo_de_pago:[""],
field_barrio_origen:[""],
      field_barrio_destino:[""],
      field_contacto_destino:[""],
      field_nombre_c_origen:[""],
      field_nombre_c_destino:[""]
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
    if(this.aux=='false'){
      this.presentAlert();
      
     }else{

    if(this.auth.medioTransporte==1 &&this.auth.resumen.field_valor_declarado['0']['value']>100000 ){
      const alertElement= await this.alertController.create({
           
        header: '¡Su Valor declarado es mayor a $100000 debe ser transportada en carro!',
        message: 'Cambiaremos el metodo de transporte a carro ¿Desea continuar?',
        
        buttons: [
          {
          text:'cancel',
          handler:()=>{
            //La la orden  no se crea

          
          }
          
          
        },
        {
          text:'aceptar',
          handler:()=>{

            //la orden si se crea pero manualemte cambias de moto a carro
            this.auth.medioTransporte= 2;

          //  this.router.navigate(['/formadepag']);

          }
        }
      ]
      });
    
      await alertElement.present();
    }else{
      console.log('aqui en is close metodo')
      if(this.estadoButton==true){
        this.estadoButton=false;
        this.auth.CrearSencillaLlaves(this.FormSend.value);
       
      }

   
     // this.router.navigate(['/formadepag']);
    }
   
    
    
     //this.auth.sendFormulario(this.FormSend.value);
   }
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

        /** 
        handler:()=>{
          this.router.navigate(['/tabs']);
        }*/
        
      },
      {
        text:'aceptar',
        handler:()=>{
          this.aux = (document.getElementById("aut_contrato") as HTMLInputElement).ariaChecked;
          console.log(this.aux, 'estado');
        
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
    this.presentAlert();
    this.auth.getSesion();
   
  

    //obtener valor agregado por porcentaje
  this.auth.getValorAgregadoLlaves().subscribe(res =>{
      
    /** */
    console.log(res[0].field_valor_descuento, ' aqui valor agregado +');
 localStorage.setItem('valorAgregado',res[0].field_valor_descuento);



  });
  console.log(this.auth.resumen);
  

  this.FormSend.controls.field_contacto.setValue(this.auth.resumen.field_contacto['0']['value']);
 // this.FormSend.controls.field_observaciones.setValue(this.auth.resumen.field_observaciones['0']['value']);
  this.FormSend.controls.field_tema_de_interes.setValue(this.auth.resumen.field_tema_de_interes['0']['value']);

  this.FormSend.controls.field_direccion_entrega.setValue(this.auth.resumen.field_direccion_entrega['0']['value']);
  this.FormSend.controls.field_direccion_destino.setValue(this.auth.resumen.field_direccion_destino['0']['value']);

  this.FormSend.controls.field_locacion_entrega.setValue(this.auth.resumen.field_locacion_entrega['0']['value']);
  this.FormSend.controls.field_locacion_destino.setValue(this.auth.resumen.field_locacion_destino['0']['value']);

  this.FormSend.controls.field_ida_y_vuelta.setValue(this.auth.resumen.field_ida_y_vuelta['0']['value']);
  this.FormSend.controls.field_musica_preferida.setValue(this.auth.resumen.field_musica_preferida['0']['value']);
 
  this.FormSend.controls.field_medio_de_transporte.setValue(this.auth.medioTransporte);
  this.FormSend.controls.field_prefijo_destino.setValue(this.auth.resumen.field_prefijo_destino['0']['value']);
  this.FormSend.controls.field_prefijo_origen.setValue(this.auth.resumen.field_prefijo_origen['0']['value']);

  this.FormSend.controls.field_prefijo_origen.setValue(this.auth.resumen.field_prefijo_origen['0']['value']);
  
 
  this.FormSend.controls.field_barrio_origen.setValue(this.auth.resumen.field_barrio_origen['0']['value']);
  this.FormSend.controls.field_barrio_destino.setValue(this.auth.resumen.field_barrio_destino['0']['value']);
  
  this.FormSend.controls.field_metodo_de_pago.setValue(this.auth.resumen.field_metodo_de_pago['0']['value']);

  this.FormSend.controls.field_nombre_c_origen.setValue(this.auth.resumen.field_nombre_c_origen['0']['value']);

  
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

   //imprimir por consola file precio si es vehiculo le sumo el porcentaje
   console.log(this.FormSend.controls.field_precio_.value, 'precio costo domicilio');

   
   var valorAgregado = parseFloat(localStorage.getItem('valorAgregado'));  // Ejemplo de valor agregado
   
   // Calcula el resultado total
   var resultadoTotalCosto = this.FormSend.controls.field_precio_.value;
   
   // Calcula el porcentaje
   var porcentaje = ( resultadoTotalCosto * valorAgregado) / 100;
   
   // Imprime los resultados en la consola
   
   console.log("Resultado Total de Costo:", resultadoTotalCosto);
   console.log("Valor Agregado:", valorAgregado);
   console.log("Porcentaje de Valor Agregado:", porcentaje)
   console.log("Resultado Total de Costo + porcentaje:", resultadoTotalCosto + porcentaje);
   var TotalDefinitivoParaVehiculos = resultadoTotalCosto + porcentaje;
   this.FormSend.controls.  field_precio_.setValue(TotalDefinitivoParaVehiculos);
   localStorage.setItem('precioTarifa',this.FormSend.controls.field_precio_.value);
   


  
  }

  
  ngOnDestroy() {
   
    console.log("Resumen- OnDestroy")
  }

}
