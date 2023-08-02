import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { map, Observable, OperatorFunction } from 'rxjs';
import { Page, PageMetadata } from '@app/data/api/models/pagination/page.model';
import { PageRequest } from '@app/data/api/models/pagination/page-request.model';
import { LinkMapper } from '../mappers/hateoas/link.mapper';

export interface LowLevelOptions {
  params?: HttpParams;
}

export interface ResourceMapOptions<T> {
  mapper: (response: any) => T;
}

export interface PagedResourceMapOptions<T> extends ResourceMapOptions<T> {
  relation: string;
  pageRequest: PageRequest;
}

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private readonly apiURL: string;

  private readonly defaultHeaders: HttpHeaders;

  constructor(
    private http: HttpClient,
    private linkMapper: LinkMapper
  ) {
    this.apiURL = 'http://localhost:8081';
    this.defaultHeaders = new HttpHeaders({
      'Content-Type': 'application/json',
    });
  }

  get(path: string, options?: LowLevelOptions): Observable<any> {
    return this.http.get(`${this.apiURL}${path}`, this.getHttpOptions(options));
  }

  post(
    path: string,
    body: any = {},
    options?: LowLevelOptions
  ): Observable<any> {
    return this.http.post(
      `${this.apiURL}${path}`,
      body,
      this.getHttpOptions(options)
    );
  }

  put(
    path: string,
    body: any = {},
    options?: LowLevelOptions
  ): Observable<any> {
    return this.http.put(
      `${this.apiURL}${path}`,
      body,
      this.getHttpOptions(options)
    );
  }

  patch(
    path: string,
    body: any = {},
    options?: LowLevelOptions
  ): Observable<any> {
    return this.http.patch(
      `${this.apiURL}${path}`,
      body,
      this.getHttpOptions(options)
    );
  }

  delete(path: string, options?: LowLevelOptions): Observable<any> {
    return this.http.delete(
      `${this.apiURL}${path}`,
      this.getHttpOptions(options)
    );
  }

  mapToResource<T>(options: ResourceMapOptions<T>): OperatorFunction<any, T> {
    return map((response: any) => {
      return options.mapper(response);
    });
  }

  mapToPagedResource<T>(
    options: PagedResourceMapOptions<T>
  ): OperatorFunction<any, Page<T>> {
    return map((response: any) => {
      const links = this.linkMapper.fromResponse(response._links);
      const content: T[] = [];
      if (response._embedded) {
        for (const item of response._embedded[options.relation]) {
          content.push(options.mapper(item));
        }
      }
      const metadata: PageMetadata = response.page;
      return new Page(content, metadata, links);
    });
  }

  getPagedResource<T>(
    path: string,
    mapOptions: PagedResourceMapOptions<T>,
    options?: LowLevelOptions
  ): Observable<Page<T>> {
    options = options || {};
    this.applyPageRequest(options, mapOptions);
    return this.get(path, options).pipe(this.mapToPagedResource(mapOptions));
  }

  public applyPageRequest<T>(
    options: LowLevelOptions,
    mapOptions: PagedResourceMapOptions<T>
  ) {
    options.params = options.params || new HttpParams();
    options.params = options.params.append('page', mapOptions.pageRequest.page);
    options.params = options.params.append('size', mapOptions.pageRequest.size);
    if (mapOptions.pageRequest?.sort) {
      for (const order of mapOptions.pageRequest.sort) {
        options.params = options.params.append(
          'sort',
          order.property + ',' + order.direction
        );
      }
    }
  }

  getApiUrl(): string {
    return this.apiURL;
  }

  getDefaultHeaders(): HttpHeaders {
    return this.defaultHeaders;
  }

  getHttp(): HttpClient {
    return this.http;
  }

  private getHttpOptions(options?: LowLevelOptions) {
    return {
      headers: this.defaultHeaders,
      params: options?.params,
    };
  }
}
