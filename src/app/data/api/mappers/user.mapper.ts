import { Injectable } from '@angular/core';
import { LinkMapper } from './hateoas/link.mapper';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root',
})
export class UserMapper {
  constructor(private linkMapper: LinkMapper) {}

  fromResponse = (data: any): User => {
    const links = this.linkMapper.fromResponse(data._links);

    return new User(
      data.id,
      data.email,
      data.firstName,
      data.lastName,
      new Date(data.creationDate),
      data.lastModifiedBy,
      new Date(data.lastModifiedDate),
      links
    );
  };
}
