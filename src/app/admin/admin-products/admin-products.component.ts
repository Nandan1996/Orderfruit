import { Product } from './../../models/product';
import { Observable } from 'rxjs/Observable';
import { ProductService } from './../../product.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { DataTableResource } from 'angular-4-data-table';
@Component({
  selector: 'app-admin-products',
  templateUrl: './admin-products.component.html',
  styleUrls: ['./admin-products.component.css']
})
export class AdminProductsComponent implements OnInit, OnDestroy {

  subscription: Subscription;
  products: Product[];
  tableResource: DataTableResource<Product>;
  items: Product[] = [];
  itemCount: number;

  constructor(private productService: ProductService) {
    this.subscription = this.productService.getAll()
      .subscribe(products => {
        this.products = products;
        this.initializeDataTable(products);
      });
  }
  private initializeDataTable(products: Product[]) {
    this.tableResource = new DataTableResource(products);
    this.tableResource.query({offset: 0, limit: 10})
      .then(items => this.items = items);
    this.tableResource.count()
        .then(count => this.itemCount = count);
  }

  reloadItems(params) {
    if (!this.tableResource) {
      return;
    }
    this.tableResource.query(params)
      .then(items => this.items = items);
  }
  filter(query: string) {
    let filteredProducts;
    if (query) {
      filteredProducts = this.products
        .filter(product => product.title.toLowerCase()
                            .includes(query.toLowerCase()));
    }else {
      filteredProducts = this.products;
    }
    this.initializeDataTable(filteredProducts);
  }
  ngOnInit() {
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
