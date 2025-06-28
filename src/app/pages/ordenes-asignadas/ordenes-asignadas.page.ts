import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth.service';
import { environment } from 'src/environments/environment';
import { Clipboard } from '@awesome-cordova-plugins/clipboard/ngx';

@Component({
  selector: 'app-ordenes-asignadas',
  templateUrl: './ordenes-asignadas.page.html',
  styleUrls: ['./ordenes-asignadas.page.scss'],
})
export class OrdenesAsignadasPage implements OnInit {

  allPedidos:any;
  character:any;
  character1:any;
  character2:any;
  character3:any;
  character4:any;
  character5:any;
  character6:any;
  character7:any;
  character8:any;
  character9:boolean;
  character10:any;
  character11:any;
  character12:any;
  character13:any;
  character14:any;
  character15:any;
  character16:any;
  character17:any;
  character18:any;
  character19:any;
  character20:any;
  character21:any;
  character22:any;
  character23:any;
  character24:any;
  character25:any;
  character26:any;
  character27:any;
  character28:any;
  character29:any;
  character30:any;
  character31:any;
  character32:any;
  character33: any;
  character34: any;
  character35: any;
  character36: any;
  character37: any;
  character38: any;
  character39: any;
  character40: any;
  character41: any;


  urlBase: any;
  aux: string;
  character42: any;
  imagenLista: boolean;

  constructor(private clipboard: Clipboard,private  alertController: AlertController,private auth: AuthService,private router: Router,private _route: ActivatedRoute) {
    this.urlBase=environment.urlBase;
    this._route.paramMap.subscribe((params: ParamMap) =>  {

      this.allPedidos=JSON.parse(params.get('allPedidos'));

      //todas las variables las vas a obtener de llamar al nodo

      console.log(this.allPedidos);







    });
  }

  imagenCargada(event: boolean) {
    this.imagenLista = event;
  }

  irPageCompletarPedidos(allPedidos:any){
    console.log(this.aux,'aux');
if(this.aux=='false'){

  this.presentAlert();
}else{





    //this.auth.getDetalleOrden();


    console.log(this.character,'que pasa');
    var pedido={


      id:allPedidos.id

    }

      // para obetener todos los datos de una orden, hayq ue llamar a la urele
     //      /node/this.allpedidos?

     // el resultado de ese post son odos los datos que tenga la orden

    console.log(JSON.stringify(pedido)) ;

      this.router.navigate(['/completar-pedidos',JSON.stringify(allPedidos)]);



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
      handler:()=>{
        this.aux='false';
        //this.router.navigate(['/tabs']);
      }

    },
    {
      text:'aceptar',
      handler:()=>{

        this.aux = (document.getElementById("aut_contrato") as HTMLInputElement).ariaChecked;
        console.log(this.aux, 'estado');
        localStorage.setItem('estadoContrato',this.aux);

        //si es igua igual a on, lpasas para la otra pagina

        if(this.aux=='false'){
         // le muestra que no marcho (primero)
          this.presentAlert();
         // recarga la pagina con un timer (segundo)
        }else{


          let estado:boolean=true;
          setTimeout(() => {
            this.auth.actualizarContraoPedidos(this.allPedidos,estado);
          },10000)

        }

        //this.router.navigate(['/transportes']);
      }
    }]
  });

  await alert.present();



 }
 async presentAlertFirmado() {
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
    +'<style> ion-checkbox#aut_contrato{padding: 5px 0px 0px 4px} #alert-1-msg{text-align: justify} .alert-message {text-align: justify}  .labelAcepto{display: inline} div{display: block}   </style>'
      ,
    // al hacer check, vamos a establecer una variable y al darle aceptar preguntamos si esa varibale esta definida si esta se continua

  });

  await alert.present();



 }
  ngOnInit() {
    console.log(localStorage.getItem('estadoContrato'));
    this.aux=localStorage.getItem('estadoContrato');
    if(this.aux=='false' || this.aux==undefined){
      this.presentAlert();
    }






    this.auth.getDetalleOrden().subscribe(res =>{
      console.log(res);
      console.log(res);

      console.log(res['field_observaciones']['length']);

      if(res['field_observaciones']['length'] !=0){
        this.character7=res['field_observaciones']['0'].value;

      }
      if(res['field_estado_del_servicio']['length'] !=0){
        this.character=res['field_estado_del_servicio']['0'].value;

      }
      if(this.character== true){
        this.character31 ='Completado'

      }else if(this.character== false){
        this.character31 ='No Completado'
      }
      if(res['field_direccion_entrega']['length'] !=0){
        this.character1=res['field_direccion_entrega']['0'].value;

      }


      if(res['field_asignado']['length'] !=0){
        this.character25=res['field_asignado']['0']['target_id'];

      }

      if(res['field_barrio_origen']['length'] !=0){
        this.character34=res['field_barrio_origen']['0'].value;

      }

      if(res['field_barrio_destino']['length'] !=0){
        this.character35=res['field_barrio_destino']['0'].value;

      }


      if(res['field_url_imagen_destino']['length'] !=0){
        this.character36=res['field_url_imagen_destino']['0'].value;

      }
      if(res['field_url_imagen_origen']['length'] !=0){
        this.character37=res['field_url_imagen_origen']['0'].value;

      }


      if(res['field_locacion_entrega']['length']  !=0){
        this.character2=res['field_locacion_entrega']['0'].value;

      }
      if(res['field_prefijo_destino']['length']  !=0){
        this.character3=res['field_prefijo_destino']['0'].value;

      }
      if(res['field_prefijo_origen']['length']  !=0){
        this.character10=res['field_prefijo_origen']['0'].value;

      }
      if(res['field_direccion_destino']['length'] !=0){
        this.character4=res['field_direccion_destino']['0'].value;

      }
      if(res['field_contacto_destino']['length'] !=0){
        this.character5=res['field_contacto_destino']['0'].value;

      }
      if(res['field_locacion_destino']['length']  !=0){
        this.character6=res['field_locacion_destino']['0'].value;

      }
      if(res['field_metodo_de_pago']['length']!=0){
        this.character8=res['field_metodo_de_pago']['0'].value;

      }
      if(res['field_ida_y_vuelta']['length']!=0){
        this.character9=  res['field_ida_y_vuelta']['0'].value;
  console.log(this.character9)
  if(this.character9==true){
    this.character21='Ida y vuelta';


  }else{
    this.character21=' Solo Ida';
  }
      }







      if (res['created'] && res['created'].length > 0) {
        const fechaIso = res['created'][0].value;
        const fecha = new Date(fechaIso);

        this.character12 = fecha.toLocaleString('es-ES', {
          day: '2-digit',
          month: '2-digit',
          year: 'numeric',
          hour: '2-digit',
          minute: '2-digit'
        });
      }
      if(res['body']['length']!=0){
        this.character14=res['body']['0'].value;

      }
      if(res['field_body2']['length']!=0){
        this.character15=res['field_body2']['0'].value;

      }
      if(res['field_quieres_comprar']['length']!=0){
        this.character16=res['field_quieres_comprar']['0'].value;

      }
      if(res['field_farmacia']['length']!=0){
        this.character17=res['field_farmacia']['0'].value;

      }

      if(res['field_musica_preferida']['length']!=0){
        this.character18=res['field_musica_preferida']['0'].value;

      }
      if(res['field_tema_de_interes']['length']!=0){
        this.character19=res['field_tema_de_interes']['0'].value;

      }
      if(res['field_contacto']['length']!=0){
        this.character20=res['field_contacto']['0'].value;

      }
      if(res['field_medio_de_transporte']['length']!=0){
        this.character22=res['field_medio_de_transporte']['0'].value;

      }
      if(res['field_respuesta_documentos']['length']!=0){
        this.character32=res['field_respuesta_documentos']['0'].value;

      }
      if(this.character22==1){
        this.character23='Moto';

      }else if(this.character22==2){
        this.character23='Carro';
      }

      if(res['field_valor_declarado']['length']!=0){
        this.character24=res['field_valor_declarado']['0'].value;
  }
  if(res['nid']['length']!=0){
    this.character26=res['nid']['0'].value;
}

if(res['field_direccion_destino_r2']['length']!=0){
  this.character27=res['field_direccion_destino_r2']['0'].value;
}
if(res['field_locacion_destino_r']['length']!=0){
  this.character28=res['field_locacion_destino_r']['0'].value;
}

if(res['field_locacion_destino_r2']['length']!=0){
  this.character29=res['field_locacion_destino_r2']['0'].value;
}
if(res['field_contacto_destino_r2']['length']!=0){
  this.character30=res['field_contacto_destino_r2']['0'].value;
}

if(res['field_push_token']['length']!=0){
  this.character33=res['field_push_token']['0'].value;
}

if(res['title']['length']!=0){
  this.character38=res['title']['0'].value;
}
if(res['field_nombre_c_origen']['length']!=0){
  this.character39=res['field_nombre_c_origen']['0'].value;
}
if(res['field_nombre_c_destino']['length']!=0){
  this.character40=res['field_nombre_c_destino']['0'].value;
}
if(res['field_nombre_del_establecimiento']['length']!=0){
  this.character41=res['field_nombre_del_establecimiento']['0'].value;
}

if(res['field_precio_']['length']!=0){
  this.character42=res['field_precio_']['0'].value;
}

console.log('aqui push token movil',this.character33);
localStorage.setItem('tokenNotificacionRecibido',this.character33);





    })
  }
  async copy(copyText) {
    this.clipboard.copy(copyText).then(()=>{
      alert("texto copiado");
    })
  }
  ngOnDestroy(){

  }

}
