import React from "react";
import { fetchLatestNews } from "./fetcher/news";

export const News = () => {
  const [list, setList] = React.useState<string[]>();
  const [error, setError] = React.useState<string>();
  const handleClick = async (mockError: boolean) => {
    try {
      const { data, err, status } = await fetchLatestNews(3, mockError);
      if (data) {
        setList(data.map((news) => news.title));
        setError(undefined);
      }
      if (err) {
        setList(undefined);
        setError(err.error);
      }
      console.log(status);
    } catch (err) {
      // HttpError 以外のエラー、ネットワークエラーなど
      console.log(err, "catch err");
    }
  };
  return (
    <div>
      <button onClick={() => handleClick(false)}>getNews(tobe success)</button>
      <button onClick={() => handleClick(true)}>getNews(tobe fail)</button>
      {!!list && (
        <ul>
          {list.map((item, i) => (
            <li key={i}>{item}</li>
          ))}
        </ul>
      )}
      {!!error && <p>{error}</p>}
    </div>
  );
};
