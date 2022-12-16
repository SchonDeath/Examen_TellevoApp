import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-fab-menu',
  templateUrl: './fab-menu.component.html',
  styleUrls: ['./fab-menu.component.scss'],
})
export class FabMenuComponent implements OnInit {

  constructor(private route: Router, private navCtrl: NavController) { }

  ngOnInit() {}

  goContact() {
    this.route.navigate(['/contact']);
  }

  goNewsByUrl(){
    this.route.navigateByUrl('/news');
  }

  goWeatherNavCtrl(){
    this.navCtrl.navigateForward('/weather');
  }

}
