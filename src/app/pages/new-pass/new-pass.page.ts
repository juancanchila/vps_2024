import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';
import { AlertController } from '@ionic/angular';
import { AuthService } from '../../services/auth.service';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-new-pass',
  templateUrl: './new-pass.page.html',
  styleUrls: ['./new-pass.page.scss'],
})
export class NewPassPage implements OnInit {
  newPassForm: FormGroup;
  action: string;
  email: string;

  constructor(
    private fb: FormBuilder,
    public alertController: AlertController,
    private auth: AuthService,
    private route: ActivatedRoute
  ) {
    this.newPassForm = this.fb.group(
      {
        newPassword: ['', [Validators.required, Validators.pattern(/^[0-9]{5}$/)]],
        confirmPassword: ['', [Validators.required, Validators.pattern(/^[0-9]{5}$/)]],
      },
      { validators: this.passwordsMatchValidator }
    );
  }

  ngOnInit() {}

  passwordsMatchValidator(form: AbstractControl) {
    const newPassword = form.get('newPassword')?.value;
    const confirmPassword = form.get('confirmPassword')?.value;

    if (newPassword !== confirmPassword) {
      form.get('confirmPassword')?.setErrors({ passwordsMismatch: true });
    } else {
      return null;
    }
  }

  async enviar() {
    if (this.newPassForm.valid) {
      const newPassword = this.newPassForm.get('newPassword')?.value;
      const confirmPassword = this.newPassForm.get('confirmPassword')?.value;

      this.action = this.route.snapshot.paramMap.get('source') || '';
      this.email = this.route.snapshot.paramMap.get('email') || '';

      console.log( this.action+'/'+this.email);
      // Enviar los valores por separado
      this.auth.newPassword( this.email, newPassword );
    } else {
      const alert = await this.alertController.create({
        header: 'Datos incompletos o Erroneos',
        message: 'Números entre 0 y 9 hasta 5 dígitos',
        buttons: ['Aceptar'],
      });

      await alert.present();
      console.log('El formulario tiene errores');
      return;
    }
  }
}
