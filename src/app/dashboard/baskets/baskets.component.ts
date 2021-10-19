import {Component, OnInit} from '@angular/core';
import {BasketService} from 'src/app/services/basket.service';
import {NgForm} from '@angular/forms';
import {AuthService} from 'src/app/services/auth.service';
import {Router} from '@angular/router';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {AlertifyService} from 'src/app/services/alertify.service';
import {Title} from '@angular/platform-browser';
import {Basket} from '../../entities/basket';
import {BasketToUpdate} from "../../entities/basketToUpdate";
import {NotificationService} from "../../services/notification.service";
import {PaymentToSend} from "../../entities/paymentToSend";
import {User} from "../../entities/user";
import {UserService} from "../../services/user.service";

declare var $: any;

@Component({
  selector: 'app-baskets',
  templateUrl: './baskets.component.html',
  styleUrls: ['./baskets.component.css'],
  providers: [BasketService]
})
export class BasketsComponent implements OnInit {
  baskets: Basket[] = [];
  inputType = 'password';
  eyeClass = 'fa fa-eye text-primary float-right';
  basket: Basket = new Basket();
  basketsForPayment: Basket[] = [];
  basketToUpdate: BasketToUpdate = new BasketToUpdate();
  paymentToSend: PaymentToSend = new PaymentToSend();
  paymentToSendMissing: PaymentToSend = new PaymentToSend();
  isMastercard = false;
  isVisa = false;
  private url: string;
  // tslint:disable-next-line:variable-name
  via_wallet = true;
  wallet: number;
  // tslint:disable-next-line:variable-name
  on_init = true;
  selectedBaskets: any[] = [];
  // tslint:disable-next-line:variable-name
  via_wallet_missing = true;

  constructor(
    private basketService: BasketService,
    private authService: AuthService,
    private router: Router,
    private modalService: NgbModal,
    private alertifyService: AlertifyService,
    private titleService: Title,
    private userService: UserService,
    private notificationService: NotificationService
  ) {
  }

  ngOnInit() {
    this.paymentToSend.amount = 0;
    this.titleService.setTitle('Səbətlərim');
    this.getBaskets();
    this.userService.connection().subscribe((data: User) => {
      this.wallet = data.wallet_try;
    });
  }

  getBaskets() {
    this.basketService.getBaskets().subscribe((data: any) => {
      this.baskets = data;
      this.baskets.forEach(t => {
        if (t.current_state.toString() === 'Incomplete') {
          this.basketsForPayment.push(t);
        }
      });
    });
  }

  changePasswordType() {
    if (this.inputType === 'password') {
      this.inputType = 'text';
      this.eyeClass = 'fa fa-eye-slash text-primary float-right';
    } else {
      this.inputType = 'password';
      this.eyeClass = 'fa fa-eye text-primary float-right';
    }
  }

  add(basketForm: NgForm) {
    this.basket.user_id = this.authService.getCurrentUserId();
    this.basketService.add(this.basket).subscribe((data: any) => {
      this.notificationService.success('Sifariş uğurla artırıldı.');
    });
    this.delay(1000).then(any => {
      this.getBaskets();
    });
  }

  async delay(ms: number) {
    await new Promise(resolve => setTimeout(() => resolve(), ms)).then(() => console.log('deleted'));
  }

  open(content) {
    this.modalService.open(content, {size: 'lg'});
  }

  openToUpdate(content, basket: Basket) {
    this.basketToUpdate.id = basket.id;
    this.basketToUpdate.user_id = this.authService.getCurrentUserId();
    this.basketToUpdate.email_address = basket.email_address;
    this.basketToUpdate.password = basket.password;
    this.basketToUpdate.price = basket.price;
    this.basketToUpdate.shop_url = basket.shop_url;
    this.basketToUpdate.created_date = basket.created_date;
    this.basketToUpdate.states = basket.states;
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'});
  }

  removeBasket(_id: number) {
    this.alertifyService.confirm(
      _id.toString() + ' nömrəli sifarişiniz silinəcəkdir. Qəbul edirsiniz ?',
      () => this.basketService.delete(_id).subscribe((data: any) => {
          if (data.message === 'Basket deleted successfully.') {
            this.notificationService.success('Sifariş uğurla ləvğ edildi.');
          } else {
            this.notificationService.error('Xəta baş verdi.');
          }
        }
      )
    );
    this.delay(1000).then(any => {
      this.getBaskets();
    });
  }

  updateBasket(basketFormToUpdate: NgForm) {
    this.modalService.dismissAll();
    this.basketService.update(this.basketToUpdate).subscribe((data: any) => {
      this.delay(1000).then(any => {
        this.getBaskets();
      });
      this.notificationService.success('Sifariş uğurla tənzimləndi.');
    });
  }

  createPayment(paymentForm: NgForm) {
    if (this.via_wallet && this.wallet >= this.basket.price) {
      this.basketService.getPaymentByWallet({
        user_id: Number(this.authService.getCurrentUserId()),
        shop_url: this.basket.shop_url,
        email_address: this.basket.email_address,
        password: this.basket.password,
        description: this.basket.description,
        price: this.basket.price,
        quantity: this.basket.quantity
      }).subscribe((res: any) => {
        res = JSON.parse(res);
        if (res.message === 'Payment completed') {
          this.notificationService.success('Ödəniş uğurlu oldu.');
          this.modalService.dismissAll();
          this.delay(1000).then(any => {
            this.getBaskets();
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
      amount: this.paymentToSend.amount,
      card_number: this.paymentToSend.card_number_1 +
        this.paymentToSend.card_number_2 +
        this.paymentToSend.card_number_3 +
        this.paymentToSend.card_number_4,
      month: this.paymentToSend.month,
      year: this.paymentToSend.year,
      cvv: this.paymentToSend.cvv,
      shop_url: this.basket.shop_url,
      email_address: this.basket.email_address,
      password: this.basket.password,
      description: this.basket.description,
      price: this.basket.price,
      quantity: this.basket.quantity
    };
    this.basketService.add(data).subscribe(d => {
        this.url = JSON.parse(d).url;
        window.location.replace(this.url);
      },
      error => {
        console.log(error);
        this.notificationService.error('Kart paremetrlərini dəyişdirib təkrar yoxlayın.');
      });
  }

  openLg(paymentModal) {
    this.paymentToSendMissing.amount = 0;
    this.modalService.open(paymentModal, {size: 'lg'});
    this.delay(500).then(any => {
      $('.selectpicker').selectpicker();
    });
  }

  createPaymentMissing(paymentForm: NgForm) {
    if (this.via_wallet && this.wallet >= this.totalMissingFee) {
      this.basketService.getPaymentByWalletMissing({
        user_id: Number(this.authService.getCurrentUserId()),
        ids: this.selectedBaskets
      }).subscribe((res: any) => {
        res = JSON.parse(res);
        if (res.message === 'Payment completed') {
          this.notificationService.success('Ödəniş uğurlu oldu.');
          this.modalService.dismissAll();
          this.delay(1000).then(any => {
            this.getBaskets();
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
      ids: this.selectedBaskets
    };
    this.basketService.setReadyToOrder(data).subscribe(d => {
        this.url = JSON.parse(d).url;
        window.location.replace(this.url);
      },
      error => {
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

  openToPay(content, basket) {
    this.basket = basket;
    this.paymentToSendMissing.amount = basket.missing_fee;
    this.modalService.open(content, {size: 'sm'});
  }

  calculatePaymentAmount() {
    this.paymentToSend.amount = 0;
    this.paymentToSend.amount = this.basket.price * 1.05;
    if (this.via_wallet && this.wallet) {
      this.paymentToSend.amount -= this.wallet;
    }
  }
  get totalMissingFee() {
    let total = 0;
    this.basketsForPayment.forEach(t => {
      if (this.selectedBaskets.includes(t.id.toString())) {
        total += t.missing_fee;
      }
    });
    return total;
  }

  calculateMissingPaymentAmount() {
    this.paymentToSendMissing.amount = 0;
    this.basketsForPayment.forEach(t => {
      if (this.selectedBaskets.includes(t.id.toString())) {
        this.paymentToSendMissing.amount += t.missing_fee * 1.05;
      }
    });
    if (this.via_wallet_missing && this.wallet && this.selectedBaskets.length > 0) {
      this.paymentToSendMissing.amount -= this.wallet;
    }
  }
}
