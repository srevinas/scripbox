import { Component, OnInit, Inject } from "@angular/core";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { AuthService } from "../auth.service";
import { Auth } from "../auth.model";
import { Router } from "@angular/router";
import {
  MatDialogRef,
  MAT_DIALOG_DATA,
  MatDialog,
} from "@angular/material/dialog";

@Component({
  selector: "app-auth",
  templateUrl: "./auth.component.html",
  styleUrls: ["./auth.component.scss"],
})
export class AuthComponent implements OnInit {
  isLogIn = true;
  userDetails: Auth[];
  login: boolean;
  emailErroe: boolean;
  emailSigninError: boolean;
  emailErrorMessage = "Incorrect Email";
  ErrorMessage = "Email Already Used";
  errorMessage = "Incorrect Email (or) Password";
  hide = true;

  constructor(
    private authService: AuthService,
    private router: Router,
    public dialog: MatDialog
  ) {}

  ngOnInit() {
    this.authService.fetchSigninDetails().subscribe((p) => {
      this.userDetails = p;
    });
  }

  signinForm: FormGroup = new FormGroup({
    firstName: new FormControl("", Validators.required),
    lastName: new FormControl("", Validators.required),
    email: new FormControl("", [Validators.required, Validators.email]),
    password: new FormControl("", [
      Validators.required,
      Validators.minLength(8),
    ]),
    location: new FormControl("", Validators.required),
    mobileNumber: new FormControl("", [
      Validators.required,
      Validators.pattern("[6-9]\\d{9}"),
    ]),
  });

  onSubmit() {
    const email = this.signinForm.get("email").value;
    for (let p in this.userDetails) {
      if (this.userDetails[p].email == email) {
        this.emailSigninError = true;
      }
      if (this.userDetails[p].email !== email) {
        this.emailSigninError = false;
      }
    }
    if (!this.emailSigninError) {
      this.authService
        .postsignDetails(this.signinForm.value)
        .subscribe((result) => {
          this.authService.user.next(result);
        });
      this.login = false;
      this.dialog.open(AuthSuccess, {
        width: "300px;",
        data: { name: this.login },
      });
      this.router.navigate(["products"]);
    }
  }

  loginForm: FormGroup = new FormGroup({
    email: new FormControl("", [Validators.required, Validators.email]),
    password: new FormControl("", Validators.required),
  });

  onLogin() {
    const email = this.loginForm.get("email").value;
    const password = this.loginForm.get("password").value;
    console.log(email, password);
    for (let p in this.userDetails) {
      if (
        this.userDetails[p].email == email &&
        this.userDetails[p].password == password
      ) {
        this.authService.user.next(this.userDetails[p]);
        this.router.navigate(["products"]);
        this.login = true;
        this.authService.getUserAction(this.login);
      }

      if (
        this.userDetails[p].email !== email ||
        (this.userDetails[p].password !== password &&
          this.userDetails[p].email == email)
      ) {
        this.emailErroe = true;
      }
    }
    if (this.login) {
      this.dialog.open(AuthSuccess, {
        width: "400px",
        height: "250px",
        data: { name: this.login },
      });
    }
  }
  signin() {
    this.isLogIn = false;
  }
}

@Component({
  selector: "view_profile_dialog",
  templateUrl: "./auth-sucess.html",
  styleUrls: ["./auth.component.scss"],
})
export class AuthSuccess {
  constructor(
    public dialogRef: MatDialogRef<AuthSuccess>,
    @Inject(MAT_DIALOG_DATA) public data: boolean
  ) {}

  onnoClick() {
    this.dialogRef.close();
  }
}
