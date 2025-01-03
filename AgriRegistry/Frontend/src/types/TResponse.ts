export interface Location {
  id: number;
  fullAddress: string;
  districtId: number;
  districtName: string;
  farms?: Farm[];
}

export interface Produce {
  id: number;
  fullName: string;
  reportEntryId: number;
}

export interface ReportEntry {
  id: number;
  produce: Produce;
  reportId: number;
  quantity: number;
}

export interface Report {
  id: number;
  farmId: number;
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
}
