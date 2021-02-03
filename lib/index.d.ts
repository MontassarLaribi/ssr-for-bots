import { NextFunction, Request, Response } from "express";
interface Options {
    prerender: Array<string>;
    exclude: Array<string>;
    useCache: boolean;
    cacheRefreshRate: number;
}
declare function ssrForBots(options: Options): (req: Request, res: Response, next: NextFunction) => void;
export default ssrForBots;
