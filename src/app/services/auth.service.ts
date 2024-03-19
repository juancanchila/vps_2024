import { Injectable } from '@angular/core';
import { Geolocation } from '@capacitor/geolocation';
import { AlertController, MenuController, NavController, Platform, ToastController } from '@ionic/angular';
import { LoginI } from 'modelos/login.interface';
import { ResponseI } from 'modelos/response.interface';
import { HttpClient,HttpHeaders,HttpHandler } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { FormsModule } from '@angular/forms';
import{map, tap} from 'rxjs/operators'
import { Router } from '@angular/router';
import { RegisterI } from 'modelos/register.interface';
import { FormularioI } from 'modelos/formulario.interface';
import { ProductosI } from 'modelos/productos.interface';
import { RutasPage } from '../rutas/rutas.page';
import { DestinosI } from 'modelos/destinos.interface';
import { LoginClavePage } from '../pages/login-clave/login-clave.page';
import { AutoCompleteService } from 'ionic4-auto-complete';
import { Capacitor } from '@capacitor/core';
import { ActionPerformed, PushNotifications, PushNotificationSchema, Token } from '@capacitor/push-notifications';
import { GeolocationsService } from './geolocations.service';




@Injectable()

export class AuthService {
  isToken;
 respuestaDocumentoBoolean :string;
  private lastTimeBackButtonWasPressed = 0;
  private timePeriodToAction = 2000;
  idTiendaSeleccionada: string;
  locacion: string;
  departamento: string;
  longitud: number | any;
  latitud: number | any;
  listadoDeAuxDisponibles=[];
   lista_isclose_id:any=[];
   lista_isclose_lat:any=[];
  result: number;
  isTokenError =null;
  estadoPedidoCompleto: boolean;
  errorPosicion: any;
  domicilioRestaurante: any;
  ponderacion: any;
  validarQuitarSecilla: boolean = false;
  resumenOtherRestaurantes: { title: { value: string; }[]; type: { target_id: string; }[]; field_donde_comprar: { value: [{ value: ""; }]; }[]; field_quieres_comprar: { value: [{ value: ""; }]; }[]; field_direccion_entrega: { value: [{ value: ""; }]; }[]; field_nombre_del_establecimiento: { value: [{ value: ""; }]; }[]; field_contacto: { value: [{ value: ""; }]; }[]; field_contacto_destino: { value: [{ value: ""; }]; }[]; field_direccion_destino: { value: [{ value: ""; }]; }[]; field_ida_y_vuelta: { value: boolean; }[]; field_locacion_destino: { value: [{ value: ""; }]; }[]; field_locacion_entrega: { value: [{ value: ""; }]; }[]; field_valor_declarado: { value: [{ value: ""; }]; }[]; field_medio_de_transporte: { value: number; }[]; field_observaciones: { value: [{ value: ""; }]; }[]; field_prefijo_origen: { value: [{ value: ""; }]; }[]; field_prefijo_destino: { value: [{ "": ""; }]; }[]; field_metodo_de_pago: { value: [{ value: ""; }]; }[]; field_barrio_origen: { value: [{ value: ""; }]; }[]; field_barrio_destino: { value: [{ value: ""; }]; }[]; field_nombre_c_origen: { value: [{ value: ""; }]; }[]; field_nombre_c_destino: { value: [{ value: ""; }]; }[]; };
  messajeErr: any;

  init() {
    this.platform.backButton.subscribeWithPriority(10,async () => {
      const currentUrl = this.router.url;
      if(currentUrl === "/tabs/index"){
        const alert = await this.alertControl.create({
          message: "Seguro que quieres salir?",
          buttons: [{
            text: "Cancel",
            role: "cancel"
          },
          {
            text: "Exit",
            handler: ()=>{
              navigator['app'].exitApp();
            }
          }]

        });
        await alert.present();

      }else{
        this.navctrl.back();
      }




    });
  }
  initwo() {
    this.platform.backButton.subscribeWithPriority(10,async () => {
      const currentUrl = this.router.url;
      if(currentUrl === "/login"){
        navigator['app'].exitApp();



      }




    });
  }
  async withDoublePress(message: string, action: () => void) {
    const currentTime = new Date().getTime();

    if (currentTime - this.lastTimeBackButtonWasPressed < this.timePeriodToAction) {
      action();
    } else {
      const toast = await this.toastController.create({
        message: message,
        duration: this.timePeriodToAction
      });

      await toast.present();

      this.lastTimeBackButtonWasPressed = currentTime;
    }
  }

  async withAlert(message: string, action: () => void) {
    const alert = await this.alertControl.create({
      message: message,
      buttons: [{
        text: "Cancel",
        role: "cancel"
      },
      {
        text: "OK",
        handler: action
      }]
    });

    await alert.present();
  }





private carrito=[];
private contadorItem=new BehaviorSubject(0);
private subject: BehaviorSubject<ProductosI[]> = new BehaviorSubject([]);
private itemsCarrito: ProductosI[] = [];
  character =[];
 url:string="http://164.92.106.39/user/login?_format=json";
 urlexit:string="http://164.92.106.39/user/logout?_format=json&token=";
 urlregister: string ="http://164.92.106.39/user/register?_format=hal_json";
 urlSesionAnonima: string = "http://164.92.106.39/session/token";
 authSubject = new BehaviorSubject(false);
 public currentUser: BehaviorSubject<ResponseI>;
 public nameUser='currentUser';
 private token : string;
 public options : any;
 private logoutToken : string;
 public nombre : string;
 public anonimustoken1: string;
 public anonimustoken5: string;
 public csrf:string;
 public base64:string;
 public  urlAuxName: string;
 public newXscrf:string;

 private localStorageService;
  private currentSession : ResponseI = null;
  anonimustoken: any;
  statusError: any;
  anonimustatus: any;
  tokencsrf: any;
  email:string;
  confirmexit: any;

  public at: string;
  public resumen: any;
  resumenObservacion:any;
  public resumenRuta: any;
  public resumenTecnologias: any;
  public resumenMedicamentos: any;
  public resumenTextiles:any;
  public resumenAlmacen:any;
  public resumenPagos: any;
  public id:any;
  public nameuser:any;
  public idOrden: any;
  public auxiliarAsignado: any;
  public nodoCreado: any;
  tokencsrf2: string;
  b64: string;
  public medioTransporte: number;
  public medioTransporte_modalidad: String;
  public estadoPedido: boolean;



//rutas, son maximo 10 entonces crear en el construcctor 10 variables http


  constructor(
    private geolocation: GeolocationsService,
    private toastController: ToastController,
    private platform: Platform,private http: HttpClient,
    private http2: HttpClient,private http5: HttpClient,private http3: HttpClient,
    private router: Router, private menucontrol: MenuController,
     private alertControl: AlertController, private navctrl: NavController,
     private http6: HttpClient,private http7: HttpClient,private http8: HttpClient,
     private http10: HttpClient,private http9: HttpClient,private http4: HttpClient
     ) {

     // this.geo.watchCoordinate();
    this.subject.subscribe(data => this.itemsCarrito = data);
    this.localStorageService = localStorage;
this.getMensajeError();
}

 getAllToken(){
    this.http.get('http://164.92.106.39/session/token',{}).subscribe(data=>{
      console.log(data);
          },error=>{
            this.anonimustoken=error.error.text;
            console.log (this.anonimustoken);

           // console.log(error);
           // console.log(error.error.text);
            //console.log(error.status);
            //this.anonimustatus=error.error.text;
            //localStorage.setItem('token',error.error.text);
            //console.log(this.localStorageService);


          });

    }

   //metodo para obtener lista de barios
    getListBarrios(){
      this.locacion= localStorage.getItem('locacion');
      return this.http.get('http://164.92.106.39/barrios_json/'+this.locacion+'', {})
      .pipe(
        map((res :any)=>{

            return res;


         // console.log(res['0']['Role'],'estoy en data');
        },error=>{
          this.anonimustoken=error.error.text;
          console.log (this.anonimustoken);

         // console.log(error);
         // console.log(error.error.text);
          //console.log(error.status);
          //this.anonimustatus=error.error.text;
          //localStorage.setItem('token',error.error.text);
          //console.log(this.localStorageService);


        })
      )

    }
 //metodo para obtener lista de barrios dependinedo locacion

    getListBarriosSeleccion(){
      //this.locacion= localStorage.getItem('locacion');
      return this.http.get('http://164.92.106.39/barrios_json/'+this.locacion+'', {})
      .pipe(
        map((res :any)=>{

            return res;


         // console.log(res['0']['Role'],'estoy en data');
        },error=>{
          this.anonimustoken=error.error.text;
          console.log (this.anonimustoken);

         // console.log(error);
         // console.log(error.error.text);
          //console.log(error.status);
          //this.anonimustatus=error.error.text;
          //localStorage.setItem('token',error.error.text);
          //console.log(this.localStorageService);


        })
      )

    }

 getMessageTC(): Observable<any> {
    return this.http.get('http://164.92.106.39/tc_message').pipe(
      map((res :any)=>{

          return res;



      })
    )

  }



     //metodo para obtener locaciones
    getListLocaciones(){
      this.departamento= localStorage.getItem('departamento');
      return this.http.get('http://164.92.106.39/location_json/'+this.departamento+'', {})
      .pipe(
        map((res :any)=>{

            return res;


         // console.log(res['0']['Role'],'estoy en data');
        })
      )

    }
 //metodo para obtener lista departa,entos
    getListDepartamento(){
      return this.http.get('http://164.92.106.39/location_json', {})
      .pipe(
        map((res :any)=>{

            return res;


         // console.log(res['0']['Role'],'estoy en data');
        })
      )

    }
    getListDepartamentoAtlantico(departamento){
      return this.http.get('http://164.92.106.39/location_json/'+departamento, {})
      .pipe(
        map((res :any)=>{

            return res;


         // console.log(res['0']['Role'],'estoy en data');
        })
      )

    }
    getSesion(){
      this.http.get('http://164.92.106.39/session/token',{}).subscribe(data=>{
        console.log(data);
            },error=>{

              console.log(error);
              console.log(error.error.text);
              console.log(error.status);
              this.newXscrf=error.error.text;
            });

    }
    //metodo para hacer register
  register(user: RegisterI){
    console.log(user.mail);
    this.http.get('http://164.92.106.39/session/token',{}).subscribe(data=>{
      console.log(data);
          },error=>{

            console.log(error);
            console.log(error.error.text);
            console.log(error.status);
            this.anonimustoken=error.status;
          });
/*
          const headers = new HttpHeaders({'Content-Type': 'application/json','Accept': 'application/json','X-CSRF-Token': 'n5iVI-HO9NKig9dn3yqQwdJzCxw50mYSbfjaNAKjI7U'});
*/
if(this.anonimustoken==400){
alert('error!! verifique, intente nuevamente');
this.router.navigateByUrl('/login');
}else{
  alert('usuario creado con exito espere confirmacion al correo');

}


const headers = new HttpHeaders;
 headers.append('Content-Type','application/json');
  headers.append('Accept','application/json');
  headers.append('X-CSRF-Token', this.anonimustoken);

  console.log(headers,'headers');



           let  datoRegistro = {
            "name" :{"value": user.field_celular_registro }
        ,   "mail": {"value":user.mail},
        'field_nombres_registro':{"value":user.field_nombres_registro},
        'field_apellidos_registro':{"value":user.field_apellidos_registro},
              'field_celular_registro':{"value":user.field_celular_registro},

              'field_ciudad_registro':{"value":user.field_ciudad_registro},
              'field_pais_registro':{"value":user.field_pais_registro},
              'field_sector_registro':{"value":user.field_sector_registro},
            'field_direccion_registro':{"value":user.field_direccion_registro},
              'field_acepta_terminos_registro':{"value":user.field_acepta_terminos_registro},
             'field_id_registro':{"value":user.field_id_registro},
           };
          console.log(datoRegistro);

          this.http.post<RegisterI>('http://164.92.106.39/user/register?_format=hal_json',datoRegistro,{headers:headers}).subscribe(data2=>{
            console.log(data2);
                },error2=>{
                  this.anonimustoken=""+error2.error.text;
                  console.log(error2);
                  console.log(error2.error.text);
                  console.log(error2.status);
                });
                this.router.navigateByUrl('/login');

  }


  //metodo para hacer login
  login(user: LoginI){
    this.base64 = btoa(user.name+ ':' + user.pass);









    const headers = new HttpHeaders().set('Content-Type', 'application/hal+json');
    this.http.post<ResponseI>(this.url,user,{headers:headers})
    .subscribe(data=>{
      setTimeout(() => {

     //metodo para para consultar rol de de usuario
      this.consultarIdAuxiliar().subscribe(res =>{
        console.log(res);
        if(res!=null){
          localStorage.setItem('idAuxiliar',res['0']['uid']);
          localStorage.setItem('rolAuxiliar',res['0']['roles_target_id']);
         if(res['0']['roles_target_id']=='Auxiliar' && localStorage.getItem('modoAuxiliar')=='modoColaborador'){

          localStorage.setItem('Ingresado','true');
          this.router.navigateByUrl('/modo-colaborador');
          this.geolocation.requestPermissions();
          this.getLocation();
         }else{
          localStorage.setItem('Ingresado','true');
          this.router.navigateByUrl('/tabs');
          this.getLocation();
          this.geolocation.requestPermissions();
         }
this.enviarPushNotificacionAuxiliar();
        }else{
          alert('usuario ya esta logeado, debe cerrar sesion en el otro dispositivo');
        }
        //localStorage.setItem('tienda',undefined);





      });




    },2000)




       this.csrf=data['csrf_token'];

       this.nameuser = data['current_user']['name'];
       this.id= data['current_user']['uid'];

       localStorage.setItem('name',this.nameuser);
       localStorage.setItem('id',this.id);
      console.log(data);

      console.log(this.csrf);
      localStorage.setItem("csrf_token",this.csrf);
      localStorage.setItem("base64",this.base64);
      console.log(this.base64);
      this.tokencsrf2= localStorage.getItem("csrf_token");
      localStorage.setItem('EXPIRES_IN',data['logout_token']);
      console.log(this.tokencsrf2);


          },error=>{
            console.log(error);
            console.log(error.status);
           this.statusError = error.status;
           if(this.statusError==400){
             alert('Usuario o contraseña incorrectos')

           }else  if(error.status==0){
            alert('Error revise su conexion internet')

          }
          else  if(error.status==200){


          }

          });

          this.obtenerRoleUsuario();





  }
  //metodo para enviar formulario sencilla
  sendFormulario(user: FormularioI){
    //sendFormulario
    let sencilla = {
      "title":[{"value":'Mensajeria Sencilla'}],

    "type":[{"target_id": 'sencilla'}],
    "field_direccion_entrega":[{"value": user.field_direccion_entrega}],

    "field_contacto":[{"value": user.field_contacto}],

    "field_contacto_destino":[{"value": user.field_contacto_destino}],

    "field_direccion_destino":[{"value": user.field_direccion_destino}],

    "field_ida_y_vuelta":[{"value": user.field_ida_y_vuelta}],
    "field_observaciones":[{"value": user.field_observaciones}],

    "field_locacion_destino":[{"value": user.field_locacion_destino}],
    "field_prefijo_destino":[{"value": user.field_prefijo_destino}],
    "field_locacion_entrega":[{"value": user.field_locacion_entrega}],
    "field_prefijo_origen":[{"value": user.field_prefijo_origen}],

      "field_valor_declarado":[{"value": user.field_valor_declarado}],
     "field_medio_de_transporte":[{"value": this.medioTransporte}],
     "body":[{"value": user.body}],
     "field_barrio_origen":[{"value": user.field_barrio_origen}],
"field_barrio_destino":[{"value": user.field_barrio_destino}],
"field_metodo_de_pago":[{"value": user.field_metodo_de_pago}],
"field_url_imagen_destino":[{"value": user.field_url_imagen_destino}],
"field_url_imagen_origen":[{"value": user.field_url_imagen_origen}],
"field_longitud_origen":[{"value": user.field_longitud_origen}],
"field_latitud_origen_":[{"value": user.field_latitud_origen_}],
"field_precio_":[{"value": user.field_precio_}],

"field_nombre_c_origen":[{"value": user.field_nombre_c_origen}],
"field_nombre_c_destino":[{"value": user.field_nombre_c_destino}],
"field_quien_paga_":[{"value":user.field_quien_paga_}]


       }

       this.resumen = sencilla;

    this.router.navigateByUrl('/resumen');





}
//metodo para enviar formulario observacion de productos
sendFormObservacion(user: FormularioI){
  //sendFormulario
  let sencilla = {
    "observacion":[{"value":user.observacion}],


     }

     this.resumenObservacion = sencilla;







}

//metodo para enviar formulariollaves
sendFormularioLlaves(user: FormularioI){
  //sendFormulario
  let sencilla = {
    "title":[{"value":'Mensajeria Sencilla'}],

  "type":[{"target_id": 'sencilla'}],
  "field_direccion_entrega":[{"value": user.field_direccion_entrega}],

  "field_contacto":[{"value": user.field_contacto}],



  "field_direccion_destino":[{"value": user.field_direccion_destino}],

  "field_ida_y_vuelta":[{"value": user.field_ida_y_vuelta}],
  "field_observaciones":[{"value": user.field_observaciones}],

  "field_locacion_destino":[{"value": user.field_locacion_destino}],
  "field_prefijo_destino":[{"value": user.field_prefijo_destino}],
  "field_locacion_entrega":[{"value": user.field_locacion_entrega}],
  "field_prefijo_origen":[{"value": user.field_prefijo_origen}],

  "field_musica_preferida":[{"value": user.field_musica_preferida}],
   "field_medio_de_transporte":[{"value": this.medioTransporte}],
   "field_tema_de_interes":[{"value": user.field_tema_de_interes}],
   "body":[{"value": user.body}],

   "field_barrio_origen":[{"value": user.field_barrio_origen}],
   "field_barrio_destino":[{"value": user.field_barrio_destino}],
   "field_metodo_de_pago":[{"value": user.field_metodo_de_pago}],

   "field_contacto_destino":[{"value": user.field_contacto_destino}],
   "field_nombre_c_origen":[{"value": user.field_nombre_c_origen}],
"field_nombre_c_destino":[{"value": user.field_nombre_c_destino}]

     }

     this.resumen = sencilla;

  this.router.navigateByUrl('/resumen-llaves');





}

sendFormularioMascotas(user: FormularioI){
  //sendFormulario
  let sencilla = {
    "title":[{"value":'Mensajeria Recoger Mascotas'}],

  "type":[{"target_id": 'sencilla'}],
  "field_direccion_entrega":[{"value": user.field_direccion_entrega}],

  "field_contacto":[{"value": user.field_contacto}],

  "field_contacto_destino":[{"value": user.field_contacto_destino}],




  "field_observaciones":[{"value": user.field_observaciones}],

  "field_locacion_destino":[{"value": user.field_locacion_destino}],

  "field_locacion_entrega":[{"value": user.field_locacion_entrega}],
  "field_prefijo_origen":[{"value": user.field_prefijo_origen}],
  "field_nombre_c_origen":[{"value": user.field_nombre_c_origen}],
"field_nombre_c_destino":[{"value": user.field_nombre_c_destino}]




     }

     this.resumen = sencilla;







}
//metodo para enviar formulario tecnologias
sendFormularioTecnologias(user: FormularioI){
  //sendFormulario
  let tecnologias = {
    "title":[{"value":'Mensajeria Sencilla'}],

  "type":[{"target_id": 'sencilla'}],
  "field_donde_comprar":[{"value": user.field_donde_comprar}],
  "field_quieres_comprar":[{"value": user.field_quieres_comprar}],
  "field_direccion_entrega":[{"value": user.field_direccion_entrega}],
  "field_nombre_del_establecimiento":[{"value": user.field_nombre_del_establecimiento}],
  "field_contacto":[{"value": user.field_contacto}],

  "field_contacto_destino":[{"value": user.field_contacto_destino}],

  "field_direccion_destino":[{"value": user.field_direccion_destino}],

  "field_ida_y_vuelta":[{"value": false}],

  "field_locacion_destino":[{"value": user.field_locacion_destino}],

  "field_locacion_entrega":[{"value": user.field_locacion_entrega}],


    "field_valor_declarado":[{"value": user.field_valor_declarado}],
   "field_medio_de_transporte":[{"value": this.medioTransporte}],
   "field_observaciones":[{"value": user.field_observaciones}],
   "field_prefijo_origen":[{"value": user.field_prefijo_origen}],

   "field_prefijo_destino":[{"value": user.field_prefijo_destino}],


   "field_metodo_de_pago":[{"value": user.field_metodo_de_pago}],
   "field_barrio_origen":[{"value": user.field_barrio_origen}],
   "field_barrio_destino":[{"value": user.field_barrio_destino}],
   "field_nombre_c_origen":[{"value": user.field_nombre_c_origen}],
"field_nombre_c_destino":[{"value": user.field_nombre_c_destino}]


     }


     this.resumenTecnologias = tecnologias;

 // this.router.navigateByUrl('/resumen');





}
//metodo para enviar formulario datos de compra
sendFormularioDatosCompra(user: FormularioI){
  //sendFormulario
  let sencilla = {
    "title":[{"value":'Mensajeria Sencilla'}],

  "type":[{"target_id": 'sencilla'}],
  "field_direccion_entrega":[{"value": user.field_direccion_entrega}],

  "field_contacto":[{"value": user.field_contacto}],

  "field_contacto_destino":[{"value": user.field_contacto_destino}],

  "field_direccion_destino":[{"value": user.field_direccion_destino}],

  "field_ida_y_vuelta":[{"value": user.field_ida_y_vuelta}],
  "field_observaciones":[{"value": user.field_observaciones}],

  "field_locacion_destino":[{"value": user.field_locacion_destino}],
  "field_prefijo_destino":[{"value": user.field_prefijo_destino}],
  "field_locacion_entrega":[{"value": user.field_locacion_entrega}],
  "field_prefijo_origen":[{"value": user.field_prefijo_origen}],

    "field_valor_declarado":[{"value": user.field_valor_declarado}],
   "field_medio_de_transporte":[{"value": this.medioTransporte}],
   "body":[{"value": user.body}],
   "field_nombre_c_origen":[{"value": user.field_nombre_c_origen}],
"field_nombre_c_destino":[{"value": user.field_nombre_c_destino}]

     }

     this.resumen = sencilla;

  this.router.navigateByUrl('/resumen-datos-envio-compras');





}

//metodo para enviar formulario textiles
sendFormularioTextiles(user: FormularioI){
  //sendFormulario
  let textiles = {
    "title":[{"value":'Mensajeria Sencilla'}],

    "type":[{"target_id": 'sencilla'}],
    "field_donde_comprar":[{"value": user.field_donde_comprar}],
    "field_quieres_comprar":[{"value": user.field_quieres_comprar}],
    "field_direccion_entrega":[{"value": user.field_direccion_entrega}],
    "field_nombre_del_establecimiento":[{"value": user.field_nombre_del_establecimiento}],
    "field_contacto":[{"value": user.field_contacto}],

    "field_contacto_destino":[{"value": user.field_contacto_destino}],

    "field_direccion_destino":[{"value": user.field_direccion_destino}],

    "field_ida_y_vuelta":[{"value": false}],

    "field_locacion_destino":[{"value": user.field_locacion_destino}],

    "field_locacion_entrega":[{"value": user.field_locacion_entrega}],


      "field_valor_declarado":[{"value": user.field_valor_declarado}],
     "field_medio_de_transporte":[{"value": this.medioTransporte}],
     "field_observaciones":[{"value": user.field_observaciones}],
     "field_prefijo_origen":[{"value": user.field_prefijo_origen}],

     "field_prefijo_destino":[{"value": user.field_prefijo_destino}],

     "field_metodo_de_pago":[{"value": user.field_metodo_de_pago}],
     "field_barrio_origen":[{"value": user.field_barrio_origen}],
     "field_barrio_destino":[{"value": user.field_barrio_destino}],
     "field_nombre_c_origen":[{"value": user.field_nombre_c_origen}],
"field_nombre_c_destino":[{"value": user.field_nombre_c_destino}]

     }


     this.resumenTextiles = textiles;

 // this.router.navigateByUrl('/resumen');





}
//metodo para enviar formulario otros restaurantes
sendFormularioParaOtrosRestaurantes(user: FormularioI){
  //sendFormulario
  let ResumenOtherRestaurant = {
    "title":[{"value":'Mensajeria Sencilla'}],

    "type":[{"target_id": 'sencilla'}],
    "field_donde_comprar":[{"value": user.field_donde_comprar}],
    "field_quieres_comprar":[{"value": user.field_quieres_comprar}],
    "field_direccion_entrega":[{"value": user.field_direccion_entrega}],
    "field_nombre_del_establecimiento":[{"value": user.field_nombre_del_establecimiento}],
    "field_contacto":[{"value": user.field_contacto}],

    "field_contacto_destino":[{"value": user.field_contacto_destino}],

    "field_direccion_destino":[{"value": user.field_direccion_destino}],

    "field_ida_y_vuelta":[{"value": false}],

    "field_locacion_destino":[{"value": user.field_locacion_destino}],

    "field_locacion_entrega":[{"value": user.field_locacion_entrega}],


      "field_valor_declarado":[{"value": user.field_valor_declarado}],
     "field_medio_de_transporte":[{"value": this.medioTransporte}],
     "field_observaciones":[{"value": user.field_observaciones}],
     "field_prefijo_origen":[{"value": user.field_prefijo_origen}],

     "field_prefijo_destino":[{"value": user.field_prefijo_destino}],

     "field_metodo_de_pago":[{"value": user.field_metodo_de_pago}],
     "field_barrio_origen":[{"value": user.field_barrio_origen}],
     "field_barrio_destino":[{"value": user.field_barrio_destino}],
     "field_nombre_c_origen":[{"value": user.field_nombre_c_origen}],
"field_nombre_c_destino":[{"value": user.field_nombre_c_destino}]

     }


     this.resumenOtherRestaurantes = ResumenOtherRestaurant;

 // this.router.navigateByUrl('/resumen');





}

//metodo para enviar formulario almacen
sendFormularioAlmacen(user: FormularioI){
  //sendFormulario
  let almacen = {
    "title":[{"value":'Mensajeria Sencilla'}],

  "type":[{"target_id": 'sencilla'}],
  "field_donde_comprar":[{"value": user.field_donde_comprar}],
  "field_quieres_comprar":[{"value": user.field_quieres_comprar}],
  "field_prefijo_destino":[{"value": user.field_prefijo_destino}],
  "field_contacto":[{"value": user.field_contacto}],
  "field_nombre_del_establecimiento":[{"value": user.field_nombre_del_establecimiento}],
  "field_contacto_destino":[{"value": user.field_contacto_destino}],

  "field_direccion_destino":[{"value": user.field_direccion_destino}],

  "field_ida_y_vuelta":[{"value": false}],

  "field_locacion_destino":[{"value": user.field_locacion_destino}],

  "field_locacion_entrega":[{"value": user.field_locacion_entrega}],
  "field_direccion_entrega":[{"value": user.field_direccion_entrega}],

    "field_valor_declarado":[{"value": user.field_valor_declarado}],
   "field_medio_de_transporte":[{"value": this.medioTransporte}],
   "field_observaciones":[{"value": user.field_observaciones}],

   "field_metodo_de_pago":[{"value": user.field_metodo_de_pago}],

   "field_barrio_origen":[{"value": user.field_barrio_origen}],
   "field_barrio_destino":[{"value": user.field_barrio_destino}],
   "field_prefijo_origen":[{"value": user.field_prefijo_origen}],
   "field_nombre_c_origen":[{"value": user.field_nombre_c_origen}],
"field_nombre_c_destino":[{"value": user.field_nombre_c_destino}]


     }


     this.resumenAlmacen = almacen;

 // this.router.navigateByUrl('/resumen');





}
//metodo para enviar formulario medicamentos
sendFormularioMedicamentos(user: FormularioI){
  //sendFormulario
  let medicamentos = {
    "title":[{"value":'Mensajeria Medicamentos'}],

    "type":[{"target_id": 'sencilla'}],

    "field_respuesta_documentos":[{"value":user.field_respuesta_documentos}],
    "field_direccion_entrega":[{"value":user.field_direccion_entrega}],
    "field_direccion_destino":[{"value": user.field_direccion_destino}],
    "field_documentos_medicos":[user.field_documentos_medicos],
    "field_observaciones":[{"value": user.field_observaciones}],
    "field_ida_y_vuelta":[{"value":user.field_ida_y_vuelta}],
    "field_farmacia":[{"value":user.field_farmacia}],
    "field_prefijo_destino":[{"value":user.field_prefijo_destino}],
    "field_prefijo_origen":[{"value":user.field_prefijo_origen}],

    "field_valor_declarado":[{"value": user.field_valor_declarado}],

    "field_locacion_destino":[{"value": user.field_locacion_destino}],
    "field_locacion_entrega":[{"value": user.field_locacion_entrega}],
        // "field_medio_de_transporte":[{"value": this.medioTransporte}],
     "field_barrio_origen":[{"value": user.field_barrio_origen}],
"field_barrio_destino":[{"value": user.field_barrio_destino}],
"field_metodo_de_pago":[{"value": user.field_metodo_de_pago}],
"field_contacto":[{"value": user.field_contacto}],
"field_contacto_destino":[{"value": user.field_contacto_destino}],
"field_nombre_c_origen":[{"value": user.field_nombre_c_origen}],
"field_nombre_c_destino":[{"value": user.field_nombre_c_destino}]



     }

     this.resumenMedicamentos = medicamentos;







}

//metodo para enviar formulario pagos
sendFormularioPagos(user: FormularioI){
  //sendFormulario
  let pagos = {
    "title":[{"value":'Mensajeria Medicamentos'}],

    "type":[{"target_id": 'sencilla'}],
    "field_direccion_entrega":[{"value":user.field_direccion_entrega}],
    "field_direccion_destino":[{"value":user.field_direccion_destino}],
    "field_observaciones":[{"value": user.field_observaciones}],
    "field_clase_de_pago":[{"value":user.field_clase_de_pago}],
    "field_prefijo_origen":[{"value":user.field_prefijo_origen}],
    "field_respuesta_documentos":[{"value":user.field_respuesta_documentos}],
"field_regresar_por_wasap":[{"value":user.field_regresar_por_wasap}],
    "field_locacion_destino":[{"value": user.field_locacion_destino}],
    "field_locacion_entrega":[{"value": user.field_locacion_entrega}],
        // "field_medio_de_transporte":[{"value": this.medioTransporte}],
     "field_barrio_origen":[{"value": user.field_barrio_origen}],
"field_barrio_destino":[{"value": user.field_barrio_destino}],
"field_metodo_de_pago":[{"value": user.field_metodo_de_pago}],

"field_prefijo_destino":[{"value":user.field_prefijo_destino}],

"field_contacto":[{"value":user.field_contacto}],
"field_contacto_destino":[{"value":user.field_contacto_destino}],
"field_nombre_c_origen":[{"value": user.field_nombre_c_origen}],
"field_nombre_c_destino":[{"value": user.field_nombre_c_destino}]



     }

     this.resumenPagos = pagos;

  //this.router.navigateByUrl('/resumen-medicamentos');





}
//metodo para enviar formulario carro taller
sendFormularioCarrotaller(user: FormularioI){
  //sendFormulario
  let resumenCarroTaller = {
    "title":[{"value":'Mensajeria Medicamentos'}],

    "type":[{"target_id": 'sencilla'}],
    "field_direccion_entrega":[{"value":user.field_direccion_entrega}],
    "field_observaciones":[{"value": user.field_observaciones}],
    "field_prefijo_origen":[{"value":user.field_prefijo_origen}],
    "field_contacto":[{"value": user.field_contacto}],
    "field_locacion_entrega":[{"value":user.field_locacion_entrega}],

    "field_metodo_de_pago":[{"value":user.field_metodo_de_pago}],

    "field_barrio_origen":[{"value":user.field_barrio_origen}],
    "field_nombre_c_origen":[{"value": user.field_nombre_c_origen}],
"field_nombre_c_destino":[{"value": user.field_nombre_c_destino}]




     }

     this.resumen = resumenCarroTaller;

  //this.router.navigateByUrl('/resumen-medicamentos');





}
//metodo para hacer trasteo
sendFormularioTrasteo(user: FormularioI){
  //sendFormulario
  let resumenTrasteo = {
    "title":[{"value":'Mensajeria Medicamentos'}],

    "type":[{"target_id": 'sencilla'}],
    "field_direccion_entrega":[{"value":user.field_direccion_entrega}],
    "field_observaciones":[{"value": user.field_observaciones}],
    "field_prefijo_origen":[{"value":user.field_prefijo_origen}],
    "field_contacto":[{"value": user.field_contacto}],
    "field_contacto_destino":[{"value": user.field_contacto_destino}],
    "field_locacion_entrega":[{"value":user.field_locacion_entrega}],
    "field_prefijo_destino":[{"value":user.field_prefijo_destino}],
    "field_direccion_destino":[{"value": user.field_direccion_destino}],
    "field_locacion_destino":[{"value": user.field_locacion_destino}],

    "field_metodo_de_pago":[{"value": user.field_metodo_de_pago}],
    "field_barrio_origen":[{"value": user.field_barrio_origen}],
    "field_barrio_destino":[{"value": user.field_barrio_destino}],
    "body":[{"value": user.body}],
    "field_nombre_c_origen":[{"value": user.field_nombre_c_origen}],
"field_nombre_c_destino":[{"value": user.field_nombre_c_destino}]






     }

     this.resumen = resumenTrasteo;

  //this.router.navigateByUrl('/resumen-medicamentos');





}
sendFormularioArmaTuEquipo(user: FormularioI){
  //sendFormulario
  let resumenTrasteo = {
    "title":[{"value":'Mensajeria Medicamentos'}],

    "type":[{"target_id": 'sencilla'}],
    "field_direccion_entrega":[{"value":user.field_direccion_entrega}],
    "field_prefijo_destino":[{"value":user.field_prefijo_destino}],
    "field_prefijo_origen":[{"value":user.field_prefijo_origen}],
    "field_contacto":[{"value": user.field_contacto}],
    "field_contacto_destino":[{"value": user.field_contacto_destino}],
    "field_locacion_entrega":[{"value":user.field_locacion_entrega}],


    "field_locacion_destino":[{"value": user.field_locacion_destino}],
    "field_nombre_c_origen":[{"value": user.field_nombre_c_origen}],
"field_nombre_c_destino":[{"value": user.field_nombre_c_destino}]

     }

     this.resumen = resumenTrasteo;

  //this.router.navigateByUrl('/resumen-medicamentos');





}

sendFormularioZonaGamer(user: FormularioI){
  //sendFormulario
  let resumenTrasteo = {
    "title":[{"value":'Mensajeria Medicamentos'}],

    "type":[{"target_id": 'sencilla'}],
    "field_direccion_entrega":[{"value":user.field_direccion_entrega}],
    "field_direccion_destino":[{"value":user.field_direccion_destino}],

    "field_prefijo_origen":[{"value":user.field_prefijo_origen}],
    "field_contacto":[{"value": user.field_contacto}],
    "field_contacto_destino":[{"value": user.field_contacto_destino}],
    "field_locacion_entrega":[{"value":user.field_locacion_entrega}],
    "field_nombre_c_origen":[{"value": user.field_nombre_c_origen}],
"field_nombre_c_destino":[{"value": user.field_nombre_c_destino}]




     }

     this.resumen = resumenTrasteo;

  //this.router.navigateByUrl('/resumen-medicamentos');





}

//metodo para enviar fomulario ruta
sendFormularioRuta(user: FormularioI){

  console.log(user);
  //sendFormulario
  let ruta = {
    "title":[{"value":'Mensajeria Ruta'}],

  "type":[{"target_id": 'ruta'}],
  "field_direccion_entrega":[{"value": user.field_direccion_entrega}],
  "field_barrio_origen":[{"value": user.field_barrio_origen}],
  "field_barrio_destino":[{"value": user.field_barrio_destino}],
 "field_valor_declarado":[{"value": user.field_valor_declarado}],
"field_metodo_de_pago":[{"value": user.field_metodo_de_pago}],
"field_prefijo_destino2":[{"value":user.field_prefijo_destino2}],

"field_barrio_destino2":[{"value":user.field_barrio_destino2}],
  "field_contacto":[{"value": user.field_contacto}],

  "field_contacto_destino":[{"value": user.field_contacto_destino}],

  "field_direccion_destino":[{"value": user.field_direccion_destino}],



  "field_locacion_destino_r":[{"value": user.field_locacion_destino_r}],
  "field_locacion_entrega":[{"value": user.field_locacion_entrega}],

  "field_nombre_c_origen":[{"value": user.field_nombre_c_origen}],
"field_nombre_c_destino":[{"value": user.field_nombre_c_destino}],






   "body":[{"value": user.body}],
   "field_contacto_destino_r2":[{"value": user.field_contacto_destino_r2}],

  "field_direccion_destino_r2":[{"value": user.field_direccion_destino_r2}],



  "field_locacion_destino_r2":[{"value": user.field_locacion_destino_r2}],
  "field_nombre_c_destino2":[{"value": user.field_nombre_c_destino2}],



  "field_prefijo_origen":[{"value": user.field_prefijo_origen}],
      "field_prefijo_destino":[{"value": user.field_prefijo_destino}],


   "body2":[{"value": user.body2}],

   "body3":[{"value": user.body3}],
    "locacion3":[{"value": user.locacion3}],
    "contacto3":[{"value": user.contacto3}],
    "destino3":[{"value": user.destino3}],
    "field_prefijo_destino3":[{"value": user.field_prefijo_destino3}],
    "field_barrio_destino3":[{"value":user.field_barrio_destino3}],
    "field_nombre_c_destino3":[{"value": user.field_nombre_c_destino3}],

    "body4":[{"value": user.body4}],
    "locacion4":[{"value": user.locacion4}],
    "contacto4":[{"value": user.contacto4}],
    "destino4":[{"value": user.destino4}],
    "field_prefijo_destino4":[{"value": user.field_prefijo_destino4}],
    "field_barrio_destino4":[{"value":user.field_barrio_destino4}],
    "field_nombre_c_destino4":[{"value": user.field_nombre_c_destino4}],

    "body5":[{"value": user.body5}],
    "locacion5":[{"value": user.locacion5}],
    "contacto5":[{"value": user.contacto5}],
    "destino5":[{"value": user.destino5}],
    "field_prefijo_destino5":[{"value": user.field_prefijo_destino5}],
    "field_barrio_destino5":[{"value":user.field_barrio_destino5}],
    "field_nombre_c_destino5":[{"value": user.field_nombre_c_destino5}],

    "body6":[{"value": user.body6}],
    "locacion6":[{"value": user.locacion6}],
    "contacto6":[{"value": user.contacto6}],
    "destino6":[{"value": user.destino6}],
    "field_prefijo_destino6":[{"value": user.field_prefijo_destino6}],
    "field_barrio_destino6":[{"value":user.field_barrio_destino6}],
    "field_nombre_c_destino6":[{"value": user.field_nombre_c_destino6}],

    "body7":[{"value": user.body7}],
    "locacion7":[{"value": user.locacion7}],
    "contacto7":[{"value": user.contacto7}],
    "destino7":[{"value": user.destino7}],
    "field_prefijo_destino7":[{"value": user.field_prefijo_destino7}],
    "field_barrio_destino7":[{"value":user.field_barrio_destino7}],
    "field_nombre_c_destino7":[{"value": user.field_nombre_c_destino7}],

    "body8":[{"value": user.body8}],
    "locacion8":[{"value": user.locacion8}],
    "contacto8":[{"value": user.contacto8}],
    "destino8":[{"value": user.destino8}],
    "field_prefijo_destino8":[{"value": user.field_prefijo_destino8}],
    "field_barrio_destino8":[{"value":user.field_barrio_destino8}],
    "field_nombre_c_destino8":[{"value": user.field_nombre_c_destino8}],

    "body9":[{"value": user.body9}],
    "locacion9":[{"value": user.locacion9}],
    "contacto9":[{"value": user.contacto9}],
    "destino9":[{"value": user.destino9}],
    "field_prefijo_destino9":[{"value": user.field_prefijo_destino9}],
    "field_barrio_destino9":[{"value":user.field_barrio_destino9}],
    "field_nombre_c_destino9":[{"value": user.field_nombre_c_destino9}],

    "body10":[{"value": user.body10}],
    "locacion10":[{"value": user.locacion10}],
    "contacto10":[{"value": user.contacto10}],
    "destino10":[{"value": user.destino10}],
    "field_prefijo_destino10":[{"value": user.field_prefijo_destino10}],
    "field_barrio_destino10":[{"value":user.field_barrio_destino10}],
    "field_nombre_c_destino10":[{"value": user.field_nombre_c_destino10}],


     }

     this.resumenRuta = ruta;

  this.router.navigateByUrl('/resumen-ruta');





}
//metodo para enviat posicion

  async EnviarPosicionAuxiliar(){

  

  
    let sencilla = {
      "title":[{"value":'Posicion auxiliar'}],

    "type":[{"target_id": 'disponibles'}],
    "field_estado":[{"value": this.estadoPedido}],
    "field_longitud_actual":[{"value":this.longitud}],
    "field_latitud_actual":[{"value":this.latitud}],
    "field_location":[{"value": localStorage.getItem('locacion')}],
    "field_tipo_vehiculo":[{"value":localStorage.getItem('tipoVehiculo')}],



       }

       this.resumen = sencilla;

       const converSencilla = JSON.stringify(sencilla);
       console.log(converSencilla);
if(this.longitud=="" || this.latitud==""){
this.geolocation.openSetting();
}else{


       const headers = new HttpHeaders({'Content-Type': 'application/json','Authorization':'Basic '+this.b64,
       'X-CSRF-Token': this.tokencsrf});

       this.http.post('http://164.92.106.39/node?_format=hal_json',converSencilla,{headers:headers}).subscribe(async data2=>{
       

       
       console.log(data2);

       localStorage.setItem('nodeDisponibilidad',data2['nid']['0'].value);

            },error2=>{
              console.log(error2);
            if(error2.status==0){
              alert('Error revise su conexion');
              this.logout2();

            }else if(error2.status==422){
              alert('En estos momentos no podemos atender tu orden');
              this.logout2();

            }


            });


          }
  





  }
//metodo para actualizar posicion
  async actualizarPosicionEnviadaAuxiliar(){



    let sencilla = {
      "title":[{"value":'Posicion auxiliar'}],

    "type":[{"target_id": 'disponibles'}],
    "field_estado":[{"value": this.estadoPedido}],
    "field_longitud_actual":[{"value":this.longitud}],
    "field_latitud_actual":[{"value":this.latitud}],

    //"status":[{"value":"1"}],
    "field_location":[{"value": localStorage.getItem('locacion')}]



       }

       this.resumen = sencilla;

       const converSencilla = JSON.stringify(sencilla);
       console.log(converSencilla);
       if(this.longitud=="" || this.latitud==""){
        this.geolocation.openSetting();
        }else{

        
       const headers = new HttpHeaders({'Content-Type': 'application/json','Authorization':'Basic '+this.b64,
       'X-CSRF-Token': this.tokencsrf});
       let url = 'http://164.92.106.39/node/'+localStorage.getItem('nodeDisponibilidad')+'?_format=json';
       console.log(url,'patch act poscion')
       this.http.patch(url,converSencilla,{headers:headers}).subscribe(async data2=>{
        const alert = await this.alertControl.create({

          header: 'Notificación Vapaesa',

          message: 'Posición de auxiliar actualizada y enviada como disponible..! ',
          // al hacer check, vamos a establecer una variable y al darle aceptar preguntamos si esa varibale esta definida si esta se continua
          buttons: [
          {
            text:'aceptar',

          }]
        });

        await alert.present();
       console.log(data2,'posicion actualizada');



            },async error2=>{
              console.log(error2);
             this.errorPosicion =error2;
         


            });
          }
    





  }
  //metodo para mandar posicion lat y long
  async getLocation(){
    try {
      const permisionStatus = Geolocation.checkPermissions();
      console.log('Permsios statuus: ', (await permisionStatus).location)
      if((await permisionStatus)?.location != 'granted'){
        const requesStatus = await Geolocation.requestPermissions();
        if( requesStatus.location != 'granted'){
//go to setting
this.geolocation.openSetting();
return ;
        }

      }
      let options: PositionOptions={
        maximumAge: 3000,
        timeout: 10000,
        enableHighAccuracy:true
      };
      const position = Geolocation.getCurrentPosition(options);


      // obtner estado de gps y si esta activo  y a la apciaion se le consediaron los permisos de gps eneonces lazar


      this.latitud=(await position).coords.latitude;
      this.longitud = (await position).coords.longitude;

      console.log((await position).coords.latitude,'poss lat',(await position).coords.longitude,'poss long');
    } catch (e) {
      console.log(e);
      throw(e);
    }
  }
  //metodo para actualizar  la posicion a ocupado
  actualizarPosicionEnviadaAuxiliarOcupado(){

    let sencilla = {
      "title":[{"value":'Posicion auxiliar'}],

    "type":[{"target_id": 'disponibles'}],
    "field_estado":[{"value": this.estadoPedido}],
    "field_longitud_actual":[{"value":this.longitud}],
    "field_latitud_actual":[{"value":this.latitud}],
    //"status":[{"value":"1"}],
    "field_location":[{"value": localStorage.getItem('locacion')}]



       }

       this.resumen = sencilla;

       const converSencilla = JSON.stringify(sencilla);
       console.log(converSencilla);
       if(this.longitud=="" || this.latitud==""){
        this.geolocation.openSetting();
        }else{
       const headers = new HttpHeaders({'Content-Type': 'application/json','Authorization':'Basic '+this.b64,
       'X-CSRF-Token': this.tokencsrf});
       let url = 'http://164.92.106.39/node/'+localStorage.getItem('nodeDisponibilidad')+'?_format=json';
       console.log(url,'patch act poscion')
       this.http.patch(url,converSencilla,{headers:headers}).subscribe(async data2=>{
        const alert = await this.alertControl.create({

          header: 'Notificación Vapaesa',

          message: 'Posición de auxiliar actualizada y enviada como ocupado...! ',
          // al hacer check, vamos a establecer una variable y al darle aceptar preguntamos si esa varibale esta definida si esta se continua
          buttons: [
          {
            text:'aceptar',

          }]
        });

        await alert.present();
       console.log(data2,'posicion actualizada');



            },error2=>{
              console.log(error2);
            if(error2.status==0){
              alert('Error revise su conexion');
              this.logout2();

            }else if(error2.status==422){
              alert('En estos momentos no podemos atender tu orden');
              this.logout2();

            }


            });

          }


  }
//metodo para saber si tiene una disponibilidad activa
  getDisponibilidadPropia(){
    let auxB64 =localStorage.getItem('base64');

    const headers = new HttpHeaders({'Content-Type': 'application/json','Authorization':'Basic '+auxB64,
   });
   console.log(headers);
     this.urlAuxName = 'http://164.92.106.39/diponibilidad_auxliliar';

       return this.http.get(this.urlAuxName, {headers:headers})
       .pipe(
         map((res :any)=>{
           return res;
          // console.log(res['0']['Role'],'estoy en data');
         })
       )




  }

  //metodo para actualizar disponibilidad
  actualizarDisponibleAuxiliar(estadoAuxiliar){

  //localStorage.getItem('sencillaCreada');
  console.log('estamos aqui confirmado');


  this.tokencsrf = localStorage.getItem("csrf_token");


  let body ={


    "field_disponible":[{"value": estadoAuxiliar}]
 

};
   console.log(this.tokencsrf,'aqui csrf');

   this.b64 = localStorage.getItem("base64").toString();
   console.log(this.b64,'aqui b64');


   const headers = new HttpHeaders({'Content-Type': 'application/json','Authorization':'Basic '+this.b64,
   'X-CSRF-Token': this.tokencsrf});
   console.log(headers,'aqui header en act met pago');
   let url = 'http://164.92.106.39/user/'+localStorage.getItem('idAuxiliar')+'?_format=json';
   console.log(url,'antes de patch');


   this.http.patch(url,body,{headers:headers}).subscribe(data2=>{
    console.log(data2);
   // localStorage.setItem('sencillaCreada',data2['nid']['0']);
        },error2=>{
          console.log(error2);
          if(error2.status==0){
            alert('Error revise su conexion');
            this.logout2();

          }
        });


}

//metodo para enviar id notificacion push

  //metodo para actualizar disponibilidad
  enviarPushNotificacionAuxiliar(){

    //localStorage.getItem('sencillaCreada');
    console.log('estamos aqui confirmado');
  
  
    this.tokencsrf = localStorage.getItem("csrf_token");
  
  
    let body ={
  
  
      "field_push_user":[{"value": localStorage.getItem('tokenFire')}]
  
  };
     console.log(this.tokencsrf,'aqui csrf');
  
     this.b64 = localStorage.getItem("base64").toString();
     console.log(this.b64,'aqui b64');
  
  
     const headers = new HttpHeaders({'Content-Type': 'application/json','Authorization':'Basic '+this.b64,
     'X-CSRF-Token': this.tokencsrf});
     console.log(headers,'aqui header en act met pago');
     let url = 'http://164.92.106.39/user/'+localStorage.getItem('idAuxiliar')+'?_format=json';
     console.log(url,'antes de patch');
  
  
     this.http.patch(url,body,{headers:headers}).subscribe(data2=>{
      console.log(data2);
     // localStorage.setItem('sencillaCreada',data2['nid']['0']);
          },error2=>{
            console.log(error2);
            if(error2.status==0){
              alert('Error revise su conexion');
              this.logout2();
  
            }
          });
  
  
  }

//metodo para enviar la calificacion

enviarCalificacionPedido(comentario){

  //localStorage.getItem('sencillaCreada');


 this.tokencsrf = localStorage.getItem("csrf_token");


 let body ={

  "type":[{"target_id": 'sencilla'}],
  "field_comentario_de_calificacion":[{"value": comentario}],
     "field_ponderacion":[{"value": this.ponderacion}],
     "field_calificaion":[{"value":true}]




};
  console.log(this.tokencsrf,'aqui csrf');

  this.b64 = localStorage.getItem("base64").toString();
  console.log(this.b64,'aqui b64');


  const headers = new HttpHeaders({'Content-Type': 'application/json','Authorization':'Basic '+this.b64,
  'X-CSRF-Token': this.tokencsrf});
  console.log(headers,'aqui header en act met pago');
  let url = 'http://164.92.106.39/node/'+localStorage.getItem('nodePatch')+'?_format=json';
  console.log(url,'antes de patch');


  this.http.patch(url,body,{headers:headers}).subscribe(data2=>{
   console.log(data2);
  // localStorage.setItem('sencillaCreada',data2['nid']['0']);
       },error2=>{
         console.log(error2);
         if(error2.status==0){
           alert('Error revise su conexion');
           this.logout2();

         }
       });



}
//metodo para actualizar contrato pedidos
actualizarContraoPedidos(nodoCreado,estado){

  //localStorage.getItem('sencillaCreada');
  console.log('estamos aqui confirmado');


 this.tokencsrf = localStorage.getItem("csrf_token");


 let body ={

  "type":[{"target_id": 'sencilla'}],
   "field_aceptado_auxiliar":[{"value":estado}]




};
  console.log(this.tokencsrf,'aqui csrf');

  this.b64 = localStorage.getItem("base64").toString();
  console.log(this.b64,'aqui b64');


  const headers = new HttpHeaders({'Content-Type': 'application/json','Authorization':'Basic '+this.b64,
  'X-CSRF-Token': this.tokencsrf});
  console.log(headers,'aqui header en act met pago');
  let url = 'http://164.92.106.39/node/'+nodoCreado+'?_format=json';
  console.log(url,'antes de patch');


  this.http.patch(url,body,{headers:headers}).subscribe(data2=>{
   console.log(data2);
  // localStorage.setItem('sencillaCreada',data2['nid']['0']);
       },error2=>{
         console.log(error2);
         if(error2.status==0){
           alert('Error revise su conexion');
           this.logout2();

         }
       });



}




asignarAuxiliarPost(){
  let nodeId=localStorage.getItem('sencillaCreada');

  this.asignacion(nodeId);

  //this.enviarPushEnAsignado();




}
//metodo para asignar sencillas
asignacion(nodo){


  let sencilla = {
    "idnode":nodo






     }



     const converSencilla = JSON.stringify(sencilla);
     console.log(converSencilla);

     const headers = new HttpHeaders({'Content-Type': 'application/json','Authorization':'Basic '+this.b64,
     'X-CSRF-Token': this.tokencsrf});

     this.http.post('http://164.92.106.39/api/demo_resource?_format=json',converSencilla,{headers:headers}).subscribe(async data2=>{


      console.log(data2);
      console.log(data2['message']['Valor']);

      setTimeout(async () => {

        const alert = await this.alertControl.create({

          header: 'Notificacion Vapaesa',

          message: data2['message']['Valor'],
          // al hacer check, vamos a establecer una variable y al darle aceptar preguntamos si esa varibale esta definida si esta se continua
          buttons: [

          {
            text:'aceptar',
            handler:()=>{


            }
          }
        ]
        });

        await alert.present();

    }, 20000);




        this.isToken= data2['message']['Valor'];

       // localStorage.setItem('tokenNotificacionRecibidoParaAuxiliar',data2['message']['Valor']);








          },async error2=>{
            this.validarQuitarSecilla=true;
            if(this.validarQuitarSecilla==true){
              this.router.navigate(['/tabs']);
              this.quitarSencillaLista();
              this.isTokenError=null;

            }
            console.log(error2);
            if(error2['status']==0 || error2['status']==500){

            const alert = await this.alertControl.create({

              header: 'Notificacion Vapaesa',

              message: this.messajeErr,
              // al hacer check, vamos a establecer una variable y al darle aceptar preguntamos si esa varibale esta definida si esta se continua
              buttons: [

              {
                text:'aceptar',
                handler:()=>{
                  this.validarQuitarSecilla=true;
                  if(this.validarQuitarSecilla==true){
                    this.router.navigate(['/tabs']);
                    this.quitarSencillaLista();
                    this.isTokenError=null;

                  }

                }
              }
            ]
            });

            await alert.present();

            }

            localStorage.setItem('ErrorNotificacionRecibidoParaAuxiliar',error2);
            this.isTokenError=error2;


          });




}


 //metodo para asignar rutas
asignacionRutas(){
  console.log('cantidad de destinos',localStorage.getItem('cantidadDestinosRutas'));
  console.log(localStorage.getItem('sencillaCreadaPadre'));
  console.log(localStorage.getItem('sencillaCreadaDes1'));
  console.log(localStorage.getItem('sencillaCreadaDes2'));
  console.log(localStorage.getItem('sencillaCreadaDes3'));
  console.log(localStorage.getItem('sencillaCreadaDes4'));
  console.log(localStorage.getItem('sencillaCreadaDes5'));
  console.log(localStorage.getItem('sencillaCreadaDes6'));
  console.log(localStorage.getItem('sencillaCreadaDes7'));
  console.log(localStorage.getItem('sencillaCreadaDes8'));
  console.log(localStorage.getItem('sencillaCreadaDes9'));
  console.log(localStorage.getItem('sencillaCreadaDes10'));
  console.log(this.medioTransporte);
  console.log(localStorage.getItem('modalidad'));

  let sencilla = {
    "cantidadDisponiblesEsperados": localStorage.getItem('cantidadDestinosRutas'),
    "tipoDeRuta":this.medioTransporte,
    "field_modalidad":localStorage.getItem('modalidad'),
   "rutaPadre":localStorage.getItem('sencillaCreadaPadre'),
    "destino1":localStorage.getItem('sencillaCreadaDes1'),
    "destino2":localStorage.getItem('sencillaCreadaDes2'),
    "destino3":localStorage.getItem('sencillaCreadaDes3'),
    "destino4":localStorage.getItem('sencillaCreadaDes4'),
    "destino5":localStorage.getItem('sencillaCreadaDes5'),
    "destino6":localStorage.getItem('sencillaCreadaDes6'),
    "destino7":localStorage.getItem('sencillaCreadaDes7'),
    "destino8":localStorage.getItem('sencillaCreadaDes8'),
    "destino9":localStorage.getItem('sencillaCreadaDes9'),
    "destino10":localStorage.getItem('sencillaCreadaDes10')






     }

     this.resumen = sencilla;

     const converSencilla = JSON.stringify(sencilla);
     console.log(converSencilla);

     const headers = new HttpHeaders({'Content-Type': 'application/json','Authorization':'Basic '+this.b64,
     'X-CSRF-Token': this.tokencsrf});

     this.http.post('http://164.92.106.39/api/demo_resource?_format=json',converSencilla,{headers:headers}).subscribe(async data2=>{


      console.log(data2);
      console.log(data2['message']['Valor']);


      console.log(data2['message']['Valor']);

      setTimeout(async () => {

        const alert = await this.alertControl.create({

          header: 'Notificacion Vapaesa',

          message: data2['message']['Valor'],
          // al hacer check, vamos a establecer una variable y al darle aceptar preguntamos si esa varibale esta definida si esta se continua
          buttons: [

          {
            text:'aceptar',
            handler:()=>{


            }
          }
        ]
        });

        await alert.present();

    }, 20000);


        this.isToken= data2['message']['Valor'];
        //localStorage.setItem('tokenNotificacionRecibidoParaAuxiliar',data2['message']['Valor']);








          }, async error2=>{
            console.log(error2);

            this.validarQuitarSecilla=true;
            if(this.validarQuitarSecilla==true){
              this.router.navigate(['/tabs']);
              this.quitarSencillaLista();
              this.isTokenError=null;

            }
            const alert = await this.alertControl.create({

              header: 'Notificacion Vapaesa',

              message: this.messajeErr,
              // al hacer check, vamos a establecer una variable y al darle aceptar preguntamos si esa varibale esta definida si esta se continua
              buttons: [

              {
                text:'aceptar',
                handler:()=>{
                  this.router.navigate(['/tabs']);
                  this.quitarSencillaLista();
                  this.isTokenError=null;
                }
              }
            ]
            });

            await alert.present();




          });




}

//metodo para recuperar contraseña
resetPassword(email){

  this.http.get('http://164.92.106.39/session/token',{}).subscribe(data=>{
    console.log(data);
        },error=>{

          console.log(error);
          console.log(error.error.text);
          console.log(error.status);
          this.anonimustoken=error.status;
        });

        setTimeout(() => {
  let sencilla = {
    "email":email,







     }



     const converSencilla = JSON.stringify(sencilla);
     console.log(converSencilla);

     const headers = new HttpHeaders({'Content-Type': 'application/json','Accept':'application/json',
     'X-CSRF-Token': this.anonimustoken});

     this.http.post('http://164.92.106.39/api/demo_resource3?_format=json',converSencilla,{headers:headers}).subscribe(async data2=>{


      console.log(data2);
      console.log(data2['message']['Valor']);



        const alert = await this.alertControl.create({

          header: 'Notificacion Vapaesa',

          message: data2['message'],
          // al hacer check, vamos a establecer una variable y al darle aceptar preguntamos si esa varibale esta definida si esta se continua
          buttons: [

          {
            text:'aceptar',
            handler:()=>{


            }
          }
        ]
        });

        await alert.present();
















          },async error2=>{
            console.log(error2);





          });


        },5000)

}


//enviar calificacion baja
enviarNodoCalificcacionBaja(nodo){


  let sencilla = {
    "idnode":nodo






     }

     this.resumen = sencilla;

     const converSencilla = JSON.stringify(sencilla);
     console.log(converSencilla);

     const headers = new HttpHeaders({'Content-Type': 'application/json','Authorization':'Basic '+this.b64,
     'X-CSRF-Token': this.tokencsrf});

     this.http.post('http://164.92.106.39/api/demo_resource2?_format=json',converSencilla,{headers:headers}).subscribe(async data2=>{


      console.log(data2);
      console.log(data2['message']['Valor']);






       // localStorage.setItem('tokenNotificacionRecibidoParaAuxiliar',data2['message']['Valor']);








          },async error2=>{
            console.log(error2);





          });




}

CrearSencilla(user: FormularioI){

//Crear_sencilla
localStorage.removeItem('tokenNotificacionRecibidoParaAuxiliar');
localStorage.removeItem('ErrorNotificacionRecibidoParaAuxiliar');

let sencilla = {
  "title":[{"value":'Mensajeria Sencilla'}],

"type":[{"target_id": 'sencilla'}],
"field_direccion_entrega":[{"value":user.field_direccion_entrega}],
"field_contacto":[{"value": user.field_contacto}],
"field_direccion_destino":[{"value":user.field_direccion_destino}],
"field_contacto_destino":[{"value": user.field_contacto_destino}],
"field_ida_y_vuelta":[{"value":user.field_ida_y_vuelta}],
"field_locacion_entrega":[{"value":user.field_locacion_entrega}],
"field_locacion_destino":[{"value":user.field_locacion_destino}],
"field_prefijo_destino":[{"value":user.field_prefijo_destino}],
"field_prefijo_origen":[{"value":user.field_prefijo_origen}],
"field_valor_declarado":[{"value": user.field_valor_declarado}],
"field_observaciones":[{"value": user.field_observaciones}],
"field_push_token":[{"value": localStorage.getItem('tokenFire')}],
"field_barrio_origen":[{"value": user.field_barrio_origen}],
"field_barrio_destino":[{"value": user.field_barrio_destino}],
"field_metodo_de_pago":[{"value":user.field_metodo_de_pago}],
"field_medio_de_transporte":[{"value": this.medioTransporte}],
"field_url_imagen_destino":[{"value": localStorage.getItem('imgBarrioDestino')}],
"field_url_imagen_origen":[{"value": localStorage.getItem('imgBarrioOrigen')}],
"field_longitud_origen":[{"value": localStorage.getItem('longitudOrigen')}],
"field_latitud_origen_":[{"value": localStorage.getItem('latitudOrigen')}],
"field_precio_":[{"value": localStorage.getItem('precioTarifa')}],
"field_nombre_c_origen":[{"value": user.field_nombre_c_origen}],
"field_nombre_c_destino":[{"value": user.field_nombre_c_destino}],
"field_aceptado_cliente":[{"value": true}],
"field_quien_paga_":[{"value":user.field_quien_paga_}],
"field_tipo_solicitud":[{"value":'Sencilla'}]



   }

   this.resumen = sencilla;

   const converSencilla = JSON.stringify(sencilla);
   console.log(converSencilla);

   this.getToken();
   //console.log(sencilla);
  this.tokencsrf = localStorage.getItem("csrf_token");


   console.log(this.tokencsrf,'aqui new csrf');

   this.b64 = localStorage.getItem("base64").toString();
   console.log(this.b64,'aqui b64');


   const headers = new HttpHeaders({'Content-Type': 'application/json','Authorization':'Basic '+this.b64,
   'X-CSRF-Token': this.tokencsrf});

   console.log( this.tokencsrf+'8');

let verifyStatus;
   this.http.post('http://164.92.106.39/node?_format=hal_json',converSencilla,{headers:headers}).subscribe(data2=>{
    this.router.navigateByUrl('/orden-final');
   console.log(data2);
    localStorage.setItem('sencillaCreada',data2['nid']['0'].value);

    this.asignacion(data2['nid']['0'].value);

    this.nodoCreado =localStorage.getItem('sencillaCreada');
    console.log(data2['nid']['0'].value,'aqui nid en crear sencilla');
        },error2=>{
          console.log(error2);
        if(error2.status==0){
          alert('Error revise su conexion');
          this.logout2();

        }else if(error2.status==422){
          alert('En estos momentos no podemos atender tu orden');
          this.logout2();

        }


        });

}



CrearSencillaTrasteo(user: FormularioI){

  //Crear_sencilla


  let sencilla = {
    "title":[{"value":'Mensajeria Trasteo'}],

  "type":[{"target_id": 'sencilla'}],
  "field_direccion_entrega":[{"value":user.field_direccion_entrega}],
  "field_contacto":[{"value": user.field_contacto}],
  "field_direccion_destino":[{"value":user.field_direccion_destino}],
  "field_contacto_destino":[{"value": user.field_contacto_destino}],
  "field_ida_y_vuelta":[{"value":user.field_ida_y_vuelta}],
  "field_locacion_entrega":[{"value":user.field_locacion_entrega}],
  "field_locacion_destino":[{"value":user.field_locacion_destino}],
  "field_prefijo_destino":[{"value":user.field_prefijo_destino}],
  "field_prefijo_origen":[{"value":user.field_prefijo_origen}],
  "field_valor_declarado":[{"value": user.field_valor_declarado}],
  "field_observaciones":[{"value": user.body}],
  "field_medio_de_transporte":[{"value": 4}],
  "field_metodo_de_pago":[{"value": user.field_metodo_de_pago}],
  "field_barrio_origen":[{"value": user.field_barrio_origen}],
  "field_barrio_destino":[{"value": user.field_barrio_destino}],
  "field_push_token":[{"value": localStorage.getItem('tokenFire')}],
  "field_url_imagen_destino":[{"value": localStorage.getItem('imgBarrioDestino')}],
  "field_url_imagen_origen":[{"value": localStorage.getItem('imgBarrioOrigen')}],
  "field_longitud_origen":[{"value": localStorage.getItem('longitudOrigen')}],
  "field_latitud_origen_":[{"value": localStorage.getItem('latitudOrigen')}],
  "field_precio_":[{"value": localStorage.getItem('precioTarifa')}],
  "field_nombre_c_origen":[{"value": user.field_nombre_c_origen}],
"field_nombre_c_destino":[{"value": user.field_nombre_c_destino}],
"field_aceptado_cliente":[{"value": true}],
"field_tipo_solicitud":[{"value":'Trasteo'}]
 // "body":[{"value": user.body}]



     }

     this.resumen = sencilla;

     const converSencilla = JSON.stringify(sencilla);
     console.log(converSencilla);

     this.getToken();
     //console.log(sencilla);
    this.tokencsrf = localStorage.getItem("csrf_token");


     console.log(this.tokencsrf,'aqui new csrf');

     this.b64 = localStorage.getItem("base64").toString();
     console.log(this.b64,'aqui b64');


     const headers = new HttpHeaders({'Content-Type': 'application/json','Authorization':'Basic '+this.b64,
     'X-CSRF-Token': this.tokencsrf});

     console.log( this.tokencsrf+'8');

  let verifyStatus;
     this.http.post('http://164.92.106.39/node?_format=hal_json',converSencilla,{headers:headers}).subscribe(data2=>{
      this.router.navigateByUrl('/orden-final');
     console.log(data2);
      localStorage.setItem('sencillaCreada',data2['nid']['0'].value);


      this.asignacion(data2['nid']['0'].value);
      this.nodoCreado =localStorage.getItem('sencillaCreada');
      console.log(data2['nid']['0'].value,'aqui nid en crear sencilla');
          },error2=>{
            console.log(error2);
          if(error2.status==0){
            alert('Error revise su conexion');
            this.logout2();

          }else if(error2.status==422){
            alert('En estos momentos no podemos atender tu orden');
            this.logout2();

          }


          });

  }



CrearSencillaMascotas(user: FormularioI){

  //Crear_sencilla


  let sencilla = {
    "title":[{"value":'Mensajeria Recoger Mascotas'}],

  "type":[{"target_id": 'sencilla'}],
  "field_direccion_entrega":[{"value": user.field_direccion_entrega}],

  "field_contacto":[{"value": user.field_contacto}],

  "field_contacto_destino":[{"value": user.field_contacto_destino}],



  "field_push_token":[{"value": localStorage.getItem('tokenFire')}],
  "field_observaciones":[{"value": user.field_observaciones}],

  "field_locacion_destino":[{"value": user.field_locacion_destino}],

  "field_locacion_entrega":[{"value": user.field_locacion_entrega}],
  "field_prefijo_origen":[{"value": user.field_prefijo_origen}],
  "field_nombre_c_origen":[{"value": user.field_nombre_c_origen}],
"field_nombre_c_destino":[{"value": user.field_nombre_c_destino}],
"field_aceptado_cliente":[{"value": true}],



     }

     this.resumen = sencilla;

     const converSencilla = JSON.stringify(sencilla);
     console.log(converSencilla);

     this.getToken();
     //console.log(sencilla);
    this.tokencsrf = localStorage.getItem("csrf_token");


     console.log(this.tokencsrf,'aqui new csrf');

     this.b64 = localStorage.getItem("base64").toString();
     console.log(this.b64,'aqui b64');


     const headers = new HttpHeaders({'Content-Type': 'application/json','Authorization':'Basic '+this.b64,
     'X-CSRF-Token': this.tokencsrf});

     console.log( this.tokencsrf+'8');

  let verifyStatus;
     this.http.post('http://164.92.106.39/node?_format=hal_json',converSencilla,{headers:headers}).subscribe(data2=>{
      this.router.navigateByUrl('/formadepag');
     console.log(data2);
      localStorage.setItem('sencillaCreada',data2['nid']['0'].value);



      this.nodoCreado =localStorage.getItem('sencillaCreada');
      console.log(data2['nid']['0'].value,'aqui nid en crear Mascotas');
          },error2=>{
            console.log(error2);
          if(error2.status==0){
            alert('Error revise su conexion');
            this.logout2();

          }else if(error2.status==422){
            alert('En estos momentos no podemos atender tu orden');
            this.logout2();

          }


          });

  }
  CrearSencillaCarroTaller(user: FormularioI){

    //Crear_sencilla


    let sencilla = {
      "title":[{"value":'Mensajeria Carro Taller'}],

    "type":[{"target_id": 'sencilla'}],
    "field_direccion_entrega":[{"value":user.field_direccion_entrega}],
    "field_contacto":[{"value": user.field_contacto}],
    "field_direccion_destino":[{"value":user.field_direccion_destino}],
    "field_contacto_destino":[{"value": user.field_contacto_destino}],
    "field_ida_y_vuelta":[{"value":user.field_ida_y_vuelta}],
    "field_locacion_entrega":[{"value":user.field_locacion_entrega}],
    "field_locacion_destino":[{"value":user.field_locacion_destino}],
    "field_prefijo_destino":[{"value":user.field_prefijo_destino}],
    "field_prefijo_origen":[{"value":user.field_prefijo_origen}],
    "field_valor_declarado":[{"value": user.field_valor_declarado}],
    "field_observaciones":[{"value": user.field_observaciones}],
    "field_push_token":[{"value": localStorage.getItem('tokenFire')}],
    "field_metodo_de_pago":[{"value":user.field_metodo_de_pago}],
    "field_medio_de_transporte":[{"value": 6}],
    "field_barrio_origen":[{"value":user.field_barrio_origen}],

    "field_url_imagen_destino":[{"value": localStorage.getItem('imgBarrioDestino')}],
    "field_url_imagen_origen":[{"value": localStorage.getItem('imgBarrioOrigen')}],
    "field_longitud_origen":[{"value": localStorage.getItem('longitudOrigen')}],
    "field_latitud_origen_":[{"value": localStorage.getItem('latitudOrigen')}],
    "field_precio_":[{"value": localStorage.getItem('tarifaOrigen')}],
    "field_nombre_c_origen":[{"value": user.field_nombre_c_origen}],
"field_nombre_c_destino":[{"value": user.field_nombre_c_destino}],
"field_aceptado_cliente":[{"value": true}],
"field_tipo_solicitud":[{"value":'Carro Taller'}]



       }

       this.resumen = sencilla;

       const converSencilla = JSON.stringify(sencilla);
       console.log(converSencilla);

       this.getToken();
       //console.log(sencilla);
      this.tokencsrf = localStorage.getItem("csrf_token");


       console.log(this.tokencsrf,'aqui new csrf');

       this.b64 = localStorage.getItem("base64").toString();
       console.log(this.b64,'aqui b64');


       const headers = new HttpHeaders({'Content-Type': 'application/json','Authorization':'Basic '+this.b64,
       'X-CSRF-Token': this.tokencsrf});

       console.log( this.tokencsrf+'8');

    let verifyStatus;
       this.http.post('http://164.92.106.39/node?_format=hal_json',converSencilla,{headers:headers}).subscribe(data2=>{
        this.router.navigateByUrl('/orden-final');
       console.log(data2);
        localStorage.setItem('sencillaCreada',data2['nid']['0'].value);


        this.asignacion(data2['nid']['0'].value);
        this.nodoCreado =localStorage.getItem('sencillaCreada');
        console.log(data2['nid']['0'].value,'aqui nid en crear sencilla');
            },error2=>{
              console.log(error2);
            if(error2.status==0){
              alert('Error revise su conexion');
              this.logout2();

            }else if(error2.status==422){
              alert('En estos momentos no podemos atender tu orden');
              this.logout2();

            }


            });

    }

    CrearSencillaZonaGamer(user: FormularioI){

      //Crear_sencilla


      let sencilla = {
        "title":[{"value":'Mensajeria Zona Gamer'}],

      "type":[{"target_id": 'sencilla'}],
      "field_direccion_entrega":[{"value":user.field_direccion_entrega}],
      "field_contacto":[{"value": user.field_contacto}],
      "field_direccion_destino":[{"value":user.field_direccion_destino}],
      "field_contacto_destino":[{"value": user.field_contacto_destino}],
      "field_ida_y_vuelta":[{"value":user.field_ida_y_vuelta}],
      "field_locacion_entrega":[{"value":user.field_locacion_entrega}],
      "field_locacion_destino":[{"value":user.field_locacion_destino}],
      "field_prefijo_destino":[{"value":user.field_prefijo_destino}],
      "field_prefijo_origen":[{"value":user.field_prefijo_origen}],
      "field_valor_declarado":[{"value": user.field_valor_declarado}],
      "field_observaciones":[{"value": user.field_observaciones}],
      "field_push_token":[{"value": localStorage.getItem('tokenFire')}],
      "field_nombre_c_origen":[{"value": user.field_nombre_c_origen}],
"field_nombre_c_destino":[{"value": user.field_nombre_c_destino}]


         }

         this.resumen = sencilla;

         const converSencilla = JSON.stringify(sencilla);
         console.log(converSencilla);

         this.getToken();
         //console.log(sencilla);
        this.tokencsrf = localStorage.getItem("csrf_token");


         console.log(this.tokencsrf,'aqui new csrf');

         this.b64 = localStorage.getItem("base64").toString();
         console.log(this.b64,'aqui b64');


         const headers = new HttpHeaders({'Content-Type': 'application/json','Authorization':'Basic '+this.b64,
         'X-CSRF-Token': this.tokencsrf});

         console.log( this.tokencsrf+'8');

      let verifyStatus;
         this.http.post('http://164.92.106.39/node?_format=hal_json',converSencilla,{headers:headers}).subscribe(data2=>{
          this.router.navigateByUrl('/formadepag');
         console.log(data2);
          localStorage.setItem('sencillaCreada',data2['nid']['0'].value);



          this.nodoCreado =localStorage.getItem('sencillaCreada');
          console.log(data2['nid']['0'].value,'aqui nid en crear sencilla');
              },error2=>{
                console.log(error2);
              if(error2.status==0){
                alert('Error revise su conexion');
                this.logout2();

              }else if(error2.status==422){
                alert('En estos momentos no podemos atender tu orden');
                this.logout2();

              }


              });

      }

      CrearSencillaArmaTuEquipo(user: FormularioI){

        //Crear_sencilla


        let sencilla = {
          "title":[{"value":'Mensajeria Arma Tu Equipo'}],

        "type":[{"target_id": 'sencilla'}],
        "field_direccion_entrega":[{"value":user.field_direccion_entrega}],
        "field_contacto":[{"value": user.field_contacto}],
        "field_direccion_destino":[{"value":user.field_direccion_destino}],
        "field_contacto_destino":[{"value": user.field_contacto_destino}],
        "field_ida_y_vuelta":[{"value":user.field_ida_y_vuelta}],
        "field_locacion_entrega":[{"value":user.field_locacion_entrega}],
        "field_locacion_destino":[{"value":user.field_locacion_destino}],
        "field_prefijo_destino":[{"value":user.field_prefijo_destino}],
        "field_prefijo_origen":[{"value":user.field_prefijo_origen}],
        "field_valor_declarado":[{"value": user.field_valor_declarado}],
        "field_observaciones":[{"value": user.field_observaciones}],
        "field_push_token":[{"value": localStorage.getItem('tokenFire')}],
        "field_nombre_c_origen":[{"value": user.field_nombre_c_origen}],
"field_nombre_c_destino":[{"value": user.field_nombre_c_destino}]



           }

           this.resumen = sencilla;

           const converSencilla = JSON.stringify(sencilla);
           console.log(converSencilla);

           this.getToken();
           //console.log(sencilla);
          this.tokencsrf = localStorage.getItem("csrf_token");


           console.log(this.tokencsrf,'aqui new csrf');

           this.b64 = localStorage.getItem("base64").toString();
           console.log(this.b64,'aqui b64');


           const headers = new HttpHeaders({'Content-Type': 'application/json','Authorization':'Basic '+this.b64,
           'X-CSRF-Token': this.tokencsrf});

           console.log( this.tokencsrf+'8');

        let verifyStatus;
           this.http.post('http://164.92.106.39/node?_format=hal_json',converSencilla,{headers:headers}).subscribe(data2=>{
            this.router.navigateByUrl('/formadepag');
           console.log(data2);
            localStorage.setItem('sencillaCreada',data2['nid']['0'].value);



            this.nodoCreado =localStorage.getItem('sencillaCreada');
            console.log(data2['nid']['0'].value,'aqui nid en crear sencilla');
                },error2=>{
                  console.log(error2);
                if(error2.status==0){
                  alert('Error revise su conexion');
                  this.logout2();

                }else if(error2.status==422){
                  alert('En estos momentos no podemos atender tu orden');
                  this.logout2();

                }


                });

        }

CrearOrdenCompra(user: FormularioI){

  //Crear_sencilla


  let sencilla = {
    "title":[{"value":'de compra'}],

  "type":[{"target_id": 'sencilla'}],
  "field_direccion_entrega":[{"value":localStorage.getItem('DireccionRestaurante')}],
  "field_contacto":[{"value":  localStorage.getItem('ContactoRestaurante')}],
  "field_direccion_destino":[{"value":user.field_direccion_destino}],
  "field_contacto_destino":[{"value": user.field_contacto}],
  "field_ida_y_vuelta":[{"value":user.field_ida_y_vuelta}],
  "field_locacion_entrega":[{"value":localStorage.getItem('locacionTiendas')}],
  "field_locacion_destino":[{"value":user.field_locacion_destino}],
  "field_prefijo_destino":[{"value":user.field_prefijo_destino}],
  "field_prefijo_origen":[{"value":user.field_prefijo_origen}],
  "field_valor_declarado":[{"value": user.field_valor_declarado}],
  "field_observaciones":[{"value": user.field_observaciones}],
  "field_barrio_destino":[{"value": user.field_barrio_destino}],
  "field_push_token":[{"value": localStorage.getItem('tokenFire')}],
  "field_nombre_c_destino":[{"value": user.field_nombre_c_origen}],
  "field_precio_":[{"value": this.domicilioRestaurante}],
  "field_medio_de_transporte":[{"value": this.medioTransporte}],
  "field_url_imagen_destino":[{"value": localStorage.getItem('imgBarrioDestino')}],
  "field_url_imagen_origen":[{"value": localStorage.getItem('imgBarrioOrigenRestaurante')}],
  "field_longitud_origen":[{"value": localStorage.getItem('longitudOrigenRestaurante')}],
  "field_latitud_origen_":[{"value": localStorage.getItem('latitudOrigenRestaurante')}],
  "field_barrio_origen":[{"value": localStorage.getItem('BarrioRestaurante')}],
  "field_aceptado_cliente":[{"value": true}],
  "field_tipo_de_orden":[{"value": "compra"}],
  "field_tipo_solicitud":[{"value":'Orden Compra'}]


     }

     this.resumen = sencilla;

     const converSencilla = JSON.stringify(sencilla);
     console.log(converSencilla);

     this.getToken();
     //console.log(sencilla);
    this.tokencsrf = localStorage.getItem("csrf_token");


     console.log(this.tokencsrf,'aqui new csrf');

     this.b64 = localStorage.getItem("base64").toString();
     console.log(this.b64,'aqui b64');


     const headers = new HttpHeaders({'Content-Type': 'application/json','Authorization':'Basic '+this.b64,
     'X-CSRF-Token': this.tokencsrf});

     console.log( this.tokencsrf+'8');

  let verifyStatus;
     this.http.post('http://164.92.106.39/node?_format=hal_json',converSencilla,{headers:headers}).subscribe(data2=>{
      this.router.navigateByUrl('/orden-final');
     console.log(data2);
      localStorage.setItem('sencillaCreada',data2['nid']['0'].value);


      this.asignacion(data2['nid']['0'].value);
      this.nodoCreado =localStorage.getItem('sencillaCreada');
      console.log(data2['nid']['0'].value,'aqui nid en crear sencilla');
          },error2=>{
            console.log(error2);
          if(error2.status==0){
            alert('Error revise su conexion');
            this.logout2();

          }else if(error2.status==422){
            alert('En estos momentos no podemos atender tu orden');
            this.logout2();

          }


          });

  }


CrearSencillaLlaves(user: FormularioI){

  //Crear_sencilla


  let sencilla = {
    "title":[{"value":' Mensajeria llaves'}],

  "type":[{"target_id": 'sencilla'}],
  "field_direccion_entrega":[{"value":user.field_direccion_entrega}],
  "field_contacto":[{"value": user.field_contacto}],
  "field_direccion_destino":[{"value":user.field_direccion_destino}],
  "field_tema_de_interes":[{"value": user.field_tema_de_interes}],
 "field_ida_y_vuelta":[{"value":user.field_ida_y_vuelta}],
  "field_locacion_entrega":[{"value":user.field_locacion_entrega}],
  "field_locacion_destino":[{"value":user.field_locacion_destino}],
  "field_prefijo_destino":[{"value":user.field_prefijo_destino}],
  "field_prefijo_origen":[{"value":user.field_prefijo_origen}],
  "field_musica_preferida":[{"value": user.field_musica_preferida}],

  "field_barrio_origen":[{"value": user.field_barrio_origen}],
  "field_barrio_destino":[{"value": user.field_barrio_destino}],
  "field_metodo_de_pago":[{"value": user.field_metodo_de_pago}],
  "field_medio_de_transporte":[{"value": 2}],
  "field_push_token":[{"value": localStorage.getItem('tokenFire')}],
  "field_contacto_destino":[{"value": user.field_contacto_destino}],
  "field_url_imagen_destino":[{"value": localStorage.getItem('imgBarrioDestino')}],
"field_url_imagen_origen":[{"value": localStorage.getItem('imgBarrioOrigen')}],
"field_longitud_origen":[{"value": localStorage.getItem('longitudOrigen')}],
"field_latitud_origen_":[{"value": localStorage.getItem('latitudOrigen')}],
"field_precio_":[{"value": localStorage.getItem('precioTarifa')}],
"field_nombre_c_origen":[{"value": user.field_nombre_c_origen}],
"field_nombre_c_destino":[{"value": user.field_nombre_c_destino}],
"field_aceptado_cliente":[{"value": true}],
"field_tipo_solicitud":[{"value":'Llaves'}]
  //"field_observaciones":[{"value": user.field_observaciones}]



     }

     this.resumen = sencilla;

     const converSencilla = JSON.stringify(sencilla);
     console.log(converSencilla);

     this.getToken();
     //console.log(sencilla);
    this.tokencsrf = localStorage.getItem("csrf_token");


     console.log(this.tokencsrf,'aqui csrf');

     this.b64 = localStorage.getItem("base64").toString();
     console.log(this.b64,'aqui b64');


     const headers = new HttpHeaders({'Content-Type': 'application/json','Authorization':'Basic '+this.b64,
     'X-CSRF-Token': this.tokencsrf});


     this.http.post('http://164.92.106.39/node?_format=hal_json',converSencilla,{headers:headers}).subscribe(data2=>{
      this.router.navigateByUrl('/orden-final');
     console.log(data2);
      localStorage.setItem('sencillaCreada',data2['nid']['0'].value);



      this.nodoCreado =localStorage.getItem('sencillaCreada');
      console.log(data2['nid']['0'].value,'aqui nid en crear llaves');
      this.asignacion(data2['nid']['0'].value);
          },error2=>{
            console.log(error2);
            if(error2.status==0){
              alert('revise su conexion');
              this.logout2();

            }else if(error2.status==422){
              alert('En estos momentos no podemos atender tu orden');
              this.logout2();

            }

          });


  }

//crear sencilla padre

CrearSencillaPadre(user: FormularioI){



  //Crear_sencilla
//los datos del destino 1
  let sencilla = {
    "title":[{"value":'Mensajeria Ruta padre'}],
  ///origen es mismo para todas
  //destios el lo que tienes en el vector

  "type":[{"target_id": 'sencilla'}],


  "field_prefijo_origen":[{"value":user.field_prefijo_origen}],
  "field_direccion_entrega":[{"value":user.field_direccion_entrega}],
  "field_contacto":[{"value": user.field_contacto}],
  "field_ruta_":[{"value":true}],
  "field_medio_de_transporte":[{"value": this.medioTransporte}],
  "field_barrio_origen":[{"value": user.field_barrio_origen}],
  "field_locacion_entrega":[{"value": user.field_locacion_entrega}],
  "field_valor_declarado":[{"value": user.field_valor_declarado}],
  "field_metodo_de_pago":[{"value": user.field_metodo_de_pago}],
  "field_push_token":[{"value": localStorage.getItem('tokenFire')}],
  "field_url_imagen_destino":[{"value": localStorage.getItem('imgBarrioDestino')}],
  "field_url_imagen_origen":[{"value": localStorage.getItem('imgBarrioOrigen')}],
  "field_longitud_origen":[{"value": localStorage.getItem('longitudOrigen')}],
  "field_latitud_origen_":[{"value": localStorage.getItem('latitudOrigen')}],
  "field_nombre_c_origen":[{"value": user.field_nombre_c_origen}],
  "field_aceptado_cliente":[{"value": true}],
  "field_precio_total":[{"value":localStorage.getItem('precioTarifaTotalRuta')}],
  "field_tipo_solicitud":[{"value":localStorage.getItem('modalidad')}]
//"field_nombre_c_destino":[{"value": user.field_nombre_c_destino}]
  //"field_precio_":[{"value": localStorage.getItem('precioTarifa')}]


     }





     this.resumen = sencilla;

     const converSencillahija1 = JSON.stringify(sencilla);

     console.log(converSencillahija1);

     this.getToken();
     //console.log(sencilla);
    this.tokencsrf = localStorage.getItem("csrf_token");


     console.log(this.tokencsrf,'aqui new csrf');

     this.b64 = localStorage.getItem("base64").toString();
     console.log(this.b64,'aqui b64');


     const headers = new HttpHeaders({'Content-Type': 'application/json','Authorization':'Basic '+this.b64,
     'X-CSRF-Token': this.tokencsrf});


     this.http3.post('http://164.92.106.39/node?_format=hal_json',converSencillahija1,{headers:headers}).subscribe(data23=>{
      console.log(data23);
     // this.router.navigateByUrl('/formadepag');

      localStorage.setItem('sencillaCreadaPadre',data23['nid']['0'].value);
     // this.asignacion(data23['nid']['0'].value);

      this.nodoCreado =localStorage.getItem('sencillaCreadaPadre');
      console.log(data23['nid']['0'].value,'aqui nid en crear sencilla padre');
          },error23=>{
            console.log(error23);
            if(error23.status==0){
              alert('revise su conexion');
              this.logout2();

            }else if(error23.status==422){
              alert('En estos momentos no podemos atender tu orden');
              this.logout2();

            }


          });


  }




//crear sencilla 1
CrearSencilla1(user: FormularioI){



  //Crear_sencilla
//los datos del destino 1
  let sencilla = {
    "title":[{"value":'Destino 1 '}],
    ///origen es mismo para todas
    //destios el lo que tienes en el vector

    "type":[{"target_id": 'sencilla'}],
    "field_prefijo_origen":[{"value":user.field_prefijo_origen}],
    "field_direccion_entrega":[{"value":user.field_direccion_entrega}],
    "field_contacto":[{"value": user.field_contacto}],
    "field_locacion_destino":[{"value": user.field_locacion_destino_r}],

    "field_direccion_destino":[{"value":user.field_direccion_destino}],
    "field_contacto_destino":[{"value": user.field_contacto_destino}],
    "field_observaciones":[{"value":user.body}],
    "field_push_token":[{"value": localStorage.getItem('tokenFire')}],
    "field_prefijo_destino":[{"value":user.field_prefijo_destino}],
    "field_padre":[{"value":this.nodoCreado}],
    "field_barrio_origen":[{"value": user.field_barrio_origen}],
    "field_barrio_destino":[{"value": user.field_barrio_destino}],
  "field_locacion_entrega":[{"value": user.field_locacion_entrega}],
  "field_valor_declarado":[{"value": user.field_valor_declarado}],
"field_metodo_de_pago":[{"value": user.field_metodo_de_pago}],
"field_medio_de_transporte":[{"value": this.medioTransporte}],
"field_url_imagen_destino":[{"value": localStorage.getItem('imgBarrioDestino')}],
"field_url_imagen_origen":[{"value": localStorage.getItem('imgBarrioOrigen')}],
"field_longitud_origen":[{"value": localStorage.getItem('longitudOrigen')}],
"field_latitud_origen_":[{"value": localStorage.getItem('latitudOrigen')}],
"field_precio_":[{"value": localStorage.getItem('precioTarifa')}],
//"field_nombre_c_origen":[{"value": user.field_nombre_c_origen}],
"field_nombre_c_destino":[{"value": user.field_nombre_c_destino}],
"field_nombre_c_origen":[{"value": user.field_nombre_c_origen}],
"field_aceptado_cliente":[{"value": true}],
"field_tipo_solicitud":[{"value":'Ruta hija'}]




     }


     //asignar los datos del destino 2
     let sencilla2 = {
      "title":[{"value":'Destino 2 '}],

    "type":[{"target_id": 'sencilla'}],
    "field_prefijo_origen":[{"value":user.field_prefijo_origen}],
    "field_direccion_entrega":[{"value":user.field_direccion_entrega}],
    "field_contacto":[{"value": user.field_contacto}],
    "field_direccion_destino":[{"value":user.field_direccion_destino}],
    "field_contacto_destino":[{"value": user.field_contacto_destino}],

    "field_push_token":[{"value": localStorage.getItem('tokenFire')}],
    "field_locacion_destino_r":[{"value": user.field_locacion_destino_r2}],
    "field_prefijo_destino":[{"value":user.field_prefijo_destino2}],
    "field_direccion_destino_r2":[{"value": user.field_direccion_destino_r2}],
    "field_contacto_destino_r2":[{"value": user.field_contacto_destino_r2}],
    "field_observaciones":[{"value":user.body2}],
    "field_padre":[{"value":this.nodoCreado}],
    "field_barrio_origen":[{"value": user.field_barrio_origen}],
    "field_barrio_destino":[{"value": user.field_barrio_destino2}],
  "field_locacion_entrega":[{"value": user.field_locacion_entrega}],
  "field_valor_declarado":[{"value": user.field_valor_declarado}],
"field_metodo_de_pago":[{"value": user.field_metodo_de_pago}],
"field_medio_de_transporte":[{"value": this.medioTransporte}],
"field_url_imagen_destino":[{"value": localStorage.getItem('imgBarrioDestino')}],
"field_url_imagen_origen":[{"value": localStorage.getItem('imgBarrioOrigen')}],
"field_longitud_origen":[{"value": localStorage.getItem('longitudOrigen')}],
"field_latitud_origen_":[{"value": localStorage.getItem('latitudOrigen')}],
"field_precio_":[{"value": localStorage.getItem('precioTarifa2')}],
"field_nombre_c_destino":[{"value": user.field_nombre_c_destino2}],
"field_nombre_c_origen":[{"value": user.field_nombre_c_origen}],
"field_tipo_solicitud":[{"value":'Ruta hija'}]
       }


     this.resumen = sencilla;

     const converSencillahija1 = JSON.stringify(sencilla);
     const converSencillahija2 = JSON.stringify(sencilla2);
     console.log(converSencillahija1);
     console.log(converSencillahija2);
     this.getToken();
     //console.log(sencilla);
    this.tokencsrf = localStorage.getItem("csrf_token");


     console.log(this.tokencsrf,'aqui csrf');

     this.b64 = localStorage.getItem("base64").toString();
     console.log(this.b64,'aqui b64');


     const headers = new HttpHeaders({'Content-Type': 'application/json','Authorization':'Basic '+this.b64,
     'X-CSRF-Token': this.tokencsrf});


     setTimeout(() => {
      this.http.post('http://164.92.106.39/node?_format=hal_json',converSencillahija1,{headers:headers}).subscribe(data21=>{
        console.log(data21);
        localStorage.setItem('sencillaCreadaDes1',data21['nid']['0'].value);
       // this.asignacion(data21['nid']['0'].value);


        //this.nodoCreado =localStorage.getItem('sencillaCreada');
        console.log(data21['nid']['0'].value,'aqui nid en crear destino 1');
            },error21=>{
              console.log(error21);
              if(error21.status==0){
                alert('Error en destino 1 revise su conexion internet')

              }else if(error21.status==422){
                alert('En estos momentos no podemos atender tu orden');
                this.logout2();

              }

            });
     }, 3000);

     setTimeout(() => {
      this.http2.post('http://164.92.106.39/node?_format=hal_json',converSencillahija2,{headers:headers}).subscribe(data22=>{
        console.log(data22);
        localStorage.setItem('sencillaCreadaDes2',data22['nid']['0'].value);

       // this.asignacion(data22['nid']['0'].value);
        //this.nodoCreado =localStorage.getItem('sencillaCreada');
        console.log(data22['nid']['0'].value,'aqui nid en crear destino 2');
            },error22=>{
              console.log(error22);
              if(error22.status==0){
                alert('Error en destino 2 revise su conexion internet')

              }else if(error22.status==422){
                alert('En estos momentos no podemos atender tu orden');
                this.logout2();

              }
            });
      ;
     }, 5000);

     this.router.navigateByUrl('/orden-final');









  }
  CrearSencilla3(user: FormularioI){



    //Crear_sencilla
  //los datos del destino 1
    let sencilla = {
      "title":[{"value":'Destino 3 '}],
    ///origen es mismo para todas
    //destios el lo que tienes en el vector

    "type":[{"target_id": 'sencilla'}],


    "field_prefijo_origen":[{"value":user.field_prefijo_origen}],
    "field_direccion_entrega":[{"value":user.field_direccion_entrega}],
    "field_contacto":[{"value": user.field_contacto}],
    "field_locacion_destino":[{"value": user.locacion3}],

    "field_direccion_destino":[{"value":user.destino3}],
    "field_contacto_destino":[{"value": user.contacto3}],
    "field_observaciones":[{"value":user.body3}],
    "field_nombre_c_destino":[{"value": user.field_nombre_c_destino3}],

    "field_prefijo_destino":[{"value":user.field_prefijo_destino3}],
    "field_padre":[{"value":this.nodoCreado}],
    "field_push_token":[{"value": localStorage.getItem('tokenFire')}],
    "field_barrio_origen":[{"value": user.field_barrio_origen}],
    "field_barrio_destino":[{"value": user.field_barrio_destino3}],
  "field_locacion_entrega":[{"value": user.field_locacion_entrega}],
  "field_valor_declarado":[{"value": user.field_valor_declarado}],
"field_metodo_de_pago":[{"value": user.field_metodo_de_pago}],
"field_medio_de_transporte":[{"value": this.medioTransporte}],
"field_url_imagen_destino":[{"value": localStorage.getItem('imgBarrioDestino')}],
"field_url_imagen_origen":[{"value": localStorage.getItem('imgBarrioOrigen')}],
"field_longitud_origen":[{"value": localStorage.getItem('longitudOrigen')}],
"field_latitud_origen_":[{"value": localStorage.getItem('latitudOrigen')}],
"field_precio_":[{"value": localStorage.getItem('precioTarifa3')}],
"field_nombre_c_origen":[{"value": user.field_nombre_c_origen}],
"field_aceptado_cliente":[{"value": true}],
"field_tipo_solicitud":[{"value":'Ruta hija'}]





       }





       this.resumen = sencilla;

       const converSencillahija1 = JSON.stringify(sencilla);

       console.log(converSencillahija1);

       this.getToken();
       //console.log(sencilla);
      this.tokencsrf = localStorage.getItem("csrf_token");


       console.log(this.tokencsrf,'aqui csrf');

       this.b64 = localStorage.getItem("base64").toString();
       console.log(this.b64,'aqui b64');


       const headers = new HttpHeaders({'Content-Type': 'application/json','Authorization':'Basic '+this.b64,
       'X-CSRF-Token': this.tokencsrf});


       this.http3.post('http://164.92.106.39/node?_format=hal_json',converSencillahija1,{headers:headers}).subscribe(data23=>{
        console.log(data23);
       // this.asignacion(data23['nid']['0'].value);
        localStorage.setItem('sencillaCreadaDes3',data23['nid']['0'].value);


        //this.nodoCreado =localStorage.getItem('sencillaCreada');
        console.log(data23['nid']['0'].value,'aqui nid en crear sencilla');
            },error23=>{
              console.log(error23);
              if(error23.status==0){
                alert('Error en destino 2 revise su conexion internet')

              }else if(error23.status==422){
                alert('En estos momentos no podemos atender tu orden');
                this.logout2();

              }
            }
            );


    }

    CrearSencilla4(user: FormularioI){



      //Crear_sencilla
    //los datos del destino 1
      let sencilla = {
        "title":[{"value":'Destino 4 '}],
      ///origen es mismo para todas
      //destios el lo que tienes en el vector

      "type":[{"target_id": 'sencilla'}],
      "field_prefijo_origen":[{"value":user.field_prefijo_origen}],
      "field_direccion_entrega":[{"value":user.field_direccion_entrega}],
      "field_contacto":[{"value": user.field_contacto}],
      "field_locacion_destino":[{"value": user.locacion4}],

      "field_direccion_destino":[{"value":user.destino4}],
      "field_contacto_destino":[{"value": user.contacto4}],
      "field_observaciones":[{"value":user.body4}],
      "field_push_token":[{"value": localStorage.getItem('tokenFire')}],
      "field_prefijo_destino":[{"value":user.field_prefijo_destino4}],
      "field_padre":[{"value":this.nodoCreado}],
      "field_barrio_origen":[{"value": user.field_barrio_origen}],
    "field_barrio_destino":[{"value": user.field_barrio_destino4}],
  "field_locacion_entrega":[{"value": user.field_locacion_entrega}],
  "field_valor_declarado":[{"value": user.field_valor_declarado}],
"field_metodo_de_pago":[{"value": user.field_metodo_de_pago}],
"field_medio_de_transporte":[{"value": this.medioTransporte}],
"field_url_imagen_destino":[{"value": localStorage.getItem('imgBarrioDestino')}],
"field_url_imagen_origen":[{"value": localStorage.getItem('imgBarrioOrigen')}],
"field_longitud_origen":[{"value": localStorage.getItem('longitudOrigen')}],
"field_latitud_origen_":[{"value": localStorage.getItem('latitudOrigen')}],
"field_precio_":[{"value": localStorage.getItem('precioTarifa4')}],
"field_nombre_c_origen":[{"value": user.field_nombre_c_origen}],
"field_nombre_c_destino":[{"value": user.field_nombre_c_destino4}],
"field_aceptado_cliente":[{"value": true}],
"field_tipo_solicitud":[{"value":'Ruta hija'}]




         }





         this.resumen = sencilla;

         const converSencillahija1 = JSON.stringify(sencilla);

         console.log(converSencillahija1);

         this.getToken();
         //console.log(sencilla);
        this.tokencsrf = localStorage.getItem("csrf_token");


         console.log(this.tokencsrf,'aqui new csrf');

         this.b64 = localStorage.getItem("base64").toString();
         console.log(this.b64,'aqui b64');


         const headers = new HttpHeaders({'Content-Type': 'application/json','Authorization':'Basic '+this.b64,
         'X-CSRF-Token': this.tokencsrf});


         this.http4.post('http://164.92.106.39/node?_format=hal_json',converSencillahija1,{headers:headers}).subscribe(data24=>{
          console.log(data24);
          //this.asignacion(data24['nid']['0'].value);
          localStorage.setItem('sencillaCreadaDes4',data24['nid']['0'].value);


         // this.nodoCreado =localStorage.getItem('sencillaCreada');
          console.log(data24['nid']['0'].value,'aqui nid en crear sencilla');
              },error24=>{
                console.log(error24);
                if(error24.status==0){
                  alert('Error en destino 2 revise su conexion internet')

                }else if(error24.status==422){
                  alert('En estos momentos no podemos atender tu orden');
                  this.logout2();

                }
              }
              );


      }

      //sencilla hija 5
      CrearSencilla5(user: FormularioI){



        //Crear_sencilla
      //los datos del destino 1
        let sencilla = {
          "title":[{"value":'Destino 5 '}],
        ///origen es mismo para todas
        //destios el lo que tienes en el vector

        "type":[{"target_id": 'sencilla'}],
        "field_prefijo_origen":[{"value":user.field_prefijo_origen}],
        "field_direccion_entrega":[{"value":user.field_direccion_entrega}],
        "field_contacto":[{"value": user.field_contacto}],
        "field_locacion_destino":[{"value": user.locacion5}],

        "field_direccion_destino":[{"value":user.destino5}],
        "field_contacto_destino":[{"value": user.contacto5}],
        "field_observaciones":[{"value":user.body5}],
        "field_push_token":[{"value": localStorage.getItem('tokenFire')}],
        "field_prefijo_destino":[{"value":user.field_prefijo_destino5}],
        "field_padre":[{"value":this.nodoCreado}],
        "field_barrio_origen":[{"value": user.field_barrio_origen}],
        "field_barrio_destino":[{"value": user.field_barrio_destino5}],
      "field_locacion_entrega":[{"value": user.field_locacion_entrega}],
      "field_valor_declarado":[{"value": user.field_valor_declarado}],
    "field_metodo_de_pago":[{"value": user.field_metodo_de_pago}],
    "field_medio_de_transporte":[{"value": this.medioTransporte}],
    "field_url_imagen_destino":[{"value": localStorage.getItem('imgBarrioDestino')}],
"field_url_imagen_origen":[{"value": localStorage.getItem('imgBarrioOrigen')}],
"field_longitud_origen":[{"value": localStorage.getItem('longitudOrigen')}],
"field_latitud_origen_":[{"value": localStorage.getItem('latitudOrigen')}],
"field_precio_":[{"value": localStorage.getItem('precioTarifa5')}],
"field_nombre_c_origen":[{"value": user.field_nombre_c_origen}],
"field_nombre_c_destino":[{"value": user.field_nombre_c_destino5}],
"field_aceptado_cliente":[{"value": true}],
"field_tipo_solicitud":[{"value":'Ruta hija'}]




           }





           this.resumen = sencilla;

           const converSencillahija1 = JSON.stringify(sencilla);

           console.log(converSencillahija1);

           this.getToken();
           //console.log(sencilla);
          this.tokencsrf = localStorage.getItem("csrf_token");


           console.log(this.tokencsrf,'aqui new csrf');

           this.b64 = localStorage.getItem("base64").toString();
           console.log(this.b64,'aqui b64');


           const headers = new HttpHeaders({'Content-Type': 'application/json','Authorization':'Basic '+this.b64,
           'X-CSRF-Token': this.tokencsrf});


           this.http5.post('http://164.92.106.39/node?_format=hal_json',converSencillahija1,{headers:headers}).subscribe(data25=>{
            console.log(data25);
            //this.asignacion(data25['nid']['0'].value);
            localStorage.setItem('sencillaCreadaDes5',data25['nid']['0'].value);


            //this.nodoCreado =localStorage.getItem('sencillaCreada');
            console.log(data25['nid']['0'].value,'aqui nid en crear sencilla');
                },error25=>{
                  console.log(error25);
                  if(error25.status==0){
                    alert('Error en destino 2 revise su conexion internet')

                  }else if(error25.status==422){
                    alert('En estos momentos no podemos atender tu orden');
                    this.logout2();

                  }
                });


        }

        //sencilla hija 6

        CrearSencilla6(user: FormularioI){



          //Crear_sencilla
        //los datos del destino 1
          let sencilla = {
            "title":[{"value":'Destino 6'}],
          ///origen es mismo para todas
          //destios el lo que tienes en el vector

          "type":[{"target_id": 'sencilla'}],
          "field_prefijo_origen":[{"value":user.field_prefijo_origen}],
          "field_direccion_entrega":[{"value":user.field_direccion_entrega}],
          "field_contacto":[{"value": user.field_contacto}],
          "field_locacion_destino":[{"value": user.locacion6}],

          "field_direccion_destino":[{"value":user.destino6}],
          "field_contacto_destino":[{"value": user.contacto6}],
          "field_observaciones":[{"value":user.body6}],
          "field_push_token":[{"value": localStorage.getItem('tokenFire')}],
          "field_prefijo_destino":[{"value":user.field_prefijo_destino6}],
          "field_padre":[{"value":this.nodoCreado}],
          "field_barrio_origen":[{"value": user.field_barrio_origen}],
          "field_barrio_destino":[{"value": user.field_barrio_destino6}],
        "field_locacion_entrega":[{"value": user.field_locacion_entrega}],
        "field_valor_declarado":[{"value": user.field_valor_declarado}],
      "field_metodo_de_pago":[{"value": user.field_metodo_de_pago}],
      "field_medio_de_transporte":[{"value": this.medioTransporte}],
      "field_url_imagen_destino":[{"value": localStorage.getItem('imgBarrioDestino')}],
"field_url_imagen_origen":[{"value": localStorage.getItem('imgBarrioOrigen')}],
"field_longitud_origen":[{"value": localStorage.getItem('longitudOrigen')}],
"field_latitud_origen_":[{"value": localStorage.getItem('latitudOrigen')}],
"field_precio_":[{"value": localStorage.getItem('precioTarifa6')}],
"field_nombre_c_origen":[{"value": user.field_nombre_c_origen}],
"field_nombre_c_destino":[{"value": user.field_nombre_c_destino6}],
"field_aceptado_cliente":[{"value": true}],
"field_tipo_solicitud":[{"value":'Ruta hija'}]




             }





             this.resumen = sencilla;

             const converSencillahija1 = JSON.stringify(sencilla);

             console.log(converSencillahija1);

             this.getToken();
             //console.log(sencilla);
            this.tokencsrf = localStorage.getItem("csrf_token");


             console.log(this.tokencsrf,'aqui new csrf');

             this.b64 = localStorage.getItem("base64").toString();
             console.log(this.b64,'aqui b64');


             const headers = new HttpHeaders({'Content-Type': 'application/json','Authorization':'Basic '+this.b64,
             'X-CSRF-Token': this.tokencsrf});


             this.http6.post('http://164.92.106.39/node?_format=hal_json',converSencillahija1,{headers:headers}).subscribe(data26=>{
              console.log(data26);

              localStorage.setItem('sencillaCreadaDes6',data26['nid']['0'].value);

             //this.asignacion(data26['nid']['0'].value);
             // this.nodoCreado =localStorage.getItem('sencillaCreada');
              console.log(data26['nid']['0'].value,'aqui nid en crear sencilla');
                  },error26=>{
                    console.log(error26);
                    if(error26.status==0){
                      alert('Error en destino 2 revise su conexion internet')

                    }else if(error26.status==422){
                      alert('En estos momentos no podemos atender tu orden');
                      this.logout2();

                    }
                  });


          }


          //sencilla hija 7
          CrearSencilla7(user: FormularioI){



            //Crear_sencilla
          //los datos del destino 1
            let sencilla = {
              "title":[{"value":'Destino 7'}],
            ///origen es mismo para todas
            //destios el lo que tienes en el vector

            "type":[{"target_id": 'sencilla'}],
            "field_prefijo_origen":[{"value":user.field_prefijo_origen}],
            "field_direccion_entrega":[{"value":user.field_direccion_entrega}],
            "field_contacto":[{"value": user.field_contacto}],
            "field_locacion_destino":[{"value": user.locacion7}],

            "field_direccion_destino":[{"value":user.destino7}],
            "field_contacto_destino":[{"value": user.contacto7}],
            "field_observaciones":[{"value":user.body7}],
            "field_push_token":[{"value": localStorage.getItem('tokenFire')}],
            "field_prefijo_destino":[{"value":user.field_prefijo_destino7}],
            "field_padre":[{"value":this.nodoCreado}],
            "field_barrio_origen":[{"value": user.field_barrio_origen}],
            "field_barrio_destino":[{"value": user.field_barrio_destino7}],
          "field_locacion_entrega":[{"value": user.field_locacion_entrega}],
          "field_valor_declarado":[{"value": user.field_valor_declarado}],
        "field_metodo_de_pago":[{"value": user.field_metodo_de_pago}],
        "field_medio_de_transporte":[{"value": this.medioTransporte}],
        "field_url_imagen_destino":[{"value": localStorage.getItem('imgBarrioDestino')}],
"field_url_imagen_origen":[{"value": localStorage.getItem('imgBarrioOrigen')}],
"field_longitud_origen":[{"value": localStorage.getItem('longitudOrigen')}],
"field_latitud_origen_":[{"value": localStorage.getItem('latitudOrigen')}],
"field_precio_":[{"value": localStorage.getItem('precioTarifa7')}],
"field_nombre_c_origen":[{"value": user.field_nombre_c_origen}],
"field_nombre_c_destino":[{"value": user.field_nombre_c_destino7}],
"field_aceptado_cliente":[{"value": true}],
"field_tipo_solicitud":[{"value":'Ruta hija'}]




               }





               this.resumen = sencilla;

               const converSencillahija1 = JSON.stringify(sencilla);

               console.log(converSencillahija1);

               this.getToken();
               //console.log(sencilla);
              this.tokencsrf = localStorage.getItem("csrf_token");


               console.log(this.tokencsrf,'aqui new csrf');

               this.b64 = localStorage.getItem("base64").toString();
               console.log(this.b64,'aqui b64');


               const headers = new HttpHeaders({'Content-Type': 'application/json','Authorization':'Basic '+this.b64,
               'X-CSRF-Token': this.tokencsrf});


               this.http7.post('http://164.92.106.39/node?_format=hal_json',converSencillahija1,{headers:headers}).subscribe(data27=>{
                console.log(data27);

                localStorage.setItem('sencillaCreadaDes7',data27['nid']['0'].value);

               //this.asignacion(data27['nid']['0'].value);
               // this.nodoCreado =localStorage.getItem('sencillaCreada');
                console.log(data27['nid']['0'].value,'aqui nid en crear sencilla');
                    },error27=>{
                      console.log(error27);
                      if(error27.status==0){
                        alert('Error en destino 2 revise su conexion internet')

                      }else if(error27.status==422){
                        alert('En estos momentos no podemos atender tu orden');
                        this.logout2();

                      }
                    });


            }

            //sencilla hija 8

            CrearSencilla8(user: FormularioI){



              //Crear_sencilla
            //los datos del destino 1
              let sencilla = {
                "title":[{"value":'Destino 8'}],
              ///origen es mismo para todas
              //destios el lo que tienes en el vector

              "type":[{"target_id": 'sencilla'}],
              "field_prefijo_origen":[{"value":user.field_prefijo_origen}],
              "field_direccion_entrega":[{"value":user.field_direccion_entrega}],
              "field_contacto":[{"value": user.field_contacto}],
              "field_locacion_destino":[{"value": user.locacion8}],

              "field_direccion_destino":[{"value":user.destino8}],
              "field_contacto_destino":[{"value": user.contacto8}],
              "field_observaciones":[{"value":user.body8}],
              "field_push_token":[{"value": localStorage.getItem('tokenFire')}],
              "field_prefijo_destino":[{"value":user.field_prefijo_destino8}],
              "field_padre":[{"value":this.nodoCreado}],
              "field_barrio_origen":[{"value": user.field_barrio_origen}],
              "field_barrio_destino":[{"value": user.field_barrio_destino8}],
            "field_locacion_entrega":[{"value": user.field_locacion_entrega}],
            "field_valor_declarado":[{"value": user.field_valor_declarado}],
          "field_metodo_de_pago":[{"value": user.field_metodo_de_pago}],
          "field_medio_de_transporte":[{"value": this.medioTransporte}],
          "field_url_imagen_destino":[{"value": localStorage.getItem('imgBarrioDestino')}],
"field_url_imagen_origen":[{"value": localStorage.getItem('imgBarrioOrigen')}],
"field_longitud_origen":[{"value": localStorage.getItem('longitudOrigen')}],
"field_latitud_origen_":[{"value": localStorage.getItem('latitudOrigen')}],
"field_precio_":[{"value": localStorage.getItem('precioTarifa8')}],
"field_nombre_c_origen":[{"value": user.field_nombre_c_origen}],
"field_nombre_c_destino":[{"value": user.field_nombre_c_destino8}],
"field_aceptado_cliente":[{"value": true}],
"field_tipo_solicitud":[{"value":'Ruta hija'}]




                 }





                 this.resumen = sencilla;

                 const converSencillahija1 = JSON.stringify(sencilla);

                 console.log(converSencillahija1);

                 this.getToken();
                 //console.log(sencilla);
                this.tokencsrf = localStorage.getItem("csrf_token");


                 console.log(this.tokencsrf,'aqui new csrf');

                 this.b64 = localStorage.getItem("base64").toString();
                 console.log(this.b64,'aqui b64');


                 const headers = new HttpHeaders({'Content-Type': 'application/json','Authorization':'Basic '+this.b64,
                 'X-CSRF-Token': this.tokencsrf});


                 this.http8.post('http://164.92.106.39/node?_format=hal_json',converSencillahija1,{headers:headers}).subscribe(data28=>{
                  console.log(data28);
                 // this.asignacion(data28['nid']['0'].value);
                  localStorage.setItem('sencillaCreadaDes8',data28['nid']['0'].value);


                  //this.nodoCreado =localStorage.getItem('sencillaCreada');
                  console.log(data28['nid']['0'].value,'aqui nid en crear sencilla');
                      },error28=>{
                        console.log(error28);
                        if(error28.status==0){
                          alert('Error en destino 2 revise su conexion internet')

                        }else if(error28.status==422){
                          alert('En estos momentos no podemos atender tu orden');
                          this.logout2();

                        }
                      });


              }

              //sencilla hija 9

              CrearSencilla9(user: FormularioI){



                //Crear_sencilla
              //los datos del destino 1
                let sencilla = {
                  "title":[{"value":'Destino 9'}],
                ///origen es mismo para todas
                //destios el lo que tienes en el vector

                "type":[{"target_id": 'sencilla'}],
                "field_prefijo_origen":[{"value":user.field_prefijo_origen}],
                "field_direccion_entrega":[{"value":user.field_direccion_entrega}],
                "field_contacto":[{"value": user.field_contacto}],
                "field_locacion_destino":[{"value": user.locacion9}],

                "field_direccion_destino":[{"value":user.destino9}],
                "field_contacto_destino":[{"value": user.contacto9}],
                "field_observaciones":[{"value":user.body9}],
                "field_push_token":[{"value": localStorage.getItem('tokenFire')}],
                "field_prefijo_destino":[{"value":user.field_prefijo_destino9}],
                "field_padre":[{"value":this.nodoCreado}],
                "field_barrio_origen":[{"value": user.field_barrio_origen}],
                "field_barrio_destino":[{"value": user.field_barrio_destino9}],
              "field_locacion_entrega":[{"value": user.field_locacion_entrega}],
              "field_valor_declarado":[{"value": user.field_valor_declarado}],
            "field_metodo_de_pago":[{"value": user.field_metodo_de_pago}],
            "field_medio_de_transporte":[{"value": this.medioTransporte}],
            "field_url_imagen_destino":[{"value": localStorage.getItem('imgBarrioDestino')}],
"field_url_imagen_origen":[{"value": localStorage.getItem('imgBarrioOrigen')}],
"field_longitud_origen":[{"value": localStorage.getItem('longitudOrigen')}],
"field_latitud_origen_":[{"value": localStorage.getItem('latitudOrigen')}],
"field_precio_":[{"value": localStorage.getItem('precioTarifa9')}],
"field_nombre_c_origen":[{"value": user.field_nombre_c_origen}],
"field_nombre_c_destino":[{"value": user.field_nombre_c_destino9}],
"field_aceptado_cliente":[{"value": true}],
"field_tipo_solicitud":[{"value":'Ruta hija'}]




                   }





                   this.resumen = sencilla;

                   const converSencillahija1 = JSON.stringify(sencilla);

                   console.log(converSencillahija1);

                   this.getToken();
                   //console.log(sencilla);
                  this.tokencsrf = localStorage.getItem("csrf_token");


                   console.log(this.tokencsrf,'aqui new csrf');

                   this.b64 = localStorage.getItem("base64").toString();
                   console.log(this.b64,'aqui b64');


                   const headers = new HttpHeaders({'Content-Type': 'application/json','Authorization':'Basic '+this.b64,
                   'X-CSRF-Token': this.tokencsrf});


                   this.http9.post('http://164.92.106.39/node?_format=hal_json',converSencillahija1,{headers:headers}).subscribe(data29=>{
                    console.log(data29);
                   // this.asignacion(data29['nid']['0'].value);
                    localStorage.setItem('sencillaCreadaDes9',data29['nid']['0'].value);


                    //this.nodoCreado =localStorage.getItem('sencillaCreada');
                    console.log(data29['nid']['0'].value,'aqui nid en crear sencilla');
                        },error29=>{
                          console.log(error29);
                          if(error29.status==0){
                            alert('Error en destino 2 revise su conexion internet')

                          }else if(error29.status==422){
                            alert('En estos momentos no podemos atender tu orden');
                            this.logout2();

                          }
                        });


                }

                //sencilla hija 10

                CrearSencilla10(user: FormularioI){



                  //Crear_sencilla
                //los datos del destino 1
                  let sencilla = {
                    "title":[{"value":'Destino 10'}],
                  ///origen es mismo para todas
                  //destios el lo que tienes en el vector

                  "type":[{"target_id": 'sencilla'}],
                  "field_prefijo_origen":[{"value":user.field_prefijo_origen}],
                  "field_direccion_entrega":[{"value":user.field_direccion_entrega}],
                  "field_contacto":[{"value": user.field_contacto}],
                  "field_locacion_destino":[{"value": user.locacion10}],

                  "field_direccion_destino":[{"value":user.destino10}],
                  "field_contacto_destino":[{"value": user.contacto10}],
                  "field_observaciones":[{"value":user.body10}],
                  "field_push_token":[{"value": localStorage.getItem('tokenFire')}],
                  "field_prefijo_destino":[{"value":user.field_prefijo_destino10}],
                  "field_padre":[{"value":this.nodoCreado}],
                  "field_barrio_origen":[{"value": user.field_barrio_origen}],
                  "field_barrio_destino":[{"value": user.field_barrio_destino10}],
                "field_locacion_entrega":[{"value": user.field_locacion_entrega}],
                "field_valor_declarado":[{"value": user.field_valor_declarado}],
              "field_metodo_de_pago":[{"value": user.field_metodo_de_pago}],
              "field_medio_de_transporte":[{"value": this.medioTransporte}],
              "field_url_imagen_destino":[{"value": localStorage.getItem('imgBarrioDestino')}],
              "field_url_imagen_origen":[{"value": localStorage.getItem('imgBarrioOrigen')}],
              "field_longitud_origen":[{"value": localStorage.getItem('longitudOrigen')}],
              "field_latitud_origen_":[{"value": localStorage.getItem('latitudOrigen')}],
              "field_precio_":[{"value": localStorage.getItem('precioTarifa10')}],
              "field_nombre_c_origen":[{"value": user.field_nombre_c_origen}],
"field_nombre_c_destino":[{"value": user.field_nombre_c_destino10}],
"field_aceptado_cliente":[{"value": true}],
"field_tipo_solicitud":[{"value":'Ruta hija'}]




                     }





                     this.resumen = sencilla;

                     const converSencillahija1 = JSON.stringify(sencilla);

                     console.log(converSencillahija1);

                     this.getToken();
                     //console.log(sencilla);
                    this.tokencsrf = localStorage.getItem("csrf_token");


                     console.log(this.tokencsrf,'aqui new csrf');

                     this.b64 = localStorage.getItem("base64").toString();
                     console.log(this.b64,'aqui b64');


                     const headers = new HttpHeaders({'Content-Type': 'application/json','Authorization':'Basic '+this.b64,
                     'X-CSRF-Token': this.tokencsrf});


                     this.http10.post('http://164.92.106.39/node?_format=hal_json',converSencillahija1,{headers:headers}).subscribe(data30=>{
                      console.log(data30);

                      localStorage.setItem('sencillaCreadaDes10',data30['nid']['0'].value);

                    // this.asignacion(data30['nid']['0'].value);
                      //this.nodoCreado =localStorage.getItem('sencillaCreada');
                      console.log(data30['nid']['0'].value,'aqui nid en crear sencilla');
                          },error30=>{
                            console.log(error30);
                            if(error30.status==0){
                              alert('Error en destino 2 revise su conexion internet')

                            }else if(error30.status==422){
                              alert('En estos momentos no podemos atender tu orden');
                              this.logout2();

                            }
                          });


                  }
CrearMedicamentos(user: FormularioI){

  //Crear_medicamentos


  let medicamentos = {

    "title":[{"value":' Medicamentos'}],
  "type":[{"target_id": 'sencilla'}],

  "field_direccion_entrega":[{"value":user.field_direccion_entrega}],
  "field_direccion_destino":[{"value": user.field_direccion_destino}],
  "field_observaciones":[{"value": user.field_observaciones}],


  "field_farmacia":[{"value":user.field_farmacia}],
  "field_documentos_medicos":[{"value":user.field_documentos_medicos}],
 // "field_valor_declarado":[{"value": user.field_valor_declarado}],
  "field_prefijo_destino":[{"value": user.field_prefijo_destino}],
  "field_prefijo_origen":[{"value":user.field_prefijo_origen}],
  "field_respuesta_documentos":[{"value":user.field_respuesta_documentos}],
  "field_medio_de_transporte":[{"value": this.medioTransporte}],
  "field_locacion_destino":[{"value": user.field_locacion_destino}],
  "field_locacion_entrega":[{"value": user.field_locacion_entrega}],
      // "field_medio_de_transporte":[{"value": this.medioTransporte}],
   "field_barrio_origen":[{"value": user.field_barrio_origen}],
"field_barrio_destino":[{"value": user.field_barrio_destino}],
"field_metodo_de_pago":[{"value": user.field_metodo_de_pago}],
"field_contacto":[{"value": user.field_contacto}],
"field_contacto_destino":[{"value": user.field_contacto_destino}],
"field_push_token":[{"value": localStorage.getItem('tokenFire')}],
"field_url_imagen_destino":[{"value": localStorage.getItem('imgBarrioDestino')}],
"field_url_imagen_origen":[{"value": localStorage.getItem('imgBarrioOrigen')}],
"field_longitud_origen":[{"value": localStorage.getItem('longitudOrigen')}],
"field_latitud_origen_":[{"value": localStorage.getItem('latitudOrigen')}],
"field_precio_":[{"value": localStorage.getItem('precioTarifa')}],
"field_nombre_c_origen":[{"value": user.field_nombre_c_origen}],
"field_nombre_c_destino":[{"value": user.field_nombre_c_destino}],
"field_aceptado_cliente":[{"value": true}],
"field_tipo_solicitud":[{"value":'Medicamentos'}]

     }

     this.resumenMedicamentos = medicamentos;

     const converSencilla = JSON.stringify(medicamentos);
     console.log(converSencilla,'antes de crar medicamentos');

     this.getToken();
     //console.log(sencilla);
    this.tokencsrf = localStorage.getItem("csrf_token");


     console.log(this.tokencsrf,'aqui csrf');

     this.b64 = localStorage.getItem("base64").toString();
     console.log(this.b64,'aqui b64');


     const headers = new HttpHeaders({'Content-Type': 'application/json','Authorization':'Basic '+this.b64,
     'X-CSRF-Token': this.tokencsrf});


     this.http.post('http://164.92.106.39/node?_format=hal_json',converSencilla,{headers:headers}).subscribe(data2=>{
      console.log(data2);
      this.router.navigateByUrl('/orden-final');
      localStorage.setItem('sencillaCreada',data2['nid']['0'].value);
      this.asignacion(data2['nid']['0'].value);


      this.nodoCreado =localStorage.getItem('sencillaCreada');
      console.log(data2['nid']['0'].value,'aqui nid en crear medicamentos');
          },error2=>{
            console.log(error2);
            if(error2.status==0){
              alert('Error en destino 2 revise su conexion internet')

            }else if(error2.status==422){
              alert('En estos momentos no podemos atender tu orden');
              this.logout2();

            }

          });


  }

  CrearPagos(user: FormularioI){

    //Crear_pagos


    let pagos = {
      "title":[{"value":'Pagos'}],

    "type":[{"target_id": 'sencilla'}],
    "field_direccion_entrega":[{"value":user.field_direccion_entrega}],


    "field_observaciones":[{"value": user.field_observaciones}],
    "field_clase_de_pago":[{"value":user.field_clase_de_pago}],
    "field_prefijo_origen":[{"value":user.field_prefijo_origen}],
    "field_respuesta_documentos":[{"value":user.field_respuesta_documentos}],
    "field_regresar_por_wasap":[{"value":this.respuestaDocumentoBoolean}],

    "field_locacion_destino":[{"value": user.field_locacion_destino}],
    "field_locacion_entrega":[{"value": user.field_locacion_entrega}],
        // "field_medio_de_transporte":[{"value": this.medioTransporte}],
     "field_barrio_origen":[{"value": user.field_barrio_origen}],
"field_barrio_destino":[{"value": user.field_barrio_destino}],
"field_metodo_de_pago":[{"value": user.field_metodo_de_pago}],

"field_direccion_destino":[{"value":user.field_direccion_destino}],
"field_medio_de_transporte":[{"value": this.medioTransporte}],


"field_prefijo_destino":[{"value":user.field_prefijo_destino}],

"field_contacto":[{"value":user.field_contacto}],
"field_contacto_destino":[{"value":user.field_contacto_destino}],
"field_push_token":[{"value": localStorage.getItem('tokenFire')}],
"field_url_imagen_destino":[{"value": localStorage.getItem('imgBarrioDestino')}],
"field_url_imagen_origen":[{"value": localStorage.getItem('imgBarrioOrigen')}],
"field_longitud_origen":[{"value": localStorage.getItem('longitudOrigen')}],
"field_latitud_origen_":[{"value": localStorage.getItem('latitudOrigen')}],
"field_precio_":[{"value": localStorage.getItem('precioTarifa')}],
"field_nombre_c_origen":[{"value": user.field_nombre_c_origen}],
"field_nombre_c_destino":[{"value": user.field_nombre_c_destino}],
"field_aceptado_cliente":[{"value": true}],
"field_tipo_solicitud":[{"value":'Pagos'}]
       }

       this.resumenPagos = pagos;

       const converSencilla = JSON.stringify(pagos);
       console.log(converSencilla,'antes de crar medicamentos');

       this.getToken();
       //console.log(sencilla);
      this.tokencsrf = localStorage.getItem("csrf_token");


       console.log(this.tokencsrf,'aqui  csrf');

       this.b64 = localStorage.getItem("base64").toString();
       console.log(this.b64,'aqui b64');


       const headers = new HttpHeaders({'Content-Type': 'application/json','Authorization':'Basic '+this.b64,
       'X-CSRF-Token': this.tokencsrf});


       this.http.post('http://164.92.106.39/node?_format=hal_json',converSencilla,{headers:headers}).subscribe(data2=>{
        console.log(data2);
        this.router.navigateByUrl('/orden-final');
        localStorage.setItem('sencillaCreada',data2['nid']['0'].value);


        this.asignacion(data2['nid']['0'].value);
        this.nodoCreado =localStorage.getItem('sencillaCreada');
        console.log(data2['nid']['0'].value,'aqui nid en crear pagos');
            },error2=>{
              console.log(error2);
              if(error2.status==0){
                alert('Error en destino 2 revise su conexion internet')

              }else if(error2.status==422){
                alert('En estos momentos no podemos atender tu orden');
                this.logout2();

              }

            });


    }
    CrearTecnologias(user: FormularioI){

      //Crear_pagos


      let tecnologias = {
        "title":[{"value":'Tecnologias'}],

  "type":[{"target_id": 'sencilla'}],
  "field_direccion_entrega":[{"value": user.field_direccion_entrega}],
  "field_quieres_comprar":[{"value": user.field_quieres_comprar}],
  "field_nombre_del_establecimiento":[{"value": user.field_nombre_del_establecimiento}],
  "field_contacto":[{"value": user.field_contacto}],

  "field_contacto_destino":[{"value": user.field_contacto_destino}],

  "field_direccion_destino":[{"value": user.field_direccion_destino}],

  "field_ida_y_vuelta":[{"value": false}],

  "field_locacion_destino":[{"value": user.field_locacion_destino}],

  "field_locacion_entrega":[{"value": user.field_locacion_entrega}],


    "field_valor_declarado":[{"value": user.field_valor_declarado}],
   "field_medio_de_transporte":[{"value": this.medioTransporte}],
   "field_observaciones":[{"value": user.field_observaciones}],
   "field_prefijo_origen":[{"value": user.field_prefijo_origen}],

   "field_prefijo_destino":[{"value": user.field_prefijo_destino}],

   "field_metodo_de_pago":[{"value": user.field_metodo_de_pago}],
   "field_barrio_origen":[{"value": user.field_barrio_origen}],
   "field_barrio_destino":[{"value": user.field_barrio_destino}],
   "field_push_token":[{"value": localStorage.getItem('tokenFire')}],
   "field_url_imagen_destino":[{"value": localStorage.getItem('imgBarrioDestino')}],
   "field_url_imagen_origen":[{"value": localStorage.getItem('imgBarrioOrigen')}],
   "field_longitud_origen":[{"value": localStorage.getItem('longitudOrigen')}],
   "field_latitud_origen_":[{"value": localStorage.getItem('latitudOrigen')}],
   "field_precio_":[{"value": localStorage.getItem('precioTarifa')}],
   "field_nombre_c_origen":[{"value": user.field_nombre_c_origen}],
   "field_nombre_c_destino":[{"value": user.field_nombre_c_destino}],
   "field_aceptado_cliente":[{"value": true}],
   "field_tipo_solicitud":[{"value":'Tecnologias'}]
         }

         this.resumenTecnologias = tecnologias;

         const converSencilla = JSON.stringify(tecnologias);
         console.log(converSencilla,'antes de crar trcnologias');

         this.getToken();
         //console.log(sencilla);
        this.tokencsrf = localStorage.getItem("csrf_token");


         console.log(this.tokencsrf,'aqui  csrf');

         this.b64 = localStorage.getItem("base64").toString();
         console.log(this.b64,'aqui b64');


         const headers = new HttpHeaders({'Content-Type': 'application/json','Authorization':'Basic '+this.b64,
         'X-CSRF-Token': this.tokencsrf});


         this.http.post('http://164.92.106.39/node?_format=hal_json',converSencilla,{headers:headers}).subscribe(data2=>{
          console.log(data2);
          this.router.navigateByUrl('/orden-final');
          localStorage.setItem('sencillaCreada',data2['nid']['0'].value);


          this.asignacion(data2['nid']['0'].value);
          this.nodoCreado =localStorage.getItem('sencillaCreada');
          console.log(data2['nid']['0'].value,'aqui nid en crear tecnologias');
              },error2=>{
                console.log(error2);
                if(error2.status==0){
                  alert('Error en destino 2 revise su conexion internet')

                }else if(error2.status==422){
                  alert('En estos momentos no podemos atender tu orden');
                  this.logout2();

                }


              });


      }
      CrearAlmacen(user: FormularioI){

        //Crear_almacen


        let almacen = {
          "title":[{"value":'Almacen'}],
          "field_observaciones":[{"value": user.field_observaciones}],
    "type":[{"target_id": 'sencilla'}],
    "field_donde_comprar":[{"value": user.field_donde_comprar}],
    "field_quieres_comprar":[{"value": user.field_quieres_comprar}],
       "field_prefijo_destino":[{"value": user.field_prefijo_destino}],
    "field_contacto":[{"value": user.field_contacto}],
    "field_nombre_del_establecimiento":[{"value": user.field_nombre_del_establecimiento}],

    "field_contacto_destino":[{"value": user.field_contacto_destino}],

    "field_direccion_destino":[{"value": user.field_direccion_destino}],

    "field_direccion_entrega":[{"value": user.field_direccion_entrega}],
    "field_ida_y_vuelta":[{"value": false}],

    "field_locacion_destino":[{"value": user.field_locacion_destino}],

    "field_locacion_entrega":[{"value": user.field_locacion_entrega}],


    "field_valor_declarado":[{"value": user.field_valor_declarado}],
    "field_medio_de_transporte":[{"value": this.medioTransporte}],

    "field_metodo_de_pago":[{"value": user.field_metodo_de_pago}],

    "field_barrio_origen":[{"value": user.field_barrio_origen}],
    "field_barrio_destino":[{"value": user.field_barrio_destino}],
    "field_prefijo_origen":[{"value": user.field_prefijo_origen}],
    "field_push_token":[{"value": localStorage.getItem('tokenFire')}],
    "field_url_imagen_destino":[{"value": localStorage.getItem('imgBarrioDestino')}],
    "field_url_imagen_origen":[{"value": localStorage.getItem('imgBarrioOrigen')}],
    "field_longitud_origen":[{"value": localStorage.getItem('longitudOrigen')}],
    "field_latitud_origen_":[{"value": localStorage.getItem('latitudOrigen')}],
    "field_precio_":[{"value": localStorage.getItem('precioTarifa')}],
    "field_nombre_c_origen":[{"value": user.field_nombre_c_origen}],
    "field_nombre_c_destino":[{"value": user.field_nombre_c_destino}],
    "field_aceptado_cliente":[{"value": true}],
    "field_tipo_solicitud":[{"value":'Almacen'}]

           }

           this.resumenAlmacen = almacen;

           const converSencilla = JSON.stringify(almacen);
           console.log(converSencilla,'antes de crar trcnologias');

           this.getToken();
           //console.log(sencilla);
          this.tokencsrf = localStorage.getItem("csrf_token");


           console.log(this.tokencsrf,'aqui  csrf');

           this.b64 = localStorage.getItem("base64").toString();
           console.log(this.b64,'aqui b64');


           const headers = new HttpHeaders({'Content-Type': 'application/json','Authorization':'Basic '+this.b64,
           'X-CSRF-Token': this.tokencsrf});


           this.http.post('http://164.92.106.39/node?_format=hal_json',converSencilla,{headers:headers}).subscribe(data2=>{
            console.log(data2);
            this.router.navigateByUrl('/orden-final');
            localStorage.setItem('sencillaCreada',data2['nid']['0'].value);


            this.asignacion(data2['nid']['0'].value);
            this.nodoCreado =localStorage.getItem('sencillaCreada');
            console.log(data2['nid']['0'].value,'aqui nid en crear almacen');
                },error2=>{
                  console.log(error2);
                  if(error2.status==0){
                    alert('Error en destino 2 revise su conexion internet')

                  }else if(error2.status==422){
                    alert('En estos momentos no podemos atender tu orden');
                    this.logout2();

                  }


                });


        }

      CrearTextiles(user: FormularioI){

        //Crear_pagos


        let tecnologia = {
          "title":[{"value":'Textiles'}],

  "type":[{"target_id": 'sencilla'}],
  "field_donde_comprar":[{"value": user.field_donde_comprar}],
  "field_quieres_comprar":[{"value": user.field_quieres_comprar}],
  "field_direccion_entrega":[{"value": user.field_direccion_entrega}],
  "field_nombre_del_establecimiento":[{"value": user.field_nombre_del_establecimiento}],
  "field_contacto":[{"value": user.field_contacto}],

  "field_contacto_destino":[{"value": user.field_contacto_destino}],

  "field_direccion_destino":[{"value": user.field_direccion_destino}],

  "field_ida_y_vuelta":[{"value": false}],

  "field_locacion_destino":[{"value": user.field_locacion_destino}],

  "field_locacion_entrega":[{"value": user.field_locacion_entrega}],


    "field_valor_declarado":[{"value": user.field_valor_declarado}],
   "field_medio_de_transporte":[{"value": this.medioTransporte}],
   "field_observaciones":[{"value": user.field_observaciones}],
   "field_prefijo_origen":[{"value": user.field_prefijo_origen}],

   "field_prefijo_destino":[{"value": user.field_prefijo_destino}],

   "field_metodo_de_pago":[{"value": user.field_metodo_de_pago}],
   "field_barrio_origen":[{"value": user.field_barrio_origen}],
   "field_barrio_destino":[{"value": user.field_barrio_destino}],
   "field_push_token":[{"value": localStorage.getItem('tokenFire')}],
   "field_url_imagen_destino":[{"value": localStorage.getItem('imgBarrioDestino')}],
   "field_url_imagen_origen":[{"value": localStorage.getItem('imgBarrioOrigen')}],
   "field_longitud_origen":[{"value": localStorage.getItem('longitudOrigen')}],
   "field_latitud_origen_":[{"value": localStorage.getItem('latitudOrigen')}],
   "field_precio_":[{"value": localStorage.getItem('precioTarifa')}],
   "field_nombre_c_origen":[{"value": user.field_nombre_c_origen}],
   "field_nombre_c_destino":[{"value": user.field_nombre_c_destino}],
   "field_aceptado_cliente":[{"value": true}],
   "field_tipo_solicitud":[{"value":'Textiles'}]


           }

           this.resumenTecnologias = tecnologia;

           const converSencilla = JSON.stringify(tecnologia);
           console.log(converSencilla,'antes de crar textiles');

           this.getToken();
           //console.log(sencilla);
          this.tokencsrf = localStorage.getItem("csrf_token");


           console.log(this.tokencsrf,'aqui csrf');

           this.b64 = localStorage.getItem("base64").toString();
           console.log(this.b64,'aqui b64');


           const headers = new HttpHeaders({'Content-Type': 'application/json','Authorization':'Basic '+this.b64,
           'X-CSRF-Token': this.tokencsrf});


           this.http.post('http://164.92.106.39/node?_format=hal_json',converSencilla,{headers:headers}).subscribe(data2=>{
            this.router.navigateByUrl('/orden-final');
           console.log(data2);
            localStorage.setItem('sencillaCreada',data2['nid']['0'].value);

            this.asignacion(data2['nid']['0'].value);

            this.nodoCreado =localStorage.getItem('sencillaCreada');
            console.log(data2['nid']['0'].value,'aqui nid en crear textiles');
                },error2=>{
                  console.log(error2);
                  if(error2.status==0){
                    alert('Error en destino 2 revise su conexion internet')

                  }else if(error2.status==422){
                    alert('En estos momentos no podemos atender tu orden');
                    this.logout2();

                  }

                });


        }



        CrearOtherRestaurantes(user: FormularioI){

          //Crear_pagos


          let otherRestaurantes = {
            "title":[{"value":'de compra'}],

    "type":[{"target_id": 'sencilla'}],
    "field_donde_comprar":[{"value": user.field_donde_comprar}],
    "field_quieres_comprar":[{"value": user.field_quieres_comprar}],
    "field_direccion_entrega":[{"value": user.field_direccion_entrega}],
    "field_nombre_del_establecimiento":[{"value": user.field_nombre_del_establecimiento}],
    "field_contacto":[{"value": user.field_contacto}],

    "field_contacto_destino":[{"value": user.field_contacto_destino}],

    "field_direccion_destino":[{"value": user.field_direccion_destino}],

    "field_ida_y_vuelta":[{"value": false}],

    "field_locacion_destino":[{"value": user.field_locacion_destino}],

    "field_locacion_entrega":[{"value": user.field_locacion_entrega}],


      "field_valor_declarado":[{"value": user.field_valor_declarado}],
     "field_medio_de_transporte":[{"value": this.medioTransporte}],
     "field_observaciones":[{"value": user.field_observaciones}],
     "field_prefijo_origen":[{"value": user.field_prefijo_origen}],

     "field_prefijo_destino":[{"value": user.field_prefijo_destino}],

     "field_metodo_de_pago":[{"value": user.field_metodo_de_pago}],
     "field_barrio_origen":[{"value": user.field_barrio_origen}],
     "field_barrio_destino":[{"value": user.field_barrio_destino}],
     "field_push_token":[{"value": localStorage.getItem('tokenFire')}],
     "field_url_imagen_destino":[{"value": localStorage.getItem('imgBarrioDestino')}],
     "field_url_imagen_origen":[{"value": localStorage.getItem('imgBarrioOrigen')}],
     "field_longitud_origen":[{"value": localStorage.getItem('longitudOrigen')}],
     "field_latitud_origen_":[{"value": localStorage.getItem('latitudOrigen')}],
     "field_precio_":[{"value": localStorage.getItem('precioTarifa')}],
     "field_nombre_c_origen":[{"value": user.field_nombre_c_origen}],
     "field_nombre_c_destino":[{"value": user.field_nombre_c_destino}],
     "field_aceptado_cliente":[{"value": true}]


             }

             this.resumenTecnologias = otherRestaurantes;

             const converSencilla = JSON.stringify(otherRestaurantes);
             console.log(converSencilla,'antes de crar textiles');

             this.getToken();
             //console.log(sencilla);
            this.tokencsrf = localStorage.getItem("csrf_token");


             console.log(this.tokencsrf,'aqui csrf');

             this.b64 = localStorage.getItem("base64").toString();
             console.log(this.b64,'aqui b64');


             const headers = new HttpHeaders({'Content-Type': 'application/json','Authorization':'Basic '+this.b64,
             'X-CSRF-Token': this.tokencsrf});


             this.http.post('http://164.92.106.39/node?_format=hal_json',converSencilla,{headers:headers}).subscribe(data2=>{
              this.router.navigateByUrl('/orden-final');
             console.log(data2);
              localStorage.setItem('sencillaCreada',data2['nid']['0'].value);

              this.asignacion(data2['nid']['0'].value);

              this.nodoCreado =localStorage.getItem('sencillaCreada');
              console.log(data2['nid']['0'].value,'aqui nid en crear textiles');
                  },error2=>{
                    console.log(error2);
                    if(error2.status==0){
                      alert('Error en destino 2 revise su conexion internet')

                    }else if(error2.status==422){
                      alert('En estos momentos no podemos atender tu orden');
                      this.logout2();

                    }

                  });


          }


  logout(){
    console.log("esto");
    this.token="";
    localStorage.removeItem("ACCES_TOKEN");
    localStorage.removeItem("var1['logout_token']");
    this.router.navigateByUrl("/login")

  }

  /*
  resetPassword(){

  this.http.get('http://164.92.106.39/session/token',{}).subscribe(data=>{
    console.log(data);
        },error=>{

          console.log(error);
          console.log(error.error.text);
          console.log(error.status);
          this.anonimustoken=error.status;
        });

        setTimeout(() => {
  let sencilla = {
    "idcliente":'',
    "codereset":''






     }

     this.resumen = sencilla;

     const converSencilla = JSON.stringify(sencilla);
     console.log(converSencilla);

     const headers = new HttpHeaders({'Content-Type': 'application/json','Accept':'application/json',
     'X-CSRF-Token': this.anonimustoken});

     this.http.post('http://164.92.106.39/api/demo_resource3?_format=json',converSencilla,{headers:headers}).subscribe(async data2=>{


      console.log(data2);
      console.log(data2['message']['Valor']);



        const alert = await this.alertControl.create({

          header: 'Notificacion Vapaesa',

          message: data2['message'],
          // al hacer check, vamos a establecer una variable y al darle aceptar preguntamos si esa varibale esta definida si esta se continua
          buttons: [

          {
            text:'aceptar',
            handler:()=>{


            }
          }
        ]
        });

        await alert.present();
















          },async error2=>{
            console.log(error2);





          });


        },5000)

}
  */
logout2(){
  //Eliminar ususario

      let data = {
        "iduser":this.id

         }



         const converData = JSON.stringify(data);
         console.log(converData);

         const headers = new HttpHeaders({'Content-Type': 'application/json','Authorization':'Basic '+this.b64,
         'X-CSRF-Token': this.tokencsrf});


      this.router.navigateByUrl('/login');
      this.menucontrol.close();
      var exit=this.urlexit+localStorage.getItem("EXPIRES_IN");
  //
    headers.append('X-CSRF-Token', localStorage.getItem('csrf_token'));
       this.http.post('http://164.92.106.39/api/demo_resource4?_format=json',converData,{headers})
       .subscribe(data=>{
         console.log(data);
             },error55=>{
               this.confirmexit=error55.error.text;
               //console.log(error);
               console.log(error55);
               console.log(error55.status);

               if(error55.status==404){
                 alert('ha ocurrido un error, consulta al administrador!')
               }
             });
             localStorage.removeItem("base64");
             localStorage.removeItem("csrf_token");
             localStorage.removeItem("sencillaCreada");
             localStorage.removeItem("Name");
             localStorage.removeItem("name");
             localStorage.removeItem("id");
             localStorage.removeItem("AuxiliarAsignado");
             localStorage.removeItem("OrdenCreada");
             localStorage.removeItem("rol");
             localStorage.removeItem("idPedido");
             localStorage.removeItem("id_product");
             localStorage.removeItem("precio_product");
             localStorage.removeItem('rol');
             localStorage.removeItem('idTienda');
             localStorage.removeItem('tituloRestaurante');
             localStorage.removeItem('Ingresado');
             localStorage.removeItem('locacion');
             localStorage.removeItem('store-id');
            // localStorage.removeItem('Tienda');
             localStorage.removeItem('validadorCompras');
             localStorage.removeItem('nodeDisponibilidad');
             //localStorage.removeItem('tienda');
             localStorage.removeItem('modoAuxiliar');



            // this.lgclave.fondo.slice();



     }
  public saveToken(token:string,csrftoken:string, logout_token:string,name:string):void{

    localStorage.setItem("ACCES_TOKEN",token);
    localStorage.setItem("EXPIRES_IN",logout_token);
    localStorage.setItem("NAME",name);
    localStorage.setItem("csrf-token",csrftoken);
  }

  getUser(){
    let auxB64 =localStorage.getItem('base64');
  console.log(auxB64);
  //let auxAsignado =localStorage.getItem('id');
 // console.log(auxAsignado,'id actual');
  const headers = new HttpHeaders({'Content-Type': 'application/json','Authorization':'Basic '+auxB64,
  });
  console.log(headers);
   this.urlAuxName = 'http://164.92.106.39/user_role_values';

  console.log(this.urlAuxName,'por aqui vamos ');
   // console.log(data['0']['Role'],'estoy en data');



  return this.http.get(this.urlAuxName,{headers:headers})
  .pipe(
    map((res :any)=>{
      return res;
     // console.log(res['0']['Role'],'estoy en data');
    })
  )
  }

  public getToken(): string{
    if(!this.token){
      this.token=localStorage.getItem("ACCES_TOKEN")
    }
    return this.token;
  }

  getMensajero(){

    this.nodoCreado=localStorage.getItem('sencillaCreada');


       let url = 'http://164.92.106.39/node/'+this.nodoCreado+'?_format=json';



    this.http.get(url).subscribe(data=>{
       console.log(data);
       console.log(data['field_asignado']['0']['target_id'],'aqui fiel asignado');

       //resolver esto despues de almorzar
        localStorage.setItem('AuxiliarAsignado',data['field_asignado']['0']['target_id']);
        localStorage.setItem('OrdenCreada',data['title']['0'].value);
        this.auxiliarAsignado= localStorage.getItem('AuxiliarAsignado');



           },error=>{


             console.log(error);

           });





  }

  getDetalleOrden(){
      let auxB64 =localStorage.getItem('base64');
      console.log(auxB64);
    //let auxAsignado =localStorage.getItem('id');
   // console.log(auxAsignado,'id actual');
    const headers = new HttpHeaders({'Content-Type': 'application/json','Authorization':'Basic '+auxB64,
    });
    console.log(headers);


      this.nodoCreado=localStorage.getItem('idPedido');


    console.log(this.nodoCreado);

       let url = 'http://164.92.106.39/node/'+this.nodoCreado+'?_format=json';


       console.log(url,'url');




   return this.http.get(url,{headers:headers})
    .pipe(
      map((res :any)=>{
        return res;
       // console.log(res['0']['Role'],'estoy en data');
      })
    )





  }






    quitarSencillaLista(){

      console.log('estamos aqui confirmado');
      this.nodoCreado=localStorage.getItem('sencillaCreada');



     console.log(localStorage.getItem('sencillaCreada'),'aquinodo a eliminar');

     this.getToken();
     //console.log(sencilla);
    this.tokencsrf = localStorage.getItem("csrf_token");


    let body ={


      "type":[{"target_id": "sencilla"}],

      "field_sacar_de_la_lista":[{"value":true}]

  };
     console.log(this.tokencsrf,'aqui csrf');

     this.b64 = localStorage.getItem("base64").toString();
     console.log(this.b64,'aqui b64');


     const headers = new HttpHeaders({'Content-Type': 'application/json','Authorization':'Basic '+this.b64,
     'X-CSRF-Token': this.tokencsrf});
     console.log(headers,'aqui header en act met pago');
     let url = 'http://164.92.106.39/node/'+localStorage.getItem('sencillaCreada')+'?_format=json';
     console.log(url,'antes de patch');


     this.http.patch(url,body,{headers:headers}).subscribe(data2=>{
      console.log(data2);
     // localStorage.setItem('sencillaCreada',data2['nid']['0']);
          },async error2=>{
            console.log(error2);
            if(error2.status==0){
              const alert = await this.alertControl.create({

                header: 'Notificación Vapaesa',

                message: 'No podemos atender tu solicitud en este momento',
                // al hacer check, vamos a establecer una variable y al darle aceptar preguntamos si esa varibale esta definida si esta se continua
                buttons: [
                {
                  text:'aceptar',
                  handler:()=>{
                    this.router.navigateByUrl("/tabs")

                  }

                }]
              });

              await alert.present();

              //this.logout2();

            }
          });

    }
  enviarPushEnCamino(){

    let body = {

      "notification": {
        "sound": "sonalert",
        "title": "Notificación Vapaesa",
        "body": "Pedido en camino",

      },
      "android":{
        "ttl":"86400s"

 },
      "to": localStorage.getItem('tokenNotificacionRecibido')
    }
         const converBody = JSON.stringify(body);

       const headers = new HttpHeaders({'Content-Type': 'application/json','Authorization':'key=AAAATW47Vww:APA91bFAoJeZSQFrt6z_VGfZJL1N3_M9vYrfHjfgYhZDDmCceWVsF5CCg81jNRYVrAuDZJFxFqmO3TEFPhYslhY1Ly8HgzkicyZpOPQb_B2yReRRmmMyTF4--i17ETbLNF_2LO1RcNGx'});


       this.http.post('https://fcm.googleapis.com/fcm/send',converBody,{headers:headers}).subscribe(async data24=>{
        console.log(data24);
        const alert = await this.alertControl.create({

          header: 'Notificación Vapaesa',

          message: 'El Cliente ha sido notificado Pedido en camino',
          // al hacer check, vamos a establecer una variable y al darle aceptar preguntamos si esa varibale esta definida si esta se continua
          buttons: [
          {
            text:'aceptar',

          }]
        });

        await alert.present();

            },error24=>{
              console.log(error24);

            });

    }

    enviarPushEnCompletado(){

      let body = {

        "notification": {
          "sound": "sonalert",
          "title": "Notificación Vapaesa ",
          "body": "Pedido completado",

        },
        "android":{
          "ttl":"86400s"

   },
        "to": localStorage.getItem('tokenNotificacionRecibido')
      }
           const converBody = JSON.stringify(body);

         const headers = new HttpHeaders({'Content-Type': 'application/json','Authorization':'key=AAAATW47Vww:APA91bFAoJeZSQFrt6z_VGfZJL1N3_M9vYrfHjfgYhZDDmCceWVsF5CCg81jNRYVrAuDZJFxFqmO3TEFPhYslhY1Ly8HgzkicyZpOPQb_B2yReRRmmMyTF4--i17ETbLNF_2LO1RcNGx'});


         this.http.post('https://fcm.googleapis.com/fcm/send',converBody,{headers:headers}).subscribe(async data24=>{
          console.log(data24);



            //

               const alert = await this.alertControl.create({

                 header: 'Notificación Vapaesa',

                 message: 'El Cliente ha sido notificado Pedido completado',
                 // al hacer check, vamos a establecer una variable y al darle aceptar preguntamos si esa varibale esta definida si esta se continua
                 buttons: [
                 {
                   text:'aceptar',
                   handler:()=>{
                  //  this.router.navigate(['/modo-colaborador']);
                  }

                 }]
               });

               await alert.present();

              },error24=>{
                console.log(error24);
                alert('error de notificacion');
              });

      }

      enviarPushParaCancelarPedido(){

        let body = {

          "notification": {
            "sound": "sonalert",
            "title": "Notificación Vapaesa",
            "body": "Pedido Cancelado",

          },
          "android":{
            "ttl":"86400s"

     },
          "to": localStorage.getItem('tokenNotificacionRecibido')
        }
             const converBody = JSON.stringify(body);

           const headers = new HttpHeaders({'Content-Type': 'application/json','Authorization':'key=AAAATW47Vww:APA91bFAoJeZSQFrt6z_VGfZJL1N3_M9vYrfHjfgYhZDDmCceWVsF5CCg81jNRYVrAuDZJFxFqmO3TEFPhYslhY1Ly8HgzkicyZpOPQb_B2yReRRmmMyTF4--i17ETbLNF_2LO1RcNGx'});


           this.http.post('https://fcm.googleapis.com/fcm/send',converBody,{headers:headers}).subscribe(async data24=>{
            console.log(data24);
            const alert = await this.alertControl.create({

              header: 'Notificación Vapaesa',

              message: 'El Cliente ha sido notificado Pedido Cancelado!',
              // al hacer check, vamos a establecer una variable y al darle aceptar preguntamos si esa varibale esta definida si esta se continua
              buttons: [
              {
                text:'aceptar',

              }]
            });

            await alert.present();

                },error24=>{
                  console.log(error24);

                });

        }


  obtenerRoleUsuario(){
     let auxB64 =localStorage.getItem('base64');
   console.log(auxB64);
   let auxAsignado =localStorage.getItem('id');
   console.log(auxAsignado,'id actual');
   const headers = new HttpHeaders({'Content-Type': 'application/json','Authorization':'Basic '+auxB64,
  });
  console.log(headers);
    this.urlAuxName = 'http://164.92.106.39/user_role_value?_format=json';

   console.log(this.urlAuxName,'por aqui vamos ');
    // console.log(data['0']['Role'],'estoy en data');



      return this.http.get(this.urlAuxName, {headers:headers})
      .pipe(
        map((res :any)=>{
          return res['0']['Role'];
         // console.log(res['0']['Role'],'estoy en data');
        })
      )

  }

  getAuxiliaresDisponiblesMotos(){
    let auxB64 =localStorage.getItem('base64');

  const headers = new HttpHeaders({'Content-Type': 'application/json','Authorization':'Basic '+auxB64,
 });
 console.log(headers);
   this.urlAuxName = 'http://164.92.106.39/auxiliares_disponibles_motos';

     return this.http.get(this.urlAuxName, {headers:headers})
     .pipe(
       map((res :any)=>{
         return res;
        // console.log(res['0']['Role'],'estoy en data');
       })
     )

 }

 getAuxiliaresDisponiblesCarros(){
  let auxB64 =localStorage.getItem('base64');

const headers = new HttpHeaders({'Content-Type': 'application/json','Authorization':'Basic '+auxB64,
});
console.log(headers);
 this.urlAuxName = 'http://164.92.106.39/auxiliares_disponibles_carro';

   return this.http.get(this.urlAuxName, {headers:headers})
   .pipe(
     map((res :any)=>{
       return res;
      // console.log(res['0']['Role'],'estoy en data');
     })
   )

}


getAuxiliaresDisponiblesMunicipio(){
  let auxB64 =localStorage.getItem('base64');

const headers = new HttpHeaders({'Content-Type': 'application/json','Authorization':'Basic '+auxB64,
});
console.log(headers);
 this.urlAuxName = 'http://164.92.106.39/auxiliares_disponibles_municipios';

   return this.http.get(this.urlAuxName, {headers:headers})
   .pipe(
     map((res :any)=>{
       return res;
      // console.log(res['0']['Role'],'estoy en data');
     })
   )

}
getAuxiliaresDisponiblesParaCarrosGrandes(){
  let auxB64 =localStorage.getItem('base64');

const headers = new HttpHeaders({'Content-Type': 'application/json','Authorization':'Basic '+auxB64,
});
console.log(headers);
 this.urlAuxName = 'http://164.92.106.39/auxiliares_disponibles_carro_grande';

   return this.http.get(this.urlAuxName, {headers:headers})
   .pipe(
     map((res :any)=>{
       return res;
      // console.log(res['0']['Role'],'estoy en data');
     })
   )

}

//get disponibles carro taller
getAuxiliaresDisponiblesParaCarroTaller(){
  let auxB64 =localStorage.getItem('base64');

const headers = new HttpHeaders({'Content-Type': 'application/json','Authorization':'Basic '+auxB64,
});
console.log(headers);
 this.urlAuxName = 'http://164.92.106.39/auxiliares_disponibles_carro_taller';

   return this.http.get(this.urlAuxName, {headers:headers})
   .pipe(
     map((res :any)=>{
       return res;
      // console.log(res['0']['Role'],'estoy en data');
     })
   )

}
getCiudad(){


 this.urlAuxName = 'http://164.92.106.39/ciudades';

   return this.http.get(this.urlAuxName,)
   .pipe(
     map((res :any)=>{
       return res;
      // console.log(res['0']['Role'],'estoy en data');
     })
   )

}

  getContenidoAsignado(){
    let auxB64 =localStorage.getItem('base64');
  console.log(auxB64);
  let auxAsignado =localStorage.getItem('id');
  console.log(auxAsignado,'id actual');
  const headers = new HttpHeaders({'Content-Type': 'application/json','Authorization':'Basic '+auxB64,
 });
 console.log(headers);
   this.urlAuxName = 'http://164.92.106.39/contenido_asignado?_format=json';

  console.log(this.urlAuxName,'por aqui vamos ');
   // console.log(data['0']['Role'],'estoy en data');



     return this.http.get(this.urlAuxName, {headers:headers})
     .pipe(
      map((res :any)=>{
        return res;
       // console.log(res['0']['Role'],'estoy en data');
      })
    )


 }
 getContenidoHistorico(){
  let auxB64 =localStorage.getItem('base64');
console.log(auxB64);
let auxAsignado =localStorage.getItem('id');
console.log(auxAsignado,'id actual');
const headers = new HttpHeaders({'Content-Type': 'application/json','Authorization':'Basic '+auxB64,
});
console.log(headers);
 this.urlAuxName = 'http://164.92.106.39/historico_auxiliar?_format=json';

console.log(this.urlAuxName,'por aqui vamos ');
 // console.log(data['0']['Role'],'estoy en data');



   return this.http.get(this.urlAuxName, {headers:headers})
   .pipe(
    map((res :any)=>{
      return res;
     // console.log(res['0']['Role'],'estoy en data');
    })
  )


}


getContenidoHistoricoCliente(){
  let auxB64 =localStorage.getItem('base64');
console.log(auxB64);
let auxAsignado =localStorage.getItem('id');
console.log(auxAsignado,'id actual');
const headers = new HttpHeaders({'Content-Type': 'application/json','Authorization':'Basic '+auxB64,
});
console.log(headers);
 this.urlAuxName = 'http://164.92.106.39/historico_cliente?_format=json';

console.log(this.urlAuxName,'por aqui vamos ');
 // console.log(data['0']['Role'],'estoy en data');



   this.http.get(this.urlAuxName, {headers:headers})
   .subscribe(data=>{
    console.log(data,'estoy en data');


  }),error=>{


    console.log(error,'dentro de error');

  };


}


  getMensajeroName(){
    //obtener nombre del auxiliar
   let auxB64 =localStorage.getItem('base64');
   console.log(auxB64);
   let auxAsignado =localStorage.getItem('AuxiliarAsignado');
   console.log(auxAsignado);
   const headers = new HttpHeaders({'Content-Type': 'application/json','Authorization':'Basic '+auxB64,
  });
  console.log(headers);
    this.urlAuxName = 'http://164.92.106.39/user/'+auxAsignado+'?_format=json';

   console.log(this.urlAuxName,'por aqui vamos ');


        this.http.get(this.urlAuxName, {headers:headers}).subscribe(data=>{
          console.log(data,'estoy en data');
          console.log(data['name']['0'].value,'aqui name');
          localStorage.setItem('Name',data['name']['0'].value);

        }),error=>{


          console.log(error,'dentro de error');

        };
  }


  mostrarContenido(){

     //obtener nombre del auxiliar
   let auxB64 =localStorage.getItem('base64');
   console.log(auxB64);
   let auxAsignado =localStorage.getItem('AuxiliarAsignado');
   console.log(auxAsignado);
   const headers = new HttpHeaders({'Content-Type': 'application/json','Authorization':'Basic '+auxB64,
  });
  console.log(headers);
    return this.http
     .get("http://164.92.106.39/contenido-propio-cliente",{headers:headers})
     .pipe(
       map((res :any)=>{
         return res;
       })
     )

   }





actualizarEstadoPedidoCompletado(){

  //localStorage.getItem('sencillaCreada');
  console.log('estamos aqui confirmado estado pedido');
   this.nodoCreado=localStorage.getItem('orden');
  console.log(localStorage.getItem('orden'),'aqui con tostring metodo de pago');

  this.getToken();
  //console.log(sencilla);
 this.tokencsrf = localStorage.getItem("csrf_token");
this.estadoPedidoCompleto=true;
 let body ={


   "type":[{"target_id": "sencilla"}],

   "field_estado_del_servicio":[{"value": this.estadoPedidoCompleto}]

};
  console.log(this.tokencsrf,'aqui csrf');

  this.b64 = localStorage.getItem("base64").toString();
  console.log(this.b64,'aqui b64');


  const headers = new HttpHeaders({'Content-Type': 'application/json','Authorization':'Basic '+this.b64,
  'X-CSRF-Token': this.tokencsrf});
  console.log(headers,'aqui header en act met pago');
  let url = 'http://164.92.106.39/node/'+this.nodoCreado+'?_format=json';
  console.log(url);


  this.http.patch(url,body,{headers:headers}).subscribe(data2=>{
   console.log(data2);
  // localStorage.setItem('sencillaCreada',data2['nid']['0']);
       },error2=>{
         console.log(error2);
       });

       this.router.navigate(['/index-auxiliares']);

}
actualizarEstadoPedidoEnCamino(){
  this.estadoPedido=true;
  //localStorage.getItem('sencillaCreada');
  console.log('estamos aqui confirmado');
   this.nodoCreado=localStorage.getItem('orden');
  console.log(localStorage.getItem('orden'),'aqui con tostring metodo de pago');

  this.getToken();
  //console.log(sencilla);
 this.tokencsrf = localStorage.getItem("csrf_token");

 let body ={


   "type":[{"target_id": "sencilla"}],

   "field_en_camino":[{"value":this.estadoPedido}]

};
  console.log(this.tokencsrf,'aqui new csrf');

  this.b64 = localStorage.getItem("base64").toString();
  console.log(this.b64,'aqui b64');


  const headers = new HttpHeaders({'Content-Type': 'application/json','Authorization':'Basic '+this.b64,
  'X-CSRF-Token': this.tokencsrf});
  console.log(headers,'aqui header en act met pago');
  let url = 'http://164.92.106.39/node/'+this.nodoCreado+'?_format=json';
  console.log(url);


  this.http.patch(url,body,{headers:headers}).subscribe(data2=>{
   console.log(data2);
  // localStorage.setItem('sencillaCreada',data2['nid']['0']);
       },error2=>{
         console.log(error2);
       });
       //this.router.navigate(['/tabs']);


}
   seleccionarMoto(){
    this.medioTransporte=1;
    this.medioTransporte_modalidad='agil';
    console.log(this.medioTransporte);
    console.log(this.medioTransporte_modalidad);


    this.router.navigate(['/sencilla']);

   }
   seleccionarServicioMoto(){
    this.medioTransporte=1;
    console.log(this.medioTransporte);
    this.medioTransporte_modalidad='agil';

    console.log(this.medioTransporte_modalidad);




   }
   seleccionarServicioCarro(){
    this.medioTransporte=2;
    console.log(this.medioTransporte);
    this.medioTransporte_modalidad='moderada';

    console.log(this.medioTransporte_modalidad);



   }
   seleccionarServicioCarroGrande(){
    this.medioTransporte=4;
    console.log(this.medioTransporte);




   }
   seleccionarServicioMotoYcarroMunicipio(){
    this.medioTransporte=3;
    console.log(this.medioTransporte);




   }
   seleccionarMotoRuta(){

    this.medioTransporte=1;
    this.medioTransporte_modalidad=localStorage.getItem('modalidad');
    console.log(this.medioTransporte);
    console.log(this.medioTransporte_modalidad);



    this.router.navigate(['/rutas']);

   }
   seleccionarCarro(){
    this.medioTransporte=2;
this.medioTransporte_modalidad='moderada';
    console.log(this.medioTransporte);
    console.log(this.medioTransporte_modalidad);



    this.router.navigate(['/sencilla']);

   }
   seleccionarCarroRuta(){
    this.medioTransporte=2;
    this.medioTransporte_modalidad=localStorage.getItem('modalidad');
    console.log(this.medioTransporte);
    console.log(this.medioTransporte_modalidad);

    this.http.get("https://jsonplaceholder.typicode.com/todos/1").subscribe((res :any)=>{
        console.log(res);
      },error2=>{
        console.log(error2);
        console.log(error2.status);
        if(error2.status==0){
          alert('Error revise su conexion');

        }

      }
    );
    this.router.navigate(['/rutas']);

   }


  consultarIdAuxiliar(){





     //console.log(sencilla);
    this.tokencsrf = localStorage.getItem("csrf_token");

    //imprimir
    console.log(this.tokencsrf,'csrf');

     this.b64 = localStorage.getItem("base64").toString();

     const headers = new HttpHeaders({'Content-Type': 'application/json','Authorization':'Basic '+this.b64});
     console.log(headers,'aqui header en act tiendas');

     return this.http
     .get("http://164.92.106.39/user_id",{headers:headers})
     .pipe(
       map((res :any)=>{
         return res;
       })
     )


   }

   seleccionarEmprendedores(){

    console.log('tiendas emprendedores');
      //localStorage.getItem('sencillaCreada');
      console.log('estamos aqui confirmado');
      this.nodoCreado=localStorage.getItem('sencillaCreada');
     console.log(localStorage.getItem('sencillaCreada'),'aqui con tostring tiendas');

     this.getToken();
     //console.log(sencilla);
    this.tokencsrf = localStorage.getItem("csrf_token");


     console.log(this.tokencsrf,'aqui new csrf');

     this.b64 = localStorage.getItem("base64").toString();
     console.log(this.b64,'aqui b64');


     const headers = new HttpHeaders({'Content-Type': 'application/json','Authorization':'Basic '+this.b64,
     'X-CSRF-Token': this.tokencsrf});
     console.log(headers,'aqui header en act tiendas');

     return this.http
     .get("http://164.92.106.39/emprendedores",{headers:headers})
     .pipe(
       map((res :any)=>{
         return res;
       })
     )
    //this.router.navigate(['/rutas']);

   }
   seleccionarRestaurantes(){

    console.log('tiendas restaurantes');
      //localStorage.getItem('sencillaCreada');
      console.log('estamos aqui confirmado');
      this.nodoCreado=localStorage.getItem('sencillaCreada');
     console.log(localStorage.getItem('sencillaCreada'),'aqui con tostring tiendas');

     this.getToken();
     //console.log(sencilla);
    this.tokencsrf = localStorage.getItem("csrf_token");


     console.log(this.newXscrf,'aqui new csrf');

     this.b64 = localStorage.getItem("base64").toString();
     console.log(this.b64,'aqui b64');


     const headers = new HttpHeaders({'Content-Type': 'application/json','Authorization':'Basic '+this.b64,
     'X-CSRF-Token': this.tokencsrf});
     console.log(headers,'aqui header en act tiendas');

     return this.http
     .get("http://164.92.106.39/restaurantes/"+localStorage.getItem('locacion'),{headers:headers})
     .pipe(
       map((res :any)=>{
         return res;
       })
     )
    //this.router.navigate(['/rutas']);

   }

   seleccionarProductosTiendas(){

    console.log('productos tiendas');
      //localStorage.getItem('sencillaCreada');
      console.log('estamos aqui confirmado');
      this.idTiendaSeleccionada=localStorage.getItem('idTienda');
     console.log(localStorage.getItem('sencillaCreada'),'aqui con tostring tiendas');

     this.getToken();
     //console.log(sencilla);
    this.tokencsrf = localStorage.getItem("csrf_token");


     console.log( this.tokencsrf,'aqui new csrf');

     this.b64 = localStorage.getItem("base64").toString();
     console.log(this.b64,'aqui b64');


     const headers = new HttpHeaders({'Content-Type': 'application/json','Authorization':'Basic '+this.b64,
     'X-CSRF-Token':  this.tokencsrf});
     console.log(headers,'aqui header en act prodcuto tiendas');
     let url = 'http://164.92.106.39/productos/'+this.idTiendaSeleccionada+'?_format=json';
     console.log(url);
     return this.http
     .get(url,{headers:headers})
     .pipe(
       map((res :any)=>{
         return res;
       })
     )


    //this.router.navigate(['/rutas']);

   }
   seleccionarProductosFruver(){

    console.log('productos tiendas');
      //localStorage.getItem('sencillaCreada');
      console.log('estamos aqui confirmado');
      this.nodoCreado=localStorage.getItem('idTienda');
     console.log(localStorage.getItem('sencillaCreada'),'aqui con tostring tiendas');

     this.getToken();
     //console.log(sencilla);
    this.tokencsrf = localStorage.getItem("csrf_token");


     console.log(this.tokencsrf,'aqui new csrf');

     this.b64 = localStorage.getItem("base64").toString();
     console.log(this.b64,'aqui b64');


     const headers = new HttpHeaders({'Content-Type': 'application/json','Authorization':'Basic '+this.b64,
     'X-CSRF-Token': this.tokencsrf});
     console.log(headers,'aqui header en act prodcuto tiendas');
     let url = 'http://164.92.106.39/productos/1?_format=json';
     console.log(url);
     return this.http
     .get(url,{headers:headers})
     .pipe(
       map((res :any)=>{
         return res;
       })
     )


    //this.router.navigate(['/rutas']);

   }


   seleccionarSlider(){

    console.log('slider');
      //localStorage.getItem('sencillaCreada');
      console.log('estamos aqui confirmado');
    //  this.nodoCreado=localStorage.getItem('idTienda');
    // console.log(localStorage.getItem('sencillaCreada'),'aqui con tostring tiendas');

     this.getToken();
     //console.log(sencilla);







     let url = 'http://164.92.106.39/slides_apk?_format=hal_json';
     console.log(url);
     return this.http
     .get(url)
     .pipe(
       map((res :any)=>{
         return res ;
       })
     )


    //this.router.navigate(['/rutas']);

   }



   seleccionarSliderTelotengo(){

    console.log('slider');
      //localStorage.getItem('sencillaCreada');
      console.log('estamos aqui confirmado');
    //  this.nodoCreado=localStorage.getItem('idTienda');
    // console.log(localStorage.getItem('sencillaCreada'),'aqui con tostring tiendas');

     this.getToken();
     //console.log(sencilla);







     let url = 'http://164.92.106.39/slides_apk_telo?_format=hal_json';
     console.log(url);
     return this.http
     .get(url)
     .pipe(
       map((res :any)=>{
         return res ;
       })
     )


    //this.router.navigate(['/rutas']);

   }


   seleccionarSliderTiendas(){

    console.log('slider');
      //localStorage.getItem('sencillaCreada');
      console.log('estamos aqui confirmado');
    //  this.nodoCreado=localStorage.getItem('idTienda');
    // console.log(localStorage.getItem('sencillaCreada'),'aqui con tostring tiendas');

     this.getToken();
     //console.log(sencilla);







     let url = 'http://164.92.106.39/slider_tiendas?_format=hal_json';
     console.log(url);
     return this.http
     .get(url)
     .pipe(
       map((res :any)=>{
         return res ;
       })
     )


    //this.router.navigate(['/rutas']);

   }
   seleccionarSliderEmprendedores(){

    console.log('slider');
      //localStorage.getItem('sencillaCreada');
      console.log('estamos aqui confirmado');
    //  this.nodoCreado=localStorage.getItem('idTienda');
    // console.log(localStorage.getItem('sencillaCreada'),'aqui con tostring tiendas');

     this.getToken();
     //console.log(sencilla);







     let url = 'http://164.92.106.39/slides_apk_emprededores?_format=hal_json';
     console.log(url);
     return this.http
     .get(url)
     .pipe(
       map((res :any)=>{
         return res ;
       })
     )


    //this.router.navigate(['/rutas']);

   }

   seleccionarSliderRestaurantes(){

    console.log('slider');
      //localStorage.getItem('sencillaCreada');
      console.log('estamos aqui confirmado');
    //  this.nodoCreado=localStorage.getItem('idTienda');
    // console.log(localStorage.getItem('sencillaCreada'),'aqui con tostring tiendas');

     this.getToken();
     //console.log(sencilla);







     let url = 'http://164.92.106.39/slides_apk_restaurantes?_format=hal_json';
     console.log(url);
     return this.http
     .get(url)
     .pipe(
       map((res :any)=>{
         return res ;
       })
     )


    //this.router.navigate(['/rutas']);

   }
   seleccionarSliderCompras(){

    console.log('slider');
      //localStorage.getItem('sencillaCreada');
      console.log('estamos aqui confirmado');
    //  this.nodoCreado=localStorage.getItem('idTienda');
    // console.log(localStorage.getItem('sencillaCreada'),'aqui con tostring tiendas');

     this.getToken();
     //console.log(sencilla);







     let url = 'http://164.92.106.39/slides_apk_compras?_format=hal_json';
     console.log(url);
     return this.http
     .get(url)
     .pipe(
       map((res :any)=>{
         return res ;
       })
     )


    //this.router.navigate(['/rutas']);

   }
   seleccionarSliderMedicamentos(){

    console.log('slider');
      //localStorage.getItem('sencillaCreada');
      console.log('estamos aqui confirmado');
    //  this.nodoCreado=localStorage.getItem('idTienda');
    // console.log(localStorage.getItem('sencillaCreada'),'aqui con tostring tiendas');

     this.getToken();
     //console.log(sencilla);







     let url = 'http://164.92.106.39/slides_apk_medicamentos?_format=hal_json';
     console.log(url);
     return this.http
     .get(url)
     .pipe(
       map((res :any)=>{
         return res ;
       })
     )


    //this.router.navigate(['/rutas']);

   }


   //Obtener mensaje de error servidor
   getMensajeError(){
    console.log('estamos aqui confirmado');





     return this.http.get('http://164.92.106.39/aux_no_disponible',{}).subscribe(async data=>{
      this.messajeErr= await data[0].body;
      console.log(data[0].body);
          },error=>{
            this.anonimustoken=error.error.text;
            console.log (this.anonimustoken);




          });



    //this.router.navigate(['/
   }

   seleccionarSliderEspecial(){

    console.log('slider');
      //localStorage.getItem('sencillaCreada');
      console.log('estamos aqui confirmado');
    //  this.nodoCreado=localStorage.getItem('idTienda');
    // console.log(localStorage.getItem('sencillaCreada'),'aqui con tostring tiendas');

     this.getToken();
     //console.log(sencilla);







     let url = 'http://164.92.106.39/slides_apk_especial?_format=hal_json';
     console.log(url);
     return this.http
     .get(url)
     .pipe(
       map((res :any)=>{
         return res ;
       })
     )


    //this.router.navigate(['/rutas']);

   }

   seleccionarSliderPagos(){

    console.log('slider');
      //localStorage.getItem('sencillaCreada');
      console.log('estamos aqui confirmado');
    //  this.nodoCreado=localStorage.getItem('idTienda');
    // console.log(localStorage.getItem('sencillaCreada'),'aqui con tostring tiendas');

     this.getToken();
     //console.log(sencilla);







     let url = 'http://164.92.106.39/slides_apk_pagos?_format=hal_json';
     console.log(url);
     return this.http
     .get(url)
     .pipe(
       map((res :any)=>{
         return res ;
       })
     )


    //this.router.navigate(['/rutas']);

   }

   seleccionarSliderTrasteos(){

    console.log('slider');
      //localStorage.getItem('sencillaCreada');
      console.log('estamos aqui confirmado');
    //  this.nodoCreado=localStorage.getItem('idTienda');
    // console.log(localStorage.getItem('sencillaCreada'),'aqui con tostring tiendas');

     this.getToken();
     //console.log(sencilla);







     let url = 'http://164.92.106.39/slides_apk_trasteos?_format=hal_json';
     console.log(url);
     return this.http
     .get(url)
     .pipe(
       map((res :any)=>{
         return res ;
       })
     )


    //this.router.navigate(['/rutas']);

   }

   seleccionarSliderCarroTaller(){

    console.log('slider');
      //localStorage.getItem('sencillaCreada');
      console.log('estamos aqui confirmado');
    //  this.nodoCreado=localStorage.getItem('idTienda');
    // console.log(localStorage.getItem('sencillaCreada'),'aqui con tostring tiendas');

     this.getToken();
     //console.log(sencilla);







     let url = 'http://164.92.106.39/slides_apk_carro_taller?_format=hal_json';
     console.log(url);
     return this.http
     .get(url)
     .pipe(
       map((res :any)=>{
         return res ;
       })
     )


    //this.router.navigate(['/rutas']);

   }


   seleccionarSliderFruver(){

    console.log('slider');
      //localStorage.getItem('sencillaCreada');
      console.log('estamos aqui confirmado');
    //  this.nodoCreado=localStorage.getItem('idTienda');
    // console.log(localStorage.getItem('sencillaCreada'),'aqui con tostring tiendas');

     this.getToken();
     //console.log(sencilla);







     let url = 'http://164.92.106.39/slides_apk_fruver?_format=hal_json';
     console.log(url);
     return this.http
     .get(url)
     .pipe(
       map((res :any)=>{
         return res ;
       })
     )


    //this.router.navigate(['/rutas']);

   }


   seleccionarSliderTecnologia(){

    console.log('slider');
      //localStorage.getItem('sencillaCreada');
      console.log('estamos aqui confirmado');
    //  this.nodoCreado=localStorage.getItem('idTienda');
    // console.log(localStorage.getItem('sencillaCreada'),'aqui con tostring tiendas');

     this.getToken();
     //console.log(sencilla);







     let url = 'http://164.92.106.39/slides_apk_tecno?_format=hal_json';
     console.log(url);
     return this.http
     .get(url)
     .pipe(
       map((res :any)=>{
         return res ;
       })
     )


    //this.router.navigate(['/rutas']);

   }

   seleccionarSliderTextiles(){

    console.log('slider');
      //localStorage.getItem('sencillaCreada');
      console.log('estamos aqui confirmado');
    //  this.nodoCreado=localStorage.getItem('idTienda');
    // console.log(localStorage.getItem('sencillaCreada'),'aqui con tostring tiendas');

     this.getToken();
     //console.log(sencilla);







     let url = 'http://164.92.106.39/slides_apk_textiles?_format=hal_json';
     console.log(url);
     return this.http
     .get(url)
     .pipe(
       map((res :any)=>{
         return res ;
       })
     )


    //this.router.navigate(['/rutas']);

   }

   seleccionarSliderAlmacen(){

    console.log('slider');
      //localStorage.getItem('sencillaCreada');
      console.log('estamos aqui confirmado');
    //  this.nodoCreado=localStorage.getItem('idTienda');
    // console.log(localStorage.getItem('sencillaCreada'),'aqui con tostring tiendas');

     this.getToken();
     //console.log(sencilla);







     let url = 'http://164.92.106.39/slides_apk_almacen?_format=hal_json';
     console.log(url);
     return this.http
     .get(url)
     .pipe(
       map((res :any)=>{
         return res ;
       })
     )


    //this.router.navigate(['/rutas']);

   }

   seleccionarSliderRutas(){

    console.log('slider');
      //localStorage.getItem('sencillaCreada');
      console.log('estamos aqui confirmado');
    //  this.nodoCreado=localStorage.getItem('idTienda');
    // console.log(localStorage.getItem('sencillaCreada'),'aqui con tostring tiendas');

     this.getToken();
     //console.log(sencilla);







     let url = 'http://164.92.106.39/slides_apk_rutas?_format=hal_json';
     console.log(url);
     return this.http
     .get(url)
     .pipe(
       map((res :any)=>{
         return res ;
       })
     )


    //this.router.navigate(['/rutas']);

   }


   seleccionarSliderSencillas(){

    console.log('slider');
      //localStorage.getItem('sencillaCreada');
      console.log('estamos aqui confirmado');
    //  this.nodoCreado=localStorage.getItem('idTienda');
    // console.log(localStorage.getItem('sencillaCreada'),'aqui con tostring tiendas');

     this.getToken();
     //console.log(sencilla);







     let url = 'http://164.92.106.39/slides_apk_sencilla?_format=hal_json';
     console.log(url);
     return this.http
     .get(url)
     .pipe(
       map((res :any)=>{
         return res ;
       })
     )


    //this.router.navigate(['/rutas']);

   }


   seleccionarSliderllaves(){

    console.log('slider');
      //localStorage.getItem('sencillaCreada');
      console.log('estamos aqui confirmado');
    //  this.nodoCreado=localStorage.getItem('idTienda');
    // console.log(localStorage.getItem('sencillaCreada'),'aqui con tostring tiendas');

     this.getToken();
     //console.log(sencilla);







     let url = 'http://164.92.106.39/slides_apk_llaves?_format=hal_json';
     console.log(url);
     return this.http
     .get(url)
     .pipe(
       map((res :any)=>{
         return res ;
       })
     )


    //this.router.navigate(['/rutas']);

   }
   seleccionarFooter(){

    console.log('footer');
      //localStorage.getItem('sencillaCreada');
      console.log('estamos aqui confirmado');
    //  this.nodoCreado=localStorage.getItem('idTienda');
    // console.log(localStorage.getItem('sencillaCreada'),'aqui con tostring tiendas');

     this.getToken();
     //console.log(sencilla);







     let url = 'http://164.92.106.39/footervpe?_format=hal_json';
     console.log(url);
     return this.http
     .get(url)
     .pipe(
       map((res :any)=>{
         return res ;
       })
     )


    //this.router.navigate(['/rutas']);

   }
   addCarrito(producto: ProductosI) {
    this.subject.next([...this.itemsCarrito, producto]);
  }

  /**
   * clearCarrito
   */
  clearCarrito() {
    this.subject.next(null);
  }

  /**
   * getCarrito
   */
  getCarrito(): Observable<ProductosI[]> {
    return this.subject;
  }

  /**
   * getTotal
   */
  getTotal() {
    return this.itemsCarrito.reduce((total, producto: ProductosI) => { return total + producto.field_price_simple; }, 0);
  }

  //consultar valor descuento moderada
getValorDescuento(){


  let auxB64 =localStorage.getItem('base64');

  const headers = new HttpHeaders({'Content-Type': 'application/json','Authorization':'Basic '+auxB64,
  });
  console.log(headers);
   this.urlAuxName = 'http://164.92.106.39/descuento_moderado';

     return this.http.get(this.urlAuxName, {headers:headers})
     .pipe(
       map((res :any)=>{
         return res;
        // console.log(res['0']['Role'],'estoy en data');
       })
     )
}

//valor agregado para servicio taller

getValorAgregadoTaller(){


  let auxB64 =localStorage.getItem('base64');

  const headers = new HttpHeaders({'Content-Type': 'application/json','Authorization':'Basic '+auxB64,
  });
  console.log(headers);
   this.urlAuxName = 'http://164.92.106.39/incremento_taller';

     return this.http.get(this.urlAuxName, {headers:headers})
     .pipe(
       map((res :any)=>{
         return res;
        // console.log(res);

       })
     )
}

//valor agregado para servicio trasteo
getValorAgregadoTrasteo(){


  let auxB64 =localStorage.getItem('base64');

  const headers = new HttpHeaders({'Content-Type': 'application/json','Authorization':'Basic '+auxB64,
  });
  console.log(headers);
   this.urlAuxName = 'http://164.92.106.39/incremento_trasteo';

     return this.http.get(this.urlAuxName, {headers:headers})
     .pipe(
       map((res :any)=>{
         return res;
        // console.log(res);

       })
     )
}

//valor agregado para servicio llaves
getValorAgregadoLlaves(){


  let auxB64 =localStorage.getItem('base64');

  const headers = new HttpHeaders({'Content-Type': 'application/json','Authorization':'Basic '+auxB64,
  });
  console.log(headers);
   this.urlAuxName = 'http://164.92.106.39/incremento_llaves';

     return this.http.get(this.urlAuxName, {headers:headers})
     .pipe(
       map((res :any)=>{
         return res;
        // console.log(res);

       })
     )
}

//valor agregado para servicio con carro
getValorAgregadoVehiculo(){


  let auxB64 =localStorage.getItem('base64');

  const headers = new HttpHeaders({'Content-Type': 'application/json','Authorization':'Basic '+auxB64,
  });
  console.log(headers);
   this.urlAuxName = 'http://164.92.106.39/incremento_vehiculo';

     return this.http.get(this.urlAuxName, {headers:headers})
     .pipe(
       map((res :any)=>{
         return res;
        // console.log(res);

       })
     )
}






}