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

const DISTRICT = { 1: "Brunei Muara", 2: "Tutong", 3: "Belait", 4: "Temburong" };

const formSchema = z.object({
    farmname: z
        .string()
        .min(3, "Farm name must be at least 3 characters long.")
        .max(50, "Farm name must not exceed 50 characters.")
        .regex(/^[a-zA-Z0-9\s.,'-]+$/, "Farm name contains invalid characters."),
    hectares: z.number().min(0, "Hectares must be a positive number.").optional().default(0),
    fulladdress: z
        .string()
        .min(10, "Full address must be at least 10 characters long.")
        .optional(),
    district: z.enum(Object.values(DISTRICT) as [string, ...string[]]).optional().nullable(),
});

const Page = () => {
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            farmname: "",
            hectares: 0,
            fulladdress: "",
            district: undefined,
        },
    });

    function onSubmit(values: z.infer<typeof formSchema>) {
        console.log(values);
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
                            name="farmname"
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
                                        <Input type="number" placeholder="Hectares of farm" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </CardContent>
                </Card>
                <Separator />
                <Card className="flex flex-col md:flex-row mx-auto w-full shadow px-4 py-9 rounded-xl">
                    <CardHeader className="flex-1 pb-3 md:pb-0">
                        <CardTitle>Location</CardTitle>
                    </CardHeader>
                    <CardContent className="flex flex-1 flex-col gap-6 ">
                        <FormField
                            control={form.control}
                            name="fulladdress"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Full Address</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Enter full address" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="district"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>District</FormLabel>
                                    <FormControl>
                                        <Select
                                            onValueChange={(value: any) => field.onChange(value)}
                                            value={field.value || ""}
                                        >
                                            <SelectTrigger className="w-[180px]">
                                                <SelectValue placeholder="Select a district" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectGroup>
                                                    <SelectLabel>Districts</SelectLabel>
                                                    {Object.values(DISTRICT).map((dist) => (
                                                        <SelectItem key={dist} value={dist}>
                                                            {dist}
                                                        </SelectItem>
                                                    ))}
                                                </SelectGroup>
                                            </SelectContent>
                                        </Select>
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
