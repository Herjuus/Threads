import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import prisma from "@/lib/prismadb";
import Link from "next/link";

async function GetThreads(){
    const threads = prisma.thread.findMany()
    return threads;
}

export default async function DiscoverPage(){
    const threads = await GetThreads();

    return(
        <div>
            {threads.map((thread) => (
                <Link href={`/t/${thread.title}`}>
                    <Card>
                        <CardContent className="flex justify-between pt-6">
                            <div className="">
                                <CardTitle className="">{thread.title}</CardTitle>
                                <span>{thread.description}</span>
                            </div>
                            <div className="flex items-end">
                                <span>{thread.createdAt.getDay()}.{thread.createdAt.getMonth()}.{thread.createdAt.getFullYear()}</span>
                            </div>
                        </CardContent>
                    </Card>
                </Link>
            ))}
        </div>
    )
}