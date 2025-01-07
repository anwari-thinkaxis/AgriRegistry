import { Produce } from "../types/TResponse";
import { api } from "./api";

/**
 * Fetch all locations from the API
 * @returns {Promise<Produce[]>} Promise resolving to the list of locations
 */
export const fetchProduces = (): Promise<Produce[]> =>
  api.get<Produce[]>("/Produce").then((res) => res.data);

// /**
//  * Fetch a single farm by ID from the API
//  * @param {string | number} id - The ID of the farm to fetch
//  * @returns {Promise<Location>} Promise resolving to the farm details
//  */
// export const fetchFarmById = (id: string | number): Promise<Farm> =>
//   api.get<Farm>(`/Farm/${id}`).then((res) => res.data);

/**
 * Delete a produce
 * @param {number | string} id - ID of the produce to delete
 * @returns {Promise<void>} Promise resolving to a successful deletion
 */
export const deleteProduce = (id: number | string): Promise<void> =>
  api.delete<void>(`/Produce/${id}`).then((res) => res.data);
