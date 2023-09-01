"use client";

import { Button } from "./ui/button";
import axios from "axios";
import { useRouter } from "next/navigation";
import { DialogFooter } from "./ui/dialog";
import { z } from "zod";

const threadSchema = z.object({
    title: z.string().min(3).max(16).trim(),
    description: z.string().min(6).max(64),
})

export default function NewThreadForm(){
    const { push } = useRouter();
    async function MakeThread(){
        try {
            await axios.post('/api/new/thread', {
                title: 'test',
                description: 'test',
            })
            push(`/t/${"test"}`)
        } catch {
            console.log('There was a problem making this thread')
        }
    }

    return(
        <DialogFooter>
            <Button onClick={MakeThread}>
                Create
            </Button>
        </DialogFooter>
    )
}