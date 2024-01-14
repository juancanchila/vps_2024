import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AlertController } from '@ionic/angular';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.page.html',
  styleUrls: ['./forgot-password.page.scss'],
})
export class ForgotPasswordPage implements OnInit {
  regisForm: FormGroup;
  constructor(private auth: AuthService,public fb: FormBuilder,private alertController:AlertController) {
    this.regisForm= this.fb.group({
      
      
      mail:["", Validators.compose([
        Validators.required,
        Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')
    ])],
  
     });
    
   }

  ngOnInit() {
  }

  async resetPassword(){
    console.log(this.regisForm.value);
    if(this.regisForm.invalid){
      const alert = await this.alertController.create({
        
        header: 'Datos incompletos ',
       
        message: 'Llenar todos los datos.',
        buttons: ['Aceptar']
      });
  
      await alert.present();
    }else{
      this.auth.resetPassword(this.regisForm.value['mail']);
    }

  }

}
