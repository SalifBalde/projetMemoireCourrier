
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
import {MessagerieLayoutComponent} from "./layout/messagerie-layout/messagerie.layout.component";
import {MessageriePacketLayoutComponent} from "./layout/messageriePacket-layout/messageriePacket.layout.component";
import {ResponsableAnnexeLayoutComponent} from "./layout/responsable-annexe-layout/responsable-annexe.layout.component";
import { DroLayoutComponent } from './layout/dro-layout/dro.layout.component';
import {DclLayoutComponent} from "./layout/dcp-layout/dcl.layout.component";


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
        path: 'receveur', component: ReceveurLayoutComponent, canActivate: [AuthGuard], data: { roles: ['ROLE_RECEVEUR'] },
        loadChildren: () => import('./modules/receveur/receveur.module').then(m => m.ReceveurModule),

      },
        {
        path: 'responsableannnexe', component: ResponsableAnnexeLayoutComponent, canActivate: [AuthGuard], data: { roles: ['ROLE_RESPONSABLE_ANNEXE'] },
        loadChildren: () => import('./modules/responsable-annexe/Responsableannexe.module').then(m => m.ResponsableannexeModule),

      },
      {
        path: 'guichet', component: GuichetLayoutComponent,   canActivate: [AuthGuard], data: { roles: ['ROLE_GUICHET'] },
        loadChildren: () => import('./modules/guichet/guichet.module').then(m => m.GuichetModule),

      },
      {
        path: 'backoffice', component: BackofficeLayoutComponent,  canActivate: [AuthGuard], data: { roles: ['ROLE_ADMIN'] },
        loadChildren: () => import('./modules/backoffice/backoffice.module').then(m => m.BackofficeModule),

      },
      {
        path: 'arriere', component: ArriereLayoutComponent, canActivate: [AuthGuard], data: { roles: ['ROLE_ARRIERE'] },
        loadChildren: () => import('./modules/arriere/arriere.module').then(m => m.ArriereModule),

      },
      {
        path: 'ct', component: CtLayoutComponent,  canActivate: [AuthGuard], data: { roles: ['ROLE_CT'] },
        loadChildren: () => import('./modules/centre-tri/centre-tri.module').then(m => m.CentreTriModule),

      },
        {
            path: 'messagerie', component: MessagerieLayoutComponent, canActivate: [AuthGuard], data: { roles: ['ROLE_MESSAGERIE'] },
            loadChildren: () => import('./modules/messagerie/messagerie.module').then(m => m.MessagerieModule),

        }, {
            path: 'messageriePacket', component: MessageriePacketLayoutComponent, canActivate: [AuthGuard], data: { roles: ['ROLE_MESSPAQUET'] },
            loadChildren: () => import('./modules/massagerie-packet/courrier-importrcep.module').then(m => m.CourrierImportrcepModule),

        },
      {
        path: 'drp', component: DrpLayoutComponent, canActivate: [AuthGuard], data: { roles: ['ROLE_DRP'] },
        loadChildren: () => import('./modules/drp/drp.module').then(m => m.DrpModule),

      },
        {
        path: 'dcl', component: DclLayoutComponent, canActivate: [AuthGuard], data: { roles: ['ROLE_DCL'] },
        loadChildren: () => import('./modules/dcl/dcl.module').then(m => m.DclModule),

      },
      {
        path: 'dro', component: DroLayoutComponent, canActivate: [AuthGuard], data: { roles: ['ROLE_DRO'] },
        loadChildren: () => import('./modules/dro/dro.module').then(m => m.DroModule),

      },
            { path: 'notfound', component: NotfoundComponent },
            { path: '**', redirectTo: '/notfound' },
        ], { scrollPositionRestoration: 'enabled', anchorScrolling: 'enabled',  })
    ],
    exports: [RouterModule]
})
export class AppRoutingModule {}
