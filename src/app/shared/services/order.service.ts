import { Order } from '../models/order';
import { ShoppingCartService } from './shopping-cart.service';
import { AngularFireDatabase } from 'angularfire2/database';
import { Injectable } from '@angular/core';
import * as firebase from 'firebase';
@Injectable()
export class OrderService {

  constructor(private db: AngularFireDatabase, private cartService: ShoppingCartService) { }

  async placeOrder(order) {
    const result = this.db.list('/orders').push(order);
    this.cartService.clearCart();
    return result;
  }

  getOrders() {
    return this.db.list('/orders').valueChanges<Order>();
  }

  getOrderByUser(userId: string) {
    return this.db.list('/orders', ref => {
      return ref.orderByChild('userId').equalTo(userId);
    }).valueChanges<Order>();
  }

}
