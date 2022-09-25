import { StrictMode } from "react";
import * as ReactDOMClient from "react-dom/client";
import { News } from "./News";

const rootElement = document.getElementById("root");
const root = ReactDOMClient.createRoot(rootElement);

root.render(
  <StrictMode>
    <div className="App">
      <h1>hacker-news</h1>
      <News />
    </div>
  </StrictMode>
);
