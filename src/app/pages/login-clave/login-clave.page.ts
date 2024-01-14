import { Component, OnInit, Renderer2, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { AlertController, NavController } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login-clave',
  templateUrl: './login-clave.page.html',
  styleUrls: ['./login-clave.page.scss'],
})



export class LoginClavePage implements OnInit {


  loginForm: FormGroup;
  public nombre: any;
  public pass: any;
  public pass1: number;
  public pass2: number;
  public pass3: number;
  public pass4: number;
  public pass5: number;
  password:[];

  @ViewChild('myInput') input;

  fondo= "";
  fondo1= "";
  fondo2= "";
  fondo3= "";
  fondo4= "";
  fondo5= "";
  constructor( public renderer: Renderer2 ,private _route: ActivatedRoute,private navctrl  :NavController, private router: Router, private auth: AuthService,public fb: FormBuilder,public alertController:AlertController) { 
    this.loginForm= this.fb.group({
      
     name: new FormControl(''),
     pass: new FormControl(''),
     
      pass1: new FormControl('',Validators.required),
      pass2: new FormControl('',Validators.required),
      pass3: new FormControl('',Validators.required),
      pass4: new FormControl('',Validators.required),
      pass5: new FormControl('',Validators.required),

      
    });

   


  }
 
  ngOnInit() {
    localStorage.setItem('apagar','on') 
    //this.nombre= this._route.snapshot.paramMap.get('name');
   // console.log(this.nombre,'name')
   this._route.paramMap.subscribe((params: ParamMap) =>  {
    this.nombre=JSON.parse(params.get('name'));
  
    console.log(this.nombre,'name')
  });

  }
  irALogin(){
    this.router.navigateByUrl('/login');
  }
  ngOnDestroy() {
    console.log('login-clave- ondestory')
  }
  public addNumber(num: number){
    /*
    this.pass+=num.toString();
    if(this.loginForm.controls['pass'].value >0){
      this.pass1+=num.toString();
    
    }
   */

    
    
      console.log('numero', num, ' el pass', this.pass);
      
      if(this.pass1 == undefined){
        this.pass1 = num;
        this.loginForm.controls['pass1'].setValue(num);
        this.loginForm.controls.pass1.setValue(this.pass1);
        this.fondo="dark";
        return //para que no pnga el valor enl os demas box

      }
      if(this.pass2 == undefined){
        this.pass2 = num;
        this.loginForm.controls['pass2'].setValue(num);
        this.loginForm.controls.pass2.setValue(this.pass2);
        this.fondo1="dark";
        return
  }
  if(this.pass3 == undefined){
    this.pass3 = num;
    this.loginForm.controls['pass3'].setValue(num);
        this.loginForm.controls.pass3.setValue(this.pass3);
        this.fondo2="dark";
    return
  }
  if(this.pass4 == undefined){
    this.pass4 = num;
    this.loginForm.controls['pass4'].setValue(num);
        this.loginForm.controls.pass4.setValue(this.pass4);
        this.fondo3="dark";
    return
  }
  if(this.pass5 == undefined){
    this.pass5 = num;
    this.loginForm.controls['pass5'].setValue(num);
    this.loginForm.controls.pass5.setValue(this.pass5);
    this.fondo4="dark";
    
    return //para que no pnga el valor enl os demas box
  }
 
  }
  public deleteNUm(){
    if(this.pass5 != undefined){
      this.pass5 = undefined;
      this.fondo4="ion-input";
      
      return
    }
    if(this.pass4 != undefined){
      this.pass4 = undefined;
      this.fondo3="ion-input";
      return
    }
    if(this.pass3 != undefined){
      this.pass3 = undefined;
      
      this.fondo2="ion-input";
      return
    }
    if(this.pass2 != undefined){
      this.pass2 = undefined;
      this.fondo1="ion-input";
 
      return
    }
    if(this.pass1 != undefined){
      this.pass1 = undefined;
      
      this.fondo="ion-input";
      return
    }
    if(this.pass != undefined){
      this.pass = undefined;
      
      this.fondo="ion-input";
      return
    }

   
    
  }

  enviar(){
    
    console.log(this.pass);
    console.log('x');
  }

 

  async onLogin(){
   // this.auth.obtenerRoleUsuario();
    
    
    //this.loginForm.get(<formConrolName>).setValue('123');
   //this.loginForm.controls.pass.setValue(this.pass);
   
     //console.log(this.loginForm.value);
     

    if(this.loginForm.invalid){
     const alert = await this.alertController.create({
       
       header: 'Datos incompletos o Usuario incorrecto',
      
       message: 'Verifique la información.',
       buttons: ['Aceptar']
     });
 
     await alert.present();
     return;
    

    }

console.log(this.pass,this.pass1,this.pass2,this.pass3,this.pass4);
 let x=`${this.pass1}${this.pass2}${this.pass3}${this.pass4}${this.pass5}`;
console.log(JSON.stringify(x));
this.pass={
  'pass': x
}
console.log(this.pass);

this.loginForm.controls.name.setValue(this.nombre);
this.loginForm.controls.pass.setValue(this.pass);
console.log(this.nombre['name'],this.pass['pass']);

let logJson = {
  'name':this.nombre['name'],
  'pass':this.pass['pass']
}
console.log(logJson);
let c = `${this.nombre}${this.pass}`;
console.log(c);
   //this.router.navigate(['/login-clave']);
    this.auth.login(logJson);
  

}  


}
