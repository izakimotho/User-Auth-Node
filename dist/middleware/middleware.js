"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
exports.checkToken = (req, res, next) => {
    const SECRET = process.env.SECRET;
    let token = req.headers['x-access-token'] || req.headers['authorization'] || req.body.token; // Express headers are auto converted to lowercase
    if (token) {
        if (token.startsWith('Bearer ')) {
            // Remove Bearer from string
            token = token.slice(7, token.length);
        }
        jsonwebtoken_1.default.verify(token, SECRET, (err, decoded) => {
            if (err) {
                return res.status(400).json({ errors: [{ message: 'Invalid token!', code: 51 }] });
            }
            else {
                // req.decoded = decoded;
                next();
            }
        });
    }
    else {
        return res.status(400).json({ errors: [{ message: 'Auth token not supplied', code: 50 }] });
    }
};
//# sourceMappingURL=middleware.js.map