"use client";

import { useForm } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod"
import { Form, FormField, FormControl, FormItem, FormDescription, FormLabel, FormMessage } from "./ui/form";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { useToast } from "./ui/use-toast";
import { signIn } from "next-auth/react"
import { useRouter } from "next/navigation";


const signinSchema = z.object({
    email: z.string().email({
        message: "Please enter a valid email"
    }),
    password: z.string().min(6, {
        message: "Password must contain at least 6 character(s)"
    }).max(64, {
        message: "Password cant contain more than 64 character(s)"
    }),
})

export default function SigninForm({ toggleFunction }: any) {
    const { toast } = useToast();

    const router = useRouter();

    const form = useForm<z.infer<typeof signinSchema>>({
        resolver: zodResolver(signinSchema),
        defaultValues: {
            email: "",
            password: "",
        }
    })

    function onSubmit(values: z.infer<typeof signinSchema>) {
        signIn('credentials', {
            email: values.email,
            password: values.password,
            redirect: false,
        })
        .then((callback) => {
            if (callback?.ok) {
                toast({
                    title: "Successfully signed in!"
                })
                router.refresh();
            }
            if (callback?.error) {
                toast({
                    title: "Wrong email/password.",
                    description: "Please try again.",
                })
            }
        })
    }

    return(
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3">
                <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Email</FormLabel>
                            <FormControl>
                                <Input placeholder="example@example.com" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                    >
                </FormField>
                <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Password</FormLabel>
                            <FormControl>
                                <Input type="password" placeholder="********" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                    >
                </FormField>
                <Button type="submit">Submit</Button>
                <Button onClick={() => toggleFunction()} variant={"link"}>Not registered yet? Register.</Button>
            </form>
        </Form>
    )
}