import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { AlertController, IonModal, ModalController } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth.service';
import { environment } from 'src/environments/environment';
import { Clipboard } from '@awesome-cordova-plugins/clipboard/ngx';
@Component({
  selector: 'app-ver-mas-ordenes',
  templateUrl: './ver-mas-ordenes.page.html',
  styleUrls: ['./ver-mas-ordenes.page.scss'],
})
export class VerMasOrdenesPage implements OnInit {
  @ViewChild(IonModal) modal: IonModal;

  message = 'This modal example uses triggers to automatically open a modal when the button is clicked.';
  name: string;
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
character33:any;
character34:any;
character35:any;
character36:any;
character37:any;
character38:any;
character39:any;
character40:any;
character41:any;
character42:any;
character43:any;
character44:any;
character45:any;
urlBase: any;
eliminarIdNode:any;
notificarPushParaCancelar:any;
copyText:string="";
pasteText:string="";
  openModal: string;
  isModalOpen: boolean;
  validaModal: boolean=false;
  servicioEvaluado: string;

  constructor(private modalCtrl: ModalController,private clipboard: Clipboard,private router:Router,private auth: AuthService,private alertController:AlertController ,private _route: ActivatedRoute) {
    this.urlBase=environment.urlBase;
    this.openModal='open-modal';
    this._route.paramMap.subscribe((params: ParamMap) =>  {

      this.allPedidos=JSON.parse(params.get('allPedidos'));

      console.log(this.allPedidos);
      console.log(this.allPedidos['nid']);
      localStorage.setItem('nodePatch',this.allPedidos['nid']);
this.eliminarIdNode=this.allPedidos['nid'];
  this.notificarPushParaCancelar=this.allPedidos['field_push_user'];



    });
  }
  doRefresh(event) {
    this.ngOnInit();
    console.log('Begin async operation');

    setTimeout(() => {
      console.log('Async operation has ended');
      event.target.complete();
    }, 2000);
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
      +'<style> ion-checkbox#aut_contrato{padding: 5px 0px 0px 4px} #alert-1-msg{text-align: justify} .alert-message {text-align: justify}  .labelAcepto{display: inline} div{display: block}   </style>'
        ,
      // al hacer check, vamos a establecer una variable y al darle aceptar preguntamos si esa varibale esta definida si esta se continua

    });

    await alert.present();



   }

   async cancelarPedido(){
    localStorage.setItem('tokenNotificacionRecibido', this.notificarPushParaCancelar);
    localStorage.setItem('sencillaCreada',this.eliminarIdNode);
      console.log('cancelar pedido',this.eliminarIdNode);
     if(this.allPedidos['field_aceptado_auxiliar']!='Aceptado' ){
      const alertElement= await this.alertController.create({

        header: '¿Esta seguro que desea cancelar este pedido?',
        message: 'Vapaesa',

        buttons: [
          {
          text:'cancel',
          role:'cancel'
        },
        {
          text:'aceptar',
          handler:()=>{

          this.auth.quitarSencillaLista();
          this.auth.enviarPushParaCancelarPedido();
          this.router.navigate(['/pedidos']);
          }
        }
      ]
      });

      await alertElement.present();

     }else{
      const alertElement= await this.alertController.create({

        header: 'Notificación',
        message: 'Ya No es posible cancelar este pedido',

        buttons: [
          {
          text:'cancel',
          role:'cancel'
        },
        {
          text:'aceptar',
          handler:()=>{

          }
        }
      ]
      });

      await alertElement.present();
     }

  }

  ngOnInit() {



   if(this.allPedidos['field_estado_del_servicio']=='Completado' && this.allPedidos['field_calificaion']=='false'){
    this.isModalOpen=true;
    }



    if(this.allPedidos['field_observaciones'] != ""){
      this.character7=this.allPedidos['field_observaciones'];

    }
    if(this.allPedidos['field_estado_del_servicio']!= ""){
      this.character=this.allPedidos['field_estado_del_servicio'];

    }
    if(this.allPedidos['field_nombres_registro_2']!= ""){
      this.character1=this.allPedidos['field_nombres_registro_2'];

    }
    if(this.allPedidos['field_locacion_entrega']!= ""){
      this.character2=this.allPedidos['field_locacion_entrega'];

    }
    if(this.allPedidos['field_prefijo_destino']!= ""){
      this.character3=this.allPedidos['field_prefijo_destino'];

    }
    if(this.allPedidos['field_prefijo_origen']!= ""){
      this.character10=this.allPedidos['field_prefijo_origen'];

    }
    if(this.allPedidos['field_direccion_destino']!= ""){
      this.character4=this.allPedidos['field_direccion_destino'];

    }
    if(this.allPedidos['field_direccion_entrega']!= ""){
      this.character13=this.allPedidos['field_direccion_entrega'];

    }
    if(this.allPedidos['field_contacto_destino']!= ""){
      this.character5=this.allPedidos['field_contacto_destino'];

    }
    if(this.allPedidos['field_contacto']!= ""){
      this.character25=this.allPedidos['field_contacto'];

    }
    if(this.allPedidos['field_locacion_destino']!= ""){
      this.character6=this.allPedidos['field_locacion_destino'];

    }
    if(this.allPedidos['field_metodo_de_pago']!= ""){
      this.character8=this.allPedidos['field_metodo_de_pago'];

    }
    if(this.allPedidos['field_ida_y_vuelta']!= ""){
      this.character9=this.allPedidos['field_ida_y_vuelta'];

    }




    if(this.allPedidos['created']!= ""){
      this.character12=this.allPedidos['created'];

    }
    if(this.allPedidos['body']!= ""){
      this.character14=this.allPedidos['body'];

    }
    if(this.allPedidos['field_body2']!= ""){
      this.character15=this.allPedidos['field_body2'];

    }
    if(this.allPedidos['field_quieres_comprar']!= ""){
      this.character16=this.allPedidos['field_quieres_comprar'];

    }
    if(this.allPedidos['field_farmacia']!= ""){
      this.character17=this.allPedidos['field_farmacia'];

    }

    if(this.allPedidos['field_musica_preferida']!= ""){
      this.character18=this.allPedidos['field_musica_preferida'];

    }
    if(this.allPedidos['field_tema_de_interes']!= ""){
      this.character19=this.allPedidos['field_tema_de_interes'];

    }
    if(this.allPedidos['field_medio_de_transporte']!= ""){
      this.character21=this.allPedidos['field_medio_de_transporte'];

    }
    console.log(this.character21),'med transport';
    if(this.character21==1){
      this.character22='Moto';

    }else if(this.character21==2){
      this.character22='Carro';

    }
  else if(this.character21==3){
    this.character22='MotoyCarro';


}else if(this.character21==4){
  this.character22='Carro Grande';

}
    if(this.allPedidos['field_respuesta_documentos']!= ""){
      this.character23=this.allPedidos['field_respuesta_documentos'];

    }
    if(this.allPedidos['nid']!= ""){
      this.character24=this.allPedidos['nid'];

    }
    if(this.allPedidos['field_valor_declarado']!= ""){
      this.character26=this.allPedidos['field_valor_declarado'];

    }
    if(this.allPedidos['field_clase_de_pago']!= ""){
      this.character27=this.allPedidos['field_clase_de_pago'];

    }
    if(this.allPedidos['field_celular_registro']!= ""){
      this.character28=this.allPedidos['field_celular_registro'];

    }

    if(this.allPedidos['field_barrio_origen']!= ""){
      this.character29=this.allPedidos['field_barrio_origen'];

    }
    if(this.allPedidos['field_barrio_destino']!= ""){
      this.character30=this.allPedidos['field_barrio_destino'];

    }
    if(this.allPedidos['field_url_imagen_origen']!= ""){
      this.character31=this.allPedidos['field_url_imagen_origen'];

    }

    if(this.allPedidos['field_url_imagen_destino']!= ""){
      this.character32=this.allPedidos['field_url_imagen_destino'];

    }

    if(this.allPedidos['field_precio_']!= ""){
      this.character33=this.allPedidos['field_precio_'];

    }
    if(this.allPedidos['field_nombre_c_origen']!= ""){
      this.character34=this.allPedidos['field_nombre_c_origen'];

    }
    if(this.allPedidos['field_nombre_c_destino']!= ""){
      this.character35=this.allPedidos['field_nombre_c_destino'];

    }

    if(this.allPedidos['field_cuenta_bancolombia']!= ""){
      this.character36=this.allPedidos['field_cuenta_bancolombia'];

    }

    if(this.allPedidos['field_cuenta_nequi']!= ""){
      this.character37=this.allPedidos['field_cuenta_nequi'];

    }

    if(this.allPedidos['field_regresar_por_wasap']!= ""){
      this.character38=this.allPedidos['field_regresar_por_wasap'];

    }

    if(this.allPedidos['user_picture']!= ""){
      this.character39=this.allPedidos['user_picture'];

    }

    if(this.allPedidos['field_aceptado_auxiliar']!= ""){
      this.character40=this.allPedidos['field_aceptado_auxiliar'];

    }
    if(this.allPedidos['field_aceptado_cliente']!= ""){

      if(this.allPedidos['field_aceptado_cliente']== "On"){
        this.character41="Aceptado";

      }else{
        this.character41=" No Aceptado";
      }


    }

    if(this.allPedidos['field_quien_paga_']!= ""){
      this.character42=this.allPedidos['field_quien_paga_'];

    }
    if(this.allPedidos['field_nombre_del_establecimiento']!= ""){
      this.character43=this.allPedidos['field_nombre_del_establecimiento'];

    }
    if(this.allPedidos['field_en_camino']!= "" && this.allPedidos['field_estado_del_servicio'] == "No Completado"){
      this.character44=this.allPedidos['field_en_camino'];

    }
//tipo de orden
      this.character45=this.allPedidos['field_tipo_de_orden'];





  }

  ionViewDidEnter() {

    if(this.allPedidos['field_observaciones'] != ""){
      this.character7=this.allPedidos['field_observaciones'];

    }
    if(this.allPedidos['field_estado_del_servicio']!= ""){
      this.character=this.allPedidos['field_estado_del_servicio'];

    }
    if(this.allPedidos['field_nombres_registro_2']!= ""){
      this.character1=this.allPedidos['field_nombres_registro_2'];

    }
    if(this.allPedidos['field_locacion_entrega']!= ""){
      this.character2=this.allPedidos['field_locacion_entrega'];

    }
    if(this.allPedidos['field_prefijo_destino']!= ""){
      this.character3=this.allPedidos['field_prefijo_destino'];

    }
    if(this.allPedidos['field_prefijo_origen']!= ""){
      this.character10=this.allPedidos['field_prefijo_origen'];

    }
    if(this.allPedidos['field_direccion_destino']!= ""){
      this.character4=this.allPedidos['field_direccion_destino'];

    }
    if(this.allPedidos['field_direccion_entrega']!= ""){
      this.character13=this.allPedidos['field_direccion_entrega'];

    }
    if(this.allPedidos['field_contacto_destino']!= ""){
      this.character5=this.allPedidos['field_contacto_destino'];

    }
    if(this.allPedidos['field_contacto']!= ""){
      this.character25=this.allPedidos['field_contacto'];

    }
    if(this.allPedidos['field_locacion_destino']!= ""){
      this.character6=this.allPedidos['field_locacion_destino'];

    }
    if(this.allPedidos['field_metodo_de_pago']!= ""){
      this.character8=this.allPedidos['field_metodo_de_pago'];

    }
    if(this.allPedidos['field_ida_y_vuelta']!= ""){
      this.character9=this.allPedidos['field_ida_y_vuelta'];

    }




    if(this.allPedidos['created']!= ""){
      this.character12=this.allPedidos['created'];

    }
    if(this.allPedidos['body']!= ""){
      this.character14=this.allPedidos['body'];

    }
    if(this.allPedidos['field_body2']!= ""){
      this.character15=this.allPedidos['field_body2'];

    }
    if(this.allPedidos['field_quieres_comprar']!= ""){
      this.character16=this.allPedidos['field_quieres_comprar'];

    }
    if(this.allPedidos['field_farmacia']!= ""){
      this.character17=this.allPedidos['field_farmacia'];

    }

    if(this.allPedidos['field_musica_preferida']!= ""){
      this.character18=this.allPedidos['field_musica_preferida'];

    }
    if(this.allPedidos['field_tema_de_interes']!= ""){
      this.character19=this.allPedidos['field_tema_de_interes'];

    }
    if(this.allPedidos['field_medio_de_transporte']!= ""){
      this.character21=this.allPedidos['field_medio_de_transporte'];

    }
    console.log(this.character21,'med transport');
    if(this.character21==1){
      this.character22='Moto';

    }else if(this.character21==2){
      this.character22='Carro';

    }
    if(this.allPedidos['field_respuesta_documentos']!= ""){
      this.character23=this.allPedidos['field_respuesta_documentos'];

    }
    if(this.allPedidos['nid']!= ""){
      this.character24=this.allPedidos['nid'];

    }
    if(this.allPedidos['field_valor_declarado']!= ""){
      this.character26=this.allPedidos['field_valor_declarado'];

    }
    if(this.allPedidos['field_clase_de_pago']!= ""){
      this.character27=this.allPedidos['field_clase_de_pago'];

    }
    if(this.allPedidos['field_celular_registro']!= ""){
      this.character28=this.allPedidos['field_celular_registro'];

    }




  }
  cancel() {
    return this.modalCtrl.dismiss(null, 'cancel');
  }

  confirm() {
    console.log(this.name);
    console.log(this.auth.ponderacion,'start');
    if(this.auth.ponderacion>=3){
      this.validaModal=true;
      this.auth.enviarCalificacionPedido(this.name);
     this.modalCtrl.dismiss(this.name, 'confirm');
     this.ngOnInit();


    }else  if(this.auth.ponderacion<3){


      if( this.name != undefined){

        this.validaModal=true;
        this.auth.enviarCalificacionPedido(this.name);
       this.modalCtrl.dismiss(this.name, 'confirm');
       this.auth.enviarNodoCalificcacionBaja(this.allPedidos['nid']);
       this.ngOnInit();

      }else{
        alert('coloca el motivo de tu calificacion!');
      }
    }

  }

  //metodo para copiar
   async copy(copyText) {
    this.clipboard.copy(copyText).then(()=>{
      alert("texto copiado");
    })
  }

  //metodo  para pegar
paste(){
this.clipboard.paste().then((text)=>{
  this.pasteText=text;
  alert("texto pegado");
})
}

clearCopy(){
  this.clipboard.clear().then((text)=>{

    alert("texto limpiado");
  })
  }

  clickStar(star){
    this.auth.ponderacion=star;
    console.log(star);
  }



}
