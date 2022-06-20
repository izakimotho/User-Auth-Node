"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const joi_1 = __importDefault(require("joi"));
exports.validationMiddleware = (schema, property) => {
    return (req, res, next) => {
        console.log(req[property]);
        joi_1.default.validate(req[property], schema).then((results) => {
            next();
        }).catch((err) => {
            const { details } = err;
            res.status(400).json({ errors: [{ message: details[0].message, code: 30 }] });
        });
    };
};
//# sourceMappingURL=middleware.js.map