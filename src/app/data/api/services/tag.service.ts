import { Injectable } from '@angular/core';
import { Tag } from '@app/data/api/models/tag.model';
import { Observable } from 'rxjs';
import { ApiService } from './api.service';
import { Link } from '@app/data/api/models/hateos/link.model';
import { Page } from '@app/data/api/models/pagination/page.model';
import { PageRequest } from '@app/data/api/models/pagination/page-request.model';
import { TagMapper } from '../mappers/tag.mapper';

export interface TagCreateRequest {
  name: string;
}

@Injectable({
  providedIn: 'root',
})
export class TagService {
  baseUri = '/tags';

  constructor(
    private api: ApiService,
    private tagMapper: TagMapper
  ) {}

  getById(id: number): Observable<Tag> {
    return this.api
      .get(`${this.baseUri}/${id}`)
      .pipe(this.api.mapToResource({ mapper: this.tagMapper.fromResponse }));
  }

  getAll(pageRequest: PageRequest): Observable<Page<Tag>> {
    return this.api.getPagedResource(this.baseUri, {
      relation: 'tags',
      mapper: this.tagMapper.fromResponse,
      pageRequest: pageRequest,
    });
  }

  create(request: TagCreateRequest): Observable<Tag> {
    return this.api
      .post(this.baseUri, request)
      .pipe(this.api.mapToResource({ mapper: this.tagMapper.fromResponse }));
  }

  delete(id: number): Observable<any> {
    return this.api.delete(`${this.baseUri}/${id}`);
  }
}
