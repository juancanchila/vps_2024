import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AlertController } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router'; // Importar ActivatedRoute
import { AuthService } from '../../services/auth.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-send-code',
  templateUrl: './send-code.page.html',
  styleUrls: ['./send-code.page.scss'],
})
export class SendCodePage implements OnInit {
  SendCodeForm: FormGroup;
  urlBase: string;
  source: string;
  email: string;
  code: string;

  constructor(
    private auth: AuthService,
    public fb: FormBuilder,
    public alertController: AlertController,
    private route: ActivatedRoute // Inyectar ActivatedRoute
  ) {
    this.urlBase = environment.urlBase;
    this.SendCodeForm = this.fb.group({
      mail: [
        '',
        Validators.compose([
          Validators.required,
          Validators.pattern(
            '^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\\.[a-zA-Z0-9-.]+$'
          ),
        ]),
      ],
      field_code: ['', Validators.required],
    });
  }

  ngOnInit() {
    // Capturar los parámetros de la ruta
    this.source = this.route.snapshot.paramMap.get('source') || 'registro';
    this.email = this.route.snapshot.paramMap.get('email') || '';

    // Prellenar el formulario con el email y el código recibidos
    this.SendCodeForm.patchValue({
      mail: this.email,
    });
  }

  async guardar() {
    const code = this.SendCodeForm.get('field_code').value;

    console.log('Formulario enviado:', this.SendCodeForm.value);
    console.log('Origen:', this.source);
    if (this.source === 'registro') {
      console.log('Proceso de registro');
      this.auth.sendCode(  this.email , code,'registro');
    } else if (this.source === 'cambio-password') {
      console.log('Proceso de cambio de contraseña');
      this.auth.sendCode(  this.email , code, 'cambio-password');
    }
  }
}
