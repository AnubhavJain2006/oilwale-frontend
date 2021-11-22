export interface CustomerVehicle {
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
}
