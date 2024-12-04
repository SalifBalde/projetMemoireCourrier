import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
<<<<<<<< HEAD:src/app/modules/guichet/colis/colis-routing.module.ts
import { ColisComponent } from './colis.component';

const routes: Routes = [{ path: '', component: ColisComponent }];
========
import { RegimeComponent } from './regime.component';

const routes: Routes = [{ path: '', component: RegimeComponent }];
>>>>>>>> Seny:src/app/modules/backoffice/regime/regime-routing.module.ts

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
<<<<<<<< HEAD:src/app/modules/guichet/colis/colis-routing.module.ts
export class ColisRoutingModule { }
========
export class RegimeRoutingModule { }
>>>>>>>> Seny:src/app/modules/backoffice/regime/regime-routing.module.ts
