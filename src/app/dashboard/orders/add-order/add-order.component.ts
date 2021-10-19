import {Component, OnInit, ViewChild} from '@angular/core';
import {NgForm} from '@angular/forms';
import {OrderService} from 'src/app/services/order.service';
import {AlertifyService} from 'src/app/services/alertify.service';
import {Router} from '@angular/router';
import {Title} from '@angular/platform-browser';
import {UserService} from 'src/app/services/user.service';
import {AuthService} from 'src/app/services/auth.service';
import {User} from 'src/app/entities/user';
import {Order} from '../../../entities/order';
import {PaymentToSend} from "../../../entities/paymentToSend";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {NotificationService} from "../../../services/notification.service";

declare var $: any;

@Component({
  selector: 'app-add-order',
  templateUrl: './add-order.component.html',
  styleUrls: ['./add-order.component.css'],
  providers: [OrderService]
})
export class AddOrderComponent implements OnInit {
  @ViewChild('paymentModal') paymentModal: any;
  currentUser: User = new User();
  public orders: Order[] = [new Order()];
  quantityOptions = [];
  i: number;
  order: Order = new Order();
  totalPrice = 0;
  totalCourierCost = 0;
  totalPercentage = 0;
  total = 0;
  url: string;
  newWallet = 0;
  paymentToSend: PaymentToSend = new PaymentToSend();
  isVisa = false;
  isMastercard = false;
  // tslint:disable-next-line:variable-name
  via_wallet = true;
  wallet: number;
  ordersForPayment: Order[] = [];
  constructor(
    private orderService: OrderService,
    private alertifyService: AlertifyService,
    private router: Router,
    private titleService: Title,
    private userService: UserService,
    private authService: AuthService,
    private modal: NgbModal,
    private notificationService: NotificationService
  ) {
  }

  ngOnInit() {
    this.titleService.setTitle('Sifariş ver');
    for (this.i = 1; this.i <= 30; this.i++) {
      this.quantityOptions.push(this.i);
    }
    this.userService.connection().subscribe((data: User) => {
      this.wallet = data.wallet_try;
    });
  }
  calculatePaymentAmount() {
    this.paymentToSend.amount = 0;
    this.orders.forEach(t => {
      this.paymentToSend.amount += (t.price + t.courier_cost) * 1.05;
    });
    if (this.via_wallet && this.wallet && this.orders.length > 0) {
      this.paymentToSend.amount -= this.wallet;
    }
  }
  addOrder(orderForm: NgForm) {
    this.calculatePaymentAmount();
    this.open(this.paymentModal, 'sm');
    // this.orderService.add(this.orders).subscribe(data => console.log(data));
    // this.alertifyService.success('Sifarişiniz uğurla artırıldı');
    // this.router.navigateByUrl('dashboard/orders');
  }

  addOrderObject() {
    const order = new Order();
    order.id = this.orders.length + 1;
    this.orders.push(order);
  }

  removeOrder(j: number) {
    this.orders.splice(j, 1);
  }

  calculateTotal() {
    this.totalPrice = 0;
    this.totalCourierCost = 0;
    this.totalPercentage = 0;
    this.total = 0;
    // this.newWallet = this.currentUser.wallet;
    this.orders.forEach(
      order => {
        if (order.price) {
          this.totalPrice += order.price;
        }
        if (order.courier_cost) {
          this.totalCourierCost += order.courier_cost;
        }
      }
    );
    this.total = this.totalCourierCost + this.totalPrice;
    this.totalPercentage = this.total * 0.05;
    this.total += this.totalPercentage;
  }

  open(content, s) {
    this.calculateTotal();
    this.modal.open(content, {size: s});
  }

  createPayment(paymentForm: NgForm) {
    if (this.via_wallet && this.wallet >= this.total) {
      this.orderService.getPaymentByWallet({
        user_id: Number(this.authService.getCurrentUserId()),
        orders: this.orders
      }).subscribe((res: any) => {
        res = JSON.parse(res);
        if (res.message === 'Payment completed') {
          this.notificationService.success('Ödəniş uğurlu oldu.');
          this.router.navigateByUrl('dashboard/orders');
        } else {
          this.notificationService.error(res.message);
        }
      });
      return;
    }
    const data: any = {
      amount: this.paymentToSend.amount,
      card_number: this.paymentToSend.card_number_1 +
        this.paymentToSend.card_number_2 +
        this.paymentToSend.card_number_3 +
        this.paymentToSend.card_number_4,
      month: this.paymentToSend.month,
      year: this.paymentToSend.year,
      cvv: this.paymentToSend.cvv,
      orders: this.orders
    };
    this.orderService.add(data).subscribe(d => {
      this.url = JSON.parse(d).url;
      window.location.replace(this.url);
      },
      error => {
        console.log(error);
        this.notificationService.error('Kart paremetrlərini dəyişdirib təkrar yoxlayın.');
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
}
