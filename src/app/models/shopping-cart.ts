import { ShoppingCartItem } from './shopping-cart-item';

export class ShoppingCart {
  constructor(public itemsMap: { [productId: string]: ShoppingCartItem}) {}

  get items() {
    const retVal = [];
    for (const productId in this.itemsMap) {
      if (this.itemsMap.hasOwnProperty(productId)) {
        retVal.push(this.itemsMap[productId]);
      }
    }
    return retVal;
  }

  get totalItemCount() {
    let count = 0;
    for (const productId in this.itemsMap)
      count += this.itemsMap[productId].quantity;
    return count;
  }
}
