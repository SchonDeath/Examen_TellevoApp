import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Geolocation } from '@capacitor/geolocation';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

const apiClimaUrl = environment.apiClimaUrl;
const apiClimaKey = environment.apiClimaKey;


@Component({
  selector: 'app-weather',
  templateUrl: './weather.component.html',
  styleUrls: ['./weather.component.scss'],
})
export class WeatherComponent implements OnInit {
  weatherTemp :any
  weatherCity: any
  weatherDescription :any
  coordenadas :any
  latitud :any
  longitud :any
  todayDate = new Date()

  constructor(private router: Router,public httpClient:HttpClient) {
    this.fetchLocation()
   }
   async fetchLocation(){
    const location = await Geolocation.getCurrentPosition();
      this.coordenadas = location['coords'];
      this.latitud = this.coordenadas['latitude'];
      this.longitud = this.coordenadas['longitude'];
      this.loadData();
  }

  ngOnInit() {}
  loadData(){
    this.httpClient.get(`${apiClimaUrl}/weather?lat=${this.latitud}&lon=${this.longitud}&appid=${apiClimaKey}&units=metric`).subscribe(results =>{
    this.weatherTemp = results['main'];
    this.weatherCity = results['name'];
    this.weatherDescription = results['weather'];
    this.weatherDescription = this.weatherDescription['0'];
  })
}

}
