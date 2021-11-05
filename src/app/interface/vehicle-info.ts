import { VehicleCompany } from './vehicle-company';
import { Product } from "./product";

export interface VehicleInfo {
    "vehicleCompanyId": string,
    "_id": string,
    "vehicleCompany": VehicleCompany,
    "vehicleModel": string,
    "suggestedProductDetails": Array<Product>
    "createdAt": string,
    "active": boolean

}
