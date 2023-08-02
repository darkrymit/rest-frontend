import { createFeature, createReducer, on } from '@ngrx/store';
import { CertificatesActions } from '@store/certificates/certificates.actions';
import {
  CertificatesState,
  initialCertificatesState,
  ResourceState,
} from '@store/certificates/certificates.state';
import { GiftCertificate } from '@api/models';

function generateUpdatedMap<K, V>(
  originalMap: Map<K, V>,
  newData: { key: K; value: V }[]
) {
  let newMap = new Map<K, V>();
  originalMap.forEach((value, key) => {
    newMap.set(key, value);
  });
  newData.forEach(item => {
    newMap.set(item.key, item.value);
  });
  return newMap;
}

export const CertificatesFeature = createFeature({
  name: 'certificates',
  reducer: createReducer(
    initialCertificatesState,
    on(
      CertificatesActions.loadCertificateById,
      (state: CertificatesState, { id }): CertificatesState => {
        let certificateState = state.cache.get(id);
        let resourceState!: ResourceState<GiftCertificate>;
        if (!certificateState) {
          resourceState = {
            data: null,
            loading: true,
            error: null,
          };
        } else {
          resourceState = {
            ...certificateState,
            loading: true,
          };
        }
        return {
          ...state,
          cache: generateUpdatedMap(state.cache, [
            { key: id, value: resourceState },
          ]),
        };
      }
    ),
    on(
      CertificatesActions.loadCertificateByIdSuccess,
      (state, { id, certificate }): CertificatesState => {
        let certificateState = state.cache.get(id);
        if (!certificateState) {
          throw new Error('Certificate state not found');
        }
        return {
          ...state,
          cache: generateUpdatedMap(state.cache, [
            {
              key: id,
              value: {
                ...certificateState,
                lastUpdated: new Date(),
                data: certificate,
                loading: false,
              },
            },
          ]),
        };
      }
    ),
    on(
      CertificatesActions.loadCertificateByIdFailure,
      (state, { id, error }): CertificatesState => {
        let certificateState = state.cache.get(id);
        if (!certificateState) {
          throw new Error('Certificate state not found');
        }
        return {
          ...state,
          cache: generateUpdatedMap(state.cache, [
            {
              key: id,
              value: {
                ...certificateState,
                loading: false,
                error: error,
              },
            },
          ]),
        };
      }
    )
  ),
});
