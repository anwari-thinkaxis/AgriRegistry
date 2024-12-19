import { useState, useEffect } from 'react';
import { fetchLocations, deleteLocation } from '../../../api/locationApi';
import { Location } from '../../../types/TResponse';

const LocationList = () => {
    const [locations, setLocations] = useState<Location[]>([]);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        loadLocations();
    }, []);

    const loadLocations = async () => {
        try {
            setError(null);
            const data = await fetchLocations();
            setLocations(data);
        } catch (error) {
            setError('Failed to load locations. Please try again later.');
            console.error('Error fetching locations:', error);
        }
    };

    const handleDeleteLocation = async (id: number) => {
        try {
            setError(null);
            await deleteLocation(id);
            loadLocations(); 
        } catch (error) {
            setError('Failed to delete location. Please try again.');
            console.error('Error deleting location:', error);
        }
    };

    return (
        <div>
            <h2>Locations</h2>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            <ul>
                {locations.length === 0 ? (
                    <p>No locations available.</p>
                ) : (
                    locations.map((location: Location) => (
                        <li key={location.id}>
                            <strong>{location.id}</strong> 
                            <strong>{location.name}</strong>
                            {/* Uncomment when edit functionality is added */}
                            {/* <button onClick={() => onEdit(location)}>Edit</button> */}
                            <button onClick={() => handleDeleteLocation(location.id)}>Delete</button>
                            <ul>
                                {location.farms?.map((farm) => (
                                    <li key={farm.id}>{farm.name}</li>
                                ))}
                            </ul>
                        </li>
                    ))
                )}
            </ul>
        </div>
    );
};

export default LocationList;
