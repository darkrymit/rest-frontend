import { CertificatesFeature } from '@store/certificates/certificates.reducer';
import { GiftCertificate } from '@api/models';
import { ResourceState } from '@store/certificates/certificates.state';
import { distinctUntilChanged, map, Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { filterExisting } from '@shared/utils/custom-rxjs-operators';

const { selectCache } = CertificatesFeature;

export function certificateState$(
  store: Store,
  id: number
): Observable<ResourceState<GiftCertificate>> {
  return store.select(selectCache).pipe(
    map(cache => cache.get(id)),
    filterExisting(),
    distinctUntilChanged()
  );
}

export function certificateLoading$(
  store: Store,
  id: number
): Observable<boolean> {
  return certificateState$(store, id).pipe(
    map(state => state.loading),
    distinctUntilChanged()
  );
}

export function certificateError$(store: Store, id: number): Observable<any> {
  return certificateState$(store, id).pipe(
    map(state => state.error),
    filterExisting(),
    distinctUntilChanged()
  );
}

export function certificateData$(
  store: Store,
  id: number
): Observable<GiftCertificate> {
  return certificateState$(store, id).pipe(
    map(state => state.data),
    filterExisting(),
    distinctUntilChanged()
  );
}

export const CertificatesQuery = {
  selectors: {
    selectCache,
  },
  factories: {
    certificateState$,
    certificateLoading$,
    certificateError$,
    certificateData$,
  },
};
