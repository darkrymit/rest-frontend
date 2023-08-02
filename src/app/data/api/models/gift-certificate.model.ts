import { Tag } from './tag.model';
import { Resource } from './hateos/resource.model';
import { Link } from './hateos/link.model';

export class GiftCertificate extends Resource {
  id: number;
  name: string;
  description: string;
  price: number;
  duration: number;
  createDate: Date;
  lastUpdateDate: Date;
  tags: Tag[];

  constructor(
    id: number,
    name: string,
    description: string,
    price: number,
    duration: number,
    createDate: Date,
    lastUpdateDate: Date,
    tags: Tag[],
    links: Link[]
  ) {
    super(links);
    this.id = id;
    this.name = name;
    this.description = description;
    this.price = price;
    this.duration = duration;
    this.createDate = createDate;
    this.lastUpdateDate = lastUpdateDate;
    this.tags = tags;
  }
}
