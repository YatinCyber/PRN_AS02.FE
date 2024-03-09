import { RentDetailObject } from "./rentDetailObject";

export interface RentingTransObject {
    rentingTransationId: number;
    rentingDate: string | null;
    totalPrice: number | null;
    rentingStatus: number | null;
    customerId: number;
    customerName: string;
    rentingDetails: RentDetailObject[];
}
