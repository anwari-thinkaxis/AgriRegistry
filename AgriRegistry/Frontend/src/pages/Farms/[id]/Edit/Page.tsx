import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { Farm } from "../../../../types/TResponse";
import { Form } from "../../../../components/ui/form";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Separator } from "../../../../components/ui/separator";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../../../../components/ui/dialog";
import { Button } from "../../../../components/ui/button";
import { api } from "../../../../api/api";
import { fetchFarmById } from "../../../../api/farmApi";
import GeneralCardEdit from "./components/GeneralCardEdit";

const formSchema = z.object({
  farmName: z
    .string()
    .min(3, "Farm name must be at least 3 characters long.")
    .max(50, "Farm name must not exceed 50 characters.")
    .regex(/^[a-zA-Z0-9\s.,'-]+$/, "Farm name contains invalid characters."),
  hectares: z
    .number()
    .min(0, "Hectares must be a positive number.")
    .optional()
    .default(0),
  postalAddress: z
    .string()
    .min(10, "Postal address must be at least 10 characters long.")
    .optional(),
});

const Page = () => {
  const navigate = useNavigate();
  const { id } = useParams(); // Ensures type safety for the parameter
  const [farm, setFarm] = useState<Farm | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      farmName: "",
      hectares: 0,
      postalAddress: "",
    },
  });

  const { setValue } = form;

  useEffect(() => {
    if (id) {
      loadFarm(parseInt(id));
    }
  }, [id]);

  useEffect(() => {
    if (farm) {
      // Set form values once the location is loaded
      setValue("farmName", farm.name);
      setValue("hectares", farm.hectares);
      setValue("postalAddress", farm.postalAddress);
    }
  }, [farm, setValue]);

  const loadFarm = async (farmId: number) => {
    try {
      const farm = await fetchFarmById(Number(farmId)); // Assuming fetchLocations returns a Location[]

      if (!farm) {
        console.log("farm not found.");
      } else {
        setFarm(farm);
      }
    } catch (err) {
      console.error("Error fetching location:", err);
    } finally {
      setLoading(false);
    }
  };

  async function goBack(
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) {
    event.preventDefault();
    navigate(`/farms/${id}`);
  }

  async function onSubmit(values: z.infer<typeof formSchema>) {
    console.log("Submitting form with values:", values);
    try {
      const response = await api.patch(`/farm/${id}`, {
        id: id,
        name: values.farmName,
        postalAddress: values.postalAddress,
        hectares: values.hectares,
      });
      console.log(response);

      // Check response for success confirmation
      if (response.status === 200 || response.status === 201) {
        console.log("Farm updated successfully:", response.data);

        // Redirect or notify the user of success
        navigate(`/farms/${id}`);
      } else {
        throw new Error("Unexpected response from the server");
      }
    } catch (err: any) {
      console.error(
        "Farm edit submission failed:",
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
        <h5>Edit Farm</h5>
        <Separator />
        <GeneralCardEdit form={form} loading={loading} />
        <div className="flex flex-row gap-6 justify-center">
          <Dialog>
            <DialogTrigger>
              <p>Cancel</p>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Cancel Creation</DialogTitle>
                <DialogDescription>
                  Are you sure you want to cancel edit farm? Your changes will
                  not be saved.
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
      </form>
    </Form>
  );
};

export default Page;
