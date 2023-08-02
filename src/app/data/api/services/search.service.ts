import { Injectable } from '@angular/core';
import { GiftCertificateService } from './gift-certificate.service';
import { Order } from '@app/data/api/models/pagination/page-request.model';

export interface SearchOptions {
  part?: string;
  page?: number;
  size?: number;
  sort?: Order[];
}

@Injectable({
  providedIn: 'root',
})
export class SearchService {
  constructor(private giftCertificateService: GiftCertificateService) {}

  search(options: SearchOptions) {
    return this.giftCertificateService.getAll(
      {
        page: options.page || 0,
        size: options.size || 10,
        sort: options.sort || [{ property: 'name', direction: 'ASC' }],
      },
      { part: options.part || '' }
    );
  }
}
