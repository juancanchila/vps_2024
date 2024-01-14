import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth.service';
import { environment } from 'src/environments/environment';
import Swiper, { Autoplay, EffectFade, Pagination } from 'swiper';

@Component({
  selector: 'app-compras',
  templateUrl: './compras.page.html',
  styleUrls: ['./compras.page.scss'],
})
export class ComprasPage implements OnInit {
  slider: any;
  urlBase: any;
  AuxCarrosDisponibles: any;
  AuxMotosDisponibles: any;
  AuxDisponiblesMunicipios: any;

  constructor(private router: Router, private auth:AuthService,private alertCtrl: AlertController) {
    this.urlBase=environment.urlBase;
   }
  public swiperConfig={
    pagination:false,
    autoplay:{delay: 10000},
    EffectFade:true
    
  };
  character: any =[
    
  ];
  ngOnInit() {
    this.auth.getUser().subscribe(res =>{
      console.log(res[0]['field_pago_efectivo'],'variable boolean para pago efectivo');
      localStorage.setItem('permitirPagoefectivo',res[0]['field_pago_efectivo']);
      //this.ifAuxiliar=localStorage.getItem('rol');
    
    });
    Swiper.use([Pagination,Autoplay,EffectFade]);
    this.auth.seleccionarSliderCompras().subscribe(res =>{
      console.log(res, ' aqui slider');
     // this.slider=res[0]['field_img_banner'];
      this.slider=res;
      
     //inicializarlas en true
      
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
  ngOnDestroy() {
   
    console.log("Compras - OnDestroy")
  }
  async irPageFruver(){

    //consulta fruver
    this.auth.seleccionarProductosTiendas().subscribe(res =>{
      console.log(res)
      this.character=res;
    })
    console.log(this.AuxMotosDisponibles['length'],'lengt de vector motos');
    if(this.AuxMotosDisponibles.length==0){
      if(this.AuxCarrosDisponibles.length==0){
        const alert = await this.alertCtrl.create({
          
          header: 'Advertencia',
         
          message: 'En este momento no tenemos auxiliar disponible, no podemos crear tu orden',
          // al hacer check, vamos a establecer una variable y al darle aceptar preguntamos si esa varibale esta definida si esta se continua
          buttons: [
         
          {
            text:'aceptar',
            handler:()=>{
          
          this.ngOnInit();
              
            }
          }
        ]
        });
        
        await alert.present();

      

      }else{
        this.auth.seleccionarServicioCarro();
      
       
          
        
          this.router.navigate(['/fruver']);
         
        
     

      }

    }else{
      this.auth.seleccionarServicioMoto();

      
       
        this.router.navigate(['/fruver']);
       
         
        
     
    }
    //
   

  }
  async irPageTecnologia(){
    console.log(this.AuxMotosDisponibles['length'],'lengt de vector motos');
    if(this.AuxMotosDisponibles.length==0){
      if(this.AuxCarrosDisponibles.length==0){
        const alert = await this.alertCtrl.create({
          
          header: 'Advertencia',
         
          message: 'En este momento no tenemos auxiliar disponible, no podemos crear tu orden',
          // al hacer check, vamos a establecer una variable y al darle aceptar preguntamos si esa varibale esta definida si esta se continua
          buttons: [
         
          {
            text:'aceptar',
            handler:()=>{
          
          this.ngOnInit();
              
            }
          }
        ]
        });
        
        await alert.present();

      

      }else{
        this.auth.seleccionarServicioCarro();
      
       
          
          this.router.navigate(['/tecnologia']);
      

      }

    }else{
      this.auth.seleccionarServicioMoto();
     
      
       
        this.router.navigate(['/tecnologia']);
         
        
    
    }
   
  

  }
  async irPageTextiles(){

    console.log(this.AuxMotosDisponibles['length'],'lengt de vector motos');
    if(this.AuxMotosDisponibles.length==0){
      if(this.AuxCarrosDisponibles.length==0){
        const alert = await this.alertCtrl.create({
          
          header: 'Advertencia',
         
          message: 'En este momento no tenemos auxiliar disponible, no podemos crear tu orden',
          // al hacer check, vamos a establecer una variable y al darle aceptar preguntamos si esa varibale esta definida si esta se continua
          buttons: [
         
          {
            text:'aceptar',
            handler:()=>{
          
          this.ngOnInit();
              
            }
          }
        ]
        });
        
        await alert.present();

      

      }else{
        this.auth.seleccionarServicioCarro();
    
       
          
          this.router.navigate(['/textiles']);
        
      

      }

    }else{
      this.auth.seleccionarServicioMoto();
  
      
       
        this.router.navigate(['/textiles']);
         
        
    
    }
   

  }
  async irPageAlmacen(){

    console.log(this.AuxMotosDisponibles['length'],'lengt de vector motos');
    if(this.AuxMotosDisponibles.length==0){
      if(this.AuxCarrosDisponibles.length==0){
        const alert = await this.alertCtrl.create({
          
          header: 'Advertencia',
         
          message: 'En este momento no tenemos auxiliar disponible, no podemos crear tu orden',
          // al hacer check, vamos a establecer una variable y al darle aceptar preguntamos si esa varibale esta definida si esta se continua
          buttons: [
         
          {
            text:'aceptar',
            handler:()=>{
          
          this.ngOnInit();
              
            }
          }
        ]
        });
        
        await alert.present();

      

      }else{
        this.auth.seleccionarServicioCarro();
      
       
          
          this.router.navigate(['/almacen']);
        

      }

    }else{
      this.auth.seleccionarServicioMoto();
     
      
       
        this.router.navigate(['/almacen']);
         
    
    }


  }

}
