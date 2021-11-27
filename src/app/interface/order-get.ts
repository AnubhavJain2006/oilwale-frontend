import { Garage } from "./garage";
import { Admin } from "./admin";

export interface OrderGet {
    orderId: string;
    product: Array<{
        productId: string;
        productName: string;
        grade: string;
        packingSize: string;
        qty: number;
    }>;
    status: number;
    garage: Garage;
    admin: Admin;
    placedAt: Date;
    acceptedAt: Date;
    completedAt: Date;
    createdAt: Date;
    updatedAt: Date;
}
