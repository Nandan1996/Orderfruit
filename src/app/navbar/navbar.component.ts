import { ShoppingCartService } from '../shared/services/shopping-cart.service';
import { AppUser } from '../shared/models/app-user';
import { AuthService } from '../shared/services/auth.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  appUser: AppUser;
  isCollapsed = false;
  cart$;
  constructor(
    private auth: AuthService,
    private cartService: ShoppingCartService) {
  }

  async ngOnInit() {
    this.auth.appUser$.subscribe(appUser => this.appUser = appUser);
    this.cart$ = await this.cartService.getCart();
  }
  logout() {
    this.auth.logout();
  }
}
