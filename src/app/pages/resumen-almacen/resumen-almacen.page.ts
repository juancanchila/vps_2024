import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController, MenuController } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-resumen-almacen',
  templateUrl: './resumen-almacen.page.html',
  styleUrls: ['./resumen-almacen.page.scss'],
})
export class ResumenAlmacenPage implements OnInit {

  FormSend: FormGroup;
  precio_origen: any;
  precio_destino: any;
  locaciones :any[];
  aux: string;
  estadoButton: boolean;
  que_quieres_comprar: any;
  costo_articulo: any;

  constructor(private menucontrol:MenuController,private router: Router, private auth: AuthService, public fb: FormBuilder,public alertController:AlertController) {
    this.menucontrol.enable(false);
    this.FormSend= this.fb.group({

      field_locacion_entrega:[""],
      field_prefijo_destino:[""],
      field_locacion_destino:[""],
     field_contacto:[""],
      field_direccion_destino:[""],
      field_direccion_entrega:[""],
      field_nombre_del_establecimiento:[""],
field_contacto_destino:[""],
field_valor_declarado:[ ""],
field_observaciones:[""],

field_quieres_comprar:[""],
field_metodo_de_pago:[""],
field_barrio_origen:[""],
field_barrio_destino:[""],
field_prefijo_origen:[""],
field_precio_:[""],
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
      if (this.FormSend.invalid) {

        console.log(this.FormSend.value);
        const alertElement= await this.alertController.create({

          header: '¡Alerta!',
          message: 'La solicitud no se puede completar',

          buttons: [
            {
            text:'cancel',
            role:'this.auth.CrearSencilla(this.FormSend.value);'

          },
          {
            text:'aceptar',
            handler:()=>{
              this.router.navigate(['/tabs']);
            }
          }
        ]
        });

        await alertElement.present();
    }else{
      this.auth.getSesion();

      if(this.estadoButton==true){
        this.estadoButton=false;
        this.auth.CrearAlmacen(this.FormSend.value);

      }

      //this.router.navigate(['/formadepag']);
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
        }
         */
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



  async ngOnInit() {
    try {

      console.log(localStorage.getItem('zona_origen'), 'zona_origen');
      console.log(localStorage.getItem('zona_destino'), 'zona_destino');
      console.log(localStorage.getItem('servicioEvaluado'), 'servicioEvaluado');

     var resultadoTotalCosto = await this.auth.calcularPrecioTarifa(
        localStorage.getItem('servicioEvaluado'),
        localStorage.getItem('zona_origen'),
        localStorage.getItem('zona_destino'),
        1
      );
      resultadoTotalCosto = Number(resultadoTotalCosto);
      console.log(resultadoTotalCosto, 'resultadoTotalCosto');

      this.estadoButton = true;
      this.aux = 'false';
      this.auth.getListLocaciones().subscribe(data => {
        console.log(data);
        this.locaciones = data;
      }, error => {

        console.log(error);

      });
      this.precio_origen = Number(localStorage.getItem('tarifaOrigen'));
      this.precio_destino = Number(localStorage.getItem('tarifaDestino'));
      this.presentAlert();
      //obtener valor agregado por porcentaje
      this.auth.getValorAgregadoVehiculo().subscribe(res => {

        /** */
        console.log(res[0].field_valor_descuento, ' aqui valor agregado +');
        localStorage.setItem('valorAgregado', res[0].field_valor_descuento);



      });
      console.log(this.auth.resumenAlmacen);
      this.que_quieres_comprar = this.auth.resumenAlmacen.field_quieres_comprar['0']['value'];
      this.costo_articulo = this.auth.resumenAlmacen.field_valor_declarado['0']['value'];
      this.FormSend.controls.field_locacion_entrega.setValue(this.auth.resumenAlmacen.field_locacion_entrega['0']['value']);
      this.FormSend.controls.field_prefijo_destino.setValue(this.auth.resumenAlmacen.field_prefijo_destino['0']['value']);

      this.FormSend.controls.field_nombre_del_establecimiento.setValue(this.auth.resumenAlmacen.field_nombre_del_establecimiento['0']['value']);


      this.FormSend.controls.field_locacion_destino.setValue(this.auth.resumenAlmacen.field_locacion_destino['0']['value']);

      //this.FormSend.controls.field_direccion_entrega.setValue(this.auth.resumenAlmacen.field_direccion_entrega['0']['value']);
      this.FormSend.controls.field_direccion_destino.setValue(this.auth.resumenAlmacen.field_direccion_destino['0']['value']);

      this.FormSend.controls.field_direccion_entrega.setValue(this.auth.resumenAlmacen.field_direccion_entrega['0']['value']);


      this.FormSend.controls.field_observaciones.setValue(this.auth.resumenAlmacen.field_observaciones['0']['value']);



      this.FormSend.controls.field_direccion_destino.setValue(this.auth.resumenAlmacen.field_direccion_destino['0']['value']);
      this.FormSend.controls.field_contacto.setValue(this.auth.resumenAlmacen.field_contacto['0']['value']);
      this.FormSend.controls.field_contacto_destino.setValue(this.auth.resumenAlmacen.field_contacto_destino['0']['value']);

      this.FormSend.controls.field_valor_declarado.setValue(this.auth.resumenAlmacen.field_valor_declarado['0']['value']);
      this.FormSend.controls.field_prefijo_origen.setValue(this.auth.resumenAlmacen.field_prefijo_origen['0']['value']);
      this.FormSend.controls.field_barrio_origen.setValue(this.auth.resumenAlmacen.field_barrio_origen['0']['value']);
      this.FormSend.controls.field_barrio_destino.setValue(this.auth.resumenAlmacen.field_barrio_destino['0']['value']);

      this.FormSend.controls.field_metodo_de_pago.setValue(this.auth.resumenAlmacen.field_metodo_de_pago['0']['value']);
      this.FormSend.controls.field_quieres_comprar.setValue(this.auth.resumenAlmacen.field_quieres_comprar['0']['value']);

      this.FormSend.controls.field_nombre_c_origen.setValue(this.auth.resumenAlmacen.field_nombre_c_origen['0']['value']);
      this.FormSend.controls.field_nombre_c_destino.setValue(this.auth.resumenAlmacen.field_nombre_c_destino['0']['value']);



      this.FormSend.controls.field_precio_.setValue(resultadoTotalCosto);

    } catch (error) {
      console.error(error);
    }

  }

  ngOnDestroy() {

    console.log("Resumen- OnDestroy")
  }


}
