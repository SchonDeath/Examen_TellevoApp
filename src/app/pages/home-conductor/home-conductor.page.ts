import { Component, OnInit } from '@angular/core';
import { LoadingController, MenuController, ToastController } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-home-conductor',
  templateUrl: './home-conductor.page.html',
  styleUrls: ['./home-conductor.page.scss'],
})
export class HomeConductorPage implements OnInit {

  pageTitle='home';
  isNotHome = false;

  constructor(private router:Router, private authService: AuthService,private menu: MenuController,private alertCtrl:AlertController,private loadingctrl:LoadingController,private toast: ToastController) { this.menu.enable(true)}

  ngOnInit() {
  }

  onClick() {
    this.authService.logout()
      .then(response => {
        console.log(response);
        this.router.navigate(['/login-conductor']);
      })
      .catch(error => console.log(error))
  }
  async logout(){
    await this.authService.logout();
    this.router.navigateByUrl('/',{replaceUrl:true})
  
    this.alertPresent('Error al Iniciar Sesión','Inténtelo nuevamente');
  }
  alertPresent(arg0: string, arg1: string) {
    throw new Error('Method not implemented.');
  }
}
