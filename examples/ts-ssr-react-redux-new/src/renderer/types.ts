import type {
  PageContextBuiltIn,
  /*
  // When using Client Routing https://vite-plugin-ssr.com/clientRouting
  PageContextBuiltInClientWithClientRouting as PageContextBuiltInClient
  /*/
  // When using Server Routing
  PageContextBuiltInClientWithServerRouting as PageContextBuiltInClient,
  //*/
} from "vite-plugin-ssr/types";

type PageProps = Record<string, unknown>;
type Page = (pageProps: PageProps) => React.ReactElement;

type PageContextCustom = {
  Page: Page;
  pageProps?: PageProps;
  urlPathname: string;
  exports: {
    documentProps?: {
      title?: string;
      description?: string;
    };
  };
  PRELOADED_STATE: { value: number };
  pageHtml: string;
};

type PageContextServer = PageContextBuiltIn<Page> & PageContextCustom;
type PageContextClient = PageContextBuiltInClient<Page> & PageContextCustom;

type PageContext = PageContextClient | PageContextServer;

export type { PageContextCustom };
export type { PageContextServer };
export type { PageContextClient };
export type { PageContext };
export type { PageProps };
