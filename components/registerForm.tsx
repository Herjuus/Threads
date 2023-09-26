"use client";

import { useForm } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod"
import { Form, FormField, FormControl, FormItem, FormDescription, FormLabel, FormMessage } from "./ui/form";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { useToast } from "./ui/use-toast";
import axios from "axios";
import { signIn } from "next-auth/react"
import { useRouter } from "next/navigation";

const registerSchema = z.object({
    username: z.string().min(3, {
        message: "Username must contain at least 3 character(s)"
    }).max(16, {
        message: "Username cant contain more than 16 character(s)"
    }).trim().regex(/^[a-zA-Z0-9_-]+$/, {
        message: "Username can only contain letters, numbers, underscores, and hyphens"
    }),
    email: z.string().toLowerCase().email({
        message: "Please enter a valid email"
    }),
    password: z.string().min(6, {
        message: "Password must contain at least 6 character(s)"
    }).max(64, {
        message: "Password cant contain more than 64 character(s)"
    }),
    confirmPassword: z.string().min(6, {
        message: "Password must contain at least 6 character(s)"
    }).max(64, {
        message: "Password cant contain more than 64 character(s)"
    }),
})

export default function RegisterForm({ toggleFunction }: any) {
    const { toast } = useToast();

    const router = useRouter();

    const form = useForm<z.infer<typeof registerSchema>>({
        resolver: zodResolver(registerSchema),
        defaultValues: {
            username: "",
            email: "",
            password: "",
            confirmPassword: "",
        }
    })

    function onSubmit(values: z.infer<typeof registerSchema>) {
        if (values.password !== values.confirmPassword) {
            toast({
                title: "Password's doesn't match.",
                description: "Please try again."
            })
            return;
        }
        axios.post('/api/register', {
            email: values.email,
            username: values.username,
            password: values.password,
        })
        .then(() => {
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
        })
        .catch((err) => {
            toast({
                title: "There was a problem while registering.",
                description: "Check your email and/or username and try again.",
            })
        })
    }

    return(
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3">
                <FormField
                    control={form.control}
                    name="username"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Username</FormLabel>
                            <FormControl>
                                <Input placeholder="username" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                    />
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
                    />
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
                    />
                <FormField
                    control={form.control}
                    name="confirmPassword"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Confirm password</FormLabel>
                            <FormControl>
                                <Input type="password" placeholder="********" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                    />
                <Button type="submit">Submit</Button>
                <Button onClick={() => toggleFunction()} variant={"link"}>Already a member? Sign in.</Button>
            </form>
        </Form>
    )
}