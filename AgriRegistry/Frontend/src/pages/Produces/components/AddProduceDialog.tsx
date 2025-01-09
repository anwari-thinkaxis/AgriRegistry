import { useState } from "react";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../../../components/ui/dialog";
import { Button } from "../../../components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../../../components/ui/form";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { api } from "../../../api/api";
import { Input } from "../../../components/ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "../../../components/ui/select";
import AuthStore from "../../../utils/stores/AuthStore";
import { PlusIcon } from "lucide-react";
import { PRODUCETYPES } from "../../../utils/constants/PRODUCETYPES";

const formSchema = z.object({
  produceName: z
    .string()
    .min(3, "Produce name must be at least 3 characters long.")
    .max(50, "Produce name must not exceed 50 characters.")
    .regex(/^[a-zA-Z0-9\s.,'-]+$/, "Produce name contains invalid characters."),
  produceTypeId: z.number().min(1).max(13),
  farmManagerId: z
    .string()
    .trim()
    .uuid("Farm Manager ID must be a valid UUID.")
    .nullable(),
});

const AddProduceDialog = ({ loadProduces }: { loadProduces: any }) => {
  const [open, setOpen] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      produceName: "",
      produceTypeId: undefined,
      farmManagerId: AuthStore.getFarmManagerId(),
    },
  });

  const groupedProduceTypes = PRODUCETYPES.reduce((groups, produce) => {
    const category = produce.category;
    if (!groups[category]) {
      groups[category] = [];
    }
    groups[category].push(produce);
    return groups;
  }, {} as Record<string, typeof PRODUCETYPES>);

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      const response = await api.post("/produce", {
        fullName: values.produceName,
        produceTypeId: values.produceTypeId,
        farmManagerId: values.farmManagerId,
      });

      if (response.status === 200 || response.status === 201) {
        // navigate("/produces");
        setOpen(false);
        loadProduces();
      } else {
        throw new Error("Unexpected response from the server");
      }
    } catch (err: any) {
      console.error(
        "Produce submission failed:",
        err.response?.data || err.message
      );
    }
  }
  return (
    <Form {...form}>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger className="px-2 py-1 flex gap-2 items-center justify-center shadow rounded-3xl bg-emerald-500 text-white">
          <PlusIcon />
          Add Produce
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add New Produce</DialogTitle>
            <DialogDescription>
              Please fill in the details below to add a new produce item to your
              inventory.
            </DialogDescription>
          </DialogHeader>

          {/* Produce Name Field */}
          <FormField
            control={form.control}
            name="produceName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Produce Name</FormLabel>
                <FormControl>
                  <Input placeholder="Enter produce name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Produce Type Field */}
          <FormField
            control={form.control}
            name="produceTypeId"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Produce Type</FormLabel>
                <FormControl>
                  <Select
                    value={field.value?.toString()}
                    onValueChange={(value) => field.onChange(parseInt(value))}
                  >
                    <SelectTrigger className="w-1/2">
                      <SelectValue placeholder="Select a produce type" />
                    </SelectTrigger>
                    <SelectContent>
                      {Object.keys(groupedProduceTypes).map((category) => (
                        <SelectGroup key={category}>
                          <SelectLabel>{category}</SelectLabel>
                          {groupedProduceTypes[category].map((produce) => (
                            <SelectItem
                              key={produce.id}
                              value={produce.id.toString()}
                            >
                              {produce.name}
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

          {/* Submit Button */}
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <DialogFooter>
              <Button type="submit">Save changes</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </Form>
  );
};

export default AddProduceDialog;
