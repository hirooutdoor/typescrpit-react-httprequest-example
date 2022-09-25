import { HttpResponse, convoluteHttpError, handleReject } from "../core";
import { News, NewsError } from "./types";
/**
 * レスポンス畳み込みラッパー関数
 * @param fetcher Natice fetch API
 * @param throwError !res.ok の場合 throw するフラグ
 */
function fetchData<T, K>(
  fetcher: () => Promise<Response>,
  throwError = false
): Promise<HttpResponse<T, K>> {
  return fetcher()
    .then(convoluteHttpError(throwError))
    .catch((err) =>
      handleReject<NewsError>(
        (err) => ({ error: err.message }),
        throwError
      )(err)
    );
}

export function fetchNewStories(mockError = false, init?: RequestInit) {
  const v = mockError ? "v1" : "v0";
  return fetchData<number[], NewsError>(() =>
    fetch(`https://hacker-news.firebaseio.com/${v}/newstories.json`, init)
  );
}

export function fetchNewsItem(
  id: string,
  mockError = false,
  init?: RequestInit
) {
  const v = mockError ? "v1" : "v0";
  return fetchData<News, NewsError>(() =>
    fetch(`https://hacker-news.firebaseio.com/${v}/item/${id}.json`, init)
  );
}
