import { Resource } from './hateos/resource.model';
import { Link } from './hateos/link.model';

export class Tag extends Resource {
  id: number;
  name: string;

  constructor(id: number, name: string, links: Link[]) {
    super(links);
    this.id = id;
    this.name = name;
  }
}
