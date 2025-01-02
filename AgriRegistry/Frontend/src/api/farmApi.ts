import { Farm, Location } from "../types/TResponse";
import { api } from "./api";

/**
 * Fetch all locations from the API
 * @returns {Promise<Location[]>} Promise resolving to the list of locations
 */
export const fetchFarms = (): Promise<Location[]> =>
  api.get<Location[]>("/Farm").then((res) => res.data);

/**
 * Fetch a single farm by ID from the API
 * @param {string | number} id - The ID of the farm to fetch
 * @returns {Promise<Location>} Promise resolving to the farm details
 */
export const fetchFarmById = (id: string | number): Promise<Farm> =>
  api.get<Farm>(`/Farm/${id}`).then((res) => res.data);
