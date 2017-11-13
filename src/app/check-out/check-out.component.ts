import { OrderService } from './../order.service';
import { Subscription } from 'rxjs/Subscription';
import { ShoppingCart } from './../models/shopping-cart';
import { ShoppingCartService } from './../shopping-cart.service';
import { Component, OnInit, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-check-out',
  templateUrl: './check-out.component.html',
  styleUrls: ['./check-out.component.css']
})
export class CheckOutComponent implements OnInit, OnDestroy {
  shipping = {};
  cart: ShoppingCart;
  subscription: Subscription;
  constructor(
    private cartService: ShoppingCartService,
    private orderService: OrderService) { }

  async ngOnInit() {
    const cart$ = await this.cartService.getCart();
    this.subscription = cart$.subscribe(cart => this.cart = cart);
  }

  placeOrder() {
    const order = {
      datePlaced: new Date().getTime(),
      shipping: this.shipping,
      items: this.cart.items.map(item => {
        return {
          product: {
            title: item.title,
            imageUrl: item.imageUrl,
            price: item.price
          },
          quantity: item.quantity,
          totalPrice: item.totalPrice
        };
      })
    };
    this.orderService.storeOrder(order);
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
