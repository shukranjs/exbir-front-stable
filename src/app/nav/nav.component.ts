import { Component, OnInit, TemplateRef, ViewChild } from "@angular/core";
import { AuthService } from "../services/auth.service";
import { UserService } from "../services/user.service";
import { AlertifyService } from "../services/alertify.service";
import { TrackService } from "../services/track.service";
import { NgForm } from "@angular/forms";
import { Track } from "../entities/track";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { TranslateService } from "@ngx-translate/core";

@Component({
  selector: "app-nav",
  templateUrl: "./nav.component.html",
  styleUrls: ["./nav.component.css"],
  providers: [UserService, TrackService],
})
export class NavComponent implements OnInit {
  trackingNumber: string;
  track: Track = new Track();
  @ViewChild("content")
  private content: TemplateRef<any>;

  constructor(
    private authService: AuthService,
    private userService: UserService,
    private trackService: TrackService,
    private modalService: NgbModal,
    private alertifyService: AlertifyService,
    private translate: TranslateService
  ) {}

  get isAuthenticated() {
    return this.authService.loggedIn();
  }

  ngOnInit() {}

  logOut() {
    this.authService.logOut();
  }

  getTrack(getTrackForm: NgForm) {
    this.alertifyService.showSpinner();
    this.trackService
      .getTrack(this.trackingNumber)
      .subscribe((data: any) => (this.track = data));
    this.modalService.open(this.content);
    this.alertifyService.hideSpinner();
  }

  useLanguage(lang: string) {
    this.translate.use(lang);
  }
}
