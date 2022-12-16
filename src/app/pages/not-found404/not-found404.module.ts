import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { NotFound404PageRoutingModule } from './not-found404-routing.module';

import { NotFound404Page } from './not-found404.page';
import { ComponentsModule } from 'src/app/components/components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    NotFound404PageRoutingModule,
    ComponentsModule,
  ],
  declarations: [NotFound404Page]
})
export class NotFound404PageModule {}
