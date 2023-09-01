"use client";

import axios from "axios";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod"
import { Form, FormField, FormControl, FormItem, FormDescription, FormLabel, FormMessage } from "./ui/form";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { useToast } from "./ui/use-toast";
import { useRouter } from "next/navigation";
import { DialogFooter } from "./ui/dialog";

const threadSchema = z.object({
    title: z.string().min(3, {
        message: 'The title must at least contain 3 character(s)'
    }).max(16, {
        message: 'The title cant contain more than 16 character(s)'
    }).trim().toLowerCase(),
    description: z.string().min(6, {
        message: 'The description must at least contain 6 character(s)'
    }).max(32, {
        message: 'The description cant contain more than 32 character(s)'
    }),
})

export default function NewThreadForm(){
    const { toast } = useToast();

    const router = useRouter();

    const form = useForm<z.infer<typeof threadSchema>>({
        resolver: zodResolver(threadSchema),
        defaultValues: {
            title: "",
            description: "",
        }
    })

    function onSubmit(values: z.infer<typeof threadSchema>) {
        try {
            axios.post('/api/new/thread', {
                title: values.title,
                description: values.description,
            })
            .then(() => {
                router.refresh();
                router.replace(`/t/${values.title}`)
                toast({
                    title: "Success.",
                    description: "New thread created.",
                })
            })
            .catch((err) => (
                toast({
                    title: "There was a problem when making this thread.",
                    description: "Check your title and try again.",
                })
            ))
        } catch {
            toast({
                title: "There was a problem when making this thread.",
                description: "Check your title and try again.",
            })
        }
    }

    return(
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3">
                <FormField
                    control={form.control}
                    name="title"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Title</FormLabel>
                            <FormControl>
                                <Input placeholder="example" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="description"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Description</FormLabel>
                            <FormControl>
                                <Input placeholder="Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime mollitia, molestiae quas vel sint commodi..." {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <DialogFooter>
                    <Button type="submit">
                        Create
                    </Button>
                </DialogFooter>
            </form>
        </Form>
        
    )
}