export interface Location {
  id: number;
  fullAddress: string;
  districtId: number;
  districtName: string;
  farms?: Farm[];
}

export interface ProduceCategory {
  id: number;
  name: string;
}

export interface ProduceType {
  id: number;
  name: string;
  produceCategory: ProduceCategory;
}

export interface Produce {
  id: number;
  fullName: string;
  produceTypeId: number;
  produceType: {
    id: number;
    name: string;
    produceCategoryId: number;
    produceCategory: {
      id: number;
      name: string;
    };
    farmManagerId: number;
  };
}

export interface ReportEntry {
  id: number;
  produceId: number;
  produce: Produce;
  reportId: number;
  quantity: number;
}

export interface Report {
  id: number;
  farmId: number;
  farmName: string;
  dateSubmitted: string;
  reportEntries?: ReportEntry[];
}

export interface Farm {
  id: number;
  farmManagerId: string;
  name: string;
  postalAddress: string;
  hectares: number;
  locationId: number;
  reports?: Report[];
  reportCount: number;
}
