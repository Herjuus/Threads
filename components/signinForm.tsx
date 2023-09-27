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
import { useState } from "react";
import { Loader2 } from "lucide-react";


const signinSchema = z.object({
    email: z.string().toLowerCase().email({
        message: "Please enter a valid email"
    }),
    password: z.string().min(6, {
        message: "Password must contain at least 6 character(s)"
    }).max(64, {
        message: "Password cant contain more than 64 character(s)"
    }),
})

export default function SigninForm({ toggleFunction }: any) {
    const [loading, setLoading] = useState(false);
        
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
        setLoading(true);
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
                    title: "There was a problem while signing in.",
                    description: "Check your email and/or username and try again.",
                })
            }
        })
        .finally(() => {
            setLoading(false);
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
                <div className="flex items-center flex-col sm:flex-row">
                    <Button className="gap-1 w-full sm:w-auto" disabled={loading} type="submit">
                        {loading ? (
                            <>
                                <Loader2 className="animate-spin w-4"/>
                                <span>Signing in</span>
                            </>
                        ) : (
                            <span>Sign in</span>
                        )}
                    </Button>
                    <Button disabled={loading} onClick={() => toggleFunction()} variant={"link"}>Not registered yet? Register.</Button>
                </div>
            </form>
        </Form>
    )
}