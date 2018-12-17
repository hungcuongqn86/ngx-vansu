interface Option {
    payment_syntax: string;
    trial_period: string;
    paid_period: string;
}

export interface Partner {
    id: number;
    code: string;
    email: string;
    token: string;
    options: string;
    arr_options: Option;
    is_deleted: number;
    created_at: string;
    updated_at: string;
}
