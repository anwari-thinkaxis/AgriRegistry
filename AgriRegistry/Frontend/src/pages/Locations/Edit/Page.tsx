import { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import EditLocationForm from './components/EditLocationForm';
import { Location } from '../../../types/TResponse';
import { fetchLocations } from '../../../api/locationApi';

const Page = () => {
    const { id } = useParams<{ id: string }>(); // Ensures type safety for the parameter
    const [location, setLocation] = useState<Location | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (id) {
            loadLocation(parseInt(id, 10));
        }
    }, [id]);

    const loadLocation = async (locationId: number) => {
        try {
            // Fetch all locations
            const locations = await fetchLocations(); // Assuming fetchLocations returns a Location[]
            // Find the location by ID
            const foundLocation = locations.find((loc: Location) => loc.id === locationId);

            if (!foundLocation) {
                setError('Location not found.');
            } else {
                setLocation(foundLocation);
            }
        } catch (err) {
            console.error('Error fetching location:', err);
            setError('Failed to fetch location data.');
        } finally {
            setLoading(false);
        }
    };

    const handleUpdateSuccess = () => {
        alert('Location updated successfully!');
        // Add navigation or refresh logic if needed
    };

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;

    return (
        <div>
            <h1>Edit Location</h1>
            {location && (
                <EditLocationForm location={location} onUpdateSuccess={handleUpdateSuccess} />
            )}
        </div>
    );
};

export default Page;
