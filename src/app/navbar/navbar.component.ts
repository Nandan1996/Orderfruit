import { ShoppingCartService } from './../shopping-cart.service';
import { AppUser } from './../models/app-user';
import { AuthService } from './../auth.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  appUser: AppUser;
  isCollapsed = false;
  shoppingCartItemCount: number;
  constructor(
    private auth: AuthService,
    private cartService: ShoppingCartService) {
  }

  async ngOnInit() {
    this.auth.appUser$.subscribe(appUser => this.appUser = appUser);
    (await this.cartService.getCart()).subscribe(cart => {
      this.shoppingCartItemCount = 0;
      for (const productId in cart.items)
        this.shoppingCartItemCount += cart.items[productId].quantity;
    });
  }
  logout() {
    this.auth.logout();
  }
}
