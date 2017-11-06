import { AngularFireDatabase } from 'angularfire2/database';
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
@Injectable()
export class ProductService {

  constructor(private db: AngularFireDatabase) { }

  create(product) {
    return this.db.list('/products').push(product);
  }

  getAll() {
    return this.db.list('/products')
    .snapshotChanges()
    .map(products => {
      return products.map(product => {
        const retval = Object.assign({}, product.payload.val());
        retval['key'] = product.key;
        return retval;
      });
    });
  }

  get(productId) {
    return this.db.object('/products/' + productId).valueChanges();
  }

  update(productId, product) {
    return this.db.object('/products/' + productId)
    .update(product);
  }

  delete(productId) {
    return this.db.object('/products/' + productId).remove();
  }

}
