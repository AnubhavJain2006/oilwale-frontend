import { VehicleCompany } from "./vehicle-company";
import { Vehicle } from "./vehicle";
import { Product } from "./product";

export interface CustomerVehicle {
    customerVehicle: {
        customerVehicleId: string;
        vehicleCompanyId: string;
        vehicleId: string;
        dailyKMTravel:  number;
        currentKM: number;
        numberPlate: string;
        customerId: string;
        createdAt: Date;
        updatedAt: Date;
        active: boolean;
    };
    vehicleCompany: VehicleCompany;
    vehicle: Vehicle;
    products: Product[];
}
