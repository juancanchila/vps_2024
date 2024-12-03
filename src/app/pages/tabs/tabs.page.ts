import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IndexPage } from 'src/app/index/index.page';

import { PerfilPage } from 'src/app/perfil/perfil.page';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-tabs',
  templateUrl: './tabs.page.html',
  styleUrls: ['./tabs.page.scss'],
})
export class TabsPage implements OnInit {

tab1= IndexPage;
tab3=PerfilPage;
  AuxCarrosDisponibles: any;
  AuxMotosDisponibles: any;
  AuxDisponiblesMunicipios: any;
  constructor(private auth:AuthService,private router: Router) {

   }

  ngOnInit() {
    this.auth.setCalificationModalState(false);

    if(localStorage.getItem('rolAuxiliar')==='Auxiliar'&& localStorage.getItem('modoAuxiliar')==='modoColaborador'){
      this.router.navigate(['/modo-colaborador']);
    }else{
      this.router.navigateByUrl('/tabs');
    }
    this.auth.obtenerRoleUsuario().subscribe(res =>{
      console.log(res);
      localStorage.setItem('rol',res);
      localStorage.setItem('RolesUsers',res);
      //this.ifAuxiliar=localStorage.getItem('rol');

    });
    this.auth.getUser().subscribe(res =>{
      console.log(res[0]['field_pago_efectivo'],'variable boolean para pago efectivo');
      localStorage.setItem('permitirPagoefectivo',res[0]['field_pago_efectivo']);
      //this.ifAuxiliar=localStorage.getItem('rol');

    });
  }

  ionViewWillEnter(){
    this.auth.getAuxiliaresDisponiblesCarros().subscribe(res =>{
      let vpda=[];
      console.log(res, ' aqui carro');
      this.AuxCarrosDisponibles=res;



    });
    this.auth.getAuxiliaresDisponiblesMotos().subscribe(res =>{
      console.log(res, ' aqui motos');
      this.AuxMotosDisponibles=res;

    });

    this.auth.getAuxiliaresDisponiblesMunicipio().subscribe(res =>{
      console.log(res, ' aqui aux municiipio');
      this.AuxDisponiblesMunicipios=res;

    });

  }

}
