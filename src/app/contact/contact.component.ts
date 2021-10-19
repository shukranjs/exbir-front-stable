import {Component, OnInit} from '@angular/core';
import {NgForm} from "@angular/forms";
import {NotificationService} from "../services/notification.service";
import {ContactService} from "../services/contact.service";

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {
  emailData: any = {};

  constructor(private email: ContactService, private notification: NotificationService) {
  }

  ngOnInit() {
  }

  sendEmail(contactForm: NgForm) {
    this.email.contactEmail(this.emailData).subscribe(data => {
      this.notification.success('Email göndərildi');
    });
  }
}
