import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProductosI } from 'modelos/productos.interface';
import { BehaviorSubject, Subscription } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import { CarritoService } from 'src/app/services/CarritoService';
import { ProductosService } from 'src/app/services/productos.service';

@Component({
  selector: 'app-combo1',
  templateUrl: './combo1.page.html',
  styleUrls: ['./combo1.page.scss'],
})
export class Combo1Page implements OnInit {

  private producto: any;
  private subscription: Subscription;
  private productos: Array<any> = [];

  constructor( private router:Router, private auth: AuthService, private productosService: ProductosService) { }

  ngOnInit() {
    this.getCatalogo();
  }
  ngOnDestroy() {
   
    console.log("combo- OnDestroy")
  }

  /**
   * getCatalogo: Obtener los productos que NO son novedades
   */
  getCatalogo() {
    this.productosService.getProductos()
      .then(data => {
     
      })
      .catch(error => alert(error));
  }

  /**
   * addProducto
   */
  addProducto(producto) {
    this.auth.addCarrito(producto);
    alert('elemento agregado')
  }
  irPageCarritoCompras(){
    this.router.navigate(['/carrito-compras']);

  }


}
