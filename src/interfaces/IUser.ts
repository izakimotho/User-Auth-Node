export interface IUserLogin {
    mobileNumber: string;
    password: string;
}

export interface IUser {
    mobileNumber: string;
    middleName: string;
    firstName: string;
    surname: string;
    isactive: boolean;
    password: string;
    dob: any;
    createdAt?: any;
    updatedAt?: any;
    islogged: boolean;
}
export interface IUsers {
    mobileNumber: string;
    middleName: string;
    firstName: string;
    surname: string;
    isactive: boolean;
    password: string;
    dob: any;
    createdAt?: any;
    updatedAt?: any;
    islogged: boolean;
    location: string;
}

export interface IUserNPSInfo {
    middleName: string;
    firstName: string;
    surname: string;
    mobileNumber?: string;
    dob: any;
}
export interface IUserNRPInfo {
    middleName: string;
    firstName: string;
    applicant: string;
    surname: string;
    mobileNumber?: string;
    dob: any
}
export class IUserLogAudit {
    logID: number;
    nationalID: number;
    serviceID: number;
    ipAddress: string;
    loginStatus: boolean;
    createdAt: any;

    constructor() {
    }
}
export class IUserPassReset {
    resetID: number;
    nationalID: number;
    serviceID: number;
    ipAddress: string;
    createdAt: any;
    resetToken: string;
    isReset: boolean;

    constructor() {
    }
}


export interface IUserSearch {
    type: string;
    userid: number;
    firstName: string;
    mobileNumber: string;
}
export interface IUserSearchValue {
    searchkey: string;
}