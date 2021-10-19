/* tslint:disable:variable-name */
import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { TrackService } from 'src/app/services/track.service';
import { Track } from 'src/app/entities/track';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Title } from '@angular/platform-browser';
import { NgForm } from '@angular/forms';
import { CourierService } from 'src/app/services/courier.service';
import { AlertifyService } from 'src/app/services/alertify.service';
import { ProductCategory } from '../../enums/productCategory';
import { TrackToAdd } from '../../entities/trackToAdd';
import { AuthService } from '../../services/auth.service';
import { Country } from '../../enums/country';
import { NotificationService } from '../../services/notification.service';
import { TrackToUpdate } from '../../entities/trackToUpdate';
import { PaymentToSend } from '../../entities/paymentToSend';
import { UserService } from '../../services/user.service';
import { User } from '../../entities/user';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Category } from '../../entities/category';

declare var $: any;

@Component({
	selector: 'app-tracks',
	templateUrl: './tracks.component.html',
	styleUrls: [ './tracks.component.css' ],
	providers: [ TrackService, CourierService ]
})
export class TracksComponent implements OnInit {
	@ViewChild('content') private content: TemplateRef<any>;
	tracks: Track[] = [];
	track: Track = new Track();
	declarationUpdate: TrackToUpdate = new TrackToUpdate();
	declaration: TrackToAdd = new TrackToAdd();
	package: Track = new Track();
	packagesForPayment: Track[] = [];
	selectedPackages: any = [];
	paymentToSend: PaymentToSend = new PaymentToSend();
	isMastercard = false;
	isVisa = false;
	total_amount = 0;
	via_wallet = true;
	wallet: number;
	private url: string;
	usd_try: number;

	invoice: any;

	all: Category[] = [];
	items: Category[] = [];
	withZeroId: Category[] = [];
	withNonZeroId: Category[] = [];
	temp: Category[] = [];

	constructor(
		private trackService: TrackService,
		private modalService: NgbModal,
		private titleService: Title,
		private courierService: CourierService,
		private alertifyService: AlertifyService,
		private authService: AuthService,
		private userService: UserService,
		private notificationService: NotificationService,
		private httpClient: HttpClient
	) {}

	ngOnInit() {
		this.titleService.setTitle('Bağlamalarım');
		this.getTracks();
		this.declaration.invoice = null;
		this.userService.connection().subscribe((data: User) => {
			this.wallet = data.wallet_usd;
		});

		this.httpClient
			.get('assets/data.json')
			.pipe(
				map((allItems: Category[]) => (this.all = allItems)),
				map((allItems: Category[]) => allItems.sort(this.compare)),
				map((allItems: Category[]) => ({
					withZeroId: allItems.filter((item: Category) => item.parentId === 0),
					withNonZeroId: allItems.filter(
						(item: Category) => item.parentId !== 0
					)
				}))
			)
			.subscribe((data: any) => {
				this.items = data.withZeroId;
				this.withNonZeroId = data.withNonZeroId;
			});

		this.getUSDtoTRY();
	}

	getUSDtoTRY() {
		this.trackService.getUSDtoTRY().subscribe((data: any) => {
			this.usd_try = data.value;
		}, (error) => (this.usd_try = 7.4));
	}

	get getTracksForCourier() {
		const tracks: Track[] = [];
		this.tracks.forEach((track) => {
			if (
				track.current_state.toString() !== 'Delivered' &&
				track.current_state.toString() !== 'Deleted'
			) {
				tracks.push(track);
			}
		});
		return tracks;
	}

	private getTracks() {
		this.trackService.getTracks().subscribe((data: any) => {
			this.tracks = data;
			this.tracks.forEach((t) => {
				if (!t.is_paid && t.amount > 0) {
					this.packagesForPayment.push(t);
				}
			});
		});
	}

	get productCategoryData() {
		return Object.keys(ProductCategory).filter(
			(key) => !isNaN(Number(ProductCategory[key]))
		);
	}

	get countryData() {
		return Object.keys(Country).filter((key) => !isNaN(Number(Country[key])));
	}

	open(courier) {
		this.modalService.open(courier, { ariaLabelledBy: 'modal-basic-title' });
		this.delay(500).then((any) => {
			$('.selectpicker').selectpicker();
		});
	}

	addTrack(packageForm: NgForm) {
		this.declaration.shipping_from = Number(Country.Turkey);
		this.declaration.shipping_to = Number(Country.Azerbaijan);
		this.declaration.category_id = Number(this.declaration.category_id);
		this.declaration.category_subId = Number(this.declaration.category_subId);
		this.declaration.category_name = String(
			this.getCategoryName(this.declaration.category_id)
		);

		if (
			this.declaration.invoice === null ||
			this.declaration.invoice_type === null
		) {
			this.declaration.invoice =
				'data:image/png;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==';
			this.declaration.invoice_type = 'image/png';
		}

		this.modalService.dismissAll();
		this.declaration.user_id = this.authService.getCurrentUserId();

		this.trackService
			.addTrack(this.declaration)
			.subscribe((data) =>
				this.notificationService.success('Bəyannamə əlavə edildi.')
			);
		this.delay(1000).then((any) => {
			this.getTracks();
		});
	}

	compare(a, b) {
		return a.id - b.id;
	}

	filterCategory(id) {
		console.log(this.getCategoryName(id));
		this.temp = [];

		this.withNonZeroId.forEach((element: Category) => {
			if (element.parentId === id) this.temp.push(element);
		});
	}

	getCategoryName(id) {
		let returnValue;
		this.all.forEach((element: Category) => {
			if (element.id === id) {
				returnValue = element.goodsNameAz;
			}
		});

		return returnValue;
	}

	async delay(ms: number) {
		await new Promise((resolve) => setTimeout(() => resolve(), ms)).then(() =>
			console.log('added')
		);
	}

	fileChange(event) {
		const b = event.target.files[0];
		const reader = new FileReader();
		reader.readAsDataURL(b);
		reader.onload = () => {
			this.declaration.invoice = reader.result;
			this.declaration.invoice_type = b.type;
			this.declarationUpdate.invoice = reader.result;
			this.declarationUpdate.invoice_type = b.type;
		};
	}

	removeTrack(id: number) {
		this.alertifyService.confirm(
			'Bağlama ləvğ ediləcəkdir. Qəbul edirsiniz ?',
			() =>
				this.trackService.delete(id).subscribe((data) => {
					this.notificationService.success('Bağlama uğurla ləvğ edildi.');
					this.delay(1000).then((any) => {
						this.getTracks();
					});
				})
		);
	}

	updateTrack(packageUpdateForm: NgForm) {
		this.declarationUpdate.category_id = Number(this.declaration.category_id);
		this.declarationUpdate.category_subId = Number(
			this.declaration.category_subId
		);
		this.declarationUpdate.category_name = String(
			this.getCategoryName(this.declaration.category_id)
		);
		this.declarationUpdate.shipping_from = Number(Country.Turkey);
		this.declarationUpdate.shipping_to = Number(Country.Azerbaijan);
		if (
			this.declarationUpdate.invoice === null ||
			this.declarationUpdate.invoice_type === null
		) {
			this.declarationUpdate.invoice =
				'data:image/png;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==';
			this.declarationUpdate.invoice_type = 'image/png';
		}
		this.modalService.dismissAll();

		this.trackService
			.updateTrack(this.declarationUpdate)
			.subscribe((data: any) => {
				this.delay(1000).then((any) => {
					this.getTracks();
				});
				this.notificationService.success('Bəyannamə uğurla tənzimləndi.');
			});
	}

	openForUpdate(declarationUpdateModal, track: Track) {
		this.declarationUpdate.id = track.id;
		this.declarationUpdate.user_id = track.user_id;
		this.declarationUpdate.tracking_number = track.tracking_number;
		this.declarationUpdate.shipping_from = track.shipping_from;
		this.declarationUpdate.shipping_to = track.shipping_to;
		this.declarationUpdate.quantity = track.quantity;
		this.declarationUpdate.comment = track.comment;
		this.declarationUpdate.invoice_path = track.invoice_path;
		if (track.comment === 'undefined') {
			track.comment = '';
		}
		this.declarationUpdate.price = track.price;
		this.declarationUpdate.shop = track.shop;
		this.declarationUpdate.category_id = track.category_id;
		this.filterCategory(track.category_id);
		this.declarationUpdate.category_subId = track.category_subId;
		this.declarationUpdate.category_name = track.category_name;
		this.declarationUpdate.currency = track.currency;
		this.declarationUpdate.is_liquid = track.is_liquid;
		this.modalService.open(declarationUpdateModal);
		this.delay(500).then((any) => {
			$('.selectpicker').selectpicker();
		});
	}

	pay(paymentForm: NgForm) {
		if (this.via_wallet && this.wallet >= this.totalAmount) {
			this.trackService
				.setPaidPackagesByTrackingNumbersViaWallet({
					user_id: Number(this.authService.getCurrentUserId()),
					tracking_numbers: this.selectedPackages
				})
				.subscribe((res: any) => {
					res = JSON.parse(res);
					if (res.message === 'Payment completed') {
						this.notificationService.success('Ödəniş uğurlu oldu.');
						this.modalService.dismissAll();
						this.delay(1000).then((any) => {
							this.getTracks();
							this.userService.connection().subscribe((d: User) => {
								this.wallet = d.wallet_usd;
							});
						});
					} else {
						this.notificationService.error(res.message);
					}
				});
			return;
		}
		const data: any = {
			amount: this.paymentToSend.amount,
			card_number:
				this.paymentToSend.card_number_1 +
				this.paymentToSend.card_number_2 +
				this.paymentToSend.card_number_3 +
				this.paymentToSend.card_number_4,
			month: this.paymentToSend.month,
			year: this.paymentToSend.year,
			cvv: this.paymentToSend.cvv,
			tracking_numbers: this.selectedPackages
		};
		this.trackService.setPaidPackagesByTrackingNumbers(data).subscribe(
			(d) => {
				this.url = JSON.parse(d).url;
				window.location.replace(this.url);
			},
			(error) => {
				console.log(error);
				this.notificationService.error(
					'Kart paremetrlərini dəyişdirib təkrar yoxlayın.'
				);
			}
		);
	}

	openLg(paymentModal) {
		this.paymentToSend.amount = 0;
		this.modalService.open(paymentModal, { size: 'lg' });
		this.delay(500).then((any) => {
			$('.selectpicker').selectpicker();
		});
	}

	createPayment(paymentForm: NgForm) {}

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
	get totalAmount() {
		let total = 0;
		this.packagesForPayment.forEach((t) => {
			if (this.selectedPackages.includes(t.tracking_number)) {
				total += t.amount;
			}
		});
		return total;
	}

	calculatePaymentAmount() {
		this.paymentToSend.amount = 0;
		this.total_amount = 0;
		this.packagesForPayment.forEach((t) => {
			if (this.selectedPackages.includes(t.tracking_number)) {
				this.paymentToSend.amount += t.amount;
				this.total_amount += t.amount;
			}
		});
		if (this.via_wallet && this.wallet && this.selectedPackages.length > 0) {
			this.paymentToSend.amount -= this.wallet;
		}
	}
}
