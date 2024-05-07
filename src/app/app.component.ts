import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { AuthService } from './services/auth.service';
import { ProviderService } from './provider.service';
import { Router } from '@angular/router';
import { AlertController, MenuController, Platform } from '@ionic/angular';
import { NotificationsService } from './services/notifications.service';
import { GeolocationsService } from './services/geolocations.service';


@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
role:any;
  ifAuxiliar:any;
public nombre:string;
  alertController: any;
  name:any;
  public contadorIngresoModoCliente = 0;
  public textoPerfil;
  modoColaborador: any;
  constructor(private notifications: NotificationsService,private geolocacion: GeolocationsService, private platform: Platform,private menucontrol: MenuController,private router: Router, public auth: AuthService,public provider:ProviderService,private alertCtrl: AlertController) {
   this.inializarApp();

  }
  inializarApp(){
    this.platform.ready().then(()=>{
      this.auth.init();
      this.auth.initwo();
      this.router.navigate(['/splashcreen']);
      this.geolocacion.getCurrentLocacion();
    }
    );
   
  }
  nuestraFuncion(){
    this.auth.consultarIdAuxiliar().subscribe(res =>{
      console.log(res);
      console.log(res['0']['roles_target_id']);
     

      localStorage.setItem('rolAuxiliar',res['0']['roles_target_id']);
      localStorage.setItem('idAuxiliar',res['0']['uid']);
      localStorage.setItem('tipoVehiculo',res['0']['field_tipo_de_vehiculo']);
     
      if( res['0']['roles_target_id'].includes('Auxiliar') && localStorage.getItem('modoAuxiliar')=='modoColaborador'){
        this.textoPerfil= ' IR A MODO CLIENTE';
        this.router.navigate(['/modo-colaborador']);
      }else{
        this.textoPerfil= ' IR A MODO COLABORADOR';
      this.name= localStorage.getItem('name');
      this.role=localStorage.getItem('rol');
     
  
      }
    
    
    
    });
 


  }
  /** 
  ngOnInit() {
    this.auth.consultarIdAuxiliar().subscribe(res =>{
      console.log(res['0']['roles_target_id']);
     

      localStorage.setItem('rolAuxiliar',res['0']['roles_target_id']);
      localStorage.setItem('idAuxiliar',res['0']['uid']);
      localStorage.setItem('tipoVehiculo',res['0']['field_tipo_de_vehiculo']);
     
      if( res['0']['roles_target_id']=='Auxiliar'){
        this.textoPerfil= ' IR A MODO CLIENTE';
        this.router.navigate(['/modo-colaborador']);
      }else{
        this.textoPerfil= ' IR A MODO COLABORADOR';
      this.name= localStorage.getItem('name');
      this.role=localStorage.getItem('rol');
     
  
      }
    
    
    
    });
 

    
    
  
   
 
  }
 
*/
  ngOnDestroy() {
   
    console.log("App- OnDestroy")
  }
  irAPerfil(){
    this.router.navigate(['/perfil']);
    this.menucontrol.close();

  }
  irAPedidos(){
    this.auth.obtenerRoleUsuario().subscribe(res =>{
      console.log(res);
     
      this.ifAuxiliar=res;
      console.log(this.ifAuxiliar);
      if(this.ifAuxiliar.includes('Auxiliar') && this.textoPerfil== ' IR A MODO CLIENTE'){
        this.router.navigate(['/index-auxiliares']);
        this.menucontrol.close();
        
      }else{
        this.router.navigate(['/pedidos']);
        this.menucontrol.close();
      }
    
    });
   


  
   

    

  }
  irAColaborador(){
    if(this.contadorIngresoModoCliente==0){
      
      this.contadorIngresoModoCliente+=1;
      this.auth.obtenerRoleUsuario().subscribe(res =>{
        console.log(res);
       
        this.ifAuxiliar= res;
        console.log(this.ifAuxiliar);
       if(this.ifAuxiliar.includes('Auxiliar')){
        localStorage.setItem('modoAuxiliar','modoColaborador');
        this.auth.consultarIdAuxiliar().subscribe(res =>{
          console.log(res['0']['roles_target_id']);
         

          localStorage.setItem('rolAuxiliar',res['0']['roles_target_id']);
          localStorage.setItem('idAuxiliar',res['0']['uid']);
          localStorage.setItem('tipoVehiculo',res['0']['field_tipo_de_vehiculo']);
         
         
        
        
        
        });
        this.textoPerfil=' IR A MODO CLIENTE';
        this.router.navigate(['/modo-colaborador']);
        this.menucontrol.close();
       }else if( res['0']['roles_target_id'].includes('Auxiliar') && localStorage.getItem('modoAuxiliar')=='modoColaborador'){
        this.textoPerfil= ' IR A MODO COLABORADOR';
        this.router.navigate(['/tabs']);
       
        
       }else{
        alert('No tienes permisos para ingresar');
       }
      
      });
     

    }else{
      localStorage.setItem('modoAuxiliar','modoCliente');
      this.textoPerfil=' IR A MODO COLABORADOR';
      this.contadorIngresoModoCliente=0;
      this.menucontrol.close();
      this.router.navigate(['/tabs']);
      

    }
   
   
    
   
 
   

   
  
  }
  iraAyuda(){
    this.router.navigate(['/especial']);
    this.menucontrol.close();
  }
 
 async logout(){
  const alertElement= await this.alertCtrl.create({
       
    header: '¿Esta seguro que desea salir?',
    message: 'Vapaesa',
    
    buttons: [
      {
      text:'cancel',
      role:'cancel'
    },
    {
      text:'aceptar',
      handler:()=>{
        this.auth.logout2();
        localStorage.removeItem("name"); 
       localStorage.removeItem('rol');
       localStorage.removeItem('rolAuxiliar');
       localStorage.removeItem('idAuxiliar');
       
       localStorage.removeItem('permitirPagoefectivo');
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
      
       this.ifAuxiliar= null;
       this.textoPerfil=' IR A MODO COLABORADOR';
       this.role=null;
      }
    }
  ]
  });

  await alertElement.present();
  
 }

}
