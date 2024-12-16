import { useState, useEffect } from 'react';
import { updateLocation } from '../../../../api/locationApi';
import { Location } from '../../../../types/TResponse';

type EditLocationFormProps = {
    location: Location; // The location to be edited
    onUpdateSuccess?: () => void; // Callback for when the update is successful
};

const EditLocationForm = ({ location, onUpdateSuccess }: EditLocationFormProps) => {
    const [locationName, setLocationName] = useState<string>('');
    const [message, setMessage] = useState<string>('');

    useEffect(() => {
        if (location) {
            setLocationName(location.name || ''); // Pre-fill the form with the location's name
        }
    }, [location]);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (!locationName.trim()) {
            setMessage('Please enter a location name.');
            return;
        }

        try {
            const updatedLocation: Location = {
                ...location,
                name: locationName,
            };

            await updateLocation(location.id, updatedLocation);
            setMessage('Location updated successfully!');

            if (onUpdateSuccess) {
                onUpdateSuccess(); // Trigger callback if provided
            }
        } catch (error) {
            setMessage('Error updating location.');
            console.error(error);
        }
    };

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="locationName">Location Name:</label>
                    <input
                        type="text"
                        id="locationName"
                        value={locationName}
                        onChange={(e) => setLocationName(e.target.value)}
                        placeholder="Enter location name"
                        required
                    />
                </div>
                <button type="submit">Save</button>
            </form>
            {message && <p>{message}</p>}
        </div>
    );
};

export default EditLocationForm;