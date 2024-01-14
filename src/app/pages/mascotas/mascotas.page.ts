import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController, MenuController } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-mascotas',
  templateUrl: './mascotas.page.html',
  styleUrls: ['./mascotas.page.scss'],
})
export class MascotasPage implements OnInit {

 

  FormSend: FormGroup;
  constructor(private menucontrol:MenuController,private router: Router, private auth: AuthService, public fb: FormBuilder,public alertController:AlertController) {
    this.menucontrol.enable(false);
    this.FormSend= this.fb.group({
     
 field_direccion_entrega:[""],

field_contacto:[""],
field_observaciones:[""],
field_locacion_entrega:[""],
field_prefijo_origen:[ ""],

field_locacion_destino:[""],
field_contacto_destino:[""],






     });
    
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
    }else{
      this.auth.sendFormularioMascotas(this.FormSend.value);
      this.router.navigate(['/resumen-mascotas']);

    }
    
   
     
    
   }

  ngOnInit() {
  }
  ngOnDestroy() {
   
    console.log("Sencilla- OnDestroy")
  }

}
