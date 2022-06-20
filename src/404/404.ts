import {NextFunction, Request, Response} from 'express';

export const error_404 = (req: Request, res: Response, next: NextFunction) => {
    return res.status(404).send({ errors: [ {message: `${req.url} Not found.`, code: 404}] });
};

export const error_500 = (err: any, req: Request, res: Response, next: NextFunction) => {
    return res.status(500).send({ errors: [ {message: err, code: 500}] });
};