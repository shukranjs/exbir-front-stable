import { Component, OnInit } from "@angular/core";
import { TelephoneService } from "../services/telephone.service";
import { NgbDateParserFormatter, NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { User } from "../entities/user";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { AuthService } from "../services/auth.service";
import { AlertifyService } from "../services/alertify.service";
import { Router } from "@angular/router";
import { Title } from "@angular/platform-browser";

@Component({
  selector: "app-register",
  templateUrl: "./register.component.html",
  styleUrls: ["./register.component.css"],
  providers: [TelephoneService, NgbModal],
})
export class RegisterComponent implements OnInit {
  telnumber = this.telephoneService.telNumber;
  user: User = new User();
  telCode2: string;
  confirm: string;
  registerForm: FormGroup;
  public registerUser: any = {};
  loginUser: any = {};

  constructor(
    private parserFormatter: NgbDateParserFormatter,
    private telephoneService: TelephoneService,
    private modalService: NgbModal,
    private authService: AuthService,
    private formBuilder: FormBuilder,
    private router: Router,
    private alertifyService: AlertifyService,
    private titleService: Title
  ) {}

  ngOnInit() {
    this.createRegisterForm();
    this.titleService.setTitle("Qeydiyyat");
  }

  open(content) {
    this.modalService.open(content).result;
  }

  createRegisterForm() {
    this.registerForm = this.formBuilder.group(
      {
        first_name: ["", Validators.required],
        last_name: ["", Validators.required],
        email_address: ["", [Validators.required, Validators.email]],
        identity1: ["", Validators.required],
        identity2: ["", Validators.required],
        address: ["", Validators.required],
        birthday: ["", Validators.required],
        telCode: ["", Validators.required],
        mobile_number: [
          "",
          [
            Validators.required,
            Validators.minLength(9),
            Validators.maxLength(9),
          ],
        ],
        password: ["", [Validators.required, Validators.minLength(6)]],
        confirm: ["", Validators.required],
        qaydaCheck: [false, Validators.requiredTrue],
      },
      { validator: this.passwordMatchValidator }
    );
  }

  passwordMatchValidator(g: FormGroup) {
    return g.get("password").value === g.get("confirm").value
      ? null
      : { misMatch: true };
  }

  register() {
    this.alertifyService.showSpinner();
    if (this.registerForm.valid) {
      this.registerForm
        .get("birthday")
        .setValue(
          this.parserFormatter.format(this.registerForm.get("birthday").value)
        );
      this.registerUser = Object.assign({}, this.registerForm.value);
      this.registerUser.mobile_number =
        this.registerForm.get("telCode").value +
        this.registerForm.get("mobile_number").value;
      this.authService.register(this.registerUser).subscribe((data) => {
        this.user = data;
        this.authService.isRegistered = true;
        this.alertifyService.hideSpinner();
        this.alertifyService.success("Qeydiyyat uğurlu oldu.");
        this.router.navigateByUrl("/login");
      });
    }
  }
}
