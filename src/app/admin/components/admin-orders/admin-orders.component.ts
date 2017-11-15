import { Order } from '../../../shared/models/order';
import { Observable } from 'rxjs/Observable';
import { OrderService } from '../../../shared/services/order.service';
import { Component } from '@angular/core';

@Component({
  selector: 'app-admin-orders',
  templateUrl: './admin-orders.component.html',
  styleUrls: ['./admin-orders.component.css']
})
export class AdminOrdersComponent {
  orders$: Observable<Order[]>;
  constructor(private orderService: OrderService) {
    this.orders$ = this.orderService.getOrders();
  }
}
