import { Record } from "../types/TResponse";
import { api } from "./api";

/**
 * Fetch a single farm by ID from the API
 * @param {string | number} id - The ID of the farm to fetch
 * @returns {Promise<Record>} Promise resolving to the farm details
 */
export const fetchRecordById = (id: string | number): Promise<Record> =>
  api.get<Record>(`/Record/${id}`).then((res) => res.data);
