"use client";

import type { Thread } from "@prisma/client";
import NewPostForm from "./newPostForm";
import { Button } from "./ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTrigger, DialogTitle } from "./ui/dialog";
import { useState } from "react";

type props = {
    thread: Thread;
}

export default function NewPost(props: props){
    const [open, setOpen] = useState(false);

    function close(){
        setOpen(false);
    }

    return(
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button>New post</Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>New post to {props.thread.title}</DialogTitle>
                    <DialogDescription>Customize your new post here</DialogDescription>
                </DialogHeader >
                <NewPostForm closeFunction={close} thread={props.thread}/>
            </DialogContent>
        </Dialog>
    )
}