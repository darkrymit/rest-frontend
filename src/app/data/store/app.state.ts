import { CartEffects, CartFeature, CartState } from '@store/cart';
import {
  CertificatesEffects,
  CertificatesFeature,
  CertificatesState,
} from '@store/certificates';

export interface AppState {
  [CartFeature.name]: CartState;
  [CertificatesFeature.name]: CertificatesState;
}

export const appReducers = {
  [CartFeature.name]: CartFeature.reducer,
  [CertificatesFeature.name]: CertificatesFeature.reducer,
};

export const appEffects = [CartEffects, CertificatesEffects];
