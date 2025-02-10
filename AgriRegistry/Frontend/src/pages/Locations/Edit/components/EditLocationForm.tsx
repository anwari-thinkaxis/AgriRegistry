import { UseFormReturn } from "react-hook-form";
import { Card, CardContent, CardTitle } from "../../../../components/ui/card";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../../../../components/ui/form";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "../../../../components/ui/select";
import { DISTRICTS } from "../../../../utils/constants/DISTRICTS";
import { Textarea } from "../../../../components/ui/textarea";
import { Skeleton } from "../../../../components/ui/skeleton";

const EditLocationForm = ({
  form,
  loading,
}: {
  form: UseFormReturn<{
    id: number;
    fullAddress: string;
    districtId: number;
  }>;
  loading: boolean;
}) => {
  return (
    <Card className="flex flex-col md:flex-row mx-auto w-full shadow px-4 py-9 rounded-xl">
      <CardContent className="flex-1 pb-3 md:pb-0">
        <CardTitle>General</CardTitle>
      </CardContent>
      <CardContent className="flex flex-1 flex-col gap-6 ">
        <FormField
          control={form.control}
          name="fullAddress"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Location Address</FormLabel>
              <FormControl>
                {loading ? (
                  <Skeleton className="h-20 w-[250px]" />
                ) : (
                  <Textarea
                    className="h-20"
                    placeholder="Enter Postal address"
                    {...field}
                    value={form.getValues("fullAddress")}
                  />
                )}
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        {/* District Dropdown */}
        <FormField
          control={form.control}
          name="districtId"
          render={({ field }) => (
            <FormItem>
              <FormLabel>District</FormLabel>
              <FormControl>
                {loading ? (
                  <Skeleton className="h-8 w-[250px]" />
                ) : (
                  <Select
                    value={field.value?.toString()} // Use `field.value` for the value
                    onValueChange={(value) => field.onChange(parseInt(value))} // Use `field.onChange` for updating the value
                  >
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Select District" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectLabel>Districts</SelectLabel>
                        {Object.entries(DISTRICTS).map(([id, name]) => (
                          <SelectItem key={id} value={id}>
                            {name}
                          </SelectItem>
                        ))}
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                )}
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </CardContent>
    </Card>
  );
};

export default EditLocationForm;
