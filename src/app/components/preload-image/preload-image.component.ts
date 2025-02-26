import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';

@Component({
  selector: 'app-preload-image',
  templateUrl: './preload-image.component.html',
  styleUrls: ['./preload-image.component.scss'],
})
export class PreloadImageComponent implements OnInit {
  @Input() src: string = ''; // URL de la imagen
  @Input() alt: string = ''; // Texto alternativo
  @Output() loaded = new EventEmitter<boolean>(); // Emitimos cuando la imagen está lista
  imagenCargada: boolean = false;
  precargaImg = new Image();

  constructor() {}

  ngOnInit() {
    this.precargarImagen();
  }

  precargarImagen() {
    this.precargaImg.src = this.src;
    this.precargaImg.onload = () => {
      this.imagenCargada = true;
      this.loaded.emit(true); // Notificar que la imagen está lista
    };
  }
}
