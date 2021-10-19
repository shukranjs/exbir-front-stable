import { Injectable } from '@angular/core';
import { Email } from '../entities/email';
import { ApiService } from './api.service';

@Injectable()
export class EmailService {
  constructor(private apiService: ApiService) { }

  sendCommercialEmail(email: Email){
    return this.apiService.post('api/emails/commercial', email);
  }

  sendContactEmail(email: Email){
    return this.apiService.post('api/emails/contact', email);
  }
}
