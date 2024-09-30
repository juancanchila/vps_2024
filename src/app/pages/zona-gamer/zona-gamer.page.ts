import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-zona-gamer',
  templateUrl: './zona-gamer.page.html',
  styleUrls: ['./zona-gamer.page.scss'],
})
export class ZonaGamerPage implements OnInit {

  FormSend: FormGroup;
  constructor(private router: Router, private auth: AuthService, public fb: FormBuilder, public alertController: AlertController) {
    localStorage.setItem('servicioEvaluado','gamer');
    this.FormSend= this.fb.group({
      field_prefijo_origen:[ ""],
 field_direccion_entrega:[""],
 field_direccion_destino:[""],
field_contacto:[""],
field_contacto_destino:[""],
field_locacion_entrega:[""],






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
      this.auth.sendFormularioZonaGamer(this.FormSend.value);
      this.router.navigate(['/resumen-zonagamer']);

    }




   }

  ngOnInit() {

 // Mostrar una alerta cuando se inicialice el componente


  }
  ngOnDestroy() {

    console.log("Sencilla- OnDestroy")
  }

}
