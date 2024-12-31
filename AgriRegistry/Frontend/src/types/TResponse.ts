export interface Location {
  id: number;
  fullAddress: string;
  districtId: number;
  districtName: string;
  farms?: Farm[];
}

export interface Farm {
  id: number;
  farmManagerId: string;
  name: string;
  postalAddress: string;
  hectares: number;
  locationId: number;
}
