import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth.service';
import { environment } from 'src/environments/environment';
import Swiper, { Autoplay, EffectFade, Pagination } from 'swiper';

@Component({
  selector: 'app-restaurantes',
  templateUrl: './restaurantes.page.html',
  styleUrls: ['./restaurantes.page.scss'],
})
export class RestaurantesPage implements OnInit {
  
  fondo= "";
  
  store_id:any;
criterio:any;
  character: any =[];
  slider: any;
  urlBase: string;
  searched: any;
  sombra ="";
  sombra2 ="";
  sombra3 ="";
  sombra4 ="";
  

  constructor(private http: HttpClient,private router: Router, private auth: AuthService,public alertController:AlertController) {
    this.urlBase=environment.urlBase;
   }

  public swiperConfig={
    pagination:false,
    autoplay:{delay: 10000},
    EffectFade:true
    
  };

  ngOnInit() {
    Swiper.use([Pagination,Autoplay,EffectFade]);
    this.auth.seleccionarSliderRestaurantes().subscribe(res =>{
      console.log(res, ' aqui slider');
     // this.slider=res[0]['field_img_banner'];
      this.slider=res;
      
     //inicializarlas en true
      
    });

    
    this.auth.seleccionarRestaurantes().subscribe(res =>{
      console.log(res);
      for(let x in res){
        console.log(res[0]['field_creiteria']);
        
      }
     
     this.character=res;
     this.searched = this.character;
     
    });
    this.auth.getSesion();
  }
  
  cargarTiendas(){
    
    this.auth.seleccionarRestaurantes().subscribe(res =>{
      console.log(res);
      for(let x in res){
        console.log(res[0]['field_creiteria']);
        
      }
     
     this.character=res;
     
    },error2=>{
      console.log(error2);
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
  ngOnDestroy() {
   
    console.log("Restaurante1 - OnDestroy")
  }
  irPageRestaurante1(){
   

  }
  buscarRestaurante(){
    console.log('restFinf');
    this.presentAlert();
    this.router.navigate(['/otros-restaurantes']);
  }
  iraCarrito(){
    this.router.navigate(['/carrito-compras']);
  }
  
  irPageProductos(allPedidos:any){
    localStorage.setItem('idTienda',allPedidos.store_id);
    this.router.navigate(['/restaurante1',JSON.stringify(allPedidos)]);
   
  }
  searchRestaurantes(event){
    const text =event.target.value;
    this.searched = this.character;
        if(text && text.trim() != ''){
          this.searched = this.searched.filter((user: any)=>{
            return (user.Titulo.toLowerCase().indexOf(text.toLowerCase()) > -1);
          })
        }
      }
  iraSaludable(){
  

    this.criterio='saludable'
   
    
   
   
  //a la clase saludable asignar block ya  laos otras asignar none
  console.log(this.criterio);  
  
  // si dark esta en blanco
  if(this.sombra!="dark"){
    this.sombra="dark";
    this.sombra2="";
    this.sombra3="";
    this.sombra4="";
    this.auth.seleccionarRestaurantes().subscribe(res =>{
      console.log(res);
      
     
      this.searched=res.filter(character => character.field_creiteria ==this.criterio);
     
    });
  }else{
    this.sombra="";
    this.ngOnInit();
  }
  
  }
  iraDesayuno(){
    this.criterio='desayuno'
    if(this.sombra2!="dark"){
      this.sombra2="dark";
      this.sombra="";
      this.sombra3="";
      this.sombra4="";
      this.auth.seleccionarRestaurantes().subscribe(res =>{
        console.log(res);
        
       
        this.searched=res.filter(character => character.field_creiteria ==this.criterio);
       
      });
    }else{
      this.sombra2="";
      this.ngOnInit();
    }
    
  
   //


   

   //
    
    console.log(this.criterio);
  }
  iraPizza(){
    this.criterio='pizza'
    if(this.sombra3!="dark"){
      this.sombra3="dark";
      
      this.sombra2="";
      this.sombra="";
      this.sombra4="";
      this.auth.seleccionarRestaurantes().subscribe(res =>{
        console.log(res);
        
       
        this.searched=res.filter(character => character.field_creiteria ==this.criterio);
       
      });
    }else{
      this.sombra3="";
      this.ngOnInit();
    }
    
  }
  iraTipica(){
    this.criterio='tipica'
    if(this.sombra4!="dark"){
      this.sombra4="dark";
      this.sombra="";
      this.sombra3="";
      this.sombra2="";
      this.auth.seleccionarRestaurantes().subscribe(res =>{
        console.log(res);
        
       
        this.searched=res.filter(character => character.field_creiteria ==this.criterio);
       
      });
    }else{
      this.sombra4="";
      this.ngOnInit();
    }
   
  }
  // metodo para mostra popu en otros restaurantes

    async presentAlert() {
    const alert = await this.alertController.create({
       
      header: 'Va Pa Esa',
     
      message: 'En esta sesión puedes hacer los pedidos que se te antojen, nosotros nos encargamos'
      
     
       
       ,
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
        
      

          //si es igua igual a on, lpasas para la otra pagina

         
 

          //this.router.navigate(['/transportes']);
        }
      }]
    });

    await alert.present();
    
   

   }
}
