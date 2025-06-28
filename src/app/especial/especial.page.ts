import { Component, OnDestroy } from '@angular/core';
import { environment } from 'src/environments/environment';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-especial',
  templateUrl: './especial.page.html',
  styleUrls: ['./especial.page.scss'],
})
export class EspecialPage implements OnDestroy {
  slider: any[] = [];
  urlBase: any;
  imagenLista: boolean;
  servicio_evaluado: string;
  gifUrl: string = '';
  constructor(private auth: AuthService) {
    this.urlBase = environment.urlBase;
  }

  imagenCargada(event: boolean) {
    this.imagenLista = event;
  }

  ionViewWillEnter() {

    this.auth.seleccionarSliderEspecial().subscribe(res => {
      console.log(res, ' aqui slider');
      this.slider = res[0]['field_imagen_especial'];
      console.log(this.slider);

      this.servicio_evaluado=localStorage.getItem('servicioEvaluado');

      if (this.servicio_evaluado === 'carro_taller') {
        this.gifUrl = '../../assets/banners/carro_taller.gif';
      } else {
        this.gifUrl = '../../assets/banners/especial.gif';
      }

    });
  }

  ionViewWillLeave() {
    localStorage.removeItem('servicioEvaluado');
    console.log('servicioEvaluado borrado en ionViewWillLeave');
  }

  ngOnDestroy() {
    localStorage.removeItem('servicioEvaluado');
    console.log('servicioEvaluado borrado en ngOnDestroy');
  }
}
