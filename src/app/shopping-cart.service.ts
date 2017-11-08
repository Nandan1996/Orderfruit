import { Product } from './models/product';
import { AngularFireDatabase } from 'angularfire2/database';
import { Injectable } from '@angular/core';

@Injectable()
export class ShoppingCartService {

  constructor(private db: AngularFireDatabase) { }

  private create() {
    return this.db.list('/shopping-carts').push({
      dateCreated: new Date().getTime()
    });
  }

  private getCart(cartId: string) {
    return this.db.object('/shopping-carts/' + cartId);
  }

  private async getOrCreateCartId() {
    const  cartId = localStorage.getItem('cartId');
    if (cartId) {
      return cartId;
    }
    const result = await this.create();
    localStorage.setItem('cartId', result.key);
    return result.key;
  }

  async addToCart(product: Product) {
    const cartId = await this.getOrCreateCartId();
    const itemDb = this.db.object('/shopping-carts/' + cartId + '/items/' + product.key);
    const item$ = itemDb.snapshotChanges();
    item$.take(1).subscribe(item => {
      console.log(item.payload.val());
      if (item.payload.exists()) {
        itemDb.update({
          quantity: item.payload.val().quantity + 1
        });
      } else {
        const {key, ...productC} = product;
        itemDb.set({
          product: productC,
          quantity: 1
        });
      }
    });
  }
}
