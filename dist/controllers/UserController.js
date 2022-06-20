"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const IUser_1 = require("../interfaces/IUser");
class UserController {
    constructor(_dao) {
        this.dao = _dao;
    }
    userLogin(req, res) {
        const userIDNo = req.body.id;
        const userPass = req.body.password;
        let ip = ((req.headers['x-forwarded-for'] || '').toString().split(',')[0] || req.connection.remoteAddress);
        let logaudit = new IUser_1.IUserLogAudit();
        logaudit.logID = 0;
        logaudit.ipAddress = ip;
        console.log((req.headers['x-forwarded-for'] || ''));
        this.dao.getUser(userIDNo).then((results) => {
            logaudit.nationalID = userIDNo;
            logaudit.serviceID = null;
            if (!results) {
                logaudit.loginStatus = false;
                this.dao.addUserLog(logaudit);
                res.status(400).json({ errors: [{ message: `Incorrect user ID / or password.`, code: 11 }] });
                return;
            }
            const _dao = this.dao;
            bcryptjs_1.default.compare(userPass, results.password, function (err, isMatch) {
                if (!isMatch) {
                    logaudit.loginStatus = false;
                    _dao.addUserLog(logaudit);
                    res.status(400).json({ errors: [{ message: `Incorrect user ID / or password.`, code: 12 }] });
                    return;
                }
                else {
                    if (!results.islogged) {
                        console.log('user logged in');
                        const expiresIn = 24 * 60 * 60;
                        const accessToken = jsonwebtoken_1.default.sign({ id: results.nationalID }, process.env.SECRET, {
                            expiresIn: expiresIn
                        });
                        logaudit.loginStatus = true;
                        _dao.addUserLog(logaudit);
                        res.status(200).json({
                            user: {
                                userid: results.nationalID,
                                token: accessToken,
                                expiry: expiresIn,
                                mobileNumber: results.mobileNumber
                            }
                        });
                    }
                    else {
                        logaudit.loginStatus = false;
                        _dao.addUserLog(logaudit);
                        res.status(400).json({
                            errors: [{
                                    message: `User with that id  has an active login Already!`,
                                    code: 12
                                }]
                        });
                        return;
                    }
                }
            });
        }).catch((err) => {
            res.status(400).json({ errors: [{ message: `Error:  ${err.message} found!`, code: 13 }] });
        });
    }
}
exports.UserController = UserController;
//# sourceMappingURL=UserController.js.map