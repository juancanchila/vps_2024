import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import Swiper, { Autoplay, EffectFade, Pagination } from 'swiper';

import { AuthService } from '../services/auth.service';
import { CarritoService } from '../services/CarritoService';
import {
  ActionPerformed,
  PushNotificationSchema,
  PushNotifications,
  Token,
  PushNotification,
  PushNotificationActionPerformed,
} from '@capacitor/push-notifications';
import { AlertController } from '@ionic/angular';


@Component({
  selector: 'app-index',
  templateUrl: './index.page.html',
  styleUrls: ['./index.page.scss'],
})
export class IndexPage implements OnInit {
  //ifAuxiliar: any;
  urlBase:any;
  token:string;
  expireIn:string;
  name:string;
  id:number;
  character:any=[];
  slider:any=[];
  tienda:'';
  ifAuxiliar: any;
  AuxCarrosDisponibles: any;
  AuxMotosDisponibles: any;
  AuxDisponiblesMunicipios: any;

  constructor(private auth: AuthService , private router:Router,private cs: CarritoService,private alertCtrl: AlertController) { 

    this.urlBase=environment.urlBase;
  }

  public swiperConfig={
    pagination:false,
    autoplay:{delay: 10000},
    EffectFade:true
    
  };
 
  ngOnInit() {
   
    this.auth.isTokenError=null;
    this.auth.getUser().subscribe(res =>{
      console.log(res);
      console.log(res[0]['field_pago_efectivo'],'variable boolean para pago efectivo');
      localStorage.setItem('permitirPagoefectivo',res[0]['field_pago_efectivo']);
     
      //this.ifAuxiliar=localStorage.getItem('rol');
    
    });
    
    localStorage.setItem('tienda',this.tienda);
    Swiper.use([Pagination,Autoplay,EffectFade]);
    this.auth.seleccionarSlider().subscribe(res =>{
      console.log(res, ' aqui slider');
     // this.slider=res[0]['field_img_banner'];
      this.slider=res;
      
     
      
      
    });

    
    
    this.auth.seleccionarFooter().subscribe(res =>{
      console.log(res[0]['field_footer_img']);
      this.character=res[0]['field_footer_img'];
      
     
      
      
    });

    this.auth.obtenerRoleUsuario().subscribe(res =>{
      console.log(res);
      localStorage.setItem('rol',res);
      //this.ifAuxiliar=localStorage.getItem('rol');
    
    });
    
    this.auth.getAuxiliaresDisponiblesCarros().subscribe(res =>{
      let vpda=[];
      console.log(res, ' aqui carro');
      this.AuxCarrosDisponibles=res;
     
     
 
    });
    this.auth.getAuxiliaresDisponiblesMotos().subscribe(res =>{
      console.log(res, ' aqui motos');
      this.AuxMotosDisponibles=res;
    
    });

    this.auth.getAuxiliaresDisponiblesMunicipio().subscribe(res =>{
      console.log(res, ' aqui aux municiipio');
      this.AuxDisponiblesMunicipios=res;
    
    });
    
  }

  reload(){
    this.auth.getAuxiliaresDisponiblesCarros().subscribe(res =>{
      let vpda=[];
      console.log(res, ' aqui carro');
      this.AuxCarrosDisponibles=res;
     
     
 
    });
    this.auth.getAuxiliaresDisponiblesMotos().subscribe(res =>{
      console.log(res, ' aqui motos');
      this.AuxMotosDisponibles=res;
    
    });

    this.auth.getAuxiliaresDisponiblesMunicipio().subscribe(res =>{
      console.log(res, ' aqui aux municiipio');
      this.AuxDisponiblesMunicipios=res;
    
    });



  }
  temporizador(){
    //setInterval(this.geo.watchPosition(), 2000);
    //this.geo.watchPosition();
    
    //let timer = setInterval(() => this.watchPosition(), 30000);
  }
  
  ngOnDestroy() {
   
    console.log("Index - OnDestroy")
  }
  irPageMensajeria(){
    /** */
  
      this.router.navigate(['/mensajeria']);
   
    
    
  

   
    

  }
 
  async irPageLlaves(){
    localStorage.setItem('mensajeria','llaves');

    this.router.navigate(['/transportes']);
   
   
    
  

   
   
   

  }
  async irPageRestaurantes(){
    //consuktar restaurantes
    this.auth.seleccionarRestaurantes();


    this.router.navigate(['/restaurantes']);

   
    

  }
  irPageCompras(){
    
      this.router.navigate(['/compras']);
   
   

  }

  ionViewWillEnter(){
    this.auth.obtenerRoleUsuario().subscribe(res =>{
      console.log(res);
     
      this.ifAuxiliar=res;
      console.log(this.ifAuxiliar);
      if(this.ifAuxiliar=='Auxiliar'){
       // this.geo.watchPosition();
       // console.log('locacion',this.geo.watchCoordinate);
        
      }else{
       
       
      }
    
    });
   
  
   
   this.reload();

  }
  async irPageEmprendedores(){


    this.router.navigate(['/emprendedores']);
 
     
   
    

  }
  irPageTelotengo(){
   
      this.router.navigate(['/telotengo']);
   
    

  }
  

}
