import {Customer} from './Customer';
import {Sim} from './Sim';

export interface Order {
    id: number;
    sim_id: number;
    customer_id: number;
    order_number: string;
    order_status: number;
    created_at: string;
    order_status_name: string;
    updated_at: string;
    customer: Customer;
    sim: Sim;
}
