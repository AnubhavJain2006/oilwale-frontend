export interface Scheme {
    schemeId: string;
    schemeName: string;
    description: string;
    status: boolean;
    startedAt: Date;
    endedAt: Date;
    targetGroup: string;
    productList: string[];
    vehicleType: string[];
    createdAt: Date;
    updatedAt: Date;
}
