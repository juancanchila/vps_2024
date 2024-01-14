import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-historial-solicitudes',
  templateUrl: './historial-solicitudes.page.html',
  styleUrls: ['./historial-solicitudes.page.scss'],
})
export class HistorialSolicitudesPage implements OnInit {
character:any=[];
  constructor(private auth: AuthService, private router: Router) { }

  ngOnInit() {
    this.auth.getContenidoHistoricoCliente();
    if(localStorage.getItem('rol')=='cliente'){
      this.auth.getContenidoHistoricoCliente();

    }else if(localStorage.getItem('rolAuxiliar')=='Auxiliar'){
      this.auth.getContenidoHistorico().subscribe(res =>{
        console.log(res);
       this.character=res;
      });

    }
   

    
}
irPageProductos(allPedidos:any){

  var pedido={
   
    Id:allPedidos.Id,
   
    
  
  };
  console.log(JSON.stringify(pedido)) ;
  
      this.router.navigate(['/historial-solicitudes-resumen',allPedidos.Id]);
      localStorage.setItem('idPedido',allPedidos.Id);
    }
}
