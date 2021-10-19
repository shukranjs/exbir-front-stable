import {Component, OnInit} from '@angular/core';
import {TelephoneService} from 'src/app/services/telephone.service';
import {AuthService} from 'src/app/services/auth.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {AlertifyService} from 'src/app/services/alertify.service';
import {Title} from '@angular/platform-browser';
import {User} from 'src/app/entities/user';
import {NgbDateParserFormatter, NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {UserService} from 'src/app/services/user.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css'],
  providers: [TelephoneService]
})
export class SettingsComponent implements OnInit {
  telnumber = this.telephoneService.telNumber;
  user: User = new User();
  telCode2: string;
  // tslint:disable-next-line:variable-name
  new_password: string;
  settingsForm: FormGroup;
  settingsUser: any = {};

  constructor(
    private parserFormatter: NgbDateParserFormatter,
    private telephoneService: TelephoneService,
    private authService: AuthService,
    private formBuilder: FormBuilder,
    private router: Router,
    private modalService: NgbModal,
    private alertifyService: AlertifyService,
    private titleService: Title,
    private userService: UserService
  ) {
  }

  ngOnInit() {
    this.createsettingsForm();
    this.getUserDetails();
    this.titleService.setTitle('Tənzimləmələr');
  }

  createsettingsForm() {
    this.settingsForm = this.formBuilder.group(
      {
        first_name: ['', Validators.required],
        last_name: ['', Validators.required],
        email_address: ['', [Validators.required, Validators.email]],
        identity1: ['', Validators.required],
        identity2: [
          '',
          [
            Validators.required,
            Validators.minLength(7),
            Validators.maxLength(7)
          ]
        ],
        address: ['', Validators.required],
        birthday: ['', Validators.required],
        telCode: ['', Validators.required],
        mobile_number: [
          '',
          [
            Validators.required,
            Validators.minLength(7),
            Validators.maxLength(7)
          ]
        ],
        password: ['', [Validators.required, Validators.minLength(6)]],
        new_password: ['', [Validators.required, Validators.minLength(6)]]
      },
    );
  }

  getUserDetails() {
    this.userService.connection().subscribe((data: User) => {
      this.settingsForm.get('first_name').setValue(data.first_name),
        this.settingsForm.get('last_name').setValue(data.last_name),
        this.settingsForm.get('email_address').setValue(data.email_address),
        this.settingsForm
          .get('telCode')
          .setValue(data.mobile_number.substring(0, 5)),
        this.settingsForm
          .get('mobile_number')
          .setValue(data.mobile_number.substring(5)),
        this.settingsForm.get('password').setValue(data.password),
        this.settingsForm.get('identity1').setValue(data.identity1),
        this.settingsForm.get('identity2').setValue(data.identity2),
        this.settingsForm
          .get('birthday')
          .setValue(this.parserFormatter.parse(data.birthday));
      this.settingsForm.get('address').setValue(data.address);
    });
  }

  settings() {
    if (this.settingsForm.valid) {
      this.settingsForm
        .get('birthday')
        .setValue(
          this.parserFormatter.format(this.settingsForm.get('birthday').value)
        );
      this.settingsUser = Object.assign({}, this.settingsForm.value);
      this.settingsUser.mobile_number =
        this.settingsForm.get('telCode').value +
        this.settingsForm.get('mobile_number').value;
      this.settingsUser.id = this.authService.getCurrentUserId();
      this.userService.update(this.settingsUser).subscribe(data => {
        this.user = data;
        this.alertifyService.success(
          'Tənzimləmələr qeyd olundu.'
        );
        this.router.navigateByUrl('/dashboard');
      }, error => {
        if (error.status === 401) {
          this.alertifyService.error(
            'Parolu düzgün qeyd edin.'
          );
        }
      });
    }
  }

  open(content) {
    this.modalService.open(content);
  }
}
