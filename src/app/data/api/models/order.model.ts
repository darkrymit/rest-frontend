import { Resource } from './hateos/resource.model';
import { Link } from './hateos/link.model';

export interface OrderItem {
  giftCertificateId: number;
  quantity: number;
  price: number;
}

export class Order extends Resource {
  id: number;
  // since it is an uuid
  ownerId: string;
  items: OrderItem[];
  creationDate: Date;
  lastModifiedBy: string;
  lastModifiedDate: Date;

  constructor(
    id: number,
    ownerId: string,
    items: OrderItem[],
    creationDate: Date,
    lastModifiedBy: string,
    lastModifiedDate: Date,
    links: Link[]
  ) {
    super(links);
    this.id = id;
    this.ownerId = ownerId;
    this.items = items;
    this.creationDate = creationDate;
    this.lastModifiedBy = lastModifiedBy;
    this.lastModifiedDate = lastModifiedDate;
  }
}
