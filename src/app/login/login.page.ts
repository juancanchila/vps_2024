import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController, NavController } from '@ionic/angular';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  loginForm: FormGroup;
  public nombre: String;
  public pass: string = "";
  public locacion: any;
  Region: string = 'Atlantico';
  Departamento: any[];
  DepartamentoAtlantico: any[];
  locacionDepartamento: string = 'Atlantico';
  bloquearInput: boolean;

  constructor(private navctrl: NavController, private router: Router, private auth: AuthService, public fb: FormBuilder, public alertController: AlertController) {
    this.loginForm = this.fb.group({
      name: new FormControl('', Validators.required),
      locacion: ['']
    });
  }

  ngOnInit() {
    this.locacionDepartamento = 'atlantico';
    localStorage.setItem('departamento', this.locacionDepartamento);

    this.auth.getListDepartamento().subscribe(data => {
      console.log(data);
      this.Departamento = data;
    }, error => {
      console.log(error);
    });

    this.auth.getListDepartamentoAtlantico(this.locacionDepartamento).subscribe(data => {
      console.log(data);
      this.DepartamentoAtlantico = this.filterMunicipios(data);
    }, error => {
      console.log(error);
    });
  }

  ionViewWillEnter() {
    this.auth.getListDepartamentoAtlantico(this.locacionDepartamento).subscribe(data => {
      console.log(data);
      this.DepartamentoAtlantico = this.filterMunicipios(data);
      this.bloquearInput = false;
    }, error => {
      console.log(error);
    });
  }

  public addNumber(num: number) {
    this.pass += num.toString();
    this.loginForm.controls.pass.setValue(this.pass);
  }

  public deleteNUm() {
    this.pass = this.pass.substring(0, this.pass.length - 1);
    this.loginForm.controls.pass.setValue(this.pass);
  }

  enviar() {
    console.log(this.pass);
    console.log('x');
  }

  async onLogin() {
    console.log(this.loginForm.value);

    if (this.loginForm.invalid || this.loginForm.value['locacion'] == '') {
      const alert = await this.alertController.create({
        header: 'Datos incompletos o usuario incorrecto',
        message: 'llenar todos los datos.',
        buttons: ['Aceptar']
      });

      await alert.present();
      return;
    }

    this.router.navigate(['/login-clave', JSON.stringify(this.loginForm.value)]);
    console.log(this.loginForm.value);

    localStorage.setItem('locacion', this.loginForm.value['locacion']);
  }

  region($event) {
    this.locacionDepartamento = $event;
    console.log(this.locacionDepartamento);
    localStorage.setItem('departamento', this.locacionDepartamento);
    this.auth.getListDepartamentoAtlantico($event);
    this.ionViewWillEnter();
    this.bloquearInput = true;
    this.loginForm.controls.locacion.setValue('');
  }

  private filterMunicipios(data: any[]): any[] {
    const municipiosAEliminar = ["Baranoa", "Sabanalarga", "Santo Tomás", "Galapa","Sabanagrande"];
    return data.filter(municipio => !municipiosAEliminar.includes(municipio.name));
  }
}
