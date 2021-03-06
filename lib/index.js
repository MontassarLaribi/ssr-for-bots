"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var ssr_1 = require("./ssr");
function ssrForBots(options) {
    if (options === void 0) { options = {
        prerender: [],
        exclude: [],
        useCache: true,
        cacheRefreshRate: 86400,
    }; }
    var applyOptions = Object.assign({
        prerender: [],
        exclude: [],
        useCache: true,
        cacheRefreshRate: 86400,
    }, options);
    // Default user agents
    var prerenderArray = [
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
    var excludeArray = [".xml", ".ico", ".txt", ".json"];
    function ssrOnDemand(req, res, next) {
        var _this = this;
        Promise.resolve(function () {
            return true;
        })
            .then(function () { return __awaiter(_this, void 0, void 0, function () {
            var userAgent, prerender, exclude, _a, html, status_1;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        userAgent = req.headers["user-agent"] || "";
                        prerender = new RegExp(__spreadArrays(prerenderArray, applyOptions.prerender).join("|").slice(0, -1), "i").test(userAgent);
                        exclude = !new RegExp(__spreadArrays(excludeArray, applyOptions.exclude).join("|").slice(0, -1)).test(req.originalUrl);
                        if (!(req.originalUrl && prerender && exclude)) return [3 /*break*/, 2];
                        return [4 /*yield*/, ssr_1.ssr(req.protocol + "://" + req.get("host") + req.originalUrl, applyOptions.useCache, applyOptions.cacheRefreshRate)];
                    case 1:
                        _a = _b.sent(), html = _a.html, status_1 = _a.status;
                        return [2 /*return*/, res.status(status_1).send(html)];
                    case 2: return [2 /*return*/, next()];
                }
            });
        }); })
            .catch(next);
    }
    return ssrOnDemand;
}
exports.default = ssrForBots;
//# sourceMappingURL=index.js.map