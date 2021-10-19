import { Injectable } from '@angular/core';
import {ApiService} from "./api.service";

@Injectable({
  providedIn: 'root'
})
export class ContactService {
  constructor(private apiService: ApiService) { }
  contactEmail(emailData: any) {
    return this.apiService.post('/email/contact', emailData);
  }
  commercialEmail(emailData: any) {
    return this.apiService.post('/email/commercial', emailData);
  }
}
