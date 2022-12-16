import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { BuscarViajePageRoutingModule } from './buscar-viaje-routing.module';

import { BuscarViajePage } from './buscar-viaje.page';
import { ComponentsModule } from 'src/app/components/components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    BuscarViajePageRoutingModule,
    ComponentsModule
  ],
  declarations: [BuscarViajePage]
})
export class BuscarViajePageModule {}
