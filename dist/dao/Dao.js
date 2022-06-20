"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const mysql = __importStar(require("mysql"));
const pagination_1 = require("../utils/pagination");
const utils_1 = require("../utils/utils");
const CURRENT_TIMESTAMP = mysql.raw('CURRENT_TIMESTAMP()');
const PaginationQuery = ' LIMIT ? OFFSET ?';
const paginate = ' LIMIT ? OFFSET ?';
class Dao {
    constructor(conn) {
        this.utils = new utils_1.Utils();
        this.conn = conn;
        this.baseUrl = process.env.SCHEME + process.env.DOMAIN + process.env.API_VER;
        console.log('Base url: ', this.baseUrl);
    }
    adduser(user) {
        user.createdAt = CURRENT_TIMESTAMP;
        user.updatedAt = CURRENT_TIMESTAMP;
        return new Promise((resolve, reject) => {
            this.conn.query('INSERT INTO `tbl_citizens` SET ?', user, (err, results, fields) => {
                if (err) {
                    reject({ error: err.sqlMessage });
                    return;
                }
                console.log('inserted');
                console.log(results.insertId);
                resolve({ message: 'User created', insertId: user.nationalID });
            });
        });
    }
    getUser(id) {
        return new Promise((resolve, reject) => {
            this.conn.query('SELECT tbl_citizens.nationalID, tbl_citizens.firstName, tbl_citizens.surname, tbl_citizens.middleName, tbl_citizens.dob, tbl_citizens.mobileNumber, tbl_citizens.isactive, tbl_citizens.password, tbl_citizens.createdAt, tbl_citizens.updatedAt, tbl_citizens.islogged,tbl_national_ids.location,tbl_national_ids.gender,tbl_national_ids.email FROM tbl_citizens  inner join tbl_national_ids on tbl_citizens.nationalID= tbl_national_ids.nationalID WHERE tbl_citizens.nationalid = ?', [id], (err, results, fields) => {
                if (err) {
                    reject(err);
                    return;
                }
                resolve(results[0]);
            });
        });
    }
    getUserbyStatus(id, status) {
        return new Promise((resolve, reject) => {
            this.conn.query('SELECT * FROM `tbl_citizens` WHERE nationalid = ? and isactive =?', [id, status], (err, results, fields) => {
                if (err) {
                    reject(err);
                    return;
                }
                resolve(results[0]);
            });
        });
    }
    getCitizens(limit = 20, offset = 0) {
        limit = Number(limit);
        offset = Number(offset);
        return new Promise((resolve, reject) => {
            this.conn.query('SELECT COUNT(*) as totalCount FROM `tbl_citizens`', (err, results) => {
                const { totalCount } = results[0];
                console.log(totalCount);
                const datacount = {
                    total: totalCount
                };
                const url = `${this.baseUrl}/users/citizens`;
                const pagination = pagination_1.generatePagination(offset, limit, totalCount, url);
                this.conn.query('SELECT tbl_citizens.nationalID, tbl_citizens.firstName, tbl_citizens.surname, tbl_citizens.middleName, tbl_citizens.dob, tbl_citizens.mobileNumber, tbl_citizens.isactive, tbl_citizens.password, tbl_citizens.createdAt, tbl_citizens.updatedAt, tbl_citizens.islogged,tbl_national_ids.location,tbl_national_ids.gender FROM tbl_citizens  inner join tbl_national_ids on tbl_citizens.nationalID= tbl_national_ids.nationalID  ORDER BY tbl_citizens.createdAt DESC  ' + PaginationQuery, [limit, offset], (err, data, fields) => {
                    if (err) {
                        reject(err);
                        return;
                    }
                    const results = { data, pagination, datacount };
                    resolve(results);
                });
            });
        });
    }
    getCitizenNRPData(id) {
        console.log('ID: ', id);
        return new Promise((resolve, reject) => {
            this.conn.query('SELECT * FROM `tbl_national_ids` WHERE nationalid = ?', [id], (err, results, fields) => {
                console.log(results);
                if (err) {
                    reject(err);
                    return;
                }
                resolve(results[0]);
            });
        });
    }
    addUserLog(userauditlog) {
        userauditlog.createdAt = CURRENT_TIMESTAMP;
        this.conn.query('INSERT INTO `tbl_user_log_audit` SET ?', userauditlog, (err, results, fields) => {
            if (err) {
                console.log('Error updating logs: ', err);
                return;
            }
            // console.log(results);
        });
    }
    updateUserPasswordandStatus(userid, newpass, mobileno) {
        let sql;
        let query = '';
        if (mobileno) {
            query = ', mobileNumber =' + mobileno + ' ';
            console.log(query);
        }
        return new Promise(((resolve, reject) => {
            sql = 'UPDATE tbl_citizens SET password = ? ,isactive =? ' + query + 'WHERE nationalid = ?';
            this.conn.query(sql, [newpass, true, userid], (err, results, fields) => {
                if (err) {
                    console.log(err);
                    reject(0);
                }
                const { affectedRows } = results;
                resolve(affectedRows);
            });
        }));
    }
}
exports.Dao = Dao;
//# sourceMappingURL=Dao.js.map