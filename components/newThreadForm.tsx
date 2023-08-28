"use client";

import { User } from "@prisma/client";
import { Button } from "./ui/button";
import axios from "axios";
import { useRouter } from "next/navigation";

export default function NewThreadForm(){
    const { push } = useRouter();
    async function MakeThread(){
        try {
            await axios.post('/api/new/thread', {
                title: 'test',
                description: 'test',
            })
            // console.log('Thread made succesfully')
            push(`/t/${"test"}`)
        } catch {
            console.log('There was a problem making this thread')
        }
    }

    return(
        <Button onClick={MakeThread}>
            Make new thread
        </Button>
    )
}