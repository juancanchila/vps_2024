import { HttpClient } from '@angular/common/http';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from './services/auth.service';
import { ProviderService } from './provider.service';
import { Router } from '@angular/router';
import { AlertController, MenuController, Platform, LoadingController } from '@ionic/angular';
import { NotificationsService } from './services/notifications.service';
import { GeolocationsService } from './services/geolocations.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent implements OnInit, OnDestroy {
  role: any;
  ifAuxiliar: any;
  public nombre: string;
  public contadorIngresoModoCliente = 0;
  public textoPerfil: string;
  modoColaborador: any;

  constructor(
    private notifications: NotificationsService,
    private geolocacion: GeolocationsService,
    private platform: Platform,
    private menucontrol: MenuController,
    private router: Router,
    public auth: AuthService,
    public provider: ProviderService,
    private alertCtrl: AlertController,
    private loadingCtrl: LoadingController // Incluir el LoadingController
  ) {
    this.inializarApp();
  }

  inializarApp() {
    this.platform.ready().then(() => {
      this.auth.init();
      this.auth.initwo();
      this.router.navigate(['/splashcreen']);
      this.geolocacion.getCurrentLocacion();
    });
  }

  ngOnInit() {
    if (localStorage.getItem('modoAuxiliar') === 'modoColaborador') {
      this.textoPerfil = ' IR A MODO CLIENTE';
    } else {
      this.textoPerfil = ' IR A MODO COLABORADOR';
    }

    this.auth.consultarIdAuxiliar().subscribe((res) => {
      console.log(res);
      this.ifAuxiliar = res;

      if (!this.ifAuxiliar.includes('Auxiliar')) {
        localStorage.setItem('rolAuxiliar', res['0']['roles_target_id']);
        localStorage.setItem('idAuxiliar', res['0']['uid']);
        localStorage.setItem('tipoVehiculo', res['0']['field_tipo_de_vehiculo']);

        if (
          res['0']['roles_target_id'].includes('Auxiliar') &&
          localStorage.getItem('modoAuxiliar') == 'modoColaborador'
        ) {
          this.textoPerfil = ' IR A MODO CLIENTE';
          this.router.navigate(['/modo-colaborador']);
        } else {
          this.textoPerfil = ' IR A MODO COLABORADOR';
          this.nombre = localStorage.getItem('name');
          this.role = localStorage.getItem('rol');
        }
      }
    });
  }

  ngOnDestroy() {
    console.log('App- OnDestroy');
  }

  async irAColaborador() {
    this.auth.obtenerRoleUsuario().subscribe(async (res) => {
      console.log(res);
      this.ifAuxiliar = res;

      if (this.ifAuxiliar.includes('cliente')) {
        const alert = await this.alertCtrl.create({
          header: 'Advertencia',
          message: 'No tienes permisos para ingresar',
          buttons: [
            {
              text: 'Aceptar',
              handler: () => {
                this.router.navigate(['/tabs']);
              },
            },
          ],
        });

        await alert.present();
        this.menucontrol.close();
      } else {
        const loadingMessage =
          this.textoPerfil === ' IR A MODO CLIENTE'
            ? 'Redirigiendo a modo cliente...'
            : 'Redirigiendo a modo colaborador...';

        const loading = await this.showLoading(loadingMessage);

        if (this.textoPerfil === ' IR A MODO CLIENTE') {
          this.textoPerfil = ' IR A MODO COLABORADOR';
          localStorage.setItem('modoAuxiliar', 'modoCliente');
          await this.router.navigate(['/tabs']);
        } else {
          this.textoPerfil = ' IR A MODO CLIENTE';
          localStorage.setItem('modoAuxiliar', 'modoColaborador');
          await this.router.navigate(['/modo-colaborador']);
        }

        await loading.dismiss();
        this.menucontrol.close();
      }
    });
  }

  async irAPedidos() {
    this.auth.obtenerRoleUsuario().subscribe(async (res) => {
      console.log(res);
      this.ifAuxiliar = res;

      const loading = await this.showLoading('Cargando pedidos...');

      if (this.ifAuxiliar.includes('Auxiliar') && this.textoPerfil === ' IR A MODO CLIENTE') {
        await this.router.navigate(['/index-auxiliares']);
      } else {
        await this.router.navigate(['/pedidos']);
      }

      await loading.dismiss();
      this.menucontrol.close();
    });
  }

  async showLoading(message: string): Promise<HTMLIonLoadingElement> {
    const loading = await this.loadingCtrl.create({
      message, // Mensaje personalizado
      spinner: 'crescent', // Tipo de spinner
      duration: 1500, // Duración máxima (ajustable)
    });
    await loading.present();
    return loading;
  }

  async logout() {
    const alertElement = await this.alertCtrl.create({
      header: '¿Está seguro que desea salir?',
      message: '¿Confirma que desea cerrar sesión?',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
        },
        {
          text: 'Aceptar',
          handler: () => {
            this.auth.logout2();
            this.clearLocalStorage();
            this.ifAuxiliar = null;
            this.textoPerfil = ' IR A MODO COLABORADOR';
            this.role = null;
          },
        },
      ],
    });

    await alertElement.present();
  }

  private clearLocalStorage() {
    const keysToRemove = [
      'name',
      'rol',
      'rolAuxiliar',
      'idAuxiliar',
      'permitirPagoefectivo',
      'tarifaDestino',
      'tarifaDestino2',
      'tarifaDestino3',
      'tarifaDestino4',
      'tarifaDestino5',
      'tarifaDestino6',
      'tarifaDestino7',
      'tarifaOrigen',
      'precioTarifa',
      'precioTarifa2',
      'mensajeria',
      'ServicioEvaluado',
      'tipoVehiculo',
      'zona_destino',
      'zona_origen',
      'session_ends',
      'EXPIRES_IN',
    ];

    keysToRemove.forEach((key) => localStorage.removeItem(key));
  }
}
