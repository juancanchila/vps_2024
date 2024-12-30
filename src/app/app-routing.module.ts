import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { IngresadoGuard } from './ingresado.guard';
import { NoIngresadoGuard } from './no-ingresado.guard';
import { AuxiliarGuard } from './guards/auxiliar.guard';
import { ModoColaboradorGuard } from './guards/modo-colaborador-guard.guard';
import { ModalCalificacionGuard } from './guards/modal-calificacion.guard';
import { DisponibilidadGuard } from './guards/disponibilidad.guard';

const routes: Routes = [
  {path: '', redirectTo: '/login', pathMatch: 'full'},

  {
    path: 'index',
    loadChildren: () => import('./index/index.module').then( m => m.IndexPageModule),
    canActivate: [IngresadoGuard]
  },
  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'register',
    loadChildren: () => import('./register/register.module').then( m => m.RegisterPageModule),
    canActivate: [NoIngresadoGuard]
  },
  {
    path: 'forgot-password',
    loadChildren: () => import('./forgot-password/forgot-password.module').then( m => m.ForgotPasswordPageModule)
  },

  {
    path: 'mensajeria',
    loadChildren: () => import('./mensajeria/mensajeria.module').then( m => m.MensajeriaPageModule),
    canActivate: [IngresadoGuard]
  },
  {
    path: 'sencilla',
    loadChildren: () => import('./sencilla/sencilla.module').then( m => m.SencillaPageModule),
    canActivate: [IngresadoGuard]
  },
  {
    path: 'rutas',
    loadChildren: () => import('./rutas/rutas.module').then( m => m.RutasPageModule),
    canActivate: [IngresadoGuard]
  },
  {
    path: 'especial',
    loadChildren: () => import('./especial/especial.module').then( m => m.EspecialPageModule),
    canActivate: [IngresadoGuard]
  },
  {
    path: 'medicamentos',
    loadChildren: () => import('./medicamentos/medicamentos.module').then( m => m.MedicamentosPageModule),
    canActivate: [IngresadoGuard]
  },
  {
    path: 'pagos',
    loadChildren: () => import('./pagos/pagos.module').then( m => m.PagosPageModule),
    canActivate: [IngresadoGuard]
  },
  {
    path: 'perfil',
    loadChildren: () => import('./perfil/perfil.module').then( m => m.PerfilPageModule),
    canActivate: [IngresadoGuard]
  },
  {
    path: 'historial-solicitudes',
    loadChildren: () => import('./pages/historial-solicitudes/historial-solicitudes.module').then( m => m.HistorialSolicitudesPageModule)
  },
  {
    path: 'index-auxiliares',
    loadChildren: () => import('./pages/index-auxiliares/index-auxiliares.module').then( m => m.IndexAuxiliaresPageModule),
    canActivate: [IngresadoGuard]
  },
  {
    path: 'resumen',
    loadChildren: () => import('./pages/resumen/resumen.module').then( m => m.ResumenPageModule)
  },

  {
    path: 'ordenes-creadas',
    loadChildren: () => import('./pages/ordenes-creadas/ordenes-creadas.module').then( m => m.OrdenesCreadasPageModule)
  },
  {
    path: 'llaves',
    loadChildren: () => import('./pages/llaves/llaves.module').then( m => m.LlavesPageModule),
    canActivate: [IngresadoGuard]
  },
  {
    path: 'restaurantes',
    loadChildren: () => import('./pages/restaurantes/restaurantes.module').then( m => m.RestaurantesPageModule),
    canActivate: [IngresadoGuard]
  },
  {
    path: 'compras',
    loadChildren: () => import('./pages/compras/compras.module').then( m => m.ComprasPageModule),
    canActivate: [IngresadoGuard]
  },
  {
    path: 'emprendedores',
    loadChildren: () => import('./pages/emprendedores/emprendedores.module').then( m => m.EmprendedoresPageModule),
    canActivate: [IngresadoGuard]
  },
  {
    path: 'pedidos',
    loadChildren: () => import('./pages/pedidos/pedidos.module').then( m => m.PedidosPageModule),
    canActivate: [IngresadoGuard,ModalCalificacionGuard]
  },
  {
    path: 'fruver',
    loadChildren: () => import('./pages/fruver/fruver.module').then( m => m.FruverPageModule),
    canActivate: [IngresadoGuard]
  },
  {
    path: 'tecnologia',
    loadChildren: () => import('./pages/tecnologia/tecnologia.module').then( m => m.TecnologiaPageModule),
    canActivate: [IngresadoGuard]
  },
  {
    path: 'textiles',
    loadChildren: () => import('./pages/textiles/textiles.module').then( m => m.TextilesPageModule),
    canActivate: [IngresadoGuard]
  },
  {
    path: 'almacen',
    loadChildren: () => import('./pages/almacen/almacen.module').then( m => m.AlmacenPageModule),
    canActivate: [IngresadoGuard]
  },

  {
    path: 'carrito-compras',
    loadChildren: () => import('./pages/carrito-compras/carrito-compras.module').then( m => m.CarritoComprasPageModule),
    canActivate: [IngresadoGuard]
  },
  {
    path: 'restaurante1/:allPedidos',
    loadChildren: () => import('./pages/restaurante1/restaurante1.module').then( m => m.Restaurante1PageModule),
    canActivate: [IngresadoGuard]
  },
  {
    path: 'combo1',
    loadChildren: () => import('./pages/combo1/combo1.module').then( m => m.Combo1PageModule),
    canActivate: [IngresadoGuard]
  },
  {
    path: 'resumen-ruta',
    loadChildren: () => import('./pages/resumen-ruta/resumen-ruta.module').then( m => m.ResumenRutaPageModule),
    canActivate: [IngresadoGuard]
  },
  {
    path: 'orden-final',
    loadChildren: () => import('./pages/orden-final/orden-final.module').then( m => m.OrdenFinalPageModule),
    canActivate: [IngresadoGuard]
  },
  {
    path: 'transportes',
    loadChildren: () => import('./pages/transportes/transportes.module').then( m => m.TransportesPageModule),
    canActivate: [IngresadoGuard]
  },
  {
    path: 'transportes-ruta',
    loadChildren: () => import('./pages/transportes-ruta/transportes-ruta.module').then( m => m.TransportesRutaPageModule),
    canActivate: [IngresadoGuard]
  },
  {
    path: 'resumen-medicamentos',
    loadChildren: () => import('./pages/resumen-medicamentos/resumen-medicamentos.module').then( m => m.ResumenMedicamentosPageModule),
    canActivate: [IngresadoGuard]
  },

  {
    path: 'descripcion-productos/:product',
    loadChildren: () => import('./pages/descripcion-productos/descripcion-productos.module').then( m => m.DescripcionProductosPageModule),
    canActivate: [IngresadoGuard]
  },
  {
    path: 'resumen-tecnologia',
    loadChildren: () => import('./pages/resumen-tecnologia/resumen-tecnologia.module').then( m => m.ResumenTecnologiaPageModule),
    canActivate: [IngresadoGuard]
  },
  {
    path: 'resumen-textiles',
    loadChildren: () => import('./pages/resumen-textiles/resumen-textiles.module').then( m => m.ResumenTextilesPageModule),
    canActivate: [IngresadoGuard]
  },
  {
    path: 'resumen-pagos',
    loadChildren: () => import('./pages/resumen-pagos/resumen-pagos.module').then( m => m.ResumenPagosPageModule),
    canActivate: [IngresadoGuard]
  },
  {
    path: 'resumen-almacen',
    loadChildren: () => import('./pages/resumen-almacen/resumen-almacen.module').then( m => m.ResumenAlmacenPageModule),
    canActivate: [IngresadoGuard]
  },

  {
    path: 'ver-mas-ordenes/:allPedidos',
    loadChildren: () => import('./pages/ver-mas-ordenes/ver-mas-ordenes.module').then( m => m.VerMasOrdenesPageModule),
    canActivate: [IngresadoGuard]
  },
  {
    path: 'login-clave/:name',
    loadChildren: () => import('./pages/login-clave/login-clave.module').then(m => m.LoginClavePageModule),
    canActivate: [NoIngresadoGuard]
  },
  {
    path: 'tabs',
    loadChildren: () => import('./pages/tabs/tabs.module').then( m => m.TabsPageModule),
    canActivate: [IngresadoGuard,ModoColaboradorGuard]
  },
  {
    path: 'buscar',
    loadChildren: () => import('./pages/buscar/buscar.module').then( m => m.BuscarPageModule),
    canActivate: [IngresadoGuard]
  },
  {
    path: 'ordenes-asignadas/:allPedidos',
    loadChildren: () => import('./pages/ordenes-asignadas/ordenes-asignadas.module').then( m => m.OrdenesAsignadasPageModule),
    canActivate: [IngresadoGuard]
  },
  {
    path: 'completar-pedidos/:allPedidos',
    loadChildren: () => import('./pages/completar-pedidos/completar-pedidos.module').then( m => m.CompletarPedidosPageModule),
    canActivate: [IngresadoGuard]
  },
  {
    path: 'modo-colaborador',
    loadChildren: () => import('./pages/modo-colaborador/modo-colaborador.module').then( m => m.ModoColaboradorPageModule),
    canActivate: [IngresadoGuard]
  },
  {
    path: 'pedido-curso',
    loadChildren: () => import('./pages/pedido-curso/pedido-curso.module').then( m => m.PedidoCursoPageModule),
    canActivate: [IngresadoGuard]
  },
  {
    path: 'emprendedores1/:allPedidos',
    loadChildren: () => import('./pages/emprendedores1/emprendedores1.module').then( m => m.Emprendedores1PageModule),
    canActivate: [IngresadoGuard]
  },
  {
    path: 'datos-envio-carrito',
    loadChildren: () => import('./pages/datos-envio-carrito/datos-envio-carrito.module').then( m => m.DatosEnvioCarritoPageModule),
    canActivate: [IngresadoGuard]
  },
  {
    path: 'resumen-datos-envio-compras',
    loadChildren: () => import('./pages/resumen-datos-envio-compras/resumen-datos-envio-compras.module').then( m => m.ResumenDatosEnvioComprasPageModule),
    canActivate: [IngresadoGuard]
  },
  {
    path: 'fruver1/:allPedidos',
    loadChildren: () => import('./pages/fruver1/fruver1.module').then( m => m.Fruver1PageModule),
    canActivate: [IngresadoGuard]
  },
  {
    path: 'historial-solicitudes-resumen/:allPedidos',
    loadChildren: () => import('./pages/historial-solicitudes-resumen/historial-solicitudes-resumen.module').then( m => m.HistorialSolicitudesResumenPageModule),
    canActivate: [IngresadoGuard]
  },
  {
    path: 'resumen-ruta3',
    loadChildren: () => import('./pages/resumen-ruta3/resumen-ruta3.module').then( m => m.ResumenRuta3PageModule),
    canActivate: [IngresadoGuard]
  },
  {
    path: 'resumen-ruta4',
    loadChildren: () => import('./pages/resumen-ruta4/resumen-ruta4.module').then( m => m.ResumenRuta4PageModule),
    canActivate: [IngresadoGuard]
  },
  {
    path: 'resumen-ruta5',
    loadChildren: () => import('./pages/resumen-ruta5/resumen-ruta5.module').then( m => m.ResumenRuta5PageModule),
    canActivate: [IngresadoGuard]
  },
  {
    path: 'resumen-ruta6',
    loadChildren: () => import('./pages/resumen-ruta6/resumen-ruta6.module').then( m => m.ResumenRuta6PageModule),
    canActivate: [IngresadoGuard]
  },
  {
    path: 'resumen-ruta7',
    loadChildren: () => import('./pages/resumen-ruta7/resumen-ruta7.module').then( m => m.ResumenRuta7PageModule),
    canActivate: [IngresadoGuard]
  },
  {
    path: 'resumen-ruta8',
    loadChildren: () => import('./pages/resumen-ruta8/resumen-ruta8.module').then( m => m.ResumenRuta8PageModule),
    canActivate: [IngresadoGuard]
  },
  {
    path: 'resumen-ruta9',
    loadChildren: () => import('./pages/resumen-ruta9/resumen-ruta9.module').then( m => m.ResumenRuta9PageModule),
    canActivate: [IngresadoGuard]
  },
  {
    path: 'resumen-ruta10',
    loadChildren: () => import('./pages/resumen-ruta10/resumen-ruta10.module').then( m => m.ResumenRuta10PageModule),
    canActivate: [IngresadoGuard]
  },
  {
    path: 'resumen-llaves',
    loadChildren: () => import('./pages/resumen-llaves/resumen-llaves.module').then( m => m.ResumenLlavesPageModule),
    canActivate: [IngresadoGuard]
  },
  {
    path: 'animacion',
    loadChildren: () => import('./pages/animacion/animacion.module').then( m => m.AnimacionPageModule),
    canActivate: [IngresadoGuard]
  },

  {
    path: 'splashcreen',
    loadChildren: () => import('./pages/splashcreen/splashcreen.module').then( m => m.SplashcreenPageModule),
    canActivate: [NoIngresadoGuard]
  },
  {
    path: 'telotengo',
    loadChildren: () => import('./pages/telotengo/telotengo.module').then(m => m.TelotengoPageModule)
    ,
    canActivate: [IngresadoGuard]
  },
  {
    path: 'carro-taller',
    loadChildren: () => import('./pages/carro-taller/carro-taller.module').then( m => m.CarroTallerPageModule)
  },
  {
    path: 'trasteo',
    loadChildren: () => import('./pages/trasteo/trasteo.module').then(m => m.TrasteoPageModule)
    ,
    canActivate: [IngresadoGuard]
  },
  {
    path: 'arma-tu-equipo',
    loadChildren: () => import('./pages/arma-tu-equipo/arma-tu-equipo.module').then(m => m.ArmaTuEquipoPageModule)
    ,
    canActivate: [IngresadoGuard]
  },
  {
    path: 'zona-gamer',
    loadChildren: () => import('./pages/zona-gamer/zona-gamer.module').then(m => m.ZonaGamerPageModule)
    ,
    canActivate: [IngresadoGuard]
  },
  {
    path: 'resumen-carrotaller',
    loadChildren: () => import('./pages/resumen-carrotaller/resumen-carrotaller.module').then(m => m.ResumenCarrotallerPageModule)
    ,
    canActivate: [IngresadoGuard]
  },
  {
    path: 'resumen-trasteo',
    loadChildren: () => import('./pages/resumen-trasteo/resumen-trasteo.module').then(m => m.ResumenTrasteoPageModule)
    ,
    canActivate: [IngresadoGuard]
  },
  {
    path: 'resumen-arma-tu-equipo',
    loadChildren: () => import('./pages/resumen-arma-tu-equipo/resumen-arma-tu-equipo.module').then( m => m.ResumenArmaTuEquipoPageModule)
  },
  {
    path: 'resumen-zonagamer',
    loadChildren: () => import('./pages/resumen-zonagamer/resumen-zonagamer.module').then(m => m.ResumenZonagamerPageModule)
    ,
    canActivate: [IngresadoGuard]
  },
  {
    path: 'suscripcion',
    loadChildren: () => import('./pages/suscripcion/suscripcion.module').then( m => m.SuscripcionPageModule)
  },
  {
    path: 'mascotas',
    loadChildren: () => import('./pages/mascotas/mascotas.module').then(m => m.MascotasPageModule)
    ,
    canActivate: [IngresadoGuard]
  },
  {
    path: 'resumen-mascotas',
    loadChildren: () => import('./pages/resumen-mascotas/resumen-mascotas.module').then(m => m.ResumenMascotasPageModule)
    ,
    canActivate: [IngresadoGuard]
  },
  {
    path: 'otros-restaurantes',
    loadChildren: () => import('./pages/otros-restaurantes/otros-restaurantes.module').then(m => m.OtrosRestaurantesPageModule)
    ,
    canActivate: [IngresadoGuard]
  },
  {
    path: 'resumen-otros-restaurantes',
    loadChildren: () => import('./pages/resumen-otros-restaurantes/resumen-otros-restaurantes.module').then(m => m.ResumenOtrosRestaurantesPageModule)
    ,
    canActivate: [IngresadoGuard]
  },
  {
    path: 'modalidad',
    loadChildren: () => import('./pages/modalidad/modalidad.module').then(m => m.ModalidadPageModule)
    ,
    canActivate: [IngresadoGuard]
  },
  {
    path: 'send-code/:source/:email',
    loadChildren: () => import('./pages/send-code/send-code.module').then(m => m.SendCodePageModule)
  },
  {
    path: 'new-pass/:source/:email',
    loadChildren: () => import('./pages/new-pass/new-pass.module').then( m => m.NewPassPageModule)
  },




];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
