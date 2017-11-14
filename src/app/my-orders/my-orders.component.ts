import { Order } from '../shared/models/order';
import { Observable } from 'rxjs/Observable';
import { OrderService } from '../shared/services/order.service';
import { AuthService } from '../shared/services/auth.service';
import { Component } from '@angular/core';

@Component({
  selector: 'app-my-orders',
  templateUrl: './my-orders.component.html',
  styleUrls: ['./my-orders.component.css']
})
export class MyOrdersComponent {
  orders$: Observable<Order[]>;
  constructor(
    private authService: AuthService,
    private orderService: OrderService) {
      this.orders$ = authService.user$.switchMap(u => u ? orderService.getOrderByUser(u.uid) : []);
    }

}
