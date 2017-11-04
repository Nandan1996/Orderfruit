import { AngularFireDatabase } from 'angularfire2/database';
import { Injectable } from '@angular/core';

@Injectable()
export class CategoryService {

  constructor(private db: AngularFireDatabase) {
  }

  getCategories() {
    return this.db.list('/categories', ref => {
      return ref.orderByChild('name');
    })
    .snapshotChanges()
    .map( categories => {
      return categories.map(category => {
        const retval = Object.assign({}, category.payload.val());
        retval['key'] = category.key;
        return retval;
      });
    });
  }

}
