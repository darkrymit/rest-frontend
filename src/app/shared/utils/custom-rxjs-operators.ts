import {
  concatMap,
  filter,
  Observable,
  of,
  OperatorFunction,
  pipe,
  UnaryFunction,
} from 'rxjs';

// https://stackoverflow.com/questions/54099238/rxjs-execute-tap-only-at-the-first-time

export function tapFirst<T>(tapFn: (t: T) => void): OperatorFunction<T, T> {
  return tapWhen(tapFn, (index, t) => index === 0);
}

export function tapOnce<T>(
  tapFn: (t: T) => void,
  tapIndex = 0
): OperatorFunction<T, T> {
  return tapWhen(tapFn, (index, t) => index === tapIndex);
}

export function tapWhen<T>(
  tapFn: (t: T) => void,
  evaluateFn: (index: number, t: T) => boolean
): OperatorFunction<T, T> {
  return source$ =>
    source$.pipe(
      concatMap((value, index) => {
        if (evaluateFn(index, value)) {
          tapFn(value);
        }
        return of(value);
      })
    );
}

// used void because never will not throw an error
export function filterExisting<T, R = T extends null ? never : T>(
  mode: 'null'
): UnaryFunction<Observable<T | null>, Observable<R>>;
export function filterExisting<T, R = T extends undefined ? never : T>(
  mode: 'undefined'
): UnaryFunction<Observable<T | undefined>, Observable<R>>;
export function filterExisting<T, R = T extends null | undefined ? never : T>(
  mode: 'nullish'
): UnaryFunction<Observable<T | null | undefined>, Observable<R>>;
export function filterExisting<T, R = T extends null | undefined ? never : T>(
  mode?: 'falsy'
): UnaryFunction<Observable<T | null | undefined>, Observable<R>>;

// since we already take care of all the possible cases, we can use any here
export function filterExisting<T, R>(
  mode?: 'null' | 'undefined' | 'nullish' | 'falsy'
): UnaryFunction<Observable<T>, Observable<R>> {
  let predicate: (x: any) => boolean;
  switch (mode) {
    case 'null':
      predicate = x => x !== null;
      break;
    case 'undefined':
      predicate = x => x !== undefined;
      break;
    case 'nullish':
      predicate = x => x != null;
      break;
    case 'falsy':
    default:
      predicate = x => !!x;
  }
  return pipe(filter(predicate));
}
