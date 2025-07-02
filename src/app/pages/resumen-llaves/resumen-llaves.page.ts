import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController, MenuController } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-resumen-llaves',
  templateUrl: './resumen-llaves.page.html',
  styleUrls: ['./resumen-llaves.page.scss'],
})
export class ResumenLlavesPage implements OnInit {
  barrio: any;
  imagenLista: boolean;
  FormSend: FormGroup;
  precio_origen: any;
  precio_destino: any;
  locaciones: any[] = [];
  aux: string;
  estadoButton: boolean;
  aditional_value: any;
  servicioEvaluado: string;
  direccionDestino: any[] = [];
  items2: any[] = [];

  constructor(
    private menucontrol: MenuController,
    private router: Router,
    private auth: AuthService,
    public fb: FormBuilder,
    public alertController: AlertController
  ) {
    this.menucontrol.enable(false);
    this.FormSend = this.fb.group({
      field_locacion_entrega: [""],
      field_locacion_destino: [""],
      field_contacto: [""],
      field_precio_: [""],
      field_medio_de_transporte: [""],
      field_direccion_destino: [""],
      field_direccion_entrega: [""],
      field_ida_y_vuelta: [""],
      field_metodo_de_pago: [""],
      field_barrio_origen: [""],
      field_barrio_destino: [""],
      field_nombre_c_origen: [""],
    });
  }

  status = "completed";
  disabledValue = true;

  imagenCargada(event: boolean) {
    this.imagenLista = event;
  }

  enableInput() {
    if (this.status === "completed") {
      this.disabledValue = false;
      console.log('enabled');
    } else {
      this.disabledValue = true;
    }
  }

  async inputChanged2($event: any): Promise<void> {
    const value = $event.target.value as string;
    if (value.length <= 0) {
      this.items2 = [];
      return;
    }

    const list = this.direccionDestino;
    console.log(list, 'list barrios');

    const items = list.filter(
      item => item.name.toLowerCase().includes(value.toLowerCase())
    );

    this.items2 = items;
  }

  async irAPagar() {
    console.log(this.FormSend.value);

    if (this.FormSend.invalid) {
      await this.presentAlert();
      return;
    }

    if (this.estadoButton === true) {
      this.estadoButton = false;
      this.auth.CrearSencillaLlaves(this.FormSend.value);
      console.log('Formulario enviado correctamente');
    }
  }

  async presentAlert() {
    const alert = await this.alertController.create({
      header: 'Contrato por prestación de servicios:',
      message: '1.Objeto. El Prestador de Servicios se obliga a ponerse a disposición del Usuario/consumidor brindándole la compañía de un amigo, cómplice y/o acompañante, para ir a los sitios donde quiera, disfrute, necesite o requiera cuando él lo solicite a través de la aplicación.'
        + ' Lo anterior de manera voluntaria, sin perjuicio de la supervisión y observaciones que pueda realizar el usuario durante la ejecución del contrato.' + '<br>'
        + '2. Lugar de la Prestación del Servicio...' + '<br>'
        + '3. Tarifa del Servicio...' + '<br>'
        + '4. Plazo para Ejecución del Servicio...' + '<br>'
        + '5. Método de Pago...' + '<br>'
        + '6. Prestación del Servicio...' + '<br>'
        + '7. Cesión...' + '<br>'
        + '8. Terminación...' + '<br>'
        + '9. Aceptación del Contrato...' + '<br><br>'
        + '<ion-checkbox id="aut_contrato" disabled="true"></ion-checkbox> Acepto'
        + '<style>ion-checkbox#aut_contrato{padding:5px 0px 0px 4px} #alert-1-msg{text-align:justify} .alert-message{text-align:justify} .labelAcepto{display:inline} div{display:block}</style>',
      buttons: [
        {
          text: 'cancel',
          role: 'cancel'
        },
        {
          text: 'aceptar',
          handler: () => {
            this.aux = (document.getElementById("aut_contrato") as HTMLInputElement).ariaChecked;
            console.log(this.aux, 'estado');

            if (this.aux == 'false') {
              localStorage.setItem('actualizarContrato', 'false');
            } else {
              localStorage.setItem('actualizarContrato', 'true');
            }
          }
        }
      ]
    });

    await alert.present();
  }

  async ngOnInit() {
    try {
      console.log(localStorage.getItem('zona_origen'), 'zona_origen');
      console.log(localStorage.getItem('zona_destino'), 'zona_destino');
      console.log(localStorage.getItem('servicioEvaluado'), 'servicioEvaluado');

      this.servicioEvaluado = localStorage.getItem('servicioEvaluado');

      var resultadoTotalCosto = await this.auth.calcularPrecioTarifa(
        localStorage.getItem('servicioEvaluado'),
        localStorage.getItem('zona_origen'),
        localStorage.getItem('zona_destino'),
        this.auth.medioTransporte
      );

      const data = await this.auth.getaditional_values().toPromise();
      if (this.servicioEvaluado === 'llaves1') {
        this.aditional_value = data[0].field_llaves_motos;
      } else if (this.servicioEvaluado === 'llaves2') {
        this.aditional_value = data[0].field_llaves_carros;
      } else {
        this.aditional_value = '0';
      }

      this.estadoButton = true;
      this.aux = 'false';
      this.auth.getListLocaciones().subscribe(data => {
        console.log(data);
        this.locaciones = data;
      }, error => {
        console.log(error);
      });

      this.direccionDestino = await this.auth.getListBarrios().toPromise();

      this.precio_origen = Number(localStorage.getItem('tarifaOrigen'));
      this.precio_destino = Number(localStorage.getItem('tarifaDestino'));
      this.presentAlert();
      this.auth.getSesion();

      this.auth.getValorAgregadoLlaves().subscribe(res => {
        console.log(res[0].field_valor_descuento, 'valor agregado +');
        localStorage.setItem('valorAgregado', res[0].field_valor_descuento);
      });

      console.log(this.auth.resumen);

      const resumen = this.auth.resumen;
      this.FormSend.controls.field_contacto.setValue(resumen.field_contacto['0']['value']);
      this.FormSend.controls.field_direccion_entrega.setValue(resumen.field_direccion_entrega['0']['value']);
      this.FormSend.controls.field_direccion_destino.setValue(resumen.field_direccion_destino['0']['value']);
      this.FormSend.controls.field_locacion_entrega.setValue(resumen.field_locacion_entrega['0']['value']);
      this.FormSend.controls.field_locacion_destino.setValue(resumen.field_locacion_destino['0']['value']);
      this.FormSend.controls.field_ida_y_vuelta.setValue(resumen.field_ida_y_vuelta['0']['value']);
      this.FormSend.controls.field_medio_de_transporte.setValue(this.auth.medioTransporte);
      this.FormSend.controls.field_barrio_origen.setValue(resumen.field_barrio_origen['0']['value']);
      this.FormSend.controls.field_barrio_destino.setValue(resumen.field_barrio_destino['0']['value']);
      this.FormSend.controls.field_metodo_de_pago.setValue(resumen.field_metodo_de_pago['0']['value']);
      this.FormSend.controls.field_nombre_c_origen.setValue(resumen.field_nombre_c_origen['0']['value']);

      console.log(resultadoTotalCosto);
      console.log(this.aditional_value, 'valores');
      resultadoTotalCosto = Number(this.aditional_value) + Number(resultadoTotalCosto);
      this.FormSend.controls.field_precio_.setValue(resultadoTotalCosto);
      localStorage.setItem('precioTarifa', resultadoTotalCosto.toString());
    } catch (error) {
      console.error(error);
    }
  }

  ngOnDestroy() {
    console.log("Resumen- OnDestroy");
  }
}
