import {NextFunction, Request, Response} from 'express';
import jwt from 'jsonwebtoken';

export const checkToken = (req: Request, res: Response, next: NextFunction) => {
    const SECRET = process.env.SECRET;

    let token:any = req.headers['x-access-token'] || req.headers['authorization'] || req.body.token; // Express headers are auto converted to lowercase

    if (token) {
        if (token.startsWith('Bearer ')) {
            // Remove Bearer from string
            token = token.slice(7, token.length);
        }
        jwt.verify(token, SECRET, (err: any, decoded: any) => {
            if (err) {
                return res.status(400).json({errors: [{message: 'Invalid token!', code: 51}]});

            } else {
                // req.decoded = decoded;
                next();
            }
        });
    } else {
        return res.status(400).json({errors: [{message: 'Auth token not supplied', code: 50}]});

    }
};