import { HttpClient } from '@angular/common/http';
import { Component, Injectable, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { Geolocation } from '@capacitor/geolocation';
import { Observable } from 'rxjs';


const apiClimaUrl = environment.apiClimaUrl;
const apiClimaKey = environment.apiClimaKey;

@Component({
  selector: 'weather-service',
  templateUrl: './Weather.service.html',
  styleUrls: ['./weather.service.scss'],
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

  ngOnInit() {
  }

  loadData(){
      this.httpClient.get(`${apiClimaUrl}/weather?lat=${this.latitud}&lon=${this.longitud}&appid=${apiClimaKey}&units=metric`).subscribe(results =>{
      this.weatherTemp = results['main'];
      this.weatherCity = results['name'];
      this.weatherDescription = results['weather'];
      this.weatherDescription = this.weatherDescription['0'];
    })
  }

}

@Injectable({
  providedIn: 'root'
})
export class WeatherService {

  constructor(private http:HttpClient) { }

  obtenerWeather(): Observable<any> {
    return this.http.get(`${environment.apiClimaUrl}lat={-20.61631917607444}&lon={-10.49992188566094}`);
  }

}