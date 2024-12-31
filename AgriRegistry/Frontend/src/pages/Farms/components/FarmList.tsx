import { useState, useEffect } from "react";
import { Location } from "../../../types/TResponse";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../../../components/ui/card";
import { PlusIcon, Tractor } from "lucide-react";
import { Button } from "../../../components/ui/button";
import { fetchFarms } from "../../../api/farmApi";

const FarmList = () => {
  const [locations, setLocations] = useState<Location[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadLocations();
  }, []);

  const loadLocations = async () => {
    try {
      setError(null);
      const data = await fetchFarms();
      setLocations(data);
    } catch (error) {
      setError("Failed to load locations. Please try again later.");
      console.error("Error fetching locations:", error);
    }
  };

  return (
    <div>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <div className="flex flex-col gap-8">
        {locations.length === 0 ? (
          <p>No locations available.</p>
        ) : (
          locations.map((location: Location) => (
            <Card
              key={location.id}
              className="flex flex-col gap-10 px-10 py-10"
            >
              <div>
                <h5>{location.fullAddress}</h5>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {location.farms?.map((farm) => (
                  <Card
                    key={farm.id}
                    className="flex justify-between items-center px-6"
                  >
                    <div className="flex items-center">
                      <div className="flex items-center justify-center w-8 h-8">
                        <Tractor className="w-full h-full" />
                      </div>
                      <CardHeader>
                        <CardTitle>{farm.name}</CardTitle>
                        <CardDescription>
                          {Math.floor(Math.random() * 101)} reports
                        </CardDescription>
                      </CardHeader>
                    </div>
                    <Button className="flex items-center justify-center w-10 h-10 rounded-full p-0">
                      <PlusIcon className="w-5 h-5" />
                    </Button>
                  </Card>
                ))}
              </div>
              <div className="pb-4"></div>
            </Card>
          ))
        )}
      </div>
    </div>
  );
};

export default FarmList;
