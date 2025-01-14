import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import EditLocationForm from "./components/EditLocationForm";
import { Location } from "../../../types/TResponse";
import { fetchLocations } from "../../../api/locationApi";
import { Form } from "../../../components/ui/form";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Separator } from "../../../components/ui/separator";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../../../components/ui/dialog";
import { Button } from "../../../components/ui/button";
import { api } from "../../../api/api";

const formSchema = z.object({
  id: z.number().min(1),
  fullAddress: z
    .string()
    .min(10, "Full address must be at least 10 characters long.")
    .max(100, "Full address must not exceed 100 characters."),
  districtId: z.number().min(1, "Please select a district."),
});

const Page = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>(); // Ensures type safety for the parameter
  const [location, setLocation] = useState<Location | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      id: Number(id),
      fullAddress: "", // Initial fallback values
      districtId: 0,
    },
  });

  const { setValue } = form;

  useEffect(() => {
    if (id) {
      loadLocation(parseInt(id));
    }
  }, [id]);

  useEffect(() => {
    if (location) {
      // Set form values once the location is loaded
      setValue("fullAddress", location.fullAddress);
      setValue("districtId", location.districtId);
    }
  }, [location, setValue]);

  const loadLocation = async (locationId: number) => {
    try {
      // Fetch all locations
      const locations = await fetchLocations(); // Assuming fetchLocations returns a Location[]
      // Find the location by ID
      const foundLocation = locations.find(
        (loc: Location) => loc.id === locationId
      );

      if (!foundLocation) {
        setError("Location not found.");
      } else {
        setLocation(foundLocation);
      }
    } catch (err) {
      console.error("Error fetching location:", err);
      setError("Failed to fetch location data.");
    } finally {
      setLoading(false);
    }
  };

  async function goBack(
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) {
    event.preventDefault();
    navigate(`/farms`);
  }

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      const response = await api.patch(`/location/${id}`, {
        id: id,
        fullAddress: values.fullAddress,
        districtId: values.districtId,
      });
      console.log(response);

      // Check response for success confirmation
      if (response.status === 200 || response.status === 201) {
        console.log("Location updated successfully:", response.data);

        // Redirect or notify the user of success
        navigate("/farms");
      } else {
        throw new Error("Unexpected response from the server");
      }
    } catch (err: any) {
      setError(err.response?.data);
      console.error(
        "Location edit submission failed:",
        err.response?.data || err.message
      );
    }
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col mx-auto min-h-screen w-full max-w-4xl py-14 px-12 gap-11"
      >
        <h5>Edit Location</h5>
        <Separator />
        <EditLocationForm form={form} />
        <div className="flex flex-row gap-6 justify-center">
          <Dialog>
            <DialogTrigger>
              <p>Cancel</p>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Cancel Edit</DialogTitle>
                <DialogDescription>
                  Are you sure you want to edit location? Your changes will not
                  be saved.
                </DialogDescription>
              </DialogHeader>
              <DialogFooter>
                <DialogClose asChild>
                  <Button type="button" variant="outline">
                    No, Go Back
                  </Button>
                </DialogClose>
                <Button onClick={goBack}>Yes, I am Sure</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
          <Button type="submit">Submit</Button>
        </div>
        <h1>{error}</h1>
      </form>
    </Form>
  );
};

export default Page;
