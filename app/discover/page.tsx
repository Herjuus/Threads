import prisma from "@/lib/prismadb";

async function GetThreads(){
    prisma.thread.findMany()
}

export default async function DiscoverPage(){
    return(
        <div>

        </div>
    )
}