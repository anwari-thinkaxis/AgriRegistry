import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { api } from "../../../api/api";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../../../components/ui/form";
import { Input } from "../../../components/ui/input";
import { Button } from "../../../components/ui/button";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "../../../components/ui/select";
import { useEffect, useState } from "react";
import { fetchProduces } from "../../../api/produceApi";
import { Produce } from "../../../types/TResponse";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../../../components/ui/card";
import AddProduceDialog from "../../Produces/components/AddProduceDialog";

const formSchema = z.object({
  produceId: z.number().min(1, "Please select a valid produce"),
  recordId: z.number(),
  quantity: z.coerce
    .number()
    .min(0.1, "Quantity must be greater than 0")
    .refine((val) => /^\d+(\.\d{1,2})?$/.test(val.toString()), {
      message: "Quantity must have at most 2 decimal places",
    }),
});

const AddRecordEntryField = ({
  id,
  loadRecord,
}: {
  id: number;
  loadRecord: any;
}) => {
  const [produces, setProduces] = useState<Produce[]>([]);

  useEffect(() => {
    loadProduces();
  }, []);

  const loadProduces = async () => {
    try {
      const data = await fetchProduces();
      setProduces(data);
    } catch (error) {
      console.error("Error fetching produces:", error);
    }
  };

  const groupedProduce = produces.reduce((groups, produce) => {
    const category = produce.produceType.produceCategory.name;
    if (!groups[category]) {
      groups[category] = [];
    }
    groups[category].push(produce);
    return groups;
  }, {} as Record<string, Produce[]>);

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      produceId: 0,
      recordId: id,
      quantity: 0.0,
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      // Send data to API to create the record
      const response = await api.post("/RecordEntry", {
        produceId: values.produceId,
        recordId: values.recordId,
        quantity: values.quantity,
      });

      if (response.status === 200 || response.status === 201) {
        console.log("Entry created successfully:", response.data);
        form.setValue("quantity", 0.0);
        loadRecord();
      } else {
        throw new Error("Unexpected response from the server");
      }
    } catch (err: any) {
      console.error(
        "Entry submission failed:",
        err.response?.data || err.message
      );
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <Card className="flex flex-1 flex-col">
          <CardHeader className="font-medium">
            <CardTitle> Create record entry</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid w-full items-center gap-4">
              <FormField
                control={form.control}
                name="produceId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Produce</FormLabel>
                    <FormControl>
                      <Select
                        value={
                          field.value == 0 ? undefined : field.value?.toString()
                        }
                        onValueChange={(value) =>
                          field.onChange(parseInt(value))
                        }
                      >
                        <SelectTrigger className="w-1/2">
                          <SelectValue placeholder="Select a produce type" />
                        </SelectTrigger>
                        <SelectContent>
                          {Object.keys(groupedProduce).map((category) => (
                            <SelectGroup key={category}>
                              <SelectLabel>{category}</SelectLabel>
                              {groupedProduce[category].map((produce) => (
                                <SelectItem
                                  key={produce.id}
                                  value={produce.id.toString()}
                                >
                                  {produce.fullName}
                                </SelectItem>
                              ))}
                            </SelectGroup>
                          ))}
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="flex gap-2 items-center">
                <p className="text-sm text-muted-foreground">
                  Could not find your produce?
                </p>
                <AddProduceDialog />
              </div>
              <FormField
                control={form.control}
                name="quantity"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Quantity</FormLabel>
                    <FormControl>
                      <div className="flex items-center">
                        <Input
                          type="number"
                          placeholder="Enter quantity (tonnes)"
                          {...field}
                          className="w-36 mr-2" // Adjust the width and margin here
                        />
                        <span className="text-sm text-gray-600">tonnes</span>
                      </div>
                    </FormControl>
                    <FormDescription>Up to 2 decimal places</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </CardContent>
          <CardFooter>
            <Button type="submit">Submit</Button>
          </CardFooter>
        </Card>
      </form>
    </Form>
  );
};

export default AddRecordEntryField;
