import { Component, OnInit,Input } from '@angular/core';
import { Router } from '@angular/router';
import { Camera } from '@capacitor/camera';
import { CameraResultType, CameraSource } from '@capacitor/camera/dist/esm/definitions';
import { AlertController, LoadingController } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth.service';
import { PpictureService } from 'src/app/services/ppicture.service';
import { User } from 'src/app/services/user';
import { Observable } from 'rxjs';
import { UserService } from 'src/app/services/user.service';
import { ModalController, ToastController } from '@ionic/angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';



@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
  })

export class ProfilePage implements OnInit {
  pageTitle = 'Profile';
  isNotHome = true;
  //@Input() id:string;
  profile: any = null;
  user: User[]=[];
  uid:string =null;
  profilecredentials!:FormGroup;
  

  constructor(private authService:AuthService, 
    private ppictureService: PpictureService,
    private alertCtrl: AlertController,
    private loadingCtrl: LoadingController,
    private router:Router,
    private formbuilder: FormBuilder,
    private userService:UserService, private modalCtrl:ModalController,
    private toastCtrl:ToastController) {
      this.cargarAvatar();
      this.getUserProfile();
    }
    
    ngOnInit(): void {
      this.createForm();
      
    }
        
  
    getUserProfile(){
      this.userService.getUserProfile().subscribe((respuesta: any) => {
        this.profile = respuesta;
        console.log(respuesta)
        this.fillForm();
      })
    }

    async logout(){
      await this.authService.logout();
      this.router.navigateByUrl('/',{replaceUrl:true});
    }
  
    cargarAvatar(){
      this.userService.getUserProfile().subscribe(respuesta => {
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
  
      if(ppicture){
        const loading = await this.loadingCtrl.create();
        await loading.present();
        const result = await this.ppictureService.uploadPpicture(ppicture);
        loading.dismiss();
  
        if(!result){
          this.alertPresent('Carga avatar fallida','Se ha producido un error, inténtelo más rato.');
        }
      }
    }
    get email(){
      return this.profilecredentials?.get('email');
    }
  
    get name(){
      return this.profilecredentials?.get('name');
    }
  
    get lastname(){
      return this.profilecredentials?.get('lastname');
    }
  
    get address(){
      return this.profilecredentials?.get('address');
    }
    
    get region(){
      return this.profilecredentials?.get('region');
    }
    createForm(){
 
        this.profilecredentials = this.formbuilder.group({
          email: ['', [Validators.required,Validators.email]],
          name: ['', [Validators.required]],
          lastname: ['', [Validators.required]],
          address: ['', Validators.required],
          region: ['', Validators.required],
          campus: ['', Validators.required],
        });
      }
    
      async alertPresent(header:string, message: string) {
        const alert = await this.alertCtrl.create({
          header: header,
          message: message,
          buttons: ['OK']
        })
      }

    fillForm() {
      this.profilecredentials.patchValue({
        email: this.profile?.email,
        name: this.profile?.name,
        lastname: this.profile?.lastname,
        address: this.profile?.address,
        region: this.profile?.region,
        campus: this.profile?.campus,
        car: this.profile?.car,
        tripCost: this.profile?.tripCost
      })
    }

    updateProfile() {
      console.log(this.profilecredentials.value)
      this.authService.updateUser(this.profilecredentials.value);
    }

    
}
