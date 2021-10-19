import {Component, OnInit} from '@angular/core';
import {AuthService} from 'src/app/services/auth.service';
import {UserService} from 'src/app/services/user.service';
import {User} from 'src/app/entities/user';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {NgForm} from '@angular/forms';
import {BasketService} from 'src/app/services/basket.service';
import {AlertifyService} from 'src/app/services/alertify.service';
import {Basket} from '../../entities/basket';
import {NotificationService} from "../../services/notification.service";
import {SidebarToggleService} from "../../services/sidebar-toggle.service";
import {PaymentToSend} from "../../entities/paymentToSend";
import {Router} from "@angular/router";
declare var $: any;

@Component({
  selector: 'app-dashboard-nav',
  templateUrl: './dashboard-nav.component.html',
  styleUrls: ['./dashboard-nav.component.css'],
  providers: [UserService, BasketService]
})
export class DashboardNavComponent implements OnInit {
  currentUser: User = new User();
  paymentToSend: PaymentToSend = new PaymentToSend();
  basket: Basket = new Basket();
  private url: string;
  isMastercard = false;
  isVisa = false;
  // tslint:disable-next-line:variable-name
  via_wallet = true;
  wallet: number;
  constructor(
    private authService: AuthService,
    private userService: UserService,
    private modalService: NgbModal,
    private basketService: BasketService,
    public sidebarService: SidebarToggleService,
    private alertifyService: AlertifyService,
    private notificationService: NotificationService,
    private router: Router
  ) {
  }

  ngOnInit() {
    this.paymentToSend.amount = 0;
    if (this.authService.loggedIn()) {
      this.userService.connection().subscribe((data: any) => {
        this.currentUser = data;
        this.wallet = data.wallet_try;
      });
    }
  }
  open(content) {
    this.modalService.open(content, {size: 'lg'});
  }
  calculatePaymentAmount() {
    this.paymentToSend.amount = 0;
    this.paymentToSend.amount = this.basket.price * 1.05;
    if (this.via_wallet && this.wallet) {
      this.paymentToSend.amount -= this.wallet;
    }
  }
  add(basketForm: NgForm) {
    this.modalService.dismissAll();
    this.alertifyService.showSpinner();
    this.basket.user_id = this.authService.getCurrentUserId();
    this.basketService.add(this.basket).subscribe((data: any) => {
      this.notificationService.success('Sifariş uğurla artırıldı.');
    });
  }
  toggleSidebar() {
    this.sidebarService.isCollapsed = !this.sidebarService.isCollapsed;
  }
  async delay(ms: number) {
    await new Promise(resolve => setTimeout(() => resolve(), ms)).then(() => console.log('deleted'));
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
            this.router.navigateByUrl('dashboard/baskets');
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
