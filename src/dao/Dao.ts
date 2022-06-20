import * as mysql from 'mysql';
import {IPaginated} from '../interfaces/IPaginated';
import {generatePagination} from '../utils/pagination';
import {ICitizen, ICitizenData, ICitizenNRPInfo} from '../interfaces/ICitizen';
import {IUserLogAudit} from '../interfaces/IUser';
import {any} from 'joi';
import {Utils} from '../utils/utils';

const CURRENT_TIMESTAMP: any = mysql.raw('CURRENT_TIMESTAMP()');
const PaginationQuery: string = ' LIMIT ? OFFSET ?';
const paginate: string = ' LIMIT ? OFFSET ?';

export class Dao {

    private conn: mysql.Connection;
    private baseUrl: string;
    private readonly utils: Utils = new Utils();

    constructor(conn: mysql.Connection) {
        this.conn = conn;
        this.baseUrl = process.env.SCHEME + process.env.DOMAIN + process.env.API_VER;
        console.log('Base url: ', this.baseUrl);
    }

    public adduser(user: ICitizen): Promise<any> {
        user.createdAt = CURRENT_TIMESTAMP;
        user.updatedAt = CURRENT_TIMESTAMP;

        return new Promise<any>((resolve, reject) => {
            this.conn.query('INSERT INTO `tbl_citizens` SET ?', user, (err, results, fields) => {
                if (err) {
                    reject({error: err.sqlMessage});
                    return;
                }
                console.log('inserted');
                console.log(results.insertId);
                resolve({message: 'User created', insertId: user.nationalID});
            });
        });

    }
    public getUser(id: number): Promise<ICitizenData> {
        return new Promise<any>((resolve, reject) => {
            this.conn.query('SELECT tbl_citizens.nationalID, tbl_citizens.firstName, tbl_citizens.surname, tbl_citizens.middleName, tbl_citizens.dob, tbl_citizens.mobileNumber, tbl_citizens.isactive, tbl_citizens.password, tbl_citizens.createdAt, tbl_citizens.updatedAt, tbl_citizens.islogged,tbl_national_ids.location,tbl_national_ids.gender,tbl_national_ids.email FROM tbl_citizens  inner join tbl_national_ids on tbl_citizens.nationalID= tbl_national_ids.nationalID WHERE tbl_citizens.nationalid = ?', [id], (err, results, fields) => {
                if (err) {
                    reject(err);
                    return;
                }
                resolve(results[0]);
            });
        });
    }
    public getUserbyStatus(id: number, status: boolean): Promise<ICitizen> {
        return new Promise<any>((resolve, reject) => {
            this.conn.query('SELECT * FROM `tbl_citizens` WHERE nationalid = ? and isactive =?', [id, status], (err, results, fields) => {
                if (err) {
                    reject(err);
                    return;
                }
                resolve(results[0]);
            });
        });
    }
    public getCitizens(limit = 20, offset = 0): Promise<IPaginated<ICitizen[]>> {
        limit = Number(limit);
        offset = Number(offset);
        return new Promise<any>((resolve, reject) => {
            this.conn.query('SELECT COUNT(*) as totalCount FROM `tbl_citizens`', (err, results) => {
                const {totalCount} = results[0];
                console.log(totalCount);
                const datacount = {
                    total: totalCount

                }

                const url = `${this.baseUrl}/users/citizens`;
                const pagination = generatePagination(offset, limit, totalCount, url);

                this.conn.query('SELECT tbl_citizens.nationalID, tbl_citizens.firstName, tbl_citizens.surname, tbl_citizens.middleName, tbl_citizens.dob, tbl_citizens.mobileNumber, tbl_citizens.isactive, tbl_citizens.password, tbl_citizens.createdAt, tbl_citizens.updatedAt, tbl_citizens.islogged,tbl_national_ids.location,tbl_national_ids.gender FROM tbl_citizens  inner join tbl_national_ids on tbl_citizens.nationalID= tbl_national_ids.nationalID  ORDER BY tbl_citizens.createdAt DESC  ' + PaginationQuery, [limit, offset], (err, data, fields) => {

                    if (err) {
                        reject(err);
                        return;
                    }

                    const results: IPaginated<ICitizen[]> = {data, pagination, datacount};
                    resolve(results);
                });
            });
        });
    }
    public getCitizenNRPData(id: any): Promise<ICitizenNRPInfo> {
        console.log('ID: ', id)
        return new Promise<any>((resolve, reject) => {
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
    public addUserLog(userauditlog: IUserLogAudit): void {
        userauditlog.createdAt = CURRENT_TIMESTAMP;
        this.conn.query('INSERT INTO `tbl_user_log_audit` SET ?', userauditlog, (err, results, fields) => {
            if (err) {
                console.log('Error updating logs: ', err);
                return;
            }
            // console.log(results);
        });
    }
    public updateUserPasswordandStatus(userid: number, newpass: string, mobileno: string): Promise<number> {
        let sql: string;
        let query: string = '';
        if (mobileno) {
            query = ', mobileNumber =' + mobileno + ' ';
            console.log(query)
        }
        return new Promise<number>(((resolve, reject) => {
            sql = 'UPDATE tbl_citizens SET password = ? ,isactive =? ' + query + 'WHERE nationalid = ?';

            this.conn.query(sql, [newpass, true, userid], (err, results, fields) => {
                if (err) {
                    console.log(err);
                    reject(0);
                }
                const {affectedRows} = results;
                resolve(affectedRows);
            });
        }));
    }





}


