import { Injectable } from '@angular/core';
import { Tag } from '../models/tag.model';
import { LinkMapper } from './hateoas/link.mapper';

@Injectable({
  providedIn: 'root',
})
export class TagMapper {
  constructor(private linkMapper: LinkMapper) {}

  fromResponse = (data: any): Tag => {
    return new Tag(
      data.id,
      data.name,
      this.linkMapper.fromResponse(data._links)
    );
  };
}
