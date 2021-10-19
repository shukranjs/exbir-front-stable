import { Injectable } from '@angular/core';
import { AlertifyService } from './alertify.service';
import { NotificationService } from './notification.service';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
	providedIn: 'root'
})
export class ApiService {
	constructor(
		private notification: NotificationService,
		private alertify: AlertifyService,
		private httpClient: HttpClient
	) {}

	// baseUrl = 'http://localhost:5000';
	// baseUrl = 'https://api.exbir.az';
	baseUrl = 'https://exbir.herokuapp.com/'

	postData: any;

	delete(relativePath: string): Observable<object> {
		this.alertify.showSpinner();
		let headers = new HttpHeaders();
		headers = headers.set('Content-Type', 'application/json');
		headers = headers.set('Access-Control-Allow-Headers', '*');
		const token = localStorage.getItem('token');
		if (token) {
			headers = headers.append('Authorization', 'Bearer ' + token);
		}
		return this.httpClient
			.delete(this.baseUrl + relativePath, { headers })
			.pipe(
				tap(
					() => {
						this.alertify.hideSpinner();
					},
					(err) => {
						this.alertify.hideSpinner();
						if (err.status === 401) {
							this.notification.error('Əməliyyata icazə yoxdur.');
						} else if (err.status === 400) {
							this.notification.error('Sorğu parametrlərində səhvlik var.');
						} else {
							// this.notification.error('Serverdə problem var.');
						}
					}
				)
			);
	}

	get(relativePath: string): Observable<object> {
		this.alertify.showSpinner();
		let headers = new HttpHeaders();
		headers = headers.set('Content-Type', 'application/json');
		headers = headers.set('Access-Control-Allow-Headers', '*');
		const token = localStorage.getItem('token');
		if (token) {
			headers = headers.append('Authorization', 'Bearer ' + token);
		}

		return this.httpClient
			.get(this.baseUrl + relativePath, {
				headers
			})
			.pipe(
				tap(
					() => {
						this.alertify.hideSpinner();
					},
					(err) => {
						this.alertify.hideSpinner();
						if (err.status === 401) {
							this.notification.error('Əməliyyata icazə yoxdur.');
						} else if (err.status === 400) {
							this.notification.error('Sorğu parametrlərində səhvlik var.');
						} else {
							// this.notification.error('Serverdə problem var.');
						}
					}
				)
			);
	}

	put(relativePath: string, model: any): Observable<any> {
		this.alertify.showSpinner();
		let headers = new HttpHeaders();
		headers = headers.set('Content-Type', 'application/json');
		headers = headers.set('Access-Control-Allow-Headers', '*');
		headers = headers.set('Access-Control-Allow-Origin', '*');
		const token = localStorage.getItem('token');
		if (token) {
			headers = headers.append('Authorization', 'Bearer ' + token);
		}
		return this.httpClient
			.put(this.baseUrl + relativePath, model, {
				headers,
				responseType: 'text'
			})
			.pipe(
				tap(
					() => {
						this.alertify.hideSpinner();
					},
					(err) => {
						this.alertify.hideSpinner();
						if (err.status === 401) {
							this.notification.error('Əməliyyata icazə yoxdur.');
						} else if (err.status === 400) {
							this.notification.error('Sorğu parametrlərində səhvlik var.');
						} else {
							// this.notification.error('Serverdə problem var.');
						}
					}
				)
			);
	}

	post(relativePath: string, model: any): Observable<any> {
		this.alertify.showSpinner();
		let headers = new HttpHeaders();
		headers = headers.set('Content-Type', 'application/json');
		headers = headers.set('Access-Control-Allow-Headers', '*');
		headers = headers.set('Access-Control-Allow-Origin', '*');
		const token = localStorage.getItem('token');
		if (token) {
			headers = headers.append('Authorization', 'Bearer ' + token);
		}
		return this.httpClient
			.post(this.baseUrl + relativePath, model, {
				headers,
				responseType: 'text'
			})
			.pipe(
				tap(
					() => {
						this.alertify.hideSpinner();
					},
					(err) => {
						this.alertify.hideSpinner();
						if (err.status === 401) {
							this.notification.error('Əməliyyata icazə yoxdur.');
						} else if (err.status === 400) {
							this.notification.error('Sorğu parametrlərində səhvlik var.');
						} else {
							// this.notification.error('Serverdə problem var.');
						}
					}
				)
			);
	}
}
