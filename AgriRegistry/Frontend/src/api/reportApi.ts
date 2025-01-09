import { Report } from "../types/TResponse";
import { api } from "./api";

/**
 * Fetch a single farm by ID from the API
 * @param {string | number} id - The ID of the farm to fetch
 * @returns {Promise<Report>} Promise resolving to the farm details
 */
export const fetchReportById = (id: string | number): Promise<Report> =>
  api.get<Report>(`/Report/${id}`).then((res) => res.data);
