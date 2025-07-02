import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController, MenuController } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-resumen-medicamentos',
  templateUrl: './resumen-medicamentos.page.html',
  styleUrls: ['./resumen-medicamentos.page.scss'],
})
export class ResumenMedicamentosPage implements OnInit {
  imagenLista: boolean;
  locaciones: any[] = [];
  direccionDestino: any[] = []; // Agregado para el buscador
  items2: any[] = []; // Resultados filtrados
barrio: any;
  FormSend: FormGroup;
  precio_origen: any;
  precio_destino: any;
  precio_origen_externo: any;
  precio_destino_externo: any;
  aux: string;
  estadoButton: boolean;
  aditional_value: any;

  constructor(
    private menucontrol: MenuController,
    private router: Router,
    private alertCtrl: AlertController,
    private auth: AuthService,
    public fb: FormBuilder,
    public alertController: AlertController
  ) {
    this.menucontrol.enable(false);
    this.FormSend = this.fb.group({
      field_direccion_entrega: [""],
      field_direccion_destino: [""],
      field_documentos_medicos: [""],
      field_observaciones: [""],
      field_locacion_entrega: [""],
      field_locacion_destino: [""],
      field_barrio_origen: [""],
      field_barrio_destino: [""],
      field_valor_declarado: [""],
      field_metodo_de_pago: [""],
      field_farmacia: [""],
      field_ida_y_vuelta: [""],
      costoDomicilio: [""],
      field_medio_de_transporte: [""],
      field_respuesta_documentos: [""],
      field_contacto_destino: [""],
      field_contacto: [""],
      field_precio_: [""],
      field_nombre_c_origen: [""],
      field_nombre_c_destino: [""]
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

  act() {
    console.log('check boxxx');
  }

  async inputChanged2($event: any): Promise<void> {
    const value = $event.target.value as string;
    if (value.length <= 0) {
      this.items2 = [];
      return;
    }

    const list = this.direccionDestino;
    console.log(list, 'lista barrios');

    const items = list.filter(
      item => item.name.toLowerCase().includes(value.toLowerCase())
    );

    this.items2 = items;
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
        + '<style>ion-checkbox#aut_contrato{padding:5px 0px 0px 4px} #alert-1-msg{text-align:justify} .alert-message{text-align:justify}</style>',
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

  async irAPagar() {
    if (this.aux == 'false') {
      this.presentAlert();
    } else {
      if (this.FormSend.invalid) {
        const alertElement = await this.alertController.create({
          header: 'Error en el formulario',
          message: 'No podemos continuar',
          buttons: [
            {
              text: 'cancel',
              role: 'cancel'
            },
            {
              text: 'aceptar',
              handler: () => {
                this.router.navigate(['/tabs']);
              }
            }
          ]
        });
        await alertElement.present();
      } else {
        this.auth.getSesion();
        if (this.estadoButton == true) {
          this.estadoButton = false;
          this.auth.CrearMedicamentos(this.FormSend.value);
          console.log('Formulario enviado correctamente');
        }
      }
    }
  }

  async ngOnInit() {
    try {
      console.log(localStorage.getItem('zona_origen'), 'zona_origen');
      console.log(localStorage.getItem('zona_destino'), 'zona_destino');
      console.log(localStorage.getItem('servicioEvaluado'), 'servicioEvaluado');

      this.aditional_value = await this.auth.getaditional_values().toPromise();
      this.aditional_value = this.aditional_value[0].field_medicamentos;
      console.log(this.aditional_value, 'valor adicional');

      let resultadoTotalCosto = await this.auth.calcularPrecioTarifa(
        localStorage.getItem('servicioEvaluado'),
        localStorage.getItem('zona_origen'),
        localStorage.getItem('zona_destino'),
        1
      );
      resultadoTotalCosto = Number(resultadoTotalCosto);

      this.estadoButton = true;
      this.aux = 'false';

      this.auth.getListLocaciones().subscribe(data => {
        console.log(data);
        this.locaciones = data;
      }, error => {
        console.log(error);
      });

      // Cargar barrios para filtro
      this.direccionDestino = await this.auth.getListBarrios().toPromise();

      this.precio_origen = Number(localStorage.getItem('tarifaOrigen'));
      this.precio_destino = Number(localStorage.getItem('tarifaDestino'));
      this.precio_origen_externo = Number(localStorage.getItem('tarifaExternaOrigen'));
      this.precio_destino_externo = Number(localStorage.getItem('tarifaExternaDestino'));

      this.presentAlert();

      console.log(this.auth.resumenMedicamentos);
      const resumen = this.auth.resumenMedicamentos;

      this.FormSend.controls.field_direccion_entrega.setValue(resumen.field_direccion_entrega['0']['value']);
      this.FormSend.controls.field_respuesta_documentos.setValue(resumen.field_respuesta_documentos['0']['value']);
      this.FormSend.controls.field_direccion_destino.setValue(resumen.field_direccion_destino['0']['value']);
      this.FormSend.controls.field_documentos_medicos.setValue(resumen.field_documentos_medicos['0']['value']);
      this.FormSend.controls.field_observaciones.setValue(resumen.field_observaciones['0']['value']);
      this.FormSend.controls.field_farmacia.setValue(resumen.field_farmacia['0']['value']);
      this.FormSend.controls.costoDomicilio.setValue("7.000");
      this.FormSend.controls.field_locacion_entrega.setValue(resumen.field_locacion_entrega['0']['value']);
      this.FormSend.controls.field_locacion_destino.setValue(resumen.field_locacion_destino['0']['value']);
      this.FormSend.controls.field_barrio_origen.setValue(resumen.field_barrio_origen['0']['value']);
      this.FormSend.controls.field_barrio_destino.setValue(resumen.field_barrio_destino['0']['value']);
      this.FormSend.controls.field_valor_declarado.setValue(resumen.field_valor_declarado['0']['value']);
      this.FormSend.controls.field_metodo_de_pago.setValue(resumen.field_metodo_de_pago['0']['value']);
      this.FormSend.controls.field_contacto.setValue(resumen.field_contacto['0']['value']);
      this.FormSend.controls.field_contacto_destino.setValue(resumen.field_contacto_destino['0']['value']);
      this.FormSend.controls.field_nombre_c_origen.setValue(resumen.field_nombre_c_origen['0']['value']);
      this.FormSend.controls.field_nombre_c_destino.setValue(resumen.field_nombre_c_destino['0']['value']);

      console.log(this.FormSend.value['field_respuesta_documentos'], "Recoger?");
      if (this.FormSend.value['field_respuesta_documentos'] === 'Recoger Documentos') {
        this.FormSend.controls.field_ida_y_vuelta.setValue(true);
        resultadoTotalCosto *= 2;
      } else {
        this.FormSend.controls.field_ida_y_vuelta.setValue(false);
      }

      resultadoTotalCosto += Number(this.aditional_value);
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
