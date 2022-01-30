export interface Order {
    orderId: string;
    adminEmailId?: string;
    adminId?: string;
    garageId: string;
    products: [{
        productId: string;
        productName: string;
        grade: string;
        packingSize: string;
        qty: number;
    }];
    acceptedBy: string;
    placedAt: Date;
    notes?: string;
    acceptedAt: Date;
    completedAt: Date;
    createdAt: Date;
    updatedAt: Date;
    status: number;
}