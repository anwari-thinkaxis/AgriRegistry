/* eslint-disable @typescript-eslint/no-explicit-any */
// src/(pages)/CreateLocation.tsx

import { useState } from 'react';
import { createLocation } from '../../../../api/locationApi';
import { Location } from '../../../../types/TResponse';

const CreateLocationForm = () => {
    const [locationName, setLocationName] = useState<string>(''); // Enforce string type for location name
    const [message, setMessage] = useState<string>(''); // Enforce string type for message

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (!locationName.trim()) { // Ensure non-empty, non-whitespace-only input
            setMessage('Please enter a location name.');
            return;
        }

        try {
            const newLocation: Partial<Location> = { fullAddress: locationName }; // Use Partial to allow incomplete Location object
            await createLocation(newLocation as Location); // Ensure type matches the API function
            setMessage('Location created successfully!');
            setLocationName(''); // Clear input after success
        } catch (error) {
            setMessage('Error creating location.');
            console.error(error);
        }
    };

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="locationName">Location Full Address:</label>
                    <input
                        type="text"
                        id="locationName"
                        value={locationName}
                        onChange={(e) => setLocationName(e.target.value)}
                        placeholder="Enter location Full Address"
                        required
                    />
                </div>
                <button type="submit">Create</button>
            </form>
            {message && <p>{message}</p>}
        </div>
    );
};

export default CreateLocationForm;
