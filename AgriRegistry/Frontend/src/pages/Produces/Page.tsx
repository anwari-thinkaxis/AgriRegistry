import { ChevronRight, PlusIcon, Tractor, Trash } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../../components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../../components/ui/dialog";
import { Button } from "../../components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../../components/ui/form";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { api } from "../../api/api";
import { useNavigate } from "react-router";
import { Input } from "../../components/ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "../../components/ui/select";
import { useEffect, useState } from "react";
import { Produce } from "../../types/TResponse";
import { deleteProduce, fetchProduces } from "../../api/produceApi";
import { PRODUCETYPES } from "../../utils/constants/produceTypes";

const formSchema = z.object({
  produceName: z
    .string()
    .min(3, "Produce name must be at least 3 characters long.")
    .max(50, "Produce name must not exceed 50 characters.")
    .regex(/^[a-zA-Z0-9\s.,'-]+$/, "Produce name contains invalid characters."),
  produceTypeId: z.number().min(1).max(13),
});

const Page = () => {
  const navigate = useNavigate();

  const [open, setOpen] = useState(false);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      produceName: "",
      produceTypeId: undefined,
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
      });

      if (response.status === 200 || response.status === 201) {
        navigate("/produces");
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

  const handleDeleteProduce = async (id: number) => {
    try {
      await deleteProduce(id);
      loadProduces();
    } catch (error) {
      console.error("Error deleting location:", error);
    }
  };

  return (
    <div className="flex flex-col mx-auto min-h-screen w-full max-w-4xl py-14 px-12 gap-6">
      <h6>My Produces</h6>
      <Card className="flex flex-col">
        <CardHeader>
          <CardTitle>X Produce</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col gap-6">
          <Form {...form}>
            <Dialog open={open} onOpenChange={setOpen}>
              <DialogTrigger className="w-full py-2 flex gap-2 justify-center shadow rounded-3xl bg-emerald-500 text-white">
                <PlusIcon />
                Add Produce
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Add New Produce</DialogTitle>
                  <DialogDescription>
                    Please fill in the details below to add a new produce item
                    to your inventory.
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
                          onValueChange={(value) =>
                            field.onChange(parseInt(value))
                          }
                        >
                          <SelectTrigger className="w-1/2">
                            <SelectValue placeholder="Select a produce type" />
                          </SelectTrigger>
                          <SelectContent>
                            {Object.keys(groupedProduceTypes).map(
                              (category) => (
                                <SelectGroup key={category}>
                                  <SelectLabel>{category}</SelectLabel>
                                  {groupedProduceTypes[category].map(
                                    (produce) => (
                                      <SelectItem
                                        key={produce.id}
                                        value={produce.id.toString()}
                                      >
                                        {produce.name}
                                      </SelectItem>
                                    )
                                  )}
                                </SelectGroup>
                              )
                            )}
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
          <div className="flex flex-col gap-3">
            {produces?.map((produce) => (
              <Card
                key={produce.id}
                className="flex justify-between items-center px-6"
              >
                <div className="flex items-center">
                  <div className="flex items-center justify-center w-8 h-8">
                    <Tractor className="w-full h-full" />
                  </div>
                  <CardHeader>
                    <CardTitle>{produce.fullName}</CardTitle>
                    <CardDescription>
                      {produce.produceType.name}
                    </CardDescription>
                  </CardHeader>
                </div>
                <div>
                  <Button
                    type="button"
                    onClick={() => navigate(`/produce/${produce.id}`)}
                    className="flex items-center justify-center w-10 h-10 rounded-full p-0"
                  >
                    <ChevronRight size={5} />
                  </Button>

                  <Button
                    type="button"
                    onClick={() => handleDeleteProduce(produce.id)}
                    className="flex items-center justify-center w-10 h-10 rounded-full p-0"
                  >
                    <Trash size={5} />
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Page;
