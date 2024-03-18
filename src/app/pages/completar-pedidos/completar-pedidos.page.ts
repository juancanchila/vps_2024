import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { GeolocationsService } from 'src/app/services/geolocations.service';
import { environment } from 'src/environments/environment';
import { Geolocation } from '@capacitor/geolocation';
import { AlertController } from '@ionic/angular';
import { Clipboard } from '@awesome-cordova-plugins/clipboard/ngx';
import { NavController } from '@ionic/angular';
@Component({
  selector: 'app-completar-pedidos',
  templateUrl: './completar-pedidos.page.html',
  styleUrls: ['./completar-pedidos.page.scss'],
})
export class CompletarPedidosPage implements OnInit {

  allPedidos:any;
  character:any=[]
  
  character1:any;
  character2:any;
  character3:any;
  character4:any;
  character5:any;
  character6:any;
  character7:any;
  character8:any;
  character9:string;
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
  urlBase: any;
  estadoButton:any =false;
  colorButton:any ='succes';
  aux: string;
  character41: any;
  character42: any;
  constructor(private navCtrl: NavController,private clipboard: Clipboard,private alertControl: AlertController,private geo: GeolocationsService,private auth: AuthService,private router: Router,private _route: ActivatedRoute) { 
//this.geo.watchPosition();
this.urlBase=environment.urlBase;
    this._route.paramMap.subscribe((params: ParamMap) =>  {
      
      this.allPedidos=JSON.parse(params.get('allPedidos'));

      console.log(this.allPedidos);







      localStorage.setItem('orden',this.allPedidos);

      
     
    
      
    });
  }

  ngOnInit() {
    console.log(localStorage.getItem('AccionEnCamino'));
    this.aux=localStorage.getItem('AccionEnCamino');
    this.estadoButton=localStorage.getItem('estadoButton');
    
    console.log(localStorage.getItem('colorButton'),'color');
    if(localStorage.getItem('colorButton')== null){
      this.colorButton='succes';
    }else{
      this.colorButton=localStorage.getItem('colorButton');
    }
    this.auth.getDetalleOrden().subscribe(res =>{
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
        this.character9=res['field_ida_y_vuelta']['0'].value;
  
      }
      if(this.character9=='true'){
        this.character21='Ida y vuelta';
        
  
      }else{
        this.character21=' Solo Ida';
      }
      
      
     
      
      
     
      if(res['created']['length']!=0){
        this.character12=res['created']['0'].value;
  
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
      }else if(this.character22==3){
        this.character23='CarroyMoto';
      }else if(this.character22==4){
        this.character23='Carro Grande';
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
  enCamino(){
    this.aux= 'true';
    localStorage.setItem('AccionEnCamino', this.aux);
this.estadoButton=true;
localStorage.setItem('estadoButton', this.estadoButton);
this.colorButton='medium';
localStorage.setItem('colorButton', this.colorButton);
    this.auth.actualizarEstadoPedidoEnCamino();
    localStorage.setItem('orden',this.allPedidos);
    this.auth.enviarPushEnCamino();

  }
  async completado(){
    if(this.aux=='true'){
      setTimeout(() => {
        this.auth.enviarPushEnCompletado();
      },25000)

      const alert = await this.alertControl.create({
                  
        header: 'Notificación Vapaesa',
        
        message: '¿Deseas colocarte disponible o tomar un descanso?',
        cssClass: 'alertBreak',
        // al hacer check, vamos a establecer una variable y al darle aceptar preguntamos si esa varibale esta definida si esta se continua
        buttons: [
        {
          cssClass:'botonBreak',
          text:'Tomar Descanso',
          handler:()=>{

            setTimeout(() => {
            this.auth.actualizarEstadoPedidoCompletado();
          },4000)
            setTimeout(() => {
              this.navCtrl.navigateRoot('/animacion');
            },5000)
          
          }
         
        },
        {
          cssClass:'botonPath',
          text:'Disponible',
          handler:()=>{
            this.auth.actualizarEstadoPedidoCompletado();
  
  
            setTimeout(() => {
              this.getLocation();
              this.auth.estadoPedido=true;
              this.auth.actualizarPosicionEnviadaAuxiliar();
            
            this.auth.actualizarDisponibleAuxiliar(true);
            },4000),
            setTimeout(() => {
              this.navCtrl.navigateRoot('/animacion');
             
    },5000)
           
            localStorage.setItem('estadoAuxiliar','Auxiliar Disponible');
            localStorage.removeItem('orden');
            localStorage.removeItem('estadoContrato');
            localStorage.removeItem('AccionEnCamino');
            localStorage.removeItem('estadoButton');
            localStorage.removeItem('colorButton');
            
            
          }
         
        }]
      });
  
      await alert.present();

    }else{
      const alert = await this.alertControl.create({
                  
        header: 'Notificación Vapaesa',
        
        message: 'Debes notificar en camino antes de completar',
        // al hacer check, vamos a establecer una variable y al darle aceptar preguntamos si esa varibale esta definida si esta se continua
        buttons: [
        {
          text:'aceptar',
         
        }]
      });
  
      await alert.present();
    }

    
  }

  async getLocation(){
    console.log('ok');

    Geolocation.getCurrentPosition().then(data => {
      console.log('ok');

        this.auth.latitud = data.coords.latitude;
        this.auth.longitud = data.coords.longitude;

        //llamar metodo que hace la actualizacion


    }).catch(err => {
      console.error(err);
    });
  }

  async presentAlert() {
    const alert = await this.alertControl.create({
       
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
   async copy(copyText) {
    this.clipboard.copy(copyText).then(()=>{
      alert("texto copiado");
    })
  }
  

}