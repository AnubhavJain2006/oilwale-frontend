import { Garage } from "./garage";
import { Admin } from "./admin";

export interface OrderGet {
    orderId: string;
    adminEmailId?: string;
    adminId?: string;
    product: Array<{
        productId: string;
        productName: string;
        grade: string;
        packingSize: string;
        qty: number;
    }>;
    notes: string;
    status: number;
    garage: Garage;
    admin: Admin;
    placedAt: Date;
    acceptedAt: Date;
    completedAt: Date;
    createdAt: Date;
    updatedAt: Date;
}
