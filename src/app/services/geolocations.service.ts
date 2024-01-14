import { Injectable, NgZone } from '@angular/core';
import { Capacitor } from '@capacitor/core';
import { Geolocation } from '@capacitor/geolocation';
@Injectable({
  providedIn: 'root'
})
export class GeolocationsService {

  coordinate: any;
  watchCoordinate: any;
  watchId: any;

  constructor(private zone: NgZone) {
   
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

    Geolocation.getCurrentPosition();
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
        //console.log('Watch', this.watchCoordinate);
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
}
