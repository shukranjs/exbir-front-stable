import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { User } from 'src/app/entities/user';
import { AuthService } from 'src/app/services/auth.service';
import { TrackService } from 'src/app/services/track.service';
import { Title } from '@angular/platform-browser';
import { OrderService } from 'src/app/services/order.service';
import { AlertifyService } from '../../services/alertify.service';
declare var require: any;

@Component({
	selector: 'app-dashboard',
	templateUrl: './dashboard.component.html',
	styleUrls: [ './dashboard.component.css' ],
	providers: [ UserService, TrackService, OrderService ]
})
export class DashboardComponent implements OnInit {
	currentUser: User = new User();
	completedCount = 0;
	notCompletedCount = 0;
	// last30DaysPackageSum = 0;
	orderCount = 0;
	trClicked = true;
	usClicked = false;
	chClicked = false;
	rightNow: any;

	constructor(
		private userService: UserService,
		private authService: AuthService,
		private trackService: TrackService,
		private orderService: OrderService,
		private titleService: Title,
		private alertifyService: AlertifyService
	) {}

	ngOnInit() {
		this.titleService.setTitle('İstifadəçi Paneli');
		this.alertifyService.showSpinner();
		if (this.authService.loggedIn()) {
			this.userService.connection().subscribe((data: any) => {
				this.currentUser = data;
				this.alertifyService.hideSpinner();
			});

			this.trackService
				.getCompletedCount()
				.subscribe((data: any) => (this.completedCount = data));
			this.trackService
				.getNotCompletedCount()
				.subscribe((data: any) => (this.notCompletedCount = data));
			// this.trackService
			//   .getLas30DaysPackageSum()
			//   .subscribe((data: any) => (this.last30DaysPackageSum = data));
			this.orderService
				.getCount()
				.subscribe((data: any) => (this.orderCount = data));
		}
	}
}
