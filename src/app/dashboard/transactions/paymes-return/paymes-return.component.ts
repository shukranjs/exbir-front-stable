import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-paymes-return',
  templateUrl: './paymes-return.component.html',
  styleUrls: ['./paymes-return.component.css']
})
export class PaymesReturnComponent implements OnInit {
  message: string;
  amount: number;
  user_id: number;
  // tslint:disable-next-line:variable-name
  invoice_path: string;
  // tslint:disable-next-line:variable-name
  currency: string;
  // tslint:disable-next-line:variable-name
  return_type: string;

  constructor(private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.message = this.route.snapshot.paramMap.get('message');
    if (this.message === 'ok') {
      this.amount = Number(this.route.snapshot.paramMap.get('amount'));
      this.user_id = Number(this.route.snapshot.paramMap.get('user_id'));
      this.currency = this.route.snapshot.paramMap.get('currency');
      this.invoice_path = this.route.snapshot.paramMap.get('invoice_path');
      this.return_type = this.route.snapshot.paramMap.get('return_type');
    }
  }
}
