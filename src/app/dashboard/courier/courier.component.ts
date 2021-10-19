import { Component, OnInit } from '@angular/core';
import { CourierService } from '../../services/courier.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NgForm } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { Track } from '../../entities/track';
import { Courier } from '../../entities/courier';
import { TrackService } from '../../services/track.service';
import { CourierForReceive } from '../../entities/courierForReceive';
import { CourierForUpdate } from '../../entities/courierForUpdate';
import { AuthService } from '../../services/auth.service';
import { NotificationService } from '../../services/notification.service';
import { PaymentToSend } from '../../entities/paymentToSend';
import { User } from '../../entities/user';
import { UserService } from '../../services/user.service';
declare var require: any;
declare var $: any;

@Component({
	selector: 'app-courier',
	templateUrl: './courier.component.html',
	styleUrls: [ './courier.component.css' ]
})
export class CourierComponent implements OnInit {
	couriers: CourierForReceive[] = [];
	courier: Courier = new Courier();
	courierForUpdate: CourierForUpdate = new CourierForUpdate();
	tracks: Track[] = [];
	mobileCode = '99450';
	weight = 0.0;
	wallet: number;
	paymentToSend: PaymentToSend = new PaymentToSend();
	isVisa = false;
	isMastercard = false;
	selectedPackages: any = [];
	packagesForPayment: Track[] = [];
	paymentMethod = 'wallet';
	courierSelected: CourierForReceive = new CourierForReceive();
	usdToAzn: number;
	rightNow: any;
	currentUser: User = new User();

	constructor(
		private courierService: CourierService,
		private modalService: NgbModal,
		private titleService: Title,
		private trackService: TrackService,
		private authService: AuthService,
		private userService: UserService,
		private notificationService: NotificationService
	) {}

	ngOnInit() {
		this.titleService.setTitle('Kuryerlərim');
		this.getCouriers();
		this.userService.connection().subscribe((data: User) => {
			this.currentUser = data;
			this.wallet = data.wallet_usd;
		});

		// this.usdToAzn = parseFloat(localStorage.getItem('1USDTOAZN'));
		this.usdToAzn = 1.7;
	}

	getCouriers() {
		this.courierService.getAll().subscribe((data: CourierForReceive[]) => {
			this.couriers = data;
		});
		this.trackService.getTracks().subscribe((data: any) => {
			this.tracks = data;
			this.tracks.forEach((t) => {
				if (
					t.current_state.toString() === 'InternalStorage' &&
					t.courier_id === null
				) {
					this.packagesForPayment.push(t);
				}
			});
		});
	}

	open(content, courier) {
		this.courierSelected = courier;
		this.modalService.open(content);
	}

	addNoPackageCourier(courierForm: NgForm) {
		if (
			this.wallet < this.paymentToSend.amount &&
			this.paymentMethod === 'wallet'
		) {
			this.notificationService.error('Balansda kifayət qədər məbləğ yoxdur.');
			return;
		}
		this.courier.payment_method = this.paymentMethod;
		this.courier.user_id = this.authService.getCurrentUserId();
		this.courier.amount = this.paymentToSend.amount.toString();
		this.courier.weight = this.weight.toString();

		this.courier.user_mobile_number =
			this.mobileCode + this.courier.user_mobile_number;
		this.courier.mobile_number = this.currentUser.mobile_number;
		this.courierService
			.addNonPackageCourier(this.courier)
			.subscribe((data: Courier) => {
				this.notificationService.success('Kuryer sifarişiniz alındı.');
			});
		// tslint:disable-next-line:variable-name
		this.delay(1000).then((any) => {
			this.modalService.dismissAll();
			this.getCouriers();
		});
	}

	addCourier(courierForm: NgForm) {
		if (
			this.wallet < this.paymentToSend.amount &&
			this.paymentMethod === 'wallet'
		) {
			this.notificationService.error('Balansda kifayət qədər məbləğ yoxdur.');
			return;
		}
		this.courier.payment_method = this.paymentMethod;
		this.courier.user_id = this.authService.getCurrentUserId();
		this.courier.amount = this.paymentToSend.amount.toString();
		this.courier.weight = this.weight.toString();
		this.courier.tracking_numbers = this.selectedPackages;
		this.courier.user_mobile_number =
			this.mobileCode + this.courier.user_mobile_number;
		this.courierService.add(this.courier).subscribe((data: Courier) => {
			this.notificationService.success('Kuryer sifarişiniz alındı.');
		});

		// tslint:disable-next-line:variable-name
		this.delay(1000).then((any) => {
			this.modalService.dismissAll();
			this.getCouriers();
		});
	}

	async delay(ms: number) {
		await new Promise((resolve) => setTimeout(() => resolve(), ms)).then(() =>
			console.log('added')
		);
	}

	openForUpdate(courierUpdateModal, courier: CourierForUpdate) {
		// this.courierForUpdate.address = courier.address;
		this.courierForUpdate.id = courier.id;
		this.courierForUpdate.user_id = this.authService.getCurrentUserId();
		this.modalService.open(courierUpdateModal, {
			ariaLabelledBy: 'modal-basic-title'
		});
	}

	updateCourier(courierUpdateForm: NgForm) {
		this.modalService.dismissAll();
		this.courierService
			.update(this.courierForUpdate)
			.subscribe((data: any) => {
				this.delay(1000).then((any) => {
					this.getCouriers();
				});
				this.notificationService.success('Kuryer uğurla tənzimləndi.');
			});
	}

	calculatePaymentAmount() {
		if (this.selectedPackages.length > 0) {
			this.paymentToSend.amount = Number(this.courier.amount);
			// tslint:disable-next-line:variable-name
			let total_weight = 0;
			this.packagesForPayment.forEach((t) => {
				if (this.selectedPackages.includes(t.tracking_number)) {
					total_weight += t.weight;
				}
			});
			if (total_weight > 3) {
				this.paymentToSend.amount += (total_weight - 3) / 1 * 0.6;
			}
		} else {
			this.paymentToSend.amount = 0;
		}
	}

	calculatePaymentAmountForNoPackage() {
		this.paymentToSend.amount = Number(this.courier.amount);
		// tslint:disable-next-line:variable-name
		if (this.weight > 1.0) {
			this.paymentToSend.amount +=
				(this.weight - 1) / 0.5 * (2.5 / this.usdToAzn);
		}
	}

	cardNumber2Focus() {
		const cardNumber1Value = $('#card_number_1').val();
		if (cardNumber1Value[0] === '4') {
			this.isVisa = true;
		} else if (cardNumber1Value[0] === '5') {
			this.isMastercard = true;
		} else {
			this.isVisa = false;
			this.isMastercard = false;
		}
		if (cardNumber1Value.length > 3) {
			$('#card_number_2').focus();
		}
	}

	cardNumber3Focus() {
		if ($('#card_number_2').val().length > 3) {
			$('#card_number_3').focus();
		}
	}

	cardNumber4Focus() {
		if ($('#card_number_3').val().length > 3) {
			// tslint:disable-next-line:no-unused-expression
			$('#card_number_4').focus();
		}
	}

	openLg(courierModal, lg: string) {
		this.modalService.open(courierModal, { size: 'lg' });
		this.delay(500).then((any) => {
			$('.selectpicker').selectpicker();
		});
	}
}
