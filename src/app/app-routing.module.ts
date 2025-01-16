
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { AppLayoutComponent } from "./layout/app.layout.component";
import { ReceveurLayoutComponent } from './layout/receveur-layout/receveur.layout.component';
import { BackofficeLayoutComponent } from './layout/backoffice-layout/backoffice.layout.component';
import { NotfoundComponent } from './demo/components/notfound/notfound.component';
import { AuthGuard } from './guards/auth.guard';
import { GuichetLayoutComponent } from './layout/guichet-layout/guichet.layout.component';
import { ArriereLayoutComponent } from './layout/arriere-layout/arriere.layout.component';
import { CtLayoutComponent } from './layout/ct-layout/ct.layout.component';
import { DrpLayoutComponent } from './layout/drp-layout/drp.layout.component';

@NgModule({
  imports: [
    RouterModule.forRoot([
      {
        path: '', component: AppLayoutComponent, canActivate: [AuthGuard],
        children: [
          {
            path: '', loadChildren: () => import('./modules/home/home.module').then(m => m.HomeModule),
          },
        ]
      },
      {
        path: 'receveur', component: ReceveurLayoutComponent,
         canActivate: [AuthGuard], data: { roles: ['ROLE_RECEVEUR'] },
        loadChildren: () => import('./modules/receveur/receveur.module').then(m => m.ReceveurModule),

      },
      {
        path: 'guichet', component: GuichetLayoutComponent, 
        // canActivate: [AuthGuard], data: { roles: ['ROLE_GUICHET'] },
        loadChildren: () => import('./modules/guichet/guichet.module').then(m => m.GuichetModule),

      },
      {
        path: 'backoffice', component: BackofficeLayoutComponent, 
        // canActivate: [AuthGuard], data: { roles: ['ROLE_ADMIN'] },
        loadChildren: () => import('./modules/backoffice/backoffice.module').then(m => m.BackofficeModule),

      },
      {
        path: 'arriere', component: ArriereLayoutComponent, 
        // canActivate: [AuthGuard], data: { roles: ['ROLE_ARRIERE'] },
        loadChildren: () => import('./modules/arriere/arriere.module').then(m => m.ArriereModule),

      },
      {
        path: 'ct', component: CtLayoutComponent,
        //  canActivate: [AuthGuard], data: { roles: ['ROLE_CT'] },
        loadChildren: () => import('./modules/centre-tri/centre-tri.module').then(m => m.CentreTriModule),

      },
      {
        path: 'drp', component: DrpLayoutComponent, canActivate: [AuthGuard], data: { roles: ['ROLE_DRP'] },
        loadChildren: () => import('./modules/drp/drp.module').then(m => m.DrpModule),

      },

            { path: 'notfound', component: NotfoundComponent },
            { path: '**', redirectTo: '/notfound' },
        ], { scrollPositionRestoration: 'enabled', anchorScrolling: 'enabled',  })
    ],
    exports: [RouterModule]
})
export class AppRoutingModule {
}










// import { RouterModule } from '@angular/router';
// import { NgModule } from '@angular/core';
// import { AppLayoutComponent } from "./layout/app.layout.component";
// import { ReceveurLayoutComponent } from './layout/receveur-layout/receveur.layout.component';
// import { BackofficeLayoutComponent } from './layout/backoffice-layout/backoffice.layout.component';
// import { NotfoundComponent } from './demo/components/notfound/notfound.component';
// // import { AuthGuard } from './guards/auth.guard';
// import { GuichetLayoutComponent } from './layout/guichet-layout/guichet.layout.component';
// import { ArriereLayoutComponent } from './layout/arriere-layout/arriere.layout.component';

// @NgModule({
//   imports: [
//     RouterModule.forRoot([
//       {
//         path: '', component: AppLayoutComponent,
//         // canActivate: [AuthGuard],
//         children: [
//           {
//             path: '', loadChildren: () => import('./modules/home/home.module').then(m => m.HomeModule),
//           },
//         ]
//       },
//       {
//         path: 'receveur', component: ReceveurLayoutComponent,
//         //  canActivate: [AuthGuard], data: { roles: ['ROLE_RECEVEUR'] },
//         loadChildren: () => import('./modules/receveur/receveur.module').then(m => m.ReceveurModule),

//       },
//       {
//         path: 'guichet', component: GuichetLayoutComponent,
//         // canActivate: [AuthGuard], data: { roles: ['ROLE_GUICHET'] },
//         loadChildren: () => import('./modules/guichet/guichet.module').then(m => m.GuichetModule),

//       },
//       {
//         path: 'backoffice', component: BackofficeLayoutComponent,
//         // canActivate: [AuthGuard], data: { roles: ['ROLE_ADMIN'] },
//         loadChildren: () => import('./modules/backoffice/backoffice.module').then(m => m.BackofficeModule),

//       },
//       {
//         path: 'arriere', component: ArriereLayoutComponent,
//         // canActivate: [AuthGuard], data: { roles: ['ROLE_ARRIERE'] },
//         loadChildren: () => import('./modules/arriere/arriere.module').then(m => m.ArriereModule),

//       },

//             { path: 'notfound', component: NotfoundComponent },
//             { path: 'drp', loadChildren: () => import('./modules/drp/drp.module').then(m => m.DrpModule) },
//             { path: 'centreTri', loadChildren: () => import('./modules/centre-tri/centre-tri.module').then(m => m.CentreTriModule) },
//             { path: '**', redirectTo: '/notfound' },
//         ], { scrollPositionRestoration: 'enabled', anchorScrolling: 'enabled',  })
//     ],
//     exports: [RouterModule]
// })
// export class AppRoutingModule {
// }
