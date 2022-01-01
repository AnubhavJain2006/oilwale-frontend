import { VehicleCompany } from './vehicle-company';
import { Product } from "./product";

export interface VehicleInfo {
    "vehicleCompanyId": string,
    "_id": string,
        "vehicleCompany": VehicleCompany,
    "vehicleModel": string,
    "suggestedProduct": Array<Product>;
    "suggestedProductDetais": Product[];
    "vehicleType": string;
    "createdAt": string,
    "updatedAt": string,
    "active": boolean

}
