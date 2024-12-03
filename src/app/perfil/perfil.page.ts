import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { environment } from 'src/environments/environment';
import { ConfirmationModalComponent } from '../confirmation-modal/confirmation-modal.component';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.page.html',
  styleUrls: ['./perfil.page.scss'],
})
export class PerfilPage implements OnInit {
name: any;
id:string;
character:any=[];
urlPicture:any;
urlBase:any;

  constructor(private router: Router,private auth: AuthService , private modalController: ModalController) {
    this.urlBase = environment.urlBase;

  }

  ngOnInit() {



  }


  async confirmDeletion() {
    const message = 'Seguro que deseas eliminar tu cuenta? está acción no se puede revertir.';
    const modal = await this.modalController.create({
      component: ConfirmationModalComponent,
      componentProps: { message },
    });

    modal.onDidDismiss().then((data) => {
      if (data.role === 'confirmed') {
        this.auth.logout();
        this.auth.clearLocalStorage();
            }
    });

    return await modal.present();
  }

  ionViewWillEnter(){

   console.log(this.name,this.id);
   this.auth.getUser().subscribe(res =>{
    console.log(res);
    console.log(res['0']['user_picture']);
    this.urlPicture=res['0']['user_picture'];
    if(res['0']['user_picture'] !=''){
      this.character=res;

    }



  })
  }
  ngOnDestroy() {

    console.log("Perfil - OnDestroy")
  }


}
