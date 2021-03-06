import 'rxjs/add/operator/take';

import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CategoryService } from 'shared/services/category.service';
import { ProductService } from 'shared/services/product.service';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css']
})
export class ProductFormComponent {
  categories$;
  product = {};
  id;
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private productService: ProductService,
    categoryService: CategoryService) {

    this.id = this.route.snapshot.paramMap.get('id');
    this.categories$ = categoryService.getAll();
    if (this.id) {
      this.productService.get(this.id).take(1).subscribe(product => this.product = product);
    }
  }

  save(product) {
    if (this.id) {
      this.productService.update(this.id, product);
    } else {
      this.productService.create(product);
    }
    this.router.navigate(['/admin/products']);
  }

  delete() {
    if (!confirm('Are you sure you want to delete this product?')) {
      return;
    }
    this.productService.delete(this.id);
    this.router.navigate(['/admin/products']);
  }

}
