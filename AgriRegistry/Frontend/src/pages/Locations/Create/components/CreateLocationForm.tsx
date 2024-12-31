/* eslint-disable @typescript-eslint/no-explicit-any */
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useNavigate } from "react-router";
import { api } from "../../../../api/api";
import { Form } from "../../../../components/ui/form";
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
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "../../../../components/ui/select";
import AuthStore from "../../../../utils/stores/AuthStore";

// Define the schema for form validation
const formSchema = z.object({
  fullAddress: z
    .string()
    .min(10, "Full address must be at least 10 characters long.")
    .max(100, "Full address must not exceed 100 characters."),
  districtId: z.number().min(1, "Please select a district."),
  farmManagerId: z.string(),
});

const DISTRICT = {
  1: "Brunei Muara",
  2: "Tutong",
  3: "Belait",
  4: "Temburong",
};

const Page = () => {
  const navigate = useNavigate();

  // Initialize the form with react-hook-form and zod
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fullAddress: "",
      districtId: 1,
      farmManagerId: "",
    },
  });

  // Handle form submission
  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      console.log("submit");
      // Send data to API to create the location
      const response = await api.post("/locations", {
        fullAddress: values.fullAddress,
        districtId: values.districtId,
        farmManagerId: AuthStore.getFarmManagerId(),
      });

      if (response.status === 200 || response.status === 201) {
        console.log("Location created successfully:", response.data);
        navigate("/locations"); // Navigate to the locations page after successful submission
      } else {
        throw new Error("Unexpected response from the server");
      }
    } catch (err: any) {
      console.error(
        "Location submission failed:",
        err.response?.data || err.message
      );
    }
  }

  // Handle cancellation
  async function goBack(
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) {
    event.preventDefault();
    navigate("/locations"); // Navigate to the locations page
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col mx-auto min-h-screen w-full max-w-4xl py-14 px-12 gap-11"
      >
        <h5>Create New Location</h5>
        <Separator />

        {/* Full Address Input */}
        <div className="flex flex-col gap-4">
          <label htmlFor="fullAddress" className="font-medium">
            Full Address
          </label>
          <input
            id="fullAddress"
            {...form.register("fullAddress")}
            className="p-2 border rounded-md"
            placeholder="Enter full address"
          />
          {form.formState.errors.fullAddress && (
            <p className="text-red-500 text-sm">
              {form.formState.errors.fullAddress?.message}
            </p>
          )}
        </div>

        {/* District Dropdown */}
        <div className="flex flex-col gap-4">
          <label htmlFor="districtId" className="font-medium">
            District
          </label>
          <Select
            value={form.watch("districtId").toString()}
            onValueChange={(value) =>
              form.setValue("districtId", parseInt(value))
            }
          >
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select District" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Districts</SelectLabel>
                {Object.entries(DISTRICT).map(([id, name]) => (
                  <SelectItem key={id} value={id}>
                    {name}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
          {form.formState.errors.districtId && (
            <p className="text-red-500 text-sm">
              {form.formState.errors.districtId?.message}
            </p>
          )}
        </div>

        <Separator />

        {/* Cancel and Submit Buttons */}
        <div className="flex flex-row gap-6 justify-center">
          <Dialog>
            <DialogTrigger>
              <p>Cancel</p>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Cancel Creation</DialogTitle>
                <DialogDescription>
                  Are you sure you want to cancel creating a new location? Your
                  changes will not be saved.
                </DialogDescription>
              </DialogHeader>

              <DialogFooter>
                <DialogClose asChild>
                  <Button type="button" variant="outline">
                    No, Go Back
                  </Button>
                </DialogClose>
                <Button onClick={goBack} variant="destructive">
                  Yes, I am Sure
                </Button>
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
