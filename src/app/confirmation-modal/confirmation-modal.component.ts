import { Component, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-confirmation-modal',
  templateUrl: './confirmation-modal.component.html',
  styleUrls: ['./confirmation-modal.component.scss'],
})
export class ConfirmationModalComponent {

  @Input() message: string;

  constructor(
    private modalController: ModalController,
    private auth: AuthService
  ) {}

  confirm() {
    console.log("Eliminar");
    this.auth.logout2();
    localStorage.removeItem('rolAuxiliar');
    localStorage.removeItem('idAuxiliar');
    localStorage.removeItem('permitirPagoefectivo');
    localStorage.removeItem('tarifaDestino');
    localStorage.removeItem('tarifaDestino2');
    localStorage.removeItem('tarifaDestino3');
    localStorage.removeItem('tarifaDestino4');
    localStorage.removeItem('tarifaDestino5');
    localStorage.removeItem('tarifaDestino6');
    localStorage.removeItem('tarifaDestino7');
    localStorage.removeItem('tarifaOrigen');
    localStorage.removeItem('precioTarifa');
    localStorage.removeItem('precioTarifa2');
    this.modalController.dismiss(true);
  }

  cancel() {
    this.modalController.dismiss(false);
  }
}
