import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, ToastController } from '@ionic/angular';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  pagetitle='register';
  isNotHome=true;

  formularioRegistro: FormGroup;

  constructor(public fb: FormBuilder, public alertController: AlertController, toastController: ToastController, private router:Router) {
    
    this.formularioRegistro = this.fb.group({
      'user': new FormControl("",Validators.required),
      'contraseña': new FormControl("",Validators.required),
      'confirmarContraseña': new FormControl("", Validators.required)
    });
   }

  ngOnInit() {
  }

  

  async guardar(){
    var f = this.formularioRegistro.value;

    if(this.formularioRegistro.invalid){
      const alert = await this.alertController.create({
        header: 'Datos incompletos',
        message: 'Tienes que llenar todos los datos',
        buttons: ['Aceptar']
      });

      await alert.present();
      return;
    }
    else(this.formularioRegistro.valid)
      const alert = await this.alertController.create({
        header: 'Registrado correctamente',
        buttons: ['Aceptar']
      });

      await alert.present();
      return this.router.navigate(['/login']);
    
    

    var usuario = {
      user: f.user,
      contraseña: f.contraseña
    }

    localStorage.setItem('usuario',JSON.stringify(usuario));
  }

  

}
