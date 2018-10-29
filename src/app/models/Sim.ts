import {Agency} from './Agency';
import {Order} from './Order';

interface Telco {
    id: number;
    telco_name: string;
    created_at: string;
    updated_at: string;
}

export interface Sim {
    id: number;
    sim_number: string;
    sim_number_standard: string;
    price: number;
    sale_price: number;
    telco_id: string;
    agency_id: string;
    agency_discount: string;
    is_deleted: number;
    sold_at: string;
    created_at: string;
    updated_at: string;
    order: Array<Order>;
    category: Telco;
    agency: Agency;
}
