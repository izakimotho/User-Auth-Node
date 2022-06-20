import {IUser, IUserLogin, IUserNRPInfo, IUsers} from './IUser';

export interface ICitizenLogin extends IUserLogin{
    nationalID: string;
}

export interface ICitizen extends IUser{
    nationalID: string;
}
export interface ICitizenData extends IUsers{
    nationalID: string;
}

export interface ICitizenNRPInfo extends IUserNRPInfo{
    nationalID: string;
}

