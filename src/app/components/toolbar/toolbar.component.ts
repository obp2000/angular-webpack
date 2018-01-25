import { Component, OnInit } from "@angular/core";
import { AuthDialogComponent } from "../auth-dialog/auth-dialog.component";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { AuthService } from "../../services/auth.service";
import { Router } from "@angular/router";

@Component({
  selector: "app-toolbar",
  templateUrl: "./toolbar.component.html"
})
export class ToolbarComponent implements OnInit {
  constructor(
    private router: Router,
    private modalService: NgbModal,
    public authService: AuthService
  ) {}

  ngOnInit() {}

  logOut() {
    this.authService.logOutUser().subscribe(() => this.router.navigate(['/']));
  }

  presentAuthDialog(mode?: "login" | "register") {
    const modalRef = this.modalService.open(AuthDialogComponent);
    modalRef.componentInstance.openDialog(mode);
  }
}
