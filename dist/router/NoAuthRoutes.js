"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const middleware_1 = require("../joi/middleware/middleware");
const schema_1 = require("../joi/schemas/schema");
const CitizenController_1 = require("../controllers/CitizenController");
const UserController_1 = require("../controllers/UserController");
class NoAuthRoutes {
    constructor(_dao) {
        this.router = express_1.Router();
        this.dao = _dao;
        this.routes();
    }
    // Authentication & Authorization NOT required for the API
    // requests below
    // {/register} {/login}
    routes() {
        this.userCtlr = new UserController_1.UserController(this.dao);
        this.citizenCtlr = new CitizenController_1.CitizenController(this.dao);
        this.router.get('/', (req, res) => {
            res.status(200).json({ message: 'Welcome to localhost API' });
        });
        this.router.get('/health/check', (req, res) => {
            res.status(200).json({ message: 'Healthy', upTime: Date.now(), curTime: Date.now() });
        });
        this.router.post('/users/citizen/login', middleware_1.validationMiddleware(schema_1.citizenSchema.login, 'body'), (req, res) => { this.userCtlr.userLogin(req, res); });
    }
}
exports.NoAuthRoutes = NoAuthRoutes;
//# sourceMappingURL=NoAuthRoutes.js.map