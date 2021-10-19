import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
declare var require: any;

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: [ './app.component.css' ]
})
export class AppComponent {
	constructor(private translate: TranslateService) {
		translate.setDefaultLang('az');
	}

	// rightNow: any;

	ngOnInit() {
		// this.rightNow = new Date().toISOString();
		// if (localStorage.getItem('lastChecked') === null) {
		// 	const Fixer = require('fixer-node');
		// 	const fixer = new Fixer('f4701887ad918db404d7684755ee5574', {
		// 		https: true
		// 	});
		// 	try {
		// 		fixer.base({ base: 'USD', symbols: 'AZN' }).then((data) => {
		// 			localStorage.setItem('1USDTOAZN', data.rates.AZN);
		// 			localStorage.setItem('lastChecked', this.rightNow.toString());
		// 		});
		// 	} catch (err) {
		// 		const info = err.info;
		// 		const code = err.code;
		// 	}
		// } else {
		// 	console.log(
		// 		'delta ' +
		// 			Math.abs(
		// 				this.rightNow - Date.parse(localStorage.getItem('lastChecked'))
		// 			).toString()
		// 	);
		// 	console.log('rightnow ' + this.rightNow);
		// 	console.log('last ' + localStorage.getItem('lastChecked'));
		// 	console.log('we saved unnecessary api request! yay!');
		// }
	}
}
