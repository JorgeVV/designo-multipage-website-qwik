import type { RenderToStreamOptions } from "@builder.io/qwik/server";
import { renderToStream } from "@builder.io/qwik/server";
import { manifest } from "@qwik-client-manifest";
import Root from "./root";

/**
 * Server-Side Render method to be called by a server.
 */
export default function (opts: RenderToStreamOptions) {
  // Render the Root component to a string
  // Pass in the manifest that was generated from the client build
  return renderToStream(<Root />, {
    manifest,
    ...opts,
    streaming: {
      ...opts?.streaming,
      inOrder: {
        ...opts?.streaming?.inOrder,
        strategy: "auto",
      },
    },
    prefetchStrategy: {
      ...opts.prefetchStrategy,
      implementation: {
        linkInsert: null,
        workerFetchInsert: null,
        prefetchEvent: "always",
      },
    },
  });
}
