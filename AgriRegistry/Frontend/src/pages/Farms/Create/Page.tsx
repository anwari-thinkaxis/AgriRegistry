/* eslint-disable @typescript-eslint/no-explicit-any */
//import { useState } from "react";

import { Button } from "../../../components/ui/button";
import { Separator } from "../../../components/ui/separator";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Form } from "../../../components/ui/form";
import { api } from "../../../api/api";
import { useNavigate } from "react-router";
import AuthStore from "../../../utils/stores/AuthStore";
import LocationCard from "../components/LocationCard";
import GeneralCard from "../components/GeneralCard";
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
  locationId: z.number().min(1),
});

const Page = () => {
  const navigate = useNavigate();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      farmName: "",
      hectares: 0,
      postalAddress: "",
      locationId: undefined,
    },
  });

  async function goBack(
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) {
    event.preventDefault();
    navigate("/farms");
  }

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      // Assuming you have an endpoint to submit farm data
      const response = await api.post("/farm", {
        name: values.farmName,
        farmManagerId: AuthStore.getFarmManagerId(),
        hectares: values.hectares,
        postalAddress: values.postalAddress,
        locationId: values.locationId,
      });
      console.log(response);

      // Check response for success confirmation
      if (response.status === 200 || response.status === 201) {
        console.log("Farm created successfully:", response.data);

        // Redirect or notify the user of success
        navigate("/farms"); // Change route to the farm listing or relevant page
      } else {
        throw new Error("Unexpected response from the server");
      }
    } catch (err: any) {
      console.error(
        "Farm submission failed:",
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
        <h5>Add New Farm</h5>
        <Separator />
        <GeneralCard form={form} />
        <Separator />
        <LocationCard form={form} />
        <div className="flex flex-row gap-6 justify-center">
          <Dialog>
            <DialogTrigger>
              <p>Cancel</p>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Cancel Creation</DialogTitle>
                <DialogDescription>
                  Are you sure you want to cancel creating a new farm? Your
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
