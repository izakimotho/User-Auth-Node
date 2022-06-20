import Joi from 'joi';

export const citizenSchema = {
    registration: {
        nationalID: Joi.string().regex(/^[0-9]{4,8}$/).required(),
        password: Joi.string().required(),
        mobileNumber: Joi.string(),
        apptype: Joi.string(),
    },
    login: {
        nationalID: Joi.string().regex(/^[0-9]{4,8}$/).required(),
        password: Joi.string().required(),
        apptype: Joi.string(),
    },
    phone: {
        nationalID: Joi.string().regex(/^[0-9]{4,8}$/).required(),
        mobileNumber: Joi.string().required(),
        apptype: Joi.string(),
    },
    resetpass: {
        nationalID: Joi.string().regex(/^[0-9]{4,8}$/).required(),
        password: Joi.string().required(),
        newPassword: Joi.string().required(),
        apptype: Joi.string(),
    },
    citizen: {
        nationalID: Joi.string().regex(/^[0-9]{4,8}$/).required(),
    },
    wallet: {
        nationalID: Joi.string().regex(/^[0-9]{4,8}$/).required(),
    },
    walletTransaction: {
        walletID: Joi.string().regex(/^[0-9]{4,8}$/).required(),
        transactionID: Joi.string().required(),
        transactionType: Joi.string().required(),
        amountTransacted: Joi.number().required(),
        transactionProvider: Joi.string().required()
    },
    walletDebit: {
        walletID: Joi.string().regex(/^[0-9]{4,8}$/).required(),
        amountTransacted: Joi.number().required(),
    }
};

export const officerSchema = {
    registration: {
        serviceID: Joi.string().regex(/^[0-9]{4,8}$/).required(),
        password: Joi.string().required(),
        mobileNumber: Joi.string(),
        apptype: Joi.string(),
    },
    login: {
        serviceID:  Joi.string().regex(/^[0-9]{4,8}$/).required(),
        password: Joi.string().required(),
        apptype: Joi.string(),
    },
    resetpass: {
        serviceID:  Joi.string().regex(/^[0-9]{4,8}$/).required(),
        password: Joi.string().required(),
        newPassword: Joi.string().required(),
        apptype: Joi.string(),
    },
    officer: {
        serviceID: Joi.string().regex(/^[0-9]{4,8}$/).required(),
    },
    officerAccess: {
        serviceID: Joi.string().regex(/^[0-9]{4,8}$/).required(),
        id: Joi.number().required(),
    },
    phone: {
        serviceID:  Joi.string().regex(/^[0-9]{4,8}$/).required(),
        mobileNumber: Joi.string().required(),
        apptype: Joi.string(),
    }
};

export const dataSchema = {
    pagination: {
        offset: Joi.number().integer().optional(),
        limit: Joi.number().integer().optional(),
    },
    paginationTransactions: {
        nationalid: Joi.string().regex(/^[0-9]{4,8}$/).required(),
        offset: Joi.number().integer().optional(),
        limit: Joi.number().integer().optional(),
    }
};

export const offenceSchema = {
    offence: {
        id: Joi.number().required()
    }
};

export const offenceBookSchema = {
    book: {
        nationalID: Joi.string().regex(/^[0-9]{4,8}$/).required(),
        offenceID: Joi.number().required(),
        serviceID: Joi.string().regex(/^[0-9]{4,8}$/).required(),
        offenceStatus: Joi.string().required(),
        amountFined: Joi.number().required(),
        paymentType: Joi.string().required(),
        narrative: Joi.string().required(),
        lat: Joi.number(),
        lon: Joi.number(),
        bookingTypeID: Joi.number().required(),
        shortDescription: Joi.string(),
        mobileNumber: Joi.string(),
    },
    offencePayment: {
        id: Joi.number().required(),
        nationalID: Joi.string().regex(/^[0-9]{4,8}$/).required(),
        walletID: Joi.string().regex(/^[0-9]{4,8}$/).required(),
        amountTobePaid: Joi.number().required(),
    },
    offencePenalty: {
        nationalID: Joi.string().regex(/^[0-9]{4,8}$/).required(),
        offenceID: Joi.number().required(),
    }

};

export const searchSchema = {
    user: {
        searchkey: Joi.string().required()
    }
};
export const PaymentSchema = {
    payment: {
        TransactionType: Joi.string().required(),
TransID: Joi.string().required(),
TransTime:Joi.string().required(),
TransAmount:Joi.string().required(),
BusinessShortCode: Joi.string().required(),
BillRefNumber: Joi.string(),
InvoiceNumber: Joi.string().allow(''),
OrgAccountBalance:Joi.string(),
ThirdPartyTransID: Joi.string().allow(''),
MSISDN:Joi.string().required(),
FirstName: Joi.string().required(),
MiddleName: Joi.string().allow(''),
LastName: Joi.string().allow(''),
    },
};
