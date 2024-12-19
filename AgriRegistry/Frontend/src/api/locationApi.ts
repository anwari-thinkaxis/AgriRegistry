// src/(api)/locationApi.ts
import { Location } from '../types/TResponse';
import { api } from './api';

/**
 * Fetch all locations from the API
 * @returns {Promise<Location[]>} Promise resolving to the list of locations
 */
export const fetchLocations = (): Promise<Location[]> =>
    api.get<Location[]>('/Locations').then((res) => res.data);

/**
 * Create a new location
 * @param {Location} data - Location data to create
 * @returns {Promise<Location>} Promise resolving to the created location
 */
export const createLocation = (data: Location): Promise<Location> =>
    api.post<Location>('/Locations', data).then((res) => res.data);

/**
 * Update an existing location
 * @param {number | string} id - ID of the location to update
 * @param {Location} data - Updated location data
 * @returns {Promise<Location>} Promise resolving to the updated location
 */
export const updateLocation = (id: number | string, data: Location): Promise<Location> =>
    api.put<Location>(`/Locations/${id}`, data).then((res) => res.data);

/**
 * Delete a location
 * @param {number | string} id - ID of the location to delete
 * @returns {Promise<void>} Promise resolving to a successful deletion
 */
export const deleteLocation = (id: number | string): Promise<void> =>
    api.delete<void>(`/Locations/${id}`).then((res) => res.data);
