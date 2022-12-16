import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PaginaCargaPage } from './pagina-carga.page';

const routes: Routes = [
  {
    path: '',
    component: PaginaCargaPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PaginaCargaPageRoutingModule {}
