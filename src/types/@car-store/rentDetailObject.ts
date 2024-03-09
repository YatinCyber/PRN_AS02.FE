export interface RentDetailObject {
    rentingTransactionId: number;
    startDate: string;
    endDate: string;
    price: number | null;
    carId: number;
    carName: string;
}