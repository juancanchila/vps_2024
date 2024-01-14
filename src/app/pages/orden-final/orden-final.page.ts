import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-orden-final',
  templateUrl: './orden-final.page.html',
  styleUrls: ['./orden-final.page.scss'],
})
export class OrdenFinalPage implements OnInit {
  NumeroOrden: any;
  auxiliarAsignado:any;
  NameAux:any;
  respuestaIsToken:any;
  respuestaIsTokenError:any;
  datosObtenido: boolean =false;
  constructor(private alertController: AlertController,private auth: AuthService, private router: Router) {


   }

  ngOnInit() {


    this.NameAux =localStorage.getItem('Name');

    this.auxiliarAsignado= localStorage.getItem('AuxiliarAsignado');
    this.NumeroOrden =localStorage.getItem('sencillaCreada');
    //this.auth.asignar(this.NumeroOrden);
    //this.auth.asignarAuxiliarPost();
   
    console.log(this.NameAux,this.auxiliarAsignado,this.NumeroOrden,"Ordenes-creadas")


    


    
//dependiendo de la respuesta que hago?
    
if(this.auth.isTokenError==null){
  this.accionAfterResponse(this.respuestaIsToken,this.respuestaIsTokenError);
}



    
  
    
    

  }

 
  
  irSiguiente(){
    this.auth.isTokenError=null;
    localStorage.removeItem("sencillaCreada");
    localStorage.removeItem("Name"); 
    localStorage.removeItem("AuxiliarAsignado");
    localStorage.removeItem("OrdenCreada");
    this.router.navigate(['/pedidos']);
    localStorage.removeItem("idPedido");
           localStorage.removeItem("id_product");
           localStorage.removeItem("precio_product");
           


           localStorage.removeItem('tarifaDestino');
           localStorage.removeItem('tarifaDestino2');
           localStorage.removeItem('tarifaDestino3');
           localStorage.removeItem('tarifaDestino4');
           localStorage.removeItem('tarifaDestino5');
           localStorage.removeItem('tarifaDestino6');
           localStorage.removeItem('tarifaDestino7');
           localStorage.removeItem('tarifaOrigen');
    
           localStorage.removeItem('precioTarifa');
           localStorage.removeItem('precioTarifa2');

           
          localStorage.removeItem('sencillaCreadaPadre')
          localStorage.removeItem('sencillaCreadaDes1')
          localStorage.removeItem('sencillaCreadaDes2')
          localStorage.removeItem('sencillaCreadaDes3')
          localStorage.removeItem('sencillaCreadaDes4')
          localStorage.removeItem('sencillaCreadaDes5')
          localStorage.removeItem('sencillaCreadaDes6')
          localStorage.removeItem('sencillaCreadaDes7')
          localStorage.removeItem('sencillaCreadaDes8')
          localStorage.removeItem('sencillaCreadaDes9')
          localStorage.removeItem('sencillaCreadaDes10')
}
/** */
accionAfterResponse(respuestaPositiva,respuestaNegativa){



  setTimeout(async () => {

   

    console.log('esto es lo que va apasr deoendendo is token repusetsa errorrr',this.auth.isTokenError);

  
 
//coloca un timer para imprimir por consola 

//continuar si error es defernete de null sino alerta no te puedo atemder


//hacer un case o if con tre caso si daata === a solicitud atebdida ; 
//algo asliol mal si data es == error de datos revise 
//su solciiud algo salio mal y lo sacas

//si llega el push todo salio bien






this.datosObtenido=true;

}, 25000);


}




  ngOnDestroy() {
   
    console.log("Ordenes-creadas - OnDestroy")
  }

}
