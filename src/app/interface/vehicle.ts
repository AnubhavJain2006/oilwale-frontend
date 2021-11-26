export interface Vehicle {
    vehicleId: string;
    vehicleCompanyId: string;
    vehicleModel: string;
    suggestedProduct: Array<string>;
    active: boolean;
    createdAt: string;
    updatedAt: string;
}
