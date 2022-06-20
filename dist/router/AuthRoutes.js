"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const middleware_1 = require("../joi/middleware/middleware");
const schema_1 = require("../joi/schemas/schema");
const CitizenController_1 = require("../controllers/CitizenController");
class AuthRoutes {
    constructor(_dao) {
        this.router = express_1.Router();
        this.dao = _dao;
        this.routes();
    }
    // Authentication & Authorization required for the API requests below.
    routes() {
        this.citizenCtlr = new CitizenController_1.CitizenController(this.dao);
        this.router.get('/users/citizens', middleware_1.validationMiddleware(schema_1.dataSchema.pagination, 'query'), (req, res) => { this.citizenCtlr.getUser(req, res); });
        this.router.get('/users/citizen/:nationalID', middleware_1.validationMiddleware(schema_1.citizenSchema.citizen, 'params'), (req, res) => { this.citizenCtlr.getUser(req, res); });
    }
}
exports.AuthRoutes = AuthRoutes;
//# sourceMappingURL=AuthRoutes.js.map