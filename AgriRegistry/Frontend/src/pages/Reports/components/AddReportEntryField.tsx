import { z } from "zod";
import { PRODUCETYPES } from "../../../utils/constants/PRODUCETYPES";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { api } from "../../../api/api";
import {
  Form,
  FormControl,
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
  reportId: z.number(),
  quantity: z
    .number()
    .min(0.1, "Quantity must be greater than 0")
    .refine((val) => /^\d+(\.\d{1,2})?$/.test(val.toString()), {
      message: "Quantity must have at most 2 decimal places",
    }),
});

const AddReportEntryField = ({
  id,
  loadReport,
}: {
  id: number;
  loadReport: any;
}) => {
  const [produces, setProduces] = useState<Produce[]>([]);

  useEffect(() => {
    loadProduces();
  }, []);

  const groupedProduce = produces.reduce((groups, produce) => {
    const category = produce.produceType.produceCategory.name;
    if (!groups[category]) {
      groups[category] = [];
    }
    groups[category].push(produce);
    return groups;
  }, {} as Record<string, Produce[]>);

  const loadProduces = async () => {
    try {
      const data = await fetchProduces();
      setProduces(data);
    } catch (error) {
      console.error("Error fetching produces:", error);
    }
  };

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      produceId: 1,
      reportId: id,
      quantity: 0,
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      // Send data to API to create the report
      const response = await api.post("/ReportEntry", {
        produceId: values.produceId,
        reportId: values.reportId,
        quantity: values.quantity,
      });

      if (response.status === 200 || response.status === 201) {
        console.log("Entry created successfully:", response.data);
        form.setValue("quantity", 0);
        loadReport();
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
            <CardTitle> Create report entry</CardTitle>
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
                        value={field.value?.toString()}
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
                          <SelectGroup>
                            <SelectLabel className="flex gap-2 w-full justify-between items-center">
                              <p className="text-sm text-muted-foreground">
                                Produce not yet added?
                              </p>
                              <AddProduceDialog loadProduces={loadProduces()} />
                            </SelectLabel>
                          </SelectGroup>
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
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
                          onChange={(e) => {
                            field.onChange(Number(e.target.value) || "");
                          }}
                          className="w-24 mr-2" // Adjust the width and margin here
                        />
                        <span className="text-sm text-gray-600">tonnes</span>
                      </div>
                    </FormControl>
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

export default AddReportEntryField;
