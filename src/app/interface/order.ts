export interface Order {
    orderId: string;
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
    acceptedAt: Date;
    completedAt: Date;
    createdAt: Date;
    updatedAt: Date;
    status: number;
}