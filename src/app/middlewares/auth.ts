import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

export default function auth(req: Request, res: Response, next: NextFunction): Response | void {
    const { authorization } = req.headers;
    if(!authorization) return res.send({
        success: false,
        message: 'No token was sent!',
        errCode: 0
    });
    if(authorization.split(' ').length !== 2) return res.send({
        success: false,
        errCode: 1,
        message: 'Invalid token!'
    });
    const [key, token] = authorization.split(' ');
    if(key !== 'Bearer') return res.send({
        success: false,
        errCode: 1,
        message: 'Invalid token!'
    });
    const secret = process.env.SECRET as string;
    jwt.verify(token, secret, (err, decoded) => {
        if(err) return res.send({
            success: false,
            message: 'Invalid or expired tokend',
            errCode: 2
        });
        if(!decoded) return res.send({
            success: false,
            message: 'Invalid or expired tokend',
            errCode: 2
        });
        req.userId = decoded.id;
        next();
    });
}
