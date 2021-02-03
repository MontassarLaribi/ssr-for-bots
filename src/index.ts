import { NextFunction, Request, Response } from "express";
import { ssr } from "./ssr";

interface Options {
  prerender: Array<string>;
  exclude: Array<string>;
  useCache: boolean;
  cacheRefreshRate: number;
}

function ssrForBots(options: Options) {
  options = Object.assign(
    {
      prerender: [], // Array containing the user-agents that will trigger the ssr service
      exclude: [], // Array containing paths and/or extentions that will be excluded from being prerendered by the ssr service
      useCache: true, // Variable that determins if we will use page caching or not
      cacheRefreshRate: 86400, // Seconds of which the cache will be kept alive, pass 0 or negative value for infinite lifespan
    },
    options
  );

  // Default user agents
  const prerenderArray = [
    "bot",
    "googlebot",
    "Chrome-Lighthouse",
    "DuckDuckBot",
    "ia_archiver",
    "bingbot",
    "yandex",
    "baiduspider",
    "Facebot",
    "facebookexternalhit",
    "facebookexternalhit/1.1",
    "twitterbot",
    "rogerbot",
    "linkedinbot",
    "embedly",
    "quora link preview",
    "showyoubot",
    "outbrain",
    "pinterest",
    "slackbot",
    "vkShare",
    "W3C_Validator",
  ];

  // default exclude array
  const excludeArray = [".xml", ".ico", ".txt", ".json"];

  function ssrOnDemand(req: Request, res: Response, next: NextFunction) {
    Promise.resolve(() => {
      return true;
    })
      .then(async () => {
        const userAgent: string = req.headers["user-agent"] || "";

        const prerender = new RegExp(
          [...prerenderArray, ...options?.prerender].join("|").slice(0, -1),
          "i"
        ).test(userAgent);

        const exclude = !new RegExp(
          [...excludeArray, ...options?.exclude].join("|").slice(0, -1)
        ).test(req.originalUrl);

        if (req.originalUrl && prerender && exclude) {
          const { html, status } = await ssr(
            req.protocol + "://" + req.get("host") + req.originalUrl,
            options?.useCache,
            options?.cacheRefreshRate
          );
          return res.status(status).send(html);
        } else {
          return next();
        }
      })
      .catch(next);
  }

  return ssrOnDemand;
}

export default ssrForBots;
