import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Country } from '../enums/country';
import { Article } from '../entities/article';
import { ArticleService } from '../services/article.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { TrackService } from '../services/track.service';
import { Track } from '../entities/track';
import { NotificationService } from '../services/notification.service';
declare var $: any;

@Component({
	selector: 'app-home',
	templateUrl: './home.component.html',
	styleUrls: [ './home.component.css' ]
})
export class HomeComponent implements OnInit {
	@ViewChild('getPackageByTrackingNumberModal')
	getPackageByTrackingNumberModal: TemplateRef<any>;
	package: Track = new Track();
	articles: Article[] = [];
	images = [
		'assets/images/banners/1.jpeg',
		'assets/images/banners/2.jpeg',
		'assets/images/banners/3.jpeg',
		'assets/images/banners/two-of-them.jpeg'
	];
	trackingNumber: string;
	countries = Object.keys(Country).filter(
		(key) => !isNaN(Number(Country[key]))
	);
	calculateData: any = {
		country: 'Turkey',
		type: 'general'
	};
	totalAmount = 0;

	constructor(
		private articleService: ArticleService,
		private trackService: TrackService,
		private notification: NotificationService,
		private modalService: NgbModal
	) {}

	async delay(ms: number) {
		await new Promise((resolve) => setTimeout(() => resolve(), ms)).then(() =>
			console.log('added')
		);
	}

	ngOnInit() {
		let $videoSrc;
		$('.video-btn').click(() => {
			$videoSrc = $(this).data('src');
		});
		console.log($videoSrc);

		$('#myModal').on('shown.bs.modal', () => {
			$('#video').attr(
				'src',
				$videoSrc + '?autoplay=1&amp;modestbranding=1&amp;showinfo=0'
			);
		});

		// stop playing the youtube video when I close the modal
		$('#myModal').on('hide.bs.modal', () => {
			// a poor man's stop video
			$('#video').attr('src', $videoSrc);
		});
		this.delay(1000).then((any) => {
			this.getArticles();
		});
	}

	getArticles() {
		this.articleService
			.getAll()
			.subscribe((data: Article[]) => (this.articles = data));
	}

	calculatePrice(calculateForm: NgForm) {
		let cost: number;
		let kgPrice: number;
		if (this.calculateData.type === 'general') {
			kgPrice = 4.5;
			if (this.calculateData.weight <= 0.25) {
				cost = 1.5;
			} else if (this.calculateData.weight <= 0.5) {
				cost = 2.5;
			} else if (this.calculateData.weight <= 0.75) {
				cost = 3.5;
			} else if (this.calculateData.weight <= 1) {
				cost = 4.5;
			} else {
				cost = this.calculateData.weight * kgPrice;
			}
		} else {
			kgPrice = 6.5;
			if (this.calculateData.weight <= 0.25) {
				cost = 3.5;
			} else if (this.calculateData.weight <= 0.5) {
				cost = 4.5;
			} else if (this.calculateData.weight <= 0.75) {
				cost = 5.5;
			} else if (this.calculateData.weight <= 1) {
				cost = 6.5;
			} else {
				cost = this.calculateData.weight * kgPrice;
			}
		}
		const cost1 =
			this.calculateData.height *
			this.calculateData.width *
			this.calculateData.length /
			6000 *
			kgPrice;
		if (cost1 > cost) {
			cost = cost1;
		}
		this.totalAmount = cost;
	}

	getPackageByTrackingNumber(getPackageByTrackingNumberForm: NgForm) {
		this.trackService.getTrack(this.trackingNumber).subscribe(
			(data: Track) => {
				this.package = data;
				console.log(this.package);
				this.modalService.open(this.getPackageByTrackingNumberModal, {
					size: 'lg'
				});
			},
			(err) => {
				this.notification.error('Package not found.');
			}
		);
	}
}
