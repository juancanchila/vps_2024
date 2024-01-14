import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-pedido-curso',
  templateUrl: './pedido-curso.page.html',
  styleUrls: ['./pedido-curso.page.scss'],
})
export class PedidoCursoPage implements OnInit {
character:any;
allPedidos:any;
  constructor(private auth: AuthService,private router: Router,private _route: ActivatedRoute) {
    
   
   }
   irPageCompletarPedidos(allPedidos:any){
    this.auth.getDetalleOrden();
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
    
   
    

  ngOnInit() {
   this.character= localStorage.getItem('orden');
   console.log(this.character);
  }
  irACompletarPedidos(){
    this.router.navigate(['/completar-pedidos']);
  }

}
