import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SidebarToggleService {
  isCollapsed = true;
  constructor() { }
  toggle() {
    this.isCollapsed = !this.isCollapsed;
  }
}
