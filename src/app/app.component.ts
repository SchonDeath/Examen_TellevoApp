import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Camera } from '@capacitor/camera';
import { CameraResultType, CameraSource } from '@capacitor/camera/dist/esm/definitions';
import { AlertController, LoadingController } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth.service';
import { PpictureService } from './services/ppicture.service';
import { User } from './services/user';
import { UserService } from 'src/app/services/user.service';
import { ModalController, ToastController } from '@ionic/angular';
import { defineCustomElements } from '@ionic/pwa-elements/loader';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent{
  
  user: User[]=[];
  profile=null
  public appPages = [
    { title: 'Inicio', url: '/home', icon: 'home' },
    { title: 'Viajar', url: '/buscar-viaje', icon: 'car' },
    { title: 'Perfil', url: '/profile', icon: 'person-circle' },
    { title: 'Conversor Dolar/Euro', url: '/coversor', icon: 'cash' },
    { title: 'Nostros', url: '/about', icon: 'help-buoy' },
    
  ];
 
  
  constructor(
    
    private authService:AuthService, 
    private alertCtrl: AlertController,
    private loadingCtrl: LoadingController,
    private router:Router,
    private ppictureService:PpictureService,
    private modalCtrl: ModalController,
    
   ) 
    {
      defineCustomElements(window);

      this.ppictureService.getUserProfile().subscribe((data)=>{
        this.profile=data;
      });
    }
    cargarPpicture(){
      this.ppictureService.getUserProfile().subscribe(respuesta => {
        this.profile = respuesta;
      })
    }
  
    async uploadPpicture(){
      const ppicture = await Camera.getPhoto({
        quality:90,
        allowEditing:false,
        resultType:CameraResultType.Base64,
        source:CameraSource.Camera //Photo o prompt
      });
      console.log(ppicture);
  
      if(ppicture){
        const loading = await this.loadingCtrl.create();
        await loading.present();
        const result = await this.ppictureService.uploadPpicture(ppicture);
        loading.dismiss();
  
        if(!result){
          this.alertPresent('Carga foto de perfil fallida','Se ha producido un error, inténtelo más rato.');
        }
      }
    }
    async alertPresent(header:string,message:string){
      const alert = await this.alertCtrl.create({
        header:header,
        message:message,
        buttons: ['OK']
      });
      await alert.present();
    }
    
}
