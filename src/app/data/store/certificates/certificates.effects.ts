import { Injectable } from '@angular/core';

import { Actions, concatLatestFrom, createEffect, ofType } from '@ngrx/effects';

import { catchError, exhaustMap, map, mergeMap, of, switchMap } from 'rxjs';
import { CertificatesActions } from '@store/certificates/certificates.actions';
import { GiftCertificateService } from '@api/services';
import { GiftCertificate } from '@api/models';
import { Store } from '@ngrx/store';
import { CertificatesQuery } from '@store/certificates/certificates.selectors';

@Injectable()
export class CertificatesEffects {
  loadCertificateById$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(CertificatesActions.loadCertificateById),
      concatLatestFrom(action =>
        CertificatesQuery.factories.certificateState$(this.store, action.id)
      ),
      mergeMap(([{ id }, state]) => {
        let lastUpdated = state?.lastUpdated;
        if (state.data && lastUpdated && !this.isExpired(lastUpdated)) {
          return of(state.data).pipe(
            map((certificate: GiftCertificate) =>
              CertificatesActions.loadCertificateByIdSuccess({
                id,
                certificate,
                fromCache: true,
              })
            ),
            catchError((error: any) =>
              of(CertificatesActions.loadCertificateByIdFailure({ id, error }))
            )
          );
        }
        return this.service.getById(id).pipe(
          map((certificate: GiftCertificate) =>
            CertificatesActions.loadCertificateByIdSuccess({
              id,
              certificate,
              fromCache: false,
            })
          ),
          catchError((error: any) =>
            of(CertificatesActions.loadCertificateByIdFailure({ id, error }))
          )
        );
      })
    );
  });
  private maxCacheDuration = 1000 * 60 * 5;

  constructor(
    private actions$: Actions,
    private service: GiftCertificateService,
    private store: Store
  ) {}

  isExpired(lastUpdated: Date): boolean {
    return lastUpdated <= new Date(Date.now() - this.maxCacheDuration);
  }
}
