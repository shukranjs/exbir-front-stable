import {Component, OnInit} from '@angular/core';
import {SidebarToggleService} from "../../services/sidebar-toggle.service";

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  constructor(public sidebarService: SidebarToggleService) {
  }

  ngOnInit() {
  }
}
