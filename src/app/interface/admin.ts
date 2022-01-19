export interface Admin {
    adminId: string;
    name: string;
    email: string;
    phoneNumber: string;
    alternateNumber: string;
    address: string;
    pincode: string;
    image: string;
    password?: string;
    privilege: string;
    createdAt: string;
    updateAt: string;
    active: boolean;
    access?: {
        garages: {
            garages: boolean;
            all: boolean;
            add: boolean;
            activities: boolean;
            deactivated: boolean;
            edit: boolean;
            delete: boolean;
            redeemPoints: boolean;
            restore: boolean;
        },
        customers: {
            customers: boolean;
            all: boolean,
            restriced: boolean;
        }
        broadcasts: {
            broadcasts: boolean;
            all: boolean;
            add: boolean;
        },
        products: {
            products: boolean;
            all: boolean,
            add: boolean,
            activities: boolean,
            deactivated: boolean;
            edit: boolean;
            delete: boolean;
            restore: boolean;
        },
        vehicles: {
            vehicles: boolean;
            all: boolean;
            add: boolean;
            activities: boolean;
            deactivated: boolean;
            edit: boolean;
            delete: boolean;
            restore: boolean;
        },
        schemes: {
            schemes: boolean;
            all: boolean;
            add: boolean;
            past: boolean;
            edit: boolean;
            delete: boolean;
            restore: boolean;
        },
        orders: {
            orders: boolean;
            all: boolean;
            accept: boolean;
            decline: boolean;
            addNote: boolean;
            markAsComplete: boolean;
            notAccepted: boolean;
            past: boolean;
        }
    }
}
