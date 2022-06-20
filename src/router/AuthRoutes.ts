import {Router} from 'express';
import {Dao} from '../dao/Dao';
import {validationMiddleware} from '../joi/middleware/middleware';
import {
    citizenSchema,
    dataSchema,
} from '../joi/schemas/schema';
import {CitizenController} from '../controllers/CitizenController';

class AuthRoutes {
    public  router: Router;
    private citizenCtlr: CitizenController;
    private readonly dao: Dao;

    constructor(_dao: Dao) {
        this.router = Router();
        this.dao = _dao;
        this.routes();
    }

    // Authentication & Authorization required for the API requests below.
    private routes(): void {
        this.citizenCtlr = new CitizenController(this.dao);
        this.router.get('/users/citizens', validationMiddleware(dataSchema.pagination, 'query'), (req, res) => {this.citizenCtlr.getUser(req, res)});
        this.router.get('/users/citizen/:nationalID', validationMiddleware(citizenSchema.citizen, 'params'), (req, res) => {this.citizenCtlr.getUser(req, res)});
       }
}

export {AuthRoutes};
