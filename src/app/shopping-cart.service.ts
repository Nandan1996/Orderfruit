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

  private getItem(cartId: string, productId: string) {
    return this.db.object('/shopping-carts/' + cartId + '/items/' + productId);
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

  async addToCart({key, ...ProductC}: Product) {
    const cartId = await this.getOrCreateCartId();
    const itemDb = this.getItem(cartId, key);
    itemDb.snapshotChanges().take(1).subscribe(({payload}) => {
      itemDb.update({product: ProductC, quantity: (payload.val() && payload.val().quantity || 0) + 1});
    });
  }
}
