import React, { useEffect, useState } from "react";
import { Card, CardContent, CardTitle } from "../../../components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../../../components/ui/dialog";
import { fetchLocations } from "../../../api/locationApi";
import { Location } from "../../../types/TResponse";
import { UseFormReturn } from "react-hook-form";

const LocationCard = ({
  form,
}: {
  form: UseFormReturn<{
    farmName: string;
    hectares: number;
    postalAddress?: string | undefined;
    locationId: number;
  }>;
}) => {
  const [locations, setLocations] = useState<Location[]>([]);
  const [selectedLocation, setSelectedLocation] = useState<Location | null>(
    null
  );
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
      setError("Failed to load locations. Please try again later.");
      console.error("Error fetching locations:", error);
    }
  };

  const handleSelectLocation = (location: Location) => {
    setSelectedLocation(location);
    form.setValue("locationId", location.id); // Update the form field
  };

  return (
    <Card className="flex flex-col md:flex-row mx-auto w-full shadow px-4 py-9 rounded-xl">
      <CardContent className="flex-1 pb-3 md:pb-0">
        <CardTitle>Location</CardTitle>
      </CardContent>
      <CardContent className="flex flex-1 flex-col gap-6">
        <Dialog>
          <DialogTrigger className="bg-black text-white rounded-lg p-2">
            {selectedLocation
              ? `${selectedLocation.fullAddress}`
              : "Choose Location"}
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Select Location</DialogTitle>
              <DialogDescription>
                Select a location from the list below. Once selected, it will be
                assigned to your form.
              </DialogDescription>
            </DialogHeader>
            <div className="max-h-60 overflow-y-auto">
              {error && <p style={{ color: "red" }}>{error}</p>}
              <ul className="divide-y divide-gray-200">
                {locations.length === 0 ? (
                  <p>No locations available.</p>
                ) : (
                  locations.map((location: Location) => (
                    <li
                      key={location.id}
                      onClick={() => handleSelectLocation(location)}
                      className={`p-3 cursor-pointer rounded-md hover:bg-gray-100 ${
                        selectedLocation?.id === location.id
                          ? "bg-gray-200"
                          : ""
                      }`}
                    >
                      <div className="font-bold text-gray-800">
                        <h5>{location.fullAddress}</h5>
                      </div>
                      <div className="flex items-center space-x-2">
                        <h6 className="font-bold">
                          {location.farms?.length || 0}
                        </h6>
                        <p>other farms</p>
                      </div>

                      <ul className="ml-4 text-sm text-gray-600">
                        {location.farms &&
                          location.farms
                            .slice(0, 4)
                            .map((farm) => <li key={farm.id}>{farm.name}</li>)}
                        {location.farms && location.farms.length > 4 && (
                          <li>...</li> // Show "..." if there are more than 4 farms
                        )}
                      </ul>
                    </li>
                  ))
                )}
              </ul>
            </div>
          </DialogContent>
        </Dialog>
      </CardContent>
    </Card>
  );
};

export default LocationCard;
