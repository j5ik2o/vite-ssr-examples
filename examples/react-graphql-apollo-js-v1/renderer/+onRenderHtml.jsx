// https://vite-plugin-ssr.com/onRenderHtml
import React from "react";
import { escapeInject, dangerouslySkipEscape } from "vite-plugin-ssr/server";
import { getDataFromTree } from "@apollo/client/react/ssr";
import App from "./App";

const onRenderHtml = async (pageContext) => {
  const { Page, apolloClient } = pageContext;

  // See https://www.apollographql.com/docs/react/performance/server-side-rendering/
  const tree = (
    <App apolloClient={apolloClient}>
      <Page />
    </App>
  );
  const pageHtml = await getDataFromTree(tree);
  const apolloIntialState = apolloClient.extract();

  const documentHtml = escapeInject`<!DOCTYPE html>
    <html>
      <body>
        <div id="page-content">${dangerouslySkipEscape(pageHtml)}</div>
      </body>
    </html>`;

  return {
    documentHtml,
    pageContext: {
      apolloIntialState,
    },
  };
};

export default onRenderHtml;
