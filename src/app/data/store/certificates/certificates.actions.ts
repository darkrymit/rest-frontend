import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { GiftCertificate } from '@api/models';

export const CertificatesActions = createActionGroup({
  source: 'Certificates',
  events: {
    'Load Certificate By Id': props<{ id: number }>(),
    'Load Certificate By Id Success': props<{
      id: number;
      certificate: GiftCertificate;
      fromCache: boolean;
    }>(),
    'Load Certificate By Id Failure': props<{ id: number; error: any }>(),
  },
});
