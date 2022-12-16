import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { NotFound404Page } from './not-found404.page';

const routes: Routes = [
  {
    path: '',
    component: NotFound404Page
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class NotFound404PageRoutingModule {}
