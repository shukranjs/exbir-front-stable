import {Component, OnInit} from '@angular/core';
import {TrackService} from 'src/app/services/track.service';
import {Track} from 'src/app/entities/track';

@Component({
  selector: 'app-track-modal',
  templateUrl: './track-modal.component.html',
  styleUrls: ['./track-modal.component.css']
})
export class TrackModalComponent implements OnInit {
  trackingNumber: string;
  content: any;
  track: Track = new Track();

  constructor(private trackService: TrackService) {
  }

  ngOnInit() {
  }

  getTrack() {
    this.trackService.getTrack(this.trackingNumber).subscribe(data => console.log(data));
    //this.modalService.open(this.content);
  }
}
