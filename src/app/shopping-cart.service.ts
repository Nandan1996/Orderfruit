import { ShoppingCartItem } from './models/shopping-cart-item';
import { ShoppingCart } from './models/shopping-cart';
import { Observable } from 'rxjs/Observable';
import { Product } from './models/product';
import { AngularFireDatabase, AngularFireObject } from 'angularfire2/database';
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/take';
import 'rxjs/add/operator/map';

@Injectable()
export class ShoppingCartService {

  constructor(private db: AngularFireDatabase) { }

  private create() {
    return this.db.list('/shopping-carts').push({
      dateCreated: new Date().getTime()
    });
  }

  async getCart(): Promise<Observable<ShoppingCart>> {
    const cartId = await this.getOrCreateCartId();
    return this.db.object('/shopping-carts/' + cartId)
      .valueChanges().map((x: any) => new ShoppingCart(x.items));
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

  async addToCart(product: Product) {
    this.updateItem(product, 1);
  }

  async removeFromCart(product: Product) {
    this.updateItem(product, -1);
  }
  private async updateItem({key, ...ProductC}: Product | ShoppingCartItem, change: number) {
    const cartId = await this.getOrCreateCartId();
    const itemDb = this.getItem(cartId, key);
    itemDb.valueChanges<ShoppingCartItem>().take(1).subscribe((item) => {
      itemDb.update({
        title: ProductC.title,
        imageUrl: ProductC.imageUrl,
        price: ProductC.price,
        quantity: (item && item.quantity || 0) + change
      });
    });
  }
}
