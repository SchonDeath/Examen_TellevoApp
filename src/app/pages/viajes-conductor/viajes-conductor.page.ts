import { Component, OnInit } from '@angular/core';
import { AlertController, ModalController, ToastController } from '@ionic/angular';
import { Pasajero } from 'src/app/services/pasajeros';
import { PasajerosService } from 'src/app/services/pasajeros.service';
import { ModalPage } from '../modal/modal.page';


@Component({
  selector: 'app-viajes-conductor',
  templateUrl: './viajes-conductor.page.html',
  styleUrls: ['./viajes-conductor.page.scss'],
})
export class ViajesConductorPage implements OnInit {

  pageTitle='Viajes';
  isNotHome = true;

  listadoPasajero: Pasajero[] = [];

  constructor(private pasajerosService: PasajerosService, private alertCtrl: AlertController, private modalCtrl:ModalController,private toastCtrl:ToastController) {
    this.getPasajeros();
    
  }

  getPasajeros(): void {
    this.pasajerosService.getPasajeros().subscribe(respuesta => {
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
          handler: (data) => {
            this.pasajerosService.addPasajero(data);
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

  ngOnInit() {
  }

}
