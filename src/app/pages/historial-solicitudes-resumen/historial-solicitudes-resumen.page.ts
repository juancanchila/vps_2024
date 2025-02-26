import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-historial-solicitudes-resumen',
  templateUrl: './historial-solicitudes-resumen.page.html',
  styleUrls: ['./historial-solicitudes-resumen.page.scss'],
})
export class HistorialSolicitudesResumenPage implements OnInit {

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
  character33: any;
  character34: any;
  character35: any;
  character36: any;
  character37: any;
  character38: any;
  character39: any;
  character40: any;
  character41: any;
  character42: any;
  character44: any;
  urlBase: any;
  character43: any;
  imagenLista: boolean;

  constructor(private  alertController: AlertController,private auth: AuthService,private router: Router,private _route: ActivatedRoute) {
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

  ngOnInit() {



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
if(res['field_ponderacion']['length']!=0){
  this.character41=res['field_ponderacion']['0'].value;
}
if(res['field_comentario_de_calificacion']['length']!=0){
  this.character42=res['field_comentario_de_calificacion']['0'].value;
}

if(res['field_nombre_del_establecimiento']['length']!=0){
  this.character43=res['field_nombre_del_establecimiento']['0'].value;
}



console.log('aqui push token movil',this.character33);
localStorage.setItem('tokenNotificacionRecibido',this.character33);





    })
  }
  ngOnDestroy(){

  }


}
