"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const joi_1 = __importDefault(require("joi"));
exports.citizenSchema = {
    registration: {
        nationalID: joi_1.default.string().regex(/^[0-9]{4,8}$/).required(),
        password: joi_1.default.string().required(),
        mobileNumber: joi_1.default.string(),
        apptype: joi_1.default.string(),
    },
    login: {
        nationalID: joi_1.default.string().regex(/^[0-9]{4,8}$/).required(),
        password: joi_1.default.string().required(),
        apptype: joi_1.default.string(),
    },
    phone: {
        nationalID: joi_1.default.string().regex(/^[0-9]{4,8}$/).required(),
        mobileNumber: joi_1.default.string().required(),
        apptype: joi_1.default.string(),
    },
    resetpass: {
        nationalID: joi_1.default.string().regex(/^[0-9]{4,8}$/).required(),
        password: joi_1.default.string().required(),
        newPassword: joi_1.default.string().required(),
        apptype: joi_1.default.string(),
    },
    citizen: {
        nationalID: joi_1.default.string().regex(/^[0-9]{4,8}$/).required(),
    },
    wallet: {
        nationalID: joi_1.default.string().regex(/^[0-9]{4,8}$/).required(),
    },
    walletTransaction: {
        walletID: joi_1.default.string().regex(/^[0-9]{4,8}$/).required(),
        transactionID: joi_1.default.string().required(),
        transactionType: joi_1.default.string().required(),
        amountTransacted: joi_1.default.number().required(),
        transactionProvider: joi_1.default.string().required()
    },
    walletDebit: {
        walletID: joi_1.default.string().regex(/^[0-9]{4,8}$/).required(),
        amountTransacted: joi_1.default.number().required(),
    }
};
exports.officerSchema = {
    registration: {
        serviceID: joi_1.default.string().regex(/^[0-9]{4,8}$/).required(),
        password: joi_1.default.string().required(),
        mobileNumber: joi_1.default.string(),
        apptype: joi_1.default.string(),
    },
    login: {
        serviceID: joi_1.default.string().regex(/^[0-9]{4,8}$/).required(),
        password: joi_1.default.string().required(),
        apptype: joi_1.default.string(),
    },
    resetpass: {
        serviceID: joi_1.default.string().regex(/^[0-9]{4,8}$/).required(),
        password: joi_1.default.string().required(),
        newPassword: joi_1.default.string().required(),
        apptype: joi_1.default.string(),
    },
    officer: {
        serviceID: joi_1.default.string().regex(/^[0-9]{4,8}$/).required(),
    },
    officerAccess: {
        serviceID: joi_1.default.string().regex(/^[0-9]{4,8}$/).required(),
        id: joi_1.default.number().required(),
    },
    phone: {
        serviceID: joi_1.default.string().regex(/^[0-9]{4,8}$/).required(),
        mobileNumber: joi_1.default.string().required(),
        apptype: joi_1.default.string(),
    }
};
exports.dataSchema = {
    pagination: {
        offset: joi_1.default.number().integer().optional(),
        limit: joi_1.default.number().integer().optional(),
    },
    paginationTransactions: {
        nationalid: joi_1.default.string().regex(/^[0-9]{4,8}$/).required(),
        offset: joi_1.default.number().integer().optional(),
        limit: joi_1.default.number().integer().optional(),
    }
};
exports.offenceSchema = {
    offence: {
        id: joi_1.default.number().required()
    }
};
exports.offenceBookSchema = {
    book: {
        nationalID: joi_1.default.string().regex(/^[0-9]{4,8}$/).required(),
        offenceID: joi_1.default.number().required(),
        serviceID: joi_1.default.string().regex(/^[0-9]{4,8}$/).required(),
        offenceStatus: joi_1.default.string().required(),
        amountFined: joi_1.default.number().required(),
        paymentType: joi_1.default.string().required(),
        narrative: joi_1.default.string().required(),
        lat: joi_1.default.number(),
        lon: joi_1.default.number(),
        bookingTypeID: joi_1.default.number().required(),
        shortDescription: joi_1.default.string(),
        mobileNumber: joi_1.default.string(),
    },
    offencePayment: {
        id: joi_1.default.number().required(),
        nationalID: joi_1.default.string().regex(/^[0-9]{4,8}$/).required(),
        walletID: joi_1.default.string().regex(/^[0-9]{4,8}$/).required(),
        amountTobePaid: joi_1.default.number().required(),
    },
    offencePenalty: {
        nationalID: joi_1.default.string().regex(/^[0-9]{4,8}$/).required(),
        offenceID: joi_1.default.number().required(),
    }
};
exports.searchSchema = {
    user: {
        searchkey: joi_1.default.string().required()
    }
};
exports.PaymentSchema = {
    payment: {
        TransactionType: joi_1.default.string().required(),
        TransID: joi_1.default.string().required(),
        TransTime: joi_1.default.string().required(),
        TransAmount: joi_1.default.string().required(),
        BusinessShortCode: joi_1.default.string().required(),
        BillRefNumber: joi_1.default.string(),
        InvoiceNumber: joi_1.default.string().allow(''),
        OrgAccountBalance: joi_1.default.string(),
        ThirdPartyTransID: joi_1.default.string().allow(''),
        MSISDN: joi_1.default.string().required(),
        FirstName: joi_1.default.string().required(),
        MiddleName: joi_1.default.string().allow(''),
        LastName: joi_1.default.string().allow(''),
    },
};
//# sourceMappingURL=schema.js.map