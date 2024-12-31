import { Location } from "../types/TResponse";
import { api } from "./api";

/**
 * Fetch all locations from the API
 * @returns {Promise<Location[]>} Promise resolving to the list of locations
 */
export const fetchFarms = (): Promise<Location[]> =>
  api.get<Location[]>("/Farm").then((res) => res.data);
