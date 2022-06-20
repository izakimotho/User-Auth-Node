import {Router} from 'express';
import {Dao} from '../dao/Dao';
import {validationMiddleware} from '../joi/middleware/middleware';
import {citizenSchema} from '../joi/schemas/schema';
import {CitizenController} from '../controllers/CitizenController';
import {UserController} from '../controllers/UserController';
class NoAuthRoutes {
    public router: Router;
    private userCtlr: UserController;
    private citizenCtlr: CitizenController;
    private readonly dao: Dao;

    constructor(_dao: Dao) {
        this.router = Router();
        this.dao = _dao;
        this.routes();
    }

    // Authentication & Authorization NOT required for the API
    // requests below
    // {/register} {/login}
    private routes(): void {
        this.userCtlr = new UserController(this.dao);
        this.citizenCtlr = new CitizenController(this.dao);
        this.router.get('/', (req, res) => {
            res.status(200).json({message: 'Welcome to localhost API'});
        });

        this.router.get('/health/check', (req, res) => {
            res.status(200).json({message: 'Healthy', upTime: Date.now(), curTime: Date.now()});
        });

       this.router.post('/users/citizen/login', validationMiddleware(citizenSchema.login, 'body'), (req, res) => {this.userCtlr.userLogin(req, res)});


    }
}

export  {NoAuthRoutes};
