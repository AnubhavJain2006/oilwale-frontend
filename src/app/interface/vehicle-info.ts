import { Product } from "./product";

export interface VehicleInfo {
    "vehicleCompanyId": string,
    "_id": string,
    "vehicleCompany": {
        "vehicleCompanyId": string,
        "vehicleCompany": string
    },
    "vehicleModel": string,
    "suggestedProductDetails": Array<Product>
    "createdAt": string,
    "active": boolean

}
