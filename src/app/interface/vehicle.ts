export interface Vehicle {
    vehicleId: string;
    vehicleCompanyId: string;
    vehicleModel: string;
    suggestedProduct: Array<string>;
    vehicleType: string;
    active: boolean;
    createdAt: string;
    updatedAt: string;
}
