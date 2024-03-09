import { ManufacturerObject } from "./manufacturerObject";
import { SupplierObject } from "./supplierObject";

export interface CarObject {
    carId: number;
    carName: string;
    carDescription: string | null;
    numberOfDoors: number | null;
    seatingCapacity: number | null;
    fuelType: string | null;
    year: number | null;
    manufacturerId: number | null;
    supplierId: number | null;
    carStatus: number | null;
    carRentingPricePerDay: number | null;
    supplier: SupplierObject | null;
    manufacturer: ManufacturerObject | null;
}
