import { Diagnostic } from '@awesome-cordova-plugins/diagnostic/ngx';
import { Component, NgZone, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Capacitor } from '@capacitor/core';
import { AuthService } from 'src/app/services/auth.service';
import { GeolocationsService } from 'src/app/services/geolocations.service';
import { Geolocation } from '@capacitor/geolocation';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-modo-colaborador',
  templateUrl: './modo-colaborador.page.html',
  styleUrls: ['./modo-colaborador.page.scss'],
})
export class ModoColaboradorPage implements OnInit {
  coordinate: any;
  watchCoordinate: any;
  watchId: any;
  public value: boolean = false;
  latitud: number | any;
  longitud: number | any;
  allPedidos: any;
  character: any = [];
  estadoAuxiliar: any;
  latitude: number;
  longitude: number;
  estadoDisponibilidad: any;
  posicionActivaAuxiliar: any;


  constructor(
    private alertControl: AlertController,
    private diagnostic: Diagnostic,
    private geo: GeolocationsService,
    private zone: NgZone,
    private auth: AuthService,
    private router: Router
  ) {
    this.getLocation();
    this.getGpsPermision();
    this.requestPermissions();
  }

  ngOnInit() {
    this.auth.consultarIdAuxiliar().subscribe(
      async (res) => {
      console.log(res, "Respuesta");
      console.log(res['0']['roles_target_id']);

      localStorage.setItem('rolAuxiliar', res['0']['roles_target_id']);
      localStorage.setItem('idAuxiliar', res['0']['uid']);
      localStorage.setItem('tipoVehiculo', res['0']['field_tipo_de_vehiculo']);

      const rolesTargetId = res?.['0']?.roles_target_id || null;
      const uid = res?.['0']?.uid || null;
      const tipoVehiculo = res?.['0']?.field_tipo_de_vehiculo || null;

      if (!rolesTargetId || !uid || !tipoVehiculo) {
        console.error("Datos incompletos o nulos. Realizando logout...");
        const alert = await this.alertControl.create({
          header: 'Error',
          message: 'Algo salió mal. Se cerrará la sesión.',
          buttons: ['Aceptar'],
        });
        await alert.present();

        this.auth.logout2();
        this.auth.clearLocalStorage();
        return;
      }

    });

    this.getGpsPermision();
    this.getLocation();

    this.auth.getDisponibilidadPropia().subscribe((res) => {
      console.log(res, 'res');
      if (res.length > 0) {
        if (res['0']['field_estado'] === 'On') {
          this.getLocation();
          if (this.auth.longitud === "" || this.auth.latitud === "") {
            this.geo.openSetting();
          } else {
            this.estadoAuxiliar = 'Auxiliar Disponible';
            this.value = true;
            this.auth.estadoPedido = true;
            this.auth.actualizarPosicionEnviadaAuxiliar();
            this.auth.actualizarDisponibleAuxiliar(true);

            localStorage.setItem('nodeDisponibilidad_estado', res['0']['field_estado']);
            localStorage.setItem('nodeDisponibilidad', res['0']['nid']);
          }
        } else {
          this.getLocation();
          if (this.auth.longitud === "" || this.auth.latitud === "") {
            this.geo.openSetting();
          } else {
            this.estadoAuxiliar = 'Auxiliar Ocupado';
            this.value = false;
            this.auth.estadoPedido = false;
            this.auth.actualizarDisponibleAuxiliar(false);
            this.auth.actualizarPosicionEnviadaAuxiliarOcupado();

            localStorage.setItem('nodeDisponibilidad_estado', res['0']['field_estado']);
            localStorage.setItem('nodeDisponibilidad', res['0']['nid']);
          }
        }
        this.posicionActivaAuxiliar = res.length;
      } else {
        this.auth.estadoPedido = false;
        this.getLocation();
        if (this.auth.longitud === "" || this.auth.latitud === "") {
          this.geo.openSetting();
        } else {
          this.auth.EnviarPosicionAuxiliar();
          this.estadoAuxiliar = 'Auxiliar Ocupado';
          this.posicionActivaAuxiliar = '0';
          this.value = false;
          this.auth.actualizarDisponibleAuxiliar(false);
        }
      }
    });
  }

  doRefresh(event) {
    this.ngOnInit();
    console.log('Begin async operation');

    setTimeout(() => {
      console.log('Async operation has ended');
      event.target.complete();
    }, 2000);
  }

  iraHistorialPedidos() {
    this.router.navigate(['/historial-solicitudes']);
  }

  irAPedidosEnCurso() {
    this.router.navigate(['/index-auxiliares']);
  }

  async checkcButon($event) {
    if (this.value) {
      console.log(this.value);
      this.auth.getContenidoAsignado().subscribe(async (res) => {
        console.log(res, 'respuesta contenido asignado');
        if (res.length === 0) {
          this.getLocation();
          if (this.auth.longitud === "" || this.auth.latitud === "") {
            this.geo.openSetting();
          } else {
            this.estadoAuxiliar = 'Auxiliar Disponible';
            this.value = true;
            this.auth.estadoPedido = true;
            this.auth.actualizarPosicionEnviadaAuxiliar();
            this.auth.actualizarDisponibleAuxiliar(true);
          }
        } else {
          const alert = await this.alertControl.create({
            header: 'Notificación Vapaesa',
            message: 'Tienes pedido en curso pendiente, Por eso estaras en Modo Ocupado!',
            buttons: [{ text: 'aceptar' }],
          });
          await alert.present();
          this.value = false;
          this.estadoAuxiliar = 'Auxiliar Ocupado';
        }
      });
    } else {
      console.log(this.value);
      this.auth.getContenidoAsignado().subscribe(async (res) => {
        console.log(res, 'respuesta');
        if (res.length == 0) {
          this.estadoAuxiliar = 'Auxiliar Ocupado';
          this.getLocation();
          if (this.auth.longitud === "" || this.auth.latitud === "") {
            this.geo.openSetting();
          } else {
            this.auth.estadoPedido = false;
            this.auth.actualizarPosicionEnviadaAuxiliarOcupado();
            this.auth.actualizarDisponibleAuxiliar(false);
          }
        } else {
          const alert = await this.alertControl.create({
            header: 'Notificación Vapaesa',
            message: 'Tienes pedido en curso pendiente, Por eso estaras en Modo Ocupado!',
            buttons: [{ text: 'aceptar' }],
          });
          await alert.present();
          this.value = false;
          this.estadoAuxiliar = 'Auxiliar Ocupado';
        }
      });
    }
  }

  getGpsPermision() {
    this.diagnostic.getPermissionAuthorizationStatus(this.diagnostic.permission.ACCESS_FINE_LOCATION).then(
      (status) => {
        if (status !== this.diagnostic.permissionStatus.GRANTED) {
          this.diagnostic.requestRuntimePermissions([
            this.diagnostic.permission.ACCESS_FINE_LOCATION,
            this.diagnostic.permission.ACCESS_COARSE_LOCATION,
          ]).then((data) => {
            console.log('getCameraAuthorizacionStatus');
            console.log(data);
          });
        } else {
          console.log('we have the permission');
          this.getLocation();
        }
      },
      (statusError) => {
        console.log('statusError');
        console.log(statusError);
      }
    );
  }

  async requestPermissions() {
    const permResult = await Geolocation.requestPermissions();
    console.log('Perm request result: ', permResult);
  }

  getCurrentCoordinate() {
    if (!Capacitor.isPluginAvailable('Geolocation')) {
      console.log('Plugin geolocation not available');
      return;
    }

    Geolocation.getCurrentPosition().then((data) => {
      this.latitude = data.coords.latitude;
      this.longitude = data.coords.longitude;
    }).catch((err) => {
      console.error(err);
    });
  }

  async getLocation() {
    try {
      const permisionStatus = Geolocation.checkPermissions();
      console.log('Permisos status: ', (await permisionStatus).location);
      if ((await permisionStatus)?.location != 'granted') {
        const requestStatus = await Geolocation.requestPermissions();
        if (requestStatus.location != 'granted') {
          this.geo.openSetting();
          return;
        }
      }
      let options: PositionOptions = {
        maximumAge: 3000,
        timeout: 10000,
        enableHighAccuracy: true,
      };
      const position = Geolocation.getCurrentPosition(options);
      console.log("Position obtenida", position);
      this.auth.latitud = (await position).coords.latitude;
      this.auth.longitud = (await position).coords.longitude;
      console.log((await position).coords.latitude, 'poss lat', (await position).coords.longitude, 'poss long');
    } catch (e) {
      console.log(e);
      throw e;
    }
  }

  watchPosition() {
    try {
      this.watchId = Geolocation.watchPosition({}, (position, err) => {
        this.zone.run(() => {
          this.watchCoordinate = {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          };
        });
      });
    } catch (e) {
      console.error(e);
    }
  }

  clearWatch() {
    if (this.watchId != null) {
      Geolocation.clearWatch({ id: this.watchId });
    }
  }

  ngOnDestroy() {
    console.log("Modo colaborador - OnDestroy");
  }
}
