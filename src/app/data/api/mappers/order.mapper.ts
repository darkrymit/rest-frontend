import { Injectable } from '@angular/core';
import { LinkMapper } from './hateoas/link.mapper';
import { Order, OrderItem } from '@api/models';

@Injectable({
  providedIn: 'root',
})
export class OrderMapper {
  constructor(private linkMapper: LinkMapper) {}

  fromResponse = (data: any): Order => {
    const links = this.linkMapper.fromResponse(data._links);
    const items: OrderItem[] = data.items.map((item: any): OrderItem => {
      return {
        giftCertificateId: item.giftCertificateId,
        price: item.price,
        quantity: item.quantity,
      };
    });
    return new Order(
      data.id,
      data.ownerId,
      items,
      new Date(data.creationDate),
      data.lastModifiedBy,
      new Date(data.lastModifiedDate),
      links
    );
  };
}
