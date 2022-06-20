import {number} from 'joi';

export interface IOffence {
    offenceID: number;
    offenceCategory: string;
    offenceSection: string;
    offenceDescription: string;
    maximumPenalty: number;
}

export interface IOffenceCategory {
    categoryID: number;
    offenceCategoryName: string;
}

export interface IOffenceBooking extends IOffence{
    id: number;
    nationalID: number;
    offenceID: number;
    serviceID: number;
    offenceStatus: string;
    amountFined: number;
    paymentType: string;
    narrative: string;
    lat: number;
    lon: number;
    createdAt?: string;
    updatedAt?: string;
    bookingTypeID?: number;
    shortDescription?: string;
    mobileNumber?: string;

}

export interface IOffencePenalty{
    nationalID: number;
    offenceID: number;
}
export interface IOffencePenaltyData{
    offencelevel: number,
    maximumPenalty:number,
    bookingtype:any
}
export interface IUserBookingSummary{
    paidbooking: number,
    unpaidbooking:number
}
export interface IBookingType {
    totalamount: number,
    bookingType:number
}
export interface ITransactionSummary{
    totalwalletbal: number,
    totalBooked:number,
    totalpaid:number,
    totalunpaid:number
}
export interface  OfficerbookingSummary {
    totalamountfine:number,
    totalpenalty:number
}
export interface  CitizenbookingSummary {
    totalUnpaid:number,
    totalpaid:number,
    totalBooking:number
}
export interface  CitizenbookingData {
    bookingsummary:CitizenbookingSummary
}
