import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Router } from '@angular/router';
import { Capacitor } from '@capacitor/core';
import { LocalNotificationActionPerformed, LocalNotifications, LocalNotificationSchema } from '@capacitor/local-notifications';
import { ActionPerformed, PushNotification, PushNotifications, PushNotificationSchema, Token } from '@capacitor/push-notifications';

import { AlertController, ModalController, Platform } from '@ionic/angular';
import { AuthService } from './auth.service';
//import { Firestore, collectionData, collection } from '@angular/fire/firestore';



@Injectable({
  providedIn: 'root'
})
export class NotificationsService {
  token: string;
  
  constructor(public platform: Platform,private alertController : AlertController,
    public auth : AuthService,
   
    private router: Router,
    private http: HttpClient) {
this.inicializar();

          
     }

    send(token : string){
      let data = {
        token: token,
        os: 'Android'
      };

      
    } 
     

  inicializar() {
    const isPushNotificationsAvailable = Capacitor.isPluginAvailable('PushNotifications');
    if (isPushNotificationsAvailable) {
      PushNotifications.requestPermissions().then(result => {
        if (result.receive === 'granted') {
         // alert('permisos concedidos')
          // Register with Apple / Google to receive push via APNS/FCM
          PushNotifications.register();
          this.addListeners();
        } else {
          // Show some error
        }
      });
 } else {
   console.log('PushNotifications.requestPermission(yyo) -> no es movil');
 }
   
}

addListeners() {
  
  
// On success, we should be able to receive notifications
PushNotifications.addListener('registration',
(token: Token) => {
  console.log('The token is:', token);
  this.token=token.value;
          this.guadarToken(token.value);
          localStorage.setItem('tokenFire',token.value);
  console.log('Push registration success, token: ' + token.value);
 
}
);

    // Some issue with our setup and push will not work
    PushNotifications.addListener('registrationError',
      (error: any) => {
        alert('Error on registration: ' + JSON.stringify(error));
      }
    );

    // Show us the notification payload if the app is open on our device
    PushNotifications.addListener('pushNotificationReceived',
      async (notification: PushNotificationSchema) => {
        const alert = await this.alertController.create({
       
          header: notification.title,
         
          message: notification.body,
          // al hacer check, vamos a establecer una variable y al darle aceptar preguntamos si esa varibale esta definida si esta se continua
          buttons: [
          {
            text:'aceptar',
           
          }]
        });
    
        await alert.present();
        
       
    
       
      
      console.log('Push received en 1er plano: ', notification);
    
          LocalNotifications.schedule({
            notifications: [
              {
                title: notification.title,
                body: notification.body,
                id: 1,
              
              }
            ]
          });
      }
    );

    // Method called when tapping on a notification
    PushNotifications.addListener('pushNotificationActionPerformed',
      async (notification: ActionPerformed) => {
     
      }
    );

    
    LocalNotifications.addListener('localNotificationReceived', 
    (notification: LocalNotificationSchema) => {
       console.log('Push action performed en primer plano: ', notification);
      
    });
      

      
}
async guadarToken(token: any) {


}

guadarTokenFIrebase() {
  

}

}