import { Injectable } from '@angular/core';
import { ProductosI } from 'modelos/productos.interface';
import { BehaviorSubject, Observable } from 'rxjs';
import { Storage } from '@ionic/storage';

@Injectable({
  providedIn: 'root'
})
export class CarritoService {
    private subject: BehaviorSubject<ProductosI[]> = new BehaviorSubject([]);
    private itemsCarrito: ProductosI[] = [];
  
    constructor(
        private storage: Storage
    ) {
      this.subject.subscribe(data => this.itemsCarrito = data);
    }
  
    /**
     * addCarrito
     * @param producto
     */
    addCarrito(producto: ProductosI) {
      this.subject.next([...this.itemsCarrito, producto]);
    }
  
    /**
     * clearCarrito
     */
    clearCarrito() {
      this.subject.next(null);
    }
  
    /**
     * getCarrito
     */
    getCarrito(): Observable<ProductosI[]> {
      return this.subject;
    }
  
    /**
     * getTotal
     */
    getTotal() {
      return this.itemsCarrito.reduce((total, producto: ProductosI) => { return total + producto.field_price_simple; }, 0);
    }

    prepare_cart(product){
      return new Promise((resolve,reject)=>{
        var data = [];
        this.get_cart().then((data_cart:any)=>{      
          if(data_cart){
            var flag = true;
            for(let x in data_cart){
              if(data_cart[x].product_id == product.product_id){

                data_cart[x].product_id = product.product_id;
                data_cart[x].field_price_simple = product.originaPrice;
                data_cart[x].cantidad += product.cantidad;
                flag = false;
              }

              data.push(data_cart[x]);
            }

            if(flag){
              data.push(product);
            }

            resolve(JSON.stringify(data));

          }else{
            data.push(product);
            resolve(JSON.stringify(data));
          }
        });
      });
    }

    /*Almacenar información del carrito*/
    set_cart(product:any){
      this.storage.create();
      var doom = this;
      return new Promise((resolve,reject)=>{
        this.prepare_cart(product).then(data=>{
          this.storage.set('cart',data);
          //imprimir storage}

      

          resolve(true);
        });              
      });
    }

  
    


    

    /*Obtener información del carrito*/
    get_cart(){
      this.storage.create();
        return new Promise((resolve,reject)=>{
            this.storage.get('cart').then((res)=>{
                          
                resolve(res ? JSON.parse(res) : false);
                
            });
        });
    }

 
    delete_cart(){
      this.storage.remove('cart');
        
    }

    releaseProduct(id){
      console.log(id);
      this.get_cart().then((data_cart:any)=>{
        let data=[];
        for(let x in data_cart){
          if(data_cart[x].product_id != id){

            data.push(data_cart[x]);
           
          }

          
        }
        this.storage.set('cart',JSON.stringify(data));
        
         
          
      });

    }

    

   


update_cart($scope) {
    
    $scope.carrito = [];
    
    $scope.agregar = function (p) {
        var itemActual;

        for (var i = 0; i < $scope.carrito.length; i++) {
            if ($scope.carrito[i].Producto.Id == p.Id) {
                itemActual = $scope.carrito[i];
            }
        }
console.log(itemActual),'no tdtga';
        if (!itemActual) {
            $scope.carrito.push({
                Producto: p,
                Cantidad: 1
            });
        } else {
            itemActual.Cantidad++;
        }
    }
    
    $scope.formatoMoneda = function(valor){
         valor = parseFloat(valor);
        return "S/." + Math.floor(valor) + "." + (valor * 100) % 100;
    }
    $scope.productos = this.get_cart();
}
}