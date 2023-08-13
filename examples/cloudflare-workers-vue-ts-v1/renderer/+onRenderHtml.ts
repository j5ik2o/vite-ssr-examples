// https://vite-plugin-ssr.com/onRenderHtml
import { pipeToWebWritable, pipeToNodeWritable } from "@vue/server-renderer";

import { escapeInject, stampPipe } from "vite-plugin-ssr/server";
import { createApp } from "./app";
import type { Writable } from "stream";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const onRenderHtml = async (pageContext: any) => {
  const app = createApp(pageContext);

  // Streaming is optional: we can use renderToString() instead.
  const pipe = isWorker()
    ? (writable: WritableStream) => {
        pipeToWebWritable(app, {}, writable);
      }
    : // While developing, we use Vite's development sever instead of a Cloudflare worker. Instead of `pipeToNodeWritable()`, we could as well use `renderToString()`.
      (writable: Writable) => {
        pipeToNodeWritable(app, {}, writable);
      };
  stampPipe(pipe, isWorker() ? "web-stream" : "node-stream");

  const documentHtml = escapeInject`<!DOCTYPE html>
    <html>
      <body>
        <div id="app">${pipe}</div>
      </body>
    </html>`;

  return {
    documentHtml,
    pageContext: {
      enableEagerStreaming: true,
    },
  };
};

// https://github.com/cloudflare/wrangler2/issues/1481
// https://community.cloudflare.com/t/how-to-detect-the-cloudflare-worker-runtime/293715
const isWorker = () => {
  return (
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    typeof WebSocketPair !== "undefined" || typeof caches !== "undefined"
  );
};

export default onRenderHtml;
