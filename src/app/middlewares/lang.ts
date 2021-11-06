import { Request, Response, NextFunction } from 'express';

export default function lang(req: Request, res: Response, next: NextFunction): void {
    const { lang } = req.headers;
    if(!lang) {
        req.lang = 'en';
        return next();
    }
    if(typeof lang !== 'string') {
        req.lang = 'en';
        return next();
    }
    if(lang.startsWith('pt')) {
        req.lang = 'pt';
        return next();
    }
    req.lang = 'en';
    return next();
}
