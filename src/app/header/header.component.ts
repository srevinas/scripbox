import { Component, OnInit, OnDestroy, Inject } from "@angular/core";
import { AuthService } from "../auth/auth.service";
import { Subscription } from "rxjs";
import { Router } from "@angular/router";
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from "@angular/material/dialog";
import { Auth } from "../auth/auth.model";

@Component({
  selector: "app-header",
  templateUrl: "./header.component.html",
  styleUrls: ["./header.component.scss"],
})
export class HeaderComponent implements OnInit, OnDestroy {
  userSub: Subscription;
  isAuthenticated: boolean;
  user;
  p = false;
  sideNav = false;

  constructor(
    private authService: AuthService,
    private router: Router,
    public dialog: MatDialog
  ) {}

  ngOnInit() {
    this.userSub = this.authService.user.subscribe((user) => {
      this.isAuthenticated = !!user;
      this.user = user;
    });
  }
  ngOnDestroy() {
    this.userSub.unsubscribe();
  }

  onLogOut() {
    document.getElementById("mySidenav").style.width = "0";

    this.authService.getUserAction(this.p);
    this.isAuthenticated = this.authService.setAction();
    this.router.navigate(["/signin"]);
    this.dialog.open(LogoutSuccess, {
      width: "400px",
      height: "250px",
    });
  }

  viewProfile() {
    document.getElementById("mySidenav").style.width = "0";

    this.dialog.open(ViewProfile, {
      width: "30vw;",
      data: { name: this.user },
    });
  }

  openNav() {
    this.sideNav = !this.sideNav;

    if (this.sideNav) {
      document.getElementById("mySidenav").style.width = "250px";
    } else {
      document.getElementById("mySidenav").style.width = "0";
    }
  }

  closeNav() {
    this.sideNav = false;
    document.getElementById("mySidenav").style.width = "0";
  }
}

@Component({
  selector: "view_profile_dialog",
  templateUrl: "./view-profile.html",
  styleUrls: ["./header.component.scss"],
})
export class ViewProfile {
  // constructor(public dialogRef: MatDialog<DialogCanDeactive>) {} //end constructor
  constructor(
    public dialogRef: MatDialogRef<ViewProfile>,
    @Inject(MAT_DIALOG_DATA) public data: Auth
  ) {}

  onNoClick() {
    this.dialogRef.close();
  }
}
@Component({
  selector: "logout-success_dialog",
  templateUrl: "./logout-success.html",
  styleUrls: ["./header.component.scss"],
})
export class LogoutSuccess {
  // constructor(public dialogRef: MatDialog<DialogCanDeactive>) {} //end constructor
  constructor(
    public dialogRef: MatDialogRef<ViewProfile>,
    @Inject(MAT_DIALOG_DATA) public data: Auth
  ) {}

  onnoClick() {
    this.dialogRef.close();
  }
}
