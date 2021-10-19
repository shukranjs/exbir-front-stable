import {Component, OnInit} from '@angular/core';
import {OrderService} from 'src/app/services/order.service';
import {Order} from 'src/app/entities/order';
import {Title} from '@angular/platform-browser';
import {AlertifyService} from '../../services/alertify.service';
import {NotificationService} from '../../services/notification.service';
import {NgForm} from '@angular/forms';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {OrderToUpdate} from 'src/app/entities/orderToUpdate';
import {AuthService} from '../../services/auth.service';
import {PaymentToSend} from "../../entities/paymentToSend";
import {User} from "../../entities/user";
import {UserService} from "../../services/user.service";

declare var $: any;

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css'],
  providers: [OrderService]
})
export class OrdersComponent implements OnInit {
  orders: Order[] = [];
  order: Order = new Order();
  orderToUpdate: OrderToUpdate = new OrderToUpdate();
  public isCollapsed = true;
  quantityOptions = [];
  i: number;
  paymentToSend: PaymentToSend = new PaymentToSend();
  isMastercard = false;
  isVisa = false;
  private url: string;
  // tslint:disable-next-line:variable-name
  via_wallet = true;
  wallet: number;
  // tslint:disable-next-line:variable-name
  on_init = true;
  selectedOrders: any[] = [];
  // tslint:disable-next-line:variable-name
  via_wallet_missing = true;
  ordersForPayment: Order[] = [];
  paymentToSendMissing: PaymentToSend = new PaymentToSend();

  constructor(private orderService: OrderService,
              private alertifyService: AlertifyService,
              private titleService: Title,
              private modalService: NgbModal,
              private userService: UserService,
              private authService: AuthService,
              private notificationService: NotificationService) {
  }

  ngOnInit() {
    this.titleService.setTitle('Sifarişlərim');
    for (this.i = 1; this.i <= 30; this.i++) {
      this.quantityOptions.push(this.i);
    }
    this.getOrders();
    this.userService.connection().subscribe((data: User) => {
      this.wallet = data.wallet_try;
    });
  }

  getOrders() {
    this.orderService
      .getOrders()
      .subscribe((data: Order[]) => {
        this.orders = data;
        this.orders.forEach(t => {
          if (t.current_state.toString() === 'Incomplete') {
            this.ordersForPayment.push(t);
          }
        });
      });
  }

  async delay(ms: number) {
    await new Promise(resolve => setTimeout(() => resolve(), ms)).then(() => console.log('deleted'));
  }

  // tslint:disable-next-line:variable-name
  removeOrder(_id: number) {
    this.alertifyService.confirm(
      _id.toString() + ' nömrəli sifarişiniz silinəcəkdir. Qəbul edirsiniz ?',
      () => this.orderService.delete(_id).subscribe((data: any) => {
          if (data.message === 'Order deleted successfully.') {
            this.notificationService.success('Sifariş uğurla ləvğ edildi.');
          } else {
            this.notificationService.error('Xəta baş verdi.');
          }
        }
      )
    );
    this.delay(1000).then(any => {
      this.getOrders();
    });
  }

  updateOrder(orderForm: NgForm) {
    this.modalService.dismissAll();
    this.orderService.update(this.orderToUpdate).subscribe((data: any) => {
      this.delay(1000).then(any => {
        this.getOrders();
      });
      this.notificationService.success('Sifariş uğurla tənzimləndi.');
    });
  }

  open(content, order: Order) {
    this.orderToUpdate.user_id = this.authService.getCurrentUserId();
    this.orderToUpdate.id = order.id;
    this.orderToUpdate.color = order.color;
    this.orderToUpdate.size = order.size;
    this.orderToUpdate.description = order.description;
    this.orderToUpdate.price = order.price;
    this.orderToUpdate.courier_cost = order.courier_cost;
    this.orderToUpdate.url = order.url;
    this.orderToUpdate.states = order.states;
    this.orderToUpdate.created_date = order.created_date;
    this.orderToUpdate.quantity = order.quantity;
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'});
  }

  openToPay(content, order) {
    this.order = order;
    this.paymentToSend.amount = order.missing_fee;
    this.modalService.open(content, {size: 'sm'});
  }

  createPayment(paymentForm: NgForm) {
    const data: any = {
      amount: this.paymentToSend.amount,
      card_number: this.paymentToSend.card_number_1 +
        this.paymentToSend.card_number_2 +
        this.paymentToSend.card_number_3 +
        this.paymentToSend.card_number_4,
      month: this.paymentToSend.month,
      year: this.paymentToSend.year,
      cvv: this.paymentToSend.cvv,
      orders: [this.order]
    };
    this.orderService.setReadyToOrder(data).subscribe(d => {
        this.url = JSON.parse(d).url;
        window.location.replace(this.url);
      },
      error => {
        this.notificationService.error('Kart paremetrlərini dəyişdirib təkrar yoxlayın.');
      });
  }

  cardNumber2FocusMissing() {
    const cardNumber1Value = $('#missing_card_number_1').val();
    if (cardNumber1Value[0] === '4') {
      this.isVisa = true;
    } else if (cardNumber1Value[0] === '5') {
      this.isMastercard = true;
    } else {
      this.isVisa = false;
      this.isMastercard = false;
    }
    if (cardNumber1Value.length > 3) {
      $('#missing_card_number_2').focus();
    }
  }

  openLg(paymentModal) {
    this.paymentToSendMissing.amount = 0;
    this.modalService.open(paymentModal, {size: 'lg'});
    this.delay(500).then(any => {
      $('.selectpicker').selectpicker();
    });
  }

  cardNumber3FocusMissing() {
    if ($('#missing_card_number_2').val().length > 3) {
      $('#missing_card_number_3').focus();
    }
  }

  cardNumber4FocusMissing() {
    if ($('#missing_card_number_3').val().length > 3) {
      // tslint:disable-next-line:no-unused-expression
      $('#missing_card_number_4').focus();
    }
  }
  get totalMissingFee() {
    let total = 0;
    this.ordersForPayment.forEach(t => {
      if (this.selectedOrders.includes(t.id.toString())) {
        total += t.missing_fee;
      }
    });
    return total;
  }
  createPaymentMissing(paymentForm: NgForm) {
    if (this.via_wallet && this.wallet >= this.totalMissingFee) {
      const d = {
        user_id: Number(this.authService.getCurrentUserId()),
        ids: this.selectedOrders
      };
      this.orderService.getPaymentByWalletMissing(d).subscribe((res: any) => {
        res = JSON.parse(res);
        if (res.message === 'Payment completed') {
          this.notificationService.success('Ödəniş uğurlu oldu.');
          this.modalService.dismissAll();
          this.delay(1000).then(any => {
            this.getOrders();
            this.userService.connection().subscribe((d: User) => {
              this.wallet = d.wallet_try;
            });
          });
        } else {
          this.notificationService.error(res.message);
        }
      });
      return;
    }
    const data: any = {
      amount: this.paymentToSendMissing.amount,
      card_number: this.paymentToSendMissing.card_number_1 +
        this.paymentToSendMissing.card_number_2 +
        this.paymentToSendMissing.card_number_3 +
        this.paymentToSendMissing.card_number_4,
      month: this.paymentToSendMissing.month,
      year: this.paymentToSendMissing.year,
      cvv: this.paymentToSendMissing.cvv,
      ids: this.selectedOrders
    };
    this.orderService.setReadyToOrder(data).subscribe(d => {
        this.url = JSON.parse(d).url;
        window.location.replace(this.url);
      },
      error => {
        this.notificationService.error('Kart paremetrlərini dəyişdirib təkrar yoxlayın.');
      });
  }

  calculateMissingPaymentAmount() {
    this.paymentToSendMissing.amount = 0;
    this.ordersForPayment.forEach(t => {
      if (this.selectedOrders.includes(t.id.toString())) {
        this.paymentToSendMissing.amount += t.missing_fee * 1.05;
      }
    });
    if (this.via_wallet_missing && this.wallet && this.selectedOrders.length > 0) {
      this.paymentToSendMissing.amount -= this.wallet;
    }
  }
}

