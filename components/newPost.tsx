"use client";

import type { Thread } from "@prisma/client";
import NewPostForm from "./newPostForm";
import { Button } from "./ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTrigger, DialogTitle } from "./ui/dialog";

type props = {
    thread: Thread;
}

export default function NewPost(props: props){
    return(
        <Dialog>
            <DialogTrigger>
                <Button>New post</Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>New post to {props.thread.title}</DialogTitle>
                    <DialogDescription>Customize your new post here</DialogDescription>
                </DialogHeader>
                <NewPostForm />
            </DialogContent>
        </Dialog>
    )
}