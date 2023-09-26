"use client";

import { useRouter } from "next/navigation";
import { Button } from "./ui/button";
import { Thread, User } from "@prisma/client";
import axios from "axios";
import { useToast } from "./ui/use-toast";
import { stringify } from "querystring";
import { useState } from "react";
import { Loader2 } from "lucide-react";

type props = {
    user: User,
    thread: Thread,
}

export function JoinThreadButton(props: props){
    const [loading, setLoading] = useState(false);

    const { toast } = useToast();
    const router = useRouter();

    async function joinThread() {
        setLoading(true);
        await axios.post('/api/thread/join', {
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
        });
    }

    return(
        <Button disabled={loading} className="space-x-1" onClick={joinThread}>
            {loading ? (
                <>
                    <Loader2 className="animate-spin w-4"/>
                    <span>Joining</span>
                </>
            ) : (
                <span>Join thread</span>
            )}
        </Button>
    )
}