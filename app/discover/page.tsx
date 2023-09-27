import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import prisma from "@/lib/prismadb";
import type { Thread } from "@prisma/client";
import Link from "next/link";

async function GetThreads(){
    const threads = prisma.thread.findMany({
        orderBy: {
            members: {
                _count: "desc"
            }
        }
    })
    return threads;
}

export default async function DiscoverPage(){
    const threads = await GetThreads() as Thread[];

    return(
        <main className="space-y-2 flex flex-col">
            {threads.map((thread) => (
                <Link key={thread.id} className="" href={`/t/${thread.title}`}>
                    <Card>
                        <CardContent className="flex justify-between pt-6">
                            <div className="">
                                <CardTitle className="">t/{thread.title}</CardTitle>
                                <span>{thread.description}</span>
                            </div>
                            <div className="flex items-end flex-col justify-end">
                                <span>Members: {thread.memberId.length}</span>
                                <span>{thread.createdAt.getDay()}.{thread.createdAt.getMonth()}.{thread.createdAt.getFullYear()}</span>
                            </div>
                        </CardContent>
                    </Card>
                </Link>
            ))}
        </main>
    )
}