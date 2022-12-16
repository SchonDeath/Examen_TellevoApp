import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { HomeConductorPageRoutingModule } from './home-conductor-routing.module';

import { HomeConductorPage } from './home-conductor.page';
import { ComponentsModule } from 'src/app/components/components.module';
import { ServicesModule } from 'src/app/services/services.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HomeConductorPageRoutingModule,
    ComponentsModule,
    ServicesModule
  ],
  declarations: [HomeConductorPage]
})
export class HomeConductorPageModule {}
