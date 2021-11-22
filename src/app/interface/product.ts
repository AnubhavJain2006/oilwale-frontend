export interface Product {
    productId: string;
    productName: string;
    specification: string;
    grade: string;
    packingSize: string;
    productImage: string;
    active: boolean;
    createdAt: string;
    updatedAt: string;
    vehicleType: Array<string>;
}


// if editing this, then also update the objects in product-info.ts and product.compnent.ts file