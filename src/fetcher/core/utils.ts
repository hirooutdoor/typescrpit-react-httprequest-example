import type {
  HttpSucceedResponse,
  HttpFailedResponse,
  HttpResponse,
  HttpError
} from "./types";

export function succeedAll<T, K>(
  res: HttpResponse<T, K>[]
): res is HttpSucceedResponse<T>[] {
  // data が全て Truthy
  return res.every(({ data }) => !!data);
}

export function failedSome<T, K>(
  res: HttpResponse<T, K>[]
): res is HttpResponse<T, K>[] {
  // err がいずれか Truthy
  return res.some(({ err }) => !!err);
}

export function isHttpError(err: any): err is HttpError {
  return typeof err["err"] !== undefined && typeof err["status"] === "number";
}

export function filterErrors<T, K>(
  res: HttpResponse<T, K>[]
): HttpFailedResponse<K>[] {
  // HttpFailedResponse 配列に絞り込み
  return res.filter((row): row is HttpFailedResponse<K> => !!row.err);
}
