import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { Observable, shareReplay } from 'rxjs';
import { GiftCertificate } from '@app/data/api/models/gift-certificate.model';
import { Page } from '@app/data/api/models/pagination/page.model';
import { PageRequest } from '@app/data/api/models/pagination/page-request.model';
import { GiftCertificateMapper } from '../mappers/gift-certificate.mapper';
import { HttpParams } from '@angular/common/http';

export interface GiftCertificateCreateRequest {
  name: string;
  description: string;
  price: number;
  duration: number;
  tags: string[];
}

export interface GiftCertificateSearchRequest {
  part?: string;
  tags?: string[];
}

@Injectable({
  providedIn: 'root',
})
export class GiftCertificateService {
  baseUri = '/certificates';

  constructor(
    private api: ApiService,
    private giftCertificateMapper: GiftCertificateMapper
  ) {}

  getById(id: number): Observable<GiftCertificate> {
    return this.api.get(`${this.baseUri}/${id}`).pipe(
      this.api.mapToResource({
        mapper: this.giftCertificateMapper.fromResponse,
      }),
      shareReplay(1)
    );
  }

  create(request: GiftCertificateCreateRequest): Observable<GiftCertificate> {
    return this.api.post(this.baseUri, request).pipe(
      this.api.mapToResource({
        mapper: this.giftCertificateMapper.fromResponse,
      })
    );
  }

  getAll(
    request: PageRequest,
    search?: GiftCertificateSearchRequest
  ): Observable<Page<GiftCertificate>> {
    let params = new HttpParams();

    if (search) {
      if (search.part) {
        params = params.append('part', search.part);
      }
      if (search.tags) {
        for (const tag of search.tags) {
          params = params.append('tags', tag);
        }
      }
    }

    return this.api.getPagedResource(
      this.baseUri,
      {
        relation: 'giftCertificates',
        mapper: this.giftCertificateMapper.fromResponse,
        pageRequest: request,
      },
      { params }
    );
  }

  deleteById(id: number): Observable<any> {
    return this.api.delete(`${this.baseUri}/${id}`);
  }
}
