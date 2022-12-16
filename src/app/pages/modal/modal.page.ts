import { Component, OnInit, Input } from '@angular/core';
import { ModalController, ToastController } from '@ionic/angular';
import { Pasajero } from 'src/app/services/pasajeros';
import { PasajerosService } from 'src/app/services/pasajeros.service';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.page.html',
  styleUrls: ['./modal.page.scss'],
})
export class ModalPage implements OnInit {


  @Input() id: string = '';
  pasajero: Pasajero = null;

  constructor(private pasajerosService: PasajerosService, private modalCtrl: ModalController, private toastCtrl: ToastController) { }

  ngOnInit() {
    this.getPasajero();
  }

  getPasajero(){
    this.pasajerosService.getPasajeroById(this.id).subscribe(respuesta => {
      this.pasajero = respuesta;
    });
  }

  async updatePasajero(){
    this.pasajerosService.updatePasajero({...this.pasajero,estado: 'aceptado'});
    this.modalCtrl.dismiss();
    this.toastPresent('Viaje aceptado');
  }

  async deletePasajero() {
    this.pasajerosService.deletePasajero({...this.pasajero,estado: 'cancelado'});
    this.modalCtrl.dismiss();
    this.toastPresent('Viaje cancelado');
  }

  async toastPresent(message:string){
    const toast = await this.toastCtrl.create({
      message:message,
      duration:1000,
    })
    toast.present();
  }

}
