import { succeedAll, HttpResponse, filterErrors } from "../core";
import { News, NewsError } from "./types";
import { fetchNewStories, fetchNewsItem } from "./fetcher";

export async function fetchLatestNews(
  amount = 3,
  mockError = false
): Promise<HttpResponse<News[], NewsError>> {
  const newStories = await fetchNewStories();
  if (!newStories.data) {
    return newStories;
  }
  const ids = newStories.data.slice(0, amount);
  const newsList = await Promise.all(
    ids.map((id) => fetchNewsItem(`${id}`, mockError))
  );
  if (succeedAll(newsList)) {
    // 全て正常系の場合
    return {
      data: newsList.map((news) => news.data),
      status: 200
    };
  } else {
    // 異常系が含まれる場合
    const errors = filterErrors(newsList).sort((a, b) =>
      a.status > b.status ? -1 : 1
    );
    return {
      err: errors[0].err,
      status: errors[0].status
    };
  }
}
