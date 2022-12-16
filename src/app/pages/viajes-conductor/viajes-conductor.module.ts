import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ViajesConductorPageRoutingModule } from './viajes-conductor-routing.module';

import { ViajesConductorPage } from './viajes-conductor.page';
import { ComponentsModule } from 'src/app/components/components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ViajesConductorPageRoutingModule,
    ComponentsModule
  ],
  declarations: [ViajesConductorPage]
})
export class ViajesConductorPageModule {}
