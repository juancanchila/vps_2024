import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { map } from 'rxjs/operators';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-index-auxiliares',
  templateUrl: './index-auxiliares.page.html',
  styleUrls: ['./index-auxiliares.page.scss'],
})
export class IndexAuxiliaresPage {
character:any=[];
urlAuxName: any;
  constructor(private router: Router,private http: HttpClient,private auth: AuthService) { }

  ionViewWillEnter() {
    
    this.auth.getContenidoAsignado().subscribe(res =>{
      console.log(res,'aqui conten aux')
     this.character=res;
    })
     
 
    

    }

    doRefresh(event) {
      this.ionViewWillEnter();
      console.log('Begin async operation');
  
      setTimeout(() => {
        console.log('Async operation has ended');
        event.target.complete();
      }, 2000);
    }
  
    irPageProductos(allPedidos:any){

console.log(allPedidos['Id'],'aqui id all peidos');
localStorage.setItem('idPedido',allPedidos['Id']);

      var pedido={
   
        Id:allPedidos.Id
      
      }

     // this.auth.getDetalleOrden();
      console.log(JSON.stringify(pedido)) ;
    
        this.router.navigate(['/ordenes-asignadas',JSON.stringify(allPedidos.Id)]);
    
   }

   irAVerOrdenesAux()
   {
    this.router.navigate(['/index-auxiliares']);
   }
 
  
 
  ngOnDestroy() {
   
    console.log("index - OnDestroy")
  }
}
