import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { ApiService } from './api.service';
import { TrackToAdd } from '../entities/trackToAdd';
import { TrackToUpdate } from '../entities/trackToUpdate';

@Injectable({
	providedIn: 'root'
})
export class TrackService {
	constructor(
		private authService: AuthService,
		private apiService: ApiService
	) {}
	addTrack(track: TrackToAdd) {
		return this.apiService.post('/package', track);
	}
	updateTrack(track: TrackToUpdate) {
		return this.apiService.put('/package', track);
	}
	getTrack(trackingNumber: string) {
		return this.apiService.get('/package/tracking/' + trackingNumber);
	}

	getTrackById(_id: number) {
		return this.apiService.get('/package/' + _id);
	}

	delete(_id: number) {
		return this.apiService.delete('/package/' + _id);
	}

	getTracks() {
		return this.apiService.get(
			'/packages/' + this.authService.getCurrentUserId()
		);
	}

	// tslint:disable-next-line:variable-name
	getTracksByPackageStateValue(package_state_value) {
		return this.apiService.get(
			'/packages/' +
				this.authService.getCurrentUserId() +
				'/state/' +
				package_state_value
		);
	}

	getCompletedCount() {
		return this.apiService.get(
			'/packages/' +
				this.authService.getCurrentUserId() +
				'/state/completed/count'
		);
	}

	getNotCompletedCount() {
		return this.apiService.get(
			'/packages/' +
				this.authService.getCurrentUserId() +
				'/state/not_completed/count'
		);
	}

	getLas30DaysPackageSum() {
		return this.apiService.get(
			'/packages/' + this.authService.getCurrentUserId() + '/last30days/sum'
		);
	}
	setPaidPackagesByTrackingNumbers(data: any) {
		return this.apiService.post('/packages/set_paid', data);
	}
	setPaidPackagesByTrackingNumbersViaWallet(data: any) {
		return this.apiService.post('/packages/set_paid_by_wallet', data);
	}

	getUSDtoTRY() {
		return this.apiService.get('/currency/usd-try');
	}
}
