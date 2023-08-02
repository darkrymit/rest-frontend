import { GiftCertificate } from '@api/models';

export interface CertificatesState {
  cache: Map<number, ResourceState<GiftCertificate>>;
}

export interface ResourceState<T> {
  data: T | null;
  loading: boolean;
  error: any;
  lastUpdated?: Date;
}

export const initialCertificatesState: CertificatesState = {
  cache: new Map<number, ResourceState<GiftCertificate>>(),
};
