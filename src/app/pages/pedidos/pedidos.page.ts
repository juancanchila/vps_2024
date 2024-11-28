import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';


@Component({
  selector: 'app-pedidos',
  templateUrl: './pedidos.page.html',
  styleUrls: ['./pedidos.page.scss'],
})
export class PedidosPage implements OnInit {
character: any =[];
  constructor(private auth: AuthService, private http: HttpClient, private router:Router) { }


  ngOnInit() {

    this.auth.mostrarContenido().subscribe(res =>{
      console.log(res)
     this.character=res;
    })




  }
  doRefresh(event) {
    this.ngOnInit();
    console.log('Begin async operation');

    setTimeout(() => {
      console.log('Async operation has ended');
      event.target.complete();
    }, 2000);
  }
  ionViewDidEnter(){
      this.auth.mostrarContenido().subscribe(res =>{
      console.log(res)
     this.character=res;
    })

  }
  irPageProductos(allPedidos:any){
console.log(allPedidos,'id');


        this.router.navigate(['/ver-mas-ordenes',JSON.stringify(allPedidos)]);
      }



  irAIndex() {

    this.router.navigate(['/tabs/index']);
/*
   if(localStorage.getItem('rolAuxiliar') === 'Auxiliar'){
    this.router.navigate(['/modo-colaborador']);
   } else{
    this.router.navigate(['/tabs/index']);
   }

*/
  }


  ngOnDestroy() {

    console.log("Pedidos - OnDestroy")
  }

}
