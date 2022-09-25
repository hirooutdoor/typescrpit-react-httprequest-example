import type { HttpData, HttpError } from "./types";
/**
 * レスポンス畳み込み関数
 * @param throwError !res.ok の場合 throw するフラグ
 */
export function convoluteHttpError(throwError = false) {
  return (res: Response) => {
    const { status, ok } = res;
    return res.json().then((d) => {
      if (ok) {
        // HttpData型（正常系）に畳み込む
        const res: HttpData = { data: d, status };
        return res;
      }
      // HttpError型（異常系）に畳み込む
      const res: HttpError = { err: d, status };
      if (!throwError) return res;
      throw res;
    });
  };
}
/**
 * HttpError<Error> を HttpError<T> に変換
 */
export function handleReject<T>(
  errFactory: (err: Error) => T,
  throwError = false
) {
  return (err: unknown) => {
    if (err instanceof Error) {
      const res: HttpError = { err: errFactory(err), status: -1 };
      if (!throwError) return res;
      throw res;
    }
    throw err;
  };
}
