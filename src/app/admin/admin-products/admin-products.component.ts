import { Product } from './../../models/product';
import { Observable } from 'rxjs/Observable';
import { ProductService } from './../../product.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-admin-products',
  templateUrl: './admin-products.component.html',
  styleUrls: ['./admin-products.component.css']
})
export class AdminProductsComponent implements OnInit, OnDestroy {

  subscription: Subscription;
  products: Product[];
  filteredProducts: Product[];
  constructor(private productService: ProductService) {
    this.subscription = this.productService.getAll()
      .subscribe(products => this.products = this.filteredProducts = products);
  }

  filter(query: string) {
    if (query) {
      this.filteredProducts = this.products
        .filter(product => product.title.toLowerCase()
                            .includes(query.toLowerCase()));
    }else {
      this.filteredProducts = this.products;
    }
  }
  ngOnInit() {
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
