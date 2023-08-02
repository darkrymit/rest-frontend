import { Injectable } from '@angular/core';
import { LinkMapper } from './hateoas/link.mapper';
import { Tag } from '../models/tag.model';
import { GiftCertificate } from '../models/gift-certificate.model';
import { TagMapper } from './tag.mapper';
import { Link } from '../models/hateos/link.model';

@Injectable({
  providedIn: 'root',
})
export class GiftCertificateMapper {
  constructor(
    private tagMapper: TagMapper,
    private linkMapper: LinkMapper
  ) {}

  fromResponse = (data: any): GiftCertificate => {
    const links: Link[] = this.linkMapper.fromResponse(data._links);
    const tags: Tag[] = data.tags._embedded.tags.map((tag: any) =>
      this.tagMapper.fromResponse(tag)
    );
    return new GiftCertificate(
      data.id,
      data.name,
      data.description,
      data.price,
      data.duration,
      new Date(data.createDate),
      new Date(data.lastUpdateDate),
      tags,
      links
    );
  };
}
