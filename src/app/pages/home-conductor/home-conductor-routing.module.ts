import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeConductorPage } from './home-conductor.page';

const routes: Routes = [
  {
    path: '',
    component: HomeConductorPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HomeConductorPageRoutingModule {}
