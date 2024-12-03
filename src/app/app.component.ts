import { HttpClient } from '@angular/common/http';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from './services/auth.service';
import { ProviderService } from './provider.service';
import { Router } from '@angular/router';
import { AlertController, MenuController, Platform } from '@ionic/angular';
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
  public textoPerfil: string = ' IR A MODO COLABORADOR';
  modoColaborador: any;

  constructor(
    private notifications: NotificationsService,
    private geolocacion: GeolocationsService,
    private platform: Platform,
    private menucontrol: MenuController,
    private router: Router,
    public auth: AuthService,
    public provider: ProviderService,
    private alertCtrl: AlertController
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

    console.log(localStorage.getItem('modoAuxiliar'),"Valor nodoauxiliar");
    this.auth.consultarIdAuxiliar().subscribe(res => {
      console.log(res,"perfil obtenido");
      this.ifAuxiliar = res;

      if (!this.ifAuxiliar.includes('Auxiliar')) {
        console.log(res['0']['roles_target_id']);
        localStorage.setItem('rolAuxiliar', res['0']['roles_target_id']);
        localStorage.setItem('idAuxiliar', res['0']['uid']);
        localStorage.setItem('tipoVehiculo', res['0']['field_tipo_de_vehiculo']);

        if (res['0']['roles_target_id'].includes('Auxiliar') && localStorage.getItem('modoAuxiliar') === 'modoColaborador') {
          this.textoPerfil = ' IR A MODO CLIENTE';
          this.router.navigate(['/modo-colaborador']);
        } else {
          this.textoPerfil = ' IR A MODO COLABORADOR';
          this.nombre = localStorage.getItem('name');
          this.role = localStorage.getItem('rol');
        }
      }
    });

    if (localStorage.getItem('modoAuxiliar') === 'modoColaborador') {
      this.textoPerfil = ' IR A MODO CLIENTE';

  } else {
    this.textoPerfil = ' IR A MODO COLABORADOR';
    }

    this.auth.consultarIdAuxiliar().subscribe(res => {
      console.log(res);
      this.ifAuxiliar = res;

      if (!this.ifAuxiliar.includes('Auxiliar')) {
        console.log(res['0']['roles_target_id']);
        localStorage.setItem('rolAuxiliar', res['0']['roles_target_id']);
        localStorage.setItem('idAuxiliar', res['0']['uid']);
        localStorage.setItem('tipoVehiculo', res['0']['field_tipo_de_vehiculo']);

        if (res['0']['roles_target_id'].includes('Auxiliar') && localStorage.getItem('modoAuxiliar') == 'modoColaborador') {
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
    console.log("App- OnDestroy");
  }

  irAPerfil() {
    this.router.navigate(['/perfil']);
    this.menucontrol.close();
  }

  irAPedidos() {
    this.auth.obtenerRoleUsuario().subscribe(res => {
      console.log(res);
      this.ifAuxiliar = res;

      if (this.ifAuxiliar.includes('Auxiliar') && this.textoPerfil == ' IR A MODO CLIENTE') {
        this.router.navigate(['/index-auxiliares']);
      } else {
        this.router.navigate(['/pedidos']);
      }

      this.menucontrol.close();
    });
  }

  async irAColaborador() {

    this.auth.obtenerRoleUsuario().subscribe(async res => {
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
              }
            }
          ]
        });

        await alert.present();
        this.menucontrol.close();
      } else {
        if (this.textoPerfil === ' IR A MODO CLIENTE') {
          this.textoPerfil = ' IR A MODO COLABORADOR';
          localStorage.setItem('modoAuxiliar', 'modoCliente');
          this.router.navigate(['/tabs']);
        } else {
          this.textoPerfil = ' IR A MODO CLIENTE';
          localStorage.setItem('modoAuxiliar', 'modoColaborador');
          this.router.navigate(['/modo-colaborador']);
        }

        this.menucontrol.close();
      }
    });
  }

  iraAyuda() {
    this.router.navigate(['/especial']);
    this.menucontrol.close();
  }

  async logout() {
    const alertElement = await this.alertCtrl.create({
      header: '¿Está seguro que desea salir?',
      message: '¿Confirma que desea cerrar sesión?',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel'
        },
        {
          text: 'Aceptar',
          handler: () => {
            this.auth.logout();
            this.auth.clearLocalStorage();
            this.ifAuxiliar = null;
            this.textoPerfil = ' IR A MODO COLABORADOR';
            this.role = null;
            this.menucontrol.close();
          }
        }
      ]
    });

    await alertElement.present();
  }


}
