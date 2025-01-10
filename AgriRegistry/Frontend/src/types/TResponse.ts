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

export interface RecordEntry {
  id: number;
  produceId: number;
  produce: Produce;
  recordId: number;
  quantity: number;
}

export interface Record {
  id: number;
  farmId: number;
  farmName: string;
  dateSubmitted: string;
  recordEntries?: RecordEntry[];
}

export interface Farm {
  id: number;
  farmManagerId: string;
  name: string;
  postalAddress: string;
  hectares: number;
  locationId: number;
  records?: Record[];
  recordCount: number;
}
