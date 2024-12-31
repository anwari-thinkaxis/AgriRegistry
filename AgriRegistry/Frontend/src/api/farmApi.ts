import { Farm } from "../types/TResponse";
import { api } from "./api";

/**
 * Fetch all locations from the API
 * @returns {Promise<Location[]>} Promise resolving to the list of locations
 */
export const fetchFarms = (): Promise<Farm[]> =>
  api.get<Farm[]>("/Farm").then((res) => res.data);
