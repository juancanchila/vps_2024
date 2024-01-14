import { Injectable } from '@angular/core';
import { ProductosI } from 'modelos/productos.interface';

@Injectable({
  providedIn: 'root'
})
export class ProductosService {
private productos: Array<ProductosI> = [];


  constructor() {
    for (let i = 0; i < 10; i++) { // Creamos un conjunto de 10 productos de prueba
      const producto = new ProductosI();
      producto.product_id = (i + 1);
      producto.titulo = `Producto ${i}`;
     
      producto.field_price_simple= i * 10 + 1000;
     
    
      this.productos.push(producto);
    }
  }

  /**
   * getProductos
   */
  getProductos() {
    return new Promise((resolve, reject) => {
      if (this.productos.length > 0) {
        resolve(this.productos);
      } else {
        reject('No hay productos disponibles');
      }
    });
  }
}
