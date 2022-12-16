import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { LoginConductorPageRoutingModule } from './login-conductor-routing.module';

import { LoginConductorPage } from './login-conductor.page';
import { ComponentsModule } from 'src/app/components/components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    LoginConductorPageRoutingModule,
    ReactiveFormsModule,
    ComponentsModule
  ],
  declarations: [LoginConductorPage]
})
export class LoginConductorPageModule {}
