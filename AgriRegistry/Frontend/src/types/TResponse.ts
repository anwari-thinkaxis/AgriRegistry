export interface Location {
    id: number;
    fullAddress: string;
    kampong?: string;
    district?: string;
    farms?: Farm[];
}

export interface Farm {
    id: number;
    name: string;
}
