const newsExample = {
  by: "weinzierl",
  descendants: 0,
  id: 31168945,
  score: 1,
  time: 1650987927,
  title: "List of JSON tools for command line",
  type: "story",
  url: "https://ilya-sher.org/2018/04/10/list-of-json-tools-for-command-line/"
};

export type News = typeof newsExample;

export type NewsError = { error: string };
