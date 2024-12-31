import { useEffect, useState } from "react";
import { fetchFarms } from "../../../api/farmApi";
import { Farm } from "../../../types/TResponse";

const FarmList = () => {
  const [locations, setFarms] = useState<Farm[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadFarms();
  }, []);

  const loadFarms = async () => {
    try {
      setError(null);
      const data = await fetchFarms();
      setFarms(data);
    } catch (error) {
      setError("Failed to load locations. Please try again later.");
      console.error("Error fetching locations:", error);
    }
  };

  // const handleDeleteLocation = async (id: number) => {
  //   try {
  //     setError(null);
  //     await deleteFarm(id);
  //     loadFarms();
  //   } catch (error) {
  //     setError("Failed to delete location. Please try again.");
  //     console.error("Error deleting location:", error);
  //   }
  // };

  return (
    <div>
      <h2>Farms</h2>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <ul>
        {locations.length === 0 ? (
          <p>No locations available.</p>
        ) : (
          locations.map((farm: Farm) => (
            <li key={farm.id} className="flex flex-row gap-2">
              <strong>{farm.id}</strong>
              <strong>{farm.name}</strong>
              {/* Uncomment when edit functionality is added */}
              {/* <button onClick={() => onEdit(location)}>Edit</button> */}
            </li>
          ))
        )}
      </ul>
    </div>
  );
};

export default FarmList;
