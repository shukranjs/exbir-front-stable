import { Component, OnInit, ViewChild } from '@angular/core';
import { TransactionService } from 'src/app/services/transaction.service';
import { Title } from '@angular/platform-browser';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Payment } from '../../entities/payment';
import { NgForm } from '@angular/forms';
import { PaymentToSend } from '../../entities/paymentToSend';
import { PaymentService } from '../../services/payment.service';
import { NotificationService } from '../../services/notification.service';

declare var $: any;

@Component({
	selector: 'app-transactions',
	templateUrl: './transactions.component.html',
	styleUrls: [ './transactions.component.css' ],
	providers: [ TransactionService ]
})
export class TransactionsComponent implements OnInit {
	payment: Payment = new Payment();
	transactions: Payment[] = [];
	paymentToSend: PaymentToSend = new PaymentToSend();
	isVisa = false;
	isMastercard = false;
	url = '';
	// tslint:disable-next-line:variable-name
	@ViewChild('payment_modal') private payment_modal;

	constructor(
		private transactionService: TransactionService,
		private notificationService: NotificationService,
		private modalService: NgbModal,
		private paymentService: PaymentService,
		private titleService: Title
	) {}

	ngOnInit() {
		this.paymentToSend.currency = 'USD';
		this.titleService.setTitle('Əməliyyatlarım');
		this.getTransactions();
	}

	getTransactions() {
		return this.paymentService.getAll().subscribe((data: Payment[]) => {
			this.transactions = data;
		});
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

	createPayment(paymentForm: NgForm) {
		// this.payment.card_number = this.paymentToSend.card_number_1 +
		//   this.paymentToSend.card_number_2 +
		//   this.paymentToSend.card_number_3 +
		//   this.paymentToSend.card_number_4;
		this.payment.amount = this.paymentToSend.amount;
		// this.payment.cvv = this.paymentToSend.cvv;
		// this.payment.month = this.paymentToSend.month;
		// this.payment.year = this.paymentToSend.year;
		this.payment.currency = this.paymentToSend.currency;
		this.paymentService.createPaymentByPaymes(this.payment).subscribe(
			(data: any) => {
				this.url = JSON.parse(data).url;
				window.location.replace(this.url);
				// this.modalService.open(this.payment_modal);
				// window.location.replace(JSON.parse(data).url);
			},
			(error) => {
				this.notificationService.error(
					'Ödəmə sistemi ilə bağlı problem oldu. Sonra yenidən yoxlayın.'
				);
			}
		);
	}
}
