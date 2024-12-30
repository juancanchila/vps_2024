import { Diagnostic } from '@awesome-cordova-plugins/diagnostic/ngx';
import { Component, NgZone, OnDestroy, OnInit } from '@angular/core';
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
export class ModoColaboradorPage {
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
  nid: any;
  evaluado: any;

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

  ionViewWillEnter() {
    console.log('Modo colaborador - ionViewWillEnter');
    this.iniciarModoColaborador();
  }

  iniciarModoColaborador() {
    console.log('Cargando Modo Colaborador');

    this.auth.consultarIdAuxiliar().subscribe((res) => {
      console.log(res, 'Respuesta');
      console.log(res['0']['roles_target_id']);

      localStorage.setItem('rolAuxiliar', res['0']['roles_target_id']);
      localStorage.setItem('idAuxiliar', res['0']['uid']);
      localStorage.setItem('tipoVehiculo', res['0']['field_tipo_de_vehiculo']);
    });

    this.getGpsPermision();
    this.getLocation();
    this.loadEstadoDisponibilidad();
  }
  getGpsPermision() {
    this.diagnostic
      .getPermissionAuthorizationStatus(
        this.diagnostic.permission.ACCESS_FINE_LOCATION
      )
      .then(
        (status) => {
          if (status !== this.diagnostic.permissionStatus.GRANTED) {
            this.diagnostic
              .requestRuntimePermissions([
                this.diagnostic.permission.ACCESS_FINE_LOCATION,
                this.diagnostic.permission.ACCESS_COARSE_LOCATION,
              ])
              .then((data) => {
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

    Geolocation.getCurrentPosition()
      .then((data) => {
        this.latitude = data.coords.latitude;
        this.longitude = data.coords.longitude;
      })
      .catch((err) => {
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
      console.log('Position obtenida', position);
      this.auth.latitud = (await position).coords.latitude;
      this.auth.longitud = (await position).coords.longitude;
      console.log(
        (await position).coords.latitude,
        'poss lat',
        (await position).coords.longitude,
        'poss long'
      );
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
    console.log('Modo colaborador - OnDestroy');
    this.clearWatch();
  }

  iraHistorialPedidos() {
    this.router.navigate(['/historial-solicitudes']);
  }

  irAPedidosEnCurso() {
    this.router.navigate(['/index-auxiliares']);
  }

  async checkcButon($event) {
    console.log(this.value, 'Estado');
    //  Desactivar
    if (!this.evaluado) {
      this.validarAsignaciones(this.value);
    } else {
      this.evaluado = false;
    }

  }

  doRefresh(event) {
    this.iniciarModoColaborador();
    console.log('Begin async operation');

    setTimeout(() => {
      console.log('Async operation has ended');
      event.target.complete();
    }, 2000);
  }

  validarAsignaciones(value) {
    this.value = value;
    this.auth.getContenidoAsignado().subscribe(async (res) => {
      console.log(res, 'respuesta contenido asignado');
      if (res.length === 0) {



             this.estadoAuxiliar = this.value ? 'Auxiliar Disponible' : 'Auxiliar Ocupado';

        console.log('Puede Cambiar estado');

        let value_to_send = this.value ? true : false;
        this.auth.actualizarDisponibleAuxiliar(value_to_send);
        console.log( localStorage.getItem('nodeDisponibilidad'));

        this.auth.actualizarPosicion(value);
        //1. obtener el numero de la disponibiliad
        //2. Actualizar
      }

      if (res.length > 0) {
        console.log('No Puede Cambiar estado');
        this.evaluado = true;
        this.value = false;
        this.estadoAuxiliar = 'Auxiliar Ocupado';
        const alert = await this.alertControl.create({
          header: 'Notificación Vapaesa',
          message:
            'Tienes pedido en curso pendiente, Por eso estaras en Modo Ocupado!',
          buttons: [{ text: 'aceptar' }],
        });
        await alert.present();



      }
    });
  }

  async loadEstadoDisponibilidad() {
    try {
      // Esperar a que se obtenga la disponibilidad
      const res = await this.auth.getDisponibilidadPropia().toPromise();

      console.log(res, 'res');

      if (res.length > 0) {
        localStorage.setItem('nodeDisponibilidad', res['0']['nid'] );

        let estado_reciibido = res['0']['field_estado'];
        this.nid = res['0']['nid'];
        this.posicionActivaAuxiliar = res['0']['nid'];
        if (estado_reciibido === 'Off') {
          this.estadoAuxiliar = 'Auxiliar Ocupado';
          this.value = false;
        } else {
          this.estadoAuxiliar = 'Auxiliar Disponible';
          this.value = true;

        }
      } else {
        //crear
        console.log('Creando');
        this.auth.EnviarPosicionAuxiliar();
        this.estadoAuxiliar = 'Auxiliar Disponible';
        this.value = true;
      }
    } catch (error) {
      console.error('Error al obtener la disponibilidad:', error);
    }
  }





}
