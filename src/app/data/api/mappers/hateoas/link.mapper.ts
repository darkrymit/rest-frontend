import { Injectable } from '@angular/core';
import { Link } from '@api/models/hateos';

@Injectable({
  providedIn: 'root',
})
export class LinkMapper {
  // arrow function property to use as reference without losing this
  fromResponse = (data: any): Link[] => {
    const links: Link[] = [];
    for (const link in data) {
      links.push(new Link(link, data[link].href));
    }
    return links;
  };
}
