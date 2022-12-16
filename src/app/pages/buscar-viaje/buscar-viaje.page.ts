import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';

import { Geolocation } from '@ionic-native/geolocation/ngx';
import { NativeGeocoder, NativeGeocoderResult, NativeGeocoderOptions } from '@ionic-native/native-geocoder/ngx';
import { AlertController, ModalController, ToastController } from '@ionic/angular';
import { Pasajero } from 'src/app/services/pasajeros';
import { PasajerosService } from 'src/app/services/pasajeros.service';
import { ModalPage } from '../modal/modal.page' 

declare var google;


@Component({
  selector: 'app-buscar-viaje',
  templateUrl: './buscar-viaje.page.html',
  styleUrls: ['./buscar-viaje.page.scss'],
})
export class BuscarViajePage implements OnInit {

  pageTitle='buscar viaje';
  isNotHome = true;

  listadoPasajero: Pasajero[] = []

  @ViewChild('map', { static: false }) mapElement: ElementRef;
  map: any;
  address: string;

  latitude: number;
  longitude: number;

  constructor(
    private geolocation: Geolocation,
    private nativeGeocoder: NativeGeocoder,
    private pasajeroService: PasajerosService,
    private alertCtrl: AlertController,
    private modalCtrl: ModalController,
    private toastCtrl: ToastController
  ) { 
    this.getPasajeros();
  }

  ngOnInit() {
    this.loadMap()
  }

  loadMap() {
    this.geolocation.getCurrentPosition().then((resp) => {

      this.latitude = resp.coords.latitude;
      this.longitude = resp.coords.longitude;

      let latLng = new google.maps.LatLng(resp.coords.latitude, resp.coords.longitude);
      let mapOptions = {
        center: latLng,
        zoom: 15,
        mapTypeId: google.maps.MapTypeId.ROADMAP
      }

      this.getAddressFromCoords(resp.coords.latitude, resp.coords.longitude);

      this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);

      this.map.addListener('dragend', () => {

        this.latitude = this.map.center.lat();
        this.longitude = this.map.center.lng();

        this.getAddressFromCoords(this.map.center.lat(), this.map.center.lng())
      });

    }).catch((error) => {
      console.log('Error getting location', error);
    });
  }

  getAddressFromCoords(lattitude, longitude) {
    console.log("getAddressFromCoords " + lattitude + " " + longitude);
    let options: NativeGeocoderOptions = {
      useLocale: true,
      maxResults: 5
    };

    this.nativeGeocoder.reverseGeocode(lattitude, longitude, options)
      .then((result: NativeGeocoderResult[]) => {
        this.address = "";
        let responseAddress = [];
        for (let [key, value] of Object.entries(result[0])) {
          if (value.length > 0)
            responseAddress.push(value);

        }
        responseAddress.reverse();
        for (let value of responseAddress) {
          this.address += value + ", ";
        }
        this.address = this.address.slice(0, -2);
      })
      .catch((error: any) => {
        this.address = "Dirección no disponible!";
      });

  }

  getPasajeros(): void {
    this.pasajeroService.getPasajeros().subscribe(respuesta => {
      console.log(respuesta);
      this.listadoPasajero = respuesta;
    })
  }

  async openDetailPasajero(pasajero:Pasajero) {  
    const modal = await this.modalCtrl.create({
      component: ModalPage,
      componentProps: { id: pasajero.id },
      breakpoints: [0,0.5,0.8],
      initialBreakpoint:0.5
    });
    modal.present();
  }

  async addPasajero() {
    const alert = await this.alertCtrl.create({
      header:'Buscar Viaje',
      inputs: [
        {
          name:'name',
          type:'text',
          placeholder:'Nombre'
        },
        {
          name:'lastname',
          type:'text',
          placeholder:'Apellido',
        },
        {
          name:'direccion',
          type:'text',
          placeholder:'Direccion'
        },
        {
          name:'destino',
          type:'text',
          placeholder:'Destino',
        },
        {
          name:'tipodepago',
          type:'text',
          placeholder:'Tipo de pago'
        }
      ],
      buttons: [
        {
          text:'Cancelar',
          role:'cancel',
        },
        {
          text:'Buscar Viaje',
          role:'confirm',
          handler: (data: Pasajero) => {
            data.estado = 'pendiente';
            this.pasajeroService.addPasajero(data);
            this.toastPresent('Solicitud enviada, espere confirmación.'); 
          }
        }
      ]
      });
      await alert.present();
    }

    async toastPresent(message:string){
      const toast = await this.toastCtrl.create({
        message:message,
        duration:1000,
      })
      toast.present();
    }

}
