import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController, MenuController } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-resumen-carrotaller',
  templateUrl: './resumen-carrotaller.page.html',
  styleUrls: ['./resumen-carrotaller.page.scss'],
})
export class ResumenCarrotallerPage implements OnInit {

  FormSend: FormGroup;
  precio_origen: any;
  locaciones :any[];
  aux: string;
  estadoButton: boolean;
  constructor(private menucontrol:MenuController,private router: Router, private auth: AuthService, public fb: FormBuilder,public alertController:AlertController) {
    this.menucontrol.enable(false);
    this.FormSend= this.fb.group({
     
field_locacion_entrega:[""],

field_contacto:[""],



field_medio_de_transporte:[""],

field_direccion_entrega:[""],

field_prefijo_origen:[""],
field_observaciones:[""],

field_metodo_de_pago:[""],
field_barrio_origen:[""],
field_precio_:[""],
field_nombre_c_origen:[""],
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
     
    if(this.FormSend.invalid ){
      const alertElement= await this.alertController.create({
           
        header: '¡Llene todos los campos!',
        message: ' ¿Desea continuar?',
        
        buttons: [
          {
          text:'cancel',
         role:'Cancel'
          
        },
        {
          text:'aceptar',
          handler:()=>{

            //la orden si se crea pero manualemte cambias de moto a carro
           // this.auth.medioTransporte= 2;

           

          }
        }
      ]
      });
    
      await alertElement.present();
      
    }else{
      if(this.estadoButton==true){
        this.estadoButton=false;
        this.auth.CrearSencillaCarroTaller(this.FormSend.value);
     
      }
    
     
      

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
  
 

  ngOnInit() {

    this.estadoButton=true;
    this.auth.getListLocaciones().subscribe(data=>{
      console.log(data);
      this.locaciones=data;
          },error=>{
           
            console.log(error);
           
          });
    this.presentAlert();
    this.auth.getSesion();
   //llamar metodo get valor agregado Taller del authservice

   this.auth.getValorAgregadoTaller().subscribe(res =>{
      
    /** */
    console.log(res[0].field_valor_descuento, ' aqui valor agregado +');
 localStorage.setItem('valorAgregado',res[0].field_valor_descuento);



  });
  
  console.log(this.auth.resumen);
  

  this.FormSend.controls.field_contacto.setValue(this.auth.resumen.field_contacto['0']['value']);
  this.FormSend.controls.field_observaciones.setValue(this.auth.resumen.field_observaciones['0']['value']);
 

  this.FormSend.controls.field_direccion_entrega.setValue(this.auth.resumen.field_direccion_entrega['0']['value']);
 

  this.FormSend.controls.field_locacion_entrega.setValue(this.auth.resumen.field_locacion_entrega['0']['value']);
 

  this.FormSend.controls.field_prefijo_origen.setValue(this.auth.resumen.field_prefijo_origen['0']['value']);
  

  this.FormSend.controls.field_barrio_origen.setValue(this.auth.resumen.field_barrio_origen['0']['value']);

  
  this.FormSend.controls.field_metodo_de_pago.setValue(this.auth.resumen.field_metodo_de_pago['0']['value']);


  this.FormSend.controls.field_nombre_c_origen.setValue(this.auth.resumen.field_nombre_c_origen['0']['value']);





  //
  // Obtén los valores del localStorage y conviértelos a números
var tarifaOrigen = Number(localStorage.getItem('tarifaOrigen'));
var valorAgregado = parseFloat(localStorage.getItem('valorAgregado'));

// Realiza la suma después de la conversión
var resultado = tarifaOrigen + valorAgregado;

// Verifica si la suma fue exitosa
if (!isNaN(resultado)) {
  // La suma fue exitosa, puedes utilizar el resultado
  console.log(resultado);

  this.precio_origen = resultado;
  this.FormSend.controls.  field_precio_.setValue(this.precio_origen);
  console.log(this.precio_origen);
  localStorage.setItem('precioTarifa',this.precio_origen);
} else {
  // La suma no se pudo realizar, maneja este caso según tus necesidades
  console.log("No se pudo rcalcular costo domicilio");
}


  //

  }

  
  ngOnDestroy() {
   
    console.log("Resumen- OnDestroy")
  }

}
