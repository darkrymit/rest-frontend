import { Injectable } from '@angular/core';
import { GiftCertificateService } from '@api/services';
import { of, shareReplay, switchMap, tap } from 'rxjs';
import { GiftCertificate } from '@api/models';

interface CachedValue<T> {
  data: T;
  lastUpdated: Date;
  lastAccessed: Date;
}

@Injectable({
  providedIn: 'root',
})
export class CertificateCacheService {
  private cache: Map<number, CachedValue<GiftCertificate>> = new Map<
    number,
    CachedValue<GiftCertificate>
  >();

  private maxCacheDuration = 1000 * 60 * 5;

  constructor(private api: GiftCertificateService) {}

  getById(id: number) {
    return of(id).pipe(
      switchMap(id => {
        let cachedValue = this.cache.get(id);

        if (cachedValue && !this.isExpired(cachedValue)) {
          this.cache.set(id, {
            ...cachedValue,
            lastAccessed: new Date(),
          });
          return of(cachedValue.data);
        }

        return this.api.getById(id).pipe(
          tap(certificate => {
            this.cache.set(id, {
              data: certificate,
              lastUpdated: new Date(),
              lastAccessed: new Date(),
            });
          })
        );
      }),
      shareReplay(1)
    );
  }

  private isExpired(cachedValue: CachedValue<any>) {
    return (
      cachedValue.lastUpdated <= new Date(Date.now() - this.maxCacheDuration)
    );
  }
}
