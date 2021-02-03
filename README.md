# ssr-for-bots

Basic SSR middleware for Express. Use to prerender your pages for bots so they can read your meta-data if you're using a client side rendering app, or if you want to boost your website SEO score.

Note: this module uses puppeteer. It also stores all the prendered pages to an internal cache store. It's fine for boosting SEO scores, and making the bots able to read meta-data (In case of a React CRA app for example) but it might not produce the desired effect when attempting to use it to serve your pages to users. If you need a more viable solution, I recommend using a framework that uses SSR by default.

## Install

```sh
$ npm install --save ssr-for-bots
```

Or if you're using yarn

```sh
$ yarn add ssr-for-bots
```

## Usage

For a server where the ssr service should be applied:

```js
const ssrForBots = require("ssr-for-bots");

const defaultOptions = {
  prerender: [], // Array containing the user-agents that will trigger the ssr service | uses Regex
  exclude: [], // Array containing paths and/or extentions that will be excluded from being prerendered by the ssr service | uses Regex
  useCache: true, // Variable that determins if we will use page caching or not
  cacheRefreshRate: 86400, // Seconds of which the cache will be kept alive, pass 0 or negative value for infinite lifespan
};

// If  you're service an API on a route called /api for example add it too the exclude :
// exclude: ["/api/"]

//  apply to all requests
app.use(ssrForBots());

// or if you want to use options
app.use(ssrForBots(defaultOptions));
```

## Configuration options

### prerender

Array containing the `user-agents` that will trigger the ssr service `uses Regex`.

Note: The array you pass `will be added` to the default array list.

Defaults to `["bot","googlebot","Chrome-Lighthouse","DuckDuckBot","ia_archiver","bingbot","yandex","baiduspider","Facebot","facebookexternalhit","facebookexternalhit/1.1","twitterbot","rogerbot","linkedinbot","embedly","quora link preview","showyoubot","outbrain","pinterest","slackbot","vkShare","W3C_Validator"]`.

### exclude

Array containing the `paths` that will be excluded from the ssr service `uses Regex`.

Note: The array you pass `will be added` to the default array list.

Defaults to `[".xml", ".ico", ".txt", ".json"]`.

Example if you're serving an API on `/api` path add : `["/api/"]` it will exclude all paths that `contains "/api/"`

### useCache

Determins if you want to use cache or not.

The service uses a map to cache all prerendered urls and will return them immediatly if they're cached.

Defaults to `true`

### cacheRefreshRate

Cache refresh rate will determine the cache life span expressed in `seconds`.

If a page has been cached for more than the cache refresh rate, it will be removed from cache, rerendered and put back to cache right after.

Defaults to `86400` : 24 hours

## License

MIT © [Montassar Laribi](https://montassarlaribi.com/)
