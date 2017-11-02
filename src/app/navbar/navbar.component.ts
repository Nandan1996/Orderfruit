import { AuthService } from './../auth.service';
import { Component } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {

  isCollapsed = false;
  constructor(public auth: AuthService) {
  }

  logout() {
    this.auth.logout();
  }
}
