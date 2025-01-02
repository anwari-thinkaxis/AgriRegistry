import { useState } from "react";
import { Card, CardContent, CardTitle } from "../../../components/ui/card";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../../../components/ui/form";
import { Input } from "../../../components/ui/input";
import { Textarea } from "../../../components/ui/textarea";
import { UseFormReturn } from "react-hook-form";
import { Button } from "../../../components/ui/button";
import { observer } from "mobx-react-lite";
import AddFarmStore from "../../../utils/stores/AddFarmStore";

const GeneralCard = ({
  form,
}: {
  form: UseFormReturn<{
    farmName: string;
    hectares: number;
    postalAddress?: string | undefined;
    locationId: number;
    locationAddress?: string;
  }>;
}) => {
  return (
    <Card className="flex flex-col md:flex-row mx-auto w-full shadow px-4 py-9 rounded-xl">
      <CardContent className="flex-1 pb-3 md:pb-0">
        <CardTitle>General</CardTitle>
      </CardContent>
      <CardContent className="flex flex-1 flex-col gap-6 ">
        <FormField
          control={form.control}
          name="farmName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Farm Name</FormLabel>
              <FormControl>
                <Input placeholder="Enter farm name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="hectares"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Hectares</FormLabel>
              <FormControl>
                <Input
                  type="number"
                  placeholder="Hectares of farm"
                  {...field}
                  onChange={(e) => {
                    // Convert the string value to a number
                    field.onChange(
                      e.target.value ? Number(e.target.value) : ""
                    );
                  }}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="postalAddress"
          render={({ field }) => (
            <FormItem>
              <div className="flex justify-between items-center">
                <FormLabel>Postal Address</FormLabel>
                {AddFarmStore.selectedLocation !== null && (
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => {
                      form.setValue(
                        "postalAddress",
                        AddFarmStore.selectedLocation?.fullAddress
                      );
                    }}
                  >
                    Use location address
                  </Button>
                )}
              </div>
              <FormControl>
                <Textarea
                  className="h-20"
                  placeholder="Enter Postal address"
                  {...field}
                />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
      </CardContent>
    </Card>
  );
};

export default observer(GeneralCard);
