import {NextFunction, Request, Response} from 'express';
import Joi from 'joi';

interface IRequest {
    [key: string]: any;
}

export const validationMiddleware = (schema: any, property: string) => {
    return (req: any, res: Response, next: NextFunction) => {
        console.log(req[property]);
        Joi.validate(req[property], schema).then((results) => {
            next();
        }).catch((err) => {
            const {details} = err;
            res.status(400).json({errors: [{message: details[0].message, code: 30}]})
        });
    }
};