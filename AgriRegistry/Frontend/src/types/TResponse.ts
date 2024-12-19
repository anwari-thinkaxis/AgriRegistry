export interface Location {
    id: number;
    name: string;
    farms?: Farm[];
}

export interface Farm {
    id: number;
    name: string;
}
