import React from "react";
import createMatcher from "feather-route-matcher";

interface WebpackModule {
  get(module: string): Promise<() => { default: React.ComponentType }>;
  init(shareScope: unknown): Promise<void>;
  __initialized?: boolean;
}

declare global {
  interface Window {
    [key: string]: WebpackModule | undefined;
  }
  // eslint-disable-next-line no-var
  var __webpack_share_scopes__: { default: unknown };
}

interface PageMapEntry {
  remote: string;
  module: string;
}

interface RemoteMap {
  remote: string;
  config: Record<string, string>;
}

interface FederatedProps {
  FederatedPage?: React.ComponentType;
  render404?: boolean;
  renderError?: boolean;
  needsReload?: boolean;
  [key: string]: unknown;
}

export async function matchFederatedPage(remotes: string[], path: string): Promise<unknown> {
  const maps = await Promise.all(
    remotes.map((remote) =>
      (window[remote] as WebpackModule)
        .get("./pages-map")
        .then((factory) => ({ remote, config: factory().default as unknown as Record<string, string> }))
        .catch(() => null)
    )
  );

  const config: Record<string, PageMapEntry> = {};

  for (const map of maps as (RemoteMap | null)[]) {
    if (!map) continue;

    for (const [pagePath, mod] of Object.entries(map.config)) {
      config[pagePath] = {
        remote: map.remote,
        module: mod,
      };
    }
  }

  const matcher = createMatcher(config);
  const match = matcher(path);

  return match;
}

export function createFederatedCatchAll(remotes: string[]): React.FC<FederatedProps> & {
  getInitialProps: (ctx: Record<string, unknown>) => Promise<FederatedProps>;
} {
  const FederatedCatchAll = (initialProps: FederatedProps) => {
    const [lazyProps, setProps] = React.useState<FederatedProps>({});

    const { FederatedPage, render404, renderError, needsReload, ...props } = {
      ...lazyProps,
      ...initialProps,
    };

    React.useEffect(() => {
      if (needsReload) {
        FederatedCatchAll.getInitialProps(props).then((federatedProps) => {
          setProps(federatedProps);
        });
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [needsReload]);

    if (render404) {
      // TODO: Render 404 page
      return React.createElement("h1", {}, "404 Not Found");
    }
    if (renderError) {
      // TODO: Render error page
      return React.createElement("h1", {}, "Oops, something went wrong.");
    }

    if (FederatedPage) {
      return React.createElement(FederatedPage, props);
    }

    return null;
  };

  FederatedCatchAll.getInitialProps = async (ctx: Record<string, unknown>): Promise<FederatedProps> => {
    const { err, req, res, AppTree, ...props } = ctx;

    if (err) {
      // TODO: Run getInitialProps for error page
      return { renderError: true, ...props };
    }

    if (typeof window === "undefined") {
      return { needsReload: true, ...props };
    }

    try {
      const matchedPage = await matchFederatedPage(remotes, ctx.asPath as string) as {
        value?: PageMapEntry;
        params?: Record<string, string>;
      };
      console.log("matchedPage", matchedPage);

      const remote = matchedPage?.value?.remote;
      const mod = matchedPage?.value?.module;

      if (!remote || !mod) {
        // TODO: Run getInitialProps for 404 page
        return { render404: true, ...props };
      }

      console.log("loading exposed module", mod, "from remote", remote);
      try {
        const remoteModule = window[remote] as WebpackModule;
        if (!remoteModule.__initialized) {
          remoteModule.__initialized = true;
          await remoteModule.init(__webpack_share_scopes__.default);
        }
      } catch (initErr) {
        console.log("initErr", initErr);
      }

      const FederatedPage = await (window[remote] as WebpackModule)
        .get(mod)
        .then((factory) => factory().default);
      console.log("FederatedPage", FederatedPage);
      if (!FederatedPage) {
        // TODO: Run getInitialProps for 404 page
        return { render404: true, ...props };
      }

      const modifiedContext = {
        ...ctx,
        query: matchedPage.params,
      };
      const federatedPageProps =
        ((await (FederatedPage as React.ComponentType & { getInitialProps?: (ctx: unknown) => Promise<Record<string, unknown>> }).getInitialProps?.(modifiedContext)) || {});
      return { ...federatedPageProps, FederatedPage };
    } catch (err) {
      console.log("err", err);
      // TODO: Run getInitialProps for error page
      return { renderError: true, ...props };
    }
  };

  return FederatedCatchAll as React.FC<FederatedProps> & {
    getInitialProps: (ctx: Record<string, unknown>) => Promise<FederatedProps>;
  };
}
