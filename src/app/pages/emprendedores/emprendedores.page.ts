import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { environment } from 'src/environments/environment';
import Swiper, { Autoplay, EffectFade, Pagination } from 'swiper';

@Component({
  selector: 'app-emprendedores',
  templateUrl: './emprendedores.page.html',
  styleUrls: ['./emprendedores.page.scss'],
})
export class EmprendedoresPage implements OnInit {
  store_id:any;

  character: any =[];
  urlBase: string;
  slider: any;
  criterio: string;
  searched: any;
  sombra ="";
  sombra2 ="";
  sombra3 ="";
  sombra4 ="";
  sombra5 ="";
  sombra6 ="";
  sombra7 ="";
  sombra8 ="";
  constructor(private router: Router, private auth: AuthService) {
    this.urlBase=environment.urlBase;
   }
   public swiperConfig={
    pagination:false,
    autoplay:{delay: 10000},
    EffectFade:true
    
  }
  ngOnInit() {
    Swiper.use([Pagination,Autoplay,EffectFade]);
    this.auth.seleccionarSliderEmprendedores().subscribe(res =>{
      console.log(res, ' aqui slider');
     // this.slider=res[0]['field_img_banner'];
      this.slider=res;
      
     
      
      
    });
    this.auth.getSesion();
    this.auth.seleccionarEmprendedores().subscribe(res =>{
      console.log(res);
     
     this.character=res;
     this.searched = this.character;
     
    }),error2=>{
      console.log(error2,'error emprendedroes');
    };
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
  iraCarrito(){
    this.router.navigate(['/carrito-compras']);
  }
  
  irPageProductos(allPedidos:any){
    localStorage.setItem('idTienda',allPedidos.store_id);
   this.router.navigate(['/emprendedores1',JSON.stringify(allPedidos)]);
   console.log(this.searched);
   // this.router.navigate(['/emprendedores1']);

    // lo que vas a mandar a la otra pagina es el Id de la tienda seleccionada
    
   
  }
  searchEmprendedores(event){
const text =event.target.value;
this.searched = this.character;
    if(text && text.trim() != ''){
      this.searched = this.searched.filter((user: any)=>{
        return (user.Titulo.toLowerCase().indexOf(text.toLowerCase()) > -1);
      })
    }
  }
  iraMetodo1(){
   

    this.criterio='1'
   
    if(this.sombra!="dark"){
      this.sombra="dark";
      this.sombra2="";
      this.sombra3="";
      this.sombra4="";
      this.sombra5="";
      this.sombra6="";
      this.sombra7="";
      this.sombra8="";
      this.auth.seleccionarEmprendedores().subscribe(res =>{
        console.log(res);
        
       
        this.searched=res.filter(character => character.field_creiterio ==this.criterio);
       
      });
    }else{
      this.sombra="";
      this.ngOnInit();
    }
   
   
  //a la clase saludable asignar block ya  laos otras asignar none
  console.log(this.criterio);   
  
  }
  iraMetodo2(){
    this.criterio='2'
    if(this.sombra2!="dark"){
      this.sombra2="dark";
      this.sombra="";
      this.sombra3="";
      this.sombra4="";
      this.sombra5="";
      this.sombra6="";
      this.sombra7="";
      this.sombra8="";
      this.auth.seleccionarEmprendedores().subscribe(res =>{
        console.log(res);
        
       
        this.searched=res.filter(character => character.field_creiterio ==this.criterio);
       
      });
    }else{
      this.sombra2="";
      this.ngOnInit();
    }
    
  
   
    
    console.log(this.criterio);
  }
  iraMetodo3(){
    this.criterio='3'
    if(this.sombra3!="dark"){
      this.sombra3="dark";
      
      this.sombra2="";
      this.sombra="";
      this.sombra4="";
      this.sombra5="";
      this.sombra6="";
      this.sombra7="";
      this.sombra8="";
      this.auth.seleccionarEmprendedores().subscribe(res =>{
        console.log(res);
        
       
        this.searched=res.filter(character => character.field_creiterio ==this.criterio);
       
      });
    }else{
      this.sombra3="";
      this.ngOnInit();
    }   
    
  }
  iraMetodo4(){
    this.criterio='4'
    if(this.sombra4!="dark"){
      this.sombra4="dark";
      this.sombra="";
      this.sombra3="";
      this.sombra2="";
      this.sombra5="";
      this.sombra6="";
      this.sombra7="";
      this.sombra8="";
      this.auth.seleccionarEmprendedores().subscribe(res =>{
        console.log(res);
        
       
        this.searched=res.filter(character => character.field_criterio ==this.criterio);
       
      });
    }else{
      this.sombra4="";
      this.ngOnInit();
    }
   
  }
  iraMetodo5(){
    this.criterio='5'
    if(this.sombra5!="dark"){
      this.sombra5="dark";
      this.sombra="";
      this.sombra3="";
      this.sombra2="";
      this.sombra4="";
      this.sombra6="";
      this.sombra7="";
      this.sombra8="";
      this.auth.seleccionarEmprendedores().subscribe(res =>{
        console.log(res);
        
       
        this.searched=res.filter(character => character.field_criterio ==this.criterio);
       
      });
    }else{
      this.sombra5="";
      this.ngOnInit();
    }
  
   
    
    console.log(this.criterio);
  }
  iraMetodo6(){
    this.criterio='6'
  
    if(this.sombra6!="dark"){
      this.sombra6="dark";
      this.sombra="";
      this.sombra3="";
      this.sombra2="";
      this.sombra4="";
    this.sombra5="";
      this.sombra7="";
      this.sombra8="";
      this.auth.seleccionarEmprendedores().subscribe(res =>{
        console.log(res);
        
       
        this.searched=res.filter(character => character.field_criterio ==this.criterio);
       
      });
    }else{
      this.sombra6="";
      this.ngOnInit();
    }
   
    
  }
  iraMetodo7(){
    this.criterio='7'
    if(this.sombra7!="dark"){
      this.sombra7="dark";
      this.sombra="";
      this.sombra3="";
      this.sombra2="";
      this.sombra4="";
      this.sombra6="";
      this.sombra5="";
      this.sombra8="";
      this.auth.seleccionarEmprendedores().subscribe(res =>{
        console.log(res);
        
       
        this.searched=res.filter(character => character.field_criterio ==this.criterio);
       
      });
    }else{
      this.sombra7="";
      this.ngOnInit();
    }
   
  }
  iraMetodo8(){
    this.criterio='8'
    if(this.sombra8!="dark"){
      this.sombra8="dark";
      this.sombra="";
      this.sombra3="";
      this.sombra2="";
      this.sombra4="";
      this.sombra6="";
      this.sombra7="";
      this.sombra5="";
      this.auth.seleccionarEmprendedores().subscribe(res =>{
        console.log(res);
        
       
        this.searched=res.filter(character => character.field_criterio ==this.criterio);
       
      });
    }else{
      this.sombra8="";
      this.ngOnInit();
    }
   
  }

  


}
