import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { Order } from '@app/data/api/models/order.model';
import { Observable } from 'rxjs';
import { OrderMapper } from '../mappers/order.mapper';

export interface OrderCreateRequest {
  items: Item[];
}

export interface Item {
  id: number;
  quantity: number;
}

@Injectable({
  providedIn: 'root',
})
export class OrderService {
  baseUri = '/orders';

  constructor(
    private api: ApiService,
    private orderMapper: OrderMapper
  ) {}

  getById(id: number): Observable<Order> {
    return this.api
      .get(`${this.baseUri}/${id}`)
      .pipe(this.api.mapToResource({ mapper: this.orderMapper.fromResponse }));
  }

  create(request: OrderCreateRequest): Observable<Order> {
    return this.api.post(this.baseUri, request);
  }
}
