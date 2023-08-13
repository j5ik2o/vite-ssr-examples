import React from "react";
import ReactDOM from "react-dom/client";
import { PageLayout } from "./PageLayout";

let root;

const render = async (pageContext) => {
  const { Page, routeParams } = pageContext;

  const page = (
    <PageLayout>
      <Page routeParams={routeParams} />
    </PageLayout>
  );

  const container = document.getElementById("page-view");
  if (pageContext.isHydration) {
    root = ReactDOM.hydrateRoot(container, page);
  } else {
    if (!root) {
      root = ReactDOM.createRoot(container);
    }
    root.render(page);
  }
};

const clientRouting = true;
const hydrationCanBeAborted = true;

export { render, clientRouting, hydrationCanBeAborted };
