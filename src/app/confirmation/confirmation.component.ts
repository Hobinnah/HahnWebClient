import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { MessageService } from '../services/messageService/message.service';
import { Alert } from '../models/models';

@Component({
  selector: 'app-confirmation',
  templateUrl: './confirmation.component.html',
  styleUrls: ['./confirmation.component.css']
})
export class ConfirmationComponent implements OnInit {

  alert: Alert;
  constructor(private messageService: MessageService, private route: Router) { }

  ngOnInit() {

    this.alert = this.messageService.ShowSuccessAlert('Applicant was successfully saved.');
    this.messageService.sendAlertMessage(this.alert);

  }

  back() {
    this.route.navigateByUrl('applicants');
  }

}
