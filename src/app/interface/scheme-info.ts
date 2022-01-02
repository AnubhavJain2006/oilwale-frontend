import { Scheme } from "./scheme";
import { Product } from "./product";
import { Garage } from "./garage";

export interface SchemeInfo {
    scheme: Scheme;
    products: Product[];
    garages: Garage[];
}
