import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TabsPage } from './tabs.page';

const routes: Routes = [
  {
    path: '',
    component: TabsPage,
    children:[
      {
        
          
            path:'index',
            loadChildren: () => import('../../index/index.module').then( m => m.IndexPageModule)
          
         
        
      },
      {
        
          
        path:'especial',
        loadChildren: () => import('../../especial/especial.module').then( m => m.EspecialPageModule)
      
     
    
  },
  {
        
          
    path:'historial-solicitudes',
    loadChildren: () => import('../../pages/historial-solicitudes/historial-solicitudes.module').then( m => m.HistorialSolicitudesPageModule)
  
 

},

  {
        
          
    path:'perfil',
    loadChildren: () => import('../../perfil/perfil.module').then( m => m.PerfilPageModule)
  
 

},

      {
        path:'',
        redirectTo: 'index',
        pathMatch: 'full'
      }
      
      
    ]
    
    
  },
  /*
  {
    path: 'mensajeria',
    loadChildren: () => import('./../../mensajeria/mensajeria.module').then(m => m.MensajeriaPageModule)
  }
  */
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TabsPageRoutingModule {}
