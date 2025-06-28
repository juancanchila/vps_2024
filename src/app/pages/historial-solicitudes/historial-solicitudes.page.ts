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
    console.log(localStorage.getItem('rol'));

  const rol = localStorage.getItem('rol') || '';
const rolAuxiliar = localStorage.getItem('rolAuxiliar') || '';

if (rol.includes('cliente')) {
  this.auth.getContenidoHistoricoCliente();
} else if (rolAuxiliar.includes('Auxiliar')) {
  this.auth.getContenidoHistorico().subscribe(res => {
    console.log(res);
    this.character = res;
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
