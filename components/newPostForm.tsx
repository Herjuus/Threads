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
import { useState } from "react";
import { Loader2 } from "lucide-react";
import { Textarea } from "./ui/textarea";
import { uploadFiles } from "@/lib/uploadthing";
import type { Thread } from "@prisma/client";

type props = {
    thread: Thread;
    closeFunction: Function;
}

const postSchema = z.object({
    title: z.string().min(3, {
        message: 'The title must at least contain 3 character(s)'
    }).max(32, {
        message: 'The title cant contain more than 32 character(s)'
    }).regex(/^[a-zA-Z 1-9_!?"-]+$/, {
        message: 'The title can only contain letters, spaces, underscores, and hyphens'
    }),
    content: z.string().min(0, {
        message: 'The post must at least contain 6 character(s)'
    }).max(1024, {
        message: 'The post cant contain more than 1024 character(s)'
    }),
})

export default function NewPostForm(props: props){
    const [loading, setLoading] = useState(false);

    const [file, setFile] = useState("");
    const [loadingMessage, setLoadingMessage] = useState("Posting")

    const { toast } = useToast();

    const router = useRouter();

    const form = useForm<z.infer<typeof postSchema>>({
        resolver: zodResolver(postSchema),
        defaultValues: {
            title: "",
            content: "",
        }
    })

    const handleChange = (e: any) =>{
        setFile(e.target.files[0])
    }

    async function onSubmit(values: z.infer<typeof postSchema>) {
        setLoading(true);

        async function uploadImage(){
            if (file) {
                setLoadingMessage("Uploading image")
                const files = await [
                    // @ts-ignore
                    new File([file], `${file.name}`, {
                      type: "image/jpeg",
                    }),
                ];
        
                try {
                    const res = await uploadFiles({
                        files,
                        endpoint: "imageUploader",
                    });
                    return res;
                } catch {
                    toast({
                        title: "There was a problem uploading this image.",
                        description: "Make sure the file is PNG or JPEG."
                    })
                    setLoading(false);
                }
                setLoadingMessage("Posting")
            } else {
                return undefined;
            }
        }

        const res: any = await uploadImage();

        const getImageUrl = () => {
            if(res) {
                return res[0].url
            } else return null
        }

        axios.post('/api/new/post', {
            title: values.title,
            content: values.content,
            threadID: props.thread.id,
            imgurl: getImageUrl(),
        })
        .then(() => {
            props.closeFunction();
            router.refresh();
            router.replace(`/t/${props.thread.title}/${values.title.split(' ').join('_').toLowerCase()}`)
            toast({
                title: "Success.",
                description: "New post created.",
            })
        })
        .catch((err) => (
            toast({
                title: "There was a problem when making this post.",
                description: "Check your title and try again.",
            })
        ))
        .finally(() => {
            setLoading(false)
        })
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
                                <Input placeholder="Post title..." {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="content"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Post content</FormLabel>
                            <FormControl>
                                <Textarea rows={10} placeholder="Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime mollitia, molestiae quas vel sint commodi..." {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormItem>
                    <FormLabel htmlFor="image">Image (optional)</FormLabel>
                    <Input onChange={handleChange} id="image" type="file" lang="en"/>
                    {/* <FormDescription>Optional</FormDescription> */}
                </FormItem>
                <DialogFooter>
                    <Button className="flex gap-1" disabled={loading} type="submit">
                        {loading ? (
                            <>
                                <Loader2 className="animate-spin w-4" />
                                <span>{loadingMessage}</span>
                            </>
                        ) : (
                            <span>Post</span>
                        )}
                    </Button>
                </DialogFooter>
            </form>
        </Form>
    )
}