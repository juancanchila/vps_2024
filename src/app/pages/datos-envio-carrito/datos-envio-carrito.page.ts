import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController, MenuController } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-datos-envio-carrito',
  templateUrl: './datos-envio-carrito.page.html',
  styleUrls: ['./datos-envio-carrito.page.scss'],
})
export class DatosEnvioCarritoPage implements OnInit {

  FormSend: FormGroup;
  constructor(private menucontrol:MenuController,private router: Router, private auth: AuthService, public fb: FormBuilder,public alertController:AlertController) {
    this.menucontrol.enable(false);
    this.FormSend= this.fb.group({
     
 field_direccion_entrega:[""],

field_contacto:[""],

field_locacion_entrega:[""],
field_locacion_destino:[""],

field_direccion_destino:[""],

field_contacto_destino:[""],
field_ida_y_vuelta:[""],

field_valor_declarado:[ ""],

field_observaciones:[""],

field_medio_de_transporte:[ ""],
field_prefijo_origen:[ ""],
field_prefijo_destino:[ ""],



     });
    
   }
   openResumen(){
   
    this.auth.sendFormulario(this.FormSend.value);
    
    
   

   }
   async sendForm(){
    if(this.FormSend.invalid){
      const alert = await this.alertController.create({
       
        header: 'Datos incompletos ',
       
        message: 'llenar todos los datos.',
        buttons: ['Aceptar']
      });
  
      await alert.present();
      return;
    }
    
    this.auth.sendFormulario(this.FormSend.value);
    this.router.navigate(['/resumen-datos-envio-compras']);
     
    
   }

  ngOnInit() {
    console.log(this.auth.resumen);
  }
  ngOnDestroy() {
   
    console.log("Sencilla- OnDestroy")
  }

}
