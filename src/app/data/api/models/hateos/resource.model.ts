import { Link } from './link.model';

export abstract class Resource {
  protected constructor(public links: Link[]) {}

  public isRelPresent(rel: string): boolean {
    return this.links.some(link => link.rel === rel);
  }
}
