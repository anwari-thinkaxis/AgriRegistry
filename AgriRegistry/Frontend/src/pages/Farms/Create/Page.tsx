/* eslint-disable @typescript-eslint/no-explicit-any */
//import { useState } from "react";

import { Button } from "../../../components/ui/button";
import { Input } from "../../../components/ui/input";
import { Separator } from "../../../components/ui/separator";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "../../../components/ui/form";
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "../../../components/ui/select";
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "../../../components/ui/card";
import { api } from "../../../api/api";
import { useNavigate } from "react-router";
import AuthStore from "../../../utils/stores/AuthStore";
import { Textarea } from "../../../components/ui/textarea";

const DISTRICT = { 1: "Brunei Muara", 2: "Tutong", 3: "Belait", 4: "Temburong" };

const formSchema = z.object({
    farmName: z
        .string()
        .min(3, "Farm name must be at least 3 characters long.")
        .max(50, "Farm name must not exceed 50 characters.")
        .regex(/^[a-zA-Z0-9\s.,'-]+$/, "Farm name contains invalid characters."),
    hectares: z.number().min(0, "Hectares must be a positive number.").optional().default(0),
    postalAddress: z
        .string()
        .min(10, "Postal address must be at least 10 characters long.")
        .optional(),
    //district: z.enum(Object.values(DISTRICT) as [string, ...string[]]).optional().nullable(),
});

const Page = () => {
    const navigate = useNavigate();

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            farmName: "",
            hectares: 0,
            postalAddress: "",
            //fulladdress: "",
            //district: undefined,
        },
    });

    async function onSubmit(values: z.infer<typeof formSchema>) {
        try {
            // Assuming you have an endpoint to submit farm data
            const response = await api.post('/farm', {
                name: values.farmName,
                farmManagerId: AuthStore.getFarmManagerId(),
                hectares: values.hectares,
                postalAddress: values.postalAddress,
                locationId: 2
                // Uncomment or add additional fields as necessary
                // fulladdress: values.fulladdress,
                // district: values.district,
            });
            console.log(response)

            // Check response for success confirmation
            if (response.status === 200 || response.status === 201) {
                console.log('Farm created successfully:', response.data);

                // Redirect or notify the user of success
                navigate('/farms'); // Change route to the farm listing or relevant page
            } else {
                throw new Error('Unexpected response from the server');
            }
        } catch (err: any) {
            console.error('Farm submission failed:', err.response?.data || err.message);
        }
    }



    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col mx-auto min-h-screen w-full max-w-4xl py-14 px-12 gap-11">
                <h5>Add New Farm</h5>
                <Separator />
                <Card className="flex flex-col md:flex-row mx-auto w-full shadow px-4 py-9 rounded-xl">
                    <CardHeader className="flex-1 pb-3 md:pb-0">
                        <CardTitle>General</CardTitle>
                    </CardHeader>
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
                                                field.onChange(e.target.value ? Number(e.target.value) : "");
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
                                    <FormLabel>Postal Address</FormLabel>
                                    <FormControl>
                                        <Textarea placeholder="Enter Postal address" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </CardContent>
                </Card>
                <Separator />
                <div className="flex flex-row gap-2 justify-center">
                    <Button variant="outline">Discard</Button>
                    <Button type="submit">Submit</Button>
                </div>
            </form>
        </Form>
    );
};

export default Page;
