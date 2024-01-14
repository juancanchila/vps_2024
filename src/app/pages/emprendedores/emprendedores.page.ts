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
   
    this.auth.seleccionarEmprendedores().subscribe(res =>{
      console.log(res);
      
     
     this.character=res.filter(character => character.field_criterio ==this.criterio);
     
    });
   
   
  //a la clase saludable asignar block ya  laos otras asignar none
  console.log(this.criterio);   
  
  }
  iraMetodo2(){
    this.criterio='2'
    this.auth.seleccionarEmprendedores().subscribe(res =>{
      console.log(res);
      
     
      this.searched=res.filter(character => character.field_criterio ==this.criterio);
     
     
    });
    
  
   
    
    console.log(this.criterio);
  }
  iraMetodo3(){
    this.criterio='3'
    this.auth.seleccionarEmprendedores().subscribe(res =>{
      console.log(res);
      
     
      this.searched=res.filter(character => character.field_criterio ==this.criterio);
     
    });
   
    
  }
  iraMetodo4(){
    this.criterio='4'
    this.auth.seleccionarEmprendedores().subscribe(res =>{
      console.log(res);
      
     
      this.searched=res.filter(character => character.field_criterio ==this.criterio);
     
    });
   
  }
  iraMetodo5(){
    this.criterio='5'
    this.auth.seleccionarEmprendedores().subscribe(res =>{
      console.log(res);
      
     
      this.searched=res.filter(character => character.field_criterio ==this.criterio);
     
     
    });
    
  
   
    
    console.log(this.criterio);
  }
  iraMetodo6(){
    this.criterio='6'
    this.auth.seleccionarEmprendedores().subscribe(res =>{
      console.log(res);
      
     
      this.searched=res.filter(character => character.field_criterio ==this.criterio);
     
    });
   
    
  }
  iraMetodo7(){
    this.criterio='7'
    this.auth.seleccionarEmprendedores().subscribe(res =>{
      console.log(res);
      
     
      this.searched=res.filter(character => character.field_criterio ==this.criterio);
     
    });
   
  }
  iraMetodo8(){
    this.criterio='8'
    this.auth.seleccionarEmprendedores().subscribe(res =>{
      console.log(res);
      
     
      this.searched=res.filter(character => character.field_criterio ==this.criterio);
     
    });
   
  }

  


}
