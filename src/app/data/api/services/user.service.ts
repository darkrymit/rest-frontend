import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { User } from '@app/data/api/models/user.model';
import { Observable } from 'rxjs';
import { Page } from '@app/data/api/models/pagination/page.model';
import { PageRequest } from '@app/data/api/models/pagination/page-request.model';
import { UserMapper } from '../mappers/user.mapper';
import { OrderMapper } from '@api/mappers/order.mapper';
import { Order } from '@api/models';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  baseUri = '/users';

  constructor(
    private api: ApiService,
    private userMapper: UserMapper,
    private orderMapper: OrderMapper
  ) {}

  getById(id: string): Observable<User> {
    return this.api
      .get(`${this.baseUri}/${id}`)
      .pipe(this.api.mapToResource({ mapper: this.userMapper.fromResponse }));
  }

  getAll(request: PageRequest): Observable<Page<User>> {
    return this.api.getPagedResource(this.baseUri, {
      relation: 'users',
      mapper: this.userMapper.fromResponse,
      pageRequest: request,
    });
  }

  getOrders(id: string, request: PageRequest): Observable<Page<Order>> {
    return this.api.getPagedResource(`${this.baseUri}/${id}/orders`, {
      relation: 'orders',
      mapper: this.orderMapper.fromResponse,
      pageRequest: request,
    });
  }

  getMe(): Observable<User> {
    return this.api
      .get(`${this.baseUri}/me`)
      .pipe(this.api.mapToResource({ mapper: this.userMapper.fromResponse }));
  }
}
