import { Router, ActivatedRoute } from '@angular/router';
import { ProductService } from './../../product.service';
import { CategoryService } from './../../category.service';
import { Component, OnInit } from '@angular/core';
import 'rxjs/add/operator/take';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css']
})
export class ProductFormComponent {
  categories$;
  product = {};
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private productService: ProductService,
    categoryService: CategoryService) {

    const id = this.route.snapshot.paramMap.get('id');
    this.categories$ = categoryService.getCategories();
    if (id) {
      this.productService.get(id).take(1).subscribe(product => this.product = product);
    }
  }

  save(product) {
    this.productService.create(product);
    this.router.navigate(['/admin/products']);
  }

}
