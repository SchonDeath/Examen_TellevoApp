import { NgModule } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { WeatherComponent } from 'src/app/services/weather/weather.service';
import { CommonModule } from '@angular/common';

@NgModule({
  imports: [
    IonicModule,
    CommonModule
],
  declarations: [
    WeatherComponent
],
  exports: [
    WeatherComponent,
    IonicModule
],
})
export class ServicesModule{}
