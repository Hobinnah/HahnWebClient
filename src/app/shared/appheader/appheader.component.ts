import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-appheader',
  templateUrl: './appheader.component.html',
  styleUrls: ['./appheader.component.css']
})
export class AppheaderComponent implements OnInit {

  roles: any;
  administrator = false;

  username = 'Eze Obinna J';
  role = 'Software Engineer';
  constructor() {

  }

   ngOnInit() {}

   logout() {


   }

   globalPolicySearch(value) {


  }

}
