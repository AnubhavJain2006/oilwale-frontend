import {CustomerVehicle} from './customer-vehicle';

export interface Customer {
    customerId: string;
    customerName: string;
    customerPhoneNumber: string;
    customerAddress: string;
    customerPincode: string;
    garageReferralCode: string;
    customerVehicle: Array<CustomerVehicle>;
    createdAt: string;
    updatedAt: string;
    active: boolean;
}
