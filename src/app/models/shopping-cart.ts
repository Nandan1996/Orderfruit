import { Product } from './product';
import { ShoppingCartItem } from './shopping-cart-item';

export class ShoppingCart {
  items: ShoppingCartItem[] = [];
  constructor(public itemsMap: { [productId: string]: ShoppingCartItem} = {}) {
    for (const productId in this.itemsMap) {
      if (this.itemsMap.hasOwnProperty(productId)) {
        const item = itemsMap[productId];
        const x = new ShoppingCartItem();
        Object.assign(x, item, { key: productId });
        this.items.push(x);
      }
    }
  }
  get totalPrice() {
    return this.items.reduce((prev, item) => prev + item.totalPrice, 0);
  }

  getQuantity(product: Product) {
    const item = this.itemsMap[product.key];
    return item ? item.quantity : 0;
  }

  get totalItemCount() {
    let count = 0;
    for (const productId in this.itemsMap)
      count += this.itemsMap[productId].quantity;
    return count;
  }
}
