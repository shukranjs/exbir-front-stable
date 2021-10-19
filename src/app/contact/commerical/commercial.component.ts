import {Component, OnInit} from '@angular/core';
import {NgForm} from "@angular/forms";
import {ContactService} from "../../services/contact.service";
import {NotificationService} from "../../services/notification.service";

@Component({
  selector: 'app-commerical',
  templateUrl: './commercial.component.html',
  styleUrls: ['./commercial.component.css']
})
export class CommercialComponent implements OnInit {
  emailData: any = {type_of_service: 'Fast delivery'};

  constructor(private email: ContactService, private notification: NotificationService) {
  }

  ngOnInit() {
  }

  sendEmail(commercialEmailForm: NgForm) {
    this.email.commercialEmail(this.emailData).subscribe(data => {
      this.notification.success('Email göndərildi');
    });
  }
}
