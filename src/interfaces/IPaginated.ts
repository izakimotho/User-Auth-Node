export interface IPaginated<T> {
    data: T;
    pagination: object;
    datacount:object;
}
export interface ISearchData<T> {
    data: T;
}
export interface IPaginateData<T>{
    data: T;
    pagination: object;
    datacount:object;
    location: any
    allBookings: Object
}
export interface Location {
    lon: any;
    lat: any
}
