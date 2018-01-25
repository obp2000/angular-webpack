import { Component, OnInit, Input } from "@angular/core";
import { NgbActiveModal } from "@ng-bootstrap/ng-bootstrap";

@Component({
  selector: "app-auth-dialog",
  templateUrl: "./auth-dialog.component.html"
})
export class AuthDialogComponent implements OnInit {
  @Input() authMode: "login" | "register" = "login";
  closeResult: string;

  constructor(public activeModal: NgbActiveModal) {}

  onLoginFormResult(e: any) {
    if (e.signedIn) this.closeDialog();
    else {
      alert(e.err.json().errors[0]);
    }
  }

  onRegisterFormResult(e: any) {
    if (e.signedUp) this.closeDialog();
    else {
      alert(e.err.json().errors.full_messages[0]);
    }
  }

  openDialog(mode: "login" | "register" = "login") {
    this.authMode = mode;
  }

  closeDialog() {
    this.activeModal.close();
  }

  ngOnInit() {}

  isLoginMode() {
    return this.authMode == "login";
  }
  isRegisterMode() {
    return this.authMode == "register";
  }
}
