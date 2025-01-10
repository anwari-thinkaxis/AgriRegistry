"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { cn } from "../../../lib/utils";
import { Button } from "../../../components/ui/button";
import { Calendar } from "../../../components/ui/calendar";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../../../components/ui/form";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "../../../components/ui/popover";
import { toast } from "../../../hooks/use-toast";
import { api } from "../../../api/api";
import { useNavigate } from "react-router";

const formSchema = z.object({
  recordDate: z.date({
    required_error: "A date is required.",
  }),
});

export function DatePickerForm({ farmId }: { farmId: number }) {
  const navigate = useNavigate();

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      recordDate: new Date(), // Default to today's date
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      // Send data to API to create the record
      const response = await api.post("/Record", {
        farmId: farmId,
        dateSubmitted: new Date(values.recordDate).toISOString(), // Ensure ISO 8601 format
        recordEntries: [],
      });

      if (response.status === 200 || response.status === 201) {
        console.log("Record created successfully:", response.data);
        navigate(`/records/${response.data.id}`); // Navigate to the locations page after successful submission
      } else {
        throw new Error("Unexpected response from the server");
      }
    } catch (err: any) {
      console.error(
        "Record submission failed:",
        err.response?.data || err.message
      );
    }

    toast({
      title: "You submitted the following values:",
      description: (
        <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
          <code className="text-white">{JSON.stringify(values, null, 2)}</code>
        </pre>
      ),
    });
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="recordDate"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel>Record Date</FormLabel>
              <Popover>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      variant={"outline"}
                      className={cn(
                        "w-[240px] pl-3 text-left font-normal",
                        !field.value && "text-muted-foreground"
                      )}
                    >
                      {field.value ? (
                        format(field.value, "PPP")
                      ) : (
                        <span>Pick a date</span>
                      )}
                      <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={field.value}
                    onSelect={field.onChange}
                    disabled={(date) =>
                      date > new Date() || date < new Date("1900-01-01")
                    }
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
              <FormDescription>
                Select the date you want to associate with this record.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Create</Button>
      </form>
    </Form>
  );
}
