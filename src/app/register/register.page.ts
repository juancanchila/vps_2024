import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';
import { AlertController } from '@ionic/angular';
import { RegisterI } from 'modelos/register.interface';
import { ResponseI } from 'modelos/response.interface';
import { AuthService } from '../services/auth.service';
import { environment } from 'src/environments/environment';


@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {
  regisForm: FormGroup;
  toke:ResponseI;
  tokSesion : any;
  urlBase: any;
  message_TC : any;
  constructor(private auth: AuthService, public fb: FormBuilder,public alertController:AlertController) {
    this.urlBase = environment.urlBase;
    this.regisForm = this.fb.group(
      {
        mail: [
          "",
          Validators.compose([
            Validators.required,
            Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\\.[a-zA-Z0-9-.]+$'),
          ]),
        ],
        field_nombres_registro: ["", Validators.required],
        field_apellidos_registro: ["", Validators.required],
        field_celular_registro: ["", Validators.required],
        field_ciudad_registro: ["", Validators.required],
        field_pais_registro: ["", Validators.required],
        field_sector_registro: ["", Validators.required],
        field_direccion_registro: ["", Validators.required],
        field_acepta_terminos_registro: ["", Validators.required],
        field_id_registro: ["", Validators.required],
        password: [
          "",
          Validators.compose([
            Validators.required,
            this.onlyNumbersPasswordValidator() // Validador para permitir solo números en la contraseña
          ])
        ],
        confirm_password: ["", Validators.required],
      },
      { validator: this.passwordMatchValidator } // Agregar el validador personalizado aquí
    );
  }

  ngOnInit() {

    this.auth.getMessageTC().subscribe(data => {
      this.message_TC = data[0]['body'];
     console.log(data, 'Data received in component');
    });

  }



  async presentAlert() {
    const alert = await this.alertController.create({

      header: `Política de Tratamiento de Datos Personale
      (Política de Privacidad)`
      ,
message:this.message_TC+'<style> ion-checkbox#aut_contrato{padding: 5px 0px 0px 4px} #alert-1-msg{text-align: justify} .alert-message {text-align: justify}  .labelAcepto{display: inline} div{display: block}   </style> ',
      // al hacer check, vamos a establecer una variable y al darle aceptar preguntamos si esa varibale esta definida si esta se continua

    });

    await alert.present();



   }

  async guardar(){
console.log(this.regisForm.value || this.regisForm.value['field_acepta_terminos_registro'] != "");

    if(this.regisForm.invalid){
      const alert = await this.alertController.create({

        header: 'Datos incompletos o debe Aceptar terminos y condiciones',

        message: 'Llenar todos los datos.',
        buttons: ['Aceptar']
      });

      await alert.present();
      return;


     }else{
      this.auth.register(this.regisForm.value);

     }



   /*
    this.auth.register(this.regisForm).subscribe(async res =>{
      console.log(res);
    })
   // esto no esta bien, tienes que convertir la variable antes


this.auth.register(this.regisForm.value).subscribe(async res =>{
  console.log(res);
})
*/
     /*

   console.log( this.auth.register().subscribe(async res =>{
console.log(res['error'])
   }))

     */




    /*
    if(this.auth.sesionAnonima ==null){

      console.log('usuario creado');
    }else{
      console.log('usuario no creado');
      console.log(this.auth.sesionAnonima);
    }
    */
    //console.log(JSON.stringify(this.regisForm.value))

}

passwordMatchValidator(formGroup: FormGroup) {
  const password = formGroup.get('password');
  const confirmPassword = formGroup.get('confirm_password');

  if (password && confirmPassword && password.value !== confirmPassword.value) {
    confirmPassword.setErrors({ passwordMismatch: true });
  } else {
    confirmPassword.setErrors(null);
  }
}


onlyNumbersPasswordValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const valid = /^[0-9]*$/.test(control.value); // Verifica si el valor contiene solo números
    return valid ? null : { onlyNumbers: true };  // Devuelve un error si no son solo números
  };
  }

}
