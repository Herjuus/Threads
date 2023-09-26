"use client";

import { useRouter } from "next/navigation";
import { Button } from "./ui/button";
import { Thread, User } from "@prisma/client";
import axios from "axios";
import { useToast } from "./ui/use-toast";
import { Loader2, MoreVertical } from "lucide-react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "./ui/dropdown-menu";
import { AlertDialog, AlertDialogContent, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "./ui/alert-dialog";
import { AlertDialogAction, AlertDialogCancel } from "@radix-ui/react-alert-dialog";
import { useState } from "react";

type props = {
    user: User,
    thread: Thread,
}

export function ThreadDropdown(props: props){
    const [loading, setLoading] = useState(false);

    const { toast } = useToast();
    const router = useRouter()

    async function leaveThread() {
        setLoading(true);
        await axios.post('/api/thread/leave', {
            threadId: props.thread.id,
        })
        .then(() => {
            router.refresh();
        })
        .catch((err) => {
            console.log(err)
            toast({
                title: err.toString(),
                variant: "destructive"
            });
        })
        .finally(() => {
            setLoading(false);
        })
    }
    return(
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button disabled={loading} className='text-base' variant={'outline'} size={'icon'}>
                    {loading ? (
                        <Loader2 className="animate-spin"/>
                    ) : (
                        <MoreVertical />
                    )}
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align='end'>
                <DropdownMenuItem onClick={leaveThread}>
                    Leave thread
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}