declare namespace Express {
    export interface Request {
        userId?: string;
        lang: 'en' | 'pt';
    }
}
