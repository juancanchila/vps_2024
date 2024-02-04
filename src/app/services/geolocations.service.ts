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

  async getCurrentLocacion(){
    try {
      const permisionStatus = Geolocation.checkPermissions();
      console.log('Permsios statuus: ', (await permisionStatus).location)
      if((await permisionStatus)?.location != 'granted'){
        const requesStatus = await Geolocation.requestPermissions();
        if( requesStatus.location != 'granted'){
//go to setting
return ;
        }
          
      }
      let options: PositionOptions={
        maximumAge: 3000,
        timeout: 10000,
        enableHighAccuracy:true
      };
      const position =Geolocation.getCurrentPosition(options);
      console.log((await position).coords)
      console.log((await position).coords.latitude,'poss lat',(await position).coords.longitude,'poss long');
    } catch (e) {
      console.log(e);
      throw(e);
    }
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
