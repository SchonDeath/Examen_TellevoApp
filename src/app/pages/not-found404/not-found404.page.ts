import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-not-found404',
  templateUrl: './not-found404.page.html',
  styleUrls: ['./not-found404.page.scss'],
})
export class NotFound404Page implements OnInit {

  pageTitle='404';
  isNotHome=true;

  constructor() { }

  ngOnInit() {
  }

}
