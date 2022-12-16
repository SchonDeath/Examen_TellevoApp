import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PaginaCargaPageRoutingModule } from './pagina-carga-routing.module';

import { PaginaCargaPage } from './pagina-carga.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PaginaCargaPageRoutingModule
  ],
  declarations: [PaginaCargaPage]
})
export class PaginaCargaPageModule {}
