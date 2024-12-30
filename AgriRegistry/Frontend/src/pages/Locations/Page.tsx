import AuthStore from "../../utils/stores/AuthStore";
import LocationList from "./components/LocationList";
import { useEffect } from 'react';

const Page = () => {
    const handleDecodeToken = () => {
        const decoded = AuthStore.decodeToken();
        console.log("Decoded Token:", decoded);
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
