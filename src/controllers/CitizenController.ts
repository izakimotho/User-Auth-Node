import {Request, Response} from 'express';
import {Dao} from '../dao/Dao';
import bcrypt from 'bcryptjs';
import {ICitizen} from '../interfaces/ICitizen';
import {Utils} from '../utils/utils';
class CitizenController {
    private readonly dao: Dao;
    private readonly utils: Utils = new Utils();
    private SALT_ROUNDS = Number(process.env.SALT);

    constructor(_dao: Dao) {
        this.dao = _dao;

    }

    public registerCitizen(req: Request, res: Response): void {
        const user:ICitizen = req.body;
        let  SALT_ROUNDS = Number(process.env.SALT);
        const apptype: string = req.body.apptype?req.body.apptype:'';
        if(apptype){
            delete user['apptype'];
        }
        console.log('user: ', user, this.SALT_ROUNDS);
        this.dao.getUserbyStatus(+user.nationalID,false).then((results) => {
            if (!results) {
                   let mobileno: string = '';
                    if (user.mobileNumber) {
                        mobileno = user.mobileNumber;
                    } else {
                        mobileno = '0704887526';
                    }
                    mobileno = this.utils.validatephone(mobileno);
                    const _dao = this.dao;
                    bcrypt.hash(user.password, this.SALT_ROUNDS, function (error, hash) {
                        console.log('Hash: ', hash, error);
                        console.log(user.mobileNumber);
                        const newUser = {
                            mobileNumber: mobileno,
                            nationalID: user.nationalID,
                            middleName: 'hhhhhhh',
                            firstName: 'jjjjjjjjjjjj',
                            surname: 'uuuuuuuuuuu',
                            isactive: true,
                            password: hash,
                            dob: new  Date(),
                            islogged: false
                        };
                        _dao.adduser(newUser).then((dataresult) => {
                            // Initialize wallet
                            const wallet = {
                                walletID: user.nationalID,
                                balance: 0,
                            };
                            // _dao.addWallet(wallet);
                            res.status(200).json({message: dataresult, user: newUser});
                            return;
                        }).catch((err) => {
                            console.log(err);
                            res.status(400).json({
                                errors: [{
                                    message: `User with National ID No. ${user.nationalID} already registered!`,
                                    debug: err,
                                    code: 20
                                }]
                            });
                        });
                    });
            }else{
                const _dao = this.dao;
                let mobileno: string = '';
                if (user.mobileNumber) {
                    mobileno = user.mobileNumber;
                }
                bcrypt.hash(user.password, SALT_ROUNDS, function(error, hash) {
                    _dao.updateUserPasswordandStatus(+user.nationalID, hash, mobileno).then((affectedRows) => {
                        if(affectedRows==1){
                            let message ={message: 'User created', insertId: results.nationalID};
                            res.status(200).json({message: message, user: results});

                            return;
                        }else{
                            res.status(400).json({errors: [{message: `Password update failed !`, code: 12}]});
                        }
                    }).catch((err) => {
                        console.log(err)
                        res.status(400).json({errors: [{message: ' failed to update user detail !', debug: err, code: 21}]});
                    });
                });




            }
        }).catch((err) => {
            console.log(err);
            res.status(400).json({errors: [{message: 'Error getting record!', debug: err, code: 21}]});
        });



    }
    public getUser(req: Request, res: Response): void {
        const userIDNo:number = req.params['nationalID'];
        this.dao.getUser(userIDNo).then((results) => {
            if (!results) { res.status(400).json({errors: [{message: `No user with ID No. ${userIDNo} found!`, code: 10}]}); return;}

            results.location = results.location.replace(/[^a-zA-Z0-9]/g, '');
            results.location = results.location.replace('  ', '');
            res.status(200).json({citizen: results});
        }).catch((err) => {
            console.log(err);
            res.status(400).json({errors: [{message: 'Error getting record!', debug: err, code: 21}]});
        });
    }

}

export {CitizenController};
