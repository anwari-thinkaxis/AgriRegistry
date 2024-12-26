import { jwtDecode } from 'jwt-decode'; // Correct import
import LocationList from "./components/LocationList";
import { useEffect } from 'react';

const Page = () => {
    const handleDecodeToken = () => {
        console.log("huh")
        const token = localStorage.getItem("token");
        if (token) {
            try {
                const decoded = jwtDecode(token);
                console.log("Decoded Token:", decoded);
            } catch (error) {
                console.error("Error decoding token:", error);
            }
        } else {
            console.log("No token found in localStorage");
        }
    };

    useEffect(() => {
        console.log("Page component mounted");
    }, []);

    return (
        <div>
            <h1>Locations</h1>
            <h3>Nyehehehe</h3>
            <button onClick={handleDecodeToken}>Decode Token</button>
            <LocationList />
        </div>
    );
};

export default Page;
